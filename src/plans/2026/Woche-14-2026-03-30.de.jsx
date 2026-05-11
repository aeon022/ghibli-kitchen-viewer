// src/plans/2026/Woche-14-2026-03-30.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { SharedMealCard } from "@/components/MealCard";

/*
  Moving Kitchen Tales – Woche 14 (Start: 2026-03-30)
  Fokus: Virale Airfryer-Hacks, Originaltitel (CN/JP/KR), Reiskocher-Magie, EU Crossover.
  Inhalt: Balanced, Schwangerschaftssicher (alles komplett durchgegart), Diabetesfreundlich.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 14",
  startDate: "2026-03-30",
  id: "woche-14-2026-03-30",
  lang: "de",
  sidebar: "Woche 14 (2026-03-30)",
};

const FILE_BASE = "Woche 14 2026-03-30";

const UI_TITLES = {
  main: "Rezepte Woche 14",
  list: "Einkaufsliste Woche 14",
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
  <span className="mkt-chip" key={text} style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "var(--chip-bg)", border: "1px solid var(--border)", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    {text}
  </span>
);

// Spezielles Styling für Virale Hits
const viralChip = () => (
  <span className="mkt-chip" key="viral" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "linear-gradient(135deg, #ff7e5f, #feb47b)", color: "#fff", fontWeight: "bold", border: "none", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    🔥 Viral Trend
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-03-30)",
  di: "Dienstag (2026-03-31)",
  mi: "Mittwoch (2026-04-01)",
  do: "Donnerstag (2026-04-02)",
  fr: "Freitag (2026-04-03)",
  sa: "Samstag (2026-04-04)",
  so: "Sonntag (2026-04-05)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Viral Egg Envelope Toast 접는 토스트",
    isViral: true,
    desc: "Ein clever gefaltetes Omelett im Toast, knusprig aus dem Airfryer oder der Pfanne.",
    story: "Koreanisches Streetfood trifft TikTok-Hack! Das Brot wird direkt in die Eimasse gelegt und dann wie ein Umschlag zugeklappt. Alles in einem Rutsch, genial einfach und sicher durchgegart.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Eier 4 Stück",
      "Käse (Gouda, pasteurisiert) 40 g",
      "Schinken (optional) 2 Scheiben",
      "Salz & Pfeffer"
    ],
    steps: [
      "Eier verquirlen, in eine geölte heiße Pfanne geben.",
      "Sofort zwei Toastscheiben nebeneinander in das flüssige Ei legen, dann wenden, sodass die Ei-Seite nach oben zeigt.",
      "Käse und Schinken auflegen. Die überstehenden Ei-Ränder nach innen über das Brot klappen.",
      "Das Ganze zusammenklappen und braten, bis das Ei im Inneren KOMPLETT gestockt ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durchgebraten!) · Diabetes ✓",
    swaps: "Schinken ↔ Tomatenscheiben",
    side: "Ein Glas warme Milch.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Airfryer Sweet & Sour Tofu 糖醋豆腐",
    desc: "Knusprige Tofuwürfel aus dem Airfryer in pikanter süß-saurer Sauce.",
    story: "Wir lieben die knusprige Textur von Tofu! Im Airfryer gelingt er fettarm und saugt sich danach mit der asiatischen Tomaten-Essig-Sauce wunderbar voll.",
    target: "≈80 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Fester Tofu (abgetropft & gewürfelt) 300 g",
      "Maisstärke 2 EL",
      "Ketchup 2 EL",
      "Reisessig 1 EL",
      "Agavendicksaft 1 TL",
      "Paprika (gewürfelt) 100 g",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Tofuwürfel in Maisstärke wenden und im Airfryer bei 200°C 15 Min knusprig backen.",
      "Paprika im Wok kurz anbraten. Ketchup, Essig, Agave und 3 EL Wasser aufkochen.",
      "Den knusprigen Tofu in die Sauce geben und 1 Minute schwenken.",
      "Mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Tofu ↔ Hähnchenbrust-Würfel",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Reiskocher Teriyaki Chicken 照り焼きチキン",
    desc: "Saftiges Hähnchen, im Reiskocher direkt über dem Reis gedämpft.",
    story: "Der ultimative One-Pot-Hit Japans. Das Hühnchen gart über dem Reis und tropft seine Umami-Säfte direkt in die Reiskörner. Null Aufwand, hundert Prozent Geschmack.",
    target: "≈82 g KH (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenkeule (o. Knochen) 250 g",
      "Teriyaki-Sauce (mild) 3 EL",
      "Hühnerbrühe 240 ml",
      "Frühlingszwiebel 10 g",
      "Pak Choi 150 g"
    ],
    steps: [
      "Hähnchen kräftig in der Teriyaki-Sauce wenden.",
      "Reis und Brühe in den Reiskocher füllen.",
      "Das marinierte Fleisch oben auflegen. Start drücken.",
      "In den letzten 5 Minuten Pak Choi in den Dämpfaufsatz legen. Nach dem Kochen Hähnchen zerteilen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn wird im Dampf >80°C komplett durchgegart)",
    swaps: "Hähnchenkeule ↔ Schweinefilet",
    side: "Pak Choi mit Sesamöl.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Fleisch nicht in den Reis einrühren vor dem Kochen." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Reispapier-Ei-Päckchen Bánh Tráng Nướng",
    isViral: true,
    desc: "Vietnamesisches Streetfood aus dem Airfryer. Reispapier, Ei und Frühlingszwiebeln knusprig gebacken.",
    story: "Auf den Straßen Vietnams wird dieses 'Pizza'-Päckchen auf dem Grill gemacht. Im Airfryer plustert sich das Reispapier herrlich auf und das Ei stockt rasend schnell. Ein genialer Trend!",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reispapier 4 Blatt",
      "Eier 2 Stück",
      "Frühlingszwiebeln 20 g",
      "Sriracha-Mayo (pasteurisiert) 1 EL",
      "Vollkorn-Toast (als Beilage) 2 Scheiben"
    ],
    steps: [
      "Ein Reispapier in den Airfryer legen. Ein halbes, verquirltes Ei mit Frühlingszwiebeln darauf verstreichen.",
      "Bei 180°C ca. 4-5 Minuten backen, bis das Ei vollkommen fest und der Rand knusprig ist.",
      "Zusammenklappen, mit Mayo toppen. Toast dazu."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durch, Mayo aus Tube)",
    swaps: "Reispapier ↔ Vollkorn-Wrap",
    side: "Eine große Tasse Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Yaki Udon mit Schwein 焼きうどん",
    desc: "Dicke, softe Udon-Nudeln, angebraten mit Schweinefleisch und knackigem Kohl.",
    story: "Der Liebling der japanischen Festivals. Die Nudeln sind wunderbar kaufreudig (chewy) und die Sojasauce karamellisiert leicht in der heißen Pfanne.",
    target: "≈85 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Udon-Nudeln (vorgegart) 400 g",
      "Schweinegeschnetzeltes 150 g",
      "Weißkohl (geschnitten) 150 g",
      "Sojasauce 2 EL",
      "Austernsauce 1 EL",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Udon-Nudeln kurz mit heißem Wasser übergießen, um sie zu lösen.",
      "Schweinefleisch und Knoblauch im Wok anbraten (komplett durchgaren!).",
      "Kohl dazugeben, kurz anbraten. Nudeln und Saucen unterheben.",
      "2 Minuten pfannenrühren, bis alles heiß ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schweinefleisch gut durchbraten) · Diabetes ✓",
    swaps: "Schwein ↔ Hähnchen",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Lachs & Spinat Takikomi Gohan 鮭とほうれん草のご飯",
    desc: "Reiskocher-Mixreis mit Lachs und viel frischem Spinat.",
    story: "Ein extrem gesundes, leichtes Abendessen. Der Lachs und die Dashi-Brühe sorgen für Umami, der Spinat bringt Eisen und Farbe.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Spinat (frisch) 100 g",
      "Sojasauce 1 EL",
      "Mirin 1 EL",
      "Dashi oder Brühe 240 ml"
    ],
    steps: [
      "Reis, Dashi, Sojasauce und Mirin in den Reiskocher.",
      "Lachs im Ganzen darauflegen. Start drücken.",
      "Nach dem Kochen den Lachs mit einem Löffel zerteilen.",
      "Den frischen Spinat sofort unter den kochend heißen Reis heben (er fällt durch die Restwärme zusammen)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart sicher durch)",
    swaps: "Lachs ↔ Weißfisch",
    side: "Ein paar Tropfen Zitronensaft.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Spinat erst am Schluss unterheben." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Matcha Baked Oats 抹茶ベイクドオーツ",
    isViral: true,
    desc: "Wie ein kleiner Kuchen zum Frühstück. Haferflocken, Banane und Matcha aus dem Airfryer.",
    story: "Dieser Food-Trend verwandelt langweilige Haferflocken in ofenwarmes Gebäck. Die leichte Herbe des Matcha-Tees harmoniert perfekt mit der Süße der Banane.",
    target: "≈70 g KH (2 P.) · Protein ≈16 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Banane (sehr reif) 1 Stück",
      "Milch 150 ml",
      "Matcha-Pulver 1 TL",
      "Backpulver 1 TL",
      "Quark (Magerstufe) 2 EL"
    ],
    steps: [
      "Haferflocken, zerdrückte Banane, Milch, Matcha und Backpulver gut verrühren.",
      "In eine kleine, ofenfeste (bzw. airfryer-geeignete) Form füllen.",
      "Im Airfryer bei 170°C für ca. 12-15 Minuten backen, bis es wie ein Muffin aufgeht.",
      "Mit einem Klecks Quark servieren."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Komplexe KH) · Schwangerschaft ✓",
    swaps: "Matcha ↔ Backkakao",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Japchae (Koreanische Glasnudeln) 잡채",
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
    checks: "Balanced ✓ · Schwangerschaft ✓ (Rind durch) · Diabetes ✓ (Süßkartoffel-Stärke ist verträglich)",
    swaps: "Rind ↔ Pilze (Shiitake)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Viral Tomato Pizza Rice 🍅🍕 (Reiskocher)",
    isViral: true,
    desc: "Der legendäre Reiskocher-Hack. Eine ganze Tomate, Schinken und Käse machen den Reis zu 'Pizza'.",
    story: "Asiens verrücktester One-Pot-Hit. Du setzt eine ganze Tomate in den Reis, wirfst Schinken und Kräuter dazu. Am Ende rührst du Käse unter. Es schmeckt ernsthaft wie Pizza-Füllung!",
    target: "≈82 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Tomate (groß) 1 Stück",
      "Kochschinken (Würfel) 100 g",
      "Gouda oder Mozzarella (pasteurisiert) 50 g",
      "Oregano & Olivenöl 1 EL",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis, Brühe, Öl und Kräuter in den Topf. Die Tomate kreuzweise einschneiden und in die Mitte setzen.",
      "Schinken drumherum streuen. Start drücken.",
      "Nach dem Kochen die butterweiche Tomate zerdrücken.",
      "Käse unterrühren, bis er Fäden zieht."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert, Schinken erhitzt) · Diabetes ✓",
    swaps: "Schinken ↔ Salami (nur wenn mitgekocht wg. Schwangerschaft)",
    side: "Ein grüner Salat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (etwas weniger wg. Tomate)", notes: "Tomate am Ende gut vermantschen." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Miso-Haferbrei mit Ei 味噌オートミール",
    desc: "Herzhafter Haferbrei, verfeinert mit Umami-Miso und einem hartgekochten Ei.",
    story: "Wer Miso-Suppe zum Frühstück liebt, wird dieses Oatmeal vergöttern. Es ist warm, wohlig und extrem schnell gemacht.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Wasser oder Gemüsebrühe 400 ml",
      "Miso-Paste 1 EL",
      "Eier (hartgekocht) 2 Stück",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Haferflocken in Brühe/Wasser einköcheln.",
      "Vom Herd nehmen! Miso-Paste einrühren (darf nicht mehr kochen, um die Kulturen zu erhalten).",
      "Mit halbierten, hartgekochten Eiern servieren.",
      "Mit Frühlingszwiebel bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier hartgekocht)",
    swaps: "Eier ↔ Edamame",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Tomaten-Ei-Pfanne auf Nudeln 番茄炒蛋面",
    desc: "Die berühmte chinesische Tomaten-Ei-Pfanne, serviert über Nudeln statt Reis.",
    story: "Dieses Gericht geht immer. Die Tomaten zerkochen zu einer natürlichen Sauce, das Ei fängt den Geschmack auf. Ein geniales Comfort-Mittagessen.",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Weizennudeln oder Udon 150 g",
      "Tomaten (sehr reif) 3 Stück",
      "Eier 3 Stück",
      "Ketchup 1 EL",
      "Sojasauce 1 EL",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Eier in der Pfanne komplett durchbraten (stocken lassen), herausnehmen.",
      "Tomaten würfeln und mit Knoblauch in der Pfanne weichschmoren, bis Sauce entsteht. Ketchup und Soja dazu.",
      "Eier zurückgeben und zerkleinern. Gekochte Nudeln untermischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett gestockt)",
    swaps: "Weizennudeln ↔ Reis",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Kürbis & Hähnchen Reis 南瓜鸡饭 (Reiskocher)",
    desc: "Kürbis und Hähnchenbrust dämpfen zusammen im Reiskocher. Ein süß-herzhafter Traum.",
    story: "Ein Wohlfühlessen aus Südchina. Der Kürbis zerfällt fast und hüllt jedes Reiskorn in ein cremiges, süßliches Gold.",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Kürbis (z.B. Hokkaido, gewürfelt) 150 g",
      "Hähnchenbrust (gewürfelt) 200 g",
      "Sojasauce 2 EL",
      "Knoblauch 1 Zehe",
      "Hühnerbrühe 240 ml"
    ],
    steps: [
      "Hähnchen kurz mit Sojasauce und Knoblauch vermengen.",
      "Reis waschen, in den Topf geben und Brühe (minimal weniger als normal) hinzufügen.",
      "Hähnchen und Kürbis auf dem Reis verteilen.",
      "Start drücken. Danach alles sorgfältig durchmischen (Kürbis musen)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hähnchen gart im Topf sicher durch) · Diabetes ✓",
    swaps: "Hähnchen ↔ Schweinehack",
    side: "Miso-Suppe.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (etwas weniger als normal)", notes: "Kürbis gibt Wasser ab." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Korean Street Toast 길거리 토스트",
    desc: "Sandwich mit Omelett, Kohl und Karotten, leicht gezuckert.",
    story: "Der Duft koreanischer U-Bahn-Stationen. Ein deftiges Omelett zwischen zwei Toastscheiben, oft mit Ketchup und einer Prise Zucker.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Eier 3 Stück",
      "Weißkohl (fein gehobelt) 100 g",
      "Karotte (geraspelt) 30 g",
      "Butter, Ketchup, Prise Zucker"
    ],
    steps: [
      "Ei mit Gemüse verquirlen, als eckiges Omelett braten (komplett durchgaren!).",
      "Brot in Butter toasten.",
      "Omelett aufs Brot, Ketchup & Zucker drauf, zuklappen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei durch)",
    swaps: "Kohl ↔ Frühlingszwiebeln",
    side: "Kaffee oder Milch.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Pasta e Fagioli (Italienisch)",
    desc: "Ein dickflüssiger, wärmender Eintopf aus Nudeln und weißen Bohnen.",
    story: "Ein Klassiker aus Rom. Manche nennen es Suppe, manche Pasta. Die Stärke der Bohnen bindet die Brühe zu einer unglaublichen Creme.",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Kleine Nudeln (z.B. Ditalini oder Macaroni) 100 g",
      "Weiße Bohnen (Dose, gespült) 150 g",
      "Tomatenmark 1 EL",
      "Gemüsebrühe 400 ml",
      "Knoblauch 1 Zehe",
      "Parmesan 20 g"
    ],
    steps: [
      "Knoblauch und Tomatenmark in etwas Öl anrösten.",
      "Bohnen (ein paar davon leicht zerdrücken) und Brühe dazugeben. 10 Min köcheln.",
      "Nudeln direkt in die Brühe geben und kochen, bis sie al dente sind und die Sauce andickt.",
      "Mit Parmesan bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Nudeln ↔ Vollkornnudeln",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Garlic Butter Prawns エビガーリック (Reiskocher)",
    desc: "Garnelen, Knoblauch und Butter garen direkt über dem Reis.",
    story: "Hawaiianischer Garlic-Shrimp Vibe trifft auf den Asia-Reiskocher. Der Reis fängt das Knoblauch-Butter-Aroma der Garnelen ein.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (geschält) 200 g",
      "Knoblauch 2 Zehen (fein gehackt)",
      "Butter 15 g",
      "Sojasauce 1 EL",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis und Brühe in den Topf.",
      "Garnelen, Knoblauch und Butter oben drauflegen.",
      "Kochen. Am Ende Sojasauce darüberträufeln und gut durchrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen werden durch den Dampf >80°C sicher erhitzt)",
    swaps: "Garnelen ↔ Jakobsmuscheln",
    side: "Ein Stück Zitrone zum Drüberträufeln.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Butter erst kurz vor Schluss zugeben für noch mehr Aroma, oder von Anfang an." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Chicken Congee 鸡丝粥 (Reiskocher)",
    desc: "Cremiger Reisbrei mit Hühnchen. Sehr schonend und wärmend.",
    story: "Am Wochenende darf das Frühstück Zeit brauchen. Im Reiskocher köchelt das Porridge ungestört vor sich hin, das Huhn wird wunderbar zart.",
    target: "≈70 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Hühnerbrühe 800 ml",
      "Hähnchenbrust 150 g",
      "Ingwer (fein geschnitten) 5 g",
      "Frühlingszwiebel 10 g",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Huhn am Stück lassen.",
      "Reis, Brühe, Ingwer und das Huhn in den Reiskocher (Porridge Modus, ca. 50 Min).",
      "Nach dem Kochen das Huhn herausnehmen, mit einer Gabel zerzupfen und zurück in den Brei geben.",
      "Mit Soja und Zwiebeln würzen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn gart extrem lange durch) · Diabetes ✓",
    swaps: "Huhn ↔ Weißfisch",
    side: "Ein hartgekochtes Ei.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:10 Ratio", notes: "Sehr flüssig am Anfang, dickt toll ein." },
  },
  {
    id: "sa-m",
    title: "Airfryer Lachs-Bites サーモン",
    desc: "Kleine Lachs-Würfel, asiatisch mariniert und im Airfryer saftig gebacken.",
    story: "Lachs in Würfeln backt im Airfryer in unter 8 Minuten. Die Ränder karamellisieren durch die Sojasauce herrlich.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Lachsfilet (gewürfelt) 200 g",
      "Sojasauce 1 EL",
      "Sesamöl 1 TL",
      "Reis (gekocht) 150 g",
      "Brokkoli (gedämpft) 100 g"
    ],
    steps: [
      "Lachswürfel in Sojasauce und Sesamöl wenden.",
      "Im Airfryer bei 200°C ca. 7-9 Min backen (Fisch muss komplett durchgaren!).",
      "Mit Reis und Brokkoli in einer Bowl anrichten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs komplett durchgaren)",
    swaps: "Lachs ↔ Fester Tofu",
    side: "Etwas Chili-Mayo (aus pasteurisierter Mayo) als Dip.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Miso-Köttbullar (SWE/JP Fusion)",
    desc: "Schwedische Hackbällchen, serviert in einer unglaublichen Miso-Rahmsauce.",
    story: "Köttbullar mal anders! Statt normaler Rinderbrühe geben wir Miso-Paste in die Sahnesauce. Das Umami-Level steigt ins Unermessliche.",
    target: "≈85 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Rinderhack 200 g",
      "Paniermehl 20 g",
      "Sahne (pasteurisiert) 100 ml",
      "Miso-Paste 1 EL",
      "Kartoffeln 300 g"
    ],
    steps: [
      "Hack mit in etwas Wasser eingeweichtem Paniermehl kneten, Bällchen formen.",
      "Bällchen in der Pfanne komplett durchbraten, herausnehmen.",
      "Sahne und Miso in der Pfanne leicht aufkochen. Bällchen zurückgeben.",
      "Kartoffeln kochen und dazu servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleischbällchen KOMPLETT durchbraten!)",
    swaps: "Rinderhack ↔ Vegane Hack-Alternative",
    side: "Preiselbeermarmelade (wenig).",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Fluffiges Soufflé-Omelett 계란말이",
    isViral: true,
    desc: "Wie eine Wolke! Getrennt aufgeschlagene Eier ergeben ein riesiges, leichtes Omelett.",
    story: "Ein Trend aus japanischen und koreanischen Cafés. Wir schlagen das Eiweiß steif. Wichtig: Wir decken die Pfanne ab, damit die 'Wolke' auch innen komplett durchgart!",
    target: "≈45 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Zucker 1 TL",
      "Salz 1 Prise",
      "Butter 10 g",
      "Vollkorn-Toast 2 Scheiben"
    ],
    steps: [
      "Eier trennen. Eiweiß mit Zucker steif schlagen. Eigelb mit Salz verrühren.",
      "Eigelb vorsichtig unter das Eiweiß heben.",
      "Butter in der Pfanne schmelzen, Masse hineingeben. Deckel drauf! Bei niedriger Hitze 6-8 Min komplett durchgaren lassen (darf nicht flüssig bleiben).",
      "Zusammenklappen und auf Toast servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Deckel ist Pflicht für durchgegartes Inneres!)",
    swaps: "Toast ↔ Schwarzbrot",
    side: "Frische Gurken-Sticks.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Dan Dan Nudeln (Hähnchen) 担担面",
    desc: "Der Sichuan-Nudelklassiker: Milde Sesam-Soja-Sauce mit gebratenem Hähnchenhack.",
    story: "Normalerweise schwimmt dieses Gericht in Chili-Öl. Wir fokussieren uns auf die reichhaltige Sesam-Tahini-Sauce und nutzen mageres Hühnerhack für eine leichte, umamireiche Mahlzeit.",
    target: "≈85 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Weizennudeln 150 g",
      "Hähnchenhack 150 g",
      "Tahini (Sesampaste) 2 EL",
      "Sojasauce 2 EL",
      "Knoblauch 1 Zehe",
      "Pak Choi 100 g"
    ],
    steps: [
      "Hackfleisch und Knoblauch im Wok krümelig und gut durch braten.",
      "Tahini, Sojasauce und etwas warmes Nudelwasser zu einer dicken Sauce rühren.",
      "Nudeln und Pak Choi kochen.",
      "Nudeln in die Sauce geben, Hackfleisch darüber häufen, gut umrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hähnchenhack komplett durchbraten!)",
    swaps: "Hähnchenhack ↔ Tofu-Crumble",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Sausage & Rice 腊味饭 (Reiskocher)",
    desc: "Herzhafter Reistopf mit Hähnchen und etwas Wurst für den Rauchgeschmack.",
    story: "Die chinesische Variante der Paella (Bao Zai Fan). Der Reis am Boden wird oft herrlich knusprig (ähnlich dem spanischen 'Socarrat'), während das Fleisch oben dämpft.",
    target: "≈84 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (gewürfelt) 150 g",
      "Räucherwurst (z.B. Cabanossi) 50 g",
      "Sojasauce 2 EL",
      "Erbsen (TK) 50 g",
      "Brühe 240 ml"
    ],
    steps: [
      "Wurst in dünne Scheiben schneiden. Hähnchen mit Sojasauce mischen.",
      "Reis und Brühe in den Topf.",
      "Wurst, Hähnchen und Erbsen darauf verteilen.",
      "Start drücken. Wenn fertig, alles gut durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch und Wurst kochen auf >80°C sicher durch)",
    swaps: "Wurst ↔ Räuchertofu",
    side: "Ein Tomatensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Wurst gibt ordentlich Fett und Geschmack ab." },
  },
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Schweinefilet": { group: "Protein/Fisch/Tofu", label: "Schweinefilet", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweinegulasch": { group: "Protein/Fisch/Tofu", label: "Schweinegulasch", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack (mager)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Hähnchenhack": { group: "Protein/Fisch/Tofu", label: "Hähnchenhack", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau/Seelachs", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Räucherwurst": { group: "Protein/Fisch/Tofu", label: "Räucherwurst/Cabanossi", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda / Käse", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark", unitDefault: "g" },
  "Schinken": { group: "Protein/Fisch/Tofu", label: "Schinken", unitDefault: "Scheiben" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Lauch": { group: "Gemüse/Pilze", label: "Lauch", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Taro": { group: "Gemüse/Pilze", label: "Taro (Wasserbrotwurzel)", unitDefault: "g" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis", unitDefault: "g" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Kartoffeln": { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  "Blaubeeren": { group: "Gemüse/Pilze", label: "Blaubeeren", unitDefault: "g" },
  "Banane": { group: "Gemüse/Pilze", label: "Banane", unitDefault: "Stück" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Süßkartoffel-Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Weichweizengrieß": { group: "Reis/Nudeln/Sättigung", label: "Grieß", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Paniermehl": { group: "Reis/Nudeln/Sättigung", label: "Paniermehl", unitDefault: "g" },
  "Rote Linsen": { group: "Reis/Nudeln/Sättigung", label: "Rote Linsen", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Sahne": { group: "Algen/Brühen/Würze", label: "Sahne", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Sriracha": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)/Mayo", unitDefault: "EL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Schwarze Bohnensauce": { group: "Algen/Brühen/Würze", label: "Schwarze Bohnensauce", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Currypulver": { group: "Algen/Brühen/Würze", label: "Currypulver", unitDefault: "TL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
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
        else if (name.includes("Toast")) key = "Vollkorn-Toast";
        else if (name.includes("Feta")) key = "Feta";
        else if (name.includes("Pilze")) key = "Champignons";
        else if (name.includes("Kohl")) key = "Weißkohl";
        else if (name.includes("Tomate")) key = "Tomate";
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
      <text x='40' y='180' font-size='20' fill='#374151'>Moving Kitchen Tales</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw14" }) {
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
    <div className="mkt-art" style={{ position: "relative", borderRadius: 14, overflow: "hidden", marginBottom: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
      <img src={src} alt={meal.title} style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9", objectFit: "cover" }} loading="lazy" />
    </div>
  );
}

function MealCard({ meal }) {
  return (
    <SharedMealCard
      meal={meal}
      meta={meta}
      cardPanelStyle={cardPanelStyle}
      ImageBanner={ImageBanner}
      tagChip={tagChip}
      viralChip={viralChip}
    />
  );
}

function DaySection({ dayKey, meals, dayName }) {
  return (
    <section className="day-section" style={{ marginBottom: 40 }} id={`day-${dayKey}`}>
      <h2 style={{ marginBottom: 16, borderBottom:"2px solid var(--border)", paddingBottom:8 }}>
        {dayName.replace(/\s*\(.+\)$/, "")} <span className="mkt-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
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

  const pill = (meal) => {
    let icon = "🍽️";
    if (meal.riceCooker?.enabled) icon = "🍚";
    if (meal.isViral) icon = "🔥";
    
    return (
      <a
        key={meal.id}
        href={`#meal-${meal.id}`}
        onClick={scrollToId(`meal-${meal.id}`)}
        style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: 6, 
          padding: "6px 10px", 
          borderRadius: 999, 
          border: meal.isViral ? "1px solid #ff7e5f" : "1px solid var(--border)", 
          background: meal.isViral ? "linear-gradient(135deg, rgba(255,126,95,0.1), rgba(254,180,123,0.1))" : "var(--panel)", 
          textDecoration: "none", 
          color: "var(--text)", 
          boxShadow: "var(--shadow)", 
          fontSize: 13, 
          cursor: "pointer" 
        }}
      >
        {icon} <span>{meal.title.split(" (")[0]}</span>
      </a>
    );
  };

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ ...cardPanelStyle, background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="mkt-hero-inner" style={{ padding: 18, borderRadius: 12, marginBottom: 16, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            Woche 14 – Übersicht <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Virale Airfryer-Hacks 🔥 · Reiskocher-Magie · Balanced</p>
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
                {byDay[d].map((m) => pill(m))}
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Tomato Pizza Rice, Linsen-Reis, Pai Gu Fan und mehr.</p>
    </section>
  );
}

// PDF Export (nur noch Drucken Funktion)
const doPrint = () => window.print();

// Theme Switch Component
function ThemeSwitch({ mode, setMode, effectiveDark }) {
  return (
    <div className="mkt-theme-switch" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: 6, border: "1px solid var(--btn-border)", borderRadius: 999, background: "var(--panel)" }}>
      <button type="button" className="mkt-tab" aria-pressed={mode === "auto"} onClick={() => setMode(mode === "auto" ? (effectiveDark ? "dark" : "light") : "auto")} style={{ padding: "6px 10px" }}>Auto</button>
      <label className="mkt-switch" title={effectiveDark ? "Dunkel" : "Hell"}>
        <input type="checkbox" checked={effectiveDark} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} disabled={mode === "auto"} />
        <span className="mkt-slider" />
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------
// MAIN EXPORT
// -----------------------------------------------------------------------
export default function Woche14DE() {
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
      
      .mkt-tab { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 16px; border-radius: 12px; border: 1px solid var(--btn-border); background: var(--panel); color: var(--text); cursor: pointer; font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: all 0.2s ease; }
      .mkt-tab:hover { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-color: var(--accent-2); }
      .mkt-switch{ --w:48px; --h:28px; --k:22px; position:relative; display:inline-block; width:var(--w); height:var(--h); }
      .mkt-switch input{ opacity:0; width:0; height:0; position:absolute; }
      .mkt-switch .mkt-slider{ position:absolute; inset:0; border-radius:var(--h); background:var(--btn-border); border:1px solid var(--btn-border); transition:0.2s; }
      .mkt-switch .mkt-slider::before{ content:""; position:absolute; height:var(--k); width:var(--k); left:3px; top:50%; transform:translateY(-50%); border-radius:999px; background:var(--panel); box-shadow:var(--shadow); transition:transform .2s; }
      .mkt-switch input:checked + .mkt-slider{ background:var(--accent-2); border-color:var(--accent-2); }
      .mkt-switch input:checked + .mkt-slider::before{ transform:translateY(-50%) translateX(calc(var(--w) - var(--k) - 6px)); }

      .mkt-segment{ display:inline-flex; gap:4px; border:1px solid var(--btn-border); border-radius:999px; padding:4px; background:var(--panel); }
      .mkt-segment label{ position:relative; display:inline-flex; align-items:center; border-radius:999px; overflow:hidden; cursor:pointer; }
      .mkt-segment input[type="radio"]{ position:absolute; inset:0; opacity:0; cursor:pointer; }
      .mkt-segment span{ display:inline-block; padding:8px 14px; border-radius:999px; border:1px solid transparent; }
      .mkt-segment input[type="radio"]:checked + span{ background:var(--btn-on-bg); outline:2px solid var(--accent-2); outline-offset:1px; }

      #mkt-content{ display:block !important; }
      #mkt-content > [hidden]{ display:none !important; }

      .mkt-exporting{ width:794px !important; max-width:794px !important; margin:0 auto !important; background:#fff !important; box-sizing:border-box !important; font-size:12pt !important; line-height:1.45 !important; --bg:#FFFFFF; --text:#111827; --panel:#FFFFFF; --border:rgba(0,0,0,.12); --muted:#374151; --chip-bg:#F3F4F6; --btn-border:rgba(0,0,0,.15); --btn-on-bg:#F3F4F6; }
      .mkt-exporting *{ box-shadow:none !important; }
      .mkt-exporting .mkt-art, .mkt-exporting img{ display:none !important; visibility:hidden !important; }
      .mkt-exporting .mkt-chip, .mkt-exporting .mkt-date-paren{ display:none !important; }

      @media print { .mkt-art, .mkt-date-paren{ display:none !important; visibility:hidden !important; } html, body, #root { background:#fff !important; } aside, nav, header, footer, .mkt-no-print { display:none !important; } #kochbuch-root { width: calc(210mm - 24mm); margin:0 auto !important; background:#fff !important; border:none !important; box-shadow:none !important; } .mkt-hero, .mkt-hero-inner { background:#fff !important; box-shadow:none !important; } .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; } h2, h3 { break-after:avoid; page-break-after:avoid; } #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } a[href]:after { content:""; } }
    `}</style>
  );

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      <Styles />

      <div className="mkt-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div className="mkt-hero-inner" style={{ background: "var(--grad-hero)", borderRadius: 12, padding: 14, marginBottom: 12, display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`Start: ${meta.startDate}`)}
            {tagChip("Woche 14")}
            {tagChip("Virale Trends & Wohlfühlküche")}
            {tagChip("Täglich 1× 🍚 Reiskocher")}
          </div>
        </div>

        <div className="mkt-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <fieldset className="mkt-segment" role="radiogroup" aria-label="Ansicht wählen">
            <label>
              <input type="radio" name="mkt-view" value="kochbuch" checked={tab === "kochbuch"} onChange={() => setTab("kochbuch")} />
              <span>{UI_TITLES.main}</span>
            </label>
            <label>
              <input type="radio" name="mkt-view" value="liste" checked={tab === "liste"} onChange={() => setTab("liste")} />
              <span>{UI_TITLES.list}</span>
            </label>
          </fieldset>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginLeft: "auto" }}>
            <button type="button" onClick={doPrint} className="mkt-tab"><span className="icon">🖨️</span> Drucken</button>
            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={DATA} DAY_NAME_DE={DAY_NAME_DE} meta={meta} />
        <div id="mkt-content" data-view={tab}>
          <section id="mkt-pane-kochbuch" aria-hidden={tab !== "kochbuch"} hidden={tab !== "kochbuch"}>
            {DAYS_ORDER.map((d) => (
              <DaySection key={d} dayKey={d} meals={DATA.filter(r => r.id.startsWith(d))} dayName={DAY_NAME_DE[d]} />
            ))}
            <RiceCookerSection data={DATA} />
          </section>
          <section id="mkt-pane-liste" aria-hidden={tab !== "liste"} hidden={tab !== "liste"}>
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