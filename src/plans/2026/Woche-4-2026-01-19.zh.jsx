// src/plans/2026/Woche-4-2026-01-19.zh.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – 第4周 (Start: 2026-01-19)
  Design: 与第3周相同 (修复了Header渐变)。
  Content: 中文 (Chinese), 亚洲家常菜 (CN/JP/KR), 孕期安全 (全熟/清淡).
*/

// ---- Meta ----
export const meta = {
  title: "第4周",
  startDate: "2026-01-19",
  id: "woche-4-2026-01-19", // ID 保持不变以便同步
  lang: "zh",
  sidebar: "第4周 (2026-01-19)",
};

const FILE_BASE = "第4周 2026-01-19";

// ---- UI Labels ----
const UI_TITLES = {
  main: "第4周食谱",
  list: "第4周购物清单",
};

// ---- THEME (与德语版一致) ----
const THEME_VARS_LIGHT = {
  "--bg": "#FAF7F1",
  "--text": "#111827",
  "--panel": "#FFFFFF",
  "--border": "rgba(0,0,0,.10)",
  "--muted": "#6B7280",
  "--chip-bg": "#EEF8F3",
  "--shadow": "0 8px 24px rgba(0,0,0,.12)",
  "--accent": "#e07a9a",
  "--accent-2": "#2aa769",
  "--grad-hero": "linear-gradient(135deg, rgba(224,122,154,.2), rgba(42,167,105,.18))",
  "--btn-on-bg": "#EEF8F3",
  "--btn-border": "rgba(0,0,0,.15)",
};
const THEME_VARS_DARK = {
  "--bg": "#0f1115",
  "--text": "#E5E7EB",
  "--panel": "#161A22",
  "--border": "rgba(255,255,255,.12)",
  "--muted": "#9CA3AF",
  "--chip-bg": "rgba(255,255,255,.06)",
  "--shadow": "0 10px 28px rgba(0,0,0,.45)",
  "--accent": "#e07a9a",
  "--accent-2": "#2aa769",
  "--grad-hero": "linear-gradient(135deg, rgba(224,122,154,.18), rgba(42,167,105,.15))",
  "--btn-on-bg": "rgba(255,255,255,.10)",
  "--btn-border": "rgba(255,255,255,.18)",
};

function useSystemPrefersDark() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!m) return;
    setPref(m.matches);
    const fn = (e) => setPref(e.matches);
    m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);
  return pref;
}
function themeVars(mode) {
  return mode === "dark" ? THEME_VARS_DARK : THEME_VARS_LIGHT;
}

// ---- Gate / Lang Hint ----
function getLangFromQuery() {
  if (typeof window === "undefined") return null;
  try {
    const qs = new URLSearchParams(window.location.search);
    const fromQuery = qs.get("lang");
    return fromQuery ? String(fromQuery).slice(0, 2).toLowerCase() : null;
  } catch { return null; }
}
function useLangHint() {
  const [q, setQ] = useState(getLangFromQuery());
  useEffect(() => {
    const onChange = () => setQ(getLangFromQuery());
    window.addEventListener?.("popstate", onChange);
    window.addEventListener?.("hashchange", onChange);
    return () => {
      window.removeEventListener?.("popstate", onChange);
      window.removeEventListener?.("hashchange", onChange);
    };
  }, []);
  return q;
}

// ---- Helper: Safe Scroll ----
const scrollToId = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const cardPanelStyle = {
  background: "var(--panel)",
  borderRadius: 18,
  padding: 24,
  boxShadow: "var(--shadow)",
  border: "1px solid var(--border)",
};

const tagChip = (text) => (
  <span className="ghk-chip" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "var(--chip-bg)", border: "1px solid var(--border)", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    {text}
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_ZH = {
  mo: "星期一 (2026-01-19)",
  di: "星期二 (2026-01-20)",
  mi: "星期三 (2026-01-21)",
  do: "星期四 (2026-01-22)",
  fr: "星期五 (2026-01-23)",
  sa: "星期六 (2026-01-24)",
  so: "星期日 (2026-01-25)",
};

// -----------------------------------------------------------------------
// DATA (Translated)
// -----------------------------------------------------------------------
export const DATA = [
  // MONDAY
  {
    id: "mo-f",
    title: "豆腐菠菜杂炊 (Zōsui)",
    desc: "日式早餐粥：米饭配豆腐和菠菜，非常温和，暖胃且富含纤维。",
    story: "Zōsui (杂炊) 是日本冬季常见的汤饭粥，非常适合清晨暖胃。灵感来源：Just One Cookbook (JP)。",
    target: "≈70g 碳水 (2人份) · 蛋白质 ≈22g/人",
    ingredients: [
      "大米 (生) 80 g",
      "高汤/Dashi 700 ml",
      "老豆腐 180 g",
      "菠菜 120 g",
      "低钠酱油 6 ml",
      "姜 6 g"
    ],
    steps: [
      "大米洗净，用高汤煮粥 (锅中35-40分钟 或 电饭煲煮粥模式)。",
      "豆腐切丁，菠菜切段，最后5分钟加入。",
      "用酱油温和调味，趁热食用。"
    ],
    checks: "养胃 ✓ · 控糖 ✓ · 孕期安全 ✓ (全熟)",
    swaps: "菠菜 ↔ 上海青; 高汤 ↔ 蔬菜汤",
    side: "茉莉花茶或温水",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "米水比 1:9–1:10", notes: "煮得非常软烂。" },
  },
  {
    id: "mo-m",
    title: "韩式烤肉味三文鱼盖饭 (Bulgogi Salmon)",
    desc: "嫩滑三文鱼配温和的韩式烤肉酱汁，搭配米饭、黄瓜和芝麻。",
    story: "韩式风味的快手菜——咸甜适中，温和不辣。灵感来源：Seon Kyoung Longest (KR)。",
    target: "≈84g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 120 g",
      "三文鱼柳 220 g",
      "低钠酱油 12 ml",
      "梨 (磨泥) 40 g",
      "大蒜 (切末) 4 g",
      "熟芝麻 6 g",
      "黄瓜 120 g"
    ],
    steps: [
      "煮饭。",
      "三文鱼用酱油、梨泥、蒜末腌制10分钟，然后煎5-6分钟至全熟。",
      "铺在米饭上，撒上黄瓜丝和芝麻。"
    ],
    checks: "温和调味 ✓ · 三文鱼全熟 ✓",
    swaps: "三文鱼 ↔ 鳕鱼; 梨 ↔ 苹果",
    side: "清蒸上海青",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "香菇蒸滑鸡",
    desc: "广式风味：嫩滑鸡肉配香菇和姜丝，原汁原味，配米饭。",
    story: "经典的粤式家常菜，清淡鲜美，营养丰富。灵感来源：The Woks of Life (CN)。",
    target: "≈76g 碳水 · 蛋白质 ≈30g/人",
    ingredients: [
      "大米 (生) 110 g",
      "鸡胸肉 300 g",
      "香菇 80 g",
      "姜 8 g",
      "低钠酱油 8 ml",
      "葱花 10 g"
    ],
    steps: [
      "煮饭。鸡肉切条，香菇切片。",
      "鸡肉和香菇加姜丝、酱油拌匀，平铺蒸12-14分钟 (至全熟)。",
      "撒上葱花，连同汤汁淋在米饭上。"
    ],
    checks: "养胃 ✓ · 鸡肉全熟 ✓",
    swaps: "鸡肉 ↔ 豆腐 + 蘑菇",
    side: "清炒菠菜",
    remind: true,
    riceCooker: { enabled: false },
  },

  // TUESDAY
  {
    id: "di-f",
    title: "韩式鸡蛋饭 (Gyeran-Bap) - 全熟版",
    desc: "韩式舒适早餐——米饭配完全煎熟的鸡蛋、芝麻和少量海苔。",
    story: "韩国网上的热门早餐；这里确保鸡蛋完全熟透。灵感来源：Mom's Korean Recipes (KR)。",
    target: "≈72g 碳水 · 蛋白质 ≈20g/人",
    ingredients: [
      "大米 (生) 100 g",
      "鸡蛋 3 个",
      "芝麻油 5 ml",
      "低钠酱油 6 ml",
      "海苔 1 g",
      "葱花 8 g"
    ],
    steps: [
      "煮饭。鸡蛋打散，在锅中炒至完全凝固 (全熟)。",
      "米饭盛入碗中，放上鸡蛋，加酱油和芝麻油调味。",
      "撒上海苔碎和葱花。"
    ],
    checks: "养胃 ✓ · 鸡蛋全熟 (孕期安全) ✓",
    swaps: "海苔 ↔ 芝麻; 芝麻油 ↔ 菜籽油 (少量)",
    side: "味噌汤 (温和)",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "鸡肉香菇荞麦面",
    desc: "暖身荞麦汤面，配香菇、鸡肉和温和的酱油高汤。",
    story: "日式家常午餐，荞麦面易消化。灵感来源：MAFF JP (JP)。",
    target: "≈82g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "荞麦面 (干) 120 g",
      "鸡胸肉 220 g",
      "香菇 80 g",
      "高汤/Dashi 700 ml",
      "低钠酱油 12 ml",
      "葱花 10 g"
    ],
    steps: [
      "荞麦面煮熟，过冷水。",
      "高汤加酱油煮开，加入鸡肉煮6-7分钟，香菇煮3分钟。",
      "面条放入汤中热透，撒葱花。"
    ],
    checks: "养胃 ✓ · 鸡肉全熟 ✓",
    swaps: "鸡肉 ↔ 豆腐; 荞麦面 ↔ 乌冬面",
    side: "黄瓜沙拉 (温和)",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "电饭煲版煲仔饭 (One-Pot)",
    desc: "鸡肉、香菇和米饭同煮，虽然没有锅巴但依然美味。",
    story: "港式风味的懒人版：所有食材放入电饭煲一键搞定。灵感来源：The Hong Kong Cookery (CN)。",
    target: "≈84g 碳水 · 蛋白质 ≈28g/人",
    ingredients: [
      "大米 (生) 120 g",
      "鸡腿肉 (去骨) 260 g",
      "香菇 60 g",
      "低钠酱油 14 ml",
      "姜 6 g",
      "葱花 10 g"
    ],
    steps: [
      "洗米，加入水/淡高汤至刻度线。",
      "鸡肉丁用酱油/姜腌制，与香菇一起铺在米上。",
      "开启 '煮饭' 模式。煮好后焖10分钟，拌匀撒葱花。"
    ],
    checks: "养胃 ✓ · 鸡肉全熟 ✓",
    swaps: "鸡肉 ↔ 老豆腐; 香菇 ↔ 口蘑",
    side: "清蒸西兰花",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "至刻度线 (含酱油)", notes: "中途不要开盖。" },
  },

  // WEDNESDAY
  {
    id: "mi-f",
    title: "三文鱼饭团 & 味噌汤",
    desc: "熟三文鱼馅的饭团，配温和味噌汤——日式便当早餐。",
    story: "经典且方便，蛋白质丰富。灵感来源：Japan Centre (JP)。",
    target: "≈70g 碳水 · 蛋白质 ≈20g/人",
    ingredients: [
      "大米 (生) 100 g",
      "三文鱼柳 160 g",
      "味噌酱 18 g",
      "高汤/Dashi 500 ml",
      "熟芝麻 6 g",
      "海苔 1 g"
    ],
    steps: [
      "煮饭；三文鱼煎熟弄碎。",
      "捏成饭团，包入三文鱼，贴上海苔。",
      "高汤煮热，溶解味噌 (不煮沸)，盛出。"
    ],
    checks: "养胃 ✓ · 三文鱼全熟 ✓",
    swaps: "三文鱼 ↔ 吞拿鱼罐头 (沥干)",
    side: "黄瓜片",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "韩式炸酱面 (温和版)",
    desc: "软面条配温和的黑豆酱汁，大量蔬菜和豆腐。",
    story: "韩剧中常见的美食——这里去掉了油腻，调味更温和。灵感来源：Maangchi (KR)。",
    target: "≈88g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "小麦面 (干) 130 g",
      "黑豆酱 (春酱) 35 g",
      "老豆腐 220 g",
      "西葫芦 120 g",
      "洋葱 80 g",
      "蔬菜高汤 250 ml"
    ],
    steps: [
      "煮面条。",
      "豆腐和蔬菜用少许油炒6-7分钟，加入春酱炒香，倒入高汤。",
      "小火煮3-4分钟，浇在面条上拌匀。"
    ],
    checks: "温和 (洋葱煮熟) ✓",
    swaps: "面条 ↔ 乌冬面; 豆腐 ↔ 鸡肉",
    side: "水煮上海青",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "辣酱黄油焖三文鱼饭 (电饭煲网红款)",
    desc: "温和的韩式辣酱加黄油，与三文鱼同煮，奶香浓郁。",
    story: "社交网络热门做法——这里减少了辣度，使用低钠酱油。灵感来源：Instagram Trends。",
    target: "≈82g 碳水 · 蛋白质 ≈26g/人",
    ingredients: [
      "大米 (生) 120 g",
      "三文鱼柳 220 g",
      "韩式辣酱 (Gochujang) 10 g",
      "黄油 12 g",
      "低钠酱油 10 ml",
      "高汤/Dashi 240 ml"
    ],
    steps: [
      "洗米，加入高汤/酱油。",
      "三文鱼丁、辣酱和黄油铺在上面。",
      "开启 '煮饭' 模式。煮好后焖10分钟，拌匀。"
    ],
    checks: "微辣 (注意) ✓ · 三文鱼全熟 ✓",
    swaps: "辣酱 ↔ 味噌 (不辣); 三文鱼 ↔ 白身鱼",
    side: "黄瓜沙拉 (不辣)",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "高汤至刻度线", notes: "如果不能吃辣，可用味噌代替。" },
  },

  // THURSDAY
  {
    id: "do-f",
    title: "红豆粥 (电饭煲版)",
    desc: "香甜软糯的红豆粥——温和暖身，富含纤维。",
    story: "中式冬季早餐首选。灵感来源：Omnivore’s Cookbook (CN)。",
    target: "≈76g 碳水 · 蛋白质 ≈18g/人",
    ingredients: [
      "大米 (生) 90 g",
      "红豆 (预煮过/罐头) 150 g",
      "清水 900 ml",
      "姜 4 g",
      "蜂蜜 10 g",
      "盐 1 撮"
    ],
    steps: [
      "洗米，加水在电饭煲煮粥 (60-70分钟)。",
      "最后15分钟加入预煮好的红豆和姜。",
      "加入少许蜂蜜调味。"
    ],
    checks: "养胃 ✓",
    swaps: "蜂蜜 ↔ 椰枣糖浆; 红豆 ↔ 芸豆",
    side: "淡绿茶",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:9–1:10", notes: "请使用熟红豆。" },
  },
  {
    id: "do-m",
    title: "亲子丼 (Oyakodon) - 全熟版",
    desc: "鸡肉滑蛋饭——这里确保鸡蛋完全煮熟。",
    story: "日本国民盖饭——简单又治愈。灵感来源：Just One Cookbook (JP)。",
    target: "≈86g 碳水 · 蛋白质 ≈26g/人",
    ingredients: [
      "大米 (生) 120 g",
      "鸡胸肉 240 g",
      "鸡蛋 3 个",
      "高汤/Dashi 250 ml",
      "低钠酱油 10 ml",
      "洋葱 80 g"
    ],
    steps: [
      "煮饭。洋葱在高汤/酱油中煮5分钟。",
      "加入鸡肉煮6-7分钟至熟。",
      "倒入蛋液，小火煮3-4分钟直至完全凝固 (无流心)，盖在饭上。"
    ],
    checks: "鸡蛋全熟 ✓ · 鸡肉全熟 ✓",
    swaps: "鸡肉 ↔ 豆腐; 洋葱 ↔ 大葱",
    side: "清炒菠菜",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "韩式大酱汤 (温和版)",
    desc: "温和的豆酱汤，配豆腐、蔬菜和虾仁，搭配米饭。",
    story: "韩国经典汤品，这里去除了辣椒，味道更温和。灵感来源：My Korean Kitchen (KR)。",
    target: "≈72g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 100 g",
      "大酱 (Doenjang, 温和) 18 g",
      "嫩豆腐 300 g",
      "虾仁 (去壳) 180 g",
      "西葫芦 120 g",
      "蔬菜高汤 700 ml"
    ],
    steps: [
      "高汤烧开，化开大酱，煮3分钟。",
      "加入西葫芦煮4-5分钟，再加豆腐和虾仁煮3-4分钟。",
      "配米饭食用。"
    ],
    checks: "养胃 ✓ · 虾仁全熟 ✓",
    swaps: "虾仁 ↔ 带子; 西葫芦 ↔ 上海青",
    side: "不辣的泡菜或腌黄瓜",
    remind: true,
    riceCooker: { enabled: false },
  },

  // FRIDAY
  {
    id: "fr-f",
    title: "燕麦咸粥 (配香菇鸡蛋)",
    desc: "大米与燕麦同煮，加入香菇和全熟鸡蛋。",
    story: "现代健康早餐——口感丰富且温和。灵感来源：Omnivore’s Cookbook (CN)。",
    target: "≈74g 碳水 · 蛋白质 ≈20g/人",
    ingredients: [
      "大米 (生) 70 g",
      "燕麦片 40 g",
      "香菇 60 g",
      "鸡蛋 (煮熟) 2 个",
      "高汤/Dashi 800 ml",
      "低钠酱油 6 ml"
    ],
    steps: [
      "大米加高汤煮40分钟，加入燕麦再煮10分钟。",
      "加入香菇煮5分钟，调味。放入切块的熟鸡蛋。",
      "趁热食用。"
    ],
    checks: "养胃 ✓ · 鸡蛋全熟 ✓",
    swaps: "香菇 ↔ 口蘑; 燕麦 ↔ 更多大米",
    side: "绿茶",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "鸡肉炒河粉 (清淡版)",
    desc: "宽米粉配大量蔬菜和鸡肉，少油快炒。",
    story: "类似干炒牛河，但更清淡，适合家庭制作。灵感来源：Red House Spice (CN)。",
    target: "≈86g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "河粉 (宽, 鲜) 400 g",
      "鸡胸肉 220 g",
      "上海青 200 g",
      "胡萝卜 80 g",
      "低钠酱油 12 ml",
      "芝麻油 5 ml"
    ],
    steps: [
      "河粉冲洗散开。鸡肉用少许油炒4-5分钟 (熟)。",
      "加入蔬菜同炒3-4分钟，放入河粉。",
      "加酱油/芝麻油调味，翻炒均匀。"
    ],
    checks: "养胃 ✓ · 鸡肉全熟 ✓",
    swaps: "鸡肉 ↔ 豆腐; 河粉 ↔ 乌冬面",
    side: "黄瓜沙拉",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "网红番茄饭 2.0 (吞拿鱼版)",
    desc: "整颗番茄在电饭煲中与米饭同煮——加入吞拿鱼增加蛋白质。",
    story: "网络爆款——简单、多汁、百吃不厌。灵感来源：Instagram Trends。",
    target: "≈86g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "大米 (生) 120 g",
      "番茄 (大) 1 个",
      "吞拿鱼 (罐头, 沥干) 140 g",
      "玉米 & 青豆 (冷冻) 120 g",
      "低钠酱油 10 ml",
      "橄榄油 8 ml"
    ],
    steps: [
      "米和水 (略少) 入锅，加酱油/油。",
      "番茄去蒂放中间，周围放吞拿鱼和蔬菜。",
      "开启 '煮饭' 模式。煮好后捣碎番茄拌匀。"
    ],
    checks: "养胃 ✓ · 罐头巴氏杀菌 ✓",
    swaps: "吞拿鱼 ↔ 熟三文鱼碎",
    side: "煎蛋 (全熟) 可选",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "比平时略少 (番茄出水)", notes: "请用熟透的番茄。" },
  },

  // SATURDAY
  {
    id: "sa-f",
    title: "韩式海带汤 (少量海带) + 米饭",
    desc: "温和的牛肉海带汤，海带用量适中，配米饭。",
    story: "韩国传统的滋补汤品——孕期注意碘摄入，海带适量。灵感来源：My Korean Kitchen (KR)。",
    target: "≈62g 碳水 · 蛋白质 ≈20g/人",
    ingredients: [
      "大米 (生) 80 g",
      "干海带 (泡发) 6 g",
      "瘦牛肉末 180 g",
      "大蒜 4 g",
      "低钠酱油 6 ml",
      "蔬菜高汤 800 ml"
    ],
    steps: [
      "海带泡发洗净。牛肉炒5-6分钟，加入蒜末。",
      "倒入高汤和海带煮10-12分钟，调味。",
      "配米饭食用。"
    ],
    checks: "养胃 ✓ · 碘适量 ✓",
    swaps: "牛肉 ↔ 鸡肉; 海带 ↔ 菠菜",
    side: "不辣的泡菜",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "蘑菇全麦烩饭 (意式风味)",
    desc: "奶油口感的蘑菇烩饭，使用全麦米，少盐。",
    story: "周末换个口味——意式烩饭的健康版。灵感来源：Giallo Zafferano (IT)。",
    target: "≈84g 碳水 · 蛋白质 ≈18g/人",
    ingredients: [
      "全麦烩饭米 (Arborio) 120 g",
      "香菇 80 g",
      "口蘑 120 g",
      "蔬菜高汤 700 ml",
      "橄榄油 10 ml",
      "帕玛森芝士 (巴氏杀菌) 20 g"
    ],
    steps: [
      "米用油炒香，分次加入高汤搅拌煮25-30分钟。",
      "蘑菇分开炒熟，拌入饭中。",
      "加入芝士粉调味。"
    ],
    checks: "养胃 ✓ · 芝士巴氏杀菌 ✓",
    swaps: "香菇 ↔ 牛肝菌",
    side: "温和沙拉",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "鲑鱼根茎类炊饭 (Takikomi Gohan)",
    desc: "电饭煲一锅出：三文鱼、胡萝卜和香菇的混合饭。",
    story: "日本秋季经典——富含Omega-3。灵感来源：Just One Cookbook (JP)。",
    target: "≈82g 碳水 · 蛋白质 ≈26g/人",
    ingredients: [
      "大米 (生) 120 g",
      "三文鱼柳 200 g",
      "胡萝卜 90 g",
      "香菇 60 g",
      "高汤/Dashi 240 ml",
      "低钠酱油 10 ml"
    ],
    steps: [
      "洗米，加高汤/酱油入锅。",
      "三文鱼切块，蔬菜切丁铺在上面。",
      "开启 '煮饭' 模式。煮好后焖10分钟，拌匀。"
    ],
    checks: "养胃 ✓ · 三文鱼全熟 ✓",
    swaps: "三文鱼 ↔ 白身鱼; 胡萝卜 ↔ 毛豆",
    side: "味噌汤",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "高汤至刻度线", notes: "煮前不要搅拌。" },
  },

  // SUNDAY
  {
    id: "so-f",
    title: "红薯粥 (Satsumaimo Okayu)",
    desc: "绵软的日式米粥配红薯丁——香甜温热。",
    story: "日本早餐的舒适之选，红薯带来天然甜味。灵感来源：MAFF JP (JP)。",
    target: "≈72g 碳水 · 蛋白质 ≈16g/人",
    ingredients: [
      "大米 (生) 90 g",
      "清水 900 ml",
      "红薯 220 g",
      "低钠酱油 4 ml",
      "姜 4 g",
      "熟芝麻 6 g"
    ],
    steps: [
      "大米加水煮粥 (锅煮45-60分钟 或 电饭煲粥模式)。",
      "红薯切丁，同煮15分钟。",
      "清淡调味，撒芝麻。"
    ],
    checks: "养胃 ✓ · 控糖 ✓",
    swaps: "红薯 ↔ 南瓜",
    side: "绿茶",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:9–1:10", notes: "煮得非常软烂。" },
  },
  {
    id: "so-m",
    title: "韩式拌饭 (温和版)",
    desc: "多彩蔬菜、牛肉末和米饭——辣酱另放；鸡蛋全熟。",
    story: "韩国经典——色彩丰富，营养均衡。灵感来源：Seon Kyoung Longest (KR)。",
    target: "≈88g 碳水 · 蛋白质 ≈26g/人",
    ingredients: [
      "大米 (生) 130 g",
      "瘦牛肉末 220 g",
      "西葫芦 120 g",
      "胡萝卜 100 g",
      "菠菜 120 g",
      "鸡蛋 2 个",
      "韩式辣酱 (可选) 12 g"
    ],
    steps: [
      "煮饭。蔬菜分别炒熟。",
      "牛肉炒熟。鸡蛋煎至全熟。",
      "铺在米饭上，辣酱另放 (可选)。"
    ],
    checks: "微辣 (可选) ✓ · 鸡蛋全熟 ✓",
    swaps: "牛肉 ↔ 鸡肉",
    side: "味噌汤",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "蒜香黄油虾仁饭 (网红款)",
    desc: "蒜香黄油虾仁直接与米饭同煮——一锅搞定。",
    story: "Instagram热门做法——快速、高蛋白。灵感来源：Magic Ingredients (YouTube)。",
    target: "≈84g 碳水 · 蛋白质 ≈28g/人",
    ingredients: [
      "大米 (生) 120 g",
      "虾仁 (去壳) 220 g",
      "大蒜 6 g",
      "黄油 12 g",
      "低钠酱油 10 ml",
      "蔬菜高汤 240 ml",
      "葱花 10 g"
    ],
    steps: [
      "洗米，加入高汤/酱油。",
      "铺上虾仁、蒜末和黄油。",
      "开启 '煮饭' 模式，煮好拌匀撒葱花。"
    ],
    checks: "养胃 ✓ · 虾仁全熟 ✓",
    swaps: "虾仁 ↔ 带子",
    side: "清蒸西兰花",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "至刻度线", notes: "懒人料理。" },
  },
];

// -----------------------------------------------------------------------
// Shopping List
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "鸡胸肉": { group: "Protein/Fisch/Tofu", label: "鸡胸肉", unitDefault: "g" },
  "鸡腿肉": { group: "Protein/Fisch/Tofu", label: "鸡腿肉 (去骨)", unitDefault: "g" },
  "牛肉末": { group: "Protein/Fisch/Tofu", label: "瘦牛肉末", unitDefault: "g" },
  "瘦牛肉末": { group: "Protein/Fisch/Tofu", label: "瘦牛肉末", unitDefault: "g" },
  "牛排肉": { group: "Protein/Fisch/Tofu", label: "牛排/牛肉片", unitDefault: "g" },
  "猪肉片": { group: "Protein/Fisch/Tofu", label: "猪肉薄片", unitDefault: "g" },
  "白身鱼": { group: "Protein/Fisch/Tofu", label: "白身鱼 (鱼柳)", unitDefault: "g" },
  "三文鱼柳": { group: "Protein/Fisch/Tofu", label: "三文鱼", unitDefault: "g" },
  "鳕鱼柳": { group: "Protein/Fisch/Tofu", label: "鳕鱼", unitDefault: "g" },
  "虾仁": { group: "Protein/Fisch/Tofu", label: "虾仁", unitDefault: "g" },
  "扇贝柱": { group: "Protein/Fisch/Tofu", label: "扇贝/带子", unitDefault: "g" },
  "贻贝": { group: "Protein/Fisch/Tofu", label: "贻贝/青口", unitDefault: "g" },
  "青口贝": { group: "Protein/Fisch/Tofu", label: "贻贝/青口", unitDefault: "g" },
  "金枪鱼": { group: "Protein/Fisch/Tofu", label: "金枪鱼 (罐头)", unitDefault: "g" },
  "吞拿鱼": { group: "Protein/Fisch/Tofu", label: "吞拿鱼 (罐头)", unitDefault: "g" },
  "豆腐": { group: "Protein/Fisch/Tofu", label: "豆腐", unitDefault: "g" },
  "老豆腐": { group: "Protein/Fisch/Tofu", label: "老豆腐", unitDefault: "g" },
  "嫩豆腐": { group: "Protein/Fisch/Tofu", label: "嫩豆腐", unitDefault: "g" },
  "鸡蛋": { group: "Protein/Fisch/Tofu", label: "鸡蛋", unitDefault: "个" },
  "熟火腿": { group: "Protein/Fisch/Tofu", label: "熟火腿", unitDefault: "g" },

  // Vegetables
  "大白菜": { group: "Gemüse/Pilze", label: "大白菜", unitDefault: "g" },
  "上海青": { group: "Gemüse/Pilze", label: "上海青/油菜", unitDefault: "g" },
  "菠菜": { group: "Gemüse/Pilze", label: "菠菜", unitDefault: "g" },
  "胡萝卜": { group: "Gemüse/Pilze", label: "胡萝卜", unitDefault: "g" },
  "黄瓜": { group: "Gemüse/Pilze", label: "黄瓜", unitDefault: "g" },
  "西葫芦": { group: "Gemüse/Pilze", label: "西葫芦", unitDefault: "g" },
  "南瓜": { group: "Gemüse/Pilze", label: "南瓜", unitDefault: "g" },
  "红薯": { group: "Gemüse/Pilze", label: "红薯", unitDefault: "g" },
  "豆芽": { group: "Gemüse/Pilze", label: "豆芽", unitDefault: "g" },
  "毛豆仁": { group: "Gemüse/Pilze", label: "毛豆 (冷冻)", unitDefault: "g" },
  "白蘑菇": { group: "Gemüse/Pilze", label: "白蘑菇", unitDefault: "g" },
  "香菇": { group: "Gemüse/Pilze", label: "香菇", unitDefault: "g" },
  "口蘑": { group: "Gemüse/Pilze", label: "口蘑", unitDefault: "g" },
  "葱": { group: "Gemüse/Pilze", label: "葱", unitDefault: "g" },
  "葱花": { group: "Gemüse/Pilze", label: "葱", unitDefault: "g" },
  "洋葱": { group: "Gemüse/Pilze", label: "洋葱", unitDefault: "g" },
  "大蒜": { group: "Gemüse/Pilze", label: "大蒜", unitDefault: "瓣" },
  "姜": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "姜末": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "姜丝": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "番茄": { group: "Gemüse/Pilze", label: "番茄", unitDefault: "个" },
  "玉米粒": { group: "Gemüse/Pilze", label: "玉米/青豆 (冷冻)", unitDefault: "g" },
  "玉米": { group: "Gemüse/Pilze", label: "玉米/青豆 (冷冻)", unitDefault: "g" },
  "梨": { group: "Gemüse/Pilze", label: "梨", unitDefault: "g" },
  "红豆": { group: "Gemüse/Pilze", label: "红豆 (熟)", unitDefault: "g" },
  "土豆": { group: "Gemüse/Pilze", label: "土豆", unitDefault: "g" },
  "干海带": { group: "Gemüse/Pilze", label: "干海带", unitDefault: "g" },

  // Carbs
  "大米": { group: "Reis/Nudeln/Sättigung", label: "大米 (生)", unitDefault: "g" },
  "荞麦面": { group: "Reis/Nudeln/Sättigung", label: "荞麦面", unitDefault: "g" },
  "红薯粉丝": { group: "Reis/Nudeln/Sättigung", label: "红薯粉丝", unitDefault: "g" },
  "乌冬面": { group: "Reis/Nudeln/Sättigung", label: "乌冬面", unitDefault: "g" },
  "小麦面": { group: "Reis/Nudeln/Sättigung", label: "小麦面/拉面", unitDefault: "g" },
  "小米": { group: "Reis/Nudeln/Sättigung", label: "小米", unitDefault: "g" },
  "面粉": { group: "Reis/Nudeln/Sättigung", label: "面粉", unitDefault: "g" },
  "粘米粉": { group: "Reis/Nudeln/Sättigung", label: "粘米粉", unitDefault: "g" },
  "全麦面包": { group: "Reis/Nudeln/Sättigung", label: "全麦面包", unitDefault: "片" },
  "河粉": { group: "Reis/Nudeln/Sättigung", label: "河粉", unitDefault: "g" },
  "燕麦片": { group: "Reis/Nudeln/Sättigung", label: "燕麦片", unitDefault: "g" },
  "全麦烩饭米": { group: "Reis/Nudeln/Sättigung", label: "糙米/烩饭米", unitDefault: "g" },

  // Pantry
  "低钠酱油": { group: "Algen/Brühen/Würze", label: "低钠酱油", unitDefault: "ml" },
  "酱油": { group: "Algen/Brühen/Würze", label: "酱油", unitDefault: "ml" },
  "蚝油": { group: "Algen/Brühen/Würze", label: "蚝油", unitDefault: "ml" },
  "芝麻油": { group: "Algen/Brühen/Würze", label: "芝麻油", unitDefault: "ml" },
  "米醋": { group: "Algen/Brühen/Würze", label: "米醋", unitDefault: "ml" },
  "味淋": { group: "Algen/Brühen/Würze", label: "味淋", unitDefault: "ml" },
  "高汤": { group: "Algen/Brühen/Würze", label: "高汤/Dashi", unitDefault: "ml" },
  "蔬菜高汤": { group: "Algen/Brühen/Würze", label: "蔬菜高汤", unitDefault: "ml" },
  "鸡汤": { group: "Algen/Brühen/Würze", label: "鸡汤", unitDefault: "ml" },
  "熟芝麻": { group: "Algen/Brühen/Würze", label: "芝麻", unitDefault: "g" },
  "核桃碎": { group: "Algen/Brühen/Würze", label: "核桃", unitDefault: "g" },
  "牛奶": { group: "Algen/Brühen/Würze", label: "牛奶", unitDefault: "ml" },
  "蜂蜜": { group: "Algen/Brühen/Würze", label: "蜂蜜", unitDefault: "g" },
  "泡打粉": { group: "Algen/Brühen/Würze", label: "泡打粉", unitDefault: "茶匙" },
  "玉米淀粉": { group: "Algen/Brühen/Würze", label: "淀粉", unitDefault: "茶匙" },
  "淀粉": { group: "Algen/Brühen/Würze", label: "淀粉", unitDefault: "适量" },
  "橄榄油": { group: "Algen/Brühen/Würze", label: "橄榄油", unitDefault: "ml" },
  "食用油": { group: "Algen/Brühen/Würze", label: "食用油", unitDefault: "适量" },
  "黄油": { group: "Algen/Brühen/Würze", label: "黄油", unitDefault: "g" },
  "味噌酱": { group: "Algen/Brühen/Würze", label: "味噌", unitDefault: "g" },
  "蛋黄酱": { group: "Algen/Brühen/Würze", label: "蛋黄酱", unitDefault: "g" },
  "海苔": { group: "Algen/Brühen/Würze", label: "海苔", unitDefault: "g" },
  "韩式辣酱": { group: "Algen/Brühen/Würze", label: "韩式辣酱", unitDefault: "g" },
  "大酱": { group: "Algen/Brühen/Würze", label: "大酱", unitDefault: "g" },
  "黑豆酱": { group: "Algen/Brühen/Würze", label: "黑豆酱(春酱)", unitDefault: "g" },
  "帕玛森芝士": { group: "Algen/Brühen/Würze", label: "帕玛森芝士", unitDefault: "g" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      // 支持: "大米 (生) 80 g" 或 "大蒜 1 瓣"
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|个|瓣|根|片|茶匙|大勺|勺|撮)?/);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.includes(k));
      if (!key) {
        if (name.includes("大米")) key = "大米";
        else if (name.includes("粉丝")) key = "红薯粉丝";
        else if (name.includes("姜")) key = "姜";
        else if (name.includes("扇贝")) key = "扇贝柱";
        else if (name.includes("贻贝")) key = "贻贝";
        else if (name.includes("金枪鱼") || name.includes("吞拿鱼")) key = "金枪鱼";
        else if (name.includes("玉米")) key = "玉米粒";
      }
      
      if (!key) continue;
      
      const c = canon[key];
      const id = `${key}`;
      
      if (!totals[id]) totals[id] = { key, label: c.label, unit: c.unitDefault, qty: 0, group: c.group };
      totals[id].qty += qty; 
    }
  }
  const groups = { "Protein/Fisch/Tofu": [], "Gemüse/Pilze": [], "Reis/Nudeln/Sättigung": [], "Algen/Brühen/Würze": [] };
  Object.values(totals).forEach((t) => {
    if(groups[t.group]) groups[t.group].push(t);
  });
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => a.label.localeCompare(b.label)));
  return groups;
}

// -----------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------

function animePlaceholder(title) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#FCE7F3'/><stop offset='100%' stop-color='#DCFCE7'/>
    </linearGradient></defs>
    <rect width='1200' height='675' fill='url(#g)'/>
    <g font-family='Noto Sans SC, sans-serif'>
      <text x='40' y='120' font-size='44' fill='#1F2937'>🍱 ${esc(title)}</text>
      <text x='40' y='180' font-size='20' fill='#374151'>Moving Kitchen Tales</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw4" }) {
  const [src, setSrc] = useState("");
  
  useEffect(() => {
    const preferred = `/plan-art/${year}/${weekFolder}/${meal.id}.jpg`;
    const fallback = animePlaceholder(meal.title);
    setSrc(fallback);

    const img = new Image();
    img.onload = () => setSrc(preferred);
    img.onerror = () => setSrc(fallback);
    img.src = preferred;
  }, [meal, year, weekFolder]);

  return (
    <div className="ghk-art" style={{ position: "relative", borderRadius: 14, overflow: "hidden", marginBottom: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
      <img src={src} alt={meal.title} style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9", objectFit: "cover" }} loading="lazy" />
    </div>
  );
}

function MealCard({ meal }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(meta.id, meal.id);
  return (
    <div className="meal-card" style={cardPanelStyle} id={`meal-${meal.id}`}>
      <ImageBanner meal={meal} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><button onClick={() => toggleBookmark({ planSlug: meta.id, recipeId: meal.id, recipeTitle: meal.title, planTitle: meta.title })} style={{ background: bookmarked ? "var(--accent, #e07a9a)" : "transparent", border: "1px solid var(--border, rgba(0,0,0,.1))", borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", color: bookmarked ? "#fff" : "var(--text, #111827)" }} title={bookmarked ? "Bookmark entfernen" : "Bookmark setzen"}>{bookmarked ? "★" : "☆"}</button><h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3></div>
        <div>
          {tagChip(meal.target)}
          {meal.riceCooker?.enabled ? tagChip("🍚 电饭煲") : null}
          {meal.remind ? tagChip("💊 用药") : null}
        </div>
      </div>
      {meal.desc ? <p style={{ marginTop: 8, color: "var(--muted)", fontStyle: "italic" }}>{meal.desc}</p> : null}
      
      <h4>食材 (2人份)</h4>
      <ul>{meal.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      
      <h4>做法</h4>
      <ol>{meal.steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>
      
      <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--chip-bg)", borderRadius: 12 }}>
        <p style={{margin:"0 0 4px"}}><strong>注意:</strong> {meal.checks}</p>
        <p style={{margin:"0 0 4px"}}><strong>替换:</strong> {meal.swaps}</p>
        <p style={{margin:0}}><strong>配菜:</strong> {meal.side}</p>
      </div>

      {meal.riceCooker?.enabled ? (
        <div style={{ marginTop: 12 }}>
          <details>
            <summary style={{cursor:"pointer", fontWeight:600}}>电饭煲设置</summary>
            <ul style={{marginTop:8}}>
              <li><strong>模式:</strong> {meal.riceCooker.program}</li>
              <li><strong>水量:</strong> {meal.riceCooker.water}</li>
              {meal.riceCooker.notes ? <li><strong>备注:</strong> {meal.riceCooker.notes}</li> : null}
            </ul>
          </details>
        </div>
      ) : null}
    </div>
  );
}

function DaySection({ dayKey, meals, dayName }) {
  return (
    <section className="day-section" style={{ marginBottom: 40 }} id={`day-${dayKey}`}>
      <h2 style={{ marginBottom: 16, borderBottom:"2px solid var(--border)", paddingBottom:8 }}>
        {dayName.replace(/\s*\(.+\)$/, "")} <span className="ghk-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {meals.map((m) => <MealCard key={m.id} meal={m} />)}
      </div>
    </section>
  );
}

function WeekOverview({ data, DAY_NAME_ZH, meta }) {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of data) map[r.id.split("-")[0]].push(r);
    return map;
  }, [data]);

  const pill = (key, text, targetId, rice) => (
    <a
      key={key}
      href={`#${targetId}`}
      onClick={scrollToId(targetId)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--panel)", textDecoration: "none", color: "var(--text)", boxShadow: "var(--shadow)", fontSize: 13, cursor: "pointer" }}
    >
      {rice ? "🍚" : "🍽️"} <span>{text}</span>
    </a>
  );

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ ...cardPanelStyle, background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="ghk-hero-inner" style={{ padding: 18, borderRadius: 12, marginBottom: 16, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            第4周 – 总览 <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>JP/CN/KR · 孕期安全 (全熟/清淡) · 每日 1x 电饭煲料理</p>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {DAYS_ORDER.map((d) => (
            <div key={d} style={{ padding: 12, borderRadius: 12, border: "1px solid var(--border)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <strong>{DAY_NAME_ZH[d]}</strong>
                <a 
                  href={`#day-${d}`} 
                  onClick={scrollToId(`day-${d}`)}
                  style={{ fontSize: 12, color: "var(--text)", textDecoration: "none", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: 8, background: "var(--chip-bg)", cursor: "pointer" }}
                >
                  跳转当天 ▿
                </a>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {byDay[d].map((m) => pill(m.id, m.title.replace(/ – .*$/, "").replace(/\s*\(.*\)$/, ""), `meal-${m.id}`, !!m.riceCooker?.enabled))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- RiceCooker Section ----
function RiceCookerSection({ data }) {
  const perDay = useMemo(() => {
    const map = { mo: null, di: null, mi: null, do: null, fr: null, sa: null, so: null };
    for (const r of data) {
      const day = r.id.split("-")[0];
      if (r.riceCooker?.enabled && !map[day]) map[day] = r;
    }
    return map;
  }, [data]);

  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ borderBottom: "2px solid var(--border)", paddingBottom: 10, marginBottom: 20 }}>🍚 电饭煲料理汇总</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {DAYS_ORDER.map((d) => {
          const r = perDay[d];
          return (
            <div key={d} style={{ ...cardPanelStyle }}>
              <h3 style={{ marginTop: 0, fontSize: 16 }}>
                {DAY_NAME_ZH[d].split(" ")[0]} – {r ? r.title : "无"}
              </h3>
              {r ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li><strong>模式:</strong> {r.riceCooker.program}</li>
                  <li><strong>水量:</strong> {r.riceCooker.water}</li>
                  {r.riceCooker.notes ? <li><strong>备注:</strong> {r.riceCooker.notes}</li> : null}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
      <p style={{ marginTop: 12, color: "var(--muted)" }}>本周热门: 豆腐杂炊, 煲仔饭, 辣酱黄油三文鱼, 红豆粥, 蒜香黄油虾仁饭。</p>
    </section>
  );
}

// PDF Export
const doPrint = () => window.print();

// Theme Switch Component
function ThemeSwitch({ mode, setMode, effectiveDark }) {
  return (
    <div className="ghk-theme-switch" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: 6, border: "1px solid var(--btn-border)", borderRadius: 999, background: "var(--panel)" }}>
      <button type="button" className="ghk-tab" aria-pressed={mode === "auto"} onClick={() => setMode(mode === "auto" ? (effectiveDark ? "dark" : "light") : "auto")} style={{ padding: "6px 10px" }}>Auto</button>
      <label className="ghk-switch" title={effectiveDark ? "暗色" : "亮色"}>
        <input type="checkbox" checked={effectiveDark} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} disabled={mode === "auto"} />
        <span className="ghk-slider" />
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------
// MAIN EXPORT
// -----------------------------------------------------------------------
export default function Woche4ZH() {
  const langFromUrl = useLangHint();
  const hiddenByLang = langFromUrl && langFromUrl !== meta.lang;
  if (hiddenByLang) return null;

  const systemDark = useSystemPrefersDark();
  const [mode, setMode] = useState("auto");
  const effectiveDark = mode === "auto" ? systemDark : mode === "dark";
  const vars = themeVars(effectiveDark ? "dark" : "light");

  const [tab, setTab] = useState("kochbuch");
  const listGroups = useMemo(() => aggregateList(DATA, CANON), []);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k));
  }, [vars]);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      <style>{`
        .meal-card p { line-height: 1.75; margin-bottom: 1rem; }
        .meal-card li { line-height: 1.7; margin-bottom: 0.5rem; }
        .meal-card h4 { margin-top: 1.5rem; margin-bottom: 0.75rem; color: var(--accent-2); font-weight: 700; }
        
        .ghk-tab { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 16px; border-radius: 12px; border: 1px solid var(--btn-border); background: var(--panel); color: var(--text); cursor: pointer; font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: all 0.2s ease; }
        .ghk-tab:hover { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-color: var(--accent-2); }
        .ghk-switch{ --w:48px; --h:28px; --k:22px; position:relative; display:inline-block; width:var(--w); height:var(--h); }
        .ghk-switch input{ opacity:0; width:0; height:0; position:absolute; }
        .ghk-switch .ghk-slider{ position:absolute; inset:0; border-radius:var(--h); background:var(--btn-border); border:1px solid var(--btn-border); transition:0.2s; }
        .ghk-switch .ghk-slider::before{ content:""; position:absolute; height:var(--k); width:var(--k); left:3px; top:50%; transform:translateY(-50%); border-radius:999px; background:var(--panel); box-shadow:var(--shadow); transition:transform .2s; }
        .ghk-switch input:checked + .ghk-slider{ background:var(--accent-2); border-color:var(--accent-2); }
        .ghk-switch input:checked + .ghk-slider::before{ transform:translateY(-50%) translateX(calc(var(--w) - var(--k) - 6px)); }

        .ghk-segment{ display:inline-flex; gap:4px; border:1px solid var(--btn-border); border-radius:999px; padding:4px; background:var(--panel); }
        .ghk-segment label{ position:relative; display:inline-flex; align-items:center; border-radius:999px; overflow:hidden; cursor:pointer; }
        .ghk-segment input[type="radio"]{ position:absolute; inset:0; opacity:0; cursor:pointer; }
        .ghk-segment span{ display:inline-block; padding:8px 14px; border-radius:999px; border:1px solid transparent; }
        .ghk-segment input[type="radio"]:checked + span{ background:var(--btn-on-bg); outline:2px solid var(--accent-2); outline-offset:1px; }

        #ghk-content{ display:block !important; }
        #ghk-content > [hidden]{ display:none !important; }

        @media print { .ghk-art, .ghk-date-paren{ display:none !important; visibility:hidden !important; } html, body, #root { background:#fff !important; } aside, nav, header, footer, .ghk-no-print { display:none !important; } #kochbuch-root { width: calc(210mm - 24mm); margin:0 auto !important; background:#fff !important; border:none !important; box-shadow:none !important; } .ghk-hero, .ghk-hero-inner { background:#fff !important; box-shadow:none !important; } .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; } h2, h3 { break-after:avoid; page-break-after:avoid; } #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } a[href]:after { content:""; } }
      `}</style>

      <div className="ghk-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div className="ghk-hero-inner" style={{ background: "var(--grad-hero)", borderRadius: 12, padding: 14, marginBottom: 12, display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`开始：${meta.startDate}`)}
            {tagChip("第4周")}
            {tagChip("亚洲风味 (中/日/韩)")}
            {tagChip("每日 1× 🍚 电饭煲料理")}
          </div>
        </div>

        <div className="ghk-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <fieldset className="ghk-segment" role="radiogroup" aria-label="选择视图">
            <label>
              <input type="radio" name="ghk-view" value="kochbuch" checked={tab === "kochbuch"} onChange={() => setTab("kochbuch")} />
              <span>{UI_TITLES.main}</span>
            </label>
            <label>
              <input type="radio" name="ghk-view" value="liste" checked={tab === "liste"} onChange={() => setTab("liste")} />
              <span>{UI_TITLES.list}</span>
            </label>
          </fieldset>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginLeft: "auto" }}>
            <button type="button" onClick={doPrint} className="ghk-tab"><span className="icon">🖨️</span> 打印</button>
            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={DATA} DAY_NAME_ZH={DAY_NAME_ZH} meta={meta} />
        <div id="ghk-content" data-view={tab}>
          <section id="ghk-pane-kochbuch" aria-hidden={tab !== "kochbuch"} hidden={tab !== "kochbuch"}>
            {DAYS_ORDER.map((d) => (
              <DaySection key={d} dayKey={d} meals={DATA.filter(r => r.id.startsWith(d))} dayName={DAY_NAME_ZH[d]} />
            ))}
            <RiceCookerSection data={DATA} />
          </section>
          <section id="ghk-pane-liste" aria-hidden={tab !== "liste"} hidden={tab !== "liste"}>
            {Object.entries(listGroups).map(([group, items]) => (
              <div key={group} style={{ marginBottom: 20 }}>
                <h3>{group}</h3>
                <ul>{items.map((it, idx) => <li key={idx}>{`${it.label} – ${Math.round(it.qty * 10) / 10} ${it.unit}`}</li>)}</ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}