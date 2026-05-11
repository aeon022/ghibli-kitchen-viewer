// src/plans/2026/Woche-18-2026-04-27.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – Woche 18 (Start: 2026-04-27)
  Status: KOMPLETT & FUNKTIONSFÄHIG (Alle 21 Rezepte)
  Fokus: Virale Airfryer-Hacks, Reiskocher-Magie, CN/JP/KR + EU Crossover.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 18",
  startDate: "2026-04-27",
  id: "woche-18-2026-04-27",
  lang: "de",
  sidebar: "Woche 18 (2026-04-27)",
};

const FILE_BASE = "Woche 18 2026-04-27";

const UI_TITLES = {
  main: "Rezepte Woche 18",
  list: "Einkaufsliste Woche 18",
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
  mo: "Montag (2026-04-27)",
  di: "Dienstag (2026-04-28)",
  mi: "Mittwoch (2026-04-29)",
  do: "Donnerstag (2026-04-30)",
  fr: "Freitag (2026-05-01)",
  sa: "Samstag (2026-05-02)",
  so: "Sonntag (2026-05-03)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Viral Grated Apple Toast 🍎",
    isViral: true,
    desc: "Geriebener Apfel mit Zimt auf einem Toast, im Airfryer knusprig gebacken.",
    story: "Ein grandioser Frühstücks-Trend. Durch das Reiben karamellisiert der Apfel im Airfryer fast wie eine schnelle Apfeltarte. Mit etwas Magerquark ein hervorragender Start in den Tag.",
    target: "≈65 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Apfel 1 Stück",
      "Zimt 1 TL",
      "Quark (Magerstufe) 4 EL",
      "Agavendicksaft 1 TL"
    ],
    steps: [
      "Apfel schälen und grob reiben. Mit Zimt und etwas Agavendicksaft mischen.",
      "Toastscheiben mit Magerquark bestreichen, die Apfelmasse darauf verteilen.",
      "Im Airfryer bei 180°C ca. 7-9 Min backen, bis der Apfel weich ist und duftet."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Komplexe KH & Ballaststoffe) · Schwangerschaft ✓",
    swaps: "Quark ↔ Frischkäse",
    side: "Kaffee oder Kräutertee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Beef Bulgogi Udon 불고기 우동",
    desc: "Dicke Udon-Nudeln im Wok gebraten mit süß-würzigem Rindfleisch und Karotten.",
    story: "Koreanisches Bulgogi-Rindfleisch ist weltberühmt. Zusammen mit japanischen Udon-Nudeln entsteht eine Textur, die absolut fantastisch ist und blitzschnell auf dem Teller steht.",
    target: "≈85 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Udon-Nudeln (vorgegart) 400 g",
      "Rindfleisch (sehr feine Streifen) 200 g",
      "Karotte (in dünnen Stiften) 100 g",
      "Sojasauce 3 EL",
      "Agavendicksaft 1 EL",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Rindfleisch mit Sojasauce, Agave und Knoblauch kurz marinieren.",
      "Im heißen Wok scharf anbraten (komplett durchgaren!). Karottenstifte dazugeben.",
      "Die vorgegarten Udon-Nudeln (vorher kurz heiß abspülen) in den Wok geben.",
      "Alles 3 Minuten pfannenrühren, bis die Nudeln die Sauce aufsaugen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Rindfleisch GANZ durchbraten) · Diabetes ✓",
    swaps: "Rindfleisch ↔ Schweinegeschnetzeltes",
    side: "Ein paar Frühlingszwiebelringe.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Sausage & Shiitake Rice 香菇腊肠焖饭 (Reiskocher)",
    desc: "Ein tief-aromatischer Reistopf mit Räucherwurst und getrockneten Pilzen.",
    story: "Ein Klassiker aus der südchinesischen Küche. Die getrockneten Pilze bringen ein extremes Umami, während die Wurst ihr Aroma an den Reis abgibt. Ein geniales One-Pot-Gericht.",
    target: "≈80 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Räucherwurst (Cabanossi) 100 g",
      "Shiitake-Pilze (getrocknet) 20 g",
      "Sojasauce 2 EL",
      "Gemüsebrühe 240 ml",
      "Pak Choi 150 g"
    ],
    steps: [
      "Shiitake-Pilze in heißem Wasser 15 Min einweichen, dann in Streifen schneiden (Pilzwasser aufheben!).",
      "Wurst in Scheiben schneiden. Reis, Brühe, Sojasauce, Pilze und Wurst in den Reiskocher.",
      "Start drücken. In den letzten 5 Minuten den Pak Choi in den Dämpfaufsatz legen.",
      "Nach dem Kochen alles mischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Wurst dampft sicher auf >80°C durch)",
    swaps: "Räucherwurst ↔ Gebratener Tofu",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe + Pilzwasser (Standard)", notes: "Pilzwasser bringt extrem viel Geschmack." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Spinat-Feta Omelett Wrap",
    desc: "Ein Vollkorn-Wrap, direkt in der Pfanne mit einem Spinat-Omelett verbunden.",
    story: "Ein großartiger Hack, um Rührei ohne Kleckern mitzunehmen oder warm zu genießen. Der Wrap verbindet sich beim Braten fest mit dem Ei.",
    target: "≈60 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Vollkorn-Tortillas 2 Stück",
      "Eier 4 Stück",
      "Spinat (frisch) 50 g",
      "Feta (pasteurisiert) 50 g",
      "Tomaten (gewürfelt) 50 g"
    ],
    steps: [
      "Eier in einer Schüssel mit Spinat, Feta und Tomaten verquirlen.",
      "Die Hälfte der Eimasse in eine geölte Pfanne geben. Sofort einen Wrap darauflegen und andrücken.",
      "Braten, bis das Ei vollständig gestockt ist (Deckel hilft!). Wenden und die andere Seite kurz anrösten.",
      "Aus der Pfanne nehmen, rollen und halbieren. Mit dem zweiten Wrap wiederholen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durchgebraten, Käse pasteurisiert)",
    swaps: "Feta ↔ Gouda",
    side: "Ein Glas Orangensaft.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Airfryer Tofu Katsu 豆腐カツ",
    desc: "Außen kross, innen weich. Panko-panierter Tofu, fettarm im Airfryer gebacken.",
    story: "Tonkatsu (Schweineschnitzel) ist großartig, aber Tofu Katsu ist eine geniale vegetarische Alternative. Das Panko sorgt im Airfryer für den legendären Crunch.",
    target: "≈85 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Fester Tofu 300 g",
      "Panko (Paniermehl) 50 g",
      "Mehl & Ei (für die Panierstraße)",
      "Tonkatsu-Sauce 3 EL",
      "Reis (gekocht) 150 g",
      "Weißkohl (sehr fein gehobelt) 100 g"
    ],
    steps: [
      "Tofu in ca. 1,5 cm dicke Scheiben schneiden. Abtupfen.",
      "In Mehl, Ei und Panko wenden. Mit etwas Öl besprühen.",
      "Im Airfryer bei 200°C ca. 15 Min backen, bis er goldbraun ist.",
      "Tofu in Streifen schneiden. Auf einem Berg Weißkohl mit Reis servieren, kräftig mit Sauce beträufeln."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei in der Panade gart komplett durch)",
    swaps: "Tofu ↔ Hähnchenbrust",
    side: "Roher Weißkohl (sehr fein!).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Whole Tomato & Egg Rice 番茄鸡蛋焖饭 (Reiskocher)",
    isViral: true,
    desc: "Der asiatische 'Whole Tomato' Trend kombiniert mit Ei und Reis.",
    story: "Die Tomate schmilzt und bildet eine natürliche süß-saure Sauce. Das Ei stockt sanft in der Hitze. Eine geniale Reiskocher-Variation des Pfannenklassikers.",
    target: "≈82 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Tomate (groß) 1 Stück",
      "Eier 3 Stück",
      "Sojasauce 2 EL",
      "Gemüsebrühe 240 ml",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis, Brühe und Sojasauce in den Topf geben.",
      "Tomate kreuzweise tief einschneiden, in die Mitte setzen. Start drücken.",
      "Ca. 8 Min vor Ende (wenn das Wasser fast verdampft ist), die leicht verquirlten Eier über den Reis gießen.",
      "Nach dem Kochen die Tomate zerdrücken, Eier grob zerteilen und alles vermengen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier dämpfen komplett durch) · Diabetes ✓",
    swaps: "Eier ↔ Hähnchenwürfel (von Anfang an mitgaren)",
    side: "Ein Schälchen Kimchi (mild).",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (etwas weniger wg. Tomate)", notes: "Tomate gut zerdrücken." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Ingwer-Hack-Congee 姜丝肉末粥 (Reiskocher)",
    desc: "Ein extrem feiner, milder Reisbrei mit magerem Schweinehack. Perfekt für den Magen.",
    story: "In China ist Congee das Frühstück der Champions. Das magere Hackfleisch gart direkt in der Brühe, während der Ingwer den Kreislauf aufwärmt.",
    target: "≈70 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Hühnerbrühe 800 ml",
      "Schweinehack (mager) 150 g",
      "Ingwer (feine Streifen) 10 g",
      "Sojasauce 1 EL",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Hackfleisch mit der Sojasauce mischen und auflockern.",
      "Reis und Brühe in den Reiskocher geben (Porridge Modus, ca. 50 Min).",
      "In den letzten 15 Minuten das Hackfleisch und den Ingwer hinzufügen und SICHER durchgaren lassen.",
      "Mit Frühlingszwiebeln garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schweinehack komplett durchkochen!)",
    swaps: "Schweinehack ↔ Hähnchenhack",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:10 Ratio", notes: "Hackfleisch nicht am Stück reinwerfen." },
  },
  {
    id: "mi-m",
    title: "Zucchini-Ricotta Gnocchi (Pfanne)",
    desc: "Ein schnelles Mittagessen: Gnocchi geschwenkt in cremiger Ricotta-Zucchini-Sauce.",
    story: "Italienische Mamma-Vibes! Der Ricotta schmilzt in der Pfanne leicht an und umhüllt die Gnocchi, während die geriebene Zucchini für Leichtigkeit sorgt.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Gnocchi (Kühlregal) 300 g",
      "Zucchini 150 g",
      "Ricotta (pasteurisiert) 100 g",
      "Knoblauch 1 Zehe",
      "Olivenöl 1 EL",
      "Parmesan 20 g"
    ],
    steps: [
      "Gnocchi in kochendem Wasser garen.",
      "Zucchini grob raspeln und mit Knoblauch in Öl anbraten, bis sie weich ist.",
      "Gnocchi und etwas Nudelwasser dazugeben.",
      "Pfanne vom Herd nehmen, Ricotta und Parmesan unterrühren, bis es eine cremige Sauce ergibt."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert)",
    swaps: "Gnocchi ↔ Vollkorn-Penne",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "San Bei Ji 三杯鸡 (Drei-Tassen-Huhn)",
    desc: "Taiwanesisches Pfannenhuhn in einer süßlich-klebrigen Soja-Sesam-Glasur (Alkoholfrei).",
    story: "Der Name 'Drei Tassen' steht für die gleiche Menge Sojasauce, Reiswein und Sesamöl. Für eine sichere Variante lassen wir den Alkohol weg und nutzen Brühe und Apfelsaft – der Geschmack bleibt gigantisch gut.",
    target: "≈80 g KH (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Hähnchenbrust oder Keule (gewürfelt) 250 g",
      "Sesamöl 2 EL",
      "Sojasauce 2 EL",
      "Hühnerbrühe (oder naturtrüber Apfelsaft) 2 EL",
      "Knoblauch 2 Zehen & Ingwer 5 g",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Sesamöl im Wok erhitzen, Hähnchen, Ingwer und Knoblauch scharf anbraten (gut durchgaren!).",
      "Sojasauce und Brühe/Saft dazugeben.",
      "Hitze reduzieren und einköcheln lassen, bis die Sauce klebrig wird und das Fleisch glänzend umhüllt.",
      "Mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Kein Alkohol, Fleisch durch) · Diabetes ✓",
    swaps: "Hähnchen ↔ Fester Tofu",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Bánh Tráng Nướng (Airfryer Reispapier-Ei)",
    isViral: true,
    desc: "Vietnamesische Reispapier-Pizza aus dem Airfryer. Knusprig mit gestocktem Ei.",
    story: "Ein Streetfood-Held. Das Reispapier wird beim Erhitzen wie ein knuspriger Taco. Das Ei darauf wird im Airfryer sicher und schnell fest.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reispapier 4 Blatt",
      "Eier 2 Stück",
      "Frühlingszwiebeln 20 g",
      "Sriracha-Mayo (pasteurisiert) 1 EL",
      "Vollkorn-Toast (als Beilage) 2 Scheiben"
    ],
    steps: [
      "Ein Reispapier in den Airfryer legen. Ein halbes, verquirltes Ei darauf verstreichen, Frühlingszwiebeln drüber.",
      "Bei 180°C ca. 4-5 Minuten backen, bis das Ei vollkommen fest und der Rand knusprig ist.",
      "Zusammenklappen, mit Mayo toppen. Toast dazu."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durch, Mayo aus Tube)",
    swaps: "Reispapier ↔ Tortilla-Wrap",
    side: "Eine Tasse warmer Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Gochujang-Sahne Penne 고추장 파스타",
    isViral: true,
    desc: "Vollkorn-Nudeln in einer koreanisch-italienischen Fusions-Sauce.",
    story: "Ein Internet-Phänomen! Die süßlich-würzige koreanische Chilipaste (Gochujang) vermischt mit etwas Sahne ergibt eine unschlagbare Rosé-Sauce.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Penne 130 g",
      "Gochujang (milde Paste) 1 EL",
      "Kochsahne 100 ml",
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
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert, Sahne erhitzt) · Diabetes ✓",
    swaps: "Gochujang ↔ Tomatenmark (falls es komplett mild sein soll)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Lachs & Edamame Takikomi Gohan 鮭と枝豆のご飯",
    desc: "Lachsfilet und proteinreiche Edamame dämpfen schonend zusammen im Reis.",
    story: "Dieses Gericht vereint alle Vorzüge der japanischen Hausmannskost. Der Lachs wird zart, die Bohnen geben Biss, und der Reis strotzt vor Umami.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Edamame (geschält, TK aufgetaut) 80 g",
      "Sojasauce 2 EL",
      "Mirin 1 EL",
      "Dashi oder Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis und Brühe in den Topf. Soja und Mirin dazu.",
      "Lachs am Stück oben auflegen. Start drücken.",
      "Nach dem Kochen die Edamame in den heißen Reis geben.",
      "Lachs zerteilen und alles sorgfältig durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart im Topf >80°C komplett durch) · Diabetes ✓",
    swaps: "Lachs ↔ Weißfisch",
    side: "Gurkensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi (Standard)", notes: "Edamame erst am Ende rein, sonst werden sie blass." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Tamagoyaki Sandwich たまごサンド",
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
    id: "fr-m",
    title: "Viral Crispy Quinoa Salad",
    isViral: true,
    desc: "Quinoa wird im Airfryer extrem knusprig gebacken und dann über einen Salat gestreut.",
    story: "Quinoa-Salat kennt jeder. Aber Quinoa im Airfryer zu rösten, bis er crunchig wie Nüsse wird, ist ein Gamechanger auf Instagram!",
    target: "≈70 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Quinoa (bereits gekocht!) 150 g",
      "Olivenöl 1 EL",
      "Gurke & Tomate 200 g",
      "Feta (pasteurisiert) 50 g",
      "Zitronensaft & Kräuter"
    ],
    steps: [
      "Gekochten Quinoa mit Olivenöl mischen. Im Airfryer bei 190°C ca. 10-15 Min rösten, bis er knusprig wird. (Vorsicht, fliegt leicht rum).",
      "Gemüse klein schneiden, mit Zitrone anmachen.",
      "Salat anrichten, Feta darüberbröseln und den krossen Quinoa als Crunch-Topping darübergeben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert)",
    swaps: "Quinoa ↔ Kichererbsen (werden auch super knusprig)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Curry-Hühnchen-Pilaf 咖喱鸡肉饭 (Reiskocher)",
    desc: "Reis, der mit mildem Currypulver, Hühnchen und Erbsen gedämpft wird.",
    story: "Ein Klassiker aus den Yoshoku-Küchen Japans. Das Currypulver bringt Wärme und eine tolle Farbe, das Hühnchen gart buttrig weich.",
    target: "≈82 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust 200 g",
      "Erbsen (TK) 80 g",
      "Mildes Currypulver 1 TL",
      "Hühnerbrühe 240 ml",
      "Zwiebel 50 g"
    ],
    steps: [
      "Hühnchen in Würfel schneiden, Zwiebel fein hacken.",
      "Reis, Brühe, Currypulver und Zwiebel in den Topf. Gut mischen.",
      "Hühnchen und Erbsen darauflegen.",
      "Start drücken und am Ende alles durchheben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hühnchen gart im Dampf komplett durch)",
    swaps: "Hähnchen ↔ Kichererbsen",
    side: "Ein Klecks Joghurt obendrauf.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Currypulver gut mit der Brühe verrühren." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Miso-Haferbrei mit Spinat",
    desc: "Haferbrei, gekocht in Dashi, verfeinert mit Miso und frischem Spinat.",
    story: "Ein herzhaftes Frühstück am Wochenende. Die Miso-Paste liefert probiotische Kulturen und der Spinat wertvolles Eisen.",
    target: "≈65 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Dashi oder Gemüsebrühe 400 ml",
      "Miso-Paste 1 EL",
      "Spinat (frisch) 50 g",
      "Sesamöl 1 TL"
    ],
    steps: [
      "Haferflocken in Brühe einköcheln.",
      "In der letzten Minute den Spinat unterheben, bis er zusammenfällt.",
      "Vom Herd nehmen! Miso-Paste einrühren (darf nicht mehr kochen).",
      "Mit einem Spritzer Sesamöl servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Spinat ↔ Frühlingszwiebeln",
    side: "Ein Stück Vollkornbrot.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Dan Dan Nudeln (Mild) 担担面",
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
    title: "Upside-Down Onion Tart (Airfryer)",
    isViral: true,
    desc: "Zwiebelringe karamellisieren unter Blätterteig im Airfryer.",
    story: "Der berühmte Tarte-Tatin-Trend! Man legt rote Zwiebeln und etwas Käse aufs Backpapier, deckt sie mit Blätterteig ab und stürzt das Ganze nach dem Backen. Großartig!",
    target: "≈65 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Blätterteig (Rolle) 1/2 Stück",
      "Rote Zwiebel (in Ringen) 1 Stück",
      "Feta (pasteurisiert) 40 g",
      "Balsamico-Essig 1 TL",
      "Thymian"
    ],
    steps: [
      "Blätterteig in 4 Quadrate schneiden.",
      "Auf Airfryer-Backpapier Essig-Tropfen verteilen. Zwiebelringe und Feta darauflegen.",
      "Teig-Quadrat über die Zwiebeln legen und Ränder andrücken.",
      "Im Airfryer bei 180°C ca. 10 Min backen. Vorsichtig stürzen!"
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert)",
    swaps: "Zwiebel ↔ Tomatenscheiben",
    side: "Ein großer Salat mit Gurke.",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Matcha Pancakes 抹茶パンケーキ",
    desc: "Grüne, fluffige Pfannkuchen mit einem Hauch von herbem Grüntee.",
    story: "Ein Café-Hit in Kyoto! Der Matcha sorgt für eine tolle Farbe und gleicht die Süße perfekt aus. Keine Angst, komplett durchgebacken.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Mehl 120 g",
      "Matcha-Pulver 1 TL",
      "Backpulver 1 TL",
      "Eier 2 Stück",
      "Milch 100 ml",
      "Joghurt (pasteurisiert) 100 g"
    ],
    steps: [
      "Mehl, Matcha, Backpulver mischen.",
      "Eier und Milch verquirlen, zu den trockenen Zutaten geben.",
      "In einer beschichteten Pfanne kleine Pancakes von beiden Seiten durchbacken.",
      "Mit einem Klecks Joghurt servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Pancakes komplett durchgaren)",
    swaps: "Matcha ↔ Kakaopulver",
    side: "Frische Früchte.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Italienische Minestrone",
    desc: "Dicker, herzhafter Gemüseeintopf mit kleinen Nudeln und Bohnen.",
    story: "Die beste Art, den Kühlschrank leer zu machen. In Italien wird oft noch die harte Rinde vom Parmesan mitgekocht, das gibt einen extrem intensiven Geschmack!",
    target: "≈80 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Suppennudeln oder Makkaroni 80 g",
      "Weiße Bohnen (Dose, gewaschen) 100 g",
      "Zucchini, Karotte, Sellerie 200 g",
      "Passierte Tomaten 200 ml",
      "Gemüsebrühe 500 ml",
      "Parmesan 20 g"
    ],
    steps: [
      "Gemüse klein würfeln und leicht andünsten.",
      "Mit Tomaten und Brühe ablöschen, 15 Min köcheln.",
      "Bohnen und Nudeln dazugeben, kochen bis die Nudeln al dente sind.",
      "Mit Parmesan bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (alles gekocht) · Diabetes ✓",
    swaps: "Nudeln ↔ Vollkornreis",
    side: "Eine Scheibe Vollkornbrot.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Seafood Paella Asia-Style 海鲜烩饭 (Reiskocher)",
    desc: "Bunter Reis mit Meeresfrüchtemix und Erbsen, butterweich aus dem Reiskocher.",
    story: "Eher westlich angehaucht, aber in Japan sehr beliebt aus dem Reiskocher. Schmeckt wie Paella ohne großen Aufwand und langes Rühren.",
    target: "≈82 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Meeresfrüchte-Mix (TK, aufgetaut) 200 g",
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
    checks: "Balanced ✓ · Schwangerschaft ✓ (Mix muss >80°C erhitzt werden - im Reiskocher kein Problem)",
    swaps: "Mix ↔ Nur Garnelen oder Hühnchen",
    side: "Kleiner Salat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe Standard", notes: "TK-Mix vorher gut abtropfen lassen." },
  },
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Hähnchenhack": { group: "Protein/Fisch/Tofu", label: "Hähnchenhack", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweinegulasch": { group: "Protein/Fisch/Tofu", label: "Schweinegulasch", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack", unitDefault: "g" },
  "Schweinefilet": { group: "Protein/Fisch/Tofu", label: "Schweinefilet", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Lachs": { group: "Protein/Fisch/Tofu", label: "Lachs", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Meeresfrüchte-Mix": { group: "Protein/Fisch/Tofu", label: "Meeresfrüchte-Mix", unitDefault: "g" },
  "Cabanossi": { group: "Protein/Fisch/Tofu", label: "Cabanossi/Räucherwurst", unitDefault: "g" },
  "Räucherwurst": { group: "Protein/Fisch/Tofu", label: "Räucherwurst", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Schinken": { group: "Protein/Fisch/Tofu", label: "Schinken", unitDefault: "g" },
  "Speckwürfel": { group: "Protein/Fisch/Tofu", label: "Speckwürfel", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Cheddar": { group: "Protein/Fisch/Tofu", label: "Cheddar/Käse", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda", unitDefault: "g" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Ricotta": { group: "Protein/Fisch/Tofu", label: "Ricotta", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark", unitDefault: "g" },
  "Joghurt": { group: "Protein/Fisch/Tofu", label: "Joghurt", unitDefault: "g" },

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
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Lauch": { group: "Gemüse/Pilze", label: "Lauch", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Cherrytomaten": { group: "Gemüse/Pilze", label: "Cherrytomaten", unitDefault: "g" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "ml" },
  "Tomatenmark": { group: "Gemüse/Pilze", label: "Tomatenmark", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Banane": { group: "Gemüse/Pilze", label: "Banane", unitDefault: "Stück" },
  "Avocado": { group: "Gemüse/Pilze", label: "Avocado", unitDefault: "Stück" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Kartoffeln": { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  "Blaubeeren": { group: "Gemüse/Pilze", label: "Blaubeeren", unitDefault: "g" },
  "Beeren": { group: "Gemüse/Pilze", label: "Beeren (TK)", unitDefault: "g" },
  "Sellerie": { group: "Gemüse/Pilze", label: "Sellerie", unitDefault: "g" },
  "Salat": { group: "Gemüse/Pilze", label: "Salat (gemischt)", unitDefault: "g" },
  "Gewürzgurken": { group: "Gemüse/Pilze", label: "Gewürzgurken", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Spaghetti": { group: "Reis/Nudeln/Sättigung", label: "Spaghetti", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba-Nudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Süßkartoffel-Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Makkaroni": { group: "Reis/Nudeln/Sättigung", label: "Makkaroni", unitDefault: "g" },
  "Suppennudeln": { group: "Reis/Nudeln/Sättigung", label: "Suppennudeln", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot", unitDefault: "Scheiben" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Kartoffelrösti": { group: "Reis/Nudeln/Sättigung", label: "Kartoffelrösti (TK)", unitDefault: "Stück" },
  "Blätterteig": { group: "Reis/Nudeln/Sättigung", label: "Blätterteig (Rolle)", unitDefault: "Stück" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Weichweizengrieß": { group: "Reis/Nudeln/Sättigung", label: "Grieß", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko/Paniermehl", unitDefault: "g" },
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
  "Kochsahne": { group: "Algen/Brühen/Würze", label: "Kochsahne", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Sriracha": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)", unitDefault: "TL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Erdnussbutter": { group: "Algen/Brühen/Würze", label: "Erdnussbutter", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Schwarze Bohnensauce": { group: "Algen/Brühen/Würze", label: "Schwarze Bohnensauce", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Tonkatsu-Sauce": { group: "Algen/Brühen/Würze", label: "Tonkatsu-Sauce", unitDefault: "EL" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "TL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Kardamom": { group: "Algen/Brühen/Würze", label: "Kardamom", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Currypulver": { group: "Algen/Brühen/Würze", label: "Currypulver", unitDefault: "TL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Mandeln": { group: "Algen/Brühen/Würze", label: "Mandeln", unitDefault: "g" },
  "Erdnüsse": { group: "Algen/Brühen/Würze", label: "Erdnüsse", unitDefault: "g" },
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
            Woche 18 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Sausage & Shiitake Rice, Linsen-Karotten-Reis, Hainan-Tofu und mehr.</p>
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
            {tagChip("Woche 18")}
            {tagChip("Neue Virale Trends & Wohlfühlküche")}
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