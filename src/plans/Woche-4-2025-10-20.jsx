// Datei: Woche-4-2025-10-20.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

export const meta = { title: "Woche 4", startDate: "2025-10-20", id: "woche-4-2025-10-20" };
const FILE_BASE = "Woche 4 2025-10-20";

const UI_TITLES = {
  main: "GhibliKitchen – Woche 4",
  list: "GhibliKitchen – Einkaufsliste – Woche 4",
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

const dayLabel = (id) => {
  const d = id.split("-")[0];
  return d === "mo" ? "Montag" : d === "di" ? "Dienstag" : d === "mi" ? "Mittwoch" : d === "do" ? "Donnerstag" : d === "fr" ? "Freitag" : d === "sa" ? "Samstag" : "Sonntag";
};
const mealTitle = (id) => {
  const part = id.split("-")[1];
  return part === "f" ? "Morgen" : part === "m" ? "Mittag" : "Abend";
};
const mealLabel = (id) => {
  const part = id.split("-")[1];
  return part === "f" ? "Frühstück" : part === "m" ? "Mittag" : "Abendessen";
};

// ---------- DATA (zweisprachig DE/ZH) ----------
const DATA = [
  // Montag
  {
    id: "mo-f",
    title: { de: "Reisbrei mit Lachs & Seidentofu (お粥)", zh: "鲑鱼嫩豆腐粥（お粥）" },
    desc:  { de: "Japanischer Okayu – sanfter Reisbrei mit gedämpftem Lachs und Seidentofu; inspiriert von Just One Cookbook.", zh: "日式 Okayu —— 绵柔米粥配清蒸鲑鱼与嫩豆腐；灵感来自 Just One Cookbook。" },
    story: { de: "Kommt aus Japan; beliebt als Frühstück und in der Erkältungszeit. Besonders passend in Herbst/Winter – mild und wärmend.", zh: "来自日本；常见于早餐与感冒季。尤适合秋冬，温和暖胃。" },
    target: { de: "≈70 g KH gesamt (2 P.) · Protein ≈20 g p. P.", zh: "≈70 g 碳水（两人份）· 蛋白≈20 g/人" },
    ingredients: {
      de: ["Reis (roh) 90 g","Wasser 800 ml","Lachsfilet 120 g","Tofu seiden 200 g","Ingwer 10 g","Frühlingszwiebel 20 g","Sojasauce natriumarm 10 ml"],
      zh: ["生米 90 g","水 800 ml","鲑鱼柳 120 g","嫩豆腐 200 g","姜 10 g","小葱 20 g","低钠酱油 10 ml"]
    },
    steps: {
      de: ["Reis waschen, mit Wasser aufkochen und 25–30 Min. sanft köcheln.","Lachs über dem Brei 8–10 Min. dämpfen, zerpflücken.","Tofu zugeben, mild abschmecken, Lauchgrün kurz ziehen lassen."],
      zh: ["淘米加水，大火煮沸后小火煮25–30分钟。","鲑鱼隔水蒸8–10分钟，掰碎。","加入豆腐，温和调味，撒葱花略焖。"]
    },
    checks: { de: "Gastritis – mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Fisch durchgegart, quecksilberarm", zh: "胃炎——温和暖胃 · 糖尿病 ✓ ——≈70 g 碳水 · 孕期 ✓ 鱼全熟、低汞" },
    swaps:  { de: "Seidentofu ↔ fester Tofu; Lachs ↔ Kabeljau; Alternativen: Gyudon (Rind, mager) oder Buta no Shōgayaki (Schwein, mager).", zh: "嫩豆腐 ↔ 硬豆腐；鲑鱼 ↔ 鳕鱼；可替：牛肉盖饭（瘦）或姜烧猪肉（瘦）。" },
    side:   { de: "Warmer Gerstentee.", zh: "温大麦茶。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu cubes, scallions, steam rising")
  },
  {
    id: "mo-m",
    title: { de: "Mildes Bibimbap (비빔밥) – Chili optional", zh: "温和拌饭（비빔밥）— 辣酱可选" },
    desc:  { de: "Koreanische Reisschale mit Gemüse und Rind; Chili separat optional – inspiriert von My Korean Kitchen.", zh: "韩式拌饭，蔬菜与牛肉搭配；辣酱分开可选；灵感来自 My Korean Kitchen。" },
    story: { de: "Aus Korea; ganzjähriges Alltagsgericht. Warm serviert, ausgewogen und ohne Schärfe gut für den Mittag.", zh: "源自韩国；全年常吃。热食均衡，不辣，适合午餐。" },
    target: { de: "≈70 g KH gesamt (2 P.) · Protein ≈31 g p. P.", zh: "≈70 g 碳水（两人份）· 蛋白≈31 g/人" },
    ingredients: {
      de: ["Vollkornreis (roh) 90 g","Rinderhack mager 220 g","Spinat 200 g","Karotte 120 g","Shiitake 120 g","Eier 2 Stück","Sojasauce natriumarm 20 ml","Sesamöl 10 ml"],
      zh: ["糙米 90 g","瘦牛肉末 220 g","菠菜 200 g","胡萝卜 120 g","香菇 120 g","鸡蛋 2 个","低钠酱油 20 ml","香油 10 ml"]
    },
    steps: {
      de: ["Reis garen; Gemüse dünsten/kurz anbraten.","Hack krümelig und gar braten; mild würzen.","Anrichten; Eier vollständig braten (Eigelb fest)."],
      zh: ["煮饭；蔬菜焯或快炒。","牛肉末炒散至全熟，温和调味。","摆入碗中；鸡蛋全熟煎制。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest, Fleisch durchgegart", zh: "胃炎——温和 · 糖尿病 ✓ ——≈70 g 碳水 · 孕期 ✓ 鸡蛋全熟，肉全熟" },
    swaps:  { de: "Rinderhack ↔ Putenhack; Vollkornreis ↔ Sushireis; Alternativen: Gyudon (Rind, mild) oder Butadon (Schwein, mild).", zh: "牛肉末 ↔ 火鸡肉末；糙米 ↔ 寿司米；可替：牛肉盖饭（温和）或猪肉盖饭（温和）。" },
    side:   { de: "Chili separat in Minischälchen.", zh: "辣酱另放小碟，按需添加。" },
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top")
  },
  {
    id: "mo-a",
    title: { de: "Mildes Mapo-Tofu (麻婆豆腐) – Chili optional", zh: "温和麻婆豆腐（麻婆豆腐）— 辣椒可选" },
    desc:  { de: "Chinesischer Klassiker in milder, miso-basierter Sauce; inspiriert von Omnivore’s Cookbook.", zh: "中式经典，改为温和口味、以味噌增旨；灵感来自 Omnivore’s Cookbook。" },
    story: { de: "Ursprung Sichuan; diese milde Hausmannskost-Variante ist abends unkompliziert und wohlig.", zh: "起源四川；此为清淡家常版，适合晚餐，舒适易做。" },
    target: { de: "≈70 g KH gesamt (2 P.) · Protein ≈32 g p. P.", zh: "≈70 g 碳水（两人份）· 蛋白≈32 g/人" },
    ingredients: {
      de: ["Tofu fest 400 g","Shiitake 150 g","Miso hell 20 g","Gemüsebrühe 300 ml","Sojasauce natriumarm 20 ml","Knoblauch 1 Zehe","Ingwer 10 g","Maisstärke 10 g","Brauner Reis (roh) 90 g"],
      zh: ["硬豆腐 400 g","香菇 150 g","白味噌 20 g","蔬菜高汤 300 ml","低钠酱油 20 ml","蒜 1 瓣","姜 10 g","玉米淀粉 10 g","糙米 90 g"]
    },
    steps: {
      de: ["Reis garen; Pilze dünsten.","Brühe mit Miso/Sojasauce erhitzen; Tofu 4–5 Min. ziehen lassen.","Mit Stärke leicht binden, über Reis servieren."],
      zh: ["煮米饭；香菇焯/炒软。","高汤+味噌+酱油加热；豆腐下锅浸煮4–5分钟。","淀粉勾薄芡，浇在米饭上。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart", zh: "胃炎——温和 · 糖尿病 ✓ ——≈70 g 碳水 · 孕期 ✓ 全熟" },
    swaps:  { de: "Brauner Reis ↔ Reis; Miso ↔ milde Bohnenpaste; Alternativen: Schweinehack-Mapo（ohne Chili）oder Rind-Tofu-Pfanne (mild).", zh: "糙米 ↔ 白米；味噌 ↔ 清淡豆瓣；可替：无辣猪肉末麻婆或牛肉豆腐清炒。"},
    side:   { de: "Gedünsteter Pak Choi.", zh: "清蒸上海青。"},
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes")
  },

  // Dienstag
  {
    id: "di-f",
    title: { de: "Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)", zh: "鲑鱼饭团与味噌汤（おにぎり・味噌汁）" },
    desc:  { de: "Reisbälle mit gekochtem Lachs und milde Misosuppe; inspiriert von Just One Cookbook.", zh: "煮熟鲑鱼做饭团，配清淡味噌汤；灵感来自 Just One Cookbook。" },
    story: { de: "Teil der japanischen Bento-Kultur; ganzjährig beliebt. Als Frühstück/ Snack leicht und mobil.", zh: "日本便当文化的一部分；全年受欢迎。适合作为早餐或小食。" },
    target: { de: "≈78 g KH gesamt (2 P.) · Protein ≈27 g p. P.", zh: "≈78 g 碳水（两人份）· 蛋白≈27 g/人" },
    ingredients: {
      de: ["Sushi-Reis (roh) 100 g","Lachsfilet 150 g","Nori 1 Blatt","Miso hell 20 g","Tofu fest 150 g","Wakame (getrocknet) 2 g","Wasser 900 ml","Sojasauce natriumarm 10 ml"],
      zh: ["寿司米 100 g","鲑鱼柳 150 g","海苔 1 片","白味噌 20 g","硬豆腐 150 g","裙带菜干 2 g","水 900 ml","低钠酱油 10 ml"]
    },
    steps: {
      de: ["Reis kochen, Onigiri formen; Lachs zerzupfen und füllen; mit Nori umwickeln.","Miso in heißem Wasser lösen, Tofu/Wakame kurz ziehen lassen（不煮沸）.","Mild abschmecken."],
      zh: ["煮饭成团；熟鲑鱼掰碎入馅，外包海苔。","味噌用热水化开，加入豆腐与裙带菜略浸（勿沸）。","温和调味。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Lachs durchgegart, Wakame sparsam", zh: "胃炎——温和 · 糖尿病 ✓ ——≈78 g 碳水 · 孕期 ✓ 鲑鱼全熟，裙带菜少量" },
    swaps:  { de: "Sushi-Reis ↔ Vollkornreis; Lachs ↔ Seelachs; Alternativen: Buta Soboro Don (猪肉碎盖饭，温和) oder Gyudon (牛丼，瘦).", zh: "寿司米 ↔ 糙米；鲑鱼 ↔ 狭鳕；可替：猪肉碎盖饭（温和）或牛肉盖饭（瘦）。" },
    side:   { de: "Milder grüner Tee (optional koffeinfrei).", zh: "清淡绿茶（可选脱咖）。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame")
  },
  {
    id: "di-m",
    title: { de: "Reisnudelpfanne mit Hähnchen (河粉)", zh: "鸡肉河粉炒（河粉）" },
    desc:  { de: "Chinesische Wokpfanne, mild und gemüsebetont; inspiriert von The Woks of Life.", zh: "中式锅炒，蔬菜为主、口味温和；灵感来自 The Woks of Life。" },
    story: { de: "Angelehnt an kantonesische Ho-Fun-Gerichte aus Südchina; schnell und ausgewogen.", zh: "参考粤式炒河粉；快速、均衡，四季皆宜。" },
    target: { de: "≈74 g KH gesamt (2 P.) · Protein ≈39 g p. P.", zh: "≈74 g 碳水（两人份）· 蛋白≈39 g/人" },
    ingredients: {
      de: ["Reisnudeln (trocken) 80 g","Hähnchenbrust 250 g","Paprika 150 g","Pak Choi 200 g","Zwiebel 80 g","Karotte 100 g","Sojasauce natriumarm 25 ml","Sesamöl 10 ml"],
      zh: ["干河粉 80 g","鸡胸肉 250 g","彩椒 150 g","小白菜 200 g","洋葱 80 g","胡萝卜 100 g","低钠酱油 25 ml","香油 10 ml"]
    },
    steps: {
      de: ["Reisnudeln einweichen/blanchieren.","Hähnchenstreifen in wenig Öl vollständig garen.","Gemüse zufügen, mild würzen und schwenken."],
      zh: ["河粉泡软/焯水。","鸡肉条少油炒至全熟。","入蔬菜翻炒，温和调味。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart", zh: "胃炎——温和 · 糖尿病 ✓ ——≈74 g 碳水 · 孕期 ✓ 鸡肉全熟" },
    swaps:  { de: "Reisnudeln ↔ Udon; Hähnchen ↔ Tofu; Alternativen: Pho Xao Bo（牛肉炒河粉，温和）或 猪里脊小白菜炒（温和）。", zh: "河粉 ↔ 乌冬；鸡肉 ↔ 豆腐；可替：越式牛肉炒粉（温和）或猪里脊炒小白菜（温和）。" },
    side:   { de: "Gurkenscheiben natur.", zh: "黄瓜片（原味）。" },
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili")
  },
  {
    id: "di-a",
    title: { de: "Doenjang-Jjigae mit Gerste (된장찌개)", zh: "大酱汤配大麦（된장찌개）" },
    desc:  { de: "Koreanischer Sojabohnen-Eintopf, herzhaft-mild; inspiriert von Seon Kyoung Longest.", zh: "韩式大酱汤，醇厚而温和；灵感来自 Seon Kyoung Longest。" },
    story: { de: "Koreanischer Alltagseintopf, v. a. in Herbst/Winter beliebt; kräftig, aber mild.", zh: "韩国日常炖汤，秋冬尤受欢迎；味厚不辣。" },
    target: { de: "≈86 g KH gesamt (2 P.) · Protein ≈24 g p. P.", zh: "≈86 g 碳水（两人份）· 蛋白≈24 g/人" },
    ingredients: {
      de: ["Doenjang 30 g","Tofu fest 300 g","Zucchini 200 g","Kartoffeln 200 g","Shiitake 100 g","Zwiebel 70 g","Wasser 800 ml","Sojasauce natriumarm 10 ml","Perlgerste (roh) 70 g"],
      zh: ["大酱 30 g","硬豆腐 300 g","西葫芦 200 g","土豆 200 g","香菇 100 g","洋葱 70 g","水 800 ml","低钠酱油 10 ml","珍珠大麦 70 g"]
    },
    steps: {
      de: ["Doenjang in Wasser lösen; Gemüse 12–15 Min. sanft köcheln.","Tofu zugeben und ziehen lassen.","Gerste separat garen und dazu reichen."],
      zh: ["大酱溶于水；蔬菜小火炖12–15分钟。","加入豆腐略煮。","大麦另煮，食用时同享。"]
    },
    checks: { de: "Gastritis – herzhaft, nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ vollständig gegart", zh: "胃炎——醇厚不辣 · 糖尿病 ✓ ——≈86 g 碳水 · 孕期 ✓ 全熟" },
    swaps:  { de: "Gerste ↔ Reis; Tofu ↔ Putenbrust; Alternativen: Tonjiru（猪味噌汤，温和）或寿喜烧式牛蔬锅（低糖）。", zh: "大麦 ↔ 米饭；豆腐 ↔ 火鸡胸肉；可替：猪肉味噌汤（温和）或寿喜烧风牛蔬锅（低糖）。" },
    side:   { de: "Mildes Gurken-Pickle (ohne Schärfe).", zh: "温和腌黄瓜（无辣）。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley")
  },

  // Mittwoch
  {
    id: "mi-f",
    title: { de: "Kürbis-Juk mit Tofu & Edamame (단호박죽)", zh: "南瓜粥配豆腐与毛豆（단호박죽）" },
    desc:  { de: "Samtiger Kürbisreisbrei, proteinreich; inspiriert von Mom’s Korean Recipes.", zh: "绵滑南瓜米粥，蛋白更足；灵感来自 Mom’s Korean Recipes。" },
    story: { de: "Aus Korea; nutzt Herbstkürbis. Mild und cremig – gut für kühle Morgen.", zh: "来自韩国；用秋季南瓜。温和顺滑，适合清凉早晨。"},
    target: { de: "≈75 g KH gesamt (2 P.) · Protein ≈22 g p. P.", zh: "≈75 g 碳水（两人份）· 蛋白≈22 g/人" },
    ingredients: {
      de: ["Kürbis (Kabocha/Hokkaido) 400 g","Reis (roh) 70 g","Tofu fest 200 g","Edamame (geschält) 100 g","Ingwer 8 g","Wasser 900 ml","Salz 1 Prise"],
      zh: ["南瓜（日本南瓜/北海道南瓜）400 g","生米 70 g","硬豆腐 200 g","毛豆仁 100 g","姜 8 g","水 900 ml","盐 少许"]
    },
    steps: {
      de: ["Kürbis + Reis 25 Min. weich kochen.","Pürieren; Tofu/Edamame 3–4 Min. ziehen lassen.","Mild abschmecken."],
      zh: ["南瓜与米煮约25分钟至软。","打匀；入豆腐与毛豆再煮3–4分钟。","温和调味。"]
    },
    checks: { de: "Gastritis – weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart", zh: "胃炎——柔软温热 · 糖尿病 ✓ ——≈75 g 碳水 · 孕期 ✓ 全熟" },
    swaps:  { de: "Edamame ↔ weiße Bohnen; Tofu ↔ Hähnchenwürfel; Alternativen: Gyudon（瘦牛）或姜烧猪肉（瘦）。", zh: "毛豆 ↔ 白芸豆；豆腐 ↔ 鸡肉丁；可替：牛肉盖饭（瘦）或姜烧猪肉（瘦）。" },
    side:   { de: "Warmer Reis- oder Gerstentee.", zh: "温热米茶或大麦茶。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam")
  },
  {
    id: "mi-m",
    title: { de: "Udon-Suppe mit Huhn & Brokkoli (うどん)", zh: "鸡肉西兰花乌冬汤（うどん）" },
    desc:  { de: "Japanische Nudelsuppe, klar und mild; inspiriert von Just One Cookbook.", zh: "日式清汤乌冬，口味清淡；灵感来自 Just One Cookbook。" },
    story: { de: "Ganzjährig beliebt, besonders in kühlen Monaten; sanfte, sättigende Mittagsoption.", zh: "全年常吃，凉季尤佳；温和且有饱足感的午餐。" },
    target: { de: "≈79 g KH gesamt (2 P.) · Protein ≈34 g p. P.", zh: "≈79 g 碳水（两人份）· 蛋白≈34 g/人" },
    ingredients: {
      de: ["Udon (trocken) 110 g","Hähnchenbrust 220 g","Brokkoli 200 g","Zwiebel 60 g","Miso hell 25 g","Wasser 1000 ml","Sojasauce natriumarm 15 ml"],
      zh: ["干乌冬 110 g","鸡胸肉 220 g","西兰花 200 g","洋葱 60 g","白味噌 25 g","水 1000 ml","低钠酱油 15 ml"]
    },
    steps: {
      de: ["Brühe mit Miso/Sojasauce erhitzen.","Hähnchen 6–8 Min. gar ziehen; Gemüse 3–4 Min. mitgaren.","Udon separat kochen, abspülen, zugeben."],
      zh: ["高汤+味噌+酱油加热。","鸡肉小火浸煮6–8分钟至熟；蔬菜再煮3–4分钟。","乌冬另煮过冷水后入汤。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart", zh: "胃炎——温和 · 糖尿病 ✓ ——≈79 g 碳水 · 孕期 ✓ 鸡肉全熟" },
    swaps:  { de: "Udon ↔ Soba; Hähnchen ↔ Tofu; Alternativen: Niku Udon（牛肉）或猪肉乌冬（温和）。", zh: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐；可替：牛肉乌冬或猪肉乌冬（温和）。" },
    side:   { de: "Kleine Schale Gurke.", zh: "小碟黄瓜。" },
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth")
  },
  {
    id: "mi-a",
    title: { de: "Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis", zh: "清蒸鳕鱼配姜与米饭（清蒸鳕鱼）" },
    desc:  { de: "Chinesisch dämpfen – zart & bekömmlich; inspiriert von Made With Lau.", zh: "中式清蒸，细嫩易消化；灵感来自 Made With Lau。" },
    story: { de: "Kantonesischer Klassiker des Dämpfens; leichtes, schonendes Abendessen.", zh: "粤式清蒸代表；清淡、适合晚餐。"},
    target: { de: "≈70 g KH gesamt (2 P.) · Protein ≈32 g p. P.", zh: "≈70 g 碳水（两人份）· 蛋白≈32 g/人" },
    ingredients: {
      de: ["Kabeljaufilet 320 g","Reis (roh) 90 g","Ingwer 15 g","Frühlingszwiebel 30 g","Sojasauce natriumarm 15 ml","Sesamöl 8 ml","Gemüsebrühe 100 ml"],
      zh: ["鳕鱼柳 320 g","生米 90 g","姜 15 g","小葱 30 g","低钠酱油 15 ml","香油 8 ml","蔬菜高汤 100 ml"]
    },
    steps: {
      de: ["Fisch auf Ingwer 8–10 Min. dämpfen.","Sojasauce+Brühe erhitzen, über Fisch geben; Sesamöl dazu.","Reis garen und servieren."],
      zh: ["鱼置姜片上蒸8–10分钟。","加热酱油与高汤浇在鱼上；点香油。","米饭另煮配食。"]
    },
    checks: { de: "Gastritis – gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm", zh: "胃炎——清蒸 · 糖尿病 ✓ ——≈70 g 碳水 · 孕期 ✓ 鳕鱼全熟、低汞" },
    swaps:  { de: "Kabeljau ↔ Seelachs; Reis ↔ Vollkornreis; Alternativen: 姜烧猪肉 或 姜丝牛肉（温和）。", zh: "鳕鱼 ↔ 狭鳕；白米 ↔ 糙米；可替：姜烧猪肉或姜丝牛肉（温和）。" },
    side:   { de: "Gedünsteter Brokkoli.", zh: "清蒸西兰花。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice")
  },

  // Donnerstag
  {
    id: "do-f",
    title: { de: "Tamagoyaki & Misosuppe mit kleinem Reis (卵焼き・味噌汁)", zh: "玉子烧与味噌汤配小份米饭（卵焼き・味噌汁）" },
    desc:  { de: "Japanisches Frühstück mit vollständig gestocktem Omelett; inspiriert von Just One Cookbook.", zh: "日式早餐，鸡蛋全熟的玉子烧；灵感来自 Just One Cookbook。" },
    story: { de: "Japanischer Frühstücksklassiker; mit Misosuppe ein milder Start in den Tag.", zh: "日本经典早餐；配味噌汤，清淡开启一天。" },
    target: { de: "≈62 g KH gesamt (2 P.) · Protein ≈24 g p. P.", zh: "≈62 g 碳水（两人份）· 蛋白≈24 g/人" },
    ingredients: {
      de: ["Eier 4 Stück","Tofu fest 150 g","Reis (roh) 80 g","Miso hell 20 g","Wakame (getrocknet) 1 g","Frühlingszwiebel 20 g","Wasser 800 ml","Sojasauce natriumarm 10 ml"],
      zh: ["鸡蛋 4 个","硬豆腐 150 g","生米 80 g","白味噌 20 g","裙带菜干 1 g","小葱 20 g","水 800 ml","低钠酱油 10 ml"]
    },
    steps: {
      de: ["Reis garen. Omelett vollständig stocken.","Misosuppe ansetzen; Tofu/Wakame kurz ziehen lassen.","Mit Frühlingszwiebel servieren."],
      zh: ["煮米饭；玉子烧煎至全熟。","煮味噌汤；豆腐与裙带菜略浸。","撒葱花上桌。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt", zh: "胃炎——温和 · 糖尿病 ✓ ——≈62 g 碳水 · 孕期 ✓ 鸡蛋全熟" },
    swaps:  { de: "Reis ↔ Vollkornreis; Tofu ↔ Hähnchenwürfel; Alternative: 牛肉乌冬（温和）。", zh: "白米 ↔ 糙米；豆腐 ↔ 鸡肉丁；可替：牛肉乌冬（温和）。" },
    side:   { de: "Warmer Grüntee (koffeinarm).", zh: "温热绿茶（低咖）。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup")
  },
  {
    id: "do-m",
    title: { de: "Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis", zh: "番茄炒蛋配豆腐与米饭（番茄炒蛋）" },
    desc:  { de: "Chinesisches Hausgericht, mild-säuerlich; inspiriert von The Woks of Life.", zh: "中式家常菜，酸甜清爽；灵感来自 The Woks of Life。" },
    story: { de: "Beliebt in China, besonders mit reifen Sommer-Tomaten; hier mild und alltagstauglich.", zh: "中国常见，夏季熟番茄尤佳；本版温和，适合日常。"},
    target: { de: "≈70 g KH gesamt (2 P.) · Protein ≈28 g p. P.", zh: "≈70 g 碳水（两人份）· 蛋白≈28 g/人" },
    ingredients: {
      de: ["Reis (roh) 90 g","Eier 4 Stück","Tofu fest 200 g","Tomaten (reif) 400 g","Zwiebel 60 g","Sojasauce natriumarm 10 ml","Rapsöl 10 ml"],
      zh: ["生米 90 g","鸡蛋 4 个","硬豆腐 200 g","熟番茄 400 g","洋葱 60 g","低钠酱油 10 ml","菜籽油 10 ml"]
    },
    steps: {
      de: ["Reis garen; Eier vollständig stocken.","Tomaten mit Zwiebel sanft schmoren; Tofu zugeben.","Mild abschmecken, mit Reis servieren."],
      zh: ["煮米饭；鸡蛋炒至全熟。","番茄与洋葱小火焖软；加豆腐略煮。","温和调味，配饭。"]
    },
    checks: { de: "Gastritis – milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest", zh: "胃炎——酸度温和、充分炖煮 · 糖尿病 ✓ ——≈70 g 碳水 · 孕期 ✓ 鸡蛋全熟" },
    swaps:  { de: "Tofu ↔ Putenbrustwürfel; Reis ↔ Vollkornreis; Alternativen: 青椒肉丝（温和）或 牛肉彩椒炒（温和）。", zh: "豆腐 ↔ 火鸡胸丁；白米 ↔ 糙米；可替：青椒肉丝（温和）或牛肉彩椒炒（温和）。" },
    side:   { de: "Gedämpfter Pak Choi.", zh: "清蒸上海青。" },
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili")
  },
  {
    id: "do-a",
    title: { de: "Bulgogi-Style Pute (불고기) & Vollkornreis – mild", zh: "温和火鸡“烤肉”配糙米（불고기）" },
    desc:  { de: "Koreanisch inspiriert; mild mariniert, kurz gebraten; Chili optional separat – inspiriert von Maangchi.", zh: "韩式灵感；温和腌制快炒；辣味另放可选；灵感来自 Maangchi。" },
    story: { de: "Aus Korea; Pfannenvariante ganzjährig beliebt. Familienfreundlich ohne Schärfe.", zh: "韩国风味；平底锅做法全年适用。无辣更适合家庭口味。"},
    target: { de: "≈80 g KH gesamt (2 P.) · Protein ≈28 g p. P.", zh: "≈80 g 碳水（两人份）· 蛋白≈28 g/人" },
    ingredients: {
      de: ["Putenbrust 250 g","Vollkornreis (roh) 90 g","Zwiebel 80 g","Karotte 120 g","Champignons 150 g","Sojasauce natriumarm 25 ml","Sesamöl 10 ml","Knoblauch 1 Zehe","Birne (gerieben) 60 g"],
      zh: ["火鸡胸肉 250 g","糙米 90 g","洋葱 80 g","胡萝卜 120 g","蘑菇 150 g","低钠酱油 25 ml","香油 10 ml","蒜 1 瓣","梨泥 60 g"]
    },
    steps: {
      de: ["Pute mit Sojasauce/Birne/Knoblauch 15 Min. marinieren.","In wenig Öl zügig durchgaren.","Gemüse kurz mitgaren, mit Reis servieren."],
      zh: ["火鸡肉与酱油/梨泥/蒜腌15分钟。","少油快炒至熟。","入蔬菜翻炒，配糙米。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Pute durchgegart", zh: "胃炎——温和 · 糖尿病 ✓ ——≈80 g 碳水 · 孕期 ✓ 火鸡全熟" },
    swaps:  { de: "Pute ↔ Hähnchen; Vollkornreis ↔ Reis; Alternativen: 牛肉烤肉（瘦）或 猪肉烤肉（无辣）。", zh: "火鸡 ↔ 鸡肉；糙米 ↔ 白米；可替：瘦牛 Bulgogi 或 无辣猪肉 Bulgogi。"},
    side:   { de: "Salatgurke natur.", zh: "生食黄瓜片。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili")
  },

  // Freitag
  {
    id: "fr-f",
    title: { de: "Hühner-Congee (鸡肉粥)", zh: "鸡肉粥（鸡肉粥）" },
    desc:  { de: "Chinesischer Reisbrei mit zartem Huhn – sanft & wärmend; inspiriert von The Woks of Life.", zh: "中式米粥配嫩鸡肉，柔和暖身；灵感来自 The Woks of Life。" },
    story: { de: "Verbreitet in Südchina und Südostasien; beliebt morgens und abends – besonders bei Regen.", zh: "流行于华南与东南亚；常作早餐或夜宵，雨天尤宜。" },
    target: { de: "≈70 g KH gesamt (2 P.) · Protein ≈34 g p. P.", zh: "≈70 g 碳水（两人份）· 蛋白≈34 g/人" },
    ingredients: {
      de: ["Reis (roh) 90 g","Hähnchenbrust 220 g","Ingwer 12 g","Karotte 120 g","Wasser 1100 ml","Sojasauce natriumarm 10 ml","Frühlingszwiebel 20 g"],
      zh: ["生米 90 g","鸡胸肉 220 g","姜 12 g","胡萝卜 120 g","水 1100 ml","低钠酱油 10 ml","小葱 20 g"]
    },
    steps: {
      de: ["Reis mit Wasser 30 Min. sanft köcheln.","Hähnchen fein würfeln, 8–10 Min. mitgaren bis durch.","Mild abschmecken, Lauchgrün zugeben."],
      zh: ["米加水小火煮约30分钟。","鸡肉切丁入粥再煮8–10分钟至熟。","温和调味，撒葱花。"]
    },
    checks: { de: "Gastritis – sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart", zh: "胃炎——很温和 · 糖尿病 ✓ ——≈70 g 碳水 · 孕期 ✓ 鸡肉全熟" },
    swaps:  { de: "Hähnchen ↔ Tofu; Karotte ↔ Kürbis; Alternativen: 猪肉粥（瘦）或 牛肉粥（瘦）。", zh: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜；可替：瘦猪粥或瘦牛粥。"},
    side:   { de: "Warmer Kräutertee.", zh: "温热草本茶。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam")
  },
  {
    id: "fr-m",
    title: { de: "Leichte Minestrone (IT) mit Tofu", zh: "清淡意式蔬菜汤配豆腐（Minestrone）" },
    desc:  { de: "Italienischer Gemüseeintopf, lange geköchelt und mild.", zh: "意式蔬菜浓汤，慢煮成味，口感温和。"},
    story: { de: "Italienischer Klassiker v. a. Spätsommer–Herbst; diese leichte Version passt zu entspannten Abenden.", zh: "意大利经典，夏末至秋季常见；清淡版适合悠闲晚间。"},
    target: { de: "≈69 g KH gesamt (2 P.) · Protein ≈39 g p. P.", zh: "≈69 g 碳水（两人份）· 蛋白≈39 g/人" },
    ingredients: {
      de: ["Vollkornpasta (trocken) 60 g","Cannellini-Bohnen (abgetropft) 200 g","Karotte 150 g","Stangensellerie 100 g","Tomaten (passiert) 250 ml","Zucchini 150 g","Gemüsebrühe 800 ml","Olivenöl 10 ml","Parmesan (pasteurisiert, optional) 20 g","Tofu fest 300 g"],
      zh: ["全麦意面 60 g","白腰豆（沥干）200 g","胡萝卜 150 g","西芹 100 g","番茄泥 250 ml","西葫芦 150 g","蔬菜高汤 800 ml","橄榄油 10 ml","巴马臣干酪（巴氏杀菌，可选）20 g","硬豆腐 300 g"]
    },
    steps: {
      de: ["Gemüse kurz anschwitzen, mit Brühe/Passata 20–25 Min. köcheln.","Tofu/Bohnen zugeben, 5 Min. ziehen lassen.","Pasta separat kochen, zum Schluss einrühren."],
      zh: ["蔬菜少油炒香，加高汤与番茄泥小火煨20–25分钟。","加入豆腐与白腰豆再煮5分钟。","意面另煮，最后拌入。"]
    },
    checks: { de: "Gastritis – lange geköchelt · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ pasteurisierter Käse optional", zh: "胃炎——长时煨煮 · 糖尿病 ✓ ——≈69 g 碳水 · 孕期 ✓ 奶酪需巴氏杀菌（可选）" },
    swaps:  { de: "Tofu ↔ Hähnchenwürfel; Vollkornpasta ↔ Gerste; Alternativen: 日式蔬菜炒配猪里脊（温和）或 牛蔬快炒（温和）。", zh: "豆腐 ↔ 鸡肉丁；全麦意面 ↔ 大麦；可替：日式蔬菜炒配猪里脊（温和）或牛蔬快炒（温和）。" },
    side:   { de: "Kräutertee (warm).", zh: "温热香草茶。"},
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, few wholegrain pasta pieces")
  },
  {
    id: "fr-a",
    title: { de: "Gebackener Lachs Teriyaki (照り焼き) mit Brokkoli & Reis", zh: "烤箱照烧鲑鱼配西兰花与米饭（照り焼き）" },
    desc:  { de: "Japanisch inspiriert, natriumarme Sauce, im Ofen gegart; inspiriert von Just One Cookbook.", zh: "日式风味，低钠酱汁，烤箱完成；灵感来自 Just One Cookbook。"},
    story: { de: "Teriyaki ist eine japanische Technik für schnelle Alltagsgerichte; aus dem Ofen besonders unkompliziert.", zh: "照烧为日本常见做法；烤箱版更省事，适合忙碌夜晚。"},
    target: { de: "≈75 g KH gesamt (2 P.) · Protein ≈32 g p. P.", zh: "≈75 g 碳水（两人份）· 蛋白≈32 g/人" },
    ingredients: {
      de: ["Lachsfilet 320 g","Reis (roh) 90 g","Brokkoli 300 g","Sojasauce natriumarm 25 ml","Mirin (optional) 10 ml","Honig (optional) 5 g","Ingwer 10 g"],
      zh: ["鲑鱼柳 320 g","生米 90 g","西兰花 300 g","低钠酱油 25 ml","味醂（可选）10 ml","蜂蜜（可选）5 g","姜 10 g"]
    },
    steps: {
      de: ["Sauce anrühren (Sojasauce + wenig Mirin/Honig + Ingwer).","Lachs bestreichen; 12–14 Min. bei 200 °C backen.","Reis und gedämpften Brokkoli servieren."],
      zh: ["调酱（酱油+少量味醂/蜂蜜+姜）。","刷在鲑鱼上，200°C 烤12–14分钟。","配米饭与蒸西兰花。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈75 g KH (Süße minimal) · Schwangerschaft ✓ Lachs durchgegart", zh: "胃炎——温和 · 糖尿病 ✓ ——≈75 g 碳水（少量甜）· 孕期 ✓ 鲑鱼全熟" },
    swaps:  { de: "Reis ↔ Vollkornreis; Brokkoli ↔ Pak Choi; Alternativen: 姜烧猪肉（温和）或 瘦牛照烧。", zh: "白米 ↔ 糙米；西兰花 ↔ 小白菜；可替：姜烧猪肉（温和）或瘦牛照烧。"},
    side:   { de: "Warmer Grüntee.", zh: "温热绿茶。"},
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice")
  },

  // Samstag
  {
    id: "sa-f",
    title: { de: "Yudofu-Schale (湯豆腐) mit kleinem Reis", zh: "汤豆腐碗配小份米饭（湯豆腐）" },
    desc:  { de: "Japanischer Tofu im heißen Sud, sehr bekömmlich.", zh: "日式热汤豆腐，清淡易消化。"},
    story: { de: "Spezialität aus Kyoto; traditionell im Winter serviert – leicht, warm, beruhigend.", zh: "京都名物；冬季常见——清淡温暖，令人舒缓。"},
    target: { de: "≈62 g KH gesamt (2 P.) · Protein ≈32 g p. P.", zh: "≈62 g 碳水（两人份）· 蛋白≈32 g/人" },
    ingredients: {
      de: ["Tofu fest 400 g","Gemüsebrühe 800 ml","Lauch 100 g","Spinat 150 g","Reis (roh) 80 g","Sojasauce natriumarm 15 ml","Sesam 10 g"],
      zh: ["硬豆腐 400 g","蔬菜高汤 800 ml","大葱 100 g","菠菜 150 g","生米 80 g","低钠酱油 15 ml","芝麻 10 g"]
    },
    steps: {
      de: ["Brühe erhitzen; Tofuwürfel 5–6 Min. ziehen lassen.","Lauch/Spinat kurz mitgaren.","Mit wenig Sojasauce servieren; Reis separat."],
      zh: ["加热高汤；豆腐块浸煮5–6分钟。","下大葱与菠菜略煮。","少量酱油调味；米饭另配。"]
    },
    checks: { de: "Gastritis – sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart", zh: "胃炎——非常温和 · 糖尿病 ✓ ——≈62 g 碳水 · 孕期 ✓ 全熟" },
    swaps:  { de: "Reis ↔ Vollkornreis; Spinat ↔ Pak Choi; Alternativen: 牛肉乌冬（温和）或 猪肉乌冬（温和）。", zh: "白米 ↔ 糙米；菠菜 ↔ 小白菜；可替：牛肉乌冬或猪肉乌冬（温和）。" },
    side:   { de: "Wasser oder Gerstentee.", zh: "温水或大麦茶。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Yudofu in a clay pot with leeks and spinach, small rice bowl")
  },
  {
    id: "sa-m",
    title: { de: "Japchae mit Rind & Gemüse (잡채) – mild", zh: "韩式杂菜粉条配牛肉（잡채）— 温和" },
    desc:  { de: "Koreanische Glasnudeln mit viel Gemüse; Chili optional separat – inspiriert von Maangchi.", zh: "韩国粉条搭配多样蔬菜；辣味可另放；灵感来自 Maangchi。" },
    story: { de: "Festtags- und Alltagsgericht in Korea; lauwarm oder常温都适合。", zh: "在韩国既是节庆菜也常见于日常；温热或室温皆可。" },
    target: { de: "≈75 g KH gesamt (2 P.) · Protein ≈24 g p. P.", zh: "≈75 g 碳水（两人份）· 蛋白≈24 g/人" },
    ingredients: {
      de: ["Glasnudeln (Süßkartoffel, trocken) 80 g","Rindfleisch mager (Streifen) 220 g","Paprika 150 g","Karotte 150 g","Champignons 150 g","Spinat 150 g","Sojasauce natriumarm 25 ml","Sesamöl 10 ml","Knoblauch 1 Zehe"],
      zh: ["红薯粉条 80 g","瘦牛肉条 220 g","彩椒 150 g","胡萝卜 150 g","蘑菇 150 g","菠菜 150 g","低钠酱油 25 ml","香油 10 ml","蒜 1 瓣"]
    },
    steps: {
      de: ["Glasnudeln kochen, kalt abspülen.","Fleisch/Gemüse少油炒熟，调味。","与粉条拌匀，略加热。"],
      zh: ["粉条煮熟过冷水。","牛肉与蔬菜少油炒熟，调味。","与粉条拌匀，加热即可。"]
    },
    checks: { de: "Gastritis – mild gewürzt · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ Fleisch durchgegart", zh: "胃炎——调味温和 · 糖尿病 ✓ ——≈75 g 碳水 · 孕期 ✓ 牛肉全熟" },
    swaps:  { de: "Rind ↔ Tofu; Glasnudeln ↔ Reisnudeln; Alternativen: 猪里脊杂菜 或 牛肉炒河粉（温和）。", zh: "牛肉 ↔ 豆腐；粉条 ↔ 米粉；可替：猪里脊杂菜或牛肉炒河粉（温和）。" },
    side:   { de: "Sesam-Gurkenscheiben (mild).", zh: "芝麻黄瓜片（温和）。" },
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with colorful vegetables and beef strips, glossy but not oily")
  },
  {
    id: "sa-a",
    title: { de: "Shiitake-Hähnchen-Schmorgericht (香菇鸡) & kleiner Reis", zh: "香菇炖鸡配小份米饭（香菇鸡）" },
    desc:  { de: "Chinesisches Schmorgericht – zart und aromatisch; inspiriert von Red House Spice.", zh: "中式炖菜，软嫩芬芳；灵感来自 Red House Spice。" },
    story: { de: "Hausmannskost für Herbst/Winter; aromatisch und dennoch bekömmlich.", zh: "家常炖菜，适合秋冬；香而不腻，易于消化。"},
    target: { de: "≈62 g KH gesamt (2 P.) · Protein ≈33 g p. P.", zh: "≈62 g 碳水（两人份）· 蛋白≈33 g/人" },
    ingredients: {
      de: ["Hähnchenschenkel (ohne Haut) 300 g","Shiitake 200 g","Karotte 120 g","Reis (roh) 80 g","Sojasauce natriumarm 25 ml","Ingwer 10 g","Gemüsebrühe 300 ml"],
      zh: ["去皮鸡腿肉 300 g","香菇 200 g","胡萝卜 120 g","生米 80 g","低钠酱油 25 ml","姜 10 g","蔬菜高汤 300 ml"]
    },
    steps: {
      de: ["Hähnchen温柔煎香，加汤。","入香菇/胡萝卜，小火炖20–25分钟。","配米饭。"],
      zh: ["鸡肉略煎出香，加高汤。","加入香菇与胡萝卜，小火炖20–25分钟。","配米饭食用。"]
    },
    checks: { de: "Gastritis – geschmort, mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Hähnchen durchgegart", zh: "胃炎——炖煮温和 · 糖尿病 ✓ ——≈62 g 碳水 · 孕期 ✓ 鸡肉全熟" },
    swaps:  { de: "Hähnchen ↔ Tofu; Reis ↔ Vollkornreis; Alternativen: 猪里脊香菇炖 或 瘦牛炖（温和）。", zh: "鸡肉 ↔ 豆腐；白米 ↔ 糙米；可替：香菇炖猪里脊或瘦牛炖（温和）。" },
    side:   { de: "Gedämpfter Pak Choi oder Brokkoli.", zh: "清蒸小白菜或西兰花。"},
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised chicken with shiitake and carrots, small rice serving")
  },

  // Sonntag
  {
    id: "so-f",
    title: { de: "Reisbrei mit Apfel & Tofuwürfeln (お粥)", zh: "苹果豆腐米粥（お粥）" },
    desc:  { de: "Sanfter Süß-Reisbrei mit fruchtiger Note; inspiriert von Okayu.", zh: "柔和甜味米粥，带果香；灵感源于日式 Okayu。"},
    story: { de: "Angelehnt an japanischen Okayu; passt zur Apfelernte und kühlen Tagen – warm und leicht.", zh: "借鉴日式粥；适合苹果季与凉爽天气——温暖轻盈。"},
    target: { de: "≈80 g KH gesamt (2 P.) · Protein ≈22 g p. P.", zh: "≈80 g 碳水（两人份）· 蛋白≈22 g/人" },
    ingredients: {
      de: ["Reis (roh) 80 g","Apfel 150 g","Wasser 1000 ml","Zimt 1 Prise","Tofu fest 300 g"],
      zh: ["生米 80 g","苹果 150 g","水 1000 ml","肉桂 少许","硬豆腐 300 g"]
    },
    steps: {
      de: ["Reis mit Wasser 30 Min. sanft kochen.","Apfelwürfel 5 Min. ziehen lassen.","Tofu zugeben, mild abschmecken."],
      zh: ["米加水小火煮30分钟。","入苹果丁再煮5分钟。","加入豆腐，温和调味。"]
    },
    checks: { de: "Gastritis – mild & warm · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ vollständig gegart", zh: "胃炎——温和暖胃 · 糖尿病 ✓ ——≈80 g 碳水 · 孕期 ✓ 全熟" },
    swaps:  { de: "Apfel ↔ Birne; Tofu ↔ Skyr (pasteurisiert); Alternativen: 如需咸口，可改牛/猪盖饭（温和）。", zh: "苹果 ↔ 梨；豆腐 ↔ 斯凯尔酸奶（巴氏杀菌）；可替：若偏咸味，可选牛/猪盖饭（温和）。" },
    side:   { de: "Warmer Kräutertee.", zh: "温热草本茶。" },
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy rice porridge with small apple cubes and tofu, neutral bowl, steam")
  },
  {
    id: "so-m",
    title: { de: "Klarer Nudeltopf mit Pute (清汤面)", zh: "清汤面配火鸡肉（清汤面）" },
    desc:  { de: "Chinesisch inspiriert, klare Brühe und zarte Pute; inspiriert von Made With Lau.", zh: "中式灵感，清汤配嫩火鸡；灵感来自 Made With Lau。"},
    story: { de: "Beliebt als leichte Alltagssuppe in China; besonders passend in der Erkältungszeit。", zh: "中国常见的清爽日常面汤；感冒季尤为适合。"},
    target: { de: "≈70 g KH gesamt (2 P.) · Protein ≈24 g p. P.", zh: "≈70 g 碳水（两人份）· 蛋白≈24 g/人" },
    ingredients: {
      de: ["Weizennudeln (trocken) 100 g","Putenbrust 220 g","Pak Choi 200 g","Karotte 120 g","Zwiebel 60 g","Gemüsebrühe 900 ml","Sojasauce natriumarm 15 ml"],
      zh: ["干小麦面 100 g","火鸡胸肉 220 g","小白菜 200 g","胡萝卜 120 g","洋葱 60 g","蔬菜高汤 900 ml","低钠酱油 15 ml"]
    },
    steps: {
      de: ["Brühe erhitzen; Pute 8–10 Min. gar ziehen.","Gemüse 3–4 Min. mitgaren.","Nudeln kochen、过水后入汤，温和调味。"],
      zh: ["加热高汤；火鸡肉浸煮8–10分钟至熟。","加入蔬菜再煮3–4分钟。","面条另煮过凉，入汤调味。"]
    },
    checks: { de: "Gastritis – mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Pute durchgegart", zh: "胃炎——温和 · 糖尿病 ✓ ——≈70 g 碳水 · 孕期 ✓ 火鸡全熟" },
    swaps:  { de: "Weizennudeln ↔ Reisnudeln; Pute ↔ Tofu; Alternativen: 牛肉乌冬（清汤）或 猪肉乌冬（清汤）。", zh: "小麦面 ↔ 米粉；火鸡 ↔ 豆腐；可替：清汤牛肉乌冬或清汤猪肉乌冬。"},
    side:   { de: "Lauwarmes Wasser.", zh: "温水。"},
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear noodle soup with turkey slices, pak choi and carrots")
  },
  {
    id: "so-a",
    title: { de: "Seelachs-Jorim – mild geschmort (명태조림) & Reis", zh: "明太鱼炖（温和版，명태조림）配米饭" },
    desc:  { de: "Koreanischer Schmor-Fisch mit Rettich; mild, Chili optional separat.", zh: "韩式炖鱼配白萝卜；口味温和，辣椒另放可选。"},
    story: { de: "Koreanisches Jorim-Gericht; in kühleren Monaten beliebt，晚餐家常之选。", zh: "韩国 Jorim 炖法；偏冷季节常做，适合作为晚餐家常菜。"},
    target: { de: "≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.", zh: "≈70 g 碳水（两人份）· 蛋白≈30 g/人" },
    ingredients: {
      de: ["Seelachsfilet (Alaska Pollock) 320 g","Rettich (Daikon) 250 g","Zwiebel 60 g","Doenjang 20 g","Sojasauce natriumarm 20 ml","Wasser 500 ml","Reis (roh) 90 g","Sesamöl 8 ml"],
      zh: ["狭鳕柳 320 g","白萝卜 250 g","洋葱 60 g","大酱 20 g","低钠酱油 20 ml","水 500 ml","生米 90 g","香油 8 ml"]
    },
    steps: {
      de: ["Rettich在水+大酱中小火10分钟。","加入狭鳕温和炖8–10分钟。","点香油，配米饭。"],
      zh: ["白萝卜在水与大酱中小火煮10分钟。","加入狭鳕再炖8–10分钟。","淋香油，配米饭。"]
    },
    checks: { de: "Gastritis – geschmort, mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Seelachs durchgegart, quecksilberarm", zh: "胃炎——炖煮温和 · 糖尿病 ✓ ——≈70 g 碳水 · 孕期 ✓ 鱼全熟、低汞" },
    swaps:  { de: "Seelachs ↔ Kabeljau; Reis ↔ Vollkornreis; Alternativen: 姜烧猪肉（温和）或 牛肉条炖（温和）。", zh: "狭鳕 ↔ 鳕鱼；白米 ↔ 糙米；可替：姜烧猪肉（温和）或牛肉条炖（温和）。" },
    side:   { de: "Gedämpfter Spinat.", zh: "清蒸菠菜。"},
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild braised pollock with daikon in light brown sauce, small rice bowl")
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

// ---------- LIST_SUMMARY (aus deutschen Zutaten-Strings geparst) ----------
function normalizeName(n) {
  return n.replace(/\(.*?\)/g, "").replace(/^\s+|\s+$/g, "").replace(/\bgekauft\b/gi, "").replace(/\bgekocht\b/gi, "").replace(/\broh\b/gi, "").replace(/ +/g, " ");
}
function parseQty(item) {
  const m = item.match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = normalizeName(m[1]).trim();
  let qty = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  if (unit.toLowerCase() === "l") { qty = qty * 1000; unit = "ml"; }
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
    (r.ingredients.de || []).forEach((ing) => {
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
const LIST_SUMMARY = (() => {
  const b = accumulateList(DATA);
  return {
    "Protein/Fisch/Tofu": formatBucket(b.protein),
    "Gemüse/Pilze": formatBucket(b.veg),
    "Reis/Nudeln/Sättigung": formatBucket(b.staple),
    "Algen/Brühen/Würze": formatBucket(b.season),
  };
})();

// --------- Export helpers ----------
async function ensureScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  await new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src; s.async = true; s.onload = () => resolve(); s.onerror = () => reject(new Error("Script load failed"));
    document.head.appendChild(s);
  });
}
async function exportPDF(targetId, filename, orientation) {
  await ensureScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");
  const element = document.getElementById(targetId);
  if (!element) return { ok: false, blobUrl: "" };
  const common = {
    margin: [12, 12, 12, 12],
    filename,
    pagebreak: { mode: ["css", "legacy"], after: [".page"], avoid: [".avoid-break"] },
    jsPDF: { unit: "pt", format: "a4", orientation },
  };
  // Pass 1
  const opt1 = {
    ...common,
    html2canvas: { scale: 3, useCORS: true, background: COLORS.pageBg, letterRendering: true, foreignObjectRendering: false },
  };
  const blobUrl1 = await window.html2pdf().set(opt1).from(element).outputPdf("bloburl");
  let blob = null;
  try { blob = await fetch(blobUrl1).then((r) => r.blob()); } catch (_) {}
  if (blob && blob.size > 50 * 1024) {
    return { ok: true, blobUrl: blobUrl1 };
  }
  // Fallback
  const opt2 = {
    ...common,
    html2canvas: { scale: 3, useCORS: true, background: COLORS.pageBg, letterRendering: false, foreignObjectRendering: true },
    pagebreak: { mode: ["css"], after: [".page"] },
  };
  const blobUrl2 = await window.html2pdf().set(opt2).from(element).outputPdf("bloburl");
  return { ok: true, blobUrl: blobUrl2 || blobUrl1 || "" };
}
function exportHTML(targetId, filename) {
  const node = document.getElementById(targetId);
  if (!node) return "";
  const css = getEmbedCss();
  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>${filename}</title><style>${css}</style></head><body style="background:${COLORS.pageBg}">${node.innerHTML}</body></html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  return url;
}
function getEmbedCss() {
  return `
  @page { size: A4; margin: 10pt; }
  * { box-sizing: border-box; }
  body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial; color:${COLORS.text}; }
  .page { page-break-after: always; background: ${COLORS.pageBg}; }
  .avoid-break { break-inside: avoid; }
  .print\\:hidden { display: none !important; }
  `;
}

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
    reader.onload = () => { const dataUrl = reader.result; setSrc(dataUrl); saveLocalImage(storageKey, dataUrl); };
    reader.readAsDataURL(file);
  };
  return (
    <div className="print:hidden" style={{ marginBottom: 12 }}>
      <label style={{ display: "block", marginBottom: 6, color: COLORS.neutral }}>{label}</label>
      <input type="file" accept="image/*" onChange={onChange} />
      {src ? <div style={{ marginTop: 8 }}><img src={src} alt={label} style={{ maxWidth: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /></div> : null}
    </div>
  );
}

// ---------- Recipe Card (zweisprachige Darstellung) ----------
function RecipeCard({ r }) {
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={`Rezeptbild hochladen: ${r.title.de}`} />
          </div>
          {img ? <img src={img} alt={r.title.de} style={{ width: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /> : null}
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            <div><b>{dayLabel(r.id)} – {mealTitle(r.id)}</b></div>
            <div style={{ marginTop: 6 }}>{r.desc.de}</div>
            <div style={{ marginTop: 4, color: COLORS.neutral }}>{r.desc.zh}</div>
            <div style={{ marginTop: 6 }}><b>Ziel:</b> {r.target.de}</div>
            <div style={{ marginTop: 2, color: COLORS.neutral }}>{r.target.zh}</div>
            <div><b>Checks:</b> {r.checks.de}</div>
            <div style={{ marginTop: 2, color: COLORS.neutral }}>{r.checks.zh}</div>
            <div><b>Beilage/Drink:</b> {r.side.de}</div>
            <div style={{ color: COLORS.neutral }}>{r.side.zh}</div>
            {r.remind ? <div style={{ marginTop: 8, padding: "6px 8px", background: "rgba(5,150,105,.08)", border: `1px solid ${COLORS.emerald}`, borderRadius: 10, fontSize: 13 }}>💊 Metformin mit der Mahlzeit einnehmen.</div> : null}
          </div>
        </aside>
        <main style={{ gridColumn: "span 8", ...cardMainStyle }}>
          {/* Wochentag-Zeile wie Woche 3 */}
          <div style={{ fontSize: 12, color: COLORS.sky, fontWeight: 700, marginTop: -4, marginBottom: 6 }}>
            {dayLabel(r.id)} – {mealTitle(r.id)}
          </div>
          <h2 style={{ marginTop: 0 }}>{r.title.de}</h2>
          <div style={{ fontSize: 14, color: COLORS.neutral, marginTop: -6, marginBottom: 4 }}>{r.title.zh}</div>
          {/* Sachliche Kurz-Story (de + zh) */}
          <p style={{ marginTop: 2, marginBottom: 6, color: COLORS.neutral, fontSize: 12 }}>{r.story.de}</p>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{r.story.zh}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>Zutaten（DE）</h3>
              <ul className="avoid-break">
                {(r.ingredients.de || []).map((x, i) => <li key={`de-${i}`} style={{ marginBottom: 4 }}>{x}</li>)}
              </ul>
              <h3 style={{ fontSize: 16, margin: "10px 0 6px 0", color: COLORS.sky }}>配料（ZH）</h3>
              <ul className="avoid-break">
                {(r.ingredients.zh || []).map((x, i) => <li key={`zh-${i}`} style={{ marginBottom: 4 }}>{x}</li>)}
              </ul>
            </section>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>Zubereitung（DE）</h3>
              <ol className="avoid-break" style={{ paddingLeft: 18 }}>
                {(r.steps.de || []).map((s, i) => <li key={`sde-${i}`} style={{ marginBottom: 4 }}>{s}</li>)}
              </ol>
              <h3 style={{ fontSize: 16, margin: "10px 0 6px 0", color: COLORS.sky }}>步骤（ZH）</h3>
              <ol className="avoid-break" style={{ paddingLeft: 18 }}>
                {(r.steps.zh || []).map((s, i) => <li key={`szh-${i}`} style={{ marginBottom: 4 }}>{s}</li>)}
              </ol>
              <div style={{ marginTop: 6, fontSize: 12 }}><b>Austausche & Alternativen (DE):</b> {r.swaps.de}</div>
              <div style={{ marginTop: 2, fontSize: 12, color: COLORS.neutral }}><b>替换与替代（ZH）：</b> {r.swaps.zh}</div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// ---------- Cookbook (Cover + Wochenübersicht + Rezepte) ----------
function Cookbook() {
  const weekly = useMemo(() => groupByDay(DATA), []);
  return (
    <div id="cookbook-root">
      {/* Cover + Wochenübersicht */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              Woche ab {meta.startDate} – <b>Modus: Non-Strict (balanced)</b>; CN/JP/KR dominiert, milde Würzung, natriumarme Sojasauce, schwangerschaftssicher; Diabetes: 60–90 g KH pro Mahlzeit (2 P.).
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="Cover-Bild hochladen" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>Wochenübersicht</h2>
            <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 8, fontSize: 14 }}>
              {DAYS_ORDER.map((d) => (
                <div key={d} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{DAY_NAME[d]}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {(weekly[d] || []).map((m) => (
                      <div key={m.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                        <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabel(m.id)}</div>
                        <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{m.title.de}</div>
                        <div style={{ color: COLORS.neutral, fontSize: 11 }}>{m.title.zh}</div>
                        <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>
                          🌾 {m.target.de.replace("KH gesamt", "KH")}{m.remind ? " · 💊" : ""}
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
      {DATA.map((r) => <RecipeCard key={r.id} r={r} />)}
    </div>
  );
}

// ---------- Grocery List ----------
function GroceryList() {
  return (
    <div id="list-root">
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>Automatisch aus den <b>deutschen</b> Zutaten summiert (Woche ab {meta.startDate}).</p>
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
            Hinweise: Sojasauce natriumarm; Algen (Wakame/Nori) sparsam; alle Speisen vollständig durchgaren.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Main ----------
export default function Woche4_2025_10_20() {
  const [tab, setTab] = useState("kochbuch");
  const [pdfLink, setPdfLink] = useState({ kochbuch: "", einkauf: "" });
  const [htmlLink, setHtmlLink] = useState({ kochbuch: "", einkauf: "" });

  useEffect(() => { Tests(); }, []);

  const doPDF = async () => {
    const isCook = tab === "kochbuch";
    const id = isCook ? "cookbook-root" : "list-root";
    const name = `${FILE_BASE} – ${isCook ? "kochbuch" : "einkauf"}`;
    const res = await exportPDF(id, name, isCook ? "landscape" : "portrait");
    if (res?.blobUrl) setPdfLink((s) => ({ ...s, [isCook ? "kochbuch" : "einkauf"]: res.blobUrl }));
  };
  const doHTML = () => {
    const isCook = tab === "kochbuch";
    const id = isCook ? "cookbook-root" : "list-root";
    const name = `${FILE_BASE} – ${isCook ? "kochbuch" : "einkauf"}`;
    const url = exportHTML(id, name);
    if (url) setHtmlLink((s) => ({ ...s, [isCook ? "kochbuch" : "einkauf"]: url }));
  };

  return (
    <div style={{ background: COLORS.pageBg, minHeight: "100vh", padding: 16 }}>
      <div className="print:hidden" style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setTab("kochbuch")} style={{ padding: "8px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow, background: tab==="kochbuch"?COLORS.indigo:COLORS.white, color: tab==="kochbuch"?"#fff":COLORS.text }}>Kochbuch</button>
          <button onClick={() => setTab("einkauf")} style={{ padding: "8px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow, background: tab==="einkauf"?COLORS.indigo:COLORS.white, color: tab==="einkauf"?"#fff":COLORS.text }}>Einkaufsliste</button>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={doPDF} style={{ padding: "10px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}>PDF erzeugen</button>
          <button onClick={doHTML} style={{ padding: "10px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}>HTML exportieren</button>
          <button onClick={() => window.print()} style={{ padding: "10px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.emerald, color: "#fff", boxShadow: COLORS.btnShadow, fontWeight: 600 }}>Drucken</button>
        </div>
      </div>

      <div style={{ display: tab === "kochbuch" ? "block" : "none" }}><Cookbook /></div>
      <div style={{ display: tab === "einkauf" ? "block" : "none" }}><GroceryList /></div>

      <div className="print:hidden" style={{ marginTop: 12 }}>
        {tab === "kochbuch" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.kochbuch ? <a href={pdfLink.kochbuch} download={`${FILE_BASE} – kochbuch.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>📄 PDF herunterladen (Kochbuch)</a> : null}
            {htmlLink.kochbuch ? <a href={htmlLink.kochbuch} download={`${FILE_BASE} – kochbuch.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>🌐 HTML herunterladen (Kochbuch)</a> : null}
          </div>
        )}
        {tab === "einkauf" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.einkauf ? <a href={pdfLink.einkauf} download={`${FILE_BASE} – einkauf.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>📄 PDF herunterladen (Einkaufsliste)</a> : null}
            {htmlLink.einkauf ? <a href={htmlLink.einkauf} download={`${FILE_BASE} – einkauf.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>🌐 HTML herunterladen (Einkaufsliste)</a> : null}
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
    if (buildPrompt("A","B") !== "A\nB") throw new Error("buildPrompt");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map(r => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    if (mealLabel("xx-f") !== "Frühstück" || mealLabel("xx-m") !== "Mittag" || mealLabel("xx-a") !== "Abendessen") throw new Error("mealLabel mapping wrong");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      // Bilingual checks
      if (!r.title?.de || !r.title?.zh) throw new Error(`Title zweisprachig fehlt: ${r.id}`);
      if (!Array.isArray(r.ingredients?.de) || r.ingredients.de.length < 5) throw new Error(`Zutaten(DE) zu wenig: ${r.id}`);
      if (!Array.isArray(r.ingredients?.zh) || r.ingredients.zh.length < 5) throw new Error(`Zutaten(ZH) zu wenig: ${r.id}`);
      if (!Array.isArray(r.steps?.de) || r.steps.de.length < 3) throw new Error(`Steps(DE) zu wenig: ${r.id}`);
      if (!Array.isArray(r.steps?.zh) || r.steps.zh.length < 3) throw new Error(`Steps(ZH) zu wenig: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
    // No forbidden CSS color functions in strings
    const forbid = /(oklab|oklch|lab|color-mix)\(/i;
    const allStrings = JSON.stringify(DATA);
    if (forbid.test(allStrings)) throw new Error("Verbotene CSS-Funktionen gefunden");
    console.log("[GhibliKitchen] All tests passed (JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}

// ---------- Mount ----------
const mountNode = document.getElementById("root") || (() => {
  const d = document.createElement("div");
  d.id = "root";
  document.body.appendChild(d);
  return d;
})();
const root = createRoot(mountNode);
root.render(<Woche4_2025_10_20 />);