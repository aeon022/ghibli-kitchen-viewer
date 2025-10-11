// Datei: Woche-2-2025-10-06.de.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

export const meta = {
  title: "Woche 2",
  startDate: "2025-10-06",
  id: "woche-2-2025-10-06-de",
  lang: "de",
  sidebar: "Woche 2 (2025-10-06)",
};
const FILE_BASE = "Woche 2 2025-10-06";

const UI_TITLES = {
  main: "GhibliKitchen – Woche 2",
  list: "GhibliKitchen – Einkaufsliste – Woche 2",
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

// Guards
const asList = (v, lang) => {
  try {
    const out = pickList(v, lang);
    return Array.isArray(out) ? out : [];
  } catch {
    return [];
  }
};
const safeText = (v, lang) => {
  try {
    const s = pickText(v, lang);
    return (s ?? "").toString();
  } catch {
    return "";
  }
};

// ---------- DATA (21 Rezepte) ----------
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Okayu (japanischer Reisbrei) mit Lachs & Seidentofu",
    desc: "Sanfter japanischer Reisbrei mit gedämpftem Lachs und Seidentofu; inspiriert von Just One Cookbook.",
    story: "Okayu ist in Japan ein schonendes Frühstück, beliebt in kühleren Monaten oder bei empfindlichem Magen.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Wasser 800 ml",
      "Lachsfilet 120 g",
      "Seidentofu 200 g",
      "Ingwer 10 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis waschen, mit Wasser aufkochen und 25–30 Min. sanft köcheln.",
      "Lachs über dem Brei 8–10 Min. dämpfen, zerzupfen.",
      "Tofu und Ingwer zugeben, mild mit Sojasauce abschmecken, Frühlingszwiebel darüber.",
    ],
    checks: "Gastritis – mild & warm · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ durchgegart, quecksilberarm",
    swaps: "Seidentofu ↔ fester Tofu; Lachs ↔ Kabeljau; Alternative: Gyudon (mager) oder Shogayaki (mager).",
    side: "Gerste-/Reistee warm.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy okayu porridge, flaked cooked salmon, silken tofu cubes, scallions, steam rising"),
  },
  {
    id: "mo-m",
    title: "Bibimbap mild (ohne Chili, separat serviert)",
    desc: "Koreanische Reisschüssel mit Gemüse und Rinderhack; Chili optional separat; inspiriert von My Korean Kitchen.",
    story: "Bibimbap ist ein Klassiker aus Korea – farbenfroh und ausgewogen, mittags ideal.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈31 g p. P.",
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
      "Reis garen; Gemüse blanchieren oder kurz mit wenig Öl anschwitzen.",
      "Hackfleisch durchgaren, mild würzen.",
      "Eier vollständig stocken; alles in Schüsseln anrichten.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈74 g KH · Schwangerschaft ✓ Ei/Geﬂügel/Fleisch vollständig gegart",
    swaps: "Rinderhack ↔ Putenhack; Vollkornreis ↔ Sushi-Reis; Alternative: mildes Gyudon.",
    side: "Gochujang separat.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap, brown rice, sautéed spinach carrots shiitake, fully cooked egg"),
  },
  {
    id: "mo-a",
    title: "Milde Mapo-Tofu-Pfanne mit Shiitake",
    desc: "Chinesischer Klassiker in milder, misoartiger Sauce; inspiriert von Omnivore’s Cookbook.",
    story: "Mapo-Tofu kommt aus Sichuan – diese Version ist würzig, aber nicht scharf.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Fester Tofu 400 g",
      "Shiitake 150 g",
      "Helles Miso 20 g",
      "Gemüsebrühe 300 ml",
      "Sojasauce natriumarm 20 ml",
      "Knoblauch 1 Zehe",
      "Ingwer 10 g",
      "Speisestärke 10 g",
      "Vollkornreis (roh) 90 g",
    ],
    steps: [
      "Reis kochen; Shiitake in wenig Öl anschwitzen.",
      "Brühe + Miso + Sojasauce erhitzen; Tofu 4–5 Min. ziehen lassen.",
      "Mit Stärke leicht binden; zu Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ durchgegart",
    swaps: "Vollkornreis ↔ weißer Reis; Miso ↔ helle Bohnensauce; Alternative: milde Hackfleisch-Variante.",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce over rice, no chili"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Onigiri (Lachsfüllung) & milde Miso-Suppe",
    desc: "Reisbällchen mit Lachs, dazu milde Miso-Suppe; inspiriert von Just One Cookbook.",
    story: "Onigiri ist Bento-Kultur – praktisch und sanft im Geschmack.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈27 g p. P.",
    ingredients: [
      "Sushi-Reis (roh) 100 g",
      "Lachsfilet 150 g",
      "Nori 1 Blatt",
      "Helles Miso 20 g",
      "Tofu fest 150 g",
      "Wakame (getrocknet) 2 g",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis kochen, noch warm Onigiri formen; gegarten Lachs zerzupfen als Füllung, mit Nori umwickeln.",
      "Miso in heißem (nicht kochendem) Wasser lösen; Tofu/Wakame kurz ziehen lassen.",
      "Mild mit Sojasauce abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈78 g KH · Schwangerschaft ✓ Fisch durchgegart, Algen sparsam",
    swaps: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Seelachs.",
    side: "Milder Grüntee (entkoffeiniert möglich).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of mild miso soup with tofu and wakame"),
  },
  {
    id: "di-m",
    title: "Gebratene Reisnudeln mit Hähnchen (mild)",
    desc: "Kantonesisch inspirierte breite Reisnudeln, viel Gemüse; inspiriert von The Woks of Life.",
    story: "Ho Fun-Style – schnell und ausgewogen.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈39 g p. P.",
    ingredients: [
      "Reisnudeln (breit, trocken) 80 g",
      "Hähnchenbrust 250 g",
      "Paprika 150 g",
      "Pak Choi 200 g",
      "Zwiebel 80 g",
      "Karotte 100 g",
      "Sojasauce natriumarm 25 ml",
      "Sesamöl 10 ml",
    ],
    steps: [
      "Reisnudeln einweichen/kurz blanchieren.",
      "Hähnchen in Streifen vollständig garen.",
      "Gemüse zugeben, mild würzen, kurz schwenken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈74 g KH · Schwangerschaft ✓ Geflügel durchgegart",
    swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried wide rice noodles with chicken and veggies, light glossy sauce, no chili"),
  },
  {
    id: "di-a",
    title: "Doenjang-Jjigae (Sojabohnenpaste-Eintopf) + Gerste",
    desc: "Kräftiger, aber milder koreanischer Eintopf; inspiriert von Seon Kyoung Longest.",
    story: "Herbst-/Winter-Liebling in Korea – wohlig ohne Schärfe.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Doenjang (Koreanische Sojabohnenpaste) 30 g",
      "Tofu fest 300 g",
      "Zucchini 200 g",
      "Kartoffel 200 g",
      "Shiitake 100 g",
      "Zwiebel 70 g",
      "Wasser 800 ml",
      "Sojasauce natriumarm 10 ml",
      "Perlgerste (roh) 70 g",
    ],
    steps: [
      "Doenjang im Wasser lösen, Gemüse 12–15 Min. sanft köcheln.",
      "Tofu zugeben, kurz ziehen lassen.",
      "Gerste getrennt weich kochen und dazu servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈86 g KH · Schwangerschaft ✓ durchgegart",
    swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust.",
    side: "Milde eingelegte Gurke (ohne Chili).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Kürbis-Reisbrei mit Tofu & Edamame",
    desc: "Seidiger Kürbisbrei, proteinreich; inspiriert von Mom’s Korean Recipes.",
    story: "Saisonal mit Herbstkürbis – weich und warm.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Kürbis (Hokkaido/Butternut) 400 g",
      "Reis (roh) 70 g",
      "Tofu fest 200 g",
      "Edamame (ohne Schale) 100 g",
      "Ingwer 8 g",
      "Wasser 900 ml",
      "Salz Prise",
    ],
    steps: [
      "Kürbis + Reis 25 Min. sanft köcheln.",
      "Fein pürieren; Tofu/Edamame 3–4 Min. mitziehen lassen.",
      "Mild abschmecken.",
    ],
    checks: "Gastritis – weich & warm · Diabetes ✓ ≈75 g KH · Schwangerschaft ✓ durchgegart",
    swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel.",
    side: "Warm: Reis-/Gersten-Tee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge with tofu cubes and green edamame, gentle steam"),
  },
  {
    id: "mi-m",
    title: "Udon in klarer Brühe mit Huhn & Brokkoli",
    desc: "Leichte japanische Nudelsuppe; inspiriert von Just One Cookbook.",
    story: "Klar, mild, sättigend – ideal für mittags.",
    target: "≈79 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 200 g",
      "Zwiebel 60 g",
      "Helles Miso 25 g",
      "Wasser 1000 ml",
      "Sojasauce natriumarm 15 ml",
    ],
    steps: [
      "Brühe aus Miso+Sojasauce erhitzen.",
      "Hähnchen 6–8 Min. sanft garen; Gemüse 3–4 Min. mitköcheln.",
      "Udon separat kochen, abspülen, kurz in der Suppe ziehen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈79 g KH · Schwangerschaft ✓ Geflügel durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Kleine Schale Gurke.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken and broccoli in clear broth"),
  },
  {
    id: "mi-a",
    title: "Gedämpfter Kabeljau mit Ingwer & Reis",
    desc: "Kantonesisch angelehntes Dampfgaren – zart und leicht; inspiriert von Made With Lau.",
    story: "Steamed-Fish-Klassiker, sehr bekömmlich.",
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
      "Fisch auf Ingwerscheiben 8–10 Min. dämpfen (durchgaren).",
      "Sojasauce+Brühe erwärmen, über den Fisch geben; Sesamöl darüber.",
      "Reis garen, dazu servieren.",
    ],
    checks: "Gastritis – gedämpft · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Tamagoyaki & Misosuppe mit kleinem Reis",
    desc: "Japanisches Eieromelett (vollständig gestockt) mit milder Misosuppe.",
    story: "Beliebtes Frühstück, oft auch im Bento.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Tofu fest 150 g",
      "Reis (roh) 80 g",
      "Helles Miso 20 g",
      "Wakame (getrocknet) 1 g",
      "Frühlingszwiebel 20 g",
      "Wasser 800 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis garen. Tamagoyaki vollständig stocken lassen.",
      "Misosuppe kochen; Tofu/Wakame kurz ziehen.",
      "Mit Frühlingszwiebel servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈62 g KH · Schwangerschaft ✓ Ei vollständig gestockt",
    swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Grüntee (niedrig koffeiniert).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"),
  },
  {
    id: "do-m",
    title: "Tomate-Ei-Pfanne mit Tofu & Reis",
    desc: "Chinesischer Hausklassiker in milder, leicht säuerlicher Sauce.",
    story: "Schnell, familientauglich, sehr verbreitet.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Eier 4 Stück",
      "Tofu fest 200 g",
      "Tomaten reif 400 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 10 ml",
      "Rapsöl 10 ml",
    ],
    steps: [
      "Reis kochen; Eier vollständig gar braten.",
      "Tomaten/Zwiebel weich schmoren; Tofu kurz mitziehen.",
      "Mild abschmecken, zu Reis servieren.",
    ],
    checks: "Gastritis – mild-säuerlich · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ Ei vollständig gegart",
    swaps: "Tofu ↔ Putenbrust; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"),
  },
  {
    id: "do-a",
    title: "Milde Bulgogi-Pfanne (Pute) mit Vollkornreis",
    desc: "Koreanisch inspiriert, Pfannenvariante ohne Schärfe; inspiriert von Maangchi.",
    story: "Süßlich-mild und schnell – ideal wochentags.",
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
      "Pute mit Sojasauce/Birne/Knoblauch 15 Min. marinieren.",
      "Kurz und heiß durchbraten.",
      "Gemüse zugeben, mild würzen, mit Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈80 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis.",
    side: "Gurke natur.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Hühner-Congee (japanisch/chinesisch inspiriert)",
    desc: "Warmer Reisbrei mit zarten Hühnerstücken – sehr bekömmlich.",
    story: "In Ostasien klassisch zum Frühstück oder Abend.",
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
      "Reis mit Wasser 30 Min. sanft kochen.",
      "Huhn klein würfeln, 8–10 Min. im Brei garen.",
      "Mild abschmecken, Frühlingszwiebel darüber.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ Geflügel durchgegart",
    swaps: "Huhn ↔ Tofu; Karotte ↔ Kürbis.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"),
  },
  {
    id: "fr-m",
    title: "Leichte Minestrone mit Tofu",
    desc: "Italienische Gemüsesuppe, lange gekocht und mild.",
    story: "Saisonal, angenehm wärmend ohne Schwere.",
    target: "≈69 g KH gesamt (2 P.) · Protein ≈39 g p. P.",
    ingredients: [
      "Vollkornpasta (trocken) 60 g",
      "Weiße Bohnen (abgetropft) 200 g",
      "Karotte 150 g",
      "Staudensellerie 100 g",
      "Tomaten (passiert) 250 ml",
      "Zucchini 150 g",
      "Gemüsebrühe 800 ml",
      "Olivenöl 10 ml",
      "Parmesan (pasteurisiert, optional) 20 g",
      "Tofu fest 300 g",
    ],
    steps: [
      "Gemüse in wenig Öl anschwitzen, Brühe+Passata zugeben, 20–25 Min. sanft köcheln.",
      "Tofu/Bohnen 5 Min. mitschmoren.",
      "Pasta separat kochen, am Ende untermischen.",
    ],
    checks: "Gastritis – lang gekocht mild · Diabetes ✓ ≈69 g KH · Schwangerschaft ✓ Käse pasteurisiert/optional",
    swaps: "Tofu ↔ Hähnchen; Pasta ↔ Gerste.",
    side: "Kräutertee warm.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, few wholegrain pasta pieces"),
  },
  {
    id: "fr-a",
    title: "Teriyaki-Lachs aus dem Ofen & Brokkoli mit Reis",
    desc: "Japanisch inspiriert, low-sodium; inspiriert von Just One Cookbook.",
    story: "Backofen spart Zeit – ideal am Abend.",
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
      "Sauce (Sojasauce + wenig Mirin/Honig + Ingwer) rühren.",
      "Lachs damit bestreichen, 12–14 Min. bei 200°C backen.",
      "Mit Reis & gedämpftem Brokkoli servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈75 g KH (sehr wenig Süße) · Schwangerschaft ✓ gut durchgegart",
    swaps: "Reis ↔ Vollkornreis; Brokkoli ↔ Pak Choi.",
    side: "Grüntee warm.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Yudofu (Tofu im klaren Sud) & kleiner Reis",
    desc: "Sehr bekömmlich, Kyoto-Stil.",
    story: "Leicht, warm, beruhigend – perfekt am Morgen.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Tofu fest 400 g",
      "Gemüsebrühe 800 ml",
      "Lauch 100 g",
      "Spinat 150 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 15 ml",
      "Sesam 10 g",
    ],
    steps: [
      "Brühe erhitzen, Tofu 5–6 Min. sanft ziehen lassen.",
      "Lauch/Spinat kurz mitgaren.",
      "Mild abschmecken; kleinen Reis separat servieren.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ ≈62 g KH · Schwangerschaft ✓ durchgegart",
    swaps: "Reis ↔ Vollkornreis; Spinat ↔ Pak Choi.",
    side: "Warmwasser oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Yudofu in a clay pot with leeks and spinach, small rice bowl"),
  },
  {
    id: "sa-m",
    title: "Japchae (Süßkartoffelglasnudeln) mit Rind, mild",
    desc: "Koreanische Glasnudeln, viel Gemüse; inspiriert von Maangchi.",
    story: "Beliebt warm oder zimmerwarm, auch fürs Teilen.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Glasnudeln (Süßkartoffel, trocken) 80 g",
      "Rindfleisch-Streifen mager 220 g",
      "Paprika 150 g",
      "Karotte 150 g",
      "Champignons 150 g",
      "Spinat 150 g",
      "Sojasauce natriumarm 25 ml",
      "Sesamöl 10 ml",
      "Knoblauch 1 Zehe",
    ],
    steps: [
      "Glasnudeln kochen, kalt abspülen.",
      "Fleisch/Gemüse mit wenig Öl garen, mild würzen.",
      "Mit Nudeln mischen, kurz erwärmen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈75 g KH · Schwangerschaft ✓ Fleisch durchgegart",
    swaps: "Rind ↔ Tofu; Glasnudeln ↔ Reisnudeln.",
    side: "Sesam-Gurkensalat (mild).",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with colorful vegetables and beef strips, glossy but not oily"),
  },
  {
    id: "sa-a",
    title: "Geschmorte Hähnchenkeulen mit Shiitake & kleiner Reis",
    desc: "Chinesisch angelehnt, schonend geschmort; inspiriert von Red House Spice.",
    story: "Weich, aromatisch, familienfreundlich.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Hähnchenkeule ohne Haut 300 g",
      "Shiitake 200 g",
      "Karotte 120 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 25 ml",
      "Ingwer 10 g",
      "Gemüsebrühe 300 ml",
    ],
    steps: [
      "Hähnchen anrösten, Brühe angießen.",
      "Shiitake/Karotte zugeben, 20–25 Min. sanft schmoren.",
      "Mit kleinem Reis servieren.",
    ],
    checks: "Gastritis – geschmort mild · Diabetes ✓ ≈62 g KH · Schwangerschaft ✓ Geflügel durchgegart",
    swaps: "Hähnchen ↔ Tofu; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi/Brokkoli.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised chicken with shiitake and carrots, small rice serving"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Süßer Apfel-Reisbrei mit Tofu",
    desc: "Leicht süßer Frühstücksbrei, sehr sanft.",
    story: "Angenehm im Apfel-Herbst, wärmt am Morgen.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Apfel 150 g",
      "Wasser 1000 ml",
      "Zimt Prise",
      "Tofu fest 300 g",
    ],
    steps: [
      "Reis mit Wasser 30 Min. sanft köcheln.",
      "Apfelwürfel 5 Min. mitköcheln.",
      "Tofu zugeben, mild abschmecken.",
    ],
    checks: "Gastritis – mild & warm · Diabetes ✓ ≈80 g KH · Schwangerschaft ✓ durchgegart",
    swaps: "Apfel ↔ Birne; Tofu ↔ Skyr (pasteurisiert).",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy rice porridge with small apple cubes and tofu, neutral bowl, steam"),
  },
  {
    id: "so-m",
    title: "Klare Nudelsuppe mit Pute & Pak Choi",
    desc: "Chinesisch inspirierte klare Brühe mit zarter Pute; inspiriert von Made With Lau.",
    story: "Bewährt in Erkältungszeiten, schnell und mild.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Weizennudeln (trocken) 100 g",
      "Putenbrust 220 g",
      "Pak Choi 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Gemüsebrühe 900 ml",
      "Sojasauce natriumarm 15 ml",
    ],
    steps: [
      "Brühe erhitzen; Pute 8–10 Min. sanft garen.",
      "Gemüse 3–4 Min. mitkochen.",
      "Nudeln separat garen, abspülen, in die Suppe geben; mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps: "Weizennudeln ↔ Reisnudeln; Pute ↔ Tofu.",
    side: "Warmwasser.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear noodle soup with turkey slices, pak choi and carrots"),
  },
  {
    id: "so-a",
    title: "Milde Seelachs-Daikon-Schmorpfanne & Reis",
    desc: "Koreanisch angelehntes „Jorim“ ohne Schärfe.",
    story: "Sanft mit Rettich (Daikon), perfekt für den Abend.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Seelachsfilet 320 g",
      "Rettich (Daikon) 250 g",
      "Zwiebel 60 g",
      "Doenjang 20 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 500 ml",
      "Reis (roh) 90 g",
      "Sesamöl 8 ml",
    ],
    steps: [
      "Rettich + Doenjang mit Wasser 10 Min. sanft köcheln.",
      "Seelachs zugeben, 8–10 Min. mild schmoren.",
      "Mit Sesamöl abrunden; mit Reis servieren.",
    ],
    checks: "Gastritis – geschmort mild · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart",
    swaps: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Spinat.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild braised pollock with daikon in light brown sauce, small rice bowl"),
  },
];

// ---------- Wochenübersicht Helper ----------
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = { mo: "Montag", di: "Dienstag", mi: "Mittwoch", do: "Donnerstag", fr: "Freitag", sa: "Samstag", so: "Sonntag" };
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  (Array.isArray(arr) ? arr : []).forEach((r) => {
    const d = r?.id?.split?.("-")?.[0];
    if (map[d]) map[d].push(r);
  });
  Object.values(map).forEach((list) =>
    list.sort(
      (a, b) =>
        ["f", "m", "a"].indexOf(a?.id?.split?.("-")?.[1]) -
        ["f", "m", "a"].indexOf(b?.id?.split?.("-")?.[1])
    )
  );
  return map;
};

// ---------- List Summary ----------
function normalizeName(n) {
  return String(n || "")
    .replace(/\(.*?\)/g, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/ +/g, " ");
}
function parseQty(item) {
  const s = String(item || "");
  const m = s.match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = normalizeName(m[1]).trim();
  let qty = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  if ((unit || "").toLowerCase() === "l") {
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
  (Array.isArray(data) ? data : []).forEach((r) =>
    (Array.isArray(r?.ingredients) ? r.ingredients : []).forEach((ing) => {
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
  const title = safeText(r.title, lang);
  const desc = safeText(r.desc, lang);
  const story = safeText(r.story, lang);
  const target = safeText(r.target, lang);
  const checks = safeText(r.checks, lang);
  const side = safeText(r.side, lang);
  const swaps = safeText(r.swaps, lang);
  const ingredients = asList(r.ingredients, lang);
  const steps = asList(r.steps, lang);

  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={`Rezeptbild hochladen: ${title}`} />
          </div>
          {img ? <img src={img} alt={title} style={{ width: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /> : null}
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            <div>
              <b>
                {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
              </b>
            </div>
            <div style={{ marginTop: 6 }}>{desc}</div>
            <div style={{ marginTop: 6 }}>
              <b>Ziel:</b> {target}
            </div>
            <div>
              <b>Checks:</b> {checks}
            </div>
            <div>
              <b>{t.sections.side}:</b> {side}
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
          <h2 style={{ marginTop: 0 }}>{title}</h2>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{story}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients} (2 Personen)</h3>
              <ul className="avoid-break">
                {ingredients.length ? (
                  ingredients.map((x, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      {typeof x === "string" ? x : String(x ?? "")}
                    </li>
                  ))
                ) : (
                  <li style={{ opacity: 0.7 }}>—</li>
                )}
              </ul>
            </section>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.steps}</h3>
              <ol className="avoid-break" style={{ paddingLeft: 18 }}>
                {steps.length ? (
                  steps.map((s, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      {typeof s === "string" ? s : String(s ?? "")}
                    </li>
                  ))
                ) : (
                  <li style={{ opacity: 0.7 }}>—</li>
                )}
              </ol>
              <div style={{ marginTop: 6, fontSize: 12 }}>
                <b>{t.sections.swaps}:</b> {swaps}
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
  const weekly = useMemo(() => {
    try {
      const src = Array.isArray(DATA) ? DATA : [];
      return groupByDay(src);
    } catch {
      return { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    }
  }, []);

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
              {DAYS_ORDER.map((d) => {
                const dayList = Array.isArray(weekly?.[d]) ? weekly[d] : [];
                return (
                  <div key={d} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{t.day[d]}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {dayList.map((m) => {
                        const title = safeText(m?.title, lang);
                        const target = safeText(m?.target, lang);
                        return (
                          <div key={m.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                            <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabelI18n(m.id, t)}</div>
                            <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
                            <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>
                              🌾 {target.replace("KH gesamt", "KH")}
                              {m?.remind ? " · 💊" : ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
            {Object.entries(LIST_SUMMARY).map(([group, items]) => {
              const safeItems = Array.isArray(items) ? items : [];
              return (
                <div key={group} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 12, background: COLORS.panelBG70 }}>
                  <h3 style={{ marginTop: 0, color: COLORS.indigo }}>{group}</h3>
                  <ul>
                    {safeItems.map((t, i) => (
                      <li key={i}>{typeof t === "string" ? t : String(t ?? "")}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
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
export default function Woche2_2025_10_06_DE() {
  const [tab, setTab] = useState("kochbuch");
  const [lang] = useState("de"); // fest auf DE
  const t = UI[lang] || UI.de;

  useEffect(() => {
    Tests();
  }, []);

  const [pdfLink, setPdfLink] = useState({ kochbuch: "", einkauf: "" });
  const [htmlLink, setHtmlLink] = useState({ kochbuch: "", einkauf: "" });

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

      {/* Download-Links */}
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
    if (!/^Woche 2 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zutaten zu wenig: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Steps zu wenig: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
    console.log("[GhibliKitchen] All tests passed (DE Woche-2).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed (DE Woche-2):", e);
  }
}