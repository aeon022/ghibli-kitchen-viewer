// src/plans/2026/Woche-2-2026-01-05.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 2 (Start: 2026-01-05)
  Fixes:
  - Links: Funktionieren jetzt mit HashRouter (scrollen statt navigieren).
  - Titel: Werden in Platzhaltern nicht mehr abgeschnitten.
  - Design: 1:1 Woche 1 (Verläufe, Schatten).
  - Inhalt: Asiatisch, Viral/Trendy, Reiskocher-Sektion am Ende.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 2",
  startDate: "2026-01-05",
  id: "woche-2-2026-01-05",
  lang: "de",
  sidebar: "Woche 2 (2026-01-05)",
};

const FILE_BASE = "Woche 2 2026-01-05";

const UI_TITLES = {
  main: "Rezepte Woche 2",
  list: "Einkaufsliste Woche 2",
};

// ---- THEME (Identisch zu Woche 1) ----
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

// ---- Helper: Safe Scroll (Fix für HashRouter Links) ----
const scrollToId = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    // Offset für Header/Sticky Elemente falls nötig
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
  mo: "Montag (2026-01-05)",
  di: "Dienstag (2026-01-06)",
  mi: "Mittwoch (2026-01-07)",
  do: "Donnerstag (2026-01-08)",
  fr: "Freitag (2026-01-09)",
  sa: "Samstag (2026-01-10)",
  so: "Sonntag (2026-01-11)",
};

// -----------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------
const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Dakjuk 닭죽 (Koreanischer Hühner-Brei)",
    desc: "Ein sehr bekömmlicher, wärmender Start. Huhn wird direkt mit dem Reis weichgekocht.",
    story: "In Korea ein klassisches Gericht zur Stärkung. Sehr mild und magenfreundlich.",
    target: "≈65 g Kohlenhydrate (2 Pers.) · Proteinreich",
    ingredients: [
      "Reis (roh) 80 g",
      "Wasser 800 ml",
      "Hähnchenbrust 150 g",
      "Karotte 80 g",
      "Zucchini 80 g",
      "Knoblauch 1 Zehe",
      "Sesamöl 5 ml",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis waschen. Huhn in kleine Stücke schneiden.",
      "Alle Zutaten (außer Sesamöl/Zwiebel) in den Reiskocher geben.",
      "Programm 'Porridge' oder 'Congee' starten.",
      "Am Ende mit Sesamöl und Frühlingszwiebeln verfeinern."
    ],
    checks: "Magenfreundlich ✓ · Protein ✓ · Huhn durchgegart ✓",
    swaps: "Huhn ↔ Tofu (erst am Ende zugeben)",
    side: "Warmes Wasser oder Ingwertee.",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Porridge / Congee",
      water: "1:9 bis 1:10 Verhältnis",
      notes: "Sehr weich und bekömmlich."
    },
  },
  {
    id: "mo-m",
    title: "Soba Salad 蕎麦サラダ (Buchweizennudeln)",
    desc: "Soba-Nudeln mit viel knackigem Gemüse und einem leichten Dressing.",
    story: "Soba hat einen niedrigeren glykämischen Index als Weizennudeln.",
    target: "≈75 g KH · Ballaststoffreich",
    ingredients: [
      "Soba (trocken) 100 g",
      "Gurke 150 g",
      "Karotte 100 g",
      "Edamame (geschält, TK) 100 g",
      "Sojasauce natriumarm 20 ml",
      "Reisessig 10 ml",
      "Sesamöl 10 ml",
      "Sesam 5 g"
    ],
    steps: [
      "Soba nach Packung kochen, kalt abspülen.",
      "Gemüse in feine Stifte schneiden. Edamame kurz blanchieren.",
      "Dressing anrühren und alles vermengen."
    ],
    checks: "Leicht ✓ · Vegan möglich ✓",
    swaps: "Edamame ↔ Tofuwürfel",
    side: "Misosuppe (instant, mild)",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Báicài Chǎo Ròu 白菜炒肉 (Chinakohl-Hack-Pfanne)",
    desc: "Rinderhack (mager) mit viel Chinakohl, geschmort in einer milden Austernsauce-Basis.",
    story: "Chinakohl ist sehr gut verträglich und liefert Volumen ohne viele Kalorien.",
    target: "Low Carb Option möglich · Proteinreich",
    ingredients: [
      "Rinderhack mager 200 g",
      "Chinakohl 300 g",
      "Karotte 100 g",
      "Ingwer 5 g",
      "Sojasauce natriumarm 15 ml",
      "Austernsauce 10 ml",
      "Reis (gekocht) 200 g (als Beilage)"
    ],
    steps: [
      "Hackfleisch krümelig braten (ganz durch!).",
      "Gemüse und Ingwer dazu, kurz mitbraten.",
      "Saucen und etwas Wasser dazu, 10 Min schmoren bis Kohl weich ist.",
      "Mit Reis servieren."
    ],
    checks: "Hackfleisch durch ✓ · Chinakohl gut verdaulich ✓",
    swaps: "Rind ↔ Pute; Austernsauce ↔ Veggie-Stir-Fry-Sauce",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Tamagoyaki 卵焼き (Gefaltetes Omelett)",
    desc: "Klassisches japanisches Frühstück: Das Ei wird hier komplett durchgegart.",
    story: "Proteinreich und macht lange satt.",
    target: "Proteinbetont",
    ingredients: [
      "Eier 4 Stück",
      "Karotte (gerieben) 30 g",
      "Sojasauce natriumarm 5 ml",
      "Dashi (oder Wasser) 20 ml",
      "Reis (gekocht) 150 g",
      "Öl zum Braten"
    ],
    steps: [
      "Eier verquirlen, Karottenraspel und Würze dazu.",
      "In der Pfanne schichtweise braten und rollen (Sicherstellen, dass es innen fest ist).",
      "In Scheiben schneiden und zum Reis essen."
    ],
    checks: "Ei vollständig gestockt (Schwangerschaft) ✓",
    swaps: "Dashi ↔ Gemüsebrühe",
    side: "Kleine Portion Obst",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Hainanese Chicken Rice 海南鸡饭 (Reiskocher)",
    desc: "Das Huhn dämpft auf dem Reis und gibt Geschmack ab. Ingwer-Knoblauch-Note.",
    story: "Ein absoluter Klassiker, hier in der One-Pot-Variante.",
    target: "Fettarm (wenn Haut weg) · Glutenfrei (mit Tamari)",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust 250 g",
      "Ingwer 15 g",
      "Knoblauch 2 Zehen",
      "Frühlingszwiebel 20 g",
      "Hühnerbrühe 200 ml (statt Wasser)",
      "Gurke 100 g (Deko)"
    ],
    steps: [
      "Reis waschen, mit Brühe in den Topf.",
      "Ingwer und Knoblauch fein hacken, dazugeben.",
      "Hähnchenbrust obenauf legen (im Ganzen).",
      "Kochen 'White Rice'. Danach Huhn prüfen (muss weiß sein), schneiden.",
      "Mit Gurkenscheiben servieren."
    ],
    checks: "Huhn >75°C Kerntemperatur ✓ · Keine rohen Saucen ✓",
    swaps: "Brust ↔ Keule (ohne Knochen)",
    side: "Chilisauce (optional/weglassen)",
    remind: false,
    riceCooker: {
      enabled: true,
      program: "White Rice / Mixed",
      water: "Wie gewohnt für Reis (Brühe statt Wasser)",
      notes: "Huhn wird extrem zart."
    },
  },
  {
    id: "di-a",
    title: "Dòufu Mógū Chǎo 豆腐蘑菇炒 (Tofu-Pilz-Pfanne)",
    desc: "Schnell, vegan und leicht. Verschiedene Pilze sorgen für Biss.",
    story: "Perfekt für den Abend, da nicht zu schwer.",
    target: "Low Carb (ohne Reis)",
    ingredients: [
      "Tofu fest 200 g",
      "Champignons 150 g",
      "Shiitake 50 g",
      "Pak Choi 150 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 5 ml",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Tofu würfeln und anbraten.",
      "Pilze dazu, scharf anbraten.",
      "Pak Choi und Sauce dazu, kurz dünsten.",
      "Mit Reis servieren."
    ],
    checks: "Vegan ✓ · Pilze gut durchgaren (Verdaulichkeit) ✓",
    swaps: "Pilze ↔ Zucchini",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Mushi-Pan 蒸しパン (Süßkartoffel-Brot)",
    desc: "Ein gedämpfter 'Kuchen' aus dem Reiskocher oder Topf, wenig Zucker.",
    story: "In Japan ein beliebter Snack, hier als Frühstück.",
    target: "Mäßig KH",
    ingredients: [
      "Mehl (Dinkel oder Weizen) 100 g",
      "Backpulver 1 TL",
      "Ei 1 Stück",
      "Milch 60 ml",
      "Süßkartoffel (roh, klein gewürfelt) 80 g",
      "Honig 10 g"
    ],
    steps: [
      "Teig anrühren, Süßkartoffelwürfel unterheben.",
      "In Förmchen füllen oder direkt in den gefetteten Reiskocher-Topf.",
      "Programm 'Cake' oder 'Steam' (ca. 20 Min)."
    ],
    checks: "Ei durchgebacken/gedämpft ✓",
    swaps: "Süßkartoffel ↔ Apfel",
    side: "Glas Milch oder Sojamilch",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Cake / Steam",
      water: "Wenn Steam: Wasser bis zur Markierung",
      notes: "Zahnstocherprobe machen."
    },
  },
  {
    id: "mi-m",
    title: "Japchae 잡채 (Glasnudeln mild)",
    desc: "Koreanische Süßkartoffelglasnudeln mit viel Gemüse und Rindfleischstreifen.",
    story: "Bunt und festlich, aber hier in einer Alltagsversion.",
    target: "Glutenfrei (bei Tamari)",
    ingredients: [
      "Glasnudeln (Süßkartoffelstärke) 100 g",
      "Rindersteak (in Streifen) 100 g",
      "Spinat 100 g",
      "Karotte 80 g",
      "Zwiebel 50 g",
      "Sojasauce natriumarm 20 ml",
      "Sesamöl 10 ml",
      "Zucker/Honig 5 g"
    ],
    steps: [
      "Nudeln kochen und abspülen.",
      "Fleisch und Gemüse separat anbraten (alles gut durch).",
      "Alles in der Pfanne mischen und würzen.",
      "Sesamöl zum Schluss darüber."
    ],
    checks: "Rindfleisch well-done ✓",
    swaps: "Rind ↔ Pilze (vegan)",
    side: "Kimchi (pasteurisiert/gekauft, wegen Schwangerschaft)",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Qīngzhēng Yú 清蒸鱼 (Gedämpfter Fisch)",
    desc: "Ganz klassisch, leicht und gesund. Dazu Reis.",
    story: "Der Fisch bleibt saftig und die Verdauung wird nicht belastet.",
    target: "High Protein · Low Fat",
    ingredients: [
      "Weißer Fisch (Kabeljau/Seelachs) 300 g",
      "Ingwer 15 g (Stifte)",
      "Frühlingszwiebel 2 Stangen",
      "Sojasauce natriumarm 15 ml",
      "Öl 10 ml (heiß)",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Fisch auf Teller legen, Ingwer darauf.",
      "Im Dämpfer (oder Reiskocher-Einsatz) 10-12 Min dämpfen.",
      "Flüssigkeit abgießen, Sojasauce drüber.",
      "Öl erhitzen und über die Frühlingszwiebeln auf den Fisch gießen (Zischen!)."
    ],
    checks: "Fisch durchgegart ✓ · Kein roher Fisch ✓",
    swaps: "Fisch ↔ Tofu",
    side: "Gedämpfter Brokkoli",
    remind: true,
    riceCooker: { enabled: false },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Sù Zhōu 粟粥 (Hirse-Brei mit Kürbis)",
    desc: "Hirse ist eisenreich und gut für die Schwangerschaft. Mit Kürbis natürlich süß.",
    story: "Ein 'Comfort Food' für den Magen.",
    target: "Eisenreich · Ballaststoffe",
    ingredients: [
      "Goldhirse 60 g",
      "Kürbis (Hokkaido) 100 g",
      "Wasser/Milch-Mix 400 ml",
      "Zimt 1 Prise",
      "Walnüsse 10 g (gehackt)"
    ],
    steps: [
      "Hirse heiß abspülen (Bitterstoffe weg).",
      "Mit Kürbiswürfeln und Flüssigkeit köcheln (ca 15 Min).",
      "Quellen lassen, Nüsse drüber."
    ],
    checks: "Hirse gut gewaschen ✓",
    swaps: "Kürbis ↔ Apfel",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Oyakodon 親子丼 (Well Done)",
    desc: "Huhn und Ei in einer süßlichen Brühe auf Reis. Wichtig: Ei komplett gestockt.",
    story: "Oyakodon heißt 'Eltern-Kind-Schüssel' (Huhn & Ei).",
    target: "Ausgewogen",
    ingredients: [
      "Hähnchenschenkel (ohne Knochen) 150 g",
      "Eier 3 Stück",
      "Zwiebel 80 g",
      "Dashi/Brühe 100 ml",
      "Sojasauce natriumarm 15 ml",
      "Reis (gekocht) 200 g"
    ],
    steps: [
      "Zwiebel in Brühe/Soja weichkochen.",
      "Huhn dazu, garen bis durch.",
      "Verquirlte Eier darüber gießen, Deckel drauf.",
      "Dämpfen bis Ei komplett fest ist (kein flüssiges Eigelb!)."
    ],
    checks: "Ei fest ✓ · Huhn durch ✓",
    swaps: "Huhn ↔ Tofu (dann aber kein Oyakodon mehr im Namen ;))",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Bāo Zǎi Fàn 煲仔饭 (Cantonese Claypot Style)",
    desc: "Reis mit mariniertem Huhn und Pilzen, zusammen gegart. One Pot Wonder.",
    story: "Normalerweise im Tontopf für Kruste, im Reiskocher für Komfort.",
    target: "One Pot Meal",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (gewürfelt) 150 g",
      "Shiitake (eingeweicht/frisch) 50 g",
      "Pak Choi 100 g",
      "Ingwer 5 g",
      "Sojasauce 10 ml",
      "Maisstärke 1 TL (Marinade)"
    ],
    steps: [
      "Huhn mit Soja, Stärke, Ingwer marinieren (15 Min).",
      "Reis und Wasser in den Kocher.",
      "Huhn und Pilze obenauf verteilen.",
      "Kochen 'White Rice'.",
      "5 Min vor Ende Pak Choi drauflegen (dämpfen)."
    ],
    checks: "Huhn durch ✓",
    swaps: "Pak Choi ↔ Spinat",
    side: "Klare Brühe",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White Rice",
      water: "Standard (Marinade nicht als Wasser zählen)",
      notes: "Durchmischen vor dem Servieren."
    },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Xīhóngshì Chǎo Jīdàn 西红柿炒鸡蛋 (Rührei & Tomate)",
    desc: "Klassiker: Rührei mit saftigen Tomaten, leicht gesüßt. Dazu Brot statt Reis.",
    story: "Schnellstes chinesisches Hausgericht.",
    target: "Vegetarisch",
    ingredients: [
      "Eier 3 Stück",
      "Tomaten 2 große",
      "Frühlingszwiebel 10 g",
      "Salz/Pfeffer",
      "Vollkornbrot 2 Scheiben"
    ],
    steps: [
      "Eier braten (Rührei), herausnehmen.",
      "Tomaten anbraten bis sie Saft lassen.",
      "Eier zurück, mischen, würzen.",
      "Eier müssen durch sein."
    ],
    checks: "Eier durch ✓",
    swaps: "Brot ↔ Reis",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Takikomi Gohan 炊き込みご飯 (Lachs & Pilze)",
    desc: "Japanischer 'Mixed Rice' aus dem Reiskocher. Lachs wird mitgedämpft.",
    story: "Sehr beliebt im Herbst/Winter.",
    target: "Omega-3 (Lachs)",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 150 g (frisch/TK)",
      "Karotte 50 g",
      "Shiitake/Champignons 50 g",
      "Sojasauce 15 ml",
      "Mirin (oder Prise Zucker) 5 ml",
      "Dashi/Wasser"
    ],
    steps: [
      "Reis waschen. Wasser/Dashi bis Markierung, dann Soja dazu.",
      "Gemüsestifte und Lachsfilet obenauf legen.",
      "Kochen.",
      "Lachs zerpflücken und unter den Reis heben."
    ],
    checks: "Lachs durchgegart ✓ · Gräten entfernt ✓",
    swaps: "Lachs ↔ Hühnchen",
    side: "Misosuppe",
    remind: false,
    riceCooker: {
      enabled: true,
      program: "Mixed / White Rice",
      water: "Inkl. Würzflüssigkeit messen",
      notes: "Lachshaut vorher entfernen oder nachher abziehen."
    },
  },
  {
    id: "fr-a",
    title: "Kake Udon かけうどん (Milde Suppe mit Tofu)",
    desc: "Dicke Nudeln in klarer Brühe mit Tofuwürfeln und Spinat.",
    story: "Udon sind leicht verdaulich und wärmen.",
    target: "Leichtes Abendessen",
    ingredients: [
      "Udon (Vorgegart oder Trocken) 200 g",
      "Tofu 150 g",
      "Spinat 100 g",
      "Frühlingszwiebel",
      "Dashi/Gemüsebrühe 600 ml",
      "Sojasauce 10 ml"
    ],
    steps: [
      "Brühe aufkochen, Tofu darin erwärmen.",
      "Udon dazu (nur kurz kochen).",
      "Spinat im letzten Moment dazu.",
      "Abschmecken."
    ],
    checks: "Sehr mild ✓",
    swaps: "Tofu ↔ Gekochtes Ei",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Yachaejeon 야채전 (Reis-Pfannkuchen)",
    desc: "Aus Reismehl und Gemüse, herzhaft.",
    story: "Abwechslung zum süßen Frühstück.",
    target: "Glutenfrei möglich",
    ingredients: [
      "Reismehl (Klebreis oder normal) 80 g",
      "Wasser ca. 80 ml",
      "Ei 1 Stück",
      "Zucchini (geraspelt) 50 g",
      "Karotte (geraspelt) 30 g",
      "Prise Salz"
    ],
    steps: [
      "Teig mischen, Gemüse unterheben.",
      "In Pfanne kleine Puffer backen.",
      "Durchgaren."
    ],
    checks: "Gemüse weich ✓",
    swaps: "Reismehl ↔ Weizenmehl",
    side: "Dip aus Sojasauce",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Bibimbap 비빔밥 (Safe Edition)",
    desc: "Reis mit verschiedenen Gemüse-Toppings und gebratenem Rind. Kein rohes Eigelb!",
    story: "Das Nationalgericht Koreas. Hier ohne scharfe Gochujang (oder nur wenig).",
    target: "Viel Gemüse",
    ingredients: [
      "Reis (gekocht) 200 g",
      "Rinderhack 100 g (gebraten)",
      "Spinat (blanchiert) 80 g",
      "Karotte (gedünstet) 80 g",
      "Sojasprossen (gekocht!) 80 g",
      "Ei (Spiegelei, durchgebraten) 2 Stk",
      "Sesamöl, Sojasauce"
    ],
    steps: [
      "Alle Toppings separat garen (Sprossen unbedingt kochen wegen Bakterien!).",
      "Auf Reis anrichten.",
      "Mit Sesamöl und Sojasauce würzen."
    ],
    checks: "Sprossen gekocht (Listerien-Schutz) ✓ · Ei hart ✓",
    swaps: "Rind ↔ Tofu",
    side: "Keine",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Mille-Feuille Nabe ミルフィーユ鍋 (Schichtkohl)",
    desc: "Trend-Gericht: Schichten aus Chinakohl und dünnem Schweinefleisch, im Reiskocher gedämpft.",
    story: "Sieht aus wie eine Blume ('Tausend Blätter'), super einfach und gesund.",
    target: "Viral Hit · Low Carb",
    ingredients: [
      "Chinakohl 1/2 Kopf",
      "Schweinefleisch oder Pute (dünn geschnitten) 200 g",
      "Dashi/Brühe 200 ml",
      "Ingwer Scheiben",
      "Ponzu (Zitrus-Soja) zum Dippen"
    ],
    steps: [
      "Kohlblätter und Fleisch abwechselnd stapeln.",
      "In 5cm Stücke schneiden.",
      "Hochkant dicht in den Reiskocher-Topf schichten (vom Rand zur Mitte).",
      "Brühe drüber. Kochen (ca. 20-25 Min).",
      "Fleisch muss grau/weiß sein (durch)."
    ],
    checks: "Fleisch komplett durch ✓",
    swaps: "Schwein ↔ Rind",
    side: "Ggf. Reis",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Steam / Cook",
      water: "200ml Brühe",
      notes: "Optisch ein Highlight, sehr gesund."
    },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Viral Whole Tomato Rice 整个番茄饭",
    desc: "Der Internet-Hit: Eine ganze Tomate kocht mit dem Reis und wird zur Sauce.",
    story: "Super einfach, saftig und perfekt für faule Sonntage.",
    target: "Instagram-Hit",
    ingredients: [
      "Reis (roh) 120 g",
      "Tomate (groß, reif) 1 Stück",
      "Olivenöl 1 EL",
      "Mais & Erbsen (TK) 50 g",
      "Schinkenwürfel (gekocht) 30 g",
      "Salz, Pfeffer"
    ],
    steps: [
      "Reis & Wasser in den Topf.",
      "Strunk der Tomate entfernen, Tomate mittig auf den Reis setzen.",
      "Öl, Gemüse & Schinken drumherum verteilen.",
      "Kochen. Danach Tomate zerdrücken und alles mischen."
    ],
    checks: "Vegan (ohne Schinken) ✓",
    swaps: "Schinken ↔ Pilze",
    side: "Spiegelei",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White Rice",
      water: "Etwas weniger als normal (Tomate hat Wasser)",
      notes: "Tomate muss sehr reif sein."
    },
  },
  {
    id: "so-m",
    title: "Mapo Tofu 麻婆豆腐 (Mild)",
    desc: "Seidentofu und Hackfleisch in einer würzigen (aber milden) Bohnensauce.",
    story: "Der Klassiker aus Sichuan, hier 'entschärft' für den Magen.",
    target: "Proteinbombe",
    ingredients: [
      "Tofu (Seiden oder Weich) 300 g",
      "Rinderhack oder Schwein 100 g",
      "Doubanjiang (nur wenig!) oder Miso-Paste 1 EL",
      "Brühe 150 ml",
      "Stärke zum Binden",
      "Reis (gekocht) 200 g"
    ],
    steps: [
      "Hack anbraten.",
      "Paste dazu, kurz rösten. Brühe aufgießen.",
      "Tofuwürfel vorsichtig hinein (nicht rühren, schwenken). 5 Min köcheln.",
      "Mit Stärke binden."
    ],
    checks: "Hack durch ✓ · Nicht zu scharf würzen ✓",
    swaps: "Hack ↔ Pilze",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Běigū Zhēng Huájī 北菇蒸滑鸡 (Huhn mit Pilzen)",
    desc: "Zartes Hühnchen, mariniert und gedämpft. Sehr purer Geschmack.",
    story: "Klassische Schonkost in der chinesischen Küche.",
    target: "Leicht verdaulich",
    ingredients: [
      "Hähnchenschenkel-Fleisch (Würfel) 200 g",
      "Shiitake (getrocknet, eingeweicht) 4 Stk",
      "Ingwerstreifen",
      "Sojasauce, Sesamöl, Stärke",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Huhn mit Gewürzen und Stärke marinieren.",
      "Auf einen Teller geben, Pilze dazu.",
      "Im Dampfgarer (oder Wok mit Einsatz) 15-20 Min dämpfen.",
      "Prüfen ob Fleischsaft klar ist."
    ],
    checks: "Huhn komplett durch ✓",
    swaps: "-",
    side: "Blanchierter Spinat",
    remind: true,
    riceCooker: { enabled: false },
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
  "Tofu fest": { group: "Protein/Fisch/Tofu", label: "Tofu (fest)", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu (Natur/Seiden)", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Schinkenwürfel": { group: "Protein/Fisch/Tofu", label: "Schinkenwürfel (gekocht)", unitDefault: "g" },

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
  // WICHTIG: encodeURIComponent für sauberes Laden des SVG-Gradients als Data-URI
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw2" }) {
  const [src, setSrc] = useState("");
  
  useEffect(() => {
    const preferred = `/plan-art/${year}/${weekFolder}/${meal.id}.jpg`;
    // Standard-Fallback: Titel NICHT abschneiden!
    const fallback = animePlaceholder(meal.title);
    setSrc(fallback);

    // Versuchen, das echte Bild zu laden
    const img = new Image();
    img.onload = () => setSrc(preferred);
    img.onerror = () => setSrc(fallback); // Bei Fehler wieder Fallback
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

  // FIX: href="#" + onClick für sicheres Scrollen im HashRouter
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
            Woche 2 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Asiatische Hausmannskost (CN/JP/KR) · Mild & Schwangerschaftsgeeignet · 1x Reiskocher/Tag</p>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {DAYS_ORDER.map((d) => (
            <div key={d} style={{ padding: 12, borderRadius: 12, border: "1px solid var(--border)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <strong>{DAY_NAME_DE[d]}</strong>
                {/* FIX: Scroll-Link für den Tag */}
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

// ---- NEU: RiceCooker Section (Endlich wieder da!) ----
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
export default function Woche2DE() {
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

  // Internal Styles (Identical to Week 1)
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
            {tagChip("Woche 2")}
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
              <DaySection key={d} dayKey={d} meals={DATA.filter(r => r.id.startsWith(d))} dayName={DAY_NAME_DE[d]} />
            ))}
            {/* HIER IST DIE FEHLENDE SECTION WIEDER: */}
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