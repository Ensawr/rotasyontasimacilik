import {
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  ADDRESS_STREET,
  COMPANY_LEGAL_NAME,
  COMPANY_NAME,
  WHATSAPP_NUMBER,
  absoluteUrl,
  getSiteUrl,
} from '../constants';

function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: COMPANY_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: `${siteUrl}/`,
    telephone: WHATSAPP_NUMBER,
    image: absoluteUrl('/logo512.png'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo512.png'),
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS_STREET,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Türkiye',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: WHATSAPP_NUMBER,
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish', 'English'],
      },
    ],
    description:
      'Rotasyon Taşımacılık; nakliye, taşımacılık ve lojistik hizmetleri sunar.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebPageJsonLd({ name, description, path }) {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@type': 'WebSite',
      name: COMPANY_NAME,
      url: `${siteUrl}/`,
    },
    about: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: ['tr', 'en'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default OrganizationJsonLd;
