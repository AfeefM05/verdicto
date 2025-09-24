import { NextRequest, NextResponse } from 'next/server';

const RAG_URL = 'https://rivalcoder-legal-assistant.hf.space/query';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userQuery: string | undefined = body?.query;

    if (!userQuery || typeof userQuery !== 'string') {
      return NextResponse.json(
        { error: 'Field "query" (string) is required' },
        { status: 400 }
      );
    }

    const upstreamResponse = await fetch(RAG_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userQuery }),
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
      ? 'Connection failed: Unable to reach the assistant service. Please check your internet connection.'
      : 'Internal server error';
    console.error('Error in assistant API:', error);
    return NextResponse.json(
      { error: friendly },
      { status: 500 }
    );
  }
}


