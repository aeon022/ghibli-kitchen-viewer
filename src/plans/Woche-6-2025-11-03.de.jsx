import React, { useMemo, useState, useEffect } from "react";

/* ---------------------------------- Meta --------------------------------- */
export const meta = {
  title: "Woche 5",
  startDate: "2025-11-03",
  id: "woche-5-2025-11-03-de-clarified",
  lang: "de",
  sidebar: "[DE] Woche 5 (2025-11-03)",
};
const FILE_BASE = "Woche 5 2025-11-03";

/* ------------------------------- UI Strings ------------------------------ */
const UI = {
  main: "GhibliKitchen – Woche 5",
  list: "GhibliKitchen – Einkaufsliste – Woche 5",
  coverInfo:
    "CN/JP/KR – diabetesfreundlich (≈60–90 g KH/Meal/2P) & schwangerschaftssicher. Bilder pro Rezept können hier hochgeladen werden.",
  exportPdf: "PDF erzeugen",
  exportHtml: "HTML exportieren",
  print: "Drucken",
  tabCook: "Kochbuch",
  tabList: "Einkaufsliste",
  weekOverview: "Wochenübersicht",
  reminder: "💊 Metformin mit der Mahlzeit einnehmen",
  ingredientsTitle: "Zutaten (2 Personen)",
  stepsTitle: "Schritte",
  swapsTitle: "Austausche",
  checksTitle: "Hinweise",
  sideTitle: "Beilage/Drink",
  upload: "Bild hochladen",
};

/* --------------------------------- Styles -------------------------------- */
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
  neutral: "#404040",
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

/* ----------------------------- helpers ----------------------------------- */
const DAY_NAME_DE = {
  mo: "Montag",
  di: "Dienstag",
  mi: "Mittwoch",
  do: "Donnerstag",
  fr: "Freitag",
  sa: "Samstag",
  so: "Sonntag",
};
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];

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

/* ------------------------------- DATA (21) ------------------------------- */
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Reisbrei mit Lachs & Seidentofu (お粥)",
    desc: "Japanischer Okayu – sanfter Reisbrei mit gedämpftem Lachs und Seidentofu; inspiriert von Just One Cookbook.",
    story: "Okayu stammt aus Japan und wird traditionell zum Frühstück gegessen – mild, warm und bekömmlich.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Wasser 800 ml",
      "Lachsfilet 120 g",
      "Tofu seiden 200 g",
      "Ingwer 10 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis waschen, mit Wasser aufkochen und 25–30 Min. sanft köcheln.",
      "Lachs über dem Brei 8–10 Min. dämpfen, zerpflücken.",
      "Tofu zugeben, mild abschmecken, Lauchgrün kurz ziehen lassen.",
    ],
    checks: "Gastritis – mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm",
    swaps: "Seidentofu ↔ fester Tofu; Lachs ↔ Kabeljau.",
    side: "Warmer Gerstentee; kleine Gurken-Pickles (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu cubes, scallions, steam rising"),
  },
  {
    id: "mo-m",
    title: "Mildes Bibimbap (비빔밥) – Chili optional",
    desc: "Koreanische Reisschale mit Gemüse und magerem Rind; Chili separat optional.",
    story: "Bibimbap ist ein koreanischer Alltagsklassiker – warm, bunt und flexibel.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈31 g p. P.",
    ingredients: [
      "Vollkornreis (roh) 90 g",
      "Rinderhack mager 220 g",
      "Spinat 200 g",
      "Karotte 120 g",
      "Shiitake 120 g",
      "Eier 2 Stück",
      "Sojasauce natriumarm 20 ml",
      "Sesamöl 10 ml",
    ],
    steps: [
      "Reis garen; Gemüse dünsten oder kurz in wenig Öl anbraten.",
      "Hackfleisch krümelig und vollständig durchgaren.",
      "Alles anrichten, Eier vollständig braten (Eigelb fest).",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest, Fleisch durchgegart",
    swaps: "Rinderhack ↔ Putenhack; Vollkornreis ↔ Sushireis.",
    side: "Chili separat in Minischälchen.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top"),
  },
  {
    id: "mo-a",
    title: "Mildes Mapo-Tofu (麻婆豆腐) – Chili optional",
    desc: "Sichuan-Klassiker in milder, miso-basierter Sauce.",
    story: "Hausmannskost ohne Schärfe.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Tofu fest 400 g",
      "Shiitake 150 g",
      "Miso hell 20 g",
      "Gemüsebrühe 300 ml",
      "Sojasauce natriumarm 20 ml",
      "Knoblauch 1 Zehe",
      "Ingwer 10 g",
      "Maisstärke 10 g",
      "Brauner Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen; Pilze dünsten.",
      "Brühe mit Miso/Sojasauce erhitzen; Tofu 4–5 Min. ziehen lassen.",
      "Mit Stärke binden, servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Brauner Reis ↔ weißer Reis.",
    side: "Gedünsteter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)",
    desc: "Reisbälle mit gekochtem Lachs und milder Misosuppe.",
    story: "Bento-Klassiker.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈27 g p. P.",
    ingredients: [
      "Sushi-Reis (roh) 100 g",
      "Lachsfilet 150 g",
      "Nori 1 Blatt",
      "Miso hell 20 g",
      "Tofu fest 150 g",
      "Wakame (getrocknet) 2 g",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis kochen, Onigiri formen, mit Lachs füllen; mit Nori umwickeln.",
      "Miso in heißem Wasser lösen (nicht kochen), Tofu/Wakame ziehen lassen.",
      "Mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Lachs durchgegart, Wakame sparsam",
    swaps: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Seelachs.",
    side: "Milder grüner Tee (optional koffeinfrei).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame"),
  },
  {
    id: "di-m",
    title: "Reisnudelpfanne mit Hähnchen (河粉)",
    desc: "Kantonesisch inspiriert, gemüsebetont.",
    story: "Schnelles Pfannengericht.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈39 g p. P.",
    ingredients: [
      "Reisnudeln (trocken) 80 g",
      "Hähnchenbrust 250 g",
      "Paprika 150 g",
      "Pak Choi 200 g",
      "Zwiebel 80 g",
      "Karotte 100 g",
      "Sojasauce natriumarm 25 ml",
      "Sesamöl 10 ml",
    ],
    steps: [
      "Reisnudeln einweichen/blanchieren.",
      "Hähnchenstreifen vollständig garen.",
      "Gemüse zugeben, mild würzen und schwenken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"),
  },
  {
    id: "di-a",
    title: "Doenjang-Jjigae mit Gerste (된장찌개)",
    desc: "Kräftig-mild, ohne Schärfe.",
    story: "Koreanischer Alltagseintopf.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Doenjang 30 g",
      "Tofu fest 300 g",
      "Zucchini 200 g",
      "Kartoffeln 200 g",
      "Shiitake 100 g",
      "Zwiebel 70 g",
      "Wasser 800 ml",
      "Sojasauce natriumarm 10 ml",
      "Perlgerste (roh) 70 g",
    ],
    steps: [
      "Doenjang in Wasser lösen; Gemüse 12–15 Min. sanft köcheln.",
      "Tofu zugeben und ziehen lassen.",
      "Gerste separat garen und dazu reichen.",
    ],
    checks: "Gastritis – herzhaft, nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust.",
    side: "Mildes Gurken-Pickle (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Kürbis-Juk mit Tofu & Edamame (单호박죽)",
    desc: "Samtiger Kürbisreisbrei, proteinreich.",
    story: "Korea, ideal an kühlen Morgen.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Kürbis (Kabocha/Hokkaido) 400 g",
      "Reis (roh) 70 g",
      "Tofu fest 200 g",
      "Edamame (geschält) 100 g",
      "Ingwer 8 g",
      "Wasser 900 ml",
      "Salz 1 Prise",
    ],
    steps: [
      "Kürbis + Reis 25 Min. weich kochen.",
      "Pürieren; Tofu/Edamame 3–4 Min. ziehen lassen.",
      "Mild abschmecken.",
    ],
    checks: "Gastritis – weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Reis- oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"),
  },
  {
    id: "mi-m",
    title: "Udon-Suppe mit Huhn & Brokkoli (うどん)",
    desc: "Klar und mild.",
    story: "Ganzjährig beliebt.",
    target: "≈79 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 200 g",
      "Zwiebel 60 g",
      "Miso hell 25 g",
      "Wasser 1000 ml",
      "Sojasauce natriumarm 15 ml",
    ],
    steps: [
      "Brühe mit Miso/Sojasauce erhitzen.",
      "Hähnchen 6–8 Min. gar ziehen; Gemüse 3–4 Min. mitgaren.",
      "Udon separat kochen, zugeben.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Kleine Schale Gurke.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth"),
  },
  {
    id: "mi-a",
    title: "Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis",
    desc: "Kantonesisch dämpfen – zart & bekömmlich.",
    story: "Sanfte Dämpftechnik.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Kabeljaufilet 320 g",
      "Reis (roh) 90 g",
      "Ingwer 15 g",
      "Frühlingszwiebel 30 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 8 ml",
      "Gemüsebrühe 100 ml",
    ],
    steps: [
      "Fisch auf Ingwer 8–10 Min. dämpfen.",
      "Sojasauce+Brühe erhitzen, übergießen; Sesamöl dazu.",
      "Reis garen und servieren.",
    ],
    checks: "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Brokkoli.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Tamagoyaki & Misosuppe mit kleinem Reis (卵焼き・味噌汁)",
    desc: "Japanisches Frühstück – Eier vollständig gestockt.",
    story: "Bento-Favorit.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Tofu fest 150 g",
      "Reis (roh) 80 g",
      "Miso hell 20 g",
      "Wakame (getrocknet) 1 g",
      "Frühlingszwiebel 20 g",
      "Wasser 800 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis garen. Omelett vollständig stocken.",
      "Misosuppe ansetzen; Tofu/Wakame kurz ziehen lassen.",
      "Mit Frühlingszwiebel servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"),
  },
  {
    id: "do-m",
    title: "Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis",
    desc: "Chinesisches Hausgericht, mild-säuerlich.",
    story: "Schnell & beliebt.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Eier 4 Stück",
      "Tofu fest 200 g",
      "Tomaten (reif) 400 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 10 ml",
      "Rapsöl 10 ml",
    ],
    steps: [
      "Reis garen; Eier vollständig stocken.",
      "Tomaten mit Zwiebel sanft schmoren; Tofu zugeben.",
      "Mild abschmecken, servieren.",
    ],
    checks: "Gastritis – milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest",
    swaps: "Tofu ↔ Putenbrustwürfel; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"),
  },
  {
    id: "do-a",
    title: "Bulgogi-Style Pute (불고기) & Vollkornreis – mild",
    desc: "Pfannenvariante, mild mariniert.",
    story: "Koreanischer Klassiker.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Putenbrust 250 g",
      "Vollkornreis (roh) 90 g",
      "Zwiebel 80 g",
      "Karotte 120 g",
      "Champignons 150 g",
      "Sojasauce natriumarm 25 ml",
      "Sesamöl 10 ml",
      "Knoblauch 1 Zehe",
      "Birne (gerieben) 60 g",
    ],
    steps: [
      "Pute 15 Min. marinieren.",
      "In wenig Öl zügig durchgaren.",
      "Gemüse kurz mitgaren, mit Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis.",
    side: "Salatgurke natur.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Hühner-Congee (鸡肉粥)",
    desc: "Wärmender Reisbrei mit zartem Huhn.",
    story: "Südchina & Südostasien.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Hähnchenbrust 220 g",
      "Ingwer 12 g",
      "Karotte 120 g",
      "Wasser 1100 ml",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 20 g",
    ],
    steps: [
      "Reis 30 Min. sanft köcheln.",
      "Hähnchen fein würfeln, 8–10 Min. mitgaren.",
      "Mild abschmecken, Lauchgrün zugeben.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"),
  },
  {
    id: "fr-m",
    title: "Leichte Minestrone (IT) mit Tofu",
    desc: "Italienischer Gemüseeintopf, lange geköchelt.",
    story: "Einzige IT-Option der Woche.",
    target: "≈69 g KH gesamt (2 P.) · Protein ≈39 g p. P.",
    ingredients: [
      "Vollkornpasta (trocken) 60 g",
      "Cannellini-Bohnen (abgetropft) 200 g",
      "Karotte 150 g",
      "Stangensellerie 100 g",
      "Tomaten (passiert) 250 ml",
      "Zucchini 150 g",
      "Gemüsebrühe 800 ml",
      "Olivenöl 10 ml",
      "Parmesan (pasteurisiert, optional) 20 g",
      "Tofu fest 300 g",
    ],
    steps: [
      "Gemüse in wenig Öl anschwitzen, mit Brühe/Passata 20–25 Min. köcheln.",
      "Tofu/Bohnen zugeben, 5 Min. ziehen lassen.",
      "Pasta separat kochen, einrühren.",
    ],
    checks: "Gastritis – lange geköchelt · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ pasteurisierter Käse optional",
    swaps: "Tofu ↔ Hähnchenwürfel; Vollkornpasta ↔ Gerste.",
    side: "Kräutertee (warm).",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, few wholegrain pasta pieces"),
  },
  {
    id: "fr-a",
    title: "Gebackener Lachs Teriyaki (照り焼き) mit Brokkoli & Reis",
    desc: "Natriumarme Sauce, aus dem Ofen.",
    story: "Schnell & ofengegart.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Lachsfilet 320 g",
      "Reis (roh) 90 g",
      "Brokkoli 300 g",
      "Sojasauce natriumarm 25 ml",
      "Mirin (optional) 10 ml",
      "Honig (optional) 5 g",
      "Ingwer 10 g",
    ],
    steps: [
      "Sauce anrühren (Sojasauce + wenig Mirin/Honig + Ingwer).",
      "Lachs 12–14 Min. bei 200 °C backen.",
      "Mit Reis & gedämpftem Brokkoli servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈75 g KH (Süße minimal) · Schwangerschaft ✓ Lachs durchgegart",
    swaps: "Reis ↔ Vollkornreis; Brokkoli ↔ Pak Choi.",
    side: "Warmer Grüntee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Yudofu-Schale (湯豆腐) mit kleinem Reis",
    desc: "Kyōto-Klassiker – heißer Tofusud, sehr bekömmlich.",
    story: "Leicht & wärmend.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Tofu fest 300 g",
      "Kombu (Stück, sparsam) 2 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
      "Reis (roh) 80 g",
      "Wasser 900 ml",
    ],
    steps: [
      "Kombu im Wasser 10 Min. ziehen lassen, entnehmen.",
      "Tofuwürfel 3–4 Min. sanft sieden.",
      "Mit wenig Sojasauce, Lauchgrün und kleinem Reis servieren.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart; Jod sparsam",
    swaps: "Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Hōjicha/Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Hot tofu in clear kombu broth, small bowl of rice, gentle steam"),
  },
  {
    id: "sa-m",
    title: "Soba-Suppe mit Pilzen & Spinat (そば)",
    desc: "Leichte Buchweizennudel-Suppe.",
    story: "Japanische Alltagsküche.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Soba (trocken) 100 g",
      "Shiitake 150 g",
      "Spinat 200 g",
      "Miso hell 20 g",
      "Sojasauce natriumarm 15 ml",
      "Wasser 900 ml",
      "Sesam 10 g",
    ],
    steps: [
      "Brühe mit Miso/Sojasauce erhitzen.",
      "Soba separat kochen und abspülen.",
      "Pilze/Spinat kurz garen, Soba zugeben und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Soba ↔ Udon; Spinat ↔ Pak Choi.",
    side: "Rettich-Pickles (mild).",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light soba noodle soup with mushrooms and spinach in clear broth"),
  },
  {
    id: "sa-a",
    title: "Dakjjim – geschmortes Huhn mit Kartoffel & Karotte (닭찜) + kleiner Reis",
    desc: "Milder Schmor-Topf, familienfreundlich.",
    story: "Koreanischer Eintopf für gemütliche Abende.",
    target: "≈82 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Hähnchenkeule ohne Haut 300 g",
      "Kartoffeln 250 g",
      "Karotte 150 g",
      "Zwiebel 80 g",
      "Sojasauce natriumarm 20 ml",
      "Knoblauch 1 Zehe",
      "Ingwer 8 g",
      "Wasser 700 ml",
      "Reis (roh) 80 g",
    ],
    steps: [
      "Alles mit Wasser/Sojasauce 25–30 Min. sanft schmoren bis Huhn durch.",
      "Bei Bedarf mit Wasser verlängern.",
      "Mit kleinem Reis servieren.",
    ],
    checks: "Gastritis – mild geschmort · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Pute; Kartoffeln ↔ Süßkartoffeln.",
    side: "Milde Gurken-Pickles.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean braised chicken stew with potato and carrot, small rice bowl"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Ochazuke mit gekochtem Lachs (お茶漬け)",
    desc: "Reis mit heißem Tee-/Dashi-Aufguss, Lachs vollständig gegart.",
    story: "Japanischer Komfort am Morgen.",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 85 g",
      "Lachsfilet 140 g",
      "Grüner Tee (koffeinarm) 600 ml",
      "Nori 1 Blatt",
      "Sesam 8 g",
      "Sojasauce natriumarm 8 ml",
    ],
    steps: [
      "Reis kochen; Lachs in Stücken 8–10 Min. dämpfen.",
      "Tee aufgießen; Reis/Lachs in Schalen, mit Tee übergießen.",
      "Mit Nori/Sesam servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Lachs durchgegart",
    swaps: "Tee ↔ milder Dashi; Lachs ↔ Kabeljau.",
    side: "Kleines Rettich-Pickle (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steaming ochazuke rice bowl with cooked salmon flakes and green tea poured over"),
  },
  {
    id: "so-m",
    title: "Kongnamul-bap – Sojasprossen-Reis mit Tofu (콩나물밥)",
    desc: "Koreanischer Schalenreis, leicht und knackig.",
    story: "Beliebt als schnelles Mittag.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Sojasprossen 250 g",
      "Tofu fest 250 g",
      "Karotte 120 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 8 ml",
    ],
    steps: [
      "Reis garen.",
      "Sprossen/Tofu kurz dünsten, Karotte zugeben.",
      "Mit Reis mischen, mild würzen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Putenhack; Reis ↔ Vollkornreis.",
    side: "Milde Gurken-Pickles; Gerstentee.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean sprout rice bowl with tofu, steam rising"),
  },
  {
    id: "so-a",
    title: "Yose Nabe – milder Hotpot mit Kabeljau & Tofu (寄せ鍋) + kleiner Reis",
    desc: "Japanischer Eintopf, klar und leicht.",
    story: "Gemeinsam am Tisch köcheln.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Kabeljaufilet 280 g",
      "Tofu fest 250 g",
      "Chinakohl 300 g",
      "Shiitake 120 g",
      "Karotte 120 g",
      "Miso hell 20 g",
      "Sojasauce natriumarm 10 ml",
      "Wasser 1200 ml",
      "Reis (roh) 80 g",
    ],
    steps: [
      "Brühe ansetzen (Wasser + wenig Miso/Sojasauce).",
      "Gemüse 8–10 Min. sieden, dann Fisch/Tofu 5–6 Min. garen.",
      "Mit kleinem Reis servieren.",
    ],
    checks: "Gastritis – mild gekocht · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch vollständig gegart, jodarm",
    swaps: "Kabeljau ↔ Seelachs; Chinakohl ↔ Pak Choi.",
    side: "Kimchi mild/weiß (ohne Chili) oder Gurken-Pickles.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light Japanese hotpot with cod, tofu and napa cabbage, small rice bowl on side"),
  },
];

/* --------------------------- Shopping List Logic -------------------------- */
const UNIT_MAP = { l: 1000, ml: 1, g: 1, EL: 15, TL: 5, Stück: 1 };

const parseIngredient = (s) => {
  const m = s.match(/^(.*)\s(\d+(?:[\.,]\d+)?)\s?(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = m[1].trim();
  const amount = parseFloat(m[2].replace(",", "."));
  const unit = m[3];
  let baseUnit = unit;
  let baseAmount = amount;
  if (unit === "EL" || unit === "TL") { baseAmount = amount * UNIT_MAP[unit]; baseUnit = "ml"; }
  else if (unit === "l") { baseAmount = amount * 1000; baseUnit = "ml"; }
  return { name, amount: baseAmount, unit: baseUnit };
};

const categorize = (name) => {
  const n = name.toLowerCase();
  const inAny = (...arr) => arr.some((k) => n.includes(k));
  if (inAny("lachs", "kabelj", "seelachs", "pute", "hähn", "rind", "schwein", "tofu", "eier"))
    return "Protein/Fisch/Tofu";
  if (inAny("reis", "udon", "soba", "reisnudeln", "pasta", "gerste")) return "Reis/Nudeln/Sättigung";
  if (inAny("miso", "doenjang", "sojasauce", "sesam", "mirin", "honig", "brühe", "wakame", "nori", "kombu"))
    return "Algen/Brühen/Würze";
  return "Gemüse/Pilze";
};

const buildList = (data) => {
  const items = {};
  data.forEach((r) => {
    r.ingredients.forEach((ing) => {
      const p = parseIngredient(ing);
      if (!p) return;
      const key = p.name.replace(/\s+/g, " ").trim();
      const cat = categorize(key);
      items[cat] = items[cat] || {};
      const unit = p.unit === "ml" ? "ml" : p.unit === "g" ? "g" : "Stück";
      const id = `${key}__${unit}`;
      items[cat][id] = (items[cat][id] || 0) + p.amount;
    });
  });
  const out = {};
  Object.keys(items).forEach((cat) => {
    out[cat] = Object.keys(items[cat])
      .sort()
      .map((id) => {
        const [name, unit] = id.split("__");
        const val = Math.round(items[cat][id]);
        return { name, amount: val, unit };
      });
  });
  return out;
};

/* --------------------------------- UI ------------------------------------ */
const RecipeCard = ({ r }) => {
  const [img, setImg] = useState(null);
  const onUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImg(reader.result);
    reader.readAsDataURL(f);
  };
  const dayKey = r.id.split("-")[0];
  const mealKey = r.id.split("-")[1];
  const dayName = DAY_NAME_DE[dayKey];
  const mealName = { f: "Morgen", m: "Mittag", a: "Abend" }[mealKey];

  return (
    <div className="grid grid-cols-12 gap-4 mb-8" style={cardMainStyle}>
      <div className="col-span-12 text-sm text-sky-700 tracking-wide">{dayName} – {mealName}</div>
      <div className="col-span-12 md:col-span-4" style={cardPanelStyle}>
        <div className="print:hidden mb-3">
          <label className="text-sm block mb-1">{UI.upload}</label>
          <input type="file" accept="image/*" onChange={onUpload} />
        </div>
        <div className="w-full aspect-[4/3] bg-white/70 rounded-xl overflow-hidden flex items-center justify-center mb-3">
          {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <div className="text-xs opacity-70">(Bild)</div>}
        </div>
        <div className="text-sm opacity-90 mb-2">{r.desc}</div>
        <div className="text-sm mb-1">🌾 {r.target} {r.remind ? " · 💊" : ""}</div>
        <div className="text-sm opacity-90 mb-2">{r.checks}</div>
        <div className="text-sm"><span className="font-medium">{UI.sideTitle}:</span> {r.side}</div>
        {r.remind && (
          <div className="mt-3 text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl inline-block">
            {UI.reminder}
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-8">
        <h2 className="text-xl font-semibold mb-1">{r.title}</h2>
        <p className="text-[12px] opacity-80 mb-3">{r.story}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-1">{UI.ingredientsTitle}</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {r.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-1">{UI.stepsTitle}</h3>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              {r.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
            <div className="mt-3 text-sm"><span className="font-medium">{UI.swapsTitle}:</span> {r.swaps}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeekOverview = ({ data }) => {
  const grouped = useMemo(() => groupByDay(data), [data]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {DAYS_ORDER.map((d) => (
        <div key={d} style={cardPanelStyle} className="bg-white/70">
          <div className="font-semibold mb-2">{DAY_NAME_DE[d]}</div>
          <div className="grid grid-cols-3 gap-2">
            {grouped[d].map((r) => (
              <div key={r.id} className="rounded-xl border border-black/10 p-2 text-xs bg-white">
                <div className="font-medium line-clamp-2 mb-1">{r.title}</div>
                <div className="opacity-80">🌾 {r.target}</div>
                {r.remind && <div className="mt-1">💊</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Cover = () => {
  return (
    <div className="grid grid-cols-12 gap-4 mb-8">
      <div className="col-span-12 md:col-span-4" style={cardPanelStyle}>
        <div className="text-2xl font-semibold mb-2">{UI.main}</div>
        <div className="text-sm opacity-90 mb-4">{UI.coverInfo}</div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-2xl shadow" style={{ background: COLORS.indigo, color: 'white' }}>{UI.exportPdf}</button>
          <button className="px-4 py-2 rounded-2xl shadow" style={{ background: COLORS.sky, color: 'white' }}>{UI.exportHtml}</button>
          <button className="px-4 py-2 rounded-2xl shadow" style={{ background: COLORS.emerald, color: 'white' }}>{UI.print}</button>
        </div>
      </div>
      <div className="col-span-12 md:col-span-8" style={cardMainStyle}>
        <div className="text-lg font-semibold mb-3">{UI.weekOverview}</div>
        <WeekOverview data={DATA} />
      </div>
    </div>
  );
};

const ShoppingList = () => {
  const summary = useMemo(() => buildList(DATA), []);
  return (
    <div className="space-y-4">
      {Object.keys(summary).map((cat) => (
        <div key={cat} style={cardMainStyle} className="bg-white">
          <div className="font-semibold mb-2">{cat}</div>
          <ul className="text-sm grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {summary[cat].map((it, idx) => (
              <li key={idx}>{it.name} — <span className="font-mono">{it.amount}</span> {it.unit}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="text-xs opacity-70" style={{ paddingBottom: 24 }}>
        Hinweis: Mengen sind für 2 Personen und auf die Woche aufsummiert. Sojasauce natriumarm; Algen (Wakame/Kombu) sparsam.
      </div>
    </div>
  );
};

/* --------------------------------- Root ---------------------------------- */
export default function WeekPlanDEClarified() {
  const [tab, setTab] = useState("cook");
  useEffect(() => {
    document.body.style.background = COLORS.pageBg;
    document.title = UI.main;
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 md:py-8 text-[15px]" style={{ color: COLORS.text }}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-semibold">{UI.main}</div>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("cook")}
          className={`px-4 py-2 rounded-2xl shadow ${tab === "cook" ? "bg-white" : "bg-white/60"}`}
        >
          {UI.tabCook}
        </button>
        <button
          onClick={() => setTab("list")}
          className={`px-4 py-2 rounded-2xl shadow ${tab === "list" ? "bg-white" : "bg-white/60"}`}
        >
          {UI.tabList}
        </button>
      </div>

      {tab === "cook" ? (
        <>
          <Cover />
          {DATA.map((r) => (
            <RecipeCard key={r.id} r={r} />
          ))}
        </>
      ) : (
        <ShoppingList />
      )}

      <div className="mt-10 text-xs opacity-70">
        Reminder: Frühstück & Abendessen mit 💊 – Metformin mit der Mahlzeit einnehmen.
      </div>
    </div>
  );
}
