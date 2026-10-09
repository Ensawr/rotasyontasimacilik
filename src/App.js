import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const MIN_LOADER_MS = 1600;
const FADE_MS = 700;

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    const id = decodeURIComponent(hash.replace('#', ''));
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function PageEnter({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    let fadeTimer;
    let hideTimer;
    let cancelled = false;

    document.body.style.overflow = 'hidden';

    const dismiss = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_LOADER_MS - elapsed);

      fadeTimer = setTimeout(() => {
        if (cancelled) return;
        setFading(true);
        hideTimer = setTimeout(() => {
          if (cancelled) return;
          setShowLoader(false);
          document.body.style.overflow = '';
        }, FADE_MS);
      }, wait);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', dismiss);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-ink">
      {showLoader && <PageLoader fading={fading} />}

      <ScrollProgress />
      <Header />
      <ScrollToHash />
      <main className="flex-1">
        <PageEnter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageEnter>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
