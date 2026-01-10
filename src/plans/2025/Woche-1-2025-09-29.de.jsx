/* eslint-disable no-console */
/**
 * Woche 1 (DE) – Plan im Stil von Woche 4 (Tabs, TopBar, Wochenübersicht, Rezeptseiten, Einkaufsliste)
 * - A4: Kochbuch quer, Einkaufsliste hoch
 * - Buttons: PDF erzeugen, HTML exportieren, Drucken
 * - Pro Rezept eine Seite; linkes Panel ≤1/3, rechtes Rezept ≥2/3
 * - DALL·E Prompts NICHT rendern (nur Stringfelder)
 * - Bilder-Uploads (Cover + je Rezept) via localStorage
 * - Frühstück/Abend MIT Metformin-Reminder, Mittag OHNE
 * - Zutaten/Schritte mit Guards, sodass .map NIE auf Nicht-Arrays läuft
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

// ---------- Meta ----------
export const meta = {
  title: "Woche 1",
  startDate: "2025-09-29",
  id: "woche-1-2025-09-29-de",
  lang: "de",
  sidebar: "Woche 1 (2025-09-29)",
};
const FILE_BASE = "Woche 1 2025-09-29";

// ---------- UI Titel/Farben ----------
const UI_TITLES = {
  main: "GhibliKitchen – Woche 1",
  list: "GhibliKitchen – Einkaufsliste – Woche 1",
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

// ---------- Prompt Header (nur im Code) ----------
const PROMPT_HEADER =
  "Use exactly two cats only: Fleur (small, playful, European Shorthair, grey-black tabby) and Finn (larger, reserved prankster, European Shorthair, grey-black tabby). No third cat, no extra animals. Chinese woman (traditional or sporty-modern; occasional Princess Mononoke aura). Western man with short fauxhawk. Studio Ghibli watercolor vibe, warm golden light, gentle magical steam/pot/vegetable spirits. Pregnancy-safe food only (no raw fish/eggs). A4 landscape page; manga/cartoon panel with generous margins; image intended to occupy ≤ one-third of the page width on the left.";

const buildPrompt = (a, b) => `${a}\n${b}`;

// ---------- Guards ----------
const asList = (v, lang = "de") => {
  try {
    const out = pickList(v, lang);
    return Array.isArray(out) ? out : [];
  } catch {
    return [];
  }
};
const safeArr = (v) => (Array.isArray(v) ? v : []);
const safeMap = (v, fn) => (Array.isArray(v) ? v : []).map(fn);

// ---------- DATA (21 Rezepte – aus deinem ursprünglichen Woche-1 Plan) ----------
/**
 * Id-Konvention: mo|di|mi|do|fr|sa|so - f|m|a
 * title/desc/story/target/checks/swaps/side sind DE-Strings
 * ingredients/steps sind Arrays aus Strings
 * prompt wird nicht gerendert (nur im Code)
 */
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Reisbrei mit Lachs & Spinat (お粥・鮭)",
    desc: "Sanfter japanischer Congee (Okayu) mit gegartem Lachs und Spinat; inspiriert von Just One Cookbook.",
    story:
      "Okayu ist in Japan ein klassisches Frühstück oder 'Wohlfühl'-Essen. Perfekt für kühle Morgen und einen leichten Start.",
    target: "≈70 g KH gesamt (≈35 g p. P.), Protein ≈20–25 g p. P.",
    ingredients: [
      "Reis 70 g",
      "Wasser 700 ml",
      "Lachs gegart, zerzupft 80 g",
      "Kürbis 200 g",
      "Spinat 100 g",
      "Ingwer 5 g",
      "Sojasauce natriumarm 1 TL",
    ],
    steps: [
      "Reis mit Wasser & Kürbis 30–35 Min. sanft köcheln.",
      "Spinat 1 Min. ziehen lassen.",
      "Lachs & Ingwer zugeben, 2–3 Min. erwärmen; mild abschmecken.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ – Lachs durchgegart",
    swaps: "Spinat ↔ Pak Choi; Lachs ↔ Kabeljau",
    side: "Warmes Wasser/Gerstentee",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Close-up of a cozy porcelain bowl of salmon–spinach congee on a bamboo tray; gentle steam-spirits forming 粥; Fleur pawing; Finn watching."
    ),
  },
  {
    id: "mo-m",
    title: "Sanft pochiertes Hähnchen mit Bok Choy (白切鶏·青江菜)",
    desc: "Sehr milde, knapp unter Siedepunkt gegarte Hähnchenbrust mit Bok Choy; inspiriert von Made With Lau.",
    story:
      "Pochiertes Hähnchen ist super verträglich und saftig. Ideal, wenn es mild sein soll – mit wenig Würze.",
    target: "≈80 g KH (Reis 100 g roh)",
    ingredients: [
      "Hähnchenbrust 300 g",
      "Wasser 1 L",
      "Ingwer 20 g",
      "Frühlingslauch 10 g",
      "Reis 100 g",
      "Bok Choy 300 g",
      "Sojasauce natriumarm 1 EL",
      "Sesamöl 1/2 TL",
    ],
    steps: [
      "Hähnchen 12–14 Min. knapp unter Siedepunkt garziehen; 5 Min. nachziehen lassen.",
      "Reis garen; Bok Choy 2–3 Min. dämpfen.",
      "Huhn aufschneiden, minimal würzen.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓",
    swaps: "Hähnchen ↔ Pute",
    side: "Gurkenscheiben",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Poached chicken with bok choy; steam spirits 白切鶏; warm light; Fleur sneaks; Finn noble."
    ),
  },
  {
    id: "mo-a",
    title: "Algensuppe mit Kabeljau + Reis (미역국)",
    desc: "Koreanische Miyeokguk mit Kabeljau, sehr mild; inspiriert von Maangchi.",
    story:
      "Miyeokguk (Wakame-Suppe) ist nährend und sehr bekömmlich – traditionell und alltagstauglich.",
    target: "≈65 g KH (Reis 80 g roh)",
    ingredients: [
      "Wakame 6 g",
      "Kabeljau 260 g",
      "ungesalzener Fond 800 ml",
      "Sesamöl 1/2 TL",
      "Sojasauce 1 TL",
      "Reis 80 g",
      "Ingwer 5 g",
    ],
    steps: [
      "Wakame einweichen.",
      "Kurz im Sesamöl schwenken, Fond zugeben.",
      "Kabeljau 5–6 Min. sieden; mild würzen.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈65 g KH · Schwangerschaft ✓ – Jod moderat",
    swaps: "Kabeljau ↔ Seelachs",
    side: "Brokkoli blanchiert",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Miyeok-guk steam draws 미역국; Fleur peeks; Finn’s tail like seaweed."
    ),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Kürbisreisbrei (호박죽)",
    desc: "Koreanischer, seidiger Kürbisbrei – mild und wärmend; inspiriert von Mom’s Korean Recipes.",
    story:
      "Herbstlich, weich und angenehm süßlich – ideal für sanfte, ausgeglichene Tage.",
    target: "≈74 g KH gesamt",
    ingredients: ["Kürbis 400 g", "Reis 60 g", "Wasser 800 ml", "Prise Salz"],
    steps: [
      "Kürbis weich kochen & pürieren.",
      "Reis 30 Min. mitköcheln; mild salzen.",
      "Konsistenz nach Wunsch mit Wasser anpassen.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓",
    swaps: "Reis ↔ Hirse",
    side: "1–2 EL Joghurt (pasteur.)",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Sunny pumpkin porridge; leaf spirit; Fleur plays; Finn lounges."
    ),
  },
  {
    id: "di-m",
    title: "Warme Soba mit Huhn & Spinat (温かいそば·鶏)",
    desc: "Japanische Soba in milder Brühe mit Huhn & Spinat; inspiriert von Just One Cookbook.",
    story:
      "Soba sind nussig und leicht. In klarer Brühe ergibt sich ein bekömmliches, warmes Mittagessen.",
    target: "≈72 g KH (Soba 120 g)",
    ingredients: [
      "Soba 120 g",
      "Hähnchen 200 g",
      "Spinat 150 g",
      "milde Kombu-Brühe 700 ml",
      "Sojasauce 1–2 TL",
    ],
    steps: [
      "Brühe 10 Min. simmern.",
      "Huhn 6–7 Min. garen.",
      "Soba kochen/spülen, Spinat kurz ziehen lassen; mild würzen.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓",
    swaps: "Soba ↔ Udon",
    side: "Rettich blanchiert",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rustic soba bowl with steam そば; Fleur bats noodle; Finn ignores."
    ),
  },
  {
    id: "di-a",
    title: "Gedämpfter Kabeljau mit Ingwer & Frühlingslauch (清蒸鳕鱼)",
    desc: "Chinesisch inspiriert, sehr zart & mild; inspiriert von Made With Lau.",
    story:
      "Das sanfte Dämpfen erhält Struktur und Saftigkeit – perfekt, wenn es leicht sein soll.",
    target: "≈69 g KH (Reis 90 g)",
    ingredients: [
      "Kabeljau 300 g",
      "Ingwer 10 g",
      "Frühlingslauch 15 g",
      "Sojasauce 1–2 TL",
      "Sesamöl 1/2 TL",
      "Reis 90 g",
      "Gai Lan/Brokkoli 300 g",
    ],
    steps: [
      "Fisch mit Ingwer/Lauch 8–10 Min. dämpfen.",
      "Mit Sojasauce/Sesamöl beträufeln; Reis & Gemüse dazu.",
      "Mild abschmecken.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓",
    swaps: "Kabeljau ↔ Seelachs",
    side: "Warmes Wasser",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Steamed cod; steam draws 鳕; Fleur reflection; Finn calm."
    ),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Kongee mit Shiitake & Seidentofu (粥·香菇豆腐)",
    desc: "Sehr milder Congee mit Pilzen & Seidentofu; inspiriert von The Woks of Life.",
    story:
      "Cremig-mild und gut verdaulich: perfekt für einen ruhigen Beginn des Tages.",
    target: "≈63 g KH",
    ingredients: [
      "Reis 70 g",
      "Wasser 800 ml",
      "Shiitake 60 g",
      "Seidentofu 150 g",
      "Karotte 100 g",
      "Sojasauce 1 TL",
    ],
    steps: [
      "30–35 Min. köcheln.",
      "Gemüse/Tofu 5 Min. mitziehen lassen.",
      "Mild würzen.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈63 g KH · Schwangerschaft ✓",
    swaps: "Reis ↔ Hirse",
    side: "Nori sparsam",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Creamy congee; steam 豆; Fleur behind bowl; Finn statue-like."
    ),
  },
  {
    id: "mi-m",
    title: "Milder Bibimbap ohne Chili (비빔밥·顺口)",
    desc: "Koreanische Reisschale mit gegartem Gemüse & Huhn – ohne Chili; inspiriert von My Korean Kitchen.",
    story:
      "Alle klassischen Komponenten, aber mild und gut verträglich – trotzdem aromatisch.",
    target: "≈69 g KH (Reis 90 g)",
    ingredients: [
      "Reis 90 g",
      "Hähnchen 200 g",
      "Spinat 100 g",
      "Zucchini 100 g",
      "Karotte 100 g",
      "Sprossen 100 g",
      "Eier 2 (Omelett, vollständig durchgegart)",
      "Sesamöl 1/2 TL",
      "Sojasauce 1–2 TL",
    ],
    steps: [
      "Gemüse kurz dünsten.",
      "Reis + Toppings arrangieren; sanft anmachen.",
      "Ei vollständig stocken lassen.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ – Ei durchgegart",
    swaps: "Huhn ↔ Tofu",
    side: "Gurkenscheiben",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Bibimbap, no chili; steam 비빔밥; Fleur guards carrot; Finn’s whiskers glow."
    ),
  },
  {
    id: "mi-a",
    title: "Nikujaga – Rind-Kartoffel (肉じゃが)",
    desc: "Japanischer Schmor-Klassiker, dezent gewürzt; inspiriert von Just One Cookbook.",
    story:
      "Warmes Wohlfühlessen – langsam geschmort, weich und mild. Perfekt für den Feierabend.",
    target: "≈75–80 g KH",
    ingredients: [
      "Rind mager 200 g",
      "Kartoffeln 400 g",
      "Karotte 150 g",
      "Zwiebel 60 g",
      "Kombu-Brühe 600 ml",
      "Sojasauce 1 EL",
      "Zucker 1/2 TL (optional)",
    ],
    steps: [
      "Alles 20–25 Min. sanft schmoren bis weich.",
      "Leicht einköcheln lassen.",
      "Vor dem Servieren mild abschmecken.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈75–80 g KH · Schwangerschaft ✓",
    swaps: "Rind ↔ Huhn/Tofu",
    side: "Salzarme Misosuppe klein",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Homey nikujaga; steam 肉; Fleur chases potato spirit; Finn supervises."
    ),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Misosuppe mit Tofu & milder Wakame + Reis (味噌汁)",
    desc: "Japanische Misosuppe mit wenig Wakame; sehr mild; inspiriert von Just One Cookbook.",
    story:
      "Leicht, klar und gut bekömmlich – in Japan oft ein Teil des Frühstücks.",
    target: "≈62 g KH (Reis 80 g)",
    ingredients: [
      "Reis 80 g",
      "Dashi/Wasser 500 ml",
      "Miso hell 20 g",
      "Tofu 150 g",
      "Wakame 3 g",
      "Frühlingslauch 10 g",
    ],
    steps: [
      "Suppe erhitzen, Tofu/Wakame ziehen lassen.",
      "Miso off-heat einrühren.",
      "Mit Reis servieren.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ – Jod moderat",
    swaps: "Reis ↔ Vollkornreis",
    side: "Gedämpfter Spinat",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Gentle miso soup; steam 味; Fleur reflection; Finn wave-tail."
    ),
  },
  {
    id: "do-m",
    title: "Buddha’s Delight – Gemüse-Tofu (罗汉斋)",
    desc: "Chinesisch inspiriertes, mild geschmortes Gemüse-Tofu; inspiriert von The Woks of Life.",
    story:
      "Viele Gemüse in milder Sauce – warm, sanft und sättigend, ohne Schärfe.",
    target: "≈62 g KH (Reis 80 g)",
    ingredients: [
      "Tofu 300 g",
      "Chinakohl 300 g",
      "Pilze 150 g",
      "Karotte 100 g",
      "Daikon 200 g",
      "Fond 500 ml",
      "Sojasauce 1–2 TL",
      "Stärke 1 TL",
      "Reis 80 g",
    ],
    steps: [
      "Gemüse & Tofu 10–12 Min. schmoren.",
      "Leicht binden.",
      "Mit Reis servieren.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓",
    swaps: "Tofu ↔ Hähnchenbrust",
    side: "Rettich blanchiert",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Tofu & vegetables; steam 斋; Fleur sniffs mushroom; Finn aloof."
    ),
  },
  {
    id: "do-a",
    title: "Janchi-Guksu – milde Festnudeln (잔치국수)",
    desc: "Koreanische Somen in klarer Brühe; Gemüse & Huhn, mild; inspiriert von Maangchi.",
    story:
      "Ein Festklassiker – bei uns schlicht und bekömmlich adaptiert.",
    target: "≈73–78 g KH",
    ingredients: [
      "Somen 100 g",
      "milde Brühe 700 ml",
      "Hähnchen 150 g",
      "Zucchini 150 g",
      "Karotte 100 g",
      "Pilze 80 g",
      "Frühlingslauch 20 g",
      "Sojasauce 1–2 TL",
    ],
    steps: [
      "Gemüse 3–4 Min. garen; Hähnchen 6–7 Min.",
      "Somen separat kochen, kurz ziehen lassen.",
      "Mild würzen und anrichten.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈73–78 g KH · Schwangerschaft ✓",
    swaps: "Somen ↔ Udon",
    side: "Blattgemüse blanchiert",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Festive noodle bowl; steam 잔치; Fleur plays with noodle; Finn watches."
    ),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Koreanischer Dampf-Eierstich + Reis (계란찜)",
    desc: "Sehr sanft und eiweißreich; Reis und Süßkartoffel geben Sättigung.",
    story:
      "Das gedämpfte Ei wird seidig, bleibt aber vollständig durchgegart – perfekt für empfindliche Tage.",
    target: "≈81 g KH",
    ingredients: [
      "Eier 4",
      "Wasser/Brühe 300 ml",
      "Reis 70 g",
      "Süßkartoffel 150 g",
      "Frühlingslauch 10 g",
    ],
    steps: [
      "Eier 12–15 Min. dämpfen bis fest.",
      "Reis & Süßkartoffel garen.",
      "Mit etwas Frühlingslauch servieren.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈81 g KH · Schwangerschaft ✓ – Ei durchgegart",
    swaps: "Süßkartoffel ↔ Kürbis",
    side: "Nori (Kim) zerkrümelt",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Silky steamed egg; steam 계; Fleur ears peek; Finn whiskers glow."
    ),
  },
  {
    id: "fr-m",
    title: "Hähnchen-Soboro-Don (鶏そぼろ丼)",
    desc: "Japanische Reisschale mit krümelig gegartem Hähnchen und Gemüse; mild.",
    story:
      "Bento-Klassiker für zuhause: farbig, aber dezent gewürzt und leicht süßlich.",
    target: "≈85 g KH",
    ingredients: [
      "Reis 90 g",
      "Hähnchenhack 250 g",
      "Erbsen 150 g",
      "Karotte 100 g",
      "Sojasauce 1–2 TL",
      "Zucker 1/2 TL (optional)",
      "Wasser 50 ml",
    ],
    steps: [
      "Hack mit Wasser krümelig garziehen, mild würzen.",
      "Gemüse mitgaren.",
      "Auf Reis anrichten.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈85 g KH · Schwangerschaft ✓",
    swaps: "Erbsen ↔ Edamame",
    side: "Gurkenscheiben",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Bento stripes soboro-don; steam 丼; Fleur eyes peas; Finn fake-sleeps."
    ),
  },
  {
    id: "fr-a",
    title: "Gedämpfte Garnelen mit Tofu & Pak Choi (清蒸虾豆腐)",
    desc: "Chinesisch inspiriert, sehr mild und saftig – mit Reis.",
    story:
      "Dämpfen ist schnell, sauber und bekömmlich. Ideal für einen entspannten Freitagabend.",
    target: "≈62–65 g KH",
    ingredients: [
      "Garnelen 300 g",
      "Tofu 300 g",
      "Pak Choi 300 g",
      "Ingwer 10 g",
      "Sojasauce 1 TL",
      "Reis 80 g",
    ],
    steps: [
      "Tofu + Garnelen 8–10 Min. dämpfen; Pak Choi 2–3 Min.",
      "Mild würzen; mit Reis servieren.",
      "Optional mit etwas Ingwer parfümieren.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈62–65 g KH · Schwangerschaft ✓",
    swaps: "Garnelen ↔ Kabeljau",
    side: "Klare Brühe",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Shrimp on tofu; steam 虾; Fleur gazes; Finn guards."
    ),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Hirse–Kürbis-Kongee (小米南瓜粥)",
    desc: "Hirse mit Kürbis – extra weich und mild.",
    story:
      "Sämig und warm – ein sanfter Start in den Wochenende-Vormittag.",
    target: "≈62 g KH",
    ingredients: ["Hirse 60 g", "Kürbis 300 g", "Wasser 900 ml", "Prise Salz"],
    steps: [
      "Hirse + Kürbis 35–40 Min. weich kochen.",
      "Mild salzen.",
      "Nach Wunsch verdünnen/andicken.",
    ],
    checks: "Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓",
    swaps: "Hirse ↔ Reis",
    side: "Blattspinat warm",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Golden millet–pumpkin congee; steam 粥; Fleur bats seed; Finn naps."
    ),
  },
  {
    id: "sa-m",
    title:
      "Soy-gedünstetes Huhn mit Kartoffeln & Karotten (닭찜·순한)",
    desc: "Koreanisch angehaucht, aber ohne Schärfe – sanft geschmort.",
    story:
      "Kartoffeln & Karotten sorgen für runde Süße; Sauce nur leicht gebunden.",
    target: "≈68–72 g KH",
    ingredients: [
      "Huhn 400 g",
      "Kartoffeln 300 g",
      "Karotten 150 g",
      "Zwiebel 40 g",
      "Brühe 500 ml",
      "Sojasauce 1–2 TL",
      "Stärke 1 TL",
    ],
    steps: [
      "Alles 20–25 Min. sanft schmoren.",
      "Leicht binden.",
      "Mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈68–72 g KH · Schwangerschaft ✓",
    swaps: "Teil Kartoffeln ↔ Süßkartoffel",
    side: "Nori-Salat ohne Essig",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Family pot dak-jjim; steam 닭; Fleur hides; Finn peeks."
    ),
  },
  {
    id: "sa-a",
    title:
      "Lachs im Folienpäckchen mit Pilzen & Zucchini (ホイル焼き)",
    desc: "Japanisch inspiriert – Ofen, Folie, sehr saftig.",
    story:
      "Kaum Abwasch, wunderbar zart – ideal für gemütliche Abende.",
    target: "≈69 g KH (Reis 90 g)",
    ingredients: [
      "Lachs 300 g",
      "Pilze 150 g",
      "Zucchini 200 g",
      "Zwiebel 40 g",
      "Sojasauce 1 TL",
      "Reis 90 g",
    ],
    steps: [
      "In Folie 15–18 Min. bei 190 °C garen.",
      "Minimal würzen.",
      "Mit Reis servieren.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓",
    swaps: "Lachs ↔ Forelle",
    side: "Gedämpfter Brokkoli",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Foil-baked salmon; steam 焼; Fleur sniffs; Finn judges."
    ),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Kleine Onigiri mit Lachs & Gurke (おにぎり・鮭)",
    desc: "Handliche, milde Reisbällchen mit Lachs – ideal auch zum Mitnehmen.",
    story:
      "Onigiri sind Alltagsklassiker – hier sanft belegt und sehr bekömmlich.",
    target: "≈69 g KH (Reis 90 g)",
    ingredients: ["Reis 90 g", "Lachsflocken 100 g", "Gurke 100 g", "Nori 2 Blätter"],
    steps: [
      "Reis kochen; 4 kleine Onigiri formen.",
      "Lachs & Gurke als Füllung einarbeiten.",
      "In Nori wickeln.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓",
    swaps: "Gurke ↔ reife Avocado",
    side: "Milde Misosuppe (optional)",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Triangle onigiri; steam 鮭; Fleur pats rice spirit; Finn’s whiskers curl."
    ),
  },
  {
    id: "so-m",
    title: "Kabocha & Tofu Nimono – sanft geschmort (かぼちゃと豆腐の煮物)",
    desc: "Japanisches Nimono mit Kürbis & Tofu; mild und glasiert.",
    story:
      "Leicht süßlich und weich, mit kleiner Portion Reis sehr rund.",
    target: "≈68–72 g KH (Kabocha 300 g + Reis 50 g)",
    ingredients: [
      "Kabocha 300 g",
      "Tofu 300 g",
      "Dashi/Wasser 500 ml",
      "Sojasauce 1–2 TL",
      "Ingwer 5 g",
      "Stärke 1 TL",
      "Reis 50 g",
    ],
    steps: [
      "Kabocha 12–15 Min. sieden bis weich.",
      "Tofu 3–4 Min. mitziehen lassen.",
      "Mild würzen, mit Stärke glasieren; mit kleinem Reis servieren.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈68–72 g KH · Schwangerschaft ✓",
    swaps: "Tofu ↔ Kabeljauwürfel",
    side: "Blanchierter Spinat/Mizuna",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Kabocha + tofu simmering; steam 煮; Fleur meets pumpkin spirit; Finn guards pot."
    ),
  },
  {
    id: "so-a",
    title: "Oyakodon – Ei vollständig gestockt (親子丼)",
    desc: "Klassische Huhn-Ei-Reisschale; Ei vollständig gesetzt.",
    story:
      "Comfort-Food pur, aber bei uns komplett durchgegart und mild.",
    target: "≈69 g KH (Reis 90 g)",
    ingredients: [
      "Reis 90 g",
      "Hähnchenschenkel 250 g",
      "Zwiebel 80 g",
      "Eier 3",
      "milde Brühe 250 ml",
      "Sojasauce 1 EL",
      "Zucker 1/2 TL (optional)",
    ],
    steps: [
      "Zwiebel & Huhn 8–10 Min. garen.",
      "Eier vollständig stocken lassen.",
      "Über Reis servieren.",
    ],
    checks:
      "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓",
    swaps: "Teil Reis ↔ Blumenkohlreis",
    side: "Gedämpfter Spinat",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Oyakodon with fully set egg; steam 丼; Fleur guards; Finn smirks."
    ),
  },
];

// ---------- Wochenübersicht Helper ----------
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = {
  mo: "Montag",
  di: "Dienstag",
  mi: "Mittwoch",
  do: "Donnerstag",
  fr: "Freitag",
  sa: "Samstag",
  so: "Sonntag",
};
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  (Array.isArray(arr) ? arr : []).forEach((r) => {
    const d = (r?.id || "").split("-")[0];
    if (map[d]) map[d].push(r);
  });
  Object.values(map).forEach((list) =>
    list.sort(
      (a, b) =>
        ["f", "m", "a"].indexOf((a?.id || "").split("-")[1]) -
        ["f", "m", "a"].indexOf((b?.id || "").split("-")[1])
    )
  );
  return map;
};

// ---------- List Summary ----------
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
  const m = String(item || "").match(
    /^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i
  );
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
  protein: [
    "Huhn",
    "Hähnchen",
    "Pute",
    "Rind",
    "Lachs",
    "Kabeljau",
    "Seelachs",
    "Garnelen",
    "Tofu",
    "Ei",
    "Eier",
    "Edamame",
    "Parmesan",
  ],
  veg: [
    "Karotte",
    "Zucchini",
    "Pak Choi",
    "Chinakohl",
    "Spinat",
    "Shiitake",
    "Pilze",
    "Brokkoli",
    "Gai Lan",
    "Lauch",
    "Zwiebel",
    "Paprika",
    "Daikon",
    "Rettich",
    "Frühlingslauch",
    "Kartoffel",
    "Süßkartoffel",
    "Kürbis",
    "Gurke",
  ],
  staple: [
    "Reis",
    "Sushi-Reis",
    "Vollkornreis",
    "Soba",
    "Somen",
    "Hirse",
    "Kartoffeln",
    "Nori",
  ],
  season: [
    "Wakame",
    "Nori",
    "Brühe",
    "Fond",
    "Kombu",
    "Dashi",
    "Sojasauce",
    "Miso",
    "Sesamöl",
    "Stärke",
    "Salz",
    "Zucker",
    "Wasser",
  ],
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
      if (groupMap.protein.some((w) => nLower.includes(w.toLowerCase())))
        add("protein");
      else if (groupMap.staple.some((w) => nLower.includes(w.toLowerCase())))
        add("staple");
      else if (groupMap.veg.some((w) => nLower.includes(w.toLowerCase())))
        add("veg");
      else if (groupMap.season.some((w) => nLower.includes(w.toLowerCase())))
        add("season");
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

// ---------- persistence (Bilder) ----------
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
      <label style={{ display: "block", marginBottom: 6, color: COLORS.neutral }}>
        {label}
      </label>
      <input type="file" accept="image/*" onChange={onChange} />
      {src ? (
        <div style={{ marginTop: 8 }}>
          <img
            src={src}
            alt={label}
            style={{
              maxWidth: "100%",
              borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
            }}
          />
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
  const ingredients = asList(r?.ingredients, lang);
  const steps = asList(r?.steps, lang);
  return (
    <div className="page" style={{ padding: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload
              storageKey={recipeImgKey}
              label={`Rezeptbild hochladen: ${pickText(r.title, lang)}`}
            />
          </div>
          {img ? (
            <img
              src={img}
              alt={pickText(r.title, lang)}
              style={{
                width: "100%",
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
              }}
            />
          ) : null}
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
          <div
            style={{
              fontSize: 12,
              color: COLORS.sky,
              fontWeight: 700,
              marginTop: -4,
              marginBottom: 6,
            }}
          >
            {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
          </div>
          <h2 style={{ marginTop: 0 }}>{pickText(r.title, lang)}</h2>
          <p
            style={{
              marginTop: -6,
              marginBottom: 8,
              color: COLORS.neutral,
              fontSize: 12,
            }}
          >
            {pickText(r.story, lang)}
          </p>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>
                {t.sections.ingredients} (2 Personen)
              </h3>
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
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>
                {t.sections.steps}
              </h3>
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
              Woche ab {meta.startDate} – <b>Modus: Non-Strict (balanced)</b>; CN/JP/KR dominiert, milde Würzung,
              natriumarme Sojasauce, schwangerschaftssicher; Diabetes: 60–90 g KH pro Mahlzeit (2 P.).
            </p>
            <ImageUpload
              storageKey={getImageKey("cover")}
              label="Cover-Bild hochladen"
            />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>Wochenübersicht</h2>
            <div
              className="avoid-break"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: 8,
                fontSize: 14,
              }}
            >
              {DAYS_ORDER.map((d) => {
                const dayList = Array.isArray(weekly?.[d]) ? weekly[d] : [];
                return (
                  <div
                    key={d}
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12,
                      padding: 10,
                      background: COLORS.panelBG80,
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>
                      {t.day[d]}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 8,
                      }}
                    >
                      {dayList.map((m) => {
                        const title = pickText(m?.title, lang) ?? "";
                        const target = pickText(m?.target, lang) ?? "";
                        return (
                          <div
                            key={m.id}
                            style={{
                              background: COLORS.white,
                              border: `1px solid ${COLORS.border}`,
                              borderRadius: 10,
                              padding: 8,
                            }}
                          >
                            <div style={{ color: COLORS.sky, fontSize: 12 }}>
                              {mealLabelI18n(m.id, t)}
                            </div>
                            <div style={{ fontWeight: 600, lineHeight: 1.3 }}>
                              {title}
                            </div>
                            <div
                              style={{
                                color: COLORS.neutral,
                                fontSize: 12,
                                marginTop: 2,
                              }}
                            >
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

// ---------- Einkaufsliste ----------
function GroceryList() {
  const rootRef = useRef(null);
  const groups = Object.entries(LIST_SUMMARY);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>
            Automatisch aus den Rezepten summiert (Woche ab {meta.startDate}).
          </p>
          <div
            className="avoid-break"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
            }}
          >
            {groups.map(([group, items]) => {
              const safeItems = Array.isArray(items) ? items : [];
              return (
                <div
                  key={group}
                  style={{
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: 12,
                    background: COLORS.panelBG70,
                  }}
                >
                  <h3 style={{ marginTop: 0, color: COLORS.indigo }}>{group}</h3>
                  <ul>
                    {safeItems.map((t, i) => (
                      <li key={i}>
                        {typeof t === "string" ? t : String(t ?? "")}
                      </li>
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
export default function Woche1_2025_09_29_DE() {
  const [tab, setTab] = useState("kochbuch");
  const t = UI.de;
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
      <div
        className="print:hidden"
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}
      >
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
            style={{
              padding: "10px 14px",
              borderRadius: 14,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.emerald,
              color: "#fff",
              boxShadow: COLORS.btnShadow,
              fontWeight: 600,
            }}
          >
            {t.btn.pdf}
          </button>
          <button
            onClick={doHTML}
            style={{
              padding: "10px 14px",
              borderRadius: 14,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.emerald,
              color: "#fff",
              boxShadow: COLORS.btnShadow,
              fontWeight: 600,
            }}
          >
            {t.btn.html}
          </button>
          <button
            onClick={() => window.print()}
            style={{
              padding: "10px 14px",
              borderRadius: 14,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.emerald,
              color: "#fff",
              boxShadow: COLORS.btnShadow,
              fontWeight: 600,
            }}
          >
            {t.btn.print}
          </button>
        </div>
      </div>

      <div style={{ display: tab === "kochbuch" ? "block" : "none" }}>
        <Cookbook t={t} lang="de" />
      </div>
      <div style={{ display: tab === "einkauf" ? "block" : "none" }}>
        <GroceryList />
      </div>

      {/* Download-Links unter dem jeweiligen Tab-Inhalt */}
      <div className="print:hidden" style={{ marginTop: 12 }}>
        {tab === "kochbuch" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.kochbuch ? (
              <a
                href={pdfLink.kochbuch}
                download={`${FILE_BASE} – kochbuch.pdf`}
                style={{ color: COLORS.indigo, textDecoration: "underline" }}
              >
                📄 PDF herunterladen (Kochbuch)
              </a>
            ) : null}
            {htmlLink.kochbuch ? (
              <a
                href={htmlLink.kochbuch}
                download={`${FILE_BASE} – kochbuch.html`}
                style={{ color: COLORS.indigo, textDecoration: "underline" }}
              >
                🌐 HTML herunterladen (Kochbuch)
              </a>
            ) : null}
          </div>
        )}
        {tab === "einkauf" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.einkauf ? (
              <a
                href={pdfLink.einkauf}
                download={`${FILE_BASE} – einkauf.pdf`}
                style={{ color: COLORS.indigo, textDecoration: "underline" }}
              >
                📄 PDF herunterladen (Einkaufsliste)
              </a>
            ) : null}
            {htmlLink.einkauf ? (
              <a
                href={htmlLink.einkauf}
                download={`${FILE_BASE} – einkauf.html`}
                style={{ color: COLORS.indigo, textDecoration: "underline" }}
              >
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
    if (!/^Woche 1 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    // i18n-Meal-Labels werden dynamisch gerendert (keine feste Prüfung hier)
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 4) throw new Error(`Zutaten zu wenig: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Steps zu wenig: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
    console.log("[GhibliKitchen] All tests passed (Woche-1 DE).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}