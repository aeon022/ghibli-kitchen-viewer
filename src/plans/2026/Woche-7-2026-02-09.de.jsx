// src/plans/2026/Woche-7-2026-02-09.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 7 (Start: 2026-02-09)
  Fokus: CN Wok & Schwein, Airfryer-Hacks, + Kroatien/Schweden/Italien.
  Inhalt: Balanced, Schwangerschaftssicher (alles durch, pasteurisiert), Diabetesfreundlich.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 7",
  startDate: "2026-02-09",
  id: "woche-7-2026-02-09",
  lang: "de",
  sidebar: "Woche 7 (2026-02-09)",
};

const FILE_BASE = "Woche 7 2026-02-09";

const UI_TITLES = {
  main: "Rezepte Woche 7",
  list: "Einkaufsliste Woche 7",
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

// ---- Helper ----
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
  mo: "Montag (2026-02-09)",
  di: "Dienstag (2026-02-10)",
  mi: "Mittwoch (2026-02-11)",
  do: "Donnerstag (2026-02-12)",
  fr: "Freitag (2026-02-13)",
  sa: "Samstag (2026-02-14)",
  so: "Sonntag (2026-02-15)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Airfryer Frühstücks-Bao (CN)",
    desc: "Schnell aufgebackene Bao-Buns mit durchgebratenem Rührei.",
    story: "Bao Buns werden normalerweise gedämpft. Der Airfryer-Hack macht sie außen leicht knusprig und spart morgens enorm viel Zeit!",
    target: "≈60 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Bao Buns (TK) 4 Stück",
      "Eier 4 Stück",
      "Frühlingszwiebel 20 g",
      "Sojasauce 1 EL",
      "Sesamöl 1 TL"
    ],
    steps: [
      "Bao Buns im Airfryer bei 160°C ca. 5 Min aufbacken.",
      "Eier mit Frühlingszwiebeln und Sojasauce verquirlen.",
      "In einer Pfanne zu Rührei braten (komplett durchgaren!).",
      "Buns aufschneiden und füllen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett fest) · Diabetes ✓",
    swaps: "Bao Buns ↔ Vollkorn-Pita",
    side: "Warmer Jasmintee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Kroatischer Djuvec-Wok mit Schwein (HR)",
    desc: "Schnelle Pfannen-Version des Balkan-Klassikers mit Reis, Ajvar und Schweinefilet.",
    story: "Urlaub in Kroatien gefällig? Das eigentlich stundenlang geschmorte Gemüsegericht wird hier im Wok zum Express-Genuss. Ajvar liefert die perfekte Würze.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Gekochter Reis (vom Vortag) 200 g",
      "Schweinefilet (Streifen) 200 g",
      "Paprika 100 g",
      "Erbsen (TK) 50 g",
      "Mildes Ajvar 2 EL",
      "Gemüsebrühe 50 ml"
    ],
    steps: [
      "Schweinefilet im Wok scharf anbraten und komplett durchgaren. Herausnehmen.",
      "Paprika und Erbsen im Wok anbraten.",
      "Reis, Fleisch und Ajvar unterheben. Mit Brühe ablöschen.",
      "Schwenken, bis die Flüssigkeit aufgesaugt ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schweinefleisch gut durch!) · Diabetes ✓",
    swaps: "Schwein ↔ Hähnchenbrust",
    side: "Krautsalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Lu Rou Fan 卤肉饭 (Reiskocher)",
    desc: "Taiwanesischer Schweinebauch, butterweich im Reiskocher geschmort.",
    story: "Das absolute Soulfood Taiwans. Wir sparen uns den Topf auf dem Herd und lassen den Reiskocher die Magie vollbringen. Das Fleisch zerfällt auf der Zunge.",
    target: "≈85 g KH (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Schweinebauch oder Schulter (gewürfelt) 200 g",
      "Sojasauce (dunkel & hell) 3 EL",
      "Sternanis 1 Stück",
      "Zucker 1 TL",
      "Pak Choi 100 g"
    ],
    steps: [
      "Schweinefleischwürfel kurz in kochendem Wasser blanchieren (reinigt das Fleisch).",
      "Reis und Wasser in den Reiskocher.",
      "Fleisch, Sojasauce, Zucker und Sternanis obendrauf geben.",
      "Starten. Pak Choi die letzten 5 Min dämpfen. Danach alles gut durchmischen (Sternanis entfernen!)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch wird >100°C gekocht) · Diabetes ✓",
    swaps: "Schweinebauch ↔ Rindergulasch",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Verleiht dem Reis eine irre dunkle Farbe und Umami." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Fan Qie Chao Dan 番茄炒蛋 (Wok)",
    desc: "Der chinesische Hausmannskost-Klassiker: Tomaten und Ei auf Brot.",
    story: "Dieses Gericht lernt jedes chinesische Kind als Erstes. Es ist simpel, wärmend und die milde Tomatensäure macht sofort wach.",
    target: "≈65 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Tomaten (weich) 2 Stück",
      "Eier 4 Stück",
      "Knoblauch 1 Zehe",
      "Sojasauce 1 TL",
      "Ketchup 1 TL",
      "Vollkornbrot 2-4 Scheiben"
    ],
    steps: [
      "Eier verquirlen, im Wok vollständig stocken lassen und herausnehmen.",
      "Tomaten würfeln und mit Knoblauch weichkochen, bis eine Sauce entsteht.",
      "Sojasauce und Ketchup einrühren, Eier wieder dazugeben.",
      "Auf geröstetem Vollkornbrot servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett durchgebraten)",
    swaps: "Brot ↔ Reis",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Tang Cu Li Ji 糖醋里脊 (Airfryer S&S)",
    desc: "Schweinefleisch süß-sauer. Das Fleisch wird im Airfryer fettarm geknuspert.",
    story: "Süß-Sauer ist ein Weltstar. Durch den Airfryer sparen wir extrem viel Frittier-Öl, behalten aber den geliebten Crunch bei.",
    target: "≈88 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Schweinefilet (in Stücken) 250 g",
      "Maisstärke 2 EL",
      "Paprika 100 g",
      "Ananas (Dose, ungezuckert) 50 g",
      "Ketchup & Reisessig je 2 EL",
      "Gekochter Reis 200 g"
    ],
    steps: [
      "Fleisch in Stärke wenden. Im Airfryer bei 200°C ca. 12 Min backen (durchgaren!).",
      "Im Wok Paprika und Ananas anbraten.",
      "Ketchup, Essig und etwas Wasser aufkochen.",
      "Knuspriges Fleisch kurz in der Sauce schwenken (nicht zu lang, sonst wird's weich!)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schwein durchgegart)",
    swaps: "Schwein ↔ Fester Tofu",
    side: "Reis.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Pilz-Pancetta-Risotto (IT Reiskocher)",
    desc: "Cremiges Risotto aus dem Reiskocher mit Speck und Pilzen.",
    story: "Wer sagt, dass der Reiskocher nur asiatisch kann? Das ewige Risotto-Rühren am Herd entfällt hier komplett.",
    target: "≈82 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Risottoreis (oder Rundkorn) 120 g",
      "Champignons 150 g",
      "Pancetta oder Speck 50 g",
      "Gemüsebrühe 240 ml",
      "Parmesan (pasteurisiert) 20 g"
    ],
    steps: [
      "Speck und Pilze im Airfryer oder Pfanne 3 Min anrösten (optional für mehr Aroma).",
      "Reis, Brühe, Pilze und Speck in den Reiskocher.",
      "Start drücken.",
      "Wenn fertig: Parmesan unterrühren, bis es herrlich cremig wird."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert, Speck erhitzt)",
    swaps: "Pancetta ↔ Räuchertofu",
    side: "Ein frischer, grüner Salat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (Standard)", notes: "Risotto ohne Rühren." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Schweinehack-Congee 瘦肉粥 (Reiskocher)",
    desc: "Wohlig wärmender Reisbrei mit magerem Schweinehack und feinem Ingwer.",
    story: "Ein morgendlicher Magen-Schmeichler aus Südchina. Das Hackfleisch macht lange satt, der Ingwer heizt dem Kreislauf ein.",
    target: "≈70 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Hühnerbrühe 800 ml",
      "Schweinehack (mager) 150 g",
      "Ingwer (feine Streifen) 10 g",
      "Frühlingszwiebel 10 g",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Hackfleisch mit Sojasauce mischen und zerpflücken.",
      "Reis und Brühe im Reiskocher (Porridge-Modus) ca. 50 Min kochen.",
      "Hackfleisch und Ingwer in den letzten 15 Min zufügen und sicher durchgaren lassen.",
      "Mit Frühlingszwiebeln servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hackfleisch vollständig durchkochen!)",
    swaps: "Schweinehack ↔ Hähnchenhack",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:10 Ratio", notes: "Hackfleisch nicht am Stück reinwerfen." },
  },
  {
    id: "mi-m",
    title: "Gnocchi Stir-fry (IT meets CN)",
    desc: "Italienische Gnocchi, im Wok gebraten wie chinesische Reiskuchen (Nian Gao).",
    story: "Die Textur von Gnocchi ähnelt chinesischen Reiskuchen extrem. Im heißen Wok mit Sojasauce und Pak Choi entsteht ein unglaublicher Crossover-Hit!",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Gnocchi (Kühlregal) 300 g",
      "Schweinegeschnetzeltes 100 g",
      "Pak Choi 150 g",
      "Sojasauce 2 EL",
      "Austernsauce 1 EL",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Schweinefleisch im Wok anbraten, bis es durch ist.",
      "Gnocchi direkt aus der Packung dazugeben und in wenig Öl leicht anknuspern.",
      "Knoblauch, Pak Choi und Saucen rein.",
      "3-4 Min pfannenrühren, bis die Gnocchi weich sind."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch durch)",
    swaps: "Gnocchi ↔ Koreanische Tteokbokki",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Airfryer Siu Yuk 脆皮烧肉 (Crispy Pork)",
    desc: "Chinesischer knuspriger Schweinebauch mit einer genialen Kruste.",
    story: "Das Krachen der Kruste ist Musik. Im Airfryer bläst sich die Schwarte perfekt auf, während überschüssiges Fett einfach abtropft.",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Schweinebauch (mit Schwarte) 300 g",
      "Salz (für Kruste) 1 EL",
      "Fünf-Gewürze-Pulver 1 TL",
      "Essig (zum Bepinseln)",
      "Reis (roh) 120 g",
      "Gurke 100 g"
    ],
    steps: [
      "Schwarte oft einstecken, mit Essig bepinseln und dick mit Salz bedecken (zieht Feuchtigkeit). Fleischseite würzen.",
      "Bei 180°C 25 Min im Airfryer. Salzschicht entfernen, bei 200°C ca. 10 Min Kruste poppen lassen.",
      "Reis kochen.",
      "Fleisch (muss durch sein!) in Scheiben schneiden. Mit Reis und frischer Gurke servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch sehr hoch erhitzt)",
    swaps: "Schweinebauch ↔ Hähnchenschenkel (mit Haut)",
    side: "Reis und Gurke.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Italienische Ricotta-Pancakes",
    desc: "Unglaublich weiche Pancakes, dank Ricotta im Teig.",
    story: "Ein Frühstück wie in einem Straßencafé in Rom. Der Käse macht den Teig wunderbar fluffig, feucht und eiweißreich.",
    target: "≈75 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Mehl 100 g",
      "Ricotta (pasteurisiert) 100 g",
      "Eier 2 Stück",
      "Milch 50 ml",
      "Backpulver 1 TL",
      "Honig 1 EL"
    ],
    steps: [
      "Ricotta, Eier und Milch glatt verquirlen.",
      "Mehl und Backpulver vorsichtig unterheben.",
      "In einer beschichteten Pfanne kleine Pancakes von beiden Seiten goldbraun durchbacken (nicht flüssig im Kern lassen!).",
      "Mit Honig beträufeln."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ricotta pasteurisiert, Teig durchgebacken)",
    swaps: "Ricotta ↔ Quark",
    side: "Beeren.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Zha Jiang Mian 炸酱面 (Wok)",
    desc: "Nordchinesische Nudeln mit einer dunklen, herzhaften Hackfleisch-Sauce.",
    story: "Die 'Spaghetti Bolognese' Pekings. Die dunkle Bohnenpaste liefert den unverwechselbaren, tiefen Umami-Geschmack.",
    target: "≈86 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Weizennudeln 150 g",
      "Schweinehack 150 g",
      "Süße Bohnenpaste (Hoisin geht auch) 2 EL",
      "Gurke (in Streifen) 50 g",
      "Sojasauce 1 EL",
      "Ingwer 5 g"
    ],
    steps: [
      "Hackfleisch und Ingwer im Wok krümelig und gut durch braten.",
      "Bohnenpaste und Sojasauce einrühren, mit etwas Wasser andicken.",
      "Nudeln kochen und abtropfen.",
      "Nudeln in Schüsseln geben, Fleischsauce darüber, mit Gurkenstiften toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hack komplett durch) · Diabetes ✓",
    swaps: "Weizennudeln ↔ Zucchini-Nudeln Mix",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Balkan Cevapcici-Reistopf (Reiskocher)",
    desc: "Würzige Fleischröllchen, direkt auf dem Reis dampfgegart.",
    story: "Cevapcici sind in Kroatien Kult. Im Reiskocher geben sie ihren herzhaften Saft direkt an den Reis ab – ein geniales One-Pot-Wunder!",
    target: "≈82 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Cevapcici (frisch oder TK) 6 Stück",
      "Tomatenmark 1 EL",
      "Paprikapulver (edelsüß) 1 TL",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis, Brühe, Tomatenmark und Paprika im Reiskocher gut mischen.",
      "Die Cevapcici oben auf den roten Reis legen.",
      "Reiskocher starten.",
      "Wenn fertig, die Cevapcici leicht zerteilen und mit dem Reis vermengen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleischröllchen garen im Dampf >80°C sicher durch)",
    swaps: "Cevapcici ↔ Vegane Röllchen",
    side: "Ein Löffel Ajvar dazu.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "TK-Cevapcici vorher leicht antauen lassen." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Toast Skagen (Schwedischer Krabbentoast)",
    desc: "Ein eleganter, cremiger Krabbensalat auf knusprigem Toast.",
    story: "Der berühmteste schwedische Vorspeisenteller. Schmeckt nach Urlaub am Meer. Wir nutzen pasteurisierte Mayo für absolute Sicherheit.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Garnelen/Krabben (bereits gekocht!) 150 g",
      "Mayo (aus der Tube, pasteurisiert) 2 EL",
      "Dill (frisch) 1 EL",
      "Zitrone 1 TL",
      "Toastbrot (Vollkorn) 4 Scheiben"
    ],
    steps: [
      "Gekochte Garnelen (falls TK, gut auftauen und abtrocknen) mit Mayo, Dill und Zitronensaft mischen.",
      "Toast im Toaster oder Pfanne goldbraun rösten.",
      "Krabbensalat großzügig auf dem Toast verteilen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen gekocht, Mayo pasteurisiert)",
    swaps: "Garnelen ↔ Gekochtes Ei (gehackt)",
    side: "Gurkenscheiben.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Airfryer Panko-Tofu mit Asia-Dip",
    desc: "Knusprige Tofuwürfel im Japan-Style, fettarm gebacken.",
    story: "Panko (japanisches Paniermehl) ist der König des Crunches. Im Airfryer wird der Tofu wie ein kleiner Schwamm für die süß-salzige Sauce.",
    target: "≈75 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Fester Tofu 250 g",
      "Panko 40 g",
      "Mehl 1 EL",
      "Ei 1 Stück",
      "Sojasauce & Agavendicksaft 2 EL",
      "Reis 100 g"
    ],
    steps: [
      "Tofu würfeln.",
      "In Mehl, Ei und Panko wenden.",
      "Im Airfryer bei 190°C ca. 12-15 Min backen, bis sie goldbraun sind.",
      "Mit einem Dip aus Sojasauce und Agave sowie Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei wird gebacken)",
    swaps: "Tofu ↔ Hähnchenbrust",
    side: "Ein paar Salatblätter.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Shanghai Gemüsereis 上海菜饭 (Reiskocher)",
    desc: "Komfort pur: Reis, der mit Speck und klein gehacktem Pak Choi gekocht wird.",
    story: "Ein echter Shanghai-Klassiker. Traditionell im Tontopf gemacht, gelingt er im Reiskocher genauso gut. Der Speck bringt die Magie.",
    target: "≈84 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Pak Choi 150 g",
      "Speckwürfel oder Schinken 50 g",
      "Hühnerbrühe 240 ml",
      "Schmalz oder Öl 1 TL"
    ],
    steps: [
      "Pak Choi sehr klein schneiden.",
      "Reis, Brühe und Speck in den Reiskocher geben und starten.",
      "Etwa 5 Minuten vor Ende (wenn das Wasser weg ist) den Pak Choi und das Öl unterrühren. (So bleibt er grün!)"
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Speck kocht sicher mit)",
    swaps: "Speck ↔ Räuchertofu",
    side: "Spiegelei (vollständig gebraten).",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe Standard", notes: "Gemüse am Ende rein, sonst wird es grau." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Kroatische Fritaja mit Spargel (Wok)",
    desc: "Ein herzhaftes Rührei mit (TK-)Spargel und Schinken.",
    story: "In Istrien ist Fritaja (Frittata) ein Nationalgericht, besonders im Frühling. Wir machen es im Wok, da geht es superschnell.",
    target: "≈60 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Spargel (TK oder Glas, abgetropft) 100 g",
      "Frühlingszwiebel 10 g",
      "Kochschinken 40 g",
      "Vollkornbrot 2-4 Scheiben"
    ],
    steps: [
      "Spargel und Schinken im heißen Wok anbraten.",
      "Verquirlte Eier dazugeben.",
      "Komplett durchstocken lassen (für die Schwangerschaft: keine glänzenden, feuchten Stellen mehr!).",
      "Mit Brot servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier durchgebraten)",
    swaps: "Spargel ↔ Lauch",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Airfryer Köttbullar (Svenska)",
    desc: "Schwedische Hackbällchen aus dem Airfryer, dazu schnelle Rahmsauce.",
    story: "Hackbällchen im Airfryer werden rundum perfekt braun, ohne dass man am Herd stehen und sie wenden muss.",
    target: "≈85 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Rinderhack 200 g",
      "Paniermehl 20 g",
      "Milch 30 ml",
      "Sojasauce 1 TL",
      "Brühe & Sahne (pasteurisiert) für Sauce",
      "Kartoffeln 300 g"
    ],
    steps: [
      "Hack mit in Milch eingeweichtem Paniermehl kneten, Bällchen formen.",
      "Im Airfryer bei 180°C ca. 12-15 Min backen (komplett durchgaren!).",
      "Kartoffeln kochen. In einer kleinen Pfanne Brühe und Sahne aufkochen, leicht andicken.",
      "Bällchen in die Sauce geben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleischbällchen gut durch)",
    swaps: "Kartoffeln ↔ Nudeln",
    side: "Preiselbeeren.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Yu Xiang Rou Si 鱼香肉丝 (Wok)",
    desc: "Feine Schweinefleischstreifen in einer milden 'fischduftenden' Knoblauchsauce.",
    story: "Der Name trügt: Hier ist kein Fisch drin! Die Sauce aus Knoblauch, Essig und Soja wurde früher für Fisch genutzt. Weltbekannt und genial lecker.",
    target: "≈84 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Schweineschnitzel (feine Streifen) 200 g",
      "Karotte & Zucchini (feine Streifen) 150 g",
      "Sojasauce 2 EL",
      "Reisessig 1 EL",
      "Knoblauch 1 Zehe",
      "Reis (gekocht) 200 g"
    ],
    steps: [
      "Fleischstreifen im Wok scharf anbraten, bis sie durch sind.",
      "Gemüsestreifen kurz mitbraten.",
      "Sauce aus Soja, Essig, wenig Zucker und Stärke angießen.",
      "Kurz aufkochen, bis es glänzt, über den Reis geben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schwein durchgegart)",
    swaps: "Schwein ↔ Hühnchenbrust",
    side: "Reis.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Jianbing 煎饼 (mit Airfryer-Crunch)",
    desc: "Chinesischer Streetfood-Crêpe. Den frittierten Innenteil machen wir im Airfryer.",
    story: "Jianbing ist das beste Frühstück Chinas. Der Knusper im Inneren (Baocui) wird oft frittiert. Wir backen einfach Wan-Tan-Teigblätter im Airfryer auf!",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Mehl 80 g",
      "Eier 2 Stück",
      "Wan-Tan-Blätter 4 Stück",
      "Hoisin-Sauce oder Sojapaste 1 EL",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Wan-Tan-Blätter im Airfryer bei 180°C 3 Min knusprig backen.",
      "Dünnen Crêpe aus Mehl und Wasser in der Pfanne backen.",
      "Ei draufschlagen, verstreichen und durchbraten lassen (!).",
      "Wenden, mit Hoisin bestreichen, Knusper rein, falten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durchgaren)",
    swaps: "Wan-Tan-Blätter ↔ Nachos (ungewürzt)",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Kroatische Pasticada (Schnell-Wok)",
    desc: "Rinderschmortopf-Aromen im Wok, serviert mit Gnocchi.",
    story: "Echte Pasticada schmort tagelang. Wir adaptieren die Aromen (Rotweinessig, Pflaumen, Tomate) für ein schnelles, herrlich süß-saures Wok-Ragout.",
    target: "≈85 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Rindfleisch (Minutensteaks/Geschnetzeltes) 200 g",
      "Gnocchi 300 g",
      "Passierte Tomaten 100 ml",
      "Backpflaumen 2 Stück",
      "Rotweinessig 1 EL"
    ],
    steps: [
      "Rindfleisch im Wok anbraten (gut durchgaren!).",
      "Tomaten, gehackte Pflaumen und Essig dazugeben.",
      "10 Min einköcheln lassen.",
      "Gnocchi kochen und in der Sauce schwenken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch durch)",
    swaps: "Rind ↔ Schwein",
    side: "Ein paar Tropfen Olivenöl am Ende.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Claypot Sausage Rice 煲仔饭 (Reiskocher)",
    desc: "Chinesische Lap Cheong Wurst gibt ihr süßliches Fett an den Reis ab.",
    story: "Ein Klassiker aus Guangzhou. Wenn du keine Lap Cheong (süße chinesische Wurst) hast, nimm Cabanossi. Es geht um das Fett, das in den Reis schmilzt.",
    target: "≈82 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lap Cheong (oder Cabanossi) 1-2 Stück",
      "Sojasauce 2 EL",
      "Sesamöl 1 TL",
      "Brokkoli oder Pak Choi 100 g"
    ],
    steps: [
      "Wurst in dünne Scheiben schneiden.",
      "Reis und Wasser in den Reiskocher, Wurst oben drauf legen.",
      "Kochen lassen.",
      "Brokkoli extra dämpfen. Am Ende alles mit Soja/Sesamöl mischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Wurst wird dampfgekocht >80°C)",
    swaps: "Lap Cheong ↔ Chorizo",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Standard", notes: "Wurst nicht umrühren vor dem Kochen." },
  },
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Schweinebauch": { group: "Protein/Fisch/Tofu", label: "Schweinebauch", unitDefault: "g" },
  "Schweinefilet": { group: "Protein/Fisch/Tofu", label: "Schweinefilet", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule (o. Knochen)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen/Krabben", unitDefault: "g" },
  "Cevapcici": { group: "Protein/Fisch/Tofu", label: "Cevapcici (TK)", unitDefault: "Stück" },
  "Speckwürfel": { group: "Protein/Fisch/Tofu", label: "Speckwürfel/Bacon", unitDefault: "g" },
  "Pancetta": { group: "Protein/Fisch/Tofu", label: "Pancetta", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Lap Cheong": { group: "Protein/Fisch/Tofu", label: "Lap Cheong / Cabanossi", unitDefault: "Stück" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Ricotta": { group: "Protein/Fisch/Tofu", label: "Ricotta", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark", unitDefault: "g" },
  "Frischkäse": { group: "Protein/Fisch/Tofu", label: "Frischkäse", unitDefault: "EL" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Sojasprossen": { group: "Gemüse/Pilze", label: "Sojasprossen", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Spargel": { group: "Gemüse/Pilze", label: "Spargel (TK/Glas)", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch)", unitDefault: "Stück" },
  "Tomaten passiert": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "ml" },
  "Tomatenmark": { group: "Gemüse/Pilze", label: "Tomatenmark", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel", unitDefault: "g" },
  "Ananas": { group: "Gemüse/Pilze", label: "Ananas (Dose)", unitDefault: "g" },
  "Backpflaumen": { group: "Gemüse/Pilze", label: "Backpflaumen", unitDefault: "Stück" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Spaghetti": { group: "Reis/Nudeln/Sättigung", label: "Spaghetti", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Kartoffeln": { group: "Reis/Nudeln/Sättigung", label: "Kartoffeln", unitDefault: "g" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot", unitDefault: "Scheiben" },
  "Bao Buns": { group: "Reis/Nudeln/Sättigung", label: "Bao Buns (TK)", unitDefault: "Stück" },
  "Wan-Tan-Blätter": { group: "Reis/Nudeln/Sättigung", label: "Wan-Tan-Blätter", unitDefault: "Stück" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko/Paniermehl", unitDefault: "g" },
  "Paniermehl": { group: "Reis/Nudeln/Sättigung", label: "Paniermehl", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Süße Bohnenpaste": { group: "Algen/Brühen/Würze", label: "Süße Bohnenpaste", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Rotweinessig": { group: "Algen/Brühen/Würze", label: "Rotweinessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Mayo": { group: "Algen/Brühen/Würze", label: "Mayo (Tube)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Ajvar": { group: "Algen/Brühen/Würze", label: "Ajvar (mild)", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Zucker", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Sternanis": { group: "Algen/Brühen/Würze", label: "Sternanis", unitDefault: "Stück" },
  "Fünf-Gewürze-Pulver": { group: "Algen/Brühen/Würze", label: "Fünf-Gewürze", unitDefault: "TL" },
  "Paprikapulver": { group: "Algen/Brühen/Würze", label: "Paprikapulver", unitDefault: "TL" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Dill": { group: "Algen/Brühen/Würze", label: "Dill (frisch)", unitDefault: "EL" },
  "Zitrone": { group: "Algen/Brühen/Würze", label: "Zitrone", unitDefault: "TL" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Zehe|Prise|Stangen|Scheiben|TL|EL|Stk)?/i);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.toLowerCase().includes(k.toLowerCase()));
      if (!key) {
        if (name.includes("Reis (roh)")) key = "Reis";
        else if (name.includes("Feta")) key = "Feta";
        else if (name.includes("Pilze")) key = "Champignons";
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw7" }) {
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
            Woche 7 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>CN Wok & Schwein · Airfryer-Hacks · SWE/HR/IT · 1× Reiskocher/Tag</p>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Vom taiwanesischen Lu Rou Fan über italienisches Risotto bis hin zum kroatischen Cevapcici-Topf.</p>
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
export default function Woche7DE() {
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
            {tagChip("Woche 7")}
            {tagChip("CN Wok & Airfryer + EU Crossover")}
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