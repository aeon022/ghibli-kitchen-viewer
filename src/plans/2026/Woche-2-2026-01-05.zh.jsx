// src/plans/2026/Woche-2-2026-01-05.zh.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  GhibliKitchen – 第2周 (Start: 2026-01-05)
  Design: 1:1 Kopie der korrigierten DE-Version.
  Content: 中文 (Chinese), 亚洲家常菜 (CN/JP/KR), 孕期友好 (全熟/清淡).
*/

// ---- Meta ----
export const meta = {
  title: "第2周",
  startDate: "2026-01-05",
  id: "woche-2-2026-01-05", // Identisch zu DE
  lang: "zh",
  sidebar: "第2周 (2026-01-05)",
};

const FILE_BASE = "第2周 2026-01-05";

// ---- UI Labels ----
const UI_TITLES = {
  main: "第2周食谱",
  list: "第2周购物清单",
};

// ---- THEME ----
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
  padding: 20,
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
  mo: "星期一 (2026-01-05)",
  di: "星期二 (2026-01-06)",
  mi: "星期三 (2026-01-07)",
  do: "星期四 (2026-01-08)",
  fr: "星期五 (2026-01-09)",
  sa: "星期六 (2026-01-10)",
  so: "星期日 (2026-01-11)",
};

// -----------------------------------------------------------------------
// DATA (Translated)
// -----------------------------------------------------------------------
export const DATA = [
  // MONDAY
  {
    id: "mo-f",
    title: "韩式鸡肉粥 (Dakjuk 닭죽)",
    desc: "非常温和养胃的早餐。鸡肉与米饭同煮至软烂。",
    story: "韩国传统的滋补粥品，口感绵密，适合清晨。",
    target: "≈65g 碳水 (2人份) · 高蛋白",
    ingredients: [
      "大米 (生) 80 g",
      "清水 800 ml",
      "鸡胸肉 150 g",
      "胡萝卜 80 g",
      "西葫芦 80 g",
      "大蒜 1 瓣",
      "芝麻油 5 ml",
      "葱花 10 g"
    ],
    steps: [
      "大米洗净，鸡肉切小块。",
      "除芝麻油和葱花外，所有食材放入电饭煲。",
      "选择 '煮粥 (Porridge/Congee)' 模式。",
      "出锅前淋上芝麻油，撒上葱花。"
    ],
    checks: "养胃 ✓ · 鸡肉全熟 ✓",
    swaps: "鸡肉 ↔ 豆腐 (最后放入)",
    side: "温水或姜茶",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Porridge / Congee",
      water: "米水比例 1:9 至 1:10",
      notes: "非常软烂易消化。"
    },
  },
  {
    id: "mo-m",
    title: "荞麦冷面沙拉 (Soba Salad)",
    desc: "日式荞麦面配大量脆爽蔬菜，淋上清淡芝麻汁。",
    story: "荞麦面的升糖指数(GI)比普通面条低，更健康。",
    target: "≈75g 碳水 · 高纤维",
    ingredients: [
      "荞麦面 (干) 100 g",
      "黄瓜 150 g",
      "胡萝卜 100 g",
      "毛豆仁 (去壳/冷冻) 100 g",
      "低钠酱油 20 ml",
      "米醋 10 ml",
      "芝麻油 10 ml",
      "熟芝麻 5 g"
    ],
    steps: [
      "荞麦面煮熟，过冷水沥干。",
      "蔬菜切丝，毛豆焯熟。",
      "调好酱汁，所有食材拌匀即可。"
    ],
    checks: "清爽 ✓ · 可做全素 ✓",
    swaps: "毛豆 ↔ 豆腐丁",
    side: "味噌汤 (即食/低盐)",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "白菜炒肉末 (温和版)",
    desc: "瘦牛肉末与大量白菜同炒，蚝油提鲜，口感软嫩。",
    story: "白菜易消化，水分足，是非常好的晚餐蔬菜。",
    target: "低碳水可选 · 高蛋白",
    ingredients: [
      "瘦牛肉末 200 g",
      "大白菜 300 g",
      "胡萝卜 100 g",
      "姜末 5 g",
      "低钠酱油 15 ml",
      "蚝油 10 ml",
      "米饭 (熟) 200 g (作为主食)"
    ],
    steps: [
      "肉末炒至变色且全熟。",
      "加入蔬菜和姜末翻炒。",
      "加入调料和少许水，焖煮10分钟至白菜变软。",
      "搭配米饭食用。"
    ],
    checks: "肉末全熟 ✓ · 蔬菜软烂 ✓",
    swaps: "牛肉 ↔ 火鸡肉; 蚝油 ↔ 蘑菇素蚝油",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },

  // TUESDAY
  {
    id: "di-f",
    title: "玉子烧 (Tamagoyaki 卵焼き)",
    desc: "日式厚蛋烧，鸡蛋完全煎熟，搭配米饭。",
    story: "蛋白质丰富，耐饿且美味的经典早餐。",
    target: "高蛋白",
    ingredients: [
      "鸡蛋 4 个",
      "胡萝卜 (擦丝) 30 g",
      "低钠酱油 5 ml",
      "高汤 (或水) 20 ml",
      "米饭 (熟) 150 g",
      "食用油 (少许)"
    ],
    steps: [
      "蛋液打散，加入胡萝卜丝和调料。",
      "在平底锅中分层卷起煎熟 (确保内部凝固)。",
      "切块，配米饭食用。"
    ],
    checks: "鸡蛋全熟 (孕期安全) ✓",
    swaps: "高汤 ↔ 蔬菜汤",
    side: "一份水果",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "海南鸡饭 (电饭煲版)",
    desc: "鸡肉在米饭上蒸熟，肉汁渗入饭中。姜蒜风味浓郁。",
    story: "经典的懒人美味，一锅出。",
    target: "低脂 (去皮后) · 无麸质 (用无麦酱油)",
    ingredients: [
      "大米 (生) 120 g",
      "鸡胸肉 250 g",
      "姜 15 g",
      "大蒜 2 瓣",
      "葱 20 g",
      "鸡汤 200 ml (代替水)",
      "黄瓜 100 g (配菜)"
    ],
    steps: [
      "洗米，放入电饭煲，倒入鸡汤。",
      "姜蒜切末放入，鸡胸肉整块铺在米上。",
      "开启 '煮饭 (White Rice)' 模式。熟后检查鸡肉 (需全白)。",
      "切片，配黄瓜食用。"
    ],
    checks: "鸡肉中心温度>75°C ✓ · 无生食酱料 ✓",
    swaps: "鸡胸 ↔ 去骨鸡腿肉",
    side: "辣椒酱 (可选/少吃)",
    remind: false,
    riceCooker: {
      enabled: true,
      program: "White Rice / Mixed",
      water: "按正常煮饭水量 (用鸡汤)",
      notes: "鸡肉会非常嫩滑。"
    },
  },
  {
    id: "di-a",
    title: "豆腐蘑菇炒青菜",
    desc: "快速、全素、清淡。多种菌菇提供丰富口感。",
    story: "晚餐吃素减轻肠胃负担。",
    target: "低碳水 (不吃米饭时)",
    ingredients: [
      "老豆腐 200 g",
      "白蘑菇 150 g",
      "香菇 50 g",
      "上海青 (Pak Choi) 150 g",
      "低钠酱油 15 ml",
      "芝麻油 5 ml",
      "米饭 (熟) 150 g"
    ],
    steps: [
      "豆腐切块煎黄。",
      "加入蘑菇大火快炒。",
      "加入青菜和调料，炒至断生。",
      "配米饭食用。"
    ],
    checks: "全素 ✓ · 蘑菇炒熟 (易消化) ✓",
    swaps: "蘑菇 ↔ 西葫芦",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },

  // WEDNESDAY
  {
    id: "mi-f",
    title: "红薯蒸糕 (Mushi-Pan 蒸しパン)",
    desc: "用电饭煲或蒸锅做的蒸蛋糕，少糖松软。",
    story: "日式人气点心，这里作为温和的早餐。",
    target: "适量碳水",
    ingredients: [
      "面粉 (普通或全麦) 100 g",
      "泡打粉 1 茶匙",
      "鸡蛋 1 个",
      "牛奶 60 ml",
      "红薯 (生, 切小丁) 80 g",
      "蜂蜜 10 g"
    ],
    steps: [
      "面糊调匀，拌入红薯丁。",
      "倒入模具或涂油的电饭煲内胆。",
      "使用 '蛋糕 (Cake)' 或 '蒸煮 (Steam)' 模式 (约20分钟)。"
    ],
    checks: "鸡蛋完全熟透 ✓",
    swaps: "红薯 ↔ 苹果",
    side: "一杯牛奶或豆浆",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Cake / Steam",
      water: "如用Steam模式：加水至刻度线",
      notes: "可用牙签测试是否熟透。"
    },
  },
  {
    id: "mi-m",
    title: "韩式杂菜 (Japchae - 温和版)",
    desc: "红薯粉丝配大量蔬菜和牛肉丝，口感丰富。",
    story: "通常是节日菜肴，这里改为少油少糖的家常版。",
    target: "无麸质 (若酱油无麦)",
    ingredients: [
      "红薯粉丝 (干) 100 g",
      "牛排肉 (切丝) 100 g",
      "菠菜 100 g",
      "胡萝卜 80 g",
      "洋葱 50 g",
      "低钠酱油 20 ml",
      "芝麻油 10 ml",
      "糖/蜂蜜 5 g"
    ],
    steps: [
      "粉丝煮熟过凉水。",
      "牛肉和蔬菜分别炒熟 (全熟)。",
      "所有食材混合，加入调料拌匀。",
      "淋上芝麻油。"
    ],
    checks: "牛肉全熟 ✓",
    swaps: "牛肉 ↔ 蘑菇 (全素)",
    side: "泡菜 (巴氏杀菌/熟制)",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "清蒸鱼 (姜葱风味)",
    desc: "最经典的烹饪方式，保留鱼肉鲜美，极易消化。",
    story: "鱼肉富含蛋白质，清蒸避免摄入过多油脂。",
    target: "高蛋白 · 低脂",
    ingredients: [
      "白身鱼 (鳕鱼/鲈鱼) 300 g",
      "姜丝 15 g",
      "葱段 2 根",
      "低钠酱油 15 ml",
      "热油 10 ml",
      "米饭 (熟) 150 g"
    ],
    steps: [
      "鱼盘铺姜丝，放入鱼。",
      "蒸锅 (或电饭煲蒸格) 蒸 10-12 分钟。",
      "倒掉多余汤汁，淋酱油。",
      "热油浇在葱丝上激发出香味。"
    ],
    checks: "鱼肉全熟 ✓ · 无生食 ✓",
    swaps: "鱼 ↔ 嫩豆腐",
    side: "清蒸西兰花",
    remind: true,
    riceCooker: { enabled: false },
  },

  // THURSDAY
  {
    id: "do-f",
    title: "小米南瓜粥",
    desc: "小米富含铁质，南瓜自带清甜，养胃佳品。",
    story: "传统的“舒适食物”，特别适合孕期。",
    target: "补铁 · 膳食纤维",
    ingredients: [
      "小米 60 g",
      "南瓜 (Hokkaido) 100 g",
      "水/牛奶 400 ml",
      "肉桂粉 1 撮",
      "核桃碎 10 g"
    ],
    steps: [
      "小米洗净。",
      "与南瓜丁、液体同煮约 15 分钟。",
      "焖一会儿，撒上核桃碎。"
    ],
    checks: "小米洗净去涩 ✓",
    swaps: "南瓜 ↔ 苹果",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "亲子丼 (Oyakodon - 全熟版)",
    desc: "鸡肉滑蛋饭，日式高汤底。重点：鸡蛋必须完全煮熟。",
    story: "名字意为“父母与孩子”(鸡与蛋)。",
    target: "营养均衡",
    ingredients: [
      "鸡腿肉 (去骨) 150 g",
      "鸡蛋 3 个",
      "洋葱 80 g",
      "高汤/Dashi 100 ml",
      "低钠酱油 15 ml",
      "米饭 (熟) 200 g"
    ],
    steps: [
      "洋葱在高汤酱油中煮软。",
      "加入鸡肉煮至全熟。",
      "倒入蛋液，盖盖焖煮。",
      "直到蛋液完全凝固 (无流心)。"
    ],
    checks: "鸡蛋全熟 ✓ · 鸡肉全熟 ✓",
    swaps: "鸡肉 ↔ 豆腐",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "广式煲仔饭 (电饭煲版)",
    desc: "鸡肉、香菇与米饭同煮，饭粒吸满肉汁。",
    story: "虽然没有瓦煲的锅巴，但味道依然地道且方便。",
    target: "一锅端 (One Pot)",
    ingredients: [
      "大米 (生) 120 g",
      "鸡胸肉 (切丁) 150 g",
      "香菇 (泡发/鲜) 50 g",
      "上海青 100 g",
      "姜丝 5 g",
      "酱油 10 ml",
      "玉米淀粉 1 茶匙 (腌肉用)"
    ],
    steps: [
      "鸡肉用酱油、淀粉、姜丝腌制15分钟。",
      "米和水入锅。",
      "鸡肉和香菇铺在米上。",
      "开启 '煮饭' 模式。",
      "最后5分钟放入青菜焖熟。"
    ],
    checks: "鸡肉全熟 ✓",
    swaps: "上海青 ↔ 菠菜",
    side: "清汤",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White Rice",
      water: "标准水量 (腌料汁不算水)",
      notes: "吃前拌匀。"
    },
  },

  // FRIDAY
  {
    id: "fr-f",
    title: "西红柿炒鸡蛋 & 全麦面包",
    desc: "国民家常菜，酸甜开胃。搭配面包而非米饭。",
    story: "最快捷的营养早餐。",
    target: "蛋奶素",
    ingredients: [
      "鸡蛋 3 个",
      "番茄 2 个 (大)",
      "葱花 10 g",
      "盐/胡椒",
      "全麦面包 2 片"
    ],
    steps: [
      "鸡蛋炒熟盛出。",
      "番茄炒出汁。",
      "鸡蛋回锅混合，调味。",
      "确保鸡蛋全熟。"
    ],
    checks: "鸡蛋全熟 ✓",
    swaps: "面包 ↔ 米饭",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "鲑鱼炊饭 (Takikomi Gohan)",
    desc: "日式五目饭，三文鱼和蘑菇与米同煮。",
    story: "秋冬季节的暖心料理。",
    target: "Omega-3 (三文鱼)",
    ingredients: [
      "大米 (生) 120 g",
      "三文鱼柳 150 g",
      "胡萝卜 50 g",
      "香菇/蘑菇 50 g",
      "低钠酱油 15 ml",
      "味淋 (或少许糖) 5 ml",
      "高汤/水"
    ],
    steps: [
      "洗米，加水/高汤至刻度，加入酱油。",
      "铺上蔬菜丝和整块三文鱼。",
      "煮饭。",
      "煮好后将鱼弄碎，拌入饭中 (去皮去刺)。"
    ],
    checks: "三文鱼全熟 ✓ · 无刺 ✓",
    swaps: "三文鱼 ↔ 鸡肉",
    side: "味噌汤",
    remind: false,
    riceCooker: {
      enabled: true,
      program: "Mixed / White Rice",
      water: "含调料总量",
      notes: "如有鱼皮，煮好后撕掉。"
    },
  },
  {
    id: "fr-a",
    title: "清汤乌冬面 (配豆腐)",
    desc: "粗面条配清淡高汤，加入豆腐和菠菜。",
    story: "乌冬面极易消化，暖身。",
    target: "轻食晚餐",
    ingredients: [
      "乌冬面 (熟/干) 200 g",
      "豆腐 150 g",
      "菠菜 100 g",
      "葱花",
      "高汤/蔬菜汤 600 ml",
      "酱油 10 ml"
    ],
    steps: [
      "高汤烧开，放入豆腐热透。",
      "加入乌冬面煮热。",
      "最后放入菠菜烫熟。",
      "调味出锅。"
    ],
    checks: "非常温和 ✓",
    swaps: "豆腐 ↔ 煮鸡蛋",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },

  // SATURDAY
  {
    id: "sa-f",
    title: "韩式蔬菜米饼 (Yachaejeon)",
    desc: "用粘米粉或面粉加蔬菜丝煎成的饼。",
    story: "咸味早餐，换个口味。",
    target: "无麸质可选",
    ingredients: [
      "粘米粉 (或面粉) 80 g",
      "水 约 80 ml",
      "鸡蛋 1 个",
      "西葫芦 (擦丝) 50 g",
      "胡萝卜 (擦丝) 30 g",
      "盐 少许"
    ],
    steps: [
      "面糊调匀，拌入蔬菜丝。",
      "平底锅煎成小圆饼。",
      "两面金黄熟透。"
    ],
    checks: "蔬菜熟软 ✓",
    swaps: "粘米粉 ↔ 面粉",
    side: "蘸酱油",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "韩式拌饭 (Bibimbap - 孕期版)",
    desc: "米饭铺上各式熟菜和炒肉。注意：不用生蛋黄！",
    story: "韩国国菜。这里不放生食，辣酱适量。",
    target: "大量蔬菜",
    ingredients: [
      "米饭 (熟) 200 g",
      "牛肉末 100 g (炒熟)",
      "菠菜 (焯熟) 80 g",
      "胡萝卜 (炒熟) 80 g",
      "豆芽 (煮熟!) 80 g",
      "鸡蛋 (煎蛋，全熟) 2 个",
      "芝麻油, 酱油"
    ],
    steps: [
      "所有配菜分别煮熟/炒熟 (豆芽必须煮透)。",
      "铺在米饭上。",
      "淋上芝麻油和酱油 (韩式辣酱按需)。"
    ],
    checks: "豆芽全熟 (防李斯特菌) ✓ · 鸡蛋全熟 ✓",
    swaps: "牛肉 ↔ 豆腐",
    side: "无",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "白菜千层锅 (Mille-Feuille Nabe)",
    desc: "网红菜：白菜叶夹肉片，层层叠起在电饭煲蒸煮。",
    story: "像花朵一样绽放，视觉味觉双享受。",
    target: "低碳水 (无米饭时)",
    ingredients: [
      "大白菜 1/2 颗",
      "猪肉片或火鸡片 (薄切) 200 g",
      "高汤 200 ml",
      "姜片",
      "橙醋 (Ponzu) 蘸料"
    ],
    steps: [
      "一层白菜一层肉片叠好。",
      "切成 5cm 宽的段。",
      "断面朝上，从外向内塞满电饭煲内胆。",
      "淋入高汤。煮饭模式 (约20-25分钟)。",
      "肉片变色全熟即可。"
    ],
    checks: "肉片全熟 ✓",
    swaps: "猪肉 ↔ 牛肉",
    side: "配少量米饭",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "Steam / Cook",
      water: "200ml 高汤",
      notes: "颜值高，营养好。"
    },
  },

  // SUNDAY
  {
    id: "so-f",
    title: "网红整个番茄饭 (Whole Tomato Rice)",
    desc: "全网爆火：整颗番茄与米饭同煮，拌匀即成浓郁烩饭。",
    story: "超级简单，酸甜多汁，懒人福音。",
    target: "Instagram-Hit",
    ingredients: [
      "大米 (生) 120 g",
      "番茄 (大, 熟透) 1 个",
      "橄榄油 1 大勺",
      "玉米粒 & 青豆 (冷冻) 50 g",
      "熟火腿丁 30 g",
      "盐, 黑胡椒"
    ],
    steps: [
      "米和水入锅 (水比平时略少)。",
      "番茄去蒂，放在米饭正中间。",
      "周围撒上油、蔬菜粒和火腿。",
      "煮熟后，捣碎番茄，搅拌均匀。"
    ],
    checks: "全素 (去火腿) ✓",
    swaps: "火腿 ↔ 蘑菇",
    side: "煎蛋",
    remind: true,
    riceCooker: {
      enabled: true,
      program: "White Rice",
      water: "比平时略少 (番茄出水)",
      notes: "番茄越熟越好。"
    },
  },
  {
    id: "so-m",
    title: "麻婆豆腐 (温和版)",
    desc: "嫩豆腐配肉末，豆瓣酱提味但不辣。",
    story: "川菜经典，这里去掉了麻辣，保留鲜香。",
    target: "高蛋白",
    ingredients: [
      "嫩豆腐 300 g",
      "牛肉末或猪肉末 100 g",
      "豆瓣酱 (少量) 或味噌 1 勺",
      "高汤 150 ml",
      "水淀粉 (勾芡)",
      "米饭 (熟) 200 g"
    ],
    steps: [
      "肉末炒熟。",
      "加入酱料炒香，倒入高汤。",
      "放入豆腐块 (轻推，别搅碎)，炖5分钟。",
      "勾芡出锅。"
    ],
    checks: "肉末全熟 ✓ · 避免过辣 ✓",
    swaps: "肉末 ↔ 香菇碎",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "北菇蒸滑鸡",
    desc: "滑嫩的鸡肉块腌制后蒸熟，原汁原味。",
    story: "粤菜经典，清淡滋补。",
    target: "易消化",
    ingredients: [
      "鸡腿肉 (带皮切块) 200 g",
      "香菇 (干/鲜) 4 朵",
      "姜丝",
      "酱油, 芝麻油, 淀粉",
      "米饭 (熟) 150 g"
    ],
    steps: [
      "鸡肉用酱油、淀粉、油腌制。",
      "铺在盘中，放上香菇。",
      "蒸锅 (或电饭煲) 蒸 15-20 分钟。",
      "检查鸡肉汤汁是否清亮 (熟透)。"
    ],
    checks: "鸡肉全熟 ✓",
    swaps: "-",
    side: "白灼青菜",
    remind: true,
    riceCooker: { enabled: false },
  },
];

// -----------------------------------------------------------------------
// Shopping List (Translation Mapping)
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
  "老豆腐": { group: "Protein/Fisch/Tofu", label: "老豆腐/硬豆腐", unitDefault: "g" },
  "嫩豆腐": { group: "Protein/Fisch/Tofu", label: "嫩豆腐", unitDefault: "g" },
  "豆腐": { group: "Protein/Fisch/Tofu", label: "豆腐", unitDefault: "g" },
  "鸡蛋": { group: "Protein/Fisch/Tofu", label: "鸡蛋", unitDefault: "个" },
  "熟火腿丁": { group: "Protein/Fisch/Tofu", label: "熟火腿", unitDefault: "g" },

  // Vegetables
  "大白菜": { group: "Gemüse/Pilze", label: "大白菜", unitDefault: "g" },
  "上海青": { group: "Gemüse/Pilze", label: "上海青/油菜", unitDefault: "g" },
  "菠菜": { group: "Gemüse/Pilze", label: "菠菜", unitDefault: "g" },
  "胡萝卜": { group: "Gemüse/Pilze", label: "胡萝卜", unitDefault: "g" },
  "黄瓜": { group: "Gemüse/Pilze", label: "黄瓜", unitDefault: "g" },
  "西葫芦": { group: "Gemüse/Pilze", label: "西葫芦", unitDefault: "g" },
  "南瓜": { group: "Gemüse/Pilze", label: "南瓜 (贝贝/板栗)", unitDefault: "g" },
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
  "鸡汤": { group: "Algen/Brühen/Würze", label: "鸡汤", unitDefault: "ml" },
  "熟芝麻": { group: "Algen/Brühen/Würze", label: "芝麻", unitDefault: "g" },
  "核桃碎": { group: "Algen/Brühen/Würze", label: "核桃", unitDefault: "g" },
  "牛奶": { group: "Algen/Brühen/Würze", label: "牛奶", unitDefault: "ml" },
  "蜂蜜": { group: "Algen/Brühen/Würze", label: "蜂蜜", unitDefault: "g" },
  "泡打粉": { group: "Algen/Brühen/Würze", label: "泡打粉", unitDefault: "茶匙" },
  "玉米淀粉": { group: "Algen/Brühen/Würze", label: "淀粉", unitDefault: "茶匙" },
  "水淀粉": { group: "Algen/Brühen/Würze", label: "淀粉", unitDefault: "适量" },
  "橄榄油": { group: "Algen/Brühen/Würze", label: "橄榄油", unitDefault: "ml" },
  "食用油": { group: "Algen/Brühen/Würze", label: "食用油", unitDefault: "适量" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      // Matches: "大米 (生) 80 g" or "大蒜 1 瓣"
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|个|瓣|根|片|茶匙|大勺|勺|撮)?/);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      // Fuzzy matching keys
      let key = Object.keys(canon).find((k) => name.includes(k));
      if (!key) {
        // Fallbacks if wording slightly differs
        if (name.includes("大米")) key = "大米";
        else if (name.includes("粉丝")) key = "红薯粉丝";
        else if (name.includes("姜")) key = "姜";
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
  // Sort Chinese by length or logic? Just simple string sort for now.
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => a.label.localeCompare(b.label)));
  return groups;
}

// -----------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------

function animePlaceholder(title) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Encode URI ensures gradients load correctly in data URIs
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw2" }) {
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
            第2周 – 总览 <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>亚洲家常菜 (中/日/韩) · 孕期安全 (全熟/清淡) · 每日 1x 电饭煲料理</p>
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
export default function Woche2ZH() {
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

  // Internal Styles (Identical to Week 1)
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
            {tagChip("第2周")}
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