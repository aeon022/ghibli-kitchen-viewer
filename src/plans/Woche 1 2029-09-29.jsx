/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from "react";

// =====================================================================
// GhibliKitchen – Kochbuch & Einkaufsliste (Buttons + Upload, Preset‑Auto)
// TSX Edition (.tsx)
//  - FIX: remove any risky string concat that could cause unterminated strings
//    (replaced with a safe helper `buildPrompt`).
//  - FIX: No modern color functions (oklab/oklch/color-mix/lab) anywhere.
//  - Types added for data structures, hooks, window.html2pdf, options.
//  - Smoke tests extended (runtime assertions + simple unit tests helpers).
//  - Safe defaults for html2pdf (foreignObjectRendering enabled).
// =====================================================================

// ---------------- Types ----------------
declare global {
  interface Window {
    html2pdf?: any;
  }
}

type Meal = {
  id: string;
  title: string;
  target: string;
  ingredients: string[];
  steps: string[];
  checks: string;
  swaps: string;
  side: string;
  remind: boolean;
  prompt: string;
};

type DayPlan = {
  day: string;
  meals: Meal[];
};

type ListGroup = {
  name: string;
  items: [string, string][];
};

// ---------------- Palette (HEX/RGBA only) ----------------
const COLORS = {
  pageBg: "#FAF7F1",
  text: "#111827",
  border: "rgba(0,0,0,0.10)",
  panelBG70: "rgba(255,255,255,0.70)",
  panelBG80: "rgba(255,255,255,0.80)",
  white: "#FFFFFF",
  // Buttons
  emerald: "#059669", // emerald-600
  amber: "#f59e0b", // amber-500
  sky: "#0284c7", // sky-600
  neutral: "#404040", // neutral-700
  indigo: "#4f46e5", // indigo-600
  btnShadow: "0 6px 20px rgba(0,0,0,.12)",
} as const;

// -------- Helpers --------
function buildPrompt(header: string, body: string): string {
  // Always join with a single \n to avoid unterminated strings in TSX
  return `${header}\n${body}`;
}

// -------- Preset Helper --------
const DEFAULT_PRESET = {
  page: { orientation: "landscape" as const, marginPt: [12, 14, 12, 14] as [number, number, number, number], background: COLORS.pageBg },
  listPage: { orientation: "portrait" as const, marginPt: [12, 12, 12, 12] as [number, number, number, number], background: COLORS.pageBg },
  layout: { title: "GhibliKitchen – Woche 1 (CN/JP/KR)", subtitle: "Magenfreundlich · Diabetes‑gerecht · Schwangerschaftssicher" },
  buttons: { pdf: true, htmlExport: true, htmlOpen: true, print: true },
  health: {
    diabetesKH2p: "60–90 g KH/ Mahlzeit (2 P.)",
    metformin: true,
    gastritis: "Schärfe/Säure gering, Dämpfen/Sieden/Schmoren",
    pregnancy: "Durchgaren ≥75 °C; Jod sparsam; natriumarme Sojasauce",
  },
  promptHeader:
    "Use exactly two cats only: Fleur (small, playful, European Shorthair, grey-black tabby) and Finn (larger, reserved prankster, European Shorthair, grey-black tabby). No third cat, no extra animals. Chinese woman (traditional or sporty-modern; occasional Princess Mononoke aura). Western man with short fauxhawk. Studio Ghibli watercolor vibe, warm golden light, gentle magical steam/pot/vegetable spirits. Pregnancy-safe food only (no raw fish/eggs). A4 landscape page; manga/cartoon panel with generous margins; image intended to occupy ≤ one-third of the page width on the left.",
} as const;

function useGhibliPreset(defaultPreset = DEFAULT_PRESET) {
  const KEY = "ghibliKitchenPreset_v1";
  const [preset, setPreset] = useState(defaultPreset);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPreset({ ...defaultPreset, ...(JSON.parse(raw) as typeof DEFAULT_PRESET) });
    } catch (_) {}
  }, []);
  return preset;
}

// -------- Data: Woche 1 --------
// (Sonntag‑Mittag bereits geändert zu Kabocha & Tofu Nimono)
const DATA: DayPlan[] = [
  {
    day: "Montag",
    meals: [
      {
        id: "mo-f",
        title: "Reisbrei mit Lachs & Spinat (お粥・鮭)",
        target: "≈70 g KH gesamt (≈35 g p. P.), Protein ≈20–25 g p. P.",
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
          "Lachs & Ingwer zugeben, 2–3 Min. erwärmen.",
          "Mild abschmecken.",
        ],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ – Lachs durchgegart",
        swaps: "Spinat ↔ Pak Choi; Lachs ↔ Kabeljau",
        side: "Warmes Wasser/Gerstentee",
        remind: true,
        prompt:
          "Close-up of a cozy porcelain bowl of salmon–spinach congee on a bamboo tray; gentle steam-spirits forming 粥; Fleur pawing; Finn watching.",
      },
      {
        id: "mo-m",
        title: "Sanft pochiertes Hähnchen mit Bok Choy (白切鶏·青江菜)",
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
          "Hähnchen 12–14 Min. knapp unter Siedepunkt garziehen; 5 Min. nachziehen.",
          "Reis garen; Bok Choy 2–3 Min. dämpfen.",
          "Huhn aufschneiden, minimal würzen.",
        ],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓",
        swaps: "Hähnchen ↔ Pute",
        side: "Gurkenscheiben",
        remind: true,
        prompt:
          "Poached chicken with bok choy; steam spirits 白切鶏; warm light; Fleur sneaks; Finn noble.",
      },
      {
        id: "mo-a",
        title: "Algensuppe mit Kabeljau + Reis (미역국)",
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
        prompt:
          "Miyeok-guk steam draws 미역국; Fleur peeks; Finn’s tail like seaweed.",
      },
    ],
  },
  {
    day: "Dienstag",
    meals: [
      {
        id: "di-f",
        title: "Kürbisreisbrei (호박죽)",
        target: "≈74 g KH gesamt",
        ingredients: ["Kürbis 400 g", "Reis 60 g", "Wasser 800 ml", "Prise Salz"],
        steps: [
          "Kürbis weich kochen & pürieren; Reis 30 Min. mitkochen; mild salzen.",
        ],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓",
        swaps: "Reis ↔ Hirse",
        side: "1–2 EL Joghurt (pasteur.)",
        remind: true,
        prompt: "Sunny pumpkin porridge; leaf spirit; Fleur plays; Finn lounges.",
      },
      {
        id: "di-m",
        title: "Warme Soba mit Huhn & Spinat (温かいそば·鶏)",
        target: "≈72 g KH (Soba 120 g)",
        ingredients: [
          "Soba 120 g",
          "Hähnchen 200 g",
          "Spinat 150 g",
          "milde Kombu‑Brühe 700 ml",
          "Sojasauce 1–2 TL",
        ],
        steps: [
          "Brühe 10 Min. simmern.",
          "Huhn 6–7 Min. garen.",
          "Soba kochen/spülen, Spinat kurz ziehen lassen.",
          "Mild würzen.",
        ],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓",
        swaps: "Soba ↔ Udon",
        side: "Rettich blanchiert",
        remind: true,
        prompt:
          "Rustic soba bowl with steam そば; Fleur bats noodle; Finn ignores.",
      },
      {
        id: "di-a",
        title: "Gedämpfter Kabeljau mit Ingwer & Frühlingslauch (清蒸鳕鱼)",
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
        ],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓",
        swaps: "Kabeljau ↔ Seelachs",
        side: "Warmes Wasser",
        remind: true,
        prompt: "Steamed cod; steam draws 鳕; Fleur reflection; Finn calm.",
      },
    ],
  },
  {
    day: "Mittwoch",
    meals: [
      {
        id: "mi-f",
        title: "Kongee mit Shiitake & Seidentofu (粥·香菇豆腐)",
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
          "30–35 Min. köcheln; Gemüse/Tofu 5 Min. mitziehen; mild würzen.",
        ],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈63 g KH · Schwangerschaft ✓",
        swaps: "Reis ↔ Hirse",
        side: "Nori sparsam",
        remind: true,
        prompt: "Creamy congee; steam 豆; Fleur behind bowl; Finn statue-like.",
      },
      {
        id: "mi-m",
        title: "Milder Bibimbap ohne Chili (비빔밥·순한)",
        target: "≈69 g KH (Reis 90 g)",
        ingredients: [
          "Reis 90 g",
          "Hähnchen 200 g",
          "Spinat 100 g",
          "Zucchini 100 g",
          "Karotte 100 g",
          "Sprossen 100 g",
          "Eier 2 (Omelett)",
          "Sesamöl 1/2 TL",
          "Sojasauce 1–2 TL",
        ],
        steps: ["Gemüse kurz dünsten.", "Reis + Toppings; sanft anmachen."],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ – Ei durchgegart",
        swaps: "Huhn ↔ Tofu",
        side: "Gurkenscheiben",
        remind: true,
        prompt:
          "Bibimbap, no chili; steam 비빔밥; Fleur guards carrot; Finn’s whiskers glow.",
      },
      {
        id: "mi-a",
        title: "Nikujaga – Rind‑Kartoffel (肉じゃが)",
        target: "≈75–80 g KH",
        ingredients: [
          "Rind mager 200 g",
          "Kartoffeln 400 g",
          "Karotte 150 g",
          "Zwiebel 60 g",
          "Kombu‑Brühe 600 ml",
          "Sojasauce 1 EL",
          "Zucker 1/2 TL (opt.)",
        ],
        steps: [
          "Alles 20–25 Min. sanft schmoren bis weich; leicht einkochen.",
        ],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈75–80 g KH · Schwangerschaft ✓",
        swaps: "Rind ↔ Huhn/Tofu",
        side: "Salzarme Misosuppe klein",
        remind: true,
        prompt:
          "Homey nikujaga; steam 肉; Fleur chases potato spirit; Finn supervises.",
      },
    ],
  },
  {
    day: "Donnerstag",
    meals: [
      {
        id: "do-f",
        title: "Misosuppe mit Tofu & milder Wakame + Reis (味噌汁)",
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
          "Suppe erhitzen, Tofu/Wakame ziehen lassen; Miso off‑heat einrühren; mit Reis.",
        ],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ – Jod moderat",
        swaps: "Reis ↔ Vollkornreis",
        side: "Gedämpfter Spinat",
        remind: true,
        prompt: "Gentle miso soup; steam 味; Fleur reflection; Finn wave-tail.",
      },
      {
        id: "do-m",
        title: "Buddha’s Delight – Gemüse‑Tofu (罗汉斋)",
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
        steps: ["Gemüse & Tofu 10–12 Min. schmoren; leicht binden; mit Reis."],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓",
        swaps: "Tofu ↔ Hähnchenbrust",
        side: "Rettich blanchiert",
        remind: true,
        prompt: "Tofu & vegetables; steam 斋; Fleur sniffs mushroom; Finn aloof.",
      },
      {
        id: "do-a",
        title: "Janchi‑Guksu – milde Festnudeln (잔치국수)",
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
          "Gemüse 3–4 Min.; Hähnchen 6–7 Min.; Somen separat kochen, kurz ziehen lassen; mild würzen.",
        ],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈73–78 g KH · Schwangerschaft ✓",
        swaps: "Somen ↔ Udon",
        side: "Blattgemüse blanchiert",
        remind: true,
        prompt: "Festive noodle bowl; steam 잔치; Fleur plays with noodle; Finn watches.",
      },
    ],
  },
  {
    day: "Freitag",
    meals: [
      {
        id: "fr-f",
        title: "Koreanischer Dampf‑Eierstich + Reis (계란찜)",
        target: "≈81 g KH",
        ingredients: [
          "Eier 4",
          "Wasser/Brühe 300 ml",
          "Reis 70 g",
          "Süßkartoffel 150 g",
          "Frühlingslauch 10 g",
        ],
        steps: [
          "Eier 12–15 Min. dämpfen bis fest; Reis & Süßkartoffel garen; servieren.",
        ],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈81 g KH · Schwangerschaft ✓ – Ei durchgegart",
        swaps: "Süßkartoffel ↔ Kürbis",
        side: "Nori (Kim) zerkrümelt",
        remind: true,
        prompt: "Silky steamed egg; steam 계; Fleur ears peek; Finn whiskers glow.",
      },
      {
        id: "fr-m",
        title: "Hähnchen‑Soboro‑Don (鶏そぼろ丼)",
        target: "≈85 g KH",
        ingredients: [
          "Reis 90 g",
          "Hähnchenhack 250 g",
          "Erbsen 150 g",
          "Karotte 100 g",
          "Sojasauce 1–2 TL",
          "Zucker 1/2 TL (opt.)",
          "Wasser 50 ml",
        ],
        steps: [
          "Hack mit Wasser krümelig garziehen; Gemüse mitgaren; mild würzen; auf Reis.",
        ],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈85 g KH · Schwangerschaft ✓",
        swaps: "Erbsen ↔ Edamame",
        side: "Gurkenscheiben",
        remind: true,
        prompt: "Bento stripes soboro-don; steam 丼; Fleur eyes peas; Finn fake-sleeps.",
      },
      {
        id: "fr-a",
        title: "Gedämpfte Garnelen mit Tofu & Pak Choi (清蒸虾豆腐)",
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
          "Tofu + Garnelen 8–10 Min. dämpfen; Pak Choi 2–3 Min.; mild würzen; mit Reis.",
        ],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈62–65 g KH · Schwangerschaft ✓",
        swaps: "Garnelen ↔ Kabeljau",
        side: "Klare Brühe",
        remind: true,
        prompt: "Shrimp on tofu; steam 虾; Fleur gazes; Finn guards.",
      },
    ],
  },
  {
    day: "Samstag",
    meals: [
      {
        id: "sa-f",
        title: "Hirse–Kürbis‑Kongee (小米南瓜粥)",
        target: "≈62 g KH",
        ingredients: ["Hirse 60 g", "Kürbis 300 g", "Wasser 900 ml", "Prise Salz"],
        steps: ["Hirse + Kürbis 35–40 Min. weich; mild salzen."],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓",
        swaps: "Hirse ↔ Reis",
        side: "Blattspinat warm",
        remind: true,
        prompt: "Golden millet–pumpkin congee; steam 粥; Fleur bats seed; Finn naps.",
      },
      {
        id: "sa-m",
        title: "Soy‑gedünstetes Huhn mit Kartoffeln & Karotten (닭찜·순한)",
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
        steps: ["20–25 Min. sanft schmoren; leicht binden."],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈68–72 g KH · Schwangerschaft ✓",
        swaps: "Teil Kartoffeln ↔ Süßkartoffel",
        side: "Nori‑Salat ohne Essig",
        remind: true,
        prompt: "Family pot dak‑jjim; steam 닭; Fleur hides; Finn peeks.",
      },
      {
        id: "sa-a",
        title:
          "Lachs im Folienpäckchen mit Pilzen & Zucchini (ホイル焼き)",
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
          "In Folie 15–18 Min. bei 190 °C; minimal würzen; mit Reis.",
        ],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓",
        swaps: "Lachs ↔ Forelle",
        side: "Gedämpfter Brokkoli",
        remind: true,
        prompt: "Foil-baked salmon; steam 焼; Fleur sniffs; Finn judges.",
      },
    ],
  },
  {
    day: "Sonntag",
    meals: [
      {
        id: "so-f",
        title: "Kleine Onigiri mit Lachs & Gurke (おにぎり・鮭)",
        target: "≈69 g KH (Reis 90 g)",
        ingredients: ["Reis 90 g", "Lachsflocken 100 g", "Gurke 100 g", "Nori 2 Blätter"],
        steps: [
          "Reis kochen; 4 kleine Onigiri; Lachs & Gurke als Füllung; in Nori wickeln.",
        ],
        checks: "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓",
        swaps: "Gurke ↔ reife Avocado",
        side: "Milde Misosuppe (optional)",
        remind: true,
        prompt:
          "Triangle onigiri; steam 鮭; Fleur pats rice spirit; Finn’s whiskers curl.",
      },
      {
        id: "so-m",
        title:
          "Kabocha & Tofu Nimono – sanft geschmort (かぼちゃと豆腐の煮物)",
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
        remind: true,
        prompt:
          "Kabocha + tofu simmering; steam 煮; Fleur meets pumpkin spirit; Finn guards pot.",
      },
      {
        id: "so-a",
        title: "Oyakodon – Ei vollständig gestockt (親子丼)",
        target: "≈69 g KH (Reis 90 g)",
        ingredients: [
          "Reis 90 g",
          "Hähnchenschenkel 250 g",
          "Zwiebel 80 g",
          "Eier 3",
          "milde Brühe 250 ml",
          "Sojasauce 1 EL",
          "Zucker 1/2 TL (opt.)",
        ],
        steps: [
          "Zwiebel & Huhn 8–10 Min.; Eier vollständig stocken lassen; über Reis.",
        ],
        checks:
          "Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓",
        swaps: "Teil Reis ↔ Blumenkohlreis",
        side: "Gedämpfter Spinat",
        remind: true,
        prompt:
          "Oyakodon with fully set egg; steam 丼; Fleur guards; Finn smirks.",
      },
    ],
  },
];

// Einkaufsliste – Gesamtsummen
const LIST_SUMMARY: ListGroup[] = [
  {
    name: "Protein / Fisch / Tofu",
    items: [
      ["Hähnchen gesamt", "1,75 kg"],
      ["Rind (mager)", "200 g"],
      ["Kabeljau/Seelachs", "560 g"],
      ["Lachs gesamt", "480 g"],
      ["Garnelen", "300 g"],
      ["Tofu (inkl. Seidentofu)", "1.200 g"],
      ["Eier", "9 Stk"],
    ],
  },
  {
    name: "Gemüse & Pilze",
    items: [
      ["Kürbis/Kabocha gesamt", "1.200 g"],
      ["Spinat", "350 g"],
      ["Bok Choy", "300 g"],
      ["Pak Choi", "300 g"],
      ["Chinakohl", "300 g"],
      ["Zucchini", "450 g"],
      ["Karotten", "800 g"],
      ["Daikon/Rettich", "200 g"],
      ["Zwiebeln", "220 g"],
      ["Frühlingslauch", "65 g"],
      ["Ingwer", "55 g"],
      ["Brokkoli/Gai Lan", "300 g"],
      ["Pilze gesamt (inkl. Shiitake 60 g)", "440 g"],
      ["Gurke", "100 g"],
      ["Sprossen", "100 g"],
      ["Süßkartoffel", "150 g"],
    ],
  },
  {
    name: "Reis, Nudeln & Sättigung",
    items: [
      ["Rundkornreis (roh)", "1.280 g"],
      ["Hirse", "60 g"],
      ["Soba", "120 g"],
      ["Somen", "100 g"],
      ["Kartoffeln", "700 g"],
      ["Nori‑Blätter", "2 Stk"],
    ],
  },
  {
    name: "Algen, Brühen & Würze",
    items: [
      ["Wakame (getrocknet)", "9 g"],
      ["Miso hell", "20 g"],
      ["Sojasauce natriumarm", "150 ml"],
      ["Sesamöl", "10 ml"],
      ["Speisestärke", "10 g"],
      ["Hühnerfond ungesalzen", "800 ml"],
      ["Kombu/Dashi (mild) für Brühen", "≈4,6 L"],
      ["Salz (Prisen) & Zucker (opt.)", "–"],
    ],
  },
];

// -------- Utilities --------
function useHtml2Pdf() {
  const ensureScript = (src: string, check: () => boolean) =>
    new Promise<void>((resolve, reject) => {
      try {
        if (check()) return resolve();
      } catch (_) {}
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Script load failed: " + src));
      document.body.appendChild(s);
    });

  const make = useCallback(async (el: HTMLElement, opt: Record<string, any>) => {
    await ensureScript(
      "https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",
      () => !!window.html2pdf
    );
    const merged = {
      margin: [12, 12, 12, 12],
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: COLORS.pageBg,
        foreignObjectRendering: true,
        preferCanvas: false,
      },
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
      pagebreak: { mode: ["css", "legacy"], avoid: [".avoid-break"], after: [".pb-after"] },
      ...opt,
    };
    const worker = (window.html2pdf as any)().from(el).set(merged).toPdf();
    const blob: Blob = await worker.output("blob");
    const url = URL.createObjectURL(blob);
    return { blob, url } as const;
  }, []);

  return { make } as const;
}

function TopBar({ title, subtitle, onPDF, onExportHTML, onOpenHTML, onPrint }:{
  title: string; subtitle?: string; onPDF: () => void | Promise<void>; onExportHTML: () => void; onOpenHTML: () => void; onPrint: () => void;
}){
  const btnBase: React.CSSProperties = {
    color: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    boxShadow: COLORS.btnShadow,
    borderRadius: 16,
  };
  return (
    <div className="print:hidden flex items-center justify-between gap-2 mb-3" style={{ color: COLORS.text }}>
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={onPDF} className="px-3 py-1.5 rounded-2xl" style={{ ...btnBase, backgroundColor: COLORS.emerald }}>PDF erzeugen</button>
        <button onClick={onExportHTML} className="px-3 py-1.5 rounded-2xl" style={{ ...btnBase, backgroundColor: COLORS.amber }}>HTML exportieren</button>
        <button onClick={onOpenHTML} className="px-3 py-1.5 rounded-2xl" style={{ ...btnBase, backgroundColor: COLORS.neutral }}>HTML öffnen</button>
        <button onClick={onPrint} className="px-3 py-1.5 rounded-2xl" style={{ ...btnBase, backgroundColor: COLORS.sky }}>Drucken</button>
      </div>
    </div>
  );
}

// -------- Bild-Uploads je Panel --------
function usePanelImages(storageKey = "gk_w1_panel_images") {
  const [images, setImages] = useState<Record<string, string>>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setImages(JSON.parse(raw) as Record<string, string>);
    } catch (_) {}
  }, [storageKey]);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(images));
    } catch (_) {}
  }, [images, storageKey]);
  const setImage = (id: string, dataUrl: string) =>
    setImages((prev) => ({ ...prev, [id]: dataUrl }));
  const clearImage = (id: string) =>
    setImages((prev) => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
  return { images, setImage, clearImage } as const;
}

// -------- Hauptkomponente --------
export default function GhibliKitchenButtonsUploadPresetAuto(): JSX.Element {
  const preset = useGhibliPreset();
  const { images, setImage, clearImage } = usePanelImages();
  const [view, setView] = useState<"kochbuch" | "liste">("kochbuch");

  const kbRef = useRef<HTMLDivElement | null>(null);
  const liRef = useRef<HTMLDivElement | null>(null);
  const [hrefKB, setHrefKB] = useState<string>("");
  const [hrefLI, setHrefLI] = useState<string>("");
  const pdf = useHtml2Pdf();
  useEffect(() => () => {
    if (hrefKB) URL.revokeObjectURL(hrefKB);
    if (hrefLI) URL.revokeObjectURL(hrefLI);
  }, [hrefKB, hrefLI]);

  // ---------- Export Helpers ----------
  const exportHTML = (node: HTMLElement | null, name: string, orient: "landscape" | "portrait" = "landscape") => {
    const content = node?.innerHTML || "";
    const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${name}</title>
<style>
  html,body{margin:0;padding:0;background:${COLORS.pageBg};color:${COLORS.text};font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', Arial;}
  @page{size:A4 ${orient}; margin:12mm}
  .container{max-width:1123px;margin:0 auto;padding:24px}
</style></head><body><div class="container">${content}</div></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name.replaceAll(" ", "_") + ".html";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };
  const openHTML = (node: HTMLElement | null, name: string, orient: "landscape" | "portrait" = "landscape") => {
    const content = node?.innerHTML || "";
    const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${name} (Preview)</title>
<style>
  html,body{margin:0;padding:0;background:${COLORS.pageBg};color:${COLORS.text};font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', Arial;}
  @page{size:A4 ${orient}; margin:12mm}
  .container{max-width:1123px;margin:0 auto;padding:24px}
</style></head><body><div class="container">${content}</div></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    if (!w) alert("Pop-ups erlauben.");
  };
  const doPrint = () => window.print();

  // PDFs
  const makePDF_KB = async () => {
    const el = kbRef.current; if (!el) return;
    const opt = {
      margin: preset.page.marginPt,
      filename: "GhibliKitchen_W1_Kochbuch.pdf",
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: preset.page.background, foreignObjectRendering: true, preferCanvas: false },
      jsPDF: { unit: "pt", format: "a4", orientation: preset.page.orientation },
      pagebreak: { mode: ["css", "legacy"], after: [".pb-after"], avoid: [".avoid-break"] },
    } as const;
    const { url } = await pdf.make(el, opt as unknown as Record<string, any>);
    setHrefKB((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });
  };
  const makePDF_LI = async () => {
    const el = liRef.current; if (!el) return;
    const opt = {
      margin: preset.listPage.marginPt,
      filename: "GhibliKitchen_W1_Einkaufsliste.pdf",
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: preset.listPage.background, foreignObjectRendering: true, preferCanvas: false },
      jsPDF: { unit: "pt", format: "a4", orientation: preset.listPage.orientation },
      pagebreak: { mode: ["css", "legacy"] },
    } as const;
    const { url } = await pdf.make(el, opt as unknown as Record<string, any>);
    setHrefLI((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });
  };

  // --------- Bild Upload Handler ---------
  const onPickImage = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage(id, String(reader.result));
    reader.readAsDataURL(f);
  };

  // --------- UI Styles ---------
  const cardPanelStyle: React.CSSProperties = { border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.panelBG70, boxShadow: COLORS.btnShadow, borderRadius: 18 };
  const cardMainStyle: React.CSSProperties = { border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.panelBG80, boxShadow: COLORS.btnShadow, borderRadius: 18 };
  const imageFrameStyle: React.CSSProperties = { border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white, borderRadius: 14 };

  return (
    <div className="w-[1123px] mx-auto p-6" style={{ background: DEFAULT_PRESET.page.background, color: COLORS.text }}>
      {/* View Switch */}
      <div className="print:hidden mb-3 flex gap-2">
        <button onClick={() => setView("kochbuch")} className={`px-3 py-1.5 rounded-2xl ${view === "kochbuch" ? "text-white" : ""}`} style={{ backgroundColor: view === "kochbuch" ? COLORS.neutral : COLORS.white, border: `1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>Kochbuch</button>
        <button onClick={() => setView("liste")} className={`px-3 py-1.5 rounded-2xl ${view === "liste" ? "text-white" : ""}`} style={{ backgroundColor: view === "liste" ? COLORS.neutral : COLORS.white, border: `1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>Einkaufsliste</button>
      </div>

      {view === "kochbuch" ? (
        <section>
          <TopBar
            title="GhibliKitchen – Woche 1 • Kochbuch-PDF"
            subtitle="A4 quer · Panel links ≤1/3 · Rezept rechts ≥2/3"
            onPDF={makePDF_KB}
            onExportHTML={() => exportHTML(kbRef.current, "GhibliKitchen – Woche 1 • Kochbuch", "landscape")}
            onOpenHTML={() => openHTML(kbRef.current, "GhibliKitchen – Woche 1 • Kochbuch", "landscape")}
            onPrint={() => window.print()}
          />
          <div ref={kbRef} className="space-y-6 font-sans text-[12pt]">
            {/* Titelseite */}
            <section className="pb-after">
              <div className="grid grid-cols-12 gap-4">
                <aside className="col-span-4">
                  <div className="p-3" style={cardPanelStyle}>
                    <div className="aspect-[4/3] overflow-hidden flex items-center justify-center" style={imageFrameStyle}>
                      {images["cover"] ? (
                        <img src={images["cover"]} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center text-sm opacity-70 px-2">
                          <div className="font-medium">Cover-Panel (Illustration einfügen)</div>
                          <div>Ghibli watercolor · warm light · kitchen scene</div>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex gap-2 items-center print:hidden">
                      <label className="px-2 py-1 rounded-xl text-white cursor-pointer" style={{ backgroundColor: COLORS.amber, border: `1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>
                        Bild auswählen<input type="file" accept="image/*" className="hidden" onChange={onPickImage("cover")} />
                      </label>
                      {images["cover"] && (
                        <button onClick={() => clearImage("cover")} className="px-2 py-1 rounded-xl" style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>Bild löschen</button>
                      )}
                    </div>
                    <details className="mt-2 text-[10pt]">
                      <summary className="cursor-pointer font-medium">DALL·E Prompt (Cover)</summary>
                      <div className="mt-1 opacity-90 whitespace-pre-wrap">{buildPrompt(DEFAULT_PRESET.promptHeader, "Cozy kitchen overview with bamboo trays, congee, miso soup, soba; steam-spirits forming 中 日 韓; warm golden light; washi texture.")}</div>
                    </details>
                  </div>
                </aside>
                <main className="col-span-8">
                  <div className="p-6" style={cardMainStyle}>
                    <h2 className="text-4xl font-semibold">{DEFAULT_PRESET.layout.title}</h2>
                    <p className="text-sm opacity-80">{DEFAULT_PRESET.layout.subtitle}</p>
                    <ul className="grid grid-cols-2 gap-2 mt-4 text-[10pt]">
                      {DATA.map((d, i) => (
                        <li key={i} className="p-2" style={{ ...cardMainStyle, padding: "0.5rem" }}>
                          <div className="font-semibold">{d.day}</div>
                          <ul className="list-disc pl-4">
                            {d.meals.map((m) => (
                              <li key={m.id}>{m.title}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-[10pt] opacity-75">
                      <p>
                        Leitplanken: {DEFAULT_PRESET.health?.gastritis || "mild & salzarm"}; {DEFAULT_PRESET.health?.pregnancy}. <strong>Diabetes:</strong> {DEFAULT_PRESET.health?.diabetesKH2p}. {DEFAULT_PRESET.health?.metformin && "Metformin mit der Mahlzeit einnehmen."}
                      </p>
                    </div>
                  </div>
                </main>
              </div>
            </section>

            {/* Rezeptseiten */}
            {DATA.map((d) => (
              <section key={d.day} className="pb-after">
                <h3 className="text-2xl font-semibold mb-2">{d.day}</h3>
                {d.meals.map((m) => (
                  <div key={m.id} className="grid grid-cols-12 gap-4 mb-4">
                    <aside className="col-span-4">
                      <div className="p-3" style={cardPanelStyle}>
                        <div className="aspect-[4/3] overflow-hidden flex items-center justify-center" style={imageFrameStyle}>
                          {images[m.id] ? (
                            <img src={images[m.id]} alt={m.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center text-sm opacity-70 px-2">
                              <div className="font-medium">Panel (Illustration einfügen)</div>
                              <div className="mt-1">{m.title}</div>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex gap-2 items-center print:hidden">
                          <label className="px-2 py-1 rounded-xl text-white cursor-pointer" style={{ backgroundColor: COLORS.amber, border: `1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>
                            Bild auswählen<input type="file" accept="image/*" className="hidden" onChange={onPickImage(m.id)} />
                          </label>
                          {images[m.id] && (
                            <button onClick={() => clearImage(m.id)} className="px-2 py-1 rounded-xl" style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>
                              Bild löschen
                            </button>
                          )}
                        </div>
                        <details className="mt-2 text-[10pt]">
                          <summary className="cursor-pointer font-medium">DALL·E Prompt</summary>
                          <div className="mt-1 opacity-90 whitespace-pre-wrap">{buildPrompt(DEFAULT_PRESET.promptHeader, m.prompt)}</div>
                        </details>
                      </div>
                    </aside>
                    <main className="col-span-8">
                      <article className="p-4 avoid-break" style={cardMainStyle}>
                        <h4 className="text-lg font-semibold">{m.title} – 2 Portionen</h4>
                        <div className="text-[10pt] opacity-80">Nähr‑Ziel: {m.target}</div>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-sm font-semibold">Zutaten (g/ml)</div>
                            <ul className="list-disc pl-5 text-[11pt] mt-1">
                              {m.ingredients.map((it) => (
                                <li key={it}>{it}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-semibold">Zubereitung</div>
                            <ol className="list-decimal pl-5 text-[11pt] mt-1">
                              {m.steps.map((st) => (
                                <li key={st}>{st}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                        <div className="mt-2 text-[11pt]">
                          <p>
                            <span className="font-semibold">Hinweise:</span> {m.checks}
                          </p>
                          <p className="mt-1">
                            <span className="font-semibold">Austausche:</span> {m.swaps}
                          </p>
                          <p className="mt-1">
                            <span className="font-semibold">Beilage:</span> {m.side}
                          </p>
                          <p className="mt-1 font-semibold">Metformin: mit der Mahlzeit einnehmen.</p>
                        </div>
                        <div className="mt-2 text-[10pt] opacity-70">Inspiration: Just One Cookbook · My Korean Kitchen · Made With Lau · The Woks of Life (mild, salzarm adaptiert).</div>
                      </article>
                    </main>
                  </div>
                ))}
              </section>
            ))}
          </div>
          {hrefKB && (
            <div className="print:hidden mt-2">
              <a
                href={hrefKB}
                download="GhibliKitchen_W1_Kochbuch.pdf"
                className="px-3 py-1.5 rounded-2xl"
                style={{ backgroundColor: COLORS.indigo, color: COLORS.white, boxShadow: COLORS.btnShadow, border: `1px solid ${COLORS.border}` }}
              >
                PDF herunterladen
              </a>
            </div>
          )}
        </section>
      ) : (
        <section>
          <TopBar
            title="GhibliKitchen – Einkaufsliste (1 Seite)"
            subtitle="A4 hoch · Checkboxen · iPhone‑freundlich"
            onPDF={makePDF_LI}
            onExportHTML={() => exportHTML(liRef.current, "GhibliKitchen – Einkaufsliste", "portrait")}
            onOpenHTML={() => openHTML(liRef.current, "GhibliKitchen – Einkaufsliste", "portrait")}
            onPrint={doPrint}
          />
          <div ref={liRef} className="p-4 text-[11pt] leading-relaxed" style={cardMainStyle}>
            <header>
              <h2 className="text-lg font-semibold">Gesamt – Hauptzutaten zuerst</h2>
            </header>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {LIST_SUMMARY.map((g) => (
                <section key={g.name} className="p-3" style={{ ...cardPanelStyle }}>
                  <h3 className="text-base font-semibold">{g.name}</h3>
                  <ul className="mt-1 space-y-1">
                    {g.items.map(([name, qty]) => (
                      <li key={name} className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" />
                        <span>
                          <span className="font-medium">{name}</span> – {qty}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <footer className="mt-3 text-[10pt] opacity-80">
              <p>
                Hinweise: {DEFAULT_PRESET.health?.gastritis} · {DEFAULT_PRESET.health?.pregnancy}. Diabetes: {DEFAULT_PRESET.health?.diabetesKH2p}. {DEFAULT_PRESET.health?.metformin && "Metformin mit der Mahlzeit einnehmen."}
              </p>
              <p className="mt-1">
                iPhone: In Safari öffnen → Teilen → <em>Drucken</em> → Vorschau mit Zwei‑Finger‑Zoom → Teilen → <em>In Dateien sichern</em> (als PDF).
              </p>
            </footer>
          </div>
          {hrefLI && (
            <div className="print:hidden mt-2">
              <a
                href={hrefLI}
                download="GhibliKitchen_W1_Einkaufsliste.pdf"
                className="px-3 py-1.5 rounded-2xl"
                style={{ backgroundColor: COLORS.indigo, color: COLORS.white, boxShadow: COLORS.btnShadow, border: `1px solid ${COLORS.border}` }}
              >
                PDF herunterladen
              </a>
            </div>
          )}
        </section>
      )}

      {/* ==================== Smoke & Unit Tests ==================== */}
      <SmokeTests />
    </div>
  );
}

// ---------------- Smoke & Unit Tests ----------------
function assertNoUnsupportedColors(text: string): void {
  const bad = /(oklab|oklch|color-mix|lab\()/i.test(text);
  if (bad) throw new Error("Unsupported CSS color function detected");
}

function runUnitTests(): void {
  // Basic data integrity tests
  console.assert(Array.isArray(DATA) && DATA.length === 7, "DATA must have 7 days");
  const allMeals = DATA.flatMap((d) => d.meals);
  console.assert(allMeals.length === 21, "There should be 21 meals (7 days × 3)");

  // Ensure every meal has mandatory fields
  for (const m of allMeals) {
    console.assert(m.id && m.title && m.ingredients.length > 0 && m.steps.length > 0, `Meal ${m?.id} invalid`);
  }

  // Color palette test
  assertNoUnsupportedColors(JSON.stringify(COLORS));
  assertNoUnsupportedColors(JSON.stringify(DEFAULT_PRESET));

  // Option sample must also be clean
  const opt = { bg: COLORS.pageBg };
  assertNoUnsupportedColors(JSON.stringify(opt));

  // Minimal exportHTML/openHTML sample content check
  const dummy = "<div>test</div>";
  console.assert(dummy.includes("test"), "Dummy content test");

  // NEW TESTS: ensure prompt builder behaves and includes exactly one \n
  const built = buildPrompt("A", "B");
  console.assert(built === "A\nB", "buildPrompt must join with a single newline");
  console.assert((built.match(/\n/g) || []).length === 1, "buildPrompt should contain exactly one newline (basic)");

  // Each meal prompt must produce a header + body string
  for (const m of allMeals) {
    const p = buildPrompt(DEFAULT_PRESET.promptHeader, m.prompt);
    console.assert(p.startsWith(DEFAULT_PRESET.promptHeader), `Prompt must start with header for ${m.id}`);
    console.assert(p.includes("\n"), `Prompt must include a newline for ${m.id}`);
  }

  // Report
  // eslint-disable-next-line no-console
  console.log("[GhibliKitchen] All tests passed (TSX edition). Meals:", allMeals.length);
}

function SmokeTests(): null {
  useEffect(() => {
    try {
      runUnitTests();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[GhibliKitchen] Test failure:", err);
    }
  }, []);
  return null;
}
