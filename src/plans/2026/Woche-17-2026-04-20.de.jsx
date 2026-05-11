// src/plans/2026/Woche-17-2026-04-20.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – Woche 17 (Start: 2026-04-20)
  Status: KOMPLETT & FUNKTIONSFÄHIG (Alle 21 Rezepte)
  Fokus: Virale Airfryer-Hacks, Reiskocher-Magie, CN/JP/KR + EU Crossover.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 17",
  startDate: "2026-04-20",
  id: "woche-17-2026-04-20",
  lang: "de",
  sidebar: "Woche 17 (2026-04-20)",
};

const FILE_BASE = "Woche 17 2026-04-20";

const UI_TITLES = {
  main: "Rezepte Woche 17",
  list: "Einkaufsliste Woche 17",
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
  mo: "Montag (2026-04-20)",
  di: "Dienstag (2026-04-21)",
  mi: "Mittwoch (2026-04-22)",
  do: "Donnerstag (2026-04-23)",
  fr: "Freitag (2026-04-24)",
  sa: "Samstag (2026-04-25)",
  so: "Sonntag (2026-04-26)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Viral Hashbrown Egg Toast",
    isViral: true,
    desc: "Ein knuspriges Kartoffelrösti, kombiniert mit Ei und Käse auf Vollkorntoast aus dem Airfryer.",
    story: "Ein Social-Media-Trend, der sättigt und am Morgen schnell zubereitet ist. Das fertige Rösti (Hashbrown) wird im Airfryer aufgebacken und anschließend mit Käse und Ei überbacken.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Vollkorn-Toast 2 Scheiben",
      "Kartoffelrösti (TK, Hashbrowns) 2 Stück",
      "Eier 2 Stück",
      "Gouda oder Cheddar (pasteurisiert) 40 g",
      "Sriracha oder Ketchup"
    ],
    steps: [
      "TK-Rösti im Airfryer bei 200°C ca. 10 Min knusprig vorbacken.",
      "Vollkorn-Toast in den Airfryer legen, das Rösti darauf platzieren.",
      "Käse darüber streuen. Vorsichtig ein aufgeschlagenes Ei daraufgeben.",
      "Weitere 8-10 Min bei 170°C backen, bis das Ei vollständig gestockt ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eigelb muss komplett fest sein!) · Diabetes ✓",
    swaps: "Rösti ↔ Tomatenscheiben",
    side: "Eine Tasse warmer Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Udon Miso-Carbonara",
    desc: "Japanische Udon-Nudeln in einer cremigen Sahnesauce mit Speck und Miso-Paste.",
    story: "Eine asiatische Abwandlung der Carbonara. Wir verzichten aus Sicherheitsgründen auf rohes Ei und binden die Sauce stattdessen mit etwas Sahne und herzhafter Miso-Paste.",
    target: "≈85 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Udon-Nudeln (vorgegart) 400 g",
      "Speckwürfel oder Pancetta 80 g",
      "Miso-Paste 1 EL",
      "Sahne (pasteurisiert) 100 ml",
      "Parmesan (gerieben) 30 g"
    ],
    steps: [
      "Speckwürfel in einer Pfanne knusprig ausbraten.",
      "Hitze reduzieren. Sahne angießen und die Miso-Paste darin auflösen.",
      "Udon-Nudeln (vorher kurz heiß abgespült) in die Sauce geben.",
      "Mit Parmesan bestreuen und gut durchschwenken, bis die Sauce andickt."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Speck durchgebraten, Sahne pasteurisiert, kein rohes Ei)",
    swaps: "Speck ↔ Räuchertofu",
    side: "Gurkensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Hainan-Style Tofu & Shiitake (Reiskocher)",
    desc: "Tofu und Pilze garen schonend über Reis in einer aromatischen Ingwer-Brühe.",
    story: "Die vegane Variante des Hainan Chicken Rice. Der Tofu saugt die intensive Brühe auf und wird extrem weich, während der Ingwer wärmt.",
    target: "≈80 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Fester Tofu (gewürfelt) 200 g",
      "Shiitake-Pilze 100 g",
      "Ingwer (fein gehackt) 15 g",
      "Knoblauch 2 Zehen",
      "Gemüsebrühe 240 ml",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Reis, Brühe, Sojasauce, Ingwer und Knoblauch in den Reiskocher geben.",
      "Tofu und Pilze in mundgerechte Stücke schneiden und oben auf den Reis legen.",
      "Start drücken.",
      "Nach dem Kochen gründlich durchmischen und auf Tellern anrichten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Tofu dämpft komplett durch) · Diabetes ✓",
    swaps: "Tofu ↔ Hähnchenbrust",
    side: "Frühlingszwiebeln darüber streuen.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Ingwer gibt ein sehr wärmendes Aroma." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Schwedischer Kardamom-Haferbrei (Kardemummagröt)",
    desc: "Wärmender Haferbrei, verfeinert mit Kardamom und frischen Apfelstücken.",
    story: "Kardamom ist in Skandinavien unverzichtbar. Er verleiht diesem simplen Haferbrei eine blumige, intensive Note, die perfekt zum Apfel passt.",
    target: "≈65 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch oder Haferdrink 400 ml",
      "Kardamom (gemahlen) 1/2 TL",
      "Apfel (gewürfelt) 1 Stück",
      "Mandeln (gehackt) 20 g"
    ],
    steps: [
      "Haferflocken mit Milch und Kardamom in einem Topf sanft aufkochen.",
      "Hitze reduzieren und köcheln lassen, bis die Flocken weich sind.",
      "Apfelwürfel unterheben.",
      "In Schüsseln füllen und mit Mandeln bestreuen."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Komplexe KH) · Schwangerschaft ✓",
    swaps: "Kardamom ↔ Zimt",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Airfryer Katsu Sando 豚カツサンド",
    desc: "Japanisches Schweineschnitzel-Sandwich, fettarm im Airfryer gebacken.",
    story: "Ein Klassiker aus den japanischen Convenience-Stores. Das Schnitzel wird im Airfryer knusprig, danach dick mit Sauce bestrichen und zwischen Toastscheiben geklemmt.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Schweineschnitzel 2 Stück",
      "Panko (Paniermehl) 40 g",
      "Ei 1 Stück & Mehl (Panierstraße)",
      "Vollkorn-Toast 4 Scheiben",
      "Weißkohl (sehr fein gehobelt) 50 g",
      "Tonkatsu-Sauce 2 EL"
    ],
    steps: [
      "Schnitzel klopfen, in Mehl, Ei und Panko wenden. Leicht mit Öl besprühen.",
      "Im Airfryer bei 200°C ca. 15 Min backen (Fleisch komplett durchgaren!).",
      "Toast toasten. Kohl auflegen, Schnitzel daraufsetzen und mit Sauce bestreichen.",
      "Zusammenklappen und in der Mitte durchschneiden."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schweinefleisch GANZ durchbraten)",
    swaps: "Schwein ↔ Hähnchenbrust",
    side: "Ein paar Radieschen.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Zitronen-Hähnchen-Risotto (Reiskocher)",
    desc: "Ein frisches, italienisch inspiriertes Risotto mit Hähnchen und Zitrone.",
    story: "Risotto ohne Rühren! Die Stärke des Reises bindet die Brühe im Reiskocher. Ein Schuss Zitrone und etwas Parmesan runden das Gericht ab.",
    target: "≈82 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Risottoreis 120 g",
      "Hähnchenbrust (gewürfelt) 200 g",
      "Hühnerbrühe 300 ml",
      "Zitrone (Saft & Abrieb) 1/2 Stück",
      "Parmesan (pasteurisiert) 30 g",
      "Zucchini (gewürfelt) 100 g"
    ],
    steps: [
      "Reis, Brühe, Zucchini und Hähnchenwürfel in den Reiskocher geben.",
      "Start drücken.",
      "Nach dem Kochen Zitronensaft, Zitronenabrieb und Parmesan kräftig unterrühren.",
      "Das Risotto sollte cremig und leicht fließend sein."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn gart sicher durch, Käse pasteurisiert)",
    swaps: "Zucchini ↔ Erbsen",
    side: "Tomatensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (etwas mehr für Risotto-Textur)", notes: "Käse und Zitrone erst ganz am Schluss einrühren." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Savory Soy Oatmeal",
    desc: "Herzhafter Haferbrei, gewürzt mit Sojasauce und Sesamöl, serviert mit hartgekochtem Ei.",
    story: "Eine schnelle Alternative zu traditionellem asiatischen Congee. Haferflocken kochen schneller und liefern langanhaltende Energie.",
    target: "≈60 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Haferflocken zart 100 g",
      "Gemüsebrühe 450 ml",
      "Eier (hartgekocht) 2 Stück",
      "Sojasauce 1 EL",
      "Sesamöl 1 TL",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Haferflocken in der Brühe aufkochen und eindicken lassen.",
      "Sojasauce und Sesamöl einrühren.",
      "Die hartgekochten Eier pellen, halbieren und auf den Brei setzen.",
      "Mit gehackten Frühlingszwiebeln garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett hartkochen) · Diabetes ✓",
    swaps: "Eier ↔ Tofu-Würfel",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Kroatische Djuvec-Gnocchi",
    desc: "Gnocchi aus der Pfanne, geschwenkt in einer würzigen Ajvar-Gemüse-Sauce.",
    story: "Djuvec-Reis ist ein Hit auf dem Balkan. Wir wandeln die Aromen (Paprika, Erbsen, Ajvar) ab und kombinieren sie mit weichen Gnocchi für ein schnelles Mittagessen.",
    target: "≈85 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Gnocchi 300 g",
      "Paprika (gewürfelt) 1 Stück",
      "Erbsen (TK) 80 g",
      "Ajvar (mild) 3 EL",
      "Tomatenmark 1 EL",
      "Gemüsebrühe 50 ml"
    ],
    steps: [
      "Gnocchi in kochendem Wasser garen, bis sie oben schwimmen.",
      "Paprika in einer Pfanne andünsten. Tomatenmark und Ajvar kurz mitrösten.",
      "Mit Brühe ablöschen, Erbsen dazugeben und kurz einköcheln.",
      "Die Gnocchi in der Sauce schwenken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Gnocchi ↔ Vollkorn-Penne",
    side: "Etwas geriebener Parmesan.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Gyudon-Style Beef Rice 牛丼 (Reiskocher)",
    desc: "Hauchdünnes Rindfleisch und weiche Zwiebeln dämpfen direkt auf dem Reis.",
    story: "Ein japanischer Fast-Food-Klassiker, adaptiert für den Reiskocher. Das Fleisch bleibt zart, der Reis saugt die süß-salzige Marinade auf.",
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
      "Reis und Brühe in den Topf geben.",
      "Soja und Mirin einrühren.",
      "Zwiebelringe und das Rindfleisch locker (!) darauf verteilen. Das Fleisch etwas auffächern.",
      "Start drücken. Danach alles gründlich durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch gart im Topf >80°C komplett durch)",
    swaps: "Rindfleisch ↔ Schweinefleisch (dünn geschnitten)",
    side: "Eingelegter Ingwer.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi (Standard)", notes: "Fleisch auffächern, nicht klumpen." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Viral Reispapier-Croissant 🥐 (Airfryer)",
    isViral: true,
    desc: "Reispapier-Blätter werden geschichtet, mit Käse und Ei gefüllt und wie ein Croissant aufgerollt.",
    story: "Ein knuspriger Trend! Wenn man Reispapier in Milch tränkt und bäckt, wird es unglaublich blättrig und luftig. Gefüllt mit etwas Ei und Käse ein perfekter Snack.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reispapier 6 Blatt",
      "Milch 50 ml",
      "Eier (als Rührei vorgebraten) 2 Stück",
      "Käse (Gouda, gerieben) 40 g",
      "Schinken (optional) 2 Scheiben"
    ],
    steps: [
      "Eier in der Pfanne komplett durchbraten.",
      "Reispapier-Blätter kurz in Milch tauchen und drei Blätter übereinanderlegen.",
      "Rührei, Käse und Schinken im unteren Drittel platzieren.",
      "Die Seiten einklappen und aufrollen. Mit etwas Öl bestreichen.",
      "Im Airfryer bei 190°C ca. 10 Min backen, bis sie knusprig und goldbraun sind."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durch, Käse pasteurisiert)",
    swaps: "Schinken ↔ Putenbrust",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Buldak-Style Vollkorn-Penne",
    isViral: true,
    desc: "Pasta in einer cremigen, koreanisch inspirierten Gochujang-Sahne-Sauce.",
    story: "Buldak-Nudeln sind scharf. Wir machen eine milde, ausgewogene Version: Gochujang bringt Würze, die Sahne sorgt für die Cremigkeit. Perfekt mit Vollkorn-Penne.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Penne 130 g",
      "Gochujang (milde Paste) 1 EL",
      "Kochsahne 100 ml",
      "Knoblauch 1 Zehe",
      "Spinat 50 g",
      "Parmesan 20 g"
    ],
    steps: [
      "Penne kochen. Etwas Nudelwasser aufheben.",
      "Knoblauch und Gochujang in einer Pfanne kurz anrösten.",
      "Mit Sahne ablöschen, Spinat hineinwerfen und einköcheln lassen.",
      "Nudeln in die Sauce geben und mit Parmesan bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse und Sahne erhitzt) · Diabetes ✓",
    swaps: "Gochujang ↔ Tomatenmark (komplett mild)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Linsen-Curry-Pilaf (Reiskocher)",
    desc: "Rote Linsen, Reis und Karotten garen in einer aromatischen Curry-Brühe.",
    story: "Ein One-Pot-Dal für den Reiskocher. Die Linsen zerfallen und machen den Reis extrem sämig, die Karotten bringen einen tollen Biss.",
    target: "≈82 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Rote Linsen (roh, gewaschen) 40 g",
      "Karotten (in Stiften) 100 g",
      "Currypulver (mild) 1 TL",
      "Gemüsebrühe 300 ml",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis und Linsen gründlich waschen.",
      "Zusammen mit Brühe und Currypulver in den Topf geben.",
      "Karottenstifte oben auflegen.",
      "Start drücken. Am Ende gut durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓ (Linsen drosseln Blutzucker)",
    swaps: "Karotten ↔ Süßkartoffel",
    side: "Ein Löffel Naturjoghurt.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Reis + Linsen berechnen)", notes: "Linsen sorgen für eine weiche Textur." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Tomaten-Rührei Bowl 番茄炒蛋",
    desc: "Der chinesische Klassiker 'Tomate & Ei' serviert über einer Portion Reis oder Quinoa.",
    story: "Das klassische Comfort-Food Chinas. Die Tomaten kochen weich und bilden eine natürliche Sauce, die das gestockte Ei perfekt umschließt.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Tomaten (sehr reif) 3 Stück",
      "Eier 3 Stück",
      "Ketchup 1 TL",
      "Knoblauch 1 Zehe",
      "Reis (gekocht) oder Quinoa 150 g"
    ],
    steps: [
      "Eier in der Pfanne stocken lassen (komplett durchbraten!), herausnehmen.",
      "Tomaten würfeln und mit Knoblauch weichschmoren, bis Sauce entsteht. Ketchup dazu.",
      "Eier zurück in die Pfanne, vermischen.",
      "Über dem Reis anrichten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett durch)",
    swaps: "Reis ↔ Vollkorn-Toast",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Schwedische Korvstroganoff (Wurstpfanne)",
    desc: "Ein schnelles schwedisches Alltagsgericht aus Wurststreifen in einer Tomaten-Sahne-Sauce.",
    story: "In Schweden liebt jedes Kind Korvstroganoff. Falukorv (eine Art Fleischwurst) wird mit Zwiebeln angebraten und in einer cremigen Sauce geschmort.",
    target: "≈80 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Fleischwurst oder Geflügelwurst 200 g",
      "Zwiebel 1 Stück",
      "Tomatenmark 2 EL",
      "Sahne oder Hafercreme 100 ml",
      "Nudeln (gekocht) oder Reis 200 g"
    ],
    steps: [
      "Wurst in Streifen schneiden und mit Zwiebeln in der Pfanne anbraten.",
      "Tomatenmark kurz mitrösten.",
      "Sahne und 50ml Wasser angießen, aufkochen und 5 Min einköcheln lassen.",
      "Zusammen mit den Nudeln oder Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Wurst wird stark erhitzt)",
    swaps: "Fleischwurst ↔ Tofu-Würstchen",
    side: "Ein paar Gurkenscheiben.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Mediterraner Weißfisch-Reis (Reiskocher)",
    desc: "Magerer Fisch, Cherrytomaten und Oliven dämpfen schonend über dem Reis.",
    story: "Ein unkompliziertes Fischgericht. Der Reiskocher fängt den leichten Fischfond auf. Tomaten und Oliven geben dem Ganzen einen mediterranen Touch.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Kabeljau oder Seelachs (TK aufgetaut) 200 g",
      "Cherrytomaten 100 g",
      "Schwarze Oliven (entsteint) 30 g",
      "Gemüsebrühe 240 ml",
      "Italienische Kräuter 1 TL"
    ],
    steps: [
      "Reis, Brühe und Kräuter in den Reiskocher füllen.",
      "Fischfilet, Tomaten und Oliven auflegen.",
      "Start drücken.",
      "Nach dem Kochen den Fisch leicht zerpflücken und alles untermischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Weißfisch ist quecksilberarm und dämpft sicher durch)",
    swaps: "Kabeljau ↔ Lachsfilet",
    side: "Ein Spritzer frische Zitrone.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Fisch und Tomaten geben etwas Feuchtigkeit ab." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Miso-Bananen-Pancakes",
    desc: "Süße Bananen-Pancakes mit einem winzigen Hauch salziger Miso-Paste für intensives Umami.",
    story: "Die Kombination aus süßer Banane und salzigem Miso funktioniert ähnlich wie Salted Caramel. Ein tolles, ungewöhnliches Frühstück für den Samstag.",
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
      "Eier, Milch und die Miso-Paste (vorher in 1 EL Wasser auflösen) gut unterrühren.",
      "Mehl und Backpulver zügig unterheben.",
      "In einer Pfanne bei mittlerer Hitze durchbacken, bis sie fest und goldbraun sind."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Teig durchbacken)",
    swaps: "Miso ↔ Prise Salz",
    side: "Ein Klecks Joghurt.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Airfryer Crispy Rice Paper Dumplings",
    isViral: true,
    desc: "Quadratische, knusprige Teigtaschen aus Reispapier, gefüllt mit Rinderhack und Kohl.",
    story: "Ein toller Hack, wenn man keinen Nudelteig kneten möchte. Reispapier-Blätter werden wie Briefumschläge um die Füllung gefaltet und im Airfryer extrem kross gebacken.",
    target: "≈75 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reispapier 8 Blatt",
      "Rinderhack (mager) 150 g",
      "Kohl & Karotten (fein gehackt) 100 g",
      "Sojasauce 2 EL",
      "Sesamöl 1 TL",
      "Reis (als Beilage) 100 g"
    ],
    steps: [
      "Rinderhack und Gemüse in der Pfanne krümelig und KOMPLETT durch braten. Mit Sojasauce würzen.",
      "Reispapier nass machen, Füllung in die Mitte, zu einem Quadrat falten (zwei Blätter pro Tasche für Stabilität).",
      "Im Airfryer (leicht ölen) bei 190°C ca. 10 Min backen.",
      "Mit Reis und Dip servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hack vorher durchbraten!) · Diabetes ✓",
    swaps: "Rinderhack ↔ Tofu-Crumble",
    side: "Sojasauce zum Dippen.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Claypot-Style Cabanossi Rice (Reiskocher)",
    desc: "Reistopf mit geräucherter Wurst und Pak Choi, inspiriert vom chinesischen Claypot Rice.",
    story: "In Guangdong wird Reis mit süßer Lap-Cheong-Wurst in Tontöpfen gegart. Wir nutzen herzhafte Cabanossi. Ihr Fett und Raucharoma ziehen komplett in den Reis ein.",
    target: "≈84 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Cabanossi oder Räucherwurst 1-2 Stück",
      "Sojasauce 2 EL",
      "Sesamöl 1 TL",
      "Pak Choi 150 g",
      "Brühe 240 ml"
    ],
    steps: [
      "Wurst in dünne Scheiben schneiden.",
      "Reis und Brühe in den Reiskocher, Wurst oben drauf legen.",
      "Kochen lassen.",
      "Pak Choi separat kurz dämpfen. Am Ende alles mit Soja/Sesamöl mischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Wurst wird im Dampf >80°C erhitzt)",
    swaps: "Cabanossi ↔ Räuchertofu",
    side: "Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Standard", notes: "Wurst nicht einrühren vor dem Kochen." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Upside-Down Zucchini-Feta Tarts 🥒 (Airfryer)",
    isViral: true,
    desc: "Herzhafte Blätterteig-Törtchen. Zucchini, Käse, Teig drüber – fertig!",
    story: "Der 'Upside-Down Pastry' Trend aus Frankreich! Zucchini und Feta liegen auf dem Backpapier, Blätterteig darüber. Im Airfryer wird der Teig luftig, das Gemüse röstet. Perfekt für Sonntag.",
    target: "≈65 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Blätterteig (Rolle) 1/2 Stück",
      "Zucchini (in Scheiben) 150 g",
      "Feta (pasteurisiert) 40 g",
      "Honig 1 TL",
      "Thymian oder Oregano"
    ],
    steps: [
      "Blätterteig in 4 Quadrate schneiden.",
      "Auf Airfryer-Backpapier 4 kleine Kleckse Honig geben. Zucchinischeiben darauflegen. Mit Kräutern und Feta bestreuen.",
      "Ein Teig-Quadrat über die Zucchini legen und Ränder andrücken.",
      "Im Airfryer bei 180°C ca. 10 Min backen. Stürzen!"
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse erhitzt)",
    swaps: "Zucchini ↔ Tomatenscheiben",
    side: "Ein gekochtes Ei für mehr Protein.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Zucchini-Nudel-Wok mit Garnelen",
    desc: "Zoodles (Zucchini-Nudeln) mit Garnelen, scharf angebraten in Knoblauch und Sojasauce.",
    story: "Ein leichtes Mittagessen. Die Zucchini-Nudeln garen im heißen Wok extrem schnell und nehmen die intensiven Aromen der Garnelen auf.",
    target: "≈50 g KH (2 P. - inkl. Brot) · Protein ≈24 g p. P.",
    ingredients: [
      "Zucchini (mit Spiralschneider zu Nudeln gedreht) 2-3 Stück",
      "Garnelen (TK, aufgetaut) 200 g",
      "Knoblauch 2 Zehen",
      "Sojasauce 2 EL",
      "Vollkornbrot (als Beilage) 2 Scheiben"
    ],
    steps: [
      "Garnelen und Knoblauch im Wok anbraten, bis die Garnelen rosa und GANZ durch sind.",
      "Zucchini-Nudeln hinzugeben und nur 2-3 Minuten schwenken (sie sollen knackig bleiben).",
      "Mit Sojasauce ablöschen.",
      "Dazu Brot reichen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen komplett durchbraten)",
    swaps: "Zoodles ↔ Normale Vollkorn-Spaghetti",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Oyakodon (Reiskocher-Hack)",
    desc: "Huhn und Ei dämpfen zusammen auf Reis. Ein entspanntes, warmes Abendessen.",
    story: "Oyakodon (Eltern-Kind-Schale) ist ein japanisches Soulfood. Im Reiskocher sparen wir uns die Pfanne. Das Ei wird hier nicht weich, sondern komplett fest gedämpft.",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (gewürfelt) 200 g",
      "Zwiebel (in Ringen) 1 Stück",
      "Sojasauce 2 EL",
      "Dashi oder Brühe 240 ml",
      "Eier 2 Stück"
    ],
    steps: [
      "Reis, Brühe, Sojasauce in den Topf geben.",
      "Zwiebeln und Hähnchenstücke darauflegen. Start drücken.",
      "Ca. 10 Minuten vor Ende (wenn das Wasser fast weg ist) die leicht verquirlten Eier über das Fleisch gießen.",
      "Deckel schließen und fertig garen (Ei wird fest)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch und Ei garen im Topf komplett durch)",
    swaps: "Hähnchen ↔ Tofu",
    side: "Etwas Frühlingszwiebel on top.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Eier erst am Ende, sonst werden sie zäh." },
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
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau/Seelachs", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Fleischwurst": { group: "Protein/Fisch/Tofu", label: "Fleischwurst/Geflügelwurst", unitDefault: "g" },
  "Speckwürfel": { group: "Protein/Fisch/Tofu", label: "Speckwürfel", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Cabanossi": { group: "Protein/Fisch/Tofu", label: "Cabanossi/Räucherwurst", unitDefault: "Stück" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda / Käse", unitDefault: "g" },
  "Cottage Cheese": { group: "Protein/Fisch/Tofu", label: "Körniger Frischkäse", unitDefault: "g" },

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
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten", unitDefault: "g" },
  "Cherrytomaten": { group: "Gemüse/Pilze", label: "Cherrytomaten", unitDefault: "g" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "ml" },
  "Tomatenmark": { group: "Gemüse/Pilze", label: "Tomatenmark", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Banane": { group: "Gemüse/Pilze", label: "Banane", unitDefault: "Stück" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis", unitDefault: "g" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Kartoffeln": { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  "Blaubeeren": { group: "Gemüse/Pilze", label: "Blaubeeren", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Penne": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Penne", unitDefault: "g" },
  "Süßkartoffel-Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Kartoffelrösti": { group: "Reis/Nudeln/Sättigung", label: "Kartoffelrösti (TK)", unitDefault: "Stück" },
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
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Sahne": { group: "Algen/Brühen/Würze", label: "Sahne", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Sriracha": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)", unitDefault: "TL" },
  "Ajvar": { group: "Algen/Brühen/Würze", label: "Ajvar", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Pesto": { group: "Algen/Brühen/Würze", label: "Pesto (Glas)", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Kardamom": { group: "Algen/Brühen/Würze", label: "Kardamom", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Currypulver": { group: "Algen/Brühen/Würze", label: "Currypulver", unitDefault: "TL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Mandeln": { group: "Algen/Brühen/Würze", label: "Mandeln", unitDefault: "g" },
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
      <text x='40' y='180' font-size='20' fill='#374151'>Moving Kitchen Tales</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw17" }) {
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
            Woche 17 – Übersicht <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Neue Virale Hacks 🔥 · Abwechslung pur · Reiskocher · Balanced</p>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Hainan Tofu, Zitronen-Risotto, Gyudon Beef, Linsen-Curry und mehr.</p>
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
export default function Woche17DE() {
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
            {tagChip("Woche 17")}
            {tagChip("Neue Virale Trends & Wohlfühlküche")}
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