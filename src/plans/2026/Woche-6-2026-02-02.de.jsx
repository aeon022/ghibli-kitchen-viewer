// src/plans/2026/Woche-6-2026-02-02.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – Woche 6 (Start: 2026-02-02)
  Status: VOLLSTÄNDIG (1:1 Template-Kopie von Woche 5).
  Fokus: Virale Trends (CN/JP/KR) + SWE/IT, Balanced, Schwangerschaftssicher.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 6",
  startDate: "2026-02-02",
  id: "woche-6-2026-02-02",
  lang: "de",
  sidebar: "Woche 6 (2026-02-02)",
};

const FILE_BASE = "Woche 6 2026-02-02";

const UI_TITLES = {
  main: "Rezepte Woche 6",
  list: "Einkaufsliste Woche 6",
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
  padding: 24,
  boxShadow: "var(--shadow)",
  border: "1px solid var(--border)",
};

const tagChip = (text) => (
  <span className="ghk-chip" key={text} style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "var(--chip-bg)", border: "1px solid var(--border)", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    {text}
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-02-02)",
  di: "Dienstag (2026-02-03)",
  mi: "Mittwoch (2026-02-04)",
  do: "Donnerstag (2026-02-05)",
  fr: "Freitag (2026-02-06)",
  sa: "Samstag (2026-02-07)",
  so: "Sonntag (2026-02-08)",
};

// -----------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Havregrynsgröt (Schwedischer Apfel-Zimt-Haferbrei)",
    desc: "Wärmender Haferbrei mit geriebenem Apfel und Zimt. Wie eine Umarmung am Morgen.",
    story: "In Schweden ist dieser Brei ein nationales Heiligtum. Er wärmt von innen, hält lange satt und der Duft von Zimt am Morgen weckt selbst die müdesten Geister.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch (oder Sojamilch) 400 ml",
      "Apfel 1 Stück",
      "Zimt 1 TL",
      "Walnüsse (gehackt) 30 g",
      "Quark oder Joghurt (pasteurisiert) 100 g"
    ],
    steps: [
      "Haferflocken mit Milch und Zimt in einem Topf unter Rühren aufkochen, bis es andickt (ca. 5 Min).",
      "Apfel grob reiben und die Hälfte unter den Brei heben.",
      "Brei aufteilen, mit restlichem Apfel, Walnüssen und einem Klecks Joghurt/Quark toppen."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Komplexe KH & Nüsse) · Schwangerschaft ✓",
    swaps: "Walnüsse ↔ Mandeln; Apfel ↔ Birne",
    side: "Eine Tasse warmer Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Viral Baked Feta Pasta (Mild)",
    desc: "Der TikTok-Klassiker! Ein Block Feta schmilzt im Ofen mit Tomaten zu einer cremigen Sauce.",
    story: "Dieses Rezept hat in Finnland mal für einen Feta-Mangel im Supermarkt gesorgt! Wir machen es mild, mit wenig Knoblauch und viel Liebe. Simpel, genial, viral.",
    target: "≈85 g KH (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Vollkorn-Nudeln (trocken) 130 g",
      "Feta-Käse (pasteurisiert!) 150 g",
      "Kirschtomaten 250 g",
      "Olivenöl 1 EL",
      "Knoblauch 1 Zehe",
      "Basilikum (frisch oder getrocknet) 1 TL"
    ],
    steps: [
      "Tomaten, etwas Öl, Knoblauch in eine Auflaufform geben. Feta-Block in die Mitte setzen. Bei 200°C ca. 20-25 Min backen.",
      "Nudeln kochen.",
      "Form aus dem Ofen holen, Feta mit den Tomaten zu einer Sauce zerdrücken.",
      "Nudeln unterheben, mit Basilikum garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Feta erhitzt & aus pasteurisierter Milch) · Diabetes ✓",
    swaps: "Feta ↔ Frischkäse; Vollkorn-Nudeln ↔ Zucchini-Nudeln",
    side: "Ein kleiner grüner Salat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "KFC-Style Chicken Rice ケンタッキー炊き込みご飯",
    desc: "Saftiges Hähnchen, geschmort im Reiskocher. Inspiriert vom japanischen Weihnachts-Hype.",
    story: "In Japan geht man Weihnachten zu KFC. Daraus entstand der Trend, frittiertes Huhn mit Reis im Reiskocher zu kochen. Wir machen die gesündere Variante mit mariniertem Hühnchen, das im Dampf unglaublich zart wird.",
    target: "≈80 g KH (2 P.) · Protein ≈35 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenkeule (ohne Knochen) 250 g",
      "Hühnerbrühe 240 ml",
      "Sojasauce 2 EL",
      "Knoblauch (gerieben) 1 Zehe",
      "Karotte (gewürfelt) 50 g"
    ],
    steps: [
      "Hähnchen in etwas Sojasauce und Knoblauch wenden.",
      "Reis, Brühe, restliche Sojasauce und Karotten in den Reiskocher geben.",
      "Das Hähnchen oben auf den Reis legen.",
      "Programm starten. Danach Hähnchen zerkleinern und alles durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn gart im Dampf >75°C) · Diabetes ✓",
    swaps: "Hähnchenkeule ↔ Hähnchenbrust (wird aber etwas trockener)",
    side: "Gedämpfter Brokkoli.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe statt Wasser", notes: "Das Fett des Huhns aromatisiert den gesamten Reis." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Tomaten-Eier-Nudelsuppe 番茄鸡蛋面",
    desc: "Warme Nudelsuppe in einer samtigen Tomaten-Brühe. Ein chinesischer Trostspender.",
    story: "Diese Suppe ist die chinesische Antwort auf Hühnersuppe. Jeder hat seine eigene Version. Die Säure der Tomate macht wach, das Ei liefert weiche Proteine.",
    target: "≈75 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Weizennudeln 120 g",
      "Tomaten (groß, weich) 2 Stück",
      "Eier 3 Stück",
      "Gemüsebrühe 600 ml",
      "Frühlingszwiebel 10 g",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Tomaten würfeln und in einem Topf mit wenig Öl anbraten, bis sie musig werden.",
      "Brühe und Sojasauce angießen, aufkochen.",
      "Nudeln direkt in der Suppe garen. Wenn sie weich sind, die verquirlten Eier langsam einrühren (vollständig stocken lassen!).",
      "Mit Frühlingszwiebeln toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett gestockt) · Diabetes ✓",
    swaps: "Weizennudeln ↔ Reisnudeln",
    side: "Keine Beilage nötig, alles in einer Schüssel.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Wafu Pilz-Spaghetti 和風スパゲッティ",
    desc: "Spaghetti auf japanische Art: mit Pilzen, Sojasauce und einem Hauch Butter.",
    story: "'Wafu' bedeutet 'japanischer Stil'. Die Kombination aus Butter, Sojasauce und Pilzen erzeugt ein Umami-Feuerwerk, das besser ist als jede Sahnesauce!",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Spaghetti (Vollkorn) 130 g",
      "Shiitake oder Champignons 200 g",
      "Knoblauch 1 Zehe",
      "Sojasauce 2 EL",
      "Butter 15 g",
      "Nori (zerbröselt, sparsam)"
    ],
    steps: [
      "Spaghetti al dente kochen. Etwas Nudelwasser aufheben.",
      "Pilze und Knoblauch in einer Pfanne anbraten.",
      "Nudeln dazugeben, mit Sojasauce, Butter und Nudelwasser schwenken, bis es cremig wird.",
      "Mit wenig Nori garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Jod/Nori sparsam)",
    swaps: "Pilze ↔ Zucchini & Paprika",
    side: "Kleiner Tomatensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Kongnamul Bap 콩나물밥 (Sprossen-Reis)",
    desc: "Koreanischer Reiskocher-Klassiker mit Sojasprossen und Rinderhack.",
    story: "Ein nostalgisches Gericht aus Korea. Die Sprossen geben beim Kochen ihr nussiges Aroma an den Reis ab. Super gesund und komplett im Reiskocher gemacht.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Sojasprossen (frisch) 150 g",
      "Rinderhack (mager) 150 g",
      "Sojasauce 2 EL",
      "Sesamöl 1 EL",
      "Karotte (fein geraspelt) 50 g"
    ],
    steps: [
      "Hackfleisch mit 1 EL Sojasauce mischen und gut zerteilen.",
      "Reis waschen und mit Wasser in den Topf geben.",
      "Hack, Karotten und Sojasprossen als große Schicht oben drauflegen.",
      "Kochen. Danach mit Sesamöl und restlicher Sojasauce durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hackfleisch gut durchgegart im Topf)",
    swaps: "Rinderhack ↔ Räuchertofu",
    side: "Koreanische Pickles (mild).",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Etwas weniger als Standard (Sprossen wässern)", notes: "Fleisch vorher gut auseinanderzupfen." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Fluffiges Soufflé-Omelett (Fully Cooked!)",
    desc: "Wie eine Wolke! Getrennt aufgeschlagene Eier ergeben ein riesiges, leichtes Omelett.",
    story: "Ein Trend aus japanischen und koreanischen Cafés. Wir schlagen das Eiweiß steif. Wichtig: Wir decken die Pfanne ab, damit die 'Wolke' auch innen komplett durchgart!",
    target: "≈45 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Zucker 1 TL",
      "Salz 1 Prise",
      "Butter 10 g",
      "Toastbrot 2 Scheiben"
    ],
    steps: [
      "Eier trennen. Eiweiß mit Zucker steif schlagen. Eigelb mit Salz verrühren.",
      "Eigelb vorsichtig unter das Eiweiß heben.",
      "Butter in der Pfanne schmelzen, Masse hineingeben. Deckel drauf! Bei niedriger Hitze 6-8 Min komplett durchgaren lassen (darf nicht flüssig bleiben).",
      "Zusammenklappen und auf Toast servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Deckel ist Pflicht für durchgegartes Inneres!)",
    swaps: "Toast ↔ Schwarzbrot",
    side: "Frische Gurken-Sticks.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Cong You Ban Mian 葱油拌面 (Frühlingszwiebel-Nudeln)",
    desc: "Shanghaier Streetfood: Nudeln in einem aromatischen Öl aus gerösteten Frühlingszwiebeln.",
    story: "Gutes Essen braucht oft nur drei Zutaten. Frühlingszwiebeln werden langsam in Öl geröstet, bis sie knusprig sind. Das Öl wird zur magischen Sauce. Mild und unwiderstehlich.",
    target: "≈86 g KH (2 P.) · Protein ≈18 g p. P. (mit Beilage)",
    ingredients: [
      "Weizennudeln 130 g",
      "Frühlingszwiebeln (viel!) 100 g",
      "Speiseöl 2 EL",
      "Sojasauce (dunkel & hell) 2 EL",
      "Zucker 1 TL",
      "Gekochte Eier (hart) 2 Stück"
    ],
    steps: [
      "Frühlingszwiebeln (nur der grüne Teil, in Stücken) in Öl bei niedriger Hitze langsam braten, bis sie braun und knusprig sind (ca. 10 Min).",
      "Sojasauce und Zucker in die Pfanne geben, kurz aufkochen. Vom Herd nehmen.",
      "Nudeln kochen, abtropfen, mit dem Aroma-Öl mischen.",
      "Mit knusprigen Zwiebeln und hartgekochtem Ei servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier hartgekocht)",
    swaps: "Weizennudeln ↔ Zucchini-Nudeln Mix für weniger KH",
    side: "Edamame für extra Protein.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Tomaten-Feta-Risotto (Reiskocher)",
    desc: "Eine mediterrane Fusion: Cremiger Reis, gekocht mit ganzen Tomaten und Käse.",
    story: "Der 'Whole Tomato Rice'-Trend aus Asien trifft auf das italienische Risotto. Der Reiskocher übernimmt das lästige Rühren. Feta schmilzt am Ende herrlich ein.",
    target: "≈84 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Vollkorn-Risottoreis oder Normalreis 120 g",
      "Tomate (groß, reif) 1 Stück",
      "Feta-Käse (pasteurisiert) 100 g",
      "Gemüsebrühe 240 ml",
      "Knoblauch 1 Zehe",
      "Erbsen (TK) 50 g"
    ],
    steps: [
      "Reis, Brühe, Knoblauch und Erbsen in den Reiskocher geben.",
      "Die ganze Tomate (Strunk entfernt) in die Mitte setzen.",
      "Kochen. Nach dem Kochen den Feta zerbröselt dazugeben.",
      "Tomate zerdrücken und alles zu einem cremigen Risotto verrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert) · Diabetes ✓",
    swaps: "Feta ↔ Mozzarella",
    side: "Hähnchenbruststreifen (gebraten) für extra Protein.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (etwas weniger wegen der Tomate)", notes: "Risotto-Konsistenz ohne Rühren!" },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Goguma Latte 고구마 라떼 (Süßkartoffel-Latte)",
    desc: "Warmes, koreanisches Frühstücksgetränk aus pürierter Süßkartoffel und Milch.",
    story: "In koreanischen Cafés der Hit. Es ist eigentlich eine Art süße, cremige Suppe zum Trinken. Wahnsinnig sättigend und reich an guten Kohlenhydraten.",
    target: "≈68 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Süßkartoffel (gekocht/gedämpft) 200 g",
      "Milch (oder Hafermilch) 400 ml",
      "Honig 1 TL",
      "Vollkorn-Toast 2 Scheiben",
      "Frischkäse 2 EL"
    ],
    steps: [
      "Gekochte Süßkartoffel mit heißer Milch und Honig in einem Mixer oder mit dem Pürierstab cremig pürieren.",
      "In Tassen füllen.",
      "Dazu Vollkorntoast mit Frischkäse."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓",
    swaps: "Süßkartoffel ↔ Kürbis",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Köttbullar Express (Schwedische Hackbällchen)",
    desc: "Schnelle schwedische Fleischbällchen mit Erbsen und Kartoffelpüree.",
    story: "Grüße aus dem schwedischen Möbelhaus! Wir machen eine schnelle, unkomplizierte Version, die sicherstellt, dass das Fleisch gut durchgart.",
    target: "≈85 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Rinderhackfleisch 200 g",
      "Paniermehl 20 g",
      "Milch 30 ml",
      "Kartoffeln 300 g",
      "Erbsen (TK) 100 g",
      "Gemüsebrühe & etwas Mehl (für die Sauce)"
    ],
    steps: [
      "Kartoffeln kochen und zu Püree stampfen.",
      "Paniermehl in Milch einweichen, mit Hack mischen. Kleine Bällchen formen.",
      "Bällchen in der Pfanne rundum gut durchbraten (wichtig!).",
      "Bällchen raus, Mehl ins Bratfett, mit Brühe ablöschen = Sauce. Erbsen in der Sauce erwärmen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleischbällchen KOMPLETT durchbraten!)",
    swaps: "Rinderhack ↔ Vegane Hack-Alternative",
    side: "Preiselbeermarmelade (wenig).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Kohl & Hähnchen Reiskocher-Topf",
    desc: "Ein herrlich saftiges One-Pot-Gericht. Der Kohl wird butterweich.",
    story: "Eine Adaption des chinesischen Cabbage Rice. Der Kohl verliert beim Kochen sein Volumen und gibt dem Reis eine unglaubliche Süße.",
    target: "≈82 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Weißkohl oder Spitzkohl 200 g",
      "Hähnchenbrust 200 g",
      "Sojasauce 2 EL",
      "Knoblauch 1 Zehe",
      "Sesamöl 1 TL"
    ],
    steps: [
      "Hähnchen in Würfel schneiden, mit Sojasauce und Knoblauch mischen.",
      "Kohl in grobe Stücke schneiden.",
      "Reis und Wasser in den Topf. Erst das Hähnchen, dann den ganzen Kohlberg darauf stapeln (er fällt zusammen!).",
      "Kochen, am Ende Sesamöl unterrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn gart sicher mit)",
    swaps: "Huhn ↔ Geräucherter Tofu",
    side: "Klare Pilzbrühe.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Standard (Kohl gibt Wasser ab)", notes: "Kohlberg sieht riesig aus, schrumpft aber." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Spinat-Parmesan Frittata",
    desc: "Eine dicke, italienische Omelett-Torte aus der Pfanne.",
    story: "In Italien isst man Frittata warm, kalt, im Brötchen... überall! Der Trick ist, sie bei geringer Hitze mit Deckel zu braten, damit sie stockt, ohne unten anzubrennen.",
    target: "≈45 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Spinat (frisch) 150 g",
      "Parmesan (pasteurisiert, gerieben) 30 g",
      "Tomaten 100 g",
      "Vollkornbrot 2 Scheiben"
    ],
    steps: [
      "Spinat in der Pfanne kurz zusammenfallen lassen. Tomatenwürfel dazu.",
      "Eier mit Parmesan verquirlen, über das Gemüse gießen.",
      "Deckel drauf! Bei niedriger Hitze ca. 10 Min stocken lassen (muss komplett fest sein).",
      "In Tortenstücke schneiden, mit Brot servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier voll gestockt, Parmesan ist Hartkäse/pasteurisiert) · Diabetes ✓",
    swaps: "Spinat ↔ Zucchini",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Gungjung Tteokbokki (Mild, Soja-Basis) 궁중 떡볶이",
    desc: "Königliche Reiskuchen: Nicht scharf und rot, sondern mild und herzhaft mit Rind.",
    story: "Bevor Chili nach Korea kam, aßen die Könige ihre Reiskuchen (Tteok) genau so: In einer edlen Soja-Sesam-Sauce mit Gemüse und Rindfleisch. Super lecker!",
    target: "≈85 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Tteokbokki (koreanische Reiskuchen) 200 g",
      "Rindfleisch (in Streifen) 100 g",
      "Paprika & Karotte 100 g",
      "Sojasauce 2 EL",
      "Honig 1 TL",
      "Sesamöl 1 EL"
    ],
    steps: [
      "Reiskuchen in warmem Wasser 10 Min einweichen.",
      "Rindfleisch und Gemüse in der Pfanne anbraten.",
      "Reiskuchen und Marinade (Soja, Honig, Sesamöl, etwas Wasser) dazugeben.",
      "Köcheln lassen, bis die Reiskuchen weich und die Sauce klebrig ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Rind gut durchbraten)",
    swaps: "Rind ↔ Hähnchen; Reiskuchen ↔ Gnocchi (wäre dann italienisch!)",
    side: "Gurken-Sticks.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Ebi-Mayo Rice エビマヨご飯 (Reiskocher)",
    desc: "Garnelen garen auf dem Reis und werden danach mit etwas Mayo verfeinert.",
    story: "Ebi Mayo ist ein beliebtes Gericht in Japan (Garnelen in Mayo). Wir machen eine Reiskocher-Version. Die Mayo rühren wir erst am Ende unter den heißen Reis, das macht ihn super cremig.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (geschält, TK aufgetaut) 200 g",
      "Brokkoli-Röschen 100 g",
      "Sojasauce 1 EL",
      "Mayonnaise (aus Tube, pasteurisiert!) 1 EL",
      "Brühe"
    ],
    steps: [
      "Reis, Brühe und Sojasauce in den Topf.",
      "Garnelen oben drauf.",
      "Kochen. 10 Min vor Ende Brokkoli schnell oben drauflegen.",
      "Wenn fertig: Mayo dazugeben und vorsichtig untermischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Mayo MUSS aus industrieller Herstellung sein = pasteurisiert. Keine frische Hausmayo!)",
    swaps: "Garnelen ↔ Lachs",
    side: "-",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Standard", notes: "Brokkoli nicht von Anfang an mitkochen, sonst wird er braun." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Matcha Pancakes",
    desc: "Grüne, fluffige Pfannkuchen mit einem Hauch von herbem Grüntee.",
    story: "Ein Café-Hit in Kyoto! Der Matcha sorgt für eine tolle Farbe und gleicht die Süße perfekt aus. Keine Angst, komplett durchgebacken.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Mehl 120 g",
      "Matcha-Pulver 1 TL",
      "Backpulver 1 TL",
      "Eier 2 Stück",
      "Milch 100 ml",
      "Joghurt (pasteurisiert) 100 g"
    ],
    steps: [
      "Mehl, Matcha, Backpulver mischen.",
      "Eier und Milch verquirlen, zu den trockenen Zutaten geben.",
      "In einer beschichteten Pfanne kleine Pancakes von beiden Seiten durchbacken.",
      "Mit einem Klecks Joghurt servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Pancakes komplett durchgaren)",
    swaps: "Matcha ↔ Kakaopulver",
    side: "Frische Früchte.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Italienische Minestrone (Mild)",
    desc: "Dicker, herzhafter Gemüseeintopf mit kleinen Nudeln und Bohnen.",
    story: "Die beste Art, den Kühlschrank leer zu machen. In Italien wird oft noch die harte Rinde vom Parmesan mitgekocht, das gibt mega Geschmack!",
    target: "≈80 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Suppennudeln 80 g",
      "Weiße Bohnen (Dose, gewaschen) 100 g",
      "Zucchini, Karotte, Sellerie 200 g",
      "Tomaten passiert 200 ml",
      "Gemüsebrühe 500 ml",
      "Parmesan 20 g"
    ],
    steps: [
      "Gemüse klein würfeln und leicht andünsten.",
      "Mit Tomaten und Brühe ablöschen, 15 Min köcheln.",
      "Bohnen und Nudeln dazugeben, kochen bis die Nudeln al dente sind.",
      "Mit Parmesan bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (alles gekocht) · Diabetes ✓",
    swaps: "Nudeln ↔ Vollkornreis",
    side: "Eine Scheibe Vollkornbrot.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Lachs-Dill Nordic Rice (Reiskocher)",
    desc: "Schwedisch inspirierter Reiskocher-Topf mit Lachs, Dill und Erbsen.",
    story: "Eine Crossover-Episode: Skandinavische Aromen treffen auf japanische Technik. Der Dill gibt dem Reis eine unglaubliche Frische.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Erbsen (TK) 80 g",
      "Dill (frisch, viel!) 1 Bund",
      "Zitrone (nur etwas Saft) 1 TL",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis und Brühe in den Topf.",
      "Lachs und Erbsen oben auflegen.",
      "Kochen. Nach dem Öffnen den gehackten Dill und Zitronensaft zugeben.",
      "Lachs zerteilen und alles gut mischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart im Topf durch)",
    swaps: "Lachs ↔ Forellenfilet",
    side: "Knackiger Karottensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe Standard", notes: "Dill nicht mitkochen, erst am Ende rein!" },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Shredded Chicken Congee 鸡丝粥",
    desc: "Wohlig warmer Reisbrei mit gezupftem Hühnchen und einem hartgekochten Ei.",
    story: "In Guangdong isst man 'Century Egg & Pork' Congee. Da fermentierte Tausendjährige Eier in der Schwangerschaft riskant sein können, nehmen wir saftiges Huhn und ein normales, hartgekochtes Ei.",
    target: "≈70 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 80 g",
      "Hühnerbrühe 800 ml",
      "Hühnerbrust 150 g",
      "Eier (hartgekocht) 2 Stück",
      "Frühlingszwiebel 10 g",
      "Ingwer (feine Streifen) 5 g"
    ],
    steps: [
      "Reis waschen. In Brühe mit Ingwer ca. 45-60 Min zu Brei einköcheln.",
      "Hühnerbrust in den letzten 15 Min im Brei pochieren. Rausnehmen, mit Gabel zerzupfen, wieder rein.",
      "Mit gevierteltem hartgekochtem Ei und Frühlingszwiebeln servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei hartgekocht, Huhn durch) · Diabetes ✓",
    swaps: "Huhn ↔ Weißfisch",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Viral Folded Gimbap 접는 김밥",
    desc: "Tortilla-Trick auf Koreanisch: Ein Nori-Blatt vierteln, belegen und zuklappen.",
    story: "Erinnerst du dich an den TikTok Tortilla-Hack? In Korea macht man das mit Nori-Blättern. Wir nehmen eine große Reisplatte, Omelett und Schinken. Achtung: In der Schwangerschaft Nori nur in Maßen!",
    target: "≈75 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Nori-Blätter 2 Stück",
      "Reis (gekocht) 150 g",
      "Eier 2 Stück",
      "Spam oder Kochschinken 80 g",
      "Karotte (geraspelt & gebraten) 50 g",
      "Sesamöl"
    ],
    steps: [
      "Ei zu einem flachen Omelett braten, vierteln. Schinken anbraten.",
      "Nori-Blatt von unten bis zur Mitte einschneiden.",
      "Reis, Omelett, Schinken, Karotte auf die 4 Viertel verteilen.",
      "Im Uhrzeigersinn zusammenklappen. Zu einem handlichen Dreieck essen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schinken/Spam erhitzen! Nori maßvoll)",
    swaps: "Spam ↔ Tofu-Scheiben gebraten",
    side: "Miso-Suppe.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Viral Camembert Rice (Reiskocher)",
    desc: "Ein ganzer Camembert schmilzt im Reiskocher über dem Reis. Absurd lecker.",
    story: "Das japanische Internet ist verrückt danach. Sobald man den Deckel öffnet, zerfließt der Käse in den heißen Reis, verfeinert mit Sojasauce und Speck. Wir stellen sicher, dass der Käse pasteurisiert ist!",
    target: "≈82 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Camembert (zwingend PASTEURISIERT!) 1 Stück (ca. 120g)",
      "Schinkenwürfel oder Bacon (roh) 50 g",
      "Sojasauce 1 EL",
      "Schwarzer Pfeffer",
      "Wasser"
    ],
    steps: [
      "Reis und Wasser (etwas weniger) in den Topf. Sojasauce einrühren.",
      "Den ganzen Camembert in die Mitte setzen. Schinkenwürfel außen herum.",
      "Kochen. Nach dem Öffnen Pfeffer drüber und den geschmolzenen Käse unter den Reis rühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (NUR Käse aus pasteurisierter Milch verwenden! Speck wird im Topf durchgegart) · Diabetes ✓",
    swaps: "Schinken ↔ Räuchertofu",
    side: "Ein großer, saurer Beilagensalat (balanciert das Fett).",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Etwas weniger als Normal", notes: "Achtung: Etikett vom Käse checken (pasteurisiert!)." },
  },
];

// -----------------------------------------------------------------------
// Shopping List
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule (o. Knochen)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch (Streifen)", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Tarako": { group: "Protein/Fisch/Tofu", label: "Kabeljaurogen / Fisch", unitDefault: "g" },
  "Schinkenwürfel": { group: "Protein/Fisch/Tofu", label: "Schinkenwürfel/Bacon", unitDefault: "g" },
  "Spam": { group: "Protein/Fisch/Tofu", label: "Spam/Kochschinken", unitDefault: "g" },
  "Inari-Age": { group: "Protein/Fisch/Tofu", label: "Inari-Age (Tofutaschen)", unitDefault: "Stk" },
  "Aburaage": { group: "Protein/Fisch/Tofu", label: "Aburaage (Fritt. Tofu)", unitDefault: "Stk" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Camembert": { group: "Protein/Fisch/Tofu", label: "Camembert (pasteurisiert)", unitDefault: "Stk" },
  "Feta-Käse": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark/Joghurt", unitDefault: "g" },

  // Gemüse
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl/Chinakohl", unitDefault: "g" },
  "Kohl": { group: "Gemüse/Pilze", label: "Kohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Sojasprossen": { group: "Gemüse/Pilze", label: "Sojasprossen", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Pilze (Shiitake/Champignons)", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini/Sellerie", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Kirschtomaten": { group: "Gemüse/Pilze", label: "Kirschtomaten", unitDefault: "g" },
  "Tomaten passiert": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "ml" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stk" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis", unitDefault: "g" },
  "Vollkorn-Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Spaghetti": { group: "Reis/Nudeln/Sättigung", label: "Spaghetti", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Chow Mein Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Mie-Nudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Suppennudeln": { group: "Reis/Nudeln/Sättigung", label: "Suppennudeln", unitDefault: "g" },
  "Tteokbokki": { group: "Reis/Nudeln/Sättigung", label: "Reiskuchen (Tteok)", unitDefault: "g" },
  "Kartoffeln": { group: "Reis/Nudeln/Sättigung", label: "Kartoffeln", unitDefault: "g" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "g" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot / Vollkorn", unitDefault: "Scheiben" },
  "Paniermehl": { group: "Reis/Nudeln/Sättigung", label: "Paniermehl/Panko", unitDefault: "g" },
  "Weiße Bohnen": { group: "Reis/Nudeln/Sättigung", label: "Weiße Bohnen (Dose)", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "ml" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "ml" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "ml" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "ml" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Sesam": { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "g" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayonnaise (Tube)", unitDefault: "EL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter/Brösel", unitDefault: "Stk" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "TL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "g" },
  "Curry-Roux": { group: "Algen/Brühen/Würze", label: "Curry-Roux", unitDefault: "Stk" },
  "Char Siu Sauce": { group: "Algen/Brühen/Würze", label: "Char Siu Sauce", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
};

function aggregateList(data, canon) {
  const totals = {};
  for (const r of data) {
    for (const ing of r.ingredients) {
      const m = String(ing).match(/^(.*)\s(\d+[\.,]?\d*)\s?(g|ml|Stück|Zehe|Prise|Stangen|Scheiben|TL|EL|Stk)?/i);
      if (!m) continue;
      let name = m[1].trim();
      const qty = parseFloat(m[2].replace(",", "."));
      const unit = m[3] || "";
      
      let key = Object.keys(canon).find((k) => name.toLowerCase().includes(k.toLowerCase()));
      if (!key) {
        if (name.includes("Reis (roh)")) key = "Reis";
        else if (name.includes("Feta")) key = "Feta";
        else if (name.includes("Pilze")) key = "Shiitake";
        else if (name.includes("Kohl")) key = "Weißkohl";
        else if (name.includes("Tomate")) key = "Tomate";
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
// Components (Internal)
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw6" }) {
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><button onClick={() => toggleBookmark({ planSlug: meta.id, recipeId: meal.id, recipeTitle: meal.title, planTitle: meta.title })} style={{ background: bookmarked ? "var(--accent, #e07a9a)" : "transparent", border: "1px solid var(--border, rgba(0,0,0,.1))", borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", color: bookmarked ? "#fff" : "var(--text, #111827)" }} title={bookmarked ? "Bookmark entfernen" : "Bookmark setzen"}>{bookmarked ? "★" : "☆"}</button><h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3></div>
        <div>
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
        {dayName.replace(/\s*\(.+\)$/, "")} <span className="ghk-date-paren" style={{fontSize:"0.7em", color:"var(--muted)", fontWeight:400}}>{dayName.match(/\(.+\)$/)?.[0] ?? ""}</span>
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
            Woche 6 – Übersicht <span className="ghk-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Virale Trends (CN/JP/KR) + SWE/IT · Balanced · Schwangerschaftssicher · 1× Reiskocher/Tag</p>
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
                {byDay[d].map((m) => pill(m.id, m.title.replace(/ – .*$/, ""), `meal-${m.id}`, !!m.riceCooker?.enabled))}
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Trends dabei: Kinoko Gohan, Miso-Butter-Lachs, Hainan Chicken, Kohl-Hähnchen, Ebi-Mayo, Lachs-Dill Nordic Rice, Camembert Rice.</p>
    </section>
  );
}

// PDF Export (nur noch Drucken Funktion, keine Buttons mehr in der UI)
const doPrint = () => window.print();

// Theme Switch Component
function ThemeSwitch({ mode, setMode, effectiveDark }) {
  return (
    <div className="ghk-theme-switch" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: 6, border: "1px solid var(--btn-border)", borderRadius: 999, background: "var(--panel)" }}>
      <button type="button" className="ghk-tab" aria-pressed={mode === "auto"} onClick={() => setMode(mode === "auto" ? (effectiveDark ? "dark" : "light") : "auto")} style={{ padding: "6px 10px" }}>Auto</button>
      <label className="ghk-switch" title={effectiveDark ? "Dunkel" : "Hell"}>
        <input type="checkbox" checked={effectiveDark} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} disabled={mode === "auto"} />
        <span className="ghk-slider" />
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------
// MAIN EXPORT
// -----------------------------------------------------------------------
export default function Woche6DE() {
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
            {tagChip(`Start: ${meta.startDate}`)}
            {tagChip("Woche 6")}
            {tagChip("Virale Trends & Wohlfühlküche")}
            {tagChip("Täglich 1× 🍚 Reiskocher")}
          </div>
        </div>

        <div className="ghk-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <fieldset className="ghk-segment" role="radiogroup" aria-label="Ansicht wählen">
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
            <button type="button" onClick={doPrint} className="ghk-tab"><span className="icon">🖨️</span> Drucken</button>
            <ThemeSwitch mode={mode} setMode={setMode} effectiveDark={effectiveDark} />
          </div>
        </div>
      </div>

      <div id="kochbuch-root" style={{ ...cardPanelStyle }}>
        <WeekOverview data={DATA} DAY_NAME_DE={DAY_NAME_DE} meta={meta} />
        <div id="ghk-content" data-view={tab}>
          <section id="ghk-pane-kochbuch" aria-hidden={tab !== "kochbuch"} hidden={tab !== "kochbuch"}>
            {DAYS_ORDER.map((d) => (
              <DaySection key={d} dayKey={d} meals={DATA.filter(r => r.id.startsWith(d))} dayName={DAY_NAME_DE[d]} />
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