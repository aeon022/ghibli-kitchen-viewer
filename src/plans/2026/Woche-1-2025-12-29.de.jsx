// src/plans/2026/Woche-1-2025-12-29.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 1 (Start: 2025-12-29, ISO-KW 1)
*/

// ---- Meta ----
export const meta = {
  title: "Woche 1",
  startDate: "2025-12-29",
  id: "woche-1-2025-12-29",
  lang: "de",
  sidebar: "Woche 1 (2025-12-29)",
};

const FILE_BASE = "Woche 1 2025-12-29";

// ---- UI Labels (NEU: Umbenannt wie gewünscht) ----
const UI_TITLES = {
  main: "Rezepte Woche 1",
  list: "Einkaufsliste Woche 1",
};

// ---- THEME (CSS Variablen) ----
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
  "--grad-hero":
    "linear-gradient(135deg, rgba(224,122,154,.2), rgba(42,167,105,.18))",
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
  "--grad-hero":
    "linear-gradient(135deg, rgba(224,122,154,.18), rgba(42,167,105,.15))",
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

/* ----------------------- Sprach-Hint (nur URL) ------------------------ */
function getLangFromQuery() {
  if (typeof window === "undefined") return null;
  try {
    const qs = new URLSearchParams(window.location.search);
    const fromQuery = qs.get("lang");
    return fromQuery ? String(fromQuery).slice(0, 2).toLowerCase() : null;
  } catch {
    return null;
  }
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

/* ----------------------------- UI Bits ------------------------------ */
const cardPanelStyle = {
  background: "var(--panel)",
  borderRadius: 18,
  padding: 20,
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

// ---- Weekday helpers ----
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2025-12-29)",
  di: "Dienstag (2025-12-30)",
  mi: "Mittwoch (2025-12-31)",
  do: "Donnerstag (2026-01-01)",
  fr: "Freitag (2026-01-02)",
  sa: "Samstag (2026-01-03)",
  so: "Sonntag (2026-01-04)",
};

/* ------------------------------ DATA ------------------------------- */
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Genmai-Okayu mit Hähnchen & Shiitake (玄米粥)",
    desc:
      "Japanischer Vollkorn-Reisbrei – sehr mild; Hähnchen fein gewürfelt, Shiitake für Umami.",
    story:
      "In japanischen Haushalten ist Okayu klassisches Wohlfühlessen. Mit Genmai (Braunreis) sättigt es länger – perfekt bei kühlen Morgen.",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Brauner Reis (roh) 80 g",
      "Wasser 900 ml",
      "Hähnchenbrust 160 g",
      "Shiitake 80 g",
      "Ingwer 8 g",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 15 g",
    ],
    steps: [
      "Reis waschen. Mit Wasser im Topf 35–40 Min. sanft köcheln (oder Reiskocher Porridge).",
      "Hähnchen fein würfeln, nach 20 Min. zugeben; Pilze/Ingwer mitziehen lassen.",
      "Mild würzen, Lauchgrün darüber.",
    ],
    checks:
      "Gastritis ✓ sehr mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:
      "Brauner Reis ↔ Reis; Hähnchen ↔ Tofu; Shiitake ↔ Champignons.",
    side: "Gurken-Pickles ohne Chili; Gerstentee.",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Porridge/Congee",
      water: "1 Teil Reis : 10–11 Teile Wasser",
      notes:
        "Hähnchen nach 20 Min. zufügen, insgesamt 60–70 Min. je nach Gerät.",
    },
  },
  {
    id: "mo-m",
    title: "Tofu-Soboro Don (そぼろ丼風) – mit Vollkornreis",
    desc:
      "Japanisch inspiriert: gewürzter Tofu-‚Soboro‘ mit Spinat & Karotte auf Reis – mild & salzarm.",
    story:
      "Soboro-Don ist normalerweise mit Hack; die Tofu-Version ist leichter und passt gut zum Lunch.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Vollkornreis (roh) 90 g",
      "Tofu fest 300 g",
      "Spinat 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 20 ml",
      "Sesamöl 8 ml",
    ],
    steps: [
      "Reis garen.",
      "Tofu zerkrümeln und in wenig Öl 6–7 Min. braten; mild würzen.",
      "Spinat/Karotte kurz dünsten, alles auf Reis anrichten.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Putenhack; Vollkornreis ↔ Reis.",
    side: "Kleine Misosuppe (mild).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Udon-Nabeyaki light (鍋焼きうどん) – ohne Ei",
    desc:
      "Leichter Topf mit Udon, Hähnchen & Gemüse in klarer Brühe, ohne rohes Ei.",
    story:
      "Nabeyaki-Udon ist Winter-Comfortfood in Japan – hier extra mild und schwangerschaftstauglich.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Pak Choi 200 g",
      "Shiitake 100 g",
      "Zwiebel 60 g",
      "Miso hell 20 g",
      "Sojasauce natriumarm 15 ml",
      "Wasser 1000 ml",
    ],
    steps: [
      "Brühe anrühren, Hähnchen 6–8 Min. gar ziehen.",
      "Gemüse 3–4 Min. mitgaren.",
      "Udon separat kochen und zugeben.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Gurke natur; Kräutertee.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // Dienstag
  {
    id: "di-f",
    title: "Hafer-Reis-Juk mit Apfel & Tofu (오트죽) – zuckerarm",
    desc:
      "Koreanisch inspiriert: Haferflocken + Reis als milder Frühstücksbrei mit Tofuwürfeln.",
    story:
      "Juk gibt es in unzähligen Varianten – Hafer sorgt für lösliche Ballaststoffe und sanfte Sättigung.",
    target: "≈66 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 60 g",
      "Zarte Haferflocken 30 g",
      "Wasser 900 ml",
      "Tofu fest 150 g",
      "Apfel 150 g",
      "Zimt 1 Prise",
    ],
    steps: [
      "Reis + Wasser aufkochen, 20 Min. köcheln.",
      "Haferflocken einrühren, 5–8 Min. weiter köcheln.",
      "Tofu/Apfel würfeln, 2–3 Min. ziehen lassen.",
    ],
    checks:
      "Gastritis ✓ weich & warm · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Apfel ↔ Birne; Tofu ↔ Hühnerwürfel.",
    side: "Gerstentee; kleines Gurken-Pickle.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Soba-Pfanne mit Huhn & Brokkoli (そば) – mild",
    desc:
      "Schnelle Pfanne, wenig Öl, zartes Huhn, Brokkoli & Zwiebel.",
    story:
      "Warme Soba sind ein japanischer Lunch-Liebling – hier als Pfanne statt Suppe.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Soba (trocken) 100 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 220 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 15 g",
    ],
    steps: [
      "Soba garen.",
      "Hähnchenstreifen 6–8 Min. braten bis durch.",
      "Brokkoli/Zwiebel kurz mitgaren, Soba und Sauce untermischen.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Soba ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Kleines Gurken-Salätchen (ohne Essig).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title:
      "Gedämpfter Kabeljau & Reisschale (清蒸鳕鱼) – Reiskocher-Dämpfeinsatz",
    desc:
      "Sanft gedämpfter Kabeljau mit Ingwer/Lauch, dazu frischer Reis.",
    story:
      "Kantonesisches Dämpfen bringt Zartheit ohne Schärfe; perfekt am Abend.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Kabeljaufilet 320 g",
      "Ingwer 12 g",
      "Frühlingszwiebel 25 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
      "Gemüsebrühe 80 ml",
    ],
    steps: [
      "Reis kochen (Reiskocher).",
      "Fisch auf Ingwer im Dämpfeinsatz 8–10 Min. garen.",
      "Warme Sauce aus Brühe/Sojasauce/Sesamöl über Fisch geben, mit Reis servieren.",
    ],
    checks:
      "Gastritis ✓ gedämpft · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Kabeljau durchgegart",
    swaps: "Kabeljau ↔ Lachs/Seelachs; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Pak Choi; Kräutertee.",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White/Brown Rice + Steam basket",
      water: "Reis 1 : 1.2–1.4 Wasser (je nach Sorte)",
      notes:
        "Fisch im Einsatz garen, wenn Reis noch ~10 Min. Restzeit hat.",
    },
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Miso-Gemüse-Reisbrei (味噌粥) – mild",
    desc:
      "Cremiger Reisbrei mit etwas hellem Miso, Karotte & Tofu – ganz sanft.",
    story:
      "Zōsui/Okayu-Varianten sind beliebte Aufwärmer – hier extra weich und salzarm.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Wasser 900 ml",
      "Miso hell 15 g",
      "Tofu fest 180 g",
      "Karotte 120 g",
      "Ingwer 6 g",
    ],
    steps: [
      "Reis 30–35 Min. köcheln, Karotte weich garen.",
      "Miso einrühren (nicht kochen).",
      "Tofu 2–3 Min. ziehen lassen.",
    ],
    checks:
      "Gastritis ✓ sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:
      "Tofu ↔ Hähnchenwürfel; Reis ↔ Brauner Reis (mehr Wasser).",
    side: "Leichter Grüntee koffeinarm.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Kongnamul-Bap – Bohnenkeim-Reis (콩나물밥)",
    desc:
      "Koreanischer Gemüsereis – Bohnenkeime & Karotte auf Reis; Sauce mild separat.",
    story:
      "Ein Klassiker der koreanischen Hausküche – normalerweise im Topf oder Reiskocher.",
    target: "≈82 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Bohnenkeime 250 g",
      "Karotte 120 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
    ],
    steps: [
      "Reis mit Wasser garen.",
      "Keime/Karotte 3–4 Min. dämpfen, unterheben.",
      "Milde Sauce getrennt servieren.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Gemüse gedämpft",
    swaps: "Reis ↔ Vollkornreis; Keime ↔ Spinat.",
    side: "Kleine Gurken-Pickles (ohne Chili).",
    remind: false,
    riceCooker: {
      enabled: true,
      program: "White Rice",
      water: "1 : 1.2–1.4",
      notes:
        "Keime in den letzten 5–8 Min. obenauf garen (Dämpfeinsatz/aufgelegt).",
    },
  },
  {
    id: "mi-a",
    title: "Yu-Xiang Aubergine mild (鱼香茄子) & Reis – ohne Chili",
    desc:
      "Samtige Auberginen in milder, leicht süß-herzhafter Sauce; kein Chili.",
    story:
      "Die Hausversion ohne Schärfe ist perfekt für Familien – alles weich geschmort.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Auberginen 350 g",
      "Paprika 120 g",
      "Knoblauch 1 Zehe",
      "Ingwer 8 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 10 g",
      "Maisstärke 10 g",
    ],
    steps: [
      "Reis garen.",
      "Aubergine/Paprika 8–10 Min. schmoren.",
      "Sauce anrühren, kurz binden, über Reis.",
    ],
    checks:
      "Gastritis ✓ weich geschmort · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Aubergine ↔ Zucchini; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Brokkoli.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Omuraisu light (オムライス) – Ei vollständig gestockt",
    desc:
      "Japanisch-westlich: mildes Gemüse-Reis-Omelett mit wenig Tomate, Ei durchgegart.",
    story:
      "Beliebtes Yoshoku-Gericht – hier ballaststoffbetont und schwangerschaftsgeeignet.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 4 Stück",
      "Hähnchenbrust 120 g",
      "Karotte 100 g",
      "Erbsen (TK) 100 g",
      "Zwiebel 60 g",
      "Tomatenmark 10 g",
    ],
    steps: [
      "Reis garen; Gemüse/Huhn 8–10 Min. dünsten.",
      "Mit Reis mischen; Omelett in Pfanne vollständig stocken.",
      "Reismischung einrollen, kurz nachziehen lassen.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Ei vollständig gestockt",
    swaps: "Reis ↔ Vollkornreis; Huhn ↔ Tofu.",
    side: "Kleiner Blattsalat ohne Essig (nur wenig Öl).",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Jjimdak-Gemüsepfanne (찜닭풍) – mild, ohne Chili",
    desc:
      "Von koreanischem Jjimdak inspiriert: zartes Huhn mit Kartoffel, Karotte & Glasnudeln (kleine Menge).",
    story:
      "Normalerweise herzhaft-süß und scharf – hier ganz mild und familienfreundlich.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Glasnudeln (roh) 40 g",
      "Hähnchenbrust 250 g",
      "Kartoffeln 200 g",
      "Karotte 150 g",
      "Zwiebel 80 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 500 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "Huhn mit Gemüse 15–18 Min. sanft schmoren.",
      "Glasnudeln 3–4 Min. mitziehen lassen.",
      "Leicht binden und servieren.",
    ],
    checks:
      "Gastritis ✓ mild geschmort · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Glasnudeln ↔ Udon; Huhn ↔ Tofu.",
    side: "Gurken-Pickles ohne Chili.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Hainan-Chicken-Rice light (海南鸡饭) – Reiskocher-Methode",
    desc:
      "Zartes Huhn auf Ingwer-Knoblauch-Reis, alles mild und salzarm.",
    story:
      "Berühmt in Südostasien; hier sehr leicht und natriumarm, perfekt für Abend.",
    target: "≈84 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Hähnchenbrust 280 g",
      "Ingwer 15 g",
      "Knoblauch 1 Zehe",
      "Frühlingszwiebel 20 g",
      "Sesamöl 6 ml",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis waschen, in Reiskocher geben; Wasser, Ingwer, Knoblauch zugeben.",
      "Hähnchen obenauf legen und mitgaren bis durch (Kerntemp. ≥75°C).",
      "Huhn in Scheiben, Reis locker, Lauchgrün und etwas Sesamöl darüber.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓ Huhn vollständig durchgegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis (mehr Wasser).",
    side: "Gedünsteter Pak Choi; milder Brühen-Dip separat.",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White/Brown Rice (je nach Sorte)",
      water: "1 : 1.6",
      notes:
        "Huhn als ganze Brust obenauf garen; nach Garende 10 Min. warmhalten.",
    },
  },

  // Freitag
  {
    id: "fr-f",
    title: "Tojiru-Gemüsesuppe mit Tofu (豚汁風) – ohne Schwein",
    desc:
      "Herzhafte Misosuppe mit Wurzelgemüse & Tofu, dazu kleiner Reis.",
    story: "Tojiru wärmt – unsere Version ist vegetarisch und sanft.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Miso hell 25 g",
      "Tofu fest 250 g",
      "Daikon 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Wasser 1000 ml",
    ],
    steps: [
      "Gemüse 12–15 Min. in Wasser/Brühe sanft garen.",
      "Miso einrühren; Tofu 2–3 Min. ziehen lassen.",
      "Mit kleinem Reis servieren.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Grüntee koffeinarm.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Takikomi-Gohan mit Huhn & Wurzelgemüse (炊き込みご飯)",
    desc:
      "Japanischer Gemüsereis – alles zusammen im Reiskocher gegart.",
    story:
      "Ein beliebtes Alltagsgericht: Reis nimmt Umami von Pilzen/Gemüse auf – perfekt für Meal-Prep.",
    target: "≈88 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 110 g",
      "Hähnchenbrust 220 g",
      "Shiitake 100 g",
      "Karotte 120 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 10 g",
      "Wasser 900 ml",
    ],
    steps: [
      "淘米与调味液入锅。",
      "鸡肉与蔬菜切小丁铺在上面。",
      "启动程序；结束后翻松即可。",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈88 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:
      "Huhn ↔ Tofu; Reis ↔ Vollkornreis (mehr Wasser).",
    side: "Gurken-Pickles; Kräutertee.",
    remind: false,
    riceCooker: {
      enabled: true,
      program: "Mixed/White Rice",
      water: "1 : 1.3–1.5 (inkl. Würzflüssigkeit)",
      notes: "Nachgaren 10 Min. im Warmhaltemodus.",
    },
  },
  {
    id: "fr-a",
    title: "Lachs-Miso-Schmorpfännchen & Brauner Reis (照り焼き風, mild)",
    desc:
      "Sanft gegarter Lachs in leichter Miso-Glasur, dazu brauner Reis & Brokkoli.",
    story:
      "Teriyaki-Anklänge, aber salzarm und mit viel Gemüse – gemütlicher Abendteller.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Lachsfilet 300 g",
      "Brauner Reis (roh) 90 g",
      "Brokkoli 250 g",
      "Miso hell 20 g",
      "Sojasauce natriumarm 15 ml",
      "Honig 5 ml",
      "Ingwer 8 g",
      "Wasser 600 ml",
    ],
    steps: [
      "Reis garen (brauner Reis 30–35 Min.).",
      "Lachs 8–10 Min. sanft garen; Sauce kurz einköcheln.",
      "Mit Brokkoli servieren.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Lachs durchgegart, quecksilberarm",
    swaps: "Lachs ↔ Kabeljau; Brauner Reis ↔ Reis.",
    side: "Gerstentee.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // Samstag
  {
    id: "sa-f",
    title: "Süßkartoffel-Okayu (さつまいも粥) – Reiskocher",
    desc:
      "Cremiger Reisbrei mit Süßkartoffelwürfeln – natürlich süß & ballaststoffreich.",
    story:
      "In Japan beliebt für sanfte Morgen – Süßkartoffel macht schön sämig.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Süßkartoffel 220 g",
      "Wasser 900 ml",
      "Tofu fest 120 g",
      "Zimt 1 Prise",
    ],
    steps: [
      "Alles (bis auf Tofu) im Topf 35–40 Min. köcheln oder Reiskocher Porridge.",
      "Tofu 2–3 Min. ziehen lassen.",
      "Mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ sehr mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Süßkartoffel ↔ Kürbis; Tofu ↔ Hühnerwürfel.",
    side: "Warmwasser oder Gerstentee.",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Porridge/Congee",
      water: "1 : 10–11",
      notes:
        "Süßkartoffel klein würfeln; Gesamtzeit 60–70 Min. je nach Gerät.",
    },
  },
  {
    id: "sa-m",
    title:
      "Jajang-Tofu-Nudeln light (자장면) – mit Vollkornnudeln",
    desc:
      "Schwarzbohnen-Nudeln als leichtere, milde Version; Tofu statt Fettfleisch.",
    story:
      "Koreanisch-chinesischer Klassiker – hier gemüsebetont und salzarm.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Vollkornnudeln (roh) 120 g",
      "Tofu fest 250 g",
      "Zucchini 150 g",
      "Zwiebel 100 g",
      "Kartoffeln 150 g",
      "Schwarzbohnenpaste (mild) 25 g",
      "Gemüsebrühe 300 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "Nudeln kochen.",
      "Gemüse anschwitzen, Brühe/Paste zugeben, 6–8 Min. köcheln.",
      "Tofu zugeben, leicht binden, servieren.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:
      "Tofu ↔ Hähnchenwürfel; Vollkornnudeln ↔ Udon.",
    side: "Gurkensalat ohne Essig.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title:
      "Chawanmushi-Teller (茶碗蒸し) & Reis – Ei vollständig gestockt",
    desc:
      "Japanischer Eierpudding im Dampf, vollständig gestockt; dazu Schälchen Reis & Spinat.",
    story:
      "Feine Textur, mild und leicht – perfekt am Abend, mit gesicherter Garung.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈27 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Dashi (mild) 400 ml",
      "Tofu fest 150 g",
      "Spinat 200 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis garen.",
      "Eier mit Dashi verrühren, in Schälchen 15–18 Min. dämpfen bis fest.",
      "Spinat kurz blanchieren, mit Sojasauce würzen und zusammen servieren.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Kräutertee; Gurken-Pickles.",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Steam basket über Reis",
      water: "1 : 1.2–1.4 (Reis)",
      notes:
        "Reis kochen; Chawanmushi im Dämpfeinsatz parallel 15–18 Min. garen, Deckel geschlossen.",
    },
  },

  // Sonntag
  {
    id: "so-f",
    title: "Tofu-Natto-Reis (納豆ごはん) – ohne rohes Ei",
    desc:
      "Japanisches Frühstücksset mit pasteurisiertem Natto & warmem Reis.",
    story:
      "Traditionelles Power-Frühstück; ohne rohes Ei, sehr mild gewürzt.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈23 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Natto (pasteurisiert) 100 g",
      "Tofu fest 150 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
      "Wasser 500 ml",
    ],
    steps: [
      "Reis kochen.",
      "Natto nach Packung erwärmen und mit Sojasauce mischen.",
      "Mit Tofu-Würfeln und Lauchgrün über warmem Reis servieren.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ ohne rohes Ei, pasteurisiert",
    swaps:
      "Natto ↔ Edamame; Tofu ↔ Omelettstreifen (gut gestockt).",
    side: "Milder Grüntee oder Gerstentee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Mildes Tomaten-Rind-Tofu (番茄牛肉豆腐) & Reis",
    desc:
      "Leicht säuerlich durch lang geschmorte Tomate, mageres Rind und Tofu – sehr mild.",
    story:
      "Ein Hausgericht mit sanfter Sauce – gut bekömmlich und proteinreich.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Rinderhack mager 220 g",
      "Tofu fest 200 g",
      "Tomaten (reif) 350 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 15 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "Reis garen.",
      "Rind krümelig braten bis durch; Tomaten/Zwiebel 10 Min. sanft schmoren.",
      "Tofu zugeben, leicht binden, servieren.",
    ],
    checks:
      "Gastritis ✓ milde Säure, gut geschmort · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Fleisch durchgegart",
    swaps: "Rind ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Pak Choi.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Satsumaimo-Gohan & Ofen-Kabeljau (さつまいもご飯)",
    desc:
      "Japanischer Süßkartoffel-Reis im Reiskocher; dazu zarter Ofenfisch – alles mild.",
    story:
      "Saisonal und gemütlich – Süßkartoffelreis liefert sanfte Süße, Fisch das Protein.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 110 g",
      "Süßkartoffel 220 g",
      "Kabeljaufilet 300 g",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
      "Sesam 5 g",
    ],
    steps: [
      "Reis waschen, Süßkartoffel würfeln; zusammen im Reiskocher garen.",
      "Kabeljau im Ofen 8–10 Min. garen bis durch.",
      "Alles mild würzen und anrichten.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ Kabeljau durchgegart",
    swaps: "Kabeljau ↔ Lachs; Reis ↔ Vollkornreis (mehr Wasser).",
    side: "Gurken-Pickles; Kräutertee.",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White Rice",
      water: "1 : 1.2–1.4",
      notes:
        "Süßkartoffelwürfel obenauf; nach Ende 10 Min. ruhen lassen.",
    },
  },
];

/* ----------------- Einkaufsliste (automatisch) ------------------ */
const CANON = {
  // Proteine
  Lachsfilet: { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  Kabeljaufilet: { group: "Protein/Fisch/Tofu", label: "Kabeljaufilet", unitDefault: "g" },
  "Rinderhack mager": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  Hähnchenbrust: { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Tofu seiden": { group: "Protein/Fisch/Tofu", label: "Tofu (seiden)", unitDefault: "g" },
  "Tofu fest": { group: "Protein/Fisch/Tofu", label: "Tofu (fest)", unitDefault: "g" },
  Natto: { group: "Protein/Fisch/Tofu", label: "Natto (pasteurisiert)", unitDefault: "g" },
  Eier: { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  // Gemüse/Pilze
  Spinat: { group: "Gemüse/Pilze", label: "Spinat", unitDefault: "g" },
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  Brokkoli: { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  Zucchini: { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  Karotte: { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  Paprika: { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  Shiitake: { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  Champignons: { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  Zwiebel: { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  Daikon: { group: "Gemüse/Pilze", label: "Daikon/Rettich", unitDefault: "g" },
  Kartoffeln: { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  Kürbis: { group: "Gemüse/Pilze", label: "Kürbis (Kabocha/Hokkaido)", unitDefault: "g" },
  Süßkartoffel: { group: "Gemüse/Pilze", label: "Süßkartoffeln", unitDefault: "g" },
  Tomaten: { group: "Gemüse/Pilze", label: "Tomaten (reif)", unitDefault: "g" },
  Frühlingszwiebel: { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  Gurke: { group: "Gemüse/Pilze", label: "Gurken", unitDefault: "g" },
  Edamame: { group: "Gemüse/Pilze", label: "Edamame (geschält)", unitDefault: "g" },
  Bohnenkeime: { group: "Gemüse/Pilze", label: "Bohnenkeime", unitDefault: "g" },
  Apfel: { group: "Gemüse/Pilze", label: "Äpfel", unitDefault: "g" },
  Erbsen: { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  Ingwer: { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  Knoblauch: { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },

  // Reis/Nudeln/Sättigung
  Reis: { group: "Reis/Nudeln/Sättigung", label: "Reis (roh)", unitDefault: "g" },
  Vollkornreis: { group: "Reis/Nudeln/Sättigung", label: "Vollkornreis (roh)", unitDefault: "g" },
  "Brauner Reis": { group: "Reis/Nudeln/Sättigung", label: "Brauner Reis (roh)", unitDefault: "g" },
  Soba: { group: "Reis/Nudeln/Sättigung", label: "Soba (trocken)", unitDefault: "g" },
  Udon: { group: "Reis/Nudeln/Sättigung", label: "Udon (trocken)", unitDefault: "g" },
  Vollkornnudeln: { group: "Reis/Nudeln/Sättigung", label: "Vollkornnudeln (roh)", unitDefault: "g" },
  Glasnudeln: { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln (roh)", unitDefault: "g" },

  // Algen/Brühen/Würze
  "Miso hell": { group: "Algen/Brühen/Würze", label: "Miso hell", unitDefault: "g" },
  Wakame: { group: "Algen/Brühen/Würze", label: "Wakame (getrocknet)", unitDefault: "g" },
  Nori: { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
  "Sojasauce natriumarm": { group: "Algen/Brühen/Würze", label: "Sojasauce (natriumarm)", unitDefault: "ml" },
  Sesamöl: { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "ml" },
  Olivenöl: { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "ml" },
  Gemüsebrühe: { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  Honig: { group: "Algen/Brühen/Würze", label: "Honig", unitDefault: "ml" },
  Sesam: { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "g" },
  Maisstärke: { group: "Algen/Brühen/Würze", label: "Maisstärke", unitDefault: "g" },
  Wasser: { group: "Algen/Brühen/Würze", label: "Wasser (ges.)", unitDefault: "ml" },
  Zimt: { group: "Algen/Brühen/Würze", label: "Zimt (Prisen)", unitDefault: "Prise" },
  Tomatenmark: { group: "Algen/Brühen/Würze", label: "Tomatenmark", unitDefault: "g" },
};

function parseIngredient(raw) {
  const m = raw.match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Blatt|Zehe|Prise)$/);
  if (!m) return null;
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
  if (!key) return null;
  return { key, qty, unit, name };
}

function aggregateList(data) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const p = parseIngredient(ing);
      if (!p) continue;
      const c = CANON[p.key];
      const unit = p.unit || c.unitDefault;
      const id = `${p.key}|${unit}`;
      if (!totals[id])
        totals[id] = {
          key: p.key,
          label: c.label,
          unit,
          qty: 0,
          group: c.group,
        };
      totals[id].qty += p.qty;
    }
  }
  const groups = {
    "Protein/Fisch/Tofu": [],
    "Gemüse/Pilze": [],
    "Reis/Nudeln/Sättigung": [],
    "Algen/Brühen/Würze": [],
  };
  Object.values(totals).forEach((t) => groups[t.group].push(t));
  Object.keys(groups).forEach((g) =>
    groups[g].sort((a, b) => a.label.localeCompare(b.label))
  );
  return groups;
}

const LIST_SUMMARY = aggregateList(DATA);

/* ---------------------------- Media ---------------------------- */
function animePlaceholder(title, prompt = "") {
  const safe = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#FCE7F3'/>
          <stop offset='100%' stop-color='#DCFCE7'/>
        </linearGradient>
      </defs>
      <rect width='1200' height='675' fill='url(#g)'/>
      <g font-family='Noto Sans, Arial, sans-serif'>
        <text x='40' y='120' font-size='44' fill='#1F2937'>🍱  ${safe(title)}</text>
        <text x='40' y='180' font-size='22' fill='#374151'>Illustration placeholder</text>
        <text x='40' y='240' font-size='18' fill='#6B7280'>${safe(prompt).slice(0, 300)}</text>
        <text x='40' y='640' font-size='14' fill='#6B7280'>GhibliKitchen · generated placeholder</text>
      </g>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const preferred = meal.image ?? `/plan-art/2026/kw1/${meal.id}.jpg`;
    const fallback = animePlaceholder(meal.title, meal.prompt || "");
    if (!preferred) {
      setSrc(fallback);
      return;
    }
    const img = new Image();
    img.onload = () => setSrc(preferred);
    img.onerror = () => setSrc(fallback);
    img.src = preferred;
  }, [meal]);
  return (
    <div
      className="ghk-art"
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 12,
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <img
        src={src || animePlaceholder(meal.title, meal.prompt || "")}
        alt={meal.title}
        style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9" }}
        loading="lazy"
      />
      <div
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          background: "rgba(0,0,0,.35)",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
        }}
      >
        {src?.startsWith("/plan-art") ? "Artwork" : "Anime-Placeholder"}
      </div>
    </div>
  );
}

/* ------------------------------- UI ------------------------------ */
function MealCard({ meal }) {
  return (
    <div className="meal-card" style={cardPanelStyle} id={`meal-${meal.id}`}>
      <ImageBanner meal={meal} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ margin: 0 }}>{meal.title}</h3>
        <div>
          {tagChip(meal.target)}
          {meal.riceCooker?.enabled ? tagChip("🍚 Reiskocher") : null}
          {meal.remind ? tagChip("💊 Metformin mit der Mahlzeit einnehmen") : null}
        </div>
      </div>
      <p style={{ marginTop: 8, color: "var(--muted)" }}>{meal.desc}</p>
      <p style={{ fontStyle: "italic", color: "var(--muted)", marginTop: -6 }}>
        {meal.story}
      </p>
      <h4>Zutaten (2 Personen)</h4>
      <ul>
        {meal.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
      <h4>Zubereitung</h4>
      <ol>
        {meal.steps.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ol>
      <p><strong>Hinweise:</strong> {meal.checks}</p>
      <p><strong>Austausche:</strong> {meal.swaps}</p>
      <p><strong>Beilage & Getränke:</strong> {meal.side}</p>

      {meal.riceCooker?.enabled ? (
        <div style={{ marginTop: 8 }}>
          <details>
            <summary>Reiskocher-Details</summary>
            <ul>
              <li><strong>Programm:</strong> {meal.riceCooker.program}</li>
              <li><strong>Wasserverhältnis:</strong> {meal.riceCooker.water}</li>
              {meal.riceCooker.notes ? (
                <li><strong>Hinweise:</strong> {meal.riceCooker.notes}</li>
              ) : null}
            </ul>
          </details>
        </div>
      ) : null}
    </div>
  );
}

function DaySection({ dayKey, meals }) {
  return (
    <section className="day-section" style={{ marginBottom: 28 }} id={`day-${dayKey}`}>
      <h2 style={{ marginBottom: 12 }}>
        {DAY_NAME_DE[dayKey].replace(/\s*\(.+\)$/, "")}
        <span className="ghk-date-paren">
          {" "}{DAY_NAME_DE[dayKey].match(/\(.+\)$/)?.[0] ?? ""}
        </span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {meals.map((m) => (
          <MealCard key={m.id} meal={m} />
        ))}
      </div>
    </section>
  );
}

function WeekOverview({ data }) {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of data) map[r.id.split("-")[0]].push(r);
    return map;
  }, [data]);

  const pill = (text, href, rice) => (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        textDecoration: "none",
        color: "var(--text)",
        boxShadow: "var(--shadow)",
        fontSize: 13,
      }}
    >
      {rice ? "🍚" : "🍽️"} <span>{text}</span>
    </a>
  );

  return (
    <section style={{ marginBottom: 24 }}>
      <div style={{ ...cardPanelStyle, background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="ghk-hero-inner" style={{ padding: 14, borderRadius: 12, marginBottom: 10, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            Woche 1 – Übersicht{" "}
            <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>
              ({meta.startDate})
            </span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>
            Täglich 3 Mahlzeiten · 1× Reiskocher-Gericht pro Tag · mild, salzarm, schwangerschaftsgeeignet.
          </p>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {DAYS_ORDER.map((d) => (
            <div key={d} style={{ padding: 10, borderRadius: 12, border: "1px solid var(--border)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <strong>{DAY_NAME_DE[d]}</strong>
                <a
                  href={`#day-${d}`}
                  style={{
                    fontSize: 12,
                    color: "var(--text)",
                    textDecoration: "none",
                    border: "1px solid var(--border)",
                    padding: "4px 8px",
                    borderRadius: 8,
                    background: "var(--chip-bg)"
                  }}
                >
                  zum Tag ▿
                </a>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {byDay[d].map((m) => pill(m.title.replace(/ – .*$/, ""), `#meal-${m.id}`, !!m.riceCooker?.enabled))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <h2>Reiskocher-Gerichte (1× pro Tag)</h2>
      <p style={{ color: "var(--muted)" }}>
        Programme & Wasserverhältnisse im Überblick. Alle Rezepte sind mild, salzarm und schwangerschaftsgeeignet.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {DAYS_ORDER.map((d) => {
          const r = perDay[d];
          return (
            <div key={d} style={{ ...cardPanelStyle }}>
              <h3 style={{ marginTop: 0 }}>
                {DAY_NAME_DE[d].split(" ")[0]} – {r ? r.title : "(markiert im Tagesplan)"}
              </h3>
              {r ? (
                <ul>
                  <li><strong>Programm:</strong> {r.riceCooker.program}</li>
                  <li><strong>Wasserverhältnis:</strong> {r.riceCooker.water}</li>
                  {r.riceCooker.notes ? <li><strong>Hinweise:</strong> {r.riceCooker.notes}</li> : null}
                </ul>
              ) : (
                <p>Kein Reiskocher-Gericht markiert – bitte im Plan auswählen.</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Cookbook() {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of DATA) {
      const d = r.id.split("-")[0];
      map[d].push(r);
    }
    return map;
  }, []);
  return (
    <div>
      {DAYS_ORDER.map((d) => (
        <DaySection key={d} dayKey={d} meals={byDay[d]} />
      ))}
      <RiceCookerSection data={DATA} />
    </div>
  );
}

function ShoppingList() {
  const groups = LIST_SUMMARY;
  const Group = ({ name, items }) => (
    <div style={{ marginBottom: 20 }}>
      <h3>{name}</h3>
      <ul>
        {items.map((it, idx) => (
          <li key={idx}>{`${it.label} – ${Math.round(it.qty * 10) / 10} ${it.unit}`}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <div>
      <Group name="Protein/Fisch/Tofu" items={groups["Protein/Fisch/Tofu"]} />
      <Group name="Gemüse/Pilze" items={groups["Gemüse/Pilze"]} />
      <Group name="Reis/Nudeln/Sättigung" items={groups["Reis/Nudeln/Sättigung"]} />
      <Group name="Algen/Brühen/Würze" items={groups["Algen/Brühen/Würze"]} />
    </div>
  );
}

// ---- Theme Switch (Auto/Light/Dark) ----
function ThemeSwitch({ mode, setMode, effectiveDark }) {
  return (
    <div
      className="ghk-theme-switch"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: 6,
        border: "1px solid var(--btn-border)",
        borderRadius: 999,
        background: "var(--panel)",
      }}
    >
      <button
        type="button"
        className="ghk-tab"
        aria-pressed={mode === "auto"}
        onClick={() => setMode(mode === "auto" ? (effectiveDark ? "dark" : "light") : "auto")}
        title="Automatisch nach System"
        style={{ padding: "6px 10px" }}
      >
        Auto
      </button>

      <label className="ghk-switch" title={effectiveDark ? "Dunkel" : "Hell"}>
        <input
          type="checkbox"
          checked={effectiveDark}
          onChange={(e) => setMode(e.target.checked ? "dark" : "light")}
          disabled={mode === "auto"}
        />
        <span className="ghk-slider" />
      </label>

      <span style={{ fontSize: 12, color: "var(--muted)" }}>
        {mode === "auto" ? "System" : effectiveDark ? "Dunkel" : "Hell"}
      </span>
    </div>
  );
}

// --- Helper
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

// --- PDF-Export (Klon mit Export-Styles)
async function exportPdfFromRoot(rootEl) {
  await ensureScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");
  if (!window.html2pdf) throw new Error("html2pdf nicht verfügbar.");

  const clone = rootEl.cloneNode(true);
  clone.id = "kochbuch-export";
  clone.classList.add("ghk-exporting");
  document.body.appendChild(clone);

  window.scrollTo(0, 0);
  await nextFrame();

  const pageBg = "#FFFFFF";
  clone.style.backgroundColor = pageBg;

  const opt = {
    margin: [34, 28, 34, 28],
    filename: `${FILE_BASE}.pdf`,
    pagebreak: { mode: ["css", "legacy"], after: [".day-section"], avoid: [".meal-card", ".ghk-hero"] },
    html2canvas: {
      backgroundColor: pageBg,
      useCORS: true,
      logging: false,
      imageTimeout: 0,
      scale: 2,
      foreignObjectRendering: false,
      scrollX: 0,
      scrollY: -window.scrollY
    },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
  };

  try {
    await window.html2pdf().set(opt).from(clone).save();
  } finally {
    clone.remove();
  }
}

/* --------------------------- Hauptkomponente --------------------------- */
export default function Woche1DE() {
  // Gate NUR über Query (?lang)
  const langFromUrl = useLangHint();
  const hiddenByLang = langFromUrl && langFromUrl !== meta.lang;
  if (hiddenByLang) return null;

  const systemDark = useSystemPrefersDark();
  const [mode, setMode] = useState("auto"); // "light" | "dark" | "auto"
  const effectiveDark = mode === "auto" ? systemDark : mode === "dark";
  const vars = themeVars(effectiveDark ? "dark" : "light");

  // Ansicht: "kochbuch" | "liste"
  const [tab, setTab] = useState("kochbuch");

  // CSS-Variablen setzen
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k));
  }, [vars]);

  // <html lang> freundlich setzen (ändert Gate NICHT)
  useEffect(() => {
    if (!document.documentElement.getAttribute("lang")) {
      document.documentElement.setAttribute("lang", meta.lang);
    }
  }, []);

  const doPrint = () => window.print();
  const doExportHTML = () => {
    const pageBg =
      getComputedStyle(document.documentElement).getPropertyValue("--bg")?.trim() || "#FFFFFF";
    const url = exportHTMLById("kochbuch-root", FILE_BASE, buildEmbedCss(), pageBg);
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `${FILE_BASE}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } else {
      alert("HTML-Export nicht verfügbar.");
    }
  };
  const doExportPDF = async () => {
    const el = document.getElementById("kochbuch-root");
    if (!el) return alert("Export: #kochbuch-root nicht gefunden.");
    try {
      await exportPdfFromRoot(el);
    } catch (e) {
      console.error(e);
      alert("PDF-Export fehlgeschlagen.");
    }
  };

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      {/* Styles */}
      <style>{`
  /* Coolere Tabs/Buttons */
  .ghk-tab {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid var(--btn-border);
    background: var(--panel);
    color: var(--text);
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    transition: all 0.2s ease;
  }
  .ghk-tab:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-color: var(--accent-2);
  }
  .ghk-tab:focus-visible { outline: 2px solid var(--accent-2); outline-offset: 2px; }
  .ghk-tab span.icon { font-size: 1.2em; line-height: 1; }

  /* Switch */
  .ghk-switch { --switch-w:48px; --switch-h:28px; --knob:22px; position:relative; display:inline-block;
    width:var(--switch-w); height:var(--switch-h); }
  .ghk-switch input { opacity:0; width:0; height:0; position:absolute; }
  .ghk-switch .ghk-slider { position:absolute; inset:0; border-radius:var(--switch-h);
    background:var(--btn-border); border:1px solid var(--btn-border); transition:background .2s,border-color .2s; }
  .ghk-switch .ghk-slider::before { content:""; position:absolute; height:var(--knob); width:var(--knob);
    left:3px; top:50%; transform:translateY(-50%); border-radius:999px; background:var(--panel); box-shadow:var(--shadow);
    transition:transform .2s; }
  .ghk-switch input:checked + .ghk-slider { background:var(--accent-2); border-color:var(--accent-2); }
  .ghk-switch input:checked + .ghk-slider::before { transform:translateY(-50%) translateX(calc(var(--switch-w) - var(--knob) - 6px)); }
  .ghk-switch input:disabled + .ghk-slider { opacity:.6; }

  /* Segmented Control (Radio Group) */
  .ghk-segment { display:inline-flex; gap:4px; border:1px solid var(--btn-border); border-radius:999px; padding:4px; background:var(--panel); margin:0; }
  .ghk-segment label { position:relative; display:inline-flex; align-items:center; border-radius:999px; overflow:hidden; cursor:pointer; }
  .ghk-segment input[type="radio"] { position:absolute; inset:0; opacity:0; cursor:pointer; }
  .ghk-segment span { display:inline-block; padding:8px 14px; border-radius:999px; border:1px solid transparent; user-select:none; }
  .ghk-segment input[type="radio"]:checked + span { background:var(--btn-on-bg); outline:2px solid var(--accent-2); outline-offset:1px; }

  /* Viewer erzwingen */
  #ghk-content { display:block !important; visibility:visible !important; opacity:1 !important; position:relative !important; min-height:1px; }
  #ghk-content > [hidden] { display:none !important; }

  /* Export-Klon */
  .ghk-exporting {
    width:794px !important; max-width:794px !important; margin:0 auto !important; background:#fff !important;
    box-sizing:border-box !important; font-size:12pt !important; line-height:1.45 !important;
    --bg:#FFFFFF; --text:#111827; --panel:#FFFFFF; --border:rgba(0,0,0,.12);
    --muted:#374151; --chip-bg:#F3F4F6; --btn-border:rgba(0,0,0,.15); --btn-on-bg:#F3F4F6;
  }
  .ghk-exporting * { box-shadow:none !important; }
  .ghk-exporting .ghk-art, .ghk-exporting img { display:none !important; visibility:hidden !important; }
  .ghk-exporting .ghk-chip, .ghk-exporting .ghk-date-paren { display:none !important; }

  @media print {
    .ghk-art, .ghk-date-paren { display:none !important; }
  }
  @page { size:A4; margin:12mm; }
  @media print {
    html, body, #root { background:#fff !important; }
    aside, nav, header, footer, .ghk-no-print { display:none !important; }
    main { grid-template-columns:1fr !important; }
    #kochbuch-root { width:calc(210mm - 24mm); margin:0 auto !important; box-shadow:none !important; border:none !important; background:#fff !important; }
    .ghk-hero { box-shadow:none !important; border:0 !important; padding:0 !important; background:#fff !important; }
    .ghk-hero-inner { background:#fff !important; border-radius:0 !important; padding:0 !important; margin:0 0 6mm 0 !important; }
    .ghk-hero h1 { margin:0 0 2mm 0 !important; font-size:18pt !important; line-height:1.2 !important; }
    .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; -webkit-column-break-inside:avoid; -webkit-region-break-inside:avoid; }
    .meal-card { margin-bottom:12mm; } h2, h3 { break-after:avoid; page-break-after:avoid; }
    #kochbuch-root * { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    a[href]:after { content:""; } * { box-shadow:none !important; }
  }
`}</style>

      {/* Hero + Controls */}
      <div className="ghk-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div
          className="ghk-hero-inner"
          style={{
            background: "var(--grad-hero)",
            borderRadius: 12,
            padding: 14,
            marginBottom: 12,
            display: "grid",
            gap: 8,
          }}
        >
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`Start: ${meta.startDate}`)}
            {tagChip("Mahlzeiten/Woche: 21")}
            {tagChip("CN/JP/KR (IT = 0 diese Woche)")}
            {tagChip("Salzarm · mild · alles durchgegart")}
            {tagChip("Täglich 1× 🍚 Reiskocher")}
          </div>
        </div>

        <div className="ghk-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          {/* Umschalter: Radio-Group */}
          <fieldset className="ghk-segment" role="radiogroup" aria-label="Ansicht wählen">
            <label htmlFor="view-kochbuch">
              <input id="view-kochbuch" type="radio" name="ghk-view" value="kochbuch" checked={tab === "kochbuch"} onChange={() => setTab("kochbuch")} aria-controls="ghk-content" />
              <span>{UI_TITLES.main}</span>
            </label>
            <label htmlFor="view-liste">
              <input id="view-liste" type="radio" name="ghk-view" value="liste" checked={tab === "liste"} onChange={() => setTab("liste")} aria-controls="ghk-content" />
              <span>{UI_TITLES.list}</span>
            </label>
          </fieldset>

          {/* Export/Print + Theme -- JETZT RECHTSBÜNDIG DURCH marginLeft:auto */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginLeft: "auto" }}>
            <button type="button" onClick={doExportPDF} title="Als PDF exportieren" className="ghk-tab">
              <span className="icon">📄</span> PDF
            </button>
            <button type="button" onClick={doExportHTML} title="Als HTML exportieren" className="ghk-tab">
              <span className="icon">🌐</span> HTML
            </button>
            <button type="button" onClick={doPrint} title="Drucken" className="ghk-tab">
              <span className="icon">🖨️</span> Drucken
            </button>
            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      {/* Export-Root */}
      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={DATA} />

        {/* Inhalt: zwei feste Panes, Umschalten via hidden */}
        <div id="ghk-content" data-view={tab}>
          <section
            id="ghk-pane-kochbuch"
            aria-hidden={tab !== "kochbuch"}
            hidden={tab !== "kochbuch"}
          >
            <Cookbook />
          </section>

          <section
            id="ghk-pane-liste"
            aria-hidden={tab !== "liste"}
            hidden={tab !== "liste"}
          >
            <ShoppingList />
          </section>
        </div>
      </div>
    </div>
  );
}