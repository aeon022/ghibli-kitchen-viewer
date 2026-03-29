// src/plans/2026/Woche-11-2026-03-09.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 11 (Start: 2026-03-09)
  Fokus: Virale Hits (hervorgehoben!), Reiskocher, Airfryer.
  Inhalt: Balanced, Schwangerschaftssicher, Diabetesfreundlich.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 11",
  startDate: "2026-03-09",
  id: "woche-11-2026-03-09",
  lang: "de",
  sidebar: "Woche 11 (2026-03-09)",
};

const FILE_BASE = "Woche 11 2026-03-09";

const UI_TITLES = {
  main: "Rezepte Woche 11",
  list: "Einkaufsliste Woche 11",
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

// Spezielles Styling für Virale Hits
const viralChip = () => (
  <span className="ghk-chip" key="viral" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "linear-gradient(135deg, #ff7e5f, #feb47b)", color: "#fff", fontWeight: "bold", border: "none", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    🔥 Viral Trend
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-03-09)",
  di: "Dienstag (2026-03-10)",
  mi: "Mittwoch (2026-03-11)",
  do: "Donnerstag (2026-03-12)",
  fr: "Freitag (2026-03-13)",
  sa: "Samstag (2026-03-14)",
  so: "Sonntag (2026-03-15)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Grated Egg Avocado Toast",
    isViral: true,
    desc: "Hartgekochtes Ei, über Avocado-Toast gerieben wie Parmesan. Super cremig!",
    story: "Dieser TikTok-Trend ist ein Gamechanger. Statt das Ei in Scheiben zu schneiden, reibt man es über den Toast. Die Textur wird dadurch unglaublich fein und schmilzt fast.",
    target: "≈60 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Eier (hartgekocht) 2 Stück",
      "Avocado (reif) 1 Stück",
      "Sriracha-Sauce oder Mayo (pasteurisiert) 1 TL",
      "Salz & Pfeffer"
    ],
    steps: [
      "Toastbrot knusprig toasten.",
      "Avocado zerdrücken und auf dem Toast verstreichen.",
      "Die hartgekochten Eier mit einer Käserreibe fein über die Brote reiben.",
      "Mit etwas Mayo oder Sriracha toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier hartgekocht!) · Diabetes ✓",
    swaps: "Avocado ↔ Frischkäse",
    side: "Ein Glas Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Peanut-Butter Udon",
    desc: "Dicke Udon-Nudeln in einer warmen, ultra-cremigen Erdnusssauce.",
    story: "Ein asiatischer Comfort-Food-Klassiker, der blitzschnell im Wok oder in der Pfanne geht. Die Erdnussbutter emulgiert mit dem Nudelwasser zu einer Traum-Sauce.",
    target: "≈85 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Udon-Nudeln (vorgegart) 400 g",
      "Erdnussbutter (ungesüßt) 3 EL",
      "Sojasauce 2 EL",
      "Sesamöl 1 TL",
      "Hähnchenbrust (in Streifen) 150 g",
      "Spinat 100 g"
    ],
    steps: [
      "Hähnchen im Wok gut durchbraten.",
      "Erdnussbutter, Sojasauce und Sesamöl mit etwas heißem Wasser glatt rühren.",
      "Udon und Spinat zum Huhn geben, kurz anbraten.",
      "Sauce darüber gießen, schwenken bis alles cremig ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn durch) · Diabetes ✓",
    swaps: "Erdnussbutter ↔ Tahini",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Lazy Sushi Bake (Reiskocher-Edition)",
    isViral: true,
    desc: "Die Aromen einer Sushi-Rolle, einfach zusammen im Reiskocher zubereitet.",
    story: "Der Sushi-Bake ist normalerweise ein Auflauf. Wir machen ihn noch einfacher: Der Lachs gart im Reiskocher mit, am Ende wird Mayo und Nori untergehoben.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh, ideal Sushi-Reis) 120 g",
      "Lachsfilet 200 g",
      "Mayonnaise (pasteurisiert) 2 EL",
      "Sojasauce 1 EL",
      "Reisessig 1 EL",
      "Nori (zerbröselt) 1 Blatt"
    ],
    steps: [
      "Reis mit Wasser in den Reiskocher geben. Lachs mit Sojasauce beträufeln und obendrauf setzen.",
      "Start drücken. Wenn fertig, Lachs zerteilen.",
      "Mayo, Reisessig und Nori-Brösel unter den heißen Reis rühren.",
      "Warm löffeln."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs dämpft komplett durch, Mayo aus Tube) · Diabetes ✓",
    swaps: "Lachs ↔ Thunfisch (Dose)",
    side: "Gurkensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Sushi", water: "Standard", notes: "Lachs gart wunderbar zart im Dampf." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Herzhaftes Miso-Oatmeal",
    desc: "Haferbrei nach japanischer Art, mit Miso-Paste, Sojasauce und Spiegelei.",
    story: "In Japan frühstückt man oft Reis mit Miso-Suppe. Das Oatmeal kombiniert beides: Die Flocken kochen in Dashi-Brühe. Macht satt und glücklich.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Dashi oder Gemüsebrühe 400 ml",
      "Miso-Paste 1 EL",
      "Eier 2 Stück",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Haferflocken in Brühe einköcheln. Am Ende vom Herd nehmen und Miso einrühren.",
      "Eier in der Pfanne komplett durchbraten (kein flüssiges Eigelb).",
      "Haferbrei mit dem Ei und Frühlingszwiebeln toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei durchgebraten)",
    swaps: "Eier ↔ Fester Tofu",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Airfryer Zucchini-Pizza-Bites",
    desc: "Low-Carb Snack-Mittagessen. Zucchinischeiben überbacken mit Tomatensauce und Käse.",
    story: "Eine schnelle, vitaminreiche Alternative zu normaler Pizza. Im Airfryer wird die Zucchini nicht matschig, sondern behält einen tollen Biss.",
    target: "≈45 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Zucchini (groß) 1 Stück",
      "Passierte Tomaten 4 EL",
      "Gouda oder Mozzarella (pasteurisiert) 80 g",
      "Italienische Kräuter 1 TL",
      "Vollkornbrot (als Beilage) 2-4 Scheiben"
    ],
    steps: [
      "Zucchini in ca. 1 cm dicke Scheiben schneiden.",
      "Jede Scheibe mit Tomatensauce bestreichen, würzen und Käse darauflegen.",
      "Im Airfryer bei 180°C ca. 8-10 Min backen, bis der Käse goldbraun ist.",
      "Mit Brot servieren."
    ],
    checks: "Balanced ✓ · Diabetes ✓ · Schwangerschaft ✓ (Käse schmilzt komplett durch)",
    swaps: "Zucchini ↔ Auberginen",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Baozi-Hack: Reiskocher Fleischbällchen-Reis",
    desc: "Der Geschmack von chinesischen Bao-Teigtaschen, ohne Teig zu kneten.",
    story: "Wir formen Hackbällchen mit typischen Baozi-Gewürzen (Ingwer, Soja, Sesamöl) und dämpfen sie direkt auf dem Reis.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Schweinehack (mager) 200 g",
      "Ingwer (gerieben) 1 TL",
      "Sojasauce 2 EL",
      "Weißkohl (fein geschnitten) 100 g",
      "Wasser"
    ],
    steps: [
      "Hack mit Ingwer und Sojasauce verkneten, kleine Bällchen formen.",
      "Reis und Wasser in den Reiskocher. Kohl und Hackbällchen darauf verteilen.",
      "Start drücken. Der Fleischsaft zieht direkt in den Reis.",
      "Am Ende gut vermischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hackfleisch gart sicher durch)",
    swaps: "Schweinehack ↔ Hähnchenhack",
    side: "Ein Spritzer Sesamöl drüber.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Kohl gibt etwas Feuchtigkeit ab." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Ricotta-Zitronen Pancakes",
    desc: "Fluffige Pancakes mit Ricotta-Käse im Teig. Ein italienischer Frühstückstraum.",
    story: "Der Ricotta sorgt dafür, dass die Pancakes unglaublich weich und saftig werden, ohne schwer im Magen zu liegen. Ein Hauch Zitrone weckt dich auf.",
    target: "≈75 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Mehl 100 g",
      "Ricotta (pasteurisiert) 100 g",
      "Eier 2 Stück",
      "Zitronenabrieb (bio) 1 TL",
      "Milch 50 ml",
      "Backpulver 1 TL"
    ],
    steps: [
      "Ricotta, Eier, Milch und Zitronenabrieb glatt rühren.",
      "Mehl und Backpulver zügig unterheben (nicht zu viel rühren!).",
      "In der Pfanne bei mittlerer Hitze durchbacken, bis sie fest und goldbraun sind."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Teig durchbacken, Ricotta pasteurisiert)",
    swaps: "Ricotta ↔ Magerquark",
    side: "Ein paar Beeren.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Gochujang-Sahne Pasta",
    isViral: true,
    desc: "Vollkorn-Nudeln in einer koreanisch-italienischen Fusions-Sauce.",
    story: "Ein Internet-Phänomen! Die süßlich-würzige koreanische Chilipaste (Gochujang) vermischt mit etwas Sahne ergibt eine unschlagbare Rosé-Sauce.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Nudeln 130 g",
      "Gochujang (milde Paste) 1 EL",
      "Kochsahne (oder Sojacreme) 100 ml",
      "Knoblauch 1 Zehe",
      "Parmesan 20 g",
      "Spinat 50 g"
    ],
    steps: [
      "Nudeln kochen. Etwas Nudelwasser aufheben.",
      "Knoblauch in der Pfanne anbraten, Gochujang kurz mitrösten.",
      "Mit Sahne und Nudelwasser ablöschen. Spinat reinwerfen.",
      "Nudeln in der Sauce schwenken und mit Parmesan bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Gochujang ↔ Tomatenmark (falls es komplett mild sein soll)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Schweinebauch & Daikon (Reiskocher)",
    desc: "Japanisch inspirierter Schmortopf. Rettich und Schweinebauch verschmelzen förmlich.",
    story: "Daikon (weißer Rettich) wirkt Wunder bei der Verdauung und saugt die herzhafte Soja-Brühe auf wie ein Schwamm. Ein echtes Wohlfühl-Essen.",
    target: "≈80 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Schweinebauch (in dünnen Scheiben oder gewürfelt) 150 g",
      "Daikon (Rettich, gewürfelt) 150 g",
      "Sojasauce 2 EL",
      "Mirin 1 EL",
      "Dashi oder Brühe 240 ml"
    ],
    steps: [
      "Reis und Brühe in den Topf geben.",
      "Sojasauce und Mirin dazugeben.",
      "Schweinebauch und Rettich oben auflegen. Start drücken.",
      "Nach dem Kochen alles vorsichtig durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch wird durchgedämpft)",
    swaps: "Schweinebauch ↔ Hähnchenoberschenkel",
    side: "Frühlingszwiebeln drüberstreuen.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Rettich wird extrem weich und lecker." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Tomaten-Rührei Toast 番茄炒蛋",
    desc: "Der chinesische Klassiker 'Tomate & Ei' serviert auf knusprigem Brot.",
    story: "Jedes chinesische Kind wächst damit auf. Die Säure der Tomate weckt auf, das Ei macht satt. Auf Vollkornbrot ein geniales, schnelles Frühstück.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Tomaten (sehr reif) 2 Stück",
      "Eier 3 Stück",
      "Ketchup 1 TL",
      "Knoblauch 1 Zehe",
      "Vollkorn-Toast 4 Scheiben"
    ],
    steps: [
      "Eier in der Pfanne stocken lassen (komplett durchbraten!), herausnehmen.",
      "Tomaten mit Knoblauch anbraten, bis sie musig werden. Ketchup dazu.",
      "Eier zurück in die Pfanne, vermischen.",
      "Toast rösten und die Mischung darauf verteilen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett durch)",
    swaps: "Toast ↔ Reis",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Airfryer Chicken Wings (Asia Style)",
    desc: "Knusprige Hähnchenflügel aus der Heißluftfritteuse mit klebriger Soja-Glasur.",
    story: "Flügel im Airfryer werden unglaublich kross, und fast das gesamte Fett tropft ab. Die asiatische Glasur aus Soja und ein wenig Honig macht sie perfekt.",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Hähnchenflügel 300 g",
      "Sojasauce 2 EL",
      "Honig 1 TL",
      "Reis (gekocht) 150 g",
      "Gurke 100 g"
    ],
    steps: [
      "Flügel trocken tupfen. Im Airfryer bei 200°C ca. 20-25 Min backen (bis sie am Knochen komplett durch sind!).",
      "Sojasauce und Honig in einer Pfanne kurz aufkochen, bis es dickt.",
      "Knusprige Flügel in der Sauce schwenken.",
      "Mit Reis und Gurkensticks servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch am Knochen prüfen, muss durch sein!)",
    swaps: "Flügel ↔ Hähnchenbrust-Würfel",
    side: "Reis und Gurke.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Miso-Pilz-Reis 🍄 (Reiskocher)",
    desc: "Veganer Umami-Traum. Pilze und Edamame dämpfen mit Miso-Paste im Reis.",
    story: "Ein leichtes Gericht für den Abend. Miso liefert die Würze, Edamame das Protein, und der Reiskocher macht die ganze Arbeit.",
    target: "≈82 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Braune Champignons oder Shiitake 150 g",
      "Edamame (geschält, TK) 100 g",
      "Miso-Paste 1 EL",
      "Gemüsebrühe 240 ml",
      "Butter 10 g"
    ],
    steps: [
      "Miso-Paste in der warmen Brühe auflösen.",
      "Reis, Brühe, Pilze in den Reiskocher geben und starten.",
      "Nach dem Kochen die Edamame (aufgetaut) und die Butter unter den heißen Reis heben.",
      "5 Minuten ziehen lassen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Edamame ↔ Tofu-Würfel",
    side: "Ein Stück gebratener Lachs (optional).",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Miso nicht unaufgelöst reingeben, sonst gibt es Klumpen." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Vietnamesische Reispapier-Pizza",
    isViral: true,
    desc: "Bánh Tráng Nướng! Ein Airfryer/Pfannen-Hack mit Ei auf Reispapier.",
    story: "Das genialste vietnamesische Streetfood. Das Reispapier wird beim Erhitzen wie ein knuspriger Taco, das Ei stockt oben drauf.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reispapier 4 Blatt",
      "Eier 2 Stück",
      "Frühlingszwiebeln 20 g",
      "Sriracha-Mayo (pasteurisiert) 1 EL",
      "Gouda (gerieben) 30 g",
      "Brot (als Beilage) 2 Scheiben"
    ],
    steps: [
      "Ein Reispapier in die heiße Pfanne oder den Airfryer legen.",
      "Ein halbes, verquirltes Ei darauf verstreichen, Zwiebeln und Käse drauf.",
      "Backen/Braten bis das Reispapier am Rand poppt und das Ei komplett (!) gestockt ist.",
      "Zusammenklappen und genießen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durchgaren)",
    swaps: "Käse ↔ Putenbrust-Streifen",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Airfryer Lachs-Frikadellen (Schwedisch)",
    desc: "Schnelle Lachsfrikadellen mit Dill, fettarm im Airfryer gebacken.",
    story: "In Skandinavien liebt man Fischfrikadellen (Laxbiffar). Wir machen sie aus Lachsresten oder Dosenlachs, gebunden mit etwas Semmelbröseln.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Lachs (Dose oder frische Reste, sehr klein gehackt) 200 g",
      "Ei 1 Stück",
      "Paniermehl 30 g",
      "Dill (frisch) 1 EL",
      "Kartoffeln 300 g",
      "Quark-Dip (aus Magerquark & Zitrone) 2 EL"
    ],
    steps: [
      "Lachs mit Ei, Paniermehl und Dill mischen, Frikadellen formen.",
      "Im Airfryer bei 180°C ca. 12 Minuten backen, bis sie komplett durchgegart und leicht knusprig sind.",
      "Kartoffeln kochen.",
      "Mit dem Zitronen-Quark-Dip servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Frikadellen gut durchgaren)",
    swaps: "Lachs ↔ Thunfisch (Dose)",
    side: "Erbsen.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Hühnchen & Kürbis Congee (Reiskocher)",
    desc: "Cremiger Reisbrei mit Kürbis und Hühnchen. Sehr schonend und wärmend.",
    story: "Am Ende der Arbeitswoche braucht der Körper etwas Sanftes. Der Kürbis verkocht komplett im Brei und verleiht ihm eine wunderschöne, goldene Farbe.",
    target: "≈75 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Hühnerbrühe 800 ml",
      "Hähnchenbrust (klein gewürfelt) 150 g",
      "Kürbis (z.B. Hokkaido, in Stücken) 150 g",
      "Ingwer 5 g",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Huhn mit Sojasauce mischen.",
      "Reis, Brühe, Kürbis und Ingwer in den Reiskocher (Porridge Modus, ca. 50 Min).",
      "In den letzten 15 Minuten das Huhn hinzugeben und sicher durchgaren lassen.",
      "Gut umrühren, der Kürbis zerfällt von allein."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn durch) · Diabetes ✓",
    swaps: "Kürbis ↔ Karotte",
    side: "Etwas frischer Koriander oder Frühlingszwiebeln.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:10 Ratio", notes: "Sehr flüssig am Anfang, dickt toll ein." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Custard Yogurt Toast",
    isViral: true,
    desc: "Toast, belegt mit einer cremigen Joghurt-Ei-Mischung, gebacken im Airfryer.",
    story: "Ein viraler Frühstückshit! Eine Mischung aus Joghurt und Ei wird auf eine Kuhle im Toast gegeben. Beim Backen entsteht ein süßer, puddingartiger Belag (Custard).",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Griechischer Joghurt (pasteurisiert) 4 EL",
      "Ei 1 Stück",
      "Agavendicksaft 1 TL",
      "Beeren (z.B. Himbeeren) 50 g"
    ],
    steps: [
      "Joghurt, Ei und Agave gut verquirlen.",
      "Mit einem Löffel eine Kuhle in die Mitte der Toastscheiben drücken.",
      "Die Joghurt-Mischung in die Kuhle füllen, mit Beeren belegen.",
      "Im Airfryer bei 170°C ca. 8-10 Min backen, bis der 'Pudding' komplett fest ist (kein flüssiges Ei!)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei-Masse muss gestockt sein)",
    swaps: "Beeren ↔ Apfelspalten",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Schnelle Wok-Nudeln (Lo Mein)",
    desc: "Einfache, gebratene Nudeln mit einer dunklen Soja-Sauce und Pak Choi.",
    story: "Das klassische chinesische Wok-Gericht. 'Lo Mein' bedeutet gerührte Nudeln. Der Schlüssel ist, die Nudeln erst nach dem Gemüse in die Pfanne zu geben.",
    target: "≈85 g KH (2 P.) · Protein ≈15 g p. P. (mehr mit Beilage)",
    ingredients: [
      "Eiernudeln oder Weizennudeln 150 g",
      "Pak Choi 150 g",
      "Sojasauce (dunkel & hell) 2 EL",
      "Knoblauch 1 Zehe",
      "Zucker 1 TL",
      "Tofu oder gebratenes Ei (optional) 100 g"
    ],
    steps: [
      "Nudeln kochen und abtropfen.",
      "Knoblauch und Pak Choi im Wok scharf anbraten.",
      "Nudeln dazugeben.",
      "Mit Sojasauce und Zucker würzen, 2 Minuten pfannenrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Pak Choi ↔ Spinat",
    side: "Spiegelei (durchgebraten).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Gyu-Don Style Rice (Rindfleisch im Reiskocher)",
    desc: "Dünnes Rindfleisch dämpft über dem Reis mit einer süß-salzigen Zwiebel-Sauce.",
    story: "Gyu-Don ist eigentlich ein japanisches Fast-Food. Die Kombination aus zartem Rindfleisch und weichen Zwiebeln klappt aber auch perfekt im Reiskocher als One-Pot-Meal.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Rindfleisch (sehr feine Hotpot-Scheiben) 200 g",
      "Zwiebel 1 Stück",
      "Sojasauce 2 EL",
      "Mirin 1 EL",
      "Brühe 240 ml"
    ],
    steps: [
      "Zwiebel in feine Ringe schneiden.",
      "Reis und Brühe in den Topf. Soja und Mirin dazu.",
      "Zwiebeln und Rindfleisch obendrauf verteilen (Fleisch auffächern, nicht als Klumpen!).",
      "Start drücken. Alles durchrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch wird durchgedämpft)",
    swaps: "Rind ↔ Schwein",
    side: "Eingelegter Ingwer.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Fleisch gut verteilen, damit es gleichmäßig gart." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Tomaten-Käse-Spiegelei im Airfryer",
    desc: "Eier und Kirschtomaten, überbacken in einem kleinen Förmchen.",
    story: "Sonntagsfrühstück ohne Pfanne abzuwaschen! Man schlägt einfach Eier über Tomaten und Käse auf und lässt den Airfryer den Rest erledigen.",
    target: "≈60 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Kirschtomaten 100 g",
      "Gouda oder Cheddar (gerieben) 40 g",
      "Vollkornbrot 4 Scheiben",
      "Salz & Pfeffer"
    ],
    steps: [
      "Tomaten halbieren und in zwei kleine, ofenfeste Förmchen legen.",
      "Käse darüber streuen. Jeweils 2 Eier vorsichtig darüber aufschlagen.",
      "Im Airfryer bei 170°C ca. 10-12 Min backen (Eier müssen komplett gestockt sein!).",
      "Mit Toast servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eigelb darf nicht mehr flüssig sein!)",
    swaps: "Tomaten ↔ Champignons",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Airfryer Lachs-Bites mit Reis",
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
    swaps: "Lachs ↔ Tofu",
    side: "Etwas Chili-Mayo (aus pasteurisierter Mayo) als Dip.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Chicken & Sausage Paella 煲仔饭 (Reiskocher)",
    desc: "Herzhafter Reistopf mit Hähnchen und etwas Wurst für den Rauchgeschmack.",
    story: "Die chinesische Variante der Paella. Der Reis am Boden wird oft herrlich knusprig (ähnlich dem spanischen 'Socarrat'), während das Fleisch oben dämpft.",
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
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Hähnchenhack": { group: "Protein/Fisch/Tofu", label: "Hähnchenhack", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweinegulasch": { group: "Protein/Fisch/Tofu", label: "Schweinegulasch", unitDefault: "g" },
  "Schweinebauch": { group: "Protein/Fisch/Tofu", label: "Schweinebauch", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau/Seelachs", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Räucherwurst": { group: "Protein/Fisch/Tofu", label: "Räucherwurst/Cabanossi", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Seidentofu": { group: "Protein/Fisch/Tofu", label: "Seidentofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda/Reibekäse", unitDefault: "g" },
  "Ricotta": { group: "Protein/Fisch/Tofu", label: "Ricotta", unitDefault: "g" },

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
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Mu-Err": { group: "Gemüse/Pilze", label: "Mu-Err Pilze", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Taro": { group: "Gemüse/Pilze", label: "Taro (Wasserbrotwurzel)", unitDefault: "g" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel", unitDefault: "g" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis", unitDefault: "g" },
  "Daikon": { group: "Gemüse/Pilze", label: "Daikon (Rettich)", unitDefault: "g" },
  "Ananas": { group: "Gemüse/Pilze", label: "Ananas (Dose)", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Makkaroni": { group: "Reis/Nudeln/Sättigung", label: "Makkaroni (kurz)", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot", unitDefault: "Scheiben" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Kochsahne": { group: "Algen/Brühen/Würze", label: "Kochsahne", unitDefault: "ml" },
  "Joghurt": { group: "Algen/Brühen/Würze", label: "Joghurt (Griechisch)", unitDefault: "EL" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Sriracha-Sauce": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)", unitDefault: "TL" },
  "Süße Chilisauce": { group: "Algen/Brühen/Würze", label: "Süße Chilisauce", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Schwarze Sesampaste": { group: "Algen/Brühen/Würze", label: "Schwarze Sesampaste", unitDefault: "EL" },
  "Erdnussbutter": { group: "Algen/Brühen/Würze", label: "Erdnussbutter", unitDefault: "EL" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Agave", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
  "Backpulver": { group: "Algen/Brühen/Würze", label: "Backpulver", unitDefault: "TL" },
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
      <text x='40' y='180' font-size='20' fill='#374151'>GhibliKitchen</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw11" }) {
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
  return (
    <div className="meal-card" style={cardPanelStyle} id={`meal-${meal.id}`}>
      <ImageBanner meal={meal} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3>
        <div>
          {meal.isViral ? viralChip() : null}
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
        <div className="ghk-hero-inner" style={{ padding: 18, borderRadius: 12, marginBottom: 16, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            Woche 11 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Virale Hits 🔥 · Udon-Trends · Reiskocher-Magie · Balanced</p>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Lazy Sushi Bake, Tomaten-Feta Risotto, Schweinebauch & Daikon.</p>
    </section>
  );
}

// PDF Export (nur noch Drucken Funktion)
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
export default function Woche11DE() {
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
            {tagChip("Woche 11")}
            {tagChip("Virale Trends & Wohlfühlküche")}
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