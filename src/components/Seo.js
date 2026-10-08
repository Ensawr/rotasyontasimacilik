import { useTranslation } from 'react-i18next';
import { absoluteUrl, COMPANY_NAME, getSiteUrl } from '../constants';

function Seo({
  title,
  description,
  path = '/',
  image = '/logo512.png',
  noindex = false,
  type = 'website',
}) {
  const { i18n } = useTranslation();
  const siteUrl = getSiteUrl();
  const canonical = absoluteUrl(path);
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image);
  const locale = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en')
    ? 'en_US'
    : 'tr_TR';
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="author" content={COMPANY_NAME} />
      <meta name="application-name" content={COMPANY_NAME} />
      {siteUrl ? <link rel="canonical" href={canonical} /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={locale} />
      {siteUrl ? <meta property="og:url" content={canonical} /> : null}
      {siteUrl ? <meta property="og:image" content={ogImage} /> : null}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {siteUrl ? <meta name="twitter:image" content={ogImage} /> : null}
    </>
  );
}

export default Seo;
