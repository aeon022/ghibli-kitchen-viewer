// src/planLoader.ts
import type React from 'react';

export type PlanMeta = { id?: string; title?: string; startDate?: string };
type PlanModule = { default: React.ComponentType; meta?: PlanMeta };

const modules = import.meta.glob<PlanModule>('./plans/**/*.tsx', { eager: true });

function idFrom(path: string, meta?: PlanMeta) {
  return meta?.id ?? (path.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? path);
}
function dateFrom(path: string, meta?: PlanMeta) {
  return meta?.startDate ?? (path.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? '1970-01-01');
}

export type PlanIndexItem = {
  id: string;
  startDate: string;
  title: string;
  Component: React.ComponentType;
};

export const plans: PlanIndexItem[] = Object.entries(modules)
  .map(([p, m]) => ({
    id: idFrom(p, m.meta),
    startDate: dateFrom(p, m.meta),
    title: m.meta?.title ?? `Plan ${dateFrom(p, m.meta)}`,
    Component: m.default,
  }))
  .sort((a, b) => (a.startDate < b.startDate ? 1 : -1)); // neueste zuerst

