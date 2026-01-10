/* eslint-disable no-console */
/**
 * 第1周 (ZH) – Plan im Stil von Woche 4 (Tabs, TopBar, Wochenübersicht, Rezeptseiten, Einkaufsliste)
 * - A4: 菜谱 横向，购物清单 纵向
 * - 顶栏按钮：PDF 生成、HTML 导出、打印（无“HTML öffnen”）
 * - 每道菜单独一页；左侧信息栏 ≤1/3，右侧菜谱 ≥2/3
 * - DALL·E Prompts 不渲染（仅保留在代码中）
 * - 封面 & 每菜图片上传（FileReader）持久化到 localStorage
 * - 午餐无用药提醒；早餐/晚餐有提醒
 * - 食材/步骤均有 Array-Guard，避免对非数组执行 .map
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

// ---------- Meta ----------
export const meta = {
  title: "第1周",
  startDate: "2025-09-29",
  id: "woche-1-2025-09-29-zh",
  lang: "zh",
  sidebar: "[ZH] 第1周 (2025-09-29)",
};
const FILE_BASE = "第1周 2025-09-29";

// ---------- UI 标题/颜色 ----------
const UI_TITLES = {
  main: "吉卜力厨房 – 第1周",
  list: "吉卜力厨房 – 购物清单 – 第1周",
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

// ---------- Prompt Header（仅在代码保留） ----------
const PROMPT_HEADER =
  "Use exactly two cats only: Fleur (small, playful, European Shorthair, grey-black tabby) and Finn (larger, reserved prankster, European Shorthair, grey-black tabby). No third cat, no extra animals. Chinese woman (traditional or sporty-modern; occasional Princess Mononoke aura). Western man with short fauxhawk. Studio Ghibli watercolor vibe, warm golden light, gentle magical steam/pot/vegetable spirits. Pregnancy-safe food only (no raw fish/eggs). A4 landscape page; manga/cartoon panel with generous margins; image intended to occupy ≤ one-third of the page width on the left.";

const buildPrompt = (a, b) => `${a}\n${b}`;

// ---------- Guards ----------
const asList = (v, lang = "zh") => {
  try {
    const out = pickList(v, lang);
    return Array.isArray(out) ? out : [];
  } catch {
    return [];
  }
};
const safeArr = (v) => (Array.isArray(v) ? v : []);
const safeMap = (v, fn) => (Array.isArray(v) ? v : []).map(fn);

// ---------- DATA（21道菜，按 mo/di/… × f/m/a） ----------
/**
 * id: mo|di|mi|do|fr|sa|so - f|m|a
 * 文字字段为中文；ingredients/steps 为字符串数组
 * prompt 不渲染（仅代码内）
 */
const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "三文鱼菠菜米粥（お粥）",
    desc: "日式 Okayu 风，配熟三文鱼与菠菜；灵感来自 Just One Cookbook。",
    story: "Okayu 在日本常作早餐或“舒心粥”。凉意初上时，来一碗暖胃顺口。",
    target: "≈70 g 碳水（2 人）· 蛋白质 ≈20–25 g/人",
    ingredients: [
      "大米（生） 70 g",
      "水 700 ml",
      "三文鱼（熟撕） 80 g",
      "南瓜 200 g",
      "菠菜 100 g",
      "姜 5 g",
      "低钠酱油 1 TL",
    ],
    steps: [
      "米+水+南瓜小火煮 30–35 分钟至软糯。",
      "放入菠菜稍焖 1 分钟。",
      "加入三文鱼与姜，2–3 分钟；温和调味。",
    ],
    checks: "胃炎✓ · 糖友✓（≈70 g 碳水）· 孕期✓（鱼已全熟）",
    swaps: "菠菜 ↔ 上海青；三文鱼 ↔ 鳕鱼",
    side: "温水/大麦茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Cozy okayu bowl, salmon flakes, spinach; soft steam spirits; Fleur pawing; Finn watching"),
  },
  {
    id: "mo-m",
    title: "清水鸡胸配青江菜（白切鸡风·不辣）",
    desc: "微沸下水煮鸡胸，口味极温和；配青江菜与白米；灵感来自 Made With Lau。",
    story: "水煮鸡胸鲜嫩易消化，适合需要清淡的一天。",
    target: "≈80 g 碳水（白米 100 g 生）",
    ingredients: [
      "鸡胸肉 300 g",
      "水 1000 ml",
      "姜 20 g",
      "葱 10 g",
      "大米（生） 100 g",
      "青江菜 300 g",
      "低钠酱油 1 EL",
      "香油 0.5 TL",
    ],
    steps: [
      "鸡胸在微沸水中 12–14 分钟，离火静置 5 分钟。",
      "煮饭；青江菜蒸/焯 2–3 分钟。",
      "切片，少量调味即可。",
    ],
    checks: "胃炎✓ · 糖友✓（≈80 g 碳水）· 孕期✓",
    swaps: "鸡胸 ↔ 火鸡胸",
    side: "黄瓜片",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Poached chicken with bok choy, gentle broth; warm light; Fleur sneaks; Finn noble"),
  },
  {
    id: "mo-a",
    title: "海带汤鳕鱼 + 米饭（미역국）",
    desc: "韩式若布汤，加入鳕鱼，温和不腻；灵感来自 Maangchi。",
    story: "미역국 富含营养、易消化，是常见的家常汤。",
    target: "≈65 g 碳水（白米 80 g 生）",
    ingredients: [
      "裙带菜（干） 6 g",
      "鳕鱼 260 g",
      "清汤 800 ml",
      "香油 0.5 TL",
      "低钠酱油 1 TL",
      "大米（生） 80 g",
      "姜 5 g",
    ],
    steps: [
      "裙带菜泡发。",
      "少许香油拌炒后加清汤。",
      "下鳕鱼煮 5–6 分钟；温和调味。",
    ],
    checks: "胃炎✓ · 糖友✓（≈65 g 碳水）· 孕期✓（碘适量）",
    swaps: "鳕鱼 ↔ 明太鱼",
    side: "西兰花焯水",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean miyeokguk with cod; seaweed-steam spirit; Fleur peeks; Finn tail like algae"),
  },

  // 周二
  {
    id: "di-f",
    title: "南瓜米粥（호박죽）",
    desc: "韩式丝滑南瓜粥，柔和暖胃；灵感来自 Mom’s Korean Recipes。",
    story: "微甜、细腻，适合需要安稳的一天。",
    target: "≈74 g 碳水（2 人）",
    ingredients: ["南瓜 400 g", "大米（生） 60 g", "水 800 ml", "盐 少许"],
    steps: [
      "南瓜煮软打细。",
      "加米同煮 30 分钟，微咸调味。",
      "视需要加水调整稠度。",
    ],
    checks: "胃炎✓ · 糖友✓（≈74 g 碳水）· 孕期✓",
    swaps: "大米 ↔ 小米/小米粥",
    side: "巴氏杀菌酸奶 1–2 EL（可选）",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Sunny pumpkin porridge; leaf spirit; Fleur plays; Finn lounges"),
  },
  {
    id: "di-m",
    title: "鸡肉菠菜荞麦面清汤（温そば）",
    desc: "日式荞麦面配清淡汤底、鸡肉与菠菜；灵感来自 Just One Cookbook。",
    story: "荞麦带坚果香气，清汤更易消化。",
    target: "≈72 g 碳水（荞麦面 120 g）",
    ingredients: [
      "荞麦面（干） 120 g",
      "鸡胸肉 200 g",
      "菠菜 150 g",
      "清汤（昆布/水） 700 ml",
      "低钠酱油 1–2 TL",
    ],
    steps: [
      "汤底小火 10 分钟。",
      "鸡肉煮 6–7 分钟至全熟。",
      "面条另煮冲洗，入汤；菠菜稍焖；调味。",
    ],
    checks: "胃炎✓ · 糖友✓（≈72 g 碳水）· 孕期✓",
    swaps: "荞麦面 ↔ 乌冬",
    side: "白萝卜焯水",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Rustic soba with chicken & spinach; steam そば; Fleur taps noodle; Finn aloof"),
  },
  {
    id: "di-a",
    title: "姜葱清蒸鳕鱼 + 米饭（清蒸鳕鱼）",
    desc: "中式清蒸做法，细嫩少油；灵感来自 Made With Lau。",
    story: "清蒸保留鱼的水润口感，晚餐更轻松。",
    target: "≈69 g 碳水（白米 90 g 生）",
    ingredients: [
      "鳕鱼 300 g",
      "姜 10 g",
      "葱 15 g",
      "低钠酱油 1–2 TL",
      "香油 0.5 TL",
      "大米（生） 90 g",
      "芥蓝/西兰花 300 g",
    ],
    steps: [
      "鱼置姜葱上蒸 8–10 分钟至全熟。",
      "酱油+香油调味；配米与蔬菜。",
      "整体口味清淡。",
    ],
    checks: "胃炎✓ · 糖友✓（≈69 g 碳水）· 孕期✓",
    swaps: "鳕鱼 ↔ 明太鱼",
    side: "温水",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger scallion; steam 鳕; Fleur reflection; Finn calm"),
  },

  // 周三
  {
    id: "mi-f",
    title: "香菇嫩豆腐粥（粥）",
    desc: "非常温和的香菇豆腐米粥；灵感来自 The Woks of Life。",
    story: "细腻、暖和，适合清静的早晨。",
    target: "≈63 g 碳水（2 人）",
    ingredients: [
      "大米（生） 70 g",
      "水 800 ml",
      "香菇 60 g",
      "内酯豆腐 150 g",
      "胡萝卜 100 g",
      "低钠酱油 1 TL",
    ],
    steps: ["小火 30–35 分钟。", "蔬菜与豆腐再煮 5 分钟。", "温和调味。"],
    checks: "胃炎✓ · 糖友✓（≈63 g 碳水）· 孕期✓",
    swaps: "大米 ↔ 小米/糙米",
    side: "海苔 适量",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Creamy mushroom–tofu congee; steam 豆; Fleur behind bowl; Finn statue-like"),
  },
  {
    id: "mi-m",
    title: "温和拌饭（无辣）",
    desc: "韩式拌饭元素，但不辣；鸡肉/蔬菜全熟；灵感来自 My Korean Kitchen。",
    story: "全部熟食，温和而有滋味。",
    target: "≈69 g 碳水（白米 90 g 生）",
    ingredients: [
      "大米（生） 90 g",
      "鸡胸肉 200 g",
      "菠菜 100 g",
      "西葫芦 100 g",
      "胡萝卜 100 g",
      "豆芽 100 g",
      "鸡蛋 2 Stück（全熟蛋饼）",
      "香油 0.5 TL",
      "低钠酱油 1–2 TL",
    ],
    steps: [
      "蔬菜短时焯/蒸。",
      "米饭装碗，配菜码好；温和拌匀。",
      "鸡蛋完全凝固。",
    ],
    checks: "胃炎✓ · 糖友✓（≈69 g 碳水）· 孕期✓（蛋全熟）",
    swaps: "鸡胸 ↔ 豆腐",
    side: "黄瓜片",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Mild bibimbap no chili; steam 비빔밥; Fleur guards carrot; Finn’s whiskers glow"),
  },
  {
    id: "mi-a",
    title: "日式土豆牛肉（肉じゃが）",
    desc: "慢火清淡炖煮，家常暖胃；灵感来自 Just One Cookbook。",
    story: "下班后的柔和安慰菜，软糯易消化。",
    target: "≈75–80 g 碳水（2 人）",
    ingredients: [
      "瘦牛肉 200 g",
      "土豆 400 g",
      "胡萝卜 150 g",
      "洋葱 60 g",
      "昆布清汤 600 ml",
      "低钠酱油 1 EL",
      "糖 0.5 TL（可选）",
    ],
    steps: ["小火炖 20–25 分钟至软。", "略收汁。", "出锅前再调味。"],
    checks: "胃炎✓ · 糖友✓（≈75–80 g 碳水）· 孕期✓",
    swaps: "牛肉 ↔ 鸡肉/豆腐",
    side: "低盐味噌汤 小碗",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Homey nikujaga; steam 肉; Fleur chases potato spirit; Finn supervises"),
  },

  // 周四
  {
    id: "do-f",
    title: "味噌汤 + 豆腐若布 + 米饭（味噌汁）",
    desc: "少量若布、清淡味噌；灵感来自 Just One Cookbook。",
    story: "日本常见的清淡早餐组合。",
    target: "≈62 g 碳水（白米 80 g 生）",
    ingredients: [
      "大米（生） 80 g",
      "高汤/水 500 ml",
      "淡味味噌 20 g",
      "老豆腐 150 g",
      "裙带菜（干） 3 g",
      "葱 10 g",
    ],
    steps: ["加热汤底，下豆腐/若布稍焖。", "离火化开味噌。", "配米饭。"],
    checks: "胃炎✓ · 糖友✓（≈62 g 碳水）· 孕期✓（碘适量）",
    swaps: "白米 ↔ 糙米",
    side: "清蒸菠菜",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Gentle miso soup; steam 味; Fleur reflection; Finn wave-tail"),
  },
  {
    id: "do-m",
    title: "罗汉斋（蔬菜豆腐）",
    desc: "中式灵感的清淡蔬菜豆腐小炖；灵感来自 The Woks of Life。",
    story: "多种蔬菜，温和汤汁，饱腹不腻。",
    target: "≈62 g 碳水（白米 80 g 生）",
    ingredients: [
      "老豆腐 300 g",
      "大白菜 300 g",
      "蘑菇 150 g",
      "胡萝卜 100 g",
      "白萝卜 200 g",
      "清汤 500 ml",
      "低钠酱油 1–2 TL",
      "淀粉 1 TL",
      "大米（生） 80 g",
    ],
    steps: ["豆腐+蔬菜炖 10–12 分钟。", "少量勾薄芡。", "配米饭。"],
    checks: "胃炎✓ · 糖友✓（≈62 g 碳水）· 孕期✓",
    swaps: "豆腐 ↔ 鸡胸",
    side: "白萝卜焯水",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Buddha’s delight; steam 斋; Fleur sniffs mushroom; Finn aloof"),
  },
  {
    id: "do-a",
    title: "宴席面·清汤素面（잔치국수）",
    desc: "韩式素面清汤版，配鸡肉与蔬菜；灵感来自 Maangchi。",
    story: "清爽易消化，晚餐不负担。",
    target: "≈73–78 g 碳水（2 人）",
    ingredients: [
      "素面/挂面 100 g",
      "清汤 700 ml",
      "鸡胸肉 150 g",
      "西葫芦 150 g",
      "胡萝卜 100 g",
      "蘑菇 80 g",
      "葱 20 g",
      "低钠酱油 1–2 TL",
    ],
    steps: [
      "蔬菜 3–4 分钟；鸡肉 6–7 分钟。",
      "面条另煮，入汤短焖。",
      "温和调味并装碗。",
    ],
    checks: "胃炎✓ · 糖友✓（≈73–78 g 碳水）· 孕期✓",
    swaps: "素面 ↔ 乌冬",
    side: "叶菜焯水",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Festive noodle bowl; steam 잔치; Fleur plays with noodle; Finn watches"),
  },

  // 周五
  {
    id: "fr-f",
    title: "韩式蒸蛋 + 米饭（계란찜）",
    desc: "细腻全熟的蒸蛋，配米与红薯，超温和。",
    story: "蒸蛋口感如布丁，但蛋必须完全凝固。",
    target: "≈81 g 碳水（2 人）",
    ingredients: [
      "鸡蛋 4 Stück",
      "水/清汤 300 ml",
      "大米（生） 70 g",
      "红薯 150 g",
      "葱 10 g",
    ],
    steps: ["蒸蛋 12–15 分钟至完全凝固。", "煮饭与红薯。", "撒葱花上桌。"],
    checks: "胃炎✓ · 糖友✓（≈81 g 碳水）· 孕期✓（蛋全熟）",
    swaps: "红薯 ↔ 南瓜",
    side: "紫菜碎（Kim）",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Silky steamed egg; steam 계; Fleur ears peek; Finn whiskers glow"),
  },
  {
    id: "fr-m",
    title: "鸡肉碎盖饭（鶏そぼろ丼）",
    desc: "日式鸡肉碎配蔬菜盖饭，微甜但很温和。",
    story: "便当风格在家复刻，色彩丰富，调味清淡。",
    target: "≈85 g 碳水（2 人）",
    ingredients: [
      "大米（生） 90 g",
      "鸡肉糜 250 g",
      "豌豆 150 g",
      "胡萝卜 100 g",
      "低钠酱油 1–2 TL",
      "糖 0.5 TL（可选）",
      "水 50 ml",
    ],
    steps: ["鸡糜加水炒至全熟，温和调味。", "蔬菜同炒。", "铺在米饭上。"],
    checks: "胃炎✓ · 糖友✓（≈85 g 碳水）· 孕期✓",
    swaps: "豌豆 ↔ 毛豆",
    side: "黄瓜片",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Soboro stripes; steam 丼; Fleur eyes peas; Finn fake-sleeps"),
  },
  {
    id: "fr-a",
    title: "清蒸虾豆腐 + 青江菜",
    desc: "中式清蒸思路，鲜嫩少油；配米饭。",
    story: "蒸法省心省洗，周五晚餐轻负担。",
    target: "≈62–65 g 碳水（2 人）",
    ingredients: [
      "虾仁 300 g",
      "老豆腐 300 g",
      "青江菜 300 g",
      "姜 10 g",
      "低钠酱油 1 TL",
      "大米（生） 80 g",
    ],
    steps: [
      "豆腐+虾 8–10 分钟蒸；青江菜另焯 2–3 分钟。",
      "温和调味；配米饭。",
      "可加少许姜提香。",
    ],
    checks: "胃炎✓ · 糖友✓（≈62–65 g 碳水）· 孕期✓",
    swaps: "虾 ↔ 鳕鱼",
    side: "清汤一小碗",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Shrimp on tofu; steam 虾; Fleur gazes; Finn guards"),
  },

  // 周六
  {
    id: "sa-f",
    title: "小米南瓜粥",
    desc: "小米与南瓜慢煮，更软更顺口。",
    story: "周末清晨来一碗，暖胃安心。",
    target: "≈62 g 碳水（2 人）",
    ingredients: ["小米 60 g", "南瓜 300 g", "水 900 ml", "盐 少许"],
    steps: ["小米+南瓜 35–40 分钟小火煮软。", "微咸调味。", "按需调稠度。"],
    checks: "胃炎✓ · 糖友✓（≈62 g 碳水）· 孕期✓",
    swaps: "小米 ↔ 白米",
    side: "焯软菠菜",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Golden millet–pumpkin congee; steam 粥; Fleur bats seed; Finn naps"),
  },
  {
    id: "sa-m",
    title: "温和酱油炖鸡（土豆胡萝卜）（닭찜）",
    desc: "韩式灵感，无辣轻芡，蔬菜自然甜。",
    story: "家常小炖，软糯下饭。",
    target: "≈68–72 g 碳水（2 人）",
    ingredients: [
      "鸡肉 400 g",
      "土豆 300 g",
      "胡萝卜 150 g",
      "洋葱 40 g",
      "清汤 500 ml",
      "低钠酱油 1–2 TL",
      "淀粉 1 TL",
    ],
    steps: ["小火炖 20–25 分钟至软。", "少量勾芡。", "温和调味。"],
    checks: "胃炎✓ · 糖友✓（≈68–72 g 碳水）· 孕期✓",
    swaps: "部分土豆 ↔ 红薯",
    side: "紫菜拌（无醋）",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Family pot dak-jjim; steam 닭; Fleur hides; Finn peeks"),
  },
  {
    id: "sa-a",
    title: "锡纸烤三文鱼（蘑菇·西葫芦）",
    desc: "日式灵感，烤箱锡纸包，鲜嫩多汁。",
    story: "收拾轻松，口感细嫩，晚餐好选择。",
    target: "≈69 g 碳水（白米 90 g 生）",
    ingredients: [
      "三文鱼 300 g",
      "蘑菇 150 g",
      "西葫芦 200 g",
      "洋葱 40 g",
      "低钠酱油 1 TL",
      "大米（生） 90 g",
    ],
    steps: ["锡纸包 190°C 烤 15–18 分钟。", "清淡调味。", "配米饭。"],
    checks: "胃炎✓ · 糖友✓（≈69 g 碳水）· 孕期✓",
    swaps: "三文鱼 ↔ 鳟鱼",
    side: "清蒸西兰花",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Foil-baked salmon; steam 焼; Fleur sniffs; Finn judges"),
  },

  // 周日
  {
    id: "so-f",
    title: "小饭团（三文鱼·黄瓜）（おにぎり）",
    desc: "便携温和的小三角饭团，适合早午餐。",
    story: "简单却满足，经典常备。",
    target: "≈69 g 碳水（白米 90 g 生）",
    ingredients: ["大米（生） 90 g", "三文鱼碎 100 g", "黄瓜 100 g", "海苔 2 Blatt"],
    steps: ["煮饭；分成 4 个迷你饭团。", "填入三文鱼与黄瓜。", "外包海苔。"],
    checks: "胃炎✓ · 糖友✓（≈69 g 碳水）· 孕期✓",
    swaps: "黄瓜 ↔ 熟牛油果",
    side: "温和味噌汤（可选）",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Triangle onigiri; steam 鮭; Fleur pats rice spirit; Finn whiskers curl"),
  },
  {
    id: "so-m",
    title: "南瓜豆腐煮物 · 温和（かぼちゃと豆腐の煮物）",
    desc: "日式煮物，南瓜软甜、豆腐滑嫩；配小份米饭。",
    story: "轻微光泽的薄芡，入口柔和。",
    target: "≈68–72 g 碳水（南瓜 300 g + 白米 50 g 生）",
    ingredients: [
      "南瓜（kabocha） 300 g",
      "老豆腐 300 g",
      "高汤/水 500 ml",
      "低钠酱油 1–2 TL",
      "姜 5 g",
      "淀粉 1 TL",
      "大米（生） 50 g",
    ],
    steps: [
      "南瓜小火煮 12–15 分钟至软。",
      "下豆腐 3–4 分钟。",
      "温和调味，薄芡收汁；配小份米饭。",
    ],
    checks: "胃炎✓ · 糖友✓（≈68–72 g 碳水）· 孕期✓",
    swaps: "豆腐 ↔ 鳕鱼丁",
    side: "焯水菠菜/水菜",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Kabocha + tofu simmer; steam 煮; Fleur meets pumpkin spirit; Finn guards pot"),
  },
  {
    id: "so-a",
    title: "亲子丼（蛋全熟）",
    desc: "经典鸡蛋鸡肉盖饭；蛋需完全凝固。",
    story: "温柔的家常味，但安全为先。",
    target: "≈69 g 碳水（白米 90 g 生）",
    ingredients: [
      "大米（生） 90 g",
      "去皮鸡腿 250 g",
      "洋葱 80 g",
      "鸡蛋 3 Stück",
      "清汤 250 ml",
      "低钠酱油 1 EL",
      "糖 0.5 TL（可选）",
    ],
    steps: ["洋葱+鸡肉煮 8–10 分钟。", "倒入蛋液并完全凝固。", "浇在米饭上。"],
    checks: "胃炎✓ · 糖友✓（≈69 g 碳水）· 孕期✓（蛋全熟）",
    swaps: "部分米饭 ↔ 花椰菜米",
    side: "清蒸菠菜",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Oyakodon fully set egg; steam 丼; Fleur guards; Finn smirks"),
  },
];

// ---------- 周视图辅助 ----------
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME = { mo: "周一", di: "周二", mi: "周三", do: "周四", fr: "周五", sa: "周六", so: "周日" };
const groupByDay = (arr) => {
  const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
  (Array.isArray(arr) ? arr : []).forEach((r) => {
    const d = (r?.id || "").split("-")[0];
    if (map[d]) map[d].push(r);
  });
  Object.values(map).forEach((list) =>
    list.sort(
      (a, b) =>
        ["f", "m", "a"].indexOf((a?.id || "").split("-")[1]) -
        ["f", "m", "a"].indexOf((b?.id || "").split("-")[1])
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
  const m = String(item || "").match(/^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|l|EL|TL|Stück)$/i);
  if (!m) return null;
  const name = normalizeName(m[1]).trim();
  let qty = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  if ((unit || "").toLowerCase() === "l") {
    qty *= 1000;
    unit = "ml";
  }
  return { name, qty, unit };
}
const groupMap = {
  protein: ["鸡", "鸡胸", "火鸡", "牛", "三文鱼", "鳕鱼", "明太鱼", "虾", "豆腐", "鸡蛋", "毛豆", "帕玛森"],
  veg: ["胡萝卜", "西葫芦", "青江菜", "大白菜", "菠菜", "香菇", "蘑菇", "西兰花", "芥蓝", "大葱", "洋葱", "白萝卜", "葱", "土豆", "红薯", "南瓜", "黄瓜"],
  staple: ["米", "寿司米", "糙米", "小米", "荞麦面", "素面", "乌冬", "海苔"],
  season: ["裙带菜", "海苔", "高汤", "清汤", "昆布", "酱油", "味噌", "香油", "淀粉", "盐", "糖", "水", "姜"],
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

// ---------- i18n 辅助 ----------
const dayNameI18n = (id, t) => t.day[id.split("-")[0]];
const mealTitleI18n = (id, t) => t.mealTitle[id.split("-")[1]];
const mealLabelI18n = (id, t) => t.meal[id.split("-")[1]];

// ---------- 菜谱卡片 ----------
function RecipeCard({ r, t, lang }) {
  const recipeImgKey = getImageKey(`recipe::${r.id}`);
  const img = readLocalImage(recipeImgKey);
  const ingredients = asList(r?.ingredients, lang);
  const steps = asList(r?.steps, lang);
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
              <b>目标：</b> {pickText(r.target, lang)}
            </div>
            <div>
              <b>检查点：</b> {pickText(r.checks, lang)}
            </div>
            <div>
              <b>{t.sections.side}：</b> {pickText(r.side, lang)}
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
          <h2 style={{ marginTop: 0 }}>{pickText(r.title, lang)}</h2>
          <p style={{ marginTop: -6, marginBottom: 8, color: COLORS.neutral, fontSize: 12 }}>{pickText(r.story, lang)}</p>
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
                <b>{t.sections.swaps}：</b> {pickText(r.swaps, lang)}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// ---------- 整周菜谱（封面+周览+全部菜谱） ----------
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
              自 {meta.startDate} 起的一周 —— <b>模式：Non-Strict（均衡）</b>；以中/日/韩为主，温和调味、低钠酱油、孕期友好；糖尿病：每餐（2人）60–90 g 碳水。
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
                        const title = pickText(m?.title, lang) ?? "";
                        const target = pickText(m?.target, lang) ?? "";
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
  const groups = Object.entries(LIST_SUMMARY);
  return (
    <div id="list-root" ref={rootRef}>
      <div className="page" style={{ padding: 24 }}>
        <div style={{ ...cardMainStyle }}>
          <h1 style={{ marginTop: 0, color: COLORS.emerald }}>{UI_TITLES.list}</h1>
          <p style={{ color: COLORS.neutral, marginTop: 4 }}>根据本周菜谱自动汇总（起始：{meta.startDate}）。</p>
          <div className="avoid-break" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {groups.map(([group, items]) => {
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
export default function Woche1_2025_09_29_ZH() {
  const [tab, setTab] = useState("kochbuch");
  const t = UI.zh;
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
    if (res?.blobUrl) setPdfLink((s) => ({ ...s, [isCook ? "kochbuch" : "einkauf"]: res.blobUrl }));
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
        <Cookbook t={t} lang="zh" />
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
    if (!/^第1周 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
    if (buildPrompt("A", "B") !== "A\nB") throw new Error("buildPrompt not working");
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("午餐不应带用药提醒");
      if (!isLunch && !r.remind) throw new Error("早餐/晚餐应带用药提醒");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 4) throw new Error(`食材过少: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`步骤过少: ${r.id}`);
    });
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY 分组缺失");
    console.log("[GhibliKitchen] All tests passed (Woche-1 ZH).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}