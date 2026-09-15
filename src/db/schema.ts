import { pgTable, serial, text, boolean, timestamp, integer, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const trialSignups = pgTable('trial_signups', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  source: text('source').notNull().default('weekly-insights'),
  consentAt: timestamp('consent_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  unsubscribedAt: timestamp('unsubscribed_at'),
});

export const healthProfiles = pgTable('health_profiles', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  gender: text('gender').notNull(),
  age: integer('age').notNull(),
  weight: integer('weight').notNull(),
  height: integer('height').notNull(),
  activity: text('activity').notNull(),
  goal: text('goal').notNull(),
  unitSystem: text('unit_system').notNull().default('metric'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  stripePriceId: text('stripe_price_id').notNull(),
  plan: text('plan').notNull(),
  status: text('status').notNull(),
  billingInterval: text('billing_interval').notNull(),
  currency: text('currency').notNull(),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  trialEnd: timestamp('trial_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const surveyResponses = pgTable('survey_responses', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  primaryGoal: text('primary_goal'),
  primaryGoalOther: text('primary_goal_other'),
  targetTimeline: text('target_timeline'),
  struggles: text('struggles'),
  frustrations: text('frustrations'),
  aiHelpfulnessRatings: text('ai_helpfulness_ratings'),
  appExpectation: text('app_expectation'),
  earlyAccess: text('early_access'),
  additionalSuggestions: text('additional_suggestions'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const meals = pgTable('meals', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  foodName: text('food_name').notNull(),
  calories: integer('calories').notNull(),
  protein: integer('protein'),
  carbs: integer('carbs'),
  fat: integer('fat'),
  mealType: text('meal_type').notNull().default('other'), // breakfast, lunch, dinner, snack
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const wellnessLogs = pgTable('wellness_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // water, caffeine, alcohol, fasting
  value: text('value').notNull(), // e.g., "500" for water (ml), "8" for fasting (hours)
  unit: text('unit').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
// ─────────────────────────────────────────────────────────────
//  policy_documents
//  Source-of-truth registry for Terms / Privacy policy versions.
//  API: /api/policy-versions
//  Frontend: CookieConsent.tsx compares localStorage policyVersion
//            against effective active version → triggers re-consent.
//  Write: service_role only. Read: public anon (RLS).
// ─────────────────────────────────────────────────────────────
export const policyDocuments = pgTable('policy_documents', {
  id:                uuid('id').primaryKey().defaultRandom(),
  policyType:        text('policy_type').notNull(),
  version:           text('version').notNull(),
  title:             text('title').notNull(),
  url:               text('url').notNull(),
  contentHash:       text('content_hash'),
  publishedAt:       timestamp('published_at').defaultNow().notNull(),
  // Legally enforceable from this date — query enforces: effective_at <= now()
  effectiveAt:       timestamp('effective_at'),
  isActive:          boolean('is_active').notNull().default(false),
  isDeleted:         boolean('is_deleted').notNull().default(false),
  requiresReconsent: boolean('requires_reconsent').notNull().default(false),
  changeSummary:     text('change_summary'),
  createdBy:         text('created_by'),
  createdAt:         timestamp('created_at').defaultNow().notNull(),
  updatedAt:         timestamp('updated_at').defaultNow().notNull(),
});

export type PolicyDocument = typeof policyDocuments.$inferSelect;
export type PolicyType = 'terms' | 'privacy';
