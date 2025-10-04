// Datei: Woche-2-2025-10-06.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";

export const meta = { title: "Woche 2", startDate: "2025-10-06", id: "woche-2-2025-10-06" };
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

const PROMPT_HEADER =
  "Ultra-clean cookbook photo, soft daylight, shallow depth, no raw foods, mild Japanese/Korean/Chinese home cooking, pregnancy-safe, diabetes-friendly, gentle for gastritis, steamed/simmered/braised, minimal oil.";

const mealLabel = (id) => {
  const part = id.split("-")[1];
  return part === "f" ? "Frühstück" : part === "m" ? "Mittag" : "Abendessen";
};

// Zusätzliche Titel für Tageszeit (Morgen/Mittag/Abend) und Wochentag
const mealTitle = (id) => {
  const part = id.split("-")[1];
  return part === "f" ? "Morgen" : part === "m" ? "Mittag" : "Abend";
};

const dayLabel = (id) => {
  const d = id.split("-")[0];
  return (
    d === "mo" ? "Montag" :
    d === "di" ? "Dienstag" :
    d === "mi" ? "Mittwoch" :
    d === "do" ? "Donnerstag" :
    d === "fr" ? "Freitag" :
    d === "sa" ? "Samstag" :
    "Sonntag"
  );
};

const buildPrompt = (header, specific) => `${header}\n${specific}`;

// --------- DATA (21 Rezepte) ----------
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Reis-Congee (白粥 / Zhou)",
    desc: "Chinesischer Reisbrei aus der Hausmannskost, sehr bekömmlich; oft zum Frühstück. Inspiriert von Made With Lau & The Woks of Life.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Jasminreis (roh) 120 g",
      "Wasser 1,4 l",
      "Hühnerbrust 240 g",
      "Ingwer in Scheiben 6 g",
      "Frühlingszwiebel (nur Grün, fein) 20 g",
      "Sojasauce natriumarm 1 EL",
      "Sesamöl 1 TL",
      "Salz 1–2 Prisen",
    ],
    steps: [
      "Reis waschen. Mit Wasser und Ingwer aufkochen, dann 50–60 Min. sanft köcheln, bis sämig.",
      "Hühnerbrust in Brühe 12–15 Min. leise ziehen lassen, herausnehmen, zerpflücken, zurückgeben.",
      "Mit Sojasauce und wenig Salz mild abschmecken; Frühlingszwiebel-Grün kurz mitziehen lassen, Sesamöl überträufeln.",
    ],
    checks:
      "Gastritis ✓ mild, warm · Diabetes ✓ ballaststoffarm aber geringe Last – ≈75 g KH · Schwangerschaft ✓ alles durchgegart",
    swaps: "Hühnerbrust → Seelachs; Jasminreis → halb Jasmin/halb Vollkornreis.",
    side: "Lauwarmer Gerstentee oder stilles Wasser.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese rice congee in white bowl, shredded chicken, steam rising, scallion garnish, neutral background"),
  },
  {
    id: "mo-m",
    title: "Udon-Nudelsuppe mit Gemüse (うどん)",
    desc: "Sanfte japanische Udon in klarer Brühe mit weißem Fisch – Alltagsküche. Inspiriert von Just One Cookbook.",
    target: "≈80–90 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Udon (frisch) 400 g",
      "Milde Dashi-Brühe 1,2 l",
      "Karotte in Stiften 120 g",
      "Pak Choi 200 g",
      "Seelachsfilet 240 g",
      "Sojasauce natriumarm 1,5 EL",
      "Mirin (alkoholfrei) 1 EL",
    ],
    steps: [
      "Brühe erhitzen, Karotte 5 Min. leise köcheln.",
      "Pak Choi zugeben und 2–3 Min. ziehen lassen.",
      "Seelachs in Stücken 4–5 Min. sieden bis gar, mit Sojasauce & alkoholfreiem Mirin mild abschmecken, Udon kurz erwärmen.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ⚠︎ Udon höher GI – ≈85 g KH · Schwangerschaft ✓ Fisch durchgegart",
    swaps: "Udon → Soba 300 g (mehr Ballaststoffe); Seelachs → Tofu 250 g.",
    side: "Gurkenstreifen kurz blanchiert.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon noodle soup, white bowl, poached white fish, pak choi and carrot, clear broth"),
  },
  {
    id: "mo-a",
    title: "Sanft geschmorter Tofu mit Shiitake (豆腐香菇煮)",
    desc: "Leicht gebundener chinesischer Tofu-Pilz-Schmorstil, sehr mild. Inspiriert von Omnivore’s Cookbook.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Seidentofu 400 g",
      "Shiitake frisch 160 g",
      "Milde Gemüsebrühe 400 ml",
      "Sojasauce natriumarm 1 EL",
      "Zucker eine Prise (optional) 2 g",
      "Ingwer fein 4 g",
      "Maisstärke 1 TL in Wasser",
      "Sesamöl 1 TL",
    ],
    steps: [
      "Shiitake in Scheiben in wenig Brühe 5 Min. sieden.",
      "Tofu in Würfeln mit restlicher Brühe, Sojasauce, Ingwer 6–8 Min. sanft ziehen lassen.",
      "Mit Stärke leicht binden, Sesamöl einrühren.",
    ],
    checks:
      "Gastritis ✓ sanft · Diabetes ✓ moderat – ≈70 g KH · Schwangerschaft ✓ vegetarisch, alles gegart",
    swaps: "Seidentofu → fester Tofu; Shiitake → Champignons.",
    side: "Weißer Reis (gekocht) 150 g gesamt als Beilage.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Braised tofu with shiitake in light glossy sauce, steaming, served in shallow ceramic plate"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Miso-Suppe mit Ei (味噌汁＋卵全熟)",
    desc: "Klassische Misosuppe mit hartem Ei und Tofu; weißes Miso für Milde. Inspiriert von maff.go.jp & Just One Cookbook.",
    target: "≈60–70 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Milde Dashi-Brühe 900 ml",
      "Weiße Misopaste 1,5 EL",
      "Wakame getrocknet 2 g",
      "Fester Tofu 200 g",
      "Spinat 120 g",
      "Eier 2 Stück (hart gekocht)",
    ],
    steps: [
      "Eier in kochendem Wasser 10–11 Min. hart kochen, pellen.",
      "Brühe erhitzen, Wakame 2 Min. quellen, Tofu & Spinat 2–3 Min. ziehen lassen.",
      "Vom Herd nehmen, Misopaste einrühren; halbierte Eier zugeben.",
    ],
    checks:
      "Gastritis ✓ mild, nicht zu salzig · Diabetes ✓ kaum KH – ≈60 g KH (mit Beilagereis) · Schwangerschaft ✓ Eier hart gekocht, Wakame sparsam",
    swaps: "Spinat → Pak Choi; Tofu → Seelachs 240 g.",
    side: "Kleiner Reis (gekocht) 200 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Miso soup with firm tofu and hard-boiled egg halves, gentle steam, wooden tray"),
  },
  {
    id: "di-m",
    title: "Hühner-Reisbrei mit Kürbis (南瓜鸡粥)",
    desc: "Sämiger Congee mit Kürbis aus der südchinesischen Hausküche. Inspiriert von Red House Spice.",
    target: "≈75–85 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Rundkornreis (roh) 110 g",
      "Wasser 1,3 l",
      "Hühnerbrust 240 g",
      "Hokkaido-Kürbis gewürfelt 220 g",
      "Ingwer in Scheiben 6 g",
      "Sojasauce natriumarm 1 EL",
      "Salz 1 Prise",
    ],
    steps: [
      "Reis mit Wasser & Ingwer aufkochen; 20 Min. leise köcheln.",
      "Kürbiswürfel und Hühnerbrust zugeben, 15–18 Min. sieden bis weich & gar.",
      "Mild mit Sojasauce/Salz abschmecken.",
    ],
    checks:
      "Gastritis ✓ warm & mild · Diabetes ✓ süßer Kürbis beachten – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Huhn → Tofu; Kürbis → Süßkartoffel 180 g.",
    side: "Blanchierte Brokkoliröschen 150 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Pumpkin chicken congee in creamy texture, orange cubes visible, ceramic pot"),
  },
  {
    id: "di-a",
    title: "Japanischer Lachs-Eintopf (石狩鍋・mild)",
    desc: "An Ishikari-nabe angelehnt – Lachs mit Miso-Brühe, hier sehr mild. Inspiriert von Just One Cookbook.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Lachsfilet 260 g",
      "Weißkohl 250 g",
      "Kartoffeln in Stücken 250 g",
      "Zwiebel 60 g (gut gegart)",
      "Milde Miso-Dashi 1,1 l",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Kartoffeln in Brühe 12 Min. sieden.",
      "Kohl & Zwiebel zugeben, weitere 8–10 Min. sanft köcheln.",
      "Lachs in Stücken 5–6 Min. ziehen lassen; mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ mild, Zwiebel weich · Diabetes ✓ Kartoffelmenge moderat – ≈70 g KH · Schwangerschaft ✓ Lachs durchgegart",
    swaps: "Kartoffeln → Tofu-Würfel; Lachs → Kabeljau.",
    side: "Kleiner Reis (gekocht) 120 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Salmon hot pot with cabbage and potatoes in pale miso broth, gentle steam"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Warmer Reisbrei mit Birne & Sesam (お粥)",
    desc: "Japanisch inspirierter Okayu mit Frucht – sanft und cremig. Inspiriert von market/k_ryouri.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 20–25 g p. P.",
    ingredients: [
      "Rundkornreis (roh) 100 g",
      "Wasser 1,2 l",
      "Birne gewürfelt 160 g",
      "Schwarzer Sesam 1 TL",
      "Milch 1,5 % 200 ml (pasteurisiert)",
      "Prise Salz",
    ],
    steps: [
      "Reis mit Wasser aufkochen, 45–50 Min. sanft sämig köcheln.",
      "Birne 5 Min. mitziehen lassen, Milch einrühren, kurz erwärmen.",
      "Mit Sesam und Prise Salz servieren.",
    ],
    checks:
      "Gastritis ✓ mild & warm · Diabetes ✓ Fruchtzucker moderat – ≈70 g KH · Schwangerschaft ✓ Milch pasteurisiert",
    swaps: "Milch → laktosefrei; Birne → Apfel mild.",
    side: "Ungezuckerte Sojamilch warm 150 ml pro Person.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Milky rice porridge with pear cubes, black sesame sprinkle, soft light"),
  },
  {
    id: "mi-m",
    title: "Milder Tori-Zosui (鶏雑炊) – Reis-Eintopf",
    desc: "Zosui ist ein japanischer Reis-Eintopf aus Restreis und Dashi mit Ei. Inspiriert von Just One Cookbook.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Gekochter Reis 300 g",
      "Hühnerbrust 220 g",
      "Milde Dashi-Brühe 900 ml",
      "Karotte fein 100 g",
      "Shiitake 120 g",
      "Ei 2 Stück (voll gestockt)",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Brühe erhitzen, Karotte & Shiitake 6–8 Min. köcheln.",
      "Huhn in dünnen Stücken 6–7 Min. sieden bis gar, Reis zugeben.",
      "Verquirlte Eier einrühren, 1–2 Min. vollständig stocken lassen; mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ sanft · Diabetes ✓ Reis beachten – ≈75 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Reis → halbe Menge Reis + 150 g Tofu; Shiitake → Champignons.",
    side: "Blanchierter Spinat 120 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese chicken rice soup zosui, egg fully set, in earthenware pot"),
  },
  {
    id: "mi-a",
    title: "Koreanischer Kabeljau-Schmortopf (대구맑은탕, mild)",
    desc: "Klare koreanische Fischsuppe ohne Chili – magenfreundlich. Inspiriert von My Korean Kitchen.",
    target: "≈60–70 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Kabeljaufilet 260 g",
      "Rettich (Muu) 200 g",
      "Zucchini 150 g",
      "Frühlingszwiebel 20 g",
      "Milde Anchovy-Kombu-Brühe 1,2 l",
      "Knoblauch fein 4 g (gut gegart)",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Rettichscheiben in Brühe 10 Min. sieden.",
      "Zucchini & Knoblauch 5 Min. mitköcheln.",
      "Kabeljau 5–6 Min. ziehen lassen; Frühlingszwiebel kurz vor Schluss.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ sehr wenig KH – ≈60 g KH (mit kleinem Reis) · Schwangerschaft ✓ Fisch durchgegart, Algen sparsam",
    swaps: "Kabeljau → Seelachs; Rettich → Kohlrabi.",
    side: "Reis (gekocht) 180 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Clear Korean cod soup with radish, mild, no chili, steaming in metal pot"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Gedämpfte Eiermilch mit Garnelen (蒸蛋, mild)",
    desc: "Seidiger chinesischer Eierstich (Zheng Dan) mit gegarten Garnelen. Inspiriert von The Woks of Life.",
    target: "≈60–70 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Wasser oder milde Brühe 300 ml",
      "Garnelen geschält 160 g",
      "Sojasauce natriumarm 1 EL",
      "Sesamöl 1 TL",
      "Frühlingszwiebel-Grün 10 g",
    ],
    steps: [
      "Eier mit Brühe verrühren, durch Sieb gießen.",
      "Formen abdecken, 10–12 Min. sanft dämpfen bis gestockt.",
      "Garnelen obenauf legen, weitere 3–4 Min. dämpfen bis gar; mild würzen.",
    ],
    checks:
      "Gastritis ✓ sehr mild · Diabetes ✓ wenig KH – ≈60 g KH (mit kleinem Reis) · Schwangerschaft ✓ Meeresfrüchte durchgegart",
    swaps: "Garnelen → zarte Hühnerwürfel; Brühe → Wasser.",
    side: "Kleiner Reis 160 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese steamed egg custard with cooked shrimp, silky surface, light sauce"),
  },
  {
    id: "do-m",
    title: "Jjigae mit weichem Tofu & Gemüse (순한 순두부찌개)",
    desc: "Sanfte Version des koreanischen Sundubu-Jjigae ohne Schärfe. Inspiriert von Seon Kyoung Longest.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Weicher Tofu (Sundubu) 400 g",
      "Zucchini 180 g",
      "Zwiebel 50 g (gut gegart)",
      "Anchovy-Dashi mild 900 ml",
      "Kabeljau 240 g",
      "Sojasauce natriumarm 1 EL",
      "Rapsöl 1 TL",
    ],
    steps: [
      "Zwiebel in wenig Öl anschwitzen, mit Brühe auffüllen.",
      "Zucchini 5 Min. sieden, Tofu zugeben.",
      "Kabeljau 5–6 Min. gar ziehen lassen; mild würzen.",
    ],
    checks:
      "Gastritis ✓ mild, ohne Chili · Diabetes ✓ moderat – ≈75 g KH (inkl. Reisbeilage) · Schwangerschaft ✓ Fisch durchgegart",
    swaps: "Kabeljau → Huhn; Zucchini → Pak Choi.",
    side: "Reis (gekocht) 200 g gesamt.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soft tofu stew without chili, white fish pieces, clear broth"),
  },
  {
    id: "do-a",
    title: "Hühner-Schmorgericht mit Daikon (大根鶏の煮物)",
    desc: "Japanisches Nimono – Huhn und Daikon sanft geschmort in Dashi. Inspiriert von market/k_ryouri.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Hähnchenschenkel ohne Haut 300 g",
      "Daikon 300 g",
      "Karotte 120 g",
      "Milde Dashi-Brühe 800 ml",
      "Sojasauce natriumarm 1,5 EL",
      "Mirin alkoholfrei 1 EL",
    ],
    steps: [
      "Daikon & Karotte in Brühe 10 Min. sieden.",
      "Huhn zugeben und 20 Min. sanft schmoren bis zart.",
      "Mild mit Sojasauce und alkoholfreiem Mirin abschmecken.",
    ],
    checks:
      "Gastritis ✓ sanft · Diabetes ✓ moderat – ≈70 g KH · Schwangerschaft ✓ durchgegart",
    swaps: "Huhn → Lachs; Daikon → Kohlrabi.",
    side: "Reis (gekocht) 150 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese nimono chicken with daikon and carrots, light soy broth, earthen bowl"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Warme Sojamilch-Hirse-Suppe (豆乳ときび粥)",
    desc: "Japanisch-angehauchter Frühstücksbrei mit Hirse und Sojamilch. Eigene Ausarbeitung, angelehnt an Okayu-Technik.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 20–25 g p. P.",
    ingredients: [
      "Hirse (roh) 90 g",
      "Wasser 900 ml",
      "Ungesüßte Sojamilch 300 ml",
      "Apfel mild gewürfelt 140 g",
      "Prise Salz",
      "Schwarzer Sesam 1 TL",
    ],
    steps: [
      "Hirse mit Wasser 25–30 Min. sieden bis weich.",
      "Sojamilch einrühren, 3–4 Min. erwärmen.",
      "Apfel kurz mitziehen lassen, mit Salz & Sesam servieren.",
    ],
    checks:
      "Gastritis ✓ weich & warm · Diabetes ✓ Hirse moderat – ≈75 g KH · Schwangerschaft ✓ pasteurisierte Sojamilch",
    swaps: "Hirse → Hafergrütze; Apfel → Birne.",
    side: "Lauwarmes Wasser.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Warm millet porridge with soy milk and apple, steam, rustic bowl"),
  },
  {
    id: "fr-m",
    title: "Gedämpfter Wolfsbarsch mit Ingwer (清蒸鲈鱼, mild)",
    desc: "Kantonesischer Klassiker: Fisch schonend gedämpft mit Ingwer & Soja. Inspiriert von Made With Lau.",
    target: "≈60–70 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Wolfsbarschfilet 260 g",
      "Ingwer in feinen Stiften 6 g",
      "Frühlingszwiebel 15 g",
      "Leichte Sojasauce 1 EL",
      "Wasser 400 ml",
      "Reis (gekocht) 220 g",
    ],
    steps: [
      "Fisch mit Ingwer & Zwiebel auf Teller setzen.",
      "Über Wasserdampf 8–10 Min. dämpfen bis gar.",
      "Mit leichter Sojasauce beträufeln; mit Reis servieren.",
    ],
    checks:
      "Gastritis ✓ gedämpft · Diabetes ✓ wenig KH – ≈65 g KH (inkl. Reis) · Schwangerschaft ✓ Fisch komplett gegart",
    swaps: "Wolfsbarsch → Seelachs/Kabeljau.",
    side: "Gedämpfter Pak Choi 200 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese steamed sea bass fillet with ginger scallion, light soy, clean plate"),
  },
  {
    id: "fr-a",
    title: "Tofu-Gemüse-Nimono (豆腐と野菜の煮物)",
    desc: "Hausgemachtes japanisches Schmorgericht mit Tofu und Gemüse. Inspiriert von Just One Cookbook.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Fester Tofu 350 g",
      "Kartoffeln 220 g",
      "Karotte 120 g",
      "Grüne Bohnen 120 g",
      "Milde Dashi 900 ml",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Kartoffeln & Karotte in Dashi 10–12 Min. sieden.",
      "Tofu & Bohnen zugeben, weitere 6–8 Min. sanft garen.",
      "Mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ Kartoffelmenge moderat – ≈75 g KH · Schwangerschaft ✓ vegetarisch, gekocht",
    swaps: "Kartoffeln → Süßkartoffel; Bohnen → Zuckerschoten.",
    side: "Kleiner Reis 150 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese nimono of tofu and vegetables in light broth, subtle steam"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Zosui mit Lachsflocken (鮭雑炊)",
    desc: "Wärmender Reis-Eintopf mit Lachsflocken – sehr bekömmlich. Inspiriert von Just One Cookbook.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Gekochter Reis 280 g",
      "Lachsfilet 220 g",
      "Milde Dashi-Brühe 900 ml",
      "Karotte 100 g",
      "Erbsen 80 g",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Brühe erhitzen, Karotte & Erbsen 6 Min. sieden.",
      "Lachs 5–6 Min. gar ziehen, grob zerflocken.",
      "Reis zugeben, 2–3 Min. leise köcheln; mild würzen.",
    ],
    checks:
      "Gastritis ✓ sanft · Diabetes ✓ Reis beachten – ≈75 g KH · Schwangerschaft ✓ Lachs durchgegart",
    swaps: "Erbsen → Zucchiniwürfel.",
    side: "Rettichsalat blanchiert, ohne Essig.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese salmon zosui rice soup, flakes of salmon, soft look"),
  },
  {
    id: "sa-m",
    title: "Leichte Minestrone (IT, mild)",
    desc: "Italienische Gemüsesuppe ohne Tomate/Essig, vollkornbetont. Allgemeine Küchenpraxis; sanft angepasst.",
    target: "≈70–85 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Vollkorn-Maccheroni 120 g (roh)",
      "Kartoffel 150 g",
      "Zucchini 150 g",
      "Karotte 120 g",
      "Weiße Bohnen gekocht 200 g",
      "Milde Gemüsebrühe 1,2 l",
    ],
    steps: [
      "Brühe erhitzen, Kartoffel & Karotte 10 Min. sieden.",
      "Zucchini & Bohnen zugeben, 5 Min. köcheln.",
      "Pasta 8–10 Min. sanft garen; mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ ohne Tomate/Essig · Diabetes ⚠︎ Pasta/Bohnen – ≈85 g KH · Schwangerschaft ✓ vegetarisch, gekocht",
    swaps: "Pasta → 90 g; Bohnen → 150 g Tofu.",
    side: "Geriebener milder Hartkäse 10 g p. P. optional.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light Italian minestrone without tomato, wholegrain pasta, clear broth"),
  },
  {
    id: "sa-a",
    title: "Gedämpftes Hühnerfilet mit Reis & Karotte (清蒸鸡配饭)",
    desc: "Chinesisch inspiriertes, sehr mildes Dampfgericht mit Brühe. Inspiriert von The Woks of Life.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Hühnerbrust 280 g",
      "Reis (gekocht) 260 g",
      "Karotte 150 g",
      "Milde Hühnerbrühe 300 ml",
      "Ingwer 4 g",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Karottenscheiben in Brühe 6–8 Min. sieden.",
      "Hühnerbrust über Dampf 12–14 Min. garen; in Scheiben schneiden.",
      "Mit Reis und etwas Brühe servieren; mild würzen.",
    ],
    checks:
      "Gastritis ✓ gedämpft · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Reis → halbe Menge + Blumenkohlreis 200 g.",
    side: "Gedämpfter Brokkoli 180 g.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed chicken breast slices with rice and carrots, clear broth drizzle"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Hafer-Reis-Porridge mit Banane (穀粥)",
    desc: "Getreide-Porridge mit Banane, an japanischen Okayu angelehnt. Eigene Ausarbeitung.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 20–25 g p. P.",
    ingredients: [
      "Haferflocken zart 80 g",
      "Gekochter Reis 150 g",
      "Wasser 800 ml",
      "Banane 140 g",
      "Milch 200 ml",
      "Prise Salz",
    ],
    steps: [
      "Haferflocken mit Wasser 6–8 Min. sieden.",
      "Reis & Milch zugeben, 3–4 Min. sanft köcheln.",
      "Banane in Scheiben kurz erwärmen; mit Prise Salz servieren.",
    ],
    checks:
      "Gastritis ✓ weich & warm · Diabetes ⚠︎ Banane – ≈80 g KH · Schwangerschaft ✓ Milch pasteurisiert",
    swaps: "Banane → Birne; Milch → Sojamilch.",
    side: "Gerösteter schwarzer Sesam 1 TL gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Oat and rice porridge with banana slices, steam, ceramic bowl"),
  },
  {
    id: "so-m",
    title: "Seelachs-Tofu-Topf mit Reisnudeln (鱼豆腐汤)",
    desc: "Chinesisch beeinflusster Leichttopf mit Reisnudeln, Fisch & Tofu. Inspiriert von Omnivore’s Cookbook.",
    target: "≈80–90 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Reisnudeln (breit) 160 g (roh)",
      "Seelachs 240 g",
      "Fester Tofu 200 g",
      "Zucchini 150 g",
      "Milde Gemüsebrühe 1,2 l",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Brühe erhitzen, Zucchini 4–5 Min. sieden.",
      "Reisnudeln darin 6–8 Min. garen.",
      "Fisch & Tofu 5–6 Min. ziehen lassen; mild würzen.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ⚠︎ Reisnudeln – ≈85–90 g KH · Schwangerschaft ✓ Fisch durchgegart",
    swaps: "Reisnudeln → Soba 140 g (roh).",
    side: "Blanchierter Pak Choi 180 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light fish and tofu soup with rice noodles, clear broth, no chili"),
  },
  {
    id: "so-a",
    title: "Chawanmushi-Reisschale (茶碗蒸し＋ご飯)",
    desc: "Japanischer Eierstich (Chawanmushi) komplett gestockt, mit Reis. Inspiriert von Just One Cookbook.",
    target: "≈60–70 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Milde Dashi 320 ml",
      "Shiitake 120 g",
      "Hühnerbrust 200 g",
      "Sojasauce natriumarm 1 EL",
      "Reis (gekocht) 220 g",
    ],
    steps: [
      "Eier mit Dashi verrühren, durch Sieb gießen.",
      "Shiitake in Scheiben und Hühnerwürfel in Schälchen verteilen, Eiermilch darauf.",
      "Abgedeckt 12–15 Min. sanft dämpfen bis vollständig gestockt; mit Reis servieren.",
    ],
    checks:
      "Gastritis ✓ seidig & mild · Diabetes ✓ moderat – ≈65 g KH · Schwangerschaft ✓ Ei/Huhn vollständig gegart",
    swaps: "Huhn → Garnelen; Reis → halbe Menge + Blumenkohlreis.",
    side: "Warmer Grüntee mild (koffeinarm) oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese chawanmushi custard with chicken and mushroom, served alongside small rice bowl"),
  },
];

// --------- Utility: Image persistence ----------
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

// --------- Summaries ----------
const groupMap = {
  protein: ["Hühner", "Huhn", "Hähnchen", "Lachs", "Kabeljau", "Wolfsbarsch", "Garnelen", "Tofu", "Ei", "Eier", "Seelachs", "Hähnchen", "Hühnerbrust", "Hähnchenschenkel"],
  veg: ["Karotte", "Zucchini", "Pak Choi", "Spinat", "Shiitake", "Zwiebel", "Daikon", "Rettich", "Kohl", "Kartoff", "Bohnen", "Brokkoli", "Erbsen", "Birne", "Apfel", "Banane"],
  staple: ["Reis", "Udon", "Soba", "Reisnudeln", "Hirse", "Hafer", "Maccheroni", "Jasmin", "Rundkorn"],
  season: ["Wakame", "Dashi", "Brühe", "Sojasauce", "Sesamöl", "Ingwer", "Mirin", "Salz"],
};

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
  // "Zutat 120 g" -> {name, qty:120, unit:'g'}
  const m = item.match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = normalizeName(m[1]).trim();
  let qty = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  // Normalize liters to ml
  if (unit.toLowerCase() === "l") {
    qty = qty * 1000;
    unit = "ml";
  }
  return { name, qty, unit };
}

function accumulateList(data) {
  const buckets = {
    protein: {},
    veg: {},
    staple: {},
    season: {},
  };
  data.forEach((r) =>
    r.ingredients.forEach((ing) => {
      const q = parseQty(ing);
      if (!q) return;
      const title = q.name;
      const n = normalizeName(title);
      const key = n;
      const add = (b) => {
        buckets[b][key] = buckets[b][key] || { qty: 0, unit: q.unit };
        if (buckets[b][key].unit === q.unit) buckets[b][key].qty += q.qty;
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

// --------- Export helpers ----------
async function ensureScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  await new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
}

function getEmbedCss() {
  return `
  body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;color:${COLORS.text};}
  .page{page-break-after:always;background:${COLORS.pageBg};}
  .avoid-break{break-inside:avoid;}
  .print\\:hidden{display:none;}
  `;
}

// --------- Components ----------
const cardPanelStyle = {
  background: COLORS.panelBG80,
  borderRadius: 18,
  padding: 20,
  boxShadow: COLORS.btnShadow,
  border: `1px solid ${COLORS.border}`,
  marginRight: 16,
};

const cardMainStyle = {
  background: COLORS.white,
  borderRadius: 18,
  padding: 22,
  boxShadow: COLORS.btnShadow,
  border: `1px solid ${COLORS.border}`,
};

function RecipeCard({ r }) {
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={`Rezeptbild hochladen: ${r.title}`} />
          </div>
          {img ? <img src={img} alt={r.title} style={{ width: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /> : null}
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            <div><b>Meal:</b> {mealLabel(r.id)}</div>
            <div><b>Ziel:</b> {r.target}</div>
            <div><b>Checks:</b> {r.checks}</div>
            <div><b>Beilage/Drink:</b> {r.side}</div>
            <div><b>Erinnerung:</b> {r.remind ? "Metformin mit der Mahlzeit" : "—"}</div>
          </div>
        </aside>
        <main style={{ gridColumn: "span 8", ...cardMainStyle }}>
          <div style={{ fontSize: 14, color: COLORS.neutral, marginBottom: 6 }}>
            {dayLabel(r.id)} – {mealTitle(r.id)}
          </div>
          <h2 style={{ fontSize: 24, marginTop: 0, color: COLORS.indigo }}>{r.title}</h2>
          <div style={{ fontSize: 13, color: COLORS.neutral, margin: '6px 0 10px' }}>
            <b>Kurzbeschreibung:</b> {r.desc}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>Zutaten (2 Personen)</h3>
              <ul className="avoid-break">
                {r.ingredients.map((x, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>{x}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>Zubereitung</h3>
              <ol className="avoid-break" style={{ paddingLeft: 18 }}>
                {r.steps.map((s, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>{s}</li>
                ))}
              </ol>
              <div style={{ marginTop: 8, fontSize: 12, color: COLORS.amber }}>
                Alternativen: {r.swaps}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Cookbook() {
  return (
    <div id="cookbook-root">
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              Woche ab {meta.startDate} – CN/JP/KR dominiert, sanfte Garmethoden, salzarm, schwangerschaftssicher.
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="Cover-Bild hochladen" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>Wochenübersicht</h2>
            <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, fontSize: 14 }}>
              {DATA.map((r) => (
                <div key={r.id} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG70 }}>
                  <div style={{ fontWeight: 600, color: COLORS.sky }}>{dayLabel(r.id)}</div>
                  <div>{r.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.neutral }}>{mealTitle(r.id)} · {r.remind ? "Metformin-Reminder" : "ohne Reminder"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {DATA.map((r) => <RecipeCard r={r} key={r.id} />)}
    </div>
  );
}

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
                  {items.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            Hinweise: Sojasauce natriumarm verwenden; Algen (Wakame) sparsam dosieren.
          </div>
        </div>
      </div>
    </div>
  );
}

// --------- Main App with Tabs & Actions ----------
export default function Woche2_2025_10_06() {
  const [tab, setTab] = useState("cookbook");
  const [dlLink, setDlLink] = useState(null);

  const handlePDF = async () => {
    const targetId = tab === "cookbook" ? "cookbook-root" : "list-root";
    const orientation = tab === "cookbook" ? "landscape" : "portrait";
    await exportPDF(targetId, `${FILE_BASE} - ${tab}`, orientation);
    setDlLink(`${FILE_BASE} - ${tab}.pdf`);
  };

  const handleHTML = () => {
    const targetId = tab === "cookbook" ? "cookbook-root" : "list-root";
    exportHTML(targetId, `${FILE_BASE} - ${tab}`);
    setDlLink(`${FILE_BASE} - ${tab}.html`);
  };

  useEffect(() => {
    document.title = UI_TITLES.main;
  }, []);

  const btn = {
    padding: "10px 14px",
    borderRadius: 14,
    background: COLORS.indigo,
    color: COLORS.white,
    boxShadow: COLORS.btnShadow,
    border: "none",
    cursor: "pointer",
  };

  const tabs = [
    { key: "cookbook", label: "Kochbuch" },
    { key: "list", label: "Einkaufsliste" },
  ];

  return (
    <div style={{ background: COLORS.pageBg, color: COLORS.text, minHeight: "100vh" }}>
      <style>{`
        .page{page-break-after:always;}
        .avoid-break{break-inside:avoid;}
        @media print {.print\\:hidden{display:none !important}}
      `}</style>

      <div style={{ position: "sticky", top: 0, zIndex: 10, background: COLORS.pageBg, borderBottom: `1px solid ${COLORS.border}`, padding: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontWeight: 700, color: COLORS.emerald }}>{UI_TITLES.main}</div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }} className="print:hidden">
            <button style={btn} onClick={handlePDF}>PDF erzeugen</button>
            <button style={{ ...btn, background: COLORS.sky }} onClick={handleHTML}>HTML exportieren</button>
            <button style={{ ...btn, background: COLORS.amber }} onClick={() => window.print()}>Drucken</button>
          </div>
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 8 }} className="print:hidden">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                ...btn,
                background: tab === t.key ? COLORS.indigo : COLORS.neutral,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {dlLink ? (
          <div style={{ marginTop: 8, fontSize: 13 }}>
            Download bereit: <span style={{ color: COLORS.indigo }}>{dlLink}</span>
          </div>
        ) : null}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 12 }}>
        {tab === "cookbook" ? <Cookbook /> : <GroceryList />}
      </div>

      <Tests />
    </div>
  );
}

// --------- Tests (Pflicht) ----------
function Tests() {
  useEffect(() => {
    try {
      // 7 Tage * 3 = 21
      if (DATA.length !== 21) throw new Error("DATA length must be 21");
      // Eindeutige IDs
      const ids = new Set(DATA.map((r) => r.id));
      if (ids.size !== 21) throw new Error("IDs not unique");
      // Meal label mapping
      if (mealLabel("xx-f") !== "Frühstück" || mealLabel("xx-m") !== "Mittag" || mealLabel("xx-a") !== "Abendessen")
        throw new Error("mealLabel mapping wrong");
      // Metformin-Logik
      DATA.forEach((r) => {
        const isLunch = /-m$/.test(r.id);
        if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
        if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      });
      // Zutaten/Steps Mindestanzahl
      DATA.forEach((r) => {
        if (!r.ingredients || r.ingredients.length < 5) throw new Error(`ingredients missing for ${r.id}`);
        if (!r.steps || r.steps.length < 3) throw new Error(`steps missing for ${r.id}`);
      });
      // Keine verbotenen CSS-Funktionen
      const cssStrings = JSON.stringify(COLORS);
      ["oklab", "oklch", "lab", "color-mix"].forEach((bad) => {
        if (cssStrings.includes(bad)) throw new Error("Forbidden CSS function in strings");
      });
      // FILE_BASE Regex
      if (!/^Woche 2 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE format invalid");
      // buildPrompt test
      if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
      // Render sanity for LIST_SUMMARY
      const groups = Object.keys(LIST_SUMMARY);
      if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
      console.log("[GhibliKitchen] All tests passed (JSX).");
    } catch (e) {
      console.error("[GhibliKitchen] Test failed:", e.message);
    }
  }, []);
  return null;
}
