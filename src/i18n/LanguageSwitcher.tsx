// src/i18n/LanguageSwitcher.tsx
import * as React from 'react';
import { useLanguageStore } from './useLanguageStore';

export type LanguageSwitcherProps = {
  title?: string; // optional Tooltip
  className?: string;
};

export function LanguageSwitcher({ title, className }: LanguageSwitcherProps) {
  const { lang, toggle } = useLanguageStore();
  const label = lang === 'de' ? '中文' : 'Deutsch';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Sprache umschalten / Switch language"
      title={title ?? 'Sprache umschalten'}
      className={className}
      style={{
        padding: '6px 10px',
        borderRadius: 8,
        border: '1px solid #ddd',
        background: '#fff',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}

// Named + Default Export
export default LanguageSwitcher;