// src/App.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

type Lang = "de" | "zh";
const LANG_KEY = "ghk.lang";

type PlanMeta = {
  id: string;
  title?: string;
  startDate: string;
  lang?: string;
  sidebar?: string;
};
type PlanModule = { default: React.ComponentType<any>; meta: PlanMeta };

function normalizeLang(v: unknown): Lang {
  const s = String(v ?? "").toLowerCase();
  if (s.includes("zh") || s.includes("cn") || s.includes("中文")) return "zh";
  return "de";
}

function slugFor(meta: PlanMeta, lang: Lang) {
  return lang === "zh" ? `${meta.id}-zh` : meta.id;
}

function baseIdFromSlug(slug: string) {
  return slug.replace(/-zh$/i, "");
}

// --- Hilfsfunktion: ISO-Jahr ermitteln (damit KW1 2026, die 2025 startet, als 2026 angezeigt wird) ---
function getPlanYear(startDateStr: string) {
  const date = new Date(startDateStr);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
  const day = date.getDate();
  
  // Wenn Dezember (Monat 11) und "Woche 1" (typischerweise ab 29.12.), zähle es zum nächsten Jahr
  // Einfache Heuristik: Wenn 29.12. oder später, ist es meist der Start der KW1 des Folgejahres.
  if (month === 11 && day >= 29) {
    return year + 1;
  }
  return year;
}

function pickCurrent(plans: PlanRecord[], lang: Lang) {
  const list = plans.filter(p => p.lang === lang).sort((a,b)=>a.startDate.localeCompare(b.startDate));
  if (!list.length) return null;
  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const pastOrToday = list.filter(p => p.startDate <= todayISO);
  return (pastOrToday.length ? pastOrToday[pastOrToday.length - 1] : list[0]) ?? null;
}

type PlanRecord = {
  slug: string;
  baseId: string;
  lang: Lang;
  startDate: string;
  meta: PlanMeta;
  Component: React.ComponentType<any>;
};

// ---- Lang Context ----
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "de", setLang: () => {} });
function useLang() { return useContext(LangCtx); }

function LangProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const nav = useNavigate();
  const isRoot = location.pathname === "/" || location.pathname === "/ghibli-kitchen-viewer" || location.pathname === "/ghibli-kitchen-viewer/";

  const [lang, setLangState] = useState<Lang>(() => "de");

  useEffect(() => {
    if (isRoot) {
      setLangState("de");
      localStorage.setItem(LANG_KEY, "de");
    }
  }, [isRoot]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
    const qs = new URLSearchParams(location.search);
    qs.set("lang", l);
    nav({ pathname: location.pathname, search: qs.toString() }, { replace: true });
  };
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

// ---- Plans laden ----
const planModules = import.meta.glob("./plans/**/*.{jsx,tsx}", { eager: true }) as Record<string, PlanModule>;

function usePlans(): PlanRecord[] {
  return useMemo(() => {
    const out: PlanRecord[] = [];
    for (const mod of Object.values(planModules)) {
      if (!mod?.default || !mod?.meta?.id || !mod?.meta?.startDate) continue;
      const lang = normalizeLang(mod.meta.lang);
      const slug = slugFor(mod.meta, lang);
      out.push({
        slug,
        baseId: mod.meta.id,
        lang,
        startDate: mod.meta.startDate,
        meta: mod.meta,
        Component: mod.default,
      });
    }
    out.sort((a, b) => a.startDate.localeCompare(b.startDate));
    return out;
  }, []);
}

// --- Sidebar mit Collapse & Toggle ---
function Sidebar({ plans, collapsed, setCollapsed }: { plans: PlanRecord[], collapsed: boolean, setCollapsed: (v:boolean)=>void }) {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  // Verwende getPlanYear für die Gruppierung
  const years = useMemo(() => {
    const ys = new Set<number>();
    for (const p of plans) ys.add(getPlanYear(p.startDate));
    return Array.from(ys).sort((a,b)=>b-a);
  }, [plans]);

  const [openYears, setOpenYears] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const initial: Record<number, boolean> = {};
    years.forEach(y => initial[y] = true);
    setOpenYears(initial);
  }, [years.join(",")]);

  const filtered = plans.filter(p => p.lang === lang);

  const toggleLang = () => {
    const target = lang === "de" ? "zh" : "de";
    const m = location.pathname.match(/\/plan\/([^/?#]+)/);
    const currentSlug = m?.[1];
    if (currentSlug) {
      const baseId = baseIdFromSlug(currentSlug);
      const sibling = plans.find(p => p.baseId === baseId && p.lang === target);
      if (sibling) navigate(`/plan/${sibling.slug}?lang=${target}`, { replace: true });
    }
    setLang(target);
  };

  return (
    <aside className="sidebar">
      {/* Cooler Button: Außerhalb des Flows positioniert via CSS. 
         Hier nur das Element. 
      */}
      <button 
        className="sidebar-toggle-btn" 
        onClick={() => setCollapsed(!collapsed)} 
        title={collapsed ? "Ausklappen" : "Einklappen"}
        aria-label="Sidebar Toggle"
      >
        <span className="toggle-icon"></span>
      </button>

      <div className="brand">GhibliKitchen</div>

      <div className="sidebar-top">
        <div className="lang-switch-container">
          <div 
            className="lang-toggle" 
            data-lang={lang} 
            data-active={lang === "zh"}
            onClick={toggleLang}
            title="Sprache umschalten / Switch Language"
          >
            <div className="lang-toggle-handle" data-text={lang.toUpperCase()} />
          </div>
          <span className="lang-label" style={{fontSize: 13, fontWeight: 500}}>
            {lang === "de" ? "Deutsch" : "中文"}
          </span>
        </div>
      </div>

      <div className="year-controls">
        <button className="small-btn" onClick={() => setOpenYears(prev => Object.fromEntries(Object.keys(prev).map(k => [Number(k), true])))}>Alle +</button>
        <button className="small-btn" onClick={() => setOpenYears(prev => Object.fromEntries(Object.keys(prev).map(k => [Number(k), false])))}>Alle -</button>
      </div>

      {years.map(y => (
        <details
          key={y}
          className="year"
          open={openYears[y] ?? true}
          onToggle={(e) => {
             const isOpen = (e.currentTarget as HTMLDetailsElement).open;
             setOpenYears(prev => ({ ...prev, [y]: isOpen }));
          }}
        >
          <summary>{y}</summary>
          <ul className="year-list">
            {filtered
              .filter(p => getPlanYear(p.startDate) === y)
              .map(p => (
                <li key={p.slug}>
                  <Link to={`/plan/${p.slug}?lang=${lang}`}>
                    {p.meta.sidebar || `${p.meta.title ?? p.meta.id} (${p.startDate})`}
                  </Link>
                </li>
              ))}
          </ul>
        </details>
      ))}
    </aside>
  );
}

function PlanPage({ plans }: { plans: PlanRecord[] }) {
  const { slug = "" } = useParams();
  const { lang } = useLang();
  const nav = useNavigate();

  const current = plans.find(p => p.slug === slug);
  if (!current) return <div className="main-inner">Plan nicht gefunden: {slug}</div>;

  if (current.lang !== lang) {
    const sibling = plans.find(p => p.baseId === current.baseId && p.lang === lang);
    if (sibling) {
      nav(`/plan/${sibling.slug}?lang=${lang}`, { replace: true });
      return null;
    }
  }

  const Cmp = current.Component;
  return (
    <div className="main-inner">
      <Cmp />
    </div>
  );
}

function HomeRedirect({ plans }: { plans: PlanRecord[] }) {
  const currentDE = pickCurrent(plans, "de");
  if (!currentDE) return <div className="main-inner">Keine DE-Pläne gefunden.</div>;
  return <Navigate to={`/plan/${currentDE.slug}?lang=de`} replace />;
}

export default function App() {
  const plans = usePlans();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LangProvider>
      <div className={`app-shell ${collapsed ? "collapsed" : ""}`}>
        <Sidebar plans={plans} collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomeRedirect plans={plans} />} />
            <Route path="/plan/:slug" element={<PlanPage plans={plans} />} />
            <Route path="*" element={<HomeRedirect plans={plans} />} />
          </Routes>
        </main>
      </div>
    </LangProvider>
  );
}