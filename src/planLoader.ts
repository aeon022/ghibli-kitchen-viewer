// src/planLoader.ts
import type React from 'react';

export type PlanMeta = { id?: string; title?: string; startDate?: string };
export type PlanModule = { default: React.ComponentType; meta?: PlanMeta };

// Wenn du auch .jsx-Pläne hast, lass {tsx,jsx} stehen.
// Falls nur .tsx: ändere auf './plans/**/*.tsx'
const modules = import.meta.glob<PlanModule>('./plans/**/*.{tsx,jsx}', { eager: true });

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

export const plans: PlanIndexItem[] = Object.entries(modules)
  .map(([path, mod]) => ({
    id: idFrom(path, mod.meta),
    startDate: dateFrom(path, mod.meta),
    title: mod.meta?.title ?? `Plan ${dateFrom(path, mod.meta)}`,
    Component: mod.default,
    path,
  }))
  .sort((a, b) => (a.startDate < b.startDate ? 1 : -1)); // neueste zuerst