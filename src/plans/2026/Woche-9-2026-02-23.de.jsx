// src/plans/2026/Woche-9-2026-02-23.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – Woche 9 (Start: 2026-02-23)
  Fokus: Airfryer Hacks, Reiskocher-Liebe (täglich 1x), Asiatische & Europäische Comfort-Food Mischung.
  Inhalt: Balanced, Schwangerschaftssicher, Diabetesfreundlich.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 9",
  startDate: "2026-02-23",
  id: "woche-9-2026-02-23",
  lang: "de",
  sidebar: "Woche 9 (2026-02-23)",
};

const FILE_BASE = "Woche 9 2026-02-23";

const UI_TITLES = {
  main: "Rezepte Woche 9",
  list: "Einkaufsliste Woche 9",
};

// ---- THEME ----
const THEME_VARS_LIGHT = {
  "--bg": "#FAF7F1",
  "--text": "#111827",
  "--panel": "#FFFFFF",
  "--border": "rgba(0,0,0,.10)",
  "--muted": "#6B7280",
  "--chip-bg": "#EEF8F3",
  "--shadow": "0 8px 24px rgba(0,0,0,.12)",
  "--accent": "#e07a9a",
  "--accent-2": "#2aa769",
  "--grad-hero": "linear-gradient(135deg, rgba(224,122,154,.2), rgba(42,167,105,.18))",
  "--btn-on-bg": "#EEF8F3",
  "--btn-border": "rgba(0,0,0,.15)",
};
const THEME_VARS_DARK = {
  "--bg": "#0f1115",
  "--text": "#E5E7EB",
  "--panel": "#161A22",
  "--border": "rgba(255,255,255,.12)",
  "--muted": "#9CA3AF",
  "--chip-bg": "rgba(255,255,255,.06)",
  "--shadow": "0 10px 28px rgba(0,0,0,.45)",
  "--accent": "#e07a9a",
  "--accent-2": "#2aa769",
  "--grad-hero": "linear-gradient(135deg, rgba(224,122,154,.18), rgba(42,167,105,.15))",
  "--btn-on-bg": "rgba(255,255,255,.10)",
  "--btn-border": "rgba(255,255,255,.18)",
};

function useSystemPrefersDark() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!m) return;
    setPref(m.matches);
    const fn = (e) => setPref(e.matches);
    m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);
  return pref;
}
function themeVars(mode) {
  return mode === "dark" ? THEME_VARS_DARK : THEME_VARS_LIGHT;
}

function getLangFromQuery() {
  if (typeof window === "undefined") return null;
  try {
    const qs = new URLSearchParams(window.location.search);
    const fromQuery = qs.get("lang");
    return fromQuery ? String(fromQuery).slice(0, 2).toLowerCase() : null;
  } catch { return null; }
}
function useLangHint() {
  const [q, setQ] = useState(getLangFromQuery());
  useEffect(() => {
    const onChange = () => setQ(getLangFromQuery());
    window.addEventListener?.("popstate", onChange);
    window.addEventListener?.("hashchange", onChange);
    return () => {
      window.removeEventListener?.("popstate", onChange);
      window.removeEventListener?.("hashchange", onChange);
    };
  }, []);
  return q;
}

const scrollToId = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const cardPanelStyle = {
  background: "var(--panel)",
  borderRadius: 18,
  padding: 24,
  boxShadow: "var(--shadow)",
  border: "1px solid var(--border)",
};

const tagChip = (text) => (
  <span className="mkt-chip" key={text} style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "var(--chip-bg)", border: "1px solid var(--border)", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    {text}
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-02-23)",
  di: "Dienstag (2026-02-24)",
  mi: "Mittwoch (2026-02-25)",
  do: "Donnerstag (2026-02-26)",
  fr: "Freitag (2026-02-27)",
  sa: "Samstag (2026-02-28)",
  so: "Sonntag (2026-03-01)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Herzhafter Soja-Haferbrei 酱油麦片",
    desc: "Haferbrei mal nicht süß, sondern herzhaft mit Sojasauce, Sesamöl und einem festen Ei.",
    story: "Wer sagt, dass Haferflocken immer nach Apfel und Zimt schmecken müssen? In Asien liebt man herzhaftes Congee am Morgen – wir hacken das Ganze mit blitzschnellen Haferflocken.",
    target: "≈60 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Haferflocken zart 100 g",
      "Gemüsebrühe 500 ml",
      "Eier (hartgekocht) 2 Stück",
      "Sojasauce 1 EL",
      "Sesamöl 1 TL",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Haferflocken in der Gemüsebrühe ca. 5 Min einköcheln, bis ein cremiger Brei entsteht.",
      "Brei in Schüsseln füllen.",
      "Mit Sojasauce und Sesamöl würzen, hartgekochte Eier halbieren und auflegen.",
      "Mit Frühlingszwiebeln bestreuen."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Komplexe KH) · Schwangerschaft ✓ (Eier hartgekocht)",
    swaps: "Eier ↔ Gebratener Tofu",
    side: "Warmer Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Yaki Udon 焼きうどん (Wok)",
    desc: "Gebratene dicke Udon-Nudeln mit Schweinefleisch und knackigem Kohl.",
    story: "Das ultimative japanische Streetfood. Yaki Udon ist die dickere, saftigere Schwester von Yakisoba. Sojasauce und Kohl karamellisieren leicht im heißen Wok.",
    target: "≈85 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Udon-Nudeln (vorgegart) 400 g",
      "Schweinegeschnetzeltes 150 g",
      "Weißkohl (geschnitten) 150 g",
      "Sojasauce 2 EL",
      "Austernsauce 1 EL",
      "Karotte 50 g"
    ],
    steps: [
      "Udon-Nudeln kurz in heißem Wasser lösen, abtropfen.",
      "Schweinefleisch im Wok anbraten (komplett durchgaren!).",
      "Kohl und Karotte dazugeben, kurz anbraten.",
      "Nudeln, Sojasauce und Austernsauce unterheben und pfannenrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch komplett durch) · Diabetes ✓",
    swaps: "Schwein ↔ Hähnchen",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Lachs-Teriyaki Reis 鮭の照り焼きご飯 (Reiskocher)",
    desc: "Lachsfilet gart im Reiskocher über dem Reis, glasiert mit milder Teriyakisauce.",
    story: "Warum Fisch separat in der Pfanne braten, wenn der Reiskocher ihn butterweich dämpft? Der Saft zieht direkt in die Reiskörner ein.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 220 g",
      "Teriyaki-Sauce (mild) 3 EL",
      "Brokkoli-Röschen 100 g",
      "Wasser",
      "Sesam 1 TL"
    ],
    steps: [
      "Reis waschen und mit Wasser in den Reiskocher füllen.",
      "Lachs auf den Reis legen, mit Teriyaki-Sauce bepinseln.",
      "Start drücken. Brokkoli in den letzten 10 Min in den Dämpfaufsatz geben (oder roh auf den Lachs legen).",
      "Lachs zerteilen, alles mischen und mit Sesam toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart im Dampf >80°C sicher durch)",
    swaps: "Lachs ↔ Weißfisch",
    side: "Gedämpfter Brokkoli (direkt aus dem Topf).",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Lachs bleibt extrem saftig." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Bananen-Hafer-Pancakes",
    desc: "Zuckerfreie Pancakes, die nur durch eine reife Banane gesüßt werden.",
    story: "Ein Fitness-Klassiker. Wenn Bananen zu braun werden, verwandeln wir sie in diese kleinen, fluffigen Wunder.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken (im Mixer fein gemahlen) 100 g",
      "Banane (sehr reif) 1 Stück",
      "Eier 2 Stück",
      "Milch 50 ml",
      "Backpulver 1/2 TL",
      "Öl zum Braten"
    ],
    steps: [
      "Banane mit einer Gabel zu Mus zerdrücken.",
      "Eier, Milch, Hafermehl und Backpulver unterrühren.",
      "In einer Pfanne kleine Pancakes von beiden Seiten durchbacken.",
      "Mit etwas Joghurt servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Pancakes durchgaren) · Diabetes ✓",
    swaps: "Haferflocken ↔ Normales Mehl",
    side: "Naturjoghurt.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Airfryer Sweet & Sour Tofu",
    desc: "Knusprige Tofuwürfel aus dem Airfryer in milder süß-saurer Sauce.",
    story: "Die leichtere Version des chinesischen Take-aways. Der Airfryer macht den Tofu außen kross wie Chips, ohne ihn in Öl zu ertränken.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Fester Tofu 250 g",
      "Maisstärke 2 EL",
      "Ananas (Dose) 50 g",
      "Ketchup 2 EL",
      "Reisessig 1 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Tofu würfeln, abtupfen und in Maisstärke wälzen.",
      "Im Airfryer bei 200°C ca. 12-15 Min knusprig backen.",
      "Ketchup, Essig und etwas Ananassaft in einer Pfanne aufkochen.",
      "Knusper-Tofu und Ananasstücke kurz in der Sauce schwenken.",
      "Mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Tofu ↔ Hähnchenbrust",
    side: "Etwas Paprika im Wok mitbraten.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Goguma Bap 고구마밥 (Süßkartoffel-Reis)",
    desc: "Koreanischer Reiskocher-Liebling: Reis, zusammen mit Süßkartoffelwürfeln gegart.",
    story: "In Korea liebt man Süßkartoffeln. Die Stärke der Kartoffel macht den Reis wunderbar klebrig und bringt eine natürliche, sanfte Süße.",
    target: "≈80 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Süßkartoffel (gewürfelt) 150 g",
      "Hähnchenbrust (kleine Würfel) 150 g",
      "Sojasauce 1 EL",
      "Sesamöl 1 TL",
      "Wasser"
    ],
    steps: [
      "Hähnchenwürfel mit Sojasauce kurz marinieren.",
      "Reis und Wasser in den Reiskocher.",
      "Süßkartoffelwürfel und Fleisch oben auflegen.",
      "Nach dem Kochen Sesamöl darüberträufeln und gut durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch gart durch) · Diabetes ✓",
    swaps: "Hähnchen ↔ Rinderhack",
    side: "Ein mildes Kimchi oder Gurkensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Süßkartoffel nicht zu klein schneiden, sonst zerkocht sie komplett." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Schnelle Spinat-Miso-Suppe mit Ei",
    desc: "Warme Brühe, die den Magen beruhigt, aufgewertet mit Ei und Spinat.",
    story: "Ein super schnelles Frühstück. Die Miso-Paste liefert probiotische Kulturen und das gestockte Ei sorgt dafür, dass du bis zum Mittag satt bleibst.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Dashi oder Gemüsebrühe 600 ml",
      "Miso-Paste 2 EL",
      "Spinat 100 g",
      "Eier 2 Stück",
      "Gekochter Reis 100 g"
    ],
    steps: [
      "Brühe aufkochen, Reis und Spinat kurz erwärmen.",
      "Eier in die Suppe gleiten lassen und vollständig durchstocken lassen (!).",
      "Topf vom Herd nehmen und die Miso-Paste einrühren (nicht mehr kochen!)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier müssen in der heißen Brühe komplett fest werden!)",
    swaps: "Spinat ↔ Pak Choi",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Bulgogi-Style Beef Bowl 불고기 (Mild)",
    desc: "Süßlich mariniertes Rindfleisch mit Gemüse auf Reis.",
    story: "Bulgogi heißt wörtlich 'Feuerfleisch', aber es ist absolut null scharf. Die Marinade aus Soja und ein wenig Süße ist legendär.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Rindfleisch (Streifen) 200 g",
      "Sojasauce 2 EL",
      "Agavendicksaft 1 TL",
      "Knoblauch 1 Zehe",
      "Zucchini (Stifte) 100 g",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Rindfleisch mit Sojasauce, Agave und Knoblauch marinieren.",
      "Im Wok das Fleisch komplett durchbraten.",
      "Zucchini-Stifte in den letzten 3 Minuten mitbraten, damit sie knackig bleiben.",
      "Alles über den Reis geben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Rindfleisch gut durchgaren)",
    swaps: "Rind ↔ Schweinefleisch",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Mushroom & Edamame Rice (Reiskocher)",
    desc: "Aromatischer Reis mit Pilzen und proteinreichen Sojabohnen (Edamame).",
    story: "Veganer Comfort Food aus dem Reiskocher. Die Edamame bringen Farbe und Biss in den weichen Pilzreis.",
    target: "≈78 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Champignons oder Shiitake 150 g",
      "Edamame (TK, geschält) 100 g",
      "Gemüsebrühe 240 ml",
      "Sojasauce 1 EL",
      "Sesamöl 1 TL"
    ],
    steps: [
      "Pilze in Scheiben schneiden.",
      "Reis, Brühe, Pilze und Sojasauce in den Reiskocher geben und starten.",
      "Aufgetaute Edamame in den letzten 5 Minuten unter den heißen Reis mischen (so bleiben sie grün).",
      "Mit Sesamöl verfeinern."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Edamame ↔ Erbsen",
    side: "Ein Stück gebratener Fisch, falls mehr Protein gewünscht ist.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Edamame nicht die ganze Zeit mitkochen." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Gyeran-jjim 계란찜 (Dampf-Ei Mikrowelle)",
    desc: "Koreanisches souffliertes Ei. Fluffig wie eine Wolke, blitzschnell aus der Mikrowelle.",
    story: "In koreanischen Restaurants kommt Gyeran-jjim oft blubbernd im Tontopf. Zuhause schummeln wir mit der Mikrowelle – es wird genauso fluffig und ist in 4 Minuten fertig!",
    target: "≈60 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Wasser oder Hühnerbrühe 100 ml",
      "Frühlingszwiebel 10 g",
      "Salz 1 Prise",
      "Reis (gekocht, als Beilage) 120 g"
    ],
    steps: [
      "Eier mit Brühe, Salz und Frühlingszwiebeln gut verquirlen.",
      "In ein mikrowellengeeignetes Gefäß (z.B. kleiner Keramiktopf) füllen (sollte nur zu 70% voll sein, es geht auf!).",
      "Deckel locker auflegen. In der Mikrowelle ca. 3-4 Minuten bei mittlerer bis hoher Stufe garen, bis es komplett durchgestockt ist.",
      "Dazu Reis essen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier müssen komplett fest und heiß sein!)",
    swaps: "Mikrowelle ↔ Im Topf im Wasserbad dämpfen (dauert 15 Min)",
    side: "Warmer Reis.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Pasta e Ceci (Italienische Kichererbsen-Pasta)",
    desc: "Ein dickflüssiger, wärmender Eintopf aus Nudeln und Kichererbsen.",
    story: "Ein Klassiker aus Rom. Manche nennen es Suppe, manche Pasta. Die Stärke der Kichererbsen bindet die Brühe zu einer unglaublichen Creme.",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Kleine Nudeln (z.B. Ditalini) 100 g",
      "Kichererbsen (Dose, gespült) 150 g",
      "Tomatenmark 1 EL",
      "Gemüsebrühe 400 ml",
      "Knoblauch 1 Zehe",
      "Parmesan 20 g"
    ],
    steps: [
      "Knoblauch und Tomatenmark in etwas Öl anrösten.",
      "Kichererbsen (ein paar davon leicht zerdrücken) und Brühe dazugeben. 10 Min köcheln.",
      "Nudeln direkt in die Brühe geben und kochen, bis sie al dente sind und die Sauce andickt.",
      "Mit Parmesan bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Nudeln ↔ Vollkornnudeln",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Soy-Chicken Rice 豉油鸡饭 (Reiskocher)",
    desc: "Variation des Hainan Chicken: Hähnchenkeule mariniert in dunkler Sojasauce.",
    story: "Wir verpassen dem Hähnchen eine Glasur aus dunkler Sojasauce, bevor es im Reiskocher verschwindet. Das Ergebnis schmeckt wie aus einem Hongkonger BBQ-Restaurant.",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenkeule (o. Knochen) 250 g",
      "Sojasauce (dunkel & hell gemischt) 2 EL",
      "Ingwer 5 g",
      "Hühnerbrühe 240 ml",
      "Pak Choi 100 g"
    ],
    steps: [
      "Hähnchen kräftig in der Sojasauce wenden.",
      "Reis und Brühe in den Topf. Hähnchen mit der Sauce und Ingwer oben auflegen.",
      "Kochen. Pak Choi in den letzten 5 Minuten in den Dampf legen.",
      "Fleisch in Streifen schneiden und mit dem Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn durch) · Diabetes ✓",
    swaps: "Hähnchenkeule ↔ Schweinefilet",
    side: "Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Dunkle Sojasauce gibt eine tolle Farbe." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Kabeljau-Congee 鱼片粥",
    desc: "Ein extrem feiner, milder Reisbrei mit Weißfisch. Perfekt für den Magen.",
    story: "In Guangdong dämpft man feine Fischscheiben direkt in der Hitze des Reisbreis. Es ist leicht verdaulich und bringt pure Wohlfühl-Energie.",
    target: "≈70 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Kabeljau oder Seelachs 150 g",
      "Hühnerbrühe 800 ml",
      "Ingwer (feine Streifen) 10 g",
      "Frühlingszwiebel 10 g",
      "Weißer Pfeffer 1 Prise"
    ],
    steps: [
      "Reis in Brühe ca. 45 Min zu Congee einkochen.",
      "Fisch in dünne Scheiben schneiden. Ingwer in den Brei geben.",
      "Fischscheiben in den köchelnden Brei legen. Ca. 3-5 Min ziehen lassen, bis der Fisch komplett weiß und durchgegart ist.",
      "Mit Frühlingszwiebeln und Pfeffer servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Kabeljau ist quecksilberarm, muss komplett durchgegart sein!)",
    swaps: "Kabeljau ↔ Lachs",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Wok-Tofu in Tomatensauce 番茄豆腐",
    desc: "Eine vegetarische Variante der berühmten Tomaten-Ei-Pfanne.",
    story: "Wer Eier nicht mag (oder eine Pause braucht), nimmt Tofu! Die säuerlich-süße Tomatensauce zieht perfekt in die Poren des Tofus ein.",
    target: "≈80 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Fester Tofu (gewürfelt) 200 g",
      "Tomaten (groß, in Stücken) 2 Stück",
      "Ketchup 1 EL",
      "Sojasauce 1 EL",
      "Reis (gekocht) 150 g",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Tofu im Wok kurz anbraten, bis er leicht Farbe bekommt, herausnehmen.",
      "Tomaten im Wok braten, bis sie weich werden und Saft abgeben.",
      "Ketchup und Sojasauce einrühren, Tofu zurückgeben.",
      "Einköcheln lassen und über den Reis geben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓",
    swaps: "Tofu ↔ Hähnchenbrust",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Schweinebauch & Karotten Reis (Reiskocher)",
    desc: "Takikomi Gohan Style: Reis, gekocht mit Wurzelgemüse und zarten Schweinewürfeln.",
    story: "Ein japanischer Herbst-Klassiker. Die Karotten geben Süße ab, das Schwein sorgt für ein unglaubliches Mundgefühl.",
    target: "≈82 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Schweinebauch oder Schulter (fein gewürfelt) 150 g",
      "Karotte (in Stiften) 100 g",
      "Dashi oder Brühe 240 ml",
      "Sojasauce 2 EL",
      "Mirin 1 EL"
    ],
    steps: [
      "Reis und Brühe in den Topf.",
      "Schweinefleisch und Karottenstifte darauflegen.",
      "Sojasauce und Mirin dazugeben (nicht umrühren).",
      "Reiskocher starten. Wenn fertig, alles gut durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch wird durchgedämpft)",
    swaps: "Schweinebauch ↔ Hähnchen",
    side: "Miso-Suppe.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi (Standard)", notes: "Karotten nicht zu grob schneiden." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Airfryer Croque Monsieur (Käse-Schinken-Toast)",
    desc: "Die französische Bistro-Legende, rasant gemacht im Airfryer.",
    story: "Im Airfryer schmilzt der Käse perfekt, während das Brot von allen Seiten knusprig wird. Wir verzichten auf Béchamelsauce und machen es einfach und schnell.",
    target: "≈60 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Kochschinken 4 Scheiben",
      "Gouda oder Gruyère (pasteurisiert) 60 g",
      "Etwas Senf oder Mayo",
      "Cherrytomaten 100 g"
    ],
    steps: [
      "Brot mit etwas Senf bestreichen.",
      "Mit Schinken und Käse belegen, zuklappen. Etwas Käse auch oben auf das Brot streuen.",
      "Im Airfryer bei 180°C ca. 6-8 Min backen, bis der Käse goldbraun blubbert.",
      "Dazu Tomaten naschen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert, Schinken wird hoch erhitzt)",
    swaps: "Schinken ↔ Putenbrust",
    side: "Tomaten.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Airfryer Tonkatsu 豚カツ (Schweineschnitzel)",
    desc: "Knuspriges japanisches Schnitzel, fettsparend im Airfryer gebacken.",
    story: "Mit Panko-Paniermehl klappt Tonkatsu auch im Airfryer fantastisch. Ein kleiner Sprüher Öl reicht für eine gigantische Kruste.",
    target: "≈85 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Schweineschnitzel 2 Stück",
      "Panko (japanisches Paniermehl) 40 g",
      "Ei 1 Stück & etwas Mehl (Panierstraße)",
      "Kohl (sehr fein gehobelt) 150 g",
      "Reis (gekocht) 150 g",
      "Tonkatsu-Sauce"
    ],
    steps: [
      "Schweineschnitzel plattieren.",
      "In Mehl, Ei und Panko wenden. Mit wenig Öl besprühen.",
      "Im Airfryer bei 200°C ca. 15-18 Min backen (Fleisch komplett durchgaren!).",
      "In Streifen schneiden und auf gehobeltem Kohl mit Reis und Sauce servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schwein gut durch)",
    swaps: "Schwein ↔ Hähnchenbrust",
    side: "Viel frischer Kohl.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Garlic Butter Shrimp Rice (Reiskocher)",
    desc: "Garnelen, Knoblauch und Butter garen direkt über dem Reis.",
    story: "Hawaiianischer Garlic-Shrimp Vibe trifft auf den Asia-Reiskocher. Der Reis fängt das Knoblauch-Butter-Aroma der Garnelen ein.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (geschält) 200 g",
      "Knoblauch 2 Zehen (fein gehackt)",
      "Butter 15 g",
      "Sojasauce 1 EL",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis und Brühe in den Topf.",
      "Garnelen, Knoblauch und Butter oben drauflegen.",
      "Kochen. Am Ende Sojasauce darüberträufeln und gut durchrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen werden durch den Dampf >80°C sicher erhitzt)",
    swaps: "Garnelen ↔ Jakobsmuscheln",
    side: "Ein Stück Zitrone zum Drüberträufeln.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Butter erst kurz vor Schluss zugeben für noch mehr Aroma, oder von Anfang an." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Hongkong Red Bean Congee (Süß) 红豆粥",
    desc: "Süßer Frühstücksbrei mit roten Adzukibohnen und Datteln.",
    story: "Rote Bohnen werden in Asien oft süß gegessen. Dieser Brei ist extrem wärmend und die Bohnen liefern tolles pflanzliches Protein zum Start in den Tag.",
    target: "≈70 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Reis (roh) 60 g",
      "Adzukibohnen (Dose/vorgekocht) 100 g",
      "Wasser 800 ml",
      "Rote Datteln (Jujube, entkernt) 4 Stück",
      "Agavendicksaft oder Honig 1 EL"
    ],
    steps: [
      "Reis, vorgekochte Bohnen und Datteln mit Wasser aufsetzen.",
      "Ca. 45 Min köcheln lassen (oder Reiskocher Porridge-Modus), bis alles zerfällt.",
      "Mit wenig Honig süßen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓ (Bohnen drosseln den Blutzucker)",
    swaps: "Rote Datteln ↔ Normale Datteln",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Dekonstruierte Gimbap Bowl 김밥 볼",
    desc: "Alle Zutaten einer koreanischen Sushi-Rolle, nur als schnelle Bowl serviert.",
    story: "Gimbap zu rollen dauert ewig. Die Bowl-Version hat exakt den gleichen Geschmack, ist aber in 10 Minuten in der Schüssel.",
    target: "≈85 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (gekocht) 200 g",
      "Rinderhack 100 g",
      "Eier 2 Stück",
      "Spinat (blanchiert) 50 g",
      "Karotte (in feinen Streifen, gebraten) 50 g",
      "Nori (zerbröselt) 1 Blatt",
      "Sesamöl & Sojasauce"
    ],
    steps: [
      "Rinderhack mit Soja und Sesamöl braten (gut durch!).",
      "Eier zu einem flachen Omelett braten, in Streifen schneiden.",
      "Reis in Schüsseln anrichten. Fleisch, Eier, Karotte, Spinat kranzförmig darauflegen.",
      "Mit Nori-Bröseln und Sesamöl toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch/Ei durch. Nori in Maßen OK) · Diabetes ✓",
    swaps: "Rinderhack ↔ Thunfisch (Dose)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Sausage & Pea Rice (Reiskocher)",
    desc: "Würstchen und Erbsen dämpfen zusammen mit dem Reis. Ein One-Pot-Wunder.",
    story: "In Taiwan gibt es das mit süßen Lap-Cheong-Würsten. Da die oft schwer zu kriegen sind, nutzen wir herzhafte Würstchen. Ihr Saft aromatisiert das ganze Gericht.",
    target: "≈84 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Würstchen (z.B. Cabanossi oder Geflügelwiener) 150 g",
      "Erbsen (TK) 80 g",
      "Hühnerbrühe 240 ml",
      "Sojasauce 1 EL",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Würstchen in Scheiben schneiden.",
      "Reis, Brühe und Sojasauce in den Topf.",
      "Würstchen und Erbsen darauf verteilen. Kochen.",
      "Nach dem Öffnen mit Frühlingszwiebeln durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Würstchen werden im Topf hoch erhitzt)",
    swaps: "Würstchen ↔ Tofu-Würstchen",
    side: "Gurkensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Erbsen bleiben relativ grün, wenn man sie nicht rührt." },
  },
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweinegulasch": { group: "Protein/Fisch/Tofu", label: "Schweinegulasch (Würfel)", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau/Seelachs", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Würstchen": { group: "Protein/Fisch/Tofu", label: "Würstchen/Cabanossi", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Cheddar": { group: "Protein/Fisch/Tofu", label: "Cheddar/Gouda (pasteurisiert)", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Ricotta": { group: "Protein/Fisch/Tofu", label: "Ricotta", unitDefault: "g" },
  "Frischkäse": { group: "Protein/Fisch/Tofu", label: "Frischkäse", unitDefault: "EL" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark/Joghurt", unitDefault: "g" },

  // Gemüse
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl/Chinakohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Sojasprossen": { group: "Gemüse/Pilze", label: "Sojasprossen", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Enoki": { group: "Gemüse/Pilze", label: "Enoki-Pilze", unitDefault: "g" },
  "Mu-Err": { group: "Gemüse/Pilze", label: "Mu-Err Pilze (getrocknet)", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Tomaten passiert": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "ml" },
  "Tomatenmark": { group: "Gemüse/Pilze", label: "Tomatenmark", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel", unitDefault: "g" },
  "Taro": { group: "Gemüse/Pilze", label: "Taro (Wasserbrotwurzel)", unitDefault: "g" },
  "Ananas": { group: "Gemüse/Pilze", label: "Ananas (Dose)", unitDefault: "g" },
  "Mango": { group: "Gemüse/Pilze", label: "Mango", unitDefault: "Stück" },
  "Pomelo": { group: "Gemüse/Pilze", label: "Pomelo/Grapefruit", unitDefault: "Stück" },
  "Rote Datteln": { group: "Gemüse/Pilze", label: "Rote Datteln (Jujube)", unitDefault: "Stück" },
  "Adzukibohnen": { group: "Gemüse/Pilze", label: "Adzukibohnen (vorgekocht)", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Spaghetti": { group: "Reis/Nudeln/Sättigung", label: "Spaghetti", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Makkaroni": { group: "Reis/Nudeln/Sättigung", label: "Makkaroni (kurz)", unitDefault: "g" },
  "Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Süßkartoffel-Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Dangmyeon (Glasnudeln)", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot / Vollkorn", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko/Paniermehl", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Sojamilch": { group: "Algen/Brühen/Würze", label: "Sojamilch", unitDefault: "ml" },
  "Kokosmilch": { group: "Algen/Brühen/Würze", label: "Kokosmilch", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Schwarze Sesampaste": { group: "Algen/Brühen/Würze", label: "Schwarze Sesampaste", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Agave", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Stück" },
  "Sesam": { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "TL" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Backpulver": { group: "Algen/Brühen/Würze", label: "Backpulver", unitDefault: "TL" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Zehe|Prise|Stangen|Scheiben|TL|EL|Stk|Blatt)?/i);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.toLowerCase().includes(k.toLowerCase()));
      if (!key) {
        if (name.includes("Reis (roh)") || name.includes("Reis (gekocht)")) key = "Reis";
        else if (name.includes("Nudeln")) key = "Weizennudeln";
      }
      
      if (!key) continue;
      
      const c = canon[key];
      const id = `${key}`;
      
      if (!totals[id]) totals[id] = { key, label: c.label, unit: c.unitDefault, qty: 0, group: c.group };
      totals[id].qty += qty; 
    }
  }
  const groups = { "Protein/Fisch/Tofu": [], "Gemüse/Pilze": [], "Reis/Nudeln/Sättigung": [], "Algen/Brühen/Würze": [] };
  Object.values(totals).forEach((t) => {
    if(groups[t.group]) groups[t.group].push(t);
  });
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => a.label.localeCompare(b.label)));
  return groups;
}

// -----------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------

function animePlaceholder(title) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#FCE7F3'/><stop offset='100%' stop-color='#DCFCE7'/>
    </linearGradient></defs>
    <rect width='1200' height='675' fill='url(#g)'/>
    <g font-family='sans-serif'>
      <text x='40' y='120' font-size='44' fill='#1F2937'>🍱 ${esc(title)}</text>
      <text x='40' y='180' font-size='20' fill='#374151'>Moving Kitchen Tales</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw9" }) {
  const [src, setSrc] = useState("");
  
  useEffect(() => {
    const preferred = `/plan-art/${year}/${weekFolder}/${meal.id}.jpg`;
    const fallback = animePlaceholder(meal.title);
    setSrc(fallback);

    const img = new Image();
    img.onload = () => setSrc(preferred);
    img.onerror = () => setSrc(fallback);
    img.src = preferred;
  }, [meal, year, weekFolder]);

  return (
    <div className="mkt-art" style={{ position: "relative", borderRadius: 14, overflow: "hidden", marginBottom: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
      <img src={src} alt={meal.title} style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9", objectFit: "cover" }} loading="lazy" />
    </div>
  );
}

function MealCard({ meal }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(meta.id, meal.id);
  return (
    <div className="meal-card" style={cardPanelStyle} id={`meal-${meal.id}`}>
      <ImageBanner meal={meal} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><button onClick={() => toggleBookmark({ planSlug: meta.id, recipeId: meal.id, recipeTitle: meal.title, planTitle: meta.title })} style={{ background: bookmarked ? "var(--accent, #e07a9a)" : "transparent", border: "1px solid var(--border, rgba(0,0,0,.1))", borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", color: bookmarked ? "#fff" : "var(--text, #111827)" }} title={bookmarked ? "Bookmark entfernen" : "Bookmark setzen"}>{bookmarked ? "★" : "☆"}</button><h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3></div>
        <div>
          {tagChip(meal.target)}
          {meal.riceCooker?.enabled ? tagChip("🍚 Reiskocher") : null}
          {meal.remind ? tagChip("💊 Metformin") : null}
        </div>
      </div>
      {meal.desc ? <p style={{ marginTop: 8, color: "var(--muted)", fontStyle: "italic" }}>{meal.desc}</p> : null}
      {meal.story ? <p style={{ marginTop: 4, color: "var(--text)", fontSize: "0.9em" }}>{meal.story}</p> : null}
      
      <h4>Zutaten (2 Personen)</h4>
      <ul>{meal.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      
      <h4>Zubereitung</h4>
      <ol>{meal.steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>
      
      <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--chip-bg)", borderRadius: 12 }}>
        <p style={{margin:"0 0 4px"}}><strong>Hinweise:</strong> {meal.checks}</p>
        <p style={{margin:"0 0 4px"}}><strong>Austausche:</strong> {meal.swaps}</p>
        <p style={{margin:0}}><strong>Beilage:</strong> {meal.side}</p>
      </div>

      {meal.riceCooker?.enabled ? (
        <div style={{ marginTop: 12 }}>
          <details>
            <summary style={{cursor:"pointer", fontWeight:600}}>Reiskocher-Details</summary>
            <ul style={{marginTop:8}}>
              <li><strong>Programm:</strong> {meal.riceCooker.program}</li>
              <li><strong>Wasser:</strong> {meal.riceCooker.water}</li>
              {meal.riceCooker.notes ? <li><strong>Info:</strong> {meal.riceCooker.notes}</li> : null}
            </ul>
          </details>
        </div>
      ) : null}
    </div>
  );
}

function DaySection({ dayKey, meals, dayName }) {
  return (
    <section className="day-section" style={{ marginBottom: 40 }} id={`day-${dayKey}`}>
      <h2 style={{ marginBottom: 16, borderBottom:"2px solid var(--border)", paddingBottom:8 }}>
        {dayName.replace(/\s*\(.+\)$/, "")} <span className="mkt-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {meals.map((m) => <MealCard key={m.id} meal={m} />)}
      </div>
    </section>
  );
}

function WeekOverview({ data, DAY_NAME_DE, meta }) {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of data) map[r.id.split("-")[0]].push(r);
    return map;
  }, [data]);

  const pill = (key, text, targetId, rice) => (
    <a
      key={key}
      href={`#${targetId}`}
      onClick={scrollToId(targetId)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--panel)", textDecoration: "none", color: "var(--text)", boxShadow: "var(--shadow)", fontSize: 13, cursor: "pointer" }}
    >
      {rice ? "🍚" : "🍽️"} <span>{text}</span>
    </a>
  );

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ ...cardPanelStyle, background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="mkt-hero-inner" style={{ padding: 18, borderRadius: 12, marginBottom: 16, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            Woche 9 – Übersicht <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Airfryer Hacks · Reiskocher-Liebe · Balanced · Schwangerschaftssicher</p>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {DAYS_ORDER.map((d) => (
            <div key={d} style={{ padding: 12, borderRadius: 12, border: "1px solid var(--border)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <strong>{DAY_NAME_DE[d]}</strong>
                <a 
                  href={`#day-${d}`} 
                  onClick={scrollToId(`day-${d}`)}
                  style={{ fontSize: 12, color: "var(--text)", textDecoration: "none", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: 8, background: "var(--chip-bg)", cursor: "pointer" }}
                >
                  zum Tag ▿
                </a>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {byDay[d].map((m) => pill(m.id, m.title.replace(/ – .*$/, ""), `meal-${m.id}`, !!m.riceCooker?.enabled))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- RiceCooker Section ----
function RiceCookerSection({ data }) {
  const perDay = useMemo(() => {
    const map = { mo: null, di: null, mi: null, do: null, fr: null, sa: null, so: null };
    if (!data) return map; 
    for (const r of data) {
      const day = r.id.split("-")[0];
      if (r.riceCooker?.enabled && !map[day]) map[day] = r;
    }
    return map;
  }, [data]);

  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ borderBottom: "2px solid var(--border)", paddingBottom: 10, marginBottom: 20 }}>🍚 Reiskocher-Gerichte (Übersicht)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {DAYS_ORDER.map((d) => {
          const r = perDay[d];
          return (
            <div key={d} style={{ ...cardPanelStyle }}>
              <h3 style={{ marginTop: 0, fontSize: 16 }}>
                {DAY_NAME_DE[d].split(" ")[0]} – {r ? r.title : "Kein Reiskocher-Gericht"}
              </h3>
              {r ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li><strong>Programm:</strong> {r.riceCooker.program}</li>
                  <li><strong>Wasser:</strong> {r.riceCooker.water}</li>
                  {r.riceCooker.notes ? <li><strong>Notiz:</strong> {r.riceCooker.notes}</li> : null}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Highlights: Taro & Pork Rice, Reiskocher Mac & Cheese, Schweinebauch & Karotten Reis.</p>
    </section>
  );
}

// PDF Export (nur noch Drucken Funktion, keine Buttons mehr in der UI)
const doPrint = () => window.print();

// Theme Switch Component
function ThemeSwitch({ mode, setMode, effectiveDark }) {
  return (
    <div className="mkt-theme-switch" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: 6, border: "1px solid var(--btn-border)", borderRadius: 999, background: "var(--panel)" }}>
      <button type="button" className="mkt-tab" aria-pressed={mode === "auto"} onClick={() => setMode(mode === "auto" ? (effectiveDark ? "dark" : "light") : "auto")} style={{ padding: "6px 10px" }}>Auto</button>
      <label className="mkt-switch" title={effectiveDark ? "Dunkel" : "Hell"}>
        <input type="checkbox" checked={effectiveDark} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} disabled={mode === "auto"} />
        <span className="mkt-slider" />
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------
// MAIN EXPORT
// -----------------------------------------------------------------------
export default function Woche9DE() {
  const langFromUrl = useLangHint();
  const hiddenByLang = langFromUrl && langFromUrl !== meta.lang;
  if (hiddenByLang) return null;

  const systemDark = useSystemPrefersDark();
  const [mode, setMode] = useState("auto");
  const effectiveDark = mode === "auto" ? systemDark : mode === "dark";
  const vars = themeVars(effectiveDark ? "dark" : "light");

  const [tab, setTab] = useState("kochbuch");
  const listGroups = useMemo(() => aggregateList(DATA, CANON), []);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k));
  }, [vars]);

  const Styles = () => (
    <style>{`
      .meal-card p { line-height: 1.75; margin-bottom: 1rem; }
      .meal-card li { line-height: 1.7; margin-bottom: 0.5rem; }
      .meal-card h4 { margin-top: 1.5rem; margin-bottom: 0.75rem; color: var(--accent-2); font-weight: 700; }
      
      .mkt-tab { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 16px; border-radius: 12px; border: 1px solid var(--btn-border); background: var(--panel); color: var(--text); cursor: pointer; font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: all 0.2s ease; }
      .mkt-tab:hover { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-color: var(--accent-2); }
      .mkt-switch{ --w:48px; --h:28px; --k:22px; position:relative; display:inline-block; width:var(--w); height:var(--h); }
      .mkt-switch input{ opacity:0; width:0; height:0; position:absolute; }
      .mkt-switch .mkt-slider{ position:absolute; inset:0; border-radius:var(--h); background:var(--btn-border); border:1px solid var(--btn-border); transition:0.2s; }
      .mkt-switch .mkt-slider::before{ content:""; position:absolute; height:var(--k); width:var(--k); left:3px; top:50%; transform:translateY(-50%); border-radius:999px; background:var(--panel); box-shadow:var(--shadow); transition:transform .2s; }
      .mkt-switch input:checked + .mkt-slider{ background:var(--accent-2); border-color:var(--accent-2); }
      .mkt-switch input:checked + .mkt-slider::before{ transform:translateY(-50%) translateX(calc(var(--w) - var(--k) - 6px)); }

      .mkt-segment{ display:inline-flex; gap:4px; border:1px solid var(--btn-border); border-radius:999px; padding:4px; background:var(--panel); }
      .mkt-segment label{ position:relative; display:inline-flex; align-items:center; border-radius:999px; overflow:hidden; cursor:pointer; }
      .mkt-segment input[type="radio"]{ position:absolute; inset:0; opacity:0; cursor:pointer; }
      .mkt-segment span{ display:inline-block; padding:8px 14px; border-radius:999px; border:1px solid transparent; }
      .mkt-segment input[type="radio"]:checked + span{ background:var(--btn-on-bg); outline:2px solid var(--accent-2); outline-offset:1px; }

      #mkt-content{ display:block !important; }
      #mkt-content > [hidden]{ display:none !important; }

      .mkt-exporting{ width:794px !important; max-width:794px !important; margin:0 auto !important; background:#fff !important; box-sizing:border-box !important; font-size:12pt !important; line-height:1.45 !important; --bg:#FFFFFF; --text:#111827; --panel:#FFFFFF; --border:rgba(0,0,0,.12); --muted:#374151; --chip-bg:#F3F4F6; --btn-border:rgba(0,0,0,.15); --btn-on-bg:#F3F4F6; }
      .mkt-exporting *{ box-shadow:none !important; }
      .mkt-exporting .mkt-art, .mkt-exporting img{ display:none !important; visibility:hidden !important; }
      .mkt-exporting .mkt-chip, .mkt-exporting .mkt-date-paren{ display:none !important; }

      @media print { .mkt-art, .mkt-date-paren{ display:none !important; visibility:hidden !important; } html, body, #root { background:#fff !important; } aside, nav, header, footer, .mkt-no-print { display:none !important; } #kochbuch-root { width: calc(210mm - 24mm); margin:0 auto !important; background:#fff !important; border:none !important; box-shadow:none !important; } .mkt-hero, .mkt-hero-inner { background:#fff !important; box-shadow:none !important; } .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; } h2, h3 { break-after:avoid; page-break-after:avoid; } #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } a[href]:after { content:""; } }
    `}</style>
  );

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      <Styles />

      <div className="mkt-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div className="mkt-hero-inner" style={{ background: "var(--grad-hero)", borderRadius: 12, padding: 14, marginBottom: 12, display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`Start: ${meta.startDate}`)}
            {tagChip("Woche 9")}
            {tagChip("Airfryer & Reiskocher Liebe")}
            {tagChip("Täglich 1× 🍚 Reiskocher")}
          </div>
        </div>

        <div className="mkt-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <fieldset className="mkt-segment" role="radiogroup" aria-label="Ansicht wählen">
            <label>
              <input type="radio" name="mkt-view" value="kochbuch" checked={tab === "kochbuch"} onChange={() => setTab("kochbuch")} />
              <span>{UI_TITLES.main}</span>
            </label>
            <label>
              <input type="radio" name="mkt-view" value="liste" checked={tab === "liste"} onChange={() => setTab("liste")} />
              <span>{UI_TITLES.list}</span>
            </label>
          </fieldset>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginLeft: "auto" }}>
            <button type="button" onClick={doPrint} className="mkt-tab"><span className="icon">🖨️</span> Drucken</button>
            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={DATA} DAY_NAME_DE={DAY_NAME_DE} meta={meta} />
        <div id="mkt-content" data-view={tab}>
          <section id="mkt-pane-kochbuch" aria-hidden={tab !== "kochbuch"} hidden={tab !== "kochbuch"}>
            {DAYS_ORDER.map((d) => (
              <DaySection key={d} dayKey={d} meals={DATA.filter(r => r.id.startsWith(d))} dayName={DAY_NAME_DE[d]} />
            ))}
            <RiceCookerSection data={DATA} />
          </section>
          <section id="mkt-pane-liste" aria-hidden={tab !== "liste"} hidden={tab !== "liste"}>
            {Object.entries(listGroups).map(([group, items]) => (
              <div key={group} style={{ marginBottom: 20 }}>
                <h3>{group}</h3>
                <ul>{items.map((it, idx) => <li key={idx}>{`${it.label} – ${Math.round(it.qty * 10) / 10} ${it.unit}`}</li>)}</ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}