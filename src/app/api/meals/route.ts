import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { meals } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq, desc, and, gte, lte } from "drizzle-orm";

const GENERIC_500 = { error: "Something went wrong. Please try again." };

/** Parse a numeric field with min/max bounds; returns null if invalid */
function parseBounded(val: unknown, min: number, max: number): number | null {
  if (val === undefined || val === null || val === "") return null;
  const n = typeof val === "number" ? val : parseInt(String(val), 10);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  let query = db.select().from(meals)
    .where(eq(meals.userId, user.id))
    .orderBy(desc(meals.createdAt));

  if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const startOfDay = new Date(dateStr);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateStr);
    endOfDay.setHours(23, 59, 59, 999);
    query = db.select().from(meals).where(
      and(eq(meals.userId, user.id), gte(meals.createdAt, startOfDay), lte(meals.createdAt, endOfDay))
    ).orderBy(desc(meals.createdAt));
  }

  try {
    return NextResponse.json(await query);
  } catch (error) {
    console.error("[meals GET]", error);
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

    const { foodName, calories, protein, carbs, fat, mealType, imageUrl } =
      body as Record<string, unknown>;

    if (!foodName || typeof foodName !== "string" || !foodName.trim()) {
      return NextResponse.json({ error: "Missing required field: foodName." }, { status: 400 });
    }

    const parsedCalories = parseBounded(calories, 0, 20_000);
    if (parsedCalories === null) {
      return NextResponse.json({ error: "Calories must be a number between 0 and 20,000." }, { status: 400 });
    }

    const VALID_MEAL_TYPES = new Set(["breakfast", "lunch", "dinner", "snack", "other"]);
    const safeMealType = typeof mealType === "string" && VALID_MEAL_TYPES.has(mealType) ? mealType : "other";
    const safeImageUrl = typeof imageUrl === "string" && imageUrl.startsWith("https://") ? imageUrl.slice(0, 2048) : null;

    const newMeal = await db.insert(meals).values({
      id: crypto.randomUUID(),
      userId: user.id,
      foodName: foodName.trim().slice(0, 200),
      calories: parsedCalories,
      protein: parseBounded(protein, 0, 1_000),
      carbs: parseBounded(carbs, 0, 2_000),
      fat: parseBounded(fat, 0, 1_000),
      mealType: safeMealType,
      imageUrl: safeImageUrl,
    }).returning();

    return NextResponse.json(newMeal[0]);
  } catch (error) {
    console.error("[meals POST]", error);
    return NextResponse.json(GENERIC_500, { status: 500 });
  }
}
