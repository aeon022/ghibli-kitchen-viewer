// src/plans/Woche-5-2025-10-27.de.jsx
// Datei: Woche-5-2025-10-27.de.jsx (Design 1:1 wie Woche-4)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data"; // ← Direkt, ohne Overrides

export const meta = {
  title: "Woche 5",
  startDate: "2025-10-27",
  id: "woche-5-2025-10-27",
  lang: "de",
  sidebar: "[DE] Woche 5 (2025-10-27)",
};
const FILE_BASE = "Woche 5 2025-10-27";

const UI_TITLES = {
  main: "GhibliKitchen – Woche 5",
  list: "GhibliKitchen – Einkaufsliste – Woche 5",
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

// ---------- DATA (21 Rezepte) ----------
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Ochazuke mit Kabeljausplittern (お茶漬け)",
    desc: "Warme Grüntee-Reisschale mit zarten Kabeljauflocken; inspiriert von Just One Cookbook.",
    story: "Ochazuke kommt aus Japan – leicht, mild und ideal am Morgen.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Grüntee (heiß) 400 ml",
      "Kabeljaufilet 140 g",
      "Nori 1 Stück",
      "Sesam 6 g",
      "Ingwer 6 g",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 15 g",
    ],
    steps: [
      "Reis garen.",
      "Kabeljau über Dampf 8–10 Min. vollständig garen, zerzupfen.",
      "Reis in Schalen, mit heißem Tee aufgießen; Fisch/Nori/Sesam/Frühlingszwiebel darauf, mild würzen.",
    ],
    checks: "Gastritis – mild, warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, Jod sparsam",
    swaps: "Kabeljau ↔ Seelachs; Grüntee ↔ milde Brühe.",
    side: "Kleine Gurken-Pickles (ohne Chili).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Ochazuke rice bowl, hot green tea broth, flaked cooked cod, nori strips, sesame, scallions"),
  },
  {
    id: "mo-m",
    title: "Janchi-Guksu mit Huhn (잔치국수)",
    desc: "Koreanische Festnudelsuppe – klar, mild und leicht.",
    story: "„Janchi“ bedeutet Fest – die Nudelsuppe ist alltagstauglich und bekömmlich.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Somen (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Zucchini 150 g",
      "Karotte 100 g",
      "Frühlingszwiebel 20 g",
      "Wasser 1000 ml",
      "Sojasauce natriumarm 12 ml",
    ],
    steps: [
      "Brühe ansetzen; Hähnchenstreifen 6–8 Min. gar ziehen.",
      "Gemüse julienne 2–3 Min. mitköcheln.",
      "Somen separat kochen, abspülen und in der Brühe servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Somen ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Rettichscheiben blanchiert.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear Korean noodle soup with chicken strips, zucchini and carrot, light broth"),
  },
  {
    id: "mo-a",
    title: "Chinakohl-Tofu-Schmortopf (白菜豆腐煮) & Reis",
    desc: "Sanft geschmorter Napa-Kohl mit Tofu und Pilzen, dazu Reis.",
    story: "Hausmannskost aus Nordchina – weich, warm, magenfreundlich.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Chinakohl 400 g",
      "Tofu fest 360 g",
      "Shiitake 120 g",
      "Gemüsebrühe 400 ml",
      "Sojasauce natriumarm 18 ml",
      "Sesamöl 6 ml",
      "Ingwer 8 g",
    ],
    steps: [
      "Reis garen.",
      "Kohl und Pilze in Brühe 10–12 Min. sanft schmoren.",
      "Tofu zugeben, 3–4 Min. ziehen lassen, mild abschmecken; mit Reis servieren.",
    ],
    checks: "Gastritis – mild geschmort · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Putenbrust; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Braised napa cabbage with tofu and shiitake in light broth, side bowl of rice"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Süßkartoffel-Juk (고구마죽) mit Tofu",
    desc: "Cremiger koreanischer Süßkartoffel-Reisbrei mit Protein-Boost.",
    story: "Beliebt in Korea als sanftes Frühstück – süßlich und mild.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈21 g p. P.",
    ingredients: [
      "Süßkartoffel 400 g",
      "Reis (roh) 70 g",
      "Wasser 900 ml",
      "Tofu seiden 200 g",
      "Ingwer 6 g",
      "Salz 1 g",
    ],
    steps: [
      "Süßkartoffel und Reis 25–30 Min. weich kochen.",
      "Fein pürieren; Tofu einrühren und 2–3 Min. ziehen lassen.",
      "Sehr mild abschmecken.",
    ],
    checks: "Gastritis – weich & mild · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hühnerbrustwürfel; Reis ↔ Hirse.",
    side: "Warmer Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Silky sweet potato rice porridge with silken tofu, pastel bowl, steam visible"),
  },
  {
    id: "di-m",
    title: "Yaki Udon – Gemüse & Huhn (やきうどん)",
    desc: "Japanische Pfannennudeln, wenig Öl, ohne Schärfe.",
    story: "Yaki Udon ist flexibel – hier mild mit viel Gemüse.",
    target: "≈79 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Paprika 150 g",
      "Zwiebel 80 g",
      "Spinat 150 g",
      "Sojasauce natriumarm 22 ml",
      "Sesamöl 6 ml",
    ],
    steps: ["Udon kochen und abspülen.", "Hähnchen in wenig Öl gar braten.", "Gemüse zugeben, kurz schwenken; mild würzen."],
    checks: "Gastritis – mild, wenig Öl · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light yaki udon with chicken and colorful vegetables, no chili, glossy noodles"),
  },
  {
    id: "di-a",
    title: "Nizakana: Kabeljau in Ingwer-Miso-Sud (鱈の煮付け) & Reis",
    desc: "Japanisch geschmorter Fisch – salzarm, sanfte Süße.",
    story: "Nizakana ist ein Klassiker der Hausmannskost in Japan.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈29 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Kabeljaufilet 320 g",
      "Wasser 300 ml",
      "Sojasauce natriumarm 20 ml",
      "Mirin 6 ml",
      "Honig 4 g",
      "Ingwer 10 g",
    ],
    steps: [
      "Reis garen.",
      "Sud aus Wasser/Sojasauce/Mirin/Honig/Ingwer aufkochen.",
      "Fisch 8–10 Min. im Sud sanft schmoren (durchgaren); mit Reis servieren.",
    ],
    checks: "Gastritis – mild, wenig Säure · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Fisch durchgegart",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Simmered cod in light ginger-miso broth, served with a bowl of rice"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Tofu-Scramble-Reisschale (豆腐スクランブル丼)",
    desc: "Pflanzliches „Rührei“ aus Tofu auf warmem Reis.",
    story: "Japanisch inspiriert – proteinreich und gut verdaulich.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈23 g p. P.",
    ingredients: ["Reis (roh) 80 g", "Tofu fest 250 g", "Spinat 150 g", "Zwiebel 60 g", "Sojasauce natriumarm 10 ml", "Sesam 6 g"],
    steps: ["Reis garen.", "Tofu krümeln und mit Zwiebel/Spinat 4–5 Min. sanft braten, vollständig garen.", "Über Reis geben, mild würzen."],
    checks: "Gastritis – mild, wenig Öl · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Reis ↔ Vollkornreis; Spinat ↔ Pak Choi.",
    side: "Warmer Bancha-Tee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Tofu scramble over steamed rice with spinach, gentle colors, top-down"),
  },
  {
    id: "mi-m",
    title: "Somen-Nudelsuppe mit Pilzen (そうめん)",
    desc: "Klare, leichte Brühe mit feinen Weizennudeln.",
    story: "Somen sind besonders zart – in Brühe sehr bekömmlich.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: ["Somen (trocken) 110 g", "Shiitake 140 g", "Frühlingszwiebel 20 g", "Miso hell 18 g", "Wasser 1000 ml", "Sojasauce natriumarm 10 ml"],
    steps: ["Brühe aus Wasser/Miso/Sojasauce erhitzen.", "Pilze 4–5 Min. simmern.", "Somen separat kochen, abspülen und in der Brühe servieren."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Somen ↔ Udon; Pilze ↔ Zucchini.",
    side: "Kleine Gurke.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light somen soup with shiitake and scallions in clear bowl"),
  },
  {
    id: "mi-a",
    title: "Aubergine nach YuXiang-Art – mild (鱼香茄子) & Reis",
    desc: "Aromatisch ohne Chili, reduziertem Öl, sanft gebunden.",
    story: "Sichuan-Aroma ohne Schärfe – tomatig, süß-sauer ausbalanciert.",
    target: "≈73 g KH gesamt (2 P.) · Protein ≈16 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Aubergine 400 g",
      "Knoblauch 1 Stück",
      "Ingwer 8 g",
      "Tomaten (reif) 300 g",
      "Sojasauce natriumarm 20 ml",
      "Reisessig mild 6 ml",
      "Honig 4 g",
      "Maisstärke 10 g",
    ],
    steps: ["Reis garen; Aubergine in Stücken mit wenig Öl schmoren.", "Tomaten/Sauce zugeben und 8–10 Min. sanft köcheln.", "Mit Stärke leicht binden, über Reis servieren."],
    checks: "Gastritis – mild, wenig Säure · Diabetes ✓ – ≈73 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Aubergine ↔ Zucchini; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Spinat.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Glazed eggplant in mild garlic-ginger tomato sauce, bowl of rice alongside"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Oyakodon – Ei vollständig gestockt (親子丼)",
    desc: "Huhn-Ei-Reisschale, sanft geschmort, ohne rohe Ei-Partien.",
    story: "Oyakodon ist ein Klassiker aus Japan – hier extra durchgegart.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈31 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Hähnchenbrust 220 g", "Zwiebel 60 g", "Eier 3 Stück", "Sojasauce natriumarm 20 ml", "Mirin 8 ml", "Wasser 200 ml"],
    steps: ["Reis garen.", "Huhn/Zwiebel in Sojasauce/Mirin/Wasser 6–8 Min. schmoren.", "Verquirlte Eier einlaufen lassen und rühren, bis vollständig gestockt; über Reis servieren."],
    checks: "Gastritis – mild geschmort · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Ei/Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Miso-Suppe mild.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Oyakodon bowl with fully set egg, tender chicken, glossy sauce over rice"),
  },
  {
    id: "do-m",
    title: "Kongnamul-bap – Sprossenreis (콩나물밥)",
    desc: "Koreanischer Sojabohnensprossen-Reis mit leichter Würze.",
    story: "Beliebt für seine Leichtigkeit und das nussige Aroma der Sprossen.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Sojabohnensprossen 250 g", "Frühlingszwiebel 20 g", "Sesam 6 g", "Sojasauce natriumarm 12 ml", "Wasser 200 ml"],
    steps: ["Reis mit Wasser und Sprossen zusammen garen.", "Mit Sojasauce und Sesam behutsam würzen.", "Mit Lauchgrün servieren."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ gut gewaschen & erhitzt",
    swaps: "Sprossen ↔ Spinat; Reis ↔ Vollkornreis.",
    side: "Kimchi mild (ohne Schärfe) separat.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean bean sprout rice in a bowl, glossy grains, scallions and sesame on top"),
  },
  {
    id: "do-a",
    title: "Miso-Ingwer-Hähncheneintopf & Gemüse (鶏の味噌生姜煮) + Reis",
    desc: "Sanft geköcheltes Huhn mit Karotte & Rettich, dazu Reis.",
    story: "Wärmend und ausgewogen – klassische Winterküche Japans.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Hähnchenbrust 300 g", "Karotte 200 g", "Rettich (Daikon) 200 g", "Miso hell 24 g", "Wasser 800 ml", "Sojasauce natriumarm 10 ml", "Ingwer 8 g"],
    steps: ["Reis garen.", "Gemüse in Misobrühe 12–15 Min. sanft köcheln.", "Huhn zugeben und 8–10 Min. gar ziehen; mit Reis servieren."],
    checks: "Gastritis – mild, lange geköchelt · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Tofu; Reis ↔ Vollkornreis.",
    side: "Blanchierter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ginger-miso chicken stew with carrots and daikon, side rice bowl"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Mais-Congee (玉米粥) mit Seidentofu",
    desc: "Cremiger Reis-Mais-Brei mit weichem Tofu.",
    story: "Südchinesisch inspiriert – süßlich-mild, gut verdaulich.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: ["Reis (roh) 70 g", "Mais (Körner, gekocht) 200 g", "Wasser 1000 ml", "Tofu seiden 200 g", "Salz 1 g"],
    steps: ["Reis und Wasser 30 Min. sanft köcheln.", "Mais und Tofu zugeben, 3–4 Min. ziehen lassen.", "Mild abschmecken."],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Huhn fein; Reis ↔ Hirse.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Silky corn congee with silken tofu in a white bowl, steam visible"),
  },
  {
    id: "fr-m",
    title: "Vollkorn-Risotto mit Zucchini & Erbsen (IT)",
    desc: "Sanft gerührtes Risotto, ballaststoffreich und mild.",
    story: "Italienische Inspiration – passend als einzige IT-Mahlzeit der Woche.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: ["Vollkornreis (risotto, roh) 100 g", "Zucchini 300 g", "Erbsen (TK) 150 g", "Gemüsebrühe 900 ml", "Olivenöl 8 ml", "Parmesan (pasteurisiert) 20 g"],
    steps: ["Reis mit wenig Öl anschwitzen, nach und nach Brühe rühren (20–25 Min.).", "Zucchini/Erbsen die letzten 6–8 Min. mitgaren.", "Mit wenig Parmesan mild abschmecken."],
    checks: "Gastritis – mild gerührt · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ pasteurisierter Käse",
    swaps: "Vollkornreis ↔ Gerste; Parmesan ↔ Hefeflocken.",
    side: "Gedämpfter Brokkoli.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy wholegrain risotto with zucchini and peas, simple bowl, no garnishes"),
  },
  {
    id: "fr-a",
    title: "Shōgayaki – Ingwer-Schweinefleisch (生姜焼き) & Reis",
    desc: "Mageres Schwein in Ingwersauce, kurz gebraten; dazu Reis.",
    story: "Hausmannskost aus Japan – würzig, aber mild und ohne Schärfe.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Schweinelachs (mager) 280 g", "Zwiebel 80 g", "Ingwer 10 g", "Sojasauce natriumarm 20 ml", "Mirin 6 ml", "Honig 4 g"],
    steps: ["Reis garen.", "Schwein in dünnen Scheiben in wenig Öl gar braten.", "Sauce zugeben, kurz glasiert; mit Reis servieren."],
    checks: "Gastritis – mild, wenig Öl · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ Fleisch durchgegart",
    swaps: "Schwein ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Blanchierter Spinat.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ginger pork slices glossy in pan sauce, served with steamed rice"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Hirse-Rotdattel-Porridge (小米红枣粥)",
    desc: "Milder Frühstücksbrei aus Hirse und roten Datteln.",
    story: "Nordchinesische Frühstücksidee – weich und wohlbekömmlich.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈10 g p. P.",
    ingredients: ["Hirse (roh) 80 g", "Rote Datteln 40 g", "Wasser 1000 ml"],
    steps: ["Hirse waschen, mit Wasser aufkochen.", "Datteln zugeben und 25–30 Min. sanft köcheln.", "Bei Bedarf etwas Wasser ergänzen und mild abschmecken."],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Hirse ↔ Reis; Rote Datteln ↔ Kürbiswürfel.",
    side: "Warmer Reistee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Millet and red date porridge in a ceramic bowl, soft light"),
  },
  {
    id: "sa-m",
    title: "Japchae – Glasnudeln mit Gemüse & Hähnchen (잡채)",
    desc: "Süßkartoffelglasnudeln, buntes Gemüse, wenig Öl; Chili separat.",
    story: "Koreanischer Klassiker – hier besonders mild.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈27 g p. P.",
    ingredients: [
      "Glasnudeln (dangmyeon, trocken) 90 g",
      "Hähnchenbrust 220 g",
      "Paprika 150 g",
      "Spinat 150 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 22 ml",
      "Sesamöl 8 ml",
    ],
    steps: ["Glasnudeln kochen und abspülen.", "Hähnchenstreifen vollständig garen.", "Gemüse kurz anbraten, alles mild würzen und mischen; Chili separat reichen."],
    checks: "Gastritis – mild, kein Chili · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Glasnudeln ↔ Udon.",
    side: "Gurkensalat ohne Schärfe.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with chicken and colorful vegetables, glossy sweet potato noodles, no chili"),
  },
  {
    id: "sa-a",
    title: "Gedämpfter Wolfsbarsch (清蒸鲈鱼) & Reis",
    desc: "Schonend gedämpfter Fisch mit Ingwer und Lauch.",
    story: "Kantonesische Art – pur und aromatisch.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Wolfsbarsch 320 g", "Ingwer 10 g", "Frühlingszwiebel 24 g", "Sojasauce natriumarm 12 ml", "Sesamöl 6 ml"],
    steps: ["Reis garen.", "Fisch auf Ingwer 10–12 Min. dämpfen (durchgaren).", "Mit Sojasauce/Sesamöl beträufeln, Lauch darauf; mit Reis servieren."],
    checks: "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart",
    swaps: "Wolfsbarsch ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed sea bass with ginger and scallions, light soy drizzle, served with rice"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Süßkartoffelreis (さつまいもご飯)",
    desc: "Japanischer Dampf-Reis mit Süßkartoffelwürfeln – leicht süßlich.",
    story: "Herbstliches Alltagsgericht in Japan.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈10 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Süßkartoffel 250 g", "Kombu 2 g", "Wasser 300 ml", "Sesam 6 g"],
    steps: [
      "Süßkartoffel würfeln, Reis waschen.",
      "Mit Kombu und Wasser zusammen im Reiskocher garen (Kombu nach dem Garen entfernen).",
      "Mit Sesam servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ vollständig gegart, Jod sparsam",
    swaps: "Reis ↔ Vollkornreis; Sesam ↔ Nori.",
    side: "Warmer Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese sweet potato rice in pot, golden cubes among white grains"),
  },
  {
    id: "so-m",
    title: "Tomaten-Hühnchen-Nudelsuppe (番茄鸡丝面)",
    desc: "Klare Nudelsuppe mit Tomate und Hühnerstreifen, leicht säuerlich-mild.",
    story: "Chinesische Hausmannskost – wärmend und ausgewogen.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈25 g p. P.",
    ingredients: ["Weizennudeln (trocken) 100 g", "Hähnchenbrust 180 g", "Tomaten (reif) 300 g", "Wasser 1000 ml", "Sojasauce natriumarm 10 ml", "Ingwer 6 g"],
    steps: ["Brühe ansetzen, Tomaten 8–10 Min. köcheln.", "Hühnerstreifen 6–8 Min. gar ziehen.", "Nudeln separat kochen, abspülen und in der Brühe servieren."],
    checks: "Gastritis – milde Säure · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Weizennudeln ↔ Udon; Huhn ↔ Tofu.",
    side: "Gedämpfter Spinat.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken tomato noodle soup, clear red-tinged broth, thin noodles, steam"),
  },
  {
    id: "so-a",
    title: "Tofu-Pilz-Hotpot mild (蘑菇豆腐火锅/두부버섯전골) & kleiner Reis",
    desc: "Leichter Feuertopf mit Tofu, Pilzen und Chinakohl; kleine Reisbeilage.",
    story: "Beliebt in CN/JP/KR – als sanfter Abschluss der Woche.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: ["Reis (roh) 80 g", "Tofu fest 300 g", "Shiitake 180 g", "Enoki 120 g", "Chinakohl 200 g", "Wasser 1200 ml", "Miso hell 20 g", "Sojasauce natriumarm 10 ml"],
    steps: ["Reis garen.", "Gemüse und Tofu in milder Brühe 10–12 Min. sieden.", "Mit wenig Miso/Sojasauce abschmecken, heiß servieren."],
    checks: "Gastritis – mild, warm · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Gurken-Pickles ohne Schärfe.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light tofu and mushroom hotpot in a shallow pot, napa cabbage, steam rising"),
  },
];

// ---------- Wochenübersicht Helper ----------
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = { mo: "Montag", di: "Dienstag", mi: "Mittwoch", do: "Donnerstag", fr: "Freitag", sa: "Samstag", so: "Sonntag" };
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  arr.forEach((r) => map[r.id.split("-")[0]].push(r));
  Object.values(map).forEach((list) => list.sort((a, b) => ["f", "m", "a"].indexOf(a.id.split("-")[1]) - ["f", "m", "a"].indexOf(b.id.split("-")[1])));
  return map;
};

// ---------- List Summary ----------
function normalizeName(n) {
  return n
    .replace(/\(.*?\)/g, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\bgekauft\b/gi, "")
    .replace(/\bgekocht\b/gi, "")
    .replace(/\broh\b/gi, "")
    .replace(/ +/g, " ");
}
function parseQty(item) {
  const m = item.match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = normalizeName(m[1]).trim();
  let qty = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  if (unit.toLowerCase() === "l") {
    qty = qty * 1000;
    unit = "ml";
  }
  return { name, qty, unit };
}
const groupMap = {
  protein: ["Huhn", "Hähnchen", "Pute", "Rind", "Lachs", "Kabeljau", "Seelachs", "Tofu", "Ei", "Eier", "Edamame", "Parmesan", "Schweinefilet", "Schwein", "Rinderhack"],
  veg: ["Karotte", "Zucchini", "Pak Choi", "Spinat", "Shiitake", "Champignons", "Brokkoli", "Lauch", "Zwiebel", "Paprika", "Rettich", "Frühlingszwiebel", "Kartoffel", "Kürbis", "Gurke", "Apfel"],
  staple: ["Reis", "Sushi-Reis", "Vollkornreis", "Brauner Reis", "Gerste", "Udon", "Weizennudeln", "Reisnudeln", "Glasnudeln", "Vollkornpasta"],
  season: ["Wakame", "Nori", "Brühe", "Gemüsebrühe", "Sojasauce", "Miso", "Doenjang", "Sesamöl", "Rapsöl", "Olivenöl", "Mirin", "Honig", "Zimt", "Salz", "Sesam", "Knoblauch", "Ingwer", "Tomaten (passiert)", "Wasser"],
};
function accumulateList(data) {
  const buckets = { protein: {}, veg: {}, staple: {}, season: {} };
  data.forEach((r) =>
    r.ingredients.forEach((ing) => {
      const q = parseQty(ing);
      if (!q) return;
      const n = normalizeName(q.name);
      const key = n;
      const add = (b) => {
        if (!buckets[b][key]) buckets[b][key] = { qty: 0, unit: q.unit };
        buckets[b][key].qty += q.qty;
      };
      const nLower = n.toLowerCase();
      if (groupMap.protein.some((w) => nLower.includes(w.toLowerCase()))) add("protein");
      else if (groupMap.staple.some((w) => nLower.includes(w.toLowerCase()))) add("staple");
      else if (groupMap.veg.some((w) => nLower.includes(w.toLowerCase()))) add("veg");
      else if (groupMap.season.some((w) => nLower.includes(w.toLowerCase()))) add("season");
    })
  );
  return buckets;
}
function formatBucket(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${k} ${Math.round(v.qty)} ${v.unit}`)
    .sort((a, b) => a.localeCompare(b));
}
function buildListSummary() {
  const b = accumulateList(DATA);
  return {
    "Protein/Fisch/Tofu": formatBucket(b.protein),
    "Gemüse/Pilze": formatBucket(b.veg),
    "Reis/Nudeln/Sättigung": formatBucket(b.staple),
    "Algen/Brühen/Würze": formatBucket(b.season),
  };
}
const LIST_SUMMARY = buildListSummary();

// ---------- persistence ----------
const getImageKey = (suffix) => `${FILE_BASE}::img::${suffix}`;
const readLocalImage = (key) => localStorage.getItem(key) || "";
const saveLocalImage = (key, dataUrl) => localStorage.setItem(key, dataUrl);

function ImageUpload({ storageKey, label }) {
  const [src, setSrc] = useState(() => readLocalImage(storageKey));
  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setSrc(dataUrl);
      saveLocalImage(storageKey, dataUrl);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="print:hidden" style={{ marginBottom: 12 }}>
      <label style={{ display: "block", marginBottom: 6, color: COLORS.neutral }}>{label}</label>
      <input type="file" accept="image/*" onChange={onChange} />
      {src ? (
        <div style={{ marginTop: 8 }}>
          <img src={src} alt={label} style={{ maxWidth: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} />
        </div>
      ) : null}
    </div>
  );
}

// ---------- i18n Helpers ----------
const dayNameI18n = (id, t) => t.day[id.split("-")[0]];
const mealTitleI18n = (id, t) => t.mealTitle[id.split("-")[1]];
const mealLabelI18n = (id, t) => t.meal[id.split("-")[1]];

// ---------- Recipe Card ----------
function RecipeCard({ r, t, lang }) {
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={`Rezeptbild hochladen: ${pickText(r.title, lang)}`} />
          </div>
          {img ? <img src={img} alt={pickText(r.title, lang)} style={{ width: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /> : null}
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            <div>
              <b>
                {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
              </b>
            </div>
            <div style={{ marginTop: 6 }}>{pickText(r.desc, lang)}</div>
            <div style={{ marginTop: 6 }}>
              <b>Ziel:</b> {pickText(r.target, lang)}
            </div>
            <div>
              <b>Checks:</b> {pickText(r.checks, lang)}
            </div>
            <div>
              <b>{t.sections.side}:</b> {pickText(r.side, lang)}
            </div>
            {r.remind ? (
              <div
                style={{
                  marginTop: 8,
                  padding: "6px 8px",
                  background: "rgba(5,150,105,.08)",
                  border: `1px solid ${COLORS.emerald}`,
                  borderRadius: 10,
                  fontSize: 13,
                }}
              >
                💊 Metformin mit der Mahlzeit einnehmen.
              </div>
            ) : null}
          </div>
        </aside>
        <main style={{ gridColumn: "span 8", ...cardMainStyle }}>
          <div style={{ fontSize: 12, color: COLORS.sky, fontWeight: 700, marginTop: -4, marginBottom: 6 }}>
            {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
          </div>
          <h2 style={{ marginTop: 0 }}>{pickText(r.title, lang)}</h2>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{pickText(r.story, lang)}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients} (2 Personen)</h3>
              <ul className="avoid-break">
                {pickList(r.ingredients, lang).map((x, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {x}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.steps}</h3>
              <ol className="avoid-break" style={{ paddingLeft: 18 }}>
                {pickList(r.steps, lang).map((s, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {s}
                  </li>
                ))}
              </ol>
              <div style={{ marginTop: 6, fontSize: 12 }}>
                <b>{t.sections.swaps}:</b> {pickText(r.swaps, lang)}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// ---------- Cookbook ----------
function Cookbook({ t, lang }) {
  const weekly = useMemo(() => groupByDay(DATA), []);
  return (
    <div id="cookbook-root">
      {/* Cover + Wochenübersicht */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              Woche ab {meta.startDate} – <b>Modus: Non-Strict (balanced)</b>; CN/JP/KR dominiert, milde Würzung, natriumarme Sojasauce, schwangerschaftssicher; Diabetes: 60–90 g KH pro
              Mahlzeit (2 P.).
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="Cover-Bild hochladen" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>Wochenübersicht</h2>
            <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 8, fontSize: 14 }}>
              {DAYS_ORDER.map((d) => (
                <div key={d} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{t.day[d]}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {(weekly[d] || []).map((m) => (
                      <div key={m.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                        <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabelI18n(m.id, t)}</div>
                        <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{pickText(m.title, lang)}</div>
                        <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>
                          🌾 {pickText(m.target, lang).replace("KH gesamt", "KH")}
                          {m.remind ? " · 💊" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Rezeptseiten */}
      {DATA.map((r) => (
        <RecipeCard key={r.id} r={r} t={t} lang={lang} />
      ))}
    </div>
  );
}

// ---------- Grocery List ----------
function GroceryList() {
  const rootRef = useRef(null);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>Automatisch aus den Rezepten summiert (Woche ab {meta.startDate}).</p>
          <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {Object.entries(LIST_SUMMARY).map(([group, items]) => (
              <div key={group} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 12, background: COLORS.panelBG70 }}>
                <h3 style={{ marginTop: 0, color: COLORS.indigo }}>{group}</h3>
                <ul>
                  {items.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            Hinweise: Sojasauce natriumarm; Algen (Wakame/Nori) sparsam; alle Speisen vollständig durchgaren.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Main ----------
export default function Woche5_2025_10_27_DE() {
  const [tab, setTab] = useState("kochbuch");
  const [lang, setLang] = useState(() => localStorage.getItem("ghibli-lang") || "de");
  const t = UI[lang] || UI.de;
  const toggleLang = () => {
    const next = lang === "de" ? "zh" : "de";
    setLang(next);
    localStorage.setItem("ghibli-lang", next);
  };
  const [pdfLink, setPdfLink] = useState({ kochbuch: "", einkauf: "" });
  const [htmlLink, setHtmlLink] = useState({ kochbuch: "", einkauf: "" });

  useEffect(() => {
    Tests();
  }, []);

  const doPDF = async () => {
    const isCook = tab === "kochbuch";
    const id = isCook ? "cookbook-root" : "list-root";
    const name = `${FILE_BASE} – ${isCook ? "kochbuch" : "einkauf"}`;
    const res = await exportPDFById(id, name, isCook ? "landscape" : "portrait", {
      pageBg: COLORS.pageBg,
      after: [".page"],
      avoid: [".avoid-break"],
    });
    if (res?.blobUrl) {
      setPdfLink((s) => ({ ...s, [isCook ? "kochbuch" : "einkauf"]: res.blobUrl }));
    }
  };

  const doHTML = () => {
    const isCook = tab === "kochbuch";
    const id = isCook ? "cookbook-root" : "list-root";
    const name = `${FILE_BASE} – ${isCook ? "kochbuch" : "einkauf"}`;
    const css = buildEmbedCss({ pageBg: COLORS.pageBg, text: COLORS.text });
    const url = exportHTMLById(id, name, css, COLORS.pageBg);
    if (url) setHtmlLink((s) => ({ ...s, [isCook ? "kochbuch" : "einkauf"]: url }));
  };

  return (
    <div style={{ background: COLORS.pageBg, minHeight: "100vh", padding: 16 }}>
      <div className="print:hidden" style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setTab("kochbuch")}
            style={{
              padding: "8px 14px",
              borderRadius: 14,
              border: `1px solid ${COLORS.border}`,
              boxShadow: COLORS.btnShadow,
              background: tab === "kochbuch" ? COLORS.indigo : COLORS.white,
              color: tab === "kochbuch" ? "#fff" : COLORS.text,
            }}
          >
            {t.tabs.cookbook}
          </button>
          <button
            onClick={() => setTab("einkauf")}
            style={{
              padding: "8px 14px",
              borderRadius: 14,
              border: `1px solid ${COLORS.border}`,
              boxShadow: COLORS.btnShadow,
              background: tab === "einkauf" ? COLORS.indigo : COLORS.white,
              color: tab === "einkauf" ? "#fff" : COLORS.text,
            }}
          >
            {t.tabs.list}
          </button>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={doPDF}
            style={{ padding: "10px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}
          >
            {t.btn.pdf}
          </button>
          <button
            onClick={doHTML}
            style={{ padding: "10px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}
          >
            {t.btn.html}
          </button>
          <button
            onClick={() => window.print()}
            style={{ padding: "10px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}
          >
            {t.btn.print}
          </button>
        </div>
      </div>

      <div style={{ display: tab === "kochbuch" ? "block" : "none" }}>
        <Cookbook t={t} lang={lang} />
      </div>
      <div style={{ display: tab === "einkauf" ? "block" : "none" }}>
        <GroceryList />
      </div>

      {/* Download-Links unter dem jeweiligen Tab-Inhalt */}
      <div className="print:hidden" style={{ marginTop: 12 }}>
        {tab === "kochbuch" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.kochbuch ? (
              <a href={pdfLink.kochbuch} download={`${FILE_BASE} – kochbuch.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 PDF herunterladen (Kochbuch)
              </a>
            ) : null}
            {htmlLink.kochbuch ? (
              <a href={htmlLink.kochbuch} download={`${FILE_BASE} – kochbuch.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 HTML herunterladen (Kochbuch)
              </a>
            ) : null}
          </div>
        )}
        {tab === "einkauf" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.einkauf ? (
              <a href={pdfLink.einkauf} download={`${FILE_BASE} – einkauf.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 PDF herunterladen (Einkaufsliste)
              </a>
            ) : null}
            {htmlLink.einkauf ? (
              <a href={htmlLink.einkauf} download={`${FILE_BASE} – einkauf.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 HTML herunterladen (Einkaufsliste)
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Tests ----------
function Tests() {
  try {
    if (!/^Woche 5 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    // i18n-Meal-Labels werden dynamisch gerendert (keine feste Prüfung hier)
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zutaten zu wenig: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Steps zu wenig: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
    console.log("[GhibliKitchen] All tests passed (JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}