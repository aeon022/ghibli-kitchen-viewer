// src/plans/2026/Woche-5-2026-01-26.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 5 (Start: 2026-01-26)
  Status: FIX (White Screen behoben).
  Inhalt: Balanced (nicht Gastritis-streng), Schwangerschaftssicher.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 5",
  startDate: "2026-01-26",
  id: "woche-5-2026-01-26",
  lang: "de",
  sidebar: "Woche 5 (2026-01-26)",
};

const FILE_BASE = "Woche 5 2026-01-26";

const UI_TITLES = {
  main: "Rezepte Woche 5",
  list: "Einkaufsliste Woche 5",
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
  mo: "Montag (2026-01-26)",
  di: "Dienstag (2026-01-27)",
  mi: "Mittwoch (2026-01-28)",
  do: "Donnerstag (2026-01-29)",
  fr: "Freitag (2026-01-30)",
  sa: "Samstag (2026-01-31)",
  so: "Sonntag (2026-02-01)",
};

// -----------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Dan Bing 蛋餅 (Taiwanesischer Eier-Crêpe)",
    desc: "Ein weicher Pfannkuchen, mit Ei und Frühlingszwiebeln aufgerollt. Frühstücksklassiker!",
    story: "In Taiwan an jeder Straßenecke zu finden. Die Legende besagt, wer Dan Bing nicht mag, hat einfach noch keinen guten gegessen. Super einfach und macht glücklich.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Mehl 100 g",
      "Maisstärke 20 g",
      "Wasser 200 ml",
      "Eier 4 Stück",
      "Frühlingszwiebel 30 g",
      "Sojasauce 10 ml"
    ],
    steps: [
      "Mehl, Stärke und Wasser zu einem dünnen Teig verrühren.",
      "Kelle Teig in die Pfanne, kurz stocken lassen. Ein verquirltes Ei darüber gießen.",
      "Wenden, aufrollen, mit Sojasauce oder süßer Sojapaste servieren."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Proteinreich durch Eier) · Schwangerschaft ✓ Ei komplett durchbraten!",
    swaps: "Weizenmehl ↔ Dinkelmehl; Füllung ↔ +Käse (pasteurisiert)",
    side: "Sojamilch (warm/kalt).",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Kitsune Udon きつねうどん (Der Fuchs liebt Tofu)",
    desc: "Dicke Udon-Nudeln in klarer Brühe mit süßlich geschmortem Tofu (Inari-Age).",
    story: "Japanische Folklore sagt, Füchse (Kitsune) lieben frittierten Tofu. Wir nehmen fertige Inari-Taschen oder braten Tofu selbst an. Seelenwärmer pur.",
    target: "≈88 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Udon (vorgegart) 400 g",
      "Inari-Age (gewürzte Tofutaschen) 6 Stk",
      "Spinat 100 g",
      "Dashi 700 ml",
      "Sojasauce 15 ml",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Dashi mit Soja erhitzen. Udon darin erwärmen.",
      "Inari-Taschen (oder gebratenen Tofu mit etwas Zucker/Soja glasiert) drauflegen.",
      "Spinat kurz mitgaren. Heiß schlürfen."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Ballaststoffe aus Spinat) · Schwangerschaft ✓",
    swaps: "Inari ↔ Gebratener Räuchertofu; Udon ↔ Soba",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Kinoko Gohan 茸ご飯 (Pilz-Reis)",
    desc: "Aromatischer Reis, der mit verschiedenen Pilzen und Soja gedämpft wird.",
    story: "Der Wald ruft! 'Kinoko' heißt Pilz. Wenn der Reiskocherdeckel aufgeht, riecht die ganze Küche nach Herbstspaziergang und Umami.",
    target: "≈82 g KH (2 P.) · Protein ≈18 g p. P. (mit Beilage)",
    ingredients: [
      "Reis (roh) 120 g",
      "Shiitake & Champignons 150 g",
      "Karotte 50 g",
      "Aburaage (Frittierter Tofu) 1 Stk",
      "Dashi 240 ml",
      "Sojasauce 15 ml"
    ],
    steps: [
      "Reis waschen. Pilze und Tofu in Streifen schneiden.",
      "Alles mit Dashi und Soja in den Topf. Nicht umrühren, einfach oben drauflegen!",
      "Starten. Nach dem Kochen sanft unterheben."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Viel Pilz-Volumen) · Schwangerschaft ✓",
    swaps: "Aburaage ↔ Hühnchenschenkel-Würfel",
    side: "Edamame oder Miso-Suppe.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi bis Markierung", notes: "Pilze geben Wasser ab, nicht zu viel Dashi nehmen." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Tamago Kake Gohan 卵かけご飯 (Safe Edition)",
    desc: "Der japanische Klassiker 'Ei auf Reis', aber mit Rührei statt rohem Ei.",
    story: "Normalerweise wird ein rohes Ei über heißen Reis geschlagen. Wir machen ein cremiges, aber durchgegartes Rührei daraus. Fast genauso gut und sicher!",
    target: "≈70 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Eier 4 Stück",
      "Sojasauce 10 ml",
      "Furikake (Reisgewürz) 5 g",
      "Sesamöl 5 ml"
    ],
    steps: [
      "Reis kochen. Eier mit Soja verquirlen.",
      "In der Pfanne zu sehr weichem (aber durchgegartem!) Rührei stocken.",
      "Über den Reis geben, Furikake drüber."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Ei muss fest sein (kein flüssiges Eigelb)",
    swaps: "Furikake ↔ Nori-Schnipsel",
    side: "Miso-Suppe.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Chow Mein 炒面 (mit Hühnchen)",
    desc: "Knusprig gebratene Nudeln mit viel Gemüse und Hühnchenstreifen.",
    story: "Der Lieferdienst-Klassiker, aber gesund. 'Chow' heißt gebraten, 'Mein' heißt Nudel. Das Geheimnis ist, die Nudeln erst kurz knusprig zu braten.",
    target: "≈86 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Chow Mein Nudeln (oder Mie) 150 g",
      "Hähnchenbrust 200 g",
      "Kohl (Weißkohl/Chinakohl) 150 g",
      "Karotte 80 g",
      "Austernsauce 15 ml",
      "Sojasauce 10 ml"
    ],
    steps: [
      "Nudeln kochen, abschrecken. In Pfanne mit Öl kurz knusprig braten, rausnehmen.",
      "Huhn und Gemüse braten. Sauce dazu.",
      "Nudeln zurück, alles schwenken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Huhn durchbraten",
    swaps: "Huhn ↔ Tofu; Austernsauce ↔ Pilzsauce (vegan)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Miso-Butter Lachs 味噌バター鮭 (Reiskocher)",
    desc: "Lachsfilet dämpft auf dem Reis, gewürzt mit Miso und einem Stück Butter.",
    story: "Hokkaido-Style! Im Norden Japans liebt man die Kombi Miso & Butter (wie bei Ramen). Der Reis saugt die Butter auf... ein Traum.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 220 g",
      "Miso-Paste 15 g",
      "Butter 15 g",
      "Mais (TK) 50 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis und Wasser in den Topf. Miso im Wasser auflösen.",
      "Lachs und Mais oben drauf.",
      "Kochen. Am Ende Butter auf den heißen Lachs geben und schmelzen lassen.",
      "Lachs zerteilen und mischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Lachs wird im Dampf gar",
    swaps: "Lachs ↔ Kabeljau",
    side: "Gurkensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Standard", notes: "Butter erst ganz am Ende dazu!" },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Hotteok 호떡 (Herzhafte Pfannkuchen)",
    desc: "Koreanische gefüllte Pfannkuchen, hier mal herzhaft mit Käse & Gemüse statt süß.",
    story: "Eigentlich ein süßer Streetfood-Snack mit Zimt. Aber mit Käse und Gemüse gefüllt ist es ein geniales Frühstück.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Mehl 150 g",
      "Hefe 3 g",
      "Wasser (lauwarm) 100 ml",
      "Mozzarella (gerieben) 50 g",
      "Karotte & Lauch (fein) 50 g",
      "Salz"
    ],
    steps: [
      "Teig kneten, 30 Min gehen lassen.",
      "Kugeln formen, Käse/Gemüse reindrücken, verschließen.",
      "In der Pfanne flachdrücken und goldbraun braten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Käse erhitzt/pasteurisiert",
    swaps: "Mozzarella ↔ Tofu-Crumble",
    side: "Milch oder Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Tenshindon 天津丼 (Omelett auf Reis)",
    desc: "Chinesisch-Japanisches Krabbenomelett auf Reis mit einer süß-sauren Sauce.",
    story: "Benannt nach der Stadt Tianjin, aber eigentlich in Japan erfunden. Fluffiges Ei trifft auf dicke, glänzende Sauce. Comfort Food pur.",
    target: "≈85 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Eier 4 Stück",
      "Surimi oder Flusskrebse (gegart) 80 g",
      "Erbsen 30 g",
      "Essig, Zucker, Soja, Stärke (für Sauce)"
    ],
    steps: [
      "Reis kochen. Sauce aus Essig, Soja, Zucker, Brühe aufkochen und andicken.",
      "Eier mit Krebsfleisch/Erbsen braten (Omelett).",
      "Auf Reis legen, Sauce drüber."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Ei durch, Surimi gegart",
    swaps: "Surimi ↔ Garnelen; Erbsen ↔ Lauch",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Hainan Chicken Rice 海南鸡饭 (Easy Mode)",
    desc: "Das berühmte Hühnchen-Gericht, komplett im Reiskocher zubereitet.",
    story: "Singapurs Nationalgericht. Das Fett des Huhns macht den Reis unglaublich aromatisch. Dazu Ingwer-Dip.",
    target: "≈82 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenkeulen (o. Knochen) 250 g",
      "Ingwer (Scheiben & gerieben) 15 g",
      "Knoblauch 2 Zehen",
      "Hühnerbrühe 200 ml",
      "Gurke 100 g"
    ],
    steps: [
      "Reis, Brühe, Ingwerscheiben, Knoblauch in den Topf.",
      "Huhn (hautseitig) drauflegen.",
      "Kochen. Huhn rausnehmen, schneiden. Reis umrühren.",
      "Dazu Gurkenscheiben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Huhn muss >75°C haben",
    swaps: "Keule ↔ Brust (wird aber trockener)",
    side: "Chilisauce (optional)",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe statt Wasser", notes: "Das Huhn dämpft perfekt im Dampf des Reis." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Dou Jiang & Youtiao 豆浆油条 (mit Toast)",
    desc: "Herzhafte warme Sojamilch-Suppe mit Toast-Streifen (statt Fettgebäck).",
    story: "Das klassische chinesische Frühstück: Sojamilch, die durch Essig leicht ausflockt (wie feiner Quark), dazu Brot. Wir nehmen Toast statt frittiertem Youtiao.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Sojamilch (ungezuckert!) 500 ml",
      "Reisessig 10 ml",
      "Sojasauce 10 ml",
      "Sesamöl, Chiliöl (opt)",
      "Getrocknete Mini-Garnelen (opt) oder Nori",
      "Toastbrot 2 Scheiben"
    ],
    steps: [
      "Sojamilch aufkochen.",
      "In Schale Essig/Soja geben. Heiße Milch drüber gießen (es flockt, das soll so!).",
      "Toast toasten, in Streifen schneiden und dazu dippen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen wenn, dann gegart)",
    swaps: "Toast ↔ Brötchen",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Curry Udon カレーうどん (Mild & Cremig)",
    desc: "Dicke Udon-Nudeln in einer milden Curry-Brühe. Kleckergefahr, aber es lohnt sich!",
    story: "Japanisches Soulfood. Wenn vom Curry-Reis was übrig bleibt, macht man am nächsten Tag Udon draus. Hier machen wir es frisch.",
    target: "≈88 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Udon (vorgegart) 400 g",
      "Curry-Roux (Würfel, mild) 2 Stk",
      "Zwiebel 80 g",
      "Dünnes Schweinefleisch oder Tofu 150 g",
      "Dashi 600 ml",
      "Frühlingszwiebel"
    ],
    steps: [
      "Zwiebel und Fleisch anbraten.",
      "Dashi dazu, aufkochen. Curry-Würfel darin auflösen.",
      "Udon rein, 3 Min köcheln bis die Sauce andickt."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Fleisch durch",
    swaps: "Schwein ↔ Rind oder Tofu",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Char Siu Chicken Rice 叉烧鸡饭 (Reiskocher)",
    desc: "Hähnchen in süß-herzhafter BBQ-Marinade, geschmort im Reiskocher.",
    story: "Char Siu ist eigentlich rotes Schweinefleisch vom Grill. Wir machen die Hühnchen-Version im Reiskocher – klebrig, süß, genial.",
    target: "≈84 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenkeule (o. Knochen) 250 g",
      "Char Siu Sauce (oder: Hoisin + Honig + Soja) 3 EL",
      "Pak Choi 100 g",
      "Wasser"
    ],
    steps: [
      "Huhn marinieren (min. 15 Min).",
      "Reis und Wasser in den Topf.",
      "Huhn inkl. Marinade oben drauf.",
      "Kochen. Pak Choi die letzten 5 Min dämpfen.",
      "Huhn schneiden, Saft über Reis."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Huhn durch",
    swaps: "Char Siu Sauce ↔ Teriyaki Sauce",
    side: "Klare Brühe.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Standard", notes: "Zucker in Marinade kann Boden leicht dunkel machen (karamellisieren)." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Tarako Ochazuke たらこ茶漬け (mit Rogen)",
    desc: "Reis mit grünem Tee übergossen, dazu salziger, durchgebratener Rogen.",
    story: "Ochazuke ist der 'Notfall-Snack' Japans oder Katerfrühstück. Tee über Reis. Klingt komisch, schmeckt himmlisch.",
    target: "≈70 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (gekocht oder Reste) 200 g",
      "Tarako (Kabeljaurogen) oder Lachs 80 g",
      "Grüner Tee (heiß) 400 ml",
      "Nori/Sesam (wenig)"
    ],
    steps: [
      "Tarako/Fisch in der Pfanne gut durchbraten.",
      "Reis in Schale, Fisch drauf.",
      "Heißen Tee drüber gießen. Toppings dazu."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Rogen/Fisch MUSS durchgebraten sein (kein roher Rogen!)",
    swaps: "Rogen ↔ Lachsflocken",
    side: "Pickles.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Bibimbap 비빔밥 (Reiskocher)",
    desc: "Alle Bibimbap-Zutaten garen gleichzeitig mit dem Reis. Easy Cheating.",
    story: "Echtes Bibimbap ist viel Schnippel- und Bratarbeit. Hier werfen wir (fast) alles in den Topf. Nicht authentisch, aber lecker.",
    target: "≈86 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Rinderhack 150 g",
      "Karottenstifte 80 g",
      "Sojasprossen 100 g",
      "Spinat 100 g",
      "Gochujang (als Sauce danach)"
    ],
    steps: [
      "Reis, Hack (roh, zerzupft), Karotten, Sprossen in den Topf. Wasser dazu.",
      "Kochen.",
      "Sofort Spinat unterrühren (gart in Restwärme).",
      "Mit Sesamöl und Paste mischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Hack durchgegart",
    swaps: "Rind ↔ Tofu",
    side: "Spiegelei (gebraten) on top.",
    remind: false,
    riceCooker: { enabled: true, program: "Mixed Rice", water: "Standard", notes: "Hackfleisch gut verteilen." },
  },
  {
    id: "fr-a",
    title: "Sukiyaki すき焼き (Mild Style)",
    desc: "Rindfleisch, Tofu und Gemüse in einer süß-salzigen Soja-Brühe geschmort.",
    story: "Das Festmahl für den Freitagabend. Normalerweise taucht man das Fleisch in rohes Ei – das lassen wir wegen der Schwangerschaft weg!",
    target: "≈65 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Rinderhüfte (hauchdünn) 250 g",
      "Tofu (geflammt oder fest) 200 g",
      "Chinakohl 200 g",
      "Shirataki-Nudeln oder Glasnudeln 100 g",
      "Warishita (Sauce: Soja, Zucker, Mirin)",
      "Reis (Beilage)"
    ],
    steps: [
      "Sauce in Pfanne erhitzen.",
      "Fleisch kurz garen, Gemüse und Tofu dazu.",
      "Köcheln lassen bis alles weich ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Fleisch durch, KEIN rohes Ei als Dip",
    swaps: "Rind ↔ Schwein",
    side: "Reis.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Gilgeori Toast 길거리 토스트 (Korean Street Toast)",
    desc: "Sandwich mit Omelett, Kohl und Karotten, leicht gezuckert.",
    story: "Der Duft koreanischer U-Bahn-Stationen. Ein deftiges Omelett zwischen zwei Toastscheiben, oft mit Ketchup und einer Prise Zucker.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Toastbrot 4 Scheiben",
      "Eier 3 Stück",
      "Weißkohl (fein gehobelt) 100 g",
      "Karotte (geraspelt) 30 g",
      "Butter, Ketchup, Prise Zucker"
    ],
    steps: [
      "Ei mit Gemüse verquirlen, als eckiges Omelett braten (durch!).",
      "Brot in Butter toasten.",
      "Omelett aufs Brot, Ketchup & Zucker drauf, zuklappen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Ei durch",
    swaps: "Kohl ↔ Zwiebeln",
    side: "Kaffee oder Milch.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Ebi Chili エビチリ (Garnelen)",
    desc: "Japanisch-Chinesische Fusion: Garnelen in einer milden, süßlichen Tomatensauce.",
    story: "Ein Gericht, das Chen Kenmin (Iron Chef Vater) in Japan populär machte. Weniger scharf als das Original, sehr fruchtig.",
    target: "≈84 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Garnelen (geschält) 250 g",
      "Ketchup 3 EL",
      "Hühnerbrühe 100 ml",
      "Zwiebel 50 g",
      "Ingwer/Knoblauch",
      "Stärke, Reis 120 g"
    ],
    steps: [
      "Garnelen in Stärke wenden, anbraten.",
      "Zwiebel/Ingwer braten, Ketchup & Brühe dazu.",
      "Einköcheln, Garnelen zurück in die Sauce."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Garnelen durch",
    swaps: "Garnelen ↔ Tofu frittiert",
    side: "Reis.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Seafood Pilaf シーフードピラフ (Reiskocher)",
    desc: "Bunter Reis mit Meeresfrüchtemix und Erbsen, butterweich.",
    story: "Eher westlich angehaucht ('Yoshoku'), aber in Japan sehr beliebt aus dem Reiskocher. Schmeckt wie Paella ohne Aufwand.",
    target: "≈82 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Meeresfrüchte-Mix (TK, Garnelen/Muscheln/Tintenfisch) 200 g",
      "Zwiebel 50 g",
      "Paprika 50 g",
      "Gemüsebrühe 240 ml",
      "Butter 10 g"
    ],
    steps: [
      "Reis und Brühe in den Topf.",
      "Aufgetauten Mix und Gemüsewürfel dazu.",
      "Kochen. Am Ende Butter unterrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Mix muss >75°C erhitzt werden (im Reiskocher kein Problem)",
    swaps: "Mix ↔ Nur Garnelen oder Hühnchen",
    side: "Kleiner Salat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe Standard", notes: "TK-Mix vorher auftauen lassen." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "HK French Toast 西多士 (Light)",
    desc: "French Toast gefüllt mit Erdnussbutter, in Ei gewendet. Wir braten statt frittieren.",
    story: "In HK-Cafés ('Cha Chaan Teng') wird das frittiert. Wir machen die Pfannen-Version. Dekadent, aber Sonntag darf das sein.",
    target: "≈78 g KH (2 P.) · Protein ≈16 g p. P.",
    ingredients: [
      "Toastbrot 4 Scheiben",
      "Erdnussbutter 2 EL",
      "Eier 2 Stück",
      "Milch 20 ml",
      "Ahornsirup oder Kondensmilch"
    ],
    steps: [
      "Sandwich mit Erdnussbutter machen.",
      "In Ei-Milch-Mix tunken.",
      "In der Pfanne goldbraun braten (Ei muss stocken!)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Ei durch",
    swaps: "Erdnussbutter ↔ Marmelade (weniger Protein)",
    side: "Milchtee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Tonkatsu 豚カツ (Ofen)",
    desc: "Paniertes Schweineschnitzel, aber im Ofen gebacken statt frittiert.",
    story: "Jeder liebt Tonkatsu! Um das Fett zu sparen, rösten wir das Panko vorher in der Pfanne an und backen das Fleisch dann im Ofen. Super knusprig!",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Schweineschnitzel 2 Stk",
      "Panko (Paniermehl) 50 g",
      "Mehl, Ei (Panierstraße)",
      "Kohl (fein gehobelt) 200 g",
      "Reis 120 g",
      "Tonkatsu-Sauce"
    ],
    steps: [
      "Panko in Pfanne ohne Öl goldbraun rösten.",
      "Fleisch mehlieren, durchs Ei ziehen, in geröstetes Panko drücken.",
      "Im Ofen bei 200°C ca 15-20 Min backen.",
      "Mit Kohlberg und Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Fleisch durch",
    swaps: "Schwein ↔ Hähnchenbrust",
    side: "Reis & Kohl.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Steamed Egg with Shrimp 虾仁蒸蛋",
    desc: "Seidenweicher Eierstich (Chawanmushi Art) mit Garnelen, im Reiskocher gedämpft.",
    story: "Kann man super über dem reisenden Reis im Dämpfeinsatz machen! 'Tiered Cooking' spart Energie und Zeit.",
    target: "≈82 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Eier 3 Stück",
      "Wasser/Dashi 250 ml",
      "Garnelen 6 Stück",
      "Sojasauce",
      "Frühlingszwiebel"
    ],
    steps: [
      "Reis unten kochen.",
      "Eier mit Dashi verquirlen, in hitzefeste Schale sieben. Garnelen rein.",
      "Schale in den Dämpfeinsatz stellen. Wenn Reis kocht, Einsatz rein (ca. 15-20 Min dämpfen).",
      "Ei muss fest sein."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ Ei stocken lassen",
    swaps: "Garnelen ↔ Surimi oder Pilze",
    side: "Reis (von unten).",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice + Steam", water: "Standard", notes: "Dämpfeinsatz nutzen!" },
  },
];

// -----------------------------------------------------------------------
// Shopping List
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule (o. Knochen)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel (mager)", unitDefault: "g" },
  "Weißer Fisch": { group: "Protein/Fisch/Tofu", label: "Weißer Fisch", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Meeresfrüchte-Mix": { group: "Protein/Fisch/Tofu", label: "Meeresfrüchte-Mix (TK)", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Surimi": { group: "Protein/Fisch/Tofu", label: "Surimi/Flusskrebse", unitDefault: "g" },
  "Tofu fest": { group: "Protein/Fisch/Tofu", label: "Tofu (fest)", unitDefault: "g" },
  "Aburaage": { group: "Protein/Fisch/Tofu", label: "Aburaage (Fritt. Tofu)", unitDefault: "Stk" },
  "Inari-Age": { group: "Protein/Fisch/Tofu", label: "Inari-Age (Tofutaschen)", unitDefault: "Stk" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Mozzarella": { group: "Protein/Fisch/Tofu", label: "Mozzarella (gerieben)", unitDefault: "g" },

  // Gemüse
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Kohl": { group: "Gemüse/Pilze", label: "Weißkohl/Chinakohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Sojasprossen": { group: "Gemüse/Pilze", label: "Sojasprossen", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten", unitDefault: "Stück" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate (groß)", unitDefault: "Stück" },
  "Mais": { group: "Gemüse/Pilze", label: "Mais (TK)", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Birne": { group: "Gemüse/Pilze", label: "Birne", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh)", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba-Nudeln", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Chow Mein Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Chow Mein / Mie", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "g" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot", unitDefault: "Scheiben" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "ml" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "ml" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "ml" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "ml" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi/Fischbrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Sesam": { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "g" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Sojamilch": { group: "Algen/Brühen/Würze", label: "Sojamilch (ungezuckert)", unitDefault: "ml" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig", unitDefault: "g" },
  "Backpulver": { group: "Algen/Brühen/Würze", label: "Backpulver", unitDefault: "TL" },
  "Hefe": { group: "Algen/Brühen/Würze", label: "Trockenhefe", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Erdnussbutter": { group: "Algen/Brühen/Würze", label: "Erdnussbutter", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "g" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "g" },
  "Furikake": { group: "Algen/Brühen/Würze", label: "Furikake", unitDefault: "g" },
  "Char Siu Sauce": { group: "Algen/Brühen/Würze", label: "Char Siu/Hoisin", unitDefault: "EL" },
  "Tonkatsu-Sauce": { group: "Algen/Brühen/Würze", label: "Tonkatsu-Sauce", unitDefault: "EL" },
  "Curry-Roux": { group: "Algen/Brühen/Würze", label: "Curry-Roux", unitDefault: "Stk" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Zehe|Prise|Stangen|Scheiben|TL|EL|Stk)?/);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.includes(k));
      if (!key) {
        if (name.includes("Reis (roh)")) key = "Reis";
        else if (name.includes("Udon")) key = "Udon";
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
  // Fix: Encode SVG properly to avoid breaking with special characters
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw5" }) {
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><button onClick={() => toggleBookmark({ planSlug: meta.id, recipeId: meal.id, recipeTitle: meal.title, planTitle: meta.title })} style={{ background: bookmarked ? "var(--accent, #e07a9a)" : "transparent", border: "1px solid var(--border, rgba(0,0,0,.1))", borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", color: bookmarked ? "#fff" : "var(--text, #111827)" }} title={bookmarked ? "Bookmark entfernen" : "Bookmark setzen"}>{bookmarked ? "★" : "☆"}</button><h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3></div>
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
            Woche 5 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>JP/CN/KR · Balanced · Schwangerschaftssicher · 1× Reiskocher/Tag</p>
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

// ---- RiceCooker Section (Fix: Safety Check) ----
function RiceCookerSection({ data }) {
  const perDay = useMemo(() => {
    const map = { mo: null, di: null, mi: null, do: null, fr: null, sa: null, so: null };
    if (!data) return map; // Safety check
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Trends dabei: Kinoko Gohan, Miso-Butter-Lachs, Hainan Chicken, Char Siu Chicken, Bibimbap, Seafood Pilaf, Gedämpftes Ei.</p>
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
export default function Woche5DE() {
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

  // Styles (Identical to Week 4)
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
            {tagChip("Woche 5")}
            {tagChip("CN/JP/KR · Balanced · Schwangerschaft")}
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
            {/* Hier die korrekte Reiskocher-Sektion */}
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