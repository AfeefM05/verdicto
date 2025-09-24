import { NextRequest, NextResponse } from 'next/server';
import { generateObject, type LanguageModel } from 'ai';
import { z } from 'zod';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:7860';

// Types to avoid `any` and help normalize upstream responses
type RelatedRecord = {
  title: string;
  url: string;
  snippet?: string;
};

type Prediction = {
  probability: number;
  timeline: string;
  feature_points: string[];
  related_records?: RelatedRecord[];
  // Some upstreams might return `references` which we map to `related_records`
  references?: RelatedRecord[];
};

type PredictionEnvelope = {
  prediction: Prediction;
  // Some upstreams might also include top-level references
  references?: RelatedRecord[];
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isRelatedRecord(value: unknown): value is RelatedRecord {
  if (!isObject(value)) return false;
  return isString(value.title) && isString(value.url);
}

function asRelatedRecords(value: unknown): RelatedRecord[] {
  return Array.isArray(value) ? value.filter(isRelatedRecord) : [];
}

function normalizeToEnvelope(data: unknown): PredictionEnvelope {
  // If already in the desired envelope shape
  if (isObject(data) && 'prediction' in data) {
    const rawPrediction = (data as Record<string, unknown>).prediction;
    const prediction: Prediction = normalizeToPrediction(rawPrediction, (data as Record<string, unknown>).references);
    return { prediction };
  }

  // If upstream returns the prediction object directly
  const prediction = normalizeToPrediction(data);
  return { prediction };
}

function normalizeToPrediction(value: unknown, topLevelRefs?: unknown): Prediction {
  const obj = isObject(value) ? value : {};
  const probability = isNumber(obj.probability) ? obj.probability : 0;
  const timeline = isString(obj.timeline) ? obj.timeline : '';
  const feature_points = Array.isArray(obj.feature_points) ? obj.feature_points.filter(isString) : [];
  let related_records = asRelatedRecords((obj as Record<string, unknown>).related_records);
  if (related_records.length === 0) {
    // Map any `references` to `related_records` if present
    const fallbackRefs = asRelatedRecords((obj as Record<string, unknown>).references ?? topLevelRefs);
    related_records = fallbackRefs;
  }
  return { probability, timeline, feature_points, related_records };
}

export async function POST(request: NextRequest) {
  try {
    const { case: caseDetails } = await request.json();

    if (!caseDetails) {
      return NextResponse.json(
        { error: 'Case details are required' },
        { status: 400 }
      );
    }

    // Try local AI backend first; on failure, fall back to Gemini via Vercel AI SDK
    let data: unknown | null = null;
    try {
      const upstreamResponse = await fetch(`${BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ case: caseDetails }),
      });

      if (upstreamResponse.ok) {
        data = await upstreamResponse.json();
      } else {
        console.warn('Upstream predict failed, switching to Gemini fallback', upstreamResponse.status);
      }
    } catch {
      console.warn('Upstream predict threw, switching to Gemini fallback');
    }

    if (!data) {
      // Gemini fallback using Vercel AI SDK
      const schema = z.object({
        prediction: z.object({
          probability: z.number().min(0).max(100),
          timeline: z.string(),
          feature_points: z.array(z.string()).min(1),
          related_records: z.array(z.object({
            title: z.string(),
            url: z.string().url(),
            snippet: z.string().optional(),
          })).default([]),
        })
      });

      const indianLegalPrompt = `You are an AI legal assistant specialized in Indian law. Analyze the user's case facts and provide a concise prediction.

Requirements:
- Base your answer on general Indian legal principles and typical case patterns only. If any detail is unknown, use reasonable assumptions and be explicit about uncertainty.
- Do NOT provide legal advice. This is informational analysis only.
- Return:
  - probability: integer 0-100 estimating likelihood of favorable outcome for the user.
  - timeline: short human-friendly duration (e.g., "1-3 years") based on typical Indian court timelines.
  - feature_points: 4-8 succinct bullets about the main factors influencing the outcome (evidence strength, sections like IPC/CrPC, procedural issues, precedent strength, witness credibility, investigation quality, delays, etc.).
  - related_records: 2-6 relevant Indian case references with title and public URL (e.g., indiankanoon, official court sites) with a short snippet; if unsure, provide best-effort examples matching the facts and sections involved.

User case details:
"""
${caseDetails}
"""`;

      try {
        // Try using @ai-sdk/google dynamically if available to avoid AI Gateway
        const mod: unknown = await import('@ai-sdk/google').catch(() => null);
        if (isObject(mod) && typeof (mod as Record<string, unknown>).google === 'function') {
          const { google } = mod as { google: (modelName: string) => unknown };
          const { object } = await generateObject({
            model: google('gemini-2.5-flash') as unknown as LanguageModel,
            schema,
            prompt: indianLegalPrompt,
          });
          data = object;
        } else if (isObject(mod) && typeof (mod as Record<string, unknown>).createGoogleGenerativeAI === 'function') {
          const { createGoogleGenerativeAI } = mod as { createGoogleGenerativeAI: (opts: { apiKey: string }) => (modelName: string) => unknown };
          const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '' });
          const { object } = await generateObject({
            model: google('gemini-2.5-flash') as unknown as LanguageModel,
            schema,
            prompt: indianLegalPrompt,
          });
          data = object;
        } else {
          // Fallback: call Gemini REST API directly
          const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
          if (!apiKey) throw new Error('Missing GOOGLE_GENERATIVE_AI_API_KEY');
          const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + encodeURIComponent(apiKey), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: indianLegalPrompt }]}],
              generationConfig: { responseMimeType: 'application/json' }
            })
          });
          const json = await resp.json();
          const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          let parsed: unknown;
          try { parsed = JSON.parse(text); } catch { parsed = {}; }
          const validated = schema.safeParse(parsed);
          if (!validated.success) {
            throw new Error('Gemini response did not match schema');
          }
          data = validated.data;
        }
      } catch (e) {
        throw e;
      }
    }

    // Normalize shape to ensure prediction.related_records exists
    // and place any upstream references into related_records.
    const normalized = normalizeToEnvelope(data);

    return NextResponse.json(normalized);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const isConnErr = message.includes('fetch') || message.includes('ECONNREFUSED');
    const friendly = isConnErr
      ? 'Connection failed: Unable to reach AI backend. Please check if the server is running on http://127.0.0.1:7860'
      : 'Internal server error';
    console.error('Error in predict API:', error);
    return NextResponse.json(
      { error: friendly },
      { status: 500 }
    );
  }
}
