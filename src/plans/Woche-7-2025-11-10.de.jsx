import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";

/* -----------------------------------------------------
   GhibliKitchen – Woche 7 (2025-11-10) – DE
   Strikt nach Wochen-Template (A4 quer, linker Info-Panel ≤1/3, Rezept rechts ≥2/3)
   Zwei getrennte Dateien (dies ist die DE-Datei). ZH folgt separat.
----------------------------------------------------- */

export const meta = {
  title: "Woche 7",
  startDate: "2025-11-10",
  id: "woche-07-2025-11-10-de",
};
const FILE_BASE = "Woche 07 2025-11-10";

const UI_TITLES = {
  main: "GhibliKitchen – Woche 7",
  list: "GhibliKitchen – Einkaufsliste – Woche 7",
  coverLeft: "Infos & Uploads",
  coverRight: "Wochenübersicht",
  pdf: "PDF erzeugen",
  html: "HTML exportieren",
  print: "Drucken",
  download: "Download-Link erscheint nach Export",
  cookbookTab: "Kochbuch",
  listTab: "Einkaufsliste",
  reminder: "💊 Metformin mit der Mahlzeit einnehmen",
};

const COLORS = {
  pageBg: "#FAF7F1",
  text: "#111827",
  border: "rgba(0,0,0,.10)",
  panelBG70: "rgba(255,255,255,.70)",
  panelBG80: "rgba(255,255,255,.80)",
  white: "#FFFFFF",
  emerald: "#059669",
  amber: "#f59e0b",
  sky: "#0284c7",
  indigo: "#4f46e5",
  btnShadow: "0 6px 20px rgba(0,0,0,.12)",
};

const cardPanelStyle = {
  background: COLORS.panelBG70,
  borderRadius: 18,
  padding: 20,
  boxShadow: COLORS.btnShadow,
  border: `1px solid ${COLORS.border}`,
};

const cardMainStyle = {
  background: COLORS.white,
  borderRadius: 18,
  padding: 22,
  boxShadow: COLORS.btnShadow,
  border: `1px solid ${COLORS.border}`,
};

const PROMPT_HEADER =
  "Ultra-clean cookbook photo, soft daylight, top-down, pastel background, visible steam, pregnancy-safe (no raw fish or raw egg), mild Asian home cooking (JP/CN/KR), family-friendly";

const buildPrompt = (a, b) => `${a}\n${b}`;

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = { mo: "Montag", di: "Dienstag", mi: "Mittwoch", do: "Donnerstag", fr: "Freitag", sa: "Samstag", so: "Sonntag" };
const MEAL_NAME_DE = { f: "Morgen", m: "Mittag", a: "Abend" };

const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  arr.forEach((r) => map[r.id.split("-")[0]].push(r));
  Object.values(map).forEach((list) =>
    list.sort(
      (a, b) => ["f", "m", "a"].indexOf(a.id.split("-")[1]) - ["f", "m", "a"].indexOf(b.id.split("-")[1])
    )
  );
  return map;
};

// ---------- DATA (21 NEUE Rezepte; keine Wiederholungen aus früheren Wochen) ----------
// Portionen: 2 Personen · Ziel KH pro Mahlzeit (gesamt, 2 P.): 60–90 g · Protein ~20–40 g p. P.
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Gedämpftes Eierauflauf (계란찜) mit kleinem Reis",
    desc: "Koreanisches Gyeran-jjim – vollständig gestockt, mild; mit kleinem Reisschälchen.",
    story: "계란찜 ist ein fluffiger, gedämpfter Eierauflauf aus Korea. Wir garen ihn vollständig – ideal für sanfte Morgen und Schwangerschaft.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈23 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 3 Stück",
      "Hühnerbrühe mild 250 ml",
      "Frühlingszwiebel 15 g",
      "Sesamöl 5 ml",
      "Sojasauce natriumarm 5 ml",
    ],
    steps: [
      "Reis garen.",
      "Eier mit Brühe verrühren, in feuerfeste Schale geben und 12–14 Min. dämpfen, bis komplett gestockt.",
      "Mit Sojasauce/Frühlingszwiebel mild abschmecken, Sesamöl tröpfeln.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Hühnerbrühe ↔ Gemüsebrühe; Reis ↔ Vollkornreis.",
    side: "Beilage: milde Gurken-Pickles · Getränk: warmes Wasser · Tee: Gerstentee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean steamed egg custard in ramekin, fully set, small bowl of rice, scallions on top"),
  },
  {
    id: "mo-m",
    title: "Yakitori-Reisschale (焼き鳥丼) – mild",
    desc: "Japanische Hähnchen-Reisbowl mit leichter Sauce, ohne Schärfe.",
    story: "Yakitori ist in Japan beliebt – als Bowl alltagstauglich und schnell. Wir reduzieren Salz und Süße für eine diabetesfreundliche Version.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Hähnchenbrust 240 g",
      "Zwiebel 80 g",
      "Frühlingszwiebel 15 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 50 ml",
      "Honig 4 g",
    ],
    steps: [
      "Reis garen; Hähnchenstücke in wenig Öl durchgaren.",
      "Zwiebel anschwitzen, Sojasauce/Wasser/Honig zugeben, kurz einköcheln.",
      "Alles über Reis geben, mit Lauchgrün servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH (Süße gering) · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Beilage: blanchierter Spinat · Getränk: Wasser · Tee: Grüntee mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken yakitori rice bowl, glossy light sauce, scallions, no chili"),
  },
  {
    id: "mo-a",
    title: "Rotgeschmortes Tofu (红烧豆腐) mit Pak Choi",
    desc: "Chinesisch geschmort – mild und würzig ohne Schärfe.",
    story: "红烧豆腐 ist ein Hausgericht aus China: Tofu in leichter, glänzender Sauce – ideal nach einem Arbeitstag.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Tofu fest 400 g",
      "Pak Choi 250 g",
      "Shiitake 120 g",
      "Sojasauce natriumarm 20 ml",
      "Ingwer 10 g",
      "Knoblauch 1 Zehe",
      "Maisstärke 8 g",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen; Tofu in Würfeln anbraten (wenig Öl).",
      "Shiitake/Pak Choi zufügen, Sojasauce + etwas Wasser zugeben, 3–4 Min. schmoren.",
      "Mit Stärke leicht binden und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Pak Choi ↔ Brokkoli; Reis ↔ Vollkornreis.",
    side: "Beilage: gedämpfte Karotten · Getränk: Wasser · Tee: Jasmintee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised tofu with bok choy and mushrooms, glossy light-brown sauce over rice"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Gedämpfte Mantou & warme Sojamilch (馒头·豆浆)",
    desc: "Chinesisches Frühstück: kleine Mantou mit ungesüßter, erhitzter Sojamilch.",
    story: "Klassisches Nordchina-Frühstück – hier in leichter, ausgewogener Portion für stabile KH.",
    target: "≈68 g KH gesamt (2 P.)",
    ingredients: [
      "Mantou (klein) 120 g",
      "Sojamilch ungesüßt 400 ml",
      "Gurke 100 g",
      "Sesam (optional) 6 g",
      "Sojasauce natriumarm 5 ml",
    ],
    steps: [
      "Mantou dämpfen (8–10 Min.).",
      "Sojamilch erhitzen (nicht kochen).",
      "Mit Gurkenscheiben servieren; Sojasauce nur sparsam.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Sojamilch erhitzt",
    swaps: "Mantou ↔ Vollkorntoast; Sojamilch ↔ Kuhmilch (pasteurisiert).",
    side: "Beilage: milde Pickles · Getränk: Sojamilch · Tee: Oolong mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Small steamed mantou buns with warm unsweetened soy milk, cucumber slices"),
  },
  {
    id: "di-m",
    title: "Japchae (잡채) – Glasnudelpfanne, mild",
    desc: "Koreanische Süßkartoffelglasnudeln mit Gemüse und Rind – wenig Öl, keine Schärfe.",
    story: "Japchae ist ein Fest- und Alltagsgericht in Korea. Unsere Version ist leichter, mit Fokus auf Gemüse.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Süßkartoffel-Glasnudeln (trocken) 80 g",
      "Rindfleisch mager 200 g",
      "Spinat 150 g",
      "Karotte 120 g",
      "Zwiebel 80 g",
      "Shiitake 100 g",
      "Sojasauce natriumarm 20 ml",
      "Sesamöl 8 ml",
    ],
    steps: [
      "Nudeln kochen/abspülen.",
      "Rind in wenig Öl durchbraten, Gemüse zugeben, kurz garen.",
      "Mit Sojasauce/Sesamöl mild abschmecken, Nudeln untermischen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Fleisch durchgegart",
    swaps: "Rind ↔ Pute/Tofu; Glasnudeln ↔ Soba.",
    side: "Beilage: blanchierter Brokkoli · Getränk: Wasser · Tee: Gerstentee",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae glass noodles with beef and vegetables, glossy but light"),
  },
  {
    id: "di-a",
    title: "Huhn & Daikon als Nimono (鶏大根の煮物)",
    desc: "Japanischer Eintopf mit Hähnchen und Rettich – klar, mild, wärmend.",
    story: "Nimono steht in Japan für sanft geschmorte Gerichte – perfekt für ruhige Abende.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Hähnchenoberkeule ohne Haut 260 g",
      "Daikon (Rettich) 300 g",
      "Karotte 120 g",
      "Ingwer 10 g",
      "Sojasauce natriumarm 20 ml",
      "Gemüsebrühe 500 ml",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen; Rettich/Karotte in Brühe 10 Min. köcheln.",
      "Huhn zugeben und 10–12 Min. gar ziehen.",
      "Mit Sojasauce mild abschmecken.",
    ],
    checks: "Gastritis – köchelnd, mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Beilage: gedämpfter Pak Choi · Getränk: Wasser · Tee: Grüntee mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese chicken and daikon nimono in clear broth, side bowl of rice"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Tofu-Eierblütensuppe (蛋花汤) & kleiner Reis",
    desc: "Chinesische Eierblütensuppe mit Tofu – vollständig gegarte Eier, mild.",
    story: "蛋花汤 ist ein sanfter Start in den Tag – wärmend ohne Schärfe.",
    target: "≈66 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 2 Stück",
      "Tofu fest 150 g",
      "Hühner- oder Gemüsebrühe 900 ml",
      "Maisstärke 8 g",
      "Frühlingszwiebel 10 g",
    ],
    steps: [
      "Reis garen; Brühe erhitzen.",
      "Stärke einrühren, Eier dünn einlaufen lassen, 2–3 Min. sanft köcheln bis vollständig gegart.",
      "Tofu zugeben, mit Lauchgrün servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ Eier vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Beilage: milde Rettich-Pickles · Getränk: Wasser · Tee: Jasmintee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese egg drop soup with tofu in a clear bowl, small bowl of rice"),
  },
  {
    id: "mi-m",
    title: "Kantonesisch: Gedämpftes Huhn mit Shiitake (冬菇蒸滑鸡)",
    desc: "Saftig gedämpft – zart, leicht und bekömmlich.",
    story: "Steamen ist in der kantonesischen Küche Schlüsseltechnik – ideal für milde, saftige Gerichte.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Hähnchenbrust 260 g",
      "Shiitake (getrocknet) 20 g",
      "Ingwer 8 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 5 ml",
      "Reis (roh) 90 g",
      "Frühlingszwiebel 10 g",
    ],
    steps: [
      "Shiitake einweichen; Reis garen.",
      "Hähnchen mit Sojasauce/Ingwer 10 Min. marinieren, mit Shiitake 12–14 Min. dämpfen.",
      "Öltröpfchen Sesamöl, Lauchgrün darüber.",
    ],
    checks: "Gastritis – gedämpft · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Pute/Tofu; Reis ↔ Vollkornreis.",
    side: "Beilage: gedämpfter Brokkoli · Getränk: Wasser · Tee: Oolong mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cantonese steamed chicken with shiitake in a plate, ginger scallion garnish, side rice"),
  },
  {
    id: "mi-a",
    title: "Dubu-Jorim (두부조림) – Sojageschmorter Tofu",
    desc: "Koreanisch geschmort mit Zwiebel/Zucchini – mild-würzig, ohne Chili.",
    story: "두부조림 ist ein beliebtes koreanisches Hausgericht – schmeckt am besten mit Reis.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Tofu fest 400 g",
      "Zwiebel 80 g",
      "Zucchini 200 g",
      "Sojasauce natriumarm 20 ml",
      "Gemüsebrühe 400 ml",
      "Sesamöl 6 ml",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen; Tofu in Scheiben leicht anbräunen.",
      "Zwiebel/Zucchini kurz dünsten, mit Brühe/Sojasauce 6–8 Min. schmoren.",
      "Mit Sesamöl abrunden und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Beilage: Sesam-Gurken · Getränk: Wasser · Tee: Gerstentee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean braised tofu (dubu jorim) with onions and zucchini, light soy glaze, bowl of rice"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Yachae-Dubu-Jeon (야채두부전) & kleiner Reis",
    desc: "Koreanische Gemüse-Tofu-Pfannkuchen – in wenig Öl, außen leicht knusprig.",
    story: "전 sind herzhafte Pfannkuchen aus Korea. Diese Variante setzt auf Tofu und viel Gemüse – mild und sättigend.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Tofu fest 250 g",
      "Ei 1 Stück",
      "Weizenmehl 40 g",
      "Karotte 100 g",
      "Zucchini 120 g",
      "Frühlingszwiebel 15 g",
      "Rapsöl 10 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis garen; Tofu zerdrücken, mit Ei/Mehl/Gemüse mischen.",
      "In wenig Öl kleine Fladen beidseitig goldbraun braten.",
      "Mit wenig Sojasauce servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ Ei vollständig gegart",
    swaps: "Weizenmehl ↔ Reismehl; Tofu ↔ Hähnchenwürfel (separat).",
    side: "Beilage: Gurken-Pickles · Getränk: Wasser · Tee: Gerstentee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean tofu vegetable pancakes on a plate, small bowl of rice, light soy dip"),
  },
  {
    id: "do-m",
    title: "Huhn-Mais-Suppe (鸡蓉玉米羹) – mild",
    desc: "Chinesische, sämige Suppe ohne Schärfe – leicht und bekömmlich.",
    story: "Diese Kantinen- und Familienklassiker-Suppe ist wärmend und unkompliziert – perfekt für die Mittagspause.",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Hähnchenbrust 200 g",
      "Mais (Dose, abgetropft) 200 g",
      "Hühnerbrühe 900 ml",
      "Maisstärke 10 g",
      "Ei (optional) 1 Stück",
      "Frühlingszwiebel 10 g",
      "Sojasauce natriumarm 8 ml",
    ],
    steps: [
      "Reis garen; Brühe/ Mais erhitzen.",
      "Hähnchen fein würfeln, 6–8 Min. gar ziehen; mit Stärke leicht binden.",
      "Optional verquirltes Ei einlaufen lassen und komplett garen; mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Huhn/Ei vollständig gegart",
    swaps: "Mais ↔ Erbsen; Huhn ↔ Tofu.",
    side: "Beilage: gedämpfter Blattspinat · Getränk: Wasser · Tee: Grüntee mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese chicken and corn soup in a white bowl, small side of rice"),
  },
  {
    id: "do-a",
    title: "Kabeljau Miso-Ni (タラの味噌煮)",
    desc: "Japanisch geschmorter Kabeljau in heller Misosauce – sehr mild.",
    story: "Miso-ni ist eine beliebte, sanfte Schmortechnik in Japan – ideal am Abend.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈31 g p. P.",
    ingredients: [
      "Kabeljaufilet 320 g",
      "Miso hell 25 g",
      "Ingwer 10 g",
      "Gemüsebrühe 300 ml",
      "Mirin (optional) 5 ml",
      "Reis (roh) 90 g",
      "Spinat 200 g",
    ],
    steps: [
      "Reis garen; Spinat dämpfen.",
      "Brühe/Miso/Ingwer erhitzen, Fisch 8–10 Min. sanft schmoren bis gar.",
      "Mit Reis und Spinat servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.",
    side: "Beilage: Rettich-Pickles mild · Getränk: Wasser · Tee: Sencha",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese miso-braised cod in shallow bowl, spinach on the side, small bowl of rice"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Tofu-" + "Scramble" + " japanisch & kleiner Reis (豆腐スクランブル)",
    desc: "Rühr-Tofu mit Spinat und Pilzen – würzig-mild, ohne Ei.",
    story: "Ein japanisch inspiriertes, veganes Frühstück – proteinstark und leicht.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Tofu fest 250 g",
      "Spinat 150 g",
      "Shiitake 120 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 12 ml",
      "Sesam 6 g",
    ],
    steps: [
      "Reis garen.",
      "Tofu zerbröseln, mit Zwiebel/Pilzen/Spinat in wenig Öl garen.",
      "Mit Sojasauce/ Sesam mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ vollständig erhitzt",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Beilage: Mini-Tomaten (reif, mild) · Getränk: Wasser · Tee: Hōjicha",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese-style tofu scramble with spinach and mushrooms, small bowl of rice"),
  },
  {
    id: "fr-m",
    title: "Soba-Salat mit Hähnchen (そばサラダ)",
    desc: "Kaltes, mildes Soba-Gericht mit viel Gemüse und zarter Hühnerbrust.",
    story: "Soba-Salat ist ein leichter Lunch – perfekt, wenn es erfrischend und trotzdem sättigend sein soll.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Soba (trocken) 100 g",
      "Hähnchenbrust 220 g",
      "Gurke 150 g",
      "Karotte 120 g",
      "Frühlingszwiebel 15 g",
      "Sojasauce natriumarm 18 ml",
      "Reisessig (mild) 6 ml",
      "Sesamöl 6 ml",
    ],
    steps: [
      "Soba kochen/abspülen; Hähnchen in Wasser 8–10 Min. gar ziehen, abkühlen und zerpflücken.",
      "Gemüse fein schneiden, alles mischen.",
      "Mit leichter Sauce aus Sojasauce/Essig/Sesamöl vermengen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Soba ↔ Udon.",
    side: "Beilage: blanchierter Pak Choi · Getränk: Wasser · Tee: Grüntee mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cold soba salad with shredded chicken, cucumber and carrot, light dressing"),
  },
  {
    id: "fr-a",
    title: "Leichter Ton­topf-Reis mit Huhn & Shiitake (砂锅鸡饭)",
    desc: "Claypot-inspirierter Reis aus dem Topf – fettarm, aromatisch, mild.",
    story: "煲仔饭 ist ein Südchina-Klassiker. Wir kochen eine leichtere, abendfreundliche Variante im Topf.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈31 g p. P.",
    ingredients: [
      "Vollkornreis (roh) 90 g",
      "Hähnchenbrust 260 g",
      "Shiitake 100 g",
      "Pak Choi 200 g",
      "Sojasauce natriumarm 20 ml",
      "Ingwer 8 g",
      "Sesamöl 5 ml",
    ],
    steps: [
      "Reis im Topf mit Wasser garen.",
      "Hähnchen/Shiitake in wenig Öl anbraten, mit Sojasauce/Ingwer kurz schmoren.",
      "Pak Choi zugeben, auf Reis geben und 3–4 Min. ziehen lassen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Vollkornreis ↔ Reis; Hähnchen ↔ Tofu.",
    side: "Beilage: milde Rettich-Pickles · Getränk: Wasser · Tee: Oolong mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light claypot-style chicken and mushroom rice in a pot, bok choy on top"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Omurice (オムライス) – Ei vollständig gegart",
    desc: "Japanisch-westliches Frühstück – dünnes Omelett komplett gestockt, Gemüse-Reis-Füllung.",
    story: "Omurice ist ein Yoshoku-Klassiker aus Japan. Wir garen das Ei komplett durch und reduzieren Ketchup.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 3 Stück",
      "Hähnchenbrust 120 g",
      "Erbsen (TK) 120 g",
      "Zwiebel 60 g",
      "Ketchup 10 g",
      "Rapsöl 8 ml",
    ],
    steps: [
      "Reis garen; Füllung aus Huhn/Erbsen/Zwiebel anrösten, mit wenig Ketchup würzen.",
      "Omelett braten und vollständig stocken lassen.",
      "Füllung einwickeln und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Ei/Huhn vollständig gegart",
    swaps: "Erbsen ↔ Mais; Hähnchen ↔ Tofu.",
    side: "Beilage: Tomatenscheiben (reif) · Getränk: Wasser · Tee: Hōjicha",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese omurice with fully cooked omelet, vegetable chicken rice filling, neat plating"),
  },
  {
    id: "sa-m",
    title: "Kongnamul-Bap (콩나물밥) mit Tofu – mild",
    desc: "Koreanischer Sojabohnensprossen-Reis mit Tofu – leicht und ballaststoffreich.",
    story: "Kongnamul-Bap ist ein einfaches, aromatisches Reisgericht. Die Sauce servieren wir salzarm und ohne Schärfe.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Sojabohnensprossen 300 g",
      "Tofu fest 200 g",
      "Frühlingszwiebel 15 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
    ],
    steps: [
      "Reis garen; Sprossen 2–3 Min. blanchieren.",
      "Tofu in Würfeln kurz anbraten.",
      "Alles mischen, mit milder Sauce (Sojasauce/Sesamöl) servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ vollständig erhitzt",
    swaps: "Tofu ↔ Hähnchen; Sprossen ↔ Spinat.",
    side: "Beilage: Gurken-Pickles · Getränk: Wasser · Tee: Gerstentee",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean kongnamul-bap rice bowl with tofu and bean sprouts, light dressing"),
  },
  {
    id: "sa-a",
    title: "Pollack-Jorim (명태조림) – mild geschmort",
    desc: "Koreanisch geschmorter Seelachs (Pollack) mit Rettich – ohne Schärfe.",
    story: "Fisch-Schmorgerichte sind in Korea beliebt – diese Version ist familienfreundlich mild.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Seelachsfilet 320 g",
      "Daikon 250 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 18 ml",
      "Gemüsebrühe 350 ml",
      "Ingwer 8 g",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen.",
      "Rettich/Zwiebel in Brühe 8 Min. köcheln.",
      "Fisch zugeben, 8–10 Min. sanft schmoren bis gar.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm",
    swaps: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Beilage: Rettich-Pickles · Getränk: Wasser · Tee: Grüntee mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean pollock braise with radish in a shallow pot, bowl of rice"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Chazuke mit Lachsflocken (鮭茶漬け) – Frühstück",
    desc: "Japanischer Tee-auf-Reis mit gekochten Lachsflocken – sehr leicht.",
    story: "お茶漬け ist ein schnelles, wärmendes Frühstück. Wir verwenden entkoffeinierten Tee auf Wunsch.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Grüner Tee (heiß) 500 ml",
      "Gekochter Lachs, zerzupft 100 g",
      "Nori (sparsam) 0.5 g",
      "Sesam 6 g",
    ],
    steps: [
      "Reis garen.",
      "Lachs zerzupfen (gekocht).",
      "Heißem Tee über den Reis gießen, Lachs/Nori/Sesam darauf.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ Fisch durchgegart, Nori sparsam",
    swaps: "Lachs ↔ Seelachs; Tee ↔ Gerstentee.",
    side: "Beilage: Gurken-Pickles · Getränk: Tee · Tee: Sencha (koffeinarm möglich)",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ochazuke green tea poured over rice with cooked salmon flakes, minimal nori"),
  },
  {
    id: "so-m",
    title: "Spinat-Pilz-Pfanne (清炒菠菜香菇) & Reis",
    desc: "Chinesische Gemüsepfanne – saftig, ohne Schärfe.",
    story: "轻炒蔬菜是 die schnelle Alltagsküche – aromatisch und leicht.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Spinat 300 g",
      "Shiitake 200 g",
      "Knoblauch 1 Zehe",
      "Sojasauce natriumarm 12 ml",
      "Tofu fest 150 g",
    ],
    steps: [
      "Reis garen.",
      "Pilze/Spinat kurz in wenig Öl garen, Knoblauch mitziehen lassen.",
      "Tofu zugeben, mild würzen und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Beilage: Radieschen-Pickles mild · Getränk: Wasser · Tee: Oolong mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese spinach and shiitake stir-fry, light sauce, served with rice"),
  },
  {
    id: "so-a",
    title: "Oyakodon (親子丼) – vollständig gestockt",
    desc: "Japanische Huhn-Ei-Reisschale – Eier komplett gestockt für Schwangerschaft geeignet.",
    story: "Oyakodon ist Comfort-Food in Japan. Mit komplett gegartem Ei bleibt es sicher und dennoch saftig.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Hähnchenbrust 240 g",
      "Zwiebel 100 g",
      "Eier 3 Stück",
      "Sojasauce natriumarm 20 ml",
      "Dashi/Gemüsebrühe 300 ml",
    ],
    steps: [
      "Reis garen; Zwiebel in Brühe weich dünsten.",
      "Huhn zugeben und gar ziehen.",
      "Eier einlaufen lassen und unter Deckel vollständig stocken lassen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Ei/Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Beilage: milde Gurken-Pickles · Getränk: Wasser · Tee: Grüntee mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese oyakodon rice bowl with fully cooked egg, onions and chicken, glossy sauce"),
  },
];

// ---------- Einkaufsliste aus DATA aggregieren ----------
const parseLine = (s) => {
  const m = s.match(/^(.*)\s(\d+[\.,]?\d*)\s*(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return { name: s, amount: null, unit: null };
  let name = m[1].trim();
  let amount = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  if (unit === "l") { unit = "ml"; amount *= 1000; }
  return { name, amount, unit };
};
const normalizeName = (name) => name.replace(/\s+/g, " ").trim();
const classify = (name) => {
  const lower = name.toLowerCase();
  const isProtein = /(hähnchen|pute|rind|schwein|lachs|kabeljau|seelachs|fisch|tofu|ei\b|eier)/i.test(lower);
  const isStarch = /(reis|sob(a)|glasnudeln|nudel|mantou)/i.test(lower);
  const isVeg = /(brokkoli|pak choi|paprika|karotte|tomate|zwiebel|zucchini|spinat|chinakohl|kürbis|kartoffel|frühlingszwiebel|gurke|shiitake|champignon|pilz|rettich|daikon|erbsen|mais|sprossen|nori)/i.test(lower);
  const isSeasoning = /(sojasauce|miso|mirin|honig|salz|brühe|sesamöl|öl|ingwer|knoblauch|stärke|essig|tee|sesam)/i.test(lower);
  if (isProtein) return "Protein/Fisch/Tofu";
  if (isVeg) return "Gemüse/Pilze";
  if (isStarch) return "Reis/Nudeln/Sättigung";
  if (isSeasoning) return "Algen/Brühen/Würze";
  return "Sonstiges";
};
const buildListFromData = () => {
  const items = {};
  const add = (cat, key, amount, unit) => {
    if (!items[cat]) items[cat] = {};
    const k = `${key}__${unit || "?"}`;
    if (!items[cat][k]) items[cat][k] = 0;
    items[cat][k] += amount || 0;
  };
  DATA.forEach((r) => {
    r.ingredients.forEach((line) => {
      const { name, amount, unit } = parseLine(line);
      const key = normalizeName(name);
      const cat = classify(key);
      if (amount != null && unit) add(cat, key, amount, unit);
      else add(cat, key, 0, "");
    });
  });
  const out = [];
  const ORDER = ["Protein/Fisch/Tofu", "Gemüse/Pilze", "Reis/Nudeln/Sättigung", "Algen/Brühen/Würze", "Sonstiges"];
  ORDER.forEach((cat) => {
    if (!items[cat]) return;
    const lines = Object.entries(items[cat]).map(([k, v]) => {
      const [name, unit] = k.split("__");
      const amount = v;
      return { name, amount, unit };
    });
    out.push({ cat, lines });
  });
  return out;
};

const WeekView = () => {
  const grouped = useMemo(() => groupByDay(DATA), []);
  return (
    <div className="grid gap-6" style={{ width: "100%" }}>
      {/* Cover */}
      <section className="grid md:grid-cols-12 gap-6" id="cover" style={{ alignItems: "stretch" }}>
        <div className="md:col-span-4" style={cardPanelStyle}>
          <h2 className="text-xl font-semibold mb-2">{UI_TITLES.coverLeft}</h2>
          <p className="text-sm opacity-80 mb-3">{meta.title} · {meta.startDate}</p>
          <div className="space-y-2">
            <label className="block text-sm">Cover-Bild</label>
            <input type="file" className="block w-full" accept="image/*" />
          </div>
          <hr className="my-4" />
          <p className="text-sm">
            Diabetes (frühes Stadium) & Schwangerschaft: mild würzen, quecksilberarme Fische (Lachs/Kabeljau/Seelachs), Eier stets vollständig gestockt, Sojasauce natriumarm, Algen sparsam. Metformin-Reminder erscheint bei Frühstück und Abendessen.
          </p>
        </div>
        <div className="md:col-span-8" style={cardMainStyle}>
          <h2 className="text-xl font-semibold mb-3">{UI_TITLES.coverRight}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DAYS_ORDER.map((d) => (
              <div key={d} className="rounded-xl p-3 border" style={{ borderColor: COLORS.border }}>
                <div className="text-sky-700 font-semibold mb-2">{DAY_NAME_DE[d]}</div>
                <div className="grid grid-cols-3 gap-2">
                  {grouped[d].map((r) => {
                    const id = r.id.split("-")[1];
                    return (
                      <div key={r.id} className="rounded-lg p-2" style={{ background: COLORS.panelBG80, border: `1px solid ${COLORS.border}` }}>
                        <div className="text-[11px] opacity-70">{MEAL_NAME_DE[id]}</div>
                        <div className="text-[12px] font-medium leading-tight">{r.title}</div>
                        <div className="text-[11px] opacity-70">🌾 {r.target}</div>
                        {r.remind ? <div className="text-[11px] mt-1">💊</div> : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 21 Rezeptseiten */}
      {DAYS_ORDER.map((d) => (
        <React.Fragment key={d}>
          {grouped[d].map((r) => {
            const id = r.id.split("-")[1];
            return (
              <section key={r.id} className="grid md:grid-cols-12 gap-6" style={{ alignItems: "start" }}>
                <div className="md:col-span-4" style={cardPanelStyle}>
                  <div className="mb-2">
                    <label className="block text-sm mb-1">Bild-Upload</label>
                    <input type="file" className="block w-full" accept="image/*" />
                  </div>
                  <p className="text-sm mb-2 opacity-80">{r.desc}</p>
                  <p className="text-sm mb-1"><b>🎯</b> {r.target}</p>
                  <p className="text-sm mb-1">{r.checks}</p>
                  <p className="text-sm mb-1">{r.side}</p>
                  {r.remind ? (
                    <div className="inline-block text-xs mt-2 px-2 py-1 rounded-full" style={{ background: COLORS.sky, color: "white" }}>
                      {UI_TITLES.reminder}
                    </div>
                  ) : null}
                </div>
                <div className="md:col-span-8" style={cardMainStyle}>
                  <div className="text-sm mb-1" style={{ color: COLORS.sky }}>
                    {DAY_NAME_DE[d]} — {MEAL_NAME_DE[id]}
                  </div>
                  <h2 className="text-2xl font-semibold leading-snug">{r.title}</h2>
                  <p className="text-[12px] opacity-80 mb-3">{r.story}</p>
                  <h3 className="font-semibold mb-1">Zutaten (2 Personen)</h3>
                  <ul className="list-disc pl-5 mb-3">
                    {r.ingredients.map((li, i) => (
                      <li key={i} className="text-sm">{li}</li>
                    ))}
                  </ul>
                  <h3 className="font-semibold mb-1">Schritte</h3>
                  <ol className="list-decimal pl-5 mb-3">
                    {r.steps.map((li, i) => (
                      <li key={i} className="text-sm">{li}</li>
                    ))}
                  </ol>
                  <p className="text-sm opacity-90"><b>Swaps:</b> {r.swaps}</p>
                  {/* Bildprompt versteckt (nicht gerendert) */}
                  <div style={{ display: "none" }}>{r.prompt}</div>
                </div>
              </section>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

const ShoppingList = () => {
  const summary = useMemo(() => buildListFromData(), []);
  return (
    <div className="grid gap-6">
      {summary.map((block) => (
        <section key={block.cat} style={cardMainStyle}>
          <h3 className="text-lg font-semibold mb-2">{block.cat}</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left opacity-70">
                <th className="py-1">Artikel</th>
                <th className="py-1" style={{ width: 140 }}>Menge</th>
              </tr>
            </thead>
            <tbody>
              {block.lines.map((ln, i) => (
                <tr key={i} className="border-t" style={{ borderColor: COLORS.border }}>
                  <td className="py-1 pr-2">{ln.name}</td>
                  <td className="py-1">{ln.amount ? `${Math.round(ln.amount)} ${ln.unit}` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
};

export default function Woche07DE() {
  const pdfIdMain = "cookbook-de";
  const pdfIdList = "shopping-de";

  useEffect(() => {
    const styleId = "embed-css-ghibli";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = buildEmbedCss();
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={{ background: COLORS.pageBg, color: COLORS.text, minHeight: "100vh" }}>
      {/* Top Bar */}
      <div className="sticky top-0 z-20" style={{ background: COLORS.pageBg, borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="font-semibold">{UI_TITLES.main}</div>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.indigo, boxShadow: COLORS.btnShadow }}
              onClick={() => exportPDFById(pdfIdMain, `${FILE_BASE}-de-kochbuch.pdf`)}
            >
              {UI_TITLES.pdf}
            </button>
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.emerald, boxShadow: COLORS.btnShadow }}
              onClick={() => exportHTMLById(pdfIdMain, `${FILE_BASE}-de-kochbuch.html`)}
            >
              {UI_TITLES.html}
            </button>
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.sky, boxShadow: COLORS.btnShadow }}
              onClick={() => window.print()}
            >
              {UI_TITLES.print}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-4">
          <a href="#tab-cookbook" className="px-3 py-1 rounded-full text-sm" style={{ background: COLORS.sky, color: "white" }}>{UI_TITLES.cookbookTab}</a>
          <a href="#tab-list" className="px-3 py-1 rounded-full text-sm" style={{ background: COLORS.amber, color: "white" }}>{UI_TITLES.listTab}</a>
        </div>

        {/* Kochbuch A4 quer */}
        <div id="tab-cookbook">
          <div id={pdfIdMain} className="space-y-6 print:space-y-0">
            <WeekView />
          </div>
          <p className="text-sm opacity-70 mt-3">{UI_TITLES.download}</p>
        </div>

        <hr className="my-8" />

        {/* Einkaufsliste A4 hoch */}
        <div id="tab-list">
          <div className="flex items-center gap-2 mb-3">
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.indigo, boxShadow: COLORS.btnShadow }}
              onClick={() => exportPDFById(pdfIdList, `${FILE_BASE}-de-einkaufsliste.pdf`)}
            >
              {UI_TITLES.pdf}
            </button>
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.emerald, boxShadow: COLORS.btnShadow }}
              onClick={() => exportHTMLById(pdfIdList, `${FILE_BASE}-de-einkaufsliste.html`)}
            >
              {UI_TITLES.html}
            </button>
          </div>
          <div id={pdfIdList} className="space-y-6">
            <h2 className="text-xl font-semibold">{UI_TITLES.list}</h2>
            <ShoppingList />
          </div>
          <p className="text-sm opacity-70 mt-3">{UI_TITLES.download}</p>
        </div>
      </div>
    </div>
  );
}

try {
  const rootEl = document.getElementById("root");
  if (rootEl) createRoot(rootEl).render(<Woche07DE />);
} catch {}