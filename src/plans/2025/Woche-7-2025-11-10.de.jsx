import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

/* ---------- Meta ---------- */
export const meta = {
  title: "Woche 7",
  startDate: "2025-11-10",
  id: "woche-7-2025-11-10-de",
  lang: "de",
  sidebar: "[DE] Woche 7 (2025-11-10)",
};
const FILE_BASE = "Woche 7 2025-11-10";

/* ---------- UI ----------- */
const UI_TITLES = {
  main: "GhibliKitchen – Woche 7",
  list: "GhibliKitchen – Einkaufsliste – Woche 7",
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

/* ---------- DATA (21 neue Rezepte – Woche 7) ---------- */
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Gedämpftes Eierauflauf (계란찜) mit kleinem Reis",
    desc: "Koreanisches Gyeran-jjim – vollständig gestockt, mild; mit kleinem Reisschälchen.",
    story: "계란찜 ist ein fluffiger, gedämpfter Eierauflauf aus Korea. Wir garen ihn vollständig – ideal für sanfte Morgen und Schwangerschaft.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈23 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 3 Stück",
      "Hühnerbrühe mild 250 ml",
      "Frühlingszwiebel 15 g",
      "Sesamöl 5 ml",
      "Sojasauce natriumarm 5 ml",
    ],
    steps: [
      "Reis garen.",
      "Eier mit Brühe verrühren, in feuerfeste Schale geben und 12–14 Min. dämpfen, bis komplett gestockt.",
      "Mit Sojasauce/Frühlingszwiebel mild abschmecken, Sesamöl tröpfeln.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Hühnerbrühe ↔ Gemüsebrühe; Reis ↔ Vollkornreis.",
    side: "Beilage: milde Gurken-Pickles · Getränk: warmes Wasser · Tee: Gerstentee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean steamed egg custard in ramekin, fully set, small bowl of rice, scallions on top"),
  },
  {
    id: "mo-m",
    title: "Yakitori-Reisschale (焼き鳥丼) – mild",
    desc: "Japanische Hähnchen-Reisbowl mit leichter Sauce, ohne Schärfe.",
    story: "Yakitori ist in Japan beliebt – als Bowl alltagstauglich und schnell. Wir reduzieren Salz und Süße für eine diabetesfreundliche Version.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Hähnchenbrust 240 g",
      "Zwiebel 80 g",
      "Frühlingszwiebel 15 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 50 ml",
      "Honig 4 g",
    ],
    steps: [
      "Reis garen; Hähnchenstücke in wenig Öl durchgaren.",
      "Zwiebel anschwitzen, Sojasauce/Wasser/Honig zugeben, kurz einköcheln.",
      "Alles über Reis geben, mit Lauchgrün servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH (Süße gering) · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Beilage: blanchierter Spinat · Getränk: Wasser · Tee: Grüntee mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken yakitori rice bowl, glossy light sauce, scallions, no chili"),
  },
  {
    id: "mo-a",
    title: "Rotgeschmortes Tofu (红烧豆腐) mit Pak Choi",
    desc: "Chinesisch geschmort – mild und würzig ohne Schärfe.",
    story: "红烧豆腐 ist ein Hausgericht aus China: Tofu in leichter, glänzender Sauce – ideal nach einem Arbeitstag.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Tofu fest 400 g",
      "Pak Choi 250 g",
      "Shiitake 120 g",
      "Sojasauce natriumarm 20 ml",
      "Ingwer 10 g",
      "Knoblauch 1 Zehe",
      "Maisstärke 8 g",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen; Tofu in Würfeln anbraten (wenig Öl).",
      "Shiitake/Pak Choi zufügen, Sojasauce + etwas Wasser zugeben, 3–4 Min. schmoren.",
      "Mit Stärke leicht binden und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Pak Choi ↔ Brokkoli; Reis ↔ Vollkornreis.",
    side: "Beilage: gedämpfte Karotten · Getränk: Wasser · Tee: Jasmintee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised tofu with bok choy and mushrooms, glossy light-brown sauce over rice"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Gedämpfte Mantou & warme Sojamilch (馒头·豆浆)",
    desc: "Chinesisches Frühstück: kleine Mantou mit ungesüßter, erhitzter Sojamilch.",
    story: "Klassisches Nordchina-Frühstück – hier in leichter, ausgewogener Portion für stabile KH.",
    target: "≈68 g KH gesamt (2 P.)",
    ingredients: [
      "Mantou (klein) 120 g",
      "Sojamilch ungesüßt 400 ml",
      "Gurke 100 g",
      "Sesam (optional) 6 g",
      "Sojasauce natriumarm 5 ml",
    ],
    steps: [
      "Mantou dämpfen (8–10 Min.).",
      "Sojamilch erhitzen (nicht kochen).",
      "Mit Gurkenscheiben servieren; Sojasauce nur sparsam.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Sojamilch erhitzt",
    swaps: "Mantou ↔ Vollkorntoast; Sojamilch ↔ Kuhmilch (pasteurisiert).",
    side: "Beilage: milde Pickles · Getränk: Sojamilch · Tee: Oolong mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Small steamed mantou buns with warm unsweetened soy milk, cucumber slices"),
  },
  {
    id: "di-m",
    title: "Japchae (잡채) – Glasnudelpfanne, mild",
    desc: "Koreanische Süßkartoffelglasnudeln mit Gemüse und Rind – wenig Öl, keine Schärfe.",
    story: "Japchae ist ein Fest- und Alltagsgericht in Korea. Unsere Version ist leichter, mit Fokus auf Gemüse.",
    target: "≈76 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Süßkartoffel-Glasnudeln (trocken) 80 g",
      "Rindfleisch mager 200 g",
      "Spinat 150 g",
      "Karotte 120 g",
      "Zwiebel 80 g",
      "Shiitake 100 g",
      "Sojasauce natriumarm 20 ml",
      "Sesamöl 8 ml",
    ],
    steps: [
      "Nudeln kochen/abspülen.",
      "Rind in wenig Öl durchbraten, Gemüse zugeben, kurz garen.",
      "Mit Sojasauce/Sesamöl mild abschmecken, Nudeln untermischen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈76 g KH · Schwangerschaft ✓ Fleisch durchgegart",
    swaps: "Rind ↔ Pute/Tofu; Glasnudeln ↔ Soba.",
    side: "Beilage: blanchierter Brokkoli · Getränk: Wasser · Tee: Gerstentee",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae glass noodles with beef and vegetables, glossy but light"),
  },
  {
    id: "di-a",
    title: "Huhn & Daikon als Nimono (鶏大根の煮物)",
    desc: "Japanischer Eintopf mit Hähnchen und Rettich – klar, mild, wärmend.",
    story: "Nimono steht in Japan für sanft geschmorte Gerichte – perfekt für ruhige Abende.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Hähnchenoberkeule ohne Haut 260 g",
      "Daikon (Rettich) 300 g",
      "Karotte 120 g",
      "Ingwer 10 g",
      "Sojasauce natriumarm 20 ml",
      "Gemüsebrühe 500 ml",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen; Rettich/Karotte in Brühe 10 Min. köcheln.",
      "Huhn zugeben und 10–12 Min. gar ziehen.",
      "Mit Sojasauce mild abschmecken.",
    ],
    checks: "Gastritis – köchelnd, mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Beilage: gedämpfter Pak Choi · Getränk: Wasser · Tee: Grüntee mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese chicken and daikon nimono in clear broth, side bowl of rice"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Tofu-Eierblütensuppe (蛋花汤) & kleiner Reis",
    desc: "Chinesische Eierblütensuppe mit Tofu – vollständig gegarte Eier, mild.",
    story: "蛋花汤 ist ein sanfter Start in den Tag – wärmend ohne Schärfe.",
    target: "≈66 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 2 Stück",
      "Tofu fest 150 g",
      "Hühner- oder Gemüsebrühe 900 ml",
      "Maisstärke 8 g",
      "Frühlingszwiebel 10 g",
    ],
    steps: [
      "Reis garen; Brühe erhitzen.",
      "Stärke einrühren, Eier dünn einlaufen lassen, 2–3 Min. sanft köcheln bis vollständig gegart.",
      "Tofu zugeben, mit Lauchgrün servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ Eier vollständig gegart",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Beilage: milde Rettich-Pickles · Getränk: Wasser · Tee: Jasmintee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese egg drop soup with tofu in a clear bowl, small bowl of rice"),
  },
  {
    id: "mi-m",
    title: "Kantonesisch: Gedämpftes Huhn mit Shiitake (冬菇蒸滑鸡)",
    desc: "Saftig gedämpft – zart, leicht und bekömmlich.",
    story: "Steamen ist in der kantonesischen Küche Schlüsseltechnik – ideal für milde, saftige Gerichte.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Hähnchenbrust 260 g",
      "Shiitake (getrocknet) 20 g",
      "Ingwer 8 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 5 ml",
      "Reis (roh) 90 g",
      "Frühlingszwiebel 10 g",
    ],
    steps: [
      "Shiitake einweichen; Reis garen.",
      "Hähnchen mit Sojasauce/Ingwer 10 Min. marinieren, mit Shiitake 12–14 Min. dämpfen.",
      "Öltröpfchen Sesamöl, Lauchgrün darüber.",
    ],
    checks: "Gastritis – gedämpft · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Pute/Tofu; Reis ↔ Vollkornreis.",
    side: "Beilage: gedämpfter Brokkoli · Getränk: Wasser · Tee: Oolong mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cantonese steamed chicken with shiitake in a plate, ginger scallion garnish, side rice"),
  },
  {
    id: "mi-a",
    title: "Dubu-Jorim (두부조림) – Sojageschmorter Tofu",
    desc: "Koreanisch geschmort mit Zwiebel/Zucchini – mild-würzig, ohne Chili.",
    story: "두부조림 ist ein beliebtes koreanisches Hausgericht – schmeckt am besten mit Reis.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Tofu fest 400 g",
      "Zwiebel 80 g",
      "Zucchini 200 g",
      "Sojasauce natriumarm 20 ml",
      "Gemüsebrühe 400 ml",
      "Sesamöl 6 ml",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen; Tofu in Scheiben leicht anbräunen.",
      "Zwiebel/Zucchini kurz dünsten, mit Brühe/Sojasauce 6–8 Min. schmoren.",
      "Mit Sesamöl abrunden und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Beilage: Sesam-Gurken · Getränk: Wasser · Tee: Gerstentee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean braised tofu (dubu jorim) with onions and zucchini, light soy glaze, bowl of rice"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Yachae-Dubu-Jeon (야채두부전) & kleiner Reis",
    desc: "Koreanische Gemüse-Tofu-Pfannkuchen – in wenig Öl, außen leicht knusprig.",
    story: "전 sind herzhafte Pfannkuchen aus Korea. Diese Variante setzt auf Tofu und viel Gemüse – mild und sättigend.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Tofu fest 250 g",
      "Ei 1 Stück",
      "Weizenmehl 40 g",
      "Karotte 100 g",
      "Zucchini 120 g",
      "Frühlingszwiebel 15 g",
      "Rapsöl 10 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Reis garen; Tofu zerdrücken, mit Ei/Mehl/Gemüse mischen.",
      "In wenig Öl kleine Fladen beidseitig goldbraun braten.",
      "Mit wenig Sojasauce servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ Ei vollständig gegart",
    swaps: "Weizenmehl ↔ Reismehl; Tofu ↔ Hähnchenwürfel (separat).",
    side: "Beilage: Gurken-Pickles · Getränk: Wasser · Tee: Gerstentee",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean tofu vegetable pancakes on a plate, small bowl of rice, light soy dip"),
  },
  {
    id: "do-m",
    title: "Huhn-Mais-Suppe (鸡蓉玉米羹) – mild",
    desc: "Chinesische, sämige Suppe ohne Schärfe – leicht und bekömmlich.",
    story: "Diese Kantinen- und Familienklassiker-Suppe ist wärmend und unkompliziert – perfekt für die Mittagspause.",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Hähnchenbrust 200 g",
      "Mais (Dose, abgetropft) 200 g",
      "Hühnerbrühe 900 ml",
      "Maisstärke 10 g",
      "Ei (optional) 1 Stück",
      "Frühlingszwiebel 10 g",
      "Sojasauce natriumarm 8 ml",
    ],
    steps: [
      "Reis garen; Brühe/ Mais erhitzen.",
      "Hähnchen fein würfeln, 6–8 Min. gar ziehen; mit Stärke leicht binden.",
      "Optional verquirltes Ei einlaufen lassen und komplett garen; mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Huhn/Ei vollständig gegart",
    swaps: "Mais ↔ Erbsen; Huhn ↔ Tofu.",
    side: "Beilage: gedämpfter Blattspinat · Getränk: Wasser · Tee: Grüntee mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese chicken and corn soup in a white bowl, small side of rice"),
  },
  {
    id: "do-a",
    title: "Kabeljau Miso-Ni (タラの味噌煮)",
    desc: "Japanisch geschmorter Kabeljau in heller Misosauce – sehr mild.",
    story: "Miso-ni ist eine beliebte, sanfte Schmortechnik in Japan – ideal am Abend.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈31 g p. P.",
    ingredients: [
      "Kabeljaufilet 320 g",
      "Miso hell 25 g",
      "Ingwer 10 g",
      "Gemüsebrühe 300 ml",
      "Mirin (optional) 5 ml",
      "Reis (roh) 90 g",
      "Spinat 200 g",
    ],
    steps: [
      "Reis garen; Spinat dämpfen.",
      "Brühe/Miso/Ingwer erhitzen, Fisch 8–10 Min. sanft schmoren bis gar.",
      "Mit Reis und Spinat servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.",
    side: "Beilage: Rettich-Pickles mild · Getränk: Wasser · Tee: Sencha",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese miso-braised cod in shallow bowl, spinach on the side, small bowl of rice"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Tofu-Scramble japanisch & kleiner Reis (豆腐スクランブル)",
    desc: "Rühr-Tofu mit Spinat und Pilzen – würzig-mild, ohne Ei.",
    story: "Ein japanisch inspiriertes, veganes Frühstück – proteinstark und leicht.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Tofu fest 250 g",
      "Spinat 150 g",
      "Shiitake 120 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 12 ml",
      "Sesam 6 g",
    ],
    steps: [
      "Reis garen.",
      "Tofu zerbröseln, mit Zwiebel/Pilzen/Spinat in wenig Öl garen.",
      "Mit Sojasauce/ Sesam mild abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ vollständig erhitzt",
    swaps: "Tofu ↔ Hähnchenwürfel; Reis ↔ Vollkornreis.",
    side: "Beilage: Mini-Tomaten (reif, mild) · Getränk: Wasser · Tee: Hōjicha",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese-style tofu scramble with spinach and mushrooms, small bowl of rice"),
  },
  {
    id: "fr-m",
    title: "Soba-Salat mit Hähnchen (そばサラダ)",
    desc: "Kaltes, mildes Soba-Gericht mit viel Gemüse und zarter Hühnerbrust.",
    story: "Soba-Salat ist ein leichter Lunch – perfekt, wenn es erfrischend und trotzdem sättigend sein soll.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Soba (trocken) 100 g",
      "Hähnchenbrust 220 g",
      "Gurke 150 g",
      "Karotte 120 g",
      "Frühlingszwiebel 15 g",
      "Sojasauce natriumarm 18 ml",
      "Reisessig (mild) 6 ml",
      "Sesamöl 6 ml",
    ],
    steps: [
      "Soba kochen/abspülen; Hähnchen in Wasser 8–10 Min. gar ziehen, abkühlen und zerpflücken.",
      "Gemüse fein schneiden, alles mischen.",
      "Mit leichter Sauce aus Sojasauce/Essig/Sesamöl vermengen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Soba ↔ Udon.",
    side: "Beilage: blanchierter Pak Choi · Getränk: Wasser · Tee: Grüntee mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cold soba salad with shredded chicken, cucumber and carrot, light dressing"),
  },
  {
    id: "fr-a",
    title: "Leichter Tontopf-Reis mit Huhn & Shiitake (砂锅鸡饭)",
    desc: "Claypot-inspirierter Reis aus dem Topf – fettarm, aromatisch, mild.",
    story: "煲仔饭 ist ein Südchina-Klassiker. Wir kochen eine leichtere, abendfreundliche Variante im Topf.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈31 g p. P.",
    ingredients: [
      "Vollkornreis (roh) 90 g",
      "Hähnchenbrust 260 g",
      "Shiitake 100 g",
      "Pak Choi 200 g",
      "Sojasauce natriumarm 20 ml",
      "Ingwer 8 g",
      "Sesamöl 5 ml",
    ],
    steps: [
      "Reis im Topf mit Wasser garen.",
      "Hähnchen/Shiitake in wenig Öl anbraten, mit Sojasauce/Ingwer kurz schmoren.",
      "Pak Choi zugeben, auf Reis geben und 3–4 Min. ziehen lassen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Vollkornreis ↔ Reis; Hähnchen ↔ Tofu.",
    side: "Beilage: milde Rettich-Pickles · Getränk: Wasser · Tee: Oolong mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light claypot-style chicken and mushroom rice in a pot, bok choy on top"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Omurice (オムライス) – Ei vollständig gegart",
    desc: "Japanisch-westliches Frühstück – dünnes Omelett komplett gestockt, Gemüse-Reis-Füllung.",
    story: "Omurice ist ein Yoshoku-Klassiker aus Japan. Wir garen das Ei komplett durch und reduzieren Ketchup.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 3 Stück",
      "Hähnchenbrust 120 g",
      "Erbsen (TK) 120 g",
      "Zwiebel 60 g",
      "Ketchup 10 g",
      "Rapsöl 8 ml",
    ],
    steps: [
      "Reis garen; Füllung aus Huhn/Erbsen/Zwiebel anrösten, mit wenig Ketchup würzen.",
      "Omelett braten und vollständig stocken lassen.",
      "Füllung einwickeln und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Ei/Huhn vollständig gegart",
    swaps: "Erbsen ↔ Mais; Hähnchen ↔ Tofu.",
    side: "Beilage: Tomatenscheiben (reif) · Getränk: Wasser · Tee: Hōjicha",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese omurice with fully cooked omelet, vegetable chicken rice filling, neat plating"),
  },
  {
    id: "sa-m",
    title: "Kongnamul-Bap (콩나물밥) mit Tofu – mild",
    desc: "Koreanischer Sojabohnensprossen-Reis mit Tofu – leicht und ballaststoffreich.",
    story: "Kongnamul-Bap ist ein einfaches, aromatisches Reisgericht. Die Sauce servieren wir salzarm und ohne Schärfe.",
    target: "≈74 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Sojabohnensprossen 300 g",
      "Tofu fest 200 g",
      "Frühlingszwiebel 15 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
    ],
    steps: [
      "Reis garen; Sprossen 2–3 Min. blanchieren.",
      "Tofu in Würfeln kurz anbraten.",
      "Alles mischen, mit milder Sauce (Sojasauce/Sesamöl) servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ vollständig erhitzt",
    swaps: "Tofu ↔ Hähnchen; Sprossen ↔ Spinat.",
    side: "Beilage: Gurken-Pickles · Getränk: Wasser · Tee: Gerstentee",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean kongnamul-bap rice bowl with tofu and bean sprouts, light dressing"),
  },
  {
    id: "sa-a",
    title: "Pollack-Jorim (명태조림) – mild geschmort",
    desc: "Koreanisch geschmorter Seelachs (Pollack) mit Rettich – ohne Schärfe.",
    story: "Fisch-Schmorgerichte sind in Korea beliebt – diese Version ist familienfreundlich mild.",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Seelachsfilet 320 g",
      "Daikon 250 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 18 ml",
      "Gemüsebrühe 350 ml",
      "Ingwer 8 g",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen.",
      "Rettich/Zwiebel in Brühe 8 Min. köcheln.",
      "Fisch zugeben, 8–10 Min. sanft schmoren bis gar.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm",
    swaps: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Beilage: Rettich-Pickles · Getränk: Wasser · Tee: Grüntee mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean pollock braise with radish in a shallow pot, bowl of rice"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Chazuke mit Lachsflocken (鮭茶漬け) – Frühstück",
    desc: "Japanischer Tee-auf-Reis mit gekochten Lachsflocken – sehr leicht.",
    story: "お茶漬け ist ein schnelles, wärmendes Frühstück. Wir verwenden entkoffeinierten Tee auf Wunsch.",
    target: "≈64 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Grüner Tee (heiß) 500 ml",
      "Gekochter Lachs, zerzupft 100 g",
      "Nori (sparsam) 0.5 g",
      "Sesam 6 g",
    ],
    steps: [
      "Reis garen.",
      "Lachs zerzupfen (gekocht).",
      "Heißem Tee über den Reis gießen, Lachs/Nori/Sesam darauf.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈64 g KH · Schwangerschaft ✓ Fisch durchgegart, Nori sparsam",
    swaps: "Lachs ↔ Seelachs; Tee ↔ Gerstentee.",
    side: "Beilage: Gurken-Pickles · Getränk: Tee · Tee: Sencha (koffeinarm möglich)",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ochazuke green tea poured over rice with cooked salmon flakes, minimal nori"),
  },
  {
    id: "so-m",
    title: "Spinat-Pilz-Pfanne (清炒菠菜香菇) & Reis",
    desc: "Chinesische Gemüsepfanne – saftig, ohne Schärfe.",
    story: "轻炒蔬菜 ist die schnelle Alltagsküche – aromatisch und leicht.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Spinat 300 g",
      "Shiitake 200 g",
      "Knoblauch 1 Zehe",
      "Sojasauce natriumarm 12 ml",
      "Tofu fest 150 g",
    ],
    steps: [
      "Reis garen.",
      "Pilze/Spinat kurz in wenig Öl garen, Knoblauch mitziehen lassen.",
      "Tofu zugeben, mild würzen und servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Beilage: Radieschen-Pickles mild · Getränk: Wasser · Tee: Oolong mild",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese spinach and shiitake stir-fry, light sauce, served with rice"),
  },
  {
    id: "so-a",
    title: "Oyakodon (親子丼) – vollständig gestockt",
    desc: "Japanische Huhn-Ei-Reisschale – Eier komplett gestockt für Schwangerschaft geeignet.",
    story: "Oyakodon ist Comfort-Food in Japan. Mit komplett gegartem Ei bleibt es sicher und dennoch saftig.",
    target: "≈78 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Reis (roh) 90 g",
      "Hähnchenbrust 240 g",
      "Zwiebel 100 g",
      "Eier 3 Stück",
      "Sojasauce natriumarm 20 ml",
      "Dashi/Gemüsebrühe 300 ml",
    ],
    steps: [
      "Reis garen; Zwiebel in Brühe weich dünsten.",
      "Huhn zugeben und gar ziehen.",
      "Eier einlaufen lassen und unter Deckel vollständig stocken lassen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Ei/Huhn vollständig gegart",
    swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Beilage: milde Gurken-Pickles · Getränk: Wasser · Tee: Grüntee mild",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese oyakodon rice bowl with fully cooked egg, onions and chicken, glossy sauce"),
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

/* ---------- Einkaufsliste (Gruppen wie Woche-4/5/6) ---------- */
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
  protein: ["hähn", "pute", "rind", "schwein", "forelle", "kabeljau", "seelachs", "lachs", "tofu", "eier", "garnelen", "mandu"],
  veg: ["karotte", "zucchini", "pak choi", "spinat", "shiitake", "enoki", "brokkoli", "chinakohl", "zwiebel", "paprika", "rettich", "frühlingszwiebel", "gurke", "tomaten", "kartoffeln", "daikon", "radieschen"],
  staple: ["reis", "klebreis", "mehrkorn", "udon", "soba", "somen", "weizennudeln", "reisnudeln", "vollkorn", "risotto", "gerste", "glasnudeln", "mantou"],
  season: ["kombu", "nori", "brühe", "gemüsebrühe", "sojasauce", "miso", "sesamöl", "olivenöl", "mirin", "honig", "salz", "sesam", "knoblauch", "ingwer", "wasser", "tee", "wakame", "reisessig", "stärke", "ketchup"],
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
      if (groupMap.protein.some((w) => nLower.includes(String(w)))) add("protein");
      else if (groupMap.staple.some((w) => nLower.includes(String(w)))) add("staple");
      else if (groupMap.veg.some((w) => nLower.includes(String(w)))) add("veg");
      else if (groupMap.season.some((w) => nLower.includes(String(w)))) add("season");
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
                          <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>
                            🌾 {target}
                            {m?.remind ? " · 💊" : ""}
                          </div>
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
export default function Woche7_2025_11_10_DE() {
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
    if (!/^Woche 7 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
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
    console.log("[GhibliKitchen] All tests passed (DE JSX, Woche 7).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}
