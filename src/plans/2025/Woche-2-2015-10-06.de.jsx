// src/plans/Woche-2-2025-10-06.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

export const meta = {
  title: "Woche 2",
  startDate: "2025-10-06",
  id: "woche-2-2025-10-06-de",
  lang: "de",
  sidebar: "Woche 2 (2025-10-06)",
};
const FILE_BASE = "Woche 2 2025-10-06";

const UI_TITLES = {
  main: "Moving Kitchen Tales – Woche 2",
  list: "Moving Kitchen Tales – Einkaufsliste – Woche 2",
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
  border: "1px solid " + COLORS.border,
};

const cardMainStyle = {
  background: COLORS.white,
  borderRadius: 18,
  padding: 22,
  boxShadow: COLORS.btnShadow,
  border: "1px solid " + COLORS.border,
};

const PROMPT_HEADER =
  "Ultra-clean cookbook photo, soft daylight, top-down, pastel background, visible steam, pregnancy-safe (no raw fish or raw egg), mild Asian home cooking (JP/CN/KR), family-friendly";
const buildPrompt = (a, b) => a + "\n" + b;

// Guards (immer Arrays/Text erzwingen)
const asList = (v, lang) => {
  try {
    const out = pickList(v, lang);
    return Array.isArray(out) ? out : [];
  } catch (e) {
    return [];
  }
};
const safeText = (v, lang) => {
  try {
    const s = pickText(v, lang);
    return (s ?? "").toString();
  } catch (e) {
    return "";
  }
};

/* --------------------
 * Daten (aus Woche-2-2025-10-06.jsx)
 * -------------------- */
export const DATA = [
  {
    id: "mo-f",
    title: "Reis-Congee (CN) – mild, mit Ingwer & Frühlingszwiebel",
    desc: "Klassischer chinesischer Reis-Congee: sehr mild, gut bekömmlich; inspiriert von The Woks of Life.",
    story: "Congee ist in China & Südostasien allgegenwärtig – perfekt als sanfter Start in die Woche.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Wasser 1000 ml",
      "Ingwer 10 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
      "Salz 2 g",
      "Sesamöl 5 ml",
    ],
    steps: [
      "Reis waschen, im Wasser aufkochen, dann sanft 30–35 Min. köcheln lassen.",
      "Ingwer fein hacken, Congee leicht würzen (sehr mild).",
      "Mit Frühlingszwiebel und einem Tropfen Sesamöl servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Reis ↔ Vollkornreis (etwas längere Kochzeit); Alternative: Huhn-Congee (mild).",
    side: "Lauwarmes Wasser oder milder Tee.",
    remind: true,
    prompt: "Ultra-clean cookbook photo... \nMild Chinese rice congee, ginger, scallions, top-down, steam"
  },
  {
    id: "mo-m",
    title: "Hähnchen-Gemüse-Reis-Bowl (JP-inspiriert) – ohne Chili",
    desc: "Schnelle Bowl mit Hähnchen und gedämpftem Gemüse, mild gewürzt; inspiriert von Just One Cookbook.",
    story: "Eine unkomplizierte Mittagsschale: proteinreich, ausgewogen und unaufgeregt im Geschmack.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Vollkornreis (roh) 90 g",
      "Hähnchenbrust 240 g",
      "Brokkoli 220 g",
      "Karotte 120 g",
      "Zwiebel 80 g",
      "Sojasauce natriumarm 20 ml",
      "Rapsöl 10 ml",
    ],
    steps: [
      "Reis kochen; Gemüse dämpfen oder kurz anschwitzen.",
      "Hähnchen in wenig Öl braten bis vollständig durchgegart.",
      "Alles anrichten, mild mit Sojasauce abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈72 g KH · Schwangerschaft ✓",
    swaps: "Hähnchen ↔ Tofu; Vollkornreis ↔ Sushi-Reis.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: "Ultra-clean cookbook photo...\nChicken and veggie rice bowl, mild, clear daylight, no chili"
  },
  {
    id: "mo-a",
    title: "Miso-Tofu-Schmortopf (JP) mit Reis – leicht",
    desc: "Leichtes Miso-Tofu mit Champignons, über Reis; inspiriert von Just One Cookbook.",
    story: "Ein sanft-würziger Eintopf, abends angenehm wärmt er ohne zu beschweren.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Tofu (fest) 350 g",
      "Champignons 200 g",
      "Miso (hell) 25 g",
      "Gemüsebrühe 500 ml",
      "Sojasauce natriumarm 15 ml",
      "Reis (roh) 90 g",
      "Ingwer 8 g",
    ],
    steps: [
      "Reis kochen; Pilze anschwitzen.",
      "Brühe + Miso + Sojasauce erhitzen; Tofu zugeben, 4–5 Min. ziehen lassen.",
      "Über Reis servieren; sehr mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓",
    swaps: "Tofu ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nLight miso tofu stew over rice, no chili, steam"
  },

  /* ---------- DI ---------- */
  {
    id: "di-f",
    title: "Onigiri (Lachs) & milde Miso-Suppe (JP)",
    desc: "Onigiri mit gegartem Lachs, dazu sehr milde Misosuppe; inspiriert von Just One Cookbook.",
    story: "Bento-Feeling zum Frühstück – gut vorzubereiten und bekömmlich.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Sushi-Reis (roh) 100 g",
      "Lachs 150 g",
      "Nori 1 Blatt",
      "Miso (hell) 20 g",
      "Tofu (fest) 150 g",
      "Wakame (getrocknet) 2 g",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis kochen; Lachs garen und zerpflücken; Onigiri formen und in Nori hüllen.",
      "Miso in heißem (nicht kochendem) Wasser lösen; Tofu & Wakame kurz ziehen lassen.",
      "Sehr mild mit Sojasauce abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈78 g KH · Schwangerschaft ✓ (Fisch durch, Algen sparsam)",
    swaps: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Kabeljau/Seelachs.",
    side: "Grüner Tee mild (optional).",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nOnigiri with cooked salmon, small miso soup, gentle light"
  },
  {
    id: "di-m",
    title: "Stir-fried Udon (Chicken & Veg) – mild",
    desc: "Sanft gebratene Udon mit Hähnchen & Gemüse; inspiriert von The Woks of Life.",
    story: "Udon macht satt, bleibt aber mild – ideal fürs Büro-Mittag.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈38 g p. P.",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 240 g",
      "Paprika 150 g",
      "Zucchini 160 g",
      "Zwiebel 80 g",
      "Sojasauce natriumarm 25 ml",
      "Sesamöl 8 ml",
    ],
    steps: [
      "Udon kochen/abspülen.",
      "Hähnchenstreifen braten bis durch; Gemüse kurz mitschwitzen.",
      "Mild würzen; sofort servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈74 g KH · Schwangerschaft ✓",
    swaps: "Udon ↔ Weizennudeln; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: "Ultra-clean cookbook photo...\nMild stir-fried udon with chicken and veggies, no chili"
  },
  {
    id: "di-a",
    title: "Doenjang-Jjigae (KR) – milder Sojabohnen-Eintopf",
    desc: "Koreanischer Eintopf mit Doenjang, Tofu & Gemüse; inspiriert von Maangchi.",
    story: "Kräftig, aber nicht scharf – ideal an kühlen Abenden.",
    target: "≈86 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Doenjang (Sojabohnenpaste) 30 g",
      "Tofu (fest) 300 g",
      "Zucchini 200 g",
      "Kartoffel 200 g",
      "Shiitake 100 g",
      "Zwiebel 70 g",
      "Wasser 800 ml",
      "Sojasauce natriumarm 10 ml",
      "Gerste/Perlgerste (roh) 70 g",
    ],
    steps: [
      "Doenjang im Wasser lösen; Gemüse 12–15 Min. sanft köcheln.",
      "Tofu zugeben, wenige Minuten ziehen lassen.",
      "Gerste separat kochen und dazu servieren.",
    ],
    checks: "Gastritis – nicht scharf · Diabetes ✓ ≈86 g KH · Schwangerschaft ✓",
    swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust.",
    side: "Milde Gurkenbeilage.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nKorean doenjang stew with tofu and vegetables, barley on side"
  },

  /* ---------- MI ---------- */
  {
    id: "mi-f",
    title: "Kürbis-Reisbrei (KR) mit Tofu & Edamame",
    desc: "Seidiger Kürbisbrei mit Reisanteil und extra Protein; inspiriert von Mom’s Korean Recipes.",
    story: "Herbstlich, warm, sehr bekömmlich – großartig zum Frühstück.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Kürbis (Hokkaido/Butternut) 400 g",
      "Reis (roh) 70 g",
      "Tofu (fest) 200 g",
      "Edamame (ausgelöst) 100 g",
      "Ingwer 8 g",
      "Wasser 900 ml",
      "Salz 2 g",
    ],
    steps: [
      "Kürbis + Reis 25 Min. sanft köcheln bis weich.",
      "Fein pürieren; Tofu & Edamame 3–4 Min. mitziehen lassen.",
      "Mild abschmecken.",
    ],
    checks: "Gastritis – weich & warm · Diabetes ✓ ≈75 g KH · Schwangerschaft ✓",
    swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Reis-/Gersten-Tee.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nGolden pumpkin rice porridge with tofu and edamame, steam"
  },
  {
    id: "mi-m",
    title: "Udon-Nudelsuppe mit Huhn & Brokkoli (JP)",
    desc: "Leichte klare Suppe mit Udon, sehr mild; inspiriert von Just One Cookbook.",
    story: "Wärmend, schnell und freundlich zur Verdauung.",
    target: "≈79 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 200 g",
      "Zwiebel 60 g",
      "Miso (hell) 25 g",
      "Wasser 1000 ml",
      "Sojasauce natriumarm 15 ml",
    ],
    steps: [
      "Brühe mit Miso & Sojasauce ansetzen.",
      "Hähnchen 6–8 Min. sieden (durch!); Gemüse 3–4 Min. sanft garen.",
      "Udon separat kochen, kalt spülen, kurz miterwärmen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈79 g KH · Schwangerschaft ✓",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Kleine Gurkenbeilage.",
    remind: false,
    prompt: "Ultra-clean cookbook photo...\nClear udon soup with chicken and broccoli, delicate"
  },
  {
    id: "mi-a",
    title: "Gedämpfter Kabeljau mit Ingwer & Reis (CN, Canton)",
    desc: "Schonend gedämpfter Kabeljau, weiche Textur; inspiriert von Made With Lau.",
    story: "Klassiker der Kantonesischen Küche – pur, leicht, aromatisch.",
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
      "Fisch auf Ingwer dämpfen (8–10 Min., durch!).",
      "Sojasauce + Brühe erhitzen, darüber geben; mit Sesamöl parfümieren.",
      "Mit Reis servieren.",
    ],
    checks: "Gastritis – gedämpft · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ (niedriger Hg)",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nSteamed cod with ginger and scallions, small rice bowl"
  },

  /* ---------- DO ---------- */
  {
    id: "do-f",
    title: "Tamagoyaki & milde Miso-Suppe + kleiner Reis (JP)",
    desc: "Japanisches Frühstück: gerolltes Omelett (durchgegart) + milde Miso; inspiriert von Just One Cookbook.",
    story: "Süß-salzige Eierspeise, im Bento sehr beliebt; hier komplett durchgegart.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Tofu (fest) 150 g",
      "Reis (roh) 80 g",
      "Miso (hell) 20 g",
      "Wakame (getrocknet) 1 g",
      "Frühlingszwiebel 20 g",
      "Wasser 800 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis kochen. Tamagoyaki braten bis vollständig gestockt.",
      "Miso-Suppe zubereiten; Tofu/Wakame kurz ziehen lassen.",
      "Mit Frühlingszwiebel servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈62 g KH · Schwangerschaft ✓ (Eier vollständig gestockt)",
    swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel.",
    side: "Milder Tee.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nJapanese breakfast set, rolled omelet well done, miso soup, rice"
  },
  {
    id: "do-m",
    title: "Tomate-Ei mit Tofu & Reis (CN) – mild",
    desc: "Tomaten-Rührei in mild, dazu Tofu & Reis; inspiriert von The Woks of Life.",
    story: "Der berühmte chinesische Klassiker – hier als besonders sanfte Variante.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Eier 4 Stück",
      "Tofu (fest) 200 g",
      "Tomaten (reif) 400 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 10 ml",
      "Rapsöl 10 ml",
    ],
    steps: [
      "Reis kochen; Eier vollständig stocken lassen (durch).",
      "Tomaten + Zwiebel weich schmoren; Tofu kurz mitziehen lassen.",
      "Mild abschmecken, mit Reis servieren.",
    ],
    checks: "Gastritis – sanft · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ (Eier durch)",
    swaps: "Tofu ↔ Putenbrust; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: false,
    prompt: "Ultra-clean cookbook photo...\nChinese tomato egg stir-fry with tofu, rice on side, very mild"
  },
  {
    id: "do-a",
    title: "Mildes Bulgogi-Pfannengericht (KR) mit Vollkornreis",
    desc: "Pfannenversion ohne Schärfe; inspiriert von Maangchi.",
    story: "Schnell, aromatisch und familientauglich – ganz ohne Chili.",
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
      "Fleisch mit Sojasauce/Birne/Knoblauch 15 Min. marinieren.",
      "In wenig Öl gar braten.",
      "Gemüse kurz mitbraten; mit Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈80 g KH · Schwangerschaft ✓",
    swaps: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis.",
    side: "Gurke natur.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nMild bulgogi turkey stir-fry, brown rice, colorful veg, no chili"
  },

  /* ---------- FR ---------- */
  {
    id: "fr-f",
    title: "Hühner-Congee (CN) – sehr mild",
    desc: "Reis-Congee mit Hühnerwürfeln; inspiriert von The Woks of Life.",
    story: "Wärmend und maximal bekömmlich – perfekt an grauen Tagen.",
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
      "Reis in Wasser 30 Min. sanft kochen.",
      "Hähnchen klein würfeln, 8–10 Min. im Congee garen.",
      "Mild würzen, Frühlingszwiebel darüber.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓",
    swaps: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nChicken congee, shredded chicken, scallions, gentle steam"
  },
  {
    id: "fr-m",
    title: "Leichte Minestrone mit Tofu (IT) – mild gekocht",
    desc: "Gemüse-Eintopf mit langer Kochzeit, sehr mild.",
    story: "Mediterran und doch magenfreundlich – für entspannte Abende.",
    target: "≈69 g KH gesamt (2 P.) · Protein ≈38 g p. P.",
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
      "Tofu (fest) 300 g",
    ],
    steps: [
      "Gemüse anschwitzen, Brühe + Tomaten zugeben, 20–25 Min. milde köcheln.",
      "Tofu & Bohnen 5 Min. mitziehen.",
      "Pasta separat kochen, zum Schluss unterheben.",
    ],
    checks: "Gastritis – lang gekocht, mild · Diabetes ✓ ≈69 g KH · Schwangerschaft ✓ (Käse pasteurisiert, optional)",
    swaps: "Tofu ↔ Hähnchen; Pasta ↔ Gerste.",
    side: "Warmer Kräutertee.",
    remind: false,
    prompt: "Ultra-clean cookbook photo...\nLight minestrone with tofu, few wholegrain pasta pieces"
  },
  {
    id: "fr-a",
    title: "Lachs Teriyaki aus dem Ofen mit Brokkoli & Reis (JP)",
    desc: "Backofen-Teriyaki mit niedriger Süße; inspiriert von Just One Cookbook.",
    story: "Schnell und zuverlässig – ideal fürs Feierabend-Dinner.",
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
      "Sauce rühren (Sojasauce + wenig Mirin/Honig + Ingwer).",
      "Lachs bei 200 °C 12–14 Min. backen.",
      "Mit Reis & gedämpftem Brokkoli servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈75 g KH (geringe Süße) · Schwangerschaft ✓ (Fisch durch)",
    swaps: "Reis ↔ Vollkornreis; Brokkoli ↔ Pak Choi.",
    side: "Milder Grüntee.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nBaked salmon teriyaki, steamed broccoli, rice, top-down"
  },

  /* ---------- SA ---------- */
  {
    id: "sa-f",
    title: "Yudofu (JP) – Tofu im milden Sud + kleiner Reis",
    desc: "Klarer Tofutopf mit Lauch & Spinat, sehr bekömmlich.",
    story: "Kyoto-Klassiker: leicht, warm, beruhigend.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Tofu (fest) 400 g",
      "Gemüsebrühe 800 ml",
      "Lauch 100 g",
      "Spinat 150 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 15 ml",
      "Sesam 10 g",
    ],
    steps: [
      "Brühe erhitzen, Tofu 5–6 Min. sachte ziehen lassen.",
      "Lauch/Spinat kurz mitgaren.",
      "Sehr mild mit Sojasauce würzen; Reis separat.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ ≈62 g KH · Schwangerschaft ✓",
    swaps: "Reis ↔ Vollkornreis; Spinat ↔ Pak Choi.",
    side: "Wasser oder Gersten-Tee.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nYudofu clay pot with tofu, leeks, spinach, small rice bowl"
  },
  {
    id: "sa-m",
    title: "Japchae (KR) mit Rind & Gemüse – mild",
    desc: "Süßkartoffelglasnudeln, buntes Gemüse, ohne Schärfe; inspiriert von Maangchi.",
    story: "Warm oder zimmerwarm – perfekt für Wochenenden.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Glasnudeln (Süßkartoffel) 80 g",
      "Rindfleischstreifen (mager) 220 g",
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
      "Fleisch & Gemüse mild anbraten.",
      "Mit Nudeln mischen und kurz erhitzen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈75 g KH · Schwangerschaft ✓ (Fleisch durch)",
    swaps: "Rind ↔ Tofu; Glasnudeln ↔ Reisnudeln.",
    side: "Gurken-Sesam (mild).",
    remind: false,
    prompt: "Ultra-clean cookbook photo...\nKorean japchae with vegetables and beef strips, glossy, no chili"
  },
  {
    id: "sa-a",
    title: "Shiitake-Hähnchen-Schmortopf (CN) & kleiner Reis",
    desc: "Zart geschmort, aromatisch aber mild; inspiriert von Red House Spice.",
    story: "Ein klassisches Wohlfühlgericht fürs Wochenende.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Hähnchenschenkel, ohne Haut 300 g",
      "Shiitake 200 g",
      "Karotte 120 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 25 ml",
      "Ingwer 10 g",
      "Gemüsebrühe 300 ml",
    ],
    steps: [
      "Hähnchen anrösten, Brühe angießen.",
      "Shiitake & Karotte zugeben, 20–25 Min. mild schmoren.",
      "Mit Reis servieren.",
    ],
    checks: "Gastritis – mild geschmort · Diabetes ✓ ≈62 g KH · Schwangerschaft ✓",
    swaps: "Hähnchen ↔ Tofu; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi/Brokkoli.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nBraised chicken with shiitake and carrots, small rice portion"
  },

  /* ---------- SO ---------- */
  {
    id: "so-f",
    title: "Apfel-Tofu-Milchreis (JP-inspiriert) – leicht süß",
    desc: "Sanfter Milchreis mit Apfelstückchen & Tofu.",
    story: "Herbstfrühstück: mild, cremig, angenehm süß – ohne Raffinade.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Apfel 150 g",
      "Wasser 900 ml",
      "Zimt 0.5 g",
      "Tofu (fest) 300 g",
    ],
    steps: [
      "Reis in Wasser 30 Min. sanft kochen.",
      "Apfelwürfel 5 Min. mitgaren.",
      "Tofu zugeben, kurz ziehen lassen; mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈80 g KH · Schwangerschaft ✓",
    swaps: "Apfel ↔ Birne; Tofu ↔ pasteurisierter Skyr (hinweisend).",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nCreamy rice porridge with apple cubes and tofu, steam"
  },
  {
    id: "so-m",
    title: "Klare Puten-Nudelsuppe (CN-inspiriert)",
    desc: "Milde Brühe mit Putenfleisch & Pak Choi, ohne Schärfe; inspiriert von Made With Lau.",
    story: "Schnell, leicht, gut verdaulich – ideal zum Mittag.",
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
      "Brühe erhitzen; Pute 8–10 Min. sieden (durch!).",
      "Gemüse 3–4 Min. mitgaren.",
      "Nudeln separat kochen, abspülen, kurz miterwärmen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓",
    swaps: "Weizennudeln ↔ Reisnudeln; Pute ↔ Tofu.",
    side: "Wasser.",
    remind: false,
    prompt: "Ultra-clean cookbook photo...\nClear noodle soup with turkey slices and pak choi, no chili"
  },
  {
    id: "so-a",
    title: "Milde Seelachs-Daikon-Schmorpfanne (KR) & Reis",
    desc: "Koreanisch inspiriertes Jorim (Schmorgericht) ohne Schärfe.",
    story: "Daikon nimmt das Aroma auf und bleibt mild – richtiges Wohlfühlessen.",
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
      "Rettich + Doenjang in Wasser 10 Min. sieden.",
      "Fisch zugeben, 8–10 Min. mild schmoren (durch!).",
      "Mit Sesamöl abrunden, zu Reis servieren.",
    ],
    checks: "Gastritis – mild geschmort · Diabetes ✓ ≈70 g KH · Schwangerschaft ✓ (Fisch durch, wenig Hg)",
    swaps: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Spinat.",
    remind: true,
    prompt: "Ultra-clean cookbook photo...\nMild braised pollock with daikon, light sauce, rice bowl"
  }
]; // <- in der Download-Datei ist hier der komplette Inhalt eingefügt

/* --------------------
 * Wochen-Helfer
 * -------------------- */
const DAYS_ORDER = ["mo","di","mi","do","fr","sa","so"];
const groupByDay = (arr) => {
  const map = { mo:[], di:[], mi:[], do:[], fr:[], sa:[], so:[] };
  (Array.isArray(arr) ? arr : []).forEach((r) => {
    const d = (r?.id || "").split("-")[0];
    if (map[d]) map[d].push(r);
  });
  Object.values(map).forEach((list) =>
    list.sort((a,b)=> ["f","m","a"].indexOf(String(a?.id||"").split("-")[1]) - ["f","m","a"].indexOf(String(b?.id||"").split("-")[1]))
  );
  return map;
};

// i18n helpers
const dayNameI18n = (id, t) => t.day[id.split("-")[0]];
const mealTitleI18n = (id, t) => t.mealTitle[id.split("-")[1]];
const mealLabelI18n = (id, t) => t.meal[id.split("-")[1]];

/* --------------------
 * Einkaufsliste
 * -------------------- */
function normalizeName(n) {
  return String(n || "")
    .replace(/\(.*?\)/g, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\bgekauft\b/gi, "")
    .replace(/\bgekocht\b/gi, "")
    .replace(/\broh\b/gi, "")
    .replace(/ +/g, " ");
}
function parseQty(item) {
  const m = String(item||"").match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = normalizeName(m[1]).trim();
  let qty = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  if ((unit||"").toLowerCase() === "l") { qty = qty * 1000; unit = "ml"; }
  return { name, qty, unit };
}
const groupMap = {
  protein: ["Huhn","Hähnchen","Pute","Rind","Lachs","Kabeljau","Seelachs","Tofu","Ei","Eier","Edamame","Parmesan","Schweinefilet","Schwein","Rinderhack"],
  veg: ["Karotte","Zucchini","Pak Choi","Spinat","Shiitake","Champignons","Brokkoli","Lauch","Zwiebel","Paprika","Rettich","Frühlingszwiebel","Kartoffel","Kürbis","Gurke","Apfel"],
  staple: ["Reis","Sushi-Reis","Vollkornreis","Brauner Reis","Gerste","Udon","Weizennudeln","Reisnudeln","Glasnudeln","Vollkornpasta"],
  season: ["Wakame","Nori","Brühe","Gemüsebrühe","Sojasauce","Miso","Doenjang","Sesamöl","Rapsöl","Olivenöl","Mirin","Honig","Zimt","Salz","Sesam","Knoblauch","Ingwer","Tomaten (passiert)","Wasser"],
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
    .map(([k, v]) => k + " " + Math.round(v.qty) + " " + v.unit)
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

/* --------------------
 * Image Upload (persist per localStorage)
 * -------------------- */
const getImageKey = (suffix) => FILE_BASE + "::img::" + suffix;
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
          <img src={src} alt={label} style={{ maxWidth: "100%", borderRadius: 12, border: "1px solid " + COLORS.border }} />
        </div>
      ) : null}
    </div>
  );
}

/* --------------------
 * RecipeCard
 * -------------------- */
function RecipeCard({ r, t, lang }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(meta.id, r.id);
  const recipeImgKey = getImageKey("recipe::" + r.id);
  const img = readLocalImage(recipeImgKey);
  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={"Rezeptbild hochladen: " + safeText(r.title, lang)} />
          </div>
          {img ? <img src={img} alt={safeText(r.title, lang)} style={{ width: "100%", borderRadius: 12, border: "1px solid " + COLORS.border }} /> : null}
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            <div>
              <b>
                {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
              </b>
            </div>
            <div style={{ marginTop: 6 }}>{safeText(r.desc, lang)}</div>
            <div style={{ marginTop: 6 }}>
              <b>Ziel: </b> {safeText(r.target, lang)}
            </div>
            <div>
              <b>Checks: </b> {safeText(r.checks, lang)}
            </div>
            <div>
              <b>{t.sections.side}</b> {safeText(r.side, lang)}
            </div>
            {r.remind ? (
              <div
                style={{
                  marginTop: 8,
                  padding: "6px 8px",
                  background: "rgba(5,150,105,.08)",
                  border: "1px solid " + COLORS.emerald,
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
          <button
            onClick={() => toggleBookmark({
              planSlug: meta.id,
              recipeId: r.id,
              recipeTitle: null ? null.title : safeText(r.title, lang),
              planTitle: meta.title
            })}
            style={{
              background: bookmarked ? "var(--accent, #e07a9a)" : "transparent",
              border: "1px solid var(--border, rgba(0,0,0,.1))",
              borderRadius: 8,
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: 16,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: bookmarked ? "#fff" : "var(--text, #111827)",
              marginRight: "8px"
            }}
            title={bookmarked ? "Bookmark entfernen" : "Bookmark setzen"}
          >
            {bookmarked ? "★" : "☆"}
          </button><h2 style={{ margin: 0 }}>{safeText(r.title, lang)}</h2></div>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{safeText(r.story, lang)}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>
                {t.sections.ingredients} (2 Personen)
              </h3>
              {(() => {
                const ingList = asList(r?.ingredients, lang);
                return (
                  <ul className="avoid-break">
                    {ingList.length > 0 ? (
                      ingList.map((x, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          {typeof x === "string" ? x : String(x ?? "")}
                        </li>
                      ))
                    ) : (
                      <li style={{ marginBottom: 4, opacity: 0.7 }}>—</li>
                    )}
                  </ul>
                );
              })()}
            </section>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.steps}</h3>
              {(() => {
                const stepList = asList(r?.steps, lang);
                return (
                  <ol className="avoid-break" style={{ paddingLeft: 18 }}>
                    {stepList.length > 0 ? (
                      stepList.map((s, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          {typeof s === "string" ? s : String(s ?? "")}
                        </li>
                      ))
                    ) : (
                      <li style={{ marginBottom: 4, opacity: 0.7 }}>—</li>
                    )}
                  </ol>
                );
              })()}
              <div style={{ marginTop: 6, fontSize: 12 }}>
                <b>{t.sections.swaps}:</b> {safeText(r.swaps, lang)}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* --------------------
 * Cookbook (Cover + Übersicht + 21 Karten)
 * -------------------- */
function Cookbook({ t, lang }) {
  const weekly = useMemo(() => groupByDay(DATA), []);
  return (
    <div id="cookbook-root">
      {/* Cover + Übersicht */}
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
                  <div key={d} style={{ border: "1px solid " + COLORS.border, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{t.day[d]}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {dayList.map((m) => (
                        <div key={m.id} style={{ background: COLORS.white, border: "1px solid " + COLORS.border, borderRadius: 10, padding: 8 }}>
                          <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabelI18n(m.id, t)}</div>
                          <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{safeText(m.title, lang)}</div>
                          <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>
                            🌾 {(safeText(m.target, lang) || "").replace("KH gesamt", "KH")}
                            {m.remind ? " · 💊" : ""}
                          </div>
                        </div>
                      ))}
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

/* --------------------
 * Einkaufsliste (Tab 2)
 * -------------------- */
function GroceryList() {
  const rootRef = useRef(null);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>
            Automatisch aus den Rezepten summiert (Woche ab {meta.startDate}).
          </p>
          <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {Object.entries(LIST_SUMMARY).map(([group, items]) => (
              <div key={group} style={{ border: "1px solid " + COLORS.border, borderRadius: 12, padding: 12, background: COLORS.panelBG70 }}>
                <h3 style={{ marginTop: 0, color: COLORS.indigo }}>{group}</h3>
                <ul>
                  {(Array.isArray(items) ? items : []).map((t, i) => (
                    <li key={i}>{typeof t === "string" ? t : String(t ?? "")}</li>
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

/* --------------------
 * Hauptkomponente
 * -------------------- */
export default function Woche2_2025_10_06_DE() {
  const [tab, setTab] = useState("kochbuch");
  const [lang] = useState("de");
  const t = UI[lang] || UI.de;

  const [pdfLink, setPdfLink] = useState({ kochbuch: "", einkauf: "" });
  const [htmlLink, setHtmlLink] = useState({ kochbuch: "", einkauf: "" });

  const doPDF = async () => {
    const isCook = tab === "kochbuch";
    const id = isCook ? "cookbook-root" : "list-root";
    const name = FILE_BASE + " – " + (isCook ? "kochbuch" : "einkauf");
    const res = await exportPDFById(id, name, isCook ? "landscape" : "portrait", {
      pageBg: COLORS.pageBg,
      after: [".page"],
      avoid: [".avoid-break"],
    });
    if (res && res.blobUrl) {
      const key = isCook ? "kochbuch" : "einkauf";
      setPdfLink((s) => Object.assign({}, s, { [key]: res.blobUrl }));
    }
  };

  const doHTML = () => {
    const isCook = tab === "kochbuch";
    const id = isCook ? "cookbook-root" : "list-root";
    const name = FILE_BASE + " – " + (isCook ? "kochbuch" : "einkauf");
    const css = buildEmbedCss({ pageBg: COLORS.pageBg, text: COLORS.text });
    const url = exportHTMLById(id, name, css, COLORS.pageBg);
    if (url) {
      const key = isCook ? "kochbuch" : "einkauf";
      setHtmlLink((s) => Object.assign({}, s, { [key]: url }));
    }
  };

  useEffect(() => {
    Tests();
  }, []);

  return (
    <div style={{ background: COLORS.pageBg, minHeight: "100vh", padding: 16 }}>
      <div className="print:hidden" style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setTab("kochbuch")}
            style={{
              padding: "8px 14px",
              borderRadius: 14,
              border: "1px solid " + COLORS.border,
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
              border: "1px solid " + COLORS.border,
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
            style={{ padding: "10px 14px", borderRadius: 14, border: "1px solid " + COLORS.border, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}
          >
            {t.btn.pdf}
          </button>
          <button
            onClick={doHTML}
            style={{ padding: "10px 14px", borderRadius: 14, border: "1px solid " + COLORS.border, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}
          >
            {t.btn.html}
          </button>
          <button
            onClick={() => window.print()}
            style={{ padding: "10px 14px", borderRadius: 14, border: "1px solid " + COLORS.border, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}
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

      {/* Downloads */}
      <div className="print:hidden" style={{ marginTop: 12 }}>
        {tab === "kochbuch" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.kochbuch ? (
              <a href={pdfLink.kochbuch} download={FILE_BASE + " – kochbuch.pdf"} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 PDF herunterladen (Kochbuch)
              </a>
            ) : null}
            {htmlLink.kochbuch ? (
              <a href={htmlLink.kochbuch} download={FILE_BASE + " – kochbuch.html"} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 HTML herunterladen (Kochbuch)
              </a>
            ) : null}
          </div>
        )}
        {tab === "einkauf" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.einkauf ? (
              <a href={pdfLink.einkauf} download={FILE_BASE + " – einkauf.pdf"} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 PDF herunterladen (Einkaufsliste)
              </a>
            ) : null}
            {htmlLink.einkauf ? (
              <a href={htmlLink.einkauf} download={FILE_BASE + " – einkauf.html"} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 HTML herunterladen (Einkaufsliste)
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------
 * Tests
 * -------------------- */
function Tests() {
  try {
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error("Zutaten zu wenig: " + r.id);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error("Steps zu wenig: " + r.id);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
    console.log("[Moving Kitchen Tales] All tests passed (Week 2, DE JSX).");
  } catch (e) {
    console.error("[Moving Kitchen Tales] Tests failed:", e);
  }
}