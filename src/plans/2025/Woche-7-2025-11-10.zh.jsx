import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

/* ---------- Meta ---------- */
export const meta = {
  title: "第7周",
  startDate: "2025-11-10",
  id: "zhou-7-2025-11-10-zh",
  lang: "zh",
  sidebar: "[ZH] 第7周 (2025-11-10)",
};
const FILE_BASE = "Woche 7 2025-11-10";

/* ---------- UI ----------- */
const UI_TITLES = {
  main: "GhibliKitchen – 第7周",
  list: "GhibliKitchen – 采购清单 – 第7周",
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

// --- Fallbacks: always return plain text/arrays ---
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

/* ---------- DATA (21 recipes – keep Week 7, translated UI text) ---------- */
export const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "韩式蒸蛋（계란찜）配小碗米饭",
    desc: "完全凝固、口味清淡的蒸蛋；搭配一小碗米饭。",
    story: "계란찜像一朵柔软的云，但我们确保全熟，适合孕期、也易消化。",
    target: "≈62 g 碳水（2人）· 蛋白质≈23 g/人",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 3 Stück",
      "Hühnerbrühe mild 250 ml",
      "Frühlingszwiebel 15 g",
      "Sesamöl 5 ml",
      "Sojasauce natriumarm 5 ml",
    ],
    steps: [
      "煮米饭。",
      "鸡蛋与清淡高汤搅匀，入耐热碗蒸12–14分钟至完全凝固。",
      "少量淡酱油与小葱调味，滴入香油。",
    ],
    checks: "胃炎 – 很温和 · 糖尿病 ✓ – ≈62 g 碳水 · 孕期 ✓ 全熟鸡蛋",
    swaps: "鸡汤↔蔬菜汤；米饭↔糙米。",
    side: "清爽黄瓜渍菜；温水；麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean steamed egg custard in ramekin, fully set, small bowl of rice, scallions on top"),
  },
  {
    id: "mo-m",
    title: "日式烤鸡丼（焼き鳥丼）· 清淡",
    desc: "鸡胸肉配清淡照烧风味酱汁，铺在米饭上。",
    story: "把街头人气的烧鸟做成丼，午间更省事；我们降低盐与甜度，更友好。",
    target: "≈74 g 碳水（2人）· 蛋白质≈32 g/人",
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
      "煮米饭；鸡肉少油煎至全熟。",
      "洋葱炒香，加入酱油/水/蜂蜜，稍收汁。",
      "浇在米饭上，撒葱花。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈74 g 碳水（甜味低） · 孕期 ✓ 鸡肉全熟",
    swaps: "鸡肉↔火鸡；米饭↔糙米。",
    side: "汆烫菠菜；温水；清淡绿茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken yakitori rice bowl, glossy light sauce, scallions, no chili"),
  },
  {
    id: "mo-a",
    title: "红烧豆腐（红烧豆腐）配上海青",
    desc: "中式清淡红烧，不辣、咸度低。",
    story: "家常红烧豆腐，明亮的酱汁裹住豆腐与蔬菜，晚餐轻松好吃。",
    target: "≈70 g 碳水（2人）· 蛋白质≈28 g/人",
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
      "煮米饭；豆腐切块少油煎。",
      "下香菇和青菜，加入淡酱油与少量水，小火焖3–4分钟。",
      "以淀粉水勾薄芡，出锅。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈70 g 碳水 · 孕期 ✓ 全部加热熟透",
    swaps: "上海青↔西兰花；米饭↔糙米。",
    side: "清蒸胡萝卜；温水；茉莉花茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised tofu with bok choy and mushrooms, glossy light-brown sauce over rice"),
  },

  // 周二
  {
    id: "di-f",
    title: "小馒头与热豆浆（馒头·豆浆）",
    desc: "北方风早餐：小馒头配不加糖的热豆浆。",
    story: "简单、暖胃、分量控制更稳碳水。",
    target: "≈68 g 碳水（2人）",
    ingredients: [
      "Mantou (klein) 120 g",
      "Sojamilch ungesüßt 400 ml",
      "Gurke 100 g",
      "Sesam (optional) 6 g",
      "Sojasauce natriumarm 5 ml",
    ],
    steps: [
      "馒头上笼蒸8–10分钟。",
      "豆浆加热（不沸腾）。",
      "配黄瓜片食用；酱油慎用少量。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈68 g 碳水 · 孕期 ✓ 豆浆加热",
    swaps: "馒头↔全麦吐司；豆浆↔巴氏杀菌牛奶。",
    side: "清淡小咸菜；豆浆；淡乌龙。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Small steamed mantou buns with warm unsweetened soy milk, cucumber slices"),
  },
  {
    id: "di-m",
    title: "韩式杂菜（Japchae 잡채）· 清淡",
    desc: "红薯粉丝配蔬菜与牛肉，少油不辣。",
    story: "节庆与日常都爱的杂菜；我们加蔬菜、减油盐。",
    target: "≈76 g 碳水（2人）· 蛋白质≈30 g/人",
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
      "粉丝煮熟冲凉。",
      "牛肉少油炒至全熟，入蔬菜翻炒。",
      "加酱油/香油调味，拌入粉丝。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈76 g 碳水 · 孕期 ✓ 牛肉全熟",
    swaps: "牛肉↔火鸡/豆腐；粉丝↔荞麦面。",
    side: "汆烫西兰花；温水；麦茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae glass noodles with beef and vegetables, glossy but light"),
  },
  {
    id: "di-a",
    title: "鸡肉萝卜炖物（鶏大根の煮物）",
    desc: "日式清炖鸡与白萝卜，清爽暖身。",
    story: "“煮物”强调小火温煮，晚间轻负担。",
    target: "≈70 g 碳水（2人）· 蛋白质≈30 g/人",
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
      "煮米饭；萝卜与胡萝卜在汤中小火煮10分钟。",
      "下鸡肉再煮10–12分钟至熟。",
      "淡酱油调味。",
    ],
    checks: "胃炎 – 温煮 · 糖尿病 ✓ – ≈70 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps: "鸡肉↔火鸡；米饭↔糙米。",
    side: "清蒸青梗菜；温水；清淡绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese chicken and daikon nimono in clear broth, side bowl of rice"),
  },

  // 周三
  {
    id: "mi-f",
    title: "豆腐蛋花汤（蛋花汤）+ 小碗米饭",
    desc: "清淡蛋花汤配豆腐，鸡蛋全熟。",
    story: "温暖的一天从一碗轻柔的汤开始。",
    target: "≈66 g 碳水（2人）· 蛋白质≈22 g/人",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 2 Stück",
      "Tofu fest 150 g",
      "Hühner- oder Gemüsebrühe 900 ml",
      "Maisstärke 8 g",
      "Frühlingszwiebel 10 g",
    ],
    steps: [
      "煮米饭；加热清汤。",
      "入淀粉水，细流倒入蛋液，小火2–3分钟至全熟。",
      "加入豆腐与葱花。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈66 g 碳水 · 孕期 ✓ 鸡蛋全熟",
    swaps: "豆腐↔鸡胸丁；米饭↔糙米。",
    side: "清爽白萝卜渍；温水；茉莉花茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese egg drop soup with tofu in a clear bowl, small bowl of rice"),
  },
  {
    id: "mi-m",
    title: "广式香菇蒸滑鸡（冬菇蒸滑鸡）",
    desc: "蒸制更嫩滑，清淡易消化。",
    story: "粤式蒸法锁住鲜味，午餐不负担。",
    target: "≈72 g 碳水（2人）· 蛋白质≈33 g/人",
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
      "香菇泡发；煮米饭。",
      "鸡肉以酱油/姜腌10分钟，与香菇一起蒸12–14分钟。",
      "淋少许香油，撒葱花。",
    ],
    checks: "胃炎 – 蒸制 · 糖尿病 ✓ – ≈72 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps: "鸡肉↔火鸡/豆腐；米饭↔糙米。",
    side: "清蒸西兰花；温水；淡乌龙。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cantonese steamed chicken with shiitake in a plate, ginger scallion garnish, side rice"),
  },
  {
    id: "mi-a",
    title: "韩式豆腐卤（Dubu‑Jorim 두부조림）",
    desc: "洋葱与西葫芦同煨，酱香清淡不辣。",
    story: "家常人气小菜做成主菜，配饭最搭。",
    target: "≈74 g 碳水（2人）· 蛋白质≈26 g/人",
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
      "煮米饭；豆腐切片略煎。",
      "入洋葱/西葫芦，加入蔬菜汤与酱油，小火焖6–8分钟。",
      "淋香油出锅。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈74 g 碳水 · 孕期 ✓ 全部熟透",
    swaps: "豆腐↔鸡肉；米饭↔糙米。",
    side: "芝麻黄瓜小拌菜；温水；麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean braised tofu (dubu jorim) with onions and zucchini, light soy glaze, bowl of rice"),
  },

  // 周四
  {
    id: "do-f",
    title: "蔬菜豆腐煎饼（야채두부전）+ 小碗米饭",
    desc: "少油煎至微脆，口感清爽。",
    story: "将豆腐与蔬菜做成煎饼，饱腹又温和。",
    target: "≈64 g 碳水（2人）· 蛋白质≈24 g/人",
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
      "煮米饭；豆腐压碎与蛋/面粉/蔬菜混合。",
      "少油煎成小饼，两面金黄。",
      "蘸少量淡酱油食用。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈64 g 碳水 · 孕期 ✓ 鸡蛋全熟",
    swaps: "小麦粉↔米粉；豆腐↔鸡丁（分开煎）。",
    side: "黄瓜渍菜；温水；麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean tofu vegetable pancakes on a plate, small bowl of rice, light soy dip"),
  },
  {
    id: "do-m",
    title: "鸡蓉玉米羹（鸡蓉玉米羹）· 清淡",
    desc: "不辣、顺口、暖胃的中式浓汤。",
    story: "食堂与家常都爱的一碗，午间迅速补给。",
    target: "≈68 g 碳水（2人）· 蛋白质≈26 g/人",
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
      "煮米饭；将高汤与玉米加热。",
      "鸡胸切小丁，下锅小火6–8分钟至熟；少量淀粉勾薄芡。",
      "可选：缓缓倒入蛋液并煮至全熟；调淡酱油。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈68 g 碳水 · 孕期 ✓ 鸡肉/鸡蛋全熟",
    swaps: "玉米↔青豆；鸡肉↔豆腐。",
    side: "汆烫叶菜；温水；清淡绿茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese chicken and corn soup in a white bowl, small side of rice"),
  },
  {
    id: "do-a",
    title: "味噌炖鳕鱼（タラの味噌煮）",
    desc: "清淡味噌汤底温煮鳕鱼，柔和不腻。",
    story: "味噌煮是日本的温柔炖法，晚餐很合适。",
    target: "≈72 g 碳水（2人）· 蛋白质≈31 g/人",
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
      "煮米饭；菠菜蒸熟。",
      "将高汤/味噌/姜加热，小火煨鱼8–10分钟至熟。",
      "与米饭和菠菜一同上桌。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈72 g 碳水 · 孕期 ✓ 鳕鱼全熟、低汞",
    swaps: "鳕鱼↔狭鳕；米饭↔糙米。",
    side: "清淡萝卜渍；温水；煎茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese miso-braised cod in shallow bowl, spinach on the side, small bowl of rice"),
  },

  // 周五
  {
    id: "fr-f",
    title: "日式豆腐“炒蛋” + 小碗米饭（豆腐スクランブル）",
    desc: "以豆腐代蛋的“炒蛋”口感，拌菠菜与香菇，清淡不腻。",
    story: "日式风味的素食早餐，蛋白质充足又轻盈。",
    target: "≈64 g 碳水（2人）· 蛋白质≈24 g/人",
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
      "煮米饭。",
      "豆腐捣碎，与洋葱/香菇/菠菜少油翻炒至熟。",
      "淡酱油与芝麻调味。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈64 g 碳水 · 孕期 ✓ 全部加热",
    swaps: "豆腐↔鸡丁；米饭↔糙米。",
    side: "熟透樱桃番茄；温水；焙茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese-style tofu scramble with spinach and mushrooms, small bowl of rice"),
  },
  {
    id: "fr-m",
    title: "荞麦面沙拉配鸡胸（そばサラダ）",
    desc: "清凉爽口但有饱足，蔬菜丰富，鸡胸细嫩。",
    story: "夏日人气的清爽午餐，也适合全年轻食。",
    target: "≈78 g 碳水（2人）· 蛋白质≈30 g/人",
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
      "荞麦面煮好过凉；鸡胸在水中小火煮8–10分钟至熟，放凉撕丝。",
      "蔬菜切细，与面和鸡丝拌匀。",
      "以淡酱油/米醋/香油调味。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈78 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps: "鸡胸↔豆腐；荞麦面↔乌冬。",
    side: "汆烫青梗菜；温水；清淡绿茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cold soba salad with shredded chicken, cucumber and carrot, light dressing"),
  },
  {
    id: "fr-a",
    title: "清爽砂锅鸡饭（砂锅鸡饭）· 轻油版",
    desc: "取灵感自煲仔饭，用锅煮更清爽，仍旧香气足。",
    story: "家常感满满的一锅饭，晚上更合适的低油版本。",
    target: "≈80 g 碳水（2人）· 蛋白质≈31 g/人",
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
      "锅中煮饭。",
      "鸡肉与香菇略煎，加入酱油与姜小焖。",
      "放入青菜，铺在米饭上焖3–4分钟。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈80 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps: "糙米↔白米；鸡肉↔豆腐。",
    side: "清淡萝卜渍；温水；淡乌龙。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light claypot-style chicken and mushroom rice in a pot, bok choy on top"),
  },

  // 周六
  {
    id: "sa-f",
    title: "蛋包饭（オムライス）· 鸡蛋全熟",
    desc: "薄薄蛋皮完全凝固，内馅为蔬菜鸡肉炒饭，番茄酱减量。",
    story: "洋食代表之一；我们保证鸡蛋全熟，更安心。",
    target: "≈70 g 碳水（2人）· 蛋白质≈25 g/人",
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
      "煮米饭；鸡肉/豌豆/洋葱炒成馅，以少量番茄酱调味。",
      "煎成薄蛋饼并完全凝固。",
      "包入馅料即可。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈70 g 碳水 · 孕期 ✓ 鸡蛋/鸡肉全熟",
    swaps: "豌豆↔玉米；鸡肉↔豆腐。",
    side: "熟透番茄片；温水；焙茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese omurice with fully cooked omelet, vegetable chicken rice filling, neat plating"),
  },
  {
    id: "sa-m",
    title: "豆芽拌饭配豆腐（콩나물밥）· 清淡",
    desc: "韩式豆芽米饭，加入豆腐，纤维与蛋白兼具。",
    story: "简易香气饭，酱汁低盐不辣。",
    target: "≈74 g 碳水（2人）· 蛋白质≈24 g/人",
    ingredients: [
      "Reis (roh) 90 g",
      "Sojabohnensprossen 300 g",
      "Tofu fest 200 g",
      "Frühlingszwiebel 15 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
    ],
    steps: [
      "煮米饭；豆芽汆烫2–3分钟。",
      "豆腐切丁稍煎。",
      "与米饭拌匀，佐淡酱油与香油。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈74 g 碳水 · 孕期 ✓ 全部加热",
    swaps: "豆腐↔鸡肉；豆芽↔菠菜。",
    side: "黄瓜渍菜；温水；麦茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean kongnamul-bap rice bowl with tofu and bean sprouts, light dressing"),
  },
  {
    id: "sa-a",
    title: "狭鳕炖萝卜（Pollack‑Jorim 명태조림）· 清淡",
    desc: "韩国狭鳕与白萝卜小火炖煮，不辣更清爽。",
    story: "家常鱼炖菜，晚上吃更轻松。",
    target: "≈72 g 碳水（2人）· 蛋白质≈30 g/人",
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
      "煮米饭。",
      "白萝卜/洋葱入汤煮8分钟。",
      "加入鱼，小火再煮8–10分钟至熟。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈72 g 碳水 · 孕期 ✓ 鱼全熟、低汞",
    swaps: "狭鳕↔鳕鱼；米饭↔糙米。",
    side: "萝卜渍菜；温水；清淡绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean pollock braise with radish in a shallow pot, bowl of rice"),
  },

  // 周日
  {
    id: "so-f",
    title: "茶泡饭配三文鱼松（鮭茶漬け）",
    desc: "热茶冲饭，配熟三文鱼松；非常清淡。",
    story: "日式快手暖胃餐；如需可用低咖啡因茶。",
    target: "≈64 g 碳水（2人）· 蛋白质≈22 g/人",
    ingredients: [
      "Reis (roh) 80 g",
      "Grüner Tee (heiß) 500 ml",
      "Gekochter Lachs, zerzupft 100 g",
      "Nori (sparsam) 0.5 g",
      "Sesam 6 g",
    ],
    steps: [
      "煮米饭。",
      "熟三文鱼撕成小块。",
      "热绿茶冲入米饭，上撒鱼松/海苔/芝麻。",
    ],
    checks: "胃炎 – 很温和 · 糖尿病 ✓ – ≈64 g 碳水 · 孕期 ✓ 鱼全熟，海苔少量",
    swaps: "三文鱼↔狭鳕；茶↔麦茶。",
    side: "黄瓜渍菜；茶饮；（可选）低咖啡因煎茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ochazuke green tea poured over rice with cooked salmon flakes, minimal nori"),
  },
  {
    id: "so-m",
    title: "清炒菠菜香菇 + 米饭（清炒菠菜香菇）",
    desc: "清爽不辣的中式家常蔬菜拼。",
    story: "快手小炒，脆嫩多汁。",
    target: "≈70 g 碳水（2人）· 蛋白质≈24 g/人",
    ingredients: [
      "Reis (roh) 90 g",
      "Spinat 300 g",
      "Shiitake 200 g",
      "Knoblauch 1 Zehe",
      "Sojasauce natriumarm 12 ml",
      "Tofu fest 150 g",
    ],
    steps: [
      "煮米饭。",
      "香菇与菠菜少油快炒，蒜片同炒至熟。",
      "加入豆腐，清淡调味。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈70 g 碳水 · 孕期 ✓ 全部熟透",
    swaps: "豆腐↔鸡丁；米饭↔糙米。",
    side: "清淡小萝卜渍；温水；淡乌龙。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese spinach and shiitake stir-fry, light sauce, served with rice"),
  },
  {
    id: "so-a",
    title: "亲子丼（親子丼）· 鸡蛋全熟版",
    desc: "鸡肉与鸡蛋在汤汁中煮熟后覆在米饭上；鸡蛋完全凝固更安心。",
    story: "治愈系丼饭代表，我们选择全熟做法。",
    target: "≈78 g 碳水（2人）· 蛋白质≈33 g/人",
    ingredients: [
      "Reis (roh) 90 g",
      "Hähnchenbrust 240 g",
      "Zwiebel 100 g",
      "Eier 3 Stück",
      "Sojasauce natriumarm 20 ml",
      "Dashi/Gemüsebrühe 300 ml",
    ],
    steps: [
      "煮米饭；洋葱在汤中煨至柔软。",
      "下鸡肉煮至全熟。",
      "缓缓倒入蛋液，加盖煮至完全凝固。",
    ],
    checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈78 g 碳水 · 孕期 ✓ 鸡蛋/鸡肉全熟",
    swaps: "鸡肉↔火鸡；米饭↔糙米。",
    side: "黄瓜渍菜；温水；清淡绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese oyakodon rice bowl with fully cooked egg, onions and chicken, glossy sauce"),
  },
];

/* ---------- Helpers ---------- */
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = { mo: "周一", di: "周二", mi: "周三", do: "周四", fr: "周五", sa: "周六", so: "周日" };
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

/* ---------- Shopping list (same grouping logic) ---------- */
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
    "蛋白/鱼/豆腐": formatBucket(b.protein),
    "蔬菜/菌菇": formatBucket(b.veg),
    "米面/主食": formatBucket(b.staple),
    "海藻/高汤/调味": formatBucket(b.season),
  };
}
const LIST_SUMMARY = buildListSummary();

/* ---------- Images persistence ---------- */
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
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(meta.id, r.id);
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
            <ImageUpload storageKey={recipeImgKey} label={`上传菜品图片：${title}`} />
          </div>
          {img ? <img src={img} alt={title} style={{ width: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /> : null}
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            <div>
              <b>
                {dayNameI18n(r.id, t)} · {mealTitleI18n(r.id, t)}
              </b>
            </div>
            <div style={{ marginTop: 6 }}>{desc}</div>
            <div style={{ marginTop: 6 }}>
              <b>目标：</b> {target}
            </div>
            <div>
              <b>提示：</b> {checks}
            </div>
            <div>
              <b>{t.sections.side}：</b> {side}
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
                💊 随餐服用二甲双胍（Metformin）。
              </div>
            ) : null}
          </div>
        </aside>
        <main style={{ gridColumn: "span 8", ...cardMainStyle }}>
          <div style={{ fontSize: 12, color: COLORS.sky, fontWeight: 700, marginTop: -4, marginBottom: 6 }}>
            {dayNameI18n(r.id, t)} · {mealTitleI18n(r.id, t)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => toggleBookmark({
              planSlug: meta.id,
              recipeId: r.id,
              recipeTitle: null ? null.title : title,
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
          </button><h2 style={{ margin: 0 }}>{title}</h2></div>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{story}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients}（2人）</h3>
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
                <b>{t.sections.swaps}：</b> {swaps}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- Cookbook ---------- */
function Cookbook({ t, lang }) {
  const weekly = useMemo(() => groupByDay(DATA), []);
  return (
    <div id="cookbook-root">
      {/* 封面 + 周览 */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              自 {meta.startDate} 起的一周 — <b>模式：非严格（balanced）</b>；聚焦中/日/韩家常清淡；低钠酱油；孕期安全；糖尿病：每餐（2人）目标 60–90 g 碳水。
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="上传封面图片" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>周计划概览</h2>
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

      {/* 菜谱页面 */}
      {DATA.map((r) => (
        <RecipeCard key={r.id} r={r} t={t} lang={lang} />
      ))}
    </div>
  );
}

/* ---------- Shopping list ---------- */
function GroceryList() {
  const rootRef = useRef(null);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>根据自 {meta.startDate} 起的本周菜谱自动汇总。</p>
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
            提示：使用低钠酱油；海藻（若使用海带芽/紫菜）要少量；全部食材要彻底加热熟透。
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Root ---------- */
export default function Woche7_2025_11_10_ZH() {
  const [tab, setTab] = useState("kochbuch");
  const [lang, setLang] = useState(() => localStorage.getItem("ghibli-lang") || "zh");
  const t = UI[lang] || UI.zh;
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

      {/* 下载链接 */}
      <div className="print:hidden" style={{ marginTop: 12 }}>
        {tab === "kochbuch" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.kochbuch ? (
              <a href={pdfLink.kochbuch} download={`${FILE_BASE} – cookbook.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 下载 PDF（菜谱）
              </a>
            ) : null}
            {htmlLink.kochbuch ? (
              <a href={htmlLink.kochbuch} download={`${FILE_BASE} – cookbook.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 下载 HTML（菜谱）
              </a>
            ) : null}
          </div>
        )}
        {tab === "einkauf" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.einkauf ? (
              <a href={pdfLink.einkauf} download={`${FILE_BASE} – list.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 下载 PDF（采购清单）
              </a>
            ) : null}
            {htmlLink.einkauf ? (
              <a href={htmlLink.einkauf} download={`${FILE_BASE} – list.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 下载 HTML（采购清单）
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
    console.log("[GhibliKitchen] All tests passed (ZH JSX, Woche 7).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}
