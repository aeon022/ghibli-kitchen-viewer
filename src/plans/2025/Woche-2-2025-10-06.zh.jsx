// src/plans/Woche-2-2025-10-06.zh.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

export const meta = {
  title: "第2周",
  startDate: "2025-10-06",
  id: "woche-2-2025-10-06-zh",
  lang: "zh",
  sidebar: "第2周 (2025-10-06)",
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

// Panels
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

// Prompt helper
const PROMPT_HEADER =
  "Ultra-clean cookbook photo, soft daylight, top-down, pastel background, visible steam, pregnancy-safe (no raw fish or raw egg), mild Asian home cooking (JP/CN/KR), family-friendly";
const buildPrompt = (a, b) => a + "\n" + b;

// ---------- 安全取值（永远返回可迭代/字符串） ----------
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

// ---------- 数据（21 个食谱，来自 Woche-2-DE 的等价 ZH） ----------
const DATA = [
  /* ---------- 周一 ---------- */
  {
    id: "mo-f",
    title: "米粥（中式）——温和，配姜与葱",
    desc: "经典中式米粥：非常温和、好消化；灵感来自 The Woks of Life。",
    story: "粥在中国与东南亚随处可见——作为一周温柔的开始再合适不过。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈20 g/人",
    ingredients: [
      "大米（生） 90 g",
      "水 1000 ml",
      "姜 10 g",
      "葱 20 g",
      "低钠酱油 10 ml",
      "盐 2 g",
      "香油 5 ml",
    ],
    steps: [
      "淘米入水煮沸后，小火慢煮 30–35 分钟。",
      "姜切碎，粥中轻度调味（保持清淡）。",
      "撒葱花与少许香油即可食用。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "大米 ↔ 糙米（需更久）；替代：鸡肉粥（温和）。",
    side: "温水或淡茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild Chinese rice congee, ginger and scallions, top-down, gentle steam"),
  },
  {
    id: "mo-m",
    title: "鸡肉蔬菜饭碗（日式风）——不辣",
    desc: "快手鸡肉＋蒸/炒蔬菜的均衡饭碗，清淡调味；灵感来自 Just One Cookbook。",
    story: "简洁的工作日午餐：蛋白足、均衡、不刺激。",
    target: "≈72 g KH gesamt (2 P.) · 蛋白质 ≈32 g/人",
    ingredients: [
      "糙米（生） 90 g",
      "鸡胸肉 240 g",
      "西兰花 220 g",
      "胡萝卜 120 g",
      "洋葱 80 g",
      "低钠酱油 20 ml",
      "菜籽油 10 ml",
    ],
    steps: [
      "煮饭；蔬菜蒸或轻炒。",
      "鸡胸少油煎至全熟。",
      "装碗后用低钠酱油轻度调味。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈72 g KH · 孕期✓",
    swaps: "鸡肉 ↔ 豆腐；糙米 ↔ 寿司米。",
    side: "黄瓜片原味。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken and veggie rice bowl, mild seasoning, no chili"),
  },
  {
    id: "mo-a",
    title: "味噌豆腐小炖（配米饭）——清淡",
    desc: "清爽味噌豆腐配蘑菇，浇在米饭上；灵感来自 Just One Cookbook。",
    story: "晚间的小锅菜，温和入味、不厚重。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "老豆腐 350 g",
      "白蘑菇 200 g",
      "浅色味噌 25 g",
      "蔬菜高汤 500 ml",
      "低钠酱油 15 ml",
      "大米（生） 90 g",
      "姜 8 g",
    ],
    steps: [
      "煮饭；蘑菇先煸香。",
      "高汤＋味噌＋酱油加热；入豆腐，小火焖 4–5 分钟。",
      "浇在米饭上，保持清淡口味。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓",
    swaps: "豆腐 ↔ 鸡胸；米饭 ↔ 糙米。",
    side: "清蒸上海青/小白菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light miso tofu stew over rice, glossy light sauce, no chili"),
  },

  /* ---------- 周二 ---------- */
  {
    id: "di-f",
    title: "三文鱼饭团 & 清淡味噌汤（日式）",
    desc: "内馅为熟三文鱼的饭团，配极温和味噌汤；灵感来自 Just One Cookbook。",
    story: "便当文化代表之一——做早餐或外带都合适、好消化。",
    target: "≈78 g KH gesamt (2 P.) · 蛋白质 ≈26 g/人",
    ingredients: [
      "寿司米（生） 100 g",
      "三文鱼 150 g",
      "海苔 1 张",
      "浅色味噌 20 g",
      "老豆腐 150 g",
      "裙带菜（干） 2 g",
      "水 900 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮米；三文鱼煮/蒸至熟后撕碎包入饭团，用海苔包裹。",
      "味噌用热水化开（不沸），放豆腐与裙带菜稍焖。",
      "极少量酱油调整咸度。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈78 g KH · 孕期✓（鱼熟、海藻少量）",
    swaps: "寿司米 ↔ 糙米；三文鱼 ↔ 鳕鱼/明太鱼。",
    side: "清淡绿茶（可选）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Onigiri with cooked salmon and mild miso soup, soft daylight"),
  },
  {
    id: "di-m",
    title: "鸡肉蔬菜炒乌冬——温和",
    desc: "鸡肉＋蔬菜的温和炒乌冬；灵感来自 The Woks of Life。",
    story: "饱腹但不辣——上班族友好午餐。",
    target: "≈74 g KH gesamt (2 P.) · 蛋白质 ≈38 g/人",
    ingredients: [
      "乌冬（干） 110 g",
      "鸡胸肉 240 g",
      "彩椒 150 g",
      "西葫芦 160 g",
      "洋葱 80 g",
      "低钠酱油 25 ml",
      "香油 8 ml",
    ],
    steps: [
      "乌冬煮好过冷水。",
      "鸡肉条煎至全熟；蔬菜略炒。",
      "加少许酱油/香油调味，趁热食用。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈74 g KH · 孕期✓",
    swaps: "乌冬 ↔ 小麦面；鸡肉 ↔ 豆腐。",
    side: "黄瓜片原味。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Mild stir-fried udon with chicken and vegetables, no chili"),
  },
  {
    id: "di-a",
    title: "大酱汤（韩式）——不辣的豆酱锅",
    desc: "大酱＋豆腐＋蔬菜的小火炖汤；灵感来自 Maangchi。",
    story: "风味足但不辣——适合微凉的夜晚。",
    target: "≈86 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
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
      "大酱溶于水；蔬菜小火煮 12–15 分钟。",
      "加入豆腐再焖片刻。",
      "珍珠麦另煮，配汤同食。",
    ],
    checks: "胃炎——不辣 · 糖友✓ ≈86 g KH · 孕期✓",
    swaps: "珍珠麦 ↔ 米饭；豆腐 ↔ 火鸡胸。",
    side: "清淡拌黄瓜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean doenjang stew with tofu and vegetables, barley on side"),
  },

  /* ---------- 周三 ---------- */
  {
    id: "mi-f",
    title: "南瓜米粥（韩式）配豆腐与毛豆",
    desc: "丝滑南瓜＋少量米的高蛋白粥；灵感来自 Mom’s Korean Recipes。",
    story: "秋季温暖早餐，口感细腻、好消化。",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈22 g/人",
    ingredients: [
      "南瓜（北海道/板栗） 400 g",
      "大米（生） 70 g",
      "老豆腐 200 g",
      "毛豆（去壳） 100 g",
      "姜 8 g",
      "水 900 ml",
      "盐 2 g",
    ],
    steps: [
      "南瓜＋大米小火煮 25 分钟至软。",
      "打细；加入豆腐与毛豆再煮 3–4 分钟。",
      "清淡调味即可。",
    ],
    checks: "胃炎——软糯温暖 · 糖友✓ ≈75 g KH · 孕期✓",
    swaps: "毛豆 ↔ 白腰豆；豆腐 ↔ 鸡胸丁。",
    side: "温热米茶/大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge with tofu and edamame, steam rising"),
  },
  {
    id: "mi-m",
    title: "鸡肉西兰花乌冬清汤（日式）",
    desc: "清淡乌冬汤面，鸡肉与蔬菜小火煮熟；灵感来自 Just One Cookbook。",
    story: "暖胃、迅速、对肠胃友好。",
    target: "≈79 g KH gesamt (2 P.) · 蛋白质 ≈34 g/人",
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
      "以味噌＋酱油调底汤。",
      "鸡肉小火煮 6–8 分钟至全熟；蔬菜再煮 3–4 分钟。",
      "乌冬另煮冲凉，回锅略加热即可。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈79 g KH · 孕期✓",
    swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。",
    side: "小碟黄瓜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear udon soup with chicken and broccoli, delicate look"),
  },
  {
    id: "mi-a",
    title: "清蒸鳕鱼配姜丝 & 米饭（粤式）",
    desc: "温火清蒸鳕鱼，口感细嫩；灵感来自 Made With Lau。",
    story: "粤菜经典——清爽、清香、易消化。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈32 g/人",
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
      "酱油＋高汤加热后浇淋，淋少许香油。",
      "配米饭食用。",
    ],
    checks: "胃炎——清蒸 · 糖友✓ ≈70 g KH · 孕期✓（低汞、鱼全熟）",
    swaps: "鳕鱼 ↔ 明太鱼/狭鳕；米饭 ↔ 糙米。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, small bowl of rice"),
  },

  /* ---------- 周四 ---------- */
  {
    id: "do-f",
    title: "玉子烧 & 清淡味噌汤 + 小碗米饭（日式）",
    desc: "日式早餐组合：玉子烧（鸡蛋完全凝固）＋温和味噌汤；灵感来自 Just One Cookbook。",
    story: "便当里的人气角色；此处全熟更安心。",
    target: "≈62 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
    ingredients: [
      "鸡蛋 4 个",
      "老豆腐 150 g",
      "大米（生） 80 g",
      "浅色味噌 20 g",
      "裙带菜（干） 1 g",
      "葱 20 g",
      "水 800 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮饭。玉子烧卷煎至完全凝固。",
      "味噌汤调好；豆腐/裙带菜略焖。",
      "撒葱花上桌。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈62 g KH · 孕期✓（蛋全熟）",
    swaps: "米饭 ↔ 糙米；豆腐 ↔ 鸡胸丁。",
    side: "清淡热茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set: well-done tamagoyaki, mild miso, small rice bowl"),
  },
  {
    id: "do-m",
    title: "番茄炒蛋配豆腐 & 米饭（中式）——温和",
    desc: "番茄炒蛋（鸡蛋全熟）＋豆腐＋米饭；灵感来自 The Woks of Life。",
    story: "中国家常名菜，这里采用更温和的版本。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈28 g/人",
    ingredients: [
      "大米（生） 90 g",
      "鸡蛋 4 个",
      "老豆腐 200 g",
      "熟透番茄 400 g",
      "洋葱 60 g",
      "低钠酱油 10 ml",
      "菜籽油 10 ml",
    ],
    steps: [
      "煮饭；鸡蛋炒至完全凝固。",
      "番茄＋洋葱焖至软；下豆腐稍焖。",
      "清淡调味，配米饭食用。",
    ],
    checks: "胃炎——酸度温和 · 糖友✓ ≈70 g KH · 孕期✓（蛋全熟）",
    swaps: "豆腐 ↔ 火鸡胸丁；米饭 ↔ 糙米。",
    side: "清蒸小白菜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese tomato-egg stir-fry with tofu, over rice, very mild"),
  },
  {
    id: "do-a",
    title: "温和韩式烤肉平底锅版（火鸡）配糙米",
    desc: "不辣的韩式烤肉风味快炒；灵感来自 Maangchi。",
    story: "快速又合家欢，不用辣椒也很香。",
    target: "≈80 g KH gesamt (2 P.) · 蛋白质 ≈28 g/人",
    ingredients: [
      "火鸡胸 250 g",
      "糙米（生） 90 g",
      "洋葱 80 g",
      "胡萝卜 120 g",
      "白蘑菇 150 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
      "蒜 1 瓣",
      "梨（擦泥） 60 g",
    ],
    steps: [
      "火鸡＋酱油＋梨泥＋蒜腌 15 分钟。",
      "少油快炒至全熟。",
      "蔬菜入锅略炒，配糙米食用。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g KH · 孕期✓",
    swaps: "火鸡 ↔ 鸡胸；糙米 ↔ 白米。",
    side: "黄瓜片原味。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi-style turkey stir-fry, brown rice, no chili"),
  },

  /* ---------- 周五 ---------- */
  {
    id: "fr-f",
    title: "鸡肉粥（中式）——非常温和",
    desc: "鸡肉丁入粥，小火煮至软烂；灵感来自 The Woks of Life。",
    story: "在阴天特别治愈，暖胃又好消化。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈34 g/人",
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
      "鸡胸切小丁入粥煮 8–10 分钟至全熟。",
      "轻度调味，撒葱花。",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈70 g KH · 孕期✓",
    swaps: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜。",
    side: "温热草本茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a bowl, shredded chicken, scallions, gentle steam"),
  },
  {
    id: "fr-m",
    title: "清爽意式蔬菜汤配豆腐（Minestrone）——久煮温和",
    desc: "意式蔬汤，久煮柔和、低刺激。",
    story: "地中海风但对胃很友好——适合放松的夜晚。",
    target: "≈69 g KH gesamt (2 P.) · 蛋白质 ≈38 g/人",
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
      "少油炒香蔬菜，加高汤与番茄碎，小火煮 20–25 分钟。",
      "加入豆腐与白腰豆，再焖 5 分钟。",
      "意面另煮，最后拌入。",
    ],
    checks: "胃炎——久煮温和 · 糖友✓ ≈69 g KH · 孕期✓（奶酪可选且需巴氏杀菌）",
    swaps: "豆腐 ↔ 鸡胸；意面 ↔ 大麦。",
    side: "温热草本茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with tofu, few wholegrain pasta pieces"),
  },
  {
    id: "fr-a",
    title: "烤箱照烧三文鱼配西兰花 & 米饭（日式）",
    desc: "低甜度照烧，烤箱更省事；灵感来自 Just One Cookbook。",
    story: "省心又稳定——加班后的好选择。",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈32 g/人",
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
      "调酱（酱油＋少许味醂/蜂蜜＋姜）。",
      "200°C 烤 12–14 分钟至熟。",
      "配米饭与蒸西兰花食用。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈75 g KH（甜度低） · 孕期✓（鱼全熟）",
    swaps: "米饭 ↔ 糙米；西兰花 ↔ 小白菜。",
    side: "清淡绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked salmon teriyaki, steamed broccoli and rice, top-down"),
  },

  /* ---------- 周六 ---------- */
  {
    id: "sa-f",
    title: "汤豆腐（京都风）配小碗米饭",
    desc: "清汤小火煮豆腐，入口极易消化。",
    story: "京都经典：轻、暖、安神。",
    target: "≈62 g KH gesamt (2 P.) · 蛋白质 ≈32 g/人",
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
      "少量酱油调味；米饭分开盛。",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈62 g KH · 孕期✓",
    swaps: "米饭 ↔ 糙米；菠菜 ↔ 小白菜。",
    side: "温水或大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Yudofu in a clay pot with leeks and spinach, small rice bowl"),
  },
  {
    id: "sa-m",
    title: "杂菜（韩式粉丝牛肉蔬菜）——温和",
    desc: "红薯粉丝拌炒＋多彩蔬菜，不放辣椒；灵感来自 Maangchi。",
    story: "温热或室温皆宜——周末人气菜。",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
    ingredients: [
      "红薯粉丝（干） 80 g",
      "瘦牛肉条 220 g",
      "彩椒 150 g",
      "胡萝卜 150 g",
      "白蘑菇 150 g",
      "菠菜 150 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
      "蒜 1 瓣",
    ],
    steps: [
      "粉丝煮好过冷水。",
      "牛肉与蔬菜少油炒熟。",
      "与粉丝拌匀，稍加热即可。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈75 g KH · 孕期✓（牛肉全熟）",
    swaps: "牛肉 ↔ 豆腐；红薯粉丝 ↔ 米粉。",
    side: "芝麻拌黄瓜（温和）。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with colorful vegetables and beef strips, no chili"),
  },
  {
    id: "sa-a",
    title: "香菇炖鸡配小份米饭（中式）",
    desc: "小火炖至软嫩、香而不腻；灵感来自 Red House Spice。",
    story: "周末治愈系家常炖菜。",
    target: "≈62 g KH gesamt (2 P.) · 蛋白质 ≈33 g/人",
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
      "鸡块煎出香味，冲入高汤。",
      "入香菇与胡萝卜，小火炖 20–25 分钟。",
      "配米饭食用。",
    ],
    checks: "胃炎——温和炖煮 · 糖友✓ ≈62 g KH · 孕期✓",
    swaps: "鸡肉 ↔ 豆腐；米饭 ↔ 糙米。",
    side: "清蒸小白菜/西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised chicken with shiitake and carrots, small rice"),
  },

  /* ---------- 周日 ---------- */
  {
    id: "so-f",
    title: "苹果豆腐奶香米粥（日式灵感）——微甜",
    desc: "温和的奶香米粥，加入苹果丁与豆腐。",
    story: "秋季早餐：柔和、绵密、自然甜。",
    target: "≈80 g KH gesamt (2 P.) · 蛋白质 ≈22 g/人",
    ingredients: [
      "大米（生） 80 g",
      "苹果 150 g",
      "水 900 ml",
      "肉桂 0.5 g",
      "老豆腐 300 g",
    ],
    steps: [
      "大米加水小火煮 30 分钟。",
      "入苹果丁再煮 5 分钟。",
      "加入豆腐，轻度调味。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g KH · 孕期✓",
    swaps: "苹果 ↔ 梨；豆腐 ↔ 巴氏杀菌斯奇尔（标注）。",
    side: "温热草本茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy rice porridge with small apple cubes and tofu, steam"),
  },
  {
    id: "so-m",
    title: "清汤火鸡面（中式灵感）",
    desc: "清淡汤底配火鸡肉与小白菜；灵感来自 Made With Lau。",
    story: "快捷、清爽、易消化——午餐很合适。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
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
      "加热汤底；火鸡小火煮 8–10 分钟至全熟。",
      "蔬菜再煮 3–4 分钟。",
      "面条另煮冲洗后回锅稍加热，清淡调味。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓",
    swaps: "小麦面 ↔ 米粉；火鸡 ↔ 豆腐。",
    side: "温水。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear noodle soup with turkey, pak choi and carrots, no chili"),
  },
  {
    id: "so-a",
    title: "温和明太鱼炖白萝卜 & 米饭（韩式）",
    desc: "韩式“조림”炖法的温和版本，不加辣；鱼肉与萝卜清爽入味。",
    story: "白萝卜吸味，但仍保持柔和——很治愈的家常晚餐。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
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
      "白萝卜＋大酱加水小火煮 10 分钟。",
      "下鱼再炖 8–10 分钟至全熟。",
      "淋香油；配米饭食用。",
    ],
    checks: "胃炎——温和炖煮 · 糖友✓ ≈70 g KH · 孕期✓（鱼全熟、低汞）",
    swaps: "明太鱼 ↔ 鳕鱼；米饭 ↔ 糙米。",
    side: "清蒸菠菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild braised pollock with daikon, light brown sauce, rice bowl"),
  },
];

// ---------- 周视图辅助 ----------
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  (Array.isArray(arr) ? arr : []).forEach((r) => {
    const d = String(r?.id || "").split("-")[0];
    if (map[d]) map[d].push(r);
  });
  Object.values(map).forEach((list) =>
    list.sort(
      (a, b) =>
        ["f", "m", "a"].indexOf(String(a?.id || "").split("-")[1]) -
        ["f", "m", "a"].indexOf(String(b?.id || "").split("-")[1])
    )
  );
  return map;
};

// ---------- i18n 显示辅助 ----------
const dayNameI18n = (id, t) => t.day[id.split("-")[0]];
const mealTitleI18n = (id, t) => t.mealTitle[id.split("-")[1]];
const mealLabelI18n = (id, t) => t.meal[id.split("-")[1]];

// ---------- 购物清单汇总 ----------
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
  if (String(unit || "").toLowerCase() === "l") {
    qty = qty * 1000;
    unit = "ml";
  }
  return { name, qty, unit };
}
const groupMap = {
  protein: ["鸡", "鸡胸", "火鸡", "牛", "三文鱼", "鳕鱼", "明太鱼", "豆腐", "鸡蛋", "毛豆", "帕玛森", "猪里脊", "猪", "牛肉糜"],
  veg: [
    "胡萝卜",
    "西葫芦",
    "小白菜",
    "菠菜",
    "香菇",
    "蘑菇",
    "西兰花",
    "大葱",
    "洋葱",
    "彩椒",
    "白萝卜",
    "葱",
    "土豆",
    "南瓜",
    "黄瓜",
    "苹果",
    "西芹",
  ],
  staple: ["米", "寿司米", "糙米", "珍珠麦", "乌冬", "小麦面", "米粉", "红薯粉丝", "全麦意面"],
  season: [
    "裙带菜",
    "海苔",
    "高汤",
    "蔬菜高汤",
    "酱油",
    "味噌",
    "大酱",
    "香油",
    "菜籽油",
    "橄榄油",
    "味醂",
    "蜂蜜",
    "肉桂",
    "盐",
    "芝麻",
    "蒜",
    "姜",
    "番茄碎",
    "水",
  ],
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

// ---------- 本地图片持久化 ----------
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

// ---------- 菜谱卡片 ----------
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
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients}（2人份）</h3>
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

// ---------- 整周视图（封面 + 总览 + 21 页） ----------
function Cookbook({ t, lang }) {
  const weekly = useMemo(() => groupByDay(DATA), []);
  return (
    <div id="cookbook-root">
      {/* 封面 + 总览 */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              自 {meta.startDate} 起的一周 —— <b>模式：Non-Strict（均衡）</b>；以中/日/韩为主，温和调味、低钠酱油、孕期友好；糖尿病：每餐（2人）60–90 g KH。
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
                      {dayList.map((m) => (
                        <div key={m.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                          <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabelI18n(m.id, t)}</div>
                          <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{safeText(m.title, lang)}</div>
                          <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>
                            🌾 {(safeText(m.target, lang) || "").replace("总碳水", "碳水")}
                            {m.remind ? " · 💊" : ""}
                          </div>
                        </div>
                      ))}
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

// ---------- 购物清单（第二个 Tab） ----------
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
            注意：低钠酱油；海藻（裙带菜/海苔）适量；所有食材需充分加热。
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- 主组件 ----------
export default function Woche2_2025_10_06_ZH() {
  const [tab, setTab] = useState("kochbuch");
  const [lang] = useState("zh");
  const t = UI[lang] || UI.zh;

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

  useEffect(() => {
    Tests();
  }, []);

  return (
    <div style={{ background: COLORS.pageBg, minHeight: "100vh", padding: 16 }}>
      {/* 顶部工具条（仅 3 个按钮） */}
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

      {/* Tabs */}
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
    console.log("[GhibliKitchen] All tests passed (Week 2, ZH JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}