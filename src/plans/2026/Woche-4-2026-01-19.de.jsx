// src/plans/2026/Woche-4-2026-01-19.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 4 (Start: 2026-01-19)
  Design: Identisch zu Woche 3.
  Fix: Header-Bild (Gradient) repariert.
  Inhalt: CN/JP/KR, schwangerschaftsgeeignet, Reiskocher-Fokus.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 4",
  startDate: "2026-01-19",
  id: "woche-4-2026-01-19",
  lang: "de",
  sidebar: "Woche 4 (2026-01-19)",
};

const FILE_BASE = "Woche 4 2026-01-19";

const UI_TITLES = {
  main: "Rezepte Woche 4",
  list: "Einkaufsliste Woche 4",
};

// ---- THEME (Identisch zu Woche 3) ----
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
  mo: "Montag (2026-01-19)",
  di: "Dienstag (2026-01-20)",
  mi: "Mittwoch (2026-01-21)",
  do: "Donnerstag (2026-01-22)",
  fr: "Freitag (2026-01-23)",
  sa: "Samstag (2026-01-24)",
  so: "Sonntag (2026-01-25)",
};

// -----------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Tofu-Spinat-Zōsui 豆腐ほうれん草雑炊 (Reisbrei)",
    desc: "Japanischer Frühstücks-Reisbrei mit Tofu & Spinat – sehr mild, warm & ballaststoffreich.",
    story: "Zōsui ist ein leichter japanischer Reisbrei nach Suppenart – ideal für kalte Morgen.",
    target: "≈70 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Dashi 700 ml",
      "Tofu (fest) 180 g",
      "Spinat 120 g",
      "Sojasauce natriumarm 6 ml",
      "Ingwer 6 g"
    ],
    steps: [
      "Reis waschen, mit Dashi 35–40 Min leise sieden (Topf) oder Reiskocher Porridge.",
      "Tofu würfeln, Spinat grob schneiden, 5 Min vor Schluss zugeben.",
      "Mild mit Sojasauce abschmecken, heiß servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ (alles durchgegart)",
    swaps: "Spinat ↔ Pak Choi; Dashi ↔ Gemüsebrühe",
    side: "Jasmintee oder warmes Wasser.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:9–1:10", notes: "Sehr weich kochen." },
  },
  {
    id: "mo-m",
    title: "Bulgogi-Lachs Bowl 불고기 연어덮밥",
    desc: "Zarter Lachs in milder Bulgogi-Marinade auf Reis, mit Gurke & Sesam.",
    story: "Koreanisch inspiriertes Schnellgericht – würzig-süß, aber sanft.",
    target: "≈84 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 220 g",
      "Sojasauce natriumarm 12 ml",
      "Birne (gerieben) 40 g",
      "Knoblauch (fein) 4 g",
      "Sesam 6 g",
      "Gurke 120 g"
    ],
    steps: [
      "Reis kochen (Topf/Reiskocher).",
      "Lachs in Soja/Birne/Knoblauch 10 Min marinieren, dann 5–6 Min sanft anbraten bis durch.",
      "Auf Reis anrichten, Gurke und Sesam darüber."
    ],
    checks: "Gastritis – moderat würzen · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓ Lachs durch",
    swaps: "Lachs ↔ Kabeljau; Birne ↔ Apfel",
    side: "Pak‑Choi-Dämpfgemüse.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Gedämpftes Hähnchen mit Shiitake 清蒸香菇鸡",
    desc: "Canton-style: saftig gedämpftes Hähnchen mit Shiitake, Ingwersud, dazu Reis.",
    story: "Ein sanfter Klassiker aus der südchinesischen Küche – leicht, aromatisch.",
    target: "≈76 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 110 g",
      "Hähnchenbrust 300 g",
      "Shiitake 80 g",
      "Ingwer 8 g",
      "Sojasauce natriumarm 8 ml",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis kochen. Hähnchen in Streifen, Shiitake in Scheiben schneiden.",
      "Alles in flacher Schale mit Ingwer/Soja 12–14 Min dämpfen (gar).",
      "Mit Frühlingszwiebel bestreuen, Sud über den Reis geben."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Geflügel durch",
    swaps: "Hähnchen ↔ Tofu + Pilze",
    side: "Gedünsteter Babyspinat.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Gyeran-Bap Rühr-Ei-Reisschale 계란밥 (fest)",
    desc: "Koreanisches Komfortfrühstück – Reis mit vollständig gestocktem Rührei.",
    story: "Berühmtes Netz‑Frühstück; Ei hier komplett durchgegart.",
    target: "≈72 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Eier 3 Stück",
      "Sesamöl 5 ml",
      "Sojasauce natriumarm 6 ml",
      "Nori 1 g",
      "Frühlingszwiebel 8 g"
    ],
    steps: [
      "Reis kochen. Eier verquirlen und in Pfanne zu fester Rührei‑Textur braten.",
      "Reis in Schalen, Ei darüber, mit Soja und Sesamöl mild würzen.",
      "Nori und Zwiebel darüber."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Ei fest",
    swaps: "Nori ↔ Sesam",
    side: "Miso‑Suppe (mild).",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Soba mit Pilzen & Hähnchen きのこ蕎麦",
    desc: "Wärmende Buchweizennudeln mit Shiitake, Hähnchen und milder Soja‑Brühe.",
    story: "Alltagsküche aus Japan – nussige Soba, leicht verdaulich.",
    target: "≈82 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Soba (trocken) 120 g",
      "Hähnchenbrust 220 g",
      "Shiitake 80 g",
      "Dashi 700 ml",
      "Sojasauce natriumarm 12 ml",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Soba kochen, kalt abspülen.",
      "Dashi mit Soja erhitzen, Hähnchen 6–7 Min gar ziehen lassen, Pilze 3 Min.",
      "Soba in Brühe geben, Zwiebel darüber."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Geflügel durch",
    swaps: "Hähnchen ↔ Tofu; Soba ↔ Udon",
    side: "Gurkensalat (mild).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Reiskocher-Claypot‑Style Chicken 煲仔饭风味",
    desc: "Hähnchen, Shiitake & Reis gemeinsam im Reiskocher – knusprige Ränder light.",
    story: "Hongkong‑Inspiration in alltagstauglich: Dump‑and‑Go im Reiskocher.",
    target: "≈84 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenschenkel (o. Knochen) 260 g",
      "Shiitake 60 g",
      "Sojasauce natriumarm 14 ml",
      "Ingwer 6 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis waschen, mit Wasser in den Topf.",
      "Fleischwürfel mit Soja/Ingwer mischen, zusammen mit Shiitake obenauf geben.",
      "Programm 'Mixed/White Rice' starten, 10 Min ruhen, auflockern."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓ Geflügel durch",
    swaps: "Hähnchen ↔ fester Tofu",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "bis Markierung (inkl. Soja)", notes: "Nicht vorzeitig öffnen." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Lachs-Onigiri & Miso-Suppe 鮭おにぎり",
    desc: "Reisbälle mit gegartem Lachs, dazu milde Miso‑Suppe – Bento‑Frühstück.",
    story: "Japanischer Klassiker – praktisch & sättigend.",
    target: "≈70 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Lachsfilet 160 g",
      "Miso-Paste 18 g",
      "Dashi 500 ml",
      "Sesam 6 g",
      "Nori 1 g"
    ],
    steps: [
      "Reis kochen; Lachs schonend garen und zerpflücken.",
      "Onigiri formen, mit Lachs füllen, Nori sparsam anlegen.",
      "Miso in heißem Dashi lösen (nicht kochen) und servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ (Lachs durch)",
    swaps: "Lachs ↔ Thunfisch (Dose)",
    side: "Gurkenscheiben.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Jajangmyeon (mild) 자장면",
    desc: "Weiche Weizennudeln mit milder schwarzer Bohnen‑Sauce, viel Gemüse & Tofu.",
    story: "Koreanisch‑chinesische Nudelhaus‑Ikone – hier sanft gewürzt.",
    target: "≈88 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Weizennudeln (trocken) 130 g",
      "Schwarze Bohnenpaste 35 g",
      "Tofu (fest) 220 g",
      "Zucchini 120 g",
      "Zwiebel 80 g",
      "Gemüsebrühe 250 ml"
    ],
    steps: [
      "Nudeln kochen.",
      "Tofu & Gemüse dünsten, Paste kurz mitrösten, Brühe angießen.",
      "3–4 Min leise köcheln, mit den Nudeln mischen."
    ],
    checks: "Gastritis – moderat (Zwiebel gut gegart) · Diabetes ✓ – ≈88 g KH · Schwangerschaft ✓",
    swaps: "Weizennudeln ↔ Udon; Tofu ↔ Hähnchen",
    side: "Blanchierter Pak Choi.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Gochujang‑Butter‑Lachs (Reiskocher, viral)",
    desc: "Milde Gochujang‑Butter mit Lachs im Reiskocher – cremig, umami.",
    story: "Ein Social‑Media‑Liebling – mit dezenter Schärfe.",
    target: "≈82 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 220 g",
      "Gochujang 10 g",
      "Butter 12 g",
      "Sojasauce natriumarm 10 ml",
      "Dashi 240 ml"
    ],
    steps: [
      "Reis waschen, mit Dashi/Soja in den Topf.",
      "Lachswürfel, Gochujang und Butter obenauf verteilen.",
      "Programm 'Mixed/White Rice' starten, danach grob vermengen."
    ],
    checks: "Gastritis – ⚠︎ leichte Schärfe · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Lachs durch",
    swaps: "Gochujang ↔ Miso (milder); Lachs ↔ Weißfisch",
    side: "Gurkensalat (ohne Chili).",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi bis Markierung", notes: "Chili separat servieren möglich." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Rote‑Bohnen‑Congee 红豆粥 (mild)",
    desc: "Süßlich‑nussiger Frühstücksbrei aus Reis & Adzuki – sanft, warm.",
    story: "Beliebt in China im Winter – gut sättigend und mild.",
    target: "≈76 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Adzuki (vorgegart) 150 g",
      "Wasser 900 ml",
      "Ingwer 4 g",
      "Honig 10 g",
      "Prise Salz 1 Prise"
    ],
    steps: [
      "Reis waschen, mit Wasser im Reiskocher (Porridge) 60–70 Min.",
      "Adzuki und Ingwer die letzten 15 Min zugeben.",
      "Leicht süßen und servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓",
    swaps: "Honig ↔ Dattelsirup; Adzuki ↔ Kidneybohnen",
    side: "Grüner Tee mild.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:9–1:10", notes: "Bohnen vorgegart verwenden." },
  },
  {
    id: "do-m",
    title: "Oyakodon 親子丼 (Ei fest)",
    desc: "Hähnchen‑Ei‑Reisschale – hier mit komplett gestocktem Ei und salzarmer Würzung.",
    story: "Hausmannskost aus Japan – simpel & tröstlich.",
    target: "≈86 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust 240 g",
      "Eier 3 Stück",
      "Dashi 250 ml",
      "Sojasauce natriumarm 10 ml",
      "Zwiebel 80 g"
    ],
    steps: [
      "Reis kochen. Zwiebel in Dashi/Soja 5 Min köcheln.",
      "Hähnchenstücke 6–7 Min gar ziehen lassen.",
      "Eier eingießen und komplett stocken lassen, auf Reis geben."
    ],
    checks: "Gastritis – moderat · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ Ei fest, Geflügel durch",
    swaps: "Hähnchen ↔ Tofu",
    side: "Blanchierter Spinat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Doenjang‑Tofu‑Eintopf 된장찌개 (mild)",
    desc: "Sanfter Sojabohnenpasten‑Eintopf mit Tofu, Gemüse & Garnelen, dazu Reis.",
    story: "Koreanischer Klassiker, hier dezent und ohne Schärfe.",
    target: "≈72 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Doenjang (milde Paste) 18 g",
      "Tofu (weich) 300 g",
      "Garnelen (geschält) 180 g",
      "Zucchini 120 g",
      "Gemüsebrühe 700 ml"
    ],
    steps: [
      "Brühe erhitzen, Doenjang glatt rühren, 3 Min simmern.",
      "Zucchini 4–5 Min, Tofu 3 Min, Garnelen 3–4 Min gar ziehen lassen.",
      "Mit Reis servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Garnelen durch",
    swaps: "Garnelen ↔ Jakobsmuscheln",
    side: "Milder Kimchi ohne Chili.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Herzhafte Hafer‑Reis‑Zhou 咸粥",
    desc: "Fusions‑Congee aus Reis & Haferflocken mit Pilzen; Ei fest gekocht.",
    story: "Moderne Hausküche – sehr mild & cremig.",
    target: "≈74 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 70 g",
      "Haferflocken zart 40 g",
      "Shiitake 60 g",
      "Ei (hart) 2 Stück",
      "Dashi 800 ml",
      "Sojasauce natriumarm 6 ml"
    ],
    steps: [
      "Reis + Dashi 40 Min sieden, Haferflocken 10 Min mitköcheln.",
      "Pilze 5 Min, Sojasauce mild. Eier geviertelt zugeben.",
      "Heiß servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Ei hart",
    swaps: "Shiitake ↔ Champignons",
    side: "Grüner Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Gebratene Reisnudeln 河粉 (mild)",
    desc: "Weiche Reisnudeln mit viel Gemüse, wenig Öl im Wok gebraten.",
    story: "Südchinesischer Street‑Food‑Liebling – hier in milder Version.",
    target: "≈86 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reisnudeln (breit, frisch) 400 g",
      "Hähnchenbrust 220 g",
      "Pak Choi 200 g",
      "Karotte 80 g",
      "Sojasauce natriumarm 12 ml",
      "Sesamöl 5 ml"
    ],
    steps: [
      "Nudeln abspülen. Hähnchen in wenig Öl 4–5 Min braten (gar).",
      "Gemüse 3–4 Min mitdünsten, Nudeln zugeben.",
      "Mit Soja/Sesamöl mild würzen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓",
    swaps: "Hähnchen ↔ Tofu",
    side: "Gurkensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Whole Tomato Rice 2.0 (viral) mit Thunfisch",
    desc: "Die ganze Tomate gart im Reiskocher mit – plus Thunfisch.",
    story: "Internet‑Kult – simpel, saftig, immer wieder im Trend.",
    target: "≈86 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Tomate (groß) 1 Stück",
      "Thunfisch (Dose, abgetropft) 140 g",
      "Mais & Erbsen (TK) 120 g",
      "Sojasauce natriumarm 10 ml",
      "Olivenöl 8 ml"
    ],
    steps: [
      "Reis + Wasser (oder Brühe) in den Topf, Soja/Öl zugeben.",
      "Ganze Tomate mittig, Thunfisch und Gemüse außen herum.",
      "Programm 'White Rice' starten. Danach Tomate zerdrücken, mischen."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ (Dose pasteurisiert)",
    swaps: "Thunfisch ↔ Lachsflocken",
    side: "Spiegelei (gut durch) optional.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "etwas unter Normal (Tomatenwasser zählt)", notes: "Sehr reife Tomate verwenden." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Miyeok‑Guk 미역국 (sparsam) + Reis",
    desc: "Milde koreanische Suppe mit wenig Miyeok (Jod sparsam), dazu Reis.",
    story: "Traditionelle Kraftsuppe – in Schwangerschaft nur sparsam mit Algen.",
    target: "≈62 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Miyeok (getrocknet) 6 g",
      "Rinderhack mager 180 g",
      "Knoblauch 4 g",
      "Sojasauce natriumarm 6 ml",
      "Gemüsebrühe 800 ml"
    ],
    steps: [
      "Miyeok einweichen, abspülen.",
      "Hack 5–6 Min krümelig garen, Knoblauch mitdünsten.",
      "Brühe + Miyeok 10–12 Min köcheln, mild würzen; mit Reis servieren."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ (Jod sparsam)",
    swaps: "Rinderhack ↔ Hähnchen; Miyeok ↔ Spinat",
    side: "Kimchi ohne Chili.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Vollkorn‑Risotto ai Funghi (IT, mild)",
    desc: "Cremiges Pilz‑Risotto mit Vollkornreis, wenig Salz.",
    story: "Italienische Inspiration für mehr Abwechslung am Wochenende.",
    target: "≈84 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn‑Risottoreis (roh) 120 g",
      "Shiitake 80 g",
      "Champignons 120 g",
      "Gemüsebrühe 700 ml",
      "Olivenöl 10 ml",
      "Parmesan (pasteurisiert) 20 g"
    ],
    steps: [
      "Reis in Öl anschwitzen, nach und nach Brühe 25–30 Min rühren.",
      "Pilze separat 5 Min dünsten, unterheben.",
      "Mit wenig Parmesan abrunden."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓ (pasteurisierter Käse)",
    swaps: "Shiitake ↔ Steinpilz",
    side: "Blattsalat mild.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Takikomi Gohan 鮭と根菜の炊き込みご飯",
    desc: "Gemischter Reis mit Lachs & Wurzelgemüse – One‑Pot im Reiskocher.",
    story: "Herbstlicher JP‑Klassiker – hier mit Omega‑3‑reichem Lachs.",
    target: "≈82 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Karotte 90 g",
      "Shiitake 60 g",
      "Dashi 240 ml",
      "Sojasauce natriumarm 10 ml"
    ],
    steps: [
      "Reis waschen, mit Dashi/Soja in den Topf.",
      "Lachs in Stücken, Karotte & Pilze obenauf.",
      "Programm 'Mixed/White Rice' starten, 10 Min ruhen, unterheben."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Lachs durch",
    swaps: "Lachs ↔ Weißer Fisch",
    side: "Miso‑Suppe (mild).",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi bis Markierung", notes: "Nicht umrühren vor dem Garen." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Süßkartoffel‑Okayu さつまいもお粥",
    desc: "Samter JP‑Reisbrei mit Süßkartoffelwürfeln – süßlich, warm.",
    story: "Frühstücks‑Comfort aus Japan, ideal für Energie am Morgen.",
    target: "≈72 g KH (2 P.) · Protein ≈16 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Wasser 900 ml",
      "Süßkartoffel 220 g",
      "Sojasauce natriumarm 4 ml",
      "Ingwer 4 g",
      "Sesam 6 g"
    ],
    steps: [
      "Reis mit Wasser 45–60 Min zu Okayu kochen (Topf) oder Reiskocher Porridge.",
      "Süßkartoffel in Würfeln 15 Min mitgaren.",
      "Dezent würzen, Sesam darüber."
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓",
    swaps: "Süßkartoffel ↔ Kürbis",
    side: "Grüner Tee.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:9–1:10", notes: "Sehr weich kochen." },
  },
  {
    id: "so-m",
    title: "Bibimbap (mild) 비빔밥",
    desc: "Buntes Gemüse, Rind & Reis – Gochujang separat; Ei fest.",
    story: "Koreanischer Klassiker; farbenfroh und sättigend.",
    target: "≈88 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 130 g",
      "Rinderhack mager 220 g",
      "Zucchini 120 g",
      "Karotte 100 g",
      "Spinat 120 g",
      "Eier 2 Stück",
      "Gochujang (optional) 12 g"
    ],
    steps: [
      "Reis kochen. Gemüse getrennt dünsten.",
      "Hack garen. Eier vollständig durch braten.",
      "Alles auf Reis anrichten, Gochujang separat servieren."
    ],
    checks: "Gastritis – mild (Chili optional) · Diabetes ✓ – ≈88 g KH · Schwangerschaft ✓ Ei fest",
    swaps: "Rind ↔ Hähnchen",
    side: "Miso‑Suppe.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Garlic‑Butter‑Shrimp Rice (viral)",
    desc: "Knoblauch‑Butter‑Garnelen direkt mit dem Reis gegart – One‑Pot.",
    story: "Beliebt auf Instagram – schnell, proteinreich.",
    target: "≈84 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (geschält) 220 g",
      "Knoblauch 6 g",
      "Butter 12 g",
      "Sojasauce natriumarm 10 ml",
      "Gemüsebrühe 240 ml",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis waschen, mit Brühe/Soja in den Topf.",
      "Garnelen, Knoblauch und Butter obenauf legen.",
      "Programm 'Mixed/White Rice' starten, mischen, Zwiebel dazu."
    ],
    checks: "Gastritis – moderat · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓ Garnelen durch",
    swaps: "Garnelen ↔ Jakobsmuscheln",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "bis Markierung", notes: "Dump‑and‑Go." },
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
  "Birne": { group: "Gemüse/Pilze", label: "Birne", unitDefault: "g" },
  "Adzuki": { group: "Gemüse/Pilze", label: "Adzuki (vorgegart)", unitDefault: "g" },
  "Miyeok": { group: "Gemüse/Pilze", label: "Miyeok (getrocknet)", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh)", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba-Nudeln", unitDefault: "g" },
  "Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Goldhirse": { group: "Reis/Nudeln/Sättigung", label: "Goldhirse", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Reismehl": { group: "Reis/Nudeln/Sättigung", label: "Reismehl", unitDefault: "g" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Reisnudeln": { group: "Reis/Nudeln/Sättigung", label: "Reisnudeln (breit)", unitDefault: "g" },
  "Vollkorn‑Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Risottoreis", unitDefault: "g" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken zart", unitDefault: "g" },

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
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "g" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "g" },
  "Doenjang": { group: "Algen/Brühen/Würze", label: "Doenjang", unitDefault: "g" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori", unitDefault: "g" },
  "Parmesan": { group: "Algen/Brühen/Würze", label: "Parmesan (pasteur.)", unitDefault: "g" },
  "Schwarze Bohnenpaste": { group: "Algen/Brühen/Würze", label: "Schwarze Bohnenpaste", unitDefault: "g" },
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
// Components (Internal)
// -----------------------------------------------------------------------

function animePlaceholder(title) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Correctly formatted SVG with Gradient Defs
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
  // Encode as proper Data URI
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw4" }) {
  const [src, setSrc] = useState("");
  
  useEffect(() => {
    const preferred = `/plan-art/${year}/${weekFolder}/${meal.id}.jpg`;
    const fallback = animePlaceholder(meal.title);
    
    // Set default fallback first to ensure visual stability
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
        {dayName.replace(/\s*\(.+\)$/, "")} <span className="ghk-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
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
            Woche 4 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>JP/CN/KR · mild & schwangerschaftssicher · abwechslungsreich · 1× Reiskocher/Tag</p>
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

// ---- RiceCooker Section (wie Woche 3) ----
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Trends dabei: Tofu-Spinat-Zōsui, Claypot-Style, Gochujang-Butter-Lachs, Rote-Bohnen-Congee, Garlic-Butter-Shrimp.</p>
    </section>
  );
}

// PDF Export (nur noch Drucken Funktion, keine Buttons mehr in der UI)
const doPrint = () => window.print();

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
export default function Woche4DE() {
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

  // Styles (Identical to Week 3)
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
            {tagChip("Woche 4")}
            {tagChip("CN/JP/KR · Mild · Schwangerschaft")}
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
            {/* Nur Drucken & Theme Switch übrig */}
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
              <DaySection key={d} dayKey={d} meals={DATA.filter(r => r.id.startsWith(d))} dayName={DAY_NAME_DE[d]} />
            ))}
            {/* Hier wieder die korrekte Sektion wie in Woche 3: */}
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