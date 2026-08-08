"use server";

import { db } from "@/db";
import { healthProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function saveHealthProfile(data: {
  gender: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  activity: string;
  goal: string;
  unitSystem: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const existing = await db
    .select()
    .from(healthProfiles)
    .where(eq(healthProfiles.userId, userId))
    .get();

  if (existing) {
    await db
      .update(healthProfiles)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(healthProfiles.userId, userId));
  } else {
    await db.insert(healthProfiles).values({
      id: crypto.randomUUID(),
      userId,
      ...data,
      updatedAt: new Date(),
    });
  }

  return { success: true };
}

export async function getHealthProfile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const profile = await db
    .select()
    .from(healthProfiles)
    .where(eq(healthProfiles.userId, session.user.id))
    .get();

  return profile || null;
}

export async function getSurveyResponseByEmail(email: string) {
  const response = await db
    .select()
    .from(surveyResponses)
    .where(eq(surveyResponses.email, email.toLowerCase()))
    .get();
  
  return response || null;
}
