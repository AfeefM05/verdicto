import { NextRequest, NextResponse } from 'next/server';

const HF_ANALYZE_URL = 'https://rivalcoder-smart-contract-analyzer.hf.space/analyze/';

export async function POST(request: NextRequest) {
  try {
    const incomingFormData = await request.formData();
    const file = incomingFormData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const forwardFormData = new FormData();
    forwardFormData.append('file', file, (file as File).name);

    const upstreamResponse = await fetch(HF_ANALYZE_URL, {
      method: 'POST',
      body: forwardFormData,
    });

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text();
      return NextResponse.json(
        { error: `Upstream error: ${upstreamResponse.status} ${errorText}` },
        { status: upstreamResponse.status }
      );
    }

    const data = await upstreamResponse.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const isConnErr = message.includes('fetch') || message.includes('Failed to fetch') || message.includes('ECONNREFUSED');
    const friendly = isConnErr
      ? 'Connection failed: Unable to reach the contract analysis service. Please check your internet connection.'
      : 'Internal server error';
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      { error: friendly },
      { status: 500 }
    );
  }
}
