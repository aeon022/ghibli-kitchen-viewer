import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";

/* -----------------------------------------------------
   吉卜力厨房 – 第6周 (2025-11-10) – ZH
   单独中文文件（德语请见独立DE文件）
   结构参考 Production-Prompt & 周模板
----------------------------------------------------- */

export const meta = {
  title: "第6周",
  startDate: "2025-11-10",
  id: "week-48-2025-11-10-zh",
};
const FILE_BASE = "Woche 7 2025-11-10";

const UI_TITLES = {
  main: "吉卜力厨房 – 第6周",
  list: "吉卜力厨房 – 购物清单 – 第48周",
  coverLeft: "信息 & 上传",
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

// ---------- DATA（中文）– 21道菜 ----------
const DATA = [
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
      "加入豆腐与姜末/酱油微调味，撒葱花稍焖。",
    ],
    checks: "胃炎——温和暖胃 · 糖友✓ ≈70 g KH · 孕期✓ 鱼全熟、低汞",
    swaps: "内酯豆腐 ↔ 老豆腐；三文鱼 ↔ 鳕鱼。",
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
    swaps: "牛肉糜 ↔ 火鸡糜；糙米 ↔ 寿司米。",
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
    steps: ["煮饭；香菇煸软。", "高汤+味噌+酱油加热；入豆腐小火煨4–5分钟。", "淀粉水勾薄芡，浇在米饭上食用。"],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "糙米 ↔ 白米；味噌 ↔ 温和豆瓣/黄豆酱。",
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
      "海苔 1 Stück",
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
    swaps: "寿司米 ↔ 糙米；三文鱼 ↔ 明太鱼/狭鳕。",
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
    steps: ["河粉浸泡/焯水。", "鸡丝少油翻炒至全熟。", "下蔬菜，温和调味快速翻匀。"],
    checks: "胃炎——温和 · 糖友✓ ≈74 g KH · 孕期✓ 鸡肉全熟",
    swaps: "河粉 ↔ 乌冬；鸡肉 ↔ 豆腐。",
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
    steps: ["大酱溶于水，蔬菜小火煮12–15分钟。", "加入豆腐丁略焖。", "珍珠麦分锅煮熟，搭配食用。"],
    checks: "胃炎——醇厚不辣 · 糖友✓ ≈86 g KH · 孕期✓ 全熟",
    swaps: "珍珠麦 ↔ 米饭；豆腐 ↔ 火鸡胸。",
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
    steps: ["南瓜+大米小火煮25分钟至软。", "打成细腻；入豆腐与毛豆再煮3–4分钟。", "温和调味。"],
    checks: "胃炎——软暖 · 糖友✓ ≈75 g KH · 孕期✓ 全熟",
    swaps: "毛豆 ↔ 白腰豆；豆腐 ↔ 鸡胸丁。",
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
    steps: ["汤底以味噌+酱油调和加热。", "鸡肉小火煮6–8分钟至全熟；蔬菜再煮3–4分钟。", "乌冬另煮，冲洗后入汤同煮片刻。"],
    checks: "胃炎——温和 · 糖友✓ ≈79 g KH · 孕期✓ 鸡肉全熟",
    swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。",
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
    steps: ["鱼置姜片上，蒸8–10分钟至全熟。", "酱油+高汤加热，浇鱼，淋香油。", "米饭煮熟同食。"],
    checks: "胃炎——清蒸 · 糖友✓ ≈70 g KH · 孕期✓ 鳕鱼全熟、低汞",
    swaps: "鳕鱼 ↔ 明太鱼；米饭 ↔ 糙米。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice"),
  },

  // 周四
  {
    id: "do-f",
    title: "玉子烧 & 味噌汤配小碗米饭（卵焼き·味噌汁）",
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
    steps: ["煮饭。玉子烧卷煎至完全凝固。", "煮味噌汤；下豆腐/裙带菜略焖。", "撒葱花上桌。"],
    checks: "胃炎——温和 · 糖友✓ ≈62 g KH · 孕期✓ 蛋完全凝固",
    swaps: "米饭 ↔ 糙米；豆腐 ↔ 鸡胸丁。",
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
    steps: ["煮饭；鸡蛋炒至全熟凝固。", "番茄与洋葱小火炖软；下豆腐稍焖。", "温和调味，配米饭食用。"],
    checks: "胃炎——酸度温和、炖至软 · 糖友✓ ≈70 g KH · 孕期✓ 蛋全熟",
    swaps: "豆腐 ↔ 火鸡胸丁；米饭 ↔ 糙米。",
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
    steps: ["火鸡肉与酱油/梨泥/蒜腌15分钟。", "少油快炒至全熟。", "下蔬菜略炒，配糙米食用。"],
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
    steps: ["米加水小火煮30分钟。", "鸡肉切小丁，入粥煮8–10分钟至全熟。", "温和调味，撒葱花。"],
    checks: "胃炎——非常温和 · 糖友✓ ≈70 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜。",
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
    steps: ["少油炒香蔬菜，加高汤/番茄碎小火煮20–25分钟。", "入豆腐/白腰豆再焖5分钟。", "意面另煮，最后拌入。"],
    checks: "胃炎——久煮温和 · 糖友✓ ≈69 g KH · 孕期✓ 奶酪可选且需巴氏杀菌",
    swaps: "豆腐 ↔ 鸡胸丁；意面 ↔ 大麦。",
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
    steps: ["调酱（酱油+少许味醂/蜂蜜+姜）。", "刷在三文鱼上，200°C烤12–14分钟。", "配米饭与蒸西兰花食用。"],
    checks: "胃炎——温和 · 糖友✓ ≈75 g KH（甜度很低） · 孕期✓ 三文鱼全熟",
    swaps: "米饭 ↔ 糙米；西兰花 ↔ 小白菜。",
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
    target: "≈62 g KH gesamt (2 P.)",
    ingredients: [
      "内酯豆腐 350 g",
      "水 800 ml",
      "葱 20 g",
      "低钠酱油 10 ml",
      "大米（生） 80 g",
    ],
    steps: ["煮米饭。", "水加热，豆腐块小火温热5–6分钟。", "以少量酱油与葱花清淡食用。"],
    checks: "胃炎——非常温和 · 糖友✓ ≈62 g KH · 孕期✓ 全熟，无海藻",
    swaps: "内酯豆腐 ↔ 老豆腐；米饭 ↔ 糙米。",
    side: "芝麻腌黄瓜（无辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Hot tofu in clear broth, scallions on top, small bowl of rice, very gentle look"),
  },
  {
    id: "sa-m",
    title: "鸡肉菠菜荞麦面炒（そば）",
    desc: "温热少油快炒荞麦面，蔬菜足、温和高纤。",
    story: "荞麦面是日本日常主食之一。本款周末午餐清淡不辣。",
    target: "≈78 g KH gesamt (2 P.) · 蛋白质 ≈30 g/人",
    ingredients: [
      "荞麦面（干） 100 g",
      "鸡胸肉 220 g",
      "菠菜 200 g",
      "香菇 120 g",
      "洋葱 60 g",
      "低钠酱油 20 ml",
      "米醋（温和） 5 ml",
    ],
    steps: ["煮荞麦面后冲洗。", "鸡丝少油炒至全熟。", "加入蔬菜与面，少量酱油/米醋温和调味。"],
    checks: "胃炎——温和、酸度低 · 糖友✓ ≈78 g KH · 孕期✓ 鸡肉全熟",
    swaps: "荞麦面 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "黄瓜片原味。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Warm soba stir-fry with chicken, spinach and shiitake, glossy but light, no chili"),
  },
  {
    id: "sa-a",
    title: "三文鱼白菜锅 & 米饭（鮭の鍋）— 温和",
    desc: "日式味噌清汤锅，三文鱼+大白菜+蘑菇，十分温和。",
    story: "锅物是日本冬季经典。此款清淡暖胃，适合全家共享。",
    target: "≈70 g KH gesamt (2 P.)",
    ingredients: [
      "三文鱼柳 300 g",
      "大白菜 300 g",
      "香菇 150 g",
      "老豆腐 200 g",
      "浅色味噌 25 g",
      "水 1000 ml",
      "大米（生） 90 g",
    ],
    steps: ["煮米饭。", "加热清汤，白菜/香菇小火煮6–8分钟。", "入三文鱼与豆腐煮至全熟；味噌最后拌入（不沸腾）。"],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 三文鱼全熟",
    swaps: "三文鱼 ↔ 鳕鱼；米饭 ↔ 糙米。",
    side: "清淡萝卜水渍菜（无辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese salmon nabe hotpot with napa cabbage and mushrooms, clear miso broth, side bowl of rice"),
  },

  // 周日
  {
    id: "so-f",
    title: "鸡肉杂炊米汤（雑炊）— 温和",
    desc: "日式米汤配鸡肉与蔬菜，汤清味和。",
    story: "杂炊是日式家常暖胃汤饭，适合寒凉清晨。",
    target: "≈68 g KH gesamt (2 P.)",
    ingredients: [
      "大米（生） 85 g",
      "鸡胸肉 150 g",
      "胡萝卜 100 g",
      "香菇 80 g",
      "浅色味噌 20 g",
      "水 900 ml",
      "葱 15 g",
    ],
    steps: ["煮米饭。", "加热清汤，蔬菜小火煮8–10分钟至软。", "下鸡胸丁煮6–8分钟至全熟；味噌最后拌入。"],
    checks: "胃炎——软暖 · 糖友✓ ≈68 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；米饭 ↔ 糙米。",
    side: "温热大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese zosui rice soup with chicken and vegetables in a light broth, gentle steam"),
  },
  {
    id: "so-m",
    title: "清炒牛肉西兰花配米饭—温和",
    desc: "广式灵感清炒，无辣。",
    story: "牛肉配蔬菜的快炒在中式家常极常见——快捷且均衡。",
    target: "≈72 g KH gesamt (2 P.) · 蛋白质 ≈33 g/人",
    ingredients: [
      "瘦牛臀肉 220 g",
      "西兰花 300 g",
      "洋葱 60 g",
      "低钠酱油 20 ml",
      "玉米淀粉 6 g",
      "大米（生） 90 g",
    ],
    steps: ["煮米饭。", "牛肉少油快炒至全熟取出。", "炒蔬菜，加入酱油+少量水与淀粉，回锅牛肉略收汁。"],
    checks: "胃炎——温和 · 糖友✓ ≈72 g KH · 孕期✓ 全熟",
    swaps: "牛肉 ↔ 火鸡胸；米饭 ↔ 糙米。",
    side: "清蒸小白菜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese beef and broccoli stir-fry in a light sauce, side bowl of rice, no chili"),
  },
  {
    id: "so-a",
    title: "明太鱼日式煮付配菠菜与米饭（煮付け）",
    desc: "低钠酱油清炖明太鱼，味淡不腻。",
    story: "煮付是日本传统鱼类炖煮法——做法简捷、易消化。",
    target: "≈70 g KH gesamt (2 P.)",
    ingredients: [
      "明太鱼柳 320 g",
      "菠菜 250 g",
      "低钠酱油 20 ml",
      "味醂（可选） 5 ml",
      "姜 8 g",
      "水 200 ml",
      "大米（生） 90 g",
    ],
    steps: ["煮米饭。", "水+酱油+姜煮开成汤汁；入鱼小火炖8–10分钟至全熟。", "余温烫软菠菜，一并上桌。"],
    checks: "胃炎——温和 · 糖友✓ ≈70 g KH · 孕期✓ 明太鱼全熟、低汞",
    swaps: "明太鱼 ↔ 鳕鱼；米饭 ↔ 糙米。",
    side: "小碟清爽腌黄瓜（无辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese nitsuke pollock fillet in light soy-simmered glaze, side of spinach and rice"),
  },
];

// ---------- 购物清单 ----------
const parseLine = (s) => {
  const m = s.match(/^(.*)\s(\d+[\.,]?\d*)\s*(g|ml|l|EL|TL|Stück)$/i);
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
  const isProtein = /鸡|火鸡|牛|猪|三文鱼|鳕|明太|鱼|豆腐|蛋/.test(name);
  const isStarch = /米|乌冬|荞麦|河粉|意面|大麦/.test(name);
  const isVeg = /西兰花|小白菜|彩椒|胡萝卜|番茄|洋葱|西葫芦|菠菜|大白菜|南瓜|土豆|葱|黄瓜|香菇|蘑菇/.test(name);
  const isSeasoning = /酱油|味噌|大酱|味醂|蜂蜜|盐|高汤|香油|油|姜|蒜|裙带菜|海苔|淀粉|醋|水/.test(name);
  if (isProtein) return "蛋白/鱼/豆制品";
  if (isVeg) return "蔬菜/菌菇";
  if (isStarch) return "米/面/主食";
  if (isSeasoning) return "海藻/汤底/调味";
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
  const ORDER = ["蛋白/鱼/豆制品", "蔬菜/菌菇", "米/面/主食", "海藻/汤底/调味", "其他"];
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
            糖友 & 孕期：温和调味、低汞鱼类、鸡蛋全熟、低钠酱油；海藻少量。早餐与晚餐显示二甲双胍提醒。
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

      {/* 食谱 */}
      {DAYS_ORDER.map((d) => (
        <React.Fragment key={d}>
          {grouped[d].map((r) => {
            const id = r.id.split("-")[1];
            return (
              <section key={r.id} className="grid md:grid-cols-12 gap-6" style={{ alignItems: "start" }}>
                <div className="md:col-span-4" style={cardPanelStyle}>
                  <div className="mb-2">
                    <label className="block text-sm mb-1">图片上传</label>
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
                <th className="py-1">物品</th>
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

export default function Week48ZH() {
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
      {/* 顶部栏 */}
      <div className="sticky top-0 z-20" style={{ background: COLORS.pageBg, borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="font-semibold">{UI_TITLES.main}</div>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.indigo, boxShadow: COLORS.btnShadow }}
              onClick={() => exportPDFById(pdfIdMain, `${FILE_BASE}-zh-%E7%BE%8E%E9%A3%9F%E4%B9%A6.pdf`)}
            >
              {UI_TITLES.pdf}
            </button>
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.emerald, boxShadow: COLORS.btnShadow }}
              onClick={() => exportHTMLById(pdfIdMain, `${FILE_BASE}-zh-%E7%BE%8E%E9%A3%9F%E4%B9%A6.html`)}
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

      {/* 标签 */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-4">
          <a href="#tab-cookbook" className="px-3 py-1 rounded-full text-sm" style={{ background: COLORS.sky, color: "white" }}>{UI_TITLES.cookbookTab}</a>
          <a href="#tab-list" className="px-3 py-1 rounded-full text-sm" style={{ background: COLORS.amber, color: "white" }}>{UI_TITLES.listTab}</a>
        </div>

        {/* 食谱 A4 横向 */}
        <div id="tab-cookbook">
          <div id={pdfIdMain} className="space-y-6 print:space-y-0">
            <WeekView />
          </div>
          <p className="text-sm opacity-70 mt-3">{UI_TITLES.download}</p>
        </div>

        <hr className="my-8" />

        {/* 购物清单 A4 纵向 */}
        <div id="tab-list">
          <div className="flex items-center gap-2 mb-3">
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.indigo, boxShadow: COLORS.btnShadow }}
              onClick={() => exportPDFById(pdfIdList, `${FILE_BASE}-zh-%E8%B4%AD%E7%89%A9%E6%B8%85%E5%8D%95.pdf`)}
            >
              {UI_TITLES.pdf}
            </button>
            <button
              className="rounded-xl px-3 py-1 text-sm text-white"
              style={{ background: COLORS.emerald, boxShadow: COLORS.btnShadow }}
              onClick={() => exportHTMLById(pdfIdList, `${FILE_BASE}-zh-%E8%B4%AD%E7%89%A9%E6%B8%85%E5%8D%95.html`)}
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
  if (rootEl) createRoot(rootEl).render(<Week48ZH />);
} catch {}
