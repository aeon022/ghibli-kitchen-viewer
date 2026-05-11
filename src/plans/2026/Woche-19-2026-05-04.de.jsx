// src/plans/2026/Woche-19-2026-05-04.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 19 (Start: 2026-05-04)
  Status: KOMPLETT & FUNKTIONSFÄHIG (Alle 21 Rezepte)
  Fokus: Neue Virale Airfryer-Hacks, Reiskocher-Magie, CN/JP/KR + EU Crossover.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 19",
  startDate: "2026-05-04",
  id: "woche-19-2026-05-04",
  lang: "de",
  sidebar: "Woche 19 (2026-05-04)",
};

const FILE_BASE = "Woche 19 2026-05-04";

const UI_TITLES = {
  main: "Rezepte Woche 19",
  list: "Einkaufsliste Woche 19",
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

const viralChip = () => (
  <span className="ghk-chip" key="viral" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "linear-gradient(135deg, #ff7e5f, #feb47b)", color: "#fff", fontWeight: "bold", border: "none", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    🔥 Viral Trend
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-05-04)",
  di: "Dienstag (2026-05-05)",
  mi: "Mittwoch (2026-05-06)",
  do: "Donnerstag (2026-05-07)",
  fr: "Freitag (2026-05-08)",
  sa: "Samstag (2026-05-09)",
  so: "Sonntag (2026-05-10)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Chili Oil Fried Eggs 🌶️🍳",
    isViral: true,
    desc: "Spiegeleier, die direkt in mildem Chili-Öl knusprig gebraten werden.",
    story: "Ein weltweiter Food-Trend! Das Chili-Öl (Lao Gan Ma oder ähnlich) röstet das Eiweiß extrem knusprig und verleiht ihm eine fantastische, tiefrote Farbe. Serviert auf cremigem Avocado-Toast.",
    target: "≈50 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Eier 4 Stück",
      "Mildes Chili-Öl (Crispy Chili Oil) 1 EL",
      "Avocado (reif) 1 Stück",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Chili-Öl in einer Pfanne bei mittlerer Hitze erwärmen.",
      "Die Eier direkt in das Öl schlagen.",
      "Deckel auflegen und braten, bis das Eiweiß und Eigelb GANZ durchgestockt sind.",
      "Avocado auf den getoasteten Broten zerdrücken, Eier darauflegen und mit Frühlingszwiebeln toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eigelb muss komplett fest sein) · Diabetes ✓",
    swaps: "Avocado ↔ Frischkäse",
    side: "Kaffee oder Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Crushed Cucumber & Airfryer Tofu 拍黄瓜",
    desc: "Zerschlagene asiatische Gurken mit extrem knusprigem Tofu aus dem Airfryer.",
    story: "Gurken zu zerschlagen (statt zu schneiden) öffnet ihre Struktur, sodass sie die Soja-Knoblauch-Sauce förmlich aufsaugen. Der Tofu aus dem Airfryer bringt den nötigen Crunch.",
    target: "≈65 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Fester Tofu 300 g",
      "Maisstärke 2 EL",
      "Salatgurke 1 große",
      "Knoblauch 2 Zehen",
      "Sojasauce 2 EL & Reisessig 1 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Tofu würfeln, in Maisstärke wenden und im Airfryer bei 200°C ca. 15 Min knusprig backen.",
      "Gurke mit einem schweren Messer oder Nudelholz flachklopfen und in Stücke schneiden.",
      "Knoblauch fein hacken, mit Sojasauce, Essig und einem Spritzer Sesamöl mischen. Gurken darin marinieren.",
      "Knusprigen Tofu unterheben und sofort mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Tofu ↔ Hähnchenbrust-Würfel",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Risi e Bisi (Erbsen-Schinken-Reis)",
    desc: "Der italienische Frühlingsklassiker, schonend im Reiskocher zubereitet.",
    story: "'Risi e Bisi' ist in Venedig Kult. Es ist eine Mischung aus Suppe und Risotto. Im Reiskocher wird es zum perfekten, stressfreien Feierabendgericht.",
    target: "≈80 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Risottoreis oder Rundkornreis 120 g",
      "Erbsen (TK) 150 g",
      "Kochschinken (gewürfelt) 100 g",
      "Gemüsebrühe 300 ml",
      "Parmesan (pasteurisiert) 30 g",
      "Butter 10 g"
    ],
    steps: [
      "Reis, Brühe und Schinken in den Reiskocher geben. Starten.",
      "In den letzten 5 Minuten die aufgetauten Erbsen dazugeben (dann bleiben sie grün).",
      "Nach dem Kochen Parmesan und Butter kräftig unterrühren, bis es schlotzig ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert, Schinken erhitzt)",
    swaps: "Kochschinken ↔ Speckwürfel",
    side: "Ein Tomatensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (etwas mehr für Risotto-Textur)", notes: "Soll am Ende sehr cremig sein." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Matcha Chia Pudding 抹茶チア",
    desc: "Cremiger Chia-Pudding mit Haferflocken und herb-frischem Matcha.",
    story: "Ein großartiges Meal-Prep-Frühstück. Der Chia-Pudding quillt über Nacht auf und bekommt durch den grünen Tee eine wunderbare Farbe und Antioxidantien.",
    target: "≈60 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Chia-Samen 4 EL",
      "Haferflocken 40 g",
      "Milch (oder Pflanzenmilch) 300 ml",
      "Matcha-Pulver 1 TL",
      "Agavendicksaft 1 EL",
      "Beeren (frisch oder TK) 50 g"
    ],
    steps: [
      "Matcha-Pulver in einem Schluck warmem Wasser klümpchenfrei auflösen.",
      "Chia-Samen, Haferflocken, Milch, Agave und Matcha gut verrühren.",
      "Mindestens 30 Minuten (oder über Nacht) quellen lassen.",
      "Mit Beeren toppen."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Chia und Hafer sind extrem blutzuckerfreundlich) · Schwangerschaft ✓",
    swaps: "Matcha ↔ Kakaopulver",
    side: "Eine Tasse heißes Wasser mit Zitrone.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Airfryer Lachsfrikadellen (Laxbiffar)",
    desc: "Schnelle schwedische Lachsfrikadellen mit Dill, fettarm gebacken.",
    story: "In Skandinavien liebt man Fischfrikadellen. Wir machen sie aus Lachsresten oder Dosenlachs, binden sie mit Semmelbröseln und garen sie im Airfryer rundum knusprig.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Lachs (Dose oder frisch gehackt) 200 g",
      "Ei 1 Stück",
      "Paniermehl 30 g",
      "Dill (frisch) 1 EL",
      "Kartoffeln 300 g",
      "Quark-Dip (Magerquark & Zitrone) 2 EL"
    ],
    steps: [
      "Lachs mit Ei, Paniermehl und Dill mischen, kleine Frikadellen formen.",
      "Im Airfryer bei 180°C ca. 12 Minuten backen, bis sie komplett durchgegart und leicht knusprig sind.",
      "Kartoffeln kochen.",
      "Frikadellen mit Kartoffeln und Zitronen-Quark-Dip servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Frikadellen GANZ durchgaren)",
    swaps: "Lachs ↔ Thunfisch (Dose)",
    side: "Ein paar Erbsen.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Kürbis-Kokos-Reis 南瓜椰香饭 (Reiskocher)",
    desc: "Cremiger Reis mit Hokkaido-Kürbis und Hähnchen, gedämpft in Kokosmilch.",
    story: "Ein Crossover, das wärmt und tröstet. Die Kokosmilch macht den Reis unfassbar cremig, der Kürbis zerfällt von allein und hüllt alles in ein zartes Orange.",
    target: "≈82 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (gewürfelt) 200 g",
      "Kürbis (Hokkaido, gewürfelt) 150 g",
      "Kokosmilch (fettreduziert) 150 ml",
      "Gemüsebrühe 100 ml",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Hähnchenwürfel kurz in Sojasauce wenden.",
      "Reis, Kokosmilch und Brühe in den Reiskocher füllen.",
      "Hähnchen und Kürbiswürfel oben auflegen. Start drücken.",
      "Nach dem Kochen alles gründlich durchmischen, sodass der Kürbis musig wird."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn gart im Topf sicher durch) · Diabetes ✓",
    swaps: "Hähnchen ↔ Kichererbsen",
    side: "Ein Spritzer Limettensaft.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Kokosmilch + Brühe (Standardmenge)", notes: "Kürbis gibt Feuchtigkeit ab." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Reispapier-Frühlingszwiebel-Pfannkuchen (Airfryer)",
    isViral: true,
    desc: "Die geniale Shortcut-Version der chinesischen Scallion Pancakes (Cong You Bing).",
    story: "Teig kneten dauert ewig. TikTok hat die Lösung: Mehrere Schichten nasses Reispapier, dazwischen Frühlingszwiebeln und ein verquirltes Ei. Im Airfryer backt das extrem blättrig und knusprig auf!",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reispapier 6 Blatt",
      "Eier 2 Stück",
      "Frühlingszwiebeln 30 g",
      "Sojasauce & Sesamöl (je 1 TL)",
      "Vollkorn-Toast (als Beilage) 2 Scheiben"
    ],
    steps: [
      "Eier mit Soja, Sesamöl und Frühlingszwiebeln verquirlen.",
      "Ein Blatt Reispapier in warmes Wasser tauchen, auf einen Teller legen. Etwas Eimasse verstreichen. Nächstes Blatt darauflegen. (3 Schichten pro Pfannkuchen).",
      "Im Airfryer (leicht ölen!) bei 190°C ca. 8-10 Min backen, bis das Ei im Inneren GANZ durchgestockt und das Papier kross ist.",
      "In Ecken schneiden, mit Toast servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eimasse komplett durchbacken)",
    swaps: "Reispapier ↔ Vollkorn-Tortillas",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Dan Dan Nudeln (Mild) 担担面",
    desc: "Sichuan-Klassiker: Weizennudeln in einer cremigen Sesam-Soja-Sauce mit gebratenem Hähnchenhack.",
    story: "Normalerweise schwimmt dieses Gericht in Chili-Öl. Wir fokussieren uns auf die reichhaltige Tahini-Sauce und nutzen mageres Hühnerhack für ein leichtes, grandioses Mittagessen.",
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
      "Hackfleisch und Knoblauch im Wok krümelig und KOMPLETT durchbraten.",
      "Tahini, Sojasauce und etwas warmes Nudelwasser zu einer dicken Sauce rühren.",
      "Nudeln und Pak Choi kochen.",
      "Nudeln in die Sauce geben, Hackfleisch darüber häufen, gut umrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hähnchenhack komplett durchbraten!)",
    swaps: "Hähnchenhack ↔ Schweinehack",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Gyudon-Style Rindfleisch-Reis 牛丼 (Reiskocher)",
    desc: "Hauchdünnes Rindfleisch und weiche Zwiebeln dämpfen direkt auf dem Reis.",
    story: "Ein japanischer Fast-Food-Klassiker, adaptiert für den Reiskocher. Das Fleisch bleibt zart, der Reis saugt die süß-salzige Marinade komplett auf.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Rindfleisch (hauchdünne Hotpot-Scheiben) 150 g",
      "Zwiebel (in Ringen) 1 Stück",
      "Sojasauce 2 EL",
      "Mirin 1 EL",
      "Dashi oder Brühe 240 ml"
    ],
    steps: [
      "Reis und Brühe in den Topf geben. Soja und Mirin einrühren.",
      "Zwiebelringe und das Rindfleisch locker (!) darauf verteilen. Das Fleisch etwas auffächern, nicht klumpen.",
      "Start drücken. Danach alles gründlich durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch gart im Topf >80°C komplett durch) · Diabetes ✓",
    swaps: "Rindfleisch ↔ Schweinefleisch (dünn geschnitten)",
    side: "Eingelegter Ingwer.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi (Standard)", notes: "Zwiebeln werden herrlich süß." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Schwedischer Blaubeer-Grießbrei (Blåbärsgröt)",
    desc: "Cremiger Weichweizengrieß, lila gefärbt durch wilde Blaubeeren.",
    story: "Ein wunderschönes, wärmendes Frühstück. Die Beeren kochen direkt im Brei mit auf, was ihn unglaublich fruchtig und farbenfroh macht.",
    target: "≈70 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Weichweizengrieß 60 g",
      "Milch 500 ml",
      "Blaubeeren (TK) 100 g",
      "Agavendicksaft 1 EL",
      "Mandeln (gehackt) 20 g"
    ],
    steps: [
      "Milch mit den gefrorenen Blaubeeren in einem Topf erhitzen, bis die Milch lila wird.",
      "Grieß unter ständigem Rühren einrieseln lassen.",
      "Bei schwacher Hitze ca. 3-5 Min quellen lassen, bis er dicklich ist.",
      "Mit Agavendicksaft süßen und mit Mandeln bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (TK-Beeren gut mitkochen lassen)",
    swaps: "Grieß ↔ Haferflocken",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Viral Accordion Potatoes (Airfryer) 🥔",
    isViral: true,
    desc: "Kartoffeln, so eingeschnitten, dass sie sich wie eine Ziehharmonika aufziehen, gebacken im Airfryer.",
    story: "Ein unfassbar befriedigender Snack! Durch die spezielle Schnitttechnik wird die Kartoffel im Airfryer von allen Seiten gleichzeitig knusprig. Dazu ein proteinreicher Quark-Dip.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Kartoffeln (groß) 300 g",
      "Olivenöl 1 EL",
      "Paprikapulver & Knoblauchpulver",
      "Magerquark 150 g",
      "Kräuter (Schnittlauch/Petersilie)",
      "Holzspieße (als Schneidehilfe)"
    ],
    steps: [
      "Kartoffeln schälen und in dicke Rechtecke schneiden. Zwischen zwei Essstäbchen legen und horizontal einschneiden (die Stäbchen verhindern das Durchschneiden!). Wenden und diagonal einschneiden.",
      "Ziehharmonika-Kartoffeln auseinanderziehen, ölen und würzen.",
      "Im Airfryer bei 190°C ca. 15-20 Min extrem knusprig backen.",
      "Quark mit Kräutern anrühren und die Kartoffeln dippen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Kartoffeln ↔ Süßkartoffeln",
    side: "Ein grüner Beilagensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Sekihan (Rote Bohnen Reis) 赤飯 (Reiskocher)",
    desc: "Japanischer Festtagsreis mit Adzukibohnen und zartem Schweinegeschnetzeltem.",
    story: "Sekihan wird in Japan zu Feiertagen gegessen. Die Bohnen färben den Reis leicht rötlich. Wir machen ein komplettes Gericht daraus, indem wir Schweinefleisch mitdämpfen.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Adzukibohnen (Dose, gespült) 80 g",
      "Schweinegeschnetzeltes 150 g",
      "Sojasauce 2 EL",
      "Sesam (schwarz) 1 TL",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Fleisch kurz in Sojasauce wenden.",
      "Reis, Brühe, Bohnen und Fleisch in den Reiskocher füllen.",
      "Start drücken.",
      "Nach dem Kochen alles vorsichtig durchheben und mit schwarzem Sesam bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch dampft sicher durch) · Diabetes ✓",
    swaps: "Schweinefleisch ↔ Hähnchenbrust",
    side: "Ein Stück frische Gurke.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Bohnen drosseln den Blutzuckeranstieg." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Savory Miso Oatmeal mit Spinat 味噌オートミール",
    desc: "Ein herzhafter Haferbrei, verfeinert mit Umami-Miso, Spinat und einem hartgekochten Ei.",
    story: "Wer Miso-Suppe liebt, wird dieses Oatmeal vergöttern. Es ist warm, wohlig und extrem schnell gemacht. Der Spinat fällt in der Restwärme herrlich zusammen.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Wasser oder Gemüsebrühe 400 ml",
      "Miso-Paste 1 EL",
      "Spinat (frisch) 50 g",
      "Eier (hartgekocht) 2 Stück"
    ],
    steps: [
      "Haferflocken in Brühe einköcheln.",
      "In der letzten Minute den Spinat unterheben, bis er zusammenfällt.",
      "Vom Herd nehmen! Miso-Paste einrühren (darf nicht mehr kochen).",
      "Mit halbierten, hartgekochten Eiern servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier hartgekocht)",
    swaps: "Spinat ↔ Frühlingszwiebeln",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Peanut-Butter Udon ピーナッツバターうどん",
    desc: "Dicke Udon-Nudeln in einer warmen, ultra-cremigen Erdnusssauce mit Hähnchen.",
    story: "Ein asiatischer Comfort-Food-Klassiker, der blitzschnell im Wok geht. Die Erdnussbutter emulgiert mit dem Nudelwasser zu einer Sauce, die jede Ramen-Bar neidisch macht.",
    target: "≈85 g KH (2 P.) · Protein ≈26 g p. P.",
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
    id: "fr-a",
    title: "Lachs-Teriyaki Reis 鮭の照り焼きご飯 (Reiskocher)",
    desc: "Lachsfilet gart im Reiskocher über dem Reis, glasiert mit milder Teriyakisauce.",
    story: "Warum Fisch separat in der Pfanne braten, wenn der Reiskocher ihn butterweich dämpft? Der Saft zieht direkt in die Reiskörner ein. Ein absoluter Gamechanger.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Teriyaki-Sauce (mild) 3 EL",
      "Brokkoli-Röschen 100 g",
      "Wasser",
      "Sesam 1 TL"
    ],
    steps: [
      "Reis waschen und mit Wasser in den Reiskocher füllen.",
      "Lachs auf den Reis legen, mit Teriyaki-Sauce bepinseln.",
      "Start drücken. Brokkoli in den letzten 10 Min in den Dämpfaufsatz geben (oder roh auf den Lachs legen).",
      "Lachs zerteilen, alles mischen und mit Sesam toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart im Dampf >80°C sicher durch)",
    swaps: "Lachs ↔ Kabeljau",
    side: "Brokkoli (aus dem Topf).",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Lachs bleibt extrem saftig." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Airfryer Baked Oats (Apfel-Zimt) 🍏",
    desc: "Wie ein kleiner Kuchen zum Frühstück. Haferflocken, Apfel und Zimt aus dem Airfryer.",
    story: "Ein riesiger Internet-Trend! Haferflocken werden mit etwas Milch und Backpulver vermischt und gebacken. Außen knusprig, innen wie ein warmer Muffin.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch 150 ml",
      "Apfel (gewürfelt) 1 Stück",
      "Eier 2 Stück",
      "Backpulver 1 TL",
      "Zimt 1 TL"
    ],
    steps: [
      "Alle Zutaten in einer Schüssel gut verrühren.",
      "In eine kleine, ofenfeste (bzw. airfryer-geeignete) Form füllen.",
      "Im Airfryer bei 170°C für ca. 12-15 Minuten backen, bis es aufgeht und durchgestockt ist."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Komplexe KH) · Schwangerschaft ✓ (Eier komplett durchgebacken)",
    swaps: "Apfel ↔ Banane",
    side: "Ein Klecks Naturjoghurt.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Mildes Pad Krapow (Thai Basilikum Hähnchen)",
    desc: "Der thailändische Streetfood-König. Hähnchenhack gebraten mit viel Basilikum und Sojasauce.",
    story: "Im Original extrem scharf. Wir machen eine milde, familientaugliche Version. Das Hähnchenhack saugt die Sauce auf, der frische Basilikum gibt den genialen Kick.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Hähnchenhack 200 g",
      "Basilikum (frisch, am besten Thai-Basilikum) 1 große Handvoll",
      "Sojasauce 2 EL",
      "Austernsauce 1 EL",
      "Knoblauch 2 Zehen",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Hähnchenhack mit Knoblauch im Wok krümelig und KOMPLETT durchbraten.",
      "Sojasauce und Austernsauce dazugeben, kurz einkochen lassen.",
      "Pfanne vom Herd nehmen, den frischen Basilikum unterheben, bis er zusammenfällt.",
      "Mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hack komplett durchgegart!)",
    swaps: "Hähnchenhack ↔ Schweinehack",
    side: "Ein komplett durchgebratenes Spiegelei on top.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
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
    swaps: "Schinken ↔ Räuchertofu",
    side: "Ein grüner Salat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (etwas weniger wg. Tomate)", notes: "Tomate am Ende gut vermantschen." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Fluffiges Soufflé-Omelett 계란말이",
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
    title: "Airfryer Cevapcici Bowl (Kroatien)",
    desc: "Balkan-Flair am Mittag: Fettarm gebackene Hackröllchen mit Ajvar und Nudeln.",
    story: "Cevapcici sind in Kroatien Kult. Im Airfryer werden sie rundum perfekt gebräunt, und das überschüssige Fett tropft ab. Mit Ajvar-Nudeln ein echter Genuss.",
    target: "≈85 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Rinderhack (mager, oder fertige Cevapcici) 200 g",
      "Knoblauchpulver, Paprika, Salz",
      "Nudeln (gekocht) 200 g",
      "Ajvar (mild) 3 EL",
      "Zwiebel (in feinen Ringen) 50 g"
    ],
    steps: [
      "Hackfleisch kräftig würzen und zu kleinen, länglichen Röllchen formen.",
      "Im Airfryer bei 190°C ca. 12 Minuten backen (komplett durchgaren!).",
      "Nudeln mit Ajvar in einer Pfanne kurz erwärmen.",
      "Nudeln in einer Bowl anrichten, Cevapcici darauflegen, mit Zwiebelringen toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hackfleisch gut durchgaren!)",
    swaps: "Nudeln ↔ Reis",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
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
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Schweinebauch": { group: "Protein/Fisch/Tofu", label: "Schweinebauch", unitDefault: "g" },
  "Schweinegulasch": { group: "Protein/Fisch/Tofu", label: "Schweinegulasch/Schulter", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack (mager)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch (Streifen/Scheiben)", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Hähnchenhack": { group: "Protein/Fisch/Tofu", label: "Hähnchenhack", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Lachs": { group: "Protein/Fisch/Tofu", label: "Lachs", unitDefault: "g" },
  "Cevapcici": { group: "Protein/Fisch/Tofu", label: "Cevapcici", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Räucherwurst": { group: "Protein/Fisch/Tofu", label: "Räucherwurst/Cabanossi", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda / Käse", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark (Magerstufe)", unitDefault: "g" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke/Salatgurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake (getrocknet)", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Lauch": { group: "Gemüse/Pilze", label: "Lauch", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "ml" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis", unitDefault: "g" },
  "Avocado": { group: "Gemüse/Pilze", label: "Avocado", unitDefault: "Stück" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Kartoffeln": { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  "Blaubeeren": { group: "Gemüse/Pilze", label: "Blaubeeren", unitDefault: "g" },
  "Basilikum": { group: "Gemüse/Pilze", label: "Basilikum (frisch)", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Nudeln", unitDefault: "g" },
  "Süßkartoffel-Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot / Vollkorn", unitDefault: "Scheiben" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Kartoffelrösti": { group: "Reis/Nudeln/Sättigung", label: "Kartoffelrösti (TK)", unitDefault: "Stück" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Weichweizengrieß": { group: "Reis/Nudeln/Sättigung", label: "Grieß", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko/Paniermehl", unitDefault: "g" },
  "Adzukibohnen": { group: "Reis/Nudeln/Sättigung", label: "Adzukibohnen", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Kokosmilch": { group: "Algen/Brühen/Würze", label: "Kokosmilch", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Chili-Öl": { group: "Algen/Brühen/Würze", label: "Crispy Chili Oil", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Sriracha": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)", unitDefault: "TL" },
  "Ajvar": { group: "Algen/Brühen/Würze", label: "Ajvar", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Schwarze Bohnensauce": { group: "Algen/Brühen/Würze", label: "Schwarze Bohnensauce", unitDefault: "EL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Erdnussbutter": { group: "Algen/Brühen/Würze", label: "Erdnussbutter", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Agave", unitDefault: "EL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Kardamom": { group: "Algen/Brühen/Würze", label: "Kardamom", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Currypulver": { group: "Algen/Brühen/Würze", label: "Currypulver", unitDefault: "TL" },
  "Sternanis": { group: "Algen/Brühen/Würze", label: "Sternanis", unitDefault: "Stück" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Mandeln": { group: "Algen/Brühen/Würze", label: "Mandeln", unitDefault: "g" },
  "Sesam": { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "TL" },
  "Chia-Samen": { group: "Algen/Brühen/Würze", label: "Chia-Samen", unitDefault: "EL" },
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw19" }) {
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
            Woche 19 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Risi e Bisi, Gyudon, Kürbis-Kokos-Reis und mehr!</p>
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
export default function Woche19DE() {
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
            {tagChip("Woche 19")}
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