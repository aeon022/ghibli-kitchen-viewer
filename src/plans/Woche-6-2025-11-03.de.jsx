// src/plans/Woche-6-2025-11-03.de.jsx
// Strikt an Woche-5-2025-10-27.de.jsx / .zh.jsx angelehnt (1:1 Struktur), nur Meta & DATA aktualisiert

import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

/* ---------- Meta ---------- */
export const meta = {
  title: "Woche 6",
  startDate: "2025-11-03",
  id: "woche-6-2025-11-03-de",
  lang: "de",
  sidebar: "[DE] Woche 6 (2025-11-03)",
};
const FILE_BASE = "Woche 6 2025-11-03";

/* ---------- UI ----------- */
const UI_TITLES = {
  main: "GhibliKitchen – Woche 6",
  list: "GhibliKitchen – Einkaufsliste – Woche 6",
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

// --- Fallbacks: immer Text/Listen zurückgeben, ohne i18n-Picker ---
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

/* ---------- DATA (21 Rezepte) ---------- */
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Ochazuke mit Kabeljau (お茶漬け)",
    desc: "Heißer grüner Tee über Reis mit gedämpftem Kabeljau; inspiriert von Just One Cookbook.",
    story: "Ochazuke ist japanischer Comfort – warm, mild und bekömmlich am Morgen.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Grüner Tee (heiß) 400 ml", "Kabeljaufilet 140 g", "Nori 1 Stück", "Sesam 6 g", "Ingwer 6 g", "Sojasauce natriumarm 10 ml", "Frühlingszwiebel 15 g"],
    steps: ["Reis kochen.", "Kabeljau 8–10 Min. dämpfen und zerpflücken.", "Reis in Schalen, mit heißem Tee übergießen; Fisch/Nori/Sesam/Lauch darauf, mild abschmecken."],
    checks: "Gastritis – mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, jodarm",
    swaps: "Kabeljau ↔ Köhler/Seelachs; Tee ↔ milder Dashi.",
    side: "Kleine Schale Gurken-Pickles (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Ochazuke rice bowl, hot green tea broth, flaked cooked cod, nori strips, sesame, scallions"),
  },
  {
    id: "mo-m",
    title: "Janchi-guksu – Hähnchen-Nudelsuppe (잔치국수)",
    desc: "Koreanische klare Suppe mit feinen Nudeln, sehr mild.",
    story: "„Festnudeln“ sind auch alltagstauglich – leicht und gut verdaulich.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: ["Somen (trocken) 110 g", "Hähnchenbrust 220 g", "Zucchini 150 g", "Karotte 100 g", "Frühlingszwiebel 20 g", "Wasser 1000 ml", "Sojasauce natriumarm 12 ml"],
    steps: ["Brühe zubereiten; Hähnchenstreifen 6–8 Min. gar ziehen.", "Gemüsestreifen 2–3 Min. mitköcheln.", "Nudeln separat kochen, abspülen und zugeben."],
    checks: "Gastritis – klar & mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Somen ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Blanchierter Rettich.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear Korean noodle soup with chicken strips, zucchini and carrot, light broth"),
  },
  {
    id: "mo-a",
    title: "Geschmorter Chinakohl & Tofu mit Reis",
    desc: "Napa-Kohl mit Shiitake und Tofu sanft in Brühe geschmort; dazu Reis.",
    story: "Nördlich-chinesische Hausmannskost – weich und wärmend.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Chinakohl 400 g", "Tofu fest 360 g", "Shiitake 120 g", "Gemüsebrühe 400 ml", "Sojasauce natriumarm 18 ml", "Sesamöl 6 ml", "Ingwer 8 g"],
    steps: ["Reis garen.", "Kohl & Shiitake 10–12 Min. sanft schmoren.", "Tofu zugeben, 3–4 Min. ziehen lassen; mild abschmecken und mit Reis servieren."],
    checks: "Gastritis – sanft geschmort · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Putenbrust; Weißer Reis ↔ Vollkornreis.",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Braised napa cabbage with tofu and shiitake in light broth, side bowl of rice"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Süßkartoffel-Juk mit Seidentofu (고구마죽)",
    desc: "Koreanischer Süßkartoffel-Reisbrei mit Seidentofu – zart und leicht süß.",
    story: "Beliebtes mildes Frühstück in Korea.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈21 g p. P.",
    ingredients: ["Süßkartoffel 400 g", "Reis (roh) 70 g", "Wasser 900 ml", "Tofu seiden 200 g", "Ingwer 6 g", "Salz 1 g"],
    steps: ["Süßkartoffel & Reis 25–30 Min. sanft kochen.", "Pürieren, Tofu zugeben und 2–3 Min. ziehen lassen.", "Mild abschmecken."],
    checks: "Gastritis – weich & mild · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Hirse.",
    side: "Warmer Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Silky sweet potato rice porridge with silken tofu, pastel bowl, steam visible"),
  },
  {
    id: "di-m",
    title: "Leichtes Yaki Udon mit Huhn & Gemüse (やきうどん)",
    desc: "Wenig Öl, ohne Schärfe – Gemüseanteil hoch.",
    story: "Japanisches Pfannengericht in mild.",
    target: "≈79 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: ["Udon (trocken) 110 g", "Hähnchenbrust 220 g", "Paprika 150 g", "Zwiebel 80 g", "Spinat 150 g", "Sojasauce natriumarm 22 ml", "Sesamöl 6 ml"],
    steps: ["Udon kochen und abspülen.", "Hähnchen in wenig Öl vollständig garen.", "Gemüse kurz mitbraten, mild abschmecken."],
    checks: "Gastritis – wenig Fett · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light yaki udon with chicken and colorful vegetables, no chili, glossy noodles"),
  },
  {
    id: "di-a",
    title: "Kabeljau in milder Ingwer-Sojasauce (煮付け) mit Reis",
    desc: "Leicht süß-salzige Schmorflüssigkeit, sehr mild.",
    story: "Japanische „Nizuke“-Hausküche.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈29 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Kabeljaufilet 320 g", "Wasser 300 ml", "Sojasauce natriumarm 20 ml", "Mirin 6 ml", "Honig 4 g", "Ingwer 10 g"],
    steps: ["Reis garen.", "Wasser+Sojasauce+Mirin+Honig+Ingwer aufkochen.", "Fisch 8–10 Min. leise köcheln, vollständig garen; mit Reis servieren."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Fisch vollständig gegart",
    swaps: "Kabeljau ↔ Köhler; Weißer Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Simmered cod in light ginger-soy broth, served with a bowl of rice"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Tofu-„Rührei“ Bowl über Reis",
    desc: "Zerdrückter Tofu als pflanzliches „Rührei“ auf heißem Reis.",
    story: "Japan-inspiriert, proteinreich und gut bekömmlich.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈23 g p. P.",
    ingredients: ["Reis (roh) 80 g", "Tofu fest 250 g", "Spinat 150 g", "Zwiebel 60 g", "Sojasauce natriumarm 10 ml", "Sesam 6 g"],
    steps: ["Reis garen.", "Tofu zerdrücken und mit Zwiebel/Spinat 4–5 Min. garen.", "Über den Reis geben und mild würzen."],
    checks: "Gastritis – mild & wenig Öl · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Reis ↔ Vollkornreis; Spinat ↔ Pak Choi.",
    side: "Warmer Bancha.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Tofu scramble over steamed rice with spinach, gentle colors, top-down"),
  },
  {
    id: "mi-m",
    title: "Somen-Pilzsuppe (そうめん)",
    desc: "Feine Nudeln in leichter Brühe mit Shiitake.",
    story: "Zart & klar – magenfreundlich.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: ["Somen (trocken) 110 g", "Shiitake 140 g", "Frühlingszwiebel 20 g", "Miso hell 18 g", "Wasser 1000 ml", "Sojasauce natriumarm 10 ml"],
    steps: ["Brühe aus Wasser+Miso+Sojasauce erhitzen.", "Shiitake 4–5 Min. köcheln.", "Nudeln separat kochen, abspülen, zugeben."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Somen ↔ Udon; Shiitake ↔ Zucchini.",
    side: "Kleine Schale Gurke.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light somen soup with shiitake and scallions in clear bowl"),
  },
  {
    id: "mi-a",
    title: "„Yuxiang“-Aubergine mild (ohne Chili) mit Reis",
    desc: "Reduzierte Säure & Öl, leicht gebunden – ohne Schärfe.",
    story: "Sichuan-Idee, aber sanft umgesetzt.",
    target: "≈73 g KH gesamt (2 P.) · Protein ≈16 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Aubergine 400 g", "Knoblauch 1 Stück", "Ingwer 8 g", "Tomaten (reif) 300 g", "Sojasauce natriumarm 20 ml", "Reisessig mild 6 ml", "Honig 4 g", "Maisstärke 10 g"],
    steps: ["Reis garen; Auberginen mit wenig Öl weich schmoren.", "Tomaten & Gewürze 8–10 Min. köcheln.", "Leicht mit Stärke binden, zu Reis servieren."],
    checks: "Gastritis – geringe Säure, mild · Diabetes ✓ – ≈73 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Aubergine ↔ Zucchini; Weißer Reis ↔ Vollkornreis.",
    side: "Blanchierter Spinat.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Glazed eggplant in mild garlic-ginger tomato sauce, bowl of rice alongside"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Oyakodon (Ei vollständig gestockt)",
    desc: "Hähnchen-Ei-Donburi, Sauce mild – ohne rohe Eier.",
    story: "Japanischer Klassiker – hier mit komplett gestocktem Ei.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈31 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Hähnchenbrust 220 g", "Zwiebel 60 g", "Eier 3 Stück", "Sojasauce natriumarm 20 ml", "Mirin 8 ml", "Wasser 200 ml"],
    steps: ["Reis garen.", "Huhn/Zwiebel 6–8 Min. in milder Sauce köcheln.", "Verquirlte Eier zugeben und vollständig stocken lassen; über Reis."],
    checks: "Gastritis – mild geschmort · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Ei/Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Milde Misosuppe.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Oyakodon bowl with fully set egg, tender chicken, glossy sauce over rice"),
  },
  {
    id: "do-m",
    title: "Kongnamul-bap – Sojasprossen-Reis (콩나물밥)",
    desc: "Koreanischer Sprossenreis – knusprig-frisch und mild.",
    story: "Sprossen als Hauptdarsteller, leicht & klar.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Sojasprossen 250 g", "Frühlingszwiebel 20 g", "Sesam 6 g", "Sojasauce natriumarm 12 ml", "Wasser 200 ml"],
    steps: ["Reis mit Sprossen garen.", "Mit Sojasauce & Sesam mild würzen.", "Mit Lauchgrün servieren."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ gut gewaschen & erhitzt",
    swaps: "Sprossen ↔ Spinat; Reis ↔ Vollkornreis.",
    side: "Mildes (weißes) Kimchi separat.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean bean sprout rice in a bowl, glossy grains, scallions and sesame on top"),
  },
  {
    id: "do-a",
    title: "Ingwer-Miso-Hähncheneintopf mit Wurzelgemüse & Reis",
    desc: "Hähnchen, Karotte & Daikon in Misobrühe geschmort; dazu Reis.",
    story: "Japanisch inspiriert – winterlich & mild.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Hähnchenbrust 300 g", "Karotte 200 g", "Rettich (Daikon) 200 g", "Miso hell 24 g", "Wasser 800 ml", "Sojasauce natriumarm 10 ml", "Ingwer 8 g"],
    steps: ["Reis garen.", "Gemüse 12–15 Min. in Misobrühe sieden.", "Huhn zugeben und 8–10 Min. garen; mit Reis servieren."],
    checks: "Gastritis – mild & lange geköchelt · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Huhn ↔ Tofu; Reis ↔ Vollkornreis.",
    side: "Blanchierter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ginger-miso chicken stew with carrots and daikon, side rice bowl"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Mais-Congee mit Seidentofu",
    desc: "Feiner Reis-Mais-Brei mit Seidentofu.",
    story: "Südchinesische Inspiration – mild & leicht süß.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: ["Reis (roh) 70 g", "Mais (gekocht) 200 g", "Wasser 1000 ml", "Tofu seiden 200 g", "Salz 1 g"],
    steps: ["Reis 30 Min. leise köcheln.", "Mais & Tofu 3–4 Min. mitziehen lassen.", "Dezent abschmecken."],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchenhack; Reis ↔ Hirse.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Silky corn congee with silken tofu in a white bowl, steam visible"),
  },
  {
    id: "fr-m",
    title: "Vollkorn-Risotto (IT) mit Zucchini & Erbsen",
    desc: "Cremig gerührtes Vollkornrisotto, ballaststoffreich.",
    story: "Einzige italienische Option der Woche.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: ["Vollkorn-Risottoreis (roh) 100 g", "Zucchini 300 g", "Erbsen (TK) 150 g", "Gemüsebrühe 900 ml", "Olivenöl 8 ml", "Parmesan (pasteurisiert) 20 g"],
    steps: ["Reis in wenig Öl anschwitzen, nach und nach Brühe zugeben (20–25 Min.).", "Zucchini/Erbsen in den letzten 6–8 Min. zugeben.", "Mit wenig Käse abschmecken."],
    checks: "Gastritis – sanft gerührt · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ pasteurisierter Käse",
    swaps: "Vollkornreis ↔ Gerste; Käse ↔ Nährhefe.",
    side: "Gedämpfter Brokkoli.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy wholegrain risotto with zucchini and peas, simple bowl, no garnishes"),
  },
  {
    id: "fr-a",
    title: "Shogayaki – Ingwer-Schweinefleisch mit Reis",
    desc: "Mageres Schwein sanft gebraten und in Ingwersauce glasiert; dazu Reis.",
    story: "Japanische Hausmannskost – salzig-süß, ohne Chili.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Schweinelachs/‑rücken 280 g", "Zwiebel 80 g", "Ingwer 10 g", "Sojasauce natriumarm 20 ml", "Mirin 6 ml", "Honig 4 g"],
    steps: ["Reis garen.", "Schweinefleisch in wenig Öl vollständig braten.", "Sauce zugeben und leicht glasieren; mit Reis servieren."],
    checks: "Gastritis – wenig Fett · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ Fleisch vollständig gegart",
    swaps: "Schwein ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Blanchierter Spinat.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ginger pork slices glossy in pan sauce, served with steamed rice"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Hirse-Dattel-Porridge",
    desc: "Warmer Frühstücksbrei aus Hirse und Datteln.",
    story: "Nordchinesische Anmutung – mild & wärmend.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈10 g p. P.",
    ingredients: ["Hirse (roh) 80 g", "Datteln 40 g", "Wasser 1000 ml"],
    steps: ["Hirse waschen, aufkochen.", "Datteln zugeben und 25–30 Min. sanft köcheln.", "Bei Bedarf Wasser ergänzen, mild abschmecken."],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Hirse ↔ Reis; Dattel ↔ Kürbiswürfel.",
    side: "Warmer Reistee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Millet and date porridge in a ceramic bowl, soft light"),
  },
  {
    id: "sa-m",
    title: "Japchae – Süßkartoffelglasnudeln mit Huhn (잡채)",
    desc: "Glasnudeln mit buntem Gemüse & Huhn – wenig Öl; Chili separat.",
    story: "Koreanischer Klassiker, hier extra mild.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈27 g p. P.",
    ingredients: ["Süßkartoffelglasnudeln (trocken) 90 g", "Hähnchenbrust 220 g", "Paprika 150 g", "Spinat 150 g", "Karotte 120 g", "Zwiebel 60 g", "Sojasauce natriumarm 22 ml", "Sesamöl 8 ml"],
    steps: ["Glasnudeln kochen, abspülen.", "Hähnchen vollständig garen.", "Mit Gemüse vermengen, mild würzen; Chili separat servieren."],
    checks: "Gastritis – mild & ohne Chili · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Glasnudeln ↔ Udon.",
    side: "Gurkensalat natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with chicken and colorful vegetables, glossy sweet potato noodles, no chili"),
  },
  {
    id: "sa-a",
    title: "Gedämpfter Wolfsbarsch mit Ingwer & Reis",
    desc: "Kantonesisch gedämpft – zart & klar.",
    story: "Schonend dämpfen, dezente Würze.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Wolfsbarsch 320 g", "Ingwer 10 g", "Frühlingszwiebel 24 g", "Sojasauce natriumarm 12 ml", "Sesamöl 6 ml"],
    steps: ["Reis garen.", "Fisch auf Ingwer 10–12 Min. dämpfen (vollständig gar).", "Mit wenig Sojasauce/Sesamöl beträufeln, Lauchgrün darüber; mit Reis."],
    checks: "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch vollständig gegart",
    swaps: "Wolfsbarsch ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed sea bass with ginger and scallions, light soy drizzle, served with rice"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Japanischer Süßkartoffelreis (さつまいもご飯)",
    desc: "Im Reiskocher gegarter Reis mit Süßkartoffel – leicht süß.",
    story: "Herbstlicher Klassiker aus Japan.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈10 g p. P.",
    ingredients: ["Reis (roh) 90 g", "Süßkartoffel 250 g", "Kombu 2 g", "Wasser 300 ml", "Sesam 6 g"],
    steps: ["Süßkartoffel würfeln, Reis waschen.", "Mit Kombu und Wasser garen (Kombu entfernen).", "Mit Sesam servieren."],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ vollständig gegart, Jod sparsam",
    swaps: "Weißer Reis ↔ Vollkornreis; Sesam ↔ Nori.",
    side: "Warmer Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese sweet potato rice in pot, golden cubes among white grains"),
  },
  {
    id: "so-m",
    title: "Tomaten-Hühner-Nudelsuppe",
    desc: "Klare Nudelsuppe mit Tomate – leicht säuerlich, nicht scharf.",
    story: "Chinesische Hausmannskost, wärmend.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈25 g p. P.",
    ingredients: ["Weizennudeln (trocken) 100 g", "Hähnchenbrust 180 g", "Tomaten (reif) 300 g", "Wasser 1000 ml", "Sojasauce natriumarm 10 ml", "Ingwer 6 g"],
    steps: ["Brühe kochen, Tomaten 8–10 Min. sieden.", "Hähnchenstreifen 6–8 Min. garen.", "Nudeln separat kochen und zugeben."],
    checks: "Gastritis – milde Säure · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Weizennudeln ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Blanchierter Spinat.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken tomato noodle soup, clear red-tinged broth, thin noodles, steam"),
  },
  {
    id: "so-a",
    title: "Leichter Tofu-Pilz-Hotpot + kleiner Reis",
    desc: "Tofu, Pilze & Chinakohl in klarer Brühe; dazu kleine Reisportion.",
    story: "Klarer Hotpot-Stil aus Ostasien.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: ["Reis (roh) 80 g", "Tofu fest 300 g", "Shiitake 180 g", "Enoki 120 g", "Chinakohl 200 g", "Wasser 1200 ml", "Miso hell 20 g", "Sojasauce natriumarm 10 ml"],
    steps: ["Reis garen.", "Gemüse & Tofu 10–12 Min. in milder Brühe kochen.", "Mit wenig Miso/Sojasauce abschmecken und heiß servieren."],
    checks: "Gastritis – mild & warm · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchen; Weißer Reis ↔ Vollkornreis.",
    side: "Milde Gurken-Pickles (ohne Chili).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light tofu and mushroom hotpot in a shallow pot, napa cabbage, steam rising"),
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
        ["f", "m", "a"].indexOf(a.id.split("-")[1]) -
        ["f", "m", "a"].indexOf(b.id.split("-")[1])
    )
  );
  return map;
};

/* ---------- Einkaufsliste (Gruppe wie Woche-4/-5) ---------- */
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
  protein: ["hähn", "pute", "rind", "schwein", "kabeljau", "lachs", "wolfsbarsch", "tofu", "eier", "edamame", "parmesan"],
  veg: ["karotte", "zucchini", "pak choi", "spinat", "shiitake", "enoki", "brokkoli", "chinakohl", "zwiebel", "paprika", "rettich", "frühlingszwiebel", "gurke", "tomaten", "süßkartoffel", "aubergine"],
  staple: ["reis", "hirse", "udon", "somen", "weizennudeln", "glasnudeln", "vollkorn", "risotto", "gerste"],
  season: ["kombu", "nori", "brühe", "gemüsebrühe", "sojasauce", "miso", "sesamöl", "olivenöl", "mirin", "honig", "salz", "sesam", "knoblauch", "ingwer", "wasser", "tee"],
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
  const b = accumulateList(DATA);
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

/* ---------- Recipe Card ---------- */
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
  return (
    <div id="cookbook-root">
      {/* Cover + Wochenübersicht */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              Woche ab {meta.startDate} — <b>Modus: Non-Strict (balanced)</b>; Fokus CN/JP/KR, milde Würzung, natriumarme Sojasauce, schwangerschaftssicher; Diabetes: je Mahlzeit (2 P.) 60–90 g KH.
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="Titelbild hochladen" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>Wochenübersicht</h2>
            <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 8, fontSize: 14 }}>
              {DAYS_ORDER.map((d) => (
                <div key={d} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{DAY_NAME[d]}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
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

/* ---------- Einkaufsliste ---------- */
function GroceryList() {
  const rootRef = useRef(null);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>Automatisch aus den Rezepten der Woche ab {meta.startDate} berechnet.</p>
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
            Hinweis: Natriumarme Sojasauce verwenden; Algen (Kombu/Nori) sparsam; alles vollständig garen.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Root-Komponente ---------- */
export default function Woche6_2025_11_03_DE() {
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
          {/* optional Sprachen-Toggle */}
          {/* <button onClick={() => toggleLang()} style={{ padding: "10px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.text, boxShadow: COLORS.btnShadow, fontWeight: 600 }}>
            {t.toggle}
          </button> */}
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
    if (!/^Woche 6 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen 💊-Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend müssen 💊-Reminder haben");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zu wenige Zutaten: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Zu wenige Schritte: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY Gruppen fehlen");
    console.log("[GhibliKitchen] All tests passed (DE JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}
