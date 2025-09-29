// src/planLoader.ts
import type React from 'react';

export type PlanMeta = { id?: string; title?: string; startDate?: string };
export type PlanModule = { default?: React.ComponentType; meta?: PlanMeta };

// .jsx **und** .tsx laden (eager = zur Buildzeit eingebunden)
const modules = import.meta.glob<PlanModule>('./plans/**/*.{jsx,tsx}', { eager: true });

const idFrom = (path: string, meta?: PlanMeta) =>
  meta?.id ?? (path.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? path);

const dateFrom = (path: string, meta?: PlanMeta) =>
  meta?.startDate ?? (path.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? '1970-01-01');

export type PlanIndexItem = {
  id: string;
  startDate: string;
  title: string;
  Component: React.ComponentType;
  path: string;
};

// Nur Module mit **default**-Export akzeptieren (sonst ignorieren)
export const plans: PlanIndexItem[] = Object.entries(modules)
  .map(([path, mod]) => {
    const Cmp = mod.default;
    if (!Cmp) return null; // z. B. falls die Datei keinen default export hat
    const startDate = dateFrom(path, mod.meta);
    return {
      id: idFrom(path, mod.meta),
      startDate,
      title: mod.meta?.title ?? `Plan ${startDate}`,
      Component: Cmp,
      path,
    };
  })
  .filter((x): x is PlanIndexItem => !!x)
  .sort((a, b) => (a.startDate < b.startDate ? 1 : -1));