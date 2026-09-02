import { NextResponse } from "next/server";
import { getBlogCmsDiagnostics, getPublishedArticles } from "@/lib/sheets";

// Revalidate every 5 minutes in production
export const revalidate = 300;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const articles = await getPublishedArticles();
    return NextResponse.json({ articles, cms: getBlogCmsDiagnostics() }, { status: 200 });
  } catch {
    return NextResponse.json(
      { articles: [], cms: getBlogCmsDiagnostics(), error: "Failed to load articles" },
      { status: 200 }
    );
  }
}
