import { NextResponse } from 'next/server';
import { MYCALAGENT_ORIGIN, WEBMCP_TOOLS } from '@/lib/webmcp';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(
    {
      schemaVersion: '1.0',
      name: 'MyCalAgent WebMCP',
      host: 'www.mycalagent.com',
      url: MYCALAGENT_ORIGIN,
      description:
        'Read-only and navigational WebMCP tools for discovering MyCalAgent features, public trust pages, app links, and macro calculator estimates.',
      publisher: {
        name: 'MyCalAgent',
        contact: 'support@mycalagent.com',
      },
      type: 'live',
      apiSurface: 'spec',
      tools: WEBMCP_TOOLS.map((tool) => ({
        ...tool,
        impl: 'imperative',
        page: '/',
      })),
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=86400',
      },
    }
  );
}
