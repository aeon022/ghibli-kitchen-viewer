// src/plans/2026/Woche-5-2026-01-26.zh.jsx
import { SharedMealCard } from "@/components/MealCard";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – 第5周 (Start: 2026-01-26)
  Design: 与第4周相同 (修复了Header渐变)。
  Content: 中文 (Chinese), 亚洲家常菜 (CN/JP/KR), 孕期安全 (全熟/清淡).
*/

// ---- Meta ----
export const meta = {
  title: "第5周",
  startDate: "2026-01-26",
  id: "woche-5-2026-01-26", // ID 保持不变以便同步
  lang: "zh",
  sidebar: "第5周 (2026-01-26)",
};

const FILE_BASE = "第5周 2026-01-26";

// ---- UI Labels ----
const UI_TITLES = {
  main: "第5周食谱",
  list: "第5周购物清单",
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
  <span className="mkt-chip" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "var(--chip-bg)", border: "1px solid var(--border)", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    {text}
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_ZH = {
  mo: "星期一 (2026-01-26)",
  di: "星期二 (2026-01-27)",
  mi: "星期三 (2026-01-28)",
  do: "星期四 (2026-01-29)",
  fr: "星期五 (2026-01-30)",
  sa: "星期六 (2026-01-31)",
  so: "星期日 (2026-02-01)",
};

// -----------------------------------------------------------------------
// DATA (Translated)
// -----------------------------------------------------------------------
export const DATA = [
  // MONDAY
  {
    id: "mo-f",
    title: "台湾蛋饼 (Dan Bing)",
    desc: "软糯的饼皮卷着鸡蛋和葱花，经典的台式早餐。",
    story: "台湾街头巷尾最常见的早餐。传说中，不喜欢吃蛋饼的人，只是还没吃到好吃的蛋饼。简单又幸福。",
    target: "≈65g 碳水 (2人份) · 蛋白质 ≈20g/人",
    ingredients: [
      "面粉 100 g",
      "玉米淀粉 20 g",
      "水 200 ml",
      "鸡蛋 4 个",
      "葱花 30 g",
      "酱油 10 ml"
    ],
    steps: [
      "面粉、淀粉和水混合成稀面糊。",
      "平底锅倒面糊煎至凝固，淋上蛋液。",
      "翻面煎熟，卷起来，切块，淋酱油或甜辣酱食用。"
    ],
    checks: "营养均衡 ✓ · 孕期安全 ✓ (蛋需全熟)",
    swaps: "面粉 ↔ 全麦粉; 馅料 ↔ +芝士",
    side: "豆浆 (温/冷)",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "豆皮乌冬面 (Kitsune Udon)",
    desc: "粗乌冬面配清淡高汤和甜味油豆腐 (Inari-Age)。",
    story: "日本传说狐狸 (Kitsune) 最爱吃油豆腐。你可以用市售的寿司豆腐皮，或者自己卤油豆腐。暖心暖胃。",
    target: "≈88g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "乌冬面 (熟) 400 g",
      "味付油扬 (寿司豆皮) 6 片",
      "菠菜 100 g",
      "高汤/Dashi 700 ml",
      "酱油 15 ml",
      "葱花 10 g"
    ],
    steps: [
      "高汤加酱油煮开，放入乌冬面热透。",
      "铺上豆皮 (或者煎过的豆腐用糖/酱油卤一下)。",
      "加入菠菜烫熟。趁热享用。"
    ],
    checks: "营养均衡 ✓ · 控糖 ✓ (菠菜纤维)",
    swaps: "豆皮 ↔ 煎熏豆腐; 乌冬 ↔ 荞麦面",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "日式杂菌饭 (Kinoko Gohan)",
    desc: "香气扑鼻的米饭，与多种菌菇和酱油一起焖煮。",
    story: "森林的呼唤！'Kinoko' 意为蘑菇。当电饭煲打开那一刻，满屋都是秋天的鲜美气息。",
    target: "≈82g 碳水 · 蛋白质 ≈18g/人 (含配菜)",
    ingredients: [
      "大米 (生) 120 g",
      "香菇 & 蘑菇 150 g",
      "胡萝卜 50 g",
      "油豆腐 (Aburaage) 1 片",
      "高汤/Dashi 240 ml",
      "酱油 15 ml"
    ],
    steps: [
      "洗米。蘑菇和油豆腐切丝。",
      "米、高汤和酱油入锅。不要搅拌，食材铺在上面！",
      "煮饭。煮好后轻轻拌匀。"
    ],
    checks: "营养均衡 ✓ · 控糖 ✓ (大量菌菇)",
    swaps: "油豆腐 ↔ 鸡腿肉丁",
    side: "毛豆或味噌汤",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "高汤至刻度线", notes: "蘑菇会出水，水不要太多。" },
  },

  // TUESDAY
  {
    id: "di-f",
    title: "鸡蛋拌饭 (安全版)",
    desc: "日式经典 'Tamago Kake Gohan'，但用嫩炒蛋代替生蛋。",
    story: "通常是将生鸡蛋打在热饭上。为了安全，我们做成非常嫩的滑蛋 (全熟)，口感依然顺滑！",
    target: "≈70g 碳水 · 蛋白质 ≈20g/人",
    ingredients: [
      "大米 (生) 100 g",
      "鸡蛋 4 个",
      "酱油 10 ml",
      "拌饭素 (Furikake) 5 g",
      "芝麻油 5 ml"
    ],
    steps: [
      "煮饭。鸡蛋加酱油打散。",
      "平底锅炒成嫩滑的炒蛋 (确保凝固)。",
      "盖在饭上，撒上拌饭素。"
    ],
    checks: "营养均衡 ✓ · 孕期安全 ✓ 蛋需凝固 (无流心)",
    swaps: "拌饭素 ↔ 海苔碎",
    side: "味噌汤",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "鸡肉炒面 (Chow Mein)",
    desc: "香脆的炒面，配大量蔬菜和鸡肉丝。",
    story: "外卖经典，但更健康。'Chow' 是炒，'Mein' 是面。秘诀是先把面条煎香。",
    target: "≈86g 碳水 · 蛋白质 ≈30g/人",
    ingredients: [
      "炒面 (或油面) 150 g",
      "鸡胸肉 200 g",
      "卷心菜/白菜 150 g",
      "胡萝卜 80 g",
      "蚝油 15 ml",
      "酱油 10 ml"
    ],
    steps: [
      "煮面，过冷水。锅中少油将面条煎香盛出。",
      "炒熟鸡肉和蔬菜，加酱料。",
      "面条回锅，翻炒均匀。"
    ],
    checks: "营养均衡 ✓ · 鸡肉全熟 ✓",
    swaps: "鸡肉 ↔ 豆腐; 蚝油 ↔ 蘑菇蚝油 (素)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "味噌黄油三文鱼饭 (电饭煲)",
    desc: "三文鱼在米饭上蒸熟，味噌调味，最后加一块黄油。",
    story: "北海道风味！日本北部喜爱味噌加黄油的组合 (像拉面一样)。米饭吸收了黄油香... 绝了。",
    target: "≈80g 碳水 · 蛋白质 ≈28g/人",
    ingredients: [
      "大米 (生) 120 g",
      "三文鱼柳 220 g",
      "味噌酱 15 g",
      "黄油 15 g",
      "玉米粒 (冷冻) 50 g",
      "葱花 10 g"
    ],
    steps: [
      "米和水入锅。味噌溶于水。",
      "三文鱼和玉米铺在上面。",
      "煮饭。出锅后趁热放黄油融化。",
      "弄碎三文鱼拌匀。"
    ],
    checks: "营养均衡 ✓ · 孕期安全 ✓ 蒸汽蒸熟三文鱼",
    swaps: "三文鱼 ↔ 鳕鱼",
    side: "黄瓜沙拉",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "标准水量", notes: "黄油最后放！" },
  },

  // WEDNESDAY
  {
    id: "mi-f",
    title: "咸味韩式糖饼 (Hotteok)",
    desc: "韩式馅饼，这次做成芝士蔬菜咸口的早餐。",
    story: "本来是街头甜点 (肉桂糖馅)。但塞满芝士和蔬菜后，就是完美早餐。",
    target: "≈75g 碳水 · 蛋白质 ≈18g/人",
    ingredients: [
      "面粉 150 g",
      "酵母 3 g",
      "水 (温) 100 ml",
      "马苏里拉芝士 (碎) 50 g",
      "胡萝卜 & 韭葱 (切碎) 50 g",
      "盐"
    ],
    steps: [
      "揉面团，发酵30分钟。",
      "包入芝士和蔬菜，捏紧收口。",
      "平底锅压扁，煎至金黄。"
    ],
    checks: "营养均衡 ✓ · 芝士熟透 ✓",
    swaps: "芝士 ↔ 豆腐碎",
    side: "牛奶或茶",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "天津饭 (Tenshindon)",
    desc: "日式中华料理：蟹肉蛋盖饭，淋上酸甜芡汁。",
    story: "虽叫天津饭，其实是日本发明的。松软的蛋包饭遇上浓稠的酱汁，治愈系美食。",
    target: "≈85g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 120 g",
      "鸡蛋 4 个",
      "蟹肉棒/熟蟹肉 80 g",
      "青豆 30 g",
      "醋, 糖, 酱油, 淀粉 (做酱汁)"
    ],
    steps: [
      "煮饭。混合醋、糖、酱油、高汤煮开勾芡。",
      "鸡蛋加蟹肉/青豆炒成蛋饼。",
      "盖在饭上，淋上酱汁。"
    ],
    checks: "营养均衡 ✓ · 蛋全熟 ✓",
    swaps: "蟹肉 ↔ 虾仁; 青豆 ↔ 葱",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "海南鸡饭 (懒人电饭煲版)",
    desc: "著名的新加坡鸡饭，完全用电饭煲搞定。",
    story: "新加坡国菜。鸡油让米饭充满香气。记得配姜蓉蘸料。",
    target: "≈82g 碳水 · 蛋白质 ≈30g/人",
    ingredients: [
      "大米 (生) 120 g",
      "鸡腿肉 (去骨) 250 g",
      "姜 (片 & 蓉) 15 g",
      "大蒜 2 瓣",
      "鸡汤 200 ml",
      "黄瓜 100 g"
    ],
    steps: [
      "米、鸡汤、姜片、蒜入锅。",
      "鸡肉 (带皮面朝下) 铺在米上。",
      "煮饭。取出鸡肉切块，米饭拌匀。",
      "配黄瓜片食用。"
    ],
    checks: "营养均衡 ✓ · 鸡肉需 >75°C ✓",
    swaps: "鸡腿 ↔ 鸡胸 (会略柴)",
    side: "辣椒酱 (可选)",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "用鸡汤代替水", notes: "鸡肉在米饭蒸汽中蒸熟，非常嫩。" },
  },

  // THURSDAY
  {
    id: "do-f",
    title: "咸豆浆配吐司 (伪油条)",
    desc: "热豆浆加醋凝结成咸豆花汤，配烤吐司条。",
    story: "经典中式早餐：豆浆遇醋产生像豆腐脑一样的絮状，非常鲜美。这里用吐司代替油炸油条。",
    target: "≈65g 碳水 · 蛋白质 ≈18g/人",
    ingredients: [
      "豆浆 (无糖!) 500 ml",
      "米醋 10 ml",
      "酱油 10 ml",
      "芝麻油, 辣油 (可选)",
      "虾皮 (可选) 或 海苔",
      "吐司 2 片"
    ],
    steps: [
      "豆浆煮开。",
      "碗里放醋/酱油。冲入热豆浆 (会起絮，正常的！)。",
      "吐司烤脆切条，蘸着吃。"
    ],
    checks: "营养均衡 ✓ · 虾皮熟制 ✓",
    swaps: "吐司 ↔ 馒头",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "咖喱乌冬面 (温和版)",
    desc: "粗乌冬面配温和浓郁的咖喱汤汁。小心溅到衣服！",
    story: "日式灵魂美食。如果有剩下的咖喱，第二天加高汤就是咖喱乌冬。这里我们现做。",
    target: "≈88g 碳水 · 蛋白质 ≈20g/人",
    ingredients: [
      "乌冬面 (熟) 400 g",
      "咖喱块 (温和) 2 块",
      "洋葱 80 g",
      "猪肉薄片或豆腐 150 g",
      "高汤/Dashi 600 ml",
      "葱花"
    ],
    steps: [
      "炒香洋葱和肉片。",
      "加高汤煮开，关火溶化咖喱块。",
      "放入乌冬面，煮3分钟至汤汁变浓。"
    ],
    checks: "营养均衡 ✓ · 肉片全熟 ✓",
    swaps: "猪肉 ↔ 牛肉/鸡肉",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "叉烧鸡腿饭 (电饭煲版)",
    desc: "甜咸适口的叉烧味鸡腿，在电饭煲里焖熟。",
    story: "叉烧通常是烤猪肉。我们用电饭煲做叉烧鸡——粘糯、甜蜜、绝佳。",
    target: "≈84g 碳水 · 蛋白质 ≈28g/人",
    ingredients: [
      "大米 (生) 120 g",
      "鸡腿肉 (去骨) 250 g",
      "叉烧酱 (或 海鲜酱+蜂蜜+酱油) 3 大勺",
      "上海青 100 g",
      "水"
    ],
    steps: [
      "鸡肉腌制 (至少15分钟)。",
      "米和水入锅。鸡肉连腌料铺上面。",
      "煮饭。最后5分钟放入青菜焖熟。",
      "鸡肉切块，汤汁淋饭。"
    ],
    checks: "营养均衡 ✓ · 鸡肉全熟 ✓",
    swaps: "叉烧酱 ↔ 照烧酱",
    side: "清汤",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "标准", notes: "酱料含糖，锅底可能会有焦糖色。" },
  },

  // FRIDAY
  {
    id: "fr-f",
    title: "鳕鱼子茶泡饭 (熟)",
    desc: "热茶浇在米饭上，配煎熟的咸鳕鱼子 (Tarako)。",
    story: "茶泡饭是日本的'急救'宵夜或宿醉早餐。茶香配咸鲜，意外地搭。",
    target: "≈70g 碳水 · 蛋白质 ≈22g/人",
    ingredients: [
      "米饭 (熟) 200 g",
      "鳕鱼子 (Tarako) 或 三文鱼 80 g",
      "绿茶 (热) 400 ml",
      "海苔, 芝麻, 芥末 (少许)"
    ],
    steps: [
      "鳕鱼子/鱼在锅里煎至全熟。",
      "米饭盛碗，放上鱼。",
      "浇入热茶，撒上配料。"
    ],
    checks: "营养均衡 ✓ · 孕期安全 ✓ 鱼子必须全熟 (不可生食)",
    swaps: "鱼子 ↔ 熟三文鱼碎",
    side: "渍物",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "电饭煲拌饭 (Bibimbap)",
    desc: "所有拌饭食材和米饭一起煮熟。懒人作弊法。",
    story: "正宗拌饭很麻烦。这里我们把肉菜饭一锅出，虽然不正宗，但很好吃。",
    target: "≈86g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 120 g",
      "牛肉末 150 g",
      "胡萝卜丝 80 g",
      "豆芽 100 g",
      "菠菜 100 g",
      "韩式辣酱 (拌饭用)"
    ],
    steps: [
      "米、生肉末(弄散)、胡萝卜、豆芽入锅加水。",
      "煮饭。",
      "煮好后立刻拌入菠菜 (余温烫熟)。",
      "加芝麻油和辣酱拌匀。"
    ],
    checks: "营养均衡 ✓ · 肉末全熟 ✓",
    swaps: "牛肉 ↔ 豆腐",
    side: "煎蛋 (全熟)",
    remind: false,
    riceCooker: { enabled: true, program: "Mixed Rice", water: "标准", notes: "肉末要拨散。" },
  },
  {
    id: "fr-a",
    title: "寿喜烧 (Sukiyaki - 温和版)",
    desc: "牛肉、豆腐和蔬菜在甜咸酱油汤底中炖煮。",
    story: "周五晚的大餐。通常蘸生鸡蛋吃——孕期请跳过这一步！",
    target: "≈65g 碳水 · 蛋白质 ≈30g/人",
    ingredients: [
      "牛肉片 (火锅用) 250 g",
      "豆腐 (烧豆腐或老豆腐) 200 g",
      "大白菜 200 g",
      "魔芋丝或粉丝 100 g",
      "寿喜烧汁 (酱油, 糖, 味淋)",
      "米饭"
    ],
    steps: [
      "锅中热酱汁。",
      "涮煮牛肉，加入蔬菜和豆腐。",
      "煮至软烂入味。"
    ],
    checks: "营养均衡 ✓ · 孕期安全 ✓ 肉熟透，不蘸生蛋",
    swaps: "牛肉 ↔ 猪肉",
    side: "米饭",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SATURDAY
  {
    id: "sa-f",
    title: "韩国街头吐司 (Gilgeori Toast)",
    desc: "夹着卷心菜鸡蛋饼的三明治，撒了糖。",
    story: "韩国地铁站的香气。厚厚的蔬菜蛋饼夹在黄油吐司里，番茄酱加砂糖是灵魂。",
    target: "≈75g 碳水 · 蛋白质 ≈18g/人",
    ingredients: [
      "吐司 4 片",
      "鸡蛋 3 个",
      "卷心菜 (切细丝) 100 g",
      "胡萝卜 (擦丝) 30 g",
      "黄油, 番茄酱, 糖 (少许)"
    ],
    steps: [
      "蛋液加蔬菜拌匀，煎成方形厚蛋饼 (全熟)。",
      "黄油煎吐司。",
      "组装：吐司+蛋饼+番茄酱+糖+吐司。"
    ],
    checks: "营养均衡 ✓ · 蛋全熟 ✓",
    swaps: "卷心菜 ↔ 洋葱",
    side: "咖啡或牛奶",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "干烧虾仁 (Ebi Chili)",
    desc: "日式中华料理：虾仁裹上温和酸甜的番茄酱汁。",
    story: "陈建民 (料理铁人陈建一的父亲) 在日本推广的名菜。比原版少辣，更重番茄味。",
    target: "≈84g 碳水 · 蛋白质 ≈26g/人",
    ingredients: [
      "虾仁 (去壳) 250 g",
      "番茄酱 3 大勺",
      "鸡汤 100 ml",
      "洋葱 50 g",
      "姜/蒜",
      "淀粉, 米饭 120 g"
    ],
    steps: [
      "虾仁裹淀粉煎熟。",
      "炒香洋葱姜蒜，加番茄酱和鸡汤。",
      "煮浓稠，虾仁回锅裹匀酱汁。"
    ],
    checks: "营养均衡 ✓ · 虾仁全熟 ✓",
    swaps: "虾仁 ↔ 炸豆腐",
    side: "米饭",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "海鲜烩饭 (Seafood Pilaf - 电饭煲)",
    desc: "多彩的海鲜杂烩饭，黄油增香，米粒松软。",
    story: "虽然是西餐风格 (洋食)，但在日本是电饭煲的常客。像极了简易版西班牙海鲜饭。",
    target: "≈82g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 120 g",
      "海鲜杂拌 (冷冻: 虾/鱿鱼/贝) 200 g",
      "洋葱 50 g",
      "彩椒 50 g",
      "蔬菜高汤 240 ml",
      "黄油 10 g"
    ],
    steps: [
      "米和高汤入锅。",
      "解冻的海鲜和蔬菜丁铺上面。",
      "煮饭。出锅拌入黄油。"
    ],
    checks: "营养均衡 ✓ · 孕期安全 ✓ 海鲜需 >75°C (电饭煲可达到)",
    swaps: "海鲜 ↔ 只有虾仁 或 鸡肉",
    side: "小沙拉",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "高汤标准量", notes: "冷冻海鲜先解冻沥水。" },
  },

  // SUNDAY
  {
    id: "so-f",
    title: "港式西多士 (少油版)",
    desc: "花生酱夹心吐司，裹蛋液煎至金黄。",
    story: "茶餐厅经典。通常是油炸的，我们用平底锅煎，稍微健康一点点。周末偶尔放纵。",
    target: "≈78g 碳水 · 蛋白质 ≈16g/人",
    ingredients: [
      "吐司 4 片",
      "花生酱 2 大勺",
      "鸡蛋 2 个",
      "牛奶 20 ml",
      "枫糖浆或炼乳"
    ],
    steps: [
      "两片吐司中间抹花生酱，做成三明治。",
      "裹满蛋奶液。",
      "平底锅煎至两面金黄 (蛋液熟透)。"
    ],
    checks: "营养均衡 ✓ · 蛋液熟透 ✓",
    swaps: "花生酱 ↔ 果酱 (蛋白更少)",
    side: "奶茶",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "烤箱版炸猪排 (Tonkatsu)",
    desc: "免油炸：面包糠先炒香，再裹肉进烤箱。",
    story: "大家都爱炸猪排！为了少油，我们先炒面包糠，再烤肉。酥脆度满分！",
    target: "≈80g 碳水 · 蛋白质 ≈30g/人",
    ingredients: [
      "猪里脊排 2 片",
      "面包糠 (Panko) 50 g",
      "面粉, 鸡蛋 (过三关用)",
      "卷心菜 (切细丝) 200 g",
      "米饭 120 g",
      "猪排酱"
    ],
    steps: [
      "面包糠在锅里干炒至金黄。",
      "猪排裹面粉、蛋液、炒过的面包糠。",
      "200°C 烤箱烤 15-20 分钟。",
      "配卷心菜山和米饭。"
    ],
    checks: "营养均衡 ✓ · 猪肉全熟 ✓",
    swaps: "猪肉 ↔ 鸡胸肉",
    side: "米饭 & 卷心菜",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "虾仁蒸蛋 (电饭煲)",
    desc: "像布丁一样滑嫩的蒸蛋，上面放虾仁。",
    story: "可以利用煮饭时的蒸汽制作！'层叠烹饪' 省时省力。",
    target: "≈82g 碳水 · 蛋白质 ≈24g/人",
    ingredients: [
      "大米 (生) 120 g",
      "鸡蛋 3 个",
      "水/Dashi 250 ml",
      "虾仁 6 只",
      "酱油",
      "葱花"
    ],
    steps: [
      "下层煮饭。",
      "蛋液加高汤打匀过筛，放入耐热碗，加虾仁。",
      "碗放入蒸格。饭煮开后放入蒸格 (蒸15-20分钟)。",
      "蛋需凝固。"
    ],
    checks: "营养均衡 ✓ · 蛋液凝固 ✓",
    swaps: "虾仁 ↔ 蟹柳或香菇",
    side: "米饭 (下层)",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice + Steam", water: "标准", notes: "使用蒸格！" },
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
  "猪里脊排": { group: "Protein/Fisch/Tofu", label: "猪里脊排", unitDefault: "片" },
  "白身鱼": { group: "Protein/Fisch/Tofu", label: "白身鱼 (鱼柳)", unitDefault: "g" },
  "三文鱼柳": { group: "Protein/Fisch/Tofu", label: "三文鱼", unitDefault: "g" },
  "鳕鱼柳": { group: "Protein/Fisch/Tofu", label: "鳕鱼", unitDefault: "g" },
  "虾仁": { group: "Protein/Fisch/Tofu", label: "虾仁", unitDefault: "g" },
  "海鲜杂拌": { group: "Protein/Fisch/Tofu", label: "海鲜杂拌 (冷冻)", unitDefault: "g" },
  "扇贝柱": { group: "Protein/Fisch/Tofu", label: "扇贝/带子", unitDefault: "g" },
  "贻贝": { group: "Protein/Fisch/Tofu", label: "贻贝/青口", unitDefault: "g" },
  "青口贝": { group: "Protein/Fisch/Tofu", label: "贻贝/青口", unitDefault: "g" },
  "金枪鱼": { group: "Protein/Fisch/Tofu", label: "金枪鱼 (罐头)", unitDefault: "g" },
  "吞拿鱼": { group: "Protein/Fisch/Tofu", label: "吞拿鱼 (罐头)", unitDefault: "g" },
  "蟹肉棒": { group: "Protein/Fisch/Tofu", label: "蟹肉棒", unitDefault: "g" },
  "鳕鱼子": { group: "Protein/Fisch/Tofu", label: "鳕鱼子/明太子", unitDefault: "g" },
  "豆腐": { group: "Protein/Fisch/Tofu", label: "豆腐", unitDefault: "g" },
  "老豆腐": { group: "Protein/Fisch/Tofu", label: "老豆腐", unitDefault: "g" },
  "嫩豆腐": { group: "Protein/Fisch/Tofu", label: "嫩豆腐", unitDefault: "g" },
  "油豆腐": { group: "Protein/Fisch/Tofu", label: "油豆腐 (Aburaage)", unitDefault: "片" },
  "味付油扬": { group: "Protein/Fisch/Tofu", label: "调味豆皮 (Inari)", unitDefault: "片" },
  "鸡蛋": { group: "Protein/Fisch/Tofu", label: "鸡蛋", unitDefault: "个" },
  "熟火腿": { group: "Protein/Fisch/Tofu", label: "熟火腿", unitDefault: "g" },
  "马苏里拉芝士": { group: "Protein/Fisch/Tofu", label: "马苏里拉芝士", unitDefault: "g" },

  // Vegetables
  "大白菜": { group: "Gemüse/Pilze", label: "大白菜", unitDefault: "g" },
  "卷心菜": { group: "Gemüse/Pilze", label: "卷心菜", unitDefault: "g" },
  "上海青": { group: "Gemüse/Pilze", label: "上海青/油菜", unitDefault: "g" },
  "菠菜": { group: "Gemüse/Pilze", label: "菠菜", unitDefault: "g" },
  "胡萝卜": { group: "Gemüse/Pilze", label: "胡萝卜", unitDefault: "g" },
  "黄瓜": { group: "Gemüse/Pilze", label: "黄瓜", unitDefault: "g" },
  "西葫芦": { group: "Gemüse/Pilze", label: "西葫芦", unitDefault: "g" },
  "南瓜": { group: "Gemüse/Pilze", label: "南瓜 (贝贝/板栗)", unitDefault: "g" },
  "红薯": { group: "Gemüse/Pilze", label: "红薯", unitDefault: "g" },
  "豆芽": { group: "Gemüse/Pilze", label: "豆芽", unitDefault: "g" },
  "Sojasprossen": { group: "Gemüse/Pilze", label: "豆芽", unitDefault: "g" },
  "毛豆仁": { group: "Gemüse/Pilze", label: "毛豆 (冷冻)", unitDefault: "g" },
  "白蘑菇": { group: "Gemüse/Pilze", label: "白蘑菇", unitDefault: "g" },
  "香菇": { group: "Gemüse/Pilze", label: "香菇", unitDefault: "g" },
  "蘑菇": { group: "Gemüse/Pilze", label: "蘑菇", unitDefault: "g" },
  "口蘑": { group: "Gemüse/Pilze", label: "口蘑", unitDefault: "g" },
  "葱": { group: "Gemüse/Pilze", label: "葱", unitDefault: "g" },
  "葱花": { group: "Gemüse/Pilze", label: "葱", unitDefault: "g" },
  "韭葱": { group: "Gemüse/Pilze", label: "韭葱", unitDefault: "g" },
  "洋葱": { group: "Gemüse/Pilze", label: "洋葱", unitDefault: "g" },
  "大蒜": { group: "Gemüse/Pilze", label: "大蒜", unitDefault: "瓣" },
  "姜": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "姜末": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "姜丝": { group: "Gemüse/Pilze", label: "姜", unitDefault: "g" },
  "番茄": { group: "Gemüse/Pilze", label: "番茄", unitDefault: "个" },
  "玉米粒": { group: "Gemüse/Pilze", label: "玉米/青豆 (冷冻)", unitDefault: "g" },
  "玉米": { group: "Gemüse/Pilze", label: "玉米/青豆 (冷冻)", unitDefault: "g" },
  "青豆": { group: "Gemüse/Pilze", label: "青豆", unitDefault: "g" },
  "梨": { group: "Gemüse/Pilze", label: "梨", unitDefault: "g" },
  "红豆": { group: "Gemüse/Pilze", label: "红豆 (熟)", unitDefault: "g" },
  "彩椒": { group: "Gemüse/Pilze", label: "彩椒", unitDefault: "g" },

  // Carbs
  "大米": { group: "Reis/Nudeln/Sättigung", label: "大米 (生)", unitDefault: "g" },
  "荞麦面": { group: "Reis/Nudeln/Sättigung", label: "荞麦面", unitDefault: "g" },
  "红薯粉丝": { group: "Reis/Nudeln/Sättigung", label: "红薯粉丝", unitDefault: "g" },
  "乌冬面": { group: "Reis/Nudeln/Sättigung", label: "乌冬面", unitDefault: "g" },
  "小麦面": { group: "Reis/Nudeln/Sättigung", label: "小麦面/拉面", unitDefault: "g" },
  "炒面": { group: "Reis/Nudeln/Sättigung", label: "炒面/油面", unitDefault: "g" },
  "小米": { group: "Reis/Nudeln/Sättigung", label: "小米", unitDefault: "g" },
  "面粉": { group: "Reis/Nudeln/Sättigung", label: "面粉", unitDefault: "g" },
  "粘米粉": { group: "Reis/Nudeln/Sättigung", label: "粘米粉", unitDefault: "g" },
  "吐司": { group: "Reis/Nudeln/Sättigung", label: "吐司", unitDefault: "片" },
  "面包糠": { group: "Reis/Nudeln/Sättigung", label: "面包糠 (Panko)", unitDefault: "g" },
  "河粉": { group: "Reis/Nudeln/Sättigung", label: "河粉", unitDefault: "g" },
  "燕麦片": { group: "Reis/Nudeln/Sättigung", label: "燕麦片", unitDefault: "g" },
  "全麦烩饭米": { group: "Reis/Nudeln/Sättigung", label: "糙米/烩饭米", unitDefault: "g" },

  // Pantry
  "低钠酱油": { group: "Algen/Brühen/Würze", label: "低钠酱油", unitDefault: "ml" },
  "酱油": { group: "Algen/Brühen/Würze", label: "酱油", unitDefault: "ml" },
  "蚝油": { group: "Algen/Brühen/Würze", label: "蚝油", unitDefault: "ml" },
  "芝麻油": { group: "Algen/Brühen/Würze", label: "芝麻油", unitDefault: "ml" },
  "米醋": { group: "Algen/Brühen/Würze", label: "米醋", unitDefault: "ml" },
  "醋": { group: "Algen/Brühen/Würze", label: "醋", unitDefault: "ml" },
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
  "叉烧酱": { group: "Algen/Brühen/Würze", label: "叉烧酱/海鲜酱", unitDefault: "大勺" },
  "番茄酱": { group: "Algen/Brühen/Würze", label: "番茄酱", unitDefault: "大勺" },
  "花生酱": { group: "Algen/Brühen/Würze", label: "花生酱", unitDefault: "大勺" },
  "酵母": { group: "Algen/Brühen/Würze", label: "酵母", unitDefault: "g" },
  "拌饭素": { group: "Algen/Brühen/Würze", label: "拌饭素", unitDefault: "g" },
  "寿喜烧汁": { group: "Algen/Brühen/Würze", label: "寿喜烧汁", unitDefault: "适量" },
  "猪排酱": { group: "Algen/Brühen/Würze", label: "猪排酱", unitDefault: "适量" },
  "咖喱块": { group: "Algen/Brühen/Würze", label: "咖喱块", unitDefault: "块" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Zehe|Prise|Stangen|Scheiben|TL|EL|Stk|片|个|大勺|只|块)?/);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.includes(k));
      if (!key) {
        if (name.includes("大米")) key = "大米";
        else if (name.includes("Udon")) key = "乌冬面";
        else if (name.includes("蘑菇") || name.includes("菇")) key = "蘑菇";
        else if (name.includes("卷心菜")) key = "卷心菜";
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw5" }) {
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
    <div className="mkt-art" style={{ position: "relative", borderRadius: 14, overflow: "hidden", marginBottom: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
      <img src={src} alt={meal.title} style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/9", objectFit: "cover" }} loading="lazy" />
    </div>
  );
}

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

function DaySection({ dayKey, meals, dayName }) {
  return (
    <section className="day-section" style={{ marginBottom: 40 }} id={`day-${dayKey}`}>
      <h2 style={{ marginBottom: 16, borderBottom:"2px solid var(--border)", paddingBottom:8 }}>
        {dayName.replace(/\s*\(.+\)$/, "")} <span className="mkt-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
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
        <div className="mkt-hero-inner" style={{ padding: 18, borderRadius: 12, marginBottom: 16, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            第5周 – 总览 <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>JP/CN/KR · 营养均衡 (温和) · 孕期安全 · 每日 1x 电饭煲料理</p>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>本周热门: 杂菌饭, 味噌黄油三文鱼, 海南鸡饭, 叉烧鸡饭, 拌饭, 海鲜饭, 蒸蛋。</p>
    </section>
  );
}

// PDF Export (nur noch Drucken Funktion)
const doPrint = () => window.print();

// Theme Switch Component
function ThemeSwitch({ mode, setMode, effectiveDark }) {
  return (
    <div className="mkt-theme-switch" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: 6, border: "1px solid var(--btn-border)", borderRadius: 999, background: "var(--panel)" }}>
      <button type="button" className="mkt-tab" aria-pressed={mode === "auto"} onClick={() => setMode(mode === "auto" ? (effectiveDark ? "dark" : "light") : "auto")} style={{ padding: "6px 10px" }}>Auto</button>
      <label className="mkt-switch" title={effectiveDark ? "暗色" : "亮色"}>
        <input type="checkbox" checked={effectiveDark} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} disabled={mode === "auto"} />
        <span className="mkt-slider" />
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------
// MAIN EXPORT
// -----------------------------------------------------------------------
export default function Woche5ZH() {
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
        
        .mkt-tab { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 16px; border-radius: 12px; border: 1px solid var(--btn-border); background: var(--panel); color: var(--text); cursor: pointer; font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: all 0.2s ease; }
        .mkt-tab:hover { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-color: var(--accent-2); }
        .mkt-switch{ --w:48px; --h:28px; --k:22px; position:relative; display:inline-block; width:var(--w); height:var(--h); }
        .mkt-switch input{ opacity:0; width:0; height:0; position:absolute; }
        .mkt-switch .mkt-slider{ position:absolute; inset:0; border-radius:var(--h); background:var(--btn-border); border:1px solid var(--btn-border); transition:0.2s; }
        .mkt-switch .mkt-slider::before{ content:""; position:absolute; height:var(--k); width:var(--k); left:3px; top:50%; transform:translateY(-50%); border-radius:999px; background:var(--panel); box-shadow:var(--shadow); transition:transform .2s; }
        .mkt-switch input:checked + .mkt-slider{ background:var(--accent-2); border-color:var(--accent-2); }
        .mkt-switch input:checked + .mkt-slider::before{ transform:translateY(-50%) translateX(calc(var(--w) - var(--k) - 6px)); }

        .mkt-segment{ display:inline-flex; gap:4px; border:1px solid var(--btn-border); border-radius:999px; padding:4px; background:var(--panel); }
        .mkt-segment label{ position:relative; display:inline-flex; align-items:center; border-radius:999px; overflow:hidden; cursor:pointer; }
        .mkt-segment input[type="radio"]{ position:absolute; inset:0; opacity:0; cursor:pointer; }
        .mkt-segment span{ display:inline-block; padding:8px 14px; border-radius:999px; border:1px solid transparent; }
        .mkt-segment input[type="radio"]:checked + span{ background:var(--btn-on-bg); outline:2px solid var(--accent-2); outline-offset:1px; }

        #mkt-content{ display:block !important; }
        #mkt-content > [hidden]{ display:none !important; }

        @media print { .mkt-art, .mkt-date-paren{ display:none !important; visibility:hidden !important; } html, body, #root { background:#fff !important; } aside, nav, header, footer, .mkt-no-print { display:none !important; } #kochbuch-root { width: calc(210mm - 24mm); margin:0 auto !important; background:#fff !important; border:none !important; box-shadow:none !important; } .mkt-hero, .mkt-hero-inner { background:#fff !important; box-shadow:none !important; } .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; } h2, h3 { break-after:avoid; page-break-after:avoid; } #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } a[href]:after { content:""; } }
      `}</style>

      <div className="mkt-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div className="mkt-hero-inner" style={{ background: "var(--grad-hero)", borderRadius: 12, padding: 14, marginBottom: 12, display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`开始：${meta.startDate}`)}
            {tagChip("第5周")}
            {tagChip("亚洲风味 (中/日/韩)")}
            {tagChip("每日 1× 🍚 电饭煲料理")}
          </div>
        </div>

        <div className="mkt-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <fieldset className="mkt-segment" role="radiogroup" aria-label="选择视图">
            <label>
              <input type="radio" name="mkt-view" value="kochbuch" checked={tab === "kochbuch"} onChange={() => setTab("kochbuch")} />
              <span>{UI_TITLES.main}</span>
            </label>
            <label>
              <input type="radio" name="mkt-view" value="liste" checked={tab === "liste"} onChange={() => setTab("liste")} />
              <span>{UI_TITLES.list}</span>
            </label>
          </fieldset>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginLeft: "auto" }}>
            <button type="button" onClick={doPrint} className="mkt-tab"><span className="icon">🖨️</span> 打印</button>
            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={DATA} DAY_NAME_ZH={DAY_NAME_ZH} meta={meta} />
        <div id="mkt-content" data-view={tab}>
          <section id="mkt-pane-kochbuch" aria-hidden={tab !== "kochbuch"} hidden={tab !== "kochbuch"}>
            {DAYS_ORDER.map((d) => (
              <DaySection key={d} dayKey={d} meals={DATA.filter(r => r.id.startsWith(d))} dayName={DAY_NAME_ZH[d]} />
            ))}
            <RiceCookerSection data={DATA} />
          </section>
          <section id="mkt-pane-liste" aria-hidden={tab !== "liste"} hidden={tab !== "liste"}>
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