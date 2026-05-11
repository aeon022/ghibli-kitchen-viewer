// src/plans/2026/Woche-16-2026-04-13.de.jsx
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – Woche 16 (Start: 2026-04-13)
  Status: KOMPLETT & FUNKTIONSFÄHIG (Alle 21 Rezepte)
  Fokus: Komplett neue virale Hits, Abwechslung zu W15, Reiskocher-Diversität.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 16",
  startDate: "2026-04-13",
  id: "woche-16-2026-04-13",
  lang: "de",
  sidebar: "Woche 16 (2026-04-13)",
};

const FILE_BASE = "Woche 16 2026-04-13";

const UI_TITLES = {
  main: "Rezepte Woche 16",
  list: "Einkaufsliste Woche 16",
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
  <span className="mkt-chip" key={text} style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "var(--chip-bg)", border: "1px solid var(--border)", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    {text}
  </span>
);

const viralChip = () => (
  <span className="mkt-chip" key="viral" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "linear-gradient(135deg, #ff7e5f, #feb47b)", color: "#fff", fontWeight: "bold", border: "none", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    🔥 Viral Trend
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-04-13)",
  di: "Dienstag (2026-04-14)",
  mi: "Mittwoch (2026-04-15)",
  do: "Donnerstag (2026-04-16)",
  fr: "Freitag (2026-04-17)",
  sa: "Samstag (2026-04-18)",
  so: "Sonntag (2026-04-19)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Carrot Cake Oatmeal 🥕",
    desc: "Haferbrei, der schmeckt wie Karottenkuchen – mit feinen Karottenraspeln und Zimt.",
    story: "Eine fantastische Art, schon morgens Gemüse einzubauen. Die Karotte kocht im Brei extrem weich und gibt eine natürliche Süße ab.",
    target: "≈65 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch (oder Mandelmilch) 400 ml",
      "Karotte (fein gerieben) 1 Stück",
      "Zimt 1 TL",
      "Walnüsse (gehackt) 20 g",
      "Agavendicksaft 1 TL"
    ],
    steps: [
      "Karotte sehr fein raspeln.",
      "Milch, Haferflocken, Karotte und Zimt in einem Topf ca. 5-7 Min sanft köcheln, bis ein cremiger Brei entsteht.",
      "Mit Agavendicksaft süßen und Walnüssen toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓ (Zimt und Ballaststoffe sind top)",
    swaps: "Walnüsse ↔ Pecannüsse",
    side: "Kaffee oder Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Viral Smash Burger Tacos 🍔🌮",
    isViral: true,
    desc: "Rinderhack wird direkt auf einem Tortilla-Wrap in der Pfanne knusprig gebraten.",
    story: "Ein riesiger TikTok-Hit! Statt Brötchen nimmt man Wraps. Das Hackfleisch drückt man roh auf den Wrap und legt es mit der Fleischseite nach unten in die Pfanne. Es wird ultra knusprig!",
    target: "≈65 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Kleine Vollkorn-Tortillas 4 Stück",
      "Rinderhack 200 g",
      "Käse (Cheddar oder Gouda) 40 g",
      "Salat & Gewürzgurken (klein gehackt) 100 g",
      "Ketchup & Mayo (pasteurisiert) 2 EL"
    ],
    steps: [
      "Hackfleisch in 4 Portionen teilen. Jeweils dünn auf eine Seite der Wraps drücken. Salzen und pfeffern.",
      "Wrap mit der Fleischseite nach unten in eine heiße Pfanne legen. Festdrücken! Ca. 3-4 Min braten (komplett durchgaren!).",
      "Wenden, Käse auf die Fleischseite legen, schmelzen lassen.",
      "Mit Salat, Gurken und Sauce toppen, zuklappen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch GANZ durchbraten, Mayo aus Tube) · Diabetes ✓",
    swaps: "Rinderhack ↔ Veganes Hack",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Kung Pao Chicken Rice (Reiskocher) 宫保鸡饭",
    desc: "Die Aromen des Szechuan-Klassikers Kung Pao sanft im Reiskocher gedämpft.",
    story: "Kung Pao ist eigentlich scharf und im Wok gebraten. Diese One-Pot-Version fokussiert sich auf die süß-säuerliche Sojasauce und die knackigen Erdnüsse. Sehr schonend!",
    target: "≈80 g KH (2 P.) · Protein ≈32 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (gewürfelt) 200 g",
      "Paprika (gewürfelt) 100 g",
      "Sojasauce & Reisessig (je 1 EL)",
      "Ungesalzene Erdnüsse 30 g",
      "Hühnerbrühe 240 ml"
    ],
    steps: [
      "Hähnchen in Sojasauce und Essig kurz marinieren.",
      "Reis und Brühe in den Topf geben.",
      "Paprikawürfel und das marinierte Hähnchen darauflegen.",
      "Start drücken. Nach dem Kochen die Erdnüsse unterrühren (so bleiben sie knackig)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hähnchen dämpft sicher durch)",
    swaps: "Erdnüsse ↔ Cashews",
    side: "Ein Gurkensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Erdnüsse erst am Schluss für den Crunch!" },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Inside-Out Grilled Cheese 🧀",
    isViral: true,
    desc: "Ein Käsetoast, bei dem der Käse nicht nur innen schmilzt, sondern auch außen eine Kruste bildet.",
    story: "Noch ein Social-Media-Star. Der Trick: Ein bisschen Käse wird direkt in die Pfanne gestreut. Wenn er Blasen wirft, legt man das Brot drauf. Ergibt eine göttliche Kruste.",
    target: "≈55 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Gouda oder Cheddar (gerieben) 80 g",
      "Kochschinken 2 Scheiben",
      "Butter 10 g",
      "Tomatenscheiben"
    ],
    steps: [
      "Ein wenig Käse in die beschichtete Pfanne streuen. Sobald er schmilzt, eine Scheibe Toast andrücken.",
      "Mit Schinken, Tomate und mehr Käse belegen. Zweite Toastscheibe drauflegen.",
      "Wenden und auch die andere Außenseite in etwas Käse knusprig braten.",
      "Braten, bis alles verschmolzen und heiß ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert, Schinken erhitzt)",
    swaps: "Schinken ↔ Putenbrust",
    side: "Etwas Rohkost.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Shakshuka (Well-Done Edition)",
    desc: "Eier in einer würzigen Tomaten-Paprika-Sauce, komplett durchgegart.",
    story: "Shakshuka kommt aus Nordafrika/Israel. In der Schwangerschaft pochieren wir die Eier nicht weich, sondern legen einfach einen Deckel auf die Pfanne, bis auch das Eigelb komplett fest ist.",
    target: "≈65 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Passierte Tomaten 200 ml",
      "Paprika (gewürfelt) 1 Stück",
      "Zwiebel & Knoblauch 1 Stück",
      "Eier 4 Stück",
      "Kreuzkümmel & Paprikapulver",
      "Vollkornbrot 4 Scheiben"
    ],
    steps: [
      "Zwiebel, Knoblauch und Paprika in der Pfanne weich dünsten.",
      "Tomaten und Gewürze zugeben, 10 Min einköcheln lassen.",
      "Mit einem Löffel 4 Mulden in die Sauce drücken und die Eier hineinschlagen.",
      "Deckel drauf! Auf mittlerer Hitze garen, bis das Ei GANZ fest ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett durchgegart!) · Diabetes ✓",
    swaps: "Vollkornbrot ↔ Quinoa",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Lemon Garlic Butter Lachs (Reiskocher)",
    desc: "Lachsfilet, beträufelt mit Zitrone und Knoblauchbutter, gedämpft über Reis.",
    story: "Mediterrane Aromen treffen auf den Reiskocher. Die Zitronenbutter schmilzt direkt in die Reiskörner und gibt dem ganzen Gericht eine unglaubliche Frische.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Knoblauch 1 Zehe (gepresst)",
      "Butter 20 g",
      "Zitrone 1/2 Stück (Saft)",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis und Brühe in den Topf.",
      "Lachs oben auflegen. Butter, Knoblauch und Zitronensaft über dem Lachs verteilen.",
      "Start drücken.",
      "Nach dem Kochen den Lachs vorsichtig zerteilen und mit dem aromatisierten Reis vermengen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart sicher durch)",
    swaps: "Lachs ↔ Kabeljau",
    side: "Ein grüner Salat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Butter und Zitrone machen den Reis extrem cremig." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Viral Cottage Cheese Flatbread",
    isViral: true,
    desc: "Ein kohlenhydratarmes Fladenbrot, das fast nur aus Hüttenkäse und Ei besteht.",
    story: "Der Wahnsinn aus der Fitness-Bubble! Hüttenkäse und Ei werden gemixt, auf einem Blech verstrichen und gebacken. Das Ergebnis lässt sich wie ein Tortilla rollen und ist Protein pur.",
    target: "≈40 g KH (2 P.) · Protein ≈35 g p. P.",
    ingredients: [
      "Körniger Frischkäse (Cottage Cheese) 200 g",
      "Eier 2 Stück",
      "Italienische Kräuter & Knoblauchpulver",
      "Putenbrustaufschnitt 4 Scheiben",
      "Spinat (frisch) 50 g"
    ],
    steps: [
      "Hüttenkäse, Eier und Gewürze in einem Mixer komplett glatt pürieren.",
      "Auf ein Backblech (mit Backpapier!) streichen (ca. 1 cm dick).",
      "Im Ofen oder großen Airfryer bei 180°C ca. 25-30 Min backen, bis es goldbraun und fest ist.",
      "Auskühlen lassen, abziehen, mit Putenbrust und Spinat belegen und rollen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei und Käse komplett durchgebacken) · Diabetes ✓",
    swaps: "Putenbrust ↔ Räucherlachs",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Zucchini Noodle Shrimp Scampi",
    desc: "Zoodles (Zucchini-Nudeln) mit Garnelen in einer leichten Knoblauch-Zitronen-Sauce.",
    story: "Scampi-Sauce ohne die Schwere von Nudeln. Die Zucchini-Nudeln saugen den Knoblauch auf und das Ganze liegt nachmittags nicht schwer im Magen.",
    target: "≈50 g KH (2 P. - inkl. Brot) · Protein ≈24 g p. P.",
    ingredients: [
      "Zucchini (mit einem Spiralschneider zu Nudeln gedreht) 2-3 Stück",
      "Garnelen (TK, aufgetaut) 200 g",
      "Olivenöl 2 EL & Knoblauch 2 Zehen",
      "Zitronensaft 1 EL",
      "Vollkornbrot (als Beilage) 2 Scheiben"
    ],
    steps: [
      "Garnelen und Knoblauch in Olivenöl in einer Pfanne anbraten, bis die Garnelen rosa und komplett durch sind.",
      "Zucchini-Nudeln hinzugeben. Nur 2-3 Minuten schwenken (sie sollen knackig bleiben, nicht wässrig werden!).",
      "Mit Zitrone, Salz und Pfeffer abschmecken.",
      "Mit Brot servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen komplett durchbraten)",
    swaps: "Zoodles ↔ Normale Vollkorn-Spaghetti",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Tomato Beef Rice 番茄牛肉饭 (Reiskocher)",
    desc: "Der legendäre Whole-Tomato-Hack, diesmal gepaart mit hauchdünnem Rindfleisch.",
    story: "Die Tomate schmilzt und bildet eine natürliche süß-saure Sauce. Das Rindfleisch gart im Dampf unfassbar zart. Ein echtes Wohlfühlessen.",
    target: "≈82 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Tomate (groß) 1 Stück",
      "Rindfleisch (hauchdünne Scheiben) 150 g",
      "Sojasauce 2 EL",
      "Gemüsebrühe 240 ml",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Reis, Brühe und Sojasauce in den Topf geben.",
      "Tomate kreuzweise einschneiden, in die Mitte setzen. Das Rindfleisch locker darum fächern.",
      "Start drücken.",
      "Nach dem Kochen die Tomate zerdrücken, alles vermengen und mit Frühlingszwiebeln toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch wird >80°C durchgedämpft)",
    swaps: "Rindfleisch ↔ Hähnchenbrust",
    side: "Ein Schälchen Kimchi (mild).",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (etwas weniger wg. Tomate)", notes: "Tomate gut zerdrücken." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Süßkartoffel-Pancakes 🥞",
    desc: "Pancakes, deren Teig zu einem großen Teil aus Süßkartoffelpüree besteht.",
    story: "Eine tolle Resteverwertung für gebackene Süßkartoffeln. Die Pancakes werden extrem saftig, leicht orange und haben eine tolle natürliche Süße.",
    target: "≈75 g KH (2 P.) · Protein ≈16 g p. P.",
    ingredients: [
      "Süßkartoffel-Püree (aus gekochter Süßkartoffel) 100 g",
      "Mehl (Vollkorn) 80 g",
      "Eier 2 Stück",
      "Milch 50 ml",
      "Backpulver 1 TL",
      "Zimt"
    ],
    steps: [
      "Püree, Eier und Milch glatt rühren.",
      "Mehl, Backpulver und Zimt unterheben.",
      "In der Pfanne bei mittlerer Hitze durchbacken. (Sie brauchen etwas länger als normale Pancakes!).",
      "Mit etwas Quark servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Komplett durchbacken!) · Diabetes ✓",
    swaps: "Süßkartoffel ↔ Kürbispüree",
    side: "Ein Klecks Magerquark.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Viral Crispy Quinoa Salad",
    isViral: true,
    desc: "Quinoa wird im Airfryer knusprig gebacken und dann über einen Salat gestreut.",
    story: "Quinoa-Salat kennt jeder. Aber Quinoa im Airfryer zu rösten, bis er crunchig wie Nüsse wird, ist ein Gamechanger auf Instagram!",
    target: "≈70 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Quinoa (bereits gekocht!) 150 g",
      "Olivenöl 1 EL",
      "Gurke & Tomate 200 g",
      "Feta (pasteurisiert) 50 g",
      "Zitronensaft & Kräuter"
    ],
    steps: [
      "Gekochten Quinoa mit Olivenöl mischen. Im Airfryer bei 190°C ca. 10-15 Min rösten, bis er knusprig wird. (Vorsicht, fliegt leicht rum, evt. Backpapier nutzen).",
      "Gemüse klein schneiden, mit Zitrone anmachen.",
      "Salat anrichten, Feta darüberbröseln und den krossen Quinoa als Crunch-Topping darübergeben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert)",
    swaps: "Quinoa ↔ Kichererbsen (werden auch super knusprig)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Mapo Tofu (Mild) 麻婆豆腐",
    desc: "Sichuan-Klassiker ohne die extreme Schärfe. Tofu und Hackfleisch in pikanter Sauce.",
    story: "Echtes Mapo Tofu betäubt die Zunge. Wir machen eine milde 'Balanced'-Version: Viel Tofu, mageres Hack, Sojasauce und nur ein Hauch Chili. Perfekt zu Reis.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Seidentofu oder weicher Tofu 300 g",
      "Schweinehack (mager) 100 g",
      "Sojasauce 2 EL",
      "Austernsauce 1 EL",
      "Knoblauch 1 Zehe",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Tofu in Würfel schneiden, kurz in heißem Wasser blanchieren (dann bricht er nicht so leicht).",
      "Hackfleisch und Knoblauch im Wok krümelig und GANZ durch braten.",
      "Saucen und 100ml Wasser zugeben. Tofu hineingleiten lassen.",
      "3 Min sanft köcheln. Mit etwas in Wasser gelöster Stärke andicken. Über Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hack komplett durch, Tofu heiß)",
    swaps: "Schweinehack ↔ Hähnchenhack",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Dim Sum Steamed Egg 蒸水蛋 (Mikrowelle)",
    desc: "Extrem glatter Eierstich, gewürzt mit Sojasauce und Sesamöl.",
    story: "Eine Schale warmer Eierstich ist in China pures Wohlgefühl. Wir machen ihn superschnell in der Mikrowelle.",
    target: "≈60 g KH (2 P. - inkl. Brot) · Protein ≈18 g p. P.",
    ingredients: [
      "Eier 3 Stück",
      "Warmes Wasser 150 ml",
      "Sojasauce 1 EL",
      "Sesamöl 1 TL",
      "Vollkorn-Toast (als Beilage) 4 Scheiben"
    ],
    steps: [
      "Eier mit dem warmen Wasser sehr sanft verquirlen (wenig Schaum machen!).",
      "In eine mikrowellenfeste Schale geben. Abdecken (Mikrowellendeckel oder Teller).",
      "Auf mittlerer bis niedriger Stufe ca. 4-6 Min garen, bis es komplett durchgestockt (wie Pudding) ist.",
      "Sojasauce und Sesamöl darüber träufeln. Mit Toast essen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei MUSS komplett fest sein, keine glitschigen Stellen!)",
    swaps: "Wasser ↔ Dashi-Brühe",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Marry Me Beans 💍",
    isViral: true,
    desc: "Weiße Bohnen in einer cremigen Sauce aus getrockneten Tomaten, Sahne und Parmesan.",
    story: "Das 'Marry Me Chicken' hat das Internet erobert (so gut, dass man einen Heiratsantrag bekommt). Die fleischlose Version mit Bohnen ist sogar noch cremiger und schneller!",
    target: "≈80 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Weiße Bohnen (Dose, gespült) 250 g",
      "Getrocknete Tomaten (in Öl, gehackt) 40 g",
      "Knoblauch 1 Zehe",
      "Kochsahne (pasteurisiert) 100 ml",
      "Parmesan 20 g",
      "Vollkornbrot 2-4 Scheiben"
    ],
    steps: [
      "Knoblauch und getrocknete Tomaten in etwas Öl aus dem Tomatenglas anbraten.",
      "Bohnen, Sahne und etwas Wasser dazugeben. 5 Min köcheln lassen.",
      "Parmesan unterrühren, bis die Sauce dick wird.",
      "Mit Brot servieren, um die geniale Sauce aufzutunken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse/Sahne pasteurisiert) · Diabetes ✓",
    swaps: "Bohnen ↔ Kichererbsen",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Mushroom Takikomi Gohan きのこご飯 (Reiskocher)",
    desc: "Japanischer Mischreis mit drei Sorten Pilzen und Soja-Aroma.",
    story: "Ein Fest der erdigen Aromen. Shiitake, Champignons und Enoki dämpfen gemeinsam mit dem Reis. Ein echtes veganes Highlight.",
    target: "≈82 g KH (2 P.) · Protein ≈15 g p. P. (mit Tofu)",
    ingredients: [
      "Reis (roh) 120 g",
      "Pilze gemischt (Shiitake, Champignons, Enoki) 200 g",
      "Sojasauce 2 EL",
      "Mirin 1 EL",
      "Dashi oder Gemüsebrühe 240 ml",
      "Räuchertofu (optional für mehr Protein) 100 g"
    ],
    steps: [
      "Alle Pilze in Scheiben/Mundgerechte Stücke schneiden. Tofu würfeln.",
      "Reis, Brühe, Soja und Mirin in den Reiskocher geben.",
      "Pilze und Tofu darauf verteilen (nicht umrühren).",
      "Start drücken. Nach dem Kochen kräftig vermengen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Pilzmix ↔ Nur Champignons",
    side: "Ein kleiner Spinatsalat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Pilze schrumpfen stark zusammen." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Airfryer Breakfast Burrito 🌯",
    desc: "Ein gefüllter Wrap mit Rührei und schwarzen Bohnen, knusprig aus dem Airfryer.",
    story: "Burritos im Airfryer aufzubacken schließt sie nicht nur perfekt, sondern macht sie außen herrlich knusprig. Ein Power-Frühstück am Wochenende.",
    target: "≈75 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Vollkorn-Tortillas 2 Stück",
      "Eier 3 Stück",
      "Schwarze Bohnen (Dose) 50 g",
      "Käse (Gouda, pasteurisiert) 30 g",
      "Tomate (gewürfelt) 1 Stück"
    ],
    steps: [
      "Eier in der Pfanne als Rührei KOMPLETT durchbraten.",
      "Wraps mit Rührei, Bohnen, Tomate und Käse füllen. Wie einen Burrito eng aufrollen.",
      "Im Airfryer bei 190°C ca. 5-7 Minuten backen, bis der Wrap kross ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett fest, Käse pasteurisiert)",
    swaps: "Schwarze Bohnen ↔ Schinkenwürfel",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Viral Sushi Waffles 🍣🧇 (Airfryer Hack)",
    isViral: true,
    desc: "Gekochter Reis wird im Airfryer (oder Waffeleisen) knusprig gebacken und wie Sushi belegt.",
    story: "Kein Waffeleisen? Kein Problem. Wir formen flache Reis-Patties, backen sie im Airfryer extrem knusprig und toppen sie mit cremiger Thunfisch-Mayo.",
    target: "≈80 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (gekocht, klebrig/Sushi-Reis) 200 g",
      "Thunfisch (Dose) 100 g",
      "Mayonnaise (pasteurisiert) 1 EL",
      "Sojasauce 1 TL",
      "Gurke (in feinen Scheiben)",
      "Nori (zerbröselt)"
    ],
    steps: [
      "Reis zu zwei kompakten, flachen 'Waffeln' formen. Leicht mit Öl bepinseln.",
      "Im Airfryer bei 200°C ca. 12-15 Min backen, bis sie außen richtig kross sind.",
      "Thunfisch mit Mayo und Sojasauce mischen.",
      "Crispy Rice mit Gurke, Thunfischcreme und Nori toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Mayo pasteurisiert, Dosenthunfisch in Maßen)",
    swaps: "Thunfisch ↔ Gekochte Garnelen",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Golden Coconut Chicken Rice 🥥 (Reiskocher)",
    desc: "Reis, Hühnchen und Erbsen dämpfen in einer aromatischen Kurkuma-Kokos-Brühe.",
    story: "Ein asiatisch-karibisches Crossover. Die Kokosmilch macht den Reis unfassbar cremig, das Kurkuma färbt ihn leuchtend gelb. Hühnchen gart zart mit.",
    target: "≈82 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (gewürfelt) 200 g",
      "Kokosmilch (fettarm) 100 ml",
      "Hühnerbrühe 150 ml",
      "Kurkuma 1/2 TL",
      "Erbsen (TK) 50 g"
    ],
    steps: [
      "Reis, Kokosmilch, Brühe und Kurkuma in den Topf. Gut verrühren.",
      "Hähnchenwürfel oben auflegen.",
      "Start drücken. In den letzten 5 Minuten die Erbsen dazugeben.",
      "Alles gut durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn gart sicher durch)",
    swaps: "Hähnchen ↔ Weißfisch",
    side: "Ein Spritzer Limettensaft.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe+Kokos (Standardmenge)", notes: "Kurkuma färbt alles intensiv gelb." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Banana Split Oatmeal 🍌🍫",
    desc: "Ein Sonntags-Frühstück, das wie ein Dessert aussieht. Haferbrei mit Banane und Kakaonibs.",
    story: "Wir halbieren die Banane längs (wie beim Banana Split) und braten sie vielleicht sogar kurz an. Darunter cremiger Porridge. Ein Fest!",
    target: "≈75 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch 400 ml",
      "Banane 1 Stück",
      "Kakaonibs (oder dunkle Schokolade) 1 EL",
      "Joghurt 2 EL"
    ],
    steps: [
      "Haferflocken in Milch aufkochen, bis der Brei cremig ist.",
      "Banane längs halbieren (wer mag: in der Pfanne kurz anbraten).",
      "Oatmeal in Schüsseln geben, Bananenhälften darauflegen.",
      "Mit Joghurt und Kakaonibs garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓",
    swaps: "Kakaonibs ↔ Walnüsse",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Gnocchi Caprese (Pfanne)",
    desc: "Ein Blitz-Mittagessen: Gnocchi in der Pfanne angebraten mit Kirschtomaten und Mozzarella.",
    story: "Wenn sonntags die Lust zum Kochen fehlt: Gnocchi aus der Packung direkt in die Pfanne. Die Tomaten platzen auf und bilden mit dem Mozzarella eine Sauce.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Gnocchi 300 g",
      "Cherrytomaten 200 g",
      "Mozzarella (pasteurisiert) 100 g",
      "Olivenöl 1 EL",
      "Knoblauch 1 Zehe",
      "Basilikum"
    ],
    steps: [
      "Gnocchi in etwas Olivenöl anbraten, bis sie leicht Farbe bekommen.",
      "Knoblauch und ganze Cherrytomaten dazugeben. Braten, bis die Tomaten aufplatzen.",
      "Pfanne vom Herd nehmen. Mozzarella in Stücken unterheben, bis er zieht.",
      "Mit Basilikum servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse aus pasteurisierter Milch)",
    swaps: "Gnocchi ↔ Schupfnudeln",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Jambalaya (Reiskocher-Edition)",
    desc: "Südstaaten-Soulfood. Reis, Hühnchen, Wurst und Paprika garen in einer Cajun-Brühe.",
    story: "New Orleans Flair aus dem Reiskocher! Das Geheimnis sind Paprika, Tomatenmark und eine rauchige Wurst. Der Reis saugt diese Aromenwand komplett auf.",
    target: "≈84 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust (gewürfelt) 100 g",
      "Räucherwurst (Cabanossi, in Scheiben) 50 g",
      "Paprika (gewürfelt) 1 Stück",
      "Tomatenmark 1 EL",
      "Hühnerbrühe 240 ml"
    ],
    steps: [
      "Reis, Brühe, Tomatenmark und Paprika im Reiskocher gut mischen.",
      "Hähnchen und Wurstscheiben oben auflegen.",
      "Start drücken.",
      "Nach dem Kochen kräftig durchrühren. (Optional mit Paprika/Cajun-Gewürz nachschärfen)."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch/Wurst kocht auf >80°C sicher durch)",
    swaps: "Wurst ↔ Nur Hähnchen (für weniger Fett)",
    side: "Ein grüner Salat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Wurst gibt viel Geschmack und etwas Fett ab." },
  },
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Schweinefilet": { group: "Protein/Fisch/Tofu", label: "Schweinefilet", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweinegulasch": { group: "Protein/Fisch/Tofu", label: "Schweinegulasch", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack (mager)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch (Hotpot)", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Hähnchenhack": { group: "Protein/Fisch/Tofu", label: "Hähnchenhack", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Schinken": { group: "Protein/Fisch/Tofu", label: "Schinken", unitDefault: "g" },
  "Räucherwurst": { group: "Protein/Fisch/Tofu", label: "Räucherwurst/Cabanossi", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda / Käse", unitDefault: "g" },
  "Käse": { group: "Protein/Fisch/Tofu", label: "Geriebener Käse", unitDefault: "g" },
  "Mozzarella": { group: "Protein/Fisch/Tofu", label: "Mozzarella (pasteurisiert)", unitDefault: "g" },
  "Ricotta": { group: "Protein/Fisch/Tofu", label: "Ricotta", unitDefault: "g" },
  "Cottage Cheese": { group: "Protein/Fisch/Tofu", label: "Körniger Frischkäse", unitDefault: "g" },
  "Putenbrustaufschnitt": { group: "Protein/Fisch/Tofu", label: "Putenbrustaufschnitt", unitDefault: "Scheiben" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Schwarze Bohnen": { group: "Gemüse/Pilze", label: "Schwarze Bohnen", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Cherrytomaten": { group: "Gemüse/Pilze", label: "Cherrytomaten", unitDefault: "g" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "ml" },
  "Tomatenmark": { group: "Gemüse/Pilze", label: "Tomatenmark", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Banane": { group: "Gemüse/Pilze", label: "Banane", unitDefault: "Stück" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel-Püree", unitDefault: "g" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis", unitDefault: "g" },
  "Avocado": { group: "Gemüse/Pilze", label: "Avocado", unitDefault: "Stück" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Blaubeeren": { group: "Gemüse/Pilze", label: "Blaubeeren (TK)", unitDefault: "g" },
  "Beeren": { group: "Gemüse/Pilze", label: "Beeren (TK)", unitDefault: "g" },
  "Salat": { group: "Gemüse/Pilze", label: "Salat (gemischt)", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba-Nudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Süßkartoffel-Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Süßkartoffel-Gnocchi", unitDefault: "g" },
  "Glasnudeln": { group: "Reis/Nudeln/Sättigung", label: "Glasnudeln", unitDefault: "g" },
  "Quinoa": { group: "Reis/Nudeln/Sättigung", label: "Quinoa", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot / Vollkorn", unitDefault: "Scheiben" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Weichweizengrieß": { group: "Reis/Nudeln/Sättigung", label: "Grieß", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko", unitDefault: "g" },
  "Rote Linsen": { group: "Reis/Nudeln/Sättigung", label: "Rote Linsen", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Rinderbrühe": { group: "Algen/Brühen/Würze", label: "Rinderbrühe", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Kochsahne": { group: "Algen/Brühen/Würze", label: "Kochsahne", unitDefault: "ml" },
  "Kokosmilch": { group: "Algen/Brühen/Würze", label: "Kokosmilch", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Sriracha": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)", unitDefault: "TL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Erdnussbutter": { group: "Algen/Brühen/Würze", label: "Erdnussbutter", unitDefault: "EL" },
  "Schwarze Bohnensauce": { group: "Algen/Brühen/Würze", label: "Schwarze Bohnensauce", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Agave", unitDefault: "EL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Currypulver": { group: "Algen/Brühen/Würze", label: "Currypulver", unitDefault: "TL" },
  "Kurkuma": { group: "Algen/Brühen/Würze", label: "Kurkuma", unitDefault: "TL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Erdnüsse": { group: "Algen/Brühen/Würze", label: "Erdnüsse", unitDefault: "g" },
  "Kakaonibs": { group: "Algen/Brühen/Würze", label: "Kakaonibs", unitDefault: "EL" },
  "Backpulver": { group: "Algen/Brühen/Würze", label: "Backpulver", unitDefault: "TL" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Zehe|Prise|Stangen|Scheiben|TL|EL|Stk|Blatt)?/i);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.toLowerCase().includes(k.toLowerCase()));
      if (!key) {
        if (name.includes("Reis (roh)") || name.includes("Reis (gekocht)")) key = "Reis";
        else if (name.includes("Toast")) key = "Vollkorn-Toast";
        else if (name.includes("Feta") || name.includes("Käse")) key = "Feta";
        else if (name.includes("Pilze") || name.includes("Champignons")) key = "Champignons";
        else if (name.includes("Kohl")) key = "Weißkohl";
        else if (name.includes("Tomate")) key = "Tomate";
        else if (name.includes("Nudeln")) key = "Weizennudeln";
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
    <g font-family='sans-serif'>
      <text x='40' y='120' font-size='44' fill='#1F2937'>🍱 ${esc(title)}</text>
      <text x='40' y='180' font-size='20' fill='#374151'>Moving Kitchen Tales</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function ImageBanner({ meal, year = 2026, weekFolder = "kw16" }) {
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
    <div className="meal-card" style={cardPanelStyle} id={`meal-${meal.id}`}>
      <ImageBanner meal={meal} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3>
        <div>
          {meal.isViral ? viralChip() : null}
          {tagChip(meal.target)}
          {meal.riceCooker?.enabled ? tagChip("🍚 Reiskocher") : null}
          {meal.remind ? tagChip("💊 Metformin") : null}
        </div>
      </div>
      {meal.desc ? <p style={{ marginTop: 8, color: "var(--muted)", fontStyle: "italic" }}>{meal.desc}</p> : null}
      {meal.story ? <p style={{ marginTop: 4, color: "var(--text)", fontSize: "0.9em" }}>{meal.story}</p> : null}
      
      <h4>Zutaten (2 Personen)</h4>
      <ul>{meal.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      
      <h4>Zubereitung</h4>
      <ol>{meal.steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>
      
      <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--chip-bg)", borderRadius: 12 }}>
        <p style={{margin:"0 0 4px"}}><strong>Hinweise:</strong> {meal.checks}</p>
        <p style={{margin:"0 0 4px"}}><strong>Austausche:</strong> {meal.swaps}</p>
        <p style={{margin:0}}><strong>Beilage:</strong> {meal.side}</p>
      </div>

      {meal.riceCooker?.enabled ? (
        <div style={{ marginTop: 12 }}>
          <details>
            <summary style={{cursor:"pointer", fontWeight:600}}>Reiskocher-Details</summary>
            <ul style={{marginTop:8}}>
              <li><strong>Programm:</strong> {meal.riceCooker.program}</li>
              <li><strong>Wasser:</strong> {meal.riceCooker.water}</li>
              {meal.riceCooker.notes ? <li><strong>Info:</strong> {meal.riceCooker.notes}</li> : null}
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
        {dayName.replace(/\s*\(.+\)$/, "")} <span className="mkt-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {meals.map((m) => <MealCard key={m.id} meal={m} />)}
      </div>
    </section>
  );
}

function WeekOverview({ data, DAY_NAME_DE, meta }) {
  const byDay = useMemo(() => {
    const map = { mo: [], di: [], mi: [], do: [], fr: [], sa: [], so: [] };
    for (const r of data) map[r.id.split("-")[0]].push(r);
    return map;
  }, [data]);

  const pill = (meal) => {
    let icon = "🍽️";
    if (meal.riceCooker?.enabled) icon = "🍚";
    if (meal.isViral) icon = "🔥";
    
    return (
      <a
        key={meal.id}
        href={`#meal-${meal.id}`}
        onClick={scrollToId(`meal-${meal.id}`)}
        style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: 6, 
          padding: "6px 10px", 
          borderRadius: 999, 
          border: meal.isViral ? "1px solid #ff7e5f" : "1px solid var(--border)", 
          background: meal.isViral ? "linear-gradient(135deg, rgba(255,126,95,0.1), rgba(254,180,123,0.1))" : "var(--panel)", 
          textDecoration: "none", 
          color: "var(--text)", 
          boxShadow: "var(--shadow)", 
          fontSize: 13, 
          cursor: "pointer" 
        }}
      >
        {icon} <span>{meal.title.split(" (")[0]}</span>
      </a>
    );
  };

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ ...cardPanelStyle, background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="mkt-hero-inner" style={{ padding: 18, borderRadius: 12, marginBottom: 16, background: "var(--grad-hero)" }}>
          <h2 style={{ margin: 0 }}>
            Woche 16 – Übersicht <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Neue Virale Hacks 🔥 · Abwechslung pur · Reiskocher · Balanced</p>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {DAYS_ORDER.map((d) => (
            <div key={d} style={{ padding: 12, borderRadius: 12, border: "1px solid var(--border)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <strong>{DAY_NAME_DE[d]}</strong>
                <a 
                  href={`#day-${d}`} 
                  onClick={scrollToId(`day-${d}`)}
                  style={{ fontSize: 12, color: "var(--text)", textDecoration: "none", border: "1px solid var(--border)", padding: "4px 8px", borderRadius: 8, background: "var(--chip-bg)", cursor: "pointer" }}
                >
                  zum Tag ▿
                </a>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {byDay[d].map((m) => pill(m))}
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
    if (!data) return map; 
    for (const r of data) {
      const day = r.id.split("-")[0];
      if (r.riceCooker?.enabled && !map[day]) map[day] = r;
    }
    return map;
  }, [data]);

  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ borderBottom: "2px solid var(--border)", paddingBottom: 10, marginBottom: 20 }}>🍚 Reiskocher-Gerichte (Übersicht)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        {DAYS_ORDER.map((d) => {
          const r = perDay[d];
          return (
            <div key={d} style={{ ...cardPanelStyle }}>
              <h3 style={{ marginTop: 0, fontSize: 16 }}>
                {DAY_NAME_DE[d].split(" ")[0]} – {r ? r.title : "Kein Reiskocher-Gericht"}
              </h3>
              {r ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li><strong>Programm:</strong> {r.riceCooker.program}</li>
                  <li><strong>Wasser:</strong> {r.riceCooker.water}</li>
                  {r.riceCooker.notes ? <li><strong>Notiz:</strong> {r.riceCooker.notes}</li> : null}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Kung Pao Rice, Jambalaya, Golden Coconut Chicken.</p>
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
      <label className="mkt-switch" title={effectiveDark ? "Dunkel" : "Hell"}>
        <input type="checkbox" checked={effectiveDark} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} disabled={mode === "auto"} />
        <span className="mkt-slider" />
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------
// MAIN EXPORT
// -----------------------------------------------------------------------
export default function Woche16DE() {
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

  const Styles = () => (
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

      .mkt-exporting{ width:794px !important; max-width:794px !important; margin:0 auto !important; background:#fff !important; box-sizing:border-box !important; font-size:12pt !important; line-height:1.45 !important; --bg:#FFFFFF; --text:#111827; --panel:#FFFFFF; --border:rgba(0,0,0,.12); --muted:#374151; --chip-bg:#F3F4F6; --btn-border:rgba(0,0,0,.15); --btn-on-bg:#F3F4F6; }
      .mkt-exporting *{ box-shadow:none !important; }
      .mkt-exporting .mkt-art, .mkt-exporting img{ display:none !important; visibility:hidden !important; }
      .mkt-exporting .mkt-chip, .mkt-exporting .mkt-date-paren{ display:none !important; }

      @media print { .mkt-art, .mkt-date-paren{ display:none !important; visibility:hidden !important; } html, body, #root { background:#fff !important; } aside, nav, header, footer, .mkt-no-print { display:none !important; } #kochbuch-root { width: calc(210mm - 24mm); margin:0 auto !important; background:#fff !important; border:none !important; box-shadow:none !important; } .mkt-hero, .mkt-hero-inner { background:#fff !important; box-shadow:none !important; } .day-section, .meal-card { break-inside:avoid; page-break-inside:avoid; } h2, h3 { break-after:avoid; page-break-after:avoid; } #kochbuch-root * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } a[href]:after { content:""; } }
    `}</style>
  );

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", padding: 24 }}>
      <Styles />

      <div className="mkt-hero" style={{ ...cardPanelStyle, padding: 16, marginBottom: 18 }}>
        <div className="mkt-hero-inner" style={{ background: "var(--grad-hero)", borderRadius: 12, padding: 14, marginBottom: 12, display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0 }}>{UI_TITLES.main}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tagChip(`Start: ${meta.startDate}`)}
            {tagChip("Woche 16")}
            {tagChip("Neue Virale Trends & Wohlfühlküche")}
            {tagChip("Täglich 1× 🍚 Reiskocher")}
          </div>
        </div>

        <div className="mkt-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <fieldset className="mkt-segment" role="radiogroup" aria-label="Ansicht wählen">
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
            <button type="button" onClick={doPrint} className="mkt-tab"><span className="icon">🖨️</span> Drucken</button>
            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={DATA} DAY_NAME_DE={DAY_NAME_DE} meta={meta} />
        <div id="mkt-content" data-view={tab}>
          <section id="mkt-pane-kochbuch" aria-hidden={tab !== "kochbuch"} hidden={tab !== "kochbuch"}>
            {DAYS_ORDER.map((d) => (
              <DaySection key={d} dayKey={d} meals={DATA.filter(r => r.id.startsWith(d))} dayName={DAY_NAME_DE[d]} />
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