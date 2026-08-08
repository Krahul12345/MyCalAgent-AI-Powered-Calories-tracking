import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — allow all, block private routes
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/login', '/register', '/analytics', '/checkout', '/survey'],
      },
      // Google (search + AI Mode / Gemini)
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      // OpenAI / ChatGPT / SearchGPT
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      // Anthropic / Claude
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'Anthropic-AI', allow: '/' },
      { userAgent: 'claude-web', allow: '/' },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      // Microsoft / Bing / Copilot
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'msnbot', allow: '/' },
      // You.com
      { userAgent: 'YouBot', allow: '/' },
      // Meta (Llama / Meta AI)
      { userAgent: 'meta-externalagent', allow: '/' },
      { userAgent: 'meta-externalfetcher', allow: '/' },
      // Cohere (Command R)
      { userAgent: 'cohere-ai', allow: '/' },
      // Apple / Siri
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      // Amazon / Alexa AI
      { userAgent: 'Amazonbot', allow: '/' },
      // Diffbot (knowledge graphs / AI training)
      { userAgent: 'Diffbot', allow: '/' },
      // Common SEO crawlers
      { userAgent: 'Slurp', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
    ],
    sitemap: 'https://www.mycalagent.com/sitemap.xml',
    host: 'https://www.mycalagent.com',
  }
}
