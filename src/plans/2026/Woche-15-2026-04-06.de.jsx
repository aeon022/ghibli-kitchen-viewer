// src/plans/2026/Woche-15-2026-04-06.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 15 (Start: 2026-04-06)
  Status: KOMPLETT & FUNKTIONSFÄHIG (Alle 21 Rezepte)
  Fokus: Virale Airfryer-Hacks, Reiskocher-Magie, EU/Asia Crossover.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 15",
  startDate: "2026-04-06",
  id: "woche-15-2026-04-06",
  lang: "de",
  sidebar: "Woche 15 (2026-04-06)",
};

const FILE_BASE = "Woche 15 2026-04-06";

const UI_TITLES = {
  main: "Rezepte Woche 15",
  list: "Einkaufsliste Woche 15",
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
  mo: "Montag (2026-04-06)",
  di: "Dienstag (2026-04-07)",
  mi: "Mittwoch (2026-04-08)",
  do: "Donnerstag (2026-04-09)",
  fr: "Freitag (2026-04-10)",
  sa: "Samstag (2026-04-11)",
  so: "Sonntag (2026-04-12)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Viral Pesto Fried Eggs",
    isViral: true,
    desc: "Spiegeleier, die direkt in grünem Pesto statt in Öl gebraten werden.",
    story: "Ein grandioser TikTok-Trend. Das Pesto liefert das Öl zum Braten und würzt das Ei gleichzeitig mit Basilikum, Knoblauch und Parmesan. Auf knusprigem Brot ein Traum.",
    target: "≈50 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Grünes Pesto (aus dem Glas) 2 EL",
      "Eier 4 Stück",
      "Vollkorn-Toast 4 Scheiben",
      "Cherrytomaten 100 g",
      "Parmesan (gerieben) 1 EL"
    ],
    steps: [
      "Pesto in einer Pfanne bei mittlerer Hitze erwärmen.",
      "Die Eier direkt auf das Pesto schlagen.",
      "Deckel auflegen und braten, bis das Eiweiß und Eigelb GANZ durchgestockt sind (wichtig für die Schwangerschaft!).",
      "Mit Tomaten auf dem Toast servieren, etwas Parmesan darüberstreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eigelb muss komplett fest sein) · Diabetes ✓",
    swaps: "Grünes Pesto ↔ Rotes Pesto",
    side: "Kaffee oder Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Airfryer Pasta Chips Salat",
    isViral: true,
    desc: "Gekochte Nudeln werden im Airfryer zu knusprigen Chips und dienen als Croutons auf frischem Salat.",
    story: "Pasta Chips sind ein riesiger Hit. Sie eignen sich super als Snack, aber noch besser machen sie sich als sättigender, knuspriger Crunch in einer großen, bunten Salat-Bowl.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Kurze Nudeln (z.B. Penne oder Farfalle) 150 g",
      "Olivenöl 1 EL",
      "Italienische Kräuter & Knoblauchpulver",
      "Gemischter Salat (Gurke, Tomate, Paprika) 300 g",
      "Feta (pasteurisiert) 100 g",
      "Joghurt-Dressing 3 EL"
    ],
    steps: [
      "Nudeln kochen, abtropfen und gut mit Olivenöl und Gewürzen mischen.",
      "Im Airfryer bei 200°C ca. 10-12 Minuten backen, bis sie knusprig sind. Zwischendurch schütteln.",
      "Salat und Gemüse zerkleinern, Feta darüberbröseln.",
      "Salat mit Dressing mischen, die Pasta Chips kurz vor dem Essen als Topping daraufgeben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert) · Diabetes ✓",
    swaps: "Feta ↔ Mozzarella",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Reiskocher Oyakodon 親子丼",
    desc: "Der japanische 'Eltern-und-Kind'-Klassiker: Hühnchen und Ei dämpfen direkt auf dem Reis.",
    story: "Oyakodon (Huhn = Eltern, Ei = Kind) kocht man meist in einer speziellen Pfanne. Wir machen daraus ein One-Pot-Gericht. Das Ei stockt im Reiskocher perfekt durch.",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (in mundgerechten Stücken) 200 g",
      "Zwiebel (in Ringen) 1 Stück",
      "Sojasauce 2 EL",
      "Mirin 1 EL",
      "Dashi oder Brühe 240 ml",
      "Eier 2 Stück"
    ],
    steps: [
      "Reis, Brühe, Sojasauce und Mirin in den Reiskocher geben.",
      "Zwiebelringe und Hähnchenstücke gleichmäßig darauf verteilen. Start drücken.",
      "Etwa 10 Minuten vor Ende der Garzeit (wenn das Wasser fast weg ist), den Deckel öffnen und die leicht verquirlten Eier über das Fleisch gießen.",
      "Deckel wieder schließen und fertig garen lassen. Das Ei wird komplett fest."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch und Ei garen im Topf >80°C komplett durch)",
    swaps: "Hähnchen ↔ Schweinefilet",
    side: "Ein wenig Frühlingszwiebel on top.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Eier erst gegen Ende zugeben, sonst werden sie gummiartig." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Miso-Bananen-Pancakes",
    desc: "Süße Bananen-Pancakes mit einem winzigen Hauch salziger Miso-Paste für das ultimative Umami.",
    story: "Die Kombination aus süßer Banane und salzigem Miso funktioniert ähnlich genial wie Salted Caramel. Ein tolles, ungewöhnliches Frühstück.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Mehl (Vollkorn oder Dinkel) 120 g",
      "Banane (sehr reif) 1 Stück",
      "Miso-Paste (hell) 1 TL",
      "Eier 2 Stück",
      "Milch 80 ml",
      "Backpulver 1 TL"
    ],
    steps: [
      "Banane mit einer Gabel zu Mus zerdrücken.",
      "Eier, Milch und die Miso-Paste (am besten vorher in 1 EL warmem Wasser auflösen) gut unterrühren.",
      "Mehl und Backpulver zügig unterheben.",
      "In einer Pfanne mit etwas Öl bei mittlerer Hitze durchbacken, bis sie fest und goldbraun sind."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Teig durchbacken)",
    swaps: "Miso ↔ Prise Salz (falls Miso zu mutig ist)",
    side: "Ein Klecks Naturjoghurt.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Gochujang Butter Spaghetti 고추장 버터 파스타",
    isViral: true,
    desc: "Ein gigantischer Fusion-Hit. Spaghetti in einer feurigsüßen Butter-Knoblauch-Sauce.",
    story: "Nichts ist simpler und besser. Die koreanische Chilipaste Gochujang karamellisiert in Butter und verbindet sich mit dem Nudelwasser zu einer glänzenden Emulsion.",
    target: "≈85 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Spaghetti (Vollkorn) 150 g",
      "Butter 30 g",
      "Knoblauch 2 Zehen (fein gehackt)",
      "Gochujang (milde Paste) 1 EL",
      "Sojasauce 1 TL",
      "Spinat oder Pak Choi 100 g"
    ],
    steps: [
      "Spaghetti in Salzwasser kochen. Eine Tasse Nudelwasser aufheben.",
      "Butter in einer Pfanne schmelzen, Knoblauch und Gochujang 1 Min anrösten.",
      "Einen Schuss Nudelwasser und Sojasauce einrühren, bis die Sauce bindet.",
      "Spaghetti und Spinat dazugeben und kräftig schwenken."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Vollkorn-Spaghetti nutzen)",
    swaps: "Gochujang ↔ Tomatenmark mit einer Prise Chili",
    side: "Spiegelei (durchgebraten) für mehr Protein.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Rindfleisch & Erbsen Pilaf (Reiskocher)",
    desc: "Ein herrlich aromatischer Rindfleisch-Reis mit Erbsen und orientalischen Gewürzen.",
    story: "Inspiriert vom orientalischen Pulao. Der Reiskocher nimmt dir die Arbeit ab, das Rindfleisch wird butterzart.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Rinderhack oder Rindfleisch (fein geschnitten) 150 g",
      "Erbsen (TK) 80 g",
      "Zwiebel (gehackt) 1 Stück",
      "Rinderbrühe oder Gemüsebrühe 240 ml",
      "Kreuzkümmel & Zimt (je eine Prise)"
    ],
    steps: [
      "Hackfleisch kurz mit den Gewürzen und der Zwiebel vermengen (optional vorher in der Pfanne krümelig anbraten für mehr Röstaromen).",
      "Reis und Brühe in den Reiskocher.",
      "Fleischmischung und Erbsen darauflegen.",
      "Start drücken. Am Ende alles auflockern und mischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Rindfleisch komplett durchgaren im Topf) · Diabetes ✓",
    swaps: "Rindfleisch ↔ Lammhack",
    side: "Ein frischer Gurkensalat mit Joghurt.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Erbsen können ihre leuchtende Farbe verlieren, schmecken aber super." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Savory French Toast (Käse & Lauch)",
    desc: "French Toast mal herzhaft! Das Brot wird in Ei getunkt und mit Käse und Frühlingszwiebeln gebacken.",
    story: "Ein perfektes Reste-Essen. Der herzhafte Ei-Mantel macht das Brot unglaublich saftig, der geschmolzene Käse sorgt für den Crunch am Rand.",
    target: "≈65 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Eier 3 Stück",
      "Milch 30 ml",
      "Frühlingszwiebeln (fein gehackt) 20 g",
      "Gouda oder Cheddar (gerieben) 40 g"
    ],
    steps: [
      "Eier mit Milch, Frühlingszwiebeln, Salz und Pfeffer in einem tiefen Teller verquirlen.",
      "Toastscheiben nacheinander von beiden Seiten durch die Ei-Masse ziehen.",
      "In einer Pfanne mit etwas Öl oder Butter bei mittlerer Hitze anbraten.",
      "Käse auf die Brote streuen, wenden und backen, bis der Käse eine Kruste bildet und das Ei komplett durch ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durchbraten)",
    swaps: "Gouda ↔ Mozzarella",
    side: "Tomatenscheiben.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Airfryer Sweet Potato Gnocchi",
    desc: "Gekaufte Gnocchi werden im Airfryer zu knusprigen Kartoffel-Pops geröstet.",
    story: "Ein genialer Trick! Statt Gnocchi in Wasser zu kochen, werden sie im Airfryer außen wie Kroketten und bleiben innen weich. Ein fantastischer Salat- oder Bowl-Zusatz.",
    target: "≈85 g KH (2 P.) · Protein ≈15 g p. P. (mehr mit Tofu)",
    ingredients: [
      "Süßkartoffel-Gnocchi (Kühlregal) 300 g",
      "Olivenöl 1 EL",
      "Knoblauchpulver & Paprika",
      "Brokkoli (gedämpft) 150 g",
      "Feta (pasteurisiert) 50 g"
    ],
    steps: [
      "Gnocchi aus der Packung direkt mit Olivenöl und Gewürzen mischen.",
      "Im Airfryer bei 190°C ca. 12-14 Minuten rösten, bis sie knusprig sind. Zwischendurch schütteln.",
      "Mit gedämpftem Brokkoli in einer Schüssel anrichten.",
      "Feta darüber bröseln."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓ (Süßkartoffel gut verträglich)",
    swaps: "Süßkartoffel-Gnocchi ↔ Normale Gnocchi",
    side: "Etwas Joghurt-Dip.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Hainan-Style Schwein 猪肉饭 (Reiskocher)",
    desc: "Mageres Schweinefleisch gart im Ingwer-Reis und wird butterzart.",
    story: "Wer Hainan Chicken liebt, wird diese Variation mögen. Das Schweinefilet saugt das Dämpf-Wasser auf und lässt sich danach fast mit dem Löffel zerteilen.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Schweinefilet (am Stück oder dicke Medaillons) 200 g",
      "Ingwer (fein gehackt) 15 g",
      "Knoblauch 2 Zehen",
      "Hühnerbrühe 240 ml",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Reis, Brühe, Ingwer, zerdrückten Knoblauch und Sojasauce in den Reiskocher geben.",
      "Schweinefilet oben drauflegen. Start drücken.",
      "Nach dem Kochen das Fleisch herausnehmen, in Scheiben schneiden und auf dem gut umgerührten Reis anrichten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schweinefilet gart im Reiskocher >80°C komplett durch)",
    swaps: "Schweinefilet ↔ Putenbrust",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Fleisch nicht zu klein schneiden." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Schwarzer Sesam Haferbrei 黑芝麻燕麦",
    desc: "Tiefschwarzer, nussiger Porridge mit schwarzer Sesampaste und Honig.",
    story: "Schwarzer Sesam ist in China ein Superfood für Haare und Haut. Die Paste färbt das Oatmeal dramatisch schwarz und gibt ihm ein grandioses, erdig-süßes Aroma.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Sojamilch oder Milch 400 ml",
      "Schwarze Sesampaste 2 EL",
      "Honig oder Agavendicksaft 1 EL",
      "Walnüsse 20 g"
    ],
    steps: [
      "Haferflocken in der Milch aufkochen, bis der Brei andickt.",
      "Sesampaste und Honig unterrühren.",
      "Mit gehackten Walnüssen garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Schwarze Sesampaste ↔ Erdnussmus",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Crispy Reispapier Sushi-Rollen (Airfryer)",
    isViral: true,
    desc: "Gefüllte Reispapier-Rollen, die im Airfryer wie kleine Sushi-Tacos aufknuspern.",
    story: "Statt Algen nehmen wir Reispapier! Gefüllt mit Reis, Thunfisch und Mayo werden sie im Airfryer wahnsinnig knusprig. Ein toller TikTok-Trend für die Mittagspause.",
    target: "≈75 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reispapier 6 Blatt",
      "Reis (gekocht, klebrig) 150 g",
      "Thunfisch (Dose, abgetropft) 100 g",
      "Mayonnaise (pasteurisiert) 1 EL",
      "Sriracha 1 TL",
      "Sojasauce zum Dippen"
    ],
    steps: [
      "Thunfisch mit Mayo und Sriracha mischen.",
      "Ein Blatt Reispapier in warmes Wasser tauchen. Eine Portion Reis und Thunfisch-Creme in die Mitte geben.",
      "Wie einen Burrito oder eine Frühlingsrolle eng falten.",
      "Im Airfryer (vorher leicht einölen!) bei 190°C ca. 8 Min backen, bis sie knusprig sind."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Mayo pasteurisiert, Dosenthunfisch in Maßen OK)",
    swaps: "Thunfisch ↔ Gebratenes Hackfleisch",
    side: "Gurkensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "One-Pot Linsen-Curry mit Reis (Reiskocher)",
    desc: "Reis und rote Linsen garen zusammen in einer milden Curry-Brühe.",
    story: "Dieses 'One-Pot-Dal' ist ein absoluter Retter an stressigen Tagen. Die Linsen zerfallen und machen den Reis cremig wie ein Risotto.",
    target: "≈82 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Rote Linsen (roh, gewaschen) 50 g",
      "Kokosmilch 100 ml",
      "Gemüsebrühe 200 ml",
      "Currypulver (mild) 1 EL",
      "Spinat (frisch) 100 g"
    ],
    steps: [
      "Reis, Linsen, Kokosmilch, Brühe und Currypulver in den Reiskocher geben. Starten.",
      "In den letzten 2 Minuten den frischen Spinat oben auflegen, damit er im Dampf zusammenfällt.",
      "Nach dem Öffnen alles gut durchrühren, bis es eine cremige Konsistenz hat."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓ (Ballaststoffreich)",
    swaps: "Spinat ↔ Erbsen",
    side: "Ein Klecks Joghurt.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe + Kokosmilch (ca. 300ml gesamt)", notes: "Macht herrlich satt." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Upside-Down Tomato Tart 🍅 (Airfryer)",
    isViral: true,
    desc: "Kleine herzhafte Blätterteig-Törtchen. Tomaten, Käse, Teig drüber – fertig!",
    story: "Der 'Upside-Down Pastry' Trend aus Frankreich! Man legt die Füllung (Tomaten, etwas Honig, Käse) direkt auf das Backpapier, legt ein Quadrat Blätterteig darüber und drückt die Ränder fest. Nach dem Backen wird gestürzt. Grandios!",
    target: "≈65 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Blätterteig (Rolle) 1/2 Stück",
      "Cherrytomaten 100 g",
      "Parmesan oder Feta (pasteurisiert) 30 g",
      "Honig 1 TL",
      "Thymian oder Basilikum"
    ],
    steps: [
      "Blätterteig in 4 Quadrate schneiden.",
      "Auf ein Stück Airfryer-Backpapier 4 kleine Kleckse Honig geben. Halbierte Tomaten daraufsetzen. Mit Kräutern und Käse bestreuen.",
      "Jeweils ein Teig-Quadrat über die Tomatenhaufen legen und die Ränder leicht andrücken.",
      "Im Airfryer bei 180°C ca. 10 Min backen, bis der Teig hoch aufgegangen und goldbraun ist. Vorsichtig stürzen!"
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse schmilzt komplett durch)",
    swaps: "Tomaten ↔ Zwiebelringe",
    side: "Ein gekochtes Ei für mehr Protein.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Airfryer Teriyaki-Lachs Bites",
    desc: "Saftige Lachswürfel, kross gebacken und mit Teriyaki-Sauce glasiert.",
    story: "Lachs in kleine Würfel geschnitten gart im Airfryer extrem schnell und bekommt überall eine fantastische Kruste. Ideal für Bowls.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Lachsfilet (in Würfeln) 200 g",
      "Teriyaki-Sauce 2 EL",
      "Sesamöl 1 TL",
      "Reis (gekocht) 150 g",
      "Edamame (TK, aufgetaut) 100 g"
    ],
    steps: [
      "Lachswürfel in Teriyaki und Sesamöl 10 Min marinieren.",
      "Im Airfryer bei 190°C für 6-8 Minuten backen (Fisch muss komplett durchgaren!).",
      "Mit Reis und Edamame in einer Schüssel anrichten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs komplett durchgaren)",
    swaps: "Lachs ↔ Tofuwürfel",
    side: "Ein Stück Gurke.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Tom Yum Reis (Reiskocher)",
    desc: "Die Aromen der berühmten thailändischen sauren Suppe, eingekocht in duftenden Reis mit Garnelen.",
    story: "Ein Schuss Tom-Yum-Paste (gibt es im Glas) verwandelt faden Reis in eine Geschmacksexplosion aus Zitronengras und Galgant.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Tom Yum Paste (aus dem Asia-Markt) 1-2 EL",
      "Garnelen (TK, aufgetaut) 200 g",
      "Kokosmilch 50 ml",
      "Gemüsebrühe 190 ml",
      "Brokkoli 100 g"
    ],
    steps: [
      "Tom Yum Paste in der Brühe auflösen. Zusammen mit Kokosmilch und Reis in den Topf geben.",
      "Garnelen (gut abgetropft) oben auflegen. Starten.",
      "Brokkoli extra dämpfen oder in den letzten 5 Min in den Topf legen.",
      "Alles durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen dämpfen im Topf sicher durch)",
    swaps: "Garnelen ↔ Hähnchenbrust",
    side: "Etwas frischer Koriander.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Flüssigkeit (Brühe+Kokosmilch) = Standard", notes: "Paste ist salzig/sauer, sehr erfrischend." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Tamagoyaki Sandwich (Airfryer-Version) たまごサンド",
    desc: "Ein dicker, saftiger Omelett-Block zwischen zwei knusprigen Toastscheiben.",
    story: "Das japanische Eiersandwich ist Legende. Da wir das Ei in der Schwangerschaft komplett durchgaren müssen, backen wir den Ei-Block einfach in einer kleinen, eckigen Form im Airfryer!",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Eier 4 Stück",
      "Milch 20 ml",
      "Sojasauce 1 TL",
      "Mayonnaise (pasteurisiert) 1 EL"
    ],
    steps: [
      "Eier, Milch und Sojasauce gut verquirlen.",
      "In eine kleine, geölte feuerfeste Form gießen (ca. so groß wie der Toast).",
      "Im Airfryer bei 160°C ca. 12-15 Min backen, bis der Ei-Block KOMPLETT durchgestockt ist.",
      "Toast mit Mayo bestreichen, den Ei-Block dazwischenlegen und warm servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett fest, Mayo aus Tube)",
    swaps: "Mayo ↔ Frischkäse",
    side: "Kaffee oder grüner Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Dan Dan Nudeln (Schwein) 担担面",
    desc: "Der Sichuan-Nudelklassiker: Milde Sesam-Soja-Sauce mit gebratenem Schweinehack.",
    story: "Normalerweise schwimmt dieses Gericht in Chili-Öl. Wir fokussieren uns auf die reichhaltige Tahini-Sauce und nutzen mageres Hack für eine leichte, umamireiche Mahlzeit.",
    target: "≈85 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Weizennudeln 150 g",
      "Schweinehack (mager) 150 g",
      "Tahini (Sesampaste) 2 EL",
      "Sojasauce 2 EL",
      "Knoblauch 1 Zehe",
      "Pak Choi 100 g"
    ],
    steps: [
      "Hackfleisch und Knoblauch im Wok krümelig und KOMPLETT durchbraten.",
      "Tahini, Sojasauce und etwas warmes Nudelwasser zu einer dicken Sauce rühren.",
      "Nudeln und Pak Choi kochen.",
      "Nudeln in die Sauce geben, Hackfleisch darüber häufen, gut umrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hack komplett durchbraten!)",
    swaps: "Schweinehack ↔ Hähnchenhack",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Viral Zwiebel-Bacon-Brie Reis (Reiskocher)",
    isViral: true,
    desc: "Eine ganze Zwiebel schmilzt zusammen mit einem Stück Brie-Käse und Bacon über dem Reis.",
    story: "Noch ein Internet-Wahnsinn, der funktioniert. Die Zwiebel karamellisiert im Dampf, der Bacon gibt Würze und der Brie liefert die perfekte Creme. (Wichtig: Brie MUSS pasteurisiert sein!).",
    target: "≈80 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Zwiebel (mittlere Größe, geschält) 1 Stück",
      "Brie oder Camembert (Zwingend aus PASTEURISIERTER Milch!) 80 g",
      "Bacon oder Schinkenwürfel 50 g",
      "Gemüsebrühe 240 ml",
      "Schwarzer Pfeffer"
    ],
    steps: [
      "Reis und Brühe in den Topf. Die Zwiebel oben kreuzweise tief einschneiden und in die Mitte setzen.",
      "Den Brie (Rinde evtl. leicht einschneiden) und Bacon drumherum verteilen.",
      "Reiskocher starten.",
      "Nach dem Kochen die butterweiche Zwiebel zerdrücken und alles zu einem unfassbaren Risotto verrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Achtung: Unbedingt auf das Etikett des Käses schauen. Nur 'Aus pasteurisierter Milch' verwenden!) · Diabetes ✓",
    swaps: "Brie ↔ Feta",
    side: "Ein großer grüner Salat zum Ausgleich.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (Standard)", notes: "Die Zwiebel muss tief eingeschnitten sein, damit sie weich gart." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Gyeran-jjim 계란찜 (Mikrowellen-Dampf-Ei)",
    desc: "Koreanisches souffliertes Ei. Fluffig wie eine Wolke, blitzschnell aus der Mikrowelle.",
    story: "In koreanischen Restaurants kommt Gyeran-jjim oft blubbernd im Tontopf. Zuhause schummeln wir mit der Mikrowelle – es wird genauso fluffig und ist in 4 Minuten fertig!",
    target: "≈60 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Wasser oder Hühnerbrühe 100 ml",
      "Frühlingszwiebel 10 g",
      "Salz 1 Prise",
      "Reis (gekocht, als Beilage) 120 g"
    ],
    steps: [
      "Eier mit Brühe, Salz und Frühlingszwiebeln gut verquirlen.",
      "In ein mikrowellengeeignetes Gefäß füllen (sollte nur zu 70% voll sein, es geht auf!).",
      "Deckel locker auflegen. In der Mikrowelle ca. 3-4 Minuten bei mittlerer bis hoher Stufe garen, bis es komplett durchgestockt ist.",
      "Dazu Reis essen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier müssen komplett fest und heiß sein!)",
    swaps: "Mikrowelle ↔ Im Topf im Wasserbad dämpfen (dauert 15 Min)",
    side: "Warmer Reis.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Kroatische Cevapcici mit Djuvec-Reis (Pfanne)",
    desc: "Der Balkan-Klassiker. Kräftige Hackröllchen mit würzigem Tomaten-Erbsen-Reis.",
    story: "Djuvec-Reis lebt von Ajvar und Tomatenmark. Wir machen es in einer großen Pfanne und braten die Cevapcici direkt mit.",
    target: "≈85 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Cevapcici (frisch oder TK) 200 g",
      "Reis (gekocht, vom Vortag) 200 g",
      "Erbsen (TK) 50 g",
      "Tomatenmark 1 EL",
      "Ajvar 2 EL",
      "Gemüsebrühe 50 ml"
    ],
    steps: [
      "Cevapcici in der Pfanne rundum gut durchbraten, dann an den Rand schieben.",
      "Tomatenmark, Ajvar und Erbsen in die Mitte geben, kurz anrösten.",
      "Gekochten Reis dazugeben, mit Brühe ablöschen.",
      "Alles vermengen, bis der Reis die rote Farbe angenommen hat und heiß ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleischröllchen GANZ durchbraten!)",
    swaps: "Cevapcici ↔ Schweinegeschnetzeltes",
    side: "Rohe Zwiebelringe (wer mag).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Hähnchen & Edamame Reis (Reiskocher)",
    desc: "Ein extrem sauberes, proteinreiches Gericht. Hähnchenbrust dämpft mit Sojabohnen.",
    story: "Edamame geben dem Reis einen tollen, nussigen Biss. Das Hähnchen liefert mageres Protein. Ein perfekter, sanfter Abschluss der Woche.",
    target: "≈82 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (gewürfelt) 200 g",
      "Edamame (geschält, TK) 100 g",
      "Sojasauce 2 EL",
      "Sesamöl 1 TL",
      "Hühnerbrühe 240 ml"
    ],
    steps: [
      "Hähnchen mit Sojasauce mischen.",
      "Reis und Brühe in den Topf. Hähnchen oben auflegen.",
      "Start drücken.",
      "Nach dem Kochen die aufgetauten Edamame und das Sesamöl unter den heißen Reis heben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn kocht sicher durch) · Diabetes ✓",
    swaps: "Hähnchen ↔ Garnelen",
    side: "Miso-Suppe.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe", notes: "Edamame nicht mitkochen, sonst werden sie grau." },
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
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Hähnchenhack": { group: "Protein/Fisch/Tofu", label: "Hähnchenhack", unitDefault: "g" },
  "Hähnchenflügel": { group: "Protein/Fisch/Tofu", label: "Hähnchenflügel", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Lachs": { group: "Protein/Fisch/Tofu", label: "Lachs", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau/Seelachs", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Cevapcici": { group: "Protein/Fisch/Tofu", label: "Cevapcici", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Schinken": { group: "Protein/Fisch/Tofu", label: "Schinken/Bacon", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda / Käse", unitDefault: "g" },
  "Brie": { group: "Protein/Fisch/Tofu", label: "Brie / Camembert (pasteurisiert)", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark", unitDefault: "g" },
  "Joghurt": { group: "Protein/Fisch/Tofu", label: "Joghurt", unitDefault: "EL" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl/Chinakohl", unitDefault: "g" },
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
  "Cherrytomaten": { group: "Gemüse/Pilze", label: "Cherrytomaten", unitDefault: "g" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "EL" },
  "Tomatenmark": { group: "Gemüse/Pilze", label: "Tomatenmark", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Banane": { group: "Gemüse/Pilze", label: "Banane", unitDefault: "Stück" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis", unitDefault: "g" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Kartoffeln": { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  "Blaubeeren": { group: "Gemüse/Pilze", label: "Blaubeeren", unitDefault: "g" },
  "Beeren": { group: "Gemüse/Pilze", label: "Beeren (TK)", unitDefault: "g" },
  "Salat": { group: "Gemüse/Pilze", label: "Gemischter Salat", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Spaghetti": { group: "Reis/Nudeln/Sättigung", label: "Spaghetti", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba-Nudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Süßkartoffel-Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Süßkartoffel-Gnocchi", unitDefault: "g" },
  "Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Kurze Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Kurze Nudeln (z.B. Penne)", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot / Vollkorn", unitDefault: "Scheiben" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Blätterteig": { group: "Reis/Nudeln/Sättigung", label: "Blätterteig (Rolle)", unitDefault: "Stück" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Weichweizengrieß": { group: "Reis/Nudeln/Sättigung", label: "Grieß", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko/Paniermehl", unitDefault: "g" },
  "Rote Linsen": { group: "Reis/Nudeln/Sättigung", label: "Rote Linsen", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Rinderbrühe": { group: "Algen/Brühen/Würze", label: "Rinderbrühe", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Kochsahne": { group: "Algen/Brühen/Würze", label: "Kochsahne", unitDefault: "ml" },
  "Kokosmilch": { group: "Algen/Brühen/Würze", label: "Kokosmilch", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Sriracha": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)", unitDefault: "TL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Schwarze Bohnensauce": { group: "Algen/Brühen/Würze", label: "Schwarze Bohnensauce", unitDefault: "EL" },
  "Pesto": { group: "Algen/Brühen/Würze", label: "Pesto (Glas)", unitDefault: "EL" },
  "Tom Yum Paste": { group: "Algen/Brühen/Würze", label: "Tom Yum Paste", unitDefault: "EL" },
  "Ajvar": { group: "Algen/Brühen/Würze", label: "Ajvar", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Agave", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Currypulver": { group: "Algen/Brühen/Würze", label: "Currypulver", unitDefault: "TL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw15" }) {
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
            Woche 15 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Hainan-Style Schwein, Linsen-Curry, Oyakodon und mehr.</p>
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
export default function Woche15DE() {
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
            {tagChip("Woche 15")}
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