import React, { useMemo, useState, useEffect } from "react";

/* ---------------------------------- Meta --------------------------------- */
export const meta = {
  title: "第5周",
  startDate: "2025-11-03",
  id: "woche-5-2025-11-03-zh",
  lang: "zh",
  sidebar: "[ZH] 第5周 (2025-11-03)",
};
const FILE_BASE = "Woche 5 2025-11-03";

/* ------------------------------- UI Strings ------------------------------ */
const UI = {
  main: "吉卜力厨房 – 第5周",
  list: "吉卜力厨房 – 购物清单 – 第5周",
  coverInfo:
    "中/日/韩料理——糖友友好（每餐≈60–90 g 碳水/2人）且孕期安全。可在此为每个食谱上传图片。",
  exportPdf: "导出 PDF",
  exportHtml: "导出 HTML",
  print: "打印",
  tabCook: "食谱",
  tabList: "购物清单",
  weekOverview: "本周总览",
  reminder: "💊 用餐时服用二甲双胍",
  ingredientsTitle: "配料（2人份）",
  stepsTitle: "步骤",
  swapsTitle: "替代",
  checksTitle: "提示",
  sideTitle: "配菜/饮品",
  upload: "上传图片",
};

/* --------------------------------- Styles -------------------------------- */
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

/* ----------------------------- helpers ----------------------------------- */
const DAY_NAME_ZH = { mo: "周一", di: "周二", mi: "周三", do: "周四", fr: "周五", sa: "周六", so: "周日" };
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];

const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  arr.forEach((r) => map[r.id.split("-")[0]].push(r));
  Object.values(map).forEach((list) =>
    list.sort(
      (a, b) => ["f", "m", "a"].indexOf(a.id.split("-")[1]) - ["f", "m", "a"].indexOf(b.id.split("-")[1])
    )
  );
  return map;
};

/* ------------------------------- DATA (21) ------------------------------- */
const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "三文鱼丝豆腐粥（お粥）",
    desc: "日式Okayu，温和米粥配蒸熟三文鱼与嫩豆腐；灵感来自 Just One Cookbook。",
    story: "Okayu源自日本，常见于早餐，温暖易消化。",
    target: "≈70 g KH（2人）· 蛋白≈20 g/人",
    ingredients: [
      "大米（生） 90 g",
      "水 800 ml",
      "三文鱼柳 120 g",
      "内酯豆腐 200 g",
      "姜 10 g",
      "葱 20 g",
      "低钠酱油 10 ml",
    ],
    steps: [
      "淘米加水煮25–30分钟",
      "在粥上蒸三文鱼8–10分钟并弄碎",
      "加入豆腐与调味，撒葱花",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 鱼全熟、低汞",
    swaps: "嫩豆腐 ↔ 老豆腐；三文鱼 ↔ 鳕鱼。",
    side: "温热大麦茶；清淡腌黄瓜（不辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu cubes, scallions, steam rising"),
  },
  {
    id: "mo-m",
    title: "温和拌饭（비빔밥）— 辣椒可选",
    desc: "韩式蔬菜牛肉拌饭；辣酱另给，可不加。",
    story: "拌饭是韩国日常便饭，温热多彩。",
    target: "≈70 g KH（2人）· 蛋白≈31 g/人",
    ingredients: [
      "糙米（生） 90 g",
      "瘦牛肉糜 220 g",
      "菠菜 200 g",
      "胡萝卜 120 g",
      "香菇 120 g",
      "鸡蛋 2 Stück",
      "低钠酱油 20 ml",
      "香油 10 ml",
    ],
    steps: [
      "煮饭；蔬菜汆烫或少油快炒",
      "牛肉糜炒至全熟",
      "装碗，鸡蛋全熟煎",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 蛋全熟、肉全熟",
    swaps: "牛肉糜 ↔ 火鸡糜；糙米 ↔ 寿司米。",
    side: "辣酱另碟。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top"),
  },
  {
    id: "mo-a",
    title: "温和麻婆豆腐（麻婆豆腐）— 辣椒可选",
    desc: "川菜经典的温和版，味噌系酱汁。",
    story: "家常不辣版本。",
    target: "≈70 g KH（2人）· 蛋白≈32 g/人",
    ingredients: [
      "老豆腐 400 g",
      "香菇 150 g",
      "浅色味噌 20 g",
      "蔬菜高汤 300 ml",
      "低钠酱油 20 ml",
      "蒜 1 瓣",
      "姜 10 g",
      "玉米淀粉 10 g",
      "糙米（生） 90 g",
    ],
    steps: [
      "煮米；香菇炒软",
      "高汤+味噌+酱油加热，入豆腐小火煨4–5分钟",
      "勾薄芡后上桌",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "糙米 ↔ 白米。",
    side: "清蒸小白菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes"),
  },

  // 周二
  {
    id: "di-f",
    title: "三文鱼饭团 & 味噌汤（おにぎり・味噌汁）",
    desc: "三文鱼内馅饭团与温和味噌汤。",
    story: "便当文化代表。",
    target: "≈78 g KH（2人）· 蛋白≈27 g/人",
    ingredients: [
      "寿司米（生） 100 g",
      "三文鱼柳 150 g",
      "海苔 1 Blatt",
      "浅色味噌 20 g",
      "老豆腐 150 g",
      "裙带菜（干） 2 g",
      "水 900 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮米捏饭团，熟三文鱼作馅并包上海苔",
      "味噌以热水化开（不沸），下豆腐/裙带菜略焖",
      "温和调味",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈78 g KH · 孕期✓ 鱼全熟，海藻少量",
    swaps: "寿司米 ↔ 糙米；三文鱼 ↔ 明太鱼/狭鳕。",
    side: "温和绿茶（可脱咖）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame"),
  },
  {
    id: "di-m",
    title: "鸡肉河粉炒（河粉）",
    desc: "广式风味，蔬菜多。",
    story: "快手热炒。",
    target: "≈74 g KH（2人）· 蛋白≈39 g/人",
    ingredients: [
      "干河粉 80 g",
      "鸡胸肉 250 g",
      "彩椒 150 g",
      "小白菜 200 g",
      "洋葱 80 g",
      "胡萝卜 100 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
    ],
    steps: [
      "河粉浸泡/焯水",
      "鸡肉炒至全熟",
      "下蔬菜调味翻匀",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈74 g KH · 孕期✓ 鸡肉全熟",
    swaps: "河粉 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "黄瓜片原味。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"),
  },
  {
    id: "di-a",
    title: "大酱汤配麦仁（된장찌개）",
    desc: "醇厚但不辣。",
    story: "韩国家常汤品。",
    target: "≈86 g KH（2人）· 蛋白≈24 g/人",
    ingredients: [
      "大酱 30 g",
      "老豆腐 300 g",
      "西葫芦 200 g",
      "土豆 200 g",
      "香菇 100 g",
      "洋葱 70 g",
      "水 800 ml",
      "低钠酱油 10 ml",
      "珍珠麦（生） 70 g",
    ],
    steps: [
      "大酱溶于水，小火煮蔬菜12–15分钟",
      "加入豆腐略焖",
      "珍珠麦另煮，配食",
    ],
    checks: "胃炎——醇厚不辣 · 糖友✓ ≈86 g KH · 孕期✓ 全熟",
    swaps: "珍珠麦 ↔ 米饭；豆腐 ↔ 火鸡胸。",
    side: "清淡腌黄瓜（无辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"),
  },

  // 周三
  {
    id: "mi-f",
    title: "南瓜粥配豆腐与毛豆（단호박죽）",
    desc: "丝滑南瓜米粥，高蛋白。",
    story: "韩国做法，适合清晨。",
    target: "≈75 g KH（2人）· 蛋白≈22 g/人",
    ingredients: [
      "南瓜（板栗/北海道） 400 g",
      "大米（生） 70 g",
      "老豆腐 200 g",
      "毛豆仁 100 g",
      "姜 8 g",
      "水 900 ml",
      "盐 少许",
    ],
    steps: [
      "南瓜+米煮25分钟至软",
      "打细；入豆腐与毛豆再煮3–4分钟",
      "温和调味",
    ],
    checks: "胃炎——软暖 · 糖友✓ ≈75 g KH · 孕期✓ 全熟",
    swaps: "毛豆 ↔ 白腰豆；豆腐 ↔ 鸡胸丁。",
    side: "温热米茶/大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"),
  },
  {
    id: "mi-m",
    title: "鸡肉西兰花乌冬汤（うどん）",
    desc: "清汤温和。",
    story: "四季皆宜。",
    target: "≈79 g KH（2人）· 蛋白≈34 g/人",
    ingredients: [
      "乌冬（干） 110 g",
      "鸡胸肉 220 g",
      "西兰花 200 g",
      "洋葱 60 g",
      "浅色味噌 25 g",
      "水 1000 ml",
      "低钠酱油 15 ml",
    ],
    steps: [
      "味噌+酱油调汤加热",
      "鸡肉煮6–8分钟至熟；蔬菜再煮3–4分钟",
      "乌冬另煮后加入",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈79 g KH · 孕期✓ 鸡肉全熟",
    swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。",
    side: "小碟黄瓜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth"),
  },
  {
    id: "mi-a",
    title: "姜丝清蒸鳕鱼 & 米饭（清蒸鳕鱼）",
    desc: "粤式清蒸，细嫩易消化。",
    story: "清蒸技法。",
    target: "≈70 g KH（2人）· 蛋白≈32 g/人",
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
      "鱼置姜片上蒸8–10分钟",
      "酱油+高汤加热浇在鱼上，淋香油",
      "米饭煮熟同食",
    ],
    checks: "胃炎——清蒸 · 糖友✓ ≈70 g KH · 孕期✓ 鳕鱼全熟、低汞",
    swaps: "鳕鱼 ↔ 明太鱼；米饭 ↔ 糙米。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"),
  },

  // 周四
  {
    id: "do-f",
    title: "玉子烧 & 味噌汤配小碗米饭（卵焼き・味噌汁）",
    desc: "日式早餐——鸡蛋全熟。",
    story: "便当常客。",
    target: "≈62 g KH（2人）· 蛋白≈24 g/人",
    ingredients: [
      "鸡蛋 4 Stück",
      "老豆腐 150 g",
      "大米（生） 80 g",
      "浅色味噌 20 g",
      "裙带菜（干） 1 g",
      "葱 20 g",
      "水 800 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮米；玉子烧煎至完全凝固",
      "煮味噌汤，下豆腐/裙带菜",
      "撒葱花上桌",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈62 g KH · 孕期✓ 蛋完全凝固",
    swaps: "米饭 ↔ 糙米；豆腐 ↔ 鸡胸丁。",
    side: "温热绿茶（低咖）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"),
  },
  {
    id: "do-m",
    title: "番茄炒蛋配豆腐 & 米饭（番茄炒蛋）",
    desc: "中式家常，酸甜温和。",
    story: "快速又受欢迎。",
    target: "≈70 g KH（2人）· 蛋白≈28 g/人",
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
      "煮米；鸡蛋炒至全熟",
      "番茄与洋葱小火炖软，入豆腐",
      "温和调味上桌",
    ],
    checks: "胃炎——酸度温和、充分炖煮 · 糖友✓ ≈70 g KH · 孕期✓ 蛋全熟",
    swaps: "豆腐 ↔ 火鸡胸丁；米饭 ↔ 糙米。",
    side: "清蒸小白菜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"),
  },
  {
    id: "do-a",
    title: "温和韩式烤肉风味火鸡 & 糙米（불고기）",
    desc: "平底锅版，温和腌制。",
    story: "韩国经典。",
    target: "≈80 g KH（2人）· 蛋白≈28 g/人",
    ingredients: [
      "火鸡胸肉 250 g",
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
      "腌15分钟",
      "少油快炒至全熟",
      "下蔬菜略炒配米饭",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g KH · 孕期✓ 火鸡全熟",
    swaps: "火鸡 ↔ 鸡胸；糙米 ↔ 白米。",
    side: "黄瓜片原味。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"),
  },

  // 周五
  {
    id: "fr-f",
    title: "鸡肉粥（鸡肉粥）",
    desc: "温暖米粥配鸡肉。",
    story: "华南及东南亚常见。",
    target: "≈70 g KH（2人）· 蛋白≈34 g/人",
    ingredients: [
      "大米（生） 90 g",
      "鸡胸肉 220 g",
      "姜 12 g",
      "胡萝卜 120 g",
      "水 1100 ml",
      "低钠酱油 10 ml",
      "葱 20 g",
    ],
    steps: [
      "米煮30分钟",
      "鸡肉丁入粥煮8–10分钟至熟",
      "温和调味，撒葱花",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈70 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜。",
    side: "温热花草茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"),
  },
  {
    id: "fr-m",
    title: "清爽意式蔬菜汤配豆腐（Minestrone）",
    desc: "意式蔬菜浓汤，久煮温和。",
    story: "本周唯一的意式菜。",
    target: "≈69 g KH（2人）· 蛋白≈39 g/人",
    ingredients: [
      "全麦意面（干） 60 g",
      "白腰豆（沥干） 200 g",
      "胡萝卜 150 g",
      "西芹 100 g",
      "番茄碎 250 ml",
      "西葫芦 150 g",
      "蔬菜高汤 800 ml",
      "橄榄油 10 ml",
      "帕玛森（巴氏杀菌，可选） 20 g",
      "老豆腐 300 g",
    ],
    steps: [
      "少油炒蔬菜，加高汤/番茄碎煮20–25分钟",
      "入豆腐/白腰豆再焖5分钟",
      "意面另煮后拌入",
    ],
    checks: "胃炎——久煮温和 · 糖友✓ ≈69 g KH · 孕期✓ 奶酪需巴氏杀菌（可选）",
    swaps: "豆腐 ↔ 鸡胸丁；意面 ↔ 大麦。",
    side: "温热草本茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, few wholegrain pasta pieces"),
  },
  {
    id: "fr-a",
    title: "烤三文鱼照烧配西兰花与米饭（照り焼き）",
    desc: "低钠酱油烤制。",
    story: "烤箱省时。",
    target: "≈75 g KH（2人）· 蛋白≈32 g/人",
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
      "调酱（酱油+少许味醂/蜂蜜+姜）",
      "200°C烤12–14分钟",
      "配米饭与蒸西兰花",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈75 g KH（甜度很低）· 孕期✓ 三文鱼全熟",
    swaps: "米饭 ↔ 糙米；西兰花 ↔ 小白菜。",
    side: "温热绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice"),
  },

  // 周六
  {
    id: "sa-f",
    title: "汤豆腐配小碗米饭（湯豆腐）",
    desc: "京都名物，热汤煮豆腐，易消化。",
    story: "轻暖安心。",
    target: "≈62 g KH（2人）· 蛋白≈20 g/人",
    ingredients: [
      "老豆腐 300 g",
      "昆布（少量） 2 g",
      "葱 20 g",
      "低钠酱油 10 ml",
      "大米（生） 80 g",
      "水 900 ml",
    ],
    steps: [
      "昆布入水浸10分钟后取出",
      "豆腐丁小火煮3–4分钟",
      "少量酱油与葱花调味，配小碗米饭",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈62 g KH · 孕期✓ 全熟；碘少量",
    swaps: "豆腐 ↔ 鸡胸丁。",
    side: "温热焙茶/绿茶（低咖）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Hot tofu in clear kombu broth, small bowl of rice, gentle steam"),
  },
  {
    id: "sa-m",
    title: "蘑菇菠菜荞麦面汤（そば）",
    desc: "清淡荞麦面汤。",
    story: "日本家常。",
    target: "≈74 g KH（2人）· 蛋白≈22 g/人",
    ingredients: [
      "荞麦面（干） 100 g",
      "香菇 150 g",
      "菠菜 200 g",
      "浅色味噌 20 g",
      "低钠酱油 15 ml",
      "水 900 ml",
      "芝麻 10 g",
    ],
    steps: [
      "汤底以味噌+酱油加热",
      "荞麦面另煮冲净",
      "下蘑菇/菠菜略煮，加入荞麦面",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈74 g KH · 孕期✓ 全熟",
    swaps: "荞麦面 ↔ 乌冬；菠菜 ↔ 小白菜。",
    side: "清淡腌萝卜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light soba noodle soup with mushrooms and spinach in clear broth"),
  },
  {
    id: "sa-a",
    title: "韩式炖鸡（닭찜）配土豆胡萝卜 + 小碗米饭",
    desc: "温和家常炖菜。",
    story: "适合周末晚餐的韩式炖锅。",
    target: "≈82 g KH（2人）· 蛋白≈32 g/人",
    ingredients: [
      "去皮鸡小腿 300 g",
      "土豆 250 g",
      "胡萝卜 150 g",
      "洋葱 80 g",
      "低钠酱油 20 ml",
      "蒜 1 瓣",
      "姜 8 g",
      "水 700 ml",
      "大米（生） 80 g",
    ],
    steps: [
      "与水/酱油小火炖25–30分钟至鸡肉熟透",
      "需时可加水",
      "配小碗米饭",
    ],
    checks: "胃炎——温和炖煮 · 糖友✓ ≈82 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 火鸡；土豆 ↔ 红薯。",
    side: "清淡腌黄瓜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean braised chicken stew with potato and carrot, small rice bowl"),
  },

  // 周日
  {
    id: "so-f",
    title: "三文鱼茶泡饭（お茶漬け）",
    desc: "热茶/高汤冲米饭，三文鱼全熟。",
    story: "日式清晨安慰餐。",
    target: "≈68 g KH（2人）· 蛋白≈24 g/人",
    ingredients: [
      "大米（生） 85 g",
      "三文鱼柳 140 g",
      "低咖绿茶 600 ml",
      "海苔 1 Blatt",
      "芝麻 8 g",
      "低钠酱油 8 ml",
    ],
    steps: [
      "煮米；三文鱼蒸8–10分钟",
      "冲泡热茶，米饭+鱼装碗，注茶",
      "撒海苔与芝麻",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈68 g KH · 孕期✓ 三文鱼全熟",
    swaps: "绿茶 ↔ 清淡高汤；三文鱼 ↔ 鳕鱼。",
    side: "清淡腌萝卜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steaming ochazuke rice bowl with cooked salmon flakes and green tea poured over"),
  },
  {
    id: "so-m",
    title: "豆芽拌饭配豆腐（콩나물밥）",
    desc: "韩式豆芽饭，清爽脆口。",
    story: "常见的简餐午饭。",
    target: "≈76 g KH（2人）· 蛋白≈24 g/人",
    ingredients: [
      "大米（生） 90 g",
      "豆芽 250 g",
      "老豆腐 250 g",
      "胡萝卜 120 g",
      "葱 20 g",
      "低钠酱油 15 ml",
      "香油 8 ml",
    ],
    steps: [
      "煮米",
      "豆芽/豆腐略焖，入胡萝卜",
      "与米饭拌匀温和调味",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈76 g KH · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 火鸡糜；米饭 ↔ 糙米。",
    side: "清淡腌黄瓜；大麦茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean sprout rice bowl with tofu, steam rising"),
  },
  {
    id: "so-a",
    title: "寄锅火锅：鳕鱼豆腐清淡锅 + 小碗米饭（寄せ鍋）",
    desc: "日式清汤锅，清淡。",
    story: "餐桌小火慢煮。",
    target: "≈70 g KH（2人）· 蛋白≈30 g/人",
    ingredients: [
      "鳕鱼柳 280 g",
      "老豆腐 250 g",
      "大白菜 300 g",
      "香菇 120 g",
      "胡萝卜 120 g",
      "浅色味噌 20 g",
      "低钠酱油 10 ml",
      "水 1200 ml",
      "大米（生） 80 g",
    ],
    steps: [
      "加水+少量味噌/酱油做汤",
      "蔬菜煮8–10分钟，再下鱼/豆腐煮5–6分钟",
      "配小碗米饭",
    ],
    checks: "胃炎——温和煮制 · 糖友✓ ≈70 g KH · 孕期✓ 鱼全熟，碘少量",
    swaps: "鳕鱼 ↔ 明太鱼；大白菜 ↔ 小白菜。",
    side: "温和白泡菜或腌黄瓜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light Japanese hotpot with cod, tofu and napa cabbage, small rice bowl on side"),
  },
];

/* --------------------------- Shopping List Logic -------------------------- */
const UNIT_MAP = { l: 1000, ml: 1, g: 1, EL: 15, TL: 5, Stück: 1 };

const parseIngredient = (s) => {
  const m = s.match(/^(.*)\s(\d+(?:[\.,]\d+)?)\s?(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = m[1].trim();
  const amount = parseFloat(m[2].replace(",", "."));
  const unit = m[3];
  let baseUnit = unit;
  let baseAmount = amount;
  if (unit === "EL" || unit === "TL") { baseAmount = amount * UNIT_MAP[unit]; baseUnit = "ml"; }
  else if (unit === "l") { baseAmount = amount * 1000; baseUnit = "ml"; }
  return { name, amount: baseAmount, unit: baseUnit };
};

const categorize = (name) => {
  const n = name.toLowerCase();
  const inAny = (...arr) => arr.some((k) => n.includes(k));
  if (inAny("三文鱼", "鳕", "火鸡", "鸡", "牛", "猪", "豆腐", "蛋", "eier", "tofu")) return "蛋白/鱼/豆腐";
  if (inAny("米", "乌冬", "荞麦", "河粉", "意面", "珍珠麦", "reis", "udon", "soba")) return "米/面/主食";
  if (inAny("味噌", "大酱", "酱油", "芝麻", "味醂", "蜂蜜", "高汤", "裙带菜", "海苔", "昆布", "miso", "doenjang")) return "海藻/汤底/调味";
  return "蔬菜/菌菇";
};

const buildList = (data) => {
  const items = {};
  data.forEach((r) => {
    r.ingredients.forEach((ing) => {
      const p = parseIngredient(ing);
      if (!p) return;
      const key = p.name.replace(/\s+/g, " ").trim();
      const cat = categorize(key);
      items[cat] = items[cat] || {};
      const unit = p.unit === "ml" ? "ml" : p.unit === "g" ? "g" : "Stück";
      const id = `${key}__${unit}`;
      items[cat][id] = (items[cat][id] || 0) + p.amount;
    });
  });
  const out = {};
  Object.keys(items).forEach((cat) => {
    out[cat] = Object.keys(items[cat])
      .sort()
      .map((id) => {
        const [name, unit] = id.split("__");
        const val = Math.round(items[cat][id]);
        return { name, amount: val, unit };
      });
  });
  return out;
};

/* --------------------------------- UI ------------------------------------ */
const RecipeCard = ({ r }) => {
  const [img, setImg] = useState(null);
  const onUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImg(reader.result);
    reader.readAsDataURL(f);
  };
  const dayKey = r.id.split("-")[0];
  const mealKey = r.id.split("-")[1];
  const dayName = DAY_NAME_ZH[dayKey];
  const mealName = { f: "早", m: "午", a: "晚" }[mealKey];

  return (
    <div className="grid grid-cols-12 gap-4 mb-8" style={cardMainStyle}>
      <div className="col-span-12 text-sm text-sky-700 tracking-wide">{dayName} – {mealName}</div>
      <div className="col-span-12 md:col-span-4" style={cardPanelStyle}>
        <div className="print:hidden mb-3">
          <label className="text-sm block mb-1">{UI.upload}</label>
          <input type="file" accept="image/*" onChange={onUpload} />
        </div>
        <div className="w-full aspect-[4/3] bg-white/70 rounded-xl overflow-hidden flex items-center justify-center mb-3">
          {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <div className="text-xs opacity-70">(图片)</div>}
        </div>
        <div className="text-sm opacity-90 mb-2">{r.desc}</div>
        <div className="text-sm mb-1">🌾 {r.target} {r.remind ? " · 💊" : ""}</div>
        <div className="text-sm opacity-90 mb-2">{r.checks}</div>
        <div className="text-sm"><span className="font-medium">{UI.sideTitle}:</span> {r.side}</div>
        {r.remind && (
          <div className="mt-3 text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl inline-block">
            {UI.reminder}
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-8">
        <h2 className="text-xl font-semibold mb-1">{r.title}</h2>
        <p className="text-[12px] opacity-80 mb-3">{r.story}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-1">{UI.ingredientsTitle}</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {r.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-1">{UI.stepsTitle}</h3>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              {r.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
            <div className="mt-3 text-sm"><span className="font-medium">{UI.swapsTitle}:</span> {r.swaps}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeekOverview = ({ data }) => {
  const grouped = useMemo(() => groupByDay(data), [data]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {DAYS_ORDER.map((d) => (
        <div key={d} style={cardPanelStyle} className="bg-white/70">
          <div className="font-semibold mb-2">{DAY_NAME_ZH[d]}</div>
          <div className="grid grid-cols-3 gap-2">
            {grouped[d].map((r) => (
              <div key={r.id} className="rounded-xl border border-black/10 p-2 text-xs bg-white">
                <div className="font-medium line-clamp-2 mb-1">{r.title}</div>
                <div className="opacity-80">🌾 {r.target}</div>
                {r.remind && <div className="mt-1">💊</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Cover = () => {
  return (
    <div className="grid grid-cols-12 gap-4 mb-8">
      <div className="col-span-12 md:col-span-4" style={cardPanelStyle}>
        <div className="text-2xl font-semibold mb-2">{UI.main}</div>
        <div className="text-sm opacity-90 mb-4">{UI.coverInfo}</div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-2xl shadow" style={{ background: COLORS.indigo, color: 'white' }}>{UI.exportPdf}</button>
          <button className="px-4 py-2 rounded-2xl shadow" style={{ background: COLORS.sky, color: 'white' }}>{UI.exportHtml}</button>
          <button className="px-4 py-2 rounded-2xl shadow" style={{ background: COLORS.emerald, color: 'white' }}>{UI.print}</button>
        </div>
      </div>
      <div className="col-span-12 md:col-span-8" style={cardMainStyle}>
        <div className="text-lg font-semibold mb-3">{UI.weekOverview}</div>
        <WeekOverview data={DATA} />
      </div>
    </div>
  );
};

const ShoppingList = () => {
  const summary = useMemo(() => buildList(DATA), []);
  return (
    <div className="space-y-4">
      {Object.keys(summary).map((cat) => (
        <div key={cat} style={cardMainStyle} className="bg-white">
          <div className="font-semibold mb-2">{cat}</div>
          <ul className="text-sm grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {summary[cat].map((it, idx) => (
              <li key={idx}>{it.name} — <span className="font-mono">{it.amount}</span> {it.unit}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="text-xs opacity-70" style={{ paddingBottom: 24 }}>
        说明：以上为2人份本周总量。使用低钠酱油；海藻（裙带菜/昆布）少量。
      </div>
    </div>
  );
};

/* --------------------------------- Root ---------------------------------- */
export default function WeekPlanZH() {
  const [tab, setTab] = useState("cook");
  useEffect(() => {
    document.body.style.background = COLORS.pageBg;
    document.title = UI.main;
  }, []);

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 md:py-8 text-[15px]" style={{ color: COLORS.text }}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-semibold">{UI.main}</div>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("cook")}
          className={`px-4 py-2 rounded-2xl shadow ${tab === "cook" ? "bg-white" : "bg-white/60"}`}
        >
          {UI.tabCook}
        </button>
        <button
          onClick={() => setTab("list")}
          className={`px-4 py-2 rounded-2xl shadow ${tab === "list" ? "bg-white" : "bg-white/60"}`}
        >
          {UI.tabList}
        </button>
      </div>

      {tab === "cook" ? (
        <>
          <Cover />
          {DATA.map((r) => (
            <RecipeCard key={r.id} r={r} />
          ))}
        </>
      ) : (
        <ShoppingList />
      )}

      <div className="mt-10 text-xs opacity-70">
        提醒：早餐与晚餐配 💊 —— 用餐时服用二甲双胍。
      </div>
    </div>
  );
}
