// Datei: WOCHE-XX-2025-10-27.de.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data"; // ← Direkt, ohne Overrides

export const meta = {
  title: "Woche 44",
  P25-10-27",
  id: "woche-44-2025-10-27",
  lang: "de",
  sidebar: "[DE] Woche 44 (2025-10-27)",
};
const FILE_BASE = "Woche 44 2025-10-27";

const UI_TITLES = {
  main: "GhibliKitchen – Woche 44",
  list: "GhibliKitchen – Einkaufsliste – Woche 44",
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
const DATA = [
  { id: "mo-f", title: "Reisbrei mit Lachs & Seidentofu (お粥)", desc: "Japanischer Okayu – sanfter Reisbrei mit gedämpftem Lachs und Seidentofu; inspiriert von Just One Cookbook.", story: "Okayu kommt aus Japan und ist als Frühstück beliebt – besonders sanft und warm.", target: "≈70 g KH gesamt (2 P.) · Protein ≈20 g p. P.", ingredients: ["Reis (roh) 90 g","Wasser 800 ml","Lachsfilet 140 g","Tofu seiden 200 g","Ingwer 8 g","Frühlingszwiebel 20 g","Sojasauce natriumarm 10 ml"], steps: ["Reis spülen, mit Wasser aufkochen und 25–30 Min. sanft köcheln.","Lachs über dem Brei 8–10 Min. dämpfen, zerpflücken.","Tofu zugeben, mild mit Sojasauce/Ingwer abschmecken; Lauchgrün kurz ziehen lassen."], checks: "Gastritis – mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, Jod sparsam", swaps: "Lachs ↔ Kabeljau; Seidentofu ↔ fester Tofu.", side: "Warmer Gerstentee; milde Gurken-Pickles (ohne Chili).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu, flaked cooked salmon, silken tofu, scallions, gentle steam") },
  { id: "mo-m", title: "Mildes Bibimbap (비빔밥) – Chili separat", desc: "Koreanische Reisschale mit Gemüse und magerem Rind; inspiriert von My Korean Kitchen.", story: "In Korea ein Alltagsklassiker – warm, ausgewogen, ohne Schärfe.", target: "≈72 g KH gesamt (2 P.) · Protein ≈31 g p. P.", ingredients: ["Vollkornreis (roh) 90 g","Rinderhack mager 220 g","Spinat 200 g","Karotte 120 g","Shiitake 120 g","Eier 2 Stück","Sojasauce natriumarm 20 ml","Sesamöl 8 ml"], steps: ["Reis garen; Gemüse dünsten oder sanft anbraten.","Hack krümelig und vollständig durchgaren.","Eier beidseitig braten (Eigelb fest). Anrichten; Chili separat servieren."], checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Eier/Fleisch durchgegart", swaps: "Rinderhack ↔ Putenhack; Vollkornreis ↔ Sushireis.", side: "Blanchierter Spinat; Chili im Schälchen separat.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top") },
  { id: "mo-a", title: "Mildes Mapo-Tofu (麻婆豆腐) – ohne Schärfe", desc: "Hausmannskost-Version mit Pilzen statt Chili; inspiriert von Omnivore’s Cookbook.", story: "Ursprung Sichuan; milde Varianten sind verbreitet und magenfreundlich.", target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.", ingredients: ["Tofu fest 400 g","Shiitake 150 g","Miso hell 20 g","Gemüsebrühe 300 ml","Sojasauce natriumarm 18 ml","Knoblauch 1 Stück","Ingwer 8 g","Maisstärke 10 g","Brauner Reis (roh) 90 g"], steps: ["Reis garen; Pilze dünsten.","Brühe mit Miso/Sojasauce erhitzen, Tofu 4–5 Min. ziehen lassen.","Mit Stärke leicht binden, über Reis servieren."], checks: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart", swaps: "Brauner Reis ↔ Reis; Miso ↔ milde Bohnenpaste.", side: "Gedünsteter Pak Choi.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes") },

  { id: "di-f", title: "Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)", desc: "Reisbälle mit gegartem Lachs + milde Misosuppe; inspiriert von Just One Cookbook.", story: "Onigiri sind Teil der Bento-Kultur – leicht und warm am Morgen.", target: "≈78 g KH gesamt (2 P.) · Protein ≈27 g p. P.", ingredients: ["Sushi-Reis (roh) 100 g","Lachsfilet 160 g","Nori 1 Stück","Miso hell 20 g","Tofu fest 150 g","Wakame (getrocknet) 2 g","Wasser 900 ml","Sojasauce natriumarm 10 ml"], steps: ["Reis kochen, Onigiri formen; Lachs gegart zerzupfen und füllen; mit Nori umwickeln.","Miso in heißem Wasser lösen (nicht kochen), Tofu/Wakame kurz ziehen lassen.","Mild abschmecken."], checks: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Lachs durchgegart, Wakame sparsam", swaps: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Seelachs.", side: "Milder grüner Tee (koffeinarm).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame") },
  { id: "di-m", title: "Reisnudelpfanne mit Hähnchen (河粉)", desc: "Kantonesisch inspiriert, gemüsebetont und mild; inspiriert von The Woks of Life.", story: "Angelehnt an Ho-Fun-Gerichte aus Südchina – schnell und ausgewogen.", target: "≈74 g KH gesamt (2 P.) · Protein ≈36 g p. P.", ingredients: ["Reisnudeln (trocken) 80 g","Hähnchenbrust 240 g","Paprika 150 g","Pak Choi 200 g","Zwiebel 80 g","Karotte 100 g","Sojasauce natriumarm 24 ml","Sesamöl 8 ml"], steps: ["Reisnudeln einweichen/blanchieren.","Hähnchen in wenig Öl vollständig garen.","Gemüse zufügen, mild würzen und schwenken."], checks: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart", swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu.", side: "Gurkenscheiben natur.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili") },
  { id: "di-a", title: "Doenjang-Jjigae mit Gerste (된장찌개)", desc: "Koreanischer Sojabohnen-Eintopf, herzhaft-mild; inspiriert von Seon Kyoung Longest.", story: "Koreanischer Alltags-Eintopf – kräftig, aber nicht scharf.", target: "≈86 g KH gesamt (2 P.) · Protein ≈24 g p. P.", ingredients: ["Doenjang 28 g","Tofu fest 300 g","Zucchini 200 g","Kartoffeln 220 g","Shiitake 100 g","Zwiebel 60 g","Wasser 900 ml","Sojasauce natriumarm 10 ml","Perlgerste (roh) 70 g"], steps: ["Doenjang in Wasser lösen; Gemüse 12–15 Min. sanft köcheln.","Tofu zugeben und ziehen lassen.","Gerste separat garen und dazu reichen."], checks: "Gastritis – nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart", swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust.", side: "Mildes Gurken-Pickle (ohne Schärfe).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley") },

  { id: "mi-f", title: "Kürbis-Juk mit Tofu & Edamame (단호박죽)", desc: "Samtiger Kürbis-Reisbrei, proteinreich; inspiriert von Mom’s Korean Recipes.", story: "In Korea im Herbst beliebt – mild, cremig und bekömmlich.", target: "≈75 g KH gesamt (2 P.) · Protein ≈22 g p. P.", ingredients: ["Kürbis (Kabocha/Hokkaido) 420 g","Reis (roh) 70 g","Tofu fest 200 g","Edamame (geschält) 100 g","Ingwer 6 g","Wasser 900 ml","Salz 1 g"], steps: ["Kürbis und Reis 25 Min. weich kochen.","Pürieren; Tofu/Edamame 3–4 Min. ziehen lassen.","Mild abschmecken."], checks: "Gastritis – weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart", swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel.", side: "Warmer Reis- oder Gerstentee.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam") },
  { id: "mi-m", title: "Udon-Suppe mit Huhn & Brokkoli (うどん)", desc: "Japanische Nudelsuppe, klar und mild; inspiriert von Just One Cookbook.", story: "Leichte Udon-Brühen sind in Japan das ganze Jahr beliebt.", target: "≈79 g KH gesamt (2 P.) · Protein ≈32 g p. P.", ingredients: ["Udon (trocken) 110 g","Hähnchenbrust 220 g","Brokkoli 240 g","Zwiebel 60 g","Miso hell 24 g","Wasser 1000 ml","Sojasauce natriumarm 12 ml"], steps: ["Brühe mit Miso/Sojasauce erhitzen.","Hähnchen 6–8 Min. gar ziehen; Gemüse 3–4 Min. mitgaren.","Udon separat kochen, abspülen und zugeben."], checks: "Gastritis – mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart", swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.", side: "Kleine Schale Gurke.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth") },
  { id: "mi-a", title: "Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis", desc: "Chinesisch dämpfen – zart & bekömmlich; kantonesisch inspiriert.", story: "Schonendes Dämpfen ist in Südchina ein Klassiker.", target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.", ingredients: ["Kabeljaufilet 320 g","Reis (roh) 90 g","Ingwer 12 g","Frühlingszwiebel 24 g","Sojasauce natriumarm 12 ml","Sesamöl 6 ml","Gemüsebrühe 100 ml"], steps: ["Fisch auf Ingwerscheiben 8–10 Min. dämpfen (durchgaren).","Sojasauce + Brühe erhitzen, über Fisch geben; Sesamöl dazu.","Reis garen und servieren."], checks: "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm", swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.", side: "Gedünsteter Brokkoli.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice") },

  { id: "do-f", title: "Tamagoyaki & Misosuppe mit kleinem Reis (卵焼き・味噌汁)", desc: "Japanisches Frühstück mit vollständig gestocktem Omelett; mild.", story: "Tamagoyaki ist ein Frühstücksklassiker in Japan.", target: "≈62 g KH gesamt (2 P.) · Protein ≈24 g p. P.", ingredients: ["Eier 4 Stück","Tofu fest 150 g","Reis (roh) 80 g","Miso hell 20 g","Wakame (getrocknet) 1 g","Frühlingszwiebel 18 g","Wasser 800 ml","Sojasauce natriumarm 10 ml"], steps: ["Reis garen. Omelett vollständig stocken (keine flüssigen Stellen).","Misosuppe ansetzen; Tofu/Wakame kurz ziehen lassen.","Mit Frühlingszwiebel servieren."], checks: "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt", swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel.", side: "Warmer Grüntee (koffeinarm).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup") },
  { id: "do-m", title: "Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis", desc: "Chinesisches Hausgericht, mild-säuerlich und gut geschmort.", story: "Fànqié Chǎo Dàn ist in China allgegenwärtig.", target: "≈70 g KH gesamt (2 P.) · Protein ≈26 g p. P.", ingredients: ["Reis (roh) 90 g","Eier 4 Stück","Tofu fest 200 g","Tomaten (reif) 420 g","Zwiebel 60 g","Sojasauce natriumarm 10 ml","Rapsöl 8 ml"], steps: ["Reis garen; Eier vollständig stocken.","Tomaten mit Zwiebel sanft schmoren; Tofu zugeben.","Mild abschmecken, mit Reis servieren."], checks: "Gastritis – milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest", swaps: "Tofu ↔ Putenbrustwürfel; Reis ↔ Vollkornreis.", side: "Gedämpfter Pak Choi.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili") },
  { id: "do-a", title: "Bulgogi-Style Pute (불고기) & Vollkornreis – mild", desc: "Koreanisch inspirierte Pfanne; Chili optional separat.", story: "Bulgogi stammt aus Korea; Pfannenversion ist unkompliziert.", target: "≈80 g KH gesamt (2 P.) · Protein ≈28 g p. P.", ingredients: ["Putenbrust 260 g","Vollkornreis (roh) 90 g","Zwiebel 80 g","Karotte 120 g","Champignons 150 g","Sojasauce natriumarm 24 ml","Sesamöl 8 ml","Knoblauch 1 Stück","Birne (gerieben) 60 g"], steps: ["Pute mit Sojasauce/Birne/Knoblauch 15 Min. marinieren.","In wenig Öl zügig durchgaren.","Gemüse kurz mitgaren, mit Reis servieren."], checks: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Pute durchgegart", swaps: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis.", side: "Gurkensalat natur.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili") },

  { id: "fr-f", title: "Hühner-Congee (鸡肉粥)", desc: "Chinesischer Reisbrei mit zartem Huhn – sanft & wärmend.", story: "Congee ist in Südchina ein Klassiker.", target: "≈70 g KH gesamt (2 P.) · Protein ≈32 g p. P.", ingredients: ["Reis (roh) 90 g","Hähnchenbrust 220 g","Ingwer 10 g","Karotte 120 g","Wasser 1100 ml","Sojasauce natriumarm 10 ml","Frühlingszwiebel 20 g"], steps: ["Reis mit Wasser 30 Min. sanft köcheln.","Hähnchen fein würfeln, 8–10 Min. mitgaren bis durch.","Mild abschmecken, Lauchgrün zugeben."], checks: "Gastritis – sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart", swaps: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis.", side: "Warmer Kräutertee.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam") },
  { id: "fr-m", title: "Leichte Minestrone (IT) mit Tofu", desc: "Italienischer Gemüseeintopf, lange geköchelt und mild (max. 1×/Woche).", story: "Minestrone ist eine italienische Gemüsesuppe – hier leicht adaptiert.", target: "≈69 g KH gesamt (2 P.) · Protein ≈36 g p. P.", ingredients: ["Vollkornpasta (trocken) 60 g","Cannellini-Bohnen (abgetropft) 200 g","Karotte 150 g","Stangensellerie 100 g","Tomaten (passiert) 250 ml","Zucchini 150 g","Gemüsebrühe 800 ml","Olivenöl 8 ml","Parmesan (pasteurisiert) 20 g","Tofu fest 280 g"], steps: ["Gemüse in wenig Öl anschwitzen, mit Brühe/Passata 20–25 Min. köcheln.","Tofu/Bohnen zugeben, 5 Min. ziehen lassen.","Pasta separat kochen, zum Schluss einrühren."], checks: "Gastritis – lange geköchelt · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ pasteurisierter Käse", swaps: "Tofu ↔ Hähnchenwürfel; Vollkornpasta ↔ Gerste.", side: "Kräutertee (warm).", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, a few wholegrain pasta pieces") },
  { id: "fr-a", title: "Gebackener Lachs Teriyaki (照り焼き) mit Brokkoli & Reis", desc: "Japanisch inspiriert, natriumarme Sauce, im Ofen gegart.", story: "Teriyaki ist eine japanische Zubereitungsart – aus dem Ofen besonders unkompliziert.", target: "≈75 g KH gesamt (2 P.) · Protein ≈30 g p. P.", ingredients: ["Lachsfilet 320 g","Reis (roh) 90 g","Brokkoli 300 g","Sojasauce natriumarm 22 ml","Mirin 8 ml","Honig 4 g","Ingwer 8 g"], steps: ["Sauce (Sojasauce + wenig Mirin/Honig + Ingwer) anrühren.","Lachs bestreichen; 12–14 Min. bei 200 °C backen (durchgaren).","Reis und gedämpften Brokkoli servieren."], checks: "Gastritis – mild · Diabetes ✓ – ≈75 g KH (Süße minimal) · Schwangerschaft ✓ Lachs durchgegart", swaps: "Reis ↔ Vollkornreis; Brokkoli ↔ Pak Choi.", side: "Warmer Grüntee.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice") },

  { id: "sa-f", title: "Yudofu-Schale (湯豆腐) mit kleinem Reis", desc: "Japanischer Tofu im heißen Sud, sehr bekömmlich.", story: "Spezialität aus Kyoto – schlicht, warm und beruhigend.", target: "≈62 g KH gesamt (2 P.) · Protein ≈22 g p. P.", ingredients: ["Tofu fest 300 g","Wasser 900 ml","Kombu 2 g","Sojasauce natriumarm 12 ml","Reis (roh) 70 g","Frühlingszwiebel 15 g"], steps: ["Wasser erhitzen, Kombu 5 Min. mitziehen lassen und entfernen (Jod sparsam).","Tofu im Sud 4–5 Min. heiß ziehen lassen.","Mit etwas Sojasauce und Lauch, dazu kleiner Reis servieren."], checks: "Gastritis – sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart, Jod sparsam", swaps: "Reis ↔ Vollkornreis; Sojasauce ↔ milde Brühe.", side: "Warmer Bancha-Tee; milde Rettich-Pickles (ohne Schärfe).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Hot tofu in clear broth (yudofu) in a small pot, small rice bowl, steam visible") },
  { id: "sa-m", title: "Hühner-Mais-Suppe (鸡蓉玉米羹) & kleiner Reis", desc: "Chinesische, sanft gebundene Suppe; Ei vollständig gestockt.", story: "Beliebt in vielen Regionen Chinas – mild und freundlich zum Magen.", target: "≈68 g KH gesamt (2 P.) · Protein ≈28 g p. P.", ingredients: ["Hähnchenbrust 220 g","Mais (Körner, gekocht) 200 g","Ei 1 Stück","Wasser 900 ml","Gemüsebrühe 300 ml","Maisstärke 12 g","Sojasauce natriumarm 8 ml","Reis (roh) 60 g","Ingwer 6 g"], steps: ["Huhn fein würfeln und in Brühe/Wasser 8–10 Min. garziehen.","Mais zugeben; mit Stärke sanft binden.","Ei verquirlt einlaufen lassen und rühren, bis komplett gestockt."], checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Ei vollständig gestockt, Huhn durchgegart", swaps: "Reis ↔ Vollkornreis; Huhn ↔ Tofu.", side: "Gedünsteter Spinat.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Chinese chicken and corn soup, silky ribbons of fully set egg, small bowl of rice") },
  { id: "sa-a", title: "Miso-gebackener Seelachs & Reis (味噌焼き)", desc: "Japanisch inspiriert – Seelachs im Ofen, mild glasiert.", story: "Backfisch mit heller Miso-Marinade – schneller, milder Abendklassiker.", target: "≈72 g KH gesamt (2 P.) · Protein ≈28 g p. P.", ingredients: ["Seelachsfilet 320 g","Reis (roh) 90 g","Miso hell 18 g","Wasser 20 ml","Honig 4 g","Ingwer 8 g","Sesamöl 6 ml"], steps: ["Miso mit wenig Wasser/optional Honig verrühren.","Fisch bestreichen; 12–14 Min. bei 200 °C backen (durchgaren).","Mit Reis servieren."], checks: "Gastritis – mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm", swaps: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis.", side: "Gedämpfter Pak Choi oder Brokkoli.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Oven-baked pollock with light miso glaze, steaming rice on the side") },

  { id: "so-f", title: "Zōsui – Hühner-Reissuppe (雑炊) – Ei komplett gestockt", desc: "Japanische Reis-Gemüse-Suppe; sehr mild und wärmend.", story: "Zōsui ist beliebte Resteküche in Japan – ideal für den Sonntag.", target: "≈66 g KH gesamt (2 P.) · Protein ≈24 g p. P.", ingredients: ["Reis (gekocht) 240 g","Hähnchenbrust 160 g","Karotte 120 g","Zucchini 150 g","Wasser 900 ml","Sojasauce natriumarm 10 ml","Ei 1 Stück","Ingwer 6 g"], steps: ["Gemüse 8–10 Min. sanft köcheln, Huhn in feinen Stücken 6–8 Min. garziehen.","Reis zufügen und 3–4 Min. sieden.","Ei verquirlt einlaufen lassen und rühren, bis vollständig gestockt."], checks: "Gastritis – sehr mild · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ Ei/Huhn durchgegart", swaps: "Gekochter Reis ↔ frisch gekochter Reis; Huhn ↔ Tofu.", side: "Warmer Gerstentee.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Japanese zosui rice and chicken soup in a clay bowl, gentle steam") },
  { id: "so-m", title: "Soba-Schüssel mit Tofu & Shiitake (そば) – warm", desc: "Buchweizen-Nudelschale in milder Brühe, tofu-betont.", story: "Soba sind in Japan traditionell – warm sehr bekömmlich.", target: "≈75 g KH gesamt (2 P.) · Protein ≈24 g p. P.", ingredients: ["Soba (trocken) 110 g","Tofu fest 240 g","Shiitake 120 g","Frühlingszwiebel 20 g","Miso hell 20 g","Wasser 1000 ml","Sojasauce natriumarm 12 ml"], steps: ["Brühe aus Wasser/Miso/Sojasauce erhitzen; Pilze 4 Min. simmern.","Soba separat kochen, abspülen; mit Tofu in die Brühe geben.","Kurz ziehen lassen, mit Lauch servieren."], checks: "Gastritis – mild · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart", swaps: "Soba ↔ Udon; Tofu ↔ Hähnchenwürfel.", side: "Blanchierter Pak Choi.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Warm soba noodle bowl with tofu and shiitake in light broth") },
  { id: "so-a", title: "Gedämpftes Huhn mit Goji & Ingwer (枸杞清蒸鸡) & Reis", desc: "Canton-Style Dämpfen – sehr mild und aromatisch.", story: "Schonendes Dämpfen mit Ingwer ist in Südchina verbreitet.", target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.", ingredients: ["Hähnchenbrust 300 g","Reis (roh) 90 g","Goji-Beeren (getrocknet) 8 g","Ingwer 10 g","Frühlingszwiebel 20 g","Sojasauce natriumarm 12 ml","Sesamöl 6 ml"], steps: ["Hähnchen in Scheiben auf Ingwer legen, mit Goji belegen und 12–14 Min. dämpfen (durchgaren).","Mit wenig Sojasauce/Sesamöl beträufeln.","Mit frisch gekochtem Reis servieren."], checks: "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart", swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.", side: "Gedünsteter Brokkoli oder Pak Choi.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Steamed chicken slices with goji berries and ginger, light soy drizzle, bowl of rice") }
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
          <h2 style={{ marginTop: 0 }}>{pickText(r.title, lang)}</h2>
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
export default function Woche4_YYYY_10_20_DE() {
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
    if (!/^Woche 44 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
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
    console.log("[GhibliKitchen] All tests passed (JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}

