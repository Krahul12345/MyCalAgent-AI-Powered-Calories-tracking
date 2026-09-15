import { MetadataRoute } from 'next'

const privatePaths = ['/api/', '/login', '/register', '/analytics', '/checkout', '/survey', '/prototype/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — allow all, block private routes
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      // Google (search + AI Mode / Gemini)
      { userAgent: 'Googlebot', allow: '/', disallow: privatePaths },
      { userAgent: 'Google-Extended', allow: '/', disallow: privatePaths },
      // OpenAI / ChatGPT / SearchGPT
      { userAgent: 'GPTBot', allow: '/', disallow: privatePaths },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: privatePaths },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: privatePaths },
      // Anthropic / Claude
      { userAgent: 'ClaudeBot', allow: '/', disallow: privatePaths },
      { userAgent: 'Claude-SearchBot', allow: '/', disallow: privatePaths },
      { userAgent: 'Claude-User', allow: '/', disallow: privatePaths },
      { userAgent: 'Anthropic-AI', allow: '/', disallow: privatePaths },
      { userAgent: 'claude-web', allow: '/', disallow: privatePaths },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/', disallow: privatePaths },
      // Microsoft / Bing / Copilot
      { userAgent: 'Bingbot', allow: '/', disallow: privatePaths },
      { userAgent: 'msnbot', allow: '/', disallow: privatePaths },
      // You.com
      { userAgent: 'YouBot', allow: '/', disallow: privatePaths },
      // Meta (Llama / Meta AI)
      { userAgent: 'meta-externalagent', allow: '/', disallow: privatePaths },
      { userAgent: 'meta-externalfetcher', allow: '/', disallow: privatePaths },
      // Cohere (Command R)
      { userAgent: 'cohere-ai', allow: '/', disallow: privatePaths },
      // Apple / Siri
      { userAgent: 'Applebot', allow: '/', disallow: privatePaths },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: privatePaths },
      // Amazon / Alexa AI
      { userAgent: 'Amazonbot', allow: '/', disallow: privatePaths },
      // Diffbot (knowledge graphs / AI training)
      { userAgent: 'Diffbot', allow: '/', disallow: privatePaths },
      // Common SEO crawlers
      { userAgent: 'Slurp', allow: '/', disallow: privatePaths },
      { userAgent: 'DuckDuckBot', allow: '/', disallow: privatePaths },
    ],
    sitemap: 'https://www.mycalagent.com/sitemap.xml',
    host: 'https://www.mycalagent.com',
  }
}
