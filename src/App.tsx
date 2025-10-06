// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import { plans, type PlanIndexItem } from './planLoader';
import ErrorBoundary from './ErrorBoundary';
import { useLanguageStore } from './i18n/useLanguageStore';
import { LanguageSwitcher } from './i18n/LanguageSwitcher';

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
        <h1 style={{ margin: 0, marginLeft: 12, fontSize: 18 }}>{cleanSidebarTitle(current)}</h1>
        <div style={{ marginLeft: 'auto' }}>
          <LanguageSwitcher />
        </div>
      </div>
      <ErrorBoundary key={current.id}>
        <Cmp />
      </ErrorBoundary>
    </div>
  );
}

export default function App() {
  const { lang } = useLanguageStore(); // "de" | "zh"

  // Eine Liste mit GENAU EINEM Eintrag pro Woche (repräsentiert die aktuelle Sprache)
  const weeklyPlans = useWeeklyPlans(lang);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #ddd', padding: 12, overflow: 'auto' }}>
        <h3 style={{ marginTop: 0 }}>GhibliKitchen Pläne</h3>
        <div style={{ marginBottom: 12 }}>
          <LanguageSwitcher />
        </div>
        <ol style={{ paddingLeft: 18 }}>
          {weeklyPlans.map((p) => (
            <li key={p.id} style={{ marginBottom: 6 }}>
              <Link to={`/plan/${p.id}`}>{p.startDate} — {cleanSidebarTitle(p)}</Link>
            </li>
          ))}
        </ol>
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