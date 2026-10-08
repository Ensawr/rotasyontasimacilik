export const WHATSAPP_NUMBER = '+905476827966';
export const PHONE_DISPLAY = '0547 682 7966';

export const COMPANY_NAME = 'Rotasyon Taşımacılık';
export const COMPANY_LEGAL_NAME =
  'Rotasyon Taşımacılık Ve Lojistik Hizmetleri Ltd. Şti.';

export const ADDRESS_STREET =
  '15 Temmuz Mahallesi İsmet Yılmaz Caddesi B2A-4 Blok No:19';
export const ADDRESS_LOCALITY = 'Esenler';
export const ADDRESS_REGION = 'İstanbul';
export const ADDRESS_COUNTRY = 'TR';
export const ADDRESS_FULL =
  '15 Temmuz Mahallesi İsmet Yılmaz Caddesi B2A-4 Blok No:19 Esenler/İstanbul';

/** Canlı domain: .env içinde REACT_APP_SITE_URL=https://alanadiniz.com */
export const SITE_URL = (process.env.REACT_APP_SITE_URL || '').replace(/\/$/, '');

export function getSiteUrl() {
  if (SITE_URL) return SITE_URL;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}

export function absoluteUrl(path = '/') {
  const base = getSiteUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${normalized === '/' ? '/' : normalized}` : normalized;
}
