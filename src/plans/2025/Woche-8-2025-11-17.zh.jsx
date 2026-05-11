// src/plans/Woche-8-2025-11-17.zh.jsx
// 完整渲染版本：严格对齐 Woche-5/6 结构（1:1），仅 Meta & DATA 新（保留你给定的第8周菜谱）
// 额外：每天 1 个电饭煲菜（RICE_COOKER），在周览显示第4块卡片，并在下方生成各自页面

import { BookmarkMenuButton } from "@/components/MealCard";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

/* ---------- Meta ---------- */
export const meta = {
  title: "第8周",
  startDate: "2025-11-17",
  id: "woche-8-2025-11-17-zh",
  lang: "zh",
  sidebar: "[ZH] 第8周 (2025-11-17)",
};
const FILE_BASE = "Woche 8 2025-11-17";

/* ---------- UI ----------- */
const UI_TITLES = {
  main: "吉卜力厨房 – 第8周",
  list: "吉卜力厨房 – 购物清单 – 第8周",
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

/* ---------- DATA (21 新菜谱，保留周8主菜；下方另有 RICE_COOKER 7 道) ---------- */
export const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "三文鱼豆腐粥（お粥）",
    desc: "日式米粥，清淡低钠，暖胃开局。",
    story:
      "Okayu 源自日本，常作早餐或恢复期餐。口感绵软、温和易消化。Inspiration: inspiriert von Just One Cookbook",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈20 g/人",
    ingredients: [
      "大米（生）90 g",
      "清水 800 ml",
      "三文鱼柳 120 g",
      "绢豆腐 200 g",
      "姜 10 g",
      "葱 20 g",
      "低钠酱油 10 ml",
    ],
    steps: [
      "淘米，加水小火熬 25–30 分钟至粥状。",
      "粥面放三文鱼蒸 8–10 分钟至全熟，拨散。",
      "加入豆腐，以姜末和少量酱油调味，葱花焖 1 分钟。",
    ],
    checks:
      "胃炎——温和暖胃 · 糖友✓ ≈70 g KH · 孕期✓ 鱼全熟、低汞",
    swaps:
      "绢豆腐 ↔ 老豆腐；三文鱼 ↔ 鳕鱼；也可做牛丼/姜烧猪（减量米饭）。",
    side: "温热大麦茶；清淡黄瓜浅渍（无辣）。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Creamy Japanese okayu porridge, flaked cooked salmon, silken tofu, scallions, rising steam"
    ),
  },
  {
    id: "mo-m",
    title: "温和拌饭 Bibimbap（비빔밥）– 辣椒酱分开给",
    desc: "韩式拌饭，蔬菜+牛肉，低钠，酱辣可选。",
    story:
      "Bibimbap 是四季常见的韩式饭碗——配菜多变、家常耐吃。本版强调熟透与清淡。Inspiration: inspiriert von My Korean Kitchen",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈31 g/人",
    ingredients: [
      "糙米（生）90 g",
      "瘦牛肉末 220 g",
      "菠菜 200 g",
      "胡萝卜 120 g",
      "香菇 120 g",
      "鸡蛋 2 枚",
      "低钠酱油 20 ml",
      "香油 10 ml",
    ],
    steps: [
      "煮饭；蔬菜汆/少油快炒 5–6 分钟。",
      "牛肉末炒散至全熟 6–8 分钟，温和调味。",
      "鸡蛋煎至全熟，装碗拌匀（辣椒酱另给）。",
    ],
    checks:
      "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 鸡蛋全熟、牛肉全熟",
    swaps:
      "牛肉 ↔ 火鸡肉末；糙米 ↔ 寿司米；辣椒酱小碟另给。",
    side: "清爽黄瓜片；可选无辣白泡菜。",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top"
    ),
  },
  {
    id: "mo-a",
    title: "温和麻婆豆腐（麻婆豆腐）– 不辣",
    desc: "中式家常，味噌打底的清淡酱汁，低钠。",
    story:
      "麻婆豆腐出自川菜，这里做成不辣、家常的舒适风味，晚餐友好。Inspiration: inspiriert von Omnivore’s Cookbook",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈32 g/人",
    ingredients: [
      "老豆腐 400 g",
      "香菇 150 g",
      "白味噌 20 g",
      "清淡蔬菜高汤 300 ml",
      "低钠酱油 20 ml",
      "蒜 1 瓣",
      "姜 10 g",
      "玉米淀粉 10 g",
      "糙米（生）90 g",
    ],
    steps: [
      "煮饭（30–35 分钟）。香菇焯/炒 5 分钟。",
      "高汤+味噌+酱油加热；豆腐入汤温和加热 4–5 分钟。",
      "淀粉勾薄芡，浇在米饭上。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps:
      "糙米 ↔ 白米；味噌 ↔ 清淡豆瓣；可加少量瘦猪肉末（不辣）。",
    side: "清蒸小白菜；温热茶饮。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Mild mapo tofu with mushrooms, glossy light-brown sauce over brown rice, no chili"
    ),
  },

  // 周二
  {
    id: "di-f",
    title: "三文鱼饭团 & 味噌汤（おにぎり・味噌汁）",
    desc: "熟三文鱼饭团配清淡味噌汤；低钠。",
    story:
      "饭团是便当文化代表，配味噌汤就是温暖的早餐组合。Inspiration: inspiriert von Just One Cookbook",
    target: "≈78 g KH gesamt (2 P.) · 蛋白质 ≈27 g/人",
    ingredients: [
      "寿司米（生）100 g",
      "三文鱼柳 150 g",
      "海苔 1 张",
      "白味噌 20 g",
      "老豆腐 150 g",
      "裙带菜（干）2 g",
      "清水 900 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮饭；三文鱼煮/蒸 8–10 分钟至熟，拨散做饭团，外裹海苔。",
      "味噌用热水化开（勿沸腾）；豆腐/裙带菜浸 2–3 分钟。",
      "以少量酱油温和调味。",
    ],
    checks:
      "胃炎——温和 · 糖友✓ ≈78 g KH · 孕期✓ 三文鱼全熟；海藻少量",
    swaps: "寿司米 ↔ 糙米；三文鱼 ↔ 明太鱼/狭鳕。",
    side: "温和绿茶（可选无咖啡因）。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame"
    ),
  },
  {
    id: "di-m",
    title: "广式河粉鸡肉炒（河粉）— 清淡蔬菜多",
    desc: "南中风味，锅气清爽、低油低钠。",
    story:
      "参考广式 Ho Fun 思路的家常快炒，均衡好吃。Inspiration: inspiriert von The Woks of Life",
    target: "≈74 g KH gesamt (2 P.) · 蛋白质 ≈39 g/人",
    ingredients: [
      "干米粉 80 g",
      "鸡胸肉 250 g",
      "彩椒 150 g",
      "小白菜/青梗菜 200 g",
      "洋葱 80 g",
      "胡萝卜 100 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
    ],
    steps: [
      "米粉泡软或焯 3–4 分钟。",
      "鸡丝少油翻炒 5–6 分钟至熟。",
      "蔬菜下锅 3–4 分钟，温和调味拌匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈74 g KH · 孕期✓ 鸡肉全熟",
    swaps: "米粉 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "黄瓜片。",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili"
    ),
  },
  {
    id: "di-a",
    title: "大酱汤配珍珠麦（된장찌개）",
    desc: "韩式大酱炖菜，咸香不辣，搭配大麦。",
    story:
      "韩国日常汤锅——踏实、不过火的家常味。Inspiration: inspiriert von Seon Kyoung Longest",
    target: "≈86 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
    ingredients: [
      "大酱 30 g",
      "老豆腐 300 g",
      "西葫芦 200 g",
      "土豆 200 g",
      "香菇 100 g",
      "洋葱 70 g",
      "清水 800 ml",
      "低钠酱油 10 ml",
      "珍珠麦（生）70 g",
    ],
    steps: [
      "大酱溶于水；蔬菜小火炖 12–15 分钟。",
      "豆腐入锅再煮 3–4 分钟。",
      "珍珠麦另煮 25–30 分钟，同食。",
    ],
    checks:
      "胃炎——咸香不辣 · 糖友✓ ≈86 g KH · 孕期✓ 全熟",
    swaps: "大麦 ↔ 米饭；豆腐 ↔ 火鸡胸。",
    side: "清淡黄瓜浅渍（无辣）。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Korean soybean stew with tofu and vegetables in a clay pot, side of barley"
    ),
  },

  // 周三
  {
    id: "mi-f",
    title: "南瓜粥配豆腐毛豆（단호박죽）",
    desc: "细腻南瓜米粥，蛋白提升、清淡舒适。",
    story:
      "韩国秋冬常见的南瓜粥，口味柔和。Inspiration: inspiriert von Mom's Korean Recipes",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈22 g/人",
    ingredients: [
      "南瓜（日本南瓜/北海道南瓜）400 g",
      "大米（生）70 g",
      "老豆腐 200 g",
      "毛豆（去壳）100 g",
      "姜 8 g",
      "清水 900 ml",
      "盐 少许",
    ],
    steps: [
      "南瓜+米煮 25 分钟至软。",
      "打细；入豆腐与毛豆再焖 3–4 分钟。",
      "温和调味，热饮。",
    ],
    checks: "胃炎——软糯温和 · 糖友✓ ≈75 g KH · 孕期✓ 全熟",
    swaps: "毛豆 ↔ 白豆；豆腐 ↔ 鸡丁。",
    side: "温热玄米茶/大麦茶。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam"
    ),
  },
  {
    id: "mi-m",
    title: "鸡肉西兰花乌冬汤（うどん）",
    desc: "清亮日式汤面，饱腹但清淡。",
    story:
      "日本一年四季都常见的乌冬清汤，尤其适合寒冷天气。Inspiration: inspiriert von Just One Cookbook",
    target: "≈79 g KH gesamt (2 P.) · 蛋白质 ≈34 g/人",
    ingredients: [
      "乌冬（干）100 g",
      "鸡胸肉 220 g",
      "西兰花 200 g",
      "洋葱 60 g",
      "白味噌 25 g",
      "清水 1000 ml",
      "低钠酱油 15 ml",
    ],
    steps: [
      "味噌+酱油入汤（勿大滚）。",
      "鸡肉浸煮 6–8 分钟至熟；蔬菜再 3–4 分钟。",
      "乌冬另煮 8–10 分钟，过冷水后入汤。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈79 g KH · 孕期✓ 鸡肉全熟",
    swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。",
    side: "小碟黄瓜。",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Light udon soup with chicken slices and broccoli in clear broth"
    ),
  },
  {
    id: "mi-a",
    title: "清蒸鳕鱼姜葱 & 米饭（清蒸鳕鱼）",
    desc: "广式清蒸，鲜嫩易消化。",
    story:
      "南中国常见的清蒸手法，轻盈又有风味。Inspiration: inspiriert von Made With Lau",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈32 g/人",
    ingredients: [
      "鳕鱼柳 320 g",
      "大米（生）90 g",
      "姜 15 g",
      "葱 30 g",
      "低钠酱油 15 ml",
      "香油 8 ml",
      "清淡蔬菜高汤 100 ml",
    ],
    steps: [
      "鳕鱼垫姜片蒸 8–10 分钟至熟。",
      "酱油+高汤加热浇面；滴香油。",
      "煮饭配食。",
    ],
    checks:
      "胃炎——清蒸温和 · 糖友✓ ≈70 g KH · 孕期✓ 鳕鱼全熟、低汞",
    swaps: "鳕鱼 ↔ 明太鱼；米饭 ↔ 糙米。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"
    ),
  },

  // 周四
  {
    id: "do-f",
    title: "玉子烧 & 味噌汤+小碗米饭（卵焼き・味噌汁）",
    desc: "日式早餐，鸡蛋全熟。",
    story:
      "玉子烧常见于日常与便当，滋味温和。Inspiration: inspiriert von Just One Cookbook",
    target: "≈62 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
    ingredients: [
      "鸡蛋 4 枚",
      "老豆腐 150 g",
      "大米（生）80 g",
      "白味噌 20 g",
      "裙带菜（干）1 g",
      "葱 20 g",
      "清水 800 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮饭（30 分钟）。煎玉子烧 5–6 分钟至全熟。",
      "煮味噌汤；豆腐/裙带菜浸 2–3 分钟。",
      "撒葱花上桌。",
    ],
    checks:
      "胃炎——温和 · 糖友✓ ≈62 g KH · 孕期✓ 鸡蛋全熟",
    swaps: "米饭 ↔ 糙米；豆腐 ↔ 鸡丁。",
    side: "温和绿茶（低咖）。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese breakfast set with rolled omelet, small rice bowl, miso soup"
    ),
  },
  {
    id: "do-m",
    title: "番茄炒蛋豆腐配米饭（番茄炒蛋）",
    desc: "家常快手，酸甜柔和。",
    story:
      "番茄炒蛋是华语区家喻户晓的日常菜，用熟透番茄更圆润。Inspiration: inspiriert von The Woks of Life",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈28 g/人",
    ingredients: [
      "大米（生）90 g",
      "鸡蛋 4 枚",
      "老豆腐 200 g",
      "番茄（熟）400 g",
      "洋葱 60 g",
      "低钠酱油 10 ml",
      "菜籽油 10 ml",
    ],
    steps: [
      "煮饭（30 分钟）；鸡蛋炒至全熟 3–4 分钟。",
      "番茄/洋葱小火焖 6–8 分钟；豆腐再 2–3 分钟。",
      "温和调味配饭。",
    ],
    checks:
      "胃炎——酸度温和、充分炖煮 · 糖友✓ ≈70 g KH · 孕期✓ 鸡蛋全熟",
    swaps: "豆腐 ↔ 火鸡胸丁；米饭 ↔ 糙米。",
    side: "清蒸青菜。",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili"
    ),
  },
  {
    id: "do-a",
    title: "温和韩式“烤肉”火鸡+糙米（불고기风）",
    desc: "甜咸平衡、低钠不辣；辣酱可分开。",
    story:
      "Bulgogi 源于韩国——家常平底锅版更快更轻。Inspiration: inspiriert von Maangchi",
    target: "≈80 g KH gesamt (2 P.) · 蛋白质 ≈28 g/人",
    ingredients: [
      "火鸡胸 250 g",
      "糙米（生）90 g",
      "洋葱 80 g",
      "胡萝卜 120 g",
      "蘑菇 150 g",
      "低钠酱油 25 ml",
      "香油 10 ml",
      "蒜 1 瓣",
      "梨泥 60 g",
    ],
    steps: [
      "火鸡肉以酱油/梨泥/蒜腌 15 分钟。",
      "少油快炒 5–6 分钟至熟。",
      "蔬菜入锅 3–4 分钟；配米饭。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g KH · 孕期✓ 肉类全熟",
    swaps: "火鸡 ↔ 鸡胸；糙米 ↔ 白米。",
    side: "黄瓜片；温和萝卜浅渍。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili"
    ),
  },

  // 周五
  {
    id: "fr-f",
    title: "鸡肉粥（鸡肉粥）",
    desc: "华南常见米粥，鸡肉鲜嫩、非常温和。",
    story:
      "粥在华南和东南亚十分常见，适合清晨暖身。Inspiration: inspiriert von The Woks of Life",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈34 g/人",
    ingredients: [
      "大米（生）90 g",
      "鸡胸肉 220 g",
      "姜 12 g",
      "胡萝卜 120 g",
      "清水 1100 ml",
      "低钠酱油 10 ml",
      "葱 20 g",
    ],
    steps: [
      "米加水小火熬 30 分钟。",
      "鸡肉切细丁，下锅再煮 8–10 分钟至熟。",
      "温和调味，撒葱花。",
    ],
    checks: "胃炎——非常温和 · 糖友✓ ≈70 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜。",
    side: "温热草本茶。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam"
    ),
  },
  {
    id: "fr-m",
    title: "清淡意式蔬菜汤配豆腐（Minestrone）",
    desc: "意式家常蔬菜汤，慢炖温和、富含膳食纤维。",
    story:
      "Minestrone 是意大利经典蔬菜汤；这版清淡适合午间。Inspiration: inspiriert von Giallo Zafferano",
    target: "≈69 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "全麦意面（干）80 g",
      "老豆腐 200 g",
      "白腰豆（熟）200 g",
      "胡萝卜 150 g",
      "西芹 100 g",
      "西葫芦 150 g",
      "番茄丁（罐）200 g",
      "蔬菜高汤 800 ml",
      "橄榄油 10 ml",
    ],
    steps: [
      "蔬菜少油炒香 4–5 分钟，加高汤。",
      "小火 15–20 分钟；意面再煮 8–10 分钟。",
      "入豆腐与豆类 3–4 分钟，加盐度控。",
    ],
    checks: "胃炎——温和不辣 · 糖友✓ ≈69 g KH · 孕期✓ 全熟",
    swaps: "全麦意面 ↔ 大麦；豆腐 ↔ 鸡肉。",
    side: "温和黄瓜沙拉（低酸）。",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Light minestrone with beans, tofu cubes, small pasta, lots of vegetables, gentle broth"
    ),
  },
  {
    id: "fr-a",
    title: "烤三文鱼照烧 & 西兰花 + 米饭（照り焼き鮭）",
    desc: "低钠配方、烤制更温和；甜咸适中。",
    story:
      "照烧是日式糖酱油上色技法——这里减盐减糖，轻盈不腻。Inspiration: inspiriert von Just One Cookbook",
    target: "≈77 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "三文鱼柳 320 g",
      "大米（生）90 g",
      "西兰花 250 g",
      "低钠酱油 20 ml",
      "蜂蜜 10 g",
      "清水 30 ml",
      "姜 6 g",
    ],
    steps: [
      "煮饭（30 分钟）。",
      "三文鱼刷酱油/水/蜂蜜/姜，180°C 烤 12–14 分钟至熟。",
      "西兰花蒸 4–5 分钟，与米饭同食。",
    ],
    checks:
      "胃炎——温和 · 糖友✓ ≈77 g KH · 孕期✓ 鱼全熟、低汞",
    swaps: "三文鱼 ↔ 鳕鱼；米饭 ↔ 糙米。",
    side: "温热绿茶；清淡萝卜浅渍。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Oven-baked teriyaki salmon fillets, steamed broccoli florets, small bowl of rice, glossy light glaze"
    ),
  },

  // 周六
  {
    id: "sa-f",
    title: "杂炊鸡肉蔬菜饭汤（雑炊）",
    desc: "日式“剩饭汤饭”，清淡暖胃。",
    story:
      "杂炊是日本的家庭饭汤，适合清晨与恢复期。Inspiration: inspiriert von Just One Cookbook",
    target: "≈68 g KH gesamt (2 P.) · 蛋白质 ≈22 g/人",
    ingredients: [
      "熟米饭 250 g",
      "鸡胸肉 150 g",
      "胡萝卜 100 g",
      "香菇 80 g",
      "鸡蛋 1 枚",
      "日式高汤/清淡汤 700 ml",
      "低钠酱油 10 ml",
      "葱 15 g",
    ],
    steps: [
      "汤烧热；鸡丁浸煮 6–7 分钟至熟。",
      "入米饭煮 5 分钟；蛋液回旋倒入并完全凝固。",
      "少量酱油调味，撒葱。",
    ],
    checks: "胃炎——温和暖胃 · 糖友✓ ≈68 g KH · 孕期✓ 蛋完全凝固",
    swaps: "鸡肉 ↔ 豆腐；米饭 ↔ 糙米。",
    side: "清淡茉莉花茶。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Comforting Japanese zosui rice soup with chicken, set egg curds, vegetables, gentle steam"
    ),
  },
  {
    id: "sa-m",
    title: "热荞麦面配豆腐菠菜（そば）",
    desc: "清淡味噌汤底，蔬菜丰富、低钠。",
    story:
      "日本常见的荞麦面午餐版，青菜与豆腐让它更轻盈。Inspiration: inspiriert von MAFF Japan",
    target: "≈72 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
    ingredients: [
      "荞麦面（干）90 g",
      "老豆腐 200 g",
      "菠菜 200 g",
      "香菇 80 g",
      "白味噌 20 g",
      "日式高汤/清水 900 ml",
      "低钠酱油 10 ml",
    ],
    steps: [
      "高汤+味噌加热（勿大滚）。",
      "荞麦面煮 6–7 分钟，过冷水后入汤。",
      "豆腐/菠菜/香菇浸 2–3 分钟即可。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈72 g KH · 孕期✓ 全熟",
    swaps: "荞麦面 ↔ 乌冬；豆腐 ↔ 鸡肉。",
    side: "黄瓜片；温和浅渍物。",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Warm soba noodle soup with tofu cubes, spinach and mushrooms in light broth"
    ),
  },
  {
    id: "sa-a",
    title: "白菜豆腐小炖配米饭（白菜豆腐煮）",
    desc: "北方口味灵感，小火炖至柔软，素口清淡。",
    story:
      "受北方家常启发，温和不油腻。Inspiration: inspiriert von The Hong Kong Cookery",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈24 g/人",
    ingredients: [
      "大白菜 500 g",
      "老豆腐 300 g",
      "大米（生）90 g",
      "姜 8 g",
      "蒜 1 瓣",
      "低钠酱油 15 ml",
      "蔬菜高汤 250 ml",
      "玉米淀粉 8 g",
    ],
    steps: [
      "煮饭。白菜入汤小火炖 8–10 分钟。",
      "加豆腐再 3–4 分钟。",
      "勾薄芡，浇在米饭上。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 鸡肉；米饭 ↔ 糙米。",
    side: "温热黄瓜浅渍（无辣）。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Braised napa cabbage with tofu in light glossy sauce, served with rice"
    ),
  },

  // 周日
  {
    id: "so-f",
    title: "红薯豆腐粥（さつまいも粥）",
    desc: "红薯自然甜，清淡低钠。",
    story:
      "Okayu 的家常变体，柔和又暖胃。Inspiration: inspiriert von Just One Cookbook",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈20 g/人",
    ingredients: [
      "大米（生）80 g",
      "红薯 250 g",
      "绢豆腐 180 g",
      "清水 900 ml",
      "姜 6 g",
      "低钠酱油 8 ml",
    ],
    steps: [
      "米+水熬 25–30 分钟。",
      "红薯丁再煮 10–12 分钟至软。",
      "入豆腐，温和调味。",
    ],
    checks: "胃炎——柔和 · 糖友✓ ≈75 g KH · 孕期✓ 全熟",
    swaps: "红薯 ↔ 南瓜；绢豆腐 ↔ 老豆腐。",
    side: "温热焙茶（Hōjicha）。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese okayu with sweet potato cubes and silken tofu, soft steam"
    ),
  },
  {
    id: "so-m",
    title: "猪肉味噌汤 + 米饭（豚汁 Tonjiru）",
    desc: "味浓但温和；瘦猪肉与根茎蔬菜。",
    story:
      "冬季人气日式汤品，饱腹而不辣。Inspiration: inspiriert von Just One Cookbook",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "瘦猪肉 220 g",
      "白味噌 25 g",
      "土豆 200 g",
      "胡萝卜 120 g",
      "洋葱 60 g",
      "高汤/清水 900 ml",
      "大米（生）90 g",
    ],
    steps: [
      "煮饭；味噌入汤加热。",
      "猪肉小火煮 8–10 分钟至熟。",
      "蔬菜再煮 10–12 分钟至软。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 猪肉全熟",
    swaps: "猪肉 ↔ 鸡肉；米饭 ↔ 糙米。",
    side: "无辣黄瓜浅渍。",
    remind: false,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Japanese tonjiru pork miso soup with root vegetables, side bowl of rice"
    ),
  },
  {
    id: "so-a",
    title: "寿喜烧风牛肉蔬菜锅 + 小碗米饭（すき焼き風）",
    desc: "甜咸适中、低钠不腻；无生鸡蛋蘸食。",
    story:
      "寿喜烧是日本的团聚菜肴——这里不配生蛋，所有食材全熟。Inspiration: inspiriert von Just One Cookbook",
    target: "≈62 g KH gesamt (2 P.) · 蛋白质 ≈32 g/人",
    ingredients: [
      "瘦牛肉片 240 g",
      "洋葱 80 g",
      "香菇 100 g",
      "大白菜 300 g",
      "低钠酱油 20 ml",
      "味醂 10 ml",
      "清水 200 ml",
      "大米（生）80 g",
    ],
    steps: [
      "煮饭。",
      "蔬菜小火焖 6–8 分钟，加入调味汁。",
      "牛肉下锅 2–3 分钟至熟，立即食用。",
    ],
    checks:
      "胃炎——温和 · 糖友✓ ≈62 g KH · 孕期✓ 无生蛋，肉类全熟",
    swaps: "牛肉 ↔ 火鸡；米饭 ↔ 糙米。",
    side: "温和绿茶；清淡萝卜浅渍。",
    remind: true,
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Sukiyaki-style beef and vegetables in shallow pan, small bowl of rice, no raw egg"
    ),
  },
];

/* ---------- RICE COOKER（每日1道；全部食材进电饭煲） ---------- */
const RICE_COOKER = [
  {
    id: "mo-rc",
    title: "电饭煲：日式蘑菇炊饭（きのこご飯）",
    desc: "蘑菇与米同煮，鲜味十足，操作极简。",
    story:
      "Takikomi Gohan 是日本常见的混合炊饭，米与配料一起煮成熟——香气四溢。Inspiration: inspiriert von Just One Cookbook（Kinoko Gohan）& Okonomi Kitchen",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈18 g/人",
    ingredients: [
      "大米（生）90 g",
      "高汤/清水 300 ml",
      "香菇 100 g",
      "蟹味菇 80 g",
      "胡萝卜 60 g",
      "姜 6 g",
      "低钠酱油 15 ml",
      "味醂 8 ml",
    ],
    steps: [
      "淘米；内胆加入米、高汤、酱油、味醂。",
      "铺上蘑菇、胡萝卜与姜片，不搅拌。",
      "启动“白米/混合饭”程序；焖 10 分钟后翻松。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "蘑菇混合 ↔ 只用香菇；高汤 ↔ 清水。",
    side: "清爽黄瓜浅渍；绿茶温饮。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker kinoko gohan, mixed mushrooms over rice, gentle steam"
    ),
  },
  {
    id: "di-rc",
    title: "电饭煲：香菇鸡饭",
    desc: "广式灵感，鸡肉鲜嫩、低钠。",
    story:
      "改良自中式鸡肉香菇饭，用电饭煲更省事。Inspiration: inspiriert von Wok & Kin",
    target: "≈75 g KH gesamt (2 P.) · 蛋白质 ≈34 g/人",
    ingredients: [
      "大米（生）90 g",
      "清水 320 ml",
      "鸡胸肉 240 g",
      "香菇（泡发）120 g",
      "姜 8 g",
      "低钠酱油 20 ml",
      "香油 5 ml",
    ],
    steps: [
      "淘米后入内胆加水。",
      "鸡丁拌酱油/香油/姜，连同香菇铺在米上。",
      "启动程序；焖 10 分钟后拌匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈75 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 老豆腐；清水 ↔ 清淡高汤。",
    side: "清蒸小白菜。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker chicken and shiitake rice, glossy grains, no chili"
    ),
  },
  {
    id: "mi-rc",
    title: "电饭煲：豆芽拌饭（콩나물밥）",
    desc: "韩式黄豆芽米饭，清爽多汁。",
    story:
      "豆芽拌饭是韩国经典家常，米与豆芽同煮，酱汁另给。Inspiration: inspiriert von My Korean Kitchen & Korean Bapsang",
    target: "≈68 g KH gesamt (2 P.) · 蛋白质 ≈22 g/人",
    ingredients: [
      "大米（生）90 g",
      "清水 320 ml",
      "黄豆芽 250 g",
      "鸡胸肉片 160 g",
      "低钠酱油 15 ml",
      "香油 5 ml",
    ],
    steps: [
      "淘米加水入锅。",
      "铺上鸡肉与豆芽（不搅拌）。",
      "启动程序；焖 10 分钟后拌匀。温和蘸汁另给。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈68 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；香油 ↔ 菜籽油。",
    side: "清淡黄瓜浅渍（无辣）。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker kongnamulbap, soybean sprouts on rice, clean minimal"
    ),
  },
  {
    id: "do-rc",
    title: "电饭煲：三文鱼炊饭（鮭の炊き込みご飯）",
    desc: "米、蘑菇与三文鱼同煮——香气四溢。",
    story:
      "日式 Sake Takikomi Gohan – 一锅到位，工作日晚餐友好。Inspiration: inspiriert von Japanese Cooking 101 & Just One Cookbook",
    target: "≈72 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "大米（生）90 g",
      "高汤/清水 320 ml",
      "三文鱼柳（去皮）220 g",
      "香菇 80 g",
      "低钠酱油 15 ml",
      "味醂 8 ml",
      "姜 6 g",
    ],
    steps: [
      "淘米后加高汤/酱油/味醂。",
      "铺香菇与三文鱼。",
      "启动程序；焖 10 分钟，将三文鱼拨散拌匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈72 g KH · 孕期✓ 鱼全熟",
    swaps: "三文鱼 ↔ 鳕鱼；高汤 ↔ 清水。",
    side: "清蒸西兰花。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker salmon takikomi gohan, flaked salmon, mushrooms, steaming"
    ),
  },
  {
    id: "fr-rc",
    title: "电饭煲：南瓜香菇糙米饭",
    desc: "中式灵感，软糯清甜，低钠。",
    story:
      "南瓜拌饭在华语圈很受欢迎；电饭煲版本更省心。Inspiration: inspiriert von What To Cook Today & Greedy Girl Gourmet",
    target: "≈78 g KH gesamt (2 P.) · 蛋白质 ≈18 g/人",
    ingredients: [
      "糙米（生）90 g",
      "清水/清淡高汤 360 ml",
      "南瓜丁 300 g",
      "香菇 80 g",
      "老豆腐 150 g",
      "低钠酱油 10 ml",
    ],
    steps: [
      "淘米后入锅加水/高汤。",
      "铺南瓜、豆腐、香菇；淋少许酱油。",
      "启动程序；焖 10 分钟，轻轻翻匀。",
    ],
    checks: "胃炎——软和 · 糖友✓ ≈78 g KH · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 鸡胸肉丁；糙米 ↔ 白米。",
    side: "温热茉莉花茶。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker brown rice with pumpkin and tofu, cozy and mild"
    ),
  },
  {
    id: "sa-rc",
    title: "电饭煲：鸡肉红薯饭（고구마밥）",
    desc: "韩式红薯饭，柔和带甜味。",
    story:
      "Goguma-bap 是常见的电饭煲米饭做法，这里加入鸡胸增蛋白。Inspiration: inspiriert von Maangchi",
    target: "≈80 g KH gesamt (2 P.) · 蛋白质 ≈28 g/人",
    ingredients: [
      "大米（生）90 g",
      "清水 320 ml",
      "红薯 250 g",
      "鸡胸肉 200 g",
      "低钠酱油 12 ml",
    ],
    steps: [
      "淘米入锅加水。",
      "铺红薯与鸡丁；淋酱油。",
      "启动程序；焖 10 分钟后拌匀。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈80 g KH · 孕期✓ 鸡肉全熟",
    swaps: "红薯 ↔ 南瓜；鸡肉 ↔ 豆腐。",
    side: "温和白萝卜浅渍。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker sweet potato rice with chicken, homestyle and mild"
    ),
  },
  {
    id: "so-rc",
    title: "电饭煲：鸡肉牛蒡炊饭（鶏ごぼう炊き込みご飯）",
    desc: "日式混合炊饭，鸡肉与牛蒡的泥土香。",
    story:
      "鸡肉牛蒡炊饭是居家经典；把食材铺在米上一起煮即可。Inspiration: inspiriert von Just One Cookbook（Gobo & Miso Takikomi Gohan）",
    target: "≈70 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "大米（生）90 g",
      "高汤/清水 320 ml",
      "鸡胸肉 220 g",
      "牛蒡 80 g",
      "胡萝卜 60 g",
      "低钠酱油 15 ml",
      "味醂 8 ml",
    ],
    steps: [
      "淘米后加入高汤/酱油/味醂。",
      "铺鸡肉、牛蒡与胡萝卜；启动程序。",
      "焖 10 分钟后翻松即可。",
    ],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "牛蒡 ↔ 西芹；鸡肉 ↔ 豆腐。",
    side: "清爽黄瓜浅渍；绿茶温饮。",
    prompt: buildPrompt(
      PROMPT_HEADER,
      "Rice cooker chicken and burdock takikomi gohan, earthy and cozy"
    ),
  },
];

/* ---------- 周工具 ---------- */
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
        ["f", "m", "a", "rc"].indexOf(a.id.split("-")[1]) -
        ["f", "m", "a", "rc"].indexOf(b.id.split("-")[1])
    )
  );
  return map;
};

/* ---------- 购物清单 (只统计 21 主菜；与 Woche-5/6 一致) ---------- */
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
  protein: ["鸡", "火鸡", "牛", "猪", "鳟", "鳕", "三文", "鱼", "tofu", "豆腐", "蛋", "garnelen", "虾", "mandu"],
  veg: ["胡萝卜", "西葫芦", "小白菜", "菠菜", "香菇", "金针菇", "西兰花", "大白菜", "洋葱", "彩椒", "白萝卜", "葱", "黄瓜", "番茄", "土豆", "daikon"],
  staple: ["米", "大米", "糯米", "多谷米", "乌冬", "荞麦面", "素面", "面条", "米粉", "糙米", "意面", "大麦", "gerste", "reis"],
  season: ["昆布", "海苔", "高汤", "蔬菜高汤", "sojasauce", "味噌", "香油", "橄榄油", "味醂", "蜂蜜", "盐", "芝麻", "蒜", "姜", "水", "茶", "裙带菜", "米醋"],
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
    "蛋白/鱼/豆腐": formatBucket(b.protein),
    "蔬菜/菌菇": formatBucket(b.veg),
    "米/面/主食": formatBucket(b.staple),
    "海藻/高汤/调味": formatBucket(b.season),
  };
}
const LIST_SUMMARY = buildListSummary();

/* ---------- 图片本地存储 ---------- */
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
const dayNameI18n = (id, t) => ({ mo: "周一", di: "周二", mi: "周三", do: "周四", fr: "周五", sa: "周六", so: "周日" })[id.split("-")[0]];
const mealTitleI18n = (id, t) => {
  const k = id.split("-")[1];
  if (k === "rc") return "电饭煲";
  return t.mealTitle[k];
};
const mealLabelI18n = (id, t) => {
  const k = id.split("-")[1];
  if (k === "rc") return "电饭煲";
  return t.meal[k];
};

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
            <ImageUpload storageKey={recipeImgKey} label={`上传菜图: ${title}`} />
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
              <b>目标:</b> {target}
            </div>
            <div>
              <b>提示:</b> {checks}
            </div>
            <div>
              <b>{t.sections.side}:</b> {side}
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
                💊 与餐同服 Metformin。
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
              <h3 style={{ fontSize: 16, margin: "8px 0", color: COLORS.sky }}>{t.sections.ingredients} (2 人)</h3>
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
                <b>{t.sections.swaps}:</b> {swaps}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- Kochbuch ---------- */
function Cookbook({ t, lang }) {
  // 合并 DATA + RICE_COOKER，用于周览
  const weekly = useMemo(() => {
    const merged = [...DATA, ...RICE_COOKER];
    return groupByDay(merged);
  }, []);
  return (
    <div id="cookbook-root">
      {/* 封面 + 周览 */}
      <div className="page" style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, ...cardPanelStyle }}>
            <h1 style={{ margin: 0, color: COLORS.emerald }}>{UI_TITLES.main}</h1>
            <p style={{ marginTop: 6, color: COLORS.neutral }}>
              周始于 {meta.startDate} — <b>模式: Non-Strict (balanced)</b>; 重点 CN/JP/KR，清淡低钠，孕期安全；糖友：每餐(2人) 60–90 g 碳水。
            </p>
            <ImageUpload storageKey={getImageKey("cover")} label="上传封面图" />
          </div>
          <div style={{ flex: 2, ...cardMainStyle }}>
            <h2 style={{ marginTop: 0, color: COLORS.indigo }}>周览</h2>
            <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 8, fontSize: 14 }}>
              {DAYS_ORDER.map((d) => (
                <div key={d} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 10, background: COLORS.panelBG80 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{DAY_NAME[d]}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                    {safeArr(weekly[d]).map((m) => {
                      const title = toText(m?.title);
                      const target = toText(m?.target);
                      return (
                        <div key={m.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 8 }}>
                          <div style={{ color: COLORS.sky, fontSize: 12 }}>{mealLabelI18n(m.id, t)}</div>
                          <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
                          <div style={{ color: COLORS.neutral, fontSize: 12, marginTop: 2 }}>🌾 {target}{m?.remind ? " · 💊" : ""}</div>
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

      {/* 主菜 21 页 */}
      {DATA.map((r) => (
        <RecipeCard key={r.id} r={r} t={t} lang={lang} />
      ))}

      {/* 电饭煲 7 页 */}
      {RICE_COOKER.map((r) => (
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
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>自动从本周（自 {meta.startDate} 起）的 21 道主菜计算（电饭煲菜不计入，需可选再启用）。</p>
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
            提示：使用低钠酱油；海藻（裙带菜/海苔）少量；所有食材充分加热至全熟。
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Root ---------- */
export default function Woche8_2025_11_17_ZH() {
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
    if (!/^Woche 8 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");

    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    if (RICE_COOKER.length !== 7) throw new Error("RICE_COOKER length must be 7");

    const all = [...DATA, ...RICE_COOKER];
    const ids = new Set(all.map((r) => r.id));
    if (ids.size !== all.length) throw new Error("IDs not unique across DATA + RICE_COOKER");

    DATA.forEach((r) => {
      const type = (r?.id || "").split("-")[1];
      const isLunch = type === "m";
      const isBreakfastOrDinner = type === "f" || type === "a";
      if (isLunch && r.remind) throw new Error("Mittagessen ohne Medikamenten-Reminder");
      if (isBreakfastOrDinner && !r.remind) throw new Error("Frühstück/Abendessen ohne Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zu wenige Zutaten: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Zu wenige Schritte: ${r.id}`);
    });

    RICE_COOKER.forEach((r) => {
      if (r.remind) throw new Error("Rice cooker cards should not show medication reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zu wenige Zutaten (RC): ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Zu wenige Schritte (RC): ${r.id}`);
    });

    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY groups missing");

    console.log("[Moving Kitchen Tales] All tests passed (ZH JSX).");
  } catch (e) {
    console.error("[Moving Kitchen Tales] Tests failed:", e);
  }
}
