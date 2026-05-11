// src/plans/2026/Woche-20-2026-05-11.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { SharedMealCard } from "@/components/MealCard";

/*
  Moving Kitchen Tales – Woche 20 (Start: 2026-05-11)
  Status: KOMPLETT & FUNKTIONSFÄHIG (Alle 21 Rezepte)
  Fokus: Schwedisch, viel Fisch, Chinesisch, Virale Airfryer-Hacks, Reiskocher-Magie.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 20",
  startDate: "2026-05-11",
  id: "woche-20-2026-05-11",
  lang: "de",
  sidebar: "Woche 20 (2026-05-11)",
};

const FILE_BASE = "Woche 20 2026-05-11";

const UI_TITLES = {
  main: "Rezepte Woche 20",
  list: "Einkaufsliste Woche 20",
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

const viralChip = () => (
  <span className="mkt-chip" key="viral" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "linear-gradient(135deg, #ff7e5f, #feb47b)", color: "#fff", fontWeight: "bold", border: "none", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    🔥 Viral Trend
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-05-11)",
  di: "Dienstag (2026-05-12)",
  mi: "Mittwoch (2026-05-13)",
  do: "Donnerstag (2026-05-14)",
  fr: "Freitag (2026-05-15)",
  sa: "Samstag (2026-05-16)",
  so: "Sonntag (2026-05-17)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Airfryer Kardamom Baked Oats Kardemummagröt",
    isViral: true,
    desc: "Schwedisch inspirierter Haferbrei, der im Airfryer wie ein kleiner Kuchen aufbackt.",
    story: "Kardamom ist die Seele der schwedischen Backkunst. Dieser virale Airfryer-Hit verwandelt morgendliche Haferflocken in ofenwarmes Gebäck. Fantastisch und wärmend.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch 150 ml",
      "Eier 2 Stück",
      "Kardamom (gemahlen) 1 TL",
      "Blaubeeren (TK) 50 g",
      "Backpulver 1 TL"
    ],
    steps: [
      "Alle Zutaten in einer Schüssel gut verrühren.",
      "In eine kleine, ofenfeste (bzw. airfryer-geeignete) Form füllen.",
      "Im Airfryer bei 170°C für ca. 12-15 Minuten backen, bis es aufgeht und komplett durchgestockt ist."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Komplexe KH) · Schwangerschaft ✓ (Eier komplett durchgebacken)",
    swaps: "Blaubeeren ↔ Apfelstücke",
    side: "Ein Klecks Naturjoghurt.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Kantonesischer Dämpffisch (Pfanne/Wok) 清蒸鱼",
    desc: "Weißfisch, gedämpft und mit heißem Öl, Sojasauce, Ingwer und Frühlingszwiebeln übergossen.",
    story: "Ein Meisterwerk der chinesischen Küche. Das heiße Öl entlockt dem Ingwer und den Zwiebeln ein großartiges Aroma, das den perfekt gegarten Fisch umhüllt.",
    target: "≈60 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Kabeljau oder Seelachs 200 g",
      "Ingwer (in feinen Streifen) 10 g",
      "Frühlingszwiebel (in Streifen) 20 g",
      "Sojasauce 2 EL",
      "Speiseöl 2 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Fisch in einem hitzefesten Teller im Wok/Pfanne über kochendem Wasser ca. 8-10 Min dämpfen (muss GANZ durch sein!).",
      "Dämpfwasser vom Teller abgießen. Ingwer und Zwiebeln auf den Fisch legen.",
      "Öl in einem kleinen Topf rauchend heiß machen und über die Zwiebeln/Ingwer gießen (es muss zischen!).",
      "Sojasauce darüber träufeln und mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Weißfisch quecksilberarm, komplett durchgedämpft)",
    swaps: "Kabeljau ↔ Lachs",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Hainan Lachs-Reis (Reiskocher) 海南三文鱼",
    desc: "Lachsfilet dämpft im Ingwer-Knoblauch-Reis direkt im Reiskocher.",
    story: "Eine geniale Adaption des chinesischen Hainan Chicken. Der Fisch gart im Dampf butterweich, während sein Saft den Reis aromatisiert. Das spart Abwasch und Zeit. Da bleibt auch Zeit, um Finn und Fleur zu füttern.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Ingwer (fein gehackt) 10 g",
      "Knoblauch 1 Zehe",
      "Hühnerbrühe 240 ml",
      "Pak Choi 150 g"
    ],
    steps: [
      "Reis mit Brühe, Knoblauch und Ingwer in den Reiskocher geben.",
      "Lachs oben auf den Reis legen.",
      "Start drücken. Pak Choi in den letzten 5 Minuten in den Dämpfaufsatz legen.",
      "Lachs zerteilen, mit etwas Sojasauce beträufeln und servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart im Dampf >80°C sicher durch)",
    swaps: "Lachs ↔ Heilbutt",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Fisch gibt noch Feuchtigkeit ab." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Thunfisch Jianbing 煎饼",
    isViral: true,
    desc: "Chinesischer Streetfood-Crêpe als Tortilla-Hack mit Thunfisch und Ei.",
    story: "Jianbing ist ein Meisterwerk. Da der Teig aufwendig ist, nehmen wir Wraps! Mit Ei bestrichen und im Airfryer oder der Pfanne gebacken, wird es großartig knusprig.",
    target: "≈65 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Vollkorn-Tortillas 2 Stück",
      "Eier 2 Stück",
      "Thunfisch (Dose) 100 g",
      "Frühlingszwiebel 10 g",
      "Hoisin-Sauce 1 EL"
    ],
    steps: [
      "Wrap in die Pfanne oder den Airfryer legen. Ein verquirltes Ei darauf verstreichen, mit Zwiebel bestreuen.",
      "Backen/braten, bis das Ei KOMPLETT durchgestockt ist.",
      "Herausnehmen, mit Hoisin-Sauce bestreichen, abgetropften Thunfisch darauf verteilen, falten und genießen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durch! Dosenthunfisch in Maßen OK)",
    swaps: "Thunfisch ↔ Gebratener Tofu",
    side: "Warmer Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Airfryer Baked Salmon Toast Laxsmörgås",
    desc: "Skandinavisch inspiriert: Vollkorntoast mit saftig gebackenem Lachs und Dill.",
    story: "Schwedischer Gravlax ist roh und in der Schwangerschaft tabu. Wir backen frischen Lachs im Airfryer in nur 8 Minuten zart und saftig durch. Auf Toast ein hervorragender Lunch.",
    target: "≈60 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Lachsfilet 200 g",
      "Frischkäse (pasteurisiert) 2 EL",
      "Dill (frisch) 1 EL",
      "Gurke 50 g"
    ],
    steps: [
      "Lachsfilet leicht salzen und im Airfryer bei 190°C ca. 8-10 Min komplett durchgaren.",
      "Toast rösten und mit Frischkäse bestreichen.",
      "Den warmen Lachs mit einer Gabel zerpflücken und auf dem Toast verteilen.",
      "Mit Dill und Gurkenscheiben garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fisch GANZ durchgaren, Käse pasteurisiert)",
    swaps: "Lachs ↔ Forellenfilet",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Garnelen & Erbsen Reis 虾仁豌豆饭 (Reiskocher)",
    desc: "Simpler, asiatisch angehauchter Reistopf mit Garnelen und grünen Erbsen.",
    story: "Ein Gericht, das dir die Arbeit abnimmt. Die Garnelen dämpfen über dem Reis und bleiben saftig, während der Reis den kräftigen Fond aufnimmt.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (TK, aufgetaut) 200 g",
      "Erbsen (TK) 50 g",
      "Sojasauce 1 EL",
      "Gemüsebrühe 240 ml",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Reis, Brühe, zerdrückten Knoblauch und Sojasauce in den Topf geben.",
      "Garnelen und Erbsen oben auflegen.",
      "Starten. Nach dem Kochen alles vorsichtig durchheben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen dampfgaren sicher durch)",
    swaps: "Garnelen ↔ Hähnchenbrust",
    side: "Ein Spritzer Zitrone.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Garnelen vorher gut abtropfen lassen." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Kabeljau-Congee 鱼片粥",
    desc: "Ein extrem feiner, milder Reisbrei mit Weißfisch. Perfekt für den Magen.",
    story: "In Guangdong dämpft man feine Fischscheiben direkt in der Hitze des Reisbreis. Es ist leicht verdaulich und bringt pure Wohlfühl-Energie.",
    target: "≈70 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Kabeljau oder Seelachs 150 g",
      "Hühnerbrühe 800 ml",
      "Ingwer (feine Streifen) 10 g",
      "Frühlingszwiebel 10 g",
      "Weißer Pfeffer 1 Prise"
    ],
    steps: [
      "Reis in Brühe ca. 45 Min zu Congee einkochen.",
      "Fisch in dünne Scheiben schneiden. Ingwer in den Brei geben.",
      "Fischscheiben in den köchelnden Brei legen. Ca. 3-5 Min ziehen lassen, bis der Fisch komplett weiß und durchgegart ist.",
      "Mit Frühlingszwiebeln und Pfeffer servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Kabeljau ist quecksilberarm, muss komplett durchgegart sein!)",
    swaps: "Kabeljau ↔ Lachs",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Viral Feta-Salmon Bake",
    isViral: true,
    desc: "Lachs und Feta, zusammen mit Tomaten im Airfryer gebacken.",
    story: "Eine großartige Weiterentwicklung des Baked-Feta-Trends! Der Lachs und der Käse schmelzen zusammen zu einem herzhaften Traum.",
    target: "≈85 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Lachsfilet 200 g",
      "Feta (pasteurisiert) 100 g",
      "Kirschtomaten 150 g",
      "Olivenöl 1 EL",
      "Reis (gekocht) 150 g",
      "Italienische Kräuter"
    ],
    steps: [
      "Lachs, Feta am Stück und Tomaten in eine airfryer-taugliche Form geben.",
      "Mit Öl beträufeln und würzen.",
      "Bei 190°C ca. 12-15 Min backen, bis der Lachs GANZ durch ist und der Feta weich wird.",
      "Zusammen mit dem Reis servieren und Feta/Tomaten leicht zerdrücken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs komplett durchgaren, Käse pasteurisiert)",
    swaps: "Lachs ↔ Hähnchenbrust",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Canton Claypot Rice 煲仔饭 (Reiskocher)",
    desc: "Schweinemett und Pak Choi dämpfen über dem Reis. Schmeckt wie aus dem Tontopf.",
    story: "Claypot Rice ist in Südchina berühmt für seinen intensiven Geschmack. Der Reiskocher imitiert das Prinzip perfekt. Der Fleischsaft zieht direkt in den Reis ein.",
    target: "≈82 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Schweinehack (mager) 150 g",
      "Sojasauce 2 EL",
      "Pak Choi 100 g",
      "Gemüsebrühe 240 ml",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Hackfleisch kurz mit Sojasauce und Knoblauch vermengen.",
      "Reis und Brühe in den Reiskocher geben.",
      "Hackfleisch (zerpflückt!) oben auf den Reis verteilen. Start drücken.",
      "Pak Choi in den letzten 5 Minuten dämpfen. Danach alles sorgfältig durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hack gart im Topf sicher durch) · Diabetes ✓",
    swaps: "Schweinehack ↔ Hähnchenhack",
    side: "-",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Fleisch gibt ordentlich Geschmack ab." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Knäckebröd mit Lachs & Quark",
    desc: "Ein schnelles, knackiges Frühstück auf schwedische Art.",
    story: "Knäckebröd ist das Rückgrat der schwedischen Vorratskammer. Kombiniert mit durchgebratenem oder heißgeräuchertem Lachs und etwas Magerquark entsteht ein wunderbar leichtes Frühstück.",
    target: "≈65 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Vollkorn-Knäckebrot 4 Scheiben",
      "Lachsfilet (gebraten oder heißgeräuchert) 100 g",
      "Quark (Magerstufe) 2 EL",
      "Schnittlauch 10 g",
      "Zitrone 1 TL"
    ],
    steps: [
      "Lachs mit einer Gabel zerpflücken (sicherstellen, dass er komplett durch ist!).",
      "Quark mit Zitrone und Schnittlauch glattrühren.",
      "Knäckebrot dick mit Quark bestreichen und den Lachs darauf verteilen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs komplett durcherhitzt!)",
    swaps: "Lachs ↔ Hartgekochtes Ei",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Airfryer Sweet & Sour Fish 糖醋鱼",
    desc: "Knusprige Weißfisch-Würfel aus dem Airfryer in pikanter süß-saurer Sauce.",
    story: "Die leichte Version des chinesischen Take-aways. Der Airfryer macht den Fisch (dank etwas Stärke) außen kross, ohne ihn in Öl zu ertränken.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Kabeljau oder Seelachs 200 g",
      "Maisstärke 2 EL",
      "Paprika (gewürfelt) 100 g",
      "Ketchup 2 EL",
      "Reisessig 1 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Fisch würfeln, abtupfen und in Maisstärke wälzen.",
      "Im Airfryer bei 200°C ca. 10-12 Min knusprig backen (komplett durchgaren!).",
      "Ketchup, Essig und etwas Wasser in einer Pfanne aufkochen. Paprika kurz mitrösten.",
      "Knusper-Fisch in der Sauce schwenken und mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fisch durch!) · Diabetes ✓",
    swaps: "Fisch ↔ Fester Tofu",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Tomaten-Fisch-Risotto 番茄鱼烩饭 (Reiskocher)",
    desc: "Der asiatische 'Whole Tomato' Trend trifft auf Weißfisch und Reis.",
    story: "Die Tomate schmilzt und bildet eine natürliche süß-saure Sauce. Der Fisch gart im Dampf zart. Eine geniale Reiskocher-Fusion.",
    target: "≈82 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Risottoreis oder Normalreis 120 g",
      "Tomate (groß) 1 Stück",
      "Weißfisch (Kabeljau/Seelachs) 150 g",
      "Gemüsebrühe 240 ml",
      "Knoblauch 1 Zehe",
      "Olivenöl 1 EL"
    ],
    steps: [
      "Reis, Brühe, Öl und Knoblauch in den Topf geben.",
      "Tomate kreuzweise tief einschneiden, in die Mitte setzen. Den Fisch danebenlegen.",
      "Start drücken.",
      "Nach dem Kochen die Tomate zerdrücken, Fisch grob zerteilen und alles vermengen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fisch dämpft komplett durch) · Diabetes ✓",
    swaps: "Weißfisch ↔ Lachs",
    side: "Ein Schälchen Gurkensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (etwas weniger wg. Tomate)", notes: "Tomate gut zerdrücken." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Viral Folded Tuna Wrap (Airfryer)",
    isViral: true,
    desc: "Ein eingeschnittener Tortilla-Wrap, in Vierteln belegt und zur Dreieckstasche gefaltet.",
    story: "Der wohl praktischste Food-Hack des Internets. Das Falten macht den Wrap extrem stabil, und im Airfryer wird er außen rundum knusprig. Ideal mit proteinreichem Thunfisch.",
    target: "≈65 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Vollkorn-Tortillas 2 Stück",
      "Thunfisch (Dose, abgetropft) 100 g",
      "Mayo (pasteurisiert) 1 EL",
      "Gouda (gerieben) 40 g",
      "Tomate 50 g"
    ],
    steps: [
      "Thunfisch mit Mayo mischen.",
      "Wraps von unten bis zur Mitte einschneiden.",
      "Viertel 1: Käse, Viertel 2: Thunfisch, Viertel 3: Tomate, Viertel 4: noch etwas Käse.",
      "Rundum falten zum Dreieck. Im Airfryer bei 180°C ca. 5-7 Min knusprig toasten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert, Thunfisch in Maßen)",
    swaps: "Thunfisch ↔ Gekochte Eier",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Laxbullar (Schwedische Lachsbällchen)",
    desc: "Die fischige Version der Köttbullar! Zarte Lachsbällchen mit Dill und Kartoffeln.",
    story: "Ein fantastisches Gericht aus Schweden. Die Bällchen werden in der Pfanne oder im Airfryer gebraten und sind wunderbar saftig.",
    target: "≈85 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Lachs (roh, fein gehackt) 200 g",
      "Paniermehl 30 g",
      "Ei 1 Stück",
      "Dill (frisch) 1 EL",
      "Kartoffeln 300 g",
      "Zitronensaft"
    ],
    steps: [
      "Lachs mit Ei, Paniermehl und Dill mischen. Mit feuchten Händen Bällchen formen.",
      "In einer Pfanne bei mittlerer Hitze rundum anbraten (komplett durchgaren!).",
      "Kartoffeln kochen.",
      "Lachsbällchen mit Kartoffeln und einem Spritzer Zitrone anrichten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fischbällchen GANZ durchgaren!)",
    swaps: "Lachs ↔ Weißfisch",
    side: "Erbsen.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Sojasauce-Garnelen-Reis 酱油虾饭 (Reiskocher)",
    desc: "Dunkler, extrem würziger Reis, der den Garnelen-Fond beim Dämpfen in sich aufnimmt.",
    story: "Dunkle Sojasauce verleiht dem Reis eine spektakuläre Farbe und eine leichte Süße. Die Garnelen garen direkt mit und bleiben wunderbar saftig.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (TK, aufgetaut) 200 g",
      "Sojasauce (dunkel & hell) 2 EL",
      "Zwiebel 50 g",
      "Gemüsebrühe 240 ml",
      "Sesamöl 1 TL"
    ],
    steps: [
      "Zwiebel fein hacken.",
      "Reis, Brühe, Zwiebel und Sojasauce in den Topf geben.",
      "Garnelen oben auflegen.",
      "Starten. Nach dem Kochen Sesamöl darüberträufeln und vorsichtig durchheben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen dampfgaren sicher durch)",
    swaps: "Garnelen ↔ Hähnchenbrust",
    side: "Brokkoli.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Dunkle Sojasauce bringt Farbe." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Airfryer Prawn Toast 虾多士",
    isViral: true,
    desc: "Chinesisches Dim Sum: Toast, bestrichen mit Garnelenpaste, bedeckt mit Sesam und kross gebacken.",
    story: "In Restaurants wird dieser Toast tief frittiert. Wir streichen die Paste auf den Toast und backen ihn im Airfryer. Er wird gigantisch knusprig und schmeckt originalgetreu!",
    target: "≈60 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Garnelen (geschält, sehr fein gehackt/püriert) 150 g",
      "Eiweiß 1 Stück",
      "Sesam 2 EL",
      "Sojasauce 1 TL",
      "Ingwer (Prise, gemahlen)"
    ],
    steps: [
      "Garnelen mit Eiweiß, Soja und Ingwer zu einer Paste verrühren.",
      "Paste dick auf die Toastscheiben streichen. Großzügig mit Sesam bestreuen.",
      "Im Airfryer bei 190°C ca. 8-10 Min backen, bis die Garnelen GANZ durch sind und der Toast kross ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelenpaste komplett durchbacken!)",
    swaps: "Garnelen ↔ Hähnchenhack",
    side: "Ein Stück Obst.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Kung Pao Garnelen (Wok) 宫保虾球",
    desc: "Garnelen, scharf angebraten in einer süß-säuerlichen Sauce mit knackigen Erdnüssen.",
    story: "Der Szechuan-Klassiker Kung Pao funktioniert mit Garnelen fast noch besser als mit Huhn. Die Garnelen garen rasend schnell und saugen die Sauce auf.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Garnelen (TK, aufgetaut) 200 g",
      "Paprika (gewürfelt) 100 g",
      "Erdnüsse (ungesalzen) 30 g",
      "Sojasauce 2 EL",
      "Reisessig 1 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Garnelen im Wok scharf anbraten, bis sie rosa und komplett durch sind. Herausnehmen.",
      "Paprika kurz anrösten. Sojasauce, Essig und etwas Zucker/Wasser als Sauce angießen.",
      "Garnelen zurück in den Wok geben. Erdnüsse unterheben.",
      "Mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen durchbraten)",
    swaps: "Erdnüsse ↔ Cashews",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Dill-Lachs Reis 鮭とディルのご飯 (Reiskocher)",
    desc: "Schwedisch-Japanisches Crossover. Lachs und viel frischer Dill garen mit dem Reis.",
    story: "Eine Fusion aus Skandinavien und Japan. Der Dill gibt dem Reis eine unglaubliche Frische, während der Lachs im Dampf butterweich wird.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Dill (frisch, viel!) 1 EL",
      "Zitrone 1 EL (Saft)",
      "Gemüsebrühe 240 ml",
      "Erbsen 50 g"
    ],
    steps: [
      "Reis und Brühe in den Topf.",
      "Lachs und Erbsen oben auflegen.",
      "Kochen. Nach dem Öffnen den gehackten Dill und Zitronensaft zugeben.",
      "Lachs zerteilen und alles gut mischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart im Topf durch)",
    swaps: "Lachs ↔ Kabeljau",
    side: "Knackiger Karottensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe Standard", notes: "Dill nicht mitkochen, erst am Ende rein!" },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Dim Sum Dampf-Ei 蒸水蛋",
    desc: "Extrem glatter Eierstich, gewürzt mit Sojasauce und Sesamöl. Perfekt für das Sonntagsfrühstück, um nebenbei die neuen Reiseblog-Beiträge zu tippen.",
    story: "Eine Schale warmer Eierstich ist in China pures Wohlgefühl. Durch schonendes Garen wird er wie Pudding.",
    target: "≈60 g KH (2 P. - inkl. Brot) · Protein ≈18 g p. P.",
    ingredients: [
      "Eier 3 Stück",
      "Warmes Wasser 150 ml",
      "Sojasauce 1 EL",
      "Sesamöl 1 TL",
      "Toastbrot (Vollkorn) 2 Scheiben"
    ],
    steps: [
      "Eier mit dem warmen Wasser sehr sanft verquirlen (wenig Schaum machen!).",
      "In eine Schale geben. Abdecken (Teller).",
      "Im Topf im Wasserbad oder in der Mikrowelle auf mittlerer Stufe garen, bis es komplett durchgestockt ist.",
      "Sojasauce und Sesamöl darüber träufeln. Mit Toast essen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei MUSS komplett fest sein, keine glitschigen Stellen!)",
    swaps: "Wasser ↔ Dashi-Brühe",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Janssons Frestelse Express (Airfryer)",
    desc: "Der schwedische Auflauf-Klassiker: Kartoffeln, Zwiebeln und Sprotten in Sahne, rasch gebacken.",
    story: "Janssons Versuchung ist ein Auflauf für Feste. Wir machen eine schnelle Airfryer-Variante. Die Sprotten/Anchovis zerfallen und würzen die Kartoffeln phänomenal.",
    target: "≈80 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Kartoffeln (in feinen Stiften) 300 g",
      "Zwiebel (in Ringen) 1 Stück",
      "Sprotten oder Anchovis (Dose) 50 g",
      "Sahne (pasteurisiert) 100 ml",
      "Paniermehl 10 g"
    ],
    steps: [
      "Kartoffelstifte und Zwiebeln in eine kleine Airfryer-Form schichten. Sprotten dazwischenlegen.",
      "Sahne darüber gießen. Mit Paniermehl bestreuen.",
      "Im Airfryer bei 180°C ca. 25 Min backen, bis die Kartoffeln weich sind und die Kruste goldbraun ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fisch/Sprotten aus der Dose sind stark erhitzt/unbedenklich, Sahne pasteurisiert)",
    swaps: "Sprotten ↔ Räuchertofu (für eine vegane Version)",
    side: "Ein grüner Salat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Lachs & Pak Choi Takikomi 鮭とチンゲン菜のご飯",
    desc: "Reiskocher-Mischreis mit Lachs und viel frischem Pak Choi.",
    story: "Ein extrem gesundes, leichtes Abendessen. Der Lachs und die Dashi-Brühe sorgen für Umami, der Pak Choi bringt Biss und Farbe.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Pak Choi 100 g",
      "Dashi-Brühe 240 ml",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Reis, Dashi und Sojasauce in den Reiskocher.",
      "Lachs im Ganzen darauflegen. Start drücken.",
      "Nach dem Kochen den Lachs mit einem Löffel zerteilen.",
      "Den in Streifen geschnittenen Pak Choi sofort unter den kochend heißen Reis heben (er gart in der Restwärme)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart sicher durch)",
    swaps: "Lachs ↔ Weißfisch",
    side: "Ein paar Tropfen Zitronensaft.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Pak Choi erst am Schluss unterheben." },
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
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Lachs": { group: "Protein/Fisch/Tofu", label: "Lachs", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau/Seelachs", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Sprotten": { group: "Protein/Fisch/Tofu", label: "Sprotten/Anchovis", unitDefault: "g" },
  "Cabanossi": { group: "Protein/Fisch/Tofu", label: "Cabanossi/Räucherwurst", unitDefault: "g" },
  "Räucherwurst": { group: "Protein/Fisch/Tofu", label: "Räucherwurst", unitDefault: "g" },
  "Speckwürfel": { group: "Protein/Fisch/Tofu", label: "Speckwürfel/Pancetta", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda / Käse", unitDefault: "g" },
  "Cheddar": { group: "Protein/Fisch/Tofu", label: "Cheddar", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark (Magerstufe)", unitDefault: "EL" },
  "Frischkäse": { group: "Protein/Fisch/Tofu", label: "Frischkäse", unitDefault: "EL" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl/Chinakohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Lauch": { group: "Gemüse/Pilze", label: "Lauch", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Cherrytomaten": { group: "Gemüse/Pilze", label: "Cherrytomaten", unitDefault: "g" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "ml" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis", unitDefault: "g" },
  "Avocado": { group: "Gemüse/Pilze", label: "Avocado", unitDefault: "Stück" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Kartoffeln": { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  "Blaubeeren": { group: "Gemüse/Pilze", label: "Blaubeeren", unitDefault: "g" },
  "Salat": { group: "Gemüse/Pilze", label: "Gemischter Salat", unitDefault: "g" },
  "Gewürzgurken": { group: "Gemüse/Pilze", label: "Gewürzgurken", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba-Nudeln", unitDefault: "g" },
  "Fleckerl": { group: "Reis/Nudeln/Sättigung", label: "Nudeln (Fleckerl)", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Knäckebrot": { group: "Reis/Nudeln/Sättigung", label: "Knäckebrot", unitDefault: "Scheiben" },
  "Kartoffelrösti": { group: "Reis/Nudeln/Sättigung", label: "Kartoffelrösti (TK)", unitDefault: "Stück" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Weichweizengrieß": { group: "Reis/Nudeln/Sättigung", label: "Grieß", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko/Paniermehl", unitDefault: "g" },
  "Paniermehl": { group: "Reis/Nudeln/Sättigung", label: "Paniermehl", unitDefault: "g" },

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
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (pasteurisiert)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Sriracha": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)", unitDefault: "TL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Hoisin-Sauce": { group: "Algen/Brühen/Würze", label: "Hoisin-Sauce", unitDefault: "EL" },
  "Schwarze Bohnensauce": { group: "Algen/Brühen/Würze", label: "Schwarze Bohnensauce", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Tonkatsu-Sauce": { group: "Algen/Brühen/Würze", label: "Tonkatsu-Sauce", unitDefault: "EL" },
  "Ajvar": { group: "Algen/Brühen/Würze", label: "Ajvar", unitDefault: "EL" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Kardamom": { group: "Algen/Brühen/Würze", label: "Kardamom", unitDefault: "TL" },
  "Sesam": { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "TL" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Mandeln": { group: "Algen/Brühen/Würze", label: "Mandeln", unitDefault: "g" },
  "Erdnüsse": { group: "Algen/Brühen/Würze", label: "Erdnüsse", unitDefault: "g" },
  "Backpulver": { group: "Algen/Brühen/Würze", label: "Backpulver", unitDefault: "TL" },
  "Zitrone": { group: "Algen/Brühen/Würze", label: "Zitrone", unitDefault: "TL" },
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
        else if (name.includes("Feta") || name.includes("Gouda") || name.includes("Cheddar") || name.includes("Käse")) key = "Käse";
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw18" }) {
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
            Woche 18 – Übersicht <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Hainan Lachs, Tomaten-Fisch-Risotto, Sausage & Shiitake Rice und mehr.</p>
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
export default function Woche18DE() {
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
            {tagChip("Woche 20")}
            {tagChip("Schwedisch & CN/JP Wohlfühlküche")}
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
