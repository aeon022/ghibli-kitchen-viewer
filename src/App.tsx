// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import { plans, type PlanIndexItem } from './planLoader';
import ErrorBoundary from './ErrorBoundary';
import { useLanguageStore } from './i18n/useLanguageStore';
import { LanguageSwitcher } from './i18n/LanguageSwitcher'; // ⟵ fehlte

// Hilfsfunktionen
const cleanSidebarTitle = (p: PlanIndexItem) =>
  (p as any).sidebar ?? p.title.replace(/\s\((DE|中文)\)$/, '');

// Gruppiert alle Pläne einer Woche (nach startDate) und wählt
// für die Sidebar/Navi genau EINEN Repräsentanten in aktueller Sprache.
function useWeeklyPlans(lang: 'de' | 'zh') {
  return React.useMemo<PlanIndexItem[]>(() => {
    // 1) Gruppe nach startDate bilden
    const map = new Map<string, PlanIndexItem[]>();
    for (const p of plans) {
      const arr = map.get(p.startDate) ?? [];
      arr.push(p);
      map.set(p.startDate, arr);
    }
    // 2) Pro Woche den passenden Repräsentanten wählen
    const representatives: PlanIndexItem[] = [];
    for (const arr of map.values()) {
      // bevorzugt aktuelle Sprache, dann 'unknown', sonst erstes Element
      let pick =
        arr.find((x) => x.lang === lang) ??
        arr.find((x) => x.lang === 'unknown') ??
        arr[0];
      representatives.push(pick);
    }
    // 3) Nach datum (neueste zuerst) sortieren
    representatives.sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
    return representatives;
  }, [lang]);
}

function PlanPage({ weeklyPlans }: { weeklyPlans: PlanIndexItem[] }) {
  const { id } = useParams();
  const nav = useNavigate();

  if (!weeklyPlans.length) {
    return <div style={{ padding: 16 }}>Keine Pläne gefunden.</div>;
  }

  // aktuellen Index innerhalb der **wochenweise** Liste ermitteln
  const idx = Math.max(0, weeklyPlans.findIndex((p) => p.id === id));
  const current = weeklyPlans[idx] ?? weeklyPlans[0];
  const Prev = weeklyPlans[idx + 1]; // ältere Woche
  const Next = weeklyPlans[idx - 1]; // neuere Woche
  const Cmp = current.Component;

  // Wenn URL auf einen Plan zeigt, der nicht in der wochenweisen Liste ist → auf die neueste Woche umleiten
  React.useEffect(() => {
    if (!current || current.id !== id) {
      nav(`/plan/${weeklyPlans[0].id}`, { replace: true });
    }
  }, [id, current, nav, weeklyPlans]);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={() => Prev && nav(`/plan/${Prev.id}`)} disabled={!Prev}>← Älter</button>
        <button onClick={() => Next && nav(`/plan/${Next.id}`)} disabled={!Next}>Neuer →</button>
        <h1 style={{ margin: 0, marginLeft: 12, fontSize: 18 }}>{current.title}</h1>
      </div>
      <ErrorBoundary key={current.id}>
        <Cmp />
      </ErrorBoundary>
    </div>
  );
}

function isoWeekYear(dateStr: string): number {
  // ISO-Week-Year: Jahr der Donnerstags-Woche
  const d = new Date(dateStr + 'T00:00:00Z');
  const dow = (d.getUTCDay() + 6) % 7; // Mo=0 ... So=6
  d.setUTCDate(d.getUTCDate() - dow + 3); // auf Donnerstag der Woche springen
  return d.getUTCFullYear();
}

function groupByYear(plans: PlanIndexItem[]) {
  const groups = new Map<string, PlanIndexItem[]>();
  for (const p of plans) {
    const y = String(isoWeekYear(p.startDate ?? ''));
    const arr = groups.get(y) ?? [];
    arr.push(p);
    groups.set(y, arr);
  }
  for (const arr of groups.values()) {
    arr.sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
  }
  return groups;
}

function groupByYear(plans: PlanIndexItem[]) {
  const groups = new Map<string, PlanIndexItem[]>();
  for (const p of plans) {
    const y = (p.startDate ?? '').slice(0, 4) || 'Unsortiert';
    const arr = groups.get(y) ?? [];
    arr.push(p);
    groups.set(y, arr);
  }
  // innerhalb jedes Jahres neueste zuerst
  for (const arr of groups.values()) {
    arr.sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
  }
  return groups;
}

export default function App() {
  const { lang } = useLanguageStore(); // "de" | "zh"

  // Eine Liste mit GENAU EINEM Eintrag pro Woche (repräsentiert die aktuelle Sprache)
  const weeklyPlans = useWeeklyPlans(lang);

    // Nach Jahr gruppieren
  const groupedByYear = React.useMemo(() => groupByYear(weeklyPlans), [weeklyPlans]);
  const years = React.useMemo(
    () => Array.from(groupedByYear.keys()).sort((a, b) => (a < b ? 1 : -1)), // neueste zuerst
    [groupedByYear]
  );

  // Offen/zu Zustand je Jahr – initial: neuestes Jahr offen
  const [openYears, setOpenYears] = React.useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    years.forEach((y, idx) => (init[y] = idx === 0));
    return init;
  });

  // Wenn sich die Jahre-Liste ändert (z. B. Sprache / Daten neu), Zustand auffrischen
  React.useEffect(() => {
    setOpenYears(prev => {
      const next: Record<string, boolean> = {};
      years.forEach((y, idx) => (next[y] = prev[y] ?? (idx === 0)));
      return next;
    });
  }, [years]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #ddd', padding: 12, overflow: 'auto' }}>
  <h3 style={{ marginTop: 0 }}>GhibliKitchen Pläne</h3>
  <div style={{ marginBottom: 12 }}>
    <LanguageSwitcher />
  </div>

  {/* Buttons: alle Jahre auf/zu */}
  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
    <button
      onClick={() => setOpenYears(Object.fromEntries(years.map(y => [y, true])))}
      title="Alle aufklappen"
    >
      Alle auf
    </button>
    <button
      onClick={() => setOpenYears(Object.fromEntries(years.map(y => [y, false])))}
      title="Alle zuklappen"
    >
      Alle zu
    </button>
  </div>

  {/* Jahr → Wochen (repräsentativer Plan pro Woche, in aktueller Sprache) */}
  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
    {years.map((year) => {
      const items = groupedByYear.get(year) ?? [];
      return (
        <li key={year} style={{ marginBottom: 8 }}>
          <button
            onClick={() => setOpenYears(m => ({ ...m, [year]: !m[year] }))}
            style={{
              width: '100%', textAlign: 'left', padding: '6px 8px',
              background: 'transparent', border: '1px solid #ddd', borderRadius: 8,
              cursor: 'pointer', fontWeight: 600
            }}
          >
            {openYears[year] ? '▾' : '▸'} {year}{' '}
            <span style={{ color: '#666', fontWeight: 400 }}>({items.length})</span>
          </button>

          {openYears[year] && (
            <ol style={{ paddingLeft: 18, marginTop: 6 }}>
              {items.map((p) => (
                <li key={p.id} style={{ marginBottom: 6 }}>
                  <Link to={`/plan/${p.id}`}>
                    {p.startDate} — {cleanSidebarTitle(p)}
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </li>
      );
    })}
  </ul>
</aside>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              weeklyPlans.length
                ? <Navigate to={`/plan/${weeklyPlans[0].id}`} replace />
                : <div style={{ padding: 16 }}>Keine Pläne vorhanden.</div>
            }
          />
          <Route path="/plan/:id" element={<PlanPage weeklyPlans={weeklyPlans} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}