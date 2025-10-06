// src/i18n-data.js
// @ts-nocheck

/**
 * i18n helpers with on-the-fly DE -> ZH mapping.
 * - Works with plain strings/arrays OR objects like { de, zh }.
 * - If zh is missing and lang === "zh", we auto-map common culinary terms
 *   using a small dictionary + phrasing tweaks.
 * - Optional per-field overrides are supported via pickTextWithOverride/pickListWithOverride.
 */

/* ---------------------------
 * Minimal DE → ZH term dictionary
 * (extend freely as needed)
 * --------------------------- */
const DE_ZH_DICT = [
  // Staples / carbs
  [/Sushi-Reis/gi, "寿司米"],
  [/Vollkornreis|Brauner\s+Reis/gi, "糙米"],
  [/Reis\s*\(roh\)|Reis\b/gi, "大米"],
  [/Vollkornpasta/gi, "全麦意面"],
  [/Udon/gi, "乌冬面"],
  [/Soba/gi, "荞麦面"],
  [/Weizennudeln/gi, "小麦面条"],
  [/Reisnudeln/gi, "米粉"],
  [/Glasnudeln/gi, "粉丝（红薯粉）"],
  [/Gerste|Perlgerste/gi, "大麦"],

  // Proteins
  [/Lachsfilet|Lachs/gi, "三文鱼"],
  [/Seelachs(filet)?/gi, "明太鱼"],
  [/Kabeljau(filet)?|Kabeljau/gi, "鳕鱼"],
  [/Hähnchenbrust/gi, "鸡胸肉"],
  [/Hähnchenschenkel/gi, "鸡腿肉"],
  [/Putenbrust/gi, "火鸡胸肉"],
  [/Rinderhack/gi, "牛肉末"],
  [/Rind(fleisch)?/gi, "牛肉"],
  [/Schweinefilet|Schwein/gi, "猪肉"],
  [/Tofu\s*seiden/gi, "嫩豆腐"],
  [/Tofu\s*fest/gi, "老豆腐"],
  [/Tofu/gi, "豆腐"],
  [/Edamame/gi, "枝豆（毛豆）"],
  /\bEi(?:er)?\b/gi, "鸡蛋",
  [/Parmesan/gi, "帕玛森芝士（巴氏杀菌）"],

  // Vegetables
  [/Pak\s*Choi/gi, "上海青"],
  [/Spinat/gi, "菠菜"],
  [/Shiitake/gi, "香菇"],
  [/Champignons/gi, "白蘑菇"],
  [/Brokkoli/gi, "西兰花"],
  [/Zucchini/gi, "西葫芦"],
  [/Paprika/gi, "甜椒"],
  [/Karotte(n)?/gi, "胡萝卜"],
  [/Kartoffeln?/gi, "土豆"],
  [/Kürbis/gi, "南瓜"],
  [/Rettich\s*\(Daikon\)?/gi, "白萝卜（大根）"],
  [/Apfel/gi, "苹果"],
  [/Frühlingszwiebel|Lauch/gi, "葱"],
  [/Zwiebel/gi, "洋葱"],

  // Liquids / seasoning
  [/Wasser/gi, "清水"],
  [/Gemüsebrühe|Brühe/gi, "蔬菜高汤"],
  [/Sojasauce\s*natriumarm/gi, "低钠酱油"],
  [/Miso\s*hell/gi, "淡味味噌"],
  [/Doenjang/gi, "大酱（韩式）"],
  [/Mirin/gi, "味醂"],
  [/Honig/gi, "蜂蜜"],
  [/Sesamöl/gi, "芝麻油"],
  [/Olivenöl/gi, "橄榄油"],
  [/Rapsöl/gi, "菜籽油"],
  [/Wakame/gi, "裙带菜（若布）"],
  [/Nori/gi, "紫菜"],
  [/Ingwer/gi, "姜"],
  [/Knoblauch/gi, "蒜"],
  [/Salz/gi, "盐"],
  [/Zimt/gi, "肉桂"],

  // Methods / descriptors
  [/sanft(?:e|) köcheln/gi, "小火慢煮"],
  [/dämpfen/gi, "清蒸"],
  [/durchgegart/gi, "完全熟透"],
  [/mild/gi, "清淡"],
  [/klare?\s*Brühe/gi, "清汤"],
  [/abschmecken/gi, "调味至合适"],
  [/ziehen\s*lassen/gi, "焖/浸煮"],
  [/anschwitzen|anbraten/gi, "小火炒香"],
  [/separat/gi, "另行"],

  // Common UI bits
  [/KH\s*gesamt/gi, "碳水"],
  [/Protein/gi, "蛋白质"],
  [/Ziel/gi, "目标"],
  [/Checks/gi, "要点"],
  [/Beilage|Side/gi, "配餐"],
];

/* ---------------------------
 * Tiny phrasing tweaks
 * --------------------------- */
function deToZh(s) {
  if (!s) return "";
  let out = String(s);
  for (const [rx, zh] of DE_ZH_DICT) out = out.replace(rx, zh);
  // Numeric/units & stock phrases
  out = out
    .replace(/≈\s*(\d+)\s*g\s*KH/gi, "≈$1 g 碳水")
    .replace(/·\s*Protein\s*≈\s*(\d+)\s*g\s*p\.\s*P\./gi, "· 蛋白质 ≈ $1 g/人")
    .replace(/\b2\s*P\.\b/gi, "2 人")
    .replace(/Eier vollständig stocken/gi, "鸡蛋需完全凝固")
    .replace(/vollständig durchgegart/gi, "需完全熟透");
  return out;
}

/* ---------------------------
 * Optional per-field overrides
 * Use via pickTextWithOverride/pickListWithOverride
 * Key format: `${id}.${field}` e.g. "mo-f.title"
 * --------------------------- */
export const overrides = {
  zh: {}, // fill from e.g. src/i18n/recipes.zh-overrides.js
};

function getOverride(key, lang) {
  if (lang === "zh" && overrides.zh && Object.prototype.hasOwnProperty.call(overrides.zh, key)) {
    return overrides.zh[key];
  }
  return undefined;
}

/* ---------------------------
 * Base pickers with auto-translate
 * --------------------------- */

// Einzeltext: akzeptiert String ODER { de, zh }.
// Wenn zh fehlt und lang === "zh", wird DE → ZH gemappt.
export const pickText = (v, lang = "de") => {
  // object form with { de, zh }
  if (v && typeof v === "object" && (v.de || v.zh)) {
    const base = v[lang] || v.de || "";
    return lang === "zh" && !v.zh ? deToZh(base) : base;
  }
  // primitive string
  const s = v ?? "";
  return lang === "zh" ? deToZh(String(s)) : String(s);
};

// Liste: akzeptiert Array ODER { de:[], zh:[] }.
// Wenn zh fehlt und lang === "zh", werden die Einträge einzeln gemappt.
export const pickList = (v, lang = "de") => {
  if (v && typeof v === "object" && (Array.isArray(v.de) || Array.isArray(v.zh))) {
    const list = v[lang] || v.de || [];
    return lang === "zh" && !v.zh ? list.map(deToZh) : list;
  }
  const arr = Array.isArray(v) ? v : [];
  return lang === "zh" ? arr.map(deToZh) : arr;
};

/* ---------------------------
 * Override-enabled variants (optional)
 * --------------------------- */

// Text mit Override-Key
export const pickTextWithOverride = (key, v, lang = "de") => {
  const ov = getOverride(key, lang);
  if (typeof ov === "string") return ov;
  return pickText(v, lang);
};

// Liste mit Override-Key
export const pickListWithOverride = (key, v, lang = "de") => {
  const ov = getOverride(key, lang);
  if (Array.isArray(ov)) return ov;
  if (typeof ov === "string") return [ov];
  return pickList(v, lang);
};