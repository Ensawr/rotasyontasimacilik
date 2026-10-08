import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  {
    code: 'tr',
    label: 'Türkçe',
    Flag: FlagTR,
  },
  {
    code: 'en',
    label: 'English',
    Flag: FlagEN,
  },
];

function FlagTR({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="24" height="16" fill="#E30A17" rx="1.5" />
      <circle cx="10.2" cy="8" r="4.2" fill="#fff" />
      <circle cx="11.4" cy="8" r="3.3" fill="#E30A17" />
      <polygon
        fill="#fff"
        points="13.9,8 15.7,8.6 14.3,7.1 15.7,5.6 13.9,6.2 12.5,4.9 12.9,6.8 11.1,7.7 13,8.1 12.6,10"
      />
    </svg>
  );
}

function FlagEN({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="24" height="16" fill="#012169" rx="1.5" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="2.6" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="4.2" />
      <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  );
}

function LanguageSwitcher({ className = '', onSelected }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const currentCode = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en')
    ? 'en'
    : 'tr';
  const current = LANGUAGES.find((item) => item.code === currentCode) || LANGUAGES[0];
  const other = LANGUAGES.find((item) => item.code !== currentCode);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const selectLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
    onSelected?.(lng);
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 transition hover:bg-slate-100 dark:border-white/15 dark:hover:bg-white/10"
        aria-label={t('nav.language')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <current.Flag className="h-3.5 w-[21px] shrink-0 overflow-hidden rounded-[2px] shadow-sm" />
        <span className="text-xs font-bold tracking-wide text-brand-800 dark:text-white/90">
          {current.code.toUpperCase()}
        </span>
        <svg
          className={[
            'h-3 w-3 text-brand-700 transition dark:text-white/70',
            open ? 'rotate-180' : '',
          ].join(' ')}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4.5 L6 7.5 L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && other ? (
        <div
          className="absolute right-0 top-[calc(100%+0.35rem)] z-[70] min-w-[9.5rem] overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-white/15 dark:bg-ink"
          role="listbox"
          aria-label={t('nav.language')}
        >
          <button
            type="button"
            role="option"
            aria-selected="false"
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-brand-800 transition hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
            onClick={() => selectLanguage(other.code)}
          >
            <other.Flag className="h-3.5 w-[21px] shrink-0 overflow-hidden rounded-[2px] shadow-sm" />
            <span>{other.label}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default LanguageSwitcher;
