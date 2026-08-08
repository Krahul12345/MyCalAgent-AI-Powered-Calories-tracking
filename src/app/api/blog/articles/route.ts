import { NextResponse } from "next/server";
import { getPublishedArticles } from "@/lib/sheets";

// Revalidate every 5 minutes in production
export const revalidate = 300;

export async function GET() {
  try {
    const articles = await getPublishedArticles();
    return NextResponse.json({ articles }, { status: 200 });
  } catch {
    return NextResponse.json({ articles: [], error: "Failed to load articles" }, { status: 200 });
  }
}
