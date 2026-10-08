import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import OrganizationJsonLd, { WebPageJsonLd } from '../components/OrganizationJsonLd';

const SERVICE_ANCHORS = {
  ftl: 'komple-tasimacilik',
  ltl: 'parsiyel-tasimacilik',
  project: 'proje-lojistigi',
  intercity: 'sehirlerarasi-tasimacilik',
};

const HERO_MOTES = [
  { x: 7, y: 12, size: 3, tone: 'teal', delay: 0 },
  { x: 15, y: 26, size: 2, tone: 'brand', delay: 0.8 },
  { x: 24, y: 10, size: 4, tone: 'accent', delay: 1.6 },
  { x: 33, y: 22, size: 2, tone: 'teal', delay: 2.4 },
  { x: 42, y: 8, size: 3, tone: 'brand', delay: 0.4 },
  { x: 51, y: 20, size: 2, tone: 'accent', delay: 3.2 },
  { x: 61, y: 14, size: 4, tone: 'teal', delay: 1.2 },
  { x: 72, y: 9, size: 2, tone: 'brand', delay: 2.0 },
  { x: 83, y: 18, size: 3, tone: 'accent', delay: 3.6 },
  { x: 92, y: 28, size: 2, tone: 'teal', delay: 0.6 },
  { x: 10, y: 38, size: 3, tone: 'accent', delay: 1.8 },
  { x: 21, y: 48, size: 2, tone: 'teal', delay: 2.8 },
  { x: 32, y: 36, size: 4, tone: 'brand', delay: 0.2 },
  { x: 44, y: 46, size: 2, tone: 'teal', delay: 3.8 },
  { x: 55, y: 34, size: 3, tone: 'accent', delay: 1.0 },
  { x: 66, y: 44, size: 2, tone: 'brand', delay: 2.2 },
  { x: 77, y: 38, size: 4, tone: 'teal', delay: 3.0 },
  { x: 88, y: 50, size: 2, tone: 'accent', delay: 0.9 },
  { x: 5, y: 60, size: 3, tone: 'brand', delay: 2.6 },
  { x: 17, y: 70, size: 2, tone: 'accent', delay: 1.4 },
  { x: 29, y: 62, size: 3, tone: 'teal', delay: 3.4 },
  { x: 40, y: 74, size: 2, tone: 'brand', delay: 0.5 },
  { x: 52, y: 64, size: 4, tone: 'accent', delay: 1.9 },
  { x: 64, y: 76, size: 2, tone: 'teal', delay: 2.7 },
  { x: 75, y: 66, size: 3, tone: 'brand', delay: 3.9 },
  { x: 86, y: 78, size: 2, tone: 'accent', delay: 1.1 },
  { x: 12, y: 86, size: 3, tone: 'teal', delay: 2.1 },
  { x: 26, y: 90, size: 2, tone: 'accent', delay: 0.7 },
  { x: 48, y: 84, size: 3, tone: 'brand', delay: 3.1 },
  { x: 68, y: 88, size: 2, tone: 'teal', delay: 1.5 },
  { x: 90, y: 86, size: 4, tone: 'accent', delay: 2.9 },
  { x: 37, y: 54, size: 2, tone: 'brand', delay: 4.0 },
  { x: 58, y: 56, size: 3, tone: 'teal', delay: 0.3 },
  { x: 79, y: 24, size: 2, tone: 'accent', delay: 2.5 },
  { x: 46, y: 28, size: 2, tone: 'teal', delay: 3.7 },
];

function getMoteRepel(pointer, mote, active) {
  if (!active) return { dx: 0, dy: 0 };

  const dx = mote.x - pointer.x;
  const dy = mote.y - pointer.y;
  const dist = Math.hypot(dx, dy) || 0.001;
  const radius = 14;
  if (dist >= radius) return { dx: 0, dy: 0 };

  const force = (1 - dist / radius) ** 1.6 * 4.5;
  return {
    dx: (dx / dist) * force,
    dy: (dy / dist) * force,
  };
}

function Home() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const [pointer, setPointer] = useState({ x: -100, y: -100, active: false });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const handleHeroMove = (event) => {
    if (reduceMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const handleHeroLeave = () => {
    setPointer({ x: -100, y: -100, active: false });
  };

  const reasons = [
    { key: 'timely', ...t('home.reasons.timely', { returnObjects: true }) },
    { key: 'safe', ...t('home.reasons.safe', { returnObjects: true }) },
    { key: 'flexible', ...t('home.reasons.flexible', { returnObjects: true }) },
  ];

  const services = [
    { key: 'ftl', ...t('home.services.ftl', { returnObjects: true }) },
    { key: 'ltl', ...t('home.services.ltl', { returnObjects: true }) },
    { key: 'project', ...t('home.services.project', { returnObjects: true }) },
    { key: 'intercity', ...t('home.services.intercity', { returnObjects: true }) },
  ];

  const steps = [
    { step: '01', ...t('home.steps.01', { returnObjects: true }) },
    { step: '02', ...t('home.steps.02', { returnObjects: true }) },
    { step: '03', ...t('home.steps.03', { returnObjects: true }) },
    { step: '04', ...t('home.steps.04', { returnObjects: true }) },
  ];

  return (
    <div>
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        path="/"
      />
      <OrganizationJsonLd />
      <WebPageJsonLd
        name={t('seo.home.title')}
        description={t('seo.home.description')}
        path="/"
      />

      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-teal-500/10 text-brand-900 dark:from-ink dark:via-ink-soft dark:to-ink dark:text-white"
        onMouseMove={handleHeroMove}
        onMouseLeave={handleHeroLeave}
      >
        <div className="hero-atmosphere pointer-events-none absolute inset-0" aria-hidden="true">
          {HERO_MOTES.map((mote, index) => {
            const { dx, dy } = getMoteRepel(pointer, mote, pointer.active && !reduceMotion);
            return (
              <span
                key={`${mote.tone}-${index}`}
                className="hero-mote-track"
                style={{
                  left: `calc(${mote.x}% + ${dx}%)`,
                  top: `calc(${mote.y}% + ${dy}%)`,
                }}
              >
                <span
                  className={`hero-mote hero-mote-${mote.tone}`}
                  style={{
                    width: `${mote.size}px`,
                    height: `${mote.size}px`,
                    animationDelay: `${mote.delay}s`,
                  }}
                />
              </span>
            );
          })}
        </div>

        <div className="relative mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-center px-4 py-14 sm:min-h-[72vh] sm:px-6 sm:py-20">
          <h1
            className="hero-animate font-display text-4xl font-bold uppercase leading-[0.95] tracking-wide xs:text-5xl sm:text-6xl md:text-7xl"
            style={{ animationDelay: '0.05s' }}
          >
            {t('brand.name')} <span className="text-accent-500">{t('brand.suffix')}</span>
          </h1>
          <div
            className="hero-line mt-4 h-0.5 w-20 bg-accent-500 opacity-0 sm:w-28"
            aria-hidden
          />
          <p
            className="hero-animate mt-5 max-w-2xl font-display text-xl font-semibold uppercase tracking-wide text-brand-800 dark:text-white/90 sm:mt-6 sm:text-2xl md:text-3xl"
            style={{ animationDelay: '0.22s' }}
          >
            {t('home.heroTitle')}
          </p>
          <p
            className="hero-animate mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-white/65 sm:mt-4 sm:text-base md:text-lg"
            style={{ animationDelay: '0.38s' }}
          >
            {t('home.heroText')}
          </p>
          <div
            className="hero-animate mt-7 flex w-full flex-col gap-3 xs:flex-row xs:flex-wrap sm:mt-8 sm:gap-4"
            style={{ animationDelay: '0.55s' }}
          >
            <Link
              to="/hakkimizda"
              className="inline-flex items-center justify-center border border-brand-300 bg-white/80 px-6 py-3 font-display text-base font-semibold uppercase tracking-wider text-brand-800 transition hover:border-brand-500 hover:text-brand-700 dark:border-white/25 dark:bg-white/5 dark:text-white dark:hover:border-accent-400 dark:hover:text-accent-400 sm:text-lg"
            >
              {t('home.ctaAbout')}
            </Link>
            <Link
              to="/iletisim#teklif-formu"
              className="inline-flex items-center justify-center gap-2 bg-accent-500 px-6 py-3 font-display text-base font-semibold uppercase tracking-wider text-white transition hover:bg-accent-600 sm:text-lg"
            >
              <span className="inline-flex size-5 shrink-0 items-center justify-center">
                <FontAwesomeIcon icon={faWhatsapp} className="h-full w-full" aria-hidden />
              </span>
              <span>{t('home.ctaQuote')}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-brand-50 dark:border-white/5 dark:bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-900 dark:text-white sm:text-3xl md:text-4xl">
              {t('home.whyTitle')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              {t('home.whyText')}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {reasons.map((item, index) => (
              <Reveal key={item.key} delay={index * 100}>
                <div className="card-hover h-full border border-brand-100 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-ink-raised">
                  <div className="mb-4 h-1 w-10 bg-accent-500" />
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-brand-800 dark:text-slate-100 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="hizmetler"
        className="scroll-mt-28 border-t border-brand-100 bg-brand-50 dark:border-white/5 dark:bg-ink sm:scroll-mt-32"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-900 dark:text-white sm:text-3xl md:text-4xl">
              {t('home.servicesTitle')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              {t('home.servicesText')}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:gap-6">
            {services.map((item, index) => (
              <Reveal key={item.key} delay={(index % 2) * 120}>
                <article
                  id={SERVICE_ANCHORS[item.key]}
                  className="card-hover h-full scroll-mt-28 border border-brand-100 bg-white p-5 sm:scroll-mt-32 sm:p-6 dark:border-white/10 dark:bg-ink-raised"
                >
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-brand-800 dark:text-white sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.text}
                  </p>
                  <Link
                    to="/iletisim#teklif-formu"
                    className="mt-4 inline-flex text-sm font-semibold text-accent-600 transition hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
                  >
                    {t('home.servicesCta')}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-brand-50 dark:border-white/5 dark:bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-900 dark:text-white sm:text-3xl md:text-4xl">
              {t('home.processTitle')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              {t('home.processText')}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <Reveal key={item.step} delay={index * 90}>
                <div className="card-hover h-full border border-brand-100 bg-white p-5 dark:border-white/10 dark:bg-ink-raised">
                  <p className="font-display text-3xl font-bold text-accent-500">{item.step}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide text-brand-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-100 bg-brand-900 text-white dark:border-white/5 dark:bg-ink-soft">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl md:text-4xl">
                  {t('home.ctaTitle')}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  {t('home.ctaText')}
                </p>
              </div>
              <Link
                to="/iletisim"
                className="inline-flex shrink-0 items-center justify-center bg-accent-500 px-6 py-3 font-display text-base font-semibold uppercase tracking-wider text-white transition hover:bg-accent-600 sm:text-lg"
              >
                {t('home.ctaButton')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default Home;
