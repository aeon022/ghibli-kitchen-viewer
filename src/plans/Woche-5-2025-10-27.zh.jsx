// src/plans/Woche-5-2025-10-27.zh.jsx
// 文件：Woche-5-2025-10-27.zh.jsx（样式 1:1 复制自 Woche-4）

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

export const meta = {
  title: "Woche 5",
  startDate: "2025-10-27",
  id: "woche-5-2025-10-27",
  lang: "zh",
  sidebar: "[ZH] Woche 5 (2025-10-27)",
};
const FILE_BASE = "Woche 5 2025-10-27";

const UI_TITLES = {
  main: "GhibliKitchen – Woche 5",
  list: "GhibliKitchen – Einkaufsliste – Woche 5",
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

// ---------- DATA (21 道菜) ----------
const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "茶泡饭配鳕鱼碎（お茶漬け）",
    desc: "热绿茶浇饭，点缀蒸熟鳕鱼；灵感源自 Just One Cookbook。",
    story: "茶泡饭源自日本——清淡、温热，适合早晨。",
    target: "总碳水≈70 g（2人）· 蛋白≈22 g/人",
    ingredients: ["大米（生） 90 g", "热绿茶 400 ml", "鳕鱼柳 140 g", "海苔 1 Stück", "芝麻 6 g", "生姜 6 g", "低钠酱油 10 ml", "香葱 15 g"],
    steps: ["米饭煮熟。", "鳕鱼上汽蒸8–10分钟至全熟，撕碎。", "米饭入碗，浇入热茶；铺鱼/海苔/芝麻/葱，清淡调味。"],
    checks: "胃炎 – 清淡温热 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鱼全熟、少碘",
    swaps: "鳕鱼 ↔ 绿青鳕；绿茶 ↔ 清淡高汤。",
    side: "小碟黄瓜腌菜（不辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Ochazuke rice bowl, hot green tea broth, flaked cooked cod, nori strips, sesame, scallions"),
  },
  {
    id: "mo-m",
    title: "鸡肉宴席面（잔치국수）",
    desc: "韩式清汤细面，口味清淡。",
    story: "“宴席面”日常也常吃——轻盈易消化。",
    target: "总碳水≈78 g（2人）· 蛋白≈28 g/人",
    ingredients: ["素面（干） 110 g", "鸡胸肉 220 g", "西葫芦 150 g", "胡萝卜 100 g", "香葱 20 g", "清水 1000 ml", "低钠酱油 12 ml"],
    steps: ["煮汤；鸡肉丝入汤小火煮6–8分钟至熟。", "蔬菜切丝再煮2–3分钟。", "面条另煮，冲洗后入汤。"],
    checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈78 g · 孕期 ✓ 鸡肉全熟",
    swaps: "素面 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "焯水萝卜片。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear Korean noodle soup with chicken strips, zucchini and carrot, light broth"),
  },
  {
    id: "mo-a",
    title: "白菜豆腐炖配米饭",
    desc: "大白菜与香菇、豆腐小火炖煮，配米饭。",
    story: "北方家常做法——柔软温热。",
    target: "总碳水≈72 g（2人）· 蛋白≈26 g/人",
    ingredients: ["大米（生） 90 g", "大白菜 400 g", "老豆腐 360 g", "香菇 120 g", "蔬菜高汤 400 ml", "低钠酱油 18 ml", "香油 6 ml", "生姜 8 g"],
    steps: ["米饭煮熟。", "白菜与香菇在高汤中小火炖10–12分钟。", "下豆腐再焖3–4分钟，清淡调味；配米饭。"],
    checks: "胃炎 – 清淡炖煮 · 糖尿病 ✓ – ≈72 g · 孕期 ✓ 全熟",
    swaps: "豆腐 ↔ 火鸡胸；白米 ↔ 糙米。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Braised napa cabbage with tofu and shiitake in light broth, side bowl of rice"),
  },

  // 周二
  {
    id: "di-f",
    title: "红薯粥（고구마죽）配豆腐",
    desc: "韩国甜味红薯米粥，加入嫩豆腐提升蛋白。",
    story: "在韩国常作温和早餐——微甜柔滑。",
    target: "总碳水≈75 g（2人）· 蛋白≈21 g/人",
    ingredients: ["红薯 400 g", "大米（生） 70 g", "清水 900 ml", "嫩豆腐 200 g", "生姜 6 g", "食盐 1 g"],
    steps: ["红薯与大米小火煮25–30分钟至软。", "打细后加入豆腐，再煮2–3分钟。", "清淡调味。"],
    checks: "胃炎 – 柔软清淡 · 糖尿病 ✓ – ≈75 g · 孕期 ✓ 全熟",
    swaps: "豆腐 ↔ 鸡胸丁；大米 ↔ 小米。",
    side: "温大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Silky sweet potato rice porridge with silken tofu, pastel bowl, steam visible"),
  },
  {
    id: "di-m",
    title: "清淡炒乌冬（やきうどん）配鸡肉蔬菜",
    desc: "少油快炒，无辣。",
    story: "家常乌冬炒面——蔬菜比例更高。",
    target: "总碳水≈79 g（2人）· 蛋白≈30 g/人",
    ingredients: ["乌冬面（干） 110 g", "鸡胸肉 220 g", "彩椒 150 g", "洋葱 80 g", "菠菜 150 g", "低钠酱油 22 ml", "香油 6 ml"],
    steps: ["乌冬煮熟冲洗。", "少油将鸡肉炒熟。", "入蔬菜快炒，清淡调味。"],
    checks: "胃炎 – 清淡少油 · 糖尿病 ✓ – ≈79 g · 孕期 ✓ 鸡肉全熟",
    swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。",
    side: "清爽黄瓜片。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light yaki udon with chicken and colorful vegetables, no chili, glossy noodles"),
  },
  {
    id: "di-a",
    title: "鳕鱼姜味味噌煮（鱈の煮付け）配米饭",
    desc: "清淡甜咸汁炖鳕鱼，配米饭。",
    story: "日式家常“煮付け”，口味温和。",
    target: "总碳水≈74 g（2人）· 蛋白≈29 g/人",
    ingredients: ["大米（生） 90 g", "鳕鱼柳 320 g", "清水 300 ml", "低钠酱油 20 ml", "味醂 6 ml", "蜂蜜 4 g", "生姜 10 g"],
    steps: ["米饭煮熟。", "清水+酱油+味醂+蜂蜜+姜煮开。", "下鱼小火炖8–10分钟至全熟；配米饭。"],
    checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈74 g · 孕期 ✓ 鱼全熟",
    swaps: "鳕鱼 ↔ 绿青鳕；白米 ↔ 糙米。",
    side: "清蒸青江菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Simmered cod in light ginger-miso broth, served with a bowl of rice"),
  },

  // 周三
  {
    id: "mi-f",
    title: "豆腐“炒蛋”盖饭（豆腐スクランブル丼）",
    desc: "豆腐做成植物“炒蛋”铺在热米饭上。",
    story: "日式灵感——高蛋白、易消化。",
    target: "总碳水≈62 g（2人）· 蛋白≈23 g/人",
    ingredients: ["大米（生） 80 g", "老豆腐 250 g", "菠菜 150 g", "洋葱 60 g", "低钠酱油 10 ml", "芝麻 6 g"],
    steps: ["米饭煮熟。", "将豆腐捣碎，与洋葱/菠菜小火翻炒4–5分钟至熟。", "浇在米饭上，清淡调味。"],
    checks: "胃炎 – 清淡少油 · 糖尿病 ✓ – ≈62 g · 孕期 ✓ 全熟",
    swaps: "白米 ↔ 糙米；菠菜 ↔ 青江菜。",
    side: "温番茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Tofu scramble over steamed rice with spinach, gentle colors, top-down"),
  },
  {
    id: "mi-m",
    title: "香菇素面清汤（そうめん）",
    desc: "淡味高汤配细面与香菇。",
    story: "素面口感细腻——清汤更易消化。",
    target: "总碳水≈75 g（2人）· 蛋白≈18 g/人",
    ingredients: ["素面（干） 110 g", "香菇 140 g", "香葱 20 g", "淡味味噌 18 g", "清水 1000 ml", "低钠酱油 10 ml"],
    steps: ["清水+味噌+酱油成汤加热。", "下香菇煮4–5分钟。", "面条另煮、冲洗后入汤。"],
    checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈75 g · 孕期 ✓ 全熟",
    swaps: "素面 ↔ 乌冬；香菇 ↔ 西葫芦。",
    side: "小碟黄瓜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light somen soup with shiitake and scallions in clear bowl"),
  },
  {
    id: "mi-a",
    title: "鱼香茄子（不辣）配米饭",
    desc: "降低油量与酸度，微甜微酸，淀粉勾薄芡。",
    story: "川味思路但无辣，更适合胃部。",
    target: "总碳水≈73 g（2人）· 蛋白≈16 g/人",
    ingredients: ["大米（生） 90 g", "茄子 400 g", "蒜 1 Stück", "生姜 8 g", "熟番茄 300 g", "低钠酱油 20 ml", "米醋（温和） 6 ml", "蜂蜜 4 g", "玉米淀粉 10 g"],
    steps: ["米饭煮熟；茄子少油炖至软。", "加入番茄与调味，小火煮8–10分钟。", "淀粉勾薄芡，浇在米饭上。"],
    checks: "胃炎 – 清淡、酸度低 · 糖尿病 ✓ – ≈73 g · 孕期 ✓ 全熟",
    swaps: "茄子 ↔ 西葫芦；白米 ↔ 糙米。",
    side: "焯水菠菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Glazed eggplant in mild garlic-ginger tomato sauce, bowl of rice alongside"),
  },

  // 周四
  {
    id: "do-f",
    title: "亲子丼（蛋全熟）",
    desc: "鸡肉鸡蛋盖饭，汤汁温和，无生蛋。",
    story: "日本经典盖饭——这里把鸡蛋完全煮熟。",
    target: "总碳水≈76 g（2人）· 蛋白≈31 g/人",
    ingredients: ["大米（生） 90 g", "鸡胸肉 220 g", "洋葱 60 g", "鸡蛋 3 Stück", "低钠酱油 20 ml", "味醂 8 ml", "清水 200 ml"],
    steps: ["米饭煮熟。", "鸡肉/洋葱在酱油味醂清汤中煮6–8分钟。", "倒入蛋液搅拌至完全凝固，浇在米饭上。"],
    checks: "胃炎 – 清淡炖煮 · 糖尿病 ✓ – ≈76 g · 孕期 ✓ 蛋/鸡全熟",
    swaps: "鸡肉 ↔ 火鸡；白米 ↔ 糙米。",
    side: "清淡味噌汤。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Oyakodon bowl with fully set egg, tender chicken, glossy sauce over rice"),
  },
  {
    id: "do-m",
    title: "豆芽拌饭（콩나물밥）",
    desc: "韩国豆芽蒸米饭，清爽清淡。",
    story: "以清香豆芽为主角，口感清脆。",
    target: "总碳水≈70 g（2人）· 蛋白≈18 g/人",
    ingredients: ["大米（生） 90 g", "黄豆芽 250 g", "香葱 20 g", "芝麻 6 g", "低钠酱油 12 ml", "清水 200 ml"],
    steps: ["大米与黄豆芽同煮。", "以酱油和芝麻轻调味。", "撒葱花上桌。"],
    checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 洗净并加热",
    swaps: "豆芽 ↔ 菠菜；白米 ↔ 糙米。",
    side: "温和泡菜（不辣）分开盛。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean bean sprout rice in a bowl, glossy grains, scallions and sesame on top"),
  },
  {
    id: "do-a",
    title: "味噌姜汁鸡肉炖蔬菜配米饭",
    desc: "鸡肉与胡萝卜、白萝卜在味噌汤中慢煮，配米饭。",
    story: "日本冬季家常，暖胃均衡。",
    target: "总碳水≈74 g（2人）· 蛋白≈28 g/人",
    ingredients: ["大米（生） 90 g", "鸡胸肉 300 g", "胡萝卜 200 g", "白萝卜 200 g", "淡味味噌 24 g", "清水 800 ml", "低钠酱油 10 ml", "生姜 8 g"],
    steps: ["米饭煮熟。", "蔬菜在味噌汤中小火煮12–15分钟。", "加入鸡肉再煮8–10分钟至熟；配米饭。"],
    checks: "胃炎 – 清淡久煮 · 糖尿病 ✓ – ≈74 g · 孕期 ✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；白米 ↔ 糙米。",
    side: "焯水青江菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ginger-miso chicken stew with carrots and daikon, side rice bowl"),
  },

  // 周五
  {
    id: "fr-f",
    title: "玉米粥配嫩豆腐",
    desc: "米+玉米打底的细腻粥，加入嫩豆腐。",
    story: "华南灵感——微甜柔和。",
    target: "总碳水≈72 g（2人）· 蛋白≈20 g/人",
    ingredients: ["大米（生） 70 g", "玉米粒（熟） 200 g", "清水 1000 ml", "嫩豆腐 200 g", "食盐 1 g"],
    steps: ["大米与水小火煮30分钟。", "加入玉米和豆腐再煮3–4分钟。", "轻微调味。"],
    checks: "胃炎 – 非常温和 · 糖尿病 ✓ – ≈72 g · 孕期 ✓ 全熟",
    swaps: "豆腐 ↔ 鸡肉末；大米 ↔ 小米。",
    side: "温草本茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Silky corn congee with silken tofu in a white bowl, steam visible"),
  },
  {
    id: "fr-m",
    title: "全麦意式烩饭配西葫芦与豌豆（IT）",
    desc: "温和搅拌出的全麦烩饭，纤维丰富。",
    story: "意大利灵感，本周唯一 IT 菜。",
    target: "总碳水≈78 g（2人）· 蛋白≈20 g/人",
    ingredients: ["全麦烩饭米（生） 100 g", "西葫芦 300 g", "豌豆（冷冻） 150 g", "蔬菜高汤 900 ml", "橄榄油 8 ml", "帕玛森（巴氏杀菌） 20 g"],
    steps: ["米少油翻炒后分次加汤搅拌（20–25分钟）。", "西葫芦/豌豆在最后6–8分钟加入。", "少量奶酪调味。"],
    checks: "胃炎 – 清淡搅拌 · 糖尿病 ✓ – ≈78 g · 孕期 ✓ 巴氏杀菌奶酪",
    swaps: "全麦米 ↔ 大麦；奶酪 ↔ 营养酵母。",
    side: "清蒸西兰花。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy wholegrain risotto with zucchini and peas, simple bowl, no garnishes"),
  },
  {
    id: "fr-a",
    title: "姜汁猪肉（生姜焼き）配米饭",
    desc: "少油煎熟的瘦猪肉，以姜汁酱收汁，配米饭。",
    story: "日本家常——咸甜平衡、无辣。",
    target: "总碳水≈75 g（2人）· 蛋白≈30 g/人",
    ingredients: ["大米（生） 90 g", "瘦猪里脊 280 g", "洋葱 80 g", "生姜 10 g", "低钠酱油 20 ml", "味醂 6 ml", "蜂蜜 4 g"],
    steps: ["米饭煮熟。", "猪肉薄片少油煎至全熟。", "倒入酱汁略收；配米饭。"],
    checks: "胃炎 – 清淡少油 · 糖尿病 ✓ – ≈75 g · 孕期 ✓ 肉全熟",
    swaps: "猪肉 ↔ 鸡肉；白米 ↔ 糙米。",
    side: "焯水菠菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ginger pork slices glossy in pan sauce, served with steamed rice"),
  },

  // 周六
  {
    id: "sa-f",
    title: "小米红枣粥",
    desc: "小米加红枣的温热早餐粥。",
    story: "华北常见的家常粥。",
    target: "总碳水≈70 g（2人）· 蛋白≈10 g/人",
    ingredients: ["小米（生） 80 g", "红枣 40 g", "清水 1000 ml"],
    steps: ["淘洗小米，煮沸。", "加入红枣小火煮25–30分钟。", "必要时补水，轻微调味。"],
    checks: "胃炎 – 很温和 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 全熟",
    swaps: "小米 ↔ 大米；红枣 ↔ 南瓜丁。",
    side: "温米茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Millet and red date porridge in a ceramic bowl, soft light"),
  },
  {
    id: "sa-m",
    title: "杂菜粉丝（잡채）配鸡肉",
    desc: "红薯粉丝配多彩蔬菜与鸡肉，少油炒制；辣椒分开。",
    story: "韩国经典，但做得更清淡。",
    target: "总碳水≈80 g（2人）· 蛋白≈27 g/人",
    ingredients: ["红薯粉丝（干） 90 g", "鸡胸肉 220 g", "彩椒 150 g", "菠菜 150 g", "胡萝卜 120 g", "洋葱 60 g", "低钠酱油 22 ml", "香油 8 ml"],
    steps: ["粉丝煮熟冲洗。", "鸡肉炒至全熟。", "与蔬菜合炒，清淡调味；辣椒另上。"],
    checks: "胃炎 – 清淡不辣 · 糖尿病 ✓ – ≈80 g · 孕期 ✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；粉丝 ↔ 乌冬。",
    side: "清爽黄瓜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with chicken and colorful vegetables, glossy sweet potato noodles, no chili"),
  },
  {
    id: "sa-a",
    title: "清蒸鲈鱼配米饭",
    desc: "姜葱清蒸鲈鱼，口味清淡。",
    story: "粤式做法——鲜香温和。",
    target: "总碳水≈70 g（2人）· 蛋白≈28 g/人",
    ingredients: ["大米（生） 90 g", "鲈鱼 320 g", "生姜 10 g", "香葱 24 g", "低钠酱油 12 ml", "香油 6 ml"],
    steps: ["米饭煮熟。", "鱼置姜片上蒸10–12分钟至全熟。", "少许酱油/香油淋面，撒葱花；配米饭。"],
    checks: "胃炎 – 清蒸 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鱼全熟",
    swaps: "鲈鱼 ↔ 鳕鱼；白米 ↔ 糙米。",
    side: "清蒸青江菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed sea bass with ginger and scallions, light soy drizzle, served with rice"),
  },

  // 周日
  {
    id: "so-f",
    title: "红薯饭（さつまいもご飯）",
    desc: "电饭煲蒸煮的红薯米饭——微甜。",
    story: "日本秋季家常饭。",
    target: "总碳水≈78 g（2人）· 蛋白≈10 g/人",
    ingredients: ["大米（生） 90 g", "红薯 250 g", "昆布 2 g", "清水 300 ml", "芝麻 6 g"],
    steps: ["红薯切丁，淘米。", "与昆布和水同煮（煮好取出昆布）。", "撒芝麻食用。"],
    checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈78 g · 孕期 ✓ 全熟、少碘",
    swaps: "白米 ↔ 糙米；芝麻 ↔ 海苔。",
    side: "温热绿茶（低咖）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese sweet potato rice in pot, golden cubes among white grains"),
  },
  {
    id: "so-m",
    title: "番茄鸡丝面汤",
    desc: "清爽面汤，微酸不辣。",
    story: "中式家常——暖身。",
    target: "总碳水≈72 g（2人）· 蛋白≈25 g/人",
    ingredients: ["小麦面（干） 100 g", "鸡胸肉 180 g", "熟番茄 300 g", "清水 1000 ml", "低钠酱油 10 ml", "生姜 6 g"],
    steps: ["煮汤，番茄煮8–10分钟。", "下鸡丝煮6–8分钟至熟。", "面条另煮后入汤。"],
    checks: "胃炎 – 轻酸温和 · 糖尿病 ✓ – ≈72 g · 孕期 ✓ 鸡肉全熟",
    swaps: "小麦面 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "焯水菠菜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken tomato noodle soup, clear red-tinged broth, thin noodles, steam"),
  },
  {
    id: "so-a",
    title: "豆腐蘑菇火锅（温和）配小份米饭",
    desc: "豆腐、蘑菇与白菜的清淡火锅；附小碗米饭。",
    story: "中/日/韩都常见的清淡火锅。",
    target: "总碳水≈64 g（2人）· 蛋白≈22 g/人",
    ingredients: ["大米（生） 80 g", "老豆腐 300 g", "香菇 180 g", "金针菇 120 g", "大白菜 200 g", "清水 1200 ml", "淡味味噌 20 g", "低钠酱油 10 ml"],
    steps: ["米饭煮熟。", "蔬菜与豆腐在清淡汤中煮10–12分钟。", "少量味噌/酱油调味，趁热食用。"],
    checks: "胃炎 – 清淡温热 · 糖尿病 ✓ – ≈64 g · 孕期 ✓ 全熟",
    swaps: "豆腐 ↔ 鸡胸；白米 ↔ 糙米。",
    side: "不辣黄瓜泡菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light tofu and mushroom hotpot in a shallow pot, napa cabbage, steam rising"),
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
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={`上传菜品图片：${pickText(r.title, lang)}`} />
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
              <b>目标:</b> {pickText(r.target, lang)}
            </div>
            <div>
              <b>检查:</b> {pickText(r.checks, lang)}
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
                💊 与正餐同服 Metformin。
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
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients}（2人份）</h3>
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
      {/* 封面 + 周览 */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              开始日期 {meta.startDate} – <b>模式：Non-Strict（温和）</b>；以中/日/韩为主，清淡少盐、孕期安全；糖尿病：每餐（2人）60–90 g 碳水。
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="上传封面图片" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>周计划</h2>
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
                          🌾 {pickText(m.target, lang).replace("总碳水", "碳水")}
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
      {/* 菜谱页 */}
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
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>根据本周菜谱自动汇总（开始 {meta.startDate}）。</p>
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
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>提示：酱油低钠；海藻（若用）少量；所有食材完全加热熟透。</div>
        </div>
      </div>
    </div>
  );
}

// ---------- Main ----------
export default function Woche5_2025_10_27_ZH() {
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

      {/* 下载链接 */}
      <div className="print:hidden" style={{ marginTop: 12 }}>
        {tab === "kochbuch" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.kochbuch ? (
              <a href={pdfLink.kochbuch} download={`${FILE_BASE} – kochbuch.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 下载 PDF（菜谱）
              </a>
            ) : null}
            {htmlLink.kochbuch ? (
              <a href={htmlLink.kochbuch} download={`${FILE_BASE} – kochbuch.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 下载 HTML（菜谱）
              </a>
            ) : null}
          </div>
        )}
        {tab === "einkauf" && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {pdfLink.einkauf ? (
              <a href={pdfLink.einkauf} download={`${FILE_BASE} – einkauf.pdf`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                📄 下载 PDF（购物清单）
              </a>
            ) : null}
            {htmlLink.einkauf ? (
              <a href={htmlLink.einkauf} download={`${FILE_BASE} – einkauf.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 下载 HTML（购物清单）
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
    if (!/^Woche 5 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
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
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");
    console.log("[GhibliKitchen] All tests passed (JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}