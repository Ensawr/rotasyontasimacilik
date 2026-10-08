const THEME_KEY = 'theme';

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function prefersDarkScheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function resolveIsDark() {
  const stored = getStoredTheme();
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return prefersDarkScheme();
}

export function applyThemeClass(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', isDark ? '#07090f' : '#003D6B');
  }
}

export function syncThemeFromPreference() {
  applyThemeClass(resolveIsDark());
}

/** Kullanıcı manuel seçim yapmadıysa sistem teması değişince siteyi güncelle. */
export function initSystemThemeSync() {
  syncThemeFromPreference();

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    const stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') return;
    applyThemeClass(media.matches);
  };

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }

  media.addListener(onChange);
  return () => media.removeListener(onChange);
}
