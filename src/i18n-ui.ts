// src/i18n-ui.ts
export type UiDict = {
  tabs: { cookbook: string; list: string };
  btn: { pdf: string; html: string; print: string };
  toggle: string;
  day: Record<"mo"|"di"|"mi"|"do"|"fr"|"sa"|"so", string>;
  meal: Record<"f"|"m"|"a", string>;
  mealTitle: Record<"f"|"m"|"a", string>;
  sections: { ingredients: string; steps: string; swaps: string; side: string };
};

export const UI: Record<"de"|"zh", UiDict> = {
  de: {
    tabs: { cookbook: "Kochbuch", list: "Einkaufsliste" },
    btn: { pdf: "PDF erzeugen", html: "HTML exportieren", print: "Drucken" },
    toggle: "DE/中文",
    day: { mo: "Montag", di: "Dienstag", mi: "Mittwoch", do: "Donnerstag", fr: "Freitag", sa: "Samstag", so: "Sonntag" },
    meal: { f: "Frühstück", m: "Mittag", a: "Abend" },
    mealTitle: { f: "Morgen", m: "Mittag", a: "Abend" },
    sections: { ingredients: "Zutaten", steps: "Zubereitung", swaps: "Alternativen", side: "Beilage/Drink" },
  },
  zh: {
    tabs: { cookbook: "食谱", list: "购物清单" },
    btn: { pdf: "导出 PDF", html: "导出 HTML", print: "打印" },
    toggle: "DE/中文",
    day: { mo: "周一", di: "周二", mi: "周三", do: "周四", fr: "周五", sa: "周六", so: "周日" },
    meal: { f: "早餐", m: "午餐", a: "晚餐" },
    mealTitle: { f: "早上", m: "中午", a: "晚上" },
    sections: { ingredients: "配料", steps: "步骤", swaps: "替换", side: "配菜/饮品" },
  },
};