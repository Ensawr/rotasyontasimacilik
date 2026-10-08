import { useTranslation } from 'react-i18next';

function TruckIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="18" width="78" height="34" rx="3" className="fill-brand-700 dark:fill-ink-soft" />
      <rect x="10" y="24" width="28" height="14" rx="1.5" className="fill-sky-200/90 dark:fill-sky-300/30" />
      <rect x="42" y="24" width="28" height="14" rx="1.5" className="fill-sky-200/90 dark:fill-sky-300/30" />
      <path
        d="M82 28h28c2 0 4 1.2 5 3l12 18c.7 1.1.5 2.5-.5 3.4L120 58H82V28Z"
        className="fill-accent-500"
      />
      <rect x="96" y="32" width="18" height="12" rx="1.5" className="fill-sky-100 dark:fill-white/20" />
      <circle cx="28" cy="56" r="10" className="fill-slate-800 dark:fill-slate-200" />
      <circle cx="28" cy="56" r="4.5" className="fill-slate-400 truck-wheel" />
      <circle cx="108" cy="56" r="10" className="fill-slate-800 dark:fill-slate-200" />
      <circle cx="108" cy="56" r="4.5" className="fill-slate-400 truck-wheel" />
      <rect x="118" y="46" width="6" height="4" rx="1" className="fill-accent-300" />
    </svg>
  );
}

function PageLoader({ fading }) {
  const { t } = useTranslation();

  return (
    <div
      className={[
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 dark:bg-ink',
        fading ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
      role="status"
      aria-live="polite"
      aria-label={t('loader.aria')}
    >
      <p className="mb-8 px-4 text-center font-display text-2xl font-bold uppercase tracking-wide text-brand-900 dark:text-white sm:text-3xl">
        {t('brand.name')} <span className="text-accent-500">{t('brand.suffix')}</span>
      </p>

      <div className="relative w-full max-w-md overflow-hidden px-4 sm:max-w-lg">
        <div className="relative h-24">
          <div className="truck-drive absolute bottom-4 left-0">
            <TruckIcon className="h-14 w-auto sm:h-16" />
          </div>
          <div className="absolute bottom-2 left-0 right-0 h-0.5 overflow-hidden">
            <div className="road-dash h-full w-[200%] bg-[repeating-linear-gradient(90deg,#94a3b8_0_16px,transparent_16px_28px)] dark:bg-[repeating-linear-gradient(90deg,#475569_0_16px,transparent_16px_28px)]" />
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
        {t('loader.text')}
      </p>
    </div>
  );
}

export default PageLoader;
