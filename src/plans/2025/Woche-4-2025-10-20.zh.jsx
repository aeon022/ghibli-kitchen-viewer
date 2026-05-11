// src/plans/Woche-4-2025-10-20.zh.jsx
import { BookmarkMenuButton } from "@/components/MealCard";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

/* ---------- Meta ---------- */
export const meta = {
  title: "第4周",
  startDate: "2025-10-20",
  id: "woche-4-2025-10-20-zh",
  lang: "zh",
  sidebar: "[ZH] 第4周 (2025-10-20)",
};
const FILE_BASE = "第4周 2025-10-20";

/* ---------- UI ----------- */
const UI_TITLES = {
  main: "吉卜力厨房 – 第4周",
  list: "吉卜力厨房 – 购物清单 – 第4周",
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
  "超干净的料理照片，柔和日光，自上而下拍摄，粉色背景，可见蒸汽，孕期友好（无生鱼/生蛋），温和的亚洲家常（日/中/韩），家庭友好";
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

// --- Robust Fallbacks: immer Text/Listen zurückgeben, ohne i18n-Picker ---
const toText = (v) => {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    // unterstütze { zh, de }-Form
    if (typeof v.zh === "string") return v.zh;
    if (typeof v.de === "string") return v.de;
  }
  return String(v ?? "");
};

const toList = (v) => {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object") {
    // unterstütze { zh:[], de:[] }-Form
    if (Array.isArray(v.zh)) return v.zh;
    if (Array.isArray(v.de)) return v.de;
  }
  return []; // sichere Vorgabe
};

/* ---------- DATA（21 个食谱，结构与 DE 完全一致） ---------- */
export const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "三文鱼丝豆腐粥（お粥）",
    desc: "日式Okayu，温和米粥配蒸熟三文鱼与嫩豆腐；灵感来自 Just One Cookbook。",
    story: "Okayu源自日本，常见于早餐或感冒时食用。入秋后尤为受欢迎——适合安静的清晨与温柔的开始。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈20 g/人",
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
      "淘米，加水煮开后小火煮25–30分钟至软糯。",
      "在粥上方蒸三文鱼8–10分钟，取出弄碎。",
      "加入豆腐，姜末与酱油微调味，撒葱花稍焖即可。",
    ],
    checks: "胃炎——温和暖胃 · 糖友✓ ≈70 g KH · 孕期✓ 鱼全熟、低汞",
    swaps: "内酯豆腐 ↔ 老豆腐；三文鱼 ↔ 鳕鱼；替代菜：牛丼（瘦牛肉）或姜烧猪（瘦猪肉）——米量可减半。",
    side: "温热大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu cubes, scallions, steam rising"),
  },
  {
    id: "mo-m",
    title: "温和拌饭（비빔밥）— 辣椒可选",
    desc: "韩式蔬菜牛肉拌饭；辣椒分开另给；灵感来自 My Korean Kitchen。",
    story: "拌饭源自韩国，四季皆宜。热食适合午餐或晚间均衡碗饭，不需辣也很香。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈31 g/人",
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
      "煮饭；蔬菜汆烫或少油快炒。",
      "牛肉糜炒熟至全熟，温和调味。",
      "装碗，鸡蛋全熟煎（蛋黄凝固）。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 蛋全熟、肉全熟",
    swaps: "牛肉糜 ↔ 火鸡糜；糙米 ↔ 寿司米；替代菜：牛丼（温和）或猪丼（低钠酱汁）。",
    side: "辣酱另碟。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top"),
  },
  {
    id: "mo-a",
    title: "温和麻婆豆腐（麻婆豆腐）— 辣椒可选",
    desc: "中式经典的温和味噌系酱汁版本；可单独配辣；灵感来自 Omnivore’s Cookbook。",
    story: "麻婆豆腐源自川菜；家常温和版在中国各地都很常见。适合下班后快手暖胃，不辣也下饭。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈32 g/人",
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
      "煮饭；香菇煸软。",
      "高汤+味噌+酱油加热；入豆腐小火煨4–5分钟。",
      "淀粉水勾薄芡，浇在米饭上食用。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "糙米 ↔ 白米；味噌 ↔ 温和豆瓣/黄豆酱；替代菜：温和版猪肉末麻婆（不辣）或牛肉豆腐煎炒。",
    side: "清蒸小白菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes"),
  },

  // 周二
  {
    id: "di-f",
    title: "三文鱼饭团 & 味噌汤（おにぎり・味噌汁）",
    desc: "三文鱼内馅饭团与温和味噌汤；灵感来自 Just One Cookbook。",
    story: "饭团属于日本便当文化，四季皆宜。配味噌汤是清淡早餐或外带小食——适合温和的早晨。",
    target: "≈78 g KH gesamt (2 P.) · 蛋白质 ≈27 g/人",
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
      "煮米，捏饭团；熟三文鱼撕碎作馅；外包海苔。",
      "味噌用热水化开（不沸腾），下豆腐与裙带菜略焖。",
      "酌量加酱油调整。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈78 g KH · 孕期✓ 鱼全熟，海藻少量",
    swaps: "寿司米 ↔ 糙米；三文鱼 ↔ 明太鱼/狭鳕；替代菜：猪肉碎盖饭（温和）或牛丼（瘦）。",
    side: "温和绿茶（可脱咖）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame"),
  },
  {
    id: "di-m",
    title: "鸡肉河粉炒（河粉）",
    desc: "广式风味的温和炒河粉、蔬菜多；灵感来自 The Woks of Life。",
    story: "参考广东河粉（Ho Fun）。快手、四季皆宜——省时又均衡。",
    target: "≈74 g KH gesamt (2 P.) · 蛋白质 ≈39 g/人",
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
      "河粉浸泡/焯水。",
      "鸡丝少油翻炒至全熟。",
      "下蔬菜，温和调味快速翻匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈74 g KH · 孕期✓ 鸡肉全熟",
    swaps: "河粉 ↔ 乌冬；鸡肉 ↔ 豆腐；替代菜：越式牛肉炒粉（温和）或小白菜猪里脊快炒（温和）。",
    side: "黄瓜片原味。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"),
  },
  {
    id: "di-a",
    title: "大酱汤配麦仁（된장찌개）",
    desc: "韩式大酱锅，醇厚但不辣；灵感来自 Seon Kyoung Longest。",
    story: "大酱汤是韩国家常汤品，秋冬尤受欢迎。风味足但温和——很适合惬意的夜晚。",
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
      "大酱溶于水，蔬菜小火煮12–15分钟。",
      "加入豆腐丁略焖。",
      "珍珠麦分锅煮熟，搭配食用。",
    ],
    checks: "胃炎——醇厚不辣 · 糖友✓ ≈86 g KH · 孕期✓ 全熟",
    swaps: "珍珠麦 ↔ 米饭；豆腐 ↔ 火鸡胸；替代菜：豚汁（温和）或寿喜烧风瘦牛蔬煮（低糖）。",
    side: "温和腌黄瓜（无辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"),
  },

  // 周三
  {
    id: "mi-f",
    title: "南瓜粥配豆腐与毛豆（단호박죽）",
    desc: "丝滑南瓜米粥，高蛋白；灵感来自 Mom’s Korean Recipes。",
    story: "源自韩国，秋季应季南瓜。温和绵密——适合清晨或清淡晚餐。",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈22 g/人",
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
      "南瓜+大米小火煮25分钟至软。",
      "打成细腻；入豆腐与毛豆再煮3–4分钟。",
      "温和调味。",
    ],
    checks: "胃炎——软暖 · 糖友✓ ≈75 g KH · 孕期✓ 全熟",
    swaps: "毛豆 ↔ 白腰豆；豆腐 ↔ 鸡胸丁；替代菜：牛丼（瘦）或日式姜烧猪（瘦）。",
    side: "温热米茶/大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"),
  },
  {
    id: "mi-m",
    title: "鸡肉西兰花乌冬汤（うどん）",
    desc: "日式清汤乌冬，清淡温和；灵感来自 Just One Cookbook。",
    story: "轻汤乌冬在日本四季常见，尤其冷月。柔和饱腹，适合午餐不吃辣。",
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
      "汤底以味噌+酱油调和加热。",
      "鸡肉小火煮6–8分钟至全熟；蔬菜再煮3–4分钟。",
      "乌冬另煮，冲洗后入汤同煮片刻。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈79 g KH · 孕期✓ 鸡肉全熟",
    swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐；替代菜：牛肉乌冬或猪肉乌冬（温和）。",
    side: "小碟黄瓜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth"),
  },
  {
    id: "mi-a",
    title: "姜丝清蒸鳕鱼 & 白米（清蒸鳕鱼）",
    desc: "粤式清蒸，细嫩易消化；灵感来自 Made With Lau。",
    story: "清蒸是粤菜经典技法。清爽温和，适合需要清淡的夜晚。",
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
      "鱼置姜片上，蒸8–10分钟至全熟。",
      "酱油+高汤加热，浇鱼，淋香油。",
      "米饭煮熟同食。",
    ],
    checks: "胃炎——清蒸 · 糖友✓ ≈70 g KH · 孕期✓ 鳕鱼全熟、低汞",
    swaps: "鳕鱼 ↔ 明太鱼；米饭 ↔ 糙米；替代菜：日式姜烧猪或姜汁牛肉条（温和）。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"),
  },

  // 周四
  {
    id: "do-f",
    title: "玉子烧 & 味噌汤配小碗米饭（卵焼き・味噌汁）",
    desc: "日式早餐，煎蛋完全凝固；灵感来自 Just One Cookbook。",
    story: "玉子烧是日本经典早餐，也常入便当。配味噌汤，温和均衡地开启一天。",
    target: "≈62 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
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
      "煮饭。玉子烧卷煎至完全凝固。",
      "煮味噌汤；下豆腐/裙带菜略焖。",
      "撒葱花上桌。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈62 g KH · 孕期✓ 蛋完全凝固",
    swaps: "米饭 ↔ 糙米；豆腐 ↔ 鸡胸丁；替代菜：牛肉乌冬（温和）作丰盛早餐。",
    side: "温热绿茶（低咖）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"),
  },
  {
    id: "do-m",
    title: "番茄炒蛋配豆腐 & 米饭（番茄炒蛋）",
    desc: "中式家常，酸甜温和；灵感来自 The Woks of Life。",
    story: "番茄炒蛋是中国最有名的家常菜之一。温和版本适合工作日的快速餐。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈28 g/人",
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
      "番茄与洋葱小火炖软；下豆腐稍焖。",
      "温和调味，配米饭食用。",
    ],
    checks: "胃炎——酸度温和、炖至软 · 糖友✓ ≈70 g KH · 孕期✓ 蛋全熟",
    swaps: "豆腐 ↔ 火鸡胸丁；米饭 ↔ 糙米；替代菜：青椒肉丝（温和）或牛肉彩椒炒（温和）。",
    side: "清蒸小白菜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"),
  },
  {
    id: "do-a",
    title: "温和韩式烤肉风味火鸡 & 糙米（불고기）",
    desc: "韩式灵感的平底锅快炒，温和不辣；灵感来自 Maangchi。",
    story: "烤肉（Bulgogi）源自韩国，平底锅版四季常做。温和腌制、快炒出香——适合家庭晚餐。",
    target: "≈80 g KH gesamt (2 P.) · 蛋白质 ≈28 g/人",
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
      "火鸡肉与酱油/梨泥/蒜腌15分钟。",
      "少油快炒至全熟。",
      "下蔬菜略炒，配糙米食用。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g KH · 孕期✓ 火鸡全熟",
    swaps: "火鸡 ↔ 鸡胸；糙米 ↔ 白米；替代菜：瘦牛烤肉或温和猪烤肉（不辣）。",
    side: "黄瓜片原味。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"),
  },

  // 周五
  {
    id: "fr-f",
    title: "鸡肉粥（鸡肉粥）",
    desc: "中式米粥配嫩鸡肉——柔和暖胃；灵感来自 The Woks of Life。",
    story: "粥在华南及东南亚非常常见，适合早餐或晚餐。温暖清淡——下雨天尤其舒服。",
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
      "米加水小火煮30分钟。",
      "鸡肉切小丁，入粥煮8–10分钟至全熟。",
      "温和调味，撒葱花。",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈70 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜；替代菜：瘦猪粥或瘦牛粥（均温和）。",
    side: "温热花草茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"),
  },
  {
    id: "fr-m",
    title: "清爽意式蔬菜汤配豆腐（Minestrone）",
    desc: "意大利蔬菜浓汤，久煮温和不刺激。",
    story: "Minestrone常见于夏末到秋季。此轻盈版适合轻松的夜晚，温暖不厚重。",
    target: "≈69 g KH gesamt (2 P.) · 蛋白质 ≈39 g/人",
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
      "少油炒香蔬菜，加高汤/番茄碎小火煮20–25分钟。",
      "入豆腐/白腰豆再焖5分钟。",
      "意面另煮，最后拌入。",
    ],
    checks: "胃炎——久煮温和 · 糖友✓ ≈69 g KH · 孕期✓ 奶酪可选且需巴氏杀菌",
    swaps: "豆腐 ↔ 鸡胸丁；意面 ↔ 大麦；替代菜：日式素炒蔬+猪里脊（温和）或牛肉蔬炒（温和）。",
    side: "温热草本茶。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, few wholegrain pasta pieces"),
  },
  {
    id: "fr-a",
    title: "烤三文鱼照烧配西兰花 & 米饭（照り焼き）",
    desc: "日式灵感，低钠酱油烤制；灵感来自 Just One Cookbook。",
    story: "照烧是日本的调味与做法之一。烤箱版更省事——适合清凉夜晚的省时晚餐。",
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
      "调酱（酱油+少许味醂/蜂蜜+姜）。",
      "刷在三文鱼上，200°C烤12–14分钟。",
      "配米饭与蒸西兰花食用。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈75 g KH（甜度很低） · 孕期✓ 三文鱼全熟",
    swaps: "米饭 ↔ 糙米；西兰花 ↔ 小白菜；替代菜：日式姜烧猪（温和）或照烧牛肉（瘦）。",
    side: "温热绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice"),
  },

  // 周六
  {
    id: "sa-f",
    title: "汤豆腐配小碗米饭（湯豆腐）",
    desc: "日式热汤煮豆腐，非常好消化。",
    story: "汤豆腐源自京都，传统冬季餐。轻、暖、安神——适合周末清晨。",
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
      "热高汤，豆腐入锅小火焖5–6分钟。",
      "下大葱/菠菜略煮。",
      "少量酱油调味；米饭分开盛。",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈62 g KH · 孕期✓ 全熟",
    swaps: "米饭 ↔ 糙米；菠菜 ↔ 小白菜；替代菜：牛肉乌冬（温和）或猪肉乌冬（温和）。",
    side: "温水或大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Yudofu in a clay pot with leeks and spinach, small rice bowl"),
  },
  {
    id: "sa-m",
    title: "杂菜粉丝（牛肉蔬菜）（잡채）— 温和",
    desc: "韩式红薯粉丝拌炒，蔬菜多；可不辣；灵感来自 Maangchi。",
    story: "杂菜在韩国逢节常吃，日常也很受欢迎。温热或室温都适合——很适合聚会与周末餐。",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
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
      "牛肉/蔬菜少油炒熟，调味。",
      "拌入粉丝，略加热即成。",
    ],
    checks: "胃炎——温和调味 · 糖友✓ ≈75 g KH · 孕期✓ 牛肉全熟",
    swaps: "牛肉 ↔ 豆腐；红薯粉丝 ↔ 米粉；替代菜：猪里脊杂菜（温和）或牛肉炒河粉（温和）。",
    side: "芝麻拌黄瓜（温和）。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae with colorful vegetables and beef strips, glossy but not oily"),
  },
  {
    id: "sa-a",
    title: "香菇炖鸡 & 小份米饭（香菇鸡）",
    desc: "中式小火炖——柔嫩又香；灵感来自 Red House Spice。",
    story: "经典中式家常炖菜，适合秋冬。风味丰富但不刺激——很适合小范围的周末晚餐。",
    target: "≈62 g KH gesamt (2 P.) · 蛋白质 ≈33 g/人",
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
      "鸡块小火煎出香味，冲入高汤。",
      "下香菇与胡萝卜，小火炖20–25分钟。",
      "配米饭食用。",
    ],
    checks: "胃炎——炖煮温和 · 糖友✓ ≈62 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；米饭 ↔ 糙米；替代菜：香菇猪里脊炖（温和）或牛肉炖（瘦）。",
    side: "清蒸小白菜或西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised chicken with shiitake and carrots, small rice serving"),
  },

  // 周日
  {
    id: "so-f",
    title: "苹果豆腐甜米粥（お粥）",
    desc: "温和微甜的水果米粥；灵感来自日式Okayu。",
    story: "受Okayu启发，加入苹果的微甜版本。适合苹果季，清冷日子的暖心早餐。",
    target: "≈80 g KH gesamt (2 P.) · 蛋白质 ≈22 g/人",
    ingredients: [
      "大米（生） 80 g",
      "苹果 150 g",
      "水 1000 ml",
      "肉桂 少许",
      "老豆腐 300 g",
    ],
    steps: [
      "米加水小火煮30分钟。",
      "入苹果丁再煮5分钟。",
      "下豆腐丁，温和调味。",
    ],
    checks: "胃炎——温和暖胃 · 糖友✓ ≈80 g KH · 孕期✓ 全熟",
    swaps: "苹果 ↔ 梨；豆腐 ↔ 斯奇尔酸奶（巴氏杀菌）；替代：若不想吃甜粥，可改做牛丼/猪丼等咸食。",
    side: "温热花草茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy rice porridge with small apple cubes and tofu, neutral bowl, steam"),
  },
  {
    id: "so-m",
    title: "清汤火鸡面（清汤面）",
    desc: "中式灵感清汤与嫩火鸡；灵感来自 Made With Lau。",
    story: "清汤面在中国很常见——感冒季尤合适。清淡快捷，适合午餐。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
    ingredients: [
      "小麦面（干） 100 g",
      "火鸡胸肉 220 g",
      "小白菜 200 g",
      "胡萝卜 120 g",
      "洋葱 60 g",
      "蔬菜高汤 900 ml",
      "低钠酱油 15 ml",
    ],
    steps: [
      "汤加热；火鸡肉小火煮8–10分钟至全熟。",
      "蔬菜再煮3–4分钟。",
      "面条另煮冲洗后入汤，温和调味。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 火鸡全熟",
    swaps: "小麦面 ↔ 米粉；火鸡 ↔ 豆腐；替代菜：牛肉乌冬（清汤）或猪肉乌冬（清汤）。",
    side: "温水。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Clear noodle soup with turkey slices, pak choi and carrots"),
  },
  {
    id: "so-a",
    title: "温和明太鱼炖萝卜 & 米饭（명태조림）",
    desc: "韩式炖鱼配白萝卜；温和不辣，辣椒可另给。",
    story: "“조림”是韩国常见的炖法，冷月常做。配温和白萝卜与明太鱼，是舒心的日常晚餐。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "明太鱼柳（Alaska Pollock） 320 g",
      "白萝卜 250 g",
      "洋葱 60 g",
      "大酱 20 g",
      "低钠酱油 20 ml",
      "水 500 ml",
      "大米（生） 90 g",
      "香油 8 ml",
    ],
    steps: [
      "萝卜+大酱加水小火煮10分钟。",
      "下明太鱼温和炖8–10分钟。",
      "淋香油；配米饭食用。",
    ],
    checks: "胃炎——炖煮温和 · 糖友✓ ≈70 g KH · 孕期✓ 鱼全熟、低汞",
    swaps: "明太鱼 ↔ 鳕鱼；米饭 ↔ 糙米；替代菜：日式姜烧猪（温和）或牛肉条炖（温和）。",
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

/* ---------- 购物清单汇总 ---------- */
function normalizeName(n) {
  return String(n)
    .replace(/\(.*?\)/g, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/ +/g, " ");
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
  protein: ["鸡", "鸡胸", "火鸡", "牛", "三文鱼", "鳕鱼", "明太鱼", "豆腐", "鸡蛋", "毛豆", "帕玛森", "猪里脊", "猪", "牛肉糜"],
  veg: ["胡萝卜", "西葫芦", "小白菜", "菠菜", "香菇", "蘑菇", "西兰花", "大葱", "洋葱", "彩椒", "白萝卜", "葱", "土豆", "南瓜", "黄瓜", "苹果"],
  staple: ["米", "寿司米", "糙米", "珍珠麦", "乌冬", "小麦面", "米粉", "红薯粉丝", "全麦意面"],
  season: ["裙带菜", "海苔", "高汤", "蔬菜高汤", "酱油", "味噌", "大酱", "香油", "菜籽油", "橄榄油", "味醂", "蜂蜜", "肉桂", "盐", "芝麻", "蒜", "姜", "番茄", "水"],
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
      if (groupMap.protein.some((w) => nLower.includes(String(w).toLowerCase()))) add("protein");
      else if (groupMap.staple.some((w) => nLower.includes(String(w).toLowerCase()))) add("staple");
      else if (groupMap.veg.some((w) => nLower.includes(String(w).toLowerCase()))) add("veg");
      else if (groupMap.season.some((w) => nLower.includes(String(w).toLowerCase()))) add("season");
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <BookmarkMenuButton
            planSlug={meta.id}
            recipeId={r.id}
            recipeTitle={title}
            planTitle={meta.title}
          /><h2 style={{ margin: 0 }}>{title}</h2></div>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{story}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <section>
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients}（2人份）</h3>
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
              自 {meta.startDate} 起的一周 —— <b>模式：Non-Strict（均衡）</b>；以中/日/韩为主，温和调味、低钠酱油、孕期友好；糖尿病：每餐（2人）60–90 g KH。
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="上传封面图片" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>本周总览</h2>
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
                            🌾 {target.replace("总碳水", "碳水")}
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
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>根据本周菜谱自动汇总（起始：{meta.startDate}）。</p>
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
            注意：低钠酱油；海藻（裙带菜/海苔）适量；所有食材需充分加热。
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 主组件（默认导出必须是 React 组件！） ---------- */
export default function Woche4_2025_10_20_ZH() {
  const [tab, setTab] = useState("kochbuch");
  const [lang, setLang] = useState(() => localStorage.getItem("moving-kitchen-tales-lang") || "zh");
  const t = UI[lang] || UI.zh;
  const toggleLang = () => {
    const next = lang === "de" ? "zh" : "de";
    setLang(next);
    localStorage.setItem("moving-kitchen-tales-lang", next);
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
          {/* 可选：顶部语言切换（Sidebar 已有则可删） */}
          {/* <button onClick={() => toggleLang()} style={{ padding: "10px 14px", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.text, boxShadow: COLORS.btnShadow, fontWeight: 600 }}>
            {t.toggle}
          </button> */}
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

/* ---------- Tests ---------- */
function Tests() {
  try {
    if (!/^第4周 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
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
    console.log("[Moving Kitchen Tales] All tests passed (ZH JSX).");
  } catch (e) {
    console.error("[Moving Kitchen Tales] Tests failed:", e);
  }
}