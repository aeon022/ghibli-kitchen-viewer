// src/plans/2026/Woche-1-2025-12-29.zh.jsx
import { SharedMealCard } from "@/components/MealCard";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – 第1周 (Start: 2025-12-29)
  Optimized version matching the DE layout.
*/

// ---- Meta ----
export const meta = {
  title: "第1周",
  startDate: "2025-12-29",
  id: "woche-1-2025-12-29", // WICHTIG: Identisch zu DE, ohne "-zh"
  lang: "zh",
  sidebar: "第1周（2025-12-29）",
};

const FILE_BASE = "第1周 2025-12-29";

// ---- UI Labels ----
const UI_TITLES = {
  main: "第1周食谱", // Analog zu "Rezepte Woche 1"
  list: "第1周购物清单",
};

// ---- THEME (CSS 变量) ----
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
  "--grad-hero":
    "linear-gradient(135deg, rgba(224,122,154,.2), rgba(42,167,105,.18))",
  "--btn-on-bg": "#EEF8F3",
  "--btn-border": "rgba(0,0,0,.15)"
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
  "--grad-hero":
    "linear-gradient(135deg, rgba(224,122,154,.18), rgba(42,167,105,.15))",
  "--btn-on-bg": "rgba(255,255,255,.10)",
  "--btn-border": "rgba(255,255,255,.18)"
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

/* ----------------------- Gate / Lang Hint ------------------------ */
function getLangFromQuery() {
  if (typeof window === "undefined") return null;
  try {
    const qs = new URLSearchParams(window.location.search);
    const fromQuery = qs.get("lang");
    return fromQuery ? String(fromQuery).slice(0, 2).toLowerCase() : null;
  } catch {
    return null;
  }
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

const cardPanelStyle = {
  background: "var(--panel)",
  borderRadius: 18,
  padding: 20,
  boxShadow: "var(--shadow)",
  border: "1px solid var(--border)",
};

const tagChip = (text) => (
  <span
    className="mkt-chip"
    style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 999,
      background: "var(--chip-bg)",
      border: "1px solid var(--border)",
      fontSize: 12,
      marginRight: 6,
      marginBottom: 6,
    }}
  >
    {text}
  </span>
);

// ---- Weekday helpers ----
const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_ZH = {
  mo: "星期一 (2025-12-29)",
  di: "星期二 (2025-12-30)",
  mi: "星期三 (2025-12-31)",
  do: "星期四 (2026-01-01)",
  fr: "星期五 (2026-01-02)",
  sa: "星期六 (2026-01-03)",
  so: "星期日 (2026-01-04)",
};

// ---- DATA (21 道菜) ----
export const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "玄米粥·鸡肉香菇（玄米粥）",
    desc: "日式糙米粥，口味清淡；鸡胸切丁，香菇提升鲜味。",
    story:
      "在日本家庭里，粥是经典的安慰食物。糙米更耐饿，适合寒冷的清晨。",
    target: "≈68 g 碳水（2人）· 蛋白≈25 g/人",
    ingredients: [
      "Brauner Reis (roh) 80 g",
      "Wasser 900 ml",
      "Hähnchenbrust 160 g",
      "Shiitake 80 g",
      "Ingwer 8 g",
      "Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 15 g",
    ],
    steps: [
      "淘米后小火煮35–40分钟（或电饭煲粥/Congee程序）。",
      "鸡肉切小丁，20分钟时加入；香菇与姜同煮。",
      "清淡调味，撒上葱花即可。",
    ],
    checks:
      "胃炎 ✓ 很温和 · 糖代谢 ✓ ≈68 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps:
      "糙米 ↔ 普通米；鸡肉 ↔ 豆腐；香菇 ↔ 蘑菇。",
    side: "清淡黄瓜渍；麦茶。",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Porridge/Congee",
      water: "米:水 = 1:10–11",
      notes: "鸡肉在20分钟时加入，总时长依机型约60–70分钟。",
    },
  },
  {
    id: "mo-m",
    title: "豆腐碎盖饭（そぼろ丼风）· 全麦米",
    desc: "日式改良：调味豆腐“肉末”配菠菜与胡萝卜，低盐清淡。",
    story: "传统そぼろ丼多用肉末；豆腐版更轻盈，适合午餐。",
    target: "≈72 g 碳水（2人）· 蛋白≈28 g/人",
    ingredients: [
      "Vollkornreis (roh) 90 g",
      "Tofu fest 300 g",
      "Spinat 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 20 ml",
      "Sesamöl 8 ml",
    ],
    steps: [
      "煮饭。",
      "豆腐捏碎少油煎 6–7 分钟，清淡调味。",
      "菠菜与胡萝卜焯熟，铺在米饭上。",
    ],
    checks: "胃炎 ✓ 温和 · 糖代谢 ✓ ≈72 g 碳水 · 孕期 ✓ 全熟",
    swaps: "豆腐 ↔ 火鸡肉末；全麦米 ↔ 白米。",
    side: "淡味味噌汤。",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "清汤锅烧乌冬（不加蛋）",
    desc: "清淡高汤配乌冬、鸡肉与蔬菜；无生蛋。",
    story: "冬季人气暖面，这里做成更清爽、孕期可食的版本。",
    target: "≈80 g 碳水（2人）· 蛋白≈30 g/人",
    ingredients: [
      "Udon (trocken) 110 g",
      "Hähnchenbrust 220 g",
      "Pak Choi 200 g",
      "Shiitake 100 g",
      "Zwiebel 60 g",
      "Miso hell 20 g",
      "Sojasauce natriumarm 15 ml",
      "Wasser 1000 ml",
    ],
    steps: [
      "调好汤底，鸡肉小火煮 6–8 分钟至熟。",
      "蔬菜入锅再煮 3–4 分钟。",
      "乌冬另煮后拌入。",
    ],
    checks: "胃炎 ✓ 清淡 · 糖代谢 ✓ ≈80 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。",
    side: "清拌黄瓜；花草茶。",
    remind: true,
    riceCooker: { enabled: false },
  },

  // 周二
  {
    id: "di-f",
    title: "燕麦米粥·苹果豆腐（韩式粥风，低糖）",
    desc: "燕麦+大米的柔和早餐粥，加入豆腐丁。",
    story: "韩式粥有许多变化；燕麦提供可溶纤维，饱腹温和。",
    target: "≈66 g 碳水（2人）· 蛋白≈22 g/人",
    ingredients: [
      "Reis (roh) 60 g",
      "Zarte Haferflocken 30 g",
      "Wasser 900 ml",
      "Tofu fest 150 g",
      "Apfel 150 g",
      "Zimt 1 Prise",
    ],
    steps: [
      "米+水煮 20 分钟。",
      "加入燕麦再煮 5–8 分钟。",
      "豆腐与苹果丁再焖 2–3 分钟。",
    ],
    checks: "胃炎 ✓ 软暖 · 糖代谢 ✓ ≈66 g 碳水 · 孕期 ✓ 全熟",
    swaps: "苹果 ↔ 梨；豆腐 ↔ 鸡丁。",
    side: "麦茶；小黄瓜渍。",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "鸡肉西兰花荞麦面（清淡版）",
    desc: "快手少油；鸡肉、花椰菜与洋葱拌荞麦面。",
    story: "热荞麦面很适合午餐；这里做成炒拌版本。",
    target: "≈74 g 碳水（2人）· 蛋白≈33 g/人",
    ingredients: [
      "Soba (trocken) 100 g",
      "Hähnchenbrust 220 g",
      "Brokkoli 220 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 15 g",
    ],
    steps: [
      "煮熟荞麦面。",
      "鸡肉条煎 6–8 分钟至熟。",
      "加入蔬菜略炒，拌入面与酱。",
    ],
    checks: "胃炎 ✓ 清淡 · 糖代谢 ✓ ≈74 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps: "荞麦面 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "清淡黄瓜沙拉（不加醋）。",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "清蒸鳕鱼配米饭（电饭煲蒸屉）",
    desc: "姜丝与葱段提味的清蒸鳕鱼，配新煮白米。",
    story: "粤式清蒸让鱼肉更嫩、无辣更好消化。",
    target: "≈72 g 碳水（2人）· 蛋白≈30 g/人",
    ingredients: [
      "Reis (roh) 90 g",
      "Kabeljaufilet 320 g",
      "Ingwer 12 g",
      "Frühlingszwiebel 25 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
      "Gemüsebrühe 80 ml",
    ],
    steps: [
      "电饭煲煮饭。",
      "蒸屉铺姜片放鱼，蒸 8–10 分钟至熟。",
      "以清汤、淡酱油、芝麻油调热汁，浇在鱼上配饭食用。",
    ],
    checks: "胃炎 ✓ 蒸 · 糖代谢 ✓ ≈72 g 碳水 · 孕期 ✓ 鳕鱼全熟",
    swaps: "鳕鱼 ↔ 三文鱼/狭鳕；白米 ↔ 全麦米。",
    side: "清蒸青菜；花草茶。",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White/Brown Rice + Steam basket",
      water: "米:水 = 1:1.2–1.4（依品种）",
      notes: "饭程剩约10分钟时蒸鱼恰好同时完成。",
    },
  },

  // 周三
  {
    id: "mi-f",
    title: "味噌蔬菜米粥（清淡）",
    desc: "稠滑米粥加少量淡味噌，胡萝卜与豆腐，十分温和。",
    story: "杂炊/粥类是御寒佳品，这里盐分更低、口味更柔。",
    target: "≈70 g 碳水（2人）· 蛋白≈22 g/人",
    ingredients: [
      "Reis (roh) 80 g",
      "Wasser 900 ml",
      "Miso hell 15 g",
      "Tofu fest 180 g",
      "Karotte 120 g",
      "Ingwer 6 g",
    ],
    steps: [
      "米煮 30–35 分钟，胡萝卜煮至软。",
      "离火拌入味噌（不再煮）。",
      "加入豆腐焖 2–3 分钟。",
    ],
    checks: "胃炎 ✓ 很温和 · 糖代谢 ✓ ≈70 g 碳水 · 孕期 ✓ 全熟",
    swaps: "豆腐 ↔ 鸡丁；白米 ↔ 糙米（需更多水）。",
    side: "低咖啡因绿茶。",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "豆芽拌饭（Kongnamul-bap）",
    desc: "韩式蔬菜饭：豆芽与胡萝卜铺在米饭上，清淡蘸汁分开。",
    story: "家常经典，常用锅或电饭煲完成。",
    target: "≈82 g 碳水（2人）· 蛋白≈20 g/人",
    ingredients: [
      "Reis (roh) 100 g",
      "Bohnenkeime 250 g",
      "Karotte 120 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 15 ml",
      "Sesamöl 6 ml",
    ],
    steps: [
      "煮饭。",
      "豆芽与胡萝卜蒸 3–4 分钟，拌入米饭。",
      "清淡蘸汁另上桌。",
    ],
    checks: "胃炎 ✓ 温和 · 糖代谢 ✓ ≈82 g 碳水 · 孕期 ✓ 蔬菜蒸熟",
    swaps: "白米 ↔ 全麦米；豆芽 ↔ 菠菜。",
    side: "小份黄瓜渍（无辣）。",
    remind: false,
    riceCooker: {
      enabled: true,
      program: "White Rice",
      water: "1:1.2–1.4",
      notes: "最后 5–8 分钟把豆芽铺在上层蒸熟即可。",
    },
  },
  {
    id: "mi-a",
    title: "鱼香茄子（无辣）配米饭",
    desc: "软糯茄子裹上微甜鲜香的酱汁；不放辣椒。",
    story: "家常无辣版，炖到全软，适合全家食用。",
    target: "≈78 g 碳水（2人）· 蛋白≈22 g/人",
    ingredients: [
      "Reis (roh) 90 g",
      "Auberginen 350 g",
      "Paprika 120 g",
      "Knoblauch 1 Zehe",
      "Ingwer 8 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 10 g",
      "Maisstärke 10 g",
    ],
    steps: [
      "煮饭。",
      "茄子与甜椒炖 8–10 分钟至软。",
      "勾芡收汁，浇在米饭上。",
    ],
    checks: "胃炎 ✓ 软炖 · 糖代谢 ✓ ≈78 g 碳水 · 孕期 ✓ 全熟",
    swaps: "茄子 ↔ 西葫芦；白米 ↔ 全麦米。",
    side: "清蒸西兰花。",
    remind: true,
    riceCooker: { enabled: false },
  },

  // 周四
  {
    id: "do-f",
    title: "清淡蛋包饭（鸡蛋全熟）",
    desc: "和洋风：蔬菜炒饭卷入蛋皮，少量番茄味；鸡蛋全熟。",
    story: "人气洋食，这里更注重纤维与孕期安全。",
    target: "≈70 g 碳水（2人）· 蛋白≈26 g/人",
    ingredients: [
      "Reis (roh) 80 g",
      "Eier 4 Stück",
      "Hähnchenbrust 120 g",
      "Karotte 100 g",
      "Erbsen (TK) 100 g",
      "Zwiebel 60 g",
      "Tomatenmark 10 g",
    ],
    steps: [
      "煮饭；鸡肉与蔬菜炒 8–10 分钟。",
      "与米饭拌匀；摊蛋皮并完全凝固后卷起。",
      "略焖即可。",
    ],
    checks: "胃炎 ✓ 温和 · 糖代谢 ✓ ≈70 g 碳水 · 孕期 ✓ 蛋全熟",
    swaps: "白米 ↔ 全麦米；鸡肉 ↔ 豆腐。",
    side: "生菜小沙拉（少油不加醋）。",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "清炖鸡蔬一锅（Jjimdak风，无辣）",
    desc: "灵感自韩式焖鸡：鸡肉、土豆、胡萝卜与少量粉丝，口味清淡。",
    story: "传统做法偏甜咸且带辣；这里无辣、家常友好。",
    target: "≈86 g 碳水（2人）· 蛋白≈34 g/人",
    ingredients: [
      "Glasnudeln (roh) 40 g",
      "Hähnchenbrust 250 g",
      "Kartoffeln 200 g",
      "Karotte 150 g",
      "Zwiebel 80 g",
      "Sojasauce natriumarm 20 ml",
      "Wasser 500 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "鸡肉与蔬菜小火焖 15–18 分钟。",
      "粉丝入锅 3–4 分钟。",
      "略勾芡即可。",
    ],
    checks: "胃炎 ✓ 清炖 · 糖代谢 ✓ ≈86 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps: "粉丝 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "无辣黄瓜渍。",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "清爽海南鸡饭（电饭煲法）",
    desc: "嫩鸡胸铺香米饭；整体清淡低钠。",
    story: "东南亚名菜的清爽版，适合晚上吃。",
    target: "≈84 g 碳水（2人）· 蛋白≈32 g/人",
    ingredients: [
      "Reis (roh) 100 g",
      "Hähnchenbrust 280 g",
      "Ingwer 15 g",
      "Knoblauch 1 Zehe",
      "Frühlingszwiebel 20 g",
      "Sesamöl 6 ml",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "淘米入锅，加水、姜与蒜。",
      "鸡胸放在米上同煮至≥75°C。",
      "切片装盘，米饭松散，点少许香油与葱。",
    ],
    checks: "胃炎 ✓ 温和 · 糖代谢 ✓ ≈84 g 碳水 · 孕期 ✓ 鸡全熟",
    swaps: "鸡 ↔ 火鸡；白米 ↔ 全麦米（需更多水）。",
    side: "清蒸青菜；温和清汤蘸食。",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White/Brown Rice",
      water: "1:1.2–1.6",
      notes: "整块鸡胸置于米上；跳保温后再焖 10 分钟。",
    },
  },

  // 周五
  {
    id: "fr-f",
    title: "蔬菜味噌汤配豆腐（Tojiru风，无猪肉）+ 小碗米饭",
    desc: "富含根茎蔬菜的暖汤，配少量米饭。",
    story: "Tojiru 很暖身；此版素食且温和。",
    target: "≈64 g 碳水（2人）· 蛋白≈24 g/人",
    ingredients: [
      "Reis (roh) 80 g",
      "Miso hell 25 g",
      "Tofu fest 250 g",
      "Daikon 200 g",
      "Karotte 120 g",
      "Zwiebel 60 g",
      "Wasser 1000 ml",
    ],
    steps: [
      "蔬菜在水/清汤中小火煮 12–15 分钟。",
      "拌入味噌；加入豆腐焖 2–3 分钟。",
      "配小碗米饭食用。",
    ],
    checks: "胃炎 ✓ 清淡 · 糖代谢 ✓ ≈64 g 碳水 · 孕期 ✓ 全熟",
    swaps: "豆腐 ↔ 鸡丁；白米 ↔ 全麦米。",
    side: "低咖啡因绿茶。",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "日式什锦饭（Takikomi-gohan）· 鸡肉根茎类",
    desc: "电饭煲一锅完成，米饭吸收蔬菜与香菇的鲜味。",
    story: "适合备餐的家常菜。",
    target: "≈88 g 碳水（2人）· 蛋白≈28 g/人",
    ingredients: [
      "Reis (roh) 110 g",
      "Hähnchenbrust 220 g",
      "Shiitake 100 g",
      "Karotte 120 g",
      "Sojasauce natriumarm 20 ml",
      "Miso hell 10 g",
      "Wasser 900 ml",
    ],
    steps: [
      "淘米与调味液入锅。",
      "鸡肉与蔬菜切小丁铺在上面。",
      "启动程序；结束后翻松即可。",
    ],
    checks: "胃炎 ✓ 温和 · 糖代谢 ✓ ≈88 g 碳水 · 孕期 ✓ 鸡肉全熟",
    swaps: "鸡 ↔ 豆腐；白米 ↔ 全麦米。",
    side: "黄瓜渍；花草茶。",
    remind: false,
    riceCooker: {
      enabled: true,
      program: "Mixed/White Rice",
      water: "1:1.3–1.5（含调味液）",
      notes: "保温静置 10 分钟再开盖翻松。",
    },
  },
  {
    id: "fr-a",
    title: "清爽味噌三文鱼+糙米（淡照烧风）",
    desc: "温火煨三文鱼配淡味噌汁，搭配糙米与西兰花。",
    story: "有照烧神韵，但更低盐、多蔬菜，适合晚餐。",
    target: "≈76 g 碳水（2人）· 蛋白≈33 g/人",
    ingredients: [
      "Lachsfilet 300 g",
      "Brauner Reis (roh) 90 g",
      "Brokkoli 250 g",
      "Miso hell 20 g",
      "Sojasauce natriumarm 15 ml",
      "Honig 5 ml",
      "Ingwer 8 g",
      "Wasser 600 ml",
    ],
    steps: [
      "煮糙米（30–35 分钟）。",
      "三文鱼温火煨 8–10 分钟；酱汁略收浓。",
      "配西兰花一起食用。",
    ],
    checks: "胃炎 ✓ 清淡 · 糖代谢 ✓ ≈76 g 碳水 · 孕期 ✓ 三文鱼全熟、低汞",
    swaps: "三文鱼 ↔ 鳕鱼；糙米 ↔ 白米。",
    side: "麦茶。",
    remind: true,
    riceCooker: { enabled: false },
  },

  // 周六
  {
    id: "sa-f",
    title: "红薯米粥（电饭煲）",
    desc: "糯滑米粥加红薯丁，自然甘甜、富含纤维。",
    story: "在日本很受欢迎的柔和早晨粥。",
    target: "≈72 g 碳水（2人）· 蛋白≈18 g/人",
    ingredients: [
      "Reis (roh) 80 g",
      "Süßkartoffel 220 g",
      "Wasser 900 ml",
      "Tofu fest 120 g",
      "Zimt 1 Prise",
    ],
    steps: [
      "除豆腐外同煮 35–40 分钟或电饭煲粥程序。",
      "加入豆腐再焖 2–3 分钟。",
      "清淡调味即可。",
    ],
    checks: "胃炎 ✓ 很温和 · 糖代谢 ✓ ≈72 g 碳水 · 孕期 ✓ 全熟",
    swaps: "红薯 ↔ 南瓜；豆腐 ↔ 鸡丁。",
    side: "温水或麦茶。",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Porridge/Congee",
      water: "1:10–11",
      notes: "红薯切小丁；总时长 60–70 分钟视机型而定。",
    },
  },
  {
    id: "sa-m",
    title: "清淡炸酱豆腐面（全麦面）",
    desc: "以豆腐代替肥肉的黑酱面，更多蔬菜、低盐。",
    story: "韩中融合家常面，这里更轻盈。",
    target: "≈86 g 碳水（2人）· 蛋白≈26 g/人",
    ingredients: [
      "Vollkornnudeln (roh) 120 g",
      "Tofu fest 250 g",
      "Zucchini 150 g",
      "Zwiebel 100 g",
      "Kartoffeln 150 g",
      "Schwarzbohnenpaste (mild) 25 g",
      "Gemüsebrühe 300 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "煮面。",
      "炒香蔬菜，加入清汤与黑酱，小火 6–8 分钟。",
      "下豆腐略勾芡即可。",
    ],
    checks: "胃炎 ✓ 温和 · 糖代谢 ✓ ≈86 g 碳水 · 孕期 ✓ 全熟",
    swaps: "豆腐 ↔ 鸡丁；全麦面 ↔ 乌冬。",
    side: "黄瓜丝（不加醋）。",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "茶碗蒸套餐 + 米饭（鸡蛋全凝）",
    desc: "日式蒸蛋，确保完全凝固；配一小碗米饭与菠菜。",
    story: "细腻口感、清淡轻盈，适合晚餐。",
    target: "≈64 g 碳水（2人）· 蛋白≈27 g/人",
    ingredients: [
      "Eier 4 Stück",
      "Dashi (mild) 400 ml",
      "Tofu fest 150 g",
      "Spinat 200 g",
      "Reis (roh) 80 g",
      "Sojasauce natriumarm 10 ml",
    ],
    steps: [
      "煮饭。",
      "鸡蛋与高汤混匀，杯蒸 15–18 分钟至完全凝固。",
      "菠菜焯水后用淡酱油调味，同食。",
    ],
    checks: "胃炎 ✓ 清淡 · 糖代谢 ✓ ≈64 g 碳水 · 孕期 ✓ 蛋全熟",
    swaps: "豆腐 ↔ 鸡丁；白米 ↔ 全麦米。",
    side: "花草茶；黄瓜渍。",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Steam basket über Reis",
      water: "1:1.2–1.4（米）",
      notes: "煮饭同时蒸蛋 15–18 分钟，盖子保持关闭。",
    },
  },

  // 周日
  {
    id: "so-f",
    title: "豆腐纳豆拌饭（无生蛋）",
    desc: "使用巴氏杀菌纳豆与热米饭的日式早餐组合。",
    story: "传统能量早餐；无生蛋、调味温和。",
    target: "≈64 g 碳水（2人）· 蛋白≈23 g/人",
    ingredients: [
      "Reis (roh) 80 g",
      "Natto (pasteurisiert) 100 g",
      "Tofu fest 150 g",
      "Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml",
      "Wasser 500 ml",
    ],
    steps: [
      "煮饭。",
      "按包装说明拌纳豆，调入少量淡酱油。",
      "与豆腐丁、葱花一起浇在热米饭上。",
    ],
    checks: "胃炎 ✓ 温和 · 糖代谢 ✓ ≈64 g 碳水 · 孕期 ✓ 无生蛋、经巴氏杀菌",
    swaps: "纳豆 ↔ 毛豆；豆腐 ↔ 全熟蛋条。",
    side: "淡绿茶或麦茶。",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "番茄牛肉豆腐配米饭（清爽版）",
    desc: "慢炖番茄带来柔和酸味，瘦牛与豆腐，温和易消化。",
    story: "家常鲜嫩的酱汁饭。",
    target: "≈78 g 碳水（2人）· 蛋白≈34 g/人",
    ingredients: [
      "Reis (roh) 90 g",
      "Rinderhack mager 220 g",
      "Tofu fest 200 g",
      "Tomaten (reif) 350 g",
      "Zwiebel 60 g",
      "Sojasauce natriumarm 15 ml",
      "Maisstärke 8 g",
    ],
    steps: [
      "煮饭。",
      "牛肉末炒至全熟；番茄与洋葱小火炖 10 分钟。",
      "加入豆腐略勾芡即可。",
    ],
    checks: "胃炎 ✓ 微酸但软烂 · 糖代谢 ✓ ≈78 g 碳水 · 孕期 ✓ 肉全熟",
    swaps: "牛肉 ↔ 火鸡；白米 ↔ 全麦米。",
    side: "清蒸青菜。",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "红薯饭 + 烤鳕鱼（电饭煲红薯饭）",
    desc: "电饭煲做红薯饭，配嫩烤鳕鱼；整体清淡。",
    story: "季节风味的温暖组合。",
    target: "≈86 g 碳水（2人）· 蛋白≈30 g/人",
    ingredients: [
      "Reis (roh) 110 g",
      "Süßkartoffel 220 g",
      "Kabeljaufilet 300 g",
      "Wasser 900 ml",
      "Sojasauce natriumarm 10 ml",
      "Sesam 5 g",
    ],
    steps: [
      "淘米、红薯丁一同入锅煮成红薯饭。",
      "鳕鱼入烤箱 8–10 分钟至全熟。",
      "清淡调味后装盘。",
    ],
    checks: "胃炎 ✓ 温和 · 糖代谢 ✓ ≈86 g 碳水 · 孕期 ✓ 鳕鱼全熟",
    swaps: "鳕鱼 ↔ 三文鱼；白米 ↔ 全麦米。",
    side: "黄瓜渍；花草茶。",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White Rice",
      water: "1:1.2–1.4",
      notes: "红薯丁铺上层；焖 10 分钟再开盖。",
    },
  },
];

// ---- 购物清单（自动汇总）----
const CANON = {
  // 蛋白
  Lachsfilet: { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  Kabeljaufilet: { group: "Protein/Fisch/Tofu", label: "Kabeljaufilet", unitDefault: "g" },
  "Rinderhack mager": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  Hähnchenbrust: { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Tofu seiden": { group: "Protein/Fisch/Tofu", label: "Tofu (seiden)", unitDefault: "g" },
  "Tofu fest": { group: "Protein/Fisch/Tofu", label: "Tofu (fest)", unitDefault: "g" },
  Natto: { group: "Protein/Fisch/Tofu", label: "Natto (pasteurisiert)", unitDefault: "g" },
  // 鸡蛋
  Eier: { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },

  // 蔬菜/菌菇
  Spinat: { group: "Gemüse/Pilze", label: "Spinat", unitDefault: "g" },
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  Brokkoli: { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  Zucchini: { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  Karotte: { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  Paprika: { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  Shiitake: { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  Champignons: { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  Zwiebel: { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  Daikon: { group: "Gemüse/Pilze", label: "Daikon/Rettich", unitDefault: "g" },
  Kartoffeln: { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },
  Kürbis: { group: "Gemüse/Pilze", label: "Kürbis (Kabocha/Hokkaido)", unitDefault: "g" },
  Süßkartoffel: { group: "Gemüse/Pilze", label: "Süßkartoffeln", unitDefault: "g" },
  Tomaten: { group: "Gemüse/Pilze", label: "Tomaten (reif)", unitDefault: "g" },
  Frühlingszwiebel: { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  Gurke: { group: "Gemüse/Pilze", label: "Gurken", unitDefault: "g" },
  Edamame: { group: "Gemüse/Pilze", label: "Edamame (geschält)", unitDefault: "g" },
  Bohnenkeime: { group: "Gemüse/Pilze", label: "Bohnenkeime", unitDefault: "g" },
  Apfel: { group: "Gemüse/Pilze", label: "Äpfel", unitDefault: "g" },
  Erbsen: { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  Ingwer: { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  Knoblauch: { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },

  // 米/面/主食
  Reis: { group: "Reis/Nudeln/Sättigung", label: "Reis (roh)", unitDefault: "g" },
  Vollkornreis: { group: "Reis/Nudeln/Sättigung", label: "Vollkornreis (roh)", unitDefault: "g" },
  "Brauner Reis": { group: "Reis/Nudeln/Sättigung", label: "Brauner Reis (roh)", unitDefault: "g" },
  Soba: { group: "Reis/Nudeln/Sättigung", label: "Soba (trocken)", unitDefault: "g" },
  Udon: { group: "Reis/Nudeln/Sättigung", label: "Udon (trocken)", unitDefault: "g" },
  Vollkornnudeln: { group: "Reis/Nudeln/Sättigung", label: "Vollkornnudeln (roh)", unitDefault: "g" },
  Glasnudeln: { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln (roh)", unitDefault: "g" },

  // 海藻/汤底/调味
  "Miso hell": { group: "Algen/Brühen/Würze", label: "Miso hell", unitDefault: "g" },
  Wakame: { group: "Algen/Brühen/Würze", label: "Wakame (getrocknet)", unitDefault: "g" },
  Nori: { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
  "Sojasauce natriumarm": { group: "Algen/Brühen/Würze", label: "Sojasauce (natriumarm)", unitDefault: "ml" },
  Sesamöl: { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "ml" },
  Olivenöl: { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "ml" },
  Gemüsebrühe: { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  Honig: { group: "Algen/Brühen/Würze", label: "Honig", unitDefault: "ml" },
  Sesam: { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "g" },
  Maisstärke: { group: "Algen/Brühen/Würze", label: "Maisstärke", unitDefault: "g" },
  Wasser: { group: "Algen/Brühen/Würze", label: "Wasser (ges.)", unitDefault: "ml" },
  Zimt: { group: "Algen/Brühen/Würze", label: "Zimt (Prisen)", unitDefault: "Prise" },
  Tomatenmark: { group: "Algen/Brühen/Würze", label: "Tomatenmark", unitDefault: "g" },
};

function parseIngredient(raw) {
  const m = raw.match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Blatt|Zehe|Prise)$/);
  if (!m) return null;
  const name = m[1].trim();
  const qty = parseFloat(m[2].replace(",", "."));
  const unit = m[3];
  let key = Object.keys(CANON).find((k) => name.startsWith(k));
  if (!key) {
    if (name.includes("Brauner Reis")) key = "Brauner Reis";
    else if (name.includes("Vollkornreis")) key = "Vollkornreis";
    else if (name.includes("Reis (roh)")) key = "Reis";
    else if (name.includes("Soba")) key = "Soba";
    else if (name.includes("Udon")) key = "Udon";
    else if (name.includes("Glasnudeln")) key = "Glasnudeln";
    else if (name.includes("Vollkornnudeln")) key = "Vollkornnudeln";
  }
  if (!key) return null;
  return { key, qty, unit, name };
}

function aggregateList(data) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const p = parseIngredient(ing);
      if (!p) continue;
      const c = CANON[p.key];
      const unit = p.unit || c.unitDefault;
      const id = `${p.key}|${unit}`;
      if (!totals[id])
        totals[id] = {
          key: p.key,
          label: c.label,
          unit,
          qty: 0,
          group: c.group,
        };
      totals[id].qty += p.qty;
    }
  }
  const groups = {
    "Protein/Fisch/Tofu": [],
    "Gemüse/Pilze": [],
    "Reis/Nudeln/Sättigung": [],
    "Algen/Brühen/Würze": [],
  };
  Object.values(totals).forEach((t) => groups[t.group].push(t));
  Object.keys(groups).forEach((g) =>
    groups[g].sort((a, b) => a.label.localeCompare(b.label))
  );
  return groups;
}

const LIST_SUMMARY = aggregateList(DATA);

// ---- 图片占位（若无 artwork）----
function animePlaceholder(title, prompt = "") {
  const safe = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#FCE7F3'/>
          <stop offset='100%' stop-color='#DCFCE7'/>
        </linearGradient>
      </defs>
      <rect width='1200' height='675' fill='url(#g)'/>
      <g font-family='Noto Sans, Arial, sans-serif'>
        <text x='40' y='120' font-size='44' fill='#1F2937'>🍱  ${safe(title)}</text>
        <text x='40' y='180' font-size='22' fill='#374151'>Illustration placeholder</text>
        <text x='40' y='240' font-size='18' fill='#6B7280'>${safe(prompt).slice(0, 300)}</text>
        <text x='40' y='640' font-size='14' fill='#6B7280'>Moving Kitchen Tales · placeholder</text>
      </g>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ---- 图片：优先 public/plan-art，其次占位 ----
function ImageBanner({ meal }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const preferred = meal.image ?? `/plan-art/2026/kw1/${meal.id}.jpg`;
    const fallback = animePlaceholder(meal.title, meal.prompt || "");
    if (!preferred) {
      setSrc(fallback);
      return;
    }
    const img = new Image();
    img.onload = () => setSrc(preferred);
    img.onerror = () => setSrc(fallback);
    img.src = preferred;
  }, [meal]);
  return (
    <div
      className="mkt-art"
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 12,
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <img
        src={src || animePlaceholder(meal.title, meal.prompt || "")}
        alt={meal.title}
        style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9" }}
        loading="lazy"
      />
      <div
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          background: "rgba(0,0,0,.35)",
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
        }}
      >
        {src?.startsWith("/plan-art") ? "Artwork" : "占位图"}
      </div>
    </div>
  );
}

// ---- UI ----
function MealCard({ meal }) {
  return (
    <SharedMealCard
      meal={meal}
      meta={meta}
      cardPanelStyle={cardPanelStyle}
      ImageBanner={ImageBanner}
      tagChip={tagChip}
      viralChip={typeof viralChip === "function" ? viralChip : undefined}
    />
  );
}

function DaySection({ dayKey, meals }) {
  return (
    <section className="day-section" style={{ marginBottom: 28 }} id={`day-${dayKey}`}>
      <h2 style={{ marginBottom: 12 }}>
        {DAY_NAME_ZH[dayKey].replace(/\s*\(.+\)$/, "")}
        <span className="mkt-date-paren">
          {" "}{DAY_NAME_ZH[dayKey].match(/\(.+\)$/)?.[0] ?? ""}
        </span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {meals.map((m) => <MealCard key={m.id} meal={m} />)}
      </div>
    </section>
  );
}

function WeekOverview({ data }) {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of data) map[r.id.split("-")[0]].push(r);
    return map;
  }, [data]);

  const pill = (text, href, rice) => (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        textDecoration: "none",
        color: "var(--text)",
        boxShadow: "var(--shadow)",
        fontSize: 13,
      }}
    >
      {rice ? "🍚" : "🍽️"} <span>{text}</span>
    </a>
  );

  return (
    <section style={{ marginBottom: 24 }}>
      <div style={{ ...cardPanelStyle, background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="mkt-hero-inner" style={{ padding: 14, borderRadius: 12, marginBottom: 10, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            第1周 – 总览{" "}
            <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>
              ({meta.startDate})
            </span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>
            每日 3 餐 · 每日 1 个 🍚 电饭煲菜 · 口味清淡、低盐、孕期可食。
          </p>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {DAYS_ORDER.map((d) => (
            <div key={d} style={{ padding: 10, borderRadius: 12, border: "1px solid var(--border)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <strong>{DAY_NAME_ZH[d]}</strong>
                <a
                  href={`#day-${d}`}
                  style={{ fontSize: 12, color: "var(--text)", textDecoration: "none", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: 8, background: "var(--chip-bg)" }}
                >
                  跳转当天 ▿
                </a>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {byDay[d].map((m) =>
                  pill(m.title.replace(/ – .*$/, ""), `#meal-${m.id}`, !!m.riceCooker?.enabled)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <h2>电饭煲菜（每日一次）</h2>
      <p style={{ color: "var(--muted)" }}>
        程序与水米比总览。所有菜品清淡、低盐、孕期可食。
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {DAYS_ORDER.map((d) => {
          const r = perDay[d];
          return (
            <div key={d} style={{ ...cardPanelStyle }}>
              <h3 style={{ marginTop: 0 }}>
                {DAY_NAME_ZH[d].split(" ")[0]} – {r ? r.title : "（请在当天计划中选择）"}
              </h3>
              {r ? (
                <ul>
                  <li><strong>程序：</strong> {r.riceCooker.program}</li>
                  <li><strong>水米比：</strong> {r.riceCooker.water}</li>
                  {r.riceCooker.notes ? <li><strong>备注：</strong> {r.riceCooker.notes}</li> : null}
                </ul>
              ) : (
                <p>当天未标记电饭煲菜。</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Cookbook() {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of DATA) {
      const d = r.id.split("-")[0];
      map[d].push(r);
    }
    return map;
  }, []);
  return (
    <div>
      {DAYS_ORDER.map((d) => (
        <DaySection key={d} dayKey={d} meals={byDay[d]} />
      ))}
      <RiceCookerSection data={DATA} />
    </div>
  );
}

function ShoppingList() {
  const groups = LIST_SUMMARY;
  const Group = ({ name, items }) => (
    <div style={{ marginBottom: 20 }}>
      <h3>{name}</h3>
      <ul>
        {items.map((it, idx) => (
          <li key={idx}>{`${it.label} – ${Math.round(it.qty * 10) / 10} ${it.unit}`}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <div>
      <Group name="Protein/Fisch/Tofu" items={groups["Protein/Fisch/Tofu"]} />
      <Group name="Gemüse/Pilze" items={groups["Gemüse/Pilze"]} />
      <Group name="Reis/Nudeln/Sättigung" items={groups["Reis/Nudeln/Sättigung"]} />
      <Group name="Algen/Brühen/Würze" items={groups["Algen/Brühen/Würze"]} />
    </div>
  );
}

// --- Helper: 帧等待（导出更稳）
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

// --- PDF 导出：克隆可见根节点，施加导出样式，仅渲染克隆
async function exportPdfFromRoot(rootEl) {
  await ensureScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");
  if (!window.html2pdf) throw new Error("html2pdf 不可用");

  const clone = rootEl.cloneNode(true);
  clone.id = "kochbuch-export";
  clone.classList.add("mkt-exporting");
  document.body.appendChild(clone);

  window.scrollTo(0, 0);
  await nextFrame();

  const pageBg = "#FFFFFF";
  clone.style.backgroundColor = pageBg;

  const opt = {
    margin: [34, 28, 34, 28],
    filename: `${FILE_BASE}.pdf`,
    pagebreak: {
      mode: ["css", "legacy"],
      after: [".day-section"],
      avoid: [".meal-card", ".mkt-hero"]
    },
    html2canvas: {
      backgroundColor: pageBg,
      useCORS: true,
      logging: false,
      imageTimeout: 0,
      scale: 2,
      foreignObjectRendering: false,
      scrollX: 0,
      scrollY: -window.scrollY
    },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
  };

  try {
    await window.html2pdf().set(opt).from(clone).save();
  } finally {
    clone.remove();
  }
}

// 简单的主题开关（避免缺组件）
function ThemeSwitch({ mode, setMode, effectiveDark }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, color: "var(--muted)" }}>
        主题：{mode === "auto" ? (effectiveDark ? "自动（深色）" : "自动（浅色）") : mode === "dark" ? "深色" : "浅色"}
      </span>
      <select
        aria-label="Theme mode"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--btn-border)", background: "var(--panel)" }}
      >
        <option value="auto">自动</option>
        <option value="light">浅色</option>
        <option value="dark">深色</option>
      </select>
    </div>
  );
}

export default function Woche1ZH() {
  // Gate über Query (?lang) - wie DE
  const langFromUrl = useLangHint();
  // Wenn URL ?lang=de sagt, aber wir sind im ZH Plan -> ausblenden
  const hiddenByLang = langFromUrl && langFromUrl !== meta.lang;
  if (hiddenByLang) return null;

  const systemDark = useSystemPrefersDark();
  const [mode, setMode] = useState("auto"); // "light" | "dark" | "auto"
  const effectiveDark = mode === "auto" ? systemDark : mode === "dark";
  const vars = themeVars(effectiveDark ? "dark" : "light");

  // 视图： "kochbuch" | "liste"
  const [tab, setTab] = useState("kochbuch");

  // 设置 CSS 变量
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k));
  }, [vars]);

  // <html lang> 
  useEffect(() => {
    if (!document.documentElement.getAttribute("lang")) {
      document.documentElement.setAttribute("lang", meta.lang);
    }
  }, []);

  const doPrint = () => window.print();

  const doExportHTML = () => {
    const pageBg =
      getComputedStyle(document.documentElement).getPropertyValue("--bg")?.trim() || "#FFFFFF";
    const url = exportHTMLById("kochbuch-root", FILE_BASE, buildEmbedCss(), pageBg);
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `${FILE_BASE}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } else {
      alert("HTML 导出不可用。");
    }
  };

  const doExportPDF = async () => {
    const el = document.getElementById("kochbuch-root");
    if (!el) return alert("未找到导出容器 #kochbuch-root。");
    try {
      await exportPdfFromRoot(el);
    } catch (e) {
      console.error(e);
      alert("PDF 导出失败。");
    }
  };

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      {/* Screen & Print Styles */}
      <style>{`
  /* Coolere Tabs/Buttons (wie DE) */
  .mkt-tab {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid var(--btn-border);
    background: var(--panel);
    color: var(--text);
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    transition: all 0.2s ease;
  }
  .mkt-tab:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-color: var(--accent-2);
  }
  .mkt-tab:focus-visible { outline: 2px solid var(--accent-2); outline-offset: 2px; }
  .mkt-tab span.icon { font-size: 1.2em; line-height: 1; }

  /* Switch */
  .mkt-switch { --switch-w:48px; --switch-h:28px; --knob:22px; position:relative; display:inline-block;
    width:var(--switch-w); height:var(--switch-h); }
  .mkt-switch input { opacity:0; width:0; height:0; position:absolute; }
  .mkt-switch .mkt-slider { position:absolute; inset:0; border-radius:var(--switch-h);
    background:var(--btn-border); border:1px solid var(--btn-border); transition:background .2s,border-color .2s; }
  .mkt-switch .mkt-slider::before { content:""; position:absolute; height:var(--knob); width:var(--knob);
    left:3px; top:50%; transform:translateY(-50%); border-radius:999px; background:var(--panel); box-shadow:var(--shadow);
    transition:transform .2s; }
  .mkt-switch input:checked + .mkt-slider { background:var(--accent-2); border-color:var(--accent-2); }
  .mkt-switch input:checked + .mkt-slider::before { transform:translateY(-50%) translateX(calc(var(--switch-w) - var(--knob) - 6px)); }
  .mkt-switch input:disabled + .mkt-slider { opacity:.6; }

  /* Segmented Control */
  .mkt-segment { display:inline-flex; gap:4px; border:1px solid var(--btn-border); border-radius:999px; padding:4px; background:var(--panel); margin:0; }
  .mkt-segment label { position:relative; display:inline-flex; align-items:center; border-radius:999px; overflow:hidden; cursor:pointer; }
  .mkt-segment input[type="radio"] { position:absolute; inset:0; opacity:0; cursor:pointer; }
  .mkt-segment span { display:inline-block; padding:8px 14px; border-radius:999px; border:1px solid transparent; user-select:none; }
  .mkt-segment input[type="radio"]:checked + span { background:var(--btn-on-bg); outline:2px solid var(--accent-2); outline-offset:1px; }

  /* Viewer 中强制可见 */
  #mkt-content { display: block !important; visibility: visible !important; opacity: 1 !important; position: relative !important; min-height: 1px; }
  #mkt-content > [hidden] { display: none !important; }

  /* 导出模式 */
  .mkt-exporting {
    width: 794px !important; max-width: 794px !important; margin: 0 auto !important;
    background: #fff !important; box-sizing: border-box !important; font-size: 12pt !important; line-height: 1.45 !important;
    --bg:#FFFFFF; --text:#111827; --panel:#FFFFFF; --border:rgba(0,0,0,.12);
    --muted:#374151; --chip-bg:#F3F4F6; --btn-border:rgba(0,0,0,.15); --btn-on-bg:#F3F4F6;
  }
  .mkt-exporting * { box-shadow: none !important; }
  .mkt-exporting .mkt-art,
  .mkt-exporting img { display:none !important; visibility:hidden !important; }
  .mkt-exporting .mkt-chip { display:none !important; }
  .mkt-exporting .mkt-date-paren { display:none !important; }

  @media print {
    .mkt-art, .mkt-date-paren { display: none !important; }
  }

  @page { size: A4; margin: 12mm; }
  @media print {
    html, body, #root { background: #fff !important; }
    aside, nav, header, footer, .mkt-no-print { display: none !important; }
    main { grid-template-columns: 1fr !important; }
    #kochbuch-root { width: calc(210mm - 24mm); margin: 0 auto !important; box-shadow: none !important; border: none !important; background: #fff !important; }
    .mkt-hero { box-shadow: none !important; border: 0 !important; padding: 0 !important; background: #fff !important; }
    .mkt-hero-inner { background: #fff !important; border-radius: 0 !important; padding: 0 !important; margin: 0 0 6mm 0 !important; }
    .mkt-hero h1 { margin: 0 0 2mm 0 !important; font-size: 18pt !important; line-height: 1.2 !important; }
    .day-section, .meal-card { break-inside: avoid; page-break-inside: avoid; -webkit-column-break-inside: avoid; -webkit-region-break-inside: avoid; }
    .meal-card { margin-bottom: 12mm; }
    h2, h3 { break-after: avoid; page-break-after: avoid; }
    #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    a[href]:after { content: ""; } * { box-shadow: none !important; }
  }
`}</style>

      {/* 顶部区块 + 操作 */}
      <div className="mkt-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div
          className="mkt-hero-inner"
          style={{
            background: "var(--grad-hero)",
            borderRadius: 12,
            padding: 14,
            marginBottom: 12,
            display: "grid",
            gap: 8,
          }}
        >
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`开始：${meta.startDate}`)}
            {tagChip("每周餐次：21")}
            {tagChip("中/日/韩（本周意餐 0 次）")}
            {tagChip("低盐 · 清淡 · 全熟")}
            {tagChip("每日 1 次 🍚 电饭煲")}
          </div>
        </div>

        <div
          className="mkt-no-print"
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* 单选：食谱 ⇄ 购物清单 */}
          <fieldset className="mkt-segment" role="radiogroup" aria-label="选择视图">
            <legend className="sr-only">视图</legend>

            <label htmlFor="view-kochbuch">
              <input
                id="view-kochbuch"
                type="radio"
                name="mkt-view"
                value="kochbuch"
                checked={tab === "kochbuch"}
                onChange={() => setTab("kochbuch")}
                aria-controls="mkt-content"
              />
              <span>{UI_TITLES.main}</span>
            </label>

            <label htmlFor="view-liste">
              <input
                id="view-liste"
                type="radio"
                name="mkt-view"
                value="liste"
                checked={tab === "liste"}
                onChange={() => setTab("liste")}
                aria-controls="mkt-content"
              />
              <span>{UI_TITLES.list}</span>
            </label>
          </fieldset>

          {/* 导出/打印 + 主题  (Rechtsbündig via marginLeft: auto) */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginLeft: "auto" }}>
            <button type="button" onClick={doExportPDF} title="导出为 PDF" className="mkt-tab">
              <span className="icon">📄</span> PDF
            </button>
            <button type="button" onClick={doExportHTML} title="导出为 HTML" className="mkt-tab">
              <span className="icon">🌐</span> HTML
            </button>
            <button type="button" onClick={doPrint} title="打印" className="mkt-tab">
              <span className="icon">🖨️</span> 打印
            </button>

            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      {/* 导出根容器 */}
      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        {/* 周总览 */}
        <WeekOverview data={DATA} />

        {/* 内容：两个固定面板，通过 hidden 切换 */}
        <div id="mkt-content" data-view={tab}>
          <section
            id="mkt-pane-kochbuch"
            aria-labelledby="view-kochbuch"
            aria-hidden={tab !== "kochbuch"}
            hidden={tab !== "kochbuch"}
          >
            <Cookbook />
          </section>

          <section
            id="mkt-pane-liste"
            aria-labelledby="view-liste"
            aria-hidden={tab !== "liste"}
            hidden={tab !== "liste"}
          >
            <ShoppingList />
          </section>
        </div>
      </div>
    </div>
  );
}