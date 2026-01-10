/* ------------------------------------------------------------------------
  src/plans/registry.ts
  - Automatischer Import ALLER Pläne (.de.jsx/.zh.jsx/.en.jsx) via Vite-Glob
  - Bau von Indexen: byId, byBase, yearsAvailable
*/

// FIX: Lang Typ definieren, da er hier verwendet wird
export type Lang = "de" | "zh" | "en";

// @ts-ignore (Datei teilt Export zwischen TS/JSX)
export type PlanModuleNS = { default: any; meta: { id: string; title: string; startDate: string; lang: Lang; sidebar?: string } };
export type PlanRecord = { Component: any; meta: PlanModuleNS["meta"]; baseId: string };

const modules = import.meta.glob<PlanModuleNS>("./**/*.{de,zh,en}.jsx", { eager: true });

const tmp: PlanRecord[] = [];
for (const [_path, mod] of Object.entries(modules)) {
  if (!mod?.default || !mod?.meta) continue;
  const m = mod.meta;
  const base = m.id.replace(/-(de|zh|en)$/i, ""); // wenn id ein Sprachsuffix besitzt, entfernen
  tmp.push({ Component: mod.default, meta: m, baseId: base });
}

export const ALL_PLANS: PlanRecord[] = tmp;

export const plansById: Record<string, PlanRecord> = Object.fromEntries(
  ALL_PLANS.map((p) => [p.meta.id, p])
);

export const plansByBase: Record<string, Record<Lang, PlanRecord>> = ALL_PLANS.reduce((acc, p) => {
  acc[p.baseId] = acc[p.baseId] || ({} as Record<Lang, PlanRecord>);
  acc[p.baseId][p.meta.lang] = p as any;
  return acc;
}, {} as Record<string, Record<Lang, PlanRecord>>);

export function yearsAvailable() {
  const set = new Set<number>();
  ALL_PLANS.forEach((p) => set.add(new Date(p.meta.startDate).getFullYear()));
  return Array.from(set).sort((a, b) => a - b);
}