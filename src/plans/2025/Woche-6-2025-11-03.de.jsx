// src/plans/Woche-6-2025-11-03.de.jsx
// Strikt nach Woche-5-2025-10-27.* Struktur (1:1), nur Meta & DATA neu (komplett neue Rezepte)

import { BookmarkMenuButton } from "@/components/MealCard";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

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
  main: "Moving Kitchen Tales – Woche 6",
  list: "Moving Kitchen Tales – Einkaufsliste – Woche 6",
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

/* ---------- DATA (21 neue Rezepte) ---------- */
export const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Tamago-toji Suppe (卵とじ汁) + kleiner Reis",
    desc: "Klarer japanischer Eintopf mit vollständig gestocktem Ei und Seidentofu; dazu kleine Reisschale.",
    story: "Tamago-toji bindet Brühe mit Ei – hier vollständig gegart und besonders mild.",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 2 Stück",
      "Tofu seiden 150 g",
      "Spinat 120 g",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 15 g",
    ],
    steps: [
      "Reis garen.",
      "Brühe erhitzen, Spinat 2–3 Min. garen, Tofuwürfel zugeben.",
      "Verquirlte Eier einlaufen lassen und rühren, bis vollständig gestockt; mild abschmecken.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Ei vollständig gegart",
    swaps: "Seidentofu ↔ fester Tofu; Spinat ↔ Pak Choi.",
    side: "Kleine Gurken-Pickles (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Clear Japanese egg-drop soup with silken tofu and spinach, small rice bowl on side"),
  },
  {
    id: "mo-m",
    title: "Takikomi Gohan mit Huhn & Pilzen (炊き込みご飯)",
    desc: "Gemischter Reis mit Hähnchen, Shiitake und Karotte – alles in einem Topf gegart.",
    story: "Hausmannskost aus Japan – aromatisch, aber sehr mild gewürzt.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Hähnchenbrust 200 g",
      "Shiitake 120 g",
      "Karotte 100 g",
      "Sojasauce natriumarm 20 ml",
      "Mirin 5 ml",
      "Wasser 320 ml",
    ],
    steps: [
      "Alle Zutaten mit Wasser und Gewürz in den Topf geben.",
      "Abgedeckt 20–25 Min. sanft garen, bis Reis weich ist.",
      "Durchheben, 5 Min. ruhen lassen und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Tofu; Shiitake ↔ Champignons.",
    side: "Blanchierter Brokkoli.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese mixed rice with chicken, shiitake and carrots in pot, gentle steam"),
  },
  {
    id: "mo-a",
    title: "Dubu Jorim (두부조림) – Tofu in milder Sojasauce + Reis",
    desc: "Koreanischer Tofu-Schmor-Teller, ohne Schärfe, mit Lauch und Sesam.",
    story: "Beliebtes Beilagengericht als Haupt – proteinreich und leicht.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Tofu fest 400 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 300 ml",
      "Frühlingszwiebel 20 g",
      "Knoblauch 1 Stück",
      "Ingwer 8 g",
      "Sesamöl 8 ml",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen.",
      "Tofu in Scheiben in Wasser+Sojasauce 6–8 Min. sanft schmoren.",
      "Mit Lauch/Knoblauch/Ingwer kurz ziehen lassen, Sesamöl zugeben.",
    ],
    checks: "Gastritis – mild geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Spinat-Namul (mild).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean braised tofu steaks in light soy glaze, scallions on top, side rice bowl"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Sumashi-jiru (すまし汁) mit Seidentofu & kleiner Reis",
    desc: "Klare Suppe mit Tofu und Lauch, sehr leicht; kleine Portion Reis dazu.",
    story: "Japanische Frühstückssuppe – elegant und beruhigend.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Tofu seiden 200 g",
      "Wasser 900 ml",
      "Sojasauce natriumarm 8 ml",
      "Wakame (getrocknet) 2 g",
      "Frühlingszwiebel 20 g",
    ],
    steps: [
      "Reis garen.",
      "Klare Brühe erhitzen, Wakame 3 Min. ziehen lassen.",
      "Tofu zugeben, mild würzen und mit Lauch servieren.",
    ],
    checks: "Gastritis – klar & mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart; Jod sparsam",
    swaps: "Wakame ↔ Nori (sparsam); Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Crystal clear soup with silken tofu cubes and scallions, small rice bowl"),
  },
  {
    id: "di-m",
    title: "Kaschuhuhn (腰果鸡丁) – mild – mit Vollkornreis",
    desc: "China-klassisch, aber salzarm und ohne Schärfe – knusprige Cashews.",
    story: "Pfannengericht für jeden Tag – bunt und ausgewogen.",
    target: "≈82 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Vollkornreis (roh) 90 g",
      "Hähnchenbrust 240 g",
      "Cashews 40 g",
      "Paprika 150 g",
      "Brokkoli 200 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 22 ml",
      "Rapsöl 10 ml",
    ],
    steps: [
      "Reis garen; Cashews ohne Öl kurz rösten.",
      "Hähnchenwürfel vollständig durchbraten.",
      "Gemüse zugeben, mild würzen, Cashews unterheben.",
    ],
    checks: "Gastritis – wenig Fett · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Cashews ↔ Erdnüsse (geröstet) · Hähnchen ↔ Tofu.",
    side: "Gurkensalat natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fry chicken with broccoli and peppers, sprinkle of roasted cashews, brown rice"),
  },
  {
    id: "di-a",
    title: "Gyeran-jjim (계란찜) – gedämpfter Eierpudding + Gemüse & Reis",
    desc: "Sanft gedämpfter koreanischer Eierpudding, vollständig gestockt; dazu Zucchini und Reis.",
    story: "Wolkenweich und sehr bekömmlich – Abendessen zum Löffeln.",
    target: "≈66 g KH gesamt (2 P.) · Protein ≈23 g p. P.",
    ingredients: [
      "Eier 3 Stück",
      "Wasser 300 ml",
      "Tofu fest 150 g",
      "Zucchini 200 g",
      "Frühlingszwiebel 15 g",
      "Sojasauce natriumarm 8 ml",
      "Reis (roh) 80 g",
    ],
    steps: [
      "Reis garen; Zucchini dünsten.",
      "Eier mit Wasser verquirlen, Tofu unterrühren, in Schüssel 12–15 Min. dämpfen bis fest.",
      "Mit Lauch und wenig Sojasauce servieren.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ Ei vollständig gestockt",
    swaps: "Tofu ↔ Hühnerbrustwürfel; Zucchini ↔ Spinat.",
    side: "Kleine Schale Kimchi weiß (ohne Chili).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean steamed egg custard in clay bowl, zucchini on side, small rice bowl"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Onigirazu (おにぎらず) mit Hähnchen‑Teriyaki",
    desc: "Reissandwich mit zartem Hähnchen in leichter Teriyaki-Glasur; nori außen.",
    story: "Praktisches Bento-Frühstück – hier warm und komplett durchgegart.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Sushi-Reis (roh) 90 g",
      "Hähnchenbrust 180 g",
      "Nori 2 Stück",
      "Sojasauce natriumarm 15 ml",
      "Honig 4 g",
      "Ingwer 6 g",
      "Gurke 80 g",
    ],
    steps: [
      "Reis kochen.",
      "Hähnchen in Pfanne garen, mit Sojasauce/Honig/Ingwer glasieren.",
      "Mit Gurke in Nori-Reis ‘sandwichen’ und halbieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Tofu; Sushi-Reis ↔ Vollkornreis.",
    side: "Milder Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Onigirazu rice sandwich with glazed chicken and cucumber, nori wrap, clean cut"),
  },
  {
    id: "mi-m",
    title: "Mandu‑guk (만두국) – milde Dumplingsuppe",
    desc: "Koreanische Klößchensuppe mit Gemüse in klarer Brühe.",
    story: "Seidige Brühe, sanfte Aromen – wohltuend und sättigend.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Mandu (Stück) 8 Stück",
      "Wasser 1100 ml",
      "Zucchini 120 g",
      "Tofu fest 150 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Brühe erhitzen; Mandu 6–8 Min. köcheln bis durchgegart.",
      "Zucchini/Tofu 3–4 Min. mitgaren.",
      "Mild abschmecken und mit Lauch servieren.",
    ],
    checks: "Gastritis – klar & mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Füllung vollständig gegart",
    swaps: "Mandu ↔ Udon (separat gekocht); Tofu ↔ Hähnchenwürfel.",
    side: "Gurken-Pickles (ohne Chili).",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean dumpling soup in clear broth with zucchini and tofu, steam rising"),
  },
  {
    id: "mi-a",
    title: "Tomaten‑Rind‑Schmortopf (番茄牛腩) – mild – mit Reis",
    desc: "Rind mit Tomaten und Kartoffeln sanft geschmort; dazu Reis.",
    story: "Südchinesisch inspiriert – reich an Gemüse, ohne Schärfe.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Rind (mager, Würfel) 300 g",
      "Tomaten (reif) 400 g",
      "Kartoffeln 300 g",
      "Zwiebel 80 g",
      "Wasser 600 ml",
      "Sojasauce natriumarm 15 ml",
    ],
    steps: [
      "Fleisch anrösten (wenig Öl), mit Wasser aufgießen.",
      "Tomaten/Kartoffeln/Zwiebel zugeben, 35–45 Min. sanft schmoren.",
      "Mit Reis servieren, mild abschmecken.",
    ],
    checks: "Gastritis – sanft geschmort · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Fleisch vollständig gegart",
    swaps: "Rind ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Blanchierter Spinat.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese tomato beef stew with potatoes in a bowl, side of white rice"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Zakkoku‑Gohan Set (雑穀ご飯) + Ohitashi & Misosuppe",
    desc: "Mehrkornreis, Spinat‑Ohitashi (blanchiert) und milde Misosuppe mit Tofu.",
    story: "Frühstück wie in Japan – schlicht, warm und ausgewogen.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Mehrkornreis (roh) 80 g",
      "Spinat 200 g",
      "Tofu fest 150 g",
      "Miso hell 18 g",
      "Wasser 1000 ml",
      "Nori 1 Stück",
    ],
    steps: [
      "Mehrkornreis garen.",
      "Spinat 1–2 Min. blanchieren, abtropfen lassen.",
      "Miso in heißem Wasser lösen (nicht kochen), Tofu kurz ziehen lassen; alles zusammen servieren.",
    ],
    checks: "Gastritis – mild & warm · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Mehrkornreis ↔ Reis; Spinat ↔ Pak Choi.",
    side: "Gerstentee oder Bancha warm.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set: multigrain rice, spinach ohitashi, small bowl miso soup with tofu"),
  },
  {
    id: "do-m",
    title: "Saeu Bokkeumbap (새우볶음밥) – milder Garnelen‑Reis",
    desc: "Schonend gebratener Reis mit Garnelen, Erbsen und Karotte – wenig Öl.",
    story: "Koreanisches Schnellgericht – hier salzarm und ohne Chili.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Garnelen (geschält) 220 g",
      "Erbsen (TK) 150 g",
      "Karotte 100 g",
      "Ei 1 Stück",
      "Sojasauce natriumarm 15 ml",
      "Rapsöl 10 ml",
    ],
    steps: [
      "Reis vorkochen und ausdampfen lassen.",
      "Garnelen vollständig garen, Gemüse zufügen.",
      "Reis und verquirltes Ei zugeben, Ei komplett stocken lassen; mild würzen.",
    ],
    checks: "Gastritis – wenig Fett · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Garnelen & Ei vollständig gegart",
    swaps: "Garnelen ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Gurkenscheiben.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean shrimp fried rice with peas and carrot, fully cooked egg, light glaze"),
  },
  {
    id: "do-a",
    title: "Oden (おでん) – milder Wintereintopf",
    desc: "Daikon, Konnyaku, frittierter Tofu (Atsuage), Fischkuchen & gekochte Eier in klarer Brühe.",
    story: "Straßenklassiker Japans – hier salzarm und ohne scharfe Dips.",
    target: "≈69 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Daikon 300 g",
      "Konnyaku 200 g",
      "Atsuage‑Tofu 200 g",
      "Fischkuchen 200 g",
      "Gekochte Eier 2 Stück",
      "Wasser 1200 ml",
      "Sojasauce natriumarm 15 ml",
      "Reis (roh) 70 g",
    ],
    steps: [
      "Brühe ansetzen; Daikon 12–15 Min. sieden.",
      "Konnyaku/Tofu/Fischkuchen 8–10 Min. mitziehen lassen.",
      "Mit Reis servieren; alles vollständig erhitzen.",
    ],
    checks: "Gastritis – klar & mild · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Fischkuchen ↔ mehr Tofu; Reis ↔ Vollkornreis.",
    side: "Milder Senf optional separat.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese oden pot with daikon, tofu, fish cakes and eggs in clear broth, side rice"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Bori‑bap (보리밥) – Gerstenreis‑Schale mit Tofu & Gemüse",
    desc: "Warmer Gerstenreis mit Tofu, Gurke und Karotte – leicht würzig, ohne Chili.",
    story: "Koreanisch rustikal, ballaststoffreich und magenfreundlich.",
    target: "≈66 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Perlgerste (roh) 80 g",
      "Tofu fest 200 g",
      "Gurke 150 g",
      "Karotte 100 g",
      "Sesam 6 g",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Gerste garen.",
      "Tofu würfeln und kurz in der Pfanne erhitzen.",
      "Mit Gemüse und Sesam auf Gerste anrichten, mild würzen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Gerste ↔ Reis; Tofu ↔ Hähnchen.",
    side: "Gerstentee warm.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean barley rice bowl with tofu, cucumber and carrot, sesame sprinkle"),
  },
  {
    id: "fr-m",
    title: "Reisnudelsuppe Guangzhou‑Stil (鸡丝米粉汤) – mild",
    desc: "Klare Hühnerbrühe mit Reisnudeln, Pak Choi und Ingwer.",
    story: "Südchinesisch inspiriert – leicht und aromatisch.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reisnudeln (trocken) 90 g",
      "Hähnchenbrust 200 g",
      "Pak Choi 200 g",
      "Ingwer 8 g",
      "Wasser 1200 ml",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 20 g",
    ],
    steps: [
      "Brühe kochen; Hähnchen 8–10 Min. gar ziehen.",
      "Pak Choi 2–3 Min. mitgaren.",
      "Reisnudeln separat kochen, abspülen, in die Brühe geben.",
    ],
    checks: "Gastritis – klar & mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Gurke natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cantonese-style chicken rice noodle soup with bok choy in clear broth"),
  },
  {
    id: "fr-a",
    title: "Gedämpfte Forelle mit Ingwer (清蒸鳟鱼) + Reis",
    desc: "Zarte Forelle mit Ingwer-Lauch-Aroma; dazu Reis.",
    story: "Schonende Dämpftechnik nach südchinesischem Vorbild.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Forellenfilet 320 g",
      "Reis (roh) 90 g",
      "Ingwer 12 g",
      "Frühlingszwiebel 24 g",
      "Sojasauce natriumarm 12 ml",
      "Sesamöl 6 ml",
      "Gemüsebrühe 100 ml",
    ],
    steps: [
      "Reis garen.",
      "Fisch auf Ingwer 9–11 Min. dämpfen (vollständig gar).",
      "Mit lauwarmer Brühe/Sojasauce übergießen, Sesamöl dazu; mit Reis servieren.",
    ],
    checks: "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Forelle vollständig gegart, quecksilberarm",
    swaps: "Forelle ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Brokkoli.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed trout fillet with ginger and scallions, light soy broth, served with rice"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Hobak‑bokkeum (호박볶음) – Zucchini‑Ei‑Pfanne + kleiner Reis",
    desc: "Sanft gebratene Zucchini mit Ei, komplett gestockt; kleine Reisschale.",
    story: "Koreanisches Frühstück – mild und schnell.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Zucchini 300 g",
      "Eier 2 Stück",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 8 ml",
      "Sesamöl 5 ml",
    ],
    steps: [
      "Reis garen.",
      "Zucchini in wenig Öl 3–4 Min. braten.",
      "Eier unterrühren und vollständig stocken lassen; mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ Ei vollständig gegart",
    swaps: "Zucchini ↔ Spinat; Reis ↔ Vollkornreis.",
    side: "Kleine Schale Kimchi weiß (ohne Chili).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean zucchini and egg sauté, fully set, small bowl of rice"),
  },
  {
    id: "sa-m",
    title: "Warme Soba mit Sesam‑Sauce & Hähnchen (ごまだれそば)",
    desc: "Soba in milder Sesam-Dashi-Sauce, Hähnchenstreifen und Gurke.",
    story: "Sesam betont die Nussigkeit der Buchweizennudeln – ohne Schärfe.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Soba (trocken) 100 g",
      "Hähnchenbrust 200 g",
      "Gurke 120 g",
      "Sesam 10 g",
      "Sojasauce natriumarm 15 ml",
      "Wasser 100 ml",
      "Reisessig mild 5 ml",
    ],
    steps: [
      "Soba kochen, abspülen.",
      "Hähnchenstreifen garen.",
      "Sauce aus Sojasauce/Wasser/Essig/Sesam anrühren, alles mischen und warm servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Soba ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Warm soba noodles with sesame sauce, chicken slices and cucumber strips"),
  },
  {
    id: "sa-a",
    title: "Huang Men Ji (黄焖鸡) – gelb geschmortes Huhn + Reis (mild)",
    desc: "Kartoffeln, Shiitake und Hähnchen sanft geschmort; ohne Chili.",
    story: "Nordchinesischer Topf – hier leichter und salzarm.",
    target: "≈82 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Hähnchenkeule ohne Haut 320 g",
      "Kartoffeln 250 g",
      "Shiitake 120 g",
      "Zwiebel 80 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 600 ml",
      "Reis (roh) 80 g",
    ],
    steps: [
      "Huhn kurz anbraten, mit Wasser aufgießen.",
      "Kartoffeln/Shiitake/Zwiebel zugeben, 25–30 Min. sanft schmoren.",
      "Mit Reis servieren, mild abschmecken.",
    ],
    checks: "Gastritis – mild geschmort · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese yellow braised chicken with potatoes and mushrooms, small bowl of rice"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Sekihan (赤飯) – roter Bohnenreis (kleine Portion)",
    desc: "Adzuki‑Bohnen mit Klebreis – zart und nussig, kleine Portion zum Frühstück.",
    story: "Festlicher Reis – hier diabetikerfreundlich portioniert.",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈10 g p. P.",
    ingredients: [
      "Klebreis (roh) 90 g",
      "Adzukibohnen (gekocht) 120 g",
      "Sesam 6 g",
      "Salz 1 g",
      "Wasser 320 ml",
    ],
    steps: [
      "Klebreis waschen, mit Bohnen und Wasser 25–30 Min. garen.",
      "5 Min. ruhen lassen.",
      "Mit Sesam servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Klebreis ↔ Reis; Adzuki ↔ Edamame (separat).",
    side: "Warmer Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese sekihan red rice with azuki beans in a small bowl"),
  },
  {
    id: "so-m",
    title: "Garnelen‑Rührei (虾仁炒蛋) + Reis – voll durchgegart",
    desc: "Saftiges Rührei mit Garnelen, komplett gestockt; dazu Reis.",
    story: "Kantonesisch inspiriert – weich, mild, proteinstark.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Garnelen (geschält) 220 g",
      "Eier 3 Stück",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
      "Rapsöl 8 ml",
    ],
    steps: [
      "Reis garen.",
      "Garnelen 3–4 Min. braten bis durch.",
      "Eier zugeben und vollständig stocken lassen; mild würzen.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Garnelen/Ei vollständig gegart",
    swaps: "Garnelen ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Brokkoli.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese shrimp and egg scramble glossy in pan, served with rice"),
  },
  {
    id: "so-a",
    title: "Sukiyaki‑Style Tofu‑Rind‑Topf (すき焼き風) ohne rohes Ei + kleiner Reis",
    desc: "Rind, Tofu, Shirataki, Chinakohl & Pilze in milder Brühe; ohne rohei‑Dip.",
    story: "Wärmender Tisch‑Eintopf – alle Zutaten vollständig gegart.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Rind (dünn geschnitten) 260 g",
      "Tofu fest 250 g",
      "Shirataki 200 g",
      "Chinakohl 300 g",
      "Shiitake 120 g",
      "Sojasauce natriumarm 20 ml",
      "Mirin 6 ml",
      "Wasser 800 ml",
    ],
    steps: [
      "Brühe ansetzen.",
      "Gemüse 6–8 Min. sieden, dann Tofu/Rind 4–5 Min. garen.",
      "Mit kleinem Reis servieren; ohne rohe Eier.",
    ],
    checks: "Gastritis – mild gekocht · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ alles vollständig gegart",
    swaps: "Rind ↔ Pute; Shirataki ↔ Soba (separat).",
    side: "Gurken‑Pickles (ohne Chili).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light sukiyaki-style hotpot with beef, tofu, napa and mushrooms, small rice bowl"),
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

/* ---------- Einkaufsliste (Gruppen wie Woche-4/5) ---------- */
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
  veg: ["karotte", "zucchini", "pak choi", "spinat", "shiitake", "enoki", "brokkoli", "chinakohl", "zwiebel", "paprika", "rettich", "frühlingszwiebel", "gurke", "tomaten", "kartoffeln", "daikon"],
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
            Hinweis: Natriumarme Sojasauce verwenden; Algen (Wakame/Nori) sparsam; alles vollständig garen.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Root-Komponente ---------- */
export default function Woche6_2025_11_03_DE() {
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
    if (!/^Woche 6 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittagessen ohne Medikamenten-Reminder");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abendessen mit Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zu wenige Zutaten: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Zu wenige Schritte: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY Gruppen fehlen");
    console.log("[Moving Kitchen Tales] All tests passed (DE JSX).");
  } catch (e) {
    console.error("[Moving Kitchen Tales] Tests failed:", e);
  }
}