import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-ink">
      <Seo
        title={t('seo.notFound.title')}
        description={t('seo.notFound.description')}
        path="/404"
        noindex
      />
      <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-brand-900 dark:text-white sm:text-4xl">
          {t('notFound.title')}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          {t('notFound.text')}
        </p>
        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-brand-900 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-brand-800 dark:bg-accent-500 dark:text-ink dark:hover:bg-accent-600"
          >
            {t('notFound.home')}
          </Link>
          <Link
            to="/iletisim"
            className="inline-flex items-center justify-center border border-brand-300 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-800 transition hover:border-brand-500 dark:border-white/25 dark:text-white dark:hover:border-accent-400"
          >
            {t('notFound.contact')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
