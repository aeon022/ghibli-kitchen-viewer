// src/plans/Woche-44-2025-10-27.de.jsx
import React, { useEffect, useMemo, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

export const meta = {
  title: "Woche 44",
  startDate: "2025-10-27",
  id: "woche-44-2025-10-27",
};
const FILE_BASE = "Woche 44 2025-10-27";
const lang = "de";

const COLORS = {
  pageBg:"#FAF7F1",
  text:"#111827",
  border:"rgba(0,0,0,.10)",
  panelBG70:"rgba(255,255,255,.70)",
  panelBG80:"rgba(255,255,255,.80)",
  white:"#FFFFFF",
  emerald:"#059669",
  amber:"#f59e0b",
  sky:"#0284c7",
  neutral:"#404040",
  indigo:"#4f46e5",
  btnShadow:"0 6px 20px rgba(0,0,0,.12)",
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

const DAYS_ORDER = ["mo","di","mi","do","fr","sa","so"];
const DAY_NAME_DE = { mo:"Montag", di:"Dienstag", mi:"Mittwoch", do:"Donnerstag", fr:"Freitag", sa:"Samstag", so:"Sonntag" };
const DAY_NAME_ZH = { mo:"周一", di:"周二", mi:"周三", do:"周四", fr:"周五", sa:"周六", so:"周日" }; // Strukturparität

const asList = (v, l) => { try { const out = pickList(v, l); return Array.isArray(out) ? out : []; } catch { return []; } };
const safeText = (v, l) => { try { const s = pickText(v, l); return (s ?? "").toString(); } catch { return ""; } };

// ------------------------------ DATA (DE, monolingual) -----------------
const DATA = [
  { id: "mo-f", title: "Reisbrei mit Lachs & Seidentofu (お粥)", desc: "Japanischer Okayu – sanfter Reisbrei mit gedämpftem Lachs und Seidentofu; inspiriert von Just One Cookbook.", story: "Okayu kommt aus Japan und ist als Frühstück beliebt – besonders sanft und warm.", target: "≈70 g KH gesamt (2 P.) · Protein ≈20 g p. P.", ingredients: ["Reis (roh) 90 g","Wasser 800 ml","Lachsfilet 140 g","Tofu seiden 200 g","Ingwer 8 g","Frühlingszwiebel 20 g","Sojasauce natriumarm 10 ml"], steps: ["Reis spülen, mit Wasser aufkochen und 25–30 Min. sanft köcheln.","Lachs über dem Brei 8–10 Min. dämpfen, zerpflücken.","Tofu zugeben, mild mit Sojasauce/Ingwer abschmecken; Lauchgrün kurz ziehen lassen."], checks: "Gastritis ✓ warm & mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, Jod sparsam", swaps: "Lachs ↔ Kabeljau; Seidentofu ↔ fester Tofu.", side: "Warmer Gerstentee; milde Gurken-Pickles (ohne Chili).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu, flaked cooked salmon, silken tofu, scallions, gentle steam") },
  { id: "mo-m", title: "Mildes Bibimbap (비빔밥) – Chili separat", desc: "Koreanische Reisschale mit Gemüse und magerem Rind; inspiriert von My Korean Kitchen.", story: "In Korea ein Alltagsklassiker – warm, ausgewogen, ohne Schärfe.", target: "≈72 g KH gesamt (2 P.) · Protein ≈31 g p. P.", ingredients: ["Vollkornreis (roh) 90 g","Rinderhack mager 220 g","Spinat 200 g","Karotte 120 g","Shiitake 120 g","Eier 2 Stück","Sojasauce natriumarm 20 ml","Sesamöl 8 ml"], steps: ["Reis garen; Gemüse dünsten oder sanft anbraten.","Hack krümelig und vollständig durchgaren.","Eier beidseitig braten (Eigelb fest). Anrichten; Chili separat servieren."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Eier/Fleisch durchgegart", swaps: "Rinderhack ↔ Putenhack; Vollkornreis ↔ Sushireis.", side: "Blanchierter Spinat; Chili im Schälchen separat.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top") },
  { id: "mo-a", title: "Mildes Mapo-Tofu (麻婆豆腐) – ohne Schärfe", desc: "Hausmannskost-Version mit Pilzen statt Chili; inspiriert von Omnivore’s Cookbook.", story: "Ursprung Sichuan; milde Varianten sind verbreitet und magenfreundlich.", target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.", ingredients: ["Tofu fest 400 g","Shiitake 150 g","Miso hell 20 g","Gemüsebrühe 300 ml","Sojasauce natriumarm 18 ml","Knoblauch 1 Stück","Ingwer 8 g","Maisstärke 10 g","Brauner Reis (roh) 90 g"], steps: ["Reis garen; Pilze dünsten.","Brühe mit Miso/Sojasauce erhitzen, Tofu 4–5 Min. ziehen lassen.","Mit Stärke leicht binden, über Reis servieren."], checks: "Gastritis ✓ sanft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart", swaps: "Brauner Reis ↔ Reis; Miso ↔ milde Bohnenpaste.", side: "Gedünsteter Pak Choi.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes") },
  { id: "di-f", title: "Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)", desc: "Reisbälle mit gegartem Lachs + milde Misosuppe; inspiriert von Just One Cookbook.", story: "Onigiri sind Teil der Bento-Kultur – leicht und warm am Morgen.", target: "≈78 g KH gesamt (2 P.) · Protein ≈27 g p. P.", ingredients: ["Sushi-Reis (roh) 100 g","Lachsfilet 160 g","Nori 1 Stück","Miso hell 20 g","Tofu fest 150 g","Wakame (getrocknet) 2 g","Wasser 900 ml","Sojasauce natriumarm 10 ml"], steps: ["Reis kochen, Onigiri formen; Lachs gegart zerzupfen und füllen; mit Nori umwickeln.","Miso in heißem Wasser lösen (nicht kochen), Tofu/Wakame kurz ziehen lassen.","Mild abschmecken."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Lachs durchgegart, Wakame sparsam", swaps: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Seelachs.", side: "Milder grüner Tee (koffeinarm).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame") },
  { id: "di-m", title: "Reisnudelpfanne mit Hähnchen (河粉)", desc: "Kantonesisch inspiriert, gemüsebetont und mild; inspiriert von The Woks of Life.", story: "Angelehnt an Ho-Fun-Gerichte aus Südchina – schnell und ausgewogen.", target: "≈74 g KH gesamt (2 P.) · Protein ≈36 g p. P.", ingredients: ["Reisnudeln (trocken) 80 g","Hähnchenbrust 240 g","Paprika 150 g","Pak Choi 200 g","Zwiebel 80 g","Karotte 100 g","Sojasauce natriumarm 24 ml","Sesamöl 8 ml"], steps: ["Reisnudeln einweichen/blanchieren.","Hähnchen in wenig Öl vollständig garen.","Gemüse zufügen, mild würzen und schwenken."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart", swaps: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu.", side: "Gurkenscheiben natur.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili") },
  { id: "di-a", title: "Doenjang-Jjigae mit Gerste (된장찌개)", desc: "Koreanischer Sojabohnen-Eintopf, herzhaft-mild; inspiriert von Seon Kyoung Longest.", story: "Koreanischer Alltags-Eintopf – kräftig, aber nicht scharf.", target: "≈86 g KH gesamt (2 P.) · Protein ≈24 g p. P.", ingredients: ["Doenjang 28 g","Tofu fest 300 g","Zucchini 200 g","Kartoffeln 220 g","Shiitake 100 g","Zwiebel 60 g","Wasser 900 ml","Sojasauce natriumarm 10 ml","Perlgerste (roh) 70 g"], steps: ["Doenjang in Wasser lösen; Gemüse 12–15 Min. sanft köcheln.","Tofu zugeben und ziehen lassen.","Gerste separat garen und dazu reichen."], checks: "Gastritis ✓ nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart", swaps: "Gerste ↔ Reis; Tofu ↔ Putenbrust.", side: "Mildes Gurken-Pickle (ohne Schärfe).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley") },
  { id: "mi-f", title: "Kürbis-Juk mit Tofu & Edamame (단호박죽)", desc: "Samtiger Kürbis-Reisbrei, proteinreich; inspiriert von Mom’s Korean Recipes.", story: "In Korea im Herbst beliebt – mild, cremig und bekömmlich.", target: "≈75 g KH gesamt (2 P.) · Protein ≈22 g p. P.", ingredients: ["Kürbis (Kabocha/Hokkaido) 420 g","Reis (roh) 70 g","Tofu fest 200 g","Edamame (geschält) 100 g","Ingwer 6 g","Wasser 900 ml","Salz 1 g"], steps: ["Kürbis und Reis 25 Min. weich kochen.","Pürieren; Tofu/Edamame 3–4 Min. ziehen lassen.","Mild abschmecken."], checks: "Gastritis ✓ weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart", swaps: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel.", side: "Warmer Reis- oder Gerstentee.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam") },
  { id: "mi-m", title: "Udon-Suppe mit Huhn & Brokkoli (うどん)", desc: "Japanische Nudelsuppe, klar und mild; inspiriert von Just One Cookbook.", story: "Leichte Udon-Brühen sind in Japan das ganze Jahr beliebt.", target: "≈79 g KH gesamt (2 P.) · Protein ≈32 g p. P.", ingredients: ["Udon (trocken) 110 g","Hähnchenbrust 220 g","Brokkoli 240 g","Zwiebel 60 g","Miso hell 24 g","Wasser 1000 ml","Sojasauce natriumarm 12 ml"], steps: ["Brühe mit Miso/Sojasauce erhitzen.","Hähnchen 6–8 Min. gar ziehen; Gemüse 3–4 Min. mitgaren.","Udon separat kochen, abspülen und zugeben."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart", swaps: "Udon ↔ Soba; Hähnchen ↔ Tofu.", side: "Kleine Schale Gurke.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth") },
  { id: "mi-a", title: "Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis", desc: "Chinesisch dämpfen – zart & bekömmlich; kantonesisch inspiriert.", story: "Schonendes Dämpfen ist in Südchina ein Klassiker.", target: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.", ingredients: ["Kabeljaufilet 320 g","Reis (roh) 90 g","Ingwer 12 g","Frühlingszwiebel 24 g","Sojasauce natriumarm 12 ml","Sesamöl 6 ml","Gemüsebrühe 100 ml"], steps: ["Fisch auf Ingwerscheiben 8–10 Min. dämpfen (durchgaren).","Sojasauce + Brühe erhitzen, über Fisch geben; Sesamöl dazu.","Reis garen und servieren."], checks: "Gastritis ✓ gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm", swaps: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis.", side: "Gedünsteter Brokkoli.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice") },
  { id: "do-f", title: "Tamagoyaki & Misosuppe mit kleinem Reis (卵焼き・味噌汁)", desc: "Japanisches Frühstück mit vollständig gestocktem Omelett; mild.", story: "Tamagoyaki ist ein Frühstücksklassiker in Japan.", target: "≈62 g KH gesamt (2 P.) · Protein ≈24 g p. P.", ingredients: ["Eier 4 Stück","Tofu fest 150 g","Reis (roh) 80 g","Miso hell 20 g","Wakame (getrocknet) 1 g","Frühlingszwiebel 18 g","Wasser 800 ml","Sojasauce natriumarm 10 ml"], steps: ["Reis garen. Omelett vollständig stocken (keine flüssigen Stellen).","Misosuppe ansetzen; Tofu/Wakame kurz ziehen lassen.","Mit Frühlingszwiebel servieren."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt", swaps: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel.", side: "Warmer Grüntee (koffeinarm).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup") },
  { id: "do-m", title: "Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis", desc: "Chinesisches Hausgericht, mild-säuerlich und gut geschmort.", story: "Fànqié Chǎo Dàn ist in China allgegenwärtig.", target: "≈70 g KH gesamt (2 P.) · Protein ≈26 g p. P.", ingredients: ["Reis (roh) 90 g","Eier 4 Stück","Tofu fest 200 g","Tomaten (reif) 420 g","Zwiebel 60 g","Sojasauce natriumarm 10 ml","Rapsöl 8 ml"], steps: ["Reis garen; Eier vollständig stocken.","Tomaten mit Zwiebel sanft schmoren; Tofu zugeben.","Mild abschmecken, mit Reis servieren."], checks: "Gastritis ✓ milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest", swaps: "Tofu ↔ Putenbrustwürfel; Reis ↔ Vollkornreis.", side: "Gedämpfter Pak Choi.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili") },
  { id: "do-a", title: "Bulgogi-Style Pute (불고기) & Vollkornreis – mild", desc: "Koreanisch inspirierte Pfanne; Chili optional separat.", story: "Bulgogi stammt aus Korea; Pfannenversion ist unkompliziert.", target: "≈80 g KH gesamt (2 P.) · Protein ≈28 g p. P.", ingredients: ["Putenbrust 260 g","Vollkornreis (roh) 90 g","Zwiebel 80 g","Karotte 120 g","Champignons 150 g","Sojasauce natriumarm 24 ml","Sesamöl 8 ml","Knoblauch 1 Stück","Birne (gerieben) 60 g"], steps: ["Pute mit Sojasauce/Birne/Knoblauch 15 Min. marinieren.","In wenig Öl zügig durchgaren.","Gemüse kurz mitgaren, mit Reis servieren."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Pute durchgegart", swaps: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis.", side: "Gurkensalat natur.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili") },
  { id: "fr-f", title: "Hühner-Congee (鸡肉粥)", desc: "Chinesischer Reisbrei mit zartem Huhn – sanft & wärmend.", story: "Congee ist in Südchina ein Klassiker.", target: "≈70 g KH gesamt (2 P.) · Protein ≈32 g p. P.", ingredients: ["Reis (roh) 90 g","Hähnchenbrust 220 g","Ingwer 10 g","Karotte 120 g","Wasser 1100 ml","Sojasauce natriumarm 10 ml","Frühlingszwiebel 20 g"], steps: ["Reis mit Wasser 30 Min. sanft köcheln.","Hähnchen fein würfeln, 8–10 Min. mitgaren bis durch.","Mild abschmecken, Lauchgrün zugeben."], checks: "Gastritis ✓ sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart", swaps: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis.", side: "Warmer Kräutertee.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam") },
  { id: "fr-m", title: "Leichte Minestrone (IT) mit Tofu", desc: "Italienischer Gemüseeintopf, lange geköchelt und mild (max. 1×/Woche).", story: "Minestrone ist eine italienische Gemüsesuppe – hier leicht adaptiert.", target: "≈69 g KH gesamt (2 P.) · Protein ≈36 g p. P.", ingredients: ["Vollkornpasta (trocken) 60 g","Cannellini-Bohnen (abgetropft) 200 g","Karotte 150 g","Stangensellerie 100 g","Tomaten (passiert) 250 ml","Zucchini 150 g","Gemüsebrühe 800 ml","Olivenöl 8 ml","Parmesan (pasteurisiert) 20 g","Tofu fest 280 g"], steps: ["Gemüse in wenig Öl anschwitzen, mit Brühe/Passata 20–25 Min. köcheln.","Tofu/Bohnen zugeben, 5 Min. ziehen lassen.","Pasta separat kochen, zum Schluss einrühren."], checks: "Gastritis ✓ lange geköchelt · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ pasteurisierter Käse", swaps: "Tofu ↔ Hähnchenwürfel; Vollkornpasta ↔ Gerste.", side: "Kräutertee (warm).", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, a few wholegrain pasta pieces") },
  { id: "fr-a", title: "Gebackener Lachs Teriyaki (照り焼き) mit Brokkoli & Reis", desc: "Japanisch inspiriert, natriumarme Sauce, im Ofen gegart.", story: "Teriyaki ist eine japanische Zubereitungsart – aus dem Ofen besonders unkompliziert.", target: "≈75 g KH gesamt (2 P.) · Protein ≈30 g p. P.", ingredients: ["Lachsfilet 320 g","Reis (roh) 90 g","Brokkoli 300 g","Sojasauce natriumarm 22 ml","Mirin 8 ml","Honig 4 g","Ingwer 8 g"], steps: ["Sauce (Sojasauce + wenig Mirin/Honig + Ingwer) anrühren.","Lachs bestreichen; 12–14 Min. bei 200 °C backen (durchgaren).","Reis und gedämpften Brokkoli servieren."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈75 g KH (Süße minimal) · Schwangerschaft ✓ Lachs durchgegart", swaps: "Reis ↔ Vollkornreis; Brokkoli ↔ Pak Choi.", side: "Warmer Grüntee.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice") },
  { id: "sa-f", title: "Yudofu-Schale (湯豆腐) mit kleinem Reis", desc: "Japanischer Tofu im heißen Sud, sehr bekömmlich.", story: "Spezialität aus Kyoto – schlicht, warm und beruhigend.", target: "≈62 g KH gesamt (2 P.) · Protein ≈22 g p. P.", ingredients: ["Tofu fest 300 g","Wasser 900 ml","Kombu 2 g","Sojasauce natriumarm 12 ml","Reis (roh) 70 g","Frühlingszwiebel 15 g"], steps: ["Wasser erhitzen, Kombu 5 Min. mitziehen lassen und entfernen (Jod sparsam).","Tofu im Sud 4–5 Min. heiß ziehen lassen.","Mit etwas Sojasauce und Lauch, dazu kleiner Reis servieren."], checks: "Gastritis ✓ sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart, Jod sparsam", swaps: "Reis ↔ Vollkornreis; Sojasauce ↔ milde Brühe.", side: "Warmer Bancha-Tee; milde Rettich-Pickles (ohne Schärfe).", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Hot tofu in clear broth (yudofu) in a small pot, small rice bowl, steam visible") },
  { id: "sa-m", title: "Hühner-Mais-Suppe (鸡蓉玉米羹) & kleiner Reis", desc: "Chinesische, sanft gebundene Suppe; Ei vollständig gestockt.", story: "Beliebt in vielen Regionen Chinas – mild und freundlich zum Magen.", target: "≈68 g KH gesamt (2 P.) · Protein ≈28 g p. P.", ingredients: ["Hähnchenbrust 220 g","Mais (Körner, gekocht) 200 g","Ei 1 Stück","Wasser 900 ml","Gemüsebrühe 300 ml","Maisstärke 12 g","Sojasauce natriumarm 8 ml","Reis (roh) 60 g","Ingwer 6 g"], steps: ["Huhn fein würfeln und in Brühe/Wasser 8–10 Min. garziehen.","Mais zugeben; mit Stärke sanft binden.","Ei verquirlt einlaufen lassen und rühren, bis komplett gestockt."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Ei vollständig gestockt, Huhn durchgegart", swaps: "Reis ↔ Vollkornreis; Huhn ↔ Tofu.", side: "Gedünsteter Spinat.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Chinese chicken and corn soup, silky ribbons of fully set egg, small bowl of rice") },
  { id: "sa-a", title: "Miso-gebackener Seelachs & Reis (味噌焼き)", desc: "Japanisch inspiriert – Seelachs im Ofen, mild glasiert.", story: "Backfisch mit heller Miso-Marinade – schneller, milder Abendklassiker.", target: "≈72 g KH gesamt (2 P.) · Protein ≈28 g p. P.", ingredients: ["Seelachsfilet 320 g","Reis (roh) 90 g","Miso hell 18 g","Wasser 20 ml","Honig 4 g","Ingwer 8 g","Sesamöl 6 ml"], steps: ["Miso mit wenig Wasser/optional Honig verrühren.","Fisch bestreichen; 12–14 Min. bei 200 °C backen (durchgaren).","Mit Reis servieren."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm", swaps: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis.", side: "Gedämpfter Pak Choi oder Brokkoli.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Oven-baked pollock with light miso glaze, steaming rice on the side") },
  { id: "so-f", title: "Zōsui – Hühner-Reissuppe (雑炊) – Ei komplett gestockt", desc: "Japanische Reis-Gemüse-Suppe; sehr mild und wärmend.", story: "Zōsui ist beliebte Resteküche in Japan – ideal für den Sonntag.", target: "≈66 g KH gesamt (2 P.) · Protein ≈24 g p. P.", ingredients: ["Reis (gekocht) 240 g","Hähnchenbrust 160 g","Karotte 120 g","Zucchini 150 g","Wasser 900 ml","Sojasauce natriumarm 10 ml","Ei 1 Stück","Ingwer 6 g"], steps: ["Gemüse 8–10 Min. sanft köcheln, Huhn in feinen Stücken 6–8 Min. garziehen.","Reis zufügen und 3–4 Min. sieden.","Ei verquirlt einlaufen lassen und rühren, bis vollständig gestockt."], checks: "Gastritis ✓ sehr mild · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ Ei/Huhn durchgegart", swaps: "Gekochter Reis ↔ frisch gekochter Reis; Huhn ↔ Tofu.", side: "Warmer Gerstentee.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Japanese zosui rice and chicken soup in a clay bowl, gentle steam") },
  { id: "so-m", title: "Soba-Schüssel mit Tofu & Shiitake (そば) – warm", desc: "Buchweizen-Nudelschale in milder Brühe, tofu-betont.", story: "Soba sind in Japan traditionell – warm sehr bekömmlich.", target: "≈75 g KH gesamt (2 P.) · Protein ≈24 g p. P.", ingredients: ["Soba (trocken) 110 g","Tofu fest 240 g","Shiitake 120 g","Frühlingszwiebel 20 g","Miso hell 20 g","Wasser 1000 ml","Sojasauce natriumarm 12 ml"], steps: ["Brühe aus Wasser/Miso/Sojasauce erhitzen; Pilze 4 Min. simmern.","Soba separat kochen, abspülen; mit Tofu in die Brühe geben.","Kurz ziehen lassen, mit Lauch servieren."], checks: "Gastritis ✓ mild · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart", swaps: "Soba ↔ Udon; Tofu ↔ Hähnchenwürfel.", side: "Blanchierter Pak Choi.", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Warm soba noodle bowl with tofu and shiitake in light broth") },
  { id: "so-a", title: "Gedämpftes Huhn mit Goji & Ingwer (枸杞清蒸鸡) & Reis", desc: "Canton-Style Dämpfen – sehr mild und aromatisch.", story: "Schonendes Dämpfen mit Ingwer ist in Südchina verbreitet.", target: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.", ingredients: ["Hähnchenbrust 300 g","Reis (roh) 90 g","Goji-Beeren (getrocknet) 8 g","Ingwer 10 g","Frühlingszwiebel 20 g","Sojasauce natriumarm 12 ml","Sesamöl 6 ml"], steps: ["Hähnchen in Scheiben auf Ingwer legen, mit Goji belegen und 12–14 Min. dämpfen (durchgaren).","Mit wenig Sojasauce/Sesamöl beträufeln.","Mit frisch gekochtem Reis servieren."], checks: "Gastritis ✓ gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart", swaps: "Hähnchen ↔ Pute; Reis ↔ Vollkornreis.", side: "Gedünsteter Brokkoli oder Pak Choi.", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Steamed chicken slices with goji berries and ginger, light soy drizzle, bowl of rice") }
];

// ------------------------------ Helpers -------------------------------
const groupByDay = (arr) => {
  const map = { mo:[], di:[], mi:[], do:[], fr:[], sa:[], so:[] };
  arr.forEach((r)=> map[r.id.split("-")[0]].push(r));
  Object.values(map).forEach((list)=>
    list.sort((a,b)=> ["f","m","a"].indexOf(a.id.split("-")[1]) - ["f","m","a"].indexOf(b.id.split("-")[1]))
  );
  return map;
};

const parseLine = (s) => {
  const re = /(.*)\s(\d+[\.,]?\d*)\s(g|ml|l|EL|TL|Stück)/i;
  const m = s.match(re);
  if (!m) return null;
  let name = m[1].trim();
  let qty = parseFloat(String(m[2]).replace(",", "."));
  let unit = m[3];
  if (unit === "l") { unit = "ml"; qty = qty * 1000; }
  return { name, qty, unit };
};

const collectList = (data) => {
  const map = new Map();
  data.forEach((r) => {
    const list = Array.isArray(r.ingredients) ? r.ingredients : [];
    list.forEach((line) => {
      const p = parseLine(line);
      if (!p) return;
      const key = `${p.name}__${p.unit}`;
      const prev = map.get(key) || 0;
      map.set(key, prev + p.qty);
    });
  });
  const items = Array.from(map.entries()).map(([key, qty]) => {
    const [name, unit] = key.split("__");
    return { name, qty, unit };
  });
  items.sort((a, b) => a.name.localeCompare(b.name, "de"));
  return items;
};

const categorize = (name) => {
  const n = name.toLowerCase();
  if (/(lachs|kabeljau|seelachs|hähnchen|pute|rinderhack|ei|eier|tofu|edamame|cannellini|bohnen)/i.test(n)) return "Protein/Fisch/Tofu";
  if (/(reis\b|udon|soba|reisnudeln|pasta|gerste|perlgerste)/i.test(n)) return "Reis/Nudeln/Sättigung";
  if (/(brokkoli|pak choi|zucchini|karotte|paprika|zwiebel|frühlingszwiebel|shiitake|ingwer|tomaten|mais|kürbis|spinat|gurke|champignons)/i.test(n)) return "Gemüse/Pilze";
  if (/(miso|sojasauce|wakame|kombu|sesamöl|gemüsebrühe|wasser|mirin|honig|maisstärke|olivenöl|rapsöl|salz)/i.test(n)) return "Algen/Brühen/Würze";
  return "Algen/Brühen/Würze";
};

const groupList = (list) => {
  const groups = { "Protein/Fisch/Tofu": [], "Gemüse/Pilze": [], "Reis/Nudeln/Sättigung": [], "Algen/Brühen/Würze": [] };
  list.forEach((it) => { groups[categorize(it.name)].push(it); });
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => a.name.localeCompare(b.name, "de")));
  return groups;
};

const LIST_SUMMARY = groupList(collectList(DATA));

function InfoBadge({ show }) {
  if (!show) return null;
  const text = "💊 Metformin mit der Mahlzeit einnehmen";
  return (<div className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"><span>{text}</span></div>);
}

function useLocalImage(key) {
  const [src, setSrc] = useState(null);
  useEffect(() => { try { const s = localStorage.getItem(key); if (s) setSrc(s); } catch {} }, [key]);
  const onChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setSrc(dataUrl);
      try { localStorage.setItem(key, dataUrl); } catch {}
    };
    reader.readAsDataURL(file);
  };
  return [src, onChange];
}

function UploadBox({ storageKey, label }) {
  const [src, onChange] = useLocalImage(storageKey);
  return (<div className="print:hidden">
    <label className="text-sm text-slate-600">{label}</label>
    <input type="file" accept="image/*" className="block mt-1" onChange={(e) => onChange(e.target.files?.[0])} />
    {src && (<div className="mt-2"><img src={src} alt="upload" className="w-full rounded-lg border" /></div>)}
  </div>);
}

function Overview({ data }) {
  const perDay = useMemo(() => groupByDay(data), [data]);
  const DAY_NAME = DAY_NAME_DE;
  return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    {DAYS_ORDER.map((d) => (
      <div key={d} style={cardMainStyle}>
        <div className="text-sky-700 text-sm mb-2">{DAY_NAME[d]}</div>
        <div className="grid grid-cols-3 gap-2">
          {perDay[d].map((r) => {
            const meal = r.id.split("-")[1];
            return (
              <div key={r.id} className="border rounded-md p-2 text-xs">
                <div className="text-slate-700 font-semibold mb-1">{meal === "f" ? "Frühstück" : meal === "m" ? "Mittag" : "Abend"}</div>
                <div className="text-slate-800 line-clamp-2 mb-1">{safeText(r.title, lang)}</div>
                <div className="text-amber-700">🌾 {safeText(r.target, lang)}</div>
                {r.remind && <div className="text-xs mt-1">💊</div>}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>);
}

function RecipeCard({ r }) {
  const day = r.id.split("-")[0];
  const meal = r.id.split("-")[1];
  const DAY_NAME = DAY_NAME_DE;
  return (
    <div className="grid grid-cols-12 gap-4 break-inside-avoid-page" style={{ pageBreakInside: "avoid" }}>
      <div className="col-span-12 md:col-span-4" style={cardPanelStyle}>
        <UploadBox storageKey={"wk44-" + r.id + "-img"} label="Bild-Upload (optional)" />
        <div className="mt-3 text-sm text-slate-700">
          <div className="mb-2"><span className="font-medium">Kurzbeschreibung:</span> {safeText(r.desc, lang)}</div>
          <div className="mb-2"><span className="font-medium">Ziel:</span> {safeText(r.target, lang)}</div>
          <div className="mb-2"><span className="font-medium">Checks:</span> {safeText(r.checks, lang)}</div>
          <div className="mb-2"><span className="font-medium">Beilage/Drink:</span> {safeText(r.side, lang)}</div>
          <InfoBadge show={r.remind} />
        </div>
      </div>
      <div className="col-span-12 md:col-span-8" style={cardMainStyle}>
        <div className="text-sky-700 text-sm mb-1">{DAY_NAME[day]} – {meal === "f" ? "Morgen" : meal === "m" ? "Mittag" : "Abend"}</div>
        <h2 className="text-2xl font-bold text-slate-900">{safeText(r.title, lang)}</h2>
        <p className="text-[12px] text-slate-700 mt-1">{safeText(r.story, lang)}</p>
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Zutaten (2 Personen)</h3>
          <ul className="list-disc pl-5">{asList(r.ingredients, lang).map((it, i) => (<li key={i}>{it}</li>))}</ul>
        </div>
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Zubereitung</h3>
          <ol className="list-decimal pl-5">{asList(r.steps, lang).map((it, i) => (<li key={i} className="mb-1">{it}</li>))}</ol>
        </div>
        <div className="text-sm text-slate-700"><span className="font-medium">Austausche:</span> {safeText(r.swaps, lang)}</div>
      </div>
    </div>
  );
}

export default function Woche44DE() {
  const [tab, setTab] = useState("kochbuch");
  const [dl, setDl] = useState({ pdfCook: null, pdfList: null, htmlCook: null, htmlList: null });

  const shopping = useMemo(() => collectList(DATA), []);
  const grouped = useMemo(() => groupList(shopping), [shopping]);

  const cssLandscape = useMemo(() => buildEmbedCss({ orientation: "landscape" }), []);
  const cssPortrait = useMemo(() => buildEmbedCss({ orientation: "portrait" }), []);

  const handleExportPDF = async (which) => {
    const id = which === "kochbuch" ? "cookbook-root" : "list-root";
    const css = which === "kochbuch" ? cssLandscape : cssPortrait;
    const file = `${FILE_BASE}-${which}-de.pdf`;
    const blob = await exportPDFById(id, { filename: file, orientation: which === "kochbuch" ? "landscape" : "portrait", css });
    const url = URL.createObjectURL(blob);
    setDl((s) => ({ ...s, [which === "kochbuch" ? "pdfCook" : "pdfList"]: { url, name: file } }));
  };

  const handleExportHTML = async (which) => {
    const id = which === "kochbuch" ? "cookbook-root" : "list-root";
    const file = `${FILE_BASE}-${which}-de.html`;
    const blob = await exportHTMLById(id, { filename: file });
    const url = URL.createObjectURL(blob);
    setDl((s) => ({ ...s, [which === "kochbuch" ? "htmlCook" : "htmlList"]: { url, name: file } }));
  };

  useEffect(() => { Tests(); }, []);

  return (
    <div className="min-h-screen p-6" style={{ background: COLORS.pageBg, color: COLORS.text }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">GhibliKitchen – Woche 44</h1>
            <div className="text-slate-600">Start: {meta.startDate} · Datei: {FILE_BASE}</div>
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-2 rounded-2xl bg-emerald-600 text-white shadow" onClick={() => handleExportPDF(tab)}>{UI[lang]?.buttons?.pdf || "PDF erzeugen"}</button>
            <button className="px-3 py-2 rounded-2xl bg-indigo-600 text-white shadow" onClick={() => handleExportHTML(tab)}>{UI[lang]?.buttons?.html || "HTML exportieren"}</button>
            <button className="px-3 py-2 rounded-2xl bg-sky-600 text-white shadow" onClick={() => window.print()}>{UI[lang]?.buttons?.print || "Drucken"}</button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("kochbuch")} className={`px-3 py-2 rounded-2xl border ${tab === "kochbuch" ? "bg-white" : "bg-transparent"}`}>{UI[lang]?.tabs?.cookbook || "Kochbuch"}</button>
          <button onClick={() => setTab("einkauf")} className={`px-3 py-2 rounded-2xl border ${tab === "einkauf" ? "bg-white" : "bg-transparent"}`}>{UI[lang]?.tabs?.list || "Einkaufsliste"}</button>
        </div>

        {tab === "kochbuch" ? (
          <div id="cookbook-root" className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4" style={cardPanelStyle}>
                <h2 className="text-xl font-semibold mb-2">Cover & Hinweise</h2>
                <UploadBox storageKey="wk44-cover-de" label="Cover-Bild (optional)" />
                <ul className="text-sm text-slate-700 mt-3 list-disc pl-5">
                  <li>Gastritis (streng): keine Schärfe, wenig Öl, milde Säure, warm servieren.</li>
                  <li>Diabetes: pro Mahlzeit (2 P.) 60–90 g KH; ballaststoffbetont.</li>
                  <li>Schwangerschaft: nichts Rohes; alles durchgaren; Jod sparsam; Sojasauce natriumarm.</li>
                  <li>💊 Metformin-Reminder nur bei Frühstück & Abendessen.</li>
                </ul>
              </div>
              <div className="col-span-12 md:col-span-8" style={cardMainStyle}>
                <h2 className="text-xl font-semibold mb-2">Wochenübersicht</h2>
                <Overview data={DATA} />
              </div>
            </div>

            {DAYS_ORDER.map((d) => (
              <div key={d} className="space-y-6">
                {groupByDay(DATA)[d].map((r) => (<RecipeCard key={r.id} r={r} />))}
              </div>
            ))}

            <div className="mt-4 text-sm">
              {dl.pdfCook && (<div className="mb-1">PDF: <a className="text-sky-700 underline" href={dl.pdfCook.url} download>{dl.pdfCook.name}</a></div>)}
              {dl.htmlCook && (<div>HTML: <a className="text-sky-700 underline" href={dl.htmlCook.url} download>{dl.htmlCook.name}</a></div>)}
            </div>
          </div>
        ) : (
          <div id="list-root" style={cardMainStyle}>
            <h2 className="text-2xl font-bold mb-4">GhibliKitchen – Einkaufsliste – Woche 44</h2>
            <p className="text-slate-700 mb-4">Automatisch summierte Wochenmengen für 21 Rezepte. Einheiten: g/ml/EL/TL/Stück; l wird zu ml normalisiert.</p>

            {Object.entries(LIST_SUMMARY).map(([grp, items]) => (
              <div key={grp} className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{grp}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {items.map((it, i) => (
                    <div key={i} className="flex items-center justify-between border rounded-md p-2">
                      <span className="text-slate-800">{it.name}</span>
                      <span className="font-mono">{Math.round(it.qty * 100) / 100} {it.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-4 text-sm">
              {dl.pdfList && (<div className="mb-1">PDF: <a className="text-sky-700 underline" href={dl.pdfList.url} download>{dl.pdfList.name}</a></div>)}
              {dl.htmlList && (<div>HTML: <a className="text-sky-700 underline" href={dl.htmlList.url} download>{dl.htmlList.name}</a></div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Tests() {
  try {
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zutaten zu wenig: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Steps zu wenig: ${r.id}`);
    });
    const asJson = JSON.stringify(DATA);
    if (asJson.includes('"de":') || asJson.includes('"zh":') || asJson.includes('{"de"') || asJson.includes('{"zh"')) {
      throw new Error("DATA muss monolingual sein (keine { de, zh }-Objekte).");
    }
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
    console.log("[GhibliKitchen] All tests passed (DE JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}
