// src/planLoader.ts
import type React from 'react';

export type PlanMeta = {
  id?: string;
  title?: string;
  startDate?: string;
  // optional: falls du es in einzelnen Dateien setzen willst
  lang?: 'de' | 'zh';
};
export type PlanModule = { default?: React.ComponentType; meta?: PlanMeta };

// .jsx **und** .tsx laden (eager = zur Buildzeit eingebunden)
const modules = import.meta.glob<PlanModule>('./plans/**/*.{jsx,tsx}', { eager: true });

// Sprachkennung aus Dateiname oder Meta ableiten
export type PlanLang = 'de' | 'zh' | 'unknown';
const langFrom = (path: string, meta?: PlanMeta): PlanLang => {
  if (meta?.lang === 'de' || meta?.lang === 'zh') return meta.lang;
  if (path.includes('.de.')) return 'de';
  if (path.includes('.zh.')) return 'zh';
  return 'unknown';
};

const idBaseFrom = (path: string, meta?: PlanMeta) =>
  meta?.id
    ? meta.id
    : (path.match(/woche-\d+-\d{4}-\d{2}-\d{2}/i)?.[0]?.toLowerCase() ??
       path.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ??
       path);

const dateFrom = (path: string, meta?: PlanMeta) =>
  meta?.startDate ?? (path.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? '1970-01-01');

// ID inklusive Sprache, um Kollisionen bei DE/ZH zu vermeiden
const idWithLang = (baseId: string, lang: PlanLang) => {
  // wenn baseId bereits ein Sprachsuffix hat, nicht doppelt anhängen
  if (/-de$/.test(baseId) || /-zh$/.test(baseId)) return baseId;
  return lang === 'unknown' ? baseId : `${baseId}-${lang}`;
};

const titleWithLang = (title: string, lang: PlanLang) => {
  if (/\((DE|中文)\)$/.test(title)) return title;
  if (lang === 'de') return `${title} (DE)`;
  if (lang === 'zh') return `${title} (中文)`;
  return title;
};

export type PlanIndexItem = {
  id: string;
  startDate: string;
  title: string;
  Component: React.ComponentType;
  path: string;
  lang: PlanLang;
};

// Nur Module mit **default**-Export akzeptieren (sonst ignorieren)
export const plans: PlanIndexItem[] = Object.entries(modules)
  .map(([path, mod]) => {
    const Cmp = mod.default;
    if (!Cmp) return null; // z. B. falls die Datei keinen default export hat

    const lang = langFrom(path, mod.meta);
    const startDate = dateFrom(path, mod.meta);
    const baseId = idBaseFrom(path, mod.meta);
    const finalId = idWithLang(
      // falls baseId nur ein Datum ist, eine "woche-X-" Präfixierung vermeiden/erhalten
      baseId || startDate,
      lang
    );

    const rawTitle = mod.meta?.title ?? `Plan ${startDate}`;
    const title = titleWithLang(rawTitle, lang);

    return {
      id: finalId,
      startDate,
      title,
      Component: Cmp,
      path,
      lang,
    };
  })
  .filter((x): x is PlanIndexItem => !!x)
  // neueste zuerst; bei gleicher startDate DE vor ZH
  .sort((a, b) => {
    if (a.startDate === b.startDate) {
      const rank = (l: PlanLang) => (l === 'de' ? 0 : l === 'zh' ? 1 : 2);
      return rank(a.lang) - rank(b.lang);
    }
    return a.startDate < b.startDate ? 1 : -1;
  });