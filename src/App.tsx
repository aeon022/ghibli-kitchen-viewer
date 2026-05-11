// src/App.tsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useBookmarks, Bookmark, BookmarkList } from "./hooks/useBookmarks";
import { PinnwandPage } from "./PinnwandPage";

type Lang = "de" | "zh";
const LANG_KEY = "mkt.lang";
const SUPPORT_URL = "https://buy.polar.sh/polar_cl_IMvSv9smK6P0o45BtZE0XHi4CHkRhOnKB1EKL4DXUVZ";

type Recipe = {
  id: string;
  title: string;
  desc?: string;
  ingredients?: string[];
  steps?: string[];
  [key: string]: any;
};

type PlanMeta = {
  id: string;
  title?: string;
  startDate: string;
  lang?: string;
  sidebar?: string;
};
type PlanModule = { default: React.ComponentType<any>; meta: PlanMeta; DATA?: Recipe[] };


// --- Back to Top Komponente ---
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      title="Nach oben"
      aria-label="Nach oben scrollen"
    >
      <span className="arrow-up" />
    </button>
  );
}

// --- Mobile Helper ---
function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

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

function getPlanYear(startDateStr: string) {
  if (!startDateStr) return new Date().getFullYear();
  const [y, m, d] = startDateStr.split("-").map(Number);
  if (m === 12 && d >= 29) return y + 1;
  return y;
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
  recipes: Recipe[];
};

// ---- Lang Context ----
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "de", setLang: () => {} });
function useLang() { return useContext(LangCtx); }
export { useLang };

function LangProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const nav = useNavigate();
  const isRoot = location.pathname === "/" || location.pathname === "/moving-kitchen-tales" || location.pathname === "/moving-kitchen-tales/";
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
        recipes: mod.DATA || [],
      });
    }
    out.sort((a, b) => a.startDate.localeCompare(b.startDate));
    return out;
  }, []);
}

// --- Sidebar (Mobile Optimized) ---
function Sidebar({ plans, collapsed, setCollapsed }: { plans: PlanRecord[], collapsed: boolean, setCollapsed: (v:boolean)=>void }) {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const { bookmarkLists } = useBookmarks();

  const [search, setSearch] = useState("");

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

  // Auf Mobile: Sidebar beim Start automatisch einklappen (verstecken)
  useEffect(() => {
    if (isMobile()) {
      setCollapsed(true);
    }
  }, []);

  const filtered = plans.filter(p => p.lang === lang);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const res: { plan: PlanRecord, recipe: Recipe }[] = [];
    for (const p of plans) {
      if (p.lang !== lang) continue;
      for (const r of p.recipes) {
        if (
          r.title.toLowerCase().includes(q) ||
          (r.desc && r.desc.toLowerCase().includes(q)) ||
          (r.ingredients && r.ingredients.some(i => i.toLowerCase().includes(q)))
        ) {
          res.push({ plan: p, recipe: r });
        }
      }
    }
    return res.slice(0, 20); // Limit to 20 results
  }, [search, plans, lang]);

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

  // Hilfsfunktion: Auf Mobile Sidebar schließen nach Klick
  const handleLinkClick = () => {
    if (isMobile()) {
      setCollapsed(true);
    }
  };

  return (
    <aside className="sidebar">
      {/* Desktop Toggle Button */}
      <button 
        className="sidebar-toggle-btn desktop-toggle" 
        onClick={() => setCollapsed(!collapsed)} 
        title={collapsed ? "Ausklappen" : "Einklappen"}
      >
        <span className="toggle-icon"></span>
      </button>

      {/* Titel mit Span für Ausblenden */}
      <div className="brand">
        MovingKitchenTales
      </div>

      <div className="sidebar-content-scroll">
        <div className="sidebar-nav-item" style={{ padding: "0 12px 12px" }}>
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className="sidebar-home-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}>
              <path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 21v-3a3 3 0 0 1 6 0v3" />
              <path d="M6 21l-1 2h2" />
              <path d="M18 21l1 2h-2" />
              <path d="M15 3l1-1" />
            </svg>
            <span className="sidebar-nav-text">{lang === "de" ? "Startseite" : "首页"}</span>
          </Link>
        </div>

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

        <div className="sidebar-nav-item" style={{ padding: "0 12px 12px" }}>
          <Link 
            to="/bookmarks" 
            onClick={handleLinkClick}
            className="sidebar-bookmark-btn"
          >
            <span>⭐</span> <span className="sidebar-nav-text">{lang === "de" ? "Meine Merkliste" : "我的收藏"}</span>
          </Link>
        </div>

        {/* Suche */}
        <div className="sidebar-nav-item" style={{ padding: "0 12px 12px" }}>
          <input
            type="search"
            placeholder={lang === "de" ? "Rezepte suchen..." : "搜索食谱..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--panel)",
              color: "var(--text)",
            }}
          />
          {search.trim() && (
            <div style={{ marginTop: 8, maxHeight: "300px", overflowY: "auto", border: "1px solid var(--border)", borderRadius: 8, background: "var(--panel)" }}>
              {searchResults.length === 0 ? (
                <div style={{ padding: 8, fontSize: 13, color: "var(--muted)" }}>Keine Treffer</div>
              ) : (
                searchResults.map((res, idx) => (
                  <Link
                    key={`${res.plan.slug}-${res.recipe.id}-${idx}`}
                    to={`/plan/${res.plan.slug}#meal-${res.recipe.id}`}
                    onClick={() => {
                      setSearch("");
                      handleLinkClick();
                    }}
                    style={{ display: "block", padding: "8px", textDecoration: "none", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 13 }}
                  >
                    <div style={{ fontWeight: 600 }}>{res.recipe.title}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{res.plan.meta.title}</div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Pinnwand-Listen */}
        <details className="year" open>
          <summary>{lang === "de" ? "Pinnwand" : "Pinboard"}</summary>
          {bookmarkLists.length === 0 ? (
            <div style={{ padding: "8px", fontSize: 13, color: "var(--muted)" }}>
              <Link to="/pinnwand" onClick={handleLinkClick}>
                {lang === "de" ? "Listen verwalten" : "Manage lists"}
              </Link>
            </div>
          ) : (
            <ul className="year-list">
              {bookmarkLists.map((list: BookmarkList) => (
                <li key={list.id}>
                  <Link 
                    to="/pinnwand"
                    onClick={handleLinkClick}
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span style={{ fontWeight: 600 }}>⭐ {list.name}</span>
                    <span style={{ fontSize: 11, opacity: 0.7 }}>{list.bookmarks.length} Rezepte</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </details>

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
                    <Link 
                      to={`/plan/${p.slug}?lang=${lang}`}
                      onClick={handleLinkClick} 
                    >
                      {p.meta.sidebar || `${p.meta.title ?? p.meta.id} (${p.startDate})`}
                    </Link>
                  </li>
                ))}
            </ul>
          </details>
        ))}

        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noreferrer"
          className="sidebar-support-btn"
          onClick={handleLinkClick}
        >
          <span aria-hidden="true">♥</span>
          <span>{lang === "de" ? "Projekt unterstützen" : "支持项目"}</span>
        </a>
      </div>
    </aside>
  );
}

function BookmarkPage({ plans }: { plans: PlanRecord[] }) {
  const { lang } = useLang();
  const { bookmarks, removeBookmark } = useBookmarks();

  const bookmarkedRecipes = useMemo(() => {
    const res: { plan?: PlanRecord, recipe: Recipe, bookmark: Bookmark }[] = [];
    for (const b of bookmarks) {
      const plan = plans.find(p => p.slug === b.planSlug);
      const recipe = plan?.recipes.find(r => r.id === b.recipeId);
      res.push({
        plan,
        recipe: recipe ?? {
          id: b.recipeId,
          title: b.recipeTitle,
        },
        bookmark: b,
      });
    }
    return res;
  }, [bookmarks, plans]);

  if (bookmarkedRecipes.length === 0) {
    return (
      <div className="main-inner" style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2>Deine Merkliste ist noch leer</h2>
        <p style={{ color: "var(--muted)" }}>Pinne Rezepte mit dem Stern-Symbol, um sie hier zu sammeln.</p>
        <Link to="/" style={{ color: "var(--accent-2)", fontWeight: 600 }}>Zurück zu den Plänen</Link>
      </div>
    );
  }

  return (
    <div className="main-inner" style={{ padding: isMobile() ? "0 8px" : "0 20px" }}>
      <div style={{ marginBottom: isMobile() ? 16 : 32, padding: "0 8px" }}>
        <h1 style={{ fontSize: isMobile() ? "20px" : "32px", marginBottom: 4 }}>{lang === "de" ? "Meine Merkliste" : "我的收藏"}</h1>
        <p style={{ color: "var(--muted)", fontSize: isMobile() ? "13px" : "16px" }}>{bookmarkedRecipes.length} Rezepte gespeichert</p>
      </div>
      <div style={{ display: "grid", gap: isMobile() ? 12 : 24 }}>
        {bookmarkedRecipes.map(({ plan, recipe, bookmark }) => {
          const planTitle = plan?.meta.title ?? bookmark.planTitle;
          const planSlug = plan?.slug ?? bookmark.planSlug;
          return (
            <div key={`${bookmark.planSlug}-${recipe.id}`} style={{ border: "1px solid var(--border)", borderRadius: 14, background: "var(--panel)", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ 
                padding: isMobile() ? "6px 12px" : "10px 16px", 
                background: "var(--grad-hero)", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                borderBottom: "1px solid var(--border)"
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(0,0,0,0.5)", textTransform: "uppercase" }}>
                  {planTitle}
                </span>
                <button 
                  onClick={() => removeBookmark(bookmark.planSlug, recipe.id)}
                  style={{ 
                    background: "rgba(255,255,255,0.7)", 
                    border: "none", 
                    color: "#ef4444", 
                    cursor: "pointer", 
                    fontSize: 14,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  title="Entfernen"
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: isMobile() ? 12 : 20 }}>
                <h2 style={{ marginTop: 0, fontSize: isMobile() ? "16px" : "22px", lineHeight: 1.2, marginBottom: 8 }}>{recipe.title}</h2>
                {recipe.desc && !isMobile() && <p style={{ fontStyle: "italic", color: "var(--muted)", fontSize: "14px", lineHeight: 1.5 }}>{recipe.desc}</p>}
                <Link 
                  to={`/plan/${planSlug}#meal-${recipe.id}`} 
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center",
                    padding: isMobile() ? "6px 14px" : "10px 20px", 
                    background: "var(--accent-2)", 
                    color: "#fff", 
                    borderRadius: 10, 
                    textDecoration: "none", 
                    fontWeight: 600,
                    fontSize: isMobile() ? "12px" : "14px"
                  }}
                >
                  Öffnen →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HomePage({ plans }: { plans: PlanRecord[] }) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const currentPlan = useMemo(() => pickCurrent(plans, lang), [plans, lang]);
  const currentPlanPreview = currentPlan?.recipes.slice(0, 3) ?? [];
  const latestPlans = useMemo(() => {
    return plans
      .filter((plan) => plan.lang === lang && plan.slug !== currentPlan?.slug)
      .sort((a, b) => b.startDate.localeCompare(a.startDate))
      .slice(0, 4);
  }, [plans, lang, currentPlan?.slug]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Moving Kitchen Tales</h1>
          <p className="hero-subtitle">Wo Wochenpläne nach Filmnacht, Streetfood und Zuhause schmecken.</p>
          <p className="hero-text">
            Koch dich durch animierte Comfort-Food-Momente, Asia-Klassiker, Reiskocher-Magie und virale Küchenhacks.
            Kuratiert als Wochenpläne, gemacht für echte Tage, an denen Essen trotzdem ein kleines Ereignis sein darf.
          </p>
          <div className="hero-btns">
            {currentPlan && (
              <button 
                className="btn-primary" 
                onClick={() => navigate(`/plan/${currentPlan.slug}?lang=${lang}`)}
              >
                Zum aktuellen Plan
              </button>
            )}
            <button 
              className="btn-secondary" 
              onClick={() => {
                const classics = plans.find(p => p.meta.title?.includes("Woche 1") && p.lang === lang);
                if (classics) navigate(`/plan/${classics.slug}?lang=${lang}`);
              }}
            >
              Entdecke die Klassiker
            </button>
            <a
              className="btn-support"
              href={SUPPORT_URL}
              target="_blank"
              rel="noreferrer"
            >
              Projekt unterstützen
            </a>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-kicker">So funktioniert's</div>
        <h2>Plan auf, Hunger an, loskochen.</h2>
        <div className="steps-grid">
          <div className="step-card">
            <span>1</span>
            <h3>Woche auswählen</h3>
            <p>Spring in den aktuellen Plan oder stöbere durch alte Küchenkapitel.</p>
          </div>
          <div className="step-card">
            <span>2</span>
            <h3>Gericht kochen</h3>
            <p>Frühstück, Lunch, Dinner: mit klaren Zutaten, Alltagstempo und genug Story.</p>
          </div>
          <div className="step-card">
            <span>3</span>
            <h3>Favoriten pinnen</h3>
            <p>Sammle Lieblinge in Merkliste und Pinnwand, damit gute Ideen nicht verschwinden.</p>
          </div>
        </div>
      </section>

      {currentPlan ? (
        <section className="current-plan-section">
          <div className="current-plan-copy">
            <div className="section-kicker">Aktueller Wochenplan</div>
            <h2>{currentPlan.meta.title} <span>{currentPlan.startDate}</span></h2>
            <p>
              Ein kompletter Plan mit drei Mahlzeiten pro Tag, viel Asia-Comfort, Reiskocher-Ideen
              und genug Abwechslung, damit die Woche nicht nach Routine schmeckt.
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate(`/plan/${currentPlan.slug}?lang=${lang}`)}
            >
              Aktuellen Plan öffnen
            </button>
          </div>
          <div className="current-plan-recipes">
            {currentPlanPreview.map((recipe) => (
              <Link key={recipe.id} to={`/plan/${currentPlan.slug}#meal-${recipe.id}`}>
                <strong>{recipe.title}</strong>
                {recipe.desc ? <span>{recipe.desc}</span> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {latestPlans.length > 0 ? (
        <section className="latest-plans-section">
          <div className="latest-plans-head">
            <div>
              <div className="section-kicker">Frisch aus der Küche</div>
              <h2>Neue Kapitel, wenn du direkt weiterkochen willst.</h2>
            </div>
            <span>{latestPlans.length} Vorschläge</span>
          </div>
          <div className="latest-plans-grid">
            {latestPlans.map((plan) => {
              const teaserRecipe = plan.recipes[0];
              return (
                <Link key={plan.slug} className="latest-plan-card" to={`/plan/${plan.slug}?lang=${lang}`}>
                  <span>{plan.startDate}</span>
                  <h3>{plan.meta.title ?? plan.meta.id}</h3>
                  {teaserRecipe ? <p>{teaserRecipe.title}</p> : null}
                  <strong>Plan öffnen</strong>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Categories */}
      <section className="categories">
        <div className="cat-card">
          <div className="cat-icon">🎬</div>
          <h3>Studio Classics</h3>
          <p>Gerichte mit dieser warmen Filmküchen-Energie: dampfende Schalen, knusprige Toasts und Essen, das sofort nach Szene klingt.</p>
        </div>
        <div className="cat-card">
          <div className="cat-icon">🔥</div>
          <h3>Viral Asia-Hits</h3>
          <p>TikTok-Tricks mit Substanz: Rice-Paper-Hacks, knusprige Airfryer-Ideen und schnelle Bowls mit echter Alltagstauglichkeit.</p>
        </div>
        <div className="cat-card">
          <div className="cat-icon">⏲️</div>
          <h3>The 10-Minute Pantry</h3>
          <p>Für Tage mit wenig Energie und großem Hunger: Vorratsküche, Reiskocher, ein paar Handgriffe, fertig ist das Kapitel.</p>
        </div>
      </section>

      <section className="pinboard-teaser">
        <div>
          <div className="section-kicker">Merkliste & Pinnwand</div>
          <h2>Deine Lieblingsgerichte bekommen einen festen Platz.</h2>
          <p>
            Markiere Rezepte mit dem Stern oder sortiere sie in eigene Pinnwände:
            schnelle Lunches, Reiskocher-Favoriten, Comfort Food, Wochenende, Gäste.
          </p>
        </div>
        <Link className="btn-secondary" to="/pinnwand">
          Pinnwand öffnen
        </Link>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <p className="quote">
            "Manche Gerichte bleiben im Kopf, weil sie mehr erzählen als ein Rezept: von Zuhause, Aufbruch, Trost und kleinen Abenteuern am Küchentisch."
          </p>
          <p>
            <strong>Moving Kitchen Tales</strong> ist kein trockenes Kocharchiv, sondern ein wachsendes Küchen-Universum:
            Wochenpläne mit Frühstück, Mittagessen und Abendessen, inspiriert von asiatischer Hausmannskost,
            animierten Food-Momenten und viralen Ideen, die auch nach Feierabend noch machbar bleiben.
          </p>
          <div className="teaser">
            Such dir einen Plan aus, pinne deine Favoriten und bau dir deine eigene kleine Küchenreise zusammen.
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p><em>"Ein Plan für die Woche. Ein Teller für die Stimmung. Eine Geschichte nach der anderen."</em></p>
        <div className="home-footer-links">
          <a href="https://abteilung83.at" target="_blank" rel="noreferrer">
            Made with love by abteilung83.at & Imprint
          </a>
        </div>
      </footer>
    </div>
  );
}

function PlanPage({ plans }: { plans: PlanRecord[] }) {
  const { slug = "" } = useParams();
  const { lang } = useLang();
  const { hash } = useLocation();
  const nav = useNavigate();
  const current = plans.find(p => p.slug === slug);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        setTimeout(() => {
          const elRetry = document.getElementById(id);
          if (elRetry) elRetry.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [hash, slug]);

  if (!current) return <div className="main-inner">Plan nicht gefunden: {slug}</div>;
  if (current.lang !== lang) {
    const sibling = plans.find(p => p.baseId === current.baseId && p.lang === lang);
    if (sibling) {
      nav(`/plan/${sibling.slug}?lang=${lang}`, { replace: true });
      return null;
    }
  }
  const Cmp = current.Component;
  return (<div className="main-inner"><Cmp /></div>);
}

function HomeRedirect({ plans }: { plans: PlanRecord[] }) {
  const currentDE = pickCurrent(plans, "de");
  if (!currentDE) return <div className="main-inner">Keine DE-Pläne gefunden.</div>;
  return <Navigate to={`/plan/${currentDE.slug}?lang=de`} replace />;
}

export default function App() {
  const plans = usePlans();
  const [collapsed, setCollapsed] = useState(false);
  const { lang } = useLang();

  return (
    <LangProvider>
      <div className={`app-shell ${collapsed ? "collapsed" : ""}`}>
        {/* Mobile Top Bar */}
        <div className="mobile-top-bar">
          <button 
            className="sidebar-toggle-btn" 
            onClick={() => setCollapsed(!collapsed)} 
            title={collapsed ? "Ausklappen" : "Einklappen"}
          >
            <span className="toggle-icon"></span>
          </button>
          <div className="mobile-brand">Moving Kitchen Tales</div>
        </div>

        <Sidebar plans={plans} collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage plans={plans} />} />
            <Route path="/bookmarks" element={<BookmarkPage plans={plans} />} />
            <Route path="/pinnwand" element={<PinnwandPage plans={plans} />} />
            <Route path="/plan/:slug" element={<PlanPage plans={plans} />} />
            <Route path="*" element={<HomePage plans={plans} />} />
          </Routes>
        </main>
        <BackToTop />
      </div>
    </LangProvider>
  );
}
