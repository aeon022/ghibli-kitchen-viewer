// src/plans/2026/Woche-3-2026-01-12.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 3 (Start: 2026-01-12)
  Vorlage: Woche 2 – identisches Layout/Verhalten.
  Fokus: JP/CN, schwangerschaftssicher (T1), viele Fisch/Meeresfrüchte.
  Reiskocher: täglich 1× (inkl. Trend-Gerichte am Ende als Übersicht).
*/

// ---- Meta ----
export const meta = {
  title: "Woche 3",
  startDate: "2026-01-12",
  id: "woche-3-2026-01-12",
  lang: "de",
  sidebar: "Woche 3 (2026-01-12)",
};

const FILE_BASE = "Woche 3 2026-01-12";

const UI_TITLES = {
  main: "Rezepte Woche 3",
  list: "Einkaufsliste Woche 3",
};

// ---- THEME (identisch zu Woche 2) ----
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
    const fn = (e) => setPref(e.matches);
    m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);
  return pref;
}
function themeVars(mode) {
  return mode === "dark" ? THEME_VARS_DARK : THEME_VARS_LIGHT;
}

// ---- Gate / Lang Hint ----
function getLangFromQuery() {
  if (typeof window === "undefined") return null;
  try {
    const qs = new URLSearchParams(window.location.search);
    const fromQuery = qs.get("lang");
    return fromQuery ? String(fromQuery).slice(0, 2).toLowerCase() : null;
  } catch { return null; }
}
function useLangHint() {
  const [q, setQ] = useState(getLangFromQuery());
  useEffect(() => {
    const onChange = () => setQ(getLangFromQuery());
    window.addEventListener?.("popstate", onChange);
    window.addEventListener?.("hashchange", onChange);
    return () => {
      window.removeEventListener?.("popstate", onChange);
      window.removeEventListener?.("hashchange", onChange);
    };
  }, []);
  return q;
}

// ---- Helper: Safe Scroll ----
const scrollToId = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const cardPanelStyle = {
  background: "var(--panel)",
  borderRadius: 18,
  padding: 24,
  boxShadow: "var(--shadow)",
  border: "1px solid var(--border)",
};

const tagChip = (text) => (
  <span className="ghk-chip" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "var(--chip-bg)", border: "1px solid var(--border)", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    {text}
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-01-12)",
  di: "Dienstag (2026-01-13)",
  mi: "Mittwoch (2026-01-14)",
  do: "Donnerstag (2026-01-15)",
  fr: "Freitag (2026-01-16)",
  sa: "Samstag (2026-01-17)",
  so: "Sonntag (2026-01-18)",
};

// -----------------------------------------------------------------------
// DATA – 21 Rezepte (JP/CN, mild, schwangerschaftssicher). Täglich 1× Reiskocher.
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Lachs-Okayu 鮭お粥 (japanischer Reisbrei)",
    desc: "Sehr mildes Frühstück: Reisbrei mit zarten Lachsflocken und Ingwer.",
    story: "Okayu ist Japans sanfter Magenwärmer; perfekt im Winter. Lachs liefert Omega-3.",
    target: "≈70 g KH (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Wasser 800 ml",
      "Lachsfilet 180 g",
      "Ingwer 8 g",
      "Frühlingszwiebel 10 g",
      "Sojasauce natriumarm 5 ml"
    ],
    steps: [
      "Reis waschen. Lachs in grobe Stücke schneiden.",
      "Alles außer Frühlingszwiebel in den Reiskocher geben.",
      "Programm 'Porridge/Congee' starten (ca. 45–60 Min).",
      "Lachs zerzupfen, mit Frühlingszwiebeln servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Lachs komplett gegart",
    swaps: "Lachs ↔ Kabeljau; Ingwer ↔ Karotte",
    side: "Warmes Wasser oder milden Grüntee.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:9–1:10", notes: "Sehr weich & bekömmlich." },
  },
  {
    id: "mo-m",
    title: "Teriyaki-Kabeljau 丼 (鱈照り焼き丼)",
    desc: "Sanft glasierter Kabeljau auf Reis, salzarm.",
    story: "Teriyaki ist ein japanischer Klassiker; hier mit natriumarmer Sojasauce.",
    target: "≈78 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Kabeljaufilet 220 g",
      "Sojasauce natriumarm 15 ml",
      "Mirin 5 ml",
      "Ingwer 5 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis kochen.",
      "Fisch anbraten, Teriyaki (Soja+Mirin+Ingwer+etwas Wasser) zugeben.",
      "Glasieren (5–6 Min), auf Reis anrichten, Zwiebel darüber."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Fisch durch",
    swaps: "Kabeljau ↔ Seelachs",
    side: "Gurkenscheiben, mild eingelegt.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Xiā Chǎo Fàn 虾炒饭 (milde Garnelen-Reispfanne)",
    desc: "Schonend gebratener Reis mit Garnelen und Pak Choi.",
    story: "Chinesische Hausmannskost – mit wenig Öl und viel Gemüse.",
    target: "≈72 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Garnelen (geschält) 180 g",
      "Pak Choi 200 g",
      "Karotte 80 g",
      "Sojasauce natriumarm 10 ml",
      "Sesamöl 5 ml"
    ],
    steps: [
      "Reis vorkochen und abkühlen lassen.",
      "Garnelen in Pfanne garen (3–4 Min), herausnehmen.",
      "Gemüse dünsten, Reis und Soja zugeben, Garnelen unterheben."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Garnelen durchgegart",
    swaps: "Pak Choi ↔ Zucchini",
    side: "Milder Jasmintee.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Sake-Jiru 鮭汁 (Miso-Lachs-Suppe, mild)",
    desc: "Wärmende Misosuppe mit Lachs, Tofu und Gemüse.",
    story: "Nordjapanisch inspiriert; kräftig, aber magenfreundlich zubereitet.",
    target: "≈60 g KH (2 P.) · Protein ≈23 g p. P.",
    ingredients: [
      "Dashi 600 ml",
      "Miso-Paste 20 g",
      "Lachsfilet 160 g",
      "Tofu 150 g",
      "Karotte 80 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Dashi erhitzen, Karotte 5 Min sieden.",
      "Lachs und Tofu zugeben, 6–8 Min leise köcheln (durch).",
      "Miso einrühren (nicht kochen), abbiegen, Zwiebel drauf."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈60 g KH · Schwangerschaft ✓",
    swaps: "Lachs ↔ Weißer Fisch",
    side: "Kleine Portion Reis (inkludiert in KH).",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Knoblauch-Butter-Garnelen-Reis (ライスクッカー)",
    desc: "Trend: Alles in den Reiskocher – Reis, Garnelen, Knoblauch, mild gewürzt.",
    story: "Beliebtes Netz-One-Pot; schnell, proteinreich und familienfreundlich.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (geschält) 200 g",
      "Knoblauch 6 g",
      "Sojasauce natriumarm 10 ml",
      "Butter 15 g",
      "Gemüsebrühe 250 ml"
    ],
    steps: [
      "Reis waschen, mit Brühe und Soja in den Topf.",
      "Knoblauch fein hacken, Butter in Stücken dazu.",
      "Garnelen obenauf legen. Programm 'White Rice/Mixed' starten.",
      "Nach Ende mischen und 2 Min nachdämpfen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Garnelen durch",
    swaps: "Garnelen ↔ Tofu + Erbsen",
    side: "Gedämpfter Brokkoli.",
    remind: false,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe bis Markierung", notes: "Dump-&-Go Variante." },
  },
  {
    id: "di-a",
    title: "Qīngdùn Yú 清炖鱼 (sanfte Fischsuppe)",
    desc: "Klar gekochter Weißfisch mit Ingwer & Gemüse, sehr leicht.",
    story: "Chinesische Schonkost – ideal am Abend.",
    target: "≈62 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Weißer Fisch 260 g",
      "Ingwer 8 g",
      "Pak Choi 200 g",
      "Karotte 80 g",
      "Gemüsebrühe 700 ml",
      "Reis (roh) 80 g"
    ],
    steps: [
      "Brühe aufsetzen, Ingwer & Karotte 8 Min sieden.",
      "Fischstücke 6–8 Min leise gar ziehen lassen.",
      "Pak Choi zugeben, kurz garen. Mit Reis servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Fisch durch",
    swaps: "Pak Choi ↔ Spinat",
    side: "Reis separat kochen.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Reiskocher-Pancake 炊飯器パンケーキ (mild)",
    desc: "Fluffiger Frühstücks-„Kuchen“ aus dem Reiskocher, wenig Zucker.",
    story: "Beliebter Netz-Trend; Eier komplett durchgegart.",
    target: "≈75 g KH (2 P.) · Protein ≈14 g p. P.",
    ingredients: [
      "Mehl 120 g",
      "Backpulver 1 TL",
      "Eier 2 Stück",
      "Milch 120 ml",
      "Honig 12 g",
      "Öl 5 ml"
    ],
    steps: [
      "Teig rühren, Topf leicht ölen.",
      "Teig in den Reiskocher, Programm 'Cake/Steam' 25–30 Min.",
      "Stäbchenprobe, 5 Min ruhen, stürzen."
    ],
    checks: "Gastritis – mild · Diabetes ⚠︎ – ≈75 g KH · Schwangerschaft ✓ Eier fest",
    swaps: "Mehl ↔ Dinkelmehl; Honig ↔ wenig Zucker",
    side: "Ungezuckerter Naturjoghurt.",
    remind: true,
    riceCooker: { enabled: true, program: "Cake / Steam", water: "Bei Steam Wasser lt. Markierung", notes: "Ei vollständig stocken lassen." },
  },
  {
    id: "mi-m",
    title: "Ebi-Soba 海老蕎麦 (Garnelen mit Buchweizennudeln)",
    desc: "Soba mit kurz gegarten Garnelen & Gemüse, leicht.",
    story: "Japanischer Alltagsklassiker – soba hat einen moderaten GI.",
    target: "≈82 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Soba (trocken) 120 g",
      "Garnelen (geschält) 160 g",
      "Zucchini 120 g",
      "Karotte 80 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 5 ml"
    ],
    steps: [
      "Soba kochen, abspülen.",
      "Gemüse kurz dünsten, Garnelen 3–4 Min garen.",
      "Mit Soba und Soja/Sesamöl vermengen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓",
    swaps: "Garnelen ↔ Tofu; Soba ↔ Udon",
    side: "Einfacher Gurkensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Gedämpfte Miesmuscheln 清蒸青口 (mit Ingwer)",
    desc: "Miesmuscheln behutsam gedämpft, klarer Sud.",
    story: "Chinesisch inspiriert; Muscheln stets gut durchgaren.",
    target: "≈60 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Miesmuscheln 600 g",
      "Ingwer 10 g",
      "Knoblauch 1 Zehe",
      "Frühlingszwiebel 10 g",
      "Gemüsebrühe 300 ml",
      "Reis (roh) 80 g"
    ],
    steps: [
      "Muscheln waschen, offene aussortieren.",
      "Brühe mit Ingwer aufkochen, Muscheln 5–7 Min dämpfen (alle geöffnet).",
      "Mit Reis servieren, Sud übergießen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈60 g KH · Schwangerschaft ✓ Muscheln voll durch",
    swaps: "Miesmuscheln ↔ Venusmuscheln",
    side: "Gedünsteter Spinat.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Kabeljau-Congee 鱈魚粥 (mild)",
    desc: "Sanfter Reisbrei mit Kabeljau und Karotte.",
    story: "Canton-Style Congee, ideal bei empfindlichem Magen.",
    target: "≈68 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Wasser 800 ml",
      "Kabeljaufilet 180 g",
      "Karotte 80 g",
      "Ingwer 6 g",
      "Sojasauce natriumarm 5 ml"
    ],
    steps: [
      "Reis waschen, mit Wasser aufsetzen (Topf, 45–60 Min leise kochen).",
      "Karotte und Ingwer zugeben, 10 Min mitköcheln.",
      "Fisch einlegen, 6–8 Min gar ziehen lassen, mild würzen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓",
    swaps: "Kabeljau ↔ Seelachs",
    side: "Lauwarmer Grüntee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Udon mit Lachs & Spinat 鮭うどん",
    desc: "Klare Brühe mit Udon, Lachswürfeln und Spinat.",
    story: "Schlicht, sättigend, mit omega-3-reichem Fisch.",
    target: "≈86 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Udon (vorgegart) 400 g",
      "Lachsfilet 180 g",
      "Dashi 700 ml",
      "Sojasauce natriumarm 10 ml",
      "Spinat 120 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Dashi aufkochen, Soja zugeben.",
      "Udon 2–3 Min erwärmen, Lachs 4–5 Min gar ziehen lassen.",
      "Spinat kurz unterheben, servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ Lachs durch",
    swaps: "Lachs ↔ Kabeljau",
    side: "Radieschen-Pickles (mild).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Hotate Shōyu-Butter Gohan ホタテ醤油バターご飯",
    desc: "Reiskocher-Reis mit Jakobsmuscheln, Soja & Butter – sanft, aromatisch.",
    story: "Beliebt online: dump-and-go Jakobsmuschel-Reis.",
    target: "≈82 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Jakobsmuscheln 220 g",
      "Dashi 240 ml",
      "Sojasauce natriumarm 12 ml",
      "Butter 12 g",
      "Ingwer 5 g"
    ],
    steps: [
      "Reis waschen, mit Dashi/Soja in Topf.",
      "Jakobsmuscheln & Ingwer obenauf, Butter in Flöckchen.",
      "Programm 'Mixed/White Rice' starten, 10 Min ruhen, mischen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Muscheln durch",
    swaps: "Jakobsmuscheln ↔ Garnelen",
    side: "Blanchierter Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi bis Markierung", notes: "Nicht umrühren vor dem Garen." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Lachs-Ochazuke 茶漬け (mit Dashi)",
    desc: "Warmer Reis mit heißer Dashi übergossen und Lachsflocken.",
    story: "Japanisches Komfortgericht – leicht & beruhigend.",
    target: "≈66 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Dashi 500 ml",
      "Lachsfilet 150 g",
      "Frühlingszwiebel 10 g",
      "Sojasauce natriumarm 5 ml",
      "Sesam 6 g"
    ],
    steps: [
      "Reis kochen. Lachs garen und zerzupfen.",
      "Reis in Schalen, Lachs darauf.",
      "Mit heißer Dashi übergießen, mild würzen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓",
    swaps: "Lachs ↔ Weißer Fisch; Dashi ↔ Gemüsebrühe",
    side: "Eingelegte Gurke (mild).",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Kaisen Takikomi Gohan 海鮮炊き込みご飯",
    desc: "Gemischter Reis aus dem Reiskocher mit weißem Fisch, Garnelen und Pilzen.",
    story: "Beliebter Herbst/Winter-Reis – hier als schonendes One-Pot-Gericht.",
    target: "≈84 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Weißer Fisch (Würfel) 120 g",
      "Garnelen (geschält) 120 g",
      "Shiitake 50 g",
      "Sojasauce natriumarm 15 ml",
      "Dashi 240 ml"
    ],
    steps: [
      "Reis waschen, mit Dashi und Sojasauce in den Topf.",
      "Fisch-/Garnelenstücke und Shiitake obenauf legen.",
      "Programm 'Mixed/White Rice' starten. Nach Ende 10 Min ruhen, dann locker unterheben."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓ Fisch/Meeresfrüchte durch",
    swaps: "Weißer Fisch ↔ Lachs; Shiitake ↔ Champignons",
    side: "Miso-Suppe (mild).",
    remind: false,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi bis Markierung (inkl. Soja)", notes: "Nicht vorzeitig öffnen." },
  },
  {
    id: "fr-a",
    title: "Yosenabe 鍋 (Meeresfrüchte-Hotpot)",
    desc: "Leichter Eintopf mit Kabeljau, Garnelen, Tofu & Gemüse.",
    story: "Winterlicher Klassiker – alles sanft gegart am Tisch.",
    target: "≈72 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Weißer Fisch 200 g",
      "Garnelen (geschält) 160 g",
      "Tofu 200 g",
      "Chinakohl 250 g",
      "Dashi 800 ml",
      "Reis (roh) 90 g"
    ],
    steps: [
      "Dashi erhitzen, Kohl 5–7 Min garen.",
      "Fisch, Garnelen, Tofu zugeben, 6–8 Min ziehen lassen.",
      "Mit Reis servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓",
    swaps: "Weißer Fisch ↔ Lachs",
    side: "Grüner Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Tuna-Onigiri ツナマヨおにぎり (pasteurisiert)",
    desc: "Reisbälle mit Thunfisch-Joghurt/Mayomix (pasteurisiert), mild.",
    story: "Bento-Liebling; Jod über Nori nur sparsam.",
    target: "≈70 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Thunfisch (Dose, abgetropft) 120 g",
      "Joghurt oder Mayo (pasteur.) 20 g",
      "Reisessig 8 ml",
      "Sesam 6 g",
      "Nori 2 g"
    ],
    steps: [
      "Reis kochen, lauwarm mit wenig Essig mischen.",
      "Thunfisch mit Joghurt/Mayo verrühren.",
      "Bälle formen, Füllung einarbeiten, Nori sparsam."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ (pasteurisiert)",
    swaps: "Thunfisch ↔ Lachsflocken",
    side: "Gemüsesticks.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Teriyaki-Lachs 丼 (mild, salzarm)",
    desc: "Zarter Lachs mit leichter Teriyaki-Glasur auf Reis.",
    story: "Schnelles Mittag – japanische Hausküche.",
    target: "≈86 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 220 g",
      "Sojasauce natriumarm 12 ml",
      "Mirin 6 ml",
      "Ingwer 5 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis kochen.",
      "Lachs in Pfanne garen, Glasur zugeben und kurz sirupartig reduzieren.",
      "Auf Reis anrichten, Zwiebel darüber."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓",
    swaps: "Lachs ↔ Weißer Fisch",
    side: "Gedämpfter Brokkoli.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Mais-Butter-Shōyu-Gohan とうもろこしご飯",
    desc: "Trendiges Mais-Reis-Gericht aus dem Reiskocher – süßlich & mild.",
    story: "Japanischer Sommerklassiker, online beliebt; buttrig und sanft.",
    target: "≈84 g KH (2 P.) · Protein ≈12 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Mais & Erbsen (TK) 160 g",
      "Dashi 240 ml",
      "Sojasauce natriumarm 10 ml",
      "Butter 12 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis waschen, mit Dashi/Soja in den Topf.",
      "Mais/Erbsen und Butter obenauf.",
      "Programm 'White Rice/Mixed' starten, danach mischen und Zwiebel zugeben."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓",
    swaps: "Mais ↔ Karottenwürfel",
    side: "Gegrillter Kabeljau (separat).",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Flüssigkeit bis Markierung", notes: "Sehr beliebt in Socials." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Tamagoyaki-Sando 卵サンド (Ei-Sandwich, gut gestockt)",
    desc: "Japanisches Ei-Sandwich mit vollständig gestocktem Ei & Vollkornbrot.",
    story: "Café-Klassiker; hier mild und schwangerschaftssicher.",
    target: "≈68 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Milch 40 ml",
      "Vollkornbrot 4 Scheiben",
      "Sojasauce natriumarm 5 ml",
      "Frühlingszwiebel 8 g",
      "Öl 5 ml"
    ],
    steps: [
      "Eier mit Milch/Soja verquirlen.",
      "In Pfanne langsam zu dickem Omelett braten (innen fest).",
      "Zwischen Brot geben, halbieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Ei fest",
    swaps: "Vollkornbrot ↔ Reis",
    side: "Tomatenscheiben.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Milder Mapo-Tofu 麻婆豆腐 (mit Lachs statt Schwein)",
    desc: "Sanfte Mapo-Variante mit Lachsflocken und Miso statt scharfer Paste.",
    story: "Sichuan-Klassiker, hier ent-schärft & fischreich.",
    target: "≈74 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Tofu (weich) 300 g",
      "Lachsfilet 180 g",
      "Miso-Paste 20 g",
      "Gemüsebrühe 200 ml",
      "Stärke 1 TL",
      "Reis (roh) 100 g"
    ],
    steps: [
      "Lachs garziehen, zerpflücken.",
      "Miso mit Brühe erhitzen, Tofu in Würfeln 5 Min simmern.",
      "Lachs zugeben, mit Stärke leicht binden, mit Reis servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓",
    swaps: "Lachs ↔ Weißer Fisch; Tofu ↔ fester Tofu",
    side: "Gedünsteter Pak Choi.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Viral Whole Tomato Rice 整个番茄饭 (2.0, mit Garnelen)",
    desc: "Die ganze Tomate kocht im Reiskocher mit – plus Garnelen für Protein.",
    story: "Netz-Hit: simpel, saftig, perfekt für faule Sonntage.",
    target: "≈86 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Tomate (groß) 1 Stück",
      "Garnelen (geschält) 160 g",
      "Olivenöl 10 ml",
      "Sojasauce natriumarm 10 ml",
      "Mais & Erbsen (TK) 80 g"
    ],
    steps: [
      "Reis & Wasser (oder milde Brühe) in den Topf, Soja/Öl zugeben.",
      "Tomate mittig platzieren, Garnelen & Gemüse außen herum.",
      "Programm 'White Rice' starten. Danach Tomate zerdrücken, alles mischen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ Garnelen durch",
    swaps: "Garnelen ↔ Pilze; Olivenöl ↔ Sesamöl (wenig)",
    side: "Spiegelei (gut durch) optional.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Etwas unter Normal (Tomatenwasser zählt)", notes: "Tomate sehr reif verwenden." },
  },
];

// -----------------------------------------------------------------------
// Shopping List
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenschenkel": { group: "Protein/Fisch/Tofu", label: "Hähnchenschenkel (o. Knochen)", unitDefault: "g" },
  "Rinderhack mager": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack", unitDefault: "g" },
  "Rindersteak": { group: "Protein/Fisch/Tofu", label: "Rindersteak/Minutensteaks", unitDefault: "g" },
  "Schweinefleisch": { group: "Protein/Fisch/Tofu", label: "Schweinefleisch (dünn)", unitDefault: "g" },
  "Weißer Fisch": { group: "Protein/Fisch/Tofu", label: "Weißer Fisch (Filet)", unitDefault: "g" },
  "Kabeljaufilet": { group: "Protein/Fisch/Tofu", label: "Kabeljau", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Jakobsmuscheln": { group: "Protein/Fisch/Tofu", label: "Jakobsmuscheln", unitDefault: "g" },
  "Miesmuscheln": { group: "Protein/Fisch/Tofu", label: "Miesmuscheln", unitDefault: "g" },
  "Tofu fest": { group: "Protein/Fisch/Tofu", label: "Tofu (fest)", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu (Natur/Seiden)", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },

  // Gemüse
  "Chinakohl": { group: "Gemüse/Pilze", label: "Chinakohl", unitDefault: "g" },
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis (Hokkaido)", unitDefault: "g" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel", unitDefault: "g" },
  "Sojasprossen": { group: "Gemüse/Pilze", label: "Sojasprossen (frisch)", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame (TK)", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten", unitDefault: "Stück" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate (groß)", unitDefault: "Stück" },
  "Mais": { group: "Gemüse/Pilze", label: "Mais & Erbsen (TK)", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh)", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba-Nudeln", unitDefault: "g" },
  "Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Goldhirse": { group: "Reis/Nudeln/Sättigung", label: "Goldhirse", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Reismehl": { group: "Reis/Nudeln/Sättigung", label: "Reismehl", unitDefault: "g" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "ml" },
  "Sojasauce natriumarm": { group: "Algen/Brühen/Würze", label: "Sojasauce (arm)", unitDefault: "ml" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "ml" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "ml" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "ml" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi/Fischbrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Sesam": { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "g" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig", unitDefault: "g" },
  "Backpulver": { group: "Algen/Brühen/Würze", label: "Backpulver", unitDefault: "TL" },
  "Maisstärke": { group: "Algen/Brühen/Würze", label: "Speisestärke", unitDefault: "TL" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "ml" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "g" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Zehe|Prise|Stangen|Scheiben|TL|EL)?/);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.includes(k));
      if (!key) {
        if (name.includes("Reis (roh)")) key = "Reis";
        else if (name.includes("Soba")) key = "Soba";
        else if (name.includes("Udon")) key = "Udon";
        else if (name.includes("Glasnudeln")) key = "Glasnudeln";
      }
      
      if (!key) continue;
      
      const c = canon[key];
      const id = `${key}`;
      
      if (!totals[id]) totals[id] = { key, label: c.label, unit: c.unitDefault, qty: 0, group: c.group };
      totals[id].qty += qty; 
    }
  }
  const groups = { "Protein/Fisch/Tofu": [], "Gemüse/Pilze": [], "Reis/Nudeln/Sättigung": [], "Algen/Brühen/Würze": [] };
  Object.values(totals).forEach((t) => {
    if(groups[t.group]) groups[t.group].push(t);
  });
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => a.label.localeCompare(b.label)));
  return groups;
}

// -----------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------

function animePlaceholder(title) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#FCE7F3'/><stop offset='100%' stop-color='#DCFCE7'/>
    </linearGradient></defs>
    <rect width='1200' height='675' fill='url(#g)'/>
    <g font-family='Noto Sans, Arial, sans-serif'>
      <text x='40' y='120' font-size='44' fill='#1F2937'>🍱 ${esc(title)}</text>
      <text x='40' y='180' font-size='20' fill='#374151'>GhibliKitchen</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw3" }) {
  const [src, setSrc] = useState("");
  
  useEffect(() => {
    const preferred = `/plan-art/${year}/${weekFolder}/${meal.id}.jpg`;
    const fallback = animePlaceholder(meal.title);
    setSrc(fallback);

    const img = new Image();
    img.onload = () => setSrc(preferred);
    img.onerror = () => setSrc(fallback);
    img.src = preferred;
  }, [meal, year, weekFolder]);

  return (
    <div className="ghk-art" style={{ position: "relative", borderRadius: 14, overflow: "hidden", marginBottom: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
      <img src={src} alt={meal.title} style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9", objectFit: "cover" }} loading="lazy" />
    </div>
  );
}

function MealCard({ meal }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(meta.id, meal.id);
  return (
    <div className="meal-card" style={cardPanelStyle} id={`meal-${meal.id}`}>
      <ImageBanner meal={meal} />
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
        <p style={{margin:0}}><strong>Beilage:</strong> {meal.side}</p>
      </div>

      {meal.riceCooker?.enabled ? (
        <div style={{ marginTop: 12 }}>
          <details>
            <summary style={{cursor:"pointer", fontWeight:600}}>Reiskocher-Details</summary>
            <ul style={{marginTop:8}}>
              <li><strong>Programm:</strong> {meal.riceCooker.program}</li>
              <li><strong>Wasser:</strong> {meal.riceCooker.water}</li>
              {meal.riceCooker.notes ? <li><strong>Info:</strong> {meal.riceCooker.notes}</li> : null}
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
        {dayName.replace(/\s*\(.+\)$/ , "")} <span className="ghk-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {meals.map((m) => <MealCard key={m.id} meal={m} />)}
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

  const pill = (key, text, targetId, rice) => (
    <a
      key={key}
      href={`#${targetId}`}
      onClick={scrollToId(targetId)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--panel)", textDecoration: "none", color: "var(--text)", boxShadow: "var(--shadow)", fontSize: 13, cursor: "pointer" }}
    >
      {rice ? "🍚" : "🍽️"} <span>{text}</span>
    </a>
  );

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ ...cardPanelStyle, background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="ghk-hero-inner" style={{ padding: 18, borderRadius: 12, marginBottom: 16, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            Woche 3 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>JP/CN · mild & schwangerschaftssicher · viel Fisch/Meeresfrüchte · 1× Reiskocher/Tag</p>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {DAYS_ORDER.map((d) => (
            <div key={d} style={{ padding: 12, borderRadius: 12, border: "1px solid var(--border)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <strong>{DAY_NAME_DE[d]}</strong>
                <a 
                  href={`#day-${d}`} 
                  onClick={scrollToId(`day-${d}`)}
                  style={{ fontSize: 12, color: "var(--text)", textDecoration: "none", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: 8, background: "var(--chip-bg)", cursor: "pointer" }}
                >
                  zum Tag ▿
                </a>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {byDay[d].map((m) => pill(m.id, m.title.replace(/ – .*$/, ""), `meal-${m.id}`, !!m.riceCooker?.enabled))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- RiceCooker Section (Trend-Übersicht) ----
function RiceCookerSection({ data }) {
  const perDay = useMemo(() => {
    const map = { mo: null, di: null, mi: null, do: null, fr: null, sa: null, so: null };
    for (const r of data) {
      const day = r.id.split("-")[0];
      if (r.riceCooker?.enabled && !map[day]) map[day] = r;
    }
    return map;
  }, [data]);

  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ borderBottom: "2px solid var(--border)", paddingBottom: 10, marginBottom: 20 }}>🍚 Reiskocher-Gerichte (Übersicht)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {DAYS_ORDER.map((d) => {
          const r = perDay[d];
          return (
            <div key={d} style={{ ...cardPanelStyle }}>
              <h3 style={{ marginTop: 0, fontSize: 16 }}>
                {DAY_NAME_DE[d].split(" ")[0]} – {r ? r.title : "Kein Reiskocher-Gericht"}
              </h3>
              {r ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li><strong>Programm:</strong> {r.riceCooker.program}</li>
                  <li><strong>Wasser:</strong> {r.riceCooker.water}</li>
                  {r.riceCooker.notes ? <li><strong>Notiz:</strong> {r.riceCooker.notes}</li> : null}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Trends dabei: Ganze-Tomate-Reis, Knoblauch-Butter-Garnelen-Reis, Hotate Shōyu-Butter Gohan, Mais-Butter-Shōyu-Gohan, Reiskocher-Pancake.</p>
    </section>
  );
}

// PDF Export
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
    html2canvas: { backgroundColor: "#FFFFFF", useCORS: true, logging: false, scale: 2, scrollY: -window.scrollY },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
  };
  try { await window.html2pdf().set(opt).from(clone).save(); } finally { clone.remove(); }
}

// Theme Switch Component
function ThemeSwitch({ mode, setMode, effectiveDark }) {
  return (
    <div className="ghk-theme-switch" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: 6, border: "1px solid var(--btn-border)", borderRadius: 999, background: "var(--panel)" }}>
      <button type="button" className="ghk-tab" aria-pressed={mode === "auto"} onClick={() => setMode(mode === "auto" ? (effectiveDark ? "dark" : "light") : "auto")} style={{ padding: "6px 10px" }}>Auto</button>
      <label className="ghk-switch" title={effectiveDark ? "Dunkel" : "Hell"}>
        <input type="checkbox" checked={effectiveDark} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} disabled={mode === "auto"} />
        <span className="ghk-slider" />
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------
// MAIN EXPORT
// -----------------------------------------------------------------------
export default function Woche3DE() {
  const langFromUrl = useLangHint();
  const hiddenByLang = langFromUrl && langFromUrl !== meta.lang;
  if (hiddenByLang) return null;

  const systemDark = useSystemPrefersDark();
  const [mode, setMode] = useState("auto");
  const effectiveDark = mode === "auto" ? systemDark : mode === "dark";
  const vars = themeVars(effectiveDark ? "dark" : "light");

  const [tab, setTab] = useState("kochbuch");
  const listGroups = useMemo(() => aggregateList(DATA, CANON), []);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k));
  }, [vars]);

  const doExportPDF = async () => {
    const el = document.getElementById("kochbuch-root");
    if (!el) return;
    await exportPdfFromRoot(el, `${meta.title} ${meta.startDate}.pdf`);
  };
  const doPrint = () => window.print();
  const doExportHTML = () => {
    const pageBg = getComputedStyle(document.documentElement).getPropertyValue("--bg")?.trim() || "#FFFFFF";
    const url = exportHTMLById("kochbuch-root", `${meta.title} ${meta.startDate}`, buildEmbedCss(), pageBg);
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${FILE_BASE}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const Styles = () => (
    <style>{`
      .meal-card p { line-height: 1.75; margin-bottom: 1rem; }
      .meal-card li { line-height: 1.7; margin-bottom: 0.5rem; }
      .meal-card h4 { margin-top: 1.5rem; margin-bottom: 0.75rem; color: var(--accent-2); font-weight: 700; }
      
      .ghk-tab { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 16px; border-radius: 12px; border: 1px solid var(--btn-border); background: var(--panel); color: var(--text); cursor: pointer; font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: all 0.2s ease; }
      .ghk-tab:hover { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-color: var(--accent-2); }
      .ghk-switch{ --w:48px; --h:28px; --k:22px; position:relative; display:inline-block; width:var(--w); height:var(--h); }
      .ghk-switch input{ opacity:0; width:0; height:0; position:absolute; }
      .ghk-switch .ghk-slider{ position:absolute; inset:0; border-radius:var(--h); background:var(--btn-border); border:1px solid var(--btn-border); transition:0.2s; }
      .ghk-switch .ghk-slider::before{ content:""; position:absolute; height:var(--k); width:var(--k); left:3px; top:50%; transform:translateY(-50%); border-radius:999px; background:var(--panel); box-shadow:var(--shadow); transition:transform .2s; }
      .ghk-switch input:checked + .ghk-slider{ background:var(--accent-2); border-color:var(--accent-2); }
      .ghk-switch input:checked + .ghk-slider::before{ transform:translateY(-50%) translateX(calc(var(--w) - var(--k) - 6px)); }

      .ghk-segment{ display:inline-flex; gap:4px; border:1px solid var(--btn-border); border-radius:999px; padding:4px; background:var(--panel); }
      .ghk-segment label{ position:relative; display:inline-flex; align-items:center; border-radius:999px; overflow:hidden; cursor:pointer; }
      .ghk-segment input[type="radio"]{ position:absolute; inset:0; opacity:0; cursor:pointer; }
      .ghk-segment span{ display:inline-block; padding:8px 14px; border-radius:999px; border:1px solid transparent; }
      .ghk-segment input[type="radio"]:checked + span{ background:var(--btn-on-bg); outline:2px solid var(--accent-2); outline-offset:1px; }

      #ghk-content{ display:block !important; }
      #ghk-content > [hidden]{ display:none !important; }

      .ghk-exporting{ width:794px !important; max-width:794px !important; margin:0 auto !important; background:#fff !important; box-sizing:border-box !important; font-size:12pt !important; line-height:1.45 !important; --bg:#FFFFFF; --text:#111827; --panel:#FFFFFF; --border:rgba(0,0,0,.12); --muted:#374151; --chip-bg:#F3F4F6; --btn-border:rgba(0,0,0,.15); --btn-on-bg:#F3F4F6; }
      .ghk-exporting *{ box-shadow:none !important; }
      .ghk-exporting .ghk-art, .ghk-exporting img{ display:none !important; visibility:hidden !important; }
      .ghk-exporting .ghk-chip, .ghk-exporting .ghk-date-paren{ display:none !important; }

      @media print { .ghk-art, .ghk-date-paren{ display:none !important; visibility:hidden !important; } html, body, #root { background:#fff !important; } aside, nav, header, footer, .ghk-no-print { display:none !important; } #kochbuch-root { width: calc(210mm - 24mm); margin:0 auto !important; background:#fff !important; border:none !important; box-shadow:none !important; } .ghk-hero, .ghk-hero-inner { background:#fff !important; box-shadow:none !important; } .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; } h2, h3 { break-after:avoid; page-break-after:avoid; } #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } a[href]:after { content:""; } }
    `}</style>
  );

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      <Styles />

      <div className="ghk-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div className="ghk-hero-inner" style={{ background: "var(--grad-hero)", borderRadius: 12, padding: 14, marginBottom: 12, display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`Start: ${meta.startDate}`)}
            {tagChip("Woche 3")}
            {tagChip("JP/CN · Mild · Schwangerschaft")}
            {tagChip("Täglich 1× 🍚 Reiskocher")}
          </div>
        </div>

        <div className="ghk-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <fieldset className="ghk-segment" role="radiogroup" aria-label="Ansicht wählen">
            <label>
              <input type="radio" name="ghk-view" value="kochbuch" checked={tab === "kochbuch"} onChange={() => setTab("kochbuch")} />
              <span>{UI_TITLES.main}</span>
            </label>
            <label>
              <input type="radio" name="ghk-view" value="liste" checked={tab === "liste"} onChange={() => setTab("liste")} />
              <span>{UI_TITLES.list}</span>
            </label>
          </fieldset>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginLeft: "auto" }}>
            <button type="button" onClick={doExportPDF} className="ghk-tab"><span className="icon">📄</span> PDF</button>
            <button type="button" onClick={doExportHTML} className="ghk-tab"><span className="icon">🌐</span> HTML</button>
            <button type="button" onClick={doPrint} className="ghk-tab"><span className="icon">🖨️</span> Drucken</button>
            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={DATA} DAY_NAME_DE={DAY_NAME_DE} meta={meta} />
        <div id="ghk-content" data-view={tab}>
          <section id="ghk-pane-kochbuch" aria-hidden={tab !== "kochbuch"} hidden={tab !== "kochbuch"}>
            {DAYS_ORDER.map((d) => (
              <DaySection key={d} dayKey={d} meals={ DATA.filter(r => r.id.startsWith(d)) } dayName={DAY_NAME_DE[d]} />
            ))}
            <RiceCookerSection data={DATA} />
          </section>
          <section id="ghk-pane-liste" aria-hidden={tab !== "liste"} hidden={tab !== "liste"}>
            {Object.entries(listGroups).map(([group, items]) => (
              <div key={group} style={{ marginBottom: 20 }}>
                <h3>{group}</h3>
                <ul>{items.map((it, idx) => <li key={idx}>{`${it.label} – ${Math.round(it.qty * 10) / 10} ${it.unit}`}</li>)}</ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
