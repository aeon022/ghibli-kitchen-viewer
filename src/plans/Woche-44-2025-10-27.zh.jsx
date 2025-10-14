// src/plans/WOCHE-XX-2025-10-27.zh.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

/* ---------- Meta ---------- */
export const meta = {
  title: "Woche 44",
  P25-10-27",
  id: "woche-44-2025-10-27",
  lang: "zh",
  sidebar: "[ZH] Woche 44 (2025-10-27)",
};
const FILE_BASE = "Woche 44 2025-10-27";

/* ---------- UI ----------- */
const UI_TITLES = {
  main: "吉卜力厨房 – 第X周",
  list: "吉卜力厨房 – 购物清单 – 第X周",
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
const DATA = [
  { id: "mo-f", title: "三文鱼嫩豆腐日式粥（お粥）", desc: "日式 Okayu 粥，配清蒸三文鱼与嫩豆腐；灵感来自 Just One Cookbook。", story: "Okayu 源自日本，常作早餐，口感柔和温暖。", target: "总碳水≈70 g（2人）· 蛋白≈20 g/人", ingredients: ["大米（生） 90 g","清水 800 ml","三文鱼柳 140 g","嫩豆腐 200 g","生姜 8 g","香葱 20 g","低钠酱油 10 ml"], steps: ["米洗净加水煮沸，小火煮25–30分钟至软。","放架上蒸鱼8–10分钟至全熟，撕碎。","加入豆腐，少许酱油与姜调味；撒葱段略焖。"], checks: "胃炎 – 温和 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鱼全熟，少碘", swaps: "三文鱼 ↔ 鳕鱼；嫩豆腐 ↔ 老豆腐。", side: "温大麦茶；清淡黄瓜腌菜（不辣）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu, flaked cooked salmon, silken tofu, scallions, gentle steam") },
  { id: "mo-m", title: "清淡拌饭（비빔밥）– 辣椒另上", desc: "韩式拌饭，蔬菜与瘦牛为主；灵感来自 My Korean Kitchen。", story: "韩国日常经典——温热均衡，不辣。", target: "总碳水≈72 g（2人）· 蛋白≈31 g/人", ingredients: ["糙米（生） 90 g","瘦牛肉末 220 g","菠菜 200 g","胡萝卜 120 g","香菇 120 g","鸡蛋 2 Stück","低钠酱油 20 ml","香油 8 ml"], steps: ["米煮熟；蔬菜焯或小火快炒。","牛肉末炒散并全熟。","鸡蛋双面煎至全熟。装碗；辣椒酱小碟另上。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈72 g · 孕期 ✓ 蛋/肉全熟", swaps: "牛肉末 ↔ 火鸡肉末；糙米 ↔ 寿司米。", side: "焯水菠菜；辣椒酱另放。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top") },
  { id: "mo-a", title: "清淡麻婆豆腐（不辣）", desc: "家常版以蘑菇增鲜不加辣；灵感来自 Omnivore's Cookbook。", story: "源自四川；清淡版本更易消化。", target: "总碳水≈70 g（2人）· 蛋白≈30 g/人", ingredients: ["老豆腐 400 g","香菇 150 g","淡味味噌 20 g","蔬菜高汤 300 ml","低钠酱油 18 ml","蒜 1 Stück","生姜 8 g","玉米淀粉 10 g","糙米（生） 90 g"], steps: ["米煮熟；蘑菇焖软。","高汤加味噌/酱油加热，入豆腐浸4–5分钟。","淀粉水勾薄芡，浇在米饭上。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 全熟", swaps: "糙米 ↔ 白米；味噌 ↔ 清淡豆酱。", side: "清蒸青江菜。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes") },

  { id: "di-f", title: "三文鱼饭团与味噌汤（おにぎり・味噌汁）", desc: "熟三文鱼饭团配清淡味噌汤；灵感来自 Just One Cookbook。", story: "饭团是便当文化代表之一——早晨清淡温暖。", target: "总碳水≈78 g（2人）· 蛋白≈27 g/人", ingredients: ["寿司米（生） 100 g","三文鱼柳 160 g","海苔 1 Stück","淡味味噌 20 g","老豆腐 150 g","裙带菜（干） 2 g","清水 900 ml","低钠酱油 10 ml"], steps: ["米煮熟，包入熟三文鱼成饭团，外裹海苔。","味噌以热水化开（不沸腾），下豆腐/裙带菜略烫。","温和调味。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈78 g · 孕期 ✓ 鱼全熟，海藻少量", swaps: "寿司米 ↔ 糙米；三文鱼 ↔ 绿青鳕。", side: "清淡绿茶（低咖）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame") },
  { id: "di-m", title: "鸡肉河粉炒", desc: "广式灵感，蔬菜为主，口味清淡；灵感来自 The Woks of Life。", story: "源自华南的河粉思路——快速均衡。", target: "总碳水≈74 g（2人）· 蛋白≈36 g/人", ingredients: ["河粉（干） 80 g","鸡胸肉 240 g","彩椒 150 g","青江菜 200 g","洋葱 80 g","胡萝卜 100 g","低钠酱油 24 ml","香油 8 ml"], steps: ["河粉浸泡/焯水。","少油把鸡肉炒至全熟。","入蔬菜，清淡翻炒出锅。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈74 g · 孕期 ✓ 鸡肉全熟", swaps: "河粉 ↔ 乌冬；鸡肉 ↔ 豆腐。", side: "清淡黄瓜片。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili") },
  { id: "di-a", title: "大酱汤配大麦（된장찌개）", desc: "韩式大酱汤，醇厚清淡；灵感来自 Seon Kyoung Longest。", story: "韩国家常汤品——不辣更温和。", target: "总碳水≈86 g（2人）· 蛋白≈24 g/人", ingredients: ["大酱 28 g","老豆腐 300 g","西葫芦 200 g","土豆 220 g","香菇 100 g","洋葱 60 g","清水 900 ml","低钠酱油 10 ml","珍珠大麦（生） 70 g"], steps: ["大酱溶于水；蔬菜小火煮12–15分钟。","加入豆腐略煮。","大麦另煮熟配食。"], checks: "胃炎 – 不辣 · 糖尿病 ✓ – ≈86 g · 孕期 ✓ 全熟", swaps: "大麦 ↔ 米饭；豆腐 ↔ 火鸡胸。", side: "清淡黄瓜泡菜（不辣）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley") },

  { id: "mi-f", title: "南瓜粥配豆腐与毛豆（단호박죽）", desc: "绵滑南瓜米粥，高蛋白；灵感来自 Mom’s Korean Recipes。", story: "韩国秋季常见——温和顺口。", target: "总碳水≈75 g（2人）· 蛋白≈22 g/人", ingredients: ["南瓜（日本南瓜/北海道） 420 g","大米（生） 70 g","老豆腐 200 g","毛豆（去壳） 100 g","生姜 6 g","清水 900 ml","食盐 1 g"], steps: ["南瓜与大米煮约25分钟至软。","打成细腻；下豆腐/毛豆再煮3–4分钟。","温和调味。"], checks: "胃炎 – 柔软温热 · 糖尿病 ✓ – ≈75 g · 孕期 ✓ 全熟", swaps: "毛豆 ↔ 白腰豆；豆腐 ↔ 鸡胸丁。", side: "温米茶或大麦茶。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam") },
  { id: "mi-m", title: "鸡肉西兰花乌冬汤（うどん）", desc: "日式清汤乌冬，清淡；灵感来自 Just One Cookbook。", story: "清淡乌冬汤在日本一年四季受欢迎。", target: "总碳水≈79 g（2人）· 蛋白≈32 g/人", ingredients: ["乌冬面（干） 110 g","鸡胸肉 220 g","西兰花 240 g","洋葱 60 g","淡味味噌 24 g","清水 1000 ml","低钠酱油 12 ml"], steps: ["味噌/酱油加水成清汤加热。","鸡肉片入汤煮6–8分钟至熟；蔬菜再煮3–4分钟。","乌冬另煮冲洗后入汤。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈79 g · 孕期 ✓ 鸡肉全熟", swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。", side: "小碟黄瓜。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth") },
  { id: "mi-a", title: "清蒸鳕鱼配姜丝与米饭", desc: "中式清蒸，清淡易消化；粤式灵感。", story: "清蒸在华南地区非常常见。", target: "总碳水≈70 g（2人）· 蛋白≈30 g/人", ingredients: ["鳕鱼柳 320 g","大米（生） 90 g","生姜 12 g","香葱 24 g","低钠酱油 12 ml","香油 6 ml","蔬菜高汤 100 ml"], steps: ["鱼置姜片上蒸8–10分钟至全熟。","加热酱油与高汤淋鱼面；点少许香油。","米饭煮熟同食。"], checks: "胃炎 – 清蒸 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鳕鱼全熟、低汞", swaps: "鳕鱼 ↔ 绿青鳕；白米 ↔ 糙米。", side: "清蒸西兰花。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice") },

  { id: "do-f", title: "玉子烧与味噌汤配小份米饭（卵焼き）", desc: "日式早餐，鸡蛋卷全熟；清淡。", story: "玉子烧是日本经典早餐。", target: "总碳水≈62 g（2人）· 蛋白≈24 g/人", ingredients: ["鸡蛋 4 Stück","老豆腐 150 g","大米（生） 80 g","淡味味噌 20 g","裙带菜（干） 1 g","香葱 18 g","清水 800 ml","低钠酱油 10 ml"], steps: ["米饭煮熟。鸡蛋卷煎至完全凝固。","熬味噌汤；下豆腐/裙带菜略煮。","撒葱花上桌。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈62 g · 孕期 ✓ 鸡蛋全熟", swaps: "白米 ↔ 糙米；豆腐 ↔ 鸡胸丁。", side: "温热绿茶（低咖）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup") },
  { id: "do-m", title: "番茄炒蛋配豆腐与米饭", desc: "中式家常菜，微酸清淡，久炖柔和。", story: "番茄炒蛋在中国十分普遍。", target: "总碳水≈70 g（2人）· 蛋白≈26 g/人", ingredients: ["大米（生） 90 g","鸡蛋 4 Stück","老豆腐 200 g","番茄（熟） 420 g","洋葱 60 g","低钠酱油 10 ml","菜籽油 8 ml"], steps: ["米饭煮熟；鸡蛋炒至全熟。","番茄与洋葱小火炖软；入豆腐。","清淡调味，配米饭。"], checks: "胃炎 – 轻酸久炖 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 蛋全熟", swaps: "豆腐 ↔ 火鸡胸丁；白米 ↔ 糙米。", side: "清蒸青江菜。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili") },
  { id: "do-a", title: "清淡火鸡烤肉风（불고기）配糙米", desc: "韩式风味平底锅做法；辣椒另上。", story: "불고기源自韩国；平底锅做法简单。", target: "总碳水≈80 g（2人）· 蛋白≈28 g/人", ingredients: ["火鸡胸 260 g","糙米（生） 90 g","洋葱 80 g","胡萝卜 120 g","蘑菇 150 g","低钠酱油 24 ml","香油 8 ml","蒜 1 Stück","梨（擦泥） 60 g"], steps: ["火鸡以酱油/梨/蒜腌15分钟。","少油快炒至全熟。","入蔬菜略炒，配米饭。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈80 g · 孕期 ✓ 火鸡全熟", swaps: "火鸡 ↔ 鸡胸；糙米 ↔ 白米。", side: "清淡黄瓜。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili") },

  { id: "fr-f", title: "鸡肉粥", desc: "中式鸡肉粥——柔和暖胃。", story: "粥在华南十分常见。", target: "总碳水≈70 g（2人）· 蛋白≈32 g/人", ingredients: ["大米（生） 90 g","鸡胸肉 220 g","生姜 10 g","胡萝卜 120 g","清水 1100 ml","低钠酱油 10 ml","香葱 20 g"], steps: ["米与水小火煮30分钟。","鸡肉切小块，下锅再煮8–10分钟至全熟。","清淡调味，撒葱花。"], checks: "胃炎 – 很温和 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鸡肉全熟", swaps: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜。", side: "温热草本茶。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam") },
  { id: "fr-m", title: "清淡意式蔬菜汤配豆腐（每周最多一次）", desc: "意式蔬菜浓汤，久煮清淡，加入豆腐以增蛋白。", story: "Minestrone 为意大利蔬菜汤——本配方更清淡。", target: "总碳水≈69 g（2人）· 蛋白≈36 g/人", ingredients: ["全麦意面（干） 60 g","白腰豆（沥干） 200 g","胡萝卜 150 g","西芹 100 g","番茄泥 250 ml","西葫芦 150 g","蔬菜高汤 800 ml","橄榄油 8 ml","帕玛森（巴氏杀菌） 20 g","老豆腐 280 g"], steps: ["少油炒香蔬菜，加入高汤/番茄泥小火煮20–25分钟。","下豆腐/白腰豆，再煮5分钟。","意面另煮，最后拌入。"], checks: "胃炎 – 久煮 · 糖尿病 ✓ – ≈69 g · 孕期 ✓ 奶酪需巴氏杀菌", swaps: "豆腐 ↔ 鸡胸丁；全麦面 ↔ 大麦。", side: "温热香草茶。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, a few wholegrain pasta pieces") },
  { id: "fr-a", title: "烤三文鱼照烧配西兰花与米饭", desc: "日式照烧风味，低钠酱汁，烤箱完成。", story: "照烧是日本常见做法——烤箱更省心。", target: "总碳水≈75 g（2人）· 蛋白≈30 g/人", ingredients: ["三文鱼柳 320 g","大米（生） 90 g","西兰花 300 g","低钠酱油 22 ml","味醂 8 ml","蜂蜜 4 g","生姜 8 g"], steps: ["调酱（酱油+少量味醂/蜂蜜+姜）。","刷鱼，200 °C 烤12–14分钟至全熟。","配米饭与清蒸西兰花。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈75 g（少量甜）· 孕期 ✓ 鱼全熟", swaps: "白米 ↔ 糙米；西兰花 ↔ 青江菜。", side: "温热绿茶。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice") },

  { id: "sa-f", title: "京都汤豆腐配小份米饭（湯豆腐）", desc: "日式热汤豆腐，十分易消化。", story: "京都名物——朴素温暖。", target: "总碳水≈62 g（2人）· 蛋白≈22 g/人", ingredients: ["老豆腐 300 g","清水 900 ml","昆布 2 g","低钠酱油 12 ml","大米（生） 70 g","香葱 15 g"], steps: ["清水加热，昆布浸5分钟后取出（少碘）。","豆腐在汤中加热4–5分钟。","滴少许酱油与葱花，配小碗米饭。"], checks: "胃炎 – 很温和 · 糖尿病 ✓ – ≈62 g · 孕期 ✓ 全熟、少碘", swaps: "白米 ↔ 糙米；酱油 ↔ 清淡高汤。", side: "温热番茶；清淡萝卜泡菜（不辣）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Hot tofu in clear broth (yudofu) in a small pot, small rice bowl, steam visible") },
  { id: "sa-m", title: "鸡蓉玉米羹配小份米饭", desc: "中式玉米鸡蓉羹；鸡蛋全熟。", story: "中国多地常见——清淡易消化。", target: "总碳水≈68 g（2人）· 蛋白≈28 g/人", ingredients: ["鸡胸肉 220 g","玉米粒（熟） 200 g","鸡蛋 1 Stück","清水 900 ml","蔬菜高汤 300 ml","玉米淀粉 12 g","低钠酱油 8 ml","大米（生） 60 g","生姜 6 g"], steps: ["鸡肉切碎入汤煮8–10分钟至熟。","加入玉米；淀粉勾薄芡。","蛋液缓缓倒入并搅拌，至完全凝固。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈68 g · 孕期 ✓ 蛋全熟、鸡肉全熟", swaps: "白米 ↔ 糙米；鸡肉 ↔ 豆腐。", side: "清蒸菠菜。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Chinese chicken and corn soup, silky ribbons of fully set egg, small bowl of rice") },
  { id: "sa-a", title: "味噌烤绿青鳕配米饭", desc: "日式风味——烤箱烤绿青鳕，清淡味噌酱。", story: "淡味噌腌鱼烤制，快捷清淡。", target: "总碳水≈72 g（2人）· 蛋白≈28 g/人", ingredients: ["绿青鳕柳 320 g","大米（生） 90 g","淡味味噌 18 g","清水 20 ml","蜂蜜 4 g","生姜 8 g","香油 6 ml"], steps: ["味噌加少量清水/蜂蜜调匀。","刷鱼，200 °C 烤12–14分钟至全熟。","配米饭。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈72 g · 孕期 ✓ 鱼全熟、低汞", swaps: "绿青鳕 ↔ 鳕鱼；白米 ↔ 糙米。", side: "清蒸青江菜或西兰花。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Oven-baked pollock with light miso glaze, steaming rice on the side") },

  { id: "so-f", title: "杂炊鸡肉米汤（鸡蛋全熟）", desc: "日式米汤配蔬菜；非常温和暖胃。", story: "Zōsui 在日本常作清淡剩饭料理。", target: "总碳水≈66 g（2人）· 蛋白≈24 g/人", ingredients: ["熟米饭 240 g","鸡胸肉 160 g","胡萝卜 120 g","西葫芦 150 g","清水 900 ml","低钠酱油 10 ml","鸡蛋 1 Stück","生姜 6 g"], steps: ["蔬菜煮8–10分钟，鸡肉细条入汤再煮6–8分钟至熟。","加入米饭再煮3–4分钟。","蛋液缓倒并搅拌至完全凝固。"], checks: "胃炎 – 很温和 · 糖尿病 ✓ – ≈66 g · 孕期 ✓ 蛋/鸡全熟", swaps: "熟米饭 ↔ 现煮米饭；鸡肉 ↔ 豆腐。", side: "温大麦茶。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Japanese zosui rice and chicken soup in a clay bowl, gentle steam") },
  { id: "so-m", title: "热荞麦面配豆腐与香菇（そば）", desc: "清淡汤底的荞麦面，豆腐为主。", story: "荞麦面在日本很传统——热食更易消化。", target: "总碳水≈75 g（2人）· 蛋白≈24 g/人", ingredients: ["荞麦面（干） 110 g","老豆腐 240 g","香菇 120 g","香葱 20 g","淡味味噌 20 g","清水 1000 ml","低钠酱油 12 ml"], steps: ["水/味噌/酱油成汤，煮香菇4分钟。","荞麦面另煮冲洗，与豆腐入汤。","略焖，撒葱花。"], checks: "胃炎 – 清淡 · 糖尿病 ✓ – ≈75 g · 孕期 ✓ 全熟", swaps: "荞麦面 ↔ 乌冬；豆腐 ↔ 鸡胸丁。", side: "焯水青江菜。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Warm soba noodle bowl with tofu and shiitake in light broth") },
  { id: "so-a", title: "枸杞清蒸鸡配米饭", desc: "粤式清蒸——清淡芳香。", story: "姜丝清蒸在华南很常见。", target: "总碳水≈70 g（2人）· 蛋白≈28 g/人", ingredients: ["鸡胸肉 300 g","大米（生） 90 g","枸杞（干） 8 g","生姜 10 g","香葱 20 g","低钠酱油 12 ml","香油 6 ml"], steps: ["鸡片置姜片上，铺枸杞，蒸12–14分钟至全熟。","淋少许酱油/香油。","配新煮米饭。"], checks: "胃炎 – 清蒸 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鸡肉全熟", swaps: "鸡胸 ↔ 火鸡胸；白米 ↔ 糙米。", side: "清蒸西兰花或青江菜。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Steamed chicken slices with goji berries and ginger, light soy drizzle, bowl of rice") }
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
          <h2 style={{ marginTop: 0 }}>{title}</h2>
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
export default function Woche4_YYYY_10_20_ZH() {
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
    if (!/^第X周 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex");
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