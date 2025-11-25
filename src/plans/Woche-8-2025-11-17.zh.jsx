import React from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

// ---------- 元信息 META ----------
export const meta = {
  title: "第8周",
  startDate: "2025-11-17",
  id: "woche-8-2025-11-17-zh",
  lang: "zh",
  sidebar: "[中文] 第8周 (2025-11-17)",
};
const FILE_BASE = "Woche 8 2025-11-17";

// ---------- UI TITLES ----------
const UI_TITLES = {
  main: "GhibliKitchen – 第8周",
  list: "GhibliKitchen – 采购清单 – 第8周",
};

// ---------- STYLES ----------
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

// ---------- PROMPTS ----------
const PROMPT_HEADER =
  "Ultra-clean cookbook photo, soft daylight, top-down, pastel background, visible steam, pregnancy-safe (no raw fish or raw egg), mild Asian home cooking (JP/CN/KR), family-friendly";
const buildPrompt = (a, b) => `${a}\n${b}`;

// ---------- DATA (沿用 DE 周计划配方；语言以原文为准) ----------
const DATA = [
  // 星期一
  {
    id: "mo-f",
    title: "Reisbrei mit Lachs & Seidentofu (お粥)",
    desc: "Japanischer Okayu, sehr mild & salzarm – wärmender Start.",
    story:
      "Okayu stammt aus Japan und wird gern zum Frühstück oder bei Erkältungen gegessen. Sanft, cremig und bekömmlich für ruhige Morgen. Inspiration: inspiriert von Just One Cookbook",
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
      "Tofu einlegen, mit Ingwer/Sojasauce mild abschmecken; Lauchgrün 1 Min. ziehen lassen.",
    ],
    checks:
      "Gastritis – mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm",
    swaps:
      "Seidentofu ↔ fester Tofu; Lachs ↔ Kabeljau; Alternative: Gyudon (牛丼, mager) oder Buta no Shōgayaki (豚の生姜焼き, mager) – kleinere Reisportion.",
    side: "Warmer Gerstentee; kleine Gurken-Pickles (ohne Chili).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu, scallions, rising steam"
    ),
  },
  {
    id: "mo-m",
    title: "Mildes Bibimbap (비빔밥) – Chili separat",
    desc: "Koreanische Reisschale mit Gemüse & Rind; salzarm, Chili extra.",
    story:
      "Bibimbap ist ein koreanischer Klassiker für jede Saison – warm und vielseitig. Diese milde Version setzt auf Gemüse und voll durchgegarte Toppings. Inspiration: inspiriert von My Korean Kitchen",
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
      "Reis garen; Gemüse dünsten oder kurz in wenig Öl anbraten (5–6 Min.).",
      "Hack krümelig vollständig durchgaren (6–8 Min.), mild würzen.",
      "Eier vollständig braten (Eigelb fest); alles anrichten.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest, Fleisch durchgegart",
    swaps:
      "Rinderhack ↔ Putenhack; Vollkornreis ↔ Sushireis; Chili in Minischälchen separat.",
    side: "Kleine Schale Gurke natur; mildes Kimchi ohne Chili optional.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top"
    ),
  },
  {
    id: "mo-a",
    title: "Mildes Mapo-Tofu (麻婆豆腐) – ohne Schärfe",
    desc: "Hausmannskost aus China in milder, miso-basierter Sauce; salzarm.",
    story:
      "Mapo-Tofu stammt aus Sichuan, hier als sanfte Alltagsvariante ohne Schärfe. Wärmend und unkompliziert für den Feierabend. Inspiration: inspiriert von Omnivore’s Cookbook",
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
      "Reis garen (30–35 Min.). Pilze 5 Min. dünsten.",
      "Brühe mit Miso/Sojasauce erhitzen; Tofu 4–5 Min. ziehen lassen.",
      "Mit Stärke leicht binden und über Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:
      "Brauner Reis ↔ weißer Reis; Miso ↔ milde Bohnenpaste; optional mageres Schweinehack (ohne Chili).",
    side: "Gedünsteter Pak Choi; warmer Tee.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Mild mapo tofu with mushrooms, glossy light-brown sauce over brown rice, no chili"
    ),
  },
  // Dienstag
  {
    id: "di-f",
    title: "Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)",
    desc: "Reisbälle mit gegartem Lachs, dazu milde Misosuppe; salzarm.",
    story:
      "Onigiri gehören zur Bento-Kultur – praktisch für unterwegs. Mit Misosuppe ein leichtes, warmes Frühstück. Inspiration: inspiriert von Just One Cookbook",
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
      "Reis kochen; Lachs 8–10 Min. garen, zerpflücken; Onigiri formen, mit Nori umwickeln.",
      "Miso in heißem Wasser lösen (nicht kochen); Tofu/Wakame 2–3 Min. ziehen lassen.",
      "Mild mit wenig Sojasauce abschmecken.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Lachs durchgegart, Wakame sparsam",
    swaps: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Seelachs.",
    side: "Milder grüner Tee (optional koffeinfrei).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame"
    ),
  },
  {
    id: "di-m",
    title: "Reisnudelpfanne mit Hähnchen (河粉)",
    desc: "Kantonesisch inspirierte Wokpfanne, gemüsebetont und mild.",
    story:
      "Locker angelehnt an Ho-Fun aus Südchina – schnell, ausgewogen und familientauglich. Inspiration: inspiriert von The Woks of Life",
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
      "Reisnudeln einweichen oder kurz blanchieren (3–4 Min.).",
      "Hähnchenstreifen in wenig Öl 5–6 Min. durchgaren.",
      "Gemüse 3–4 Min. mitgaren; mild würzen und schwenken.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu.",
    side: "Gurkenscheiben natur.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"
    ),
  },
  {
    id: "di-a",
    title: "Doenjang-Jjigae mit Gerste (된장찌개)",
    desc: "Koreanischer Sojabohnen-Eintopf, herzhaft-mild, mit Gerste.",
    story:
      "Ein Alltags-Eintopf aus Korea – kräftig, aber nicht scharf; perfekt für gemütliche Abende. Inspiration: inspiriert von Seon Kyoung Longest",
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
      "Tofuwürfel 3–4 Min. ziehen lassen.",
      "Gerste separat garen (25–30 Min.) und dazu reichen.",
    ],
    checks:
      "Gastritis – herzhaft, nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust.",
    side: "Mildes Gurken-Pickle (ohne Chili).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"
    ),
  },
  // Mittwoch
  {
    id: "mi-f",
    title: "Kürbis-Juk mit Tofu & Edamame (단호박죽)",
    desc: "Samtiger Kürbisreisbrei, proteinreich & mild.",
    story:
      "Koreanischer Reisbrei mit saisonalem Kürbis – cremig und angenehm. Inspiration: inspiriert von Mom's Korean Recipes",
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
      "Mild abschmecken und servieren.",
    ],
    checks:
      "Gastritis – weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Reis- oder Gerstentee.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"
    ),
  },
  {
    id: "mi-m",
    title: "Udon-Suppe mit Huhn & Brokkoli (うどん)",
    desc: "Klare japanische Nudelsuppe, mild & sättigend.",
    story:
      "Leichte Udon-Brühen sind in Japan ganzjährig beliebt – besonders in kühlen Monaten. Inspiration: inspiriert von Just One Cookbook",
    target: "≈79 g KH gesamt (2 P.) · Protein ≈34 g p. P.",
    ingredients: [
      "Udon (trocken) 100 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 200 g",
      "Zwiebel 60 g",
      "Miso hell 25 g",
      "Wasser 1000 ml",
      "Sojasauce natriumarm 15 ml",
    ],
    steps: [
      "Brühe mit Miso/Sojasauce erhitzen (nicht kochen).",
      "Hähnchen 6–8 Min. gar ziehen; Gemüse 3–4 Min. mitgaren.",
      "Udon separat 8–10 Min. kochen, abspülen und zugeben.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.",
    side: "Kleine Schale Gurke.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Light udon soup with chicken slices and broccoli in clear broth"
    ),
  },
  {
    id: "mi-a",
    title: "Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis",
    desc: "Kantonesisch dämpfen – zart & bekömmlich.",
    story:
      "Sanftes Dämpfen ist ein Klassiker der südchinesischen Küche – leicht und elegant. Inspiration: inspiriert von Made With Lau",
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
    checks:
      "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm",
    swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.",
    side: "Gedünsteter Brokkoli.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"
    ),
  },
  // Donnerstag
  {
    id: "do-f",
    title: "Tamagoyaki & Misosuppe mit kleinem Reis (卵焼き・味噌汁)",
    desc: "Japanisches Frühstück, Ei vollständig gestockt.",
    story:
      "Tamagoyaki ist ein Frühstücksklassiker und beliebt in Bento-Boxen – mild und ausgewogen. Inspiration: inspiriert von Just One Cookbook",
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
      "Reis garen (30 Min.). Omelett vollständig stocken (5–6 Min.).",
      "Misosuppe ansetzen; Tofu/Wakame 2–3 Min. ziehen lassen.",
      "Mit Frühlingszwiebel servieren.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel.",
    side: "Warmer Grüntee (koffeinarm).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"
    ),
  },
  {
    id: "do-m",
    title: "Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis",
    desc: "Chinesisches Hausgericht, mild-säuerlich & schnell.",
    story:
      "Fànqié Chǎo Dàn ist ein bekannter Alltagsklassiker – mit reifen Tomaten besonders rund. Inspiration: inspiriert von The Woks of Life",
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
      "Reis garen (30 Min.); Eier 3–4 Min. braten bis fest.",
      "Tomaten/Zwiebel 6–8 Min. sanft schmoren; Tofu 2–3 Min. mitziehen lassen.",
      "Mild abschmecken und mit Reis servieren.",
    ],
    checks:
      "Gastritis – milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest",
    swaps: "Tofu ↔ Putenbrustwürfel; Reis ↔ Vollkornreis.",
    side: "Gedämpfter Pak Choi.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"
    ),
  },
  {
    id: "do-a",
    title: "Bulgogi-Style Pute (불고기) & Vollkornreis – mild",
    desc: "Koreanisch inspirierte Pfanne, süß-mild, Chili optional separat.",
    story:
      "Bulgogi stammt aus Korea – die Pfannenvariante ist schnell und familienfreundlich. Inspiration: inspiriert von Maangchi",
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
      "Pute 15 Min. in Sojasauce/Birne/Knoblauch marinieren.",
      "In wenig Öl 5–6 Min. zügig durchgaren.",
      "Gemüse 3–4 Min. mitgaren; mit Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis.",
    side: "Salatgurke natur; kleines Rettich-Pickle ohne Chili.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"
    ),
  },
  // Freitag
  {
    id: "fr-f",
    title: "Hühner-Congee (鸡肉粥)",
    desc: "Chinesischer Reisbrei mit zartem Huhn – sehr mild.",
    story:
      "Congee ist in Südchina und Südostasien ein Klassiker – wärmt sanft an ruhigen Morgen. Inspiration: inspiriert von The Woks of Life",
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
    checks:
      "Gastritis – sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis.",
    side: "Warmer Kräutertee.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"
    ),
  },
  {
    id: "fr-m",
    title: "Leichte Minestrone (IT) mit Tofu",
    desc: "Italienischer Gemüseeintopf, lange geköchelt, mild & ballaststoffreich.",
    story:
      "Minestrone ist eine italienische Gemüsesuppe – diese sanfte Version passt zu entspannten Mittagspausen. Inspiration: inspiriert von Giallo Zafferano",
    target: "≈69 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Vollkornnudeln (trocken) 80 g",
      "Tofu fest 200 g",
      "Weiße Bohnen (gekocht) 200 g",
      "Karotte 150 g",
      "Stangensellerie 100 g",
      "Zucchini 150 g",
      "Tomatenwürfel (aus der Dose) 200 g",
      "Gemüsebrühe 800 ml",
      "Olivenöl 10 ml",
    ],
    steps: [
      "Gemüse in wenig Öl 4–5 Min. anschwitzen, Brühe zugeben.",
      "15–20 Min. sanft köcheln; Nudeln 8–10 Min. mitgaren.",
      "Tofu und Bohnen 3–4 Min. erwärmen, mild abschmecken.",
    ],
    checks:
      "Gastritis – mild, nicht scharf · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Vollkornnudeln ↔ Gerste; Tofu ↔ Hähnchen.",
    side: "Gurkensalat ohne Essigschärfe.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Light minestrone with beans, tofu cubes, small pasta, lots of vegetables, gentle broth"
    ),
  },
  {
    id: "fr-a",
    title: "Ofen-Lachs Teriyaki (照り焼き鮭) & Brokkoli, Reis",
    desc: "Schonend gebacken, natriumarm angepasst; süß-mild.",
    story:
      "Teriyaki ist eine japanische Glasurtechnik – hier zurückhaltend gesüßt und salzarm. Inspiration: inspiriert von Just One Cookbook",
    target: "≈77 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Lachsfilet 320 g",
      "Reis (roh) 90 g",
      "Brokkoli 250 g",
      "Sojasauce natriumarm 20 ml",
      "Honig 10 g",
      "Wasser 30 ml",
      "Ingwer 6 g",
    ],
    steps: [
      "Reis garen (30 Min.).",
      "Lachs mit Sojasauce/Wasser/Honig/Ingwer bestreichen; 12–14 Min. bei 180°C backen bis durch.",
      "Brokkoli 4–5 Min. dämpfen, mit Lachs und Reis servieren.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈77 g KH · Schwangerschaft ✓ Lachs durchgegart, quecksilberarm",
    swaps: "Lachs ↔ Kabeljau; Reis ↔ Vollkornreis.",
    side: "Warmer grüner Tee; Rettich-Pickles mild.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Oven-baked teriyaki salmon fillets, steamed broccoli florets, small bowl of rice, glossy light glaze"
    ),
  },
  // Samstag
  {
    id: "sa-f",
    title: "Zōsui-Reissuppe mit Huhn & Gemüse (雑炊)",
    desc: "Japanische Restereissuppe, leicht & wärmend.",
    story:
      "Zōsui ist eine japanische Reissuppe – ideal zur Resteverwertung und für sanfte Morgen. Inspiration: inspiriert von Just One Cookbook",
    target: "≈68 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Gekochter Reis 250 g",
      "Hähnchenbrust 150 g",
      "Möhre 100 g",
      "Shiitake 80 g",
      "Ei 1 Stück",
      "Dashi oder milde Brühe 700 ml",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 15 g",
    ],
    steps: [
      "Brühe erhitzen; Hähnchenwürfel 6–7 Min. gar ziehen.",
      "Reis zugeben und 5 Min. sieden; Ei verquirlt einlaufen lassen und vollständig stocken lassen (1–2 Min.).",
      "Mild mit Sojasauce abschmecken; Lauchgrün darüber.",
    ],
    checks:
      "Gastritis – mild & warm · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Ei vollständig gestockt",
    swaps: "Hähnchen ↔ Tofu; Reis ↔ Vollkornreis.",
    side: "Jasmintee schwach.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Comforting Japanese zosui rice soup with chicken, set egg curds, vegetables, gentle steam"
    ),
  },
  {
    id: "sa-m",
    title: "Warme Soba mit Tofu & Spinat (そば)",
    desc: "Buchweizennudeln in milder Brühe, gemüsig & salzarm.",
    story:
      "Soba sind in Japan beliebt – hier als leichte Mittagsnudel mit viel Grün. Inspiration: inspiriert von MAFF Japan",
    target: "≈72 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Soba (trocken) 90 g",
      "Tofu fest 200 g",
      "Spinat 200 g",
      "Shiitake 80 g",
      "Miso hell 20 g",
      "Dashi oder Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "Brühe mit Miso/Sojasauce erhitzen (nicht kochen).",
      "Soba 6–7 Min. kochen, kalt abspülen, in Brühe geben.",
      "Tofu/Spinat/Pilze 2–3 Min. ziehen lassen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Soba ↔ Udon; Tofu ↔ Hähnchen.",
    side: "Gurke natur; milde Pickles.",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Warm soba noodle soup with tofu cubes, spinach and mushrooms in light broth"
    ),
  },
  {
    id: "sa-a",
    title: "Geschmorter Napa-Kohl mit Tofu (白菜豆腐煮) & Reis",
    desc: "Sanft geschmort, leicht & bekömmlich; vegetabil.",
    story:
      "Ein nordchinesisch inspiriertes Pfannengericht – sehr mild und gut verträglich. Inspiration: inspiriert von The Hong Kong Cookery",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Chinakohl 500 g",
      "Tofu fest 300 g",
      "Reis (roh) 90 g",
      "Ingwer 8 g",
      "Knoblauch 1 Zehe",
      "Sojasauce natriumarm 15 ml",
      "Gemüsebrühe 250 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "Reis garen. Kohl in Brühe 8–10 Min. sanft schmoren.",
      "Tofu zugeben, 3–4 Min. ziehen lassen.",
      "Leicht binden und über Reis servieren.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Tofu ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Lauwarmes Gurken-Pickle (ohne Chili).",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Braised napa cabbage with tofu in light glossy sauce, served with rice"
    ),
  },
  // Sonntag
  {
    id: "so-f",
    title: "Süßkartoffel-Okayu mit Tofu (さつまいも粥)",
    desc: "Sanfter Reisbrei mit Süßkartoffel – milde Süße, salzarm.",
    story:
      "Eine Hausmannskost-Variante des Okayu – wärmend und freundlich zum Morgenmagen. Inspiration: inspiriert von Just One Cookbook",
    target: "≈75 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Süßkartoffel 250 g",
      "Tofu seiden 180 g",
      "Wasser 900 ml",
      "Ingwer 6 g",
      "Sojasauce natriumarm 8 ml",
    ],
    steps: [
      "Reis + Wasser aufkochen, 25–30 Min. sämig köcheln.",
      "Süßkartoffelwürfel 10–12 Min. weich garen.",
      "Tofu zugeben, mild abschmecken.",
    ],
    checks: "Gastritis – mild & weich · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps: "Süßkartoffel ↔ Kürbis; Seidentofu ↔ fester Tofu.",
    side: "Warmer Hōjicha.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese okayu with sweet potato cubes and silken tofu, soft steam"
    ),
  },
  {
    id: "so-m",
    title: "Tonjiru (豚汁) – Schweine-Miso-Suppe & Reis",
    desc: "Kräftig, aber mild; mageres Schwein, klare Brühe.",
    story:
      "Tonjiru ist eine beliebte Wintersuppe in Japan – sättigend ohne Schärfe. Inspiration: inspiriert von Just One Cookbook",
    target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Mageres Schweinefleisch 220 g",
      "Miso hell 25 g",
      "Kartoffeln 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Dashi oder Wasser 900 ml",
      "Reis (roh) 90 g",
    ],
    steps: [
      "Reis garen. Brühe mit Miso erwärmen.",
      "Schweinefleisch 8–10 Min. sanft köcheln bis durch.",
      "Gemüse 10–12 Min. weich ziehen lassen.",
    ],
    checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Schwein durchgegart",
    swaps: "Schwein ↔ Hähnchen; Reis ↔ Vollkornreis.",
    side: "Kleine Gurken-Pickles (ohne Chili).",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese tonjiru pork miso soup with root vegetables, side bowl of rice"
    ),
  },
  {
    id: "so-a",
    title: "Sukiyaki-Style Rind-Gemüse-Topf (すき焼き風) & kleiner Reis",
    desc: "Mild abgeschmeckt, süß-salzig zurückhaltend; Reis klein.",
    story:
      "Sukiyaki ist ein Festessen aus Japan – hier als sanfte Pfannenvariante ohne rohe Eier. Inspiration: inspiriert von Just One Cookbook",
    target: "≈62 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Mageres Rindfleisch in Scheiben 240 g",
      "Zwiebel 80 g",
      "Shiitake 100 g",
      "Chinakohl 300 g",
      "Sojasauce natriumarm 20 ml",
      "Mirin 10 ml",
      "Wasser 200 ml",
      "Reis (roh) 80 g",
    ],
    steps: [
      "Reis garen.",
      "Gemüse 6–8 Min. sanft schmoren, Sauce zugeben.",
      "Rind 2–3 Min. durchgaren, sofort servieren.",
    ],
    checks:
      "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ ohne rohe Eier, Fleisch durchgegart",
    swaps: "Rind ↔ Pute; Reis ↔ Vollkornreis.",
    side: "Warmer Grüntee; Rettich-Pickles mild.",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Sukiyaki-style beef and vegetables in shallow pan, small bowl of rice, no raw egg"
    ),
  },
];

// ---------- 电饭煲菜单（每天 1 道；全部食材进锅） ----------
const RICE_COOKER = [
  {
    id: "mo-rc",
    title: "电饭煲：日式蘑菇炊饭（きのこご飯）",
    desc: "蘑菇与米同煮，鲜味十足，操作极简。",
    story:
      "Takikomi Gohan 是日本常见的混合炊饭，米与配料一起煮成熟——香气四溢。Inspiration: Just One Cookbook（Kinoko Gohan）& Okonomi Kitchen",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈18 g/人",
    ingredients: [
      "大米（生）90 g",
      "高汤/清水 300 ml",
      "香菇 100 g",
      "蟹味菇 80 g",
      "胡萝卜 60 g",
      "姜 6 g",
      "低钠酱油 15 ml",
      "味醂 8 ml",
    ],
    steps: [
      "淘米；内胆加入米、高汤、酱油、味醂。",
      "铺上蘑菇、胡萝卜与姜片，不搅拌。",
      "启动‘白米/混合饭’程序；焖 10 分钟后翻松。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "蘑菇混合 ↔ 只用香菇；高汤 ↔ 清水。",
    side: "清爽黄瓜浅渍；绿茶温饮。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker kinoko gohan, mixed mushrooms over rice, gentle steam"
    ),
  },
  {
    id: "di-rc",
    title: "电饭煲：香菇鸡饭",
    desc: "广式灵感，鸡肉鲜嫩、低钠。",
    story:
      "改良自中式鸡肉香菇饭，用电饭煲更省事。Inspiration: Wok & Kin",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈34 g/人",
    ingredients: [
      "大米（生）90 g",
      "清水 320 ml",
      "鸡胸肉 240 g",
      "香菇（泡发）120 g",
      "姜 8 g",
      "低钠酱油 20 ml",
      "香油 5 ml",
    ],
    steps: [
      "淘米后入内胆加水。",
      "鸡丁拌酱油/香油/姜，连同香菇铺在米上。",
      "启动程序；焖 10 分钟后拌匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈75 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 老豆腐；清水 ↔ 清淡高汤。",
    side: "清蒸小白菜。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker chicken and shiitake rice, glossy grains, no chili"
    ),
  },
  {
    id: "mi-rc",
    title: "电饭煲：豆芽拌饭（콩나물밥）",
    desc: "韩式黄豆芽米饭，清爽多汁。",
    story:
      "豆芽拌饭是韩国经典家常，米与豆芽同煮，酱汁另给。Inspiration: My Korean Kitchen & Korean Bapsang",
    target: "≈68 g KH gesamt (2 P.) · 蛋白质 ≈22 g/人",
    ingredients: [
      "大米（生）90 g",
      "清水 320 ml",
      "黄豆芽 250 g",
      "鸡胸肉片 160 g",
      "低钠酱油 15 ml",
      "香油 5 ml",
    ],
    steps: [
      "淘米加水入锅。",
      "铺上鸡肉与豆芽（不搅拌）。",
      "启动程序；焖 10 分钟后拌匀。温和蘸汁另给。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈68 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；香油 ↔ 菜籽油。",
    side: "清淡黄瓜浅渍（无辣）。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker kongnamulbap, soybean sprouts on rice, clean minimal"
    ),
  },
  {
    id: "do-rc",
    title: "电饭煲：三文鱼炊饭（鮭の炊き込みご飯）",
    desc: "米、蘑菇与三文鱼同煮——香气四溢。",
    story:
      "日式 Sake Takikomi Gohan – 一锅到位，工作日晚餐友好。Inspiration: Japanese Cooking 101 & Just One Cookbook",
    target: "≈72 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "大米（生）90 g",
      "高汤/清水 320 ml",
      "三文鱼柳（去皮）220 g",
      "香菇 80 g",
      "低钠酱油 15 ml",
      "味醂 8 ml",
      "姜 6 g",
    ],
    steps: [
      "淘米后加高汤/酱油/味醂。",
      "铺香菇与三文鱼。",
      "启动程序；焖 10 分钟，将三文鱼拨散拌匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈72 g KH · 孕期✓ 鱼全熟",
    swaps: "三文鱼 ↔ 鳕鱼；高汤 ↔ 清水。",
    side: "清蒸西兰花。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker salmon takikomi gohan, flaked salmon, mushrooms, steaming"
    ),
  },
  {
    id: "fr-rc",
    title: "电饭煲：南瓜香菇糙米饭",
    desc: "中式灵感，软糯清甜，低钠。",
    story:
      "南瓜拌饭在华语圈很受欢迎；电饭煲版本更省心。Inspiration: What To Cook Today & Greedy Girl Gourmet",
    target: "≈78 g KH gesamt (2 P.) · 蛋白质 ≈18 g/人",
    ingredients: [
      "糙米（生）90 g",
      "清水/清淡高汤 360 ml",
      "南瓜丁 300 g",
      "香菇 80 g",
      "老豆腐 150 g",
      "低钠酱油 10 ml",
    ],
    steps: [
      "淘米后入锅加水/高汤。",
      "铺南瓜、豆腐、香菇；淋少许酱油。",
      "启动程序；焖 10 分钟，轻轻翻匀。",
    ],
    checks: "胃炎——软和 · 糖友✓ ≈78 g KH · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 鸡胸肉丁；糙米 ↔ 白米。",
    side: "温热茉莉花茶。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker brown rice with pumpkin and tofu, cozy and mild"
    ),
  },
  {
    id: "sa-rc",
    title: "电饭煲：鸡肉红薯饭（고구마밥）",
    desc: "韩式红薯饭，柔和带甜味。",
    story:
      "Goguma-bap 是常见的电饭煲米饭做法，这里加入鸡胸增蛋白。Inspiration: Maangchi",
    target: "≈80 g KH gesamt (2 P.) · 蛋白质 ≈28 g/人",
    ingredients: [
      "大米（生）90 g",
      "清水 320 ml",
      "红薯 250 g",
      "鸡胸肉 200 g",
      "低钠酱油 12 ml",
    ],
    steps: [
      "淘米入锅加水。",
      "铺红薯与鸡丁；淋酱油。",
      "启动程序；焖 10 分钟后拌匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g KH · 孕期✓ 鸡肉全熟",
    swaps: "红薯 ↔ 南瓜；鸡肉 ↔ 豆腐。",
    side: "温和白萝卜浅渍。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker sweet potato rice with chicken, homestyle and mild"
    ),
  },
  {
    id: "so-rc",
    title: "电饭煲：鸡肉牛蒡炊饭（鶏ごぼう炊き込みご飯）",
    desc: "日式混合炊饭，鸡肉与牛蒡的泥土香。",
    story:
      "鸡肉牛蒡炊饭是居家经典；把食材铺在米上一起煮即可。Inspiration: Just One Cookbook（Gobo & Miso Takikomi Gohan）",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "大米（生）90 g",
      "高汤/清水 320 ml",
      "鸡胸肉 220 g",
      "牛蒡 80 g",
      "胡萝卜 60 g",
      "低钠酱油 15 ml",
      "味醂 8 ml",
    ],
    steps: [
      "淘米后加入高汤/酱油/味醂。",
      "铺鸡肉、牛蒡与胡萝卜；启动程序。",
      "焖 10 分钟后翻松即可。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "牛蒡 ↔ 西芹；鸡肉 ↔ 豆腐。",
    side: "清爽黄瓜浅渍；绿茶温饮。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker chicken and burdock takikomi gohan, earthy and cozy"
    ),
  },
];

// ---------- EXPORT (Minimal Render Container; App 读取 Meta/DATA) ----------
export default function PlanZH() {
  return (
    <div
      style={{ display: "none" }}
      data-file-base={FILE_BASE}
      data-title-main={UI_TITLES.main}
      data-title-list={UI_TITLES.list}
      data-count={DATA.length}
      data-lang="zh"
      data-rc-count={RICE_COOKER.length}
    >
      {/* Intentionally no visible UI here – Tests read Meta/DATA only. */}
    </div>
  );
}

// 导出供测试
export const DATASET = DATA;
export const COLORS_CONST = COLORS;
export const PROMPT_HEADER_CONST = PROMPT_HEADER;
export const DATASET_RC = RICE_COOKER;
