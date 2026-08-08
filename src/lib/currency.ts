/**
 * Global currency utility
 * Supports: USD, EUR, GBP, INR, AUD, CAD, SGD, AED, MYR, PHP
 */

export type SupportedCurrency = 'usd' | 'eur' | 'gbp' | 'inr' | 'aud' | 'cad' | 'sgd' | 'aed' | 'myr' | 'php';

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  usd: '$',
  eur: '€',
  gbp: '£',
  inr: '₹',
  aud: 'A$',
  cad: 'C$',
  sgd: 'S$',
  aed: 'AED',
  myr: 'RM',
  php: '₱',
};

export const CURRENCY_LOCALES: Record<SupportedCurrency, string> = {
  usd: 'en-US',
  eur: 'de-DE',
  gbp: 'en-GB',
  inr: 'en-IN',
  aud: 'en-AU',
  cad: 'en-CA',
  sgd: 'en-SG',
  aed: 'ar-AE',
  myr: 'ms-MY',
  php: 'fil-PH',
};

/** Country code → default currency */
export const COUNTRY_CURRENCY_MAP: Record<string, SupportedCurrency> = {
  US: 'usd', CA: 'cad', GB: 'gbp',
  AU: 'aud', NZ: 'aud',
  IN: 'inr',
  DE: 'eur', FR: 'eur', IT: 'eur', ES: 'eur', NL: 'eur',
  PT: 'eur', AT: 'eur', BE: 'eur', IE: 'eur', FI: 'eur',
  GR: 'eur', SK: 'eur', SI: 'eur', EE: 'eur', LV: 'eur',
  LT: 'eur', LU: 'eur', MT: 'eur', CY: 'eur',
  SG: 'sgd',
  AE: 'aed',
  MY: 'myr',
  PH: 'php',
};

/**
 * Format a numeric amount in the given currency using Intl.NumberFormat.
 * Falls back gracefully on unsupported locales.
 */
export function formatCurrency(
  amount: number,
  currency: SupportedCurrency = 'usd',
): string {
  try {
    return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${CURRENCY_SYMBOLS[currency]}${amount.toFixed(2)}`;
  }
}

/** Detect currency from a country code string (ISO 3166-1 alpha-2). */
export function currencyFromCountry(countryCode: string): SupportedCurrency {
  return COUNTRY_CURRENCY_MAP[countryCode?.toUpperCase()] ?? 'usd';
}
