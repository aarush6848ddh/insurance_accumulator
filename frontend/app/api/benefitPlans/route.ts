import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = url.searchParams;

  const backendUrl = new URL(`${API_BASE}/benefitPlans`);
  // Pass through query params
  params.forEach((value, key) => backendUrl.searchParams.append(key, value));

  try {
    const res = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      // No credentials to avoid CORS complications
    });

    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    const body = contentType.includes('application/json') ? JSON.parse(text) : text;

    return NextResponse.json(body, {
      status: res.status,
    });
  } catch (e: any) {
    return NextResponse.json(
      { status: 'ERROR', code: '500', message: e?.message || 'Proxy request failed' },
      { status: 500 }
    );
  }
}
