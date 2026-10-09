import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import OrganizationJsonLd, { WebPageJsonLd } from '../components/OrganizationJsonLd';

function About() {
  const { t } = useTranslation();

  const values = [
    { key: 'trust', ...t('about.values.trust', { returnObjects: true }) },
    { key: 'time', ...t('about.values.time', { returnObjects: true }) },
    { key: 'customer', ...t('about.values.customer', { returnObjects: true }) },
    { key: 'growth', ...t('about.values.growth', { returnObjects: true }) },
  ];

  return (
    <div className="bg-white dark:bg-ink">
      <Seo
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        path="/hakkimizda"
      />
      <OrganizationJsonLd />
      <WebPageJsonLd
        name={t('seo.about.title')}
        description={t('seo.about.description')}
        path="/hakkimizda"
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Reveal variant="fade">
          <header className="max-w-3xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 sm:text-sm">
              {t('about.eyebrow')}
            </p>
            <h1 className="section-heading mt-2 font-display text-3xl font-bold uppercase tracking-wide text-brand-900 dark:text-white sm:text-4xl md:text-5xl">
              {t('brand.full')}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {t('about.intro1')}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              {t('about.intro2')}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:gap-5">
              <Link
                to="/#hizmetler"
                className="link-underline text-accent-600 transition hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
              >
                {t('about.ctaServices')}
              </Link>
              <Link
                to="/iletisim"
                className="link-underline text-accent-600 transition hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
              >
                {t('about.ctaContact')}
              </Link>
            </div>
          </header>
        </Reveal>

        <section className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2">
          <Reveal delay={80} variant="left">
            <div className="card-hover h-full border border-brand-100 bg-brand-50 p-5 sm:p-6 dark:border-white/10 dark:bg-ink-raised">
              <div className="accent-bar mb-4 h-1 w-10 bg-accent-500" />
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-brand-800 dark:text-white sm:text-2xl">
                {t('about.visionTitle')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                {t('about.visionText')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={160} variant="right">
            <div className="card-hover h-full border border-brand-100 bg-brand-50 p-5 sm:p-6 dark:border-white/10 dark:bg-ink-raised">
              <div className="accent-bar mb-4 h-1 w-10 bg-accent-500" />
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-brand-800 dark:text-white sm:text-2xl">
                {t('about.missionTitle')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                {t('about.missionText')}
              </p>
            </div>
          </Reveal>
        </section>

        <section className="soft-drift mt-10 border-y border-slate-200 py-10 sm:mt-14 sm:py-12 dark:border-white/10">
          <div className="relative">
            <Reveal>
              <h2 className="section-heading font-display text-xl font-bold uppercase tracking-wide text-brand-800 dark:text-white sm:text-2xl">
                {t('about.valuesTitle')}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                {t('about.valuesText')}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {values.map((item, index) => (
                <Reveal
                  key={item.key}
                  delay={index * 90}
                  variant={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className="card-hover h-full border border-slate-200 bg-white/95 p-5 sm:p-6 dark:border-white/10 dark:bg-ink-raised/95">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 bg-accent-500" aria-hidden />
                      <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-brand-800 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 sm:mt-14">
          <Reveal variant="scale">
            <div className="card-hover border border-brand-100 bg-brand-50 p-5 sm:p-8 dark:border-white/10 dark:bg-ink-raised">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-brand-800 dark:text-white sm:text-2xl">
                {t('about.approachTitle')}
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                {t('about.approachText')}
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}

export default About;
