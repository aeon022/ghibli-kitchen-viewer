// src/plans/PlanTemplate.jsx
import React, { useEffect, useMemo, useState } from "react";
import { ensureScript, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

const THEME_VARS_LIGHT = {
  "--bg": "#FAF7F1",
  "--text": "#111827",
  "--panel": "#FFFFFF",
  "--border": "rgba(0,0,0,.10)",
  "--muted": "#6B7280",
  "--chip-bg": "#EEF8F3",
  "--shadow": "0 8px 24px rgba(0,0,0,.12)",
  "--accent": "#e07a9a",
  "--accent-2": "#2aa769",
  "--grad-hero": "linear-gradient(135deg, rgba(224,122,154,.2), rgba(42,167,105,.18))",
  "--btn-on-bg": "#EEF8F3",
  "--btn-border": "rgba(0,0,0,.15)",
};
const THEME_VARS_DARK = {
  "--bg": "#0f1115",
  "--text": "#E5E7EB",
  "--panel": "#161A22",
  "--border": "rgba(255,255,255,.12)",
  "--muted": "#9CA3AF",
  "--chip-bg": "rgba(255,255,255,.06)",
  "--shadow": "0 10px 28px rgba(0,0,0,.45)",
  "--accent": "#e07a9a",
  "--accent-2": "#2aa769",
  "--grad-hero": "linear-gradient(135deg, rgba(224,122,154,.18), rgba(42,167,105,.15))",
  "--btn-on-bg": "rgba(255,255,255,.10)",
  "--btn-border": "rgba(255,255,255,.18)",
};

function useSystemPrefersDark() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!m) return;
    setPref(m.matches);
    const onChange = (e) => setPref(e.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return pref;
}
const themeVars = (mode) => (mode === "dark" ? THEME_VARS_DARK : THEME_VARS_LIGHT);

// ---------- Utilities ----------
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];

const cardPanelStyle = {
  background: "var(--panel)",
  borderRadius: 18,
  padding: 24, /* Etwas mehr Padding */
  boxShadow: "var(--shadow)",
  border: "1px solid var(--border)",
};

const tagChip = (text) => (
  <span
    className="ghk-chip"
    style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 999,
      background: "var(--chip-bg)",
      border: "1px solid var(--border)",
      fontSize: 12,
      marginRight: 6,
      marginBottom: 6,
    }}
  >
    {text}
  </span>
);

function animePlaceholder(title, subtitle = "") {
  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#FCE7F3'/><stop offset='100%' stop-color='#DCFCE7'/>
    </linearGradient></defs>
    <rect width='1200' height='675' fill='url(#g)'/>
    <g font-family='Noto Sans, Arial, sans-serif'>
      <text x='40' y='120' font-size='44' fill='#1F2937'>🍱 ${esc(title)}</text>
      <text x='40' y='180' font-size='20' fill='#374151'>Illustration placeholder</text>
      <text x='40' y='640' font-size='14' fill='#6B7280'>GhibliKitchen</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Einkaufsliste aggregieren
function aggregateList(data, CANON) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Blatt|Zehe|Prise)$/);
      if (!m) continue;
      const name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3];
      let key = Object.keys(CANON).find((k) => name.startsWith(k));
      if (!key) {
        if (name.includes("Brauner Reis")) key = "Brauner Reis";
        else if (name.includes("Vollkornreis")) key = "Vollkornreis";
        else if (name.includes("Reis (roh)")) key = "Reis";
        else if (name.includes("Soba")) key = "Soba";
        else if (name.includes("Udon")) key = "Udon";
        else if (name.includes("Glasnudeln")) key = "Glasnudeln";
        else if (name.includes("Vollkornnudeln")) key = "Vollkornnudeln";
      }
      if (!key) continue;
      const c = CANON[key];
      const id = `${key}|${unit || c.unitDefault}`;
      if (!totals[id]) totals[id] = { key, label: c.label, unit: unit || c.unitDefault, qty: 0, group: c.group };
      totals[id].qty += qty;
    }
  }
  const groups = { "Protein/Fisch/Tofu": [], "Gemüse/Pilze": [], "Reis/Nudeln/Sättigung": [], "Algen/Brühen/Würze": [] };
  Object.values(totals).forEach((t) => groups[t.group].push(t));
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => a.label.localeCompare(b.label)));
  return groups;
}

// ---------- Building blocks ----------
function ImageBanner({ meal, year, weekFolder = "kw1" }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const preferred = meal.image ?? `/plan-art/${year}/${weekFolder}/${meal.id}.jpg`;
    const fallback = animePlaceholder(meal.title);
    if (!preferred) return setSrc(fallback);
    const img = new Image();
    img.onload = () => setSrc(preferred);
    img.onerror = () => setSrc(fallback);
    img.src = preferred;
  }, [meal, year, weekFolder]);

  return (
    <div className="ghk-art" style={{ position: "relative", borderRadius: 14, overflow: "hidden", marginBottom: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
      <img src={src || animePlaceholder(meal.title)} alt={meal.title} style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9" }} loading="lazy" />
      <div style={{ position: "absolute", right: 10, bottom: 10, background: "rgba(0,0,0,.35)", color: "#fff", padding: "4px 10px", borderRadius: 999, fontSize: 12 }}>
        {src?.startsWith("/plan-art") ? "Artwork" : "Placeholder"}
      </div>
    </div>
  );
}

function MealCard({ meal, year }) {
  return (
    <div className="meal-card" style={cardPanelStyle} id={`meal-${meal.id}`}>
      <ImageBanner meal={meal} year={year} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3>
        <div>
          {tagChip(meal.target)}
          {meal.riceCooker?.enabled ? tagChip("🍚 Reiskocher") : null}
          {meal.remind ? tagChip("💊 Metformin") : null}
        </div>
      </div>
      {meal.desc ? <p style={{ marginTop: 8, color: "var(--muted)", fontStyle: "italic" }}>{meal.desc}</p> : null}
      
      <h4>Zutaten (2 Personen)</h4>
      <ul>{meal.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      
      <h4>Zubereitung</h4>
      <ol>{meal.steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>
      
      <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--chip-bg)", borderRadius: 12 }}>
        <p style={{margin:"0 0 4px"}}><strong>Hinweise:</strong> {meal.checks}</p>
        <p style={{margin:"0 0 4px"}}><strong>Austausche:</strong> {meal.swaps}</p>
        <p style={{margin:0}}><strong>Beilage & Getränke:</strong> {meal.side}</p>
      </div>

      {meal.riceCooker?.enabled ? (
        <div style={{ marginTop: 12 }}>
          <details>
            <summary style={{cursor:"pointer", fontWeight:600}}>Reiskocher-Details</summary>
            <ul style={{marginTop:8}}>
              <li><strong>Programm:</strong> {meal.riceCooker.program}</li>
              <li><strong>Wasserverhältnis:</strong> {meal.riceCooker.water}</li>
              {meal.riceCooker.notes ? <li><strong>Hinweise:</strong> {meal.riceCooker.notes}</li> : null}
            </ul>
          </details>
        </div>
      ) : null}
    </div>
  );
}

function DaySection({ dayKey, meals, dayName }) {
  return (
    <section className="day-section" style={{ marginBottom: 40 }} id={`day-${dayKey}`}>
      <h2 style={{ marginBottom: 16, borderBottom:"2px solid var(--border)", paddingBottom:8 }}>
        {dayName.replace(/\s*\(.+\)$/, "")} <span className="ghk-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {meals.map((m) => <MealCard key={m.id} meal={m} year={new Date().getFullYear()} />)}
      </div>
    </section>
  );
}

function WeekOverview({ data, DAY_NAME_DE, meta }) {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of data) map[r.id.split("-")[0]].push(r);
    return map;
  }, [data]);

  const pill = (key, text, href, rice) => (
    <a
      key={key}
      href={href}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--panel)", textDecoration: "none", color: "var(--text)", boxShadow: "var(--shadow)", fontSize: 13 }}
    >
      {rice ? "🍚" : "🍽️"} <span>{text}</span>
    </a>
  );

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ ...cardPanelStyle, background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="ghk-hero-inner" style={{ padding: 18, borderRadius: 12, marginBottom: 16, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            Woche 1 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Täglich 3 Mahlzeiten · 1× Reiskocher-Gericht pro Tag · mild, salzarm, schwangerschaftsgeeignet.</p>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {DAYS_ORDER.map((d) => (
            <div key={d} style={{ padding: 12, borderRadius: 12, border: "1px solid var(--border)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <strong>{DAY_NAME_DE[d]}</strong>
                <a href={`#day-${d}`} style={{ fontSize: 12, color: "var(--text)", textDecoration: "none", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: 8, background: "var(--chip-bg)" }}>
                  zum Tag ▿
                </a>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {byDay[d].map((m) => pill(m.id, m.title.replace(/ – .*$/, ""), `#meal-${m.id}`, !!m.riceCooker?.enabled))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- PDF Export ----------
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

async function exportPdfFromRoot(rootEl, filename) {
  await ensureScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");
  if (!window.html2pdf) throw new Error("html2pdf nicht verfügbar.");

  const clone = rootEl.cloneNode(true);
  clone.id = "kochbuch-export";
  clone.classList.add("ghk-exporting");
  document.body.appendChild(clone);
  window.scrollTo(0, 0);
  await nextFrame();

  const opt = {
    margin: [34, 28, 34, 28],
    filename,
    pagebreak: { mode: ["css", "legacy"], after: [".day-section"], avoid: [".meal-card", ".ghk-hero"] },
    html2canvas: { backgroundColor: "#FFFFFF", useCORS: true, logging: false, imageTimeout: 0, scale: 2, foreignObjectRendering: false, scrollX: 0, scrollY: -window.scrollY },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
  };

  try {
    await window.html2pdf().set(opt).from(clone).save();
  } finally {
    clone.remove();
  }
}

// ---------- Template-Komponente ----------
export default function PlanTemplate({
  meta,
  data,
  canon,
  dayNames,
  uiTitles = { main: "GhibliKitchen – Woche", list: "GhibliKitchen – Einkaufsliste" },
  year = 2026,
  options = { showImagesInViewer: true, pdf: { hideImages: true } },
}) {
  const systemDark = useSystemPrefersDark();
  const [mode, setMode] = useState("auto");
  const effectiveDark = mode === "auto" ? systemDark : mode === "dark";
  const vars = themeVars(effectiveDark ? "dark" : "light");

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k));
  }, [vars]);

  const [tab, setTab] = useState("kochbuch");
  const listGroups = useMemo(() => aggregateList(data, canon), [data, canon]);

  const doExportPDF = async () => {
    const el = document.getElementById("kochbuch-root");
    if (!el) return alert("Export: #kochbuch-root nicht gefunden.");
    try {
      await exportPdfFromRoot(el, `${meta.title} ${meta.startDate}.pdf`);
    } catch (e) {
      console.error(e);
      alert("PDF-Export fehlgeschlagen.");
    }
  };
  const doPrint = () => window.print();
  const doExportHTML = () => {
    const pageBg = getComputedStyle(document.documentElement).getPropertyValue("--bg")?.trim() || "#FFFFFF";
    const url = exportHTMLById("kochbuch-root", `${meta.title} ${meta.startDate}`, buildEmbedCss(), pageBg);
    if (!url) return alert("HTML-Export nicht verfügbar.");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meta.title} ${meta.startDate}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  // ---- Styles mit verbessertem Zeilenabstand ----
  const Styles = () => (
    <style>{`
      /* Bessere Lesbarkeit für Pläne */
      .meal-card p { line-height: 1.75; margin-bottom: 1rem; }
      .meal-card li { line-height: 1.7; margin-bottom: 0.5rem; }
      .meal-card h4 { margin-top: 1.5rem; margin-bottom: 0.75rem; color: var(--accent-2); font-weight: 700; }
      
      .ghk-tab { padding:8px 14px; border-radius:10px; border:2px solid var(--btn-border); background:transparent; color:var(--text); cursor:pointer; }
      .ghk-tab:hover { filter: brightness(1.03); }
      .ghk-switch{ --w:48px; --h:28px; --k:22px; position:relative; display:inline-block; width:var(--w); height:var(--h); }
      .ghk-switch input{ opacity:0; width:0; height:0; position:absolute; }
      .ghk-switch .ghk-slider{ position:absolute; inset:0; border-radius:var(--h); background:var(--btn-border); border:1px solid var(--btn-border); }
      .ghk-switch .ghk-slider::before{ content:""; position:absolute; height:var(--k); width:var(--k); left:3px; top:50%; transform:translateY(-50%); border-radius:999px; background:var(--panel); box-shadow:var(--shadow); transition:transform .2s; }
      .ghk-switch input:checked + .ghk-slider{ background:var(--accent-2); border-color:var(--accent-2); }
      .ghk-switch input:checked + .ghk-slider::before{ transform:translateY(-50%) translateX(calc(var(--w) - var(--k) - 6px)); }

      .ghk-segment{ display:inline-flex; gap:4px; border:1px solid var(--btn-border); border-radius:999px; padding:4px; background:var(--panel); }
      .ghk-segment label{ position:relative; display:inline-flex; align-items:center; border-radius:999px; overflow:hidden; }
      .ghk-segment input[type="radio"]{ position:absolute; inset:0; opacity:0; cursor:pointer; }
      .ghk-segment span{ display:inline-block; padding:8px 14px; border-radius:999px; border:1px solid transparent; }
      .ghk-segment input[type="radio"]:checked + span{ background:var(--btn-on-bg); outline:2px solid var(--accent-2); outline-offset:1px; }

      #ghk-content{ display:block !important; }
      #ghk-content > [hidden]{ display:none !important; }

      .ghk-exporting{ width:794px !important; max-width:794px !important; margin:0 auto !important; background:#fff !important; box-sizing:border-box !important; font-size:12pt !important; line-height:1.45 !important;
        --bg:#FFFFFF; --text:#111827; --panel:#FFFFFF; --border:rgba(0,0,0,.12); --muted:#374151; --chip-bg:#F3F4F6; --btn-border:rgba(0,0,0,.15); --btn-on-bg:#F3F4F6;
      }
      .ghk-exporting *{ box-shadow:none !important; }
      .ghk-exporting .ghk-art, .ghk-exporting img{ display:none !important; visibility:hidden !important; }
      .ghk-exporting .ghk-chip, .ghk-exporting .ghk-date-paren{ display:none !important; }

      @media print {
        .ghk-art, .ghk-date-paren{ display:none !important; visibility:hidden !important; }
      }

      @page { size: A4; margin:12mm; }
      @media print {
        html, body, #root { background:#fff !important; }
        aside, nav, header, footer, .ghk-no-print { display:none !important; }
        #kochbuch-root { width: calc(210mm - 24mm); margin:0 auto !important; background:#fff !important; border:none !important; box-shadow:none !important; }
        .ghk-hero, .ghk-hero-inner { background:#fff !important; box-shadow:none !important; }
        .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; }
        h2, h3 { break-after:avoid; page-break-after:avoid; }
        #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        a[href]:after { content:""; }
      }
    `}</style>
  );

  const Week = () => {
    const byDay = useMemo(() => {
      const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
      for (const r of data) map[r.id.split("-")[0]].push(r);
      return map;
    }, [data]);
    return (
      <>
        {DAYS_ORDER.map((d) => (
          <DaySection key={d} dayKey={d} meals={byDay[d]} dayName={dayNames[d]} />
        ))}
      </>
    );
  };

  const ShoppingList = () => {
    const Group = ({ name, items }) => (
      <div style={{ marginBottom: 20 }}>
        <h3>{name}</h3>
        <ul>{items.map((it, idx) => <li key={idx}>{`${it.label} – ${Math.round(it.qty * 10) / 10} ${it.unit}`}</li>)}</ul>
      </div>
    );
    return (
      <div>
        <Group name="Protein/Fisch/Tofu" items={listGroups["Protein/Fisch/Tofu"]} />
        <Group name="Gemüse/Pilze" items={listGroups["Gemüse/Pilze"]} />
        <Group name="Reis/Nudeln/Sättigung" items={listGroups["Reis/Nudeln/Sättigung"]} />
        <Group name="Algen/Brühen/Würze" items={listGroups["Algen/Brühen/Würze"]} />
      </div>
    );
  };

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      <Styles />

      <div className="ghk-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div className="ghk-hero-inner" style={{ background: "var(--grad-hero)", borderRadius: 12, padding: 14, marginBottom: 12, display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0 }}>{uiTitles.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`Start: ${meta.startDate}`)}
            {tagChip("Mahlzeiten/Woche: 21")}
            {tagChip("Salzarm · mild · alles durchgegart")}
            {tagChip("Täglich 1× 🍚 Reiskocher")}
          </div>
        </div>

        <div className="ghk-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <fieldset className="ghk-segment" role="radiogroup" aria-label="Ansicht wählen">
            <label htmlFor="view-kochbuch">
              <input id="view-kochbuch" type="radio" name="ghk-view" value="kochbuch" checked={tab === "kochbuch"} onChange={() => setTab("kochbuch")} aria-controls="ghk-content" />
              <span>{uiTitles.main}</span>
            </label>
            <label htmlFor="view-liste">
              <input id="view-liste" type="radio" name="ghk-view" value="liste" checked={tab === "liste"} onChange={() => setTab("liste")} aria-controls="ghk-content" />
              <span>{uiTitles.list}</span>
            </label>
          </fieldset>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button type="button" onClick={doExportPDF} className="ghk-tab" style={{ padding: "8px 12px" }}>⤓ PDF</button>
            <button type="button" onClick={doExportHTML} className="ghk-tab" style={{ padding: "8px 12px" }}>⤓ HTML</button>
            <button type="button" onClick={() => doPrint()} className="ghk-tab" style={{ padding: "8px 12px" }}>🖨️ Drucken</button>

            <div className="ghk-theme-switch" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: 6, border: "1px solid var(--btn-border)", borderRadius: 999, background: "var(--panel)" }}>
              <button type="button" className="ghk-tab" aria-pressed={mode === "auto"} onClick={() => setMode(mode === "auto" ? (effectiveDark ? "dark" : "light") : "auto")} style={{ padding: "6px 10px" }}>Auto</button>
              <label className="ghk-switch" title={effectiveDark ? "Dunkel" : "Hell"}>
                <input type="checkbox" checked={effectiveDark} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} disabled={mode === "auto"} />
                <span className="ghk-slider" />
              </label>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{mode === "auto" ? "System" : effectiveDark ? "Dunkel" : "Hell"}</span>
            </div>
          </div>
        </div>
      </div>

      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={data} DAY_NAME_DE={dayNames} meta={meta} />
        <div id="ghk-content" data-view={tab}>
          <section id="ghk-pane-kochbuch" aria-hidden={tab !== "kochbuch"} hidden={tab !== "kochbuch"}>
            <Week />
          </section>
          <section id="ghk-pane-liste" aria-hidden={tab !== "liste"} hidden={tab !== "liste"}>
            <ShoppingList />
          </section>
        </div>
      </div>
    </div>
  );
}