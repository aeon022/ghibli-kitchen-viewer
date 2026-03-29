// Datei: Woche-4-2025-10-20.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data"; // ← Direkt, ohne Overrides

export const meta = {
  title: "Woche 4",
  startDate: "2025-10-20",
  id: "woche-4-2025-10-20",
  lang: "de",
  sidebar: "[DE] Woche 4 (2025-10-20)",
};
const FILE_BASE = "Woche 4 2025-10-20";

const UI_TITLES = {
  main: "Moving Kitchen Tales – Woche 4",
  list: "Moving Kitchen Tales – Einkaufsliste – Woche 4",
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

// ---------- DATA (21 Rezepte) ----------
export const DATA = [
  // Montag
  {
    id: "mo-f",
    title: "Reisbrei mit Lachs & Seidentofu (お粥)",
    desc: "Japanischer Okayu – sanfter Reisbrei mit gedämpftem Lachs und Seidentofu; inspiriert von Just One Cookbook.",
    story: "Okayu stammt aus Japan und wird traditionell zum Frühstück oder bei Erkältungen gegessen. Besonders beliebt in der kühlen Jahreszeit – ideal für ruhige Wintermorgen und sanfte Starts.",
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
      "Tofu zugeben, mit Ingwer/Sojasauce mild abschmecken, Lauchgrün kurz ziehen lassen.",
    ],
    checks: "Gastritis – mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm",
    swaps: "Seidentofu ↔ fester Tofu; Lachs ↔ Kabeljau; Alternative Rezepte: Gyudon (牛丼, mageres Rind) oder Buta no Shōgayaki (豚の生姜焼き, mageres Schwein) – mit kleinem Reisanteil.",
    side: "Warmer Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu cubes, scallions, steam rising"),
  },
  {
    id: "mo-m",
    title: "Mildes Bibimbap (비빔밥) – Chili optional",
    desc: "Koreanische Reisschale mit Gemüse und Rind; Chili separat optional – inspiriert von My Korean Kitchen.",
    story: "Bibimbap hat seine Wurzeln in Korea und ist ein Alltagsgericht für jede Saison. Warm serviert ist es ideal für Mittage und ausgewogene Feierabend-Bowls ohne Schärfe.",
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
      "Reis garen; Gemüse dünsten bzw. kurz in wenig Öl anbraten.",
      "Hack krümelig und vollständig durchgaren; mild würzen.",
      "Alles anrichten, Eier vollständig braten (Eigelb fest).",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest, Fleisch durchgegart",
    swaps: "Rinderhack ↔ Putenhack; Vollkornreis ↔ Sushireis; Alternative Rezepte: Gyudon (Rind, mild) oder Butadon (豚丼, Schwein) – Sauce natriumarm.",
    side: "Chili separat in Minischälchen.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top"),
  },
  {
    id: "mo-a",
    title: "Mildes Mapo-Tofu (麻婆豆腐) – Chili optional",
    desc: "Chinesischer Klassiker in milder, miso-basierter Sauce; Chili optional separat – inspiriert von Omnivore’s Cookbook.",
    story: "Mapo-Tofu stammt aus Sichuan; diese milde Hausmannskost-Version ist in vielen Regionen Chinas beliebt. Ein unkompliziertes Feierabendrezept – angenehm wärmend, ohne Schärfe.",
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
      "Reis garen; Pilze dünsten.",
      "Brühe mit Miso/Sojasauce erhitzen; Tofu 4–5 Min. ziehen lassen.",
      "Mit Stärke leicht binden, über Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Brauner Reis ↔ weißer Reis; Miso ↔ milde Bohnenpaste; Alternative Rezepte: Mapo mit magerem Schweinehack (ohne Chili) oder Rind-Tofu-Pfanne (mild).",
    side: "Gedünsteter Pak Choi.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes"),
  },

  // Dienstag
  {
    id: "di-f",
    title: "Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)",
    desc: "Reisbälle mit gekochtem Lachs und milde Misosuppe; inspiriert von Just One Cookbook.",
    story: "Onigiri gehören zur japanischen Bento-Kultur und sind das ganze Jahr über beliebt. Zusammen mit Misosuppe ein leichtes Frühstück oder Snack – ideal für unterwegs und milde Morgen.",
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
      "Reis kochen, Onigiri formen; Lachs gegart zerzupfen und füllen; mit Nori umwickeln.",
      "Miso in heißem Wasser lösen (nicht kochen), Tofu/Wakame kurz ziehen lassen.",
      "Mit wenig Sojasauce abschmecken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Lachs durchgegart, Wakame sparsam",
    swaps: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Seelachs; Alternative Rezepte: Buta Soboro Don (Schweinehack-Reisschale, mild) oder Gyudon (Rind, mager).",
    side: "Milder grüner Tee (optional koffeinfrei).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame"),
  },
  {
    id: "di-m",
    title: "Reisnudelpfanne mit Hähnchen (河粉)",
    desc: "Chinesische Wokpfanne, mild und gemüsebetont; inspiriert von The Woks of Life.",
    story: "Angelehnt an kantonesische Ho-Fun-Gerichte aus Südchina. Ein schnelles Pfannengericht für jede Jahreszeit – ideal, wenn es fix gehen soll und trotzdem ausgewogen bleibt.",
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
      "Reisnudeln einweichen/blanchieren.",
      "Hähnchenstreifen in wenig Öl vollständig garen.",
      "Gemüse zufügen, mild würzen und schwenken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu; Alternative Rezepte: Pho Xao Bo (Rind-Reisnudelpfanne, mild) oder Schweinefilet-Pfanne mit Pak Choi (mild).",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"),
  },
  {
    id: "di-a",
    title: "Doenjang-Jjigae mit Gerste (된장찌개)",
    desc: "Koreanischer Sojabohnen-Eintopf, herzhaft-mild; inspiriert von Seon Kyoung Longest.",
    story: "Doenjang-Jjigae ist ein koreanischer Alltags-Eintopf, besonders beliebt in Herbst und Winter. Kräftig, aber mild – perfekt für gemütliche Abende.",
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
      "Tofuwürfel zugeben und ziehen lassen.",
      "Gerste separat garen und dazu reichen.",
    ],
    checks: "Gastritis – herzhaft, nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust; Alternative Rezepte: Tonjiru (豚汁, Schweinemiso-Suppe, mild) oder Sukiyaki-Style Rind-Gemüse-Topf (zuckerarm).",
    side: "Mildes Gurken-Pickle (ohne Schärfe).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"),
  },

  // Mittwoch
  {
    id: "mi-f",
    title: "Kürbis-Juk mit Tofu & Edamame (단호박죽)",
    desc: "Samtiger Kürbisreisbrei, proteinreich; inspiriert von Mom’s Korean Recipes.",
    story: "Dieser Reisbrei kommt aus Korea und nutzt saisonalen Kürbis im Herbst. Mild und cremig – ideal für kühle Morgen oder leichte Abendmahlzeiten.",
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
      "Mild abschmecken.",
    ],
    checks: "Gastritis – weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel; Alternative Rezepte: Gyudon (Rind, mager) oder Buta no Shōgayaki (Schwein, mager).",
    side: "Warmer Reis- oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"),
  },
  {
    id: "mi-m",
    title: "Udon-Suppe mit Huhn & Brokkoli (うどん)",
    desc: "Japanische Nudelsuppe, klar und mild; inspiriert von Just One Cookbook.",
    story: "Leichte Udon-Brühen sind in Japan ganzjährig beliebt, besonders in den kühlen Monaten. Eine sanfte, sättigende Mittagsoption ohne Schärfe.",
    target: "≈79 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 200 g",
      "Zwiebel 60 g",
      "Miso hell 25 g",
      "Wasser 1000 ml",
      "Sojasauce natriumarm 15 ml",
    ],
    steps: [
      "Brühe mit Miso/Sojasauce erhitzen.",
      "Hähnchen 6–8 Min. gar ziehen; Gemüse 3–4 Min. mitgaren.",
      "Udon separat kochen, abspülen und zugeben.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu; Alternative Rezepte: Niku Udon (Rind) oder Buta Udon (Schwein), jeweils mild.",
    side: "Kleine Schale Gurke.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth"),
  },
  {
    id: "mi-a",
    title: "Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis",
    desc: "Chinesisch dämpfen – zart & bekömmlich; inspiriert von Made With Lau.",
    story: "Das sanfte Dämpfen ist ein Klassiker der kantonesischen Küche. Ein leichtes, schonendes Abendessen – ideal, wenn es bekömmlich sein soll.",
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
    checks: "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis; Alternative Rezepte: Buta no Shōgayaki (Schweine-Ingwer-Pfanne) oder Rinderstreifen mit Ingwer, jeweils mild.",
    side: "Gedünsteter Brokkoli.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"),
  },

  // Donnerstag
  {
    id: "do-f",
    title: "Tamagoyaki & Misosuppe mit kleinem Reis (卵焼き・味噌汁)",
    desc: "Japanisches Frühstück mit vollständig gestocktem Omelett; inspiriert von Just One Cookbook.",
    story: "Tamagoyaki ist ein japanischer Frühstücksklassiker und beliebt in Bento-Boxen. Mit Misosuppe ein ausgewogener, milder Start in jeden Tag.",
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
      "Reis garen. Omelett vollständig stocken.",
      "Misosuppe ansetzen; Tofu/Wakame kurz ziehen lassen.",
      "Mit Frühlingszwiebel servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel; Alternative Rezepte: Niku Udon (Rind, mild) als herzhaftes Frühstück.",
    side: "Warmer Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"),
  },
  {
    id: "do-m",
    title: "Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis",
    desc: "Chinesisches Hausgericht, mild-säuerlich; inspiriert von The Woks of Life.",
    story: "Fànqié Chǎo Dàn ist ein bekanntes chinesisches Hausmannskost-Gericht, besonders mit reifen Sommer-Tomaten. In milder Form ein schneller Klassiker für jeden Wochentag.",
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
      "Reis garen; Eier vollständig stocken.",
      "Tomaten mit Zwiebel sanft schmoren; Tofu zugeben.",
      "Mild abschmecken, mit Reis servieren.",
    ],
    checks: "Gastritis – milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest",
    swaps: "Tofu ↔ Putenbrustwürfel; Reis ↔ Vollkornreis; Alternative Rezepte: Qingjiao-Rousi (青椒肉丝, Schweinefilet-Paprika, mild) oder Rind-Paprika-Pfanne (mild).",
    side: "Gedämpfter Pak Choi.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"),
  },
  {
    id: "do-a",
    title: "Bulgogi-Style Pute (불고기) & Vollkornreis – mild",
    desc: "Koreanisch inspiriertes Pfannengericht; mild, Chili optional separat – inspiriert von Maangchi.",
    story: "Bulgogi stammt aus Korea; die Pfannenvariante ist ganzjährig beliebt. Mild mariniert und kurz gebraten – ideal für familienfreundliche Abendessen ohne Schärfe.",
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
      "Pute mit Sojasauce/Birne/Knoblauch 15 Min. marinieren.",
      "In wenig Öl zügig durchgaren.",
      "Gemüse kurz mitgaren, mit Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis; Alternative Rezepte: Bulgogi mit Rind (mager) oder mildes Schweine-Bulgogi (ohne Schärfe).",
    side: "Salatgurke natur.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"),
  },

  // Freitag
  {
    id: "fr-f",
    title: "Hühner-Congee (鸡肉粥)",
    desc: "Chinesischer Reisbrei mit zartem Huhn – sanft & wärmend; inspiriert von The Woks of Life.",
    story: "Congee ist in Südchina und Südostasien ein klassisches Frühstück und Nachtessen. Wärmend und leicht – ideal für Regentage und ruhige Morgen.",
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
    swaps: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis; Alternative Rezepte: Schweine-Congee (mageres Schwein) oder Rind-Congee (mageres Rind), jeweils mild.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"),
  },
  {
    id: "fr-m",
    title: "Leichte Minestrone (IT) mit Tofu",
    desc: "Italienischer Gemüseeintopf, lange geköchelt und mild.",
    story: "Minestrone ist eine italienische Gemüsesuppe, häufig im Spätsommer bis Herbst. Diese leichte Variante passt zu entspannten Abenden und wärmt ohne zu beschweren.",
    target: "≈69 g KH gesamt (2 P.) · Protein ≈39 g p. P.",
    ingredients: [
      "Vollkornpasta (trocken) 60 g",
      "Cannellini-Bohnen (abgetropft) 200 g",
      "Karotte 150 g",
      "Stangensellerie 100 g",
      "Tomaten (passiert) 250 ml",
      "Zucchini 150 g",
      "Gemüsebrühe 800 ml",
      "Olivenöl 10 ml",
      "Parmesan (pasteurisiert, optional) 20 g",
      "Tofu fest 300 g",
    ],
    steps: [
      "Gemüse in wenig Öl anschwitzen, mit Brühe/Passata 20–25 Min. köcheln.",
      "Tofu/Bohnen zugeben, 5 Min. ziehen lassen.",
      "Pasta separat kochen, zum Schluss einrühren.",
    ],
    checks: "Gastritis – lange geköchelt · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ pasteurisierter Käse optional",
    swaps: "Tofu ↔ Hähnchenwürfel; Vollkornpasta ↔ Gerste; Alternative Rezepte: Yasai-Itame mit Schweinefilet (mild) oder Rind-Gemüse-Pfanne (mild).",
    side: "Kräutertee (warm).",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, few wholegrain pasta pieces"),
  },
  {
    id: "fr-a",
    title: "Gebackener Lachs Teriyaki (照り焼き) mit Brokkoli & Reis",
    desc: "Japanisch inspiriert, natriumarme Sauce, im Ofen gegart; inspiriert von Just One Cookbook.",
    story: "Teriyaki ist eine japanische Zubereitungsart für schnelle Alltagsgerichte. Aus dem Ofen besonders unkompliziert – ideal für kühlere Abende mit wenig Aufwand.",
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
      "Sauce anrühren (Sojasauce + wenig Mirin/Honig + Ingwer).",
      "Lachs bestreichen; 12–14 Min. bei 200 °C backen.",
      "Reis und gedämpften Brokkoli servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈75 g KH (Süße minimal) · Schwangerschaft ✓ Lachs durchgegart",
    swaps: "Reis ↔ Vollkornreis; Brokkoli ↔ Pak Choi; Alternative Rezepte: Buta no Shōgayaki (Schwein, mild) oder Teriyaki-Rinderstreifen (mager).",
    side: "Warmer Grüntee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice"),
  },

  // Samstag
  {
    id: "sa-f",
    title: "Yudofu-Schale (湯豆腐) mit kleinem Reis",
    desc: "Japanischer Tofu im heißen Sud, sehr bekömmlich.",
    story: "Yudofu ist eine Spezialität aus Kyoto und wird traditionell im Winter serviert. Leicht, warm und beruhigend – ideal für ruhige Wochenendmorgen.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Tofu fest 400 g",
      "Gemüsebrühe 800 ml",
      "Lauch 100 g",
      "Spinat 150 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 15 ml",
      "Sesam 10 g",
    ],
    steps: [
      "Brühe erhitzen; Tofuwürfel 5–6 Min. ziehen lassen.",
      "Lauch/Spinat kurz mitgaren.",
      "Mit wenig Sojasauce servieren; Reis separat.",
    ],
    checks: "Gastritis – sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Reis ↔ Vollkornreis; Spinat ↔ Pak Choi; Alternative Rezepte: Niku Udon (Rind, mild) oder Buta Udon (Schwein, mild).",
    side: "Wasser oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Yudofu in a clay pot with leeks and spinach, small rice bowl"),
  },
  {
    id: "sa-m",
    title: "Japchae mit Rind & Gemüse (잡채) – mild",
    desc: "Koreanische Glasnudeln mit viel Gemüse; mild, Chili optional separat – inspiriert von Maangchi.",
    story: "Japchae ist in Korea ein Festtagsgericht, wird aber auch im Alltag gern gegessen. Lauwarm oder bei Zimmertemperatur – perfekt für Buffets, Picknicks und Wochenendessen.",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Glasnudeln (Süßkartoffel, trocken) 80 g",
      "Rindfleisch mager (Streifen) 220 g",
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
      "Fleisch/Gemüse in wenig Öl gar braten, würzen.",
      "Nudeln untermischen, kurz erwärmen.",
    ],
    checks: "Gastritis – mild gewürzt · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ Fleisch durchgegart",
    swaps: "Rind ↔ Tofu; Glasnudeln ↔ Reisnudeln; Alternative Rezepte: Japchae mit Schweinefilet (mild) oder Chow Fun mit Rind (mild).",
    side: "Sesam-Gurkenscheiben (mild).",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with colorful vegetables and beef strips, glossy but not oily"),
  },
  {
    id: "sa-a",
    title: "Shiitake-Hähnchen-Schmorgericht (香菇鸡) & kleiner Reis",
    desc: "Chinesisches Schmorgericht – zart und aromatisch; inspiriert von Red House Spice.",
    story: "Diese milde Schmorpfanne ist klassische chinesische Hausküche und passt gut in Herbst und Winter. Aromenreich und dennoch bekömmlich – ideal für Sonntagsessen im kleinen Kreis.",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈33 g p. P.",
    ingredients: [
      "Hähnchenschenkel (ohne Haut) 300 g",
      "Shiitake 200 g",
      "Karotte 120 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 25 ml",
      "Ingwer 10 g",
      "Gemüsebrühe 300 ml",
    ],
    steps: [
      "Hähnchen mild anrösten, mit Brühe ablöschen.",
      "Shiitake/Karotte zugeben, 20–25 Min. schmoren.",
      "Mit Reis servieren.",
    ],
    checks: "Gastritis – geschmort, mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Hähnchen durchgegart",
    swaps: "Hähnchen ↔ Tofu; Reis ↔ Vollkornreis; Alternative Rezepte: Schweinefilet-Schmorpfanne mit Shiitake (mild) oder Rind-Schmorpfanne (mager).",
    side: "Gedämpfter Pak Choi oder Brokkoli.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised chicken with shiitake and carrots, small rice serving"),
  },

  // Sonntag
  {
    id: "so-f",
    title: "Reisbrei mit Apfel & Tofuwürfeln (お粥)",
    desc: "Sanfter Süß-Reisbrei mit fruchtiger Note; inspiriert von Okayu.",
    story: "Inspiriert von japanischem Okayu, hier leicht süß mit Apfel. Passt gut zur Apfelernte und ist ein sanftes, warmes Frühstück für kühle Tage.",
    target: "≈80 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Apfel 150 g",
      "Wasser 1000 ml",
      "Zimt 1 Prise",
      "Tofu fest 300 g",
    ],
    steps: [
      "Reis mit Wasser 30 Min. sanft kochen.",
      "Apfelwürfel 5 Min. ziehen lassen.",
      "Tofuwürfel zugeben, mild abschmecken.",
    ],
    checks: "Gastritis – mild & warm · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Apfel ↔ Birne; Tofu ↔ Skyr (pasteurisiert); Alternative Rezepte: Statt süßem Brei besser Gyudon/Butadon als herzhaftes Alternativgericht.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy rice porridge with small apple cubes and tofu, neutral bowl, steam"),
  },
  {
    id: "so-m",
    title: "Klarer Nudeltopf mit Pute (清汤面)",
    desc: "Chinesisch inspiriert, klare Brühe und zarte Pute; inspiriert von Made With Lau.",
    story: "Klare Nudelsuppen sind in China ein beliebtes Alltagsgericht – besonders in der Erkältungszeit. Leicht und schnell: ideal fürs Mittagsessen.",
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
      "Brühe erhitzen; Pute 8–10 Min. gar ziehen.",
      "Gemüse 3–4 Min. mitgaren.",
      "Nudeln kochen, abspülen, zugeben und mild würzen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps: "Weizennudeln ↔ Reisnudeln; Pute ↔ Tofu; Alternative Rezepte: Niku Udon (Rind, klar) oder Buta Udon (Schwein, klar).",
    side: "Lauwarmes Wasser.",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear noodle soup with turkey slices, pak choi and carrots"),
  },
  {
    id: "so-a",
    title: "Seelachs-Jorim – mild geschmort (명태조림) & Reis",
    desc: "Koreanischer Schmor-Fisch mit Rettich; mild, Chili optional separat.",
    story: "Jorim-Gerichte kommen aus Korea und werden oft in den kühleren Monaten zubereitet. Mit mildem Rettich und Seelachs ein sanftes Alltagsgericht für den Abend.",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Seelachsfilet (Alaska Pollock) 320 g",
      "Rettich (Daikon) 250 g",
      "Zwiebel 60 g",
      "Doenjang 20 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 500 ml",
      "Reis (roh) 90 g",
      "Sesamöl 8 ml",
    ],
    steps: [
      "Rettich in Wasser + Doenjang 10 Min. sanft köcheln.",
      "Seelachs 8–10 Min. mild schmoren.",
      "Mit Sesamöl abrunden; mit Reis servieren.",
    ],
    checks: "Gastritis – geschmort, mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Seelachs durchgegart, quecksilberarm",
    swaps: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis; Alternative Rezepte: Buta no Shōgayaki (Schwein, mild) oder Rinderstreifen-Schmorgericht (mild).",
    side: "Gedämpfter Spinat.",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild braised pollock with daikon in light brown sauce, small rice bowl"),
  },
];

// ---------- Wochenübersicht Helper ----------
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = { mo: "Montag", di: "Dienstag", mi: "Mittwoch", do: "Donnerstag", fr: "Freitag", sa: "Samstag", so: "Sonntag" };
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  arr.forEach((r) => map[r.id.split("-")[0]].push(r));
  Object.values(map).forEach((list) => list.sort((a, b) => ["f", "m", "a"].indexOf(a.id.split("-")[1]) - ["f", "m", "a"].indexOf(b.id.split("-")[1])));
  return map;
};

// ---------- List Summary ----------
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
const groupMap = {
  protein: ["Huhn", "Hähnchen", "Pute", "Rind", "Lachs", "Kabeljau", "Seelachs", "Tofu", "Ei", "Eier", "Edamame", "Parmesan", "Schweinefilet", "Schwein", "Rinderhack"],
  veg: ["Karotte", "Zucchini", "Pak Choi", "Spinat", "Shiitake", "Champignons", "Brokkoli", "Lauch", "Zwiebel", "Paprika", "Rettich", "Frühlingszwiebel", "Kartoffel", "Kürbis", "Gurke", "Apfel"],
  staple: ["Reis", "Sushi-Reis", "Vollkornreis", "Brauner Reis", "Gerste", "Udon", "Weizennudeln", "Reisnudeln", "Glasnudeln", "Vollkornpasta"],
  season: ["Wakame", "Nori", "Brühe", "Gemüsebrühe", "Sojasauce", "Miso", "Doenjang", "Sesamöl", "Rapsöl", "Olivenöl", "Mirin", "Honig", "Zimt", "Salz", "Sesam", "Knoblauch", "Ingwer", "Tomaten (passiert)", "Wasser"],
};
function accumulateList(data) {
  const buckets = { protein: {}, veg: {}, staple: {}, season: {} };
  data.forEach((r) =>
    r.ingredients.forEach((ing) => {
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

// ---------- persistence ----------
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

// ---------- i18n Helpers ----------
const dayNameI18n = (id, t) => t.day[id.split("-")[0]];
const mealTitleI18n = (id, t) => t.mealTitle[id.split("-")[1]];
const mealLabelI18n = (id, t) => t.meal[id.split("-")[1]];

// ---------- Recipe Card ----------
function RecipeCard({ r, t, lang }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(meta.id, r.id);
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={`Rezeptbild hochladen: ${pickText(r.title, lang)}`} />
          </div>
          {img ? <img src={img} alt={pickText(r.title, lang)} style={{ width: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /> : null}
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
          <div style={{ fontSize: 12, color: COLORS.sky, fontWeight: 700, marginTop: -4, marginBottom: 6 }}>
            {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => toggleBookmark({
              planSlug: meta.id,
              recipeId: r.id,
              recipeTitle: pickText(r.title, lang),
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
          </button><h2 style={{ margin: 0 }}>{pickText(r.title, lang)}</h2></div>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{pickText(r.story, lang)}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients} (2 Personen)</h3>
              <ul className="avoid-break">
                {pickList(r.ingredients, lang).map((x, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {x}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.steps}</h3>
              <ol className="avoid-break" style={{ paddingLeft: 18 }}>
                {pickList(r.steps, lang).map((s, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {s}
                  </li>
                ))}
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
  const weekly = useMemo(() => groupByDay(DATA), []);
  return (
    <div id="cookbook-root">
      {/* Cover + Wochenübersicht */}
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
              {DAYS_ORDER.map((d) => (
                <div key={d} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{t.day[d]}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {(weekly[d] || []).map((m) => (
                      <div key={m.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                        <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabelI18n(m.id, t)}</div>
                        <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{pickText(m.title, lang)}</div>
                        <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>
                          🌾 {pickText(m.target, lang).replace("KH gesamt", "KH")}
                          {m.remind ? " · 💊" : ""}
                        </div>
                      </div>
                    ))}
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

// ---------- Grocery List ----------
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
                  {items.map((t, i) => (
                    <li key={i}>{t}</li>
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

// ---------- Main ----------
export default function Woche4_2025_10_20_DE() {
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

      {/* Download-Links unter dem jeweiligen Tab-Inhalt */}
      <div className="print:hidden" style={{ marginTop: 12 }}>
        {tab === "kochbuch" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.kochbuch ? (
              <a href={pdfLink.kochbuch} download={`${FILE_BASE} – kochbuch.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 PDF herunterladen (Kochbuch)
              </a>
            ) : null}
            {htmlLink.kochbuch ? (
              <a href={htmlLink.kochbuch} download={`${FILE_BASE} – kochbuch.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 HTML herunterladen (Kochbuch)
              </a>
            ) : null}
          </div>
        )}
        {tab === "einkauf" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.einkauf ? (
              <a href={pdfLink.einkauf} download={`${FILE_BASE} – einkauf.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 PDF herunterladen (Einkaufsliste)
              </a>
            ) : null}
            {htmlLink.einkauf ? (
              <a href={htmlLink.einkauf} download={`${FILE_BASE} – einkauf.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
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
    if (!/^Woche 4 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    // i18n-Meal-Labels werden dynamisch gerendert (keine feste Prüfung hier)
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zutaten zu wenig: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Steps zu wenig: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
    console.log("[Moving Kitchen Tales] All tests passed (JSX).");
  } catch (e) {
    console.error("[Moving Kitchen Tales] Tests failed:", e);
  }
}

