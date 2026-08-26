export const MYCALAGENT_ORIGIN = 'https://www.mycalagent.com';

export const WEBMCP_PAGES = [
  {
    title: 'Homepage',
    path: '/',
    category: 'product',
    description: 'Overview of MyCalAgent AI wellness intelligence, core benefits, and app download options.',
  },
  {
    title: 'Features',
    path: '/features',
    category: 'product',
    description: 'Full feature list for meal analysis, micronutrients, allergen checks, dietary conflict detection, hydration, fasting, Apple Health, and WHOOP.',
  },
  {
    title: 'Pricing',
    path: '/pricing',
    category: 'product',
    description: 'Free and Pro plan details for MyCalAgent.',
  },
  {
    title: 'Get Started',
    path: '/get-started',
    category: 'product',
    description: 'Onboarding and download path for new users.',
  },
  {
    title: 'How MyCalAgent Works',
    path: '/how-mycalagent-works',
    category: 'product',
    description: 'Step-by-step explanation of how the product turns tracking into wellness insights.',
  },
  {
    title: 'Macro & Calorie Calculator',
    path: '/macro-calorie-calculator',
    category: 'tool',
    description: 'Free BMR, TDEE, calorie, macro, fiber, and hydration calculator using Mifflin-St Jeor.',
  },
  {
    title: 'AI Meal Analysis',
    path: '/features/ai-meal-analysis',
    category: 'feature',
    description: 'How MyCalAgent estimates nutrition from meal photos and packaged product cues.',
  },
  {
    title: 'Food & Mood Tracking',
    path: '/features/food-and-mood',
    category: 'feature',
    description: 'How MyCalAgent helps connect meals with mood, energy, and focus.',
  },
  {
    title: 'Hydration Tracking',
    path: '/features/hydration-tracking',
    category: 'feature',
    description: 'Daily water goal tracking with coffee, tea, juice, and alcohol logged as beverage habit context.',
  },
  {
    title: 'Intermittent Fasting',
    path: '/features/intermittent-fasting',
    category: 'feature',
    description: 'Fasting window tracking with wellness pattern context.',
  },
  {
    title: 'Apple Health Integration',
    path: '/features/apple-health',
    category: 'feature',
    description: 'Apple Health sync for steps, sleep, workouts, nutrition, calories, and water.',
  },
  {
    title: 'Wellness Pattern Recognition',
    path: '/features/wellness-pattern-recognition',
    category: 'feature',
    description: 'AI pattern recognition across meals, hydration, fasting, and habits.',
  },
  {
    title: 'Blog',
    path: '/blog',
    category: 'education',
    description: 'Evidence-based wellness articles from MyCalAgent.',
  },
  {
    title: 'FAQ',
    path: '/faq',
    category: 'support',
    description: 'Common questions about MyCalAgent, plans, AI, and wellness tracking.',
  },
  {
    title: 'About',
    path: '/about',
    category: 'trust',
    description: 'Company information and MyCalAgent mission.',
  },
  {
    title: 'Editorial Policy',
    path: '/editorial-policy',
    category: 'trust',
    description: 'How MyCalAgent creates, reviews, and cites public content.',
  },
  {
    title: 'AI Disclaimer',
    path: '/ai-disclaimer',
    category: 'trust',
    description: 'How AI is used in MyCalAgent and what the product does not claim to do.',
  },
  {
    title: 'Privacy Policy',
    path: '/privacy',
    category: 'trust',
    description: 'Privacy practices for MyCalAgent users and website visitors.',
  },
  {
    title: 'Terms of Service',
    path: '/terms',
    category: 'trust',
    description: 'Terms governing use of MyCalAgent.',
  },
  {
    title: 'Security',
    path: '/security',
    category: 'trust',
    description: 'Security posture and responsible contact information.',
  },
] as const;

export type WebMcpPageCategory = typeof WEBMCP_PAGES[number]['category'];

export type MacroGoal = 'loss' | 'maintain' | 'gain';
export type MacroSex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

export type MacroCalculationInput = {
  goal?: MacroGoal;
  sex?: MacroSex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel?: ActivityLevel;
};

export type MacroCalculationResult = {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  waterLiters: number;
  disclaimer: string;
};

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export function absoluteMyCalAgentUrl(path: string) {
  return new URL(path, MYCALAGENT_ORIGIN).toString();
}

export function searchMyCalAgentPages(query = '', category?: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCategory = category?.trim().toLowerCase();

  return WEBMCP_PAGES.filter((page) => {
    const categoryMatches = !normalizedCategory || page.category === normalizedCategory;
    const queryMatches =
      !normalizedQuery ||
      page.title.toLowerCase().includes(normalizedQuery) ||
      page.path.toLowerCase().includes(normalizedQuery) ||
      page.description.toLowerCase().includes(normalizedQuery);

    return categoryMatches && queryMatches;
  }).map((page) => ({
    ...page,
    url: absoluteMyCalAgentUrl(page.path),
  }));
}

export function calculateMacroTargets(input: MacroCalculationInput): MacroCalculationResult {
  const goal = input.goal ?? 'maintain';
  const sex = input.sex ?? 'female';
  const activityLevel = input.activityLevel ?? 'sedentary';
  const age = Math.max(18, Math.min(80, Math.round(input.age)));
  const heightCm = Math.max(120, Math.min(230, input.heightCm));
  const weightKg = Math.max(35, Math.min(250, input.weightKg));
  const bmr = Math.round(
    sex === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  );
  const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
  const targetCalories = goal === 'loss' ? tdee - 500 : goal === 'gain' ? tdee + 300 : tdee;

  return {
    bmr,
    tdee,
    targetCalories,
    proteinGrams: Math.round((targetCalories * 0.3) / 4),
    carbsGrams: Math.round((targetCalories * 0.4) / 4),
    fatGrams: Math.round((targetCalories * 0.3) / 9),
    fiberGrams: Math.round(weightKg * 0.29),
    waterLiters: Math.round(weightKg * 0.033 * 100) / 100,
    disclaimer: 'Estimates are for general wellness planning only and are not medical advice.',
  };
}

export const WEBMCP_TOOLS = [
  {
    name: 'get_mycalagent_overview',
    kind: 'answer',
    description: 'Summarize what MyCalAgent is, who it is for, and the main public links.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'find_mycalagent_page',
    kind: 'answer',
    description: 'Find the best public MyCalAgent page for a topic, feature, support question, or trust document.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Topic to search for, such as pricing, hydration, AI meal analysis, privacy, or calculator.',
        },
        category: {
          type: 'string',
          enum: ['product', 'tool', 'feature', 'education', 'support', 'trust'],
          description: 'Optional page category filter.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'calculate_macro_targets',
    kind: 'answer',
    description: 'Estimate BMR, TDEE, calories, macros, fiber, and hydration using the MyCalAgent public calculator formula.',
    inputSchema: {
      type: 'object',
      properties: {
        goal: {
          type: 'string',
          enum: ['loss', 'maintain', 'gain'],
          description: 'User goal.',
        },
        sex: {
          type: 'string',
          enum: ['male', 'female'],
          description: 'Biological sex value used by the Mifflin-St Jeor equation.',
        },
        age: {
          type: 'number',
          minimum: 18,
          maximum: 80,
          description: 'Age in years.',
        },
        heightCm: {
          type: 'number',
          minimum: 120,
          maximum: 230,
          description: 'Height in centimeters.',
        },
        weightKg: {
          type: 'number',
          minimum: 35,
          maximum: 250,
          description: 'Weight in kilograms.',
        },
        activityLevel: {
          type: 'string',
          enum: ['sedentary', 'light', 'moderate', 'active', 'veryActive'],
          description: 'General daily activity level.',
        },
      },
      required: ['age', 'heightCm', 'weightKg'],
      additionalProperties: false,
    },
  },
  {
    name: 'open_mycalagent_page',
    kind: 'act',
    description: 'Navigate the current browser tab to a public MyCalAgent page.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Public path to open, such as /pricing, /features/ai-meal-analysis, or /macro-calorie-calculator.',
        },
      },
      required: ['path'],
      additionalProperties: false,
    },
  },
] as const;

export function getMyCalAgentOverview() {
  return {
    name: 'MyCalAgent',
    description:
      'MyCalAgent is an AI wellness intelligence app for iOS and Android that helps users understand patterns across meals, hydration, fasting, and daily habits.',
    category: 'Health & Fitness',
    pricing: 'Free plan available with 15 meal scans per day. Pro starts at $6.99/month or $69.99/year and includes unlimited scans, unlimited history, and 4 Wellness Reports per month.',
    appStore: 'https://apps.apple.com/us/app/mycalagent/id6759270828',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.mycalagent.app',
    support: 'support@mycalagent.com',
    keyPages: searchMyCalAgentPages('', 'product'),
  };
}
