import React, { useMemo, useState } from "react";

// Collapsible year browser that auto-discovers plans under src/plans/<YEAR>/Woche-*.de.jsx
// Renders the selected plan on the right; left side is a simple tree with years that can be
// expanded/collapsed. Works with Vite via import.meta.glob.

// --- Types ---
interface PlanMeta {
  title: string;        // e.g. "Woche 1"
  startDate: string;    // e.g. "2025-12-29"
  id: string;           // e.g. "woche-1-2025-12-29"
  lang: string;         // e.g. "de"
  sidebar?: string;
}
interface PlanModule {
  default: React.ComponentType<any>;
  meta: PlanMeta;
}
interface PlanInfo {
  key: string;          // path from glob
  year: string;         // extracted from path
  weekLabel: string;    // meta.title (e.g. Woche 1)
  startDate: string;    // YYYY-MM-DD
  Component: React.ComponentType<any>;
}

// --- Auto-import all DE plans ---
// statt "./plans/**/Woche-*.de.jsx" => mit Alias:
const modules = import.meta.glob("@/plans/**/Woche-*.de.jsx", { eager: true }) as Record<string, PlanModule>;

function extractYear(filePath: string): string {
  // src/plans/2025/Woche-1-2025-12-29.de.jsx => 2025
  const m = filePath.match(/plans\/(\d{4})\//);
  return m ? m[1] : "Unsorted";
}

function normalizePlans(): PlanInfo[] {
  const res: PlanInfo[] = [];
  for (const [key, mod] of Object.entries(modules)) {
    const meta = (mod as any).meta as PlanMeta | undefined;
    const Comp = (mod as any).default as React.ComponentType<any> | undefined;
    if (!meta || !Comp) continue;
    const year = extractYear(key);
    res.push({
      key,
      year,
      weekLabel: meta.title ?? key.split("/").pop() ?? key,
      startDate: meta.startDate ?? "",
      Component: Comp,
    });
  }
  // sort by startDate ASC within a year
  res.sort((a, b) => a.startDate.localeCompare(b.startDate));
  return res;
}

const plansAll = normalizePlans();

function groupByYear(plans: PlanInfo[]): Record<string, PlanInfo[]> {
  return plans.reduce((acc, p) => {
    acc[p.year] ||= [];
    acc[p.year].push(p);
    return acc;
  }, {} as Record<string, PlanInfo[]>);
}

// --- UI bits ---
const COLORS = {
  pageBg: "#FAF7F1",
  border: "rgba(0,0,0,.10)",
  white: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
};

const panel: React.CSSProperties = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 16,
  boxShadow: "0 6px 20px rgba(0,0,0,.10)",
};

export default function PlanBrowser() {
  const grouped = useMemo(() => groupByYear(plansAll), []);
  const years = useMemo(() => Object.keys(grouped).sort((a, b) => b.localeCompare(a)), [grouped]); // newest first

  // Pick initial selection: latest year + first plan within that year
  const initialPlan = useMemo(() => {
    const y = years[0];
    const first = y ? grouped[y][0] : undefined;
    return first?.key ?? "";
  }, [years, grouped]);

  const [openYears, setOpenYears] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    years.forEach((y, idx) => (map[y] = idx === 0));
    return map;
  });
  const [selectedKey, setSelectedKey] = useState<string>(initialPlan);

  const SelectedComp = useMemo(() => {
    const match = plansAll.find((p) => p.key === selectedKey);
    return match?.Component;
  }, [selectedKey]);

  return (
    <div style={{ background: COLORS.pageBg, color: COLORS.text, padding: 24, minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
        {/* Left: collapsible years */}
        <aside style={{ ...panel, padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Pläne</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setOpenYears((m) => Object.fromEntries(Object.keys(m).map((y) => [y, true])))}
                title="Alle aufklappen"
                style={{ padding: "4px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "#f8fafc" }}
              >
                Auf
              </button>
              <button
                onClick={() => setOpenYears((m) => Object.fromEntries(Object.keys(m).map((y) => [y, false])))}
                title="Alle zuklappen"
                style={{ padding: "4px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "#f8fafc" }}
              >
                Zu
              </button>
            </div>
          </div>
          {years.length === 0 ? (
            <p style={{ color: COLORS.muted }}>Keine Pläne gefunden. Lege Dateien unter <code>src/plans/&lt;YEAR&gt;/Woche-*.de.jsx</code> an.</p>
          ) : null}
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {years.map((year) => (
              <li key={year} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                <button
                  onClick={() => setOpenYears((m) => ({ ...m, [year]: !m[year] }))}
                  style={{ width: "100%", textAlign: "left", padding: 10, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}
                >
                  {openYears[year] ? "▾" : "▸"} {year} <span style={{ color: COLORS.muted, fontWeight: 400 }}>({grouped[year].length})</span>
                </button>
                {openYears[year] && (
                  <ul style={{ listStyle: "none", margin: 0, padding: "0 0 8px 22px" }}>
                    {grouped[year].map((p) => (
                      <li key={p.key}>
                        <button
                          onClick={() => setSelectedKey(p.key)}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "6px 8px",
                            marginBottom: 4,
                            borderRadius: 8,
                            border: `1px solid ${COLORS.border}`,
                            background: selectedKey === p.key ? "#fff" : "#f8fafc",
                          }}
                          title={`${p.weekLabel} – ${p.startDate}`}
                        >
                          {p.weekLabel} <span style={{ color: COLORS.muted }}>({p.startDate})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Right: selected plan */}
        <main style={{ ...panel, padding: 14 }}>
          {SelectedComp ? (
            <SelectedComp />
          ) : (
            <div style={{ padding: 24, color: COLORS.muted }}>Bitte einen Plan links auswählen.</div>
          )}
        </main>
      </div>
    </div>
  );
}
