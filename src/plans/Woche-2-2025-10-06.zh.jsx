// 文件: Woche-2-2025-10-06.zh.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

export const meta = {
  title: "第2周",
  startDate: "2025-10-06",
  id: "woche-2-2025-10-06-zh",
  lang: "zh",
  sidebar: "[ZH] 第2周 (2025-10-06)",
};
const FILE_BASE = "第2周 2025-10-06";

const UI_TITLES = {
  main: "吉卜力厨房 – 第2周",
  list: "吉卜力厨房 – 购物清单 – 第2周",
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

// 安全守卫
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

// ---------- 数据 (21 道菜) ----------
const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "日式粥 Okayu 配三文鱼与嫩豆腐",
    desc: "温和米粥配蒸熟三文鱼与嫩豆腐；灵感来自 Just One Cookbook。",
    story: "Okayu 在日本常作早餐，入秋后更受欢迎。",
    target: "≈70 g KH 总量 (2 人) · 蛋白质 ≈20 g/人",
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
      "淘米加水，开后小火煮 25–30 分钟至软糯。",
      "粥上方蒸三文鱼 8–10 分钟后撕碎。",
      "加入豆腐与姜，少量酱油调味，撒葱即可。",
    ],
    checks: "胃炎——温和暖胃 · 糖友 ✓ ≈70 g KH · 孕期 ✓ 全熟、低汞",
    swaps: "内酯豆腐 ↔ 老豆腐；三文鱼 ↔ 鳕鱼；替代：牛丼（瘦）或姜烧猪（瘦）。",
    side: "温热大麦茶/米茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy okayu, flaked cooked salmon, silken tofu cubes, scallions"),
  },
  {
    id: "mo-m",
    title: "韩式拌饭（温和）——辣椒另给",
    desc: "蔬菜+牛肉的均衡拌饭；辣椒分开；灵感自 My Korean Kitchen。",
    story: "色彩丰富、饱腹，适合午餐。",
    target: "≈74 g KH 总量 (2 人) · 蛋白质 ≈31 g/人",
    ingredients: [
      "糙米（生） 90 g",
      "瘦牛肉末 220 g",
      "菠菜 200 g",
      "胡萝卜 120 g",
      "香菇 120 g",
      "鸡蛋 2 Stück",
      "低钠酱油 20 ml",
      "香油 10 ml",
    ],
    steps: [
      "煮饭；蔬菜汆烫或少油快炒。",
      "牛肉末炒熟至全熟，温和调味。",
      "鸡蛋全熟煎；装碗拌匀。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈74 g KH · 孕期 ✓ 全熟",
    swaps: "牛肉末 ↔ 火鸡末；糙米 ↔ 寿司米；替代：牛丼（温和）。",
    side: "辣酱另碟。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap, brown rice, cooked egg, veggies"),
  },
  {
    id: "mo-a",
    title: "温和麻婆豆腐（含香菇）",
    desc: "川菜经典的温和版（味噌系酱汁）；灵感自 Omnivore’s Cookbook。",
    story: "不辣也下饭，晚餐友好。",
    target: "≈70 g KH 总量 (2 人) · 蛋白质 ≈32 g/人",
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
      "煮饭；香菇少油炒香。",
      "高汤+味噌+酱油煮开，入豆腐小火 4–5 分钟。",
      "淀粉水勾薄芡；浇饭食用。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈70 g KH · 孕期 ✓ 全熟",
    swaps: "糙米 ↔ 白米；味噌 ↔ 清淡豆瓣/黄豆酱；替代：温和版肉末豆腐。",
    side: "清蒸上海青。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms over rice, no chili"),
  },

  // 周二
  {
    id: "di-f",
    title: "饭团（鲑） & 温和味噌汤",
    desc: "鲑鱼内馅饭团 + 温和味噌汤；灵感自 Just One Cookbook。",
    story: "便当文化代表，清淡耐吃。",
    target: "≈78 g KH 总量 (2 人) · 蛋白质 ≈27 g/人",
    ingredients: [
      "寿司米（生） 100 g",
      "三文鱼 150 g",
      "紫菜 1 Blatt",
      "浅色味噌 20 g",
      "老豆腐 150 g",
      "裙带菜（干） 2 g",
      "水 900 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮米并捏饭团；熟三文鱼撕碎作馅，外包紫菜。",
      "味噌用热水化开，下豆腐、裙带菜略焖。",
      "酌量加酱油调整。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈78 g KH · 孕期 ✓ 鱼全熟，海藻少量",
    swaps: "寿司米 ↔ 糙米；鲑 ↔ 明太鱼。",
    side: "温和绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri and mild miso soup"),
  },
  {
    id: "di-m",
    title: "鸡肉炒河粉（温和）",
    desc: "广式风味的宽米粉，蔬菜多；灵感自 The Woks of Life。",
    story: "快手均衡的一餐。",
    target: "≈74 g KH 总量 (2 人) · 蛋白质 ≈39 g/人",
    ingredients: [
      "宽米粉（干） 80 g",
      "鸡胸肉 250 g",
      "彩椒 150 g",
      "小白菜 200 g",
      "洋葱 80 g",
      "胡萝卜 100 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
    ],
    steps: [
      "米粉浸泡/焯水。",
      "鸡肉丝全熟翻炒。",
      "下蔬菜，温和调味拌匀。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈74 g KH · 孕期 ✓ 全熟",
    swaps: "宽米粉 ↔ 乌冬；鸡 ↔ 豆腐。",
    side: "黄瓜片原味。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried wide rice noodles with chicken and vegetables, light sauce"),
  },
  {
    id: "di-a",
    title: "大酱汤 + 珍珠麦（温和）",
    desc: "韩式大酱锅，醇厚不辣；灵感自 Seon Kyoung Longest。",
    story: "秋冬常做，暖胃舒适。",
    target: "≈86 g KH 总量 (2 人) · 蛋白质 ≈24 g/人",
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
      "大酱溶水，小火煮蔬菜 12–15 分钟。",
      "入豆腐略焖。",
      "珍珠麦另煮至软，搭配食用。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈86 g KH · 孕期 ✓ 全熟",
    swaps: "珍珠麦 ↔ 米饭；豆腐 ↔ 火鸡胸。",
    side: "温和腌黄瓜（无辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables, side barley"),
  },

  // 周三
  {
    id: "mi-f",
    title: "南瓜米粥配豆腐与毛豆",
    desc: "丝滑南瓜粥，蛋白更足；灵感自 Mom’s Korean Recipes。",
    story: "入秋季节更合适，软糯温暖。",
    target: "≈75 g KH 总量 (2 人) · 蛋白质 ≈22 g/人",
    ingredients: [
      "南瓜 400 g",
      "大米（生） 70 g",
      "老豆腐 200 g",
      "毛豆仁 100 g",
      "姜 8 g",
      "水 900 ml",
      "盐 少许",
    ],
    steps: [
      "南瓜+大米小火煮 25 分钟。",
      "打细；入豆腐、毛豆再煮 3–4 分钟。",
      "温和调味。",
    ],
    checks: "胃炎——软暖 · 糖友 ✓ ≈75 g KH · 孕期 ✓ 全熟",
    swaps: "毛豆 ↔ 白腰豆；豆腐 ↔ 鸡胸丁。",
    side: "温热米茶/大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin porridge with tofu and edamame"),
  },
  {
    id: "mi-m",
    title: "清汤乌冬（鸡肉 & 西兰花）",
    desc: "日式清汤面，轻盈不腻；灵感自 Just One Cookbook。",
    story: "工作日午餐的好选择。",
    target: "≈79 g KH 总量 (2 人) · 蛋白质 ≈34 g/人",
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
      "味噌+酱油调成清汤加热。",
      "鸡肉小火煮 6–8 分钟至全熟；蔬菜再煮 3–4 分钟。",
      "乌冬另煮、冲洗后入汤稍煮。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈79 g KH · 孕期 ✓ 全熟",
    swaps: "乌冬 ↔ 荞麦面；鸡 ↔ 豆腐。",
    side: "小碟黄瓜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken and broccoli"),
  },
  {
    id: "mi-a",
    title: "清蒸鳕鱼（姜葱）配白米",
    desc: "粤式清蒸，细嫩易消化；灵感自 Made With Lau。",
    story: "清爽无负担，晚间刚刚好。",
    target: "≈70 g KH 总量 (2 人) · 蛋白质 ≈32 g/人",
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
      "酱油+高汤加热，浇在鱼上，淋香油。",
      "米饭煮熟同食。",
    ],
    checks: "胃炎——清蒸 · 糖友 ✓ ≈70 g KH · 孕期 ✓ 全熟、低汞",
    swaps: "鳕鱼 ↔ 明太鱼；米饭 ↔ 糙米。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, bowl of rice"),
  },

  // 周四
  {
    id: "do-f",
    title: "玉子烧 & 味噌汤 + 小碗米饭",
    desc: "日式早餐，鸡蛋需完全凝固。",
    story: "常见于日本家庭与便当。",
    target: "≈62 g KH 总量 (2 人) · 蛋白质 ≈24 g/人",
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
      "煮饭；玉子烧卷煎至完全凝固。",
      "味噌汤煮开，下豆腐/裙带菜略焖。",
      "撒葱花。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈62 g KH · 孕期 ✓ 蛋需全熟",
    swaps: "米饭 ↔ 糙米；豆腐 ↔ 鸡胸丁。",
    side: "温热绿茶（低咖）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, miso soup, small rice bowl"),
  },
  {
    id: "do-m",
    title: "番茄炒蛋 + 豆腐 & 米饭",
    desc: "家常快手，酸甜温和；灵感自 The Woks of Life。",
    story: "中国人气家常菜，广受喜爱。",
    target: "≈70 g KH 总量 (2 人) · 蛋白质 ≈28 g/人",
    ingredients: [
      "大米（生） 90 g",
      "鸡蛋 4 Stück",
      "老豆腐 200 g",
      "熟番茄 400 g",
      "洋葱 60 g",
      "低钠酱油 10 ml",
      "菜籽油 10 ml",
    ],
    steps: [
      "煮饭；鸡蛋炒至全熟凝固。",
      "番茄+洋葱小火炖软；下豆腐略焖。",
      "温和调味，配米饭。",
    ],
    checks: "胃炎——酸度温和 · 糖友 ✓ ≈70 g KH · 孕期 ✓ 蛋全熟",
    swaps: "豆腐 ↔ 火鸡胸丁；米 ↔ 糙米。",
    side: "清蒸小白菜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu and rice"),
  },
  {
    id: "do-a",
    title: "温和韩式烤肉（火鸡）配糙米",
    desc: "平底锅快炒版，不辣；灵感自 Maangchi。",
    story: "甜咸香温和，适合家庭晚餐。",
    target: "≈80 g KH 总量 (2 人) · 蛋白质 ≈28 g/人",
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
      "快速翻炒至全熟。",
      "加蔬菜略炒，配糙米。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈80 g KH · 孕期 ✓ 全熟",
    swaps: "火鸡 ↔ 鸡；糙米 ↔ 白米。",
    side: "黄瓜片原味。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms, brown rice, no chili"),
  },

  // 周五
  {
    id: "fr-f",
    title: "鸡肉粥（清淡）",
    desc: "米粥配嫩鸡肉，极其温和。",
    story: "南方/东亚常见早餐或晚餐。",
    target: "≈70 g KH 总量 (2 人) · 蛋白质 ≈34 g/人",
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
      "米加水小火煮 30 分钟。",
      "鸡肉丁入粥煮 8–10 分钟至全熟。",
      "温和调味、撒葱。",
    ],
    checks: "胃炎——非常温和 · 糖友 ✓ ≈70 g KH · 孕期 ✓ 全熟",
    swaps: "鸡 ↔ 豆腐；胡萝卜 ↔ 南瓜。",
    side: "温热花草茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee, gentle steam"),
  },
  {
    id: "fr-m",
    title: "清爽意式蔬菜汤（豆腐版）",
    desc: "Minestrone 的轻量版，久煮更温和。",
    story: "暖胃不厚重，适合中午或晚上。",
    target: "≈69 g KH 总量 (2 人) · 蛋白质 ≈39 g/人",
    ingredients: [
      "全麦意面（干） 60 g",
      "白腰豆（沥干） 200 g",
      "胡萝卜 150 g",
      "西芹 100 g",
      "番茄碎（passata） 250 ml",
      "西葫芦 150 g",
      "蔬菜高汤 800 ml",
      "橄榄油 10 ml",
      "帕玛森（巴氏杀菌，可选） 20 g",
      "老豆腐 300 g",
    ],
    steps: [
      "蔬菜少油炒香，入高汤+番茄碎，小火 20–25 分钟。",
      "入豆腐/白腰豆，再焖 5 分钟。",
      "意面另煮，最后拌入。",
    ],
    checks: "胃炎——久煮温和 · 糖友 ✓ ≈69 g KH · 孕期 ✓ 奶酪可选且需巴氏杀菌",
    swaps: "豆腐 ↔ 鸡胸丁；意面 ↔ 大麦。",
    side: "温热草本茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with tofu and vegetables"),
  },
  {
    id: "fr-a",
    title: "烤照烧三文鱼 & 西兰花 + 米饭",
    desc: "低钠照烧，烤箱更省事；灵感自 Just One Cookbook。",
    story: "省时暖和，周五晚适合。",
    target: "≈75 g KH 总量 (2 人) · 蛋白质 ≈32 g/人",
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
      "混合酱汁（酱油+少量味醂/蜂蜜+姜）。",
      "刷在三文鱼上，200°C 烤 12–14 分钟。",
      "配米饭和蒸西兰花。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈75 g KH（微甜） · 孕期 ✓ 全熟",
    swaps: "米 ↔ 糙米；西兰花 ↔ 小白菜。",
    side: "温热绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked teriyaki salmon with broccoli and rice"),
  },

  // 周六
  {
    id: "sa-f",
    title: "汤豆腐 + 小碗米饭",
    desc: "日式清汤煮豆腐，极易消化。",
    story: "京都风格，轻而暖。",
    target: "≈62 g KH 总量 (2 人) · 蛋白质 ≈32 g/人",
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
      "高汤加热，豆腐小火焖 5–6 分钟。",
      "下大葱/菠菜略煮。",
      "少量酱油调味；米饭另盛。",
    ],
    checks: "胃炎——非常温和 · 糖友 ✓ ≈62 g KH · 孕期 ✓ 全熟",
    swaps: "米 ↔ 糙米；菠菜 ↔ 小白菜。",
    side: "温水或大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Yudofu with leeks and spinach, small rice bowl"),
  },
  {
    id: "sa-m",
    title: "杂菜粉丝（牛肉蔬菜，温和）",
    desc: "韩式红薯粉丝拌炒，蔬菜多；灵感自 Maangchi。",
    story: "冷热皆宜，适合分享。",
    target: "≈75 g KH 总量 (2 人) · 蛋白质 ≈24 g/人",
    ingredients: [
      "红薯粉丝（干） 80 g",
      "瘦牛肉条 220 g",
      "彩椒 150 g",
      "胡萝卜 150 g",
      "蘑菇 150 g",
      "菠菜 150 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
      "蒜 1 瓣",
    ],
    steps: [
      "粉丝煮熟过冷水。",
      "牛肉/蔬菜少油炒熟，温和调味。",
      "拌入粉丝，略加热即可。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈75 g KH · 孕期 ✓ 全熟",
    swaps: "牛肉 ↔ 豆腐；粉丝 ↔ 米粉。",
    side: "芝麻拌黄瓜（温和）。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with beef and vegetables, not spicy"),
  },
  {
    id: "sa-a",
    title: "香菇炖鸡 & 小份米饭",
    desc: "中式小火炖，柔嫩入味；灵感自 Red House Spice。",
    story: "秋冬常做，家人都爱吃。",
    target: "≈62 g KH 总量 (2 人) · 蛋白质 ≈33 g/人",
    ingredients: [
      "鸡腿去皮 300 g",
      "香菇 200 g",
      "胡萝卜 120 g",
      "大米（生） 80 g",
      "低钠酱油 25 ml",
      "姜 10 g",
      "蔬菜高汤 300 ml",
    ],
    steps: [
      "鸡块煎出香味，加高汤。",
      "入香菇与胡萝卜，小火炖 20–25 分钟。",
      "配米饭。",
    ],
    checks: "胃炎——炖煮温和 · 糖友 ✓ ≈62 g KH · 孕期 ✓ 全熟",
    swaps: "鸡 ↔ 豆腐；米 ↔ 糙米。",
    side: "清蒸小白菜/西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised chicken with shiitake and carrots, small rice serving"),
  },

  // 周日
  {
    id: "so-f",
    title: "苹果豆腐甜米粥",
    desc: "微甜、温和、暖胃。",
    story: "苹果季节的暖心早餐。",
    target: "≈80 g KH 总量 (2 人) · 蛋白质 ≈22 g/人",
    ingredients: [
      "大米（生） 80 g",
      "苹果 150 g",
      "水 1000 ml",
      "肉桂 少许",
      "老豆腐 300 g",
    ],
    steps: [
      "米加水小火煮 30 分钟。",
      "加入苹果丁再煮 5 分钟。",
      "入豆腐丁，温和调味。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈80 g KH · 孕期 ✓ 全熟",
    swaps: "苹果 ↔ 梨；豆腐 ↔ 斯奇尔酸奶（巴氏杀菌）。",
    side: "温热草本茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy rice porridge with apple cubes and tofu"),
  },
  {
    id: "so-m",
    title: "清汤火鸡面（小白菜）",
    desc: "中式灵感清汤与嫩火鸡；灵感自 Made With Lau。",
    story: "感冒季很合适，快捷轻盈。",
    target: "≈70 g KH 总量 (2 人) · 蛋白质 ≈24 g/人",
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
      "加热清汤；火鸡肉小火煮 8–10 分钟至全熟。",
      "蔬菜再煮 3–4 分钟。",
      "面条另煮冲洗后入汤，温和调味。",
    ],
    checks: "胃炎——温和 · 糖友 ✓ ≈70 g KH · 孕期 ✓ 全熟",
    swaps: "小麦面 ↔ 米粉；火鸡 ↔ 豆腐。",
    side: "温水。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear noodle soup with turkey slices and pak choi"),
  },
  {
    id: "so-a",
    title: "明太鱼炖白萝卜（温和）配米饭",
    desc: "韩式“조림” 不辣版本，清淡可口。",
    story: "温和收汁，适合周日晚。",
    target: "≈70 g KH 总量 (2 人) · 蛋白质 ≈30 g/人",
    ingredients: [
      "明太鱼柳 320 g",
      "白萝卜 250 g",
      "洋葱 60 g",
      "大酱 20 g",
      "低钠酱油 20 ml",
      "水 500 ml",
      "大米（生） 90 g",
      "香油 8 ml",
    ],
    steps: [
      "白萝卜 + 大酱加水小火煮 10 分钟。",
      "下明太鱼温和炖 8–10 分钟。",
      "淋香油；配米饭食用。",
    ],
    checks: "胃炎——温和炖煮 · 糖友 ✓ ≈70 g KH · 孕期 ✓ 全熟",
    swaps: "明太鱼 ↔ 鳕鱼；米 ↔ 糙米。",
    side: "清蒸菠菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild braised pollock with daikon, small rice bowl"),
  },
];

// ---------- 周视图辅助 ----------
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = { mo: "周一", di: "周二", mi: "周三", do: "周四", fr: "周五", sa: "周六", so: "周日" };
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  (Array.isArray(arr) ? arr : []).forEach((r) => {
    const d = r?.id?.split?.("-")?.[0];
    if (map[d]) map[d].push(r);
  });
  Object.values(map).forEach((list) =>
    list.sort(
      (a, b) =>
        ["f", "m", "a"].indexOf(a?.id?.split?.("-")?.[1]) -
        ["f", "m", "a"].indexOf(b?.id?.split?.("-")?.[1])
    )
  );
  return map;
};

// ---------- 购物清单汇总 ----------
function normalizeName(n) {
  return String(n || "")
    .replace(/\(.*?\)/g, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/ +/g, " ");
}
function parseQty(item) {
  const s = String(item || "");
  const m = s.match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
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
  protein: ["鸡", "鸡胸", "火鸡", "牛", "三文鱼", "鳕鱼", "明太鱼", "豆腐", "鸡蛋", "毛豆", "帕玛森", "猪里脊", "猪", "牛肉末"],
  veg: ["胡萝卜", "西葫芦", "小白菜", "菠菜", "香菇", "蘑菇", "西兰花", "大葱", "洋葱", "彩椒", "白萝卜", "葱", "土豆", "南瓜", "黄瓜", "苹果"],
  staple: ["米", "寿司米", "糙米", "珍珠麦", "乌冬", "小麦面", "米粉", "红薯粉丝", "全麦意面"],
  season: ["裙带菜", "海苔", "高汤", "蔬菜高汤", "酱油", "味噌", "大酱", "香油", "菜籽油", "橄榄油", "味醂", "蜂蜜", "肉桂", "盐", "芝麻", "蒜", "姜", "番茄", "水"],
};
function accumulateList(data) {
  const buckets = { protein: {}, veg: {}, staple: {}, season: {} };
  (Array.isArray(data) ? data : []).forEach((r) =>
    (Array.isArray(r?.ingredients) ? r.ingredients : []).forEach((ing) => {
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

// ---------- 图片持久化 ----------
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

// ---------- i18n ----------
const dayNameI18n = (id, t) => t.day[id.split("-")[0]];
const mealTitleI18n = (id, t) => t.mealTitle[id.split("-")[1]];
const mealLabelI18n = (id, t) => t.meal[id.split("-")[1]];

// ---------- 菜谱卡片 ----------
function RecipeCard({ r, t, lang }) {
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  const title = safeText(r.title, lang);
  const desc = safeText(r.desc, lang);
  const story = safeText(r.story, lang);
  const target = safeText(r.target, lang);
  const checks = safeText(r.checks, lang);
  const side = safeText(r.side, lang);
  const swaps = safeText(r.swaps, lang);
  const ingredients = asList(r.ingredients, lang);
  const steps = asList(r.steps, lang);

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
                {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
              </b>
            </div>
            <div style={{ marginTop: 6 }}>{desc}</div>
            <div style={{ marginTop: 6 }}>
              <b>目标：</b> {target}
            </div>
            <div>
              <b>检查点：</b> {checks}
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
                💊 用餐时服用二甲双胍。
              </div>
            ) : null}
          </div>
        </aside>
        <main style={{ gridColumn: "span 8", ...cardMainStyle }}>
          <div style={{ fontSize: 12, color: COLORS.sky, fontWeight: 700, marginTop: -4, marginBottom: 6 }}>
            {dayNameI18n(r.id, t)} – {mealTitleI18n(r.id, t)}
          </div>
          <h2 style={{ marginTop: 0 }}>{title}</h2>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{story}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients}（2 人份）</h3>
              <ul className="avoid-break">
                {ingredients.length ? (
                  ingredients.map((x, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      {typeof x === "string" ? x : String(x ?? "")}
                    </li>
                  ))
                ) : (
                  <li style={{ opacity: 0.7 }}>—</li>
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
                  <li style={{ opacity: 0.7 }}>—</li>
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

// ---------- 整周菜谱 ----------
function Cookbook({ t, lang }) {
  const weekly = useMemo(() => {
    try {
      const src = Array.isArray(DATA) ? DATA : [];
      return groupByDay(src);
    } catch {
      return { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    }
  }, []);

  return (
    <div id="cookbook-root">
      {/* 封面 + 周览 */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              自 {meta.startDate} 起的一周 —— <b>模式：Non-Strict（均衡）</b>；以中/日/韩为主，温和调味、低钠酱油、孕期友好；糖尿病：每餐（2 人）60–90 g KH。
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
                              🌾 {target.replace("总碳水", "碳水")}
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

// ---------- 购物清单 ----------
function GroceryList() {
  const rootRef = useRef(null);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>根据本周菜谱自动汇总（起始：{meta.startDate}）。</p>
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
            注意：低钠酱油；海藻（裙带菜/紫菜）适量；所有食材需充分加热。
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- 主组件 ----------
export default function Woche2_2025_10_06_ZH() {
  const [tab, setTab] = useState("kochbuch");
  const [lang] = useState("zh"); // 固定中文
  const t = UI[lang] || UI.zh;

  useEffect(() => {
    Tests();
  }, []);

  const [pdfLink, setPdfLink] = useState({ kochbuch: "", einkauf: "" });
  const [htmlLink, setHtmlLink] = useState({ kochbuch: "", einkauf: "" });

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

// ---------- 测试 ----------
function Tests() {
  try {
    if (!/^第2周 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
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
    console.log("[GhibliKitchen] All tests passed (ZH Woche-2).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed (ZH Woche-2):", e);
  }
}