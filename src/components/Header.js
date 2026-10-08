import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import logo from '../images/logo.png';

function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/hakkimizda', label: t('nav.about') },
    { to: '/iletisim', label: t('nav.contact') },
  ];

  const compact = scrolled && !hovered && !open;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const desktopLinkClass = ({ isActive }) =>
    [
      'relative text-sm font-semibold tracking-[0.14em] uppercase transition-colors',
      'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent-500 after:transition-transform after:duration-300',
      isActive
        ? 'text-accent-600 after:scale-x-100 dark:text-accent-400'
        : 'text-brand-800/80 hover:text-accent-600 hover:after:scale-x-100 dark:text-white/80 dark:hover:text-accent-400',
    ].join(' ');

  const mobileLinkClass = ({ isActive }) =>
    [
      'block rounded-md px-4 py-3.5 text-base font-semibold tracking-wide uppercase transition-colors',
      isActive
        ? 'bg-brand-50 text-accent-600 dark:bg-white/10 dark:text-accent-400'
        : 'text-brand-800 hover:bg-brand-50 hover:text-accent-600 dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-accent-400',
    ].join(' ');

  const brandMark = (
    <Link
      to="/"
      className="inline-flex items-center gap-2 sm:gap-2.5"
      onClick={() => setOpen(false)}
      aria-label={t('brand.full')}
    >
      <span
        className={[
          'overflow-hidden whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.06em] text-brand-900 transition-all duration-300 dark:text-white sm:text-base md:text-lg',
          compact
            ? 'max-w-0 translate-x-2 opacity-0'
            : 'max-w-[10rem] translate-x-0 opacity-100',
        ].join(' ')}
      >
        {t('brand.name')}
      </span>
      <img
        src={logo}
        alt=""
        className={[
          'w-auto object-contain transition-all duration-300',
          compact ? 'h-8 sm:h-9' : 'h-11 sm:h-12 md:h-14',
        ].join(' ')}
      />
      <span
        className={[
          'overflow-hidden whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.06em] text-accent-500 transition-all duration-300 sm:text-base md:text-lg',
          compact
            ? 'max-w-0 -translate-x-2 opacity-0'
            : 'max-w-[12rem] translate-x-0 opacity-100',
        ].join(' ')}
      >
        {t('brand.suffix')}
      </span>
    </Link>
  );

  const overlay =
    typeof document !== 'undefined'
      ? createPortal(
          <div
            className={[
              'fixed inset-0 z-[45] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 md:hidden',
              open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
            onClick={() => setOpen(false)}
            aria-hidden={!open}
          />,
          document.body
        )
      : null;

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 text-brand-900 shadow-sm backdrop-blur transition-shadow duration-300 dark:border-white/10 dark:bg-ink/95 dark:text-white dark:shadow-black/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={[
          'relative mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 transition-all duration-300 sm:gap-4 sm:px-6',
          compact ? 'py-2 sm:py-2.5' : 'py-3 sm:py-4',
        ].join(' ')}
      >
        {/* Sol: masaüstü nav / mobil hamburger */}
        <div className="flex items-center justify-start">
          <nav
            className={[
              'hidden items-center gap-7 transition-all duration-300 lg:gap-9 md:flex',
              compact
                ? 'pointer-events-none translate-y-1 opacity-0'
                : 'translate-y-0 opacity-100',
            ].join(' ')}
            aria-label="Primary"
            aria-hidden={compact}
          >
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={desktopLinkClass} tabIndex={compact ? -1 : undefined}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-brand-900 transition hover:bg-slate-100 dark:text-white dark:hover:bg-white/10 md:hidden"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="relative block h-[18px] w-5">
              <span
                className={[
                  'absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300',
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-all duration-300',
                  open ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300',
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0',
                ].join(' ')}
              />
            </span>
          </button>
        </div>

        {/* Orta: logo */}
        <div className="flex justify-center">{brandMark}</div>

        {/* Sağ: dil + tema */}
        <div
          className={[
            'flex items-center justify-end gap-1.5 transition-all duration-300 sm:gap-2.5',
            compact
              ? 'pointer-events-none translate-y-1 opacity-0'
              : 'translate-y-0 opacity-100',
          ].join(' ')}
          aria-hidden={compact}
        >
          <LanguageSwitcher className="hidden md:block" />
          <AnimatedThemeToggler
            className="inline-flex size-9 items-center justify-center rounded-md text-brand-800 transition hover:bg-slate-100 hover:text-accent-600 dark:text-white dark:hover:bg-white/10 dark:hover:text-accent-400 sm:size-10"
            duration={500}
            tabIndex={compact ? -1 : undefined}
          />
        </div>
      </div>

      {overlay}

      <nav
        className={[
          'absolute left-0 right-0 top-full z-[60] origin-top border-b border-slate-200 bg-white shadow-lg transition-all duration-300 ease-out dark:border-white/10 dark:bg-ink md:hidden',
          open
            ? 'pointer-events-auto translate-y-0 scale-y-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-y-95 opacity-0',
        ].join(' ')}
        aria-hidden={!open}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3 sm:px-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-2 flex items-center justify-between gap-2 border-t border-slate-200 px-4 pt-3 dark:border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t('nav.language')}
            </span>
            <LanguageSwitcher onSelected={() => setOpen(false)} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
