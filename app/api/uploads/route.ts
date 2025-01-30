import type { NextRequest } from 'next/server';
export async function POST(request: NextRequest) {
  const url = request.nextUrl;
  console.log('url', url);
}
