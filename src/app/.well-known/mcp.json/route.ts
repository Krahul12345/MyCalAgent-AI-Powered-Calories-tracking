import { NextResponse } from 'next/server';
import { MYCALAGENT_ORIGIN, WEBMCP_TOOLS } from '@/lib/webmcp';

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(
    {
      name: 'MyCalAgent',
      version: '1.0.0',
      description:
        'Browser-native WebMCP tools for MyCalAgent public site discovery, navigation, and macro target estimates.',
      endpoints: {
        webmcp_manifest: `${MYCALAGENT_ORIGIN}/.well-known/webmcp.json`,
      },
      capabilities: {
        tools: true,
        resources: false,
        prompts: false,
      },
      authentication: {
        type: 'none',
      },
      tools: WEBMCP_TOOLS,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=86400',
      },
    }
  );
}
