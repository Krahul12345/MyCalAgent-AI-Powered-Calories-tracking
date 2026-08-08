import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { wellnessLogs } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import { crypto } from "next/dist/compiled/@edge-runtime/primitives";

const GENERIC_500 = { error: "Something went wrong. Please try again." };

const VALID_TYPES = new Set(["water", "caffeine", "alcohol", "sleep", "steps", "weight", "mood", "other"]);
const VALID_UNITS = new Set(["ml", "oz", "mg", "g", "kg", "lbs", "hours", "count", "kcal", "steps"]);

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const dateStr = searchParams.get("date");

  const conditions: ReturnType<typeof eq>[] = [eq(wellnessLogs.userId, user.id)];

  // Only allow known log types to prevent DB enumeration
  if (type) {
    if (!VALID_TYPES.has(type)) {
      return NextResponse.json({ error: "Invalid type." }, { status: 400 });
    }
    conditions.push(eq(wellnessLogs.type, type));
  }

  if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const startOfDay = new Date(dateStr);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateStr);
    endOfDay.setHours(23, 59, 59, 999);
    conditions.push(gte(wellnessLogs.createdAt, startOfDay));
    conditions.push(lte(wellnessLogs.createdAt, endOfDay));
  }

  try {
    const logs = await db.select().from(wellnessLogs)
      .where(and(...conditions))
      .orderBy(desc(wellnessLogs.createdAt));
    return NextResponse.json(logs);
  } catch (error) {
    console.error("[wellness-logs GET]", error);
    return NextResponse.json(GENERIC_500, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { type, value, unit } = body as Record<string, unknown>;

    if (!type || !VALID_TYPES.has(String(type))) {
      return NextResponse.json({ error: "Invalid or missing type." }, { status: 400 });
    }
    if (value === undefined || value === null) {
      return NextResponse.json({ error: "Missing required field: value." }, { status: 400 });
    }
    if (!unit || !VALID_UNITS.has(String(unit))) {
      return NextResponse.json({ error: "Invalid or missing unit." }, { status: 400 });
    }

    // Bounds-check numeric value (0–99,999)
    const numericValue = parseFloat(String(value));
    if (!Number.isFinite(numericValue) || numericValue < 0 || numericValue > 99_999) {
      return NextResponse.json({ error: "Value must be a number between 0 and 99,999." }, { status: 400 });
    }

    const newLog = await db.insert(wellnessLogs).values({
      id: crypto.randomUUID(),
      userId: user.id,
      type: String(type),
      value: numericValue.toString(),
      unit: String(unit),
    }).returning();

    return NextResponse.json(newLog[0]);
  } catch (error) {
    console.error("[wellness-logs POST]", error);
    return NextResponse.json(GENERIC_500, { status: 500 });
  }
}
