import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PHONE_DISPLAY } from '../constants';
import Reveal from './Reveal';

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const linkClass =
    'link-underline transition-colors hover:text-accent-600 dark:hover:text-accent-400';

  return (
    <footer className="mt-auto border-t border-slate-200 bg-brand-50 text-brand-900 dark:border-white/10 dark:bg-ink dark:text-white">
      <Reveal variant="fade">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
              {t('brand.name')} <span className="text-accent-500">{t('brand.suffix')}</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-white/70">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-2">
            <div>
              <h3 className="font-display text-base font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 sm:text-lg">
                {t('footer.quickLinks')}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-white/75">
                <li>
                  <Link to="/" className={linkClass}>
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/#hizmetler" className={linkClass}>
                    {t('home.servicesTitle')}
                  </Link>
                </li>
                <li>
                  <Link to="/hakkimizda" className={linkClass}>
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link to="/iletisim" className={linkClass}>
                    {t('nav.contact')}
                  </Link>
                </li>
                <li>
                  <Link to="/#komple-tasimacilik" className={linkClass}>
                    {t('home.services.ftl.title')}
                  </Link>
                </li>
                <li>
                  <Link to="/#parsiyel-tasimacilik" className={linkClass}>
                    {t('home.services.ltl.title')}
                  </Link>
                </li>
                <li>
                  <Link to="/#sehirlerarasi-tasimacilik" className={linkClass}>
                    {t('home.services.intercity.title')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-base font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 sm:text-lg">
                {t('footer.contact')}
              </h3>
              <ul className="mt-3 space-y-2 break-words text-sm text-slate-600 dark:text-white/75">
                <li>
                  {t('footer.phone')}: {PHONE_DISPLAY}
                </li>
                <li>{t('contact.cards.address.text')}</li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-slate-200 dark:border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-500 dark:text-white/45 sm:px-6">
          © {year} {t('brand.legal')} {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
