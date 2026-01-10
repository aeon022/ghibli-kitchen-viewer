// 文件: Woche-3-2025-10-13.zh.jsx
/* eslint-disable */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

export const meta = {
  title: "第3周",
  startDate: "2025-10-13",
  id: "woche-3-2025-10-13-zh",
  lang: "zh",
  sidebar: "[ZH] 第3周 (2025-10-13)",
};
const FILE_BASE = "第3周 2025-10-13";

const UI_TITLES = {
  main: "吉卜力厨房 – 第3周",
  list: "吉卜力厨房 – 购物清单 – 第3周",
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

/* -------- 安全渲染辅助（与 Woche-4 ZH 同步） -------- */
const asList = (v, lang) => {
  try {
    const out = pickList(v, lang);
    return Array.isArray(out) ? out : [];
  } catch {
    return [];
  }
};
const safeText = (v, lang) => {
  try {
    const s = pickText(v, lang);
    return (s ?? "").toString();
  } catch {
    return "";
  }
};

/* ---------- 数据 (21 个食谱) ---------- */
const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "三文鱼嫩豆腐粥（お粥）",
    desc: "日式米粥配熟三文鱼和嫩豆腐；灵感来自 Just One Cookbook。",
    story: "Okayu 在日本常作早餐或病后调理，入秋尤适合。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈20 g/人",
    ingredients: [
      "大米（生） 90 g",
      "清水 800 ml",
      "三文鱼柳 120 g",
      "嫩豆腐 200 g",
      "姜 10 g",
      "葱 20 g",
      "低钠酱油 10 ml",
    ],
    steps: [
      "淘米，加水小火煮 25–30 分钟至软糯。",
      "三文鱼蒸 8–10 分钟至全熟，取出压碎。",
      "下豆腐、姜末与酱油微调味，撒葱花。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g 碳水 · 孕期✓ 鱼全熟、低汞",
    swaps: "嫩豆腐 ↔ 老豆腐；三文鱼 ↔ 鳕鱼；备选：牛丼（瘦）/ 姜烧猪（瘦，温和）。",
    side: "温热大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu, scallions, gentle steam"),
  },
  {
    id: "mo-m",
    title: "温和拌饭（비빔밥）— 辣椒可选",
    desc: "韩式蔬菜牛肉拌饭，酱辣另给；灵感自 My Korean Kitchen。",
    story: "拌饭在韩国非常普及，暖和饱腹。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈31 g/人",
    ingredients: [
      "糙米（生） 90 g",
      "牛肉末 220 g",
      "菠菜 200 g",
      "胡萝卜 120 g",
      "香菇 120 g",
      "鸡蛋 2 Stück",
      "低钠酱油 20 ml",
      "香油 10 ml",
    ],
    steps: [
      "煮饭；蔬菜焯或少油快炒。",
      "牛肉末炒至全熟，温和调味。",
      "装碗；鸡蛋煎至完全凝固。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g 碳水 · 孕期✓ 蛋/肉全熟",
    swaps: "牛肉末 ↔ 火鸡末；糙米 ↔ 寿司米。",
    side: "辣酱分碟。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top"),
  },
  {
    id: "mo-a",
    title: "温和麻婆豆腐（麻婆豆腐）— 辣椒可选",
    desc: "中式经典的温和味噌系酱汁；灵感自 Omnivore’s Cookbook。",
    story: "四川名菜的家常温和版，适合下饭。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈32 g/人",
    ingredients: [
      "老豆腐 400 g",
      "香菇 150 g",
      "淡味味噌 20 g",
      "蔬菜高汤 300 ml",
      "低钠酱油 20 ml",
      "蒜 1 瓣",
      "姜 10 g",
      "玉米淀粉 10 g",
      "糙米（生） 90 g",
    ],
    steps: [
      "煮饭；香菇炒软。",
      "高汤+味噌+酱油加热；入豆腐小火 4–5 分钟。",
      "淀粉水勾薄芡，浇饭食用。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g 碳水 · 孕期✓ 全熟",
    swaps: "糙米 ↔ 白米；味噌 ↔ 温和豆瓣/黄豆酱。",
    side: "清蒸小白菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes"),
  },

  // 周二
  {
    id: "di-f",
    title: "三文鱼饭团 & 味噌汤（おにぎり・味噌汁）",
    desc: "三文鱼内馅饭团与温和味噌汤；灵感自 Just One Cookbook。",
    story: "饭团常见于便当文化，清淡可口。",
    target: "≈78 g 碳水（2 人）· 蛋白质 ≈27 g/人",
    ingredients: [
      "寿司米（生） 100 g",
      "三文鱼柳 150 g",
      "海苔 1 Stück",
      "淡味味噌 20 g",
      "老豆腐 150 g",
      "裙带菜（干） 2 g",
      "清水 900 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮米、捏饭团；熟三文鱼撕碎作馅，外包海苔。",
      "味噌用热水化开（不沸腾），下豆腐/裙带菜。",
      "酌量用酱油调整。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈78 g 碳水 · 孕期✓ 鱼全熟，海藻少量",
    swaps: "寿司米 ↔ 糙米；三文鱼 ↔ 明太鱼/鳕鱼。",
    side: "温和绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame"),
  },
  {
    id: "di-m",
    title: "鸡肉炒河粉（炒河粉）",
    desc: "广式风味，蔬菜多、酱汁清淡；灵感自 The Woks of Life。",
    story: "快手均衡的一餐。",
    target: "≈74 g 碳水（2 人）· 蛋白质 ≈39 g/人",
    ingredients: [
      "干河粉 80 g",
      "鸡胸肉 250 g",
      "甜椒 150 g",
      "小白菜 200 g",
      "洋葱 80 g",
      "胡萝卜 100 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
    ],
    steps: [
      "河粉浸泡/焯水。",
      "鸡肉少油快炒至全熟。",
      "下蔬菜，温和调味快速翻匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈74 g 碳水 · 孕期✓ 鸡肉全熟",
    swaps: "河粉 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "黄瓜片原味。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"),
  },
  {
    id: "di-a",
    title: "大酱汤配麦仁（된장찌개）",
    desc: "韩式大酱锅，醇厚不辣；灵感自 Seon Kyoung Longest。",
    story: "寒冷季节的家常汤品。",
    target: "≈86 g 碳水（2 人）· 蛋白质 ≈24 g/人",
    ingredients: [
      "大酱 30 g",
      "老豆腐 300 g",
      "西葫芦 200 g",
      "土豆 200 g",
      "香菇 100 g",
      "洋葱 70 g",
      "清水 800 ml",
      "低钠酱油 10 ml",
      "大麦（生） 70 g",
    ],
    steps: [
      "大酱溶于水，小火煮蔬菜 12–15 分钟。",
      "加入豆腐略焖。",
      "大麦分锅煮熟搭配。",
    ],
    checks: "胃炎——不辣 · 糖友✓ ≈86 g 碳水 · 孕期✓",
    swaps: "大麦 ↔ 米饭；豆腐 ↔ 火鸡胸。",
    side: "温和腌黄瓜（无辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"),
  },

  // 周三
  {
    id: "mi-f",
    title: "南瓜米粥 + 豆腐毛豆（단호박죽）",
    desc: "丝滑南瓜米粥，高蛋白；灵感自 Mom’s Korean Recipes。",
    story: "秋季柔和、暖心。",
    target: "≈75 g 碳水（2 人）· 蛋白质 ≈22 g/人",
    ingredients: [
      "南瓜（北海道/板栗） 400 g",
      "大米（生） 70 g",
      "老豆腐 200 g",
      "毛豆仁 100 g",
      "姜 8 g",
      "清水 900 ml",
      "盐 1 g",
    ],
    steps: [
      "南瓜+米小火煮 25 分钟至软。",
      "打细；下豆腐与毛豆再煮 3–4 分钟。",
      "温和调味。",
    ],
    checks: "胃炎——软暖 · 糖友✓ ≈75 g 碳水 · 孕期✓",
    swaps: "毛豆 ↔ 白腰豆；豆腐 ↔ 鸡胸丁。",
    side: "米茶/大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"),
  },
  {
    id: "mi-m",
    title: "鸡肉西兰花清汤乌冬（うどん）",
    desc: "日式清汤乌冬；灵感自 Just One Cookbook。",
    story: "清淡饱腹，适合午餐。",
    target: "≈79 g 碳水（2 人）· 蛋白质 ≈34 g/人",
    ingredients: [
      "乌冬（干） 110 g",
      "鸡胸肉 220 g",
      "西兰花 200 g",
      "洋葱 60 g",
      "淡味味噌 25 g",
      "清水 1000 ml",
      "低钠酱油 15 ml",
    ],
    steps: [
      "汤底以味噌+酱油调和加热。",
      "鸡肉小火煮 6–8 分钟至全熟；蔬菜再煮 3–4 分钟。",
      "乌冬另煮、冲洗后入汤。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈79 g 碳水 · 孕期✓",
    swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。",
    side: "小碟黄瓜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth"),
  },
  {
    id: "mi-a",
    title: "清蒸鳕鱼配姜葱 & 米饭（清蒸）",
    desc: "粤式清蒸，细嫩易消化；灵感自 Made With Lau。",
    story: "清蒸出本味，晚餐很舒心。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈32 g/人",
    ingredients: [
      "鳕鱼柳 320 g",
      "大米（生） 90 g",
      "姜 15 g",
      "葱 30 g",
      "低钠酱油 15 ml",
      "香油 8 ml",
      "蔬菜高汤 100 ml",
    ],
    steps: [
      "鱼置姜片上蒸 8–10 分钟至全熟。",
      "酱油+高汤加热，浇鱼，淋香油。",
      "米饭另煮。",
    ],
    checks: "胃炎——清蒸 · 糖友✓ ≈70 g 碳水 · 孕期✓ 鱼全熟、低汞",
    swaps: "鳕鱼 ↔ 明太鱼；米饭 ↔ 糙米。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"),
  },

  // 周四
  {
    id: "do-f",
    title: "玉子烧 & 味噌汤 + 小碗米饭（卵焼き・味噌汁）",
    desc: "日式早餐，鸡蛋完全凝固；灵感自 Just One Cookbook。",
    story: "经典早餐/便当组合。",
    target: "≈62 g 碳水（2 人）· 蛋白质 ≈24 g/人",
    ingredients: [
      "鸡蛋 4 Stück",
      "老豆腐 150 g",
      "大米（生） 80 g",
      "淡味味噌 20 g",
      "裙带菜（干） 1 g",
      "葱 20 g",
      "清水 800 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮饭；玉子烧卷煎至完全凝固。",
      "煮味噌汤；下豆腐/裙带菜。",
      "撒葱花。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈62 g 碳水 · 孕期✓ 蛋全熟",
    swaps: "米饭 ↔ 糙米；豆腐 ↔ 鸡胸丁。",
    side: "温热绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"),
  },
  {
    id: "do-m",
    title: "番茄炒蛋 + 豆腐 & 米饭",
    desc: "家常酸甜，炖至柔软；灵感自 The Woks of Life。",
    story: "中国家常名菜之一。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈28 g/人",
    ingredients: [
      "大米（生） 90 g",
      "鸡蛋 4 Stück",
      "老豆腐 200 g",
      "熟透番茄 400 g",
      "洋葱 60 g",
      "低钠酱油 10 ml",
      "菜籽油 10 ml",
    ],
    steps: [
      "煮饭；鸡蛋炒至全熟凝固。",
      "番茄与洋葱小火炖软；下豆腐略焖。",
      "温和调味，配米饭。",
    ],
    checks: "胃炎——酸度温和、炖到软 · 糖友✓ ≈70 g 碳水 · 孕期✓ 蛋全熟",
    swaps: "豆腐 ↔ 火鸡胸丁；米饭 ↔ 糙米。",
    side: "清蒸小白菜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"),
  },
  {
    id: "do-a",
    title: "温和韩式烤肉风味（火鸡）& 糙米（불고기）",
    desc: "平底锅快炒版，不辣；灵感自 Maangchi。",
    story: "家庭版烤肉，腌 15 分钟就能炒。",
    target: "≈80 g 碳水（2 人）· 蛋白质 ≈28 g/人",
    ingredients: [
      "火鸡胸 250 g",
      "糙米（生） 90 g",
      "洋葱 80 g",
      "胡萝卜 120 g",
      "蘑菇 150 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
      "蒜 1 瓣",
      "梨（擦泥） 60 g",
    ],
    steps: [
      "火鸡与酱油/梨泥/蒜腌 15 分钟。",
      "少油快炒至全熟。",
      "下蔬菜略炒，配糙米。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g 碳水 · 孕期✓ 肉全熟",
    swaps: "火鸡 ↔ 鸡胸；糙米 ↔ 米饭。",
    side: "黄瓜片。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"),
  },

  // 周五
  {
    id: "fr-f",
    title: "鸡肉粥（鸡肉粥）",
    desc: "米粥配嫩鸡肉——柔和暖胃；灵感自 The Woks of Life。",
    story: "南方常见粥饭，早餐/晚餐皆宜。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈34 g/人",
    ingredients: [
      "大米（生） 90 g",
      "鸡胸肉 220 g",
      "姜 12 g",
      "胡萝卜 120 g",
      "清水 1100 ml",
      "低钠酱油 10 ml",
      "葱 20 g",
    ],
    steps: [
      "米加水小火煮 30 分钟。",
      "鸡肉丁入粥煮 8–10 分钟至全熟。",
      "温和调味，撒葱花。",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈70 g 碳水 · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜。",
    side: "温热草本茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"),
  },
  {
    id: "fr-m",
    title: "清爽意式蔬菜汤 + 豆腐（Minestrone）",
    desc: "意式蔬汤，久煮温和。",
    story: "轻盈版本，温暖不厚重。",
    target: "≈69 g 碳水（2 人）· 蛋白质 ≈39 g/人",
    ingredients: [
      "全麦意面（干） 60 g",
      "白腰豆（沥干） 200 g",
      "胡萝卜 150 g",
      "西芹 100 g",
      "番茄（passata） 250 ml",
      "西葫芦 150 g",
      "蔬菜高汤 800 ml",
      "橄榄油 10 ml",
      "帕玛森（巴氏杀菌，可选） 20 g",
      "老豆腐 300 g",
    ],
    steps: [
      "少油炒香蔬菜，加高汤/番茄碎小火 20–25 分钟。",
      "入豆腐/白腰豆再焖 5 分钟。",
      "意面另煮，最后拌入。",
    ],
    checks: "胃炎——久煮温和 · 糖友✓ ≈69 g 碳水 · 孕期✓ 奶酪可选且需巴氏杀菌",
    swaps: "豆腐 ↔ 鸡胸丁；意面 ↔ 大麦。",
    side: "温热草本茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, few wholegrain pasta pieces"),
  },
  {
    id: "fr-a",
    title: "烤三文鱼照烧 + 西兰花 & 米饭（照り焼き）",
    desc: "日式灵感，低钠酱油烤制；灵感自 Just One Cookbook。",
    story: "烤箱版省事省时，适合工作日晚餐。",
    target: "≈75 g 碳水（2 人）· 蛋白质 ≈32 g/人",
    ingredients: [
      "三文鱼柳 320 g",
      "大米（生） 90 g",
      "西兰花 300 g",
      "低钠酱油 25 ml",
      "味醂（可选） 10 ml",
      "蜂蜜（可选） 5 g",
      "姜 10 g",
    ],
    steps: [
      "调酱（酱油+少量味醂/蜂蜜+姜）。",
      "刷在三文鱼上，200°C 烤 12–14 分钟。",
      "配米饭与清蒸西兰花。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈75 g 碳水（甜度低） · 孕期✓ 鱼全熟",
    swaps: "米饭 ↔ 糙米；西兰花 ↔ 小白菜。",
    side: "温热绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice"),
  },

  // 周六
  {
    id: "sa-f",
    title: "汤豆腐 + 小碗米饭（湯豆腐）",
    desc: "日式热汤豆腐，易消化。",
    story: "京都冬季经典，轻暖安神。",
    target: "≈62 g 碳水（2 人）· 蛋白质 ≈32 g/人",
    ingredients: [
      "老豆腐 400 g",
      "蔬菜高汤 800 ml",
      "大葱 100 g",
      "菠菜 150 g",
      "大米（生） 80 g",
      "低钠酱油 15 ml",
      "芝麻 10 g",
    ],
    steps: [
      "热高汤，豆腐小火焖 5–6 分钟。",
      "下大葱/菠菜略煮。",
      "少量酱油调味；米饭另盛。",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈62 g 碳水 · 孕期✓",
    swaps: "米饭 ↔ 糙米；菠菜 ↔ 小白菜。",
    side: "温水或大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Yudofu in a clay pot with leeks and spinach, small rice bowl"),
  },
  {
    id: "sa-m",
    title: "杂菜粉丝（牛肉蔬菜）（잡채）— 温和",
    desc: "韩式红薯粉丝拌炒，蔬菜多；灵感自 Maangchi。",
    story: "节庆与日常皆宜，热食或室温均可。",
    target: "≈75 g 碳水（2 人）· 蛋白质 ≈24 g/人",
    ingredients: [
      "红薯粉丝（干） 80 g",
      "瘦牛肉条 220 g",
      "甜椒 150 g",
      "胡萝卜 150 g",
      "蘑菇 150 g",
      "菠菜 150 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
      "蒜 1 瓣",
    ],
    steps: [
      "粉丝煮熟过冷水。",
      "牛肉/蔬菜少油炒熟，调味。",
      "拌入粉丝，加热即成。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈75 g 碳水 · 孕期✓ 牛肉全熟",
    swaps: "牛肉 ↔ 豆腐；红薯粉丝 ↔ 米粉。",
    side: "芝麻拌黄瓜（温和）。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with colorful vegetables and beef strips, glossy but not oily"),
  },
  {
    id: "sa-a",
    title: "香菇炖鸡 & 米饭（香菇鸡）",
    desc: "中式小火炖，柔嫩入味；灵感自 Red House Spice。",
    story: "秋冬家常炖菜，温和不刺激。",
    target: "≈62 g 碳水（2 人）· 蛋白质 ≈33 g/人",
    ingredients: [
      "去皮鸡腿 300 g",
      "香菇 200 g",
      "胡萝卜 120 g",
      "大米（生） 80 g",
      "低钠酱油 25 ml",
      "姜 10 g",
      "蔬菜高汤 300 ml",
    ],
    steps: [
      "鸡块小火煎香，冲入高汤。",
      "下香菇/胡萝卜，小火炖 20–25 分钟。",
      "配米饭。",
    ],
    checks: "胃炎——温和炖 · 糖友✓ ≈62 g 碳水 · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；米饭 ↔ 糙米。",
    side: "清蒸小白菜或西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised chicken with shiitake and carrots, small rice serving"),
  },

  // 周日
  {
    id: "so-f",
    title: "苹果豆腐甜米粥（お粥）",
    desc: "微甜温和的水果粥。",
    story: "苹果季节的暖心早餐。",
    target: "≈80 g 碳水（2 人）· 蛋白质 ≈22 g/人",
    ingredients: [
      "大米（生） 80 g",
      "苹果 150 g",
      "清水 1000 ml",
      "肉桂 1 g",
      "老豆腐 300 g",
    ],
    steps: [
      "米加水小火煮 30 分钟。",
      "入苹果丁再煮 5 分钟。",
      "下豆腐丁，温和调味。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g 碳水 · 孕期✓",
    swaps: "苹果 ↔ 梨；豆腐 ↔ Skyr（巴氏杀菌）。",
    side: "温热花草茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy rice porridge with small apple cubes and tofu, neutral bowl, steam"),
  },
  {
    id: "so-m",
    title: "清汤火鸡面（清汤面）",
    desc: "清汤与嫩火鸡，午餐快捷；灵感自 Made With Lau。",
    story: "感冒季常见的清淡面。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈24 g/人",
    ingredients: [
      "小麦面（干） 100 g",
      "火鸡胸 220 g",
      "小白菜 200 g",
      "胡萝卜 120 g",
      "洋葱 60 g",
      "蔬菜高汤 900 ml",
      "低钠酱油 15 ml",
    ],
    steps: [
      "汤加热；火鸡 8–10 分钟小火煮至全熟。",
      "蔬菜 3–4 分钟。",
      "面条另煮冲洗后入汤，温和调味。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g 碳水 · 孕期✓",
    swaps: "小麦面 ↔ 米粉；火鸡 ↔ 豆腐。",
    side: "温水。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear noodle soup with turkey slices, pak choi and carrots"),
  },
  {
    id: "so-a",
    title: "温和明太鱼炖白萝卜 & 米饭（명태조림）",
    desc: "韩式炖鱼，辣椒可另给。",
    story: "韩国常见的‘조림’炖法，适合温和晚餐。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈30 g/人",
    ingredients: [
      "明太鱼柳 320 g",
      "白萝卜 250 g",
      "洋葱 60 g",
      "大酱 20 g",
      "低钠酱油 20 ml",
      "清水 500 ml",
      "大米（生） 90 g",
      "香油 8 ml",
    ],
    steps: [
      "萝卜 + 大酱加水小火煮 10 分钟。",
      "下鱼炖 8–10 分钟至全熟。",
      "淋香油，配米饭。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g 碳水 · 孕期✓",
    swaps: "明太鱼 ↔ 鳕鱼；米饭 ↔ 糙米。",
    side: "清蒸菠菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild braised pollock with daikon in light brown sauce, small rice bowl"),
  },
];

/* ---------- 周视图 Helper ---------- */
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = { mo: "周一", di: "周二", mi: "周三", do: "周四", fr: "周五", sa: "周六", so: "周日" };
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  (Array.isArray(arr) ? arr : []).forEach((r) => {
    const k = (r?.id || "").split("-")[0];
    if (map[k]) map[k].push(r);
  });
  Object.values(map).forEach((list) =>
    list.sort((a, b) => ["f", "m", "a"].indexOf(a.id.split("-")[1]) - ["f", "m", "a"].indexOf(b.id.split("-")[1]))
  );
  return map;
};

/* ---------- 购物清单汇总 ---------- */
function normalizeName(n) {
  return String(n || "")
    .replace(/\(.*?\)/g, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/ +/g, " ");
}
function parseQty(item) {
  const m = String(item || "").match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
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
  protein: ["鸡", "火鸡", "牛", "三文鱼", "鳕鱼", "明太鱼", "豆腐", "鸡蛋", "毛豆", "帕玛森", "猪", "牛肉末"],
  veg: ["胡萝卜", "西葫芦", "小白菜", "菠菜", "香菇", "蘑菇", "西兰花", "大葱", "洋葱", "甜椒", "白萝卜", "葱", "土豆", "南瓜", "黄瓜", "苹果"],
  staple: ["米", "寿司米", "糙米", "大麦", "乌冬", "小麦面", "米粉", "粉丝", "全麦意面"],
  season: ["裙带菜", "海苔", "高汤", "蔬菜高汤", "酱油", "味噌", "大酱", "香油", "菜籽油", "橄榄油", "味醂", "蜂蜜", "肉桂", "盐", "芝麻", "蒜", "姜", "番茄（碎）", "清水"],
};
function accumulateList(data) {
  const buckets = { protein: {}, veg: {}, staple: {}, season: {} };
  (Array.isArray(data) ? data : []).forEach((r) =>
    (r?.ingredients || []).forEach((ing) => {
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
    "蛋白/鱼/豆制品": formatBucket(b.protein),
    "蔬菜/菌菇": formatBucket(b.veg),
    "主食/面/饱腹": formatBucket(b.staple),
    "海藻/汤底/调味": formatBucket(b.season),
  };
}
const LIST_SUMMARY = buildListSummary();

/* ---------- 图片持久化 ---------- */
const getImageKey = (suffix) => `${FILE_BASE}::img::${suffix}`;
const readLocalImage = (key) => (typeof localStorage !== "undefined" ? localStorage.getItem(key) || "" : "");
const saveLocalImage = (key, dataUrl) => {
  try {
    localStorage.setItem(key, dataUrl);
  } catch {}
};

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

/* ---------- i18n 辅助 ---------- */
const dayNameI18n = (id, t) => t.day[id.split("-")[0]];
const mealTitleI18n = (id, t) => t.mealTitle[id.split("-")[1]];
const mealLabelI18n = (id, t) => t.meal[id.split("-")[1]];

/* ---------- 菜谱卡片 ---------- */
function RecipeCard({ r, t, lang }) {
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  return (
    <div className="page" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={{ gridColumn: "span 4", ...cardPanelStyle }}>
          <div className="print:hidden">
            <ImageUpload storageKey={recipeImgKey} label={`上传菜品图片：${safeText(r.title, lang)}`} />
          </div>
          {img ? <img src={img} alt={safeText(r.title, lang)} style={{ width: "100%", borderRadius: 12, border: `1px solid ${COLORS.border}` }} /> : null}
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            <div>
              <b>
                {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
              </b>
            </div>
            <div style={{ marginTop: 6 }}>{safeText(r.desc, lang)}</div>
            <div style={{ marginTop: 6 }}>
              <b>目标：</b> {safeText(r.target, lang)}
            </div>
            <div>
              <b>检查点：</b> {safeText(r.checks, lang)}
            </div>
            <div>
              <b>{t.sections.side}：</b> {safeText(r.side, lang)}
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
                💊 用餐时服用二甲双胍。
              </div>
            ) : null}
          </div>
        </aside>
        <main style={{ gridColumn: "span 8", ...cardMainStyle }}>
          <div style={{ fontSize: 12, color: COLORS.sky, fontWeight: 700, marginTop: -4, marginBottom: 6 }}>
            {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
          </div>
          <h2 style={{ marginTop: 0 }}>{safeText(r.title, lang)}</h2>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{safeText(r.story, lang)}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients}（2 人份）</h3>
              {(() => {
                const ingList = asList(r?.ingredients, lang);
                return (
                  <ul className="avoid-break">
                    {ingList.length > 0 ? (
                      ingList.map((x, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          {typeof x === "string" ? x : String(x ?? "")}
                        </li>
                      ))
                    ) : (
                      <li style={{ marginBottom: 4, opacity: 0.7 }}>—</li>
                    )}
                  </ul>
                );
              })()}
            </section>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.steps}</h3>
              {(() => {
                const stepList = asList(r?.steps, lang);
                return (
                  <ol className="avoid-break" style={{ paddingLeft: 18 }}>
                    {stepList.length > 0 ? (
                      stepList.map((s, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          {typeof s === "string" ? s : String(s ?? "")}
                        </li>
                      ))
                    ) : (
                      <li style={{ marginBottom: 4, opacity: 0.7 }}>—</li>
                    )}
                  </ol>
                );
              })()}
              <div style={{ marginTop: 6, fontSize: 12 }}>
                <b>{t.sections.swaps}：</b> {safeText(r.swaps, lang)}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- 整周（封面 + 周览 + 配方页） ---------- */
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
              自 {meta.startDate} 起的一周 —— <b>模式：Non-Strict（均衡）</b>；以中/日/韩为主，温和调味、低钠酱油、孕期友好；糖尿病：每餐（2 人）60–90 g 碳水。
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="上传封面图片" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>本周总览</h2>
            <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 8, fontSize: 14 }}>
              {DAYS_ORDER.map((d) => {
                const dayList = Array.isArray(weekly?.[d]) ? weekly[d] : [];
                return (
                  <div key={d} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{t.day[d]}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {dayList.map((m) => {
                        const title = safeText(m?.title, lang);
                        const target = safeText(m?.target, lang);
                        return (
                          <div key={m.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                            <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabelI18n(m.id, t)}</div>
                            <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
                            <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>
                              🌾 {target.replace("碳水（2 人）", "碳水")}
                              {m?.remind ? " · 💊" : ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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

/* ---------- 购物清单 ---------- */
function GroceryList() {
  const rootRef = useRef(null);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>根据本周菜谱自动汇总（开始：{meta.startDate}）。</p>
          <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {Object.entries(LIST_SUMMARY).map(([group, items]) => {
              const safeItems = Array.isArray(items) ? items : [];
              return (
                <div key={group} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 12, background: COLORS.panelBG70 }}>
                  <h3 style={{ marginTop: 0, color: COLORS.indigo }}>{group}</h3>
                  <ul>
                    {safeItems.map((t, i) => (
                      <li key={i}>{typeof t === "string" ? t : String(t ?? "")}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.neutral }}>
            注意：低钠酱油；海藻（裙带菜/海苔）适量；所有食物需充分加热。
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 主组件 ---------- */
export default function Woche3_2025_10_13_ZH() {
  const [tab, setTab] = useState("kochbuch");
  const [lang] = useState("zh");
  const t = UI[lang] || UI.zh;
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
                📄 下载 PDF（购物清单）
              </a>
            ) : null}
            {htmlLink.einkauf ? (
              <a href={htmlLink.einkauf} download={`${FILE_BASE} – list.html`} style={{ color: COLORS.indigo, textDecoration: "underline" }}>
                🌐 下载 HTML（购物清单）
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- 测试 ---------- */
function Tests() {
  try {
    if (!/^第3周 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (!Array.isArray(DATA) || DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("午餐不应带用药提醒");
      if (!isLunch && !r.remind) throw new Error("早餐/晚餐应带用药提醒");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`食材过少: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`步骤过少: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY 分组缺失");
    console.log("[GhibliKitchen] All tests passed (ZH JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}