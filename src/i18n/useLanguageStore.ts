// src/i18n/useLanguageStore.ts
import * as React from 'react';

export type Lang = 'de' | 'zh';

type LanguageState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  subscribe: (cb: () => void) => () => void;
  getSnapshot: () => Lang;
};

const STORAGE_KEY = 'ghibli-lang';

const listeners = new Set<() => void>();

function getInitialLang(): Lang {
  const saved = (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) as Lang | null;
  return saved === 'zh' ? 'zh' : 'de';
}

let currentLang: Lang = getInitialLang();

function setLangInternal(l: Lang) {
  currentLang = l;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, l);
  }
  listeners.forEach((fn) => fn());
}

const store: LanguageState = {
  lang: currentLang,
  setLang: setLangInternal,
  toggle: () => setLangInternal(currentLang === 'de' ? 'zh' : 'de'),
  subscribe: (cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot: () => currentLang,
};

export function useLanguageStore() {
  const lang = React.useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return React.useMemo(
    () => ({
      lang,
      setLang: (l: Lang) => store.setLang(l),
      toggle: () => store.toggle(),
    }),
    [lang]
  );
}

export default useLanguageStore;