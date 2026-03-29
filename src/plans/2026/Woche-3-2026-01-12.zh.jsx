// src/plans/2026/Woche-3-2026-01-12.zh.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – 第3周 (Start: 2026-01-12)
  Design: 1:1 Kopie der DE-Version.
  Content: 日式/中式 (JP/CN), 孕期安全 (全熟/清淡), 多鱼/海鲜, 每日1次电饭煲料理.
*/

// ---- Meta ----
export const meta = {
  title: "第3周",
  startDate: "2026-01-12",
  id: "woche-3-2026-01-12", // ID bleibt gleich für Sync
  lang: "zh",
  sidebar: "第3周 (2026-01-12)",
};

const FILE_BASE = "第3周 2026-01-12";

// ---- UI Labels ----
const UI_TITLES = {
  main: "第3周食谱",
  list: "第3周购物清单",
};

// ---- THEME (Identisch zu DE) ----
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
  mo: "星期一 (2026-01-12)",
  di: "星期二 (2026-01-13)",
  mi: "星期三 (2026-01-14)",
  do: "星期四 (2026-01-15)",
  fr: "星期五 (2026-01-16)",
  sa: "星期六 (2026-01-17)",
  so: "星期日 (2026-01-18)",
};

// -----------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------
export const DATA = [
  // MONDAY
  {
    id: "mo-f",
    title: "日式鲑鱼粥 (Sake Okayu 鮭お粥)",
    desc: "非常温和的早餐：米粥配鲜嫩鲑鱼碎和姜丝。",
    story: "日本传统的养胃早餐，冬天吃特别温暖。鲑鱼富含Omega-3。",
    target: "≈70g 碳水 (2人份) · 蛋白质 ≈25g/人",
    ingredients: [
      "大米 (生) 80 g",
      "清水 800 ml",
      "三文鱼柳 (鲑鱼) 180 g",
      "姜 8 g",
      "葱花 10 g",
      "低钠酱油 5 ml"
    ],
    steps: [
      "大米洗净。三文鱼切大块。",
      "除葱花外，所有食材放入电饭煲。",
      "开启 '煮粥 (Porridge/Congee)' 模式 (约45-60分钟)。",
      "煮好后将鱼弄碎，撒上葱花食用。"
    ],
    checks: "养胃 ✓ · 控糖 ✓ · 孕期安全 ✓ (全熟)",
    swaps: "三文鱼 ↔ 鳕鱼; 姜 ↔ 胡萝卜丝",
    side: "温水或淡绿茶",
    remind: true,
    riceCooker: { enabled: true, program: "Porridge / Congee", water: "1:9 至 1:10", notes: "口感软烂易消化。" },
  },
  {
    id: "mo-m",
    title: "照烧鳕鱼丼 (Teriyaki Cod)",
    desc: "少盐版照烧汁烩鳕鱼，铺在热米饭上。",
    story: "经典的日式盖饭，使用低钠配方更健康。",
    target: "≈78g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "大米 (生) 120 g",
      "鳕鱼柳 220 g",
      "低钠酱油 15 ml",
      "味淋 5 ml",
      "姜末 5 g",
      "葱花 10 g"
    ],
    steps: [
      "正常煮饭。",
      "平底锅煎熟鱼肉，加入照烧汁 (酱油+味淋+姜+少许水)。",
      "收汁 (5-6分钟)，铺在饭上，撒葱花。"
    ],
    checks: "低盐 ✓ · 鱼肉全熟 ✓",
    swaps: "鳕鱼 ↔ 明太鱼",
    side: "腌黄瓜 (清淡)",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "虾仁炒饭 (Xiā Chǎo Fàn)",
    desc: "少油清炒，搭配虾仁和上海青。",
    story: "中式家常菜，控制油量，多加蔬菜。",
    target: "≈72g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 100 g",
      "虾仁 (去壳) 180 g",
      "上海青 200 g",
      "胡萝卜 80 g",
      "低钠酱油 10 ml",
      "芝麻油 5 ml"
    ],
    steps: [
      "米饭提前煮好晾凉。",
      "虾仁炒熟 (3-4分钟) 盛出。",
      "炒软蔬菜，加入米饭和酱油翻炒，最后加入虾仁。"
    ],
    checks: "清淡 ✓ · 虾仁全熟 ✓",
    swaps: "上海青 ↔ 西葫芦",
    side: "茉莉花茶 (淡)",
    remind: true,
    riceCooker: { enabled: false },
  },

  // TUESDAY
  {
    id: "di-f",
    title: "鲑鱼味噌汤 (Sake-Jiru 鮭汁)",
    desc: "暖身味噌汤，加入鲑鱼块、豆腐和蔬菜。",
    story: "灵感来自日本北海道的石狩锅，但口味更清淡养胃。",
    target: "≈60g 碳水 · 蛋白质 ≈23g/人",
    ingredients: [
      "高汤/Dashi 600 ml",
      "味噌酱 20 g",
      "三文鱼柳 160 g",
      "豆腐 150 g",
      "胡萝卜 80 g",
      "葱花 10 g"
    ],
    steps: [
      "高汤煮开，胡萝卜煮5分钟。",
      "加入三文鱼和豆腐，小火煮6-8分钟至全熟。",
      "关火溶解味噌 (不可沸腾)，撒葱花。"
    ],
    checks: "养胃 ✓ · 控糖 ✓ · 孕期安全 ✓",
    swaps: "三文鱼 ↔ 白身鱼",
    side: "一小碗米饭 (计入碳水)",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "蒜香黄油虾仁饭 (电饭煲版)",
    desc: "网红吃法：米饭、虾仁、大蒜一锅出，黄油提香。",
    story: "Dump-and-go 模式，快速、高蛋白、全家爱吃。",
    target: "≈80g 碳水 · 蛋白质 ≈28g/人",
    ingredients: [
      "大米 (生) 120 g",
      "虾仁 (去壳) 200 g",
      "大蒜 6 g",
      "低钠酱油 10 ml",
      "黄油 15 g",
      "蔬菜高汤 250 ml"
    ],
    steps: [
      "洗米，加入高汤和酱油。",
      "加入蒜末和黄油块。",
      "虾仁铺在最上面。开启 '煮饭 (White Rice/Mixed)' 模式。",
      "煮好后拌匀，焖2分钟。"
    ],
    checks: "虾仁全熟 ✓ · 简单快捷 ✓",
    swaps: "虾仁 ↔ 豆腐 + 豌豆",
    side: "清蒸西兰花",
    remind: false,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "高汤至刻度线", notes: "懒人料理首选。" },
  },
  {
    id: "di-a",
    title: "清炖鱼汤 (Qīngdùn Yú)",
    desc: "姜片蔬菜炖白身鱼，汤清味鲜。",
    story: "中式清补凉菜肴，非常适合晚餐。",
    target: "≈62g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "白身鱼 (如海鲈鱼) 260 g",
      "姜 8 g",
      "上海青 200 g",
      "胡萝卜 80 g",
      "蔬菜高汤 700 ml",
      "大米 (生) 80 g"
    ],
    steps: [
      "高汤煮开，姜和胡萝卜煮8分钟。",
      "放入鱼块，小火浸煮6-8分钟。",
      "加入青菜烫熟。配米饭食用。"
    ],
    checks: "清淡 ✓ · 鱼肉全熟 ✓",
    swaps: "上海青 ↔ 菠菜",
    side: "米饭需另煮",
    remind: true,
    riceCooker: { enabled: false },
  },

  // WEDNESDAY
  {
    id: "mi-f",
    title: "电饭煲松饼 (Pancake 炊飯器パンケーキ)",
    desc: "用电饭煲做出的厚松饼，少糖松软，无需看火。",
    story: "简单的早餐蛋糕，确保鸡蛋完全熟透。",
    target: "≈75g 碳水 · 蛋白质 ≈14g/人",
    ingredients: [
      "面粉 120 g",
      "泡打粉 1 茶匙",
      "鸡蛋 2 个",
      "牛奶 120 ml",
      "蜂蜜 12 g",
      "食用油 5 ml"
    ],
    steps: [
      "调好面糊，内胆刷油。",
      "倒入面糊，开启 '蛋糕 (Cake)' 或 '蒸煮 (Steam)' 模式 (25-30分钟)。",
      "牙签测试无粘连即可，冷却5分钟后倒出。"
    ],
    checks: "鸡蛋全熟 (孕期安全) ✓",
    swaps: "面粉 ↔ 全麦粉; 蜂蜜 ↔ 少许糖",
    side: "无糖酸奶",
    remind: true,
    riceCooker: { enabled: true, program: "Cake / Steam", water: "如用Steam：按刻度加水", notes: "口感像海绵蛋糕。" },
  },
  {
    id: "mi-m",
    title: "鲜虾荞麦面 (Ebi-Soba 海老蕎麦)",
    desc: "荞麦面配鲜虾和蔬菜，清爽低脂。",
    story: "日式日常午餐，荞麦升糖慢。",
    target: "≈82g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "荞麦面 (干) 120 g",
      "虾仁 (去壳) 160 g",
      "西葫芦 120 g",
      "胡萝卜 80 g",
      "低钠酱油 15 ml",
      "芝麻油 5 ml"
    ],
    steps: [
      "荞麦面煮熟过凉。",
      "蔬菜炒软，虾仁煮熟 (3-4分钟)。",
      "所有食材混合，加入调料拌匀。"
    ],
    checks: "清淡 ✓ · 孕期安全 ✓",
    swaps: "虾仁 ↔ 豆腐; 荞麦面 ↔ 乌冬面",
    side: "简易拍黄瓜",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "清蒸青口 (姜葱风味)",
    desc: "姜葱清蒸贻贝 (Miesmuscheln)，原汁原味。",
    story: "中式做法；务必确保贝类完全熟透开口。",
    target: "≈60g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "贻贝/青口贝 600 g",
      "姜 10 g",
      "大蒜 1 瓣",
      "葱花 10 g",
      "蔬菜高汤 300 ml",
      "大米 (生) 80 g"
    ],
    steps: [
      "贝类洗净，丢弃开口不闭合的。",
      "高汤加姜煮开，放入贝类蒸煮5-7分钟 (全部开口)。",
      "配米饭食用，淋上汤汁。"
    ],
    checks: "贝类全熟 (防李斯特菌) ✓",
    swaps: "贻贝 ↔ 蛤蜊",
    side: "清炒菠菜",
    remind: true,
    riceCooker: { enabled: false },
  },

  // THURSDAY
  {
    id: "do-f",
    title: "鳕鱼粥 (Cod Congee)",
    desc: "软糯的白粥配鳕鱼块和胡萝卜，极易消化。",
    story: "广式生滚粥风格，适合敏感肠胃。",
    target: "≈68g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "大米 (生) 80 g",
      "清水 800 ml",
      "鳕鱼柳 180 g",
      "胡萝卜 80 g",
      "姜 6 g",
      "低钠酱油 5 ml"
    ],
    steps: [
      "大米加水煮粥 (约45-60分钟)。",
      "加入胡萝卜和姜丝煮10分钟。",
      "放入鱼块，小火浸熟 (6-8分钟)，调味。"
    ],
    checks: "养胃 ✓ · 鱼肉全熟 ✓",
    swaps: "鳕鱼 ↔ 明太鱼",
    side: "温绿茶",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "鲑鱼菠菜乌冬面 (Salmon Udon)",
    desc: "清汤乌冬面，配鲑鱼丁和菠菜。",
    story: "简单饱腹，富含Omega-3。",
    target: "≈86g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "乌冬面 (熟) 400 g",
      "三文鱼柳 180 g",
      "高汤/Dashi 700 ml",
      "低钠酱油 10 ml",
      "菠菜 120 g",
      "葱花 10 g"
    ],
    steps: [
      "高汤煮开加酱油。",
      "乌冬面煮热，加入三文鱼煮4-5分钟至熟。",
      "最后放入菠菜烫熟。"
    ],
    checks: "鲑鱼全熟 ✓",
    swaps: "三文鱼 ↔ 鳕鱼",
    side: "樱桃萝卜 (腌渍)",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "帆立贝黄油焖饭 (Hotate Butter Gohan)",
    desc: "电饭煲料理：扇贝、酱油与黄油的完美结合。",
    story: "网上热门做法：鲜甜扇贝配上黄油香气。",
    target: "≈82g 碳水 · 蛋白质 ≈26g/人",
    ingredients: [
      "大米 (生) 120 g",
      "扇贝柱 (带子) 220 g",
      "高汤/Dashi 240 ml",
      "低钠酱油 12 ml",
      "黄油 12 g",
      "姜 5 g"
    ],
    steps: [
      "洗米，加入高汤和酱油。",
      "扇贝和姜丝铺在上面，放上黄油。",
      "开启 '煮饭' 模式。煮好后焖10分钟再拌匀。"
    ],
    checks: "扇贝全熟 ✓",
    swaps: "扇贝 ↔ 虾仁",
    side: "白灼上海青",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "高汤至刻度线", notes: "煮前不要搅拌。" },
  },

  // FRIDAY
  {
    id: "fr-f",
    title: "鲑鱼茶泡饭 (Ochazuke)",
    desc: "热茶/高汤浇在米饭上，配熟鲑鱼碎。",
    story: "日式治愈系美食，清淡安神。",
    target: "≈66g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "大米 (生) 90 g",
      "高汤/Dashi 500 ml",
      "三文鱼柳 150 g",
      "葱花 10 g",
      "低钠酱油 5 ml",
      "熟芝麻 6 g"
    ],
    steps: [
      "煮饭。三文鱼煎熟弄碎。",
      "米饭盛碗，放上鱼肉。",
      "浇上热高汤，撒葱花芝麻。"
    ],
    checks: "清淡 ✓ · 孕期安全 ✓",
    swaps: "三文鱼 ↔ 白身鱼",
    side: "腌黄瓜",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "海鲜什锦焖饭 (Takikomi Gohan)",
    desc: "白身鱼、虾仁和香菇的电饭煲焖饭。",
    story: "海鲜风味的一锅出，米饭吸收了所有鲜味。",
    target: "≈84g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 120 g",
      "白身鱼 (切丁) 120 g",
      "虾仁 (去壳) 120 g",
      "香菇 50 g",
      "低钠酱油 15 ml",
      "高汤/Dashi 240 ml"
    ],
    steps: [
      "洗米，加高汤和酱油。",
      "铺上海鲜和香菇。",
      "开启 '煮饭' 模式。煮好后焖10分钟再拌松。"
    ],
    checks: "海鲜全熟 ✓",
    swaps: "白身鱼 ↔ 三文鱼; 香菇 ↔ 口蘑",
    side: "味噌汤",
    remind: false,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "高汤至刻度线 (含酱油)", notes: "中途不要开盖。" },
  },
  {
    id: "fr-a",
    title: "海鲜寄锅 (Yosenabe)",
    desc: "清淡海鲜锅：鳕鱼、虾、豆腐和蔬菜。",
    story: "冬季经典，食材丰富，汤底清澈。",
    target: "≈72g 碳水 · 蛋白质 ≈26g/人",
    ingredients: [
      "白身鱼 200 g",
      "虾仁 (去壳) 160 g",
      "豆腐 200 g",
      "大白菜 250 g",
      "高汤/Dashi 800 ml",
      "大米 (生) 90 g"
    ],
    steps: [
      "高汤烧开，煮白菜5-7分钟。",
      "加入海鲜和豆腐，煮6-8分钟至熟。",
      "配米饭食用。"
    ],
    checks: "清淡 ✓ · 孕期安全 ✓",
    swaps: "白身鱼 ↔ 三文鱼",
    side: "绿茶",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SATURDAY
  {
    id: "sa-f",
    title: "金枪鱼饭团 (Tuna Onigiri)",
    desc: "熟金枪鱼拌蛋黄酱馅料，安全美味。",
    story: "便当常客；孕期注意金枪鱼适量，海苔适量。",
    target: "≈70g 碳水 · 蛋白质 ≈18g/人",
    ingredients: [
      "大米 (生) 100 g",
      "金枪鱼 (罐头, 沥干) 120 g",
      "酸奶或蛋黄酱 (巴氏杀菌) 20 g",
      "米醋 8 ml",
      "熟芝麻 6 g",
      "海苔 2 g"
    ],
    steps: [
      "煮饭，温热时拌入少许醋。",
      "金枪鱼与酱料混合。",
      "捏成饭团，包入馅料，贴少许海苔。"
    ],
    checks: "巴氏杀菌酱料 ✓",
    swaps: "金枪鱼 ↔ 熟鲑鱼碎",
    side: "蔬菜条",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "照烧三文鱼丼 (Teriyaki Salmon)",
    desc: "嫩煎三文鱼配照烧汁，盖在饭上。",
    story: "快手午餐，日式家庭风味。",
    target: "≈86g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 120 g",
      "三文鱼柳 220 g",
      "低钠酱油 12 ml",
      "味淋 6 ml",
      "姜 5 g",
      "葱花 10 g"
    ],
    steps: [
      "煮饭。",
      "煎熟三文鱼，倒入调好的照烧汁收浓。",
      "盖在饭上，撒葱花。"
    ],
    checks: "全熟 ✓",
    swaps: "三文鱼 ↔ 鳕鱼",
    side: "清蒸西兰花",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "玉米黄油酱油焖饭 (Corn Butter Rice)",
    desc: "电饭煲网红饭：甜玉米、黄油和酱油的香气。",
    story: "日式夏日祭风味，深受社交网络喜爱。",
    target: "≈84g 碳水 · 低蛋白 (需配菜)",
    ingredients: [
      "大米 (生) 120 g",
      "玉米粒 & 青豆 (冷冻) 160 g",
      "高汤/Dashi 240 ml",
      "低钠酱油 10 ml",
      "黄油 12 g",
      "葱花 10 g"
    ],
    steps: [
      "洗米，加高汤和酱油。",
      "铺上玉米青豆和黄油。",
      "开启 '煮饭' 模式，煮好后拌匀加葱花。"
    ],
    checks: "流行美食 ✓",
    swaps: "玉米 ↔ 胡萝卜丁",
    side: "香煎鳕鱼 (另做)",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "液体至刻度线", notes: "非常受年轻人欢迎。" },
  },

  // SUNDAY
  {
    id: "so-f",
    title: "厚蛋烧三明治 (Tamago Sando)",
    desc: "全熟的日式厚蛋烧夹在全麦面包中。",
    story: "咖啡店经典，这里确保鸡蛋全熟以保安全。",
    target: "≈68g 碳水 · 蛋白质 ≈20g/人",
    ingredients: [
      "鸡蛋 4 个",
      "牛奶 40 ml",
      "全麦面包 4 片",
      "低钠酱油 5 ml",
      "葱花 8 g",
      "食用油 5 ml"
    ],
    steps: [
      "蛋液加奶/酱油打匀。",
      "平底锅慢煎成厚蛋烧 (内部需凝固)。",
      "夹入面包，切块。"
    ],
    checks: "鸡蛋全熟 ✓",
    swaps: "面包 ↔ 米饭",
    side: "番茄片",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "鲑鱼麻婆豆腐 (温和版)",
    desc: "用鲑鱼碎代替肉末，味噌代替辣酱的温和版。",
    story: "四川名菜的创意改良，适合孕期口味。",
    target: "≈74g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "嫩豆腐 300 g",
      "三文鱼柳 180 g",
      "味噌酱 20 g",
      "蔬菜高汤 200 ml",
      "淀粉 1 茶匙",
      "大米 (生) 100 g"
    ],
    steps: [
      "三文鱼煮熟弄碎。",
      "味噌加高汤煮开，放入豆腐块炖5分钟。",
      "加入鱼碎，勾芡，配饭食用。"
    ],
    checks: "温和不辣 ✓ · 营养丰富 ✓",
    swaps: "三文鱼 ↔ 白身鱼; 豆腐 ↔ 老豆腐",
    side: "水煮上海青",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "网红番茄饭 2.0 (鲜虾版)",
    desc: "整颗番茄与米饭同煮，加入虾仁增加蛋白质。",
    story: "网络爆款，酸甜开胃，制作极其简单。",
    target: "≈86g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "大米 (生) 120 g",
      "番茄 (大) 1 个",
      "虾仁 (去壳) 160 g",
      "橄榄油 10 ml",
      "低钠酱油 10 ml",
      "玉米粒 & 青豆 (冷冻) 80 g"
    ],
    steps: [
      "米和水 (略少) 入锅，加酱油/油。",
      "番茄去蒂放中间，虾仁蔬菜放周围。",
      "开启 '煮饭' 模式。煮好后捣碎番茄拌匀。"
    ],
    checks: "虾仁全熟 ✓",
    swaps: "虾仁 ↔ 蘑菇; 橄榄油 ↔ 芝麻油",
    side: "煎蛋 (全熟) 可选",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "比平时略少 (番茄出水)", notes: "番茄要熟透的。" },
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
  "豆腐": { group: "Protein/Fisch/Tofu", label: "豆腐", unitDefault: "g" },
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
  "葱": { group: "Gemüse/Pilze", label: "葱", unitDefault: "g" },
  "葱花": { group: "Gemüse/Pilze", label: "葱", unitDefault: "g" },
  "洋葱": { group: "Gemüse/Pilze", label: "洋葱", unitDefault: "g" },
  "大蒜": { group: "Gemüse/Pilze", label: "大蒜", unitDefault: "瓣" },
  "姜": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "姜末": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "姜丝": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "番茄": { group: "Gemüse/Pilze", label: "番茄", unitDefault: "个" },
  "玉米粒": { group: "Gemüse/Pilze", label: "玉米/青豆 (冷冻)", unitDefault: "g" },

  // Carbs
  "大米": { group: "Reis/Nudeln/Sättigung", label: "大米 (生)", unitDefault: "g" },
  "荞麦面": { group: "Reis/Nudeln/Sättigung", label: "荞麦面", unitDefault: "g" },
  "红薯粉丝": { group: "Reis/Nudeln/Sättigung", label: "红薯粉丝", unitDefault: "g" },
  "乌冬面": { group: "Reis/Nudeln/Sättigung", label: "乌冬面", unitDefault: "g" },
  "小米": { group: "Reis/Nudeln/Sättigung", label: "小米", unitDefault: "g" },
  "面粉": { group: "Reis/Nudeln/Sättigung", label: "面粉", unitDefault: "g" },
  "粘米粉": { group: "Reis/Nudeln/Sättigung", label: "粘米粉", unitDefault: "g" },
  "全麦面包": { group: "Reis/Nudeln/Sättigung", label: "全麦面包", unitDefault: "片" },

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
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
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
        else if (name.includes("金枪鱼")) key = "金枪鱼";
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
      <text x='40' y='180' font-size='20' fill='#374151'>GhibliKitchen</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw3" }) {
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
        <h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3>
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
        {dayName.replace(/\s*\(.+\)$/ , "")} <span className="ghk-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
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
            第3周 – 总览 <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>JP/CN · 孕期安全 (全熟/清淡) · 多鱼/海鲜 · 每日1次电饭煲料理</p>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>本周热门: 蒜香黄油虾仁饭, 帆立贝黄油焖饭, 玉米黄油酱油焖饭, 网红番茄饭.</p>
    </section>
  );
}

// PDF Export
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));
async function exportPdfFromRoot(rootEl, filename) {
  await ensureScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");
  if (!window.html2pdf) throw new Error("html2pdf 不可用");
  const clone = rootEl.cloneNode(true);
  clone.id = "kochbuch-export";
  clone.classList.add("ghk-exporting");
  document.body.appendChild(clone);
  window.scrollTo(0, 0);
  await nextFrame();
  const opt = {
    margin: [34, 28, 34, 28],
    filename,
    pagebreak: { mode: ["css", "legacy"], after: [".day-section"], avoid: [".meal-card", ".ghk-hero"] },
    html2canvas: { backgroundColor: "#FFFFFF", useCORS: true, logging: false, scale: 2, scrollY: -window.scrollY },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
  };
  try { await window.html2pdf().set(opt).from(clone).save(); } finally { clone.remove(); }
}

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
export default function Woche3ZH() {
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

  const doExportPDF = async () => {
    const el = document.getElementById("kochbuch-root");
    if (!el) return;
    await exportPdfFromRoot(el, `${meta.title} ${meta.startDate}.pdf`);
  };
  const doPrint = () => window.print();
  const doExportHTML = () => {
    const pageBg = getComputedStyle(document.documentElement).getPropertyValue("--bg")?.trim() || "#FFFFFF";
    const url = exportHTMLById("kochbuch-root", `${meta.title} ${meta.startDate}`, buildEmbedCss(), pageBg);
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${FILE_BASE}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  // Internal Styles (Identical to Week 2)
  const Styles = () => (
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

      .ghk-exporting{ width:794px !important; max-width:794px !important; margin:0 auto !important; background:#fff !important; box-sizing:border-box !important; font-size:12pt !important; line-height:1.45 !important; --bg:#FFFFFF; --text:#111827; --panel:#FFFFFF; --border:rgba(0,0,0,.12); --muted:#374151; --chip-bg:#F3F4F6; --btn-border:rgba(0,0,0,.15); --btn-on-bg:#F3F4F6; }
      .ghk-exporting *{ box-shadow:none !important; }
      .ghk-exporting .ghk-art, .ghk-exporting img{ display:none !important; visibility:hidden !important; }
      .ghk-exporting .ghk-chip, .ghk-exporting .ghk-date-paren{ display:none !important; }

      @media print { .ghk-art, .ghk-date-paren{ display:none !important; visibility:hidden !important; } html, body, #root { background:#fff !important; } aside, nav, header, footer, .ghk-no-print { display:none !important; } #kochbuch-root { width: calc(210mm - 24mm); margin:0 auto !important; background:#fff !important; border:none !important; box-shadow:none !important; } .ghk-hero, .ghk-hero-inner { background:#fff !important; box-shadow:none !important; } .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; } h2, h3 { break-after:avoid; page-break-after:avoid; } #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } a[href]:after { content:""; } }
    `}</style>
  );

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      <Styles />

      <div className="ghk-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div className="ghk-hero-inner" style={{ background: "var(--grad-hero)", borderRadius: 12, padding: 14, marginBottom: 12, display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`开始：${meta.startDate}`)}
            {tagChip("第3周")}
            {tagChip("JP/CN · 孕期安全 · 多海鲜")}
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
            <button type="button" onClick={doExportPDF} className="ghk-tab"><span className="icon">📄</span> PDF</button>
            <button type="button" onClick={doExportHTML} className="ghk-tab"><span className="icon">🌐</span> HTML</button>
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