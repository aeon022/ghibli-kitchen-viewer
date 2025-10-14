// src/plans/Woche-44-2025-10-27.zh.jsx
import React, { useEffect, useMemo, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";

export const meta = {
  title: "Woche 44",
  startDate: "2025-10-27",
  id: "woche-44-2025-10-27",
};
const FILE_BASE = "Woche 44 2025-10-27";
const lang = "zh";

const COLORS = {
  pageBg:"#FAF7F1",
  text:"#111827",
  border:"rgba(0,0,0,.10)",
  panelBG70:"rgba(255,255,255,.70)",
  panelBG80:"rgba(255,255,255,.80)",
  white:"#FFFFFF",
  emerald:"#059669",
  amber:"#f59e0b",
  sky:"#0284c7",
  neutral:"#404040",
  indigo:"#4f46e5",
  btnShadow:"0 6px 20px rgba(0,0,0,.12)",
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

const DAYS_ORDER = ["mo","di","mi","do","fr","sa","so"];
const DAY_NAME_DE = { mo:"Montag", di:"Dienstag", mi:"Mittwoch", do:"Donnerstag", fr:"Freitag", sa:"Samstag", so:"Sonntag" }; // 结构一致
const DAY_NAME_ZH = { mo:"周一", di:"周二", mi:"周三", do:"周四", fr:"周五", sa:"周六", so:"周日" };

const asList = (v, l) => { try { const out = pickList(v, l); return Array.isArray(out) ? out : []; } catch { return []; } };
const safeText = (v, l) => { try { const s = pickText(v, l); return (s ?? "").toString(); } catch { return ""; } };

// ------------------------------ DATA (ZH, monolingual) -----------------
const DATA = [
  { id: "mo-f", title: "三文鱼嫩豆腐日式粥（お粥）", desc: "日式 Okayu 粥，配清蒸三文鱼与嫩豆腐；灵感来自 Just One Cookbook。", story: "Okayu 源自日本，常作早餐，口感柔和温暖。", target: "总碳水≈70 g（2人）· 蛋白≈20 g/人", ingredients: ["大米（生） 90 g","清水 800 ml","三文鱼柳 140 g","嫩豆腐 200 g","生姜 8 g","香葱 20 g","低钠酱油 10 ml"], steps: ["米洗净加水煮沸，小火煮25–30分钟至软。","放架上蒸鱼8–10分钟至全熟，撕碎。","加入豆腐，少许酱油与姜调味；撒葱段略焖。"], checks: "胃炎 ✓ 温和 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鱼全熟，少碘", swaps: "三文鱼 ↔ 鳕鱼；嫩豆腐 ↔ 老豆腐。", side: "温大麦茶；清淡黄瓜腌菜（不辣）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Creamy Japanese okayu, flaked cooked salmon, silken tofu, scallions, gentle steam") },
  { id: "mo-m", title: "清淡拌饭（비빔밥）– 辣椒另上", desc: "韩式拌饭，蔬菜与瘦牛为主；灵感来自 My Korean Kitchen。", story: "韩国日常经典——温热均衡，不辣。", target: "总碳水≈72 g（2人）· 蛋白≈31 g/人", ingredients: ["糙米（生） 90 g","瘦牛肉末 220 g","菠菜 200 g","胡萝卜 120 g","香菇 120 g","鸡蛋 2 Stück","低钠酱油 20 ml","香油 8 ml"], steps: ["米煮熟；蔬菜焯或小火快炒。","牛肉末炒散并全熟。","鸡蛋双面煎至全熟。装碗；辣椒酱小碟另上。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈72 g · 孕期 ✓ 蛋/肉全熟", swaps: "牛肉末 ↔ 火鸡肉末；糙米 ↔ 寿司米。", side: "焯水菠菜；辣椒酱另放。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Colorful bibimbap bowl, brown rice, sautéed spinach carrots shiitake, fully cooked egg, no chili on top") },
  { id: "mo-a", title: "清淡麻婆豆腐（不辣）", desc: "家常版以蘑菇增鲜不加辣；灵感来自 Omnivore's Cookbook。", story: "源自四川；清淡版本更易消化。", target: "总碳水≈70 g（2人）· 蛋白≈30 g/人", ingredients: ["老豆腐 400 g","香菇 150 g","淡味味噌 20 g","蔬菜高汤 300 ml","低钠酱油 18 ml","蒜 1 Stück","生姜 8 g","玉米淀粉 10 g","糙米（生） 90 g"], steps: ["米煮熟；蘑菇焖软。","高汤加味噌/酱油加热，入豆腐浸4–5分钟。","淀粉水勾薄芡，浇在米饭上。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 全熟", swaps: "糙米 ↔ 白米；味噌 ↔ 清淡豆酱。", side: "清蒸青江菜。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Mild mapo tofu with mushrooms, glossy light-brown sauce, over brown rice, no chili flakes") },
  { id: "di-f", title: "三文鱼饭团与味噌汤（おにぎり・味噌汁）", desc: "熟三文鱼饭团配清淡味噌汤；灵感来自 Just One Cookbook。", story: "饭团是便当文化代表之一——早晨清淡温暖。", target: "总碳水≈78 g（2人）· 蛋白≈27 g/人", ingredients: ["寿司米（生） 100 g","三文鱼柳 160 g","海苔 1 Stück","淡味味噌 20 g","老豆腐 150 g","裙带菜（干） 2 g","清水 900 ml","低钠酱油 10 ml"], steps: ["米煮熟，包入熟三文鱼成饭团，外裹海苔。","味噌以热水化开（不沸腾），下豆腐/裙带菜略烫。","温和调味。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈78 g · 孕期 ✓ 鱼全熟，海藻少量", swaps: "寿司米 ↔ 糙米；三文鱼 ↔ 绿青鳕。", side: "清淡绿茶（低咖）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame") },
  { id: "di-m", title: "鸡肉河粉炒", desc: "广式灵感，蔬菜为主，口味清淡；灵感来自 The Woks of Life。", story: "源自华南的河粉思路——快速均衡。", target: "总碳水≈74 g（2人）· 蛋白≈36 g/人", ingredients: ["河粉（干） 80 g","鸡胸肉 240 g","彩椒 150 g","青江菜 200 g","洋葱 80 g","胡萝卜 100 g","低钠酱油 24 ml","香油 8 ml"], steps: ["河粉浸泡/焯水。","少油把鸡肉炒至全熟。","入蔬菜，清淡翻炒出锅。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈74 g · 孕期 ✓ 鸡肉全熟", swaps: "河粉 ↔ 乌冬；鸡肉 ↔ 豆腐。", side: "清淡黄瓜片。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Stir-fried rice noodles with chicken and colorful vegetables, light sauce, no chili") },
  { id: "di-a", title: "大酱汤配大麦（된장찌개）", desc: "韩式大酱汤，醇厚清淡；灵感来自 Seon Kyoung Longest。", story: "韩国家常汤品——不辣更温和。", target: "总碳水≈86 g（2人）· 蛋白≈24 g/人", ingredients: ["大酱 28 g","老豆腐 300 g","西葫芦 200 g","土豆 220 g","香菇 100 g","洋葱 60 g","清水 900 ml","低钠酱油 10 ml","珍珠大麦（生） 70 g"], steps: ["大酱溶于水；蔬菜小火煮12–15分钟。","加入豆腐略煮。","大麦另煮熟配食。"], checks: "胃炎 ✓ 不辣 · 糖尿病 ✓ – ≈86 g · 孕期 ✓ 全熟", swaps: "大麦 ↔ 米饭；豆腐 ↔ 火鸡胸。", side: "清淡黄瓜泡菜（不辣）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Korean soybean stew with tofu and vegetables in a clay pot, side of barley") },
  { id: "mi-f", title: "南瓜粥配豆腐与毛豆（단호박죽）", desc: "绵滑南瓜米粥，高蛋白；灵感来自 Mom’s Korean Recipes。", story: "韩国秋季常见——温和顺口。", target: "总碳水≈75 g（2人）· 蛋白≈22 g/人", ingredients: ["南瓜（日本南瓜/北海道） 420 g","大米（生） 70 g","老豆腐 200 g","毛豆（去壳） 100 g","生姜 6 g","清水 900 ml","食盐 1 g"], steps: ["南瓜与大米煮约25分钟至软。","打成细腻；下豆腐/毛豆再煮3–4分钟。","温和调味。"], checks: "胃炎 ✓ 柔软温热 · 糖尿病 ✓ – ≈75 g · 孕期 ✓ 全熟", swaps: "毛豆 ↔ 白腰豆；豆腐 ↔ 鸡胸丁。", side: "温米茶或大麦茶。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Golden pumpkin rice porridge, tofu cubes and green edamame, gentle steam") },
  { id: "mi-m", title: "鸡肉西兰花乌冬汤（うどん）", desc: "日式清汤乌冬，清淡；灵感来自 Just One Cookbook。", story: "清淡乌冬汤在日本一年四季受欢迎。", target: "总碳水≈79 g（2人）· 蛋白≈32 g/人", ingredients: ["乌冬面（干） 110 g","鸡胸肉 220 g","西兰花 240 g","洋葱 60 g","淡味味噌 24 g","清水 1000 ml","低钠酱油 12 ml"], steps: ["味噌/酱油加水成清汤加热。","鸡肉片入汤煮6–8分钟至熟；蔬菜再煮3–4分钟。","乌冬另煮冲洗后入汤。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈79 g · 孕期 ✓ 鸡肉全熟", swaps: "乌冬 ↔ 荞麦面；鸡肉 ↔ 豆腐。", side: "小碟黄瓜。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Light udon soup with chicken slices and broccoli in clear broth") },
  { id: "mi-a", title: "清蒸鳕鱼配姜丝与米饭", desc: "中式清蒸，清淡易消化；粤式灵感。", story: "清蒸在华南地区非常常见。", target: "总碳水≈70 g（2人）· 蛋白≈30 g/人", ingredients: ["鳕鱼柳 320 g","大米（生） 90 g","生姜 12 g","香葱 24 g","低钠酱油 12 ml","香油 6 ml","蔬菜高汤 100 ml"], steps: ["鱼置姜片上蒸8–10分钟至全熟。","加热酱油与高汤淋鱼面；点少许香油。","米饭煮熟同食。"], checks: "胃炎 ✓ 清蒸 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鳕鱼全熟、低汞", swaps: "鳕鱼 ↔ 绿青鳕；白米 ↔ 糙米。", side: "清蒸西兰花。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Steamed cod with ginger and scallions, light glossy sauce, side bowl of rice") },
  { id: "do-f", title: "玉子烧与味噌汤配小份米饭（卵焼き）", desc: "日式早餐，鸡蛋卷全熟；清淡。", story: "玉子烧是日本经典早餐。", target: "总碳水≈62 g（2人）· 蛋白≈24 g/人", ingredients: ["鸡蛋 4 Stück","老豆腐 150 g","大米（生） 80 g","淡味味噌 20 g","裙带菜（干） 1 g","香葱 18 g","清水 800 ml","低钠酱油 10 ml"], steps: ["米饭煮熟。鸡蛋卷煎至完全凝固。","熬味噌汤；下豆腐/裙带菜略煮。","撒葱花上桌。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈62 g · 孕期 ✓ 鸡蛋全熟", swaps: "白米 ↔ 糙米；豆腐 ↔ 鸡胸丁。", side: "温热绿茶（低咖）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Japanese breakfast set with rolled omelet, small rice bowl, miso soup") },
  { id: "do-m", title: "番茄炒蛋配豆腐与米饭", desc: "中式家常菜，微酸清淡，久炖柔和。", story: "番茄炒蛋在中国十分普遍。", target: "总碳水≈70 g（2人）· 蛋白≈26 g/人", ingredients: ["大米（生） 90 g","鸡蛋 4 Stück","老豆腐 200 g","番茄（熟） 420 g","洋葱 60 g","低钠酱油 10 ml","菜籽油 8 ml"], steps: ["米饭煮熟；鸡蛋炒至全熟。","番茄与洋葱小火炖软；入豆腐。","清淡调味，配米饭。"], checks: "胃炎 ✓ 轻酸久炖 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 蛋全熟", swaps: "豆腐 ↔ 火鸡胸丁；白米 ↔ 糙米。", side: "清蒸青江菜。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Tomato and egg stir-fry with tofu, served with rice, soft edges, no chili") },
  { id: "do-a", title: "清淡火鸡烤肉风（불고기）配糙米", desc: "韩式风味平底锅做法；辣椒另上。", story: "불고기源自韩国；平底锅做法简单。", target: "总碳水≈80 g（2人）· 蛋白≈28 g/人", ingredients: ["火鸡胸 260 g","糙米（生） 90 g","洋葱 80 g","胡萝卜 120 g","蘑菇 150 g","低钠酱油 24 ml","香油 8 ml","蒜 1 Stück","梨（擦泥） 60 g"], steps: ["火鸡以酱油/梨/蒜腌15分钟。","少油快炒至全熟。","入蔬菜略炒，配米饭。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈80 g · 孕期 ✓ 火鸡全熟", swaps: "火鸡 ↔ 鸡胸；糙米 ↔ 白米。", side: "清淡黄瓜。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Mild bulgogi turkey with mushrooms and carrots, brown rice, no chili") },
  { id: "fr-f", title: "鸡肉粥", desc: "中式鸡肉粥——柔和暖胃。", story: "粥在华南十分常见。", target: "总碳水≈70 g（2人）· 蛋白≈32 g/人", ingredients: ["大米（生） 90 g","鸡胸肉 220 g","生姜 10 g","胡萝卜 120 g","清水 1100 ml","低钠酱油 10 ml","香葱 20 g"], steps: ["米与水小火煮30分钟。","鸡肉切小块，下锅再煮8–10分钟至全熟。","清淡调味，撒葱花。"], checks: "胃炎 ✓ 很温和 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鸡肉全熟", swaps: "鸡肉 ↔ 豆腐；胡萝卜 ↔ 南瓜。", side: "温热草本茶。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Chicken congee in a deep bowl, shredded chicken, scallions, gentle steam") },
  { id: "fr-m", title: "清淡意式蔬菜汤配豆腐（每周最多一次）", desc: "意式蔬菜浓汤，久煮清淡，加入豆腐以增蛋白。", story: "Minestrone 为意大利蔬菜汤——本配方更清淡。", target: "总碳水≈69 g（2人）· 蛋白≈36 g/人", ingredients: ["全麦意面（干） 60 g","白腰豆（沥干） 200 g","胡萝卜 150 g","西芹 100 g","番茄泥 250 ml","西葫芦 150 g","蔬菜高汤 800 ml","橄榄油 8 ml","帕玛森（巴氏杀菌） 20 g","老豆腐 280 g"], steps: ["少油炒香蔬菜，加入高汤/番茄泥小火煮20–25分钟。","下豆腐/白腰豆，再煮5分钟。","意面另煮，最后拌入。"], checks: "胃炎 ✓ 久煮 · 糖尿病 ✓ – ≈69 g · 孕期 ✓ 奶酪需巴氏杀菌", swaps: "豆腐 ↔ 鸡胸丁；全麦面 ↔ 大麦。", side: "温热香草茶。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Light minestrone with vegetables and tofu, a few wholegrain pasta pieces") },
  { id: "fr-a", title: "烤三文鱼照烧配西兰花与米饭", desc: "日式照烧风味，低钠酱汁，烤箱完成。", story: "照烧是日本常见做法——烤箱更省心。", target: "总碳水≈75 g（2人）· 蛋白≈30 g/人", ingredients: ["三文鱼柳 320 g","大米（生） 90 g","西兰花 300 g","低钠酱油 22 ml","味醂 8 ml","蜂蜜 4 g","生姜 8 g"], steps: ["调酱（酱油+少量味醂/蜂蜜+姜）。","刷鱼，200 °C 烤12–14分钟至全熟。","配米饭与清蒸西兰花。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈75 g（少量甜）· 孕期 ✓ 鱼全熟", swaps: "白米 ↔ 糙米；西兰花 ↔ 青江菜。", side: "温热绿茶。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Baked salmon with light teriyaki glaze, steamed broccoli and rice") },
  { id: "sa-f", title: "京都汤豆腐配小份米饭（湯豆腐）", desc: "日式热汤豆腐，十分易消化。", story: "京都名物——朴素温暖。", target: "总碳水≈62 g（2人）· 蛋白≈22 g/人", ingredients: ["老豆腐 300 g","清水 900 ml","昆布 2 g","低钠酱油 12 ml","大米（生） 70 g","香葱 15 g"], steps: ["清水加热，昆布浸5分钟后取出（少碘）。","豆腐在汤中加热4–5分钟。","滴少许酱油与葱花，配小碗米饭。"], checks: "胃炎 ✓ 很温和 · 糖尿病 ✓ – ≈62 g · 孕期 ✓ 全熟、少碘", swaps: "白米 ↔ 糙米；酱油 ↔ 清淡高汤。", side: "温热番茶；清淡萝卜泡菜（不辣）。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Hot tofu in clear broth (yudofu) in a small pot, small rice bowl, steam visible") },
  { id: "sa-m", title: "鸡蓉玉米羹配小份米饭", desc: "中式玉米鸡蓉羹；鸡蛋全熟。", story: "中国多地常见——清淡易消化。", target: "总碳水≈68 g（2人）· 蛋白≈28 g/人", ingredients: ["鸡胸肉 220 g","玉米粒（熟） 200 g","鸡蛋 1 Stück","清水 900 ml","蔬菜高汤 300 ml","玉米淀粉 12 g","低钠酱油 8 ml","大米（生） 60 g","生姜 6 g"], steps: ["鸡肉切碎入汤煮8–10分钟至熟。","加入玉米；淀粉勾薄芡。","蛋液缓缓倒入并搅拌，至完全凝固。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈68 g · 孕期 ✓ 蛋全熟、鸡肉全熟", swaps: "白米 ↔ 糙米；鸡肉 ↔ 豆腐。", side: "清蒸菠菜。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Chinese chicken and corn soup, silky ribbons of fully set egg, small bowl of rice") },
  { id: "sa-a", title: "味噌烤绿青鳕配米饭", desc: "日式风味——烤箱烤绿青鳕，清淡味噌酱。", story: "淡味噌腌鱼烤制，快捷清淡。", target: "总碳水≈72 g（2人）· 蛋白≈28 g/人", ingredients: ["绿青鳕柳 320 g","大米（生） 90 g","淡味味噌 18 g","清水 20 ml","蜂蜜 4 g","生姜 8 g","香油 6 ml"], steps: ["味噌加少量清水/蜂蜜调匀。","刷鱼，200 °C 烤12–14分钟至全熟。","配米饭。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈72 g · 孕期 ✓ 鱼全熟、低汞", swaps: "绿青鳕 ↔ 鳕鱼；白米 ↔ 糙米。", side: "清蒸青江菜或西兰花。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Oven-baked pollock with light miso glaze, steaming rice on the side") },
  { id: "so-f", title: "杂炊鸡肉米汤（鸡蛋全熟）", desc: "日式米汤配蔬菜；非常温和暖胃。", story: "Zōsui 在日本常作清淡剩饭料理。", target: "总碳水≈66 g（2人）· 蛋白≈24 g/人", ingredients: ["熟米饭 240 g","鸡胸肉 160 g","胡萝卜 120 g","西葫芦 150 g","清水 900 ml","低钠酱油 10 ml","鸡蛋 1 Stück","生姜 6 g"], steps: ["蔬菜煮8–10分钟，鸡肉细条入汤再煮6–8分钟至熟。","加入米饭再煮3–4分钟。","蛋液缓倒并搅拌至完全凝固。"], checks: "胃炎 ✓ 很温和 · 糖尿病 ✓ – ≈66 g · 孕期 ✓ 蛋/鸡全熟", swaps: "熟米饭 ↔ 现煮米饭；鸡肉 ↔ 豆腐。", side: "温大麦茶。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Japanese zosui rice and chicken soup in a clay bowl, gentle steam") },
  { id: "so-m", title: "热荞麦面配豆腐与香菇（そば）", desc: "清淡汤底的荞麦面，豆腐为主。", story: "荞麦面在日本很传统——热食更易消化。", target: "总碳水≈75 g（2人）· 蛋白≈24 g/人", ingredients: ["荞麦面（干） 110 g","老豆腐 240 g","香菇 120 g","香葱 20 g","淡味味噌 20 g","清水 1000 ml","低钠酱油 12 ml"], steps: ["水/味噌/酱油成汤，煮香菇4分钟。","荞麦面另煮冲洗，与豆腐入汤。","略焖，撒葱花。"], checks: "胃炎 ✓ 清淡 · 糖尿病 ✓ – ≈75 g · 孕期 ✓ 全熟", swaps: "荞麦面 ↔ 乌冬；豆腐 ↔ 鸡胸丁。", side: "焯水青江菜。", remind: false, prompt: buildPrompt(PROMPT_HEADER, "Warm soba noodle bowl with tofu and shiitake in light broth") },
  { id: "so-a", title: "枸杞清蒸鸡配米饭", desc: "粤式清蒸——清淡芳香。", story: "姜丝清蒸在华南很常见。", target: "总碳水≈70 g（2人）· 蛋白≈28 g/人", ingredients: ["鸡胸肉 300 g","大米（生） 90 g","枸杞（干） 8 g","生姜 10 g","香葱 20 g","低钠酱油 12 ml","香油 6 ml"], steps: ["鸡片置姜片上，铺枸杞，蒸12–14分钟至全熟。","淋少许酱油/香油。","配新煮米饭。"], checks: "胃炎 ✓ 清蒸 · 糖尿病 ✓ – ≈70 g · 孕期 ✓ 鸡肉全熟", swaps: "鸡胸 ↔ 火鸡胸；白米 ↔ 糙米。", side: "清蒸西兰花或青江菜。", remind: true, prompt: buildPrompt(PROMPT_HEADER, "Steamed chicken slices with goji berries and ginger, light soy drizzle, bowl of rice") }
];

// ------------------------------ Helpers -------------------------------
const groupByDay = (arr) => {
  const map = { mo:[], di:[], mi:[], do:[], fr:[], sa:[], so:[] };
  arr.forEach((r)=> map[r.id.split("-")[0]].push(r));
  Object.values(map).forEach((list)=>
    list.sort((a,b)=> ["f","m","a"].indexOf(a.id.split("-")[1]) - ["f","m","a"].indexOf(b.id.split("-")[1]))
  );
  return map;
};

const parseLine = (s) => {
  const re = /(.*)\s(\d+[\.,]?\d*)\s(g|ml|l|EL|TL|Stück)/i;
  const m = s.match(re);
  if (!m) return null;
  let name = m[1].trim();
  let qty = parseFloat(String(m[2]).replace(",", "."));
  let unit = m[3];
  if (unit === "l") { unit = "ml"; qty = qty * 1000; }
  return { name, qty, unit };
};

const collectList = (data) => {
  const map = new Map();
  data.forEach((r) => {
    const list = Array.isArray(r.ingredients) ? r.ingredients : [];
    list.forEach((line) => {
      const p = parseLine(line);
      if (!p) return;
      const key = `${p.name}__${p.unit}`;
      const prev = map.get(key) || 0;
      map.set(key, prev + p.qty);
    });
  });
  const items = Array.from(map.entries()).map(([key, qty]) => {
    const [name, unit] = key.split("__");
    return { name, qty, unit };
  });
  items.sort((a, b) => a.name.localeCompare(b.name, "zh"));
  return items;
};

const categorize = (name) => {
  const n = name.toLowerCase();
  if (/(三文鱼|鳕鱼|绿青鳕|鸡|火鸡|牛肉|鸡蛋|豆腐|毛豆|白腰豆)/.test(name) || /(lachs|kabeljau|seelachs|hähnchen|pute|rinderhack|ei|eier|tofu|edamame|cannellini|bohnen)/i.test(n)) return "蛋白/鱼/豆制品";
  if (/(米\b|乌冬|荞麦|河粉|意面|大麦)/.test(name) || /(reis\b|udon|soba|reisnudeln|pasta|gerste|perlgerste)/i.test(n)) return "米面主食";
  if (/(西兰花|青江菜|西葫芦|胡萝卜|彩椒|洋葱|香葱|香菇|生姜|番茄|玉米|南瓜|菠菜|黄瓜|蘑菇)/.test(name) || /(brokkoli|pak choi|zucchini|karotte|paprika|zwiebel|frühlingszwiebel|shiitake|ingwer|tomaten|mais|kürbis|spinat|gurke|champignons)/i.test(n)) return "蔬菜/菌菇";
  if (/(味噌|酱油|裙带菜|昆布|香油|蔬菜高汤|清水|味醂|蜂蜜|玉米淀粉|橄榄油|菜籽油|食盐)/.test(name) || /(miso|sojasauce|wakame|kombu|sesamöl|gemüsebrühe|wasser|mirin|honig|maisstärke|olivenöl|rapsöl|salz)/i.test(n)) return "海藻/汤底/调味";
  return "海藻/汤底/调味";
};

const groupList = (list) => {
  const groups = { "蛋白/鱼/豆制品": [], "蔬菜/菌菇": [], "米面主食": [], "海藻/汤底/调味": [] };
  list.forEach((it) => { groups[categorize(it.name)].push(it); });
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => a.name.localeCompare(b.name, "zh")));
  return groups;
};

const LIST_SUMMARY = groupList(collectList(DATA));

function InfoBadge({ show }) {
  if (!show) return null;
  const text = "💊 二甲双胍请随餐服用";
  return (<div className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"><span>{text}</span></div>);
}

function useLocalImage(key) {
  const [src, setSrc] = useState(null);
  useEffect(() => { try { const s = localStorage.getItem(key); if (s) setSrc(s); } catch {} }, [key]);
  const onChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setSrc(dataUrl);
      try { localStorage.setItem(key, dataUrl); } catch {}
    };
    reader.readAsDataURL(file);
  };
  return [src, onChange];
}

function UploadBox({ storageKey, label }) {
  const [src, onChange] = useLocalImage(storageKey);
  return (<div className="print:hidden">
    <label className="text-sm text-slate-600">{label}</label>
    <input type="file" accept="image/*" className="block mt-1" onChange={(e) => onChange(e.target.files?.[0])} />
    {src && (<div className="mt-2"><img src={src} alt="upload" className="w-full rounded-lg border" /></div>)}
  </div>);
}

function Overview({ data }) {
  const perDay = useMemo(() => groupByDay(data), [data]);
  const DAY_NAME = DAY_NAME_ZH;
  return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    {DAYS_ORDER.map((d) => (
      <div key={d} style={cardMainStyle}>
        <div className="text-sky-700 text-sm mb-2">{DAY_NAME[d]}</div>
        <div className="grid grid-cols-3 gap-2">
          {perDay[d].map((r) => {
            const meal = r.id.split("-")[1];
            return (
              <div key={r.id} className="border rounded-md p-2 text-xs">
                <div className="text-slate-700 font-semibold mb-1">{meal === "f" ? "早餐" : meal === "m" ? "午餐" : "晚餐"}</div>
                <div className="text-slate-800 line-clamp-2 mb-1">{safeText(r.title, lang)}</div>
                <div className="text-amber-700">🌾 {safeText(r.target, lang)}</div>
                {r.remind && <div className="text-xs mt-1">💊</div>}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>);
}

function RecipeCard({ r }) {
  const day = r.id.split("-")[0];
  const meal = r.id.split("-")[1];
  const DAY_NAME = DAY_NAME_ZH;
  return (
    <div className="grid grid-cols-12 gap-4 break-inside-avoid-page" style={{ pageBreakInside: "avoid" }}>
      <div className="col-span-12 md:col-span-4" style={cardPanelStyle}>
        <UploadBox storageKey={"wk44-" + r.id + "-img-zh"} label="上传图片（可选）" />
        <div className="mt-3 text-sm text-slate-700">
          <div className="mb-2"><span className="font-medium">简介：</span> {safeText(r.desc, lang)}</div>
          <div className="mb-2"><span className="font-medium">目标：</span> {safeText(r.target, lang)}</div>
          <div className="mb-2"><span className="font-medium">检查：</span> {safeText(r.checks, lang)}</div>
          <div className="mb-2"><span className="font-medium">配菜/饮品：</span> {safeText(r.side, lang)}</div>
          <InfoBadge show={r.remind} />
        </div>
      </div>
      <div className="col-span-12 md:col-span-8" style={cardMainStyle}>
        <div className="text-sky-700 text-sm mb-1">{DAY_NAME[day]} – {meal === "f" ? "早晨" : meal === "m" ? "中午" : "晚上"}</div>
        <h2 className="text-2xl font-bold text-slate-900">{safeText(r.title, lang)}</h2>
        <p className="text-[12px] text-slate-700 mt-1">{safeText(r.story, lang)}</p>
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">食材（2人）</h3>
          <ul className="list-disc pl-5">{asList(r.ingredients, lang).map((it, i) => (<li key={i}>{it}</li>))}</ul>
        </div>
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">步骤</h3>
          <ol className="list-decimal pl-5">{asList(r.steps, lang).map((it, i) => (<li key={i} className="mb-1">{it}</li>))}</ol>
        </div>
        <div className="text-sm text-slate-700"><span className="font-medium">替换：</span> {safeText(r.swaps, lang)}</div>
      </div>
    </div>
  );
}

export default function Woche44ZH() {
  const [tab, setTab] = useState("kochbuch");
  const [dl, setDl] = useState({ pdfCook: null, pdfList: null, htmlCook: null, htmlList: null });

  const shopping = useMemo(() => collectList(DATA), []);
  const grouped = useMemo(() => groupList(shopping), [shopping]);

  const cssLandscape = useMemo(() => buildEmbedCss({ orientation: "landscape" }), []);
  const cssPortrait = useMemo(() => buildEmbedCss({ orientation: "portrait" }), []);

  const handleExportPDF = async (which) => {
    const id = which === "kochbuch" ? "cookbook-root" : "list-root";
    const css = which === "kochbuch" ? cssLandscape : cssPortrait;
    const file = `${FILE_BASE}-${which}-zh.pdf`;
    const blob = await exportPDFById(id, { filename: file, orientation: which === "kochbuch" ? "landscape" : "portrait", css });
    const url = URL.createObjectURL(blob);
    setDl((s) => ({ ...s, [which === "kochbuch" ? "pdfCook" : "pdfList"]: { url, name: file } }));
  };

  const handleExportHTML = async (which) => {
    const id = which === "kochbuch" ? "cookbook-root" : "list-root";
    const file = `${FILE_BASE}-${which}-zh.html`;
    const blob = await exportHTMLById(id, { filename: file });
    const url = URL.createObjectURL(blob);
    setDl((s) => ({ ...s, [which === "kochbuch" ? "htmlCook" : "htmlList"]: { url, name: file } }));
  };

  useEffect(() => { Tests(); }, []);

  return (
    <div className="min-h-screen p-6" style={{ background: COLORS.pageBg, color: COLORS.text }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">GhibliKitchen – 周次 44</h1>
            <div className="text-slate-600">开始：{meta.startDate} · 文件：{FILE_BASE}</div>
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-2 rounded-2xl bg-emerald-600 text-white shadow" onClick={() => handleExportPDF(tab)}>{UI[lang]?.buttons?.pdf || "生成 PDF"}</button>
            <button className="px-3 py-2 rounded-2xl bg-indigo-600 text-white shadow" onClick={() => handleExportHTML(tab)}>{UI[lang]?.buttons?.html || "导出 HTML"}</button>
            <button className="px-3 py-2 rounded-2xl bg-sky-600 text-white shadow" onClick={() => window.print()}>{UI[lang]?.buttons?.print || "打印"}</button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("kochbuch")} className={`px-3 py-2 rounded-2xl border ${tab === "kochbuch" ? "bg-white" : "bg-transparent"}`}>{UI[lang]?.tabs?.cookbook || "食谱"}</button>
          <button onClick={() => setTab("einkauf")} className={`px-3 py-2 rounded-2xl border ${tab === "einkauf" ? "bg-white" : "bg-transparent"}`}>{UI[lang]?.tabs?.list || "购物清单"}</button>
        </div>

        {tab === "kochbuch" ? (
          <div id="cookbook-root" className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4" style={cardPanelStyle}>
                <h2 className="text-xl font-semibold mb-2">封面与提示</h2>
                <UploadBox storageKey="wk44-cover-zh" label="封面图片（可选）" />
                <ul className="text-sm text-slate-700 mt-3 list-disc pl-5">
                  <li>胃炎（严格）：不辣、少油、轻酸，温热上桌。</li>
                  <li>糖尿病：每餐（2人）60–90 g 碳水；注意膳食纤维。</li>
                  <li>孕期：不吃生食；全部熟透；少碘；低钠酱油。</li>
                  <li>💊 二甲双胍提醒：仅早餐与晚餐显示。</li>
                </ul>
              </div>
              <div className="col-span-12 md:col-span-8" style={cardMainStyle}>
                <h2 className="text-xl font-semibold mb-2">周计划总览</h2>
                <Overview data={DATA} />
              </div>
            </div>

            {DAYS_ORDER.map((d) => (
              <div key={d} className="space-y-6">
                {groupByDay(DATA)[d].map((r) => (<RecipeCard key={r.id} r={r} />))}
              </div>
            ))}

            <div className="mt-4 text-sm">
              {dl.pdfCook && (<div className="mb-1">PDF：<a className="text-sky-700 underline" href={dl.pdfCook.url} download>{dl.pdfCook.name}</a></div>)}
              {dl.htmlCook && (<div>HTML：<a className="text-sky-700 underline" href={dl.htmlCook.url} download>{dl.htmlCook.name}</a></div>)}
            </div>
          </div>
        ) : (
          <div id="list-root" style={cardMainStyle}>
            <h2 className="text-2xl font-bold mb-4">GhibliKitchen – 购物清单 – 周次 44</h2>
            <p className="text-slate-700 mb-4">自动汇总 21 道菜的周用量。单位：g/ml/EL/TL/Stück；l 统一为 ml。</p>

            {Object.entries(LIST_SUMMARY).map(([grp, items]) => (
              <div key={grp} className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{grp}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {items.map((it, i) => (
                    <div key={i} className="flex items-center justify-between border rounded-md p-2">
                      <span className="text-slate-800">{it.name}</span>
                      <span className="font-mono">{Math.round(it.qty * 100) / 100} {it.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-4 text-sm">
              {dl.pdfList && (<div className="mb-1">PDF：<a className="text-sky-700 underline" href={dl.pdfList.url} download>{dl.pdfList.name}</a></div>)}
              {dl.htmlList && (<div>HTML：<a className="text-sky-700 underline" href={dl.htmlList.url} download>{dl.htmlList.name}</a></div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Tests() {
  try {
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("午餐不能有提醒");
      if (!isLunch && !r.remind) throw new Error("早餐/晚餐必须有提醒");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`食材过少: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`步骤过少: ${r.id}`);
    });
    const asJson = JSON.stringify(DATA);
    if (asJson.includes('"de":') || asJson.includes('"zh":') || asJson.includes('{"de"') || asJson.includes('{"zh"')) {
      throw new Error("DATA 必须为单语（禁止 { de, zh } 对象）");
    }
    const groups = Object.keys(LIST_SUMMARY);
    if (groups.length !== 4) throw new Error("LIST_SUMMARY 需要 4 个分组");
    console.log("[GhibliKitchen] All tests passed (ZH JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}
