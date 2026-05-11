// src/plans/Woche-8-2025-11-17.de.jsx
// Strikt nach Woche-5/6 Struktur (1:1), Rezepte = Woche 8 (21 Stück) + pro Tag 1 Reiskocher-Gericht (7 Stück)

import { BookmarkMenuButton } from "@/components/MealCard";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

/* ---------- Meta ---------- */
export const meta = {
  title: "Woche 8",
  startDate: "2025-11-17",
  id: "woche-8-2025-11-17-de",
  lang: "de",
  sidebar: "[DE] Woche 8 (2025-11-17)",
};
const FILE_BASE = "Woche 8 2025-11-17";

/* ---------- UI ----------- */
const UI_TITLES = {
  main: "Moving Kitchen Tales – Woche 8",
  list: "Moving Kitchen Tales – Einkaufsliste – Woche 8",
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

/* ---------- Prompts ---------- */
const PROMPT_HEADER =
  "Ultra-clean cookbook photo, soft daylight, top-down, pastel background, visible steam, pregnancy-safe (no raw fish or raw egg), mild Asian home cooking (JP/CN/KR), family-friendly";
const buildPrompt = (a, b) => `${a}\n${b}`;

/* ---------- Safe helpers ---------- */
const asList = (v, lang) => {
  try {
    const out = pickList(v, lang);
    return Array.isArray(out) ? out : [];
  } catch {
    return [];
  }
};
const safeArr = (v) => (Array.isArray(v) ? v : []);

const toText = (v) => {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    if (typeof v.de === "string") return v.de;
    if (typeof v.zh === "string") return v.zh;
  }
  return String(v ?? "");
};
const toList = (v) => {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object") {
    if (Array.isArray(v.de)) return v.de;
    if (Array.isArray(v.zh)) return v.zh;
  }
  return [];
};

/* ---------- DATA (21 Rezepte – Woche 8) ---------- */
export const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Reisbrei mit Lachs & Seidentofu (お粥)",
    desc: "Japanischer Okayu, sehr mild & salzarm – wärmender Start.",
    story:
      "Okayu stammt aus Japan und wird gern zum Frühstück oder bei Erkältungen gegessen. Sanft, cremig und bekömmlich für ruhige Morgen. Inspiration: inspiriert von Just One Cookbook",
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
      "Tofu einlegen, mit Ingwer/Sojasauce mild abschmecken; Lauchgrün 1 Min. ziehen lassen.",
    ],
    checks:
      "Gastritis – mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm",
    swaps:
      "Seidentofu ↔ fester Tofu; Lachs ↔ Kabeljau; Alternative: Gyudon (牛丼, mager) oder Buta no Shōgayaki (豚の生姜焼き, mager) – kleinere Reisportion.",
    side: "Warmer Gerstentee; kleine Gurken-Pickles (ohne Chili).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu, scallions, rising steam"
    ),
  },
  {
    id: "mo-m",
    title: "Mildes Bibimbap (비빔밥) – Chili separat",
    desc: "Koreanische Reisschale mit Gemüse & Rind; salzarm, Chili extra.",
    story:
      "Bibimbap ist ein koreanischer Klassiker für jede Saison – warm und vielseitig. Diese milde Version setzt auf Gemüse und voll durchgegarte Toppings. Inspiration: inspiriert von My Korean Kitchen",
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
      "Reis garen; Gemüse dünsten oder kurz in wenig Öl anbraten (5–6 Min.).",
      "Hack krümelig vollständig durchgaren (6–8 Min.), mild würzen.",
      "Eier vollständig braten (Eigelb fest); alles anrichten.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest, Fleisch durchgegart",
    swaps:
      "Rinderhack ↔ Putenhack; Vollkornreis ↔ Sushireis; Chili in Minischälchen separat.",
    side: "Kleine Schale Gurke natur; mildes Kimchi ohne Chili optional.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top"
    ),
  },
  {
    id: "mo-a",
    title: "Mildes Mapo-Tofu (麻婆豆腐) – ohne Schärfe",
    desc: "Hausmannskost aus China in milder, miso-basierter Sauce; salzarm.",
    story:
      "Mapo-Tofu stammt aus Sichuan, hier als sanfte Alltagsvariante ohne Schärfe. Wärmend und unkompliziert für den Feierabend. Inspiration: inspiriert von Omnivore’s Cookbook",
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
      "Reis garen (30–35 Min.). Pilze 5 Min. dünsten.",
      "Brühe mit Miso/Sojasauce erhitzen; Tofu 4–5 Min. ziehen lassen.",
      "Mit Stärke leicht binden und über Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:
      "Brauner Reis ↔ weißer Reis; Miso ↔ milde Bohnenpaste; optional mageres Schweinehack (ohne Chili).",
    side: "Gedünsteter Pak Choi; warmer Tee.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Mild mapo tofu with mushrooms, glossy light-brown sauce over brown rice, no chili"
    ),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)",
    desc: "Reisbälle mit gegartem Lachs, dazu milde Misosuppe; salzarm.",
    story:
      "Onigiri gehören zur Bento-Kultur – praktisch für unterwegs. Mit Misosuppe ein leichtes, warmes Frühstück. Inspiration: inspiriert von Just One Cookbook",
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
      "Reis kochen; Lachs 8–10 Min. garen, zerpflücken; Onigiri formen, mit Nori umwickeln.",
      "Miso in heißem Wasser lösen (nicht kochen); Tofu/Wakame 2–3 Min. ziehen lassen.",
      "Mild mit wenig Sojasauce abschmecken.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Lachs durchgegart, Wakame sparsam",
    swaps: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Seelachs.",
    side: "Milder grüner Tee (optional koffeinfrei).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame"
    ),
  },
  {
    id: "di-m",
    title: "Reisnudelpfanne mit Hähnchen (河粉)",
    desc: "Kantonesisch inspirierte Wokpfanne, gemüsebetont und mild.",
    story:
      "Locker angelehnt an Ho-Fun aus Südchina – schnell, ausgewogen und familientauglich. Inspiration: inspiriert von The Woks of Life",
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
      "Reisnudeln einweichen oder kurz blanchieren (3–4 Min.).",
      "Hähnchenstreifen in wenig Öl 5–6 Min. durchgaren.",
      "Gemüse 3–4 Min. mitgaren; mild würzen und schwenken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"
    ),
  },
  {
    id: "di-a",
    title: "Doenjang-Jjigae mit Gerste (된장찌개)",
    desc: "Koreanischer Sojabohnen-Eintopf, herzhaft-mild, mit Gerste.",
    story:
      "Ein Alltags-Eintopf aus Korea – kräftig, aber nicht scharf; perfekt für gemütliche Abende. Inspiration: inspiriert von Seon Kyoung Longest",
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
      "Tofuwürfel 3–4 Min. ziehen lassen.",
      "Gerste separat garen (25–30 Min.) und dazu reichen.",
    ],
    checks:
      "Gastritis – herzhaft, nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust.",
    side: "Mildes Gurken-Pickle (ohne Chili).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"
    ),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Kürbis-Juk mit Tofu & Edamame (단호박죽)",
    desc: "Samtiger Kürbisreisbrei, proteinreich & mild.",
    story:
      "Koreanischer Reisbrei mit saisonalem Kürbis – cremig und angenehm. Inspiration: inspiriert von Mom's Korean Recipes",
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
      "Mild abschmecken und servieren.",
    ],
    checks: "Gastritis – weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Reis- oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"
    ),
  },
  {
    id: "mi-m",
    title: "Udon-Suppe mit Huhn & Brokkoli (うどん)",
    desc: "Klare japanische Nudelsuppe, mild & sättigend.",
    story:
      "Leichte Udon-Brühen sind in Japan ganzjährig beliebt – besonders in kühlen Monaten. Inspiration: inspiriert von Just One Cookbook",
    target: "≈79 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Udon (trocken) 100 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 200 g",
      "Zwiebel 60 g",
      "Miso hell 25 g",
      "Wasser 1000 ml",
      "Sojasauce natriumarm 15 ml",
    ],
    steps: [
      "Brühe mit Miso/Sojasauce erhitzen (nicht kochen).",
      "Hähnchen 6–8 Min. gar ziehen; Gemüse 3–4 Min. mitgaren.",
      "Udon separat 8–10 Min. kochen, abspülen und zugeben.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Kleine Schale Gurke.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Light udon soup with chicken slices and broccoli in clear broth"
    ),
  },
  {
    id: "mi-a",
    title: "Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis",
    desc: "Kantonesisch dämpfen – zart & bekömmlich.",
    story:
      "Sanftes Dämpfen ist ein Klassiker der südchinesischen Küche – leicht und elegant. Inspiration: inspiriert von Made With Lau",
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
      "Fisch auf Ingwerscheiben 8–10 Min. dämpfen.",
      "Sojasauce + Brühe erhitzen, über Fisch geben; Sesamöl dazu.",
      "Reis garen und servieren.",
    ],
    checks:
      "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Brokkoli.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"
    ),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Tamagoyaki & Misosuppe mit kleinem Reis (卵焼き・味噌汁)",
    desc: "Japanisches Frühstück, Ei vollständig gestockt.",
    story:
      "Tamagoyaki ist ein Frühstücksklassiker und beliebt in Bento-Boxen – mild und ausgewogen. Inspiration: inspiriert von Just One Cookbook",
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
      "Reis garen (30 Min.). Omelett vollständig stocken (5–6 Min.).",
      "Misosuppe ansetzen; Tofu/Wakame 2–3 Min. ziehen lassen.",
      "Mit Frühlingszwiebel servieren.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"
    ),
  },
  {
    id: "do-m",
    title: "Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis",
    desc: "Chinesisches Hausgericht, mild-säuerlich & schnell.",
    story:
      "Fànqié Chǎo Dàn ist ein bekannter Alltagsklassiker – mit reifen Tomaten besonders rund. Inspiration: inspiriert von The Woks of Life",
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
      "Reis garen (30 Min.); Eier 3–4 Min. braten bis fest.",
      "Tomaten/Zwiebel 6–8 Min. sanft schmoren; Tofu 2–3 Min. mitziehen lassen.",
      "Mild abschmecken und mit Reis servieren.",
    ],
    checks:
      "Gastritis – milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest",
    swaps: "Tofu ↔ Putenbrustwürfel; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"
    ),
  },
  {
    id: "do-a",
    title: "Bulgogi-Style Pute (불고기) & Vollkornreis – mild",
    desc: "Koreanisch inspirierte Pfanne, süß-mild, Chili optional separat.",
    story:
      "Bulgogi stammt aus Korea – die Pfannenvariante ist schnell und familienfreundlich. Inspiration: inspiriert von Maangchi",
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
      "Pute 15 Min. in Sojasauce/Birne/Knoblauch marinieren.",
      "In wenig Öl 5–6 Min. zügig durchgaren.",
      "Gemüse 3–4 Min. mitgaren; mit Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis.",
    side: "Salatgurke natur; kleines Rettich-Pickle ohne Chili.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"
    ),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Hühner-Congee (鸡肉粥)",
    desc: "Chinesischer Reisbrei mit zartem Huhn – sehr mild.",
    story:
      "Congee ist in Südchina und Südostasien ein Klassiker – wärmt sanft an ruhigen Morgen. Inspiration: inspiriert von The Woks of Life",
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
      "Reis mit Wasser 30 Min. sanft köcheln.",
      "Hähnchen fein würfeln, 8–10 Min. mitgaren bis durch.",
      "Mild abschmecken, Lauchgrün zugeben.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"
    ),
  },
  {
    id: "fr-m",
    title: "Leichte Minestrone (IT) mit Tofu",
    desc: "Italienischer Gemüseeintopf, lange geköchelt, mild & ballaststoffreich.",
    story:
      "Minestrone ist eine italienische Gemüsesuppe – diese sanfte Version passt zu entspannten Mittagspausen. Inspiration: inspiriert von Giallo Zafferano",
    target: "≈69 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Vollkornnudeln (trocken) 80 g",
      "Tofu fest 200 g",
      "Weiße Bohnen (gekocht) 200 g",
      "Karotte 150 g",
      "Stangensellerie 100 g",
      "Zucchini 150 g",
      "Tomatenwürfel (aus der Dose) 200 g",
      "Gemüsebrühe 800 ml",
      "Olivenöl 10 ml",
    ],
    steps: [
      "Gemüse in wenig Öl 4–5 Min. anschwitzen, Brühe zugeben.",
      "15–20 Min. sanft köcheln; Nudeln 8–10 Min. mitgaren.",
      "Tofu und Bohnen 3–4 Min. erwärmen, mild abschmecken.",
    ],
    checks: "Gastritis – mild, nicht scharf · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Vollkornnudeln ↔ Gerste; Tofu ↔ Hähnchen.",
    side: "Gurkensalat ohne Essigschärfe.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Light minestrone with beans, tofu cubes, small pasta, lots of vegetables, gentle broth"
    ),
  },
  {
    id: "fr-a",
    title: "Ofen-Lachs Teriyaki (照り焼き鮭) & Brokkoli, Reis",
    desc: "Schonend gebacken, natriumarm angepasst; süß-mild.",
    story:
      "Teriyaki ist eine japanische Glasurtechnik – hier zurückhaltend gesüßt und salzarm. Inspiration: inspiriert von Just One Cookbook",
    target: "≈77 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Lachsfilet 320 g",
      "Reis (roh) 90 g",
      "Brokkoli 250 g",
      "Sojasauce natriumarm 20 ml",
      "Honig 10 g",
      "Wasser 30 ml",
      "Ingwer 6 g",
    ],
    steps: [
      "Reis garen (30 Min.).",
      "Lachs mit Sojasauce/Wasser/Honig/Ingwer bestreichen; 12–14 Min. bei 180°C backen bis durch.",
      "Brokkoli 4–5 Min. dämpfen, mit Lachs und Reis servieren.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈77 g KH · Schwangerschaft ✓ Lachs durchgegart, quecksilberarm",
    swaps: "Lachs ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Warmer grüner Tee; Rettich-Pickles mild.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Oven-baked teriyaki salmon fillets, steamed broccoli florets, small bowl of rice, glossy light glaze"
    ),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Zōsui-Reissuppe mit Huhn & Gemüse (雑炊)",
    desc: "Japanische Restereissuppe, leicht & wärmend.",
    story:
      "Zōsui ist eine japanische Reissuppe – ideal zur Resteverwertung und für sanfte Morgen. Inspiration: inspiriert von Just One Cookbook",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Gekochter Reis 250 g",
      "Hähnchenbrust 150 g",
      "Möhre 100 g",
      "Shiitake 80 g",
      "Ei 1 Stück",
      "Dashi oder milde Brühe 700 ml",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 15 g",
    ],
    steps: [
      "Brühe erhitzen; Hähnchenwürfel 6–7 Min. gar ziehen.",
      "Reis zugeben und 5 Min. sieden; Ei verquirlt einlaufen lassen und vollständig stocken lassen (1–2 Min.).",
      "Mild mit Sojasauce abschmecken; Lauchgrün darüber.",
    ],
    checks: "Gastritis – mild & warm · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Ei vollständig gestockt",
    swaps: "Hähnchen ↔ Tofu; Reis ↔ Vollkornreis.",
    side: "Jasmintee schwach.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Comforting Japanese zosui rice soup with chicken, set egg curds, vegetables, gentle steam"
    ),
  },
  {
    id: "sa-m",
    title: "Warme Soba mit Tofu & Spinat (そば)",
    desc: "Buchweizennudeln in milder Brühe, gemüsig & salzarm.",
    story:
      "Soba sind in Japan beliebt – hier als leichte Mittagsnudel mit viel Grün. Inspiration: inspiriert von MAFF Japan",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Soba (trocken) 90 g",
      "Tofu fest 200 g",
      "Spinat 200 g",
      "Shiitake 80 g",
      "Miso hell 20 g",
      "Dashi oder Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Brühe mit Miso/Sojasauce erhitzen (nicht kochen).",
      "Soba 6–7 Min. kochen, kalt abspülen, in Brühe geben.",
      "Tofu/Spinat/Pilze 2–3 Min. ziehen lassen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Soba ↔ Udon; Tofu ↔ Hähnchen.",
    side: "Gurke natur; milde Pickles.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Warm soba noodle soup with tofu cubes, spinach and mushrooms in light broth"
    ),
  },
  {
    id: "sa-a",
    title: "Geschmorter Napa-Kohl mit Tofu (白菜豆腐煮) & Reis",
    desc: "Sanft geschmort, leicht & bekömmlich; vegetabil.",
    story:
      "Ein nordchinesisch inspiriertes Pfannengericht – sehr mild und gut verträglich. Inspiration: inspiriert von The Hong Kong Cookery",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Chinakohl 500 g",
      "Tofu fest 300 g",
      "Reis (roh) 90 g",
      "Ingwer 8 g",
      "Knoblauch 1 Zehe",
      "Sojasauce natriumarm 15 ml",
      "Gemüsebrühe 250 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "Reis garen. Kohl in Brühe 8–10 Min. sanft schmoren.",
      "Tofu zugeben, 3–4 Min. ziehen lassen.",
      "Leicht binden und über Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Lauwarmes Gurken-Pickle (ohne Chili).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Braised napa cabbage with tofu in light glossy sauce, served with rice"
    ),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Süßkartoffel-Okayu mit Tofu (さつまいも粥)",
    desc: "Sanfter Reisbrei mit Süßkartoffel – milde Süße, salzarm.",
    story:
      "Eine Hausmannskost-Variante des Okayu – wärmend und freundlich zum Morgenmagen. Inspiration: inspiriert von Just One Cookbook",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Süßkartoffel 250 g",
      "Tofu seiden 180 g",
      "Wasser 900 ml",
      "Ingwer 6 g",
      "Sojasauce natriumarm 8 ml",
    ],
    steps: [
      "Reis + Wasser aufkochen, 25–30 Min. sämig köcheln.",
      "Süßkartoffelwürfel 10–12 Min. weich garen.",
      "Tofu zugeben, mild abschmecken.",
    ],
    checks: "Gastritis – mild & weich · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Süßkartoffel ↔ Kürbis; Seidentofu ↔ fester Tofu.",
    side: "Warmer Hōjicha.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese okayu with sweet potato cubes and silken tofu, soft steam"
    ),
  },
  {
    id: "so-m",
    title: "Tonjiru (豚汁) – Schweine-Miso-Suppe & Reis",
    desc: "Kräftig, aber mild; mageres Schwein, klare Brühe.",
    story:
      "Tonjiru ist eine beliebte Wintersuppe in Japan – sättigend ohne Schärfe. Inspiration: inspiriert von Just One Cookbook",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Mageres Schweinefleisch 220 g",
      "Miso hell 25 g",
      "Kartoffeln 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Dashi oder Wasser 900 ml",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen. Brühe mit Miso erwärmen.",
      "Schweinefleisch 8–10 Min. sanft köcheln bis durch.",
      "Gemüse 10–12 Min. weich ziehen lassen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Schwein durchgegart",
    swaps: "Schwein ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Kleine Gurken-Pickles (ohne Chili).",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese tonjiru pork miso soup with root vegetables, side bowl of rice"
    ),
  },
  {
    id: "so-a",
    title: "Sukiyaki-Style Rind-Gemüse-Topf (すき焼き風) & kleiner Reis",
    desc: "Mild abgeschmeckt, süß-salzig zurückhaltend; Reis klein.",
    story:
      "Sukiyaki ist ein Festessen aus Japan – hier als sanfte Pfannenvariante ohne rohe Eier. Inspiration: inspiriert von Just One Cookbook",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Mageres Rindfleisch in Scheiben 240 g",
      "Zwiebel 80 g",
      "Shiitake 100 g",
      "Chinakohl 300 g",
      "Sojasauce natriumarm 20 ml",
      "Mirin 10 ml",
      "Wasser 200 ml",
      "Reis (roh) 80 g",
    ],
    steps: [
      "Reis garen.",
      "Gemüse 6–8 Min. sanft schmoren, Sauce zugeben.",
      "Rind 2–3 Min. durchgaren, sofort servieren.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ ohne rohe Eier, Fleisch durchgegart",
    swaps: "Rind ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Warmer Grüntee; Rettich-Pickles mild.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Sukiyaki-style beef and vegetables in shallow pan, small bowl of rice, no raw egg"
    ),
  },
];

/* ---------- Reiskocher (7 Gerichte – alles in den Kocher) ---------- */
const RICE_COOKER = [
  {
    id: "mo-rc",
    title: "Reiskocher: Pilz-Takikomi Gohan (きのこご飯)",
    desc: "Umami-Pilzreis – alles in den Kocher, mild & ballaststoffreich.",
    story:
      "Takikomi Gohan ist japanischer Mischreis – Zutaten und Reis garen zusammen, herrlich unkompliziert. Inspiration: inspiriert von Just One Cookbook (Kinoko Gohan) & Okonomi Kitchen",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Dashi oder Wasser 300 ml",
      "Shiitake 100 g",
      "Shimeji 80 g",
      "Karotte 60 g",
      "Ingwer 6 g",
      "Sojasauce natriumarm 15 ml",
      "Mirin 8 ml",
    ],
    steps: [
      "Reis gründlich waschen. In den Einsatz: Reis, Dashi, Sojasauce, Mirin.",
      "Pilze/Karotte/Ingwer obenauf geben, nicht rühren.",
      "Programm »Weißer Reis/Mixed« starten; 10 Min. ruhen lassen, auflockern.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Pilzmix ↔ nur Shiitake; Dashi ↔ Wasser.",
    side: "Gurken-Pickles mild; Grüntee.",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker mushroom takikomi gohan, mixed mushrooms on top of rice, gentle steam"
    ),
  },
  {
    id: "di-rc",
    title: "Reiskocher: 香菇鸡饭 – Huhn & Shiitake auf Reis",
    desc: "Kantonesisch inspiriert – zartes Hähnchen, Shiitake, Sojasauce low-sodium.",
    story:
      "Angelehnt an chinesische »Chicken & Mushroom Rice« – im Reiskocher besonders bequem. Inspiration: inspiriert von Wok & Kin",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Wasser 320 ml",
      "Hähnchenbrust 240 g",
      "Shiitake (rehydriert) 120 g",
      "Ingwer 8 g",
      "Sojasauce natriumarm 20 ml",
      "Sesamöl 5 ml",
    ],
    steps: [
      "Reis waschen, mit Wasser in den Einsatz geben.",
      "Hähnchenwürfel mit Sojasauce/Sesamöl/Ingwer mischen, mit Shiitake auf den Reis legen.",
      "Kocher starten; 10 Min. ruhen lassen und durchheben.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Wasser ↔ milde Brühe.",
    side: "Gedünsteter Pak Choi.",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker chicken and shiitake rice, glossy grains, no chili"
    ),
  },
  {
    id: "mi-rc",
    title: "Reiskocher: Kongnamulbap – Sprossenreis (콩나물밥)",
    desc: "Koreanischer Sojabohnensprossen-Reis – leicht & saftig.",
    story:
      "Kongnamulbap ist ein koreanischer Klassiker – Reis + Sprossen garen zusammen; Sauce optional separat. Inspiration: inspiriert von My Korean Kitchen & Korean Bapsang",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Wasser 320 ml",
      "Sojabohnensprossen 250 g",
      "Hähnchenbrust dünn 160 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 5 ml",
    ],
    steps: [
      "Reis waschen, mit Wasser in den Einsatz.",
      "Hähnchen und Sprossen obenauf verteilen (nicht rühren).",
      "Kochen; 10 Min. ruhen. Optional: milde Sauce aus Sojasauce/Sesamöl getrennt reichen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Sesamöl ↔ Rapsöl.",
    side: "Gurken-Pickle ohne Chili.",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker kongnamulbap, soybean sprouts atop rice, simple and clean"
    ),
  },
  {
    id: "do-rc",
    title: "Reiskocher: Lachs-Takikomi Gohan (鮭の炊き込みご飯)",
    desc: "Japanischer Mischreis mit Lachs & Pilzen – Kocher an, fertig.",
    story:
      "Sake Takikomi Gohan: Reis, Lachs und Gemüse garen zusammen – aromatisch und alltagstauglich. Inspiration: inspiriert von Japanese Cooking 101 & allgemeinem Takikomi-Prinzip (Just One Cookbook)",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Dashi oder Wasser 320 ml",
      "Lachsfilet (ohne Haut) 220 g",
      "Shiitake 80 g",
      "Sojasauce natriumarm 15 ml",
      "Mirin 8 ml",
      "Ingwer 6 g",
    ],
    steps: [
      "Reis waschen, mit Dashi/Sojasauce/Mirin in den Einsatz.",
      "Pilze verteilen, Lachs obenauf legen.",
      "Kochen; 10 Min. ruhen; Lachs zerpflücken, unterheben.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Lachs durchgegart",
    swaps: "Lachs ↔ Kabeljau; Dashi ↔ Wasser.",
    side: "Gedämpfter Brokkoli.",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker salmon takikomi gohan, flaked salmon and mushrooms mixed into rice"
    ),
  },
  {
    id: "fr-rc",
    title: "Reiskocher: Kürbis-Pilz-Braunreis (南瓜香菇糙米饭)",
    desc: "Chinesisch inspiriert, sanft & sättigend.",
    story:
      "Kürbisreis ist in China beliebt – im Reiskocher besonders einfach. Inspiration: inspiriert von What To Cook Today & Greedy Girl Gourmet",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Brauner Reis (roh) 90 g",
      "Wasser oder milde Brühe 360 ml",
      "Kürbiswürfel 300 g",
      "Shiitake 80 g",
      "Tofu fest 150 g",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis waschen; mit Wasser/Brühe in den Einsatz.",
      "Kürbis/Tofu/Pilze obenauf; Sojasauce darüber.",
      "Kocher starten; 10 Min. ruhen; vorsichtig mischen.",
    ],
    checks: "Gastritis – weich & mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Brauner Reis ↔ Reis.",
    side: "Warmer Jasmintee.",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker brown rice with pumpkin cubes, tofu and mushrooms, comforting"
    ),
  },
  {
    id: "sa-rc",
    title: "Reiskocher: Süßkartoffel-Hähnchen-Bap (고구마밥)",
    desc: "Koreanischer Süßkartoffelreis – mild, leicht süßlich.",
    story:
      "Goguma-bap ist eine beliebte Abwandlung von Reis im Kocher – hier mit magerem Huhn als Eiweißkick. Inspiration: inspiriert von Maangchi",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Wasser 320 ml",
      "Süßkartoffel 250 g",
      "Hähnchenbrust 200 g",
      "Sojasauce natriumarm 12 ml",
    ],
    steps: [
      "Reis waschen, mit Wasser in den Einsatz.",
      "Süßkartoffelwürfel und Hähnchen darauf verteilen, Sojasauce darüber.",
      "Kochen; 10 Min. ruhen; unterheben.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Süßkartoffel ↔ Kürbis; Hähnchen ↔ Tofu.",
    side: "Milde Rettich-Pickles.",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker sweet potato rice with chicken pieces, homey and mild"
    ),
  },
  {
    id: "so-rc",
    title: "Reiskocher: Huhn & Gobo-Takikomi (鶏ごぼう炊き込みご飯)",
    desc: "Japanischer Mischreis mit Huhn & Schwarzwurzel/Burdock – erdig & fein.",
    story:
      "Gobo-Takikomi ist ein Klassiker – wir kochen alles gemeinsam im Kocher. Inspiration: inspiriert von Just One Cookbook (Gobo & Miso Takikomi Gohan)",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Dashi oder Wasser 320 ml",
      "Hähnchenbrust 220 g",
      "Gobo (dünn) 80 g",
      "Karotte 60 g",
      "Sojasauce natriumarm 15 ml",
      "Mirin 8 ml",
    ],
    steps: [
      "Reis waschen; Dashi/Sojasauce/Mirin zufügen.",
      "Huhn/Gobo/Karotte obenauf; Kocher starten.",
      "10 Min. ruhen; mischen und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Gobo ↔ Sellerie; Hähnchen ↔ Tofu.",
    side: "Gurken-Pickles mild; Grüntee.",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker chicken and burdock takikomi gohan, earthy and comforting"
    ),
  },
];

/* ---------- Wochen-Helfer ---------- */
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = { mo: "Montag", di: "Dienstag", mi: "Mittwoch", do: "Donnerstag", fr: "Freitag", sa: "Samstag", so: "Sonntag" };
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  safeArr(arr).forEach((r) => {
    const d = (r?.id || "").split("-")[0];
    if (map[d]) map[d].push(r);
  });
  Object.values(map).forEach((list) =>
    list.sort(
      (a, b) =>
        ["f", "m", "a", "rc"].indexOf(a.id.split("-")[1]) -
        ["f", "m", "a", "rc"].indexOf(b.id.split("-")[1])
    )
  );
  return map;
};

/* ---------- Einkaufsliste (Gruppen wie Woche-5/6) ---------- */
function normalizeName(n) {
  return String(n).replace(/\(.*?\)/g, "").trim().replace(/ +/g, " ");
}
function parseQty(item) {
  const m = String(item).match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
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
  protein: ["hähn", "pute", "rind", "schwein", "forelle", "kabeljau", "lachs", "tofu", "eier", "garnelen", "mandu"],
  veg: ["karotte", "zucchini", "pak choi", "spinat", "shiitake", "enoki", "brokkoli", "chinakohl", "zwiebel", "paprika", "rettich", "frühlingszwiebel", "gurke", "tomaten", "kartoffeln", "daikon", "kürbis", "süßkartoffel"],
  staple: ["reis", "klebreis", "mehrkorn", "udon", "soba", "somen", "weizennudeln", "reisnudeln", "vollkorn", "risotto", "gerste"],
  season: ["kombu", "nori", "brühe", "gemüsebrühe", "sojasauce", "miso", "sesamöl", "olivenöl", "mirin", "honig", "salz", "sesam", "knoblauch", "ingwer", "wasser", "tee", "wakame", "reisessig"],
};
function accumulateList(data) {
  const buckets = { protein: {}, veg: {}, staple: {}, season: {} };
  safeArr(data).forEach((r) =>
    safeArr(r?.ingredients).forEach((ing) => {
      const q = parseQty(ing);
      if (!q) return;
      const n = normalizeName(q.name);
      const key = n;
      const add = (b) => {
        if (!buckets[b][key]) buckets[b][key] = { qty: 0, unit: q.unit };
        buckets[b][key].qty += q.qty;
      };
      const nLower = n.toLowerCase();
      if (groupMap.protein.some((w) => nLower.includes(String(w).toLowerCase()))) add("protein");
      else if (groupMap.staple.some((w) => nLower.includes(String(w).toLowerCase()))) add("staple");
      else if (groupMap.veg.some((w) => nLower.includes(String(w).toLowerCase()))) add("veg");
      else if (groupMap.season.some((w) => nLower.includes(String(w).toLowerCase()))) add("season");
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
  const b = accumulateList(DATA); // nur Haupt-Daten (21 Rezepte)
  return {
    "Protein/Fisch/Tofu": formatBucket(b.protein),
    "Gemüse/Pilze": formatBucket(b.veg),
    "Reis/Nudeln/Sättigung": formatBucket(b.staple),
    "Algen/Brühen/Würze": formatBucket(b.season),
  };
}
const LIST_SUMMARY = buildListSummary();

/* ---------- Bilder-Persistenz ---------- */
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

/* ---------- i18n helpers ---------- */
const dayNameI18n = (id, t) => t.day[id.split("-")[0]];
const mealTitleI18n = (id, t) => t.mealTitle[id.split("-")[1]];
const mealLabelI18n = (id, t) => t.meal[id.split("-")[1]];

/* ---------- Recipe Cards ---------- */
function RecipeCard({ r, t, lang }) {
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  const title = toText(r.title);
  const desc = toText(r.desc);
  const story = toText(r.story);
  const target = toText(r.target);
  const checks = toText(r.checks);
  const side = toText(r.side);
  const swaps = toText(r.swaps);
  const ingredients = toList(r.ingredients);
  const steps = toList(r.steps);

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
              <b>Hinweise:</b> {checks}
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <BookmarkMenuButton
            planSlug={meta.id}
            recipeId={r.id}
            recipeTitle={title}
            planTitle={meta.title}
          /><h2 style={{ margin: 0 }}>{title}</h2></div>
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
                  <li style={{ marginBottom: 4, opacity: 0.7 }}>—</li>
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
                  <li style={{ marginBottom: 4, opacity: 0.7 }}>—</li>
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

function RiceCookerCard({ r, t, lang }) {
  const recipeImgKey = getImageKey(`rc::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  const title = toText(r.title);
  const desc = toText(r.desc);
  const story = toText(r.story);
  const target = toText(r.target);
  const checks = toText(r.checks);
  const side = toText(r.side);
  const swaps = toText(r.swaps);
  const ingredients = toList(r.ingredients);
  const steps = toList(r.steps);

  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={`Reiskocher-Bild hochladen: ${title}`} />
          </div>
          {img ? <img src={img} alt={title} style={{ width: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /> : null}
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            <div>
              <b>
                {dayNameI18n(r.id, t)} – Reiskocher
              </b>
            </div>
            <div style={{ marginTop: 6 }}>{desc}</div>
            <div style={{ marginTop: 6 }}>
              <b>Ziel:</b> {target}
            </div>
            <div>
              <b>Hinweise:</b> {checks}
            </div>
            <div>
              <b>{t.sections.side}:</b> {side}
            </div>
          </div>
        </aside>
        <main style={{ gridColumn: "span 8", ...cardMainStyle }}>
          <div style={{ fontSize: 12, color: COLORS.sky, fontWeight: 700, marginTop: -4, marginBottom: 6 }}>
            {dayNameI18n(r.id, t)} – Reiskocher
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <BookmarkMenuButton
            planSlug={meta.id}
            recipeId={r.id}
            recipeTitle={title}
            planTitle={meta.title}
          /><h2 style={{ margin: 0 }}>{title}</h2></div>
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
                  <li style={{ marginBottom: 4, opacity: 0.7 }}>—</li>
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
                  <li style={{ marginBottom: 4, opacity: 0.7 }}>—</li>
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

/* ---------- Kochbuch ---------- */
function Cookbook({ t, lang }) {
  const weekly = useMemo(() => groupByDay(DATA), []);
  const weeklyRC = useMemo(() => groupByDay(RICE_COOKER), []);
  return (
    <div id="cookbook-root">
      {/* Cover + Wochenübersicht */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              Woche ab {meta.startDate} — <b>Modus: Non-Strict (balanced)</b>; Fokus CN/JP/KR, milde Würzung, natriumarme Sojasauce, schwangerschaftssicher; Diabetes: je Mahlzeit (2 P.) 60–90 g KH. Zusätzlich pro Tag ein Reiskocher-Gericht (alles in den Kocher).
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="Titelbild hochladen" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>Wochenübersicht</h2>
            <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 8, fontSize: 14 }}>
              {DAYS_ORDER.map((d) => (
                <div key={d} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{DAY_NAME[d]}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                    {safeArr(weekly[d]).map((m) => {
                      const title = toText(m?.title);
                      const target = toText(m?.target);
                      return (
                        <div key={m.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                          <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabelI18n(m.id, t)}</div>
                          <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
                          <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>🌾 {target}{m?.remind ? " · 💊" : ""}</div>
                        </div>
                      );
                    })}
                    {/* Reiskocher-Kachel */}
                    {safeArr(weeklyRC[d]).map((rc) => {
                      const title = toText(rc?.title);
                      const target = toText(rc?.target);
                      return (
                        <div key={rc.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                          <div style={{ color: COLORS.sky, fontSize: 12 }}>Reiskocher</div>
                          <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
                          <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>🌾 {target}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rezeptseiten (21) */}
      {DATA.map((r) => (
        <RecipeCard key={r.id} r={r} t={t} lang={lang} />
      ))}

      {/* Reiskocher-Seiten (7) */}
      {RICE_COOKER.map((r) => (
        <RiceCookerCard key={r.id} r={r} t={t} lang={lang} />
      ))}
    </div>
  );
}

/* ---------- Einkaufsliste ---------- */
function GroceryList() {
  const rootRef = useRef(null);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>Automatisch aus den <b>21 Hauptrezepten</b> der Woche ab {meta.startDate} berechnet. (Reiskocher-Gerichte sind optional und nicht in der Liste enthalten – gern umstellbar.)</p>
          <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {Object.entries(LIST_SUMMARY).map(([group, items]) => (
              <div key={group} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 12, background: COLORS.panelBG70 }}>
                <h3 style={{ marginTop: 0, color: COLORS.indigo }}>{group}</h3>
                <ul>
                  {safeArr(items).map((t, i) => (
                    <li key={i}>{typeof t === "string" ? t : String(t ?? "")}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            Hinweis: Natriumarme Sojasauce verwenden; Algen (Wakame/Nori) sparsam; alles vollständig garen.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Root-Komponente ---------- */
export default function Woche8_2025_11_17_DE() {
  const [tab, setTab] = useState("kochbuch");
  const [lang, setLang] = useState(() => localStorage.getItem("moving-kitchen-tales-lang") || "de");
  const t = UI[lang] || UI.de;
  const toggleLang = () => {
    const next = lang === "de" ? "zh" : "de";
    setLang(next);
    localStorage.setItem("moving-kitchen-tales-lang", next);
  };
  const [pdfLink, setPdfLink] = useState({ kochbuch: "", einkauf: "" });
  const [htmlLink, setHtmlLink] = useState({ kochbuch: "", einkauf: "" });

  useEffect(() => {
    Tests();
  }, []);

  const doPDF = async () => {
    const isCook = tab === "kochbuch";
    const id = isCook ? "cookbook-root" : "list-root";
    const name = `${FILE_BASE} – ${isCook ? "cookbook" : "list"}`;
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
    const name = `${FILE_BASE} – ${isCook ? "cookbook" : "list"}`;
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
              <a href={pdfLink.kochbuch} download={`${FILE_BASE} – cookbook.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 PDF herunterladen (Kochbuch)
              </a>
            ) : null}
            {htmlLink.kochbuch ? (
              <a href={htmlLink.kochbuch} download={`${FILE_BASE} – cookbook.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 HTML herunterladen (Kochbuch)
              </a>
            ) : null}
          </div>
        )}
        {tab === "einkauf" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.einkauf ? (
              <a href={pdfLink.einkauf} download={`${FILE_BASE} – list.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 PDF herunterladen (Einkaufsliste)
              </a>
            ) : null}
            {htmlLink.einkauf ? (
              <a href={htmlLink.einkauf} download={`${FILE_BASE} – list.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 HTML herunterladen (Einkaufsliste)
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Tests ---------- */
function Tests() {
  try {
    if (!/^Woche 8 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    if (RICE_COOKER.length !== 7) throw new Error("RICE_COOKER length must be 7");
    const ids = new Set([...DATA.map((r) => r.id), ...RICE_COOKER.map((r) => r.id)]);
    if (ids.size !== DATA.length + RICE_COOKER.length) throw new Error("IDs not unique across DATA and RICE_COOKER");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittagessen ohne Medikamenten-Reminder");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abendessen mit Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zu wenige Zutaten: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Zu wenige Schritte: ${r.id}`);
    });
    RICE_COOKER.forEach((r) => {
      if (!/^((mo|di|mi|do|fr|sa|so))-rc$/.test(r.id)) throw new Error(`RC-ID-Pattern: ${r.id}`);
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zu wenige Zutaten (RC): ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Zu wenige Schritte (RC): ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY Gruppen fehlen");
    console.log("[Moving Kitchen Tales] All tests passed (DE JSX Woche 8). ");
  } catch (e) {
    console.error("[Moving Kitchen Tales] Tests failed:", e);
  }
}
