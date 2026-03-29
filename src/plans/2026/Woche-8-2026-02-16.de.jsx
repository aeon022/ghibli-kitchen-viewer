// src/plans/2026/Woche-8-2026-02-16.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 8 (Start: 2026-02-16)
  Fokus: Virale Asia-Trends, Airfryer-Hacks & Reiskocher-Wunder.
  Inhalt: Balanced, Schwangerschaftssicher (alles durch, pasteurisiert), Diabetesfreundlich.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 8",
  startDate: "2026-02-16",
  id: "woche-8-2026-02-16",
  lang: "de",
  sidebar: "Woche 8 (2026-02-16)",
};

const FILE_BASE = "Woche 8 2026-02-16";

const UI_TITLES = {
  main: "Rezepte Woche 8",
  list: "Einkaufsliste Woche 8",
};

// ---- THEME ----
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
  <span className="ghk-chip" key={text} style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "var(--chip-bg)", border: "1px solid var(--border)", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    {text}
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-02-16)",
  di: "Dienstag (2026-02-17)",
  mi: "Mittwoch (2026-02-18)",
  do: "Donnerstag (2026-02-19)",
  fr: "Freitag (2026-02-20)",
  sa: "Samstag (2026-02-21)",
  so: "Sonntag (2026-02-22)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Cong You Bing 葱油饼 (Pfannen-Hack)",
    desc: "Schnelle Frühlingszwiebel-Pfannkuchen aus fertigem Teig, gebraten mit Spiegelei.",
    story: "Echte Cong You Bing zu kneten dauert Stunden. Unser Viral-Hack? Wir nehmen Tortilla-Wraps, bestreichen sie mit Zwiebel-Öl, falten sie und ab in die Pfanne! Dazu ein komplett durchgebratenes Ei.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Tortillas (Wraps) 2 Stück",
      "Frühlingszwiebeln (gehackt) 30 g",
      "Eier 4 Stück",
      "Sesamöl 1 TL",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Wraps mit Sesamöl bepinseln, Frühlingszwiebeln aufstreuen, in der Mitte falten.",
      "In einer Pfanne ohne Öl knusprig anrösten.",
      "Herausnehmen. Eier in der Pfanne komplett (!) durchbraten.",
      "Wraps aufschneiden, Eier hineinlegen, etwas Sojasauce dazu."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett durchgebraten) · Diabetes ✓",
    swaps: "Vollkorn-Tortillas ↔ Reispapier",
    side: "Eine Tasse Jasmintee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Viral Rice Paper Tteokbokki 라이스페이퍼 떡볶이",
    desc: "Chewy Reiskuchen-Ersatz aus aufgerolltem Reispapier in milder Gochujang-Sauce.",
    story: "Dieser TikTok-Trend ist genial: Wenn man nasses Reispapier eng aufrollt und in Stücke schneidet, hat man die perfekte, zähe Tteokbokki-Textur. Viel schneller und oft bekömmlicher!",
    target: "≈80 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reispapier 10 Blatt",
      "Tofu (fest, gewürfelt) 200 g",
      "Karotten & Lauch (Streifen) 100 g",
      "Gochujang (milde Paste) 1 EL",
      "Sojasauce 1 EL",
      "Agavendicksaft 1 TL"
    ],
    steps: [
      "Reispapierblätter kurz in warmes Wasser tauchen, 2 Blätter übereinanderlegen und eng zu einer Zigarre aufrollen. In 4 cm Stücke schneiden.",
      "Tofu und Gemüse im Wok anbraten.",
      "Gochujang, Sojasauce, Agave und 100ml Wasser verrühren, in den Wok geben.",
      "Reispapier-Rollen 3 Min in der Sauce schwenken, bis sie weich sind."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Kein rohes Fleisch/Fisch) · Diabetes ✓",
    swaps: "Tofu ↔ Hähnchenbrust",
    side: "Gurkensticks.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Taro & Pork Rice 芋头烧肉饭 (Reiskocher)",
    desc: "Herzhafter Reis mit Taro-Wurzel und Schweinefleischwürfeln aus dem Reiskocher.",
    story: "Taro (Wasserbrotwurzel) schmilzt im Reiskocher fast wie eine süße Kartoffel und macht den Reis extrem cremig. Ein Klassiker der chinesischen Herbstküche.",
    target: "≈85 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Taro-Wurzel (oder Süßkartoffel, gewürfelt) 100 g",
      "Schweinegulasch (fein gewürfelt) 150 g",
      "Sojasauce 2 EL",
      "Knoblauch 1 Zehe",
      "Gemüsebrühe 200 ml"
    ],
    steps: [
      "Schweinefleisch mit Sojasauce und Knoblauch marinieren.",
      "Reis, Brühe, Taro und Fleisch in den Reiskocher geben.",
      "Start drücken. Das Fett des Schweins und die Stärke des Taros erledigen den Rest.",
      "Gut umrühren und genießen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch wird sicher durchgedämpft) · Diabetes ✓",
    swaps: "Taro ↔ Süßkartoffel",
    side: "Gedämpfter Spinat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Taro wird butterweich." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Schwarzer Sesam Congee 黑芝麻糊",
    desc: "Süßlicher, tiefschwarzer Reisbrei. Ein Schönheits-Geheimnis aus Asien.",
    story: "In China glaubt man, dass schwarzer Sesam gut für die Haare und die Seele ist. Dieser warme, leicht süßliche Brei schmeckt wie flüssiges Marzipan (nur besser).",
    target: "≈70 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Reis (roh) 60 g",
      "Schwarze Sesampaste (oder gemahlener schw. Sesam) 3 EL",
      "Milch (oder Hafermilch) 400 ml",
      "Wasser 200 ml",
      "Honig 1 EL",
      "Walnüsse 20 g"
    ],
    steps: [
      "Reis mit Wasser im Topf oder Reiskocher (Porridge-Modus) ca. 40 Min extrem weich kochen.",
      "Milch und Sesampaste einrühren, nochmals 5 Min köcheln.",
      "Mit Honig abschmecken und gehackten Walnüssen bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Sesam ↔ Erdnussmus",
    side: "Ein hartgekochtes Ei (für extra Protein).",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Airfryer Enoki-Beef Rolls 肥牛金针菇",
    desc: "Hauchdünnes Rindfleisch, um Enoki-Pilze gewickelt und im Airfryer knusprig gebacken.",
    story: "Ein Izakaya-Klassiker, der im Airfryer idiotensicher gelingt. Die Pilze bleiben saftig, das Rindfleisch wird kross.",
    target: "≈65 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Rindfleisch (hauchdünne Hotpot-Scheiben) 200 g",
      "Enoki-Pilze 1 Packung (150g)",
      "Teriyaki-Sauce (oder Soja+Honig) 3 EL",
      "Reis (gekocht) 150 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Enoki-Pilze unten abschneiden, in kleine Bündel teilen.",
      "Jedes Bündel straff mit einer Rindfleischscheibe umwickeln.",
      "Rollen mit Teriyaki bepinseln. Im Airfryer bei 190°C ca. 8-10 Min backen (bis das Fleisch komplett durch ist!).",
      "Mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch MUSS durch sein, Pilze garen im Inneren)",
    swaps: "Enoki ↔ Spargelspitzen; Rind ↔ Schweinebauch-Scheiben",
    side: "Krautsalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Rice Cooker Mac & Cheese (Asia Viral)",
    desc: "Makkaroni, Milch und Käse... aus dem Reiskocher? Ja, das klappt!",
    story: "Ein verrückter Trend aus Studenten-WGs in Asien. Der Reiskocher kocht die Nudeln direkt in der Milch, wodurch die Stärke eine bombastische Sauce bindet.",
    target: "≈85 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Makkaroni (kurze Nudeln) 120 g",
      "Milch 300 ml",
      "Gemüsebrühe 100 ml",
      "Cheddar oder Gouda (pasteurisiert, gerieben) 80 g",
      "Brokkoli-Röschen 100 g"
    ],
    steps: [
      "Nudeln, Milch und Brühe in den Reiskocher. Starten.",
      "Sobald es kocht, den Deckel ab und zu öffnen und umrühren (Vorsicht: Milch schäumt!).",
      "Nach 10 Min Brokkoli dazugeben. Wenn die Nudeln al dente sind, Reiskocher ausschalten.",
      "Käse unterrühren, bis er schmilzt."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse aus pasteurisierter Milch!) · Diabetes ✓",
    swaps: "Makkaroni ↔ Vollkorn-Penne",
    side: "Eine Handvoll Kirschtomaten.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Quick", water: "Milchgemisch", notes: "Aufsicht beim Kochen: Milch kocht schnell über." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "HK Macaroni Soup 通粉汤",
    desc: "Cha Chaan Teng Klassiker: Nudelsuppe zum Frühstück mit Kochschinken und Ei.",
    story: "In Hongkong frühstückt man gerne westlich-chinesische Fusion. Makkaroni in Hühnerbrühe mit Schinken und einem Spiegelei klingen schräg, sind aber unglaublich beruhigend.",
    target: "≈75 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Hörnchennudeln 100 g",
      "Hühnerbrühe 600 ml",
      "Kochschinken (gewürfelt) 60 g",
      "Eier 2 Stück",
      "Mais (TK) 50 g"
    ],
    steps: [
      "Brühe aufkochen, Nudeln und Mais darin garen.",
      "Schinkenwürfel dazugeben und kurz mitziehen lassen.",
      "Eier in einer Pfanne separat als Spiegelei (komplett durchbraten!) zubereiten.",
      "Suppe in Schalen füllen, Ei oben drauflegen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durchgebraten, Schinken erhitzt)",
    swaps: "Kochschinken ↔ Putenbrust-Aufschnitt",
    side: "Warmer Zitronen-Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Liangpi (Cold Skin Noodles) Hack 凉皮",
    desc: "Erfrischende, breite Nudeln in einer Sesam-Knoblauch-Sauce mit Gurke.",
    story: "Traditionelles Liangpi ist super aufwendig. Wir faken es mit breiten Reisbandnudeln oder Glasnudeln. Perfekt für einen leichten Mittag.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Breite Reisnudeln (oder dicke Glasnudeln) 150 g",
      "Gurke (in Streifen) 150 g",
      "Tofu (gebacken oder gebraten) 100 g",
      "Tahini (Sesampaste) 2 EL",
      "Sojasauce 1 EL",
      "Reisessig 1 EL",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Nudeln nach Packung kochen und eiskalt abschrecken.",
      "Tahini, Soja, Essig, Knoblauch und 2 EL warmes Wasser zu einer glatten Sauce rühren.",
      "Nudeln mit Gurkenstreifen und Tofu anrichten.",
      "Sauce darüber gießen und gut vermengen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Tahini ↔ Erdnussbutter",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Mogu Ji 蘑菇鸡 (Reiskocher)",
    desc: "Einfaches Hühnchen mit braunen Champignons und Reis, alles in einem Topf.",
    story: "Wenn du abends nur noch 5 Minuten Energie hast. Alles in den Topf werfen, Knopf drücken, duschen gehen, Essen ist fertig.",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust 200 g",
      "Braune Champignons (geviertelt) 150 g",
      "Sojasauce 2 EL",
      "Austernsauce 1 EL",
      "Gemüsebrühe 200 ml"
    ],
    steps: [
      "Huhn in Würfel schneiden, mit Austernsauce und Sojasauce mischen.",
      "Reis und Brühe in den Reiskocher.",
      "Huhn und Pilze darauf verteilen.",
      "Kochen lassen. Am Ende gut durchrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn gart sicher mit)",
    swaps: "Hähnchen ↔ Rindfleisch-Streifen",
    side: "Ein Schälchen Kimchi (mild).",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (Standard)", notes: "Pilze schrumpfen stark zusammen." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Matcha-Haferflocken 抹茶オートミール",
    desc: "Gesunder Haferbrei, verfeinert mit Antioxidantien aus grünem Matcha-Tee.",
    story: "Die cremige Basis der Haferflocken bändigt die leichte Bitterkeit des Matchas perfekt. Sieht toll aus und gibt sanfte Energie.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Sojamilch 400 ml",
      "Matcha-Pulver 1 TL",
      "Agavendicksaft 1 EL",
      "Mandeln (gehackt) 30 g",
      "Beeren (frisch oder TK aufgetaut) 50 g"
    ],
    steps: [
      "Matcha in einem Schuss warmem Wasser klümpchenfrei auflösen.",
      "Haferflocken in Sojamilch aufkochen, bis es cremig wird.",
      "Matcha und Agavendicksaft einrühren.",
      "Mit Nüssen und Beeren toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Koffein im Matcha ist moderat, völlig im Rahmen)",
    swaps: "Matcha ↔ Kakaopulver",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Airfryer Bang Bang Chicken (Mild) 棒棒鸡",
    desc: "Knusprige Hähnchenstücke aus dem Airfryer mit einer milden Sesam-Mayo-Sauce.",
    story: "Der Name kommt eigentlich vom Geräusch des Klopfens ('Bang Bang'), mit dem das Fleisch zart gemacht wird. Wir nehmen den Airfryer für den Crunch.",
    target: "≈80 g KH (2 P.) · Protein ≈35 g p. P.",
    ingredients: [
      "Hähnchenbrust 250 g",
      "Panko 40 g",
      "Ei 1 Stück",
      "Mayonnaise (pasteurisiert) 2 EL",
      "Süße Chilisauce (mild!) 1 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Hähnchen würfeln, in Ei und Panko wenden.",
      "Im Airfryer bei 190°C ca. 12-15 Min goldbraun backen (komplett durchgaren!).",
      "Mayo und süße Chilisauce mischen.",
      "Hähnchen auf Reis anrichten, Sauce darüber träufeln."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn durch, Mayo aus Tube = pasteurisiert)",
    swaps: "Hähnchen ↔ Blumenkohl-Röschen (Vegan Bang Bang)",
    side: "Gurkensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Ginger-Fish Rice 姜汁鱼饭 (Reiskocher)",
    desc: "Magerer Weißfisch dämpft mit viel Ingwer direkt auf dem Reis.",
    story: "Ingwer neutralisiert jeden Fischgeruch und wärmt den Magen. Der Reis saugt den wunderbaren, leichten Fischfond auf.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Kabeljau oder Seelachs (TK aufgetaut) 200 g",
      "Ingwer (sehr feine Streifen) 15 g",
      "Sojasauce 2 EL",
      "Frühlingszwiebel 10 g",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis und Brühe in den Topf.",
      "Fischfilet darauflegen, dick mit Ingwerstreifen belegen.",
      "Reiskocher starten.",
      "Nach dem Kochen Sojasauce über den heißen Fisch träufeln, Frühlingszwiebeln dazu, Fisch leicht zerteilen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Weißfisch ist quecksilberarm und dämpft sicher durch) · Diabetes ✓",
    swaps: "Kabeljau ↔ Lachsfilet",
    side: "Gedämpfter Spinat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe", notes: "Fisch gibt viel Flüssigkeit ab." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Viral Onigirazu (Sushi-Sandwich)",
    desc: "Ein zusammengeklapptes Nori-Blatt gefüllt mit Reis, Thunfisch-Mayo und Spiegelei.",
    story: "Man muss keine Sushi-Rollen rollen können! Das Sandwich-Prinzip macht Onigirazu zum perfekten, kleckerfreien Frühstück (oder Bento).",
    target: "≈75 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (gekocht, klebrig) 150 g",
      "Nori-Blätter 2 Stück",
      "Thunfisch (Dose) 100 g",
      "Mayonnaise (pasteurisiert) 1 EL",
      "Eier 2 Stück"
    ],
    steps: [
      "Eier als flache Omeletts komplett durchbraten.",
      "Thunfisch abtropfen und mit Mayo mischen.",
      "Nori-Blatt auf Frischhaltefolie legen. In die Mitte: Reis, Thunfisch, Ei, Reis.",
      "Die 4 Ecken des Nori-Blatts wie einen Briefumschlag zur Mitte falten. Fest einwickeln und halbieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier durch, Dosenthunfisch in Maßen ok, Jod/Nori in Maßen) · Diabetes ✓",
    swaps: "Thunfisch ↔ Gebratene Tofu-Scheibe",
    side: "Ein paar Edamame.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Moo Shu Pork 木须肉 (Wok)",
    desc: "Nordchinesischer Klassiker: Schweinefleisch-Streifen, Ei und Mu-Err-Pilze.",
    story: "Eigentlich wird das Gericht in kleine Pfannkuchen gewickelt gegessen. Wir servieren es Low-Effort einfach über einer Portion Reis.",
    target: "≈85 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Schweineschnitzel (feine Streifen) 150 g",
      "Eier 2 Stück",
      "Mu-Err Pilze (getrocknet) 10 g",
      "Karotte & Gurke (Streifen) 100 g",
      "Sojasauce 2 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Pilze 10 Min in heißem Wasser einweichen, dann schneiden.",
      "Eier im Wok stocken lassen, herausnehmen.",
      "Schweinefleisch anbraten (gut durch!), Gemüse und Pilze dazu.",
      "Sojasauce und Eier zurück in den Wok, schwenken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schwein und Ei komplett durch)",
    swaps: "Schwein ↔ Hähnchen",
    side: "Reis.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Pai Gu Fan 排骨饭 (Reiskocher)",
    desc: "Schweinerippchen (oder Geschnetzeltes) in schwarzer Bohnensauce über Reis gedämpft.",
    story: "In Dim Sum Restaurants dämpft man Ribs oft in kleinen Körben. Hier landet der ganze Fleischsaft direkt im Reis. Magie!",
    target: "≈80 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Schweinegulasch (klein geschnitten) 200 g",
      "Schwarze Bohnensauce (Black Bean Garlic) 1 EL",
      "Sojasauce 1 EL",
      "Wasser",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Fleisch mit Bohnenpaste und Sojasauce marinieren.",
      "Reis und Wasser in den Reiskocher.",
      "Das marinierte Fleisch oben auflegen.",
      "Kochen. Danach mit Frühlingszwiebeln gut durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch wird durchgedämpft)",
    swaps: "Schweinefleisch ↔ Putenbrust",
    side: "Gedämpfter Chinakohl.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Bohnenpaste ist salzig, nicht zu viel Sojasauce nehmen." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Gyeran Mari 계란말이 (Koreanisches Roll-Omelett)",
    desc: "Vielschichtiges, koreanisches Omelett mit fein gehacktem Gemüse.",
    story: "Ein Meisterwerk der Pfannentechnik. Das Ei wird schichtweise gebraten und immer wieder aufgerollt. Übung macht den Meister!",
    target: "≈60 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Eier 5 Stück",
      "Karotte (extrem fein gehackt) 20 g",
      "Frühlingszwiebel (sehr fein) 10 g",
      "Salz 1 Prise",
      "Reis (gekocht) 100 g"
    ],
    steps: [
      "Eier mit Gemüse und Salz verquirlen.",
      "Eine dünne Schicht in die Pfanne geben, stocken lassen, aufrollen (in der Pfanne lassen).",
      "Nächste Schicht an die Rolle gießen, stocken lassen, weiter aufrollen.",
      "Vorgang wiederholen. WICHTIG: Am Ende bei schwacher Hitze mit Deckel durchziehen lassen, damit es innen nicht flüssig bleibt!"
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Rolle muss komplett durchgaren!)",
    swaps: "Gemüse ↔ Nori-Blatt mit einrollen",
    side: "Reis und Sojasauce zum Dippen.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Airfryer Crispy Tofu mit Teriyaki",
    desc: "Superknusprige Tofuwürfel dank Airfryer, glasiert in Teriyaki-Sauce.",
    story: "Tofu wird im Ofen oft trocken. Im Airfryer (vorher in Stärke gewendet) bekommt er eine Kruste, die jeder Fast-Food-Kette Konkurrenz macht.",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Fester Tofu 250 g",
      "Maisstärke 2 EL",
      "Teriyaki-Sauce 3 EL",
      "Sesam 1 TL",
      "Vollkornreis (gekocht) 150 g",
      "Brokkoli 100 g"
    ],
    steps: [
      "Tofu würfeln, gut abtupfen und in Maisstärke wälzen.",
      "Im Airfryer bei 200°C ca. 12-15 Min backen, bis er aufpoppt und knusprig ist.",
      "Teriyaki-Sauce in der Pfanne leicht erwärmen, Tofu kurz darin schwenken.",
      "Mit Reis, Sesam und gedämpftem Brokkoli servieren."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Vollkornreis & Tofu)",
    swaps: "Teriyaki ↔ Süß-Sauer Sauce",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Asia-Paella (Reiskocher)",
    desc: "Reiskocher-Paella mit Kurkuma, Meeresfrüchten und Erbsen.",
    story: "Wer braucht schon eine große spanische Paella-Pfanne? Wir färben den Reis mit etwas Kurkuma (gesund!) und garen alles schonend im Reiskocher.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Meeresfrüchte-Mix (TK, aufgetaut) 200 g",
      "Kurkuma (Pulver) 1/2 TL",
      "Erbsen (TK) 50 g",
      "Hühnerbrühe 240 ml",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Reis, Brühe, Kurkuma und zerdrückten Knoblauch in den Reiskocher.",
      "Aufgetaute Meeresfrüchte und Erbsen obendrauf geben.",
      "Start drücken.",
      "Wenn fertig, alles gut durchmischen (Kurkuma verteilt sich gelb)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Meeresfrüchte garen im Dampf >75°C sicher durch)",
    swaps: "Meeresfrüchte ↔ Hähnchenwürfel",
    side: "Ein Spritzer frische Zitrone.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Mix vorher auftauen und abtropfen lassen." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Mango Sago Hafer-Bowl 杨枝甘露",
    desc: "Angelehnt an das berühmte Hongkong-Dessert, hier als gesundes Haferflocken-Frühstück.",
    story: "Mango Pomelo Sago ist der König der asiatischen Desserts. Wir wandeln es in ein Frühstück um: Haferflocken in Kokosmilch, frische Mango und etwas Grapefruit.",
    target: "≈75 g KH (2 P.) · Protein ≈12 g p. P.",
    ingredients: [
      "Haferflocken 80 g",
      "Kokosmilch (fettreduziert) 200 ml",
      "Wasser 100 ml",
      "Mango (reif, gewürfelt) 1 Stück",
      "Pomelo oder Grapefruit (ein paar Stückchen)",
      "Agavendicksaft 1 TL"
    ],
    steps: [
      "Haferflocken mit Kokosmilch und Wasser aufkochen.",
      "In Schalen füllen.",
      "Mit reichlich Mango-Würfeln und ein paar gezupften Grapefruit/Pomelo-Stücken toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓",
    swaps: "Pomelo ↔ Mandarinen-Stücke",
    side: "Schwarzer Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Japchae 잡채 (Koreanische Glasnudeln)",
    desc: "Süßkartoffel-Glasnudeln mit Spinat, Karotten und Rindfleisch.",
    story: "Ein Festtagsgericht in Korea. Die Süßkartoffel-Nudeln haben einen genialen Biss. Normalerweise wird jede Zutat einzeln gebraten – wir machen es uns im Wok leichter.",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Süßkartoffel-Glasnudeln (Dangmyeon) 120 g",
      "Rindfleisch (Streifen) 100 g",
      "Spinat 100 g",
      "Karotte 50 g",
      "Sojasauce 3 EL",
      "Sesamöl 1 EL",
      "Zucker 1 TL"
    ],
    steps: [
      "Nudeln in kochendem Wasser ca. 6 Min weichkochen, abtropfen, in Stücke schneiden.",
      "Rindfleisch und Karotte im Wok anbraten (gut durchgaren!).",
      "Spinat und Nudeln dazugeben.",
      "Sojasauce, Zucker und Sesamöl einrühren, gut durchschwenken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch durch) · Diabetes ✓",
    swaps: "Rind ↔ Pilze (Shiitake)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Ganze Zwiebel Reis (Viral Trend)",
    desc: "Eine geschälte, eingeschnittene Zwiebel kocht im Reis butterweich.",
    story: "Ein weiterer wilder Internet-Trend: Eine ganze Zwiebel (oben kreuzweise eingeschnitten) schmilzt im Reiskocher dahin. Die Süße der Zwiebel zieht komplett in den Reis. Unglaublich!",
    target: "≈80 g KH (2 P.) · Protein ≈18 g p. P. (mit Käse)",
    ingredients: [
      "Reis (roh) 120 g",
      "Zwiebel (mittlere Größe, geschält) 1 Stück",
      "Brühwürfel 1/2 Stück",
      "Butter 15 g",
      "Wasser",
      "Käse (Gouda, pasteurisiert) 40 g"
    ],
    steps: [
      "Reis in den Topf. Zwiebel schälen, oben tief kreuzweise einschneiden (nicht ganz durchschneiden) und in die Mitte setzen.",
      "Brühwürfel ins Wasser bröseln, dazugießen.",
      "Kochen. Danach die butterweiche Zwiebel zerdrücken, Butter und Käse unterrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert) · Diabetes ✓",
    swaps: "Zwiebel ↔ Tomate",
    side: "Dazu ein paar kalte Hähnchenbrust-Streifen.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Standard", notes: "Zwiebel wird extrem süß und weich." },
  },
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Schweinebauch": { group: "Protein/Fisch/Tofu", label: "Schweinebauch", unitDefault: "g" },
  "Schweinegulasch": { group: "Protein/Fisch/Tofu", label: "Schweinegulasch/Schulter", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch (Streifen)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Weißfisch (Kabeljau)", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Meeresfrüchte-Mix": { group: "Protein/Fisch/Tofu", label: "Meeresfrüchte-Mix (TK)", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Aburaage": { group: "Protein/Fisch/Tofu", label: "Aburaage (Fritt. Tofu)", unitDefault: "Stk" },
  "Inari-Age": { group: "Protein/Fisch/Tofu", label: "Inari-Age (Tofutaschen)", unitDefault: "Stk" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Cheddar": { group: "Protein/Fisch/Tofu", label: "Cheddar/Gouda (pasteurisiert)", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Käse/Gouda (pasteurisiert)", unitDefault: "g" },
  "Ricotta": { group: "Protein/Fisch/Tofu", label: "Ricotta", unitDefault: "g" },
  "Frischkäse": { group: "Protein/Fisch/Tofu", label: "Frischkäse", unitDefault: "EL" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Sojasprossen": { group: "Gemüse/Pilze", label: "Sojasprossen", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Enoki": { group: "Gemüse/Pilze", label: "Enoki-Pilze", unitDefault: "g" },
  "Mu-Err": { group: "Gemüse/Pilze", label: "Mu-Err Pilze (getrocknet)", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Lauch": { group: "Gemüse/Pilze", label: "Lauch", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch)", unitDefault: "Stück" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomaten", unitDefault: "Stück" },
  "Taro": { group: "Gemüse/Pilze", label: "Taro (Wasserbrotwurzel)", unitDefault: "g" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel", unitDefault: "g" },
  "Mango": { group: "Gemüse/Pilze", label: "Mango", unitDefault: "Stück" },
  "Pomelo": { group: "Gemüse/Pilze", label: "Pomelo/Grapefruit", unitDefault: "Stück" },
  "Ananas": { group: "Gemüse/Pilze", label: "Ananas (Dose)", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Süßkartoffel-Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Dangmyeon (Glasnudeln)", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Makkaroni": { group: "Reis/Nudeln/Sättigung", label: "Makkaroni (kurz)", unitDefault: "g" },
  "Hörnchennudeln": { group: "Reis/Nudeln/Sättigung", label: "Hörnchennudeln", unitDefault: "g" },
  "Tteokbokki": { group: "Reis/Nudeln/Sättigung", label: "Reiskuchen (Tteok)", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Wan-Tan-Blätter": { group: "Reis/Nudeln/Sättigung", label: "Wan-Tan-Blätter", unitDefault: "Stück" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot / Vollkorn", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko/Paniermehl", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Brühwürfel": { group: "Algen/Brühen/Würze", label: "Brühwürfel", unitDefault: "Stück" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Sojamilch": { group: "Algen/Brühen/Würze", label: "Sojamilch (ungezuckert)", unitDefault: "ml" },
  "Kokosmilch": { group: "Algen/Brühen/Würze", label: "Kokosmilch (fettarm)", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Schwarze Bohnensauce": { group: "Algen/Brühen/Würze", label: "Schwarze Bohnensauce", unitDefault: "EL" },
  "Süße Bohnenpaste": { group: "Algen/Brühen/Würze", label: "Süße Bohnenpaste/Hoisin", unitDefault: "EL" },
  "Schwarze Sesampaste": { group: "Algen/Brühen/Würze", label: "Schwarze Sesampaste", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Zucker", unitDefault: "TL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Fünf-Gewürze-Pulver": { group: "Algen/Brühen/Würze", label: "Fünf-Gewürze", unitDefault: "TL" },
  "Sternanis": { group: "Algen/Brühen/Würze", label: "Sternanis", unitDefault: "Stück" },
  "Backpulver": { group: "Algen/Brühen/Würze", label: "Backpulver", unitDefault: "TL" },
  "Hefe": { group: "Algen/Brühen/Würze", label: "Trockenhefe", unitDefault: "g" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Stück" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Zehe|Prise|Stangen|Scheiben|TL|EL|Stk|Blatt)?/i);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.toLowerCase().includes(k.toLowerCase()));
      if (!key) {
        if (name.includes("Reis (roh)") || name.includes("Reis (gekocht)")) key = "Reis";
        else if (name.includes("Nudeln")) key = "Weizennudeln";
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
    <g font-family='sans-serif'>
      <text x='40' y='120' font-size='44' fill='#1F2937'>🍱 ${esc(title)}</text>
      <text x='40' y='180' font-size='20' fill='#374151'>GhibliKitchen</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw8" }) {
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
      {meal.story ? <p style={{ marginTop: 4, color: "var(--text)", fontSize: "0.9em" }}>{meal.story}</p> : null}
      
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
            Woche 8 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Airfryer-Hacks · Virale Trends · Balanced · Schwangerschaftssicher</p>
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

// ---- RiceCooker Section ----
function RiceCookerSection({ data }) {
  const perDay = useMemo(() => {
    const map = { mo: null, di: null, mi: null, do: null, fr: null, sa: null, so: null };
    if (!data) return map; 
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Vom viralen Asia-Mac&Cheese über die Ganze Zwiebel bis zum Taro-Pork Rice.</p>
    </section>
  );
}

// PDF Export
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
export default function Woche8DE() {
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
            {tagChip("Woche 8")}
            {tagChip("Virale Trends & Airfryer Hacks")}
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