import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';

const SHOW_AFTER = 320;

function ScrollToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label={t('common.scrollTop')}
      tabIndex={visible ? 0 : -1}
      className={[
        'fixed bottom-5 left-5 z-[70] inline-flex size-12 items-center justify-center rounded-full bg-brand-900 text-white shadow-lg transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:bottom-6 sm:left-6 sm:size-14',
        'hover:bg-accent-500 dark:bg-ink-raised dark:hover:bg-accent-500',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      ].join(' ')}
    >
      <ArrowUp className="size-5 sm:size-6" strokeWidth={2.25} aria-hidden />
    </button>
  );
}

export default ScrollToTop;
