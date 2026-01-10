import React, { useMemo, useState } from "react";

/*
  GhibliKitchen – Woche 1 (Start: 2025-12-29, ISO-KW 1)
  NEUER PLAN mit täglichem Reiskocher-Gericht (eigener Bereich unter dem Wochenplan)
  Diabetes (früh) & Schwangerschaft: 60–90 g KH gesamt/Meal (2 P.), proteinbetont, salzarm, alles durchgegart, jodhaltige Algen sparsam.
  Gastritis: Standard (balanced, mild). Kein Rohes, Chili separat. Sojasauce natriumarm.
  Primär CN/JP/KR; max. 1× IT.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 1",
  startDate: "2025-12-29",
  id: "woche-1-2025-12-29",
  lang: "de",
  sidebar: "[DE] Woche 1 (2025-12-29)",
};

const FILE_BASE = "Woche 1 2025-12-29";

// ---- UI Labels ----
const UI_TITLES = {
  main: "GhibliKitchen – Woche 1",
  list: "GhibliKitchen – Einkaufsliste – Woche 1",
};

// ---- Styles ----
const COLORS = {
  pageBg: "#FAF7F1",
  text: "#111827",
  border: "rgba(0,0,0,.10)",
  white: "#FFFFFF",
};

const cardPanelStyle = {
  background: COLORS.white,
  borderRadius: 18,
  padding: 20,
  boxShadow: "0 6px 20px rgba(0,0,0,.12)",
  border: `1px solid ${COLORS.border}`,
};

const chip = (text) => (
  <span style={{
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 999,
    background: "#EEF8F3",
    border: `1px solid ${COLORS.border}`,
    fontSize: 12,
    marginRight: 6,
    marginBottom: 6,
  }}>{text}</span>
);

// ---- Image prompt header ----
const PROMPT_HEADER =
  "Ultra-clean cookbook photo, soft daylight, top-down, pastel background, visible steam, pregnancy-safe (no raw fish or raw egg), mild Asian home cooking (JP/CN/KR), family-friendly";
const buildPrompt = (a, b) => `${a}\n${b}`;

// ---- Weekday helpers ----
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2025-12-29)",
  di: "Dienstag (2025-12-30)",
  mi: "Mittwoch (2025-12-31)",
  do: "Donnerstag (2026-01-01)",
  fr: "Freitag (2026-01-02)",
  sa: "Samstag (2026-01-03)",
  so: "Sonntag (2026-01-04)",
};

// ---- DATA (21 Rezepte) ----
// Regeln: 60–90 g KH gesamt (2 P.) pro Mahlzeit; Protein 20–40 g p. P.
// Frühstück & Abend remind:true (💊), Mittag remind:false; mild gewürzt, alles durchgegart, Algen/Jod sparsam.
// ZUSATZ: pro Tag genau 1 Reiskocher-Gericht (riceCooker.enabled = true)
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Genmai‑Okayu mit Hähnchen & Shiitake (玄米粥)",
    desc: "Japanischer Vollkorn‑Reisbrei – sehr mild; Hähnchen fein gewürfelt, Shiitake für Umami.",
    story:
      "In japanischen Haushalten ist Okayu klassisches Wohlfühlessen. Mit Genmai (Braunreis) sättigt es länger – perfekt bei kühlen Morgen.",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Brauner Reis (roh) 80 g",
      "Wasser 900 ml",
      "Hähnchenbrust 160 g",
      "Shiitake 80 g",
      "Ingwer 8 g",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 15 g",
    ],
    steps: [
      "Reis waschen. Mit Wasser im Topf 35–40 Min. sanft köcheln (oder Reiskocher Porridge).",
      "Hähnchen fein würfeln, nach 20 Min. zugeben; Pilze/Ingwer mitziehen lassen.",
      "Mild würzen, Lauchgrün darüber.",
    ],
    checks:
      "Gastritis ✓ sehr mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:
      "Brauner Reis ↔ Reis; Hähnchen ↔ Tofu; Shiitake ↔ Champignons.",
    side: "Gurken‑Pickles ohne Chili; Gerstentee.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge/Congee", water: "1 Teil Reis : 10–11 Teile Wasser", notes: "Hähnchen nach 20 Min. zufügen, insgesamt 60–70 Min. je nach Gerät." },
    prompt: buildPrompt(PROMPT_HEADER, "Brown rice okayu porridge, chicken cubes, shiitake, scallions, gentle steam"),
  },
  {
    id: "mo-m",
    title: "Tofu‑Soboro Don (そぼろ丼風) – mit Vollkornreis",
    desc: "Japanisch inspiriert: gewürzter Tofu‑‚Soboro‘ mit Spinat & Karotte auf Reis – mild & salzarm.",
    story:
      "Soboro‑Don ist normalerweise mit Hack; die Tofu‑Version ist leichter und passt gut zum Lunch.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Vollkornreis (roh) 90 g",
      "Tofu fest 300 g",
      "Spinat 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 20 ml",
      "Sesamöl 8 ml",
    ],
    steps: [
      "Reis garen.",
      "Tofu zerkrümeln und in wenig Öl 6–7 Min. braten; mild würzen.",
      "Spinat/Karotte kurz dünsten, alles auf Reis anrichten.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Putenhack; Vollkornreis ↔ Reis.",
    side: "Kleine Misosuppe (mild).",
    remind: false,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Tofu soboro rice bowl with spinach and carrots, no raw egg, mild glaze"),
  },
  {
    id: "mo-a",
    title: "Udon‑Nabeyaki light (鍋焼きうどん) – ohne Ei",
    desc: "Leichter Topf mit Udon, Hähnchen & Gemüse in klarer Brühe, ohne rohes Ei.",
    story:
      "Nabeyaki‑Udon ist Winter‑Comfortfood in Japan – hier extra mild und schwangerschaftstauglich.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Pak Choi 200 g",
      "Shiitake 100 g",
      "Zwiebel 60 g",
      "Miso hell 20 g",
      "Sojasauce natriumarm 15 ml",
      "Wasser 1000 ml",
    ],
    steps: [
      "Brühe anrühren, Hähnchen 6–8 Min. gar ziehen.",
      "Gemüse 3–4 Min. mitgaren.",
      "Udon separat kochen und zugeben.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Gurke natur; Kräutertee.",
    remind: true,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Hot pot udon with chicken and greens, clear light broth"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Hafer‑Reis‑Juk mit Apfel & Tofu (오트죽) – zuckerarm",
    desc: "Koreanisch inspiriert: Haferflocken + Reis als milder Frühstücksbrei mit Tofuwürfeln.",
    story:
      "Juk gibt es in unzähligen Varianten – Hafer sorgt für lösliche Ballaststoffe und sanfte Sättigung.",
    target: "≈66 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 60 g",
      "Zarte Haferflocken 30 g",
      "Wasser 900 ml",
      "Tofu fest 150 g",
      "Apfel 150 g",
      "Zimt 1 Prise",
    ],
    steps: [
      "Reis + Wasser aufkochen, 20 Min. köcheln.",
      "Haferflocken einrühren, 5–8 Min. weiter köcheln.",
      "Tofu/Apfel würfeln, 2–3 Min. ziehen lassen.",
    ],
    checks: "Gastritis ✓ weich & warm · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Apfel ↔ Birne; Tofu ↔ Hühnerwürfel.",
    side: "Gerstentee; kleines Gurken‑Pickle.",
    remind: true,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Creamy oat-rice porridge with tofu cubes and apple, steam"),
  },
  {
    id: "di-m",
    title: "Soba‑Pfanne mit Huhn & Brokkoli (そば) – mild",
    desc: "Schnelle Pfanne, wenig Öl, zartes Huhn, Brokkoli & Zwiebel.",
    story:
      "Warme Soba sind ein japanischer Lunch‑Liebling – hier als Pfanne statt Suppe.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Soba (trocken) 100 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 220 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 15 g",
    ],
    steps: [
      "Soba garen.",
      "Hähnchenstreifen 6–8 Min. braten bis durch.",
      "Brokkoli/Zwiebel kurz mitgaren, Soba und Sauce untermischen.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Soba ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Kleines Gurken‑Salätchen (ohne Essig).",
    remind: false,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Warm soba stir-fry with chicken and broccoli, light glaze"),
  },
  {
    id: "di-a",
    title: "Gedämpfter Kabeljau & Reisschale (清蒸鳕鱼) – Reiskocher‑Dämpfeinsatz",
    desc: "Sanft gedämpfter Kabeljau mit Ingwer/Lauch, dazu frischer Reis.",
    story:
      "Kantonesisches Dämpfen bringt Zartheit ohne Schärfe; perfekt am Abend.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Kabeljaufilet 320 g",
      "Ingwer 12 g",
      "Frühlingszwiebel 25 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
      "Gemüsebrühe 80 ml",
    ],
    steps: [
      "Reis kochen (Reiskocher).",
      "Fisch auf Ingwer im Dämpfeinsatz 8–10 Min. garen.",
      "Warme Sauce aus Brühe/Sojasauce/Sesamöl über Fisch geben, mit Reis servieren.",
    ],
    checks: "Gastritis ✓ gedämpft · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Kabeljau durchgegart",
    swaps: "Kabeljau ↔ Lachs/Seelachs; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Pak Choi; Kräutertee.",
    remind: true,
    riceCooker: { enabled: true, program: "White/Brown Rice + Steam basket", water: "Reis 1 : 1.2–1.4 Wasser (je nach Sorte)", notes: "Fisch im Einsatz garen, wenn Reis noch ~10 Min. Restzeit hat." },
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions over rice, light sauce"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Miso‑Gemüse‑Reisbrei (味噌粥) – mild",
    desc: "Cremiger Reisbrei mit etwas hellem Miso, Karotte & Tofu – ganz sanft.",
    story:
      "Zōsui/Okayu‑Varianten sind beliebte Aufwärmer – hier extra weich und salzarm.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Wasser 900 ml",
      "Miso hell 15 g",
      "Tofu fest 180 g",
      "Karotte 120 g",
      "Ingwer 6 g",
    ],
    steps: [
      "Reis 30–35 Min. köcheln, Karotte weich garen.",
      "Miso einrühren (nicht kochen).",
      "Tofu 2–3 Min. ziehen lassen.",
    ],
    checks: "Gastritis ✓ sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Brauner Reis (mehr Wasser).",
    side: "Leichter Grüntee koffeinarm.",
    remind: true,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Miso rice porridge with tofu and carrots, subtle steam"),
  },
  {
    id: "mi-m",
    title: "Kongnamul‑Bap – Bohnenkeim‑Reis (콩나물밥)",
    desc: "Koreanischer Gemüsereis – Bohnenkeime & Karotte auf Reis; Sauce mild separat.",
    story:
      "Ein Klassiker der koreanischen Hausküche – normalerweise im Topf oder Reiskocher.",
    target: "≈82 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Bohnenkeime 250 g",
      "Karotte 120 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
    ],
    steps: [
      "Reis mit Wasser garen.",
      "Keime/Karotte 3–4 Min. dämpfen, unterheben.",
      "Milde Sauce getrennt servieren.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Gemüse gedämpft",
    swaps: "Reis ↔ Vollkornreis; Keime ↔ Spinat.",
    side: "Kleine Gurken‑Pickles (ohne Chili).",
    remind: false,
    riceCooker: { enabled: true, program: "White Rice", water: "1 : 1.2–1.4", notes: "Keime in den letzten 5–8 Min. obenauf garen (Dämpfeinsatz/aufgelegt)." },
    prompt: buildPrompt(PROMPT_HEADER, "Korean bean sprout rice bowl, mild sauce on the side"),
  },
  {
    id: "mi-a",
    title: "Yu‑Xiang Aubergine mild (鱼香茄子) & Reis – ohne Chili",
    desc: "Samtige Auberginen in milder, leicht süß‑herzhafter Sauce; kein Chili.",
    story:
      "Die Hausversion ohne Schärfe ist perfekt für Familien – alles weich geschmort.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Auberginen 350 g",
      "Paprika 120 g",
      "Knoblauch 1 Zehe",
      "Ingwer 8 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 10 g",
      "Maisstärke 10 g",
    ],
    steps: [
      "Reis garen.",
      "Aubergine/Paprika 8–10 Min. schmoren.",
      "Sauce anrühren, kurz binden, über Reis.",
    ],
    checks: "Gastritis ✓ weich geschmort · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Aubergine ↔ Zucchini; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Brokkoli.",
    remind: true,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Chinese eggplant in glossy mild sauce with rice, no chili"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Omuraisu light (オムライス) – Ei vollständig gestockt",
    desc: "Japanisch‑westlich: mildes Gemüse‑Reis‑Omelett mit wenig Tomate, Ei durchgegart.",
    story:
      "Beliebtes Yoshoku‑Gericht – hier ballaststoffbetont und schwangerschaftsgeeignet.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 4 Stück",
      "Hähnchenbrust 120 g",
      "Karotte 100 g",
      "Erbsen (TK) 100 g",
      "Zwiebel 60 g",
      "Tomatenmark 10 g",
    ],
    steps: [
      "Reis garen; Gemüse/Huhn 8–10 Min. dünsten.",
      "Mit Reis mischen; Omelett in Pfanne vollständig stocken.",
      "Reismischung einrollen, kurz nachziehen lassen.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Ei vollständig gestockt",
    swaps: "Reis ↔ Vollkornreis; Huhn ↔ Tofu.",
    side: "Kleiner Blattsalat ohne Essig (nur wenig Öl).",
    remind: true,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Japanese omurice, omelet fully set, mild ketchup-tomato hint, peas and chicken"),
  },
  {
    id: "do-m",
    title: "Jjimdak‑Gemüsepfanne (찜닭풍) – mild, ohne Chili",
    desc: "Von koreanischem Jjimdak inspiriert: zartes Huhn mit Kartoffel, Karotte & Glasnudeln (kleine Menge).",
    story:
      "Normalerweise herzhaft‑süß und scharf – hier ganz mild und familienfreundlich.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Glasnudeln (roh) 40 g",
      "Hähnchenbrust 250 g",
      "Kartoffeln 200 g",
      "Karotte 150 g",
      "Zwiebel 80 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 500 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "Huhn mit Gemüse 15–18 Min. sanft schmoren.",
      "Glasnudeln 3–4 Min. mitziehen lassen.",
      "Leicht binden und servieren.",
    ],
    checks: "Gastritis ✓ mild geschmort · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Glasnudeln ↔ Udon; Huhn ↔ Tofu.",
    side: "Gurken‑Pickles ohne Chili.",
    remind: false,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Korean-style mild chicken vegetable stew with a few cellophane noodles"),
  },
  {
    id: "do-a",
    title: "Hainan‑Chicken‑Rice light (海南鸡饭) – Reiskocher‑Methode",
    desc: "Zartes Huhn auf Ingwer‑Knoblauch‑Reis, alles mild und salzarm.",
    story:
      "Berühmt in Südostasien; hier sehr leicht und natriumarm, perfekt für Abend.",
    target: "≈84 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Hähnchenbrust 280 g",
      "Ingwer 15 g",
      "Knoblauch 1 Zehe",
      "Frühlingszwiebel 20 g",
      "Sesamöl 6 ml",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis waschen, in Reiskocher geben; Wasser, Ingwer, Knoblauch zugeben.",
      "Hähnchen obenauf legen und mitgaren bis durch (Kerntemp. ≥75°C).",
      "Huhn in Scheiben, Reis locker, Lauchgrün und etwas Sesamöl darüber.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓ Huhn vollständig durchgegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis (mehr Wasser).",
    side: "Gedünsteter Pak Choi; milder Brühen‑Dip separat.",
    remind: true,
    riceCooker: { enabled: true, program: "White/Brown Rice (je nach Sorte)", water: "1 : 1.2–1.6", notes: "Huhn als ganze Brust obenauf garen; nach Garende 10 Min. warmhalten." },
    prompt: buildPrompt(PROMPT_HEADER, "Light Hainanese chicken rice, sliced poached chicken on fragrant rice, no chili"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Tojiru‑Gemüsesuppe mit Tofu (豚汁風) – ohne Schwein",
    desc: "Herzhafte Misosuppe mit Wurzelgemüse & Tofu, dazu kleiner Reis.",
    story:
      "Tojiru wärmt – unsere Version ist vegetarisch und sanft.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Miso hell 25 g",
      "Tofu fest 250 g",
      "Daikon 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Wasser 1000 ml",
    ],
    steps: [
      "Gemüse 12–15 Min. in Wasser/Brühe sanft garen.",
      "Miso einrühren; Tofu 2–3 Min. ziehen lassen.",
      "Mit kleinem Reis servieren.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Grüntee koffeinarm.",
    remind: true,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Hearty miso vegetable soup with tofu, small rice bowl"),
  },
  {
    id: "fr-m",
    title: "Takikomi‑Gohan mit Huhn & Wurzelgemüse (炊き込みご飯)",
    desc: "Japanischer Gemüsereis – alles zusammen im Reiskocher gegart.",
    story:
      "Ein beliebtes Alltagsgericht: Reis nimmt Umami von Pilzen/Gemüse auf – perfekt für Meal‑Prep.",
    target: "≈88 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 110 g",
      "Hähnchenbrust 220 g",
      "Shiitake 100 g",
      "Karotte 120 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 10 g",
      "Wasser 900 ml",
    ],
    steps: [
      "Reis waschen, mit Wasser/Saucen in Reiskocher geben.",
      "Hähnchen/Gemüse klein würfeln, obenauf verteilen.",
      "Programm starten; nach Ende locker mischen und servieren.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈88 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Huhn ↔ Tofu; Reis ↔ Vollkornreis (mehr Wasser).",
    side: "Gurken‑Pickles; Kräutertee.",
    remind: false,
    riceCooker: { enabled: true, program: "Mixed/White Rice", water: "1 : 1.3–1.5 (inkl. Würzflüssigkeit)", notes: "Nachgaren 10 Min. im Warmhaltemodus." },
    prompt: buildPrompt(PROMPT_HEADER, "Takikomi gohan rice with chicken and vegetables in rice cooker, steam"),
  },
  {
    id: "fr-a",
    title: "Lachs‑Miso‑Schmorpfännchen & Brauner Reis (照り焼き風, mild)",
    desc: "Sanft gegarter Lachs in leichter Miso‑Glasur, dazu brauner Reis & Brokkoli.",
    story:
      "Teriyaki‑Anklänge, aber salzarm und mit viel Gemüse – gemütlicher Abendteller.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Lachsfilet 300 g",
      "Brauner Reis (roh) 90 g",
      "Brokkoli 250 g",
      "Miso hell 20 g",
      "Sojasauce natriumarm 15 ml",
      "Honig 5 ml",
      "Ingwer 8 g",
      "Wasser 600 ml",
    ],
    steps: [
      "Reis garen (brauner Reis 30–35 Min.).",
      "Lachs 8–10 Min. sanft garen; Sauce kurz einköcheln.",
      "Mit Brokkoli servieren.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Lachs durchgegart, quecksilberarm",
    swaps: "Lachs ↔ Kabeljau; Brauner Reis ↔ Reis.",
    side: "Gerstentee.",
    remind: true,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Light miso-glazed salmon with brown rice and steamed broccoli"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Süßkartoffel‑Okayu (さつまいも粥) – Reiskocher",
    desc: "Cremiger Reisbrei mit Süßkartoffelwürfeln – natürlich süß & ballaststoffreich.",
    story:
      "In Japan beliebt für sanfte Morgen – Süßkartoffel macht schön sämig.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Süßkartoffel 220 g",
      "Wasser 900 ml",
      "Tofu fest 120 g",
      "Zimt 1 Prise",
    ],
    steps: [
      "Alles (bis auf Tofu) im Topf 35–40 Min. köcheln oder Reiskocher Porridge.",
      "Tofu 2–3 Min. ziehen lassen.",
      "Mild abschmecken.",
    ],
    checks: "Gastritis ✓ sehr mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Süßkartoffel ↔ Kürbis; Tofu ↔ Hühnerwürfel.",
    side: "Warmwasser oder Gerstentee.",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge/Congee", water: "1 : 10–11", notes: "Süßkartoffel klein würfeln; Gesamtzeit 60–70 Min. je nach Gerät." },
    prompt: buildPrompt(PROMPT_HEADER, "Sweet potato rice porridge with small tofu cubes, steam"),
  },
  {
    id: "sa-m",
    title: "Jajang‑Tofu‑Nudeln light (자장면) – mit Vollkornnudeln",
    desc: "Schwarzbohnen‑Nudeln als leichtere, milde Version; Tofu statt Fettfleisch.",
    story:
      "Koreanisch‑chinesischer Klassiker – hier gemüsebetont und salzarm.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Vollkornnudeln (roh) 120 g",
      "Tofu fest 250 g",
      "Zucchini 150 g",
      "Zwiebel 100 g",
      "Kartoffeln 150 g",
      "Schwarzbohnenpaste (mild) 25 g",
      "Gemüsebrühe 300 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "Nudeln kochen.",
      "Gemüse anschwitzen, Brühe/Paste zugeben, 6–8 Min. köcheln.",
      "Tofu zugeben, leicht binden, servieren.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Vollkornnudeln ↔ Udon.",
    side: "Gurkensalat ohne Essig.",
    remind: false,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Light jajangmyeon with tofu and vegetables, mild sauce"),
  },
  {
    id: "sa-a",
    title: "Chawanmushi‑Teller (茶碗蒸し) & Reis – Ei vollständig gestockt",
    desc: "Japanischer Eierpudding im Dampf, vollständig gestockt; dazu Schälchen Reis & Spinat.",
    story:
      "Feine Textur, mild und leicht – perfekt am Abend, mit gesicherter Garung.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈27 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Dashi (mild) 400 ml",
      "Tofu fest 150 g",
      "Spinat 200 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis garen.",
      "Eier mit Dashi verrühren, in Schälchen 15–18 Min. dämpfen bis fest.",
      "Spinat kurz blanchieren, mit Sojasauce würzen und zusammen servieren.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Kräutertee; Gurken‑Pickles.",
    remind: true,
    riceCooker: { enabled: true, program: "Steam basket über Reis", water: "1 : 1.2–1.4 (Reis)", notes: "Reis kochen; Chawanmushi im Dämpfeinsatz parallel 15–18 Min. garen, Deckel geschlossen." },
    prompt: buildPrompt(PROMPT_HEADER, "Set of chawanmushi cups fully set, small bowl of rice and spinach"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Tofu‑Natto‑Reis (納豆ごはん) – ohne rohes Ei",
    desc: "Japanisches Frühstücksset mit pasteurisiertem Natto & warmem Reis.",
    story:
      "Traditionelles Power‑Frühstück; ohne rohes Ei, sehr mild gewürzt.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈23 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Natto (pasteurisiert) 100 g",
      "Tofu fest 150 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
      "Wasser 500 ml",
    ],
    steps: [
      "Reis kochen.",
      "Natto nach Packung erwärmen und mit Sojasauce mischen.",
      "Mit Tofu‑Würfeln und Lauchgrün über warmem Reis servieren.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ ohne rohes Ei, pasteurisiert",
    swaps: "Natto ↔ Edamame; Tofu ↔ Omelettstreifen (gut gestockt).",
    side: "Milder Grüntee oder Gerstentee.",
    remind: true,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Japanese natto rice bowl without raw egg, tofu cubes, scallions"),
  },
  {
    id: "so-m",
    title: "Mildes Tomaten‑Rind‑Tofu (番茄牛肉豆腐) & Reis",
    desc: "Leicht säuerlich durch lang geschmorte Tomate, mageres Rind und Tofu – sehr mild.",
    story:
      "Ein Hausgericht mit sanfter Sauce – gut bekömmlich und proteinreich.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Rinderhack mager 220 g",
      "Tofu fest 200 g",
      "Tomaten (reif) 350 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 15 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "Reis garen.",
      "Rind krümelig braten bis durch; Tomaten/Zwiebel 10 Min. sanft schmoren.",
      "Tofu zugeben, leicht binden, servieren.",
    ],
    checks: "Gastritis ✓ milde Säure, gut geschmort · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Fleisch durchgegart",
    swaps: "Rind ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Pak Choi.",
    remind: false,
    riceCooker: { enabled: false },
    prompt: buildPrompt(PROMPT_HEADER, "Chinese mild tomato beef tofu over rice, no chili"),
  },
  {
    id: "so-a",
    title: "Satsumaimo‑Gohan & Ofen‑Kabeljau (さつまいもご飯)",
    desc: "Japanischer Süßkartoffel‑Reis im Reiskocher; dazu zarter Ofenfisch – alles mild.",
    story:
      "Saisonal und gemütlich – Süßkartoffelreis liefert sanfte Süße, Fisch das Protein.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 110 g",
      "Süßkartoffel 220 g",
      "Kabeljaufilet 300 g",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
      "Sesam 5 g",
    ],
    steps: [
      "Reis waschen, Süßkartoffel würfeln; zusammen im Reiskocher garen.",
      "Kabeljau im Ofen 8–10 Min. garen bis durch.",
      "Alles mild würzen und anrichten.",
    ],
    checks: "Gastritis ✓ mild · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ Kabeljau durchgegart",
    swaps: "Kabeljau ↔ Lachs; Reis ↔ Vollkornreis (mehr Wasser).",
    side: "Gurken‑Pickles; Kräutertee.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "1 : 1.2–1.4", notes: "Süßkartoffelwürfel obenauf; nach Ende 10 Min. ruhen lassen." },
    prompt: buildPrompt(PROMPT_HEADER, "Japanese sweet potato rice with baked cod on the side, clean styling"),
  },
];

// ---- Einkaufsliste (automatisch aggregiert) ----
const CANON = {
  // Proteine
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Kabeljaufilet": { group: "Protein/Fisch/Tofu", label: "Kabeljaufilet", unitDefault: "g" },
  "Rinderhack mager": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Tofu seiden": { group: "Protein/Fisch/Tofu", label: "Tofu (seiden)", unitDefault: "g" },
  "Tofu fest": { group: "Protein/Fisch/Tofu", label: "Tofu (fest)", unitDefault: "g" },
  "Natto": { group: "Protein/Fisch/Tofu", label: "Natto (pasteurisiert)", unitDefault: "g" },
  // Eier
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },

  // Gemüse/Pilze
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat", unitDefault: "g" },
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Daikon": { group: "Gemüse/Pilze", label: "Daikon/Rettich", unitDefault: "g" },
  "Kartoffeln": { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis (Kabocha/Hokkaido)", unitDefault: "g" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffeln", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (reif)", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurken", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame (geschält)", unitDefault: "g" },
  "Bohnenkeime": { group: "Gemüse/Pilze", label: "Bohnenkeime", unitDefault: "g" },
  "Apfel": { group: "Gemüse/Pilze", label: "Äpfel", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },

  // Reis/Nudeln/Sättigung
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh)", unitDefault: "g" },
  "Vollkornreis": { group: "Reis/Nudeln/Sättigung", label: "Vollkornreis (roh)", unitDefault: "g" },
  "Brauner Reis": { group: "Reis/Nudeln/Sättigung", label: "Brauner Reis (roh)", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba (trocken)", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon (trocken)", unitDefault: "g" },
  "Vollkornnudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkornnudeln (roh)", unitDefault: "g" },
  "Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln (roh)", unitDefault: "g" },

  // Algen/Brühen/Würze
  "Miso hell": { group: "Algen/Brühen/Würze", label: "Miso hell", unitDefault: "g" },
  "Wakame": { group: "Algen/Brühen/Würze", label: "Wakame (getrocknet)", unitDefault: "g" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori‑Blätter", unitDefault: "Blatt" },
  "Sojasauce natriumarm": { group: "Algen/Brühen/Würze", label: "Sojasauce (natriumarm)", unitDefault: "ml" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "ml" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "ml" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig", unitDefault: "ml" },
  "Sesam": { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "g" },
  "Maisstärke": { group: "Algen/Brühen/Würze", label: "Maisstärke", unitDefault: "g" },
  "Wasser": { group: "Algen/Brühen/Würze", label: "Wasser (ges.)", unitDefault: "ml" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt (Prisen)", unitDefault: "Prise" },
  "Tomatenmark": { group: "Algen/Brühen/Würze", label: "Tomatenmark", unitDefault: "g" },
};

function parseIngredient(raw) {
  // e.g. "Reis (roh) 90 g" / "Eier 4 Stück" / "Sojasauce natriumarm 10 ml" / "Nori 1 Blatt" / "Zimt 1 Prise"
  const m = raw.match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Blatt|Zehe|Prise)$/);
  if (!m) return null;
  const name = m[1].trim();
  const qty = parseFloat(m[2].replace(",", "."));
  const unit = m[3];
  let key = Object.keys(CANON).find((k) => name.startsWith(k));
  if (!key) {
    if (name.includes("Brauner Reis")) key = "Brauner Reis";
    else if (name.includes("Vollkornreis")) key = "Vollkornreis";
    else if (name.includes("Reis (roh)")) key = "Reis";
    else if (name.includes("Soba")) key = "Soba";
    else if (name.includes("Udon")) key = "Udon";
    else if (name.includes("Glasnudeln")) key = "Glasnudeln";
    else if (name.includes("Vollkornnudeln")) key = "Vollkornnudeln";
  }
  if (!key) return null;
  return { key, qty, unit, name };
}

function aggregateList(data) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const p = parseIngredient(ing);
      if (!p) continue;
      const c = CANON[p.key];
      const unit = p.unit || c.unitDefault;
      const id = `${p.key}|${unit}`;
      if (!totals[id]) totals[id] = { key: p.key, label: c.label, unit, qty: 0, group: c.group };
      totals[id].qty += p.qty;
    }
  }
  const groups = {
    "Protein/Fisch/Tofu": [],
    "Gemüse/Pilze": [],
    "Reis/Nudeln/Sättigung": [],
    "Algen/Brühen/Würze": [],
  };
  Object.values(totals).forEach((t) => groups[t.group].push(t));
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => a.label.localeCompare(b.label)));
  return groups;
}

const LIST_SUMMARY = aggregateList(DATA);

// ---- UI ----
function MealCard({ meal }) {
  return (
    <div style={cardPanelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <h3 style={{ margin: 0 }}>{meal.title}</h3>
        <div>
          {chip(meal.target)}
          {meal.riceCooker?.enabled ? chip("🍚 Reiskocher") : null}
          {meal.remind ? chip("💊 Metformin mit der Mahlzeit einnehmen") : null}
        </div>
      </div>
      <p style={{ marginTop: 8, color: "#374151" }}>{meal.desc}</p>
      <p style={{ fontStyle: "italic", color: "#6B7280", marginTop: -6 }}>{meal.story}</p>
      <h4>Zutaten (2 Personen)</h4>
      <ul>
        {meal.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
      <h4>Zubereitung</h4>
      <ol>
        {meal.steps.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ol>
      <p><strong>Hinweise:</strong> {meal.checks}</p>
      <p><strong>Austausche:</strong> {meal.swaps}</p>
      <p><strong>Beilage & Getränke:</strong> {meal.side}</p>
      {meal.riceCooker?.enabled ? (
        <div style={{ marginTop: 8 }}>
          <details>
            <summary>Reiskocher‑Details</summary>
            <ul>
              <li><strong>Programm:</strong> {meal.riceCooker.program}</li>
              <li><strong>Wasserverhältnis:</strong> {meal.riceCooker.water}</li>
              {meal.riceCooker.notes ? <li><strong>Hinweise:</strong> {meal.riceCooker.notes}</li> : null}
            </ul>
          </details>
        </div>
      ) : null}
      <details>
        <summary>Bild‑Prompt</summary>
        <pre style={{ whiteSpace: "pre-wrap" }}>{meal.prompt}</pre>
      </details>
    </div>
  );
}

function DaySection({ dayKey, meals }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ marginBottom: 12 }}>{DAY_NAME_DE[dayKey]}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {meals.map((m) => (
          <MealCard key={m.id} meal={m} />
        ))}
      </div>
    </section>
  );
}

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
      <h2>Reiskocher‑Gerichte (1× pro Tag)</h2>
      <p style={{ color: "#374151" }}>Praktische Programme & Wasserverhältnisse im Überblick. Alle Rezepte sind mild, salzarm und schwangerschaftsgeeignet.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {DAYS_ORDER.map((d) => {
          const r = perDay[d];
          return (
            <div key={d} style={{ ...cardPanelStyle }}>
              <h3 style={{ marginTop: 0 }}>{DAY_NAME_DE[d].split(" ")[0]} – {r ? r.title : "(markiert im Tagesplan)"}</h3>
              {r ? (
                <ul>
                  <li><strong>Programm:</strong> {r.riceCooker.program}</li>
                  <li><strong>Wasserverhältnis:</strong> {r.riceCooker.water}</li>
                  {r.riceCooker.notes ? <li><strong>Hinweise:</strong> {r.riceCooker.notes}</li> : null}
                </ul>
              ) : (
                <p>Kein Reiskocher‑Gericht markiert – bitte im Plan auswählen.</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Cookbook() {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of DATA) {
      const d = r.id.split("-")[0];
      map[d].push(r);
    }
    return map;
  }, []);
  return (
    <div>
      {DAYS_ORDER.map((d) => (
        <DaySection key={d} dayKey={d} meals={byDay[d]} />
      ))}
      <RiceCookerSection data={DATA} />
    </div>
  );
}

function ShoppingList() {
  const groups = LIST_SUMMARY;
  const Group = ({ name, items }) => (
    <div style={{ marginBottom: 20 }}>
      <h3>{name}</h3>
      <ul>
        {items.map((it, idx) => (
          <li key={idx}>{`${it.label} – ${Math.round(it.qty * 10) / 10} ${it.unit}`}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <div>
      <Group name="Protein/Fisch/Tofu" items={groups["Protein/Fisch/Tofu"]} />
      <Group name="Gemüse/Pilze" items={groups["Gemüse/Pilze"]} />
      <Group name="Reis/Nudeln/Sättigung" items={groups["Reis/Nudeln/Sättigung"]} />
      <Group name="Algen/Brühen/Würze" items={groups["Algen/Brühen/Würze"]} />
    </div>
  );
}

export default function Woche1() {
  const [tab, setTab] = useState("kochbuch");
  return (
    <div style={{ background: COLORS.pageBg, color: COLORS.text, padding: 24 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <button onClick={() => setTab("kochbuch")} style={{ padding: "8px 14px", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: tab === "kochbuch" ? "#fff" : "#f8fafc" }}>
          {UI_TITLES.main}
        </button>
        <button onClick={() => setTab("liste")} style={{ padding: "8px 14px", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: tab === "liste" ? "#fff" : "#f8fafc" }}>
          {UI_TITLES.list}
        </button>
      </div>
      <div style={{ ...cardPanelStyle }}>
        <div style={{ marginBottom: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {chip(`Start: ${meta.startDate}`)}
          {chip("Mahlzeiten/Woche: 21")}
          {chip("CN/JP/KR (1× IT = 0 in dieser Woche)")}
          {chip("Salzarm · mild · alles durchgegart")}
          {chip("Täglich 1× 🍚 Reiskocher")}
        </div>
        {tab === "kochbuch" ? <Cookbook /> : <ShoppingList />}
      </div>
    </div>
  );
}
