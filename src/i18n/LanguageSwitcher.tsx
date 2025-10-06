// src/i18n/LanguageSwitcher.tsx
import * as React from 'react';
import { useLanguageStore } from './useLanguageStore';

export function LanguageSwitcher() {
  const { lang, toggle } = useLanguageStore();
  const label = lang === 'de' ? 'DE' : '中文';
  const next = lang === 'de' ? '中文' : 'DE';

  return (
    <button
      onClick={toggle}
      title={`Sprache umschalten → ${next}`}
      style={{
        padding: '6px 10px',
        borderRadius: 10,
        border: '1px solid #ddd',
        background: '#fff',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      {label} ⇄ {next}
    </button>
  );
}

export default LanguageSwitcher;