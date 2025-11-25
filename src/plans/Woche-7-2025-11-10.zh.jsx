import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";

/* -----------------------------------------------------
   吉卜力厨房 – 第7周 (2025-11-10) – 中文版
   严格遵循周模板（A4横向，左侧信息≤1/3，右侧食谱≥2/3）
   与 DE 分离成独立文件；本文件为 ZH。
----------------------------------------------------- */

export const meta = {
  title: "第7周",
  startDate: "2025-11-10",
  id: "zhou-07-2025-11-10-zh",
};
const FILE_BASE = "Woche 07 2025-11-10";

const UI_TITLES = {
  main: "吉卜力厨房 – 第7周",
  list: "吉卜力厨房 – 购物清单 – 第7周",
  coverLeft: "信息与上传",
  coverRight: "本周总览",
  pdf: "导出 PDF",
  html: "导出 HTML",
  print: "打印",
  download: "导出后将出现下载链接",
  cookbookTab: "食谱",
  listTab: "购物清单",
  reminder: "💊 用餐同时服用二甲双胍",
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

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_ZH = { mo: "周一", di: "周二", mi: "周三", do: "周四", fr: "周五", sa: "周六", so: "周日" };
const MEAL_NAME_ZH = { f: "早", m: "午", a: "晚" };

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

// ---------- DATA（21道全新菜品；2人份；目标每餐总碳水60–90 g；蛋白质约20–40 g/人） ----------
const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "韩式蒸蛋（계란찜）配小碗米饭",
    desc: "Gyeran-jjim 完全凝固，口味温和；配一小碗米饭。",
    story: "계란찜是韩国家常蒸蛋，细腻轻柔。我们确保全熟，适合孕期的安心早餐。",
    target: "≈62 g 碳水（2人） · 蛋白质≈23 g/人",
    ingredients: [
      "大米（生） 80 g",
      "鸡蛋 3 Stück",
      "清鸡汤 250 ml",
      "葱 15 g",
      "香油 5 ml",
      "低钠酱油 5 ml",
    ],
    steps: [
      "煮饭备用。",
      "鸡蛋与清汤搅匀，入碗大火蒸后转中小火12–14分钟至完全凝固。",
      "少许酱油与葱花调味，点香油。",
    ],
    checks: "胃炎✓ 非常温和 · 糖友✓ ≈62 g 碳水 · 孕期✓ 鸡蛋全熟",
    swaps: "清鸡汤 ↔ 蔬菜汤；米饭 ↔ 糙米。",
    side: "配菜：清爽黄瓜渍菜 · 饮品：温水 · 茶：大麦茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean steamed egg custard in ramekin, fully set, small bowl of rice, scallions on top"),
  },
  {
    id: "mo-m",
    title: "日式烤鸡饭丼（焼き鳥丼）— 清淡",
    desc: "去辣低盐的烤鸡丼，酱汁轻薄。",
    story: "Yakitori是日本常见的烤鸡。作为丼饭快速省时，午间刚刚好。",
    target: "≈74 g 碳水（2人） · 蛋白质≈32 g/人",
    ingredients: [
      "大米（生） 90 g",
      "鸡胸肉 240 g",
      "洋葱 80 g",
      "葱 15 g",
      "低钠酱油 20 ml",
      "水 50 ml",
      "蜂蜜 4 g",
    ],
    steps: ["煮饭；鸡肉少油煎至全熟。", "炒香洋葱，加入酱油/水/少许蜂蜜收至轻薄。", "浇在米饭上，撒葱花。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈74 g 碳水（甜味很低） · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 火鸡；米饭 ↔ 糙米。",
    side: "配菜：汆烫菠菜 · 茶：温和绿茶",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chicken yakitori rice bowl, glossy light sauce, scallions, no chili"),
  },
  {
    id: "mo-a",
    title: "红烧豆腐（红烧豆腐）配青菜",
    desc: "清淡版红烧，不辣，酱香温和。",
    story: "家常红烧豆腐，晚间解乏的小菜配米饭最合适。",
    target: "≈70 g 碳水（2人） · 蛋白质≈28 g/人",
    ingredients: [
      "老豆腐 400 g",
      "小白菜 250 g",
      "香菇 120 g",
      "低钠酱油 20 ml",
      "姜 10 g",
      "蒜 1 Stück",
      "玉米淀粉 8 g",
      "大米（生） 90 g",
    ],
    steps: ["煮饭；少油煎豆腐块。", "下香菇/小白菜，加酱油与少量水，焖3–4分钟。", "淀粉勾薄芡，装盘。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈70 g 碳水 · 孕期✓ 全熟",
    swaps: "小白菜 ↔ 西兰花；米饭 ↔ 糙米。",
    side: "配菜：清蒸胡萝卜 · 茶：茉莉花茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese braised tofu with bok choy and mushrooms, glossy light-brown sauce over rice"),
  },

  // 周二
  {
    id: "di-f",
    title: "小馒头 & 温热豆浆（馒头·豆浆）",
    desc: "北方风味早餐：小馒头配不加糖的加热豆浆。",
    story: "经典而朴素的早饭，按份量设计，帮助稳定碳水。",
    target: "≈68 g 碳水（2人）",
    ingredients: [
      "小馒头 120 g",
      "无糖豆浆 400 ml",
      "黄瓜 100 g",
      "芝麻（可选） 6 g",
      "低钠酱油 5 ml",
    ],
    steps: ["馒头上汽后蒸8–10分钟。", "豆浆加热（不沸腾）。", "配黄瓜片食用；酱油少量点用。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈68 g 碳水 · 孕期✓ 豆浆加热",
    swaps: "小馒头 ↔ 全麦吐司；豆浆 ↔ 巴氏杀菌牛奶。",
    side: "配菜：清淡渍菜 · 茶：乌龙（清淡）",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Small steamed mantou buns with warm unsweetened soy milk, cucumber slices"),
  },
  {
    id: "di-m",
    title: "韩式杂菜 Japchae（잡채）— 清淡",
    desc: "红薯粉丝、蔬菜与瘦牛肉，少油不辣。",
    story: "节庆与家常两相宜的杂菜，此版更注重蔬菜比例与清爽口感。",
    target: "≈76 g 碳水（2人） · 蛋白质≈30 g/人",
    ingredients: [
      "红薯粉丝（干） 80 g",
      "瘦牛肉 200 g",
      "菠菜 150 g",
      "胡萝卜 120 g",
      "洋葱 80 g",
      "香菇 100 g",
      "低钠酱油 20 ml",
      "香油 8 ml",
    ],
    steps: ["粉丝煮熟冲凉。", "牛肉少油炒熟，加入蔬菜翻炒至断生。", "加酱油/香油调味，拌入粉丝。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈76 g 碳水 · 孕期✓ 肉全熟",
    swaps: "牛肉 ↔ 火鸡/豆腐；粉丝 ↔ 荞麦面。",
    side: "配菜：焯西兰花 · 茶：大麦茶",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean japchae glass noodles with beef and vegetables, glossy but light"),
  },
  {
    id: "di-a",
    title: "鸡肉白萝卜炖（鶏大根の煮物）",
    desc: "日式清炖鸡肉与白萝卜，清澈温和。",
    story: "Nimono 指小火清炖，汤清味和，晚餐也不负担。",
    target: "≈70 g 碳水（2人） · 蛋白质≈30 g/人",
    ingredients: [
      "去皮去骨鸡腿肉 260 g",
      "白萝卜 300 g",
      "胡萝卜 120 g",
      "姜 10 g",
      "低钠酱油 20 ml",
      "蔬菜汤 500 ml",
      "大米（生） 90 g",
    ],
    steps: ["煮饭；萝卜/胡萝卜入汤小火煮10分钟。", "加入鸡肉再煮10–12分钟至全熟。", "少量酱油调味。"],
    checks: "胃炎✓ 清炖 · 糖友✓ ≈70 g 碳水 · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 火鸡；米饭 ↔ 糙米。",
    side: "配菜：清蒸小白菜 · 茶：温和绿茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese chicken and daikon nimono in clear broth, side bowl of rice"),
  },

  // 周三
  {
    id: "mi-f",
    title: "豆腐蛋花汤（蛋花汤）配小碗米饭",
    desc: "中式蛋花汤加入豆腐；蛋完全凝固，口味温和。",
    story: "一碗温热的蛋花汤，是舒缓清晨的好选择。",
    target: "≈66 g 碳水（2人） · 蛋白质≈22 g/人",
    ingredients: [
      "大米（生） 80 g",
      "鸡蛋 2 Stück",
      "老豆腐 150 g",
      "清汤 900 ml",
      "玉米淀粉 8 g",
      "葱 10 g",
    ],
    steps: ["煮饭；清汤加热。", "淀粉调入，小火下蛋液成花，继续煮2–3分钟至全熟。", "入豆腐煮透，撒葱花。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈66 g 碳水 · 孕期✓ 鸡蛋全熟",
    swaps: "豆腐 ↔ 鸡胸丁；米饭 ↔ 糙米。",
    side: "配菜：清淡萝卜渍 · 茶：茉莉花茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese egg drop soup with tofu in a clear bowl, small bowl of rice"),
  },
  {
    id: "mi-m",
    title: "粤式香菇清蒸滑鸡（冬菇蒸滑鸡）",
    desc: "以蒸法保持鸡肉嫩滑，清淡易消化。",
    story: "粤式清蒸体现了“鲜”的理念，适合需要轻负担的一餐。",
    target: "≈72 g 碳水（2人） · 蛋白质≈33 g/人",
    ingredients: [
      "鸡胸肉 260 g",
      "干香菇 20 g",
      "姜 8 g",
      "低钠酱油 15 ml",
      "香油 5 ml",
      "大米（生） 90 g",
      "葱 10 g",
    ],
    steps: ["香菇泡发；煮饭。", "鸡肉以酱油/姜略腌10分钟，与香菇同蒸12–14分钟。", "滴少许香油，撒葱丝。"],
    checks: "胃炎✓ 清蒸 · 糖友✓ ≈72 g 碳水 · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 火鸡/豆腐；米饭 ↔ 糙米。",
    side: "配菜：清蒸西兰花 · 茶：清淡乌龙",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cantonese steamed chicken with shiitake in a plate, ginger scallion garnish, side rice"),
  },
  {
    id: "mi-a",
    title: "豆腐酱烧（두부조림 Dubu-Jorim）— 清淡版",
    desc: "韩式酱烧豆腐配西葫芦与洋葱，不放辣椒。",
    story: "家常豆腐酱烧，汤汁微收，香而不腻。",
    target: "≈74 g 碳水（2人） · 蛋白质≈26 g/人",
    ingredients: [
      "老豆腐 400 g",
      "洋葱 80 g",
      "西葫芦 200 g",
      "低钠酱油 20 ml",
      "蔬菜汤 400 ml",
      "香油 6 ml",
      "大米（生） 90 g",
    ],
    steps: ["煮饭；豆腐切片少油煎上色。", "洋葱/西葫芦略炒，加汤与酱油小火焖6–8分钟。", "淋香油上桌。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈74 g 碳水 · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 鸡肉；米饭 ↔ 糙米。",
    side: "配菜：芝麻黄瓜 · 茶：大麦茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean braised tofu (dubu jorim) with onions and zucchini, light soy glaze, bowl of rice"),
  },

  // 周四
  {
    id: "do-f",
    title: "蔬菜豆腐煎饼（야채두부전）配小碗米饭",
    desc: "少油煎至外微脆内软，酱油少许点用。",
    story: "韩国煎饼（전）风味多变，这款以豆腐与蔬菜为主，清爽耐饱。",
    target: "≈64 g 碳水（2人） · 蛋白质≈24 g/人",
    ingredients: [
      "大米（生） 80 g",
      "老豆腐 250 g",
      "鸡蛋 1 Stück",
      "中筋面粉 40 g",
      "胡萝卜 100 g",
      "西葫芦 120 g",
      "葱 15 g",
      "菜籽油 10 ml",
      "低钠酱油 10 ml",
    ],
    steps: ["煮饭；豆腐压碎，与蛋/面粉/蔬菜拌匀。", "少油煎小饼，两面金黄熟透。", "蘸少量酱油食用。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈64 g 碳水 · 孕期✓ 鸡蛋全熟",
    swaps: "中筋面粉 ↔ 米粉；豆腐 ↔ 鸡胸丁（分开煎）。",
    side: "配菜：黄瓜渍菜 · 茶：大麦茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean tofu vegetable pancakes on a plate, small bowl of rice, light soy dip"),
  },
  {
    id: "do-m",
    title: "鸡蓉玉米羹 — 清淡版",
    desc: "中式浓汤，柔和顺口，不辣。",
    story: "经典食堂级暖汤，午间来一碗很满足。",
    target: "≈68 g 碳水（2人） · 蛋白质≈26 g/人",
    ingredients: [
      "大米（生） 80 g",
      "鸡胸肉 200 g",
      "玉米粒（罐头沥干） 200 g",
      "清鸡汤 900 ml",
      "玉米淀粉 10 g",
      "鸡蛋（可选） 1 Stück",
      "葱 10 g",
      "低钠酱油 8 ml",
    ],
    steps: ["煮饭；汤与玉米加热。", "鸡肉切小丁入锅煮6–8分钟至全熟；以淀粉略勾芡。", "可选：蛋液缓缓倒入并煮至完全凝固；温和调味。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈68 g 碳水 · 孕期✓ 鸡肉/鸡蛋全熟",
    swaps: "玉米 ↔ 豌豆；鸡肉 ↔ 豆腐。",
    side: "配菜：蒸菠菜 · 茶：温和绿茶",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese chicken and corn soup in a white bowl, small side of rice"),
  },
  {
    id: "do-a",
    title: "味噌煮鳕鱼（タラの味噌煮）",
    desc: "日式味噌清炖，味道柔和。",
    story: "味噌煮是日本常见的鱼类炖法，晚餐也很轻松。",
    target: "≈72 g 碳水（2人） · 蛋白质≈31 g/人",
    ingredients: [
      "鳕鱼柳 320 g",
      "浅色味噌 25 g",
      "姜 10 g",
      "蔬菜汤 300 ml",
      "味醂（可选） 5 ml",
      "大米（生） 90 g",
      "菠菜 200 g",
    ],
    steps: ["煮饭；菠菜蒸熟。", "味噌/汤/姜加热，鱼小火炖8–10分钟至全熟。", "与米饭和菠菜同食。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈72 g 碳水 · 孕期✓ 鳕鱼全熟（低汞）",
    swaps: "鳕鱼 ↔ 明太鱼；米饭 ↔ 糙米。",
    side: "配菜：清淡萝卜渍 · 茶：煎茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese miso-braised cod in shallow bowl, spinach on the side, small bowl of rice"),
  },

  // 周五
  {
    id: "fr-f",
    title: "日式豆腐“炒蛋” & 小碗米饭（豆腐スクランブル）",
    desc: "以豆腐代替鸡蛋的“炒蛋”，配菠菜与香菇，清淡无蛋。",
    story: "日式风味的素食早餐，蛋白质友好又轻盈。",
    target: "≈64 g 碳水（2人） · 蛋白质≈24 g/人",
    ingredients: [
      "大米（生） 80 g",
      "老豆腐 250 g",
      "菠菜 150 g",
      "香菇 120 g",
      "洋葱 60 g",
      "低钠酱油 12 ml",
      "芝麻 6 g",
    ],
    steps: ["煮饭。", "豆腐捣碎，与洋葱/香菇/菠菜同炒至熟。", "以酱油/芝麻清淡调味。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈64 g 碳水 · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 鸡胸丁；米饭 ↔ 糙米。",
    side: "配菜：熟透小番茄 · 茶：焙茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese-style tofu scramble with spinach and mushrooms, small bowl of rice"),
  },
  {
    id: "fr-m",
    title: "鸡肉荞麦面沙拉（そばサラダ）",
    desc: "冷拌荞麦面加大量蔬菜和手撕鸡胸，清爽饱腹。",
    story: "凉面沙拉适合需要清新口感的午间，控制盐分与酸度。",
    target: "≈78 g 碳水（2人） · 蛋白质≈30 g/人",
    ingredients: [
      "荞麦面（干） 100 g",
      "鸡胸肉 220 g",
      "黄瓜 150 g",
      "胡萝卜 120 g",
      "葱 15 g",
      "低钠酱油 18 ml",
      "米醋（温和） 6 ml",
      "香油 6 ml",
    ],
    steps: ["荞麦面煮熟冲凉；鸡胸在水中小火煮8–10分钟至全熟，放凉撕丝。", "蔬菜切丝，混合。", "以酱油/米醋/香油拌匀。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈78 g 碳水 · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；荞麦面 ↔ 乌冬。",
    side: "配菜：烫小白菜 · 茶：温和绿茶",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cold soba salad with shredded chicken, cucumber and carrot, light dressing"),
  },
  {
    id: "fr-a",
    title: "清爽砂锅香菇鸡饭（砂锅鸡饭·轻油版）",
    desc: "模仿煲仔饭风味的家用锅做法，油脂更低、味道清新。",
    story: "来自华南的砂锅饭灵感，调整为更轻盈、适合晚餐的版本。",
    target: "≈80 g 碳水（2人） · 蛋白质≈31 g/人",
    ingredients: [
      "糙米（生） 90 g",
      "鸡胸肉 260 g",
      "香菇 100 g",
      "小白菜 200 g",
      "低钠酱油 20 ml",
      "姜 8 g",
      "香油 5 ml",
    ],
    steps: ["米在锅中与水同煮至熟。", "鸡肉/香菇少油炒香，加入酱油/姜略焖。", "下小白菜，铺在米饭上焖3–4分钟。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈80 g 碳水 · 孕期✓ 鸡肉全熟",
    swaps: "糙米 ↔ 白米；鸡肉 ↔ 豆腐。",
    side: "配菜：清淡萝卜渍 · 茶：清淡乌龙",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Light claypot-style chicken and mushroom rice in a pot, bok choy on top"),
  },

  // 周六
  {
    id: "sa-f",
    title: "蛋包饭（オムライス）— 鸡蛋全熟",
    desc: "薄蛋皮完全凝固，内包蔬菜鸡肉炒饭，番茄酱量低。",
    story: "洋风和式家庭料理代表，做法亲切、口味温和。",
    target: "≈70 g 碳水（2人） · 蛋白质≈25 g/人",
    ingredients: [
      "大米（生） 80 g",
      "鸡蛋 3 Stück",
      "鸡胸肉 120 g",
      "豌豆（冷冻） 120 g",
      "洋葱 60 g",
      "番茄酱 10 g",
      "菜籽油 8 ml",
    ],
    steps: ["煮饭；将鸡肉/豌豆/洋葱炒熟，少量番茄酱调味。", "摊蛋皮至完全凝固。", "包入炒饭，装盘。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈70 g 碳水 · 孕期✓ 鸡蛋/鸡肉全熟",
    swaps: "豌豆 ↔ 玉米；鸡肉 ↔ 豆腐。",
    side: "配菜：熟透番茄片 · 茶：焙茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese omurice with fully cooked omelet, vegetable chicken rice filling, neat plating"),
  },
  {
    id: "sa-m",
    title: "豆芽拌饭（콩나물밥）配豆腐 — 清淡",
    desc: "韩式豆芽米饭，油脂低、纤维高，酱汁低盐无辣。",
    story: "朴素却香气怡人的家常热饭，饱腹而不腻。",
    target: "≈74 g 碳水（2人） · 蛋白质≈24 g/人",
    ingredients: [
      "大米（生） 90 g",
      "黄豆芽 300 g",
      "老豆腐 200 g",
      "葱 15 g",
      "低钠酱油 15 ml",
      "香油 6 ml",
    ],
    steps: ["煮饭；豆芽汆烫2–3分钟。", "豆腐切丁略煎。", "混合并以低盐酱油/香油调味。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈74 g 碳水 · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 鸡肉；豆芽 ↔ 菠菜。",
    side: "配菜：黄瓜渍菜 · 茶：大麦茶",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean kongnamul-bap rice bowl with tofu and bean sprouts, light dressing"),
  },
  {
    id: "sa-a",
    title: "明太鱼酱炖（명태조림）— 温和不辣",
    desc: "韩式炖明太鱼配白萝卜，去辣保留酱香。",
    story: "韩国常见鱼类炖菜，这版更亲和、适合全家。",
    target: "≈72 g 碳水（2人） · 蛋白质≈30 g/人",
    ingredients: [
      "明太鱼柳 320 g",
      "白萝卜 250 g",
      "洋葱 60 g",
      "低钠酱油 18 ml",
      "蔬菜汤 350 ml",
      "姜 8 g",
      "大米（生） 90 g",
    ],
    steps: ["煮饭。", "萝卜/洋葱入汤小火煮8分钟。", "下鱼再炖8–10分钟至全熟。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈72 g 碳水 · 孕期✓ 鱼全熟（低汞）",
    swaps: "明太鱼 ↔ 鳕鱼；米饭 ↔ 糙米。",
    side: "配菜：萝卜渍菜 · 茶：温和绿茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean pollock braise with radish in a shallow pot, bowl of rice"),
  },

  // 周日
  {
    id: "so-f",
    title: "三文鱼茶泡饭（鮭茶漬け）— 早餐",
    desc: "热茶冲米饭，配熟三文鱼松，极其清淡。",
    story: "お茶漬け是日式快捷暖胃饭，寒冷清晨的温柔选择。",
    target: "≈64 g 碳水（2人） · 蛋白质≈22 g/人",
    ingredients: [
      "大米（生） 80 g",
      "绿茶（热） 500 ml",
      "熟三文鱼松 100 g",
      "海苔（少量） 0.5 g",
      "芝麻 6 g",
    ],
    steps: ["煮好米饭。", "三文鱼撕松（全熟）。", "将热茶浇在米饭上，撒入三文鱼松/海苔/芝麻。"],
    checks: "胃炎✓ 非常温和 · 糖友✓ ≈64 g 碳水 · 孕期✓ 鱼全熟，海藻少量",
    swaps: "三文鱼 ↔ 明太鱼；绿茶 ↔ 大麦茶。",
    side: "配菜：黄瓜渍菜 · 茶：煎茶（可脱咖）",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese ochazuke green tea poured over rice with cooked salmon flakes, minimal nori"),
  },
  {
    id: "so-m",
    title: "清炒菠菜香菇 & 米饭",
    desc: "清爽少油的蔬菜小炒，配少量豆腐增蛋白。",
    story: "轻炒蔬菜是家常之选，口感清新、下饭。",
    target: "≈70 g 碳水（2人） · 蛋白质≈24 g/人",
    ingredients: [
      "大米（生） 90 g",
      "菠菜 300 g",
      "香菇 200 g",
      "蒜 1 Stück",
      "低钠酱油 12 ml",
      "老豆腐 150 g",
    ],
    steps: ["煮饭。", "香菇/菠菜少油快炒，蒜末后下。", "加入豆腐略炒，清淡调味。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈70 g 碳水 · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 鸡肉；米饭 ↔ 糙米。",
    side: "配菜：清淡萝卜渍 · 茶：清淡乌龙",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese spinach and shiitake stir-fry, light sauce, served with rice"),
  },
  {
    id: "so-a",
    title: "亲子丼（親子丼）— 鸡蛋完全凝固",
    desc: "日式鸡蛋鸡肉盖饭；确保蛋与鸡肉全熟，仍然嫩滑。",
    story: "家常级“亲子”暖饭，做法简单，风味甘甜。",
    target: "≈78 g 碳水（2人） · 蛋白质≈33 g/人",
    ingredients: [
      "大米（生） 90 g",
      "鸡胸肉 240 g",
      "洋葱 100 g",
      "鸡蛋 3 Stück",
      "低钠酱油 20 ml",
      "高汤/清汤 300 ml",
    ],
    steps: ["煮饭；洋葱在汤中焖软。", "入鸡肉煮至全熟。", "倒入蛋液，加盖加热至完全凝固。"],
    checks: "胃炎✓ 温和 · 糖友✓ ≈78 g 碳水 · 孕期✓ 鸡蛋/鸡肉全熟",
    swaps: "鸡肉 ↔ 火鸡；米饭 ↔ 糙米。",
    side: "配菜：黄瓜渍菜 · 茶：温和绿茶",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese oyakodon rice bowl with fully cooked egg, onions and chicken, glossy sauce"),
  },
];

// ---------- 购物清单聚合 ----------
const parseLine = (s) => {
  // 兼容：g/ml/l/EL/TL/Stück/个
  const m = s.match(/^(.*)\s(\d+[\.,]?\d*)\s*(g|ml|l|EL|TL|Stück|个)$/i);
  if (!m) return { name: s, amount: null, unit: null };
  let name = m[1].trim();
  let amount = parseFloat(m[2].replace(",", "."));
  let unit = m[3];
  if (unit === "l") { unit = "ml"; amount *= 1000; }
  return { name, amount, unit };
};
const normalizeName = (name) => name.replace(/\s+/g, " ").trim();
const classify = (name) => {
  const lower = name.toLowerCase();
  const isProtein = /(鸡|火鸡|牛|鱼|鳕|明太|三文鱼|豆腐|鸡蛋|蛋|鸡胸|鸡腿)/.test(name) || /(rind|pute|lachs|kabeljau|seelachs|tofu|ei)/i.test(lower);
  const isStarch = /(米|饭|面|乌冬|荞麦|粉丝|河粉|馒头)/.test(name) || /(reis|udon|soba|glasnudeln|nudel|mantou)/i.test(lower);
  const isVeg = /(西兰花|小白菜|彩椒|胡萝卜|番茄|洋葱|西葫芦|菠菜|大白菜|南瓜|土豆|葱|黄瓜|香菇|蘑菇|白萝卜|大根|豆芽|毛豆|海苔|裙带菜)/.test(name);
  const isSeasoning = /(酱油|味噌|大酱|味醂|蜂蜜|盐|高汤|清汤|芝麻油|油|姜|蒜|淀粉|醋|茶|芝麻|水)/.test(name) || /(sojasauce|miso|doenjang|mirin|honig|brühe|sesamöl|ingwer|knoblauch|stärke|tee|sesam|wasser)/i.test(lower);
  if (isProtein) return "蛋白/鱼/豆制品";
  if (isVeg) return "蔬菜/菌菇";
  if (isStarch) return "米/面/主食";
  if (isSeasoning) return "海藻/高汤/调味";
  return "其他";
};
const buildListFromData = () => {
  const items = {};
  const add = (cat, key, amount, unit) => {
    if (!items[cat]) items[cat] = {};
    const k = `${key}__${unit || "?"}`;
    if (!items[cat][k]) items[cat][k] = 0;
    items[cat][k] += amount || 0;
  };
  DATA.forEach((r) => {
    r.ingredients.forEach((line) => {
      const { name, amount, unit } = parseLine(line);
      const key = normalizeName(name);
      const cat = classify(key);
      if (amount != null && unit) add(cat, key, amount, unit);
      else add(cat, key, 0, "");
    });
  });
  const out = [];
  const ORDER = ["蛋白/鱼/豆制品", "蔬菜/菌菇", "米/面/主食", "海藻/高汤/调味", "其他"];
  ORDER.forEach((cat) => {
    if (!items[cat]) return;
    const lines = Object.entries(items[cat]).map(([k, v]) => {
      const [name, unit] = k.split("__");
      const amount = v;
      return { name, amount, unit };
    });
    out.push({ cat, lines });
  });
  return out;
};

const WeekView = () => {
  const grouped = useMemo(() => groupByDay(DATA), []);
  return (
    <div className="grid gap-6" style={{ width: "100%" }}>
      {/* 封面 */}
      <section className="grid md:grid-cols-12 gap-6" id="cover" style={{ alignItems: "stretch" }}>
        <div className="md:col-span-4" style={cardPanelStyle}>
          <h2 className="text-xl font-semibold mb-2">{UI_TITLES.coverLeft}</h2>
          <p className="text-sm opacity-80 mb-3">{meta.title} · {meta.startDate}</p>
          <div className="space-y-2">
            <label className="block text-sm">封面图片</label>
            <input type="file" className="block w-full" accept="image/*" />
          </div>
          <hr className="my-4" />
          <p className="text-sm">
            糖尿病（早期）与孕期指引：口味清淡、低钠酱油；选低汞鱼（鳕/明太/三文鱼），鸡蛋务必全熟；海藻点到为止；良好厨房卫生。仅早餐与晚餐显示二甲双胍提示。
          </p>
        </div>
        <div className="md:col-span-8" style={cardMainStyle}>
          <h2 className="text-xl font-semibold mb-3">{UI_TITLES.coverRight}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DAYS_ORDER.map((d) => (
              <div key={d} className="rounded-xl p-3 border" style={{ borderColor: COLORS.border }}>
                <div className="text-sky-700 font-semibold mb-2">{DAY_NAME_ZH[d]}</div>
                <div className="grid grid-cols-3 gap-2">
                  {grouped[d].map((r) => {
                    const id = r.id.split("-")[1];
                    return (
                      <div key={r.id} className="rounded-lg p-2" style={{ background: COLORS.panelBG80, border: `1px solid ${COLORS.border}` }}>
                        <div className="text-[11px] opacity-70">{MEAL_NAME_ZH[id]}</div>
                        <div className="text-[12px] font-medium leading-tight">{r.title}</div>
                        <div className="text-[11px] opacity-70">🌾 {r.target}</div>
                        {r.remind ? <div className="text-[11px] mt-1">💊</div> : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 21页食谱 */}
      {DAYS_ORDER.map((d) => (
        <React.Fragment key={d}>
          {grouped[d].map((r) => {
            const id = r.id.split("-")[1];
            return (
              <section key={r.id} className="grid md:grid-cols-12 gap-6" style={{ alignItems: "start" }}>
                <div className="md:col-span-4" style={cardPanelStyle}>
                  <div className="mb-2">
                    <label className="block text-sm mb-1">上传菜图</label>
                    <input type="file" className="block w-full" accept="image/*" />
                  </div>
                  <p className="text-sm mb-2 opacity-80">{r.desc}</p>
                  <p className="text-sm mb-1"><b>🎯</b> {r.target}</p>
                  <p className="text-sm mb-1">{r.checks}</p>
                  <p className="text-sm mb-1">{r.side}</p>
                  {r.remind ? (
                    <div className="inline-block text-xs mt-2 px-2 py-1 rounded-full" style={{ background: COLORS.sky, color: "white" }}>
                      {UI_TITLES.reminder}
                    </div>
                  ) : null}
                </div>
                <div className="md:col-span-8" style={cardMainStyle}>
                  <div className="text-sm mb-1" style={{ color: COLORS.sky }}>
                    {DAY_NAME_ZH[d]} — {MEAL_NAME_ZH[id]}
                  </div>
                  <h2 className="text-2xl font-semibold leading-snug">{r.title}</h2>
                  <p className="text-[12px] opacity-80 mb-3">{r.story}</p>
                  <h3 className="font-semibold mb-1">食材（2人份）</h3>
                  <ul className="list-disc pl-5 mb-3">
                    {r.ingredients.map((li, i) => (
                      <li key={i} className="text-sm">{li}</li>
                    ))}
                  </ul>
                  <h3 className="font-semibold mb-1">步骤</h3>
                  <ol className="list-decimal pl-5 mb-3">
                    {r.steps.map((li, i) => (
                      <li key={i} className="text-sm">{li}</li>
                    ))}
                  </ol>
                  <p className="text-sm opacity-90"><b>替换：</b> {r.swaps}</p>
                  {/* 隐藏的图像生成提示（不渲染） */}
                  <div style={{ display: "none" }}>{r.prompt}</div>
                </div>
              </section>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

const ShoppingList = () => {
  const summary = useMemo(() => buildListFromData(), []);
  return (
    <div className="grid gap-6">
      {summary.map((block) => (
        <section key={block.cat} style={cardMainStyle}>
          <h3 className="text-lg font-semibold mb-2">{block.cat}</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left opacity-70">
                <th className="py-1">项目</th>
                <th className="py-1" style={{ width: 140 }}>数量</th>
              </tr>
            </thead>
            <tbody>
              {block.lines.map((ln, i) => (
                <tr key={i} className="border-t" style={{ borderColor: COLORS.border }}>
                  <td className="py-1 pr-2">{ln.name}</td>
                  <td className="py-1">{ln.amount ? `${Math.round(ln.amount)} ${ln.unit}` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
};

export default function Woche07ZH() {
  const pdfIdMain = "cookbook-zh";
  const pdfIdList = "shopping-zh";

  useEffect(() => {
    const styleId = "embed-css-ghibli";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = buildEmbedCss();
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={{ background: COLORS.pageBg, color: COLORS.text, minHeight: "100vh" }}>
      {/* 顶部工具栏 */}
      <div className="sticky top-0 z-20" style={{ background: COLORS.pageBg, borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="font-semibold">{UI_TITLES.main}</div>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.indigo, boxShadow: COLORS.btnShadow }}
              onClick={() => exportPDFById(pdfIdMain, `${FILE_BASE}-zh-cookbook.pdf`)}
            >
              {UI_TITLES.pdf}
            </button>
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.emerald, boxShadow: COLORS.btnShadow }}
              onClick={() => exportHTMLById(pdfIdMain, `${FILE_BASE}-zh-cookbook.html`)}
            >
              {UI_TITLES.html}
            </button>
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.sky, boxShadow: COLORS.btnShadow }}
              onClick={() => window.print()}
            >
              {UI_TITLES.print}
            </button>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-4">
          <a href="#tab-cookbook" className="px-3 py-1 rounded-full text-sm" style={{ background: COLORS.sky, color: "white" }}>{UI_TITLES.cookbookTab}</a>
          <a href="#tab-list" className="px-3 py-1 rounded-full text-sm" style={{ background: COLORS.amber, color: "white" }}>{UI_TITLES.listTab}</a>
        </div>

        {/* 食谱（A4 横向） */}
        <div id="tab-cookbook">
          <div id={pdfIdMain} className="space-y-6 print:space-y-0">
            <WeekView />
          </div>
          <p className="text-sm opacity-70 mt-3">{UI_TITLES.download}</p>
        </div>

        <hr className="my-8" />

        {/* 购物清单 */}
        <div id="tab-list">
          <div className="flex items-center gap-2 mb-3">
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.indigo, boxShadow: COLORS.btnShadow }}
              onClick={() => exportPDFById(pdfIdList, `${FILE_BASE}-zh-shopping.pdf`)}
            >
              {UI_TITLES.pdf}
            </button>
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.emerald, boxShadow: COLORS.btnShadow }}
              onClick={() => exportHTMLById(pdfIdList, `${FILE_BASE}-zh-shopping.html`)}
            >
              {UI_TITLES.html}
            </button>
          </div>
          <div id={pdfIdList} className="space-y-6">
            <h2 className="text-xl font-semibold">{UI_TITLES.list}</h2>
            <ShoppingList />
          </div>
          <p className="text-sm opacity-70 mt-3">{UI_TITLES.download}</p>
        </div>
      </div>
    </div>
  );
}

try {
  const rootEl = document.getElementById("root");
  if (rootEl) createRoot(rootEl).render(<Woche07ZH />);
} catch {}