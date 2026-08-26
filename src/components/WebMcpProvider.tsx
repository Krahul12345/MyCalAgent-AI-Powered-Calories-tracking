'use client';

import { useEffect } from 'react';
import {
  WEBMCP_PAGES,
  calculateMacroTargets,
  getMyCalAgentOverview,
  searchMyCalAgentPages,
} from '@/lib/webmcp';

type ModelContextTool = {
  name: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  execute: (input?: Record<string, unknown>) => unknown | Promise<unknown>;
};

type ModelContext = {
  registerTool?: (tool: ModelContextTool) => void;
  unregisterTool?: (name: string) => void;
};

declare global {
  interface Document {
    modelContext?: ModelContext;
  }

  interface Navigator {
    modelContext?: ModelContext;
  }
}

function getModelContext() {
  if (typeof document === 'undefined') {
    return undefined;
  }

  return document.modelContext ?? navigator.modelContext;
}

function getString(input: Record<string, unknown> | undefined, key: string) {
  const value = input?.[key];
  return typeof value === 'string' ? value : undefined;
}

function getNumber(input: Record<string, unknown> | undefined, key: string) {
  const value = input?.[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

export default function WebMcpProvider() {
  useEffect(() => {
    const modelContext = getModelContext();

    if (!modelContext?.registerTool) {
      return;
    }

    const tools: ModelContextTool[] = [
      {
        name: 'get_mycalagent_overview',
        description: 'Summarize what MyCalAgent is, who it is for, and the main public links.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          untrustedContentHint: false,
        },
        execute: () => getMyCalAgentOverview(),
      },
      {
        name: 'find_mycalagent_page',
        description: 'Find the best public MyCalAgent page for a topic, feature, support question, or trust document.',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            category: {
              type: 'string',
              enum: ['product', 'tool', 'feature', 'education', 'support', 'trust'],
            },
          },
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          untrustedContentHint: false,
        },
        execute: (input) => searchMyCalAgentPages(getString(input, 'query') ?? '', getString(input, 'category')),
      },
      {
        name: 'calculate_macro_targets',
        description: 'Estimate BMR, TDEE, calories, macros, fiber, and hydration using the MyCalAgent public calculator formula.',
        inputSchema: {
          type: 'object',
          properties: {
            goal: { type: 'string', enum: ['loss', 'maintain', 'gain'] },
            sex: { type: 'string', enum: ['male', 'female'] },
            age: { type: 'number', minimum: 18, maximum: 80 },
            heightCm: { type: 'number', minimum: 120, maximum: 230 },
            weightKg: { type: 'number', minimum: 35, maximum: 250 },
            activityLevel: {
              type: 'string',
              enum: ['sedentary', 'light', 'moderate', 'active', 'veryActive'],
            },
          },
          required: ['age', 'heightCm', 'weightKg'],
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          untrustedContentHint: false,
        },
        execute: (input) => calculateMacroTargets({
          goal: getString(input, 'goal') as 'loss' | 'maintain' | 'gain' | undefined,
          sex: getString(input, 'sex') as 'male' | 'female' | undefined,
          age: getNumber(input, 'age') ?? 30,
          heightCm: getNumber(input, 'heightCm') ?? 170,
          weightKg: getNumber(input, 'weightKg') ?? 70,
          activityLevel: getString(input, 'activityLevel') as 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | undefined,
        }),
      },
      {
        name: 'open_mycalagent_page',
        description: 'Navigate the current browser tab to a public MyCalAgent page.',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string' },
          },
          required: ['path'],
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: false,
          untrustedContentHint: false,
        },
        execute: (input) => {
          const path = getString(input, 'path') ?? '/';
          const page = WEBMCP_PAGES.find((item) => item.path === path) ?? WEBMCP_PAGES.find((item) => item.path === `/${path.replace(/^\/+/, '')}`);

          if (!page) {
            return {
              ok: false,
              message: 'That is not a public MyCalAgent page exposed through WebMCP.',
              availablePages: WEBMCP_PAGES.map((item) => item.path),
            };
          }

          window.location.assign(page.path);

          return {
            ok: true,
            path: page.path,
            title: page.title,
          };
        },
      },
    ];

    tools.forEach((tool) => modelContext.registerTool?.(tool));

    return () => {
      tools.forEach((tool) => modelContext.unregisterTool?.(tool.name));
    };
  }, []);

  return null;
}
