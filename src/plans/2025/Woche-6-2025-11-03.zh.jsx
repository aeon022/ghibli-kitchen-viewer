// src/plans/Woche-6-2025-11-03.zh.jsx
// 严格复用 Woche-5-2025-10-27.* 的结构（1:1），仅更新 Meta 与 DATA（21 个全新食谱）

import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";
import { UI } from "@/i18n-ui";
import { pickText, pickList } from "@/i18n-data";

/* ---------- Meta ---------- */
export const meta = {
  title: "第6周",
  startDate: "2025-11-03",
  id: "woche-6-2025-11-03-zh",
  lang: "zh",
  sidebar: "[ZH] 第6周 (2025-11-03)",
};
const FILE_BASE = "第6周 2025-11-03";

/* ---------- UI ----------- */
const UI_TITLES = {
  main: "吉卜力厨房 – 第6周",
  list: "吉卜力厨房 – 购物清单 – 第6周",
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

// --- Fallbacks: 文本/列表安全输出 ---
const toText = (v) => {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    if (typeof v.zh === "string") return v.zh;
    if (typeof v.de === "string") return v.de;
  }
  return String(v ?? "");
};
const toList = (v) => {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object") {
    if (Array.isArray(v.zh)) return v.zh;
    if (Array.isArray(v.de)) return v.de;
  }
  return [];
};

/* ---------- DATA（21 道全新配方） ---------- */
export const DATA = [
  // 周一
  {
    id: "mo-f",
    title: "鸡蛋羹清汤（卵とじ汁）配小碗米饭",
    desc: "日式清汤加入全熟蛋花与嫩豆腐，配小碗米饭。",
    story: "Tamago‑toji 用全熟蛋使汤汁柔和、顺口。",
    target: "≈68 g KH gesamt (2 P.) · 蛋白≈22 g/人",
    ingredients: [
      "大米（生） 80 g",
      "鸡蛋 2 Stück",
      "嫩豆腐 150 g",
      "菠菜 120 g",
      "清水 900 ml",
      "低钠酱油 10 ml",
      "香葱 15 g",
    ],
    steps: [
      "煮饭。",
      "加热清汤，放入菠菜2–3分钟，加入豆腐。",
      "倒入蛋液搅拌至完全凝固，清淡调味。",
    ],
    checks: "胃炎 – 非常温和 · 糖友✓ ≈68 g KH · 孕期✓ 鸡蛋全熟",
    swaps: "嫩豆腐 ↔ 老豆腐；菠菜 ↔ 青江菜。",
    side: "淡味黄瓜小菜（不辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Clear egg-drop soup with silken tofu and spinach, small bowl of rice"),
  },
  {
    id: "mo-m",
    title: "鸡肉香菇什锦饭（炊き込みご飯）",
    desc: "鸡肉、香菇与胡萝卜同米同煮，味淡更易消化。",
    story: "日本家常混合饭 – 温热、香气淡雅。",
    target: "≈78 g KH gesamt (2 P.) · 蛋白≈28 g/人",
    ingredients: [
      "大米（生） 90 g",
      "鸡胸肉 200 g",
      "香菇 120 g",
      "胡萝卜 100 g",
      "低钠酱油 20 ml",
      "味醂 5 ml",
      "清水 320 ml",
    ],
    steps: [
      "将所有食材与调味加入锅中。",
      "小火加盖煮20–25分钟至米软。",
      "关火焖5分钟后拌匀食用。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈78 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；香菇 ↔ 蘑菇。",
    side: "焯水西兰花。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Takikomi gohan mixed rice with chicken, shiitake and carrot, gentle steam"),
  },
  {
    id: "mo-a",
    title: "韩式酱炖豆腐（두부조림）配米饭",
    desc: "无辣版豆腐酱炖，葱姜蒜提香，配米饭。",
    story: "常见小菜做成主菜，蛋白充足、清淡不腻。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白≈24 g/人",
    ingredients: [
      "老豆腐 400 g",
      "低钠酱油 20 ml",
      "清水 300 ml",
      "香葱 20 g",
      "蒜 1 Stück",
      "生姜 8 g",
      "香油 8 ml",
      "大米（生） 90 g",
    ],
    steps: [
      "煮饭。",
      "豆腐在汤汁中小火炖6–8分钟。",
      "加入葱姜蒜略煮，淋香油。",
    ],
    checks: "胃炎 – 清淡炖煮 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "豆腐 ↔ 鸡胸丁；米饭 ↔ 糙米。",
    side: "温和菠菜拌菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean braised tofu in light soy glaze, scallions on top, side rice"),
  },

  // 周二
  {
    id: "di-f",
    title: "清汤豆腐（すまし汁）配小碗米饭",
    desc: "清澈汤底、嫩豆腐与海带芽，口味极淡；配少量米饭。",
    story: "日式早餐汤 – 清爽暖胃。",
    target: "≈62 g KH gesamt (2 P.) · 蛋白≈18 g/人",
    ingredients: [
      "大米（生） 80 g",
      "嫩豆腐 200 g",
      "清水 900 ml",
      "低钠酱油 8 ml",
      "若布（干） 2 g",
      "香葱 20 g",
    ],
    steps: [
      "煮饭。",
      "加热清汤，若布浸泡回软。",
      "加入豆腐，加葱调味后食用。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈62 g KH · 孕期✓ 全熟；碘类适量",
    swaps: "若布 ↔ 海苔（少量）；豆腐 ↔ 鸡胸丁。",
    side: "温大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Clear soup with tofu and wakame, tiny rice bowl, steam visible"),
  },
  {
    id: "di-m",
    title: "腰果鸡丁（清淡）配糙米饭",
    desc: "低油低盐，无辣，坚果脆香。",
    story: "家常快炒，颜色丰富、营养均衡。",
    target: "≈82 g KH gesamt (2 P.) · 蛋白≈32 g/人",
    ingredients: [
      "糙米（生） 90 g",
      "鸡胸肉 240 g",
      "腰果 40 g",
      "彩椒 150 g",
      "西兰花 200 g",
      "洋葱 60 g",
      "低钠酱油 22 ml",
      "菜籽油 10 ml",
    ],
    steps: [
      "煮饭；腰果干炒至香。",
      "鸡丁炒至全熟。",
      "下蔬菜与调味翻炒，拌入腰果。",
    ],
    checks: "胃炎 – 少油 · 糖友✓ ≈82 g KH · 孕期✓ 鸡肉全熟",
    swaps: "腰果 ↔ 花生；鸡肉 ↔ 豆腐。",
    side: "清拌黄瓜。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Mild cashew chicken with broccoli and peppers, brown rice on side"),
  },
  {
    id: "di-a",
    title: "韩式蒸蛋（계란찜）配蔬菜与米饭",
    desc: "完全凝固的蒸蛋，配清炒西葫芦与小碗米饭。",
    story: "云朵般嫩滑，适合夜间易消化。",
    target: "≈66 g KH gesamt (2 P.) · 蛋白≈23 g/人",
    ingredients: [
      "鸡蛋 3 Stück",
      "清水 300 ml",
      "老豆腐 150 g",
      "西葫芦 200 g",
      "香葱 15 g",
      "低钠酱油 8 ml",
      "大米（生） 80 g",
    ],
    steps: [
      "煮饭；西葫芦焯或快炒。",
      "鸡蛋与水打匀，加豆腐，入碗蒸12–15分钟至完全凝固。",
      "点少量酱油，撒葱。",
    ],
    checks: "胃炎 – 非常温和 · 糖友✓ ≈66 g KH · 孕期✓ 蛋全熟",
    swaps: "豆腐 ↔ 鸡胸丁；西葫芦 ↔ 菠菜。",
    side: "白泡菜（不辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed Korean egg custard in bowl, zucchini on side, small rice bowl"),
  },

  // 周三
  {
    id: "mi-f",
    title: "鸡肉照烧饭团（おにぎらず）",
    desc: "海苔包饭夹照烧鸡与黄瓜，手持即食。",
    story: "便当风早餐，这里热食且全熟。",
    target: "≈72 g KH gesamt (2 P.) · 蛋白≈26 g/人",
    ingredients: [
      "寿司米（生） 90 g",
      "鸡胸肉 180 g",
      "海苔 2 Stück",
      "低钠酱油 15 ml",
      "蜂蜜 4 g",
      "生姜 6 g",
      "黄瓜 80 g",
    ],
    steps: [
      "煮饭。",
      "鸡肉煎熟，加入酱汁煮至收光泽。",
      "与黄瓜夹入海苔米饭中对折。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈72 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 豆腐；寿司米 ↔ 糙米。",
    side: "低咖绿茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Onigirazu with teriyaki chicken and cucumber, neat halves"),
  },
  {
    id: "mi-m",
    title: "韩式饺子汤（만두국）",
    desc: "清汤饺子配西葫芦与豆腐，口味清淡。",
    story: "汤清味淡，适合午间。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白≈24 g/人",
    ingredients: [
      "饺子（个） 8 Stück",
      "清水 1100 ml",
      "西葫芦 120 g",
      "老豆腐 150 g",
      "香葱 20 g",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮汤；下饺子6–8分钟至浮、熟。",
      "加入西葫芦/豆腐再煮3–4分钟。",
      "清淡调味，撒葱。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈70 g KH · 孕期✓ 馅全熟",
    swaps: "饺子 ↔ 乌冬（另煮）；豆腐 ↔ 鸡胸丁。",
    side: "黄瓜小碟（不辣）。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean mandu soup in clear broth with tofu and zucchini"),
  },
  {
    id: "mi-a",
    title: "番茄土豆牛腩（清淡）配米饭",
    desc: "牛肉与番茄、土豆小火炖煮，配米饭。",
    story: "南方家常风味，浓郁却不辣。",
    target: "≈76 g KH gesamt (2 P.) · 蛋白≈32 g/人",
    ingredients: [
      "大米（生） 80 g",
      "牛腩 300 g",
      "番茄 400 g",
      "土豆 300 g",
      "洋葱 80 g",
      "清水 600 ml",
      "低钠酱油 15 ml",
    ],
    steps: [
      "牛肉少油煎香，加水。",
      "入番茄/土豆/洋葱，小火炖35–45分钟。",
      "配米饭食用，清淡调味。",
    ],
    checks: "胃炎 – 温和炖煮 · 糖友✓ ≈76 g KH · 孕期✓ 牛肉全熟",
    swaps: "牛肉 ↔ 火鸡；白米 ↔ 糙米。",
    side: "焯水菠菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese tomato beef stew with potatoes, side bowl of rice"),
  },

  // 周四
  {
    id: "do-f",
    title: "杂粮饭套餐：杂粮饭 + 菠菜お浸し + 味噌汤",
    desc: "一碗杂粮饭，加菠菜お浸し与淡味味噌豆腐汤。",
    story: "日式早餐组合 – 简单、温热、均衡。",
    target: "≈64 g KH gesamt (2 P.) · 蛋白≈20 g/人",
    ingredients: [
      "杂粮米（生） 80 g",
      "菠菜 200 g",
      "老豆腐 150 g",
      "淡味味噌 18 g",
      "清水 1000 ml",
      "海苔 1 Stück",
    ],
    steps: [
      "煮杂粮饭。",
      "菠菜焯水1–2分钟，挤水。",
      "味噌溶于热水（勿沸腾），下豆腐加热；与米饭同食。",
    ],
    checks: "胃炎 – 温和 · 糖友✓ ≈64 g KH · 孕期✓ 全熟",
    swaps: "杂粮 ↔ 白米；菠菜 ↔ 青江菜。",
    side: "温麦茶或番茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with multigrain rice, ohitashi spinach, miso soup with tofu"),
  },
  {
    id: "do-m",
    title: "韩式虾仁炒饭（清淡）",
    desc: "低油炒饭，加入虾仁、豌豆与胡萝卜，蛋全熟。",
    story: "家常快手，少盐无辣。",
    target: "≈80 g KH gesamt (2 P.) · 蛋白≈30 g/人",
    ingredients: [
      "大米（生） 90 g",
      "虾仁 220 g",
      "豌豆（冷冻） 150 g",
      "胡萝卜 100 g",
      "鸡蛋 1 Stück",
      "低钠酱油 15 ml",
      "菜籽油 10 ml",
    ],
    steps: [
      "米饭预煮摊凉。",
      "虾仁炒至全熟，加入蔬菜。",
      "放米饭与蛋液翻炒至蛋全熟，调味。",
    ],
    checks: "胃炎 – 少油 · 糖友✓ ≈80 g KH · 孕期✓ 虾/蛋全熟",
    swaps: "虾仁 ↔ 鸡丁；米饭 ↔ 糙米。",
    side: "黄瓜片。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Korean shrimp fried rice with peas and carrot, fully cooked egg"),
  },
  {
    id: "do-a",
    title: "关东煮（おでん）清淡版",
    desc: "白萝卜、魔芋、厚炸豆腐、鱼糕与水煮蛋在清汤中小火炖煮，配少量米饭。",
    story: "日本街头暖锅 – 这版更低钠无辣。",
    target: "≈69 g KH gesamt (2 P.) · 蛋白≈26 g/人",
    ingredients: [
      "白萝卜 300 g",
      "魔芋 200 g",
      "厚炸豆腐 200 g",
      "鱼糕 200 g",
      "熟鸡蛋 2 Stück",
      "清水 1200 ml",
      "低钠酱油 15 ml",
      "大米（生） 70 g",
    ],
    steps: [
      "煮汤；白萝卜先煮12–15分钟。",
      "加入魔芋/豆腐/鱼糕再煮8–10分钟。",
      "配小碗米饭食用。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈69 g KH · 孕期✓ 全熟",
    swaps: "鱼糕 ↔ 更多豆腐；米饭 ↔ 糙米。",
    side: "温和黄芥末可另放。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Oden pot with daikon, tofu and fish cakes, clear broth, small rice bowl"),
  },

  // 周五
  {
    id: "fr-f",
    title: "大麦饭碗（보리밥）配豆腐与蔬菜",
    desc: "温热大麦配豆腐、黄瓜与胡萝卜，芝麻点缀。",
    story: "韩式朴素碗饭，纤维丰富。",
    target: "≈66 g KH gesamt (2 P.) · 蛋白≈22 g/人",
    ingredients: [
      "珍珠大麦（生） 80 g",
      "老豆腐 200 g",
      "黄瓜 150 g",
      "胡萝卜 100 g",
      "芝麻 6 g",
      "低钠酱油 10 ml",
    ],
    steps: [
      "煮大麦。",
      "豆腐加热后与蔬菜拌入碗中。",
      "撒芝麻，清淡调味。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈66 g KH · 孕期✓ 全熟",
    swaps: "大麦 ↔ 大米；豆腐 ↔ 鸡肉。",
    side: "温大麦茶。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean barley bowl with tofu, cucumber and carrot, sesame sprinkle"),
  },
  {
    id: "fr-m",
    title: "广式鸡丝米粉汤（清淡）",
    desc: "清鸡汤配米粉、青菜与姜丝，汤清味淡。",
    story: "南方家常汤面，轻盈暖胃。",
    target: "≈78 g KH gesamt (2 P.) · 蛋白≈28 g/人",
    ingredients: [
      "米粉（干） 90 g",
      "鸡胸肉 200 g",
      "青江菜 200 g",
      "生姜 8 g",
      "清水 1200 ml",
      "低钠酱油 10 ml",
      "香葱 20 g",
    ],
    steps: [
      "煮汤；鸡肉煮8–10分钟至熟。",
      "下青菜2–3分钟。",
      "米粉另煮过冷水，入汤。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈78 g KH · 孕期✓ 鸡肉全熟",
    swaps: "米粉 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "黄瓜片。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Cantonese chicken rice noodle soup with bok choy, clear broth"),
  },
  {
    id: "fr-a",
    title: "姜葱清蒸鳟鱼配米饭",
    desc: "鳟鱼蒸至全熟，淋淡味酱汁，配米饭。",
    story: "粤式清蒸法，保留鲜味与嫩度。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白≈30 g/人",
    ingredients: [
      "鳟鱼柳 320 g",
      "大米（生） 90 g",
      "生姜 12 g",
      "香葱 24 g",
      "低钠酱油 12 ml",
      "香油 6 ml",
      "蔬菜高汤 100 ml",
    ],
    steps: [
      "煮饭。",
      "鱼置姜片上蒸9–11分钟至熟。",
      "以温热高汤+少量酱油淋面，滴香油，配米饭。",
    ],
    checks: "胃炎 – 清蒸 · 糖友✓ ≈70 g KH · 孕期✓ 鱼全熟、汞低",
    swaps: "鳟鱼 ↔ 鳕鱼；白米 ↔ 糙米。",
    side: "清蒸西兰花。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Steamed trout with ginger and scallions, light soy broth, rice bowl"),
  },

  // 周六
  {
    id: "sa-f",
    title: "西葫芦鸡蛋小炒（호박볶음）配小碗米饭",
    desc: "少油快炒西葫芦与鸡蛋（全熟），配米饭。",
    story: "韩式家常早餐，清淡快速。",
    target: "≈64 g KH gesamt (2 P.) · 蛋白≈22 g/人",
    ingredients: [
      "大米（生） 80 g",
      "西葫芦 300 g",
      "鸡蛋 2 Stück",
      "香葱 20 g",
      "低钠酱油 8 ml",
      "香油 5 ml",
    ],
    steps: [
      "煮饭。",
      "西葫芦少油炒3–4分钟。",
      "倒入蛋液炒至全熟，调味。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈64 g KH · 孕期✓ 蛋全熟",
    swaps: "西葫芦 ↔ 菠菜；白米 ↔ 糙米。",
    side: "白泡菜（不辣）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Korean zucchini and egg sauté, small rice bowl"),
  },
  {
    id: "sa-m",
    title: "芝麻酱温热荞麦面配鸡肉（ごまだれそば）",
    desc: "温热荞麦面拌淡芝麻酱汁，配鸡肉与黄瓜。",
    story: "坚果香与荞麦香相得益彰。",
    target: "≈76 g KH gesamt (2 P.) · 蛋白≈28 g/人",
    ingredients: [
      "荞麦面（干） 100 g",
      "鸡胸肉 200 g",
      "黄瓜 120 g",
      "芝麻 10 g",
      "低钠酱油 15 ml",
      "清水 100 ml",
      "米醋（温和） 5 ml",
    ],
    steps: [
      "煮面，过凉备用。",
      "鸡肉煮熟或煎熟切丝。",
      "拌入酱汁与黄瓜，温热食用。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈76 g KH · 孕期✓ 鸡肉全熟",
    swaps: "荞麦面 ↔ 乌冬；鸡肉 ↔ 豆腐。",
    side: "清爽黄瓜片。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Warm soba with sesame dressing, chicken slices and cucumber"),
  },
  {
    id: "sa-a",
    title: "黄焖鸡（清淡版）配米饭",
    desc: "鸡肉、土豆与香菇小火焖煮，无辣低盐。",
    story: "北方风味的家常鸡煲，这里更清爽。",
    target: "≈82 g KH gesamt (2 P.) · 蛋白≈30 g/人",
    ingredients: [
      "去皮鸡腿 320 g",
      "土豆 250 g",
      "香菇 120 g",
      "洋葱 80 g",
      "低钠酱油 20 ml",
      "清水 600 ml",
      "大米（生） 80 g",
    ],
    steps: [
      "鸡肉略煎，加水。",
      "入土豆/香菇/洋葱，小火焖25–30分钟。",
      "配米饭食用。",
    ],
    checks: "胃炎 – 清淡焖煮 · 糖友✓ ≈82 g KH · 孕期✓ 鸡肉全熟",
    swaps: "鸡肉 ↔ 火鸡；白米 ↔ 糙米。",
    side: "清蒸青江菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese yellow braised chicken with potatoes and mushrooms, served with rice"),
  },

  // 周日
  {
    id: "so-f",
    title: "赤豆糯米饭（赤飯）小份",
    desc: "小份赤豆糯米饭，香软不腻。",
    story: "节日饭的日常版，控制份量更友好。",
    target: "≈68 g KH gesamt (2 P.) · 蛋白≈10 g/人",
    ingredients: [
      "糯米（生） 90 g",
      "赤小豆（熟） 120 g",
      "芝麻 6 g",
      "食盐 1 g",
      "清水 320 ml",
    ],
    steps: [
      "糯米与赤豆加水煮25–30分钟。",
      "焖5分钟。",
      "撒芝麻食用。",
    ],
    checks: "胃炎 – 清淡 · 糖友✓ ≈68 g KH · 孕期✓ 全熟",
    swaps: "糯米 ↔ 大米；赤豆 ↔ 毛豆（分装）。",
    side: "温绿茶（低咖）。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Small bowl of sekihan red bean sticky rice"),
  },
  {
    id: "so-m",
    title: "虾仁炒蛋配米饭（全熟）",
    desc: "滑嫩但全熟的虾仁炒蛋，配米饭。",
    story: "广式灵感，软嫩且富含蛋白。",
    target: "≈74 g KH gesamt (2 P.) · 蛋白≈30 g/人",
    ingredients: [
      "大米（生） 90 g",
      "虾仁 220 g",
      "鸡蛋 3 Stück",
      "香葱 20 g",
      "低钠酱油 10 ml",
      "菜籽油 8 ml",
    ],
    steps: [
      "煮饭。",
      "虾仁炒至变色熟透。",
      "入蛋液迅速翻炒至全熟，调味。",
    ],
    checks: "胃炎 – 非常温和 · 糖友✓ ≈74 g KH · 孕期✓ 虾/蛋全熟",
    swaps: "虾仁 ↔ 鸡肉；白米 ↔ 糙米。",
    side: "焯水西兰花。",
    remind: false,
    prompt: buildPrompt(PROMPT_HEADER, "Chinese shrimp and egg stir-fry, glossy and fully cooked, served with rice"),
  },
  {
    id: "so-a",
    title: "寿喜烧风豆腐牛肉锅（无生蛋）+ 小份米饭",
    desc: "牛肉、豆腐、魔芋丝、白菜与香菇在淡味汤中小火煮，配小碗米饭。",
    story: "桌边小火锅，所有食材彻底加热，无生蛋蘸料。",
    target: "≈70 g KH gesamt (2 P.) · 蛋白≈32 g/人",
    ingredients: [
      "大米（生） 80 g",
      "牛肉片 260 g",
      "老豆腐 250 g",
      "魔芋丝（白滝） 200 g",
      "大白菜 300 g",
      "香菇 120 g",
      "低钠酱油 20 ml",
      "味醂 6 ml",
      "清水 800 ml",
    ],
    steps: [
      "煮汤。",
      "先煮蔬菜6–8分钟，再下豆腐/牛肉4–5分钟至熟。",
      "配小碗米饭食用。",
    ],
    checks: "胃炎 – 清淡煮制 · 糖友✓ ≈70 g KH · 孕期✓ 全熟",
    swaps: "牛肉 ↔ 火鸡；魔芋 ↔ 荞麦面（另煮）。",
    side: "不辣黄瓜泡菜。",
    remind: true,
    prompt: buildPrompt(PROMPT_HEADER, "Sukiyaki-style hotpot with beef, tofu, napa and mushrooms, small rice bowl"),
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

/* ---------- 购物清单汇总（同 Woche-4/5） ---------- */
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
  protein: ["鸡", "火鸡", "牛", "猪", "鳟鱼", "鳕鱼", "三文鱼", "豆腐", "鸡蛋", "虾", "饺子"],
  veg: ["胡萝卜", "西葫芦", "青江菜", "菠菜", "香菇", "金针菇", "西兰花", "大白菜", "洋葱", "彩椒", "白萝卜", "葱", "香葱", "黄瓜", "番茄", "土豆"],
  staple: ["大米", "糯米", "杂粮", "乌冬", "荞麦面", "素面", "小麦面", "米粉", "糙米", "烩饭米", "大麦"],
  season: ["昆布", "海苔", "高汤", "蔬菜高汤", "酱油", "味噌", "香油", "橄榄油", "味醂", "蜂蜜", "盐", "芝麻", "蒜", "姜", "水", "若布", "米醋"],
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
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(meta.id, r.id);
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
          <button
            onClick={() => toggleBookmark({
              planSlug: meta.id,
              recipeId: r.id,
              recipeTitle: title,
              planTitle: meta.title
            })}
            style={{
              background: bookmarked ? "var(--accent, #e07a9a)" : "transparent",
              border: "1px solid var(--border, rgba(0,0,0,.1))",
              borderRadius: 8,
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: 16,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: bookmarked ? "#fff" : "var(--text, #111827)",
              marginRight: "8px"
            }}
            title={bookmarked ? "Bookmark entfernen" : "Bookmark setzen"}
          >
            {bookmarked ? "★" : "☆"}
          </button><h2 style={{ margin: 0 }}>{title}</h2></div>
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
                            🌾 {target}
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
            注意：使用低钠酱油；海藻（昆布/海苔）适量；所有食材需充分加热。
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 主组件 ---------- */
export default function Woche6_2025_11_03_ZH() {
  const [tab, setTab] = useState("kochbuch");
  const [lang, setLang] = useState(() => localStorage.getItem("ghibli-lang") || "zh");
  const t = UI[lang] || UI.zh;
  const toggleLang = () => {
    const next = lang === "de" ? "zh" : "de";
    setLang(next);
    localStorage.setItem("ghibli-lang", next);
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
    if (!/^第6周 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
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
    console.log("[GhibliKitchen] All tests passed (ZH JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}
