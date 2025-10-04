// Datei: Woche-3-2025-10-13.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";

export const meta = { title: "Woche 3", startDate: "2025-10-13", id: "woche-3-2025-10-13" };
const FILE_BASE = "Woche 3 2025-10-13";

const UI_TITLES = {
  main: "GhibliKitchen – Woche 3",
  list: "GhibliKitchen – Einkaufsliste – Woche 3",
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
    title: "Okayu mit Huhn & Lauch (お粥)",
    desc: "Japanischer Reisbrei (Okayu) mit zartem Huhn – sehr bekömmlich und warm. Inspiriert von Just One Cookbook.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Rundkornreis (roh) 100 g",
      "Wasser 1200 ml",
      "Hühnerbrust 220 g",
      "Ingwer in Scheiben 4 g",
      "Frühlingszwiebel (nur Grün) 20 g",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Reis waschen, mit Wasser & Ingwer aufkochen, 45–50 Min. leise sämig köcheln.",
      "Hühnerbrust in Stücken 10–12 Min. in der Porridge-Basis sanft gar ziehen lassen, grob zerpflücken.",
      "Mit Sojasauce mild abschmecken, Lauchgrün kurz mitziehen lassen.",
    ],
    checks:
      "Gastritis ✓ mild & warm · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Huhn → Seelachs 240 g; Reis → 80 g + 80 g Blumenkohlreis (separat).",
    side: "Lauwarmer Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese okayu rice porridge with shredded chicken, scallion garnish, subtle steam"),
  },
  {
    id: "mo-m",
    title: "Soba mit Hähnchen & Gemüse (そば)",
    desc: "Buchweizennudeln in klarer Dashi mit zartem Huhn und Gemüse. Inspiriert von maff.go.jp & Just One Cookbook.",
    target: "≈80–85 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Soba (roh) 140 g",
      "Milde Dashi-Brühe 1000 ml",
      "Hühnerbrust 220 g",
      "Zucchini in Halbmonden 150 g",
      "Karotte in Stiften 120 g",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Dashi erhitzen, Karotte 5 Min. leise sieden.",
      "Zucchini & Huhn zugeben, 6–7 Min. gar ziehen lassen.",
      "Soba separat 4–5 Min. kochen, abspülen, in die Brühe geben; mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ klar & mild · Diabetes ✓ Buchweizen günstiger – ≈82 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Huhn → Tofu 250 g; Soba → Udon 350 g (frisch).",
    side: "Blanchierter Pak Choi 180 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light soba noodle soup with chicken slices, zucchini and carrot in clear broth"),
  },
  {
    id: "mo-a",
    title: "Gedämpfter Kabeljau mit Shiitake & Reis (清蒸鳕鱼)",
    desc: "Sanft gedämpfter Weißfisch mit Pilzen und wenig Soja; klassisch chinesisch. Inspiriert von Made With Lau.",
    target: "≈60–70 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Kabeljaufilet 260 g",
      "Shiitake frisch 150 g",
      "Ingwer in Stiften 6 g",
      "Leichte Sojasauce 1 EL",
      "Reis (gekocht) 200 g",
      "Wasser 400 ml",
    ],
    steps: [
      "Shiitake in wenig Wasser 5 Min. sieden.",
      "Fisch mit Ingwer auf Teller setzen, 8–10 Min. über Dampf garen.",
      "Mit etwas Pilzfond & Sojasauce beträufeln; mit Reis servieren.",
    ],
    checks:
      "Gastritis ✓ gedämpft & mild · Diabetes ✓ eher wenig KH – ≈65 g KH · Schwangerschaft ✓ Fisch vollständig gegart",
    swaps: "Kabeljau → Seelachs; Reis → 150 g + 150 g Blumenkohlreis.",
    side: "Gedämpfter Brokkoli 180 g.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with shiitake, ginger threads, light soy drizzle, white plate, gentle steam"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Miso-Zosui mit Tofu (味噌雑炊)",
    desc: "Japanischer Reis-Eintopf in milder Miso-Dashi mit Tofu & Spinat. Inspiriert von Just One Cookbook.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Gekochter Reis 260 g",
      "Milde Dashi-Brühe 900 ml",
      "Weiße Misopaste 1.5 EL",
      "Fester Tofu 200 g",
      "Spinat 120 g",
      "Wakame getrocknet 1 g",
    ],
    steps: [
      "Dashi erhitzen, Wakame 2 Min. quellen lassen.",
      "Tofu & Spinat 2–3 Min. ziehen lassen, Reis zugeben und leise köcheln.",
      "Vom Herd nehmen, Misopaste einrühren (nicht kochen).",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ moderat – ≈70 g KH · Schwangerschaft ✓ vegetarisch, alles gegart",
    swaps: "Spinat → Pak Choi; Reis → 220 g + 80 g Blumenkohlreis.",
    side: "Kleiner Gurkenblanch (ohne Essig).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese miso zosui rice soup with tofu cubes and spinach, steam rising"),
  },
  {
    id: "di-m",
    title: "Dakjuk – Hühnerreisbrei (닭죽, mild)",
    desc: "Koreanischer Reisbrei mit Huhn, Zucchini & Karotte – sehr bekömmlich. Inspiriert von My Korean Kitchen.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Rundkornreis (roh) 100 g",
      "Wasser 1300 ml",
      "Hühnerbrust 240 g",
      "Zucchini 140 g",
      "Karotte 120 g",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Reis mit Wasser aufkochen, 35–40 Min. sanft sämig köcheln.",
      "Huhn fein würfeln, mit Gemüse 10–12 Min. gar ziehen lassen.",
      "Mit wenig Sojasauce mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ warm & weich · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Huhn → Tofu 250 g; Zucchini → Kohlrabi.",
    side: "Rettichwürfel kurz blanchiert.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean chicken rice porridge dakjuk, creamy texture, diced zucchini and carrot"),
  },
  {
    id: "di-a",
    title: "Schmorfleisch vom Schwein mit Daikon (豚大根の煮物)",
    desc: "Japanisches Nimono mit magerem Schweinefilet und Daikon in milder Dashi. Inspiriert von market/k_ryouri.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Schweinefilet 280 g",
      "Daikon 320 g",
      "Karotte 120 g",
      "Milde Dashi-Brühe 900 ml",
      "Sojasauce natriumarm 1.5 EL",
      "Mirin alkoholfrei 1 EL",
    ],
    steps: [
      "Daikon & Karotte in Dashi 10 Min. sieden.",
      "Schweinefilet in Stücken zugeben, 15–18 Min. sanft schmoren.",
      "Mild mit Sojasauce & alkoholfreiem Mirin abschmecken.",
    ],
    checks:
      "Gastritis ✓ sanft · Diabetes ✓ moderat – ≈70 g KH · Schwangerschaft ✓ Schwein vollständig gegart",
    swaps: "Schwein → Hühnerkeule ohne Haut; Daikon → Kohlrabi.",
    side: "Reis (gekocht) 160 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese nimono with pork and daikon in light broth, homey ceramic bowl"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Süßkartoffel-Okayu (さつまいも粥)",
    desc: "Cremiger Okayu mit Süßkartoffelwürfeln – mild & wärmend. Inspiriert von market/k_ryouri.",
    target: "≈75–85 g KH gesamt (2 P.) · Protein 20–25 g p. P.",
    ingredients: [
      "Rundkornreis (roh) 90 g",
      "Wasser 1200 ml",
      "Süßkartoffel gewürfelt 180 g",
      "Milch 150 ml",
      "Prise Salz",
      "Schwarzer Sesam 1 TL",
    ],
    steps: [
      "Reis mit Wasser aufkochen, 45 Min. sanft sämig köcheln.",
      "Süßkartoffel 10 Min. mitziehen, Milch zugeben und kurz erwärmen.",
      "Mit Sesam & Prise Salz servieren.",
    ],
    checks:
      "Gastritis ✓ weich & warm · Diabetes ⚠︎ Süßkartoffel – ≈80 g KH · Schwangerschaft ✓ Milch pasteurisiert",
    swaps: "Milch → Sojamilch ungesüßt; Süßkartoffel → Kürbis 200 g.",
    side: "Lauwarmes Wasser oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Milky rice porridge with orange sweet potato cubes, soft steam"),
  },
  {
    id: "mi-m",
    title: "Reisnudel-Topf mit Seelachs (鱼片米粉汤)",
    desc: "Chinesisch inspirierte Suppe mit breiten Reisnudeln, zartem Fisch & Zucchini. Inspiriert von Omnivore’s Cookbook.",
    target: "≈80–90 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Reisnudeln (breit) 140 g (roh)",
      "Seelachs 240 g",
      "Milde Gemüsebrühe 1200 ml",
      "Zucchini 150 g",
      "Sojasauce natriumarm 1 EL",
      "Ingwer fein 3 g",
    ],
    steps: [
      "Brühe erhitzen, Zucchini & Ingwer 4–5 Min. sieden.",
      "Reisnudeln darin 6–8 Min. garen.",
      "Fisch in Stücken 5–6 Min. ziehen lassen; mild würzen.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ⚠︎ Reisnudeln – ≈88 g KH · Schwangerschaft ✓ Fisch vollständig gegart",
    swaps: "Reisnudeln → Soba 140 g (roh).",
    side: "Blanchierter Spinat 150 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear soup with wide rice noodles and white fish pieces, gentle steam"),
  },
  {
    id: "mi-a",
    title: "Tori-Tofu-Nabe – Huhn & Tofu im Topf (鶏豆腐鍋)",
    desc: "Leichter japanischer Eintopf mit Huhn, Tofu & Gemüse in Dashi. Inspiriert von Just One Cookbook.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Hühnerbrust 260 g",
      "Fester Tofu 250 g",
      "Weißkohl 220 g",
      "Shiitake 120 g",
      "Milde Dashi-Brühe 1100 ml",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Kohl & Shiitake in Dashi 8–10 Min. sieden.",
      "Huhn 6–8 Min. gar ziehen, Tofu zugeben und 3–4 Min. erwärmen.",
      "Mild mit Sojasauce abschmecken.",
    ],
    checks:
      "Gastritis ✓ sanft · Diabetes ✓ moderat – ≈70 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Huhn → Lachs; Kohl → Pak Choi.",
    side: "Reis (gekocht) 180 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese chicken and tofu hot pot with cabbage and shiitake in light broth"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Gyeran-jjim mit Tofu (계란찜, mild)",
    desc: "Koreanischer gedämpfter Eierstich, seidig und mild – hier mit Tofu. Inspiriert von Mom's Korean Recipes.",
    target: "≈60–70 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Wasser oder milde Brühe 320 ml",
      "Fester Tofu 150 g",
      "Sojasauce natriumarm 1 EL",
      "Reis (gekocht) 180 g",
      "Frühlingszwiebel-Grün 10 g",
    ],
    steps: [
      "Eier mit Flüssigkeit verrühren, durch Sieb gießen.",
      "Abgedeckt 12–14 Min. sanft dämpfen bis vollständig gestockt.",
      "Tofuwürfel 2–3 Min. mitdämpfen; mild würzen und mit Reis servieren.",
    ],
    checks:
      "Gastritis ✓ sehr mild · Diabetes ✓ wenig KH – ≈65 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Tofu → zarte Garnelen 160 g (durchgaren).",
    side: "Gedämpfter Pak Choi 180 g.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean steamed egg custard gyeran-jjim with tofu cubes, silky surface"),
  },
  {
    id: "do-m",
    title: "Janchi-Guksu (잔치국수, mild)",
    desc: "Koreanische Festnudelsuppe ohne Schärfe – klare Anchovy-Dashi, Weizennudeln, Gemüse. Inspiriert von Seon Kyoung Longest.",
    target: "≈80–85 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Feine Weizennudeln (somyeon) 140 g (roh)",
      "Anchovy-Dashi mild 1100 ml",
      "Zucchini in Streifen 140 g",
      "Karotte in Streifen 120 g",
      "Sojasauce natriumarm 1 EL",
      "Ei 2 Stück (voll gestockt)",
    ],
    steps: [
      "Brühe erhitzen, Gemüse 4–5 Min. sieden.",
      "Nudeln 3–4 Min. separat kochen, abspülen, in die Brühe geben.",
      "Verquirlte Eier in der Brühe vollständig stocken lassen; mild würzen.",
    ],
    checks:
      "Gastritis ✓ klar & mild · Diabetes ⚠︎ Weizennudeln – ≈83 g KH · Schwangerschaft ✓ Eier vollständig gegart",
    swaps: "Nudeln → Soba 140 g; Ei → Tofu 150 g.",
    side: "Blanchierte Sojabohnensprossen 180 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean janchi guksu noodle soup, clear broth, vegetable strips, egg fully set"),
  },
  {
    id: "do-a",
    title: "Miso-Lachs mit Napa-Kohl (味噌鍋・mild)",
    desc: "An Nabe angelehnt – Lachs in milder Miso-Dashi mit Chinakohl. Inspiriert von Just One Cookbook.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Lachsfilet 260 g",
      "Chinakohl 300 g",
      "Kartoffeln 220 g",
      "Milde Miso-Dashi 1100 ml",
      "Sojasauce natriumarm 1 EL",
      "Zwiebel 50 g (gut gegart)",
    ],
    steps: [
      "Kartoffeln & Zwiebel in der Brühe 12 Min. sieden.",
      "Chinakohl zugeben und 6–8 Min. sanft köcheln.",
      "Lachs 5–6 Min. gar ziehen lassen; mild abschmecken.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ Kartoffelmenge moderat – ≈70 g KH · Schwangerschaft ✓ Lachs vollständig gegart",
    swaps: "Kartoffeln → Tofu 200 g; Lachs → Kabeljau.",
    side: "Reis (gekocht) 140 g gesamt.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Salmon nabe with napa cabbage and potatoes in pale miso broth, gentle steam"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Hafer-Okayu mit Birne & Sesam (粥)",
    desc: "Weicher Frühstücksbrei aus Hafer & Reis, sanft gesüßt durch Birne. Eigene Ausarbeitung, an Okayu angelehnt.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 20–25 g p. P.",
    ingredients: [
      "Haferflocken zart 80 g",
      "Gekochter Reis 150 g",
      "Wasser 900 ml",
      "Birne gewürfelt 160 g",
      "Milch 180 ml",
      "Schwarzer Sesam 1 TL",
    ],
    steps: [
      "Haferflocken mit Wasser 6–8 Min. sieden.",
      "Reis & Milch zugeben, 3–4 Min. sanft köcheln.",
      "Birne 2–3 Min. erwärmen, mit Sesam servieren.",
    ],
    checks:
      "Gastritis ✓ weich & warm · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ Milch pasteurisiert",
    swaps: "Milch → Sojamilch; Birne → Apfel.",
    side: "Lauwarmes Wasser.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Oat-rice porridge with pear cubes, soft steam, minimalist bowl"),
  },
  {
    id: "fr-m",
    title: "Gedämpftes Hühnerfilet mit Pak Choi & Reis (清蒸鸡)",
    desc: "Chinesisch inspiriertes Dampfgericht – sehr mild, saftig & leicht. Inspiriert von The Woks of Life.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Hühnerbrust 280 g",
      "Pak Choi 220 g",
      "Reis (gekocht) 240 g",
      "Milde Hühnerbrühe 300 ml",
      "Sojasauce natriumarm 1 EL",
      "Ingwer fein 3 g",
    ],
    steps: [
      "Pak Choi 3–4 Min. in Brühe sieden.",
      "Hühnerbrust über Dampf 12–14 Min. garen; in Scheiben schneiden.",
      "Mit Reis & etwas Brühe servieren; mild würzen.",
    ],
    checks:
      "Gastritis ✓ gedämpft · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ Huhn vollständig gegart",
    swaps: "Reis → 180 g + Blumenkohlreis 150 g.",
    side: "Gedämpfte Karotte 150 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed chicken breast slices with pak choi and rice, light broth drizzle"),
  },
  {
    id: "fr-a",
    title: "Tofu-Auberginen-Schmorgericht (茄子豆腐煮)",
    desc: "Zart geschmorte Aubergine mit Tofu in leichter Sojasud – sehr mild. Inspiriert von Omnivore’s Cookbook.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Fester Tofu 350 g",
      "Aubergine 250 g",
      "Milde Gemüsebrühe 800 ml",
      "Sojasauce natriumarm 1 EL",
      "Ingwer fein 3 g",
      "Reis (gekocht) 180 g",
    ],
    steps: [
      "Aubergine in Brühe 8–10 Min. sieden.",
      "Tofu zugeben, weitere 6–8 Min. sanft schmoren.",
      "Mild abschmecken und mit wenig Reis servieren.",
    ],
    checks:
      "Gastritis ✓ weich & mild · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ vegetarisch, alles gegart",
    swaps: "Aubergine → Zucchini; Reis → 140 g + Blumenkohlreis.",
    side: "Gedämpfter Spinat 150 g.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Braised tofu with eggplant in light soy broth, home-style, gentle steam"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Apfel-Zimt-Reisbrei (リンゴ粥, mild)",
    desc: "Sanfter Okayu mit Apfelwürfeln und einer Spur Zimt – ohne Zuckerzusatz. Eigene Ausarbeitung.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 20–25 g p. P.",
    ingredients: [
      "Rundkornreis (roh) 95 g",
      "Wasser 1200 ml",
      "Apfel gewürfelt 160 g",
      "Milch 150 ml",
      "Prise Zimt",
      "Prise Salz",
    ],
    steps: [
      "Reis mit Wasser aufkochen, 45–50 Min. sanft sämig köcheln.",
      "Apfelwürfel 5 Min. mitziehen lassen.",
      "Milch einrühren, kurz erwärmen; mit Zimt hauchdünn bestäuben.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ Milch pasteurisiert",
    swaps: "Milch → Sojamilch; Apfel → Birne.",
    side: "Lauwarmer Grüntee koffeinarm.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Apple rice porridge okayu, tiny dusting of cinnamon, steam rising"),
  },
  {
    id: "sa-m",
    title: "Vollkorn-Risotto bianco (IT, mild)",
    desc: "Leichtes italienisches Risotto ohne Wein/Tomate, vollkornbetont, sehr mild. Allgemeine Küchenpraxis.",
    target: "≈80–85 g KH gesamt (2 P.) · Protein 20–25 g p. P.",
    ingredients: [
      "Vollkorn-Risottoreis (roh) 120 g",
      "Milde Gemüsebrühe 1000 ml",
      "Zucchini gewürfelt 200 g",
      "Zwiebel 40 g (gut gegart)",
      "Olivenöl 1 TL",
      "Hartkäse mild gerieben 20 g",
    ],
    steps: [
      "Zwiebel in 1 TL Öl glasig dünsten, Reis zugeben und kurz rühren.",
      "Nach und nach Brühe angießen und sanft garen (20–25 Min.).",
      "Zucchini 8 Min. mitgaren, zum Schluss mild abschmecken & etwas Käse unterziehen.",
    ],
    checks:
      "Gastritis ✓ ohne Säure/Wein · Diabetes ⚠︎ Reis – ≈83 g KH · Schwangerschaft ✓ Käse pasteurisiert verwenden",
    swaps: "Reis 100 g → KH-sparender; Käse weglassen.",
    side: "Blanchierter grüne Bohnen 160 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light wholegrain risotto in shallow bowl, pale and creamy, zucchini cubes"),
  },
  {
    id: "sa-a",
    title: "Doenjang-Guk mit Tofu & Zucchini (된장국, mild)",
    desc: "Koreanische Sojabohnenpasten-Suppe, sehr sanft, mit Tofu – ohne Chili. Inspiriert von My Korean Kitchen.",
    target: "≈65–75 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Doenjang mild 1 EL",
      "Anchovy-Kombu-Brühe 1100 ml",
      "Fester Tofu 250 g",
      "Zucchini 180 g",
      "Zwiebel 50 g (gut gegart)",
      "Reis (gekocht) 180 g",
    ],
    steps: [
      "Brühe erhitzen, Doenjang darin lösen.",
      "Zwiebel & Zucchini 6–8 Min. sieden.",
      "Tofu 3–4 Min. ziehen lassen; mit Reis servieren.",
    ],
    checks:
      "Gastritis ✓ mild · Diabetes ✓ moderat – ≈70 g KH · Schwangerschaft ✓ vegetarisch, alles gegart",
    swaps: "Zucchini → Pilze; Reis → 140 g + Blumenkohlreis.",
    side: "Gurkenscheiben kurz blanchiert.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean doenjang soup with tofu and zucchini in clear light broth"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Okayu mit Lachsflocken (鮭おかゆ)",
    desc: "Wärmender Reisbrei mit gegarten Lachsflocken – salzarm & mild. Inspiriert von Just One Cookbook.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Rundkornreis (roh) 95 g",
      "Wasser 1200 ml",
      "Lachsfilet 220 g",
      "Sojasauce natriumarm 1 EL",
      "Frühlingszwiebel (nur Grün) 15 g",
    ],
    steps: [
      "Reis mit Wasser 45–50 Min. leise sämig köcheln.",
      "Lachs 5–6 Min. in separater Brühe sieden, grob zerflocken.",
      "Lachs und etwas Sojasauce in den Brei geben, Lauchgrün kurz mitziehen lassen.",
    ],
    checks:
      "Gastritis ✓ warm & mild · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ Lachs vollständig gegart",
    swaps: "Lachs → Seelachs; Sojasauce → 0,5 EL + Prise Salz.",
    side: "Gerstentee oder stilles Wasser.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Milky okayu with flakes of cooked salmon, gentle steam, white bowl"),
  },
  {
    id: "so-m",
    title: "Kongnamul-Gukbap (콩나물국밥, mild)",
    desc: "Koreanische Bohnensprossen-Reissuppe – leicht & wärmend, ohne Schärfe. Inspiriert von Mom's Korean Recipes.",
    target: "≈70–85 g KH gesamt (2 P.) · Protein 20–30 g p. P.",
    ingredients: [
      "Gekochter Reis 260 g",
      "Anchovy-Dashi mild 1100 ml",
      "Sojabohnensprossen 200 g",
      "Zucchini 120 g",
      "Ei 2 Stück (voll gestockt)",
      "Sojasauce natriumarm 1 EL",
    ],
    steps: [
      "Brühe erhitzen, Sprossen & Zucchini 6–7 Min. sieden.",
      "Reis zugeben und 2–3 Min. leise köcheln.",
      "Verquirlte Eier einrühren und vollständig stocken lassen; mild würzen.",
    ],
    checks:
      "Gastritis ✓ klar & mild · Diabetes ✓ moderat – ≈80 g KH · Schwangerschaft ✓ Eier vollständig gegart",
    swaps: "Ei → Tofu 150 g; Reis → 220 g + Blumenkohlreis.",
    side: "Blanchierter Pak Choi 160 g.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean bean sprout soup with rice, egg fully set, clear broth"),
  },
  {
    id: "so-a",
    title: "Oyakodon (親子丼, mild, Ei voll gestockt)",
    desc: "Japanische Huhn-Ei-Reisschale – hier sehr mild und vollständig gestockt. Inspiriert von Just One Cookbook.",
    target: "≈70–80 g KH gesamt (2 P.) · Protein 25–35 g p. P.",
    ingredients: [
      "Hühnerbrust 260 g",
      "Zwiebel 60 g (gut gegart)",
      "Milde Dashi-Brühe 300 ml",
      "Sojasauce natriumarm 1.5 EL",
      "Ei 3 Stück (voll gestockt)",
      "Reis (gekocht) 240 g",
    ],
    steps: [
      "Zwiebel in Dashi 6–8 Min. weich sieden.",
      "Huhn zugeben und 6–7 Min. gar ziehen lassen, mild würzen.",
      "Verquirlte Eier zugeben und vollständig stocken lassen; auf Reis servieren.",
    ],
    checks:
      "Gastritis ✓ weich & mild · Diabetes ✓ moderat – ≈75 g KH · Schwangerschaft ✓ Ei/Huhn vollständig gegart",
    swaps: "Reis → 200 g + Blumenkohlreis; Huhn → Lachs.",
    side: "Gedämpfter Spinat 150 g.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Oyakodon chicken and egg rice bowl, eggs fully set, glossy but firm"),
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
  protein: ["Hühner", "Huhn", "Hähnchen", "Lachs", "Kabeljau", "Wolfsbarsch", "Garnelen", "Tofu", "Ei", "Eier", "Seelachs", "Schwein", "Schweinefilet"],
  veg: ["Karotte", "Zucchini", "Pak Choi", "Spinat", "Shiitake", "Zwiebel", "Daikon", "Rettich", "Kohl", "Chinakohl", "Kartoff", "Bohnen", "Brokkoli", "Erbsen", "Birne", "Apfel", "Banane", "Süßkartoffel", "Aubergine"],
  staple: ["Reis", "Udon", "Soba", "Reisnudeln", "Hirse", "Hafer", "Maccheroni", "Jasmin", "Rundkorn", "Risottoreis", "Weizennudeln"],
  season: ["Wakame", "Dashi", "Brühe", "Sojasauce", "Sesamöl", "Ingwer", "Mirin", "Salz", "Doenjang", "Anchovy"],
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
  const m = item.match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = normalizeName(m[1]).trim();
  let qty = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
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
export default function Woche3_2025_10_13() {
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
      if (!/^Woche 3 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE format invalid");
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