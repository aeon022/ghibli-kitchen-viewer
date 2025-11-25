import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";

/* -----------------------------------------------------
   GhibliKitchen – Woche 7 (2025-11-10) – DE
   Einzeldatei NUR Deutsch (separate ZH-Datei vorhanden)
   Struktur angelehnt an Production-Prompt & Wochen-Template
----------------------------------------------------- */

export const meta = {
  title: "Woche 7",
  startDate: "2025-11-10",
  id: "woche-07-2025-11-10-de",
};
const FILE_BASE = "Woche 7 2025-11-10";

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

// ---------- Day helpers ----------
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

// ---------- DATA (Deutsch) – 21 Rezepte ----------
// Mengen für 2 Personen; KH-Ziel 60–90 g je Mahlzeit (gesamt für 2 P.); Protein ~20–40 g p. P.
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Reisbrei mit Lachs & Seidentofu (お粥)",
    desc: "Japanischer Okayu – sanfter Reisbrei mit gedämpftem Lachs und Seidentofu; inspiriert von Just One Cookbook.",
    story: "Okayu stammt aus Japan und wird traditionell zum Frühstück oder bei Erkältungen gegessen. Besonders beliebt in der kühlen Jahreszeit – ideal für ruhige Wintermorgen und sanfte Starts.",
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
      "Tofu zugeben, mit Ingwer/Sojasauce mild abschmecken, Lauchgrün kurz ziehen lassen.",
    ],
    checks: "Gastritis – mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm",
    swaps: "Seidentofu ↔ fester Tofu; Lachs ↔ Kabeljau.",
    side: "Warmer Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu cubes, scallions, steam rising"),
  },
  {
    id: "mo-m",
    title: "Mildes Bibimbap (비빔밥) – Chili optional",
    desc: "Koreanische Reisschale mit Gemüse und Rind; Chili separat optional – inspiriert von My Korean Kitchen.",
    story: "Bibimbap hat seine Wurzeln in Korea und ist ein Alltagsgericht für jede Saison. Warm serviert ist es ideal für Mittage und ausgewogene Feierabend-Bowls ohne Schärfe.",
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
      "Reis garen; Gemüse dünsten bzw. kurz in wenig Öl anbraten.",
      "Hack krümelig und vollständig durchgaren; mild würzen.",
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
    desc: "Chinesischer Klassiker in milder, miso-basierter Sauce; Chili optional separat – inspiriert von Omnivore’s Cookbook.",
    story: "Mapo-Tofu stammt aus Sichuan; diese milde Hausmannskost-Version ist in vielen Regionen Chinas beliebt. Ein unkompliziertes Feierabendrezept – angenehm wärmend, ohne Schärfe.",
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
    steps: ["Reis garen; Pilze dünsten.", "Brühe mit Miso/Sojasauce erhitzen; Tofu 4–5 Min. ziehen lassen.", "Mit Stärke leicht binden, über Reis servieren."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Brauner Reis ↔ weißer Reis; Miso ↔ milde Bohnenpaste.",
    side: "Gedünsteter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)",
    desc: "Reisbälle mit gekochtem Lachs und milde Misosuppe; inspiriert von Just One Cookbook.",
    story: "Onigiri gehören zur japanischen Bento-Kultur und sind das ganze Jahr über beliebt. Zusammen mit Misosuppe ein leichtes Frühstück oder Snack – ideal für unterwegs und milde Morgen.",
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
      "Reis kochen, Onigiri formen; Lachs gegart zerzupfen und füllen; mit Nori umwickeln.",
      "Miso in heißem Wasser lösen (nicht kochen), Tofu/Wakame kurz ziehen lassen.",
      "Mit wenig Sojasauce abschmecken.",
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
    desc: "Chinesische Wokpfanne, mild und gemüsebetont; inspiriert von The Woks of Life.",
    story: "Angelehnt an kantonesische Ho-Fun-Gerichte aus Südchina. Ein schnelles Pfannengericht – ideal, wenn es fix gehen soll und trotzdem ausgewogen bleibt.",
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
    steps: ["Reisnudeln einweichen/blanchieren.", "Hähnchenstreifen in wenig Öl vollständig garen.", "Gemüse zufügen, mild würzen und schwenken."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"),
  },
  {
    id: "di-a",
    title: "Doenjang-Jjigae mit Gerste (된장찌개)",
    desc: "Koreanischer Sojabohnen-Eintopf, herzhaft-mild; inspiriert von Seon Kyoung Longest.",
    story: "Doenjang-Jjigae ist ein koreanischer Alltags-Eintopf, besonders beliebt in Herbst und Winter. Kräftig, aber mild – perfekt für gemütliche Abende.",
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
    steps: ["Doenjang in Wasser lösen; Gemüse 12–15 Min. sanft köcheln.", "Tofuwürfel zugeben und ziehen lassen.", "Gerste separat garen und dazu reichen."],
    checks: "Gastritis – herzhaft, nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust.",
    side: "Mildes Gurken-Pickle (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Kürbis-Juk mit Tofu & Edamame (단호박죽)",
    desc: "Samtiger Kürbisreisbrei, proteinreich; inspiriert von Mom’s Korean Recipes.",
    story: "Dieser Reisbrei kommt aus Korea und nutzt saisonalen Kürbis im Herbst. Mild und cremig – ideal für kühle Morgen oder leichte Abendmahlzeiten.",
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
    steps: ["Kürbis + Reis 25 Min. weich kochen.", "Pürieren; Tofu/Edamame 3–4 Min. ziehen lassen.", "Mild abschmecken."],
    checks: "Gastritis – weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Reis- oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"),
  },
  {
    id: "mi-m",
    title: "Udon-Suppe mit Huhn & Brokkoli (うどん)",
    desc: "Japanische Nudelsuppe, klar und mild; inspiriert von Just One Cookbook.",
    story: "Leichte Udon-Brühen sind in Japan ganzjährig beliebt, besonders in den kühlen Monaten. Eine sanfte, sättigende Mittagsoption ohne Schärfe.",
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
    steps: ["Brühe mit Miso/Sojasauce erhitzen.", "Hähnchen 6–8 Min. gar ziehen; Gemüse 3–4 Min. mitgaren.", "Udon separat kochen, abspülen und zugeben."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Kleine Schale Gurke.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth"),
  },
  {
    id: "mi-a",
    title: "Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis",
    desc: "Chinesisch dämpfen – zart & bekömmlich; inspiriert von Made With Lau.",
    story: "Das sanfte Dämpfen ist ein Klassiker der kantonesischen Küche. Ein leichtes, schonendes Abendessen – ideal, wenn es bekömmlich sein soll.",
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
    steps: ["Fisch auf Ingwerscheiben 8–10 Min. dämpfen.", "Sojasauce + Brühe erhitzen, über Fisch geben; Sesamöl dazu.", "Reis garen und servieren."],
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
    desc: "Japanisches Frühstück mit vollständig gestocktem Omelett; inspiriert von Just One Cookbook.",
    story: "Tamagoyaki ist ein japanischer Frühstücksklassiker und beliebt in Bento-Boxen. Mit Misosuppe ein ausgewogener, milder Start in jeden Tag.",
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
    steps: ["Reis garen. Omelett vollständig stocken.", "Misosuppe ansetzen; Tofu/Wakame kurz ziehen lassen.", "Mit Frühlingszwiebel servieren."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"),
  },
  {
    id: "do-m",
    title: "Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis",
    desc: "Chinesisches Hausgericht, mild-säuerlich; inspiriert von The Woks of Life.",
    story: "Fànqié Chǎo Dàn ist ein bekanntes chinesisches Hausmannskost-Gericht. In milder Form ein schneller Klassiker für jeden Wochentag.",
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
    steps: ["Reis garen; Eier vollständig stocken.", "Tomaten mit Zwiebel sanft schmoren; Tofu zugeben.", "Mild abschmecken, mit Reis servieren."],
    checks: "Gastritis – milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest",
    swaps: "Tofu ↔ Putenbrustwürfel; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"),
  },
  {
    id: "do-a",
    title: "Bulgogi-Style Pute (불고기) & Vollkornreis – mild",
    desc: "Koreanisch inspiriertes Pfannengericht; mild, Chili optional separat – inspiriert von Maangchi.",
    story: "Bulgogi stammt aus Korea; die Pfannenvariante ist ganzjährig beliebt. Mild mariniert und kurz gebraten – ideal für familienfreundliche Abendessen ohne Schärfe.",
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
    steps: ["Pute mit Sojasauce/Birne/Knoblauch 15 Min. marinieren.", "In wenig Öl zügig durchgaren.", "Gemüse kurz mitgaren, mit Reis servieren."],
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
    desc: "Chinesischer Reisbrei mit zartem Huhn – sanft & wärmend; inspiriert von The Woks of Life.",
    story: "Congee ist in Südchina und Südostasien ein klassisches Frühstück und Nachtessen. Wärmend und leicht – ideal für Regentage und ruhige Morgen.",
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
    steps: ["Reis mit Wasser 30 Min. sanft köcheln.", "Hähnchen fein würfeln, 8–10 Min. mitgaren bis durch.", "Mild abschmecken, Lauchgrün zugeben."],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"),
  },
  {
    id: "fr-m",
    title: "Leichte Minestrone (IT) mit Tofu",
    desc: "Italienischer Gemüseeintopf, lange geköchelt und mild.",
    story: "Minestrone ist eine italienische Gemüsesuppe. Diese leichte Variante passt zu entspannten Abenden und wärmt ohne zu beschweren.",
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
    steps: ["Gemüse in wenig Öl anschwitzen, mit Brühe/Passata 20–25 Min. köcheln.", "Tofu/Bohnen zugeben, 5 Min. ziehen lassen.", "Pasta separat kochen, zum Schluss einrühren."],
    checks: "Gastritis – lange geköchelt · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ pasteurisierter Käse optional",
    swaps: "Tofu ↔ Hähnchenwürfel; Vollkornpasta ↔ Gerste.",
    side: "Kräutertee (warm).",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, few wholegrain pasta pieces"),
  },
  {
    id: "fr-a",
    title: "Gebackener Lachs Teriyaki (照り焼き) mit Brokkoli & Reis",
    desc: "Japanisch inspiriert, natriumarme Sauce, im Ofen gegart; inspiriert von Just One Cookbook.",
    story: "Teriyaki ist eine japanische Zubereitungsart für schnelle Alltagsgerichte. Aus dem Ofen besonders unkompliziert – ideal für kühlere Abende mit wenig Aufwand.",
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
    steps: ["Sauce anrühren (Sojasauce + wenig Mirin/Honig + Ingwer).", "Lachs bestreichen; 12–14 Min. bei 200 °C backen.", "Reis und gedämpften Brokkoli servieren."],
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
    desc: "Japanischer Tofu im heißen Sud, sehr bekömmlich.",
    story: "Yudofu ist eine Spezialität aus Kyoto – ein sanftes Wintergericht für ruhige Wochenendmorgen.",
    target: "≈62 g KH gesamt (2 P.)",
    ingredients: [
      "Tofu seiden 350 g",
      "Wasser 800 ml",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
      "Reis (roh) 80 g",
    ],
    steps: ["Reis garen.", "Wasser erhitzen, Tofustücke 5–6 Min. sanft ziehen lassen.", "Mit Sojasauce und Lauchgrün mild servieren."],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig erhitzt, Algen entfallen",
    swaps: "Seidentofu ↔ fester Tofu; Reis ↔ Vollkornreis.",
    side: "Sesam-Gurken-Pickle (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Hot tofu in clear broth, scallions on top, small bowl of rice, very gentle look"),
  },
  {
    id: "sa-m",
    title: "Soba-Pfanne mit Hähnchen & Spinat (そば)",
    desc: "Warm angebratene Soba mit viel Gemüse – mild und ballaststoffreich.",
    story: "Soba sind in Japan Alltagsnudeln. Diese Pfanne ist ein leichtes Wochenend-Mittag, ohne Schärfe.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Soba (trocken) 100 g",
      "Hähnchenbrust 220 g",
      "Spinat 200 g",
      "Shiitake 120 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 20 ml",
      "Reisessig (mild) 5 ml",
    ],
    steps: ["Soba kochen und abspülen.", "Hähnchenstreifen in wenig Öl vollständig garen.", "Gemüse zufügen, Soba untermischen, mild mit Sojasauce/Essig abschmecken."],
    checks: "Gastritis – mild, wenig Säure · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Soba ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Warm soba stir-fry with chicken, spinach and shiitake, glossy but light, no chili"),
  },
  {
    id: "sa-a",
    title: "Lachs-Kohl-Nabe (鮭の鍋) & Reis – mild",
    desc: "Japanischer Eintopf mit Chinakohl, Pilzen und Lachs; Misobrühe, sehr mild.",
    story: "Nabe-Gerichte sind japanische Winterklassiker. Diese Variante ist leicht und familienfreundlich.",
    target: "≈70 g KH gesamt (2 P.)",
    ingredients: [
      "Lachsfilet 300 g",
      "Chinakohl 300 g",
      "Shiitake 150 g",
      "Tofu fest 200 g",
      "Miso hell 25 g",
      "Wasser 1000 ml",
      "Reis (roh) 90 g",
    ],
    steps: ["Reis kochen.", "Brühe erhitzen, Kohl/Pilze 6–8 Min. köcheln.", "Lachs/Tofu zugeben und gar ziehen; Miso am Ende einrühren (nicht kochen)."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Lachs durchgegart",
    swaps: "Lachs ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Kleines Radieschen-Wasser-Pickle (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese salmon nabe hotpot with napa cabbage and mushrooms, clear miso broth, side bowl of rice"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Zōsui-Reissuppe mit Huhn (雑炊) – mild",
    desc: "Japanische Reis-Gemüsesuppe mit zartem Huhn in milder Brühe.",
    story: "Zōsui ist ein klassisches Wohlfühlgericht für kalte Morgen – warm, weich und leicht.",
    target: "≈68 g KH gesamt (2 P.)",
    ingredients: [
      "Reis (roh) 85 g",
      "Hähnchenbrust 150 g",
      "Karotte 100 g",
      "Shiitake 80 g",
      "Miso hell 20 g",
      "Wasser 900 ml",
      "Frühlingszwiebel 15 g",
    ],
    steps: ["Reis kochen.", "Brühe erhitzen, Gemüse 8–10 Min. weich köcheln.", "Hähnchenwürfel 6–8 Min. gar ziehen; Miso zum Schluss einrühren."],
    checks: "Gastritis – weich & warm · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Reis ↔ Vollkornreis.",
    side: "Warmer Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese zosui rice soup with chicken and vegetables in a light broth, gentle steam"),
  },
  {
    id: "so-m",
    title: "Rind-Brokkoli (牛肉芥蘭改) mit Reis – mild",
    desc: "Kantonesisch inspiriertes Pfannengericht ohne Schärfe.",
    story: "Rind mit Gemüse aus dem Wok ist ein Klassiker vieler chinesischer Haushalte – schnell und ausgewogen.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Rinderhüfte mager 220 g",
      "Brokkoli 300 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 20 ml",
      "Maisstärke 6 g",
      "Reis (roh) 90 g",
    ],
    steps: ["Reis garen.", "Rind in wenig Öl kurz anbraten bis durch, herausnehmen.", "Gemüse anbraten, Sojasauce + Stärke mit etwas Wasser zugeben, Rind zurück, kurz glasiert schwenken."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Rind ↔ Putenbrust; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Pak Choi.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese beef and broccoli stir-fry in a light sauce, side bowl of rice, no chili"),
  },
  {
    id: "so-a",
    title: "Seelachs Nitsuke (煮付け) mit Spinat & Reis",
    desc: "Sanft geschmorter Pollack in leichter Sojasud-Glasur (niedriger Natriumgehalt).",
    story: "Nitsuke ist eine klassische japanische Schmortechnik für Fisch – unkompliziert und sehr bekömmlich.",
    target: "≈70 g KH gesamt (2 P.)",
    ingredients: [
      "Seelachsfilet 320 g",
      "Spinat 250 g",
      "Sojasauce natriumarm 20 ml",
      "Mirin (optional) 5 ml",
      "Ingwer 8 g",
      "Wasser 200 ml",
      "Reis (roh) 90 g",
    ],
    steps: ["Reis kochen.", "Sud aus Wasser/Sojasauce/Ingwer erhitzen; Fisch 8–10 Min. sanft schmoren bis durch.", "Spinat in der Resthitze zusammenfallen lassen; alles servieren."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Seelachs durchgegart, quecksilberarm",
    swaps: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Kleine Schale Gurken-Pickle (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese nitsuke pollock fillet in light soy-simmered glaze, side of spinach and rice"),
  },
];

// ---------- Parsing & Einkaufsliste ----------
const parseLine = (s) => {
  // Erwartet: "Name 123 g/ml/l/EL/TL/Stück" – toleriert Klammern im Namen
  const m = s.match(/^(.*)\s(\d+[\.,]?\d*)\s*(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return { name: s, amount: null, unit: null };
  let name = m[1].trim();
  let amount = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  if (unit === "l") {
    unit = "ml";
    amount = amount * 1000;
  }
  return { name, amount, unit };
};

const normalizeName = (name) => name.replace(/\s+/g, " ").trim();

const classify = (name) => {
  const lower = name.toLowerCase();
  const isProtein = /hähnchen|pute|rind|schwein|lachs|kabeljau|seelachs|fisch|tofu|eier?/i.test(name);
  const isStarch = /reis|udon|soba|reisnudeln|pasta|gerste|perlgerste|nudel/i.test(lower);
  const isVeg = /brokkoli|pak choi|paprika|karotte|tomate|zwiebel|zucchini|spinat|chinakohl|kürbis|kartoffel|frühlingszwiebel|gurke|shiitake|champignon|pilz/i.test(lower);
  const isSeasoning = /sojasauce|miso|doenjang|mirin|honig|salz|brühe|sesamöl|öl|ingwer|knoblauch|wakame|nori|stärke|essig|wasser/i.test(lower);
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

// ---------- UI Components ----------
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
            Diabetes & Schwangerschaft: milde Würzung, quecksilberarme Fische, Eier stets vollständig gestockt, Sojasauce natriumarm. Algen sparsam. Metformin-Reminder bei Frühstück & Abendessen.
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

      {/* Rezepte */}
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
                  {/* DALL·E Prompt – NICHT rendern */}
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

export default function Woche48DE() {
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

// Auto-mount for preview (optional in app runtime)
try {
  const rootEl = document.getElementById("root");
  if (rootEl) createRoot(rootEl).render(<Woche48DE />);
} catch {}