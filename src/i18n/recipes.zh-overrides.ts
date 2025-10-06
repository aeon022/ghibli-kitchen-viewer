// src/i18n/recipes.zh-overrides.ts

// Werte können Einzelstring (title/desc/story/target/checks/side/swaps) oder String-Listen (ingredients/steps) sein.
export type OverrideValue = string | string[];

// Map: "recipeId.field" -> Übersetzung/Override
export const ZH_OVERRIDES: Record<string, OverrideValue> = {
  // Beispiel-Keys (optional):
  // 'mo-f.title': '三文鱼嫩豆腐粥（お粥）',
  // 'mo-f.desc': '日式お粥…',
  // 'mo-f.story': 'Okayu 来自日本…',
  // 'mo-f.target': '≈70 g 碳水（2人）· 蛋白 ≈20 g/人',
  // 'mo-f.steps': ['淘米…', '蒸鱼…', '加入豆腐…'],
  // 'mo-f.swaps': '…',
  // 'mo-f.side': '温热大麦茶。',
  // 'mo-f.checks': '胃炎—温和…',
};

//
// Global registrieren, falls pickTextWithOverride/pickListWithOverride das erwartet
//
declare global {
  // eslint-disable-next-line no-var
  var __zhOverrides: Record<string, OverrideValue> | undefined;
}

if (typeof globalThis !== 'undefined') {
  (globalThis as any).__zhOverrides = {
    ...(globalThis as any).__zhOverrides,
    ...ZH_OVERRIDES,
  };
}

export default ZH_OVERRIDES;