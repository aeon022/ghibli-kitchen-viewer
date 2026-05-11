// src/plans/2026/Woche-10-2026-03-02.de.jsx
import { useBookmarks } from "@/hooks/useBookmarks";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – Woche 10 (Start: 2026-03-02)
  Status: KOMPLETT & FUNKTIONSFÄHIG (Alle 21 Rezepte)
  Fokus: Virale Airfryer-Hacks, Udon-Trends, Reiskocher-Magie, CN/JP/KR + EU.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 10",
  startDate: "2026-03-02",
  id: "woche-10-2026-03-02",
  lang: "de",
  sidebar: "Woche 10 (2026-03-02)",
};

const FILE_BASE = "Woche 10 2026-03-02";

const UI_TITLES = {
  main: "Rezepte Woche 10",
  list: "Einkaufsliste Woche 10",
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

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-03-02)",
  di: "Dienstag (2026-03-03)",
  mi: "Mittwoch (2026-03-04)",
  do: "Donnerstag (2026-03-05)",
  fr: "Freitag (2026-03-06)",
  sa: "Samstag (2026-03-07)",
  so: "Sonntag (2026-03-08)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Airfryer Baked Oatmeal 烤燕麦",
    desc: "Wie ein kleiner Kuchen zum Frühstück. Haferflocken, Apfel und Zimt aus dem Airfryer.",
    story: "Ein riesiger Internet-Trend! Haferflocken werden mit etwas Milch und Backpulver vermischt und gebacken. Außen knusprig, innen wie ein warmer Muffin. Perfekt für kalte Morgen.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch 150 ml",
      "Apfel (gewürfelt) 1 Stück",
      "Eier 2 Stück",
      "Backpulver 1 TL",
      "Zimt 1 TL"
    ],
    steps: [
      "Alle Zutaten in einer Schüssel gut verrühren.",
      "In eine kleine, ofenfeste (bzw. airfryer-geeignete) Form füllen.",
      "Im Airfryer bei 170°C für ca. 12-15 Minuten backen, bis es aufgeht und durchgestockt ist."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Komplexe KH) · Schwangerschaft ✓ (Eier komplett durchgebacken)",
    swaps: "Apfel ↔ Beeren (TK)",
    side: "Ein Klecks Naturjoghurt.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Udon Cacio e Pepe",
    desc: "Die dicken japanischen Nudeln treffen auf den italienischen Käse-Pfeffer-Klassiker.",
    story: "Eine geniale Fusion. Die Stärke der dicken Udon-Nudeln bindet den Parmesan im Handumdrehen zu einer unfassbar cremigen Sauce. Ganz ohne Sahne!",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Udon-Nudeln (vorgegart) 400 g",
      "Parmesan (pasteurisiert, fein gerieben) 50 g",
      "Butter 20 g",
      "Schwarzer Pfeffer (frisch gemahlen) 1 TL",
      "Edamame (geschält) 50 g"
    ],
    steps: [
      "Udon in wenig Wasser kurz kochen, Wasser auffangen.",
      "Butter in einer Pfanne schmelzen, Pfeffer darin anrösten.",
      "Nudeln und etwas Nudelwasser in die Pfanne geben.",
      "Hitze reduzieren, Parmesan schrittweise einrühren bis es cremig wird. Edamame unterheben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse ist pasteurisiert/Hartkäse) · Diabetes ✓",
    swaps: "Udon ↔ Spaghetti",
    side: "Tomatensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Hainan-Style Lachs 海南三文鱼 (Reiskocher)",
    desc: "Lachsfilet gart schonend im Ingwer-Reis und übernimmt die Aromen von Knoblauch und Soja.",
    story: "Eine Abwandlung des berühmten Hainan Chicken. Der Fisch gart im Dampf des Reises unglaublich sanft, während der Ingwer den Reis aromatisiert. Super gesund!",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Ingwer (fein gehackt) 15 g",
      "Knoblauch 2 Zehen",
      "Hühnerbrühe 240 ml",
      "Pak Choi 150 g"
    ],
    steps: [
      "Reis mit Brühe, Knoblauch und der Hälfte des Ingwers in den Reiskocher geben.",
      "Lachs mit restlichem Ingwer belegen und auf den Reis setzen.",
      "Reiskocher starten. Pak Choi in den letzten 5 Minuten in den Dämpfaufsatz legen.",
      "Mit etwas Sojasauce beträufeln und servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart im Topf >80°C sicher durch)",
    swaps: "Lachs ↔ Kabeljau",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Fisch gibt noch Feuchtigkeit ab." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Warmer Seidentofu (Douhua) 豆花",
    desc: "Samtig weicher Tofu, warm serviert mit einer herzhaften Soja-Sesam-Sauce.",
    story: "Das klassische Straßen-Frühstück in China und Taiwan. Es gleitet wärmend den Hals hinunter und ist in 3 Minuten fertig. Ein purer Magenschmeichler.",
    target: "≈60 g KH (2 P.) · Protein ≈18 g p. P. (mit Brot)",
    ingredients: [
      "Seidentofu 300 g",
      "Sojasauce 2 EL",
      "Sesamöl 1 TL",
      "Frühlingszwiebel 10 g",
      "Vollkornbrot 4 Scheiben",
      "Getrocknete Mini-Garnelen (optional) 1 TL"
    ],
    steps: [
      "Seidentofu vorsichtig in eine Schüssel geben und 2 Minuten in der Mikrowelle oder im Wasserbad wärmen.",
      "Überschüssiges Wasser abgießen.",
      "Sojasauce und Sesamöl darüber träufeln. Mit Frühlingszwiebeln und (optional) Garnelen toppen.",
      "Dazu geröstetes Vollkornbrot essen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen müssen gut erhitzt/getrocknet sein)",
    swaps: "Vollkornbrot ↔ Reis",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Airfryer Pyttipanna (Schwedische Pfanne)",
    desc: "Der schwedische Resteklassiker. Kartoffeln, Rinderhack-Bällchen und Zwiebeln aus der Heißluftfritteuse.",
    story: "Pyttipanna bedeutet 'Kleines in der Pfanne'. Im Airfryer werden die Kartoffeln perfekt knusprig und das Hackfleisch brät sich von ganz alleine sicher durch.",
    target: "≈85 g KH (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Kartoffeln (gewürfelt) 300 g",
      "Rinderhack (mager, in kleinen Bällchen) 150 g",
      "Zwiebel (grob gehackt) 1 Stück",
      "Olivenöl 1 EL",
      "Spiegelei (Eier) 2 Stück"
    ],
    steps: [
      "Kartoffelwürfel mit Öl und Gewürzen mischen. Im Airfryer bei 200°C 10 Min backen.",
      "Hackbällchen und Zwiebeln dazugeben, weitere 10 Min backen (bis das Fleisch komplett durch ist).",
      "In der Zwischenzeit Eier in der Pfanne braten (Eigelb vollständig stocken lassen!).",
      "Ei auf die Kartoffel-Fleisch-Mischung legen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch und Ei komplett durchgaren)",
    swaps: "Rinderhack ↔ Veganes Hack",
    side: "Eingelegte Rote Bete oder Gurken.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Nan Gua Fan 南瓜饭 (Kürbis-Schwein-Reis)",
    desc: "Kürbis und Schweinehack dämpfen zusammen im Reiskocher. Ein süß-herzhafter Traum.",
    story: "Ein Wohlfühlessen aus Südchina. Der Kürbis zerfällt fast und hüllt jedes Reiskorn in ein cremiges, süßliches Gold.",
    target: "≈80 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Kürbis (z.B. Hokkaido, gewürfelt) 150 g",
      "Schweinehack (mager) 150 g",
      "Sojasauce 2 EL",
      "Knoblauch 1 Zehe",
      "Wasser"
    ],
    steps: [
      "Schweinehack kurz mit Sojasauce und Knoblauch vermengen.",
      "Reis waschen, in den Topf geben und Wasser (minimal weniger als normal) hinzufügen.",
      "Hackfleisch (zerpflückt!) und Kürbis auf dem Reis verteilen.",
      "Start drücken. Danach alles sorgfältig durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hack gart im Topf sicher durch) · Diabetes ✓",
    swaps: "Schweinehack ↔ Hähnchenhack",
    side: "Miso-Suppe.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Etwas weniger als normal", notes: "Kürbis gibt Wasser ab." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Bánh Tráng Nướng (Reispapier-Pizza)",
    desc: "Vietnamesisches Streetfood aus dem Airfryer. Reispapier, Ei und Frühlingszwiebeln knusprig gebacken.",
    story: "Auf den Straßen Vietnams wird dieses 'Pizza' auf dem Grill gemacht. Im Airfryer plustert sich das Reispapier herrlich auf und das Ei stockt rasend schnell. Ein genialer Trend!",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reispapier 4 Blatt",
      "Eier 2 Stück",
      "Frühlingszwiebeln 20 g",
      "Reibekäse (pasteurisiert) 30 g",
      "Süße Chilisauce 1 EL",
      "Vollkorn-Toast (als Beilage) 2 Scheiben"
    ],
    steps: [
      "Ein Reispapier in den Airfryer legen. Ein halbes, verquirltes Ei mit Frühlingszwiebeln darauf verstreichen.",
      "Käse darüber streuen.",
      "Bei 180°C ca. 4-5 Minuten backen, bis das Ei vollkommen fest und der Rand knusprig ist.",
      "Falten, mit Chilisauce toppen. Toast dazu."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durch, Käse pasteurisiert)",
    swaps: "Käse ↔ Schinkenwürfel",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Gnocchi mit Edamame-Pesto",
    desc: "Proteinreiches Fusions-Pesto aus japanischen Edamame, serviert mit italienischen Gnocchi.",
    story: "Edamame haben extrem viel Protein. Püriert mit etwas Knoblauch und Öl ergeben sie ein cremiges Pesto, das leuchtend grün ist und fantastisch satt macht.",
    target: "≈85 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Gnocchi 300 g",
      "Edamame (geschält, TK) 150 g",
      "Knoblauch 1 Zehe",
      "Olivenöl 2 EL",
      "Zitronensaft 1 EL",
      "Parmesan 20 g"
    ],
    steps: [
      "Edamame in kochendem Wasser 3 Min weich kochen.",
      "Edamame mit Knoblauch, Öl, Zitrone und etwas Nudelwasser im Mixer pürieren.",
      "Gnocchi kochen, bis sie aufsteigen.",
      "Gnocchi in der Edamame-Sauce schwenken und mit Parmesan bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓ (Gute Fette und Proteine)",
    swaps: "Gnocchi ↔ Vollkorn-Penne",
    side: "Tomatensalat.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Tomate & Mozzarella Risotto (Reiskocher)",
    desc: "Der asiatische 'Whole Tomato'-Trend trifft auf Italien. Kein Rühren nötig!",
    story: "Die Tomate schmilzt beim Kochen, und zusammen mit dem Käse entsteht am Ende ein cremiges Risotto. Absolut narrensicher.",
    target: "≈82 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Risottoreis 120 g",
      "Tomate (sehr groß und reif) 1 Stück",
      "Gemüsebrühe 240 ml",
      "Olivenöl 1 EL",
      "Mozzarella (pasteurisiert) 100 g",
      "Basilikum"
    ],
    steps: [
      "Reis, Brühe und Öl in den Topf geben.",
      "Strunk der Tomate entfernen und die Tomate im Ganzen in die Mitte setzen.",
      "Reiskocher starten.",
      "Am Ende die Tomate zerdrücken, Mozzarella unterheben bis er Fäden zieht."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Mozzarella aus pasteurisierter Milch) · Diabetes ✓",
    swaps: "Mozzarella ↔ Feta",
    side: "Gedämpftes Hühnchen oder Tofu für mehr Protein.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (etwas weniger als normal)", notes: "Tomate gut zerdrücken." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Tamagoyaki Sandwich たまごサンド",
    desc: "Ein gigantischer, fluffiger Ei-Block, eingeklemmt in Toast. Vollständig durchgegart.",
    story: "In Japanischen Konbinis (Supermärkten) ein Bestseller. Wir machen das Rührei extra dick, falten es in der Pfanne und packen es in Brot. Ein Traum.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Eier 4 Stück",
      "Milch 20 ml",
      "Sojasauce 1 TL",
      "Mayonnaise (pasteurisiert) 1 EL"
    ],
    steps: [
      "Eier, Milch und Sojasauce gut verquirlen.",
      "In einer eckigen (oder normalen) Pfanne ein dickes Omelett braten, dabei immer wieder falten, bis es ein kompakter, dicker Block ist (komplett durchgaren!).",
      "Toast mit Mayo bestreichen, Ei-Block dazwischenklemmen.",
      "Warm servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett fest, Mayo aus Tube/Pasteurisiert)",
    swaps: "Vollkorn-Toast ↔ Normales Brot",
    side: "Kaffee oder Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Airfryer Tofu-Nuggets Sweet & Sour",
    desc: "Außen krosse Tofu-Bisse, geschwenkt in einer süß-sauren Sauce. Wie beim Chinesen, nur in gesund.",
    story: "Tofu kann knusprig! Das Geheimnis ist Maisstärke und der Airfryer. Er saugt danach die Sauce förmlich auf.",
    target: "≈80 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Fester Tofu 300 g",
      "Maisstärke 2 EL",
      "Sojasauce, Ketchup, Reisessig je 1 EL",
      "Zucker 1 TL",
      "Reis (gekocht) 150 g",
      "Paprika 100 g"
    ],
    steps: [
      "Tofu würfeln, gut abtupfen und in Maisstärke wenden.",
      "Im Airfryer bei 200°C für 15 Min knusprig backen.",
      "Saucen-Zutaten und Paprikawürfel in der Pfanne aufkochen.",
      "Tofu durchschwenken und mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Tofu ↔ Hähnchenbrust",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Takikomi Gohan 炊き込みご飯 (Hühnchen & Shiitake)",
    desc: "Japanischer Würzreis aus dem Reiskocher mit Hühnchen und Pilzen.",
    story: "Das klassischste aller japanischen Reiskocher-Gerichte. Es gibt unzählige Variationen, aber Huhn und Shiitake sind die Könige des Umami.",
    target: "≈82 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust 200 g",
      "Shiitake-Pilze 100 g",
      "Karotte 50 g",
      "Dashi oder Hühnerbrühe 240 ml",
      "Sojasauce 2 EL"
    ],
    steps: [
      "Hähnchen in Würfel schneiden, Pilze und Karotten in feine Streifen.",
      "Reis und Brühe in den Topf. Sojasauce dazugeben.",
      "Zutaten oben auflegen (nicht einrühren!).",
      "Kochen und danach alles fluffig vermischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn durch) · Diabetes ✓",
    swaps: "Hähnchen ↔ Schweinefleisch",
    side: "Miso-Suppe.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe", notes: "Sojasauce zählt zur Flüssigkeit dazu." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "Schwarzer Sesam Porridge 黑芝麻糊",
    desc: "Cremiger Haferbrei, eingefärbt und parfümiert mit schwarzer Sesampaste.",
    story: "Schwarzer Sesam ist ein Superfood der TCM (Traditionelle Chinesische Medizin). Er gibt dem Brei eine tiefschwarze Farbe und einen nussigen, reichen Geschmack.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch 400 ml",
      "Schwarze Sesampaste 2 EL",
      "Agavendicksaft 1 EL",
      "Walnüsse 20 g"
    ],
    steps: [
      "Haferflocken in der Milch aufkochen, bis der Brei andickt.",
      "Sesampaste und Agavendicksaft unterrühren.",
      "Mit gehackten Walnüssen garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Schwarze Sesampaste ↔ Erdnussbutter",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Gochujang-Sahne Pasta (Viral Trend)",
    desc: "Vollkorn-Penne in einer cremigen Sauce, gewürzt mit einer milden koreanischen Chilipaste.",
    story: "Italien trifft Korea. Gochujang ist leicht süßlich und umami-reich. Wenn man sie mit Sahne mischt, entsteht eine Sauce, die der berühmten 'Penne alla Vodka' Konkurrenz macht.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Nudeln 130 g",
      "Gochujang (milde Paste) 1 EL",
      "Sahne (oder Sojasahne) 100 ml",
      "Knoblauch 1 Zehe",
      "Spinat 100 g",
      "Parmesan 20 g"
    ],
    steps: [
      "Nudeln kochen. Etwas Nudelwasser aufheben.",
      "Knoblauch in einer Pfanne anbraten. Gochujang kurz mitrösten.",
      "Sahne und Nudelwasser angießen, einköcheln lassen.",
      "Nudeln und Spinat unterheben, mit Parmesan bestreuen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse/Sahne erhitzt/pasteurisiert) · Diabetes ✓",
    swaps: "Gochujang ↔ Tomatenmark (falls es komplett mild sein soll)",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Cola-Chicken-Wings-Reis 可乐鸡翅饭 (Reiskocher)",
    desc: "Ein verrückter Trend aus China: Hühnchen gart in Cola und Sojasauce butterzart auf dem Reis.",
    story: "Klingt absurd, schmeckt unglaublich! Die Säure und der Zucker der Cola karamellisieren das Fleisch und machen es butterzart. Für den Reiskocher nehmen wir Hühnerbrust oder entbeinte Keulen statt Flügel mit Knochen.",
    target: "≈86 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenfleisch (o. Knochen) 200 g",
      "Cola (Normal, kein Zero!) 100 ml",
      "Sojasauce 2 EL",
      "Ingwer 5 g",
      "Brokkoli 100 g"
    ],
    steps: [
      "Fleisch mit Sojasauce und Cola kurz marinieren.",
      "Reis mit Wasser in den Topf (weniger Wasser nehmen, Cola zählt mit!).",
      "Fleisch und Marinade darüber gießen.",
      "Kochen. Danach Brokkoli dämpfen und dazu servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn gart sicher durch, Zucker verkocht größtenteils) · Diabetes ⚠ (Cola enthält Zucker, aber portion ist moderat)",
    swaps: "Cola ↔ Hühnerbrühe mit 1 TL Honig",
    side: "Viel gedämpfter Brokkoli.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Cola + Wasser (zusammen auf Standard-Level)", notes: "Macht den Reis herrlich dunkel." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Zucchini-Feta Frittata (Airfryer)",
    desc: "Eine unkomplizierte Eierspeise, die im Airfryer wie ein Soufflé aufgeht.",
    story: "Der Airfryer ist perfekt für Frittatas, weil die Hitze von allen Seiten zirkuliert. So verbrennt der Boden nicht, und das Ei stockt absolut gleichmäßig.",
    target: "≈45 g KH (2 P.) · Protein ≈24 g p. P.",
    ingredients: [
      "Eier 4 Stück",
      "Zucchini (geraspelt, ausgedrückt) 150 g",
      "Feta (pasteurisiert) 50 g",
      "Milch 20 ml",
      "Vollkornbrot 2 Scheiben"
    ],
    steps: [
      "Zucchini raspeln und das Wasser gut ausdrücken.",
      "Eier, Milch und Feta verquirlen, Zucchini unterheben.",
      "In eine airfryer-geeignete Form füllen.",
      "Bei 160°C ca. 15 Minuten backen, bis die Masse komplett durchgestockt und fest ist.",
      "Mit Brot servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett fest, Feta erhitzt) · Diabetes ✓",
    swaps: "Zucchini ↔ Karotte",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Dan Dan Mian 担担面 (Hühnerhack-Version)",
    desc: "Der Sichuan-Nudelklassiker: Milde Sesam-Soja-Sauce mit gebratenem Hackfleisch.",
    story: "Normalerweise schwimmt dieses Gericht in Chili-Öl. Wir fokussieren uns auf die reichhaltige Sesam-Tahini-Sauce und nutzen mageres Hühnerhack für eine leichte, umamireiche Mahlzeit.",
    target: "≈85 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Weizennudeln 150 g",
      "Hähnchenhack 150 g",
      "Tahini (Sesampaste) 2 EL",
      "Sojasauce 2 EL",
      "Knoblauch 1 Zehe",
      "Pak Choi 100 g"
    ],
    steps: [
      "Hackfleisch und Knoblauch im Wok krümelig und gut durch braten.",
      "Tahini, Sojasauce und etwas warmes Nudelwasser zu einer dicken Sauce rühren.",
      "Nudeln und Pak Choi kochen.",
      "Nudeln in die Sauce geben, Hackfleisch darüber häufen, gut umrühren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hähnchenhack komplett durchbraten!)",
    swaps: "Hähnchenhack ↔ Tofu-Crumble",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Garnelen-Erbsen-Paella (Asia-Style Reiskocher)",
    desc: "Gelber Reis dank Kurkuma, gepaart mit Meeresfrüchten direkt aus dem Topf.",
    story: "Ein Crossover, das den Reiskocher feiert. Kurkuma ist extrem gesund und färbt den Reis wunderschön gelb. Schmeckt nach Urlaub am Mittelmeer.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (TK, aufgetaut) 200 g",
      "Erbsen (TK) 80 g",
      "Kurkuma-Pulver 1/2 TL",
      "Gemüsebrühe 240 ml",
      "Knoblauch 1 Zehe"
    ],
    steps: [
      "Reis, Brühe, Kurkuma und Knoblauchzehe in den Topf geben.",
      "Garnelen und Erbsen oben auflegen.",
      "Start drücken.",
      "Nach dem Kochen die Knoblauchzehe zerdrücken, alles vermischen und servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen dämpfen im Topf sicher durch)",
    swaps: "Garnelen ↔ Hähnchenbrust",
    side: "Ein Spritzer Zitrone.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Kurkuma färbt stark, vorsicht beim Rühren." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Earl Grey Oatmeal",
    desc: "Haferflocken, gekocht in Milch und starkem Earl Grey Tee.",
    story: "Die Bergamotte-Note des Tees gibt dem Haferbrei einen unfassbar eleganten Geschmack. Ein 'London Fog' zum Löffeln.",
    target: "≈65 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Milch 300 ml",
      "Earl Grey Tee (stark aufgebrüht) 100 ml",
      "Honig 1 EL",
      "Mandeln 20 g"
    ],
    steps: [
      "Tee aufbrühen.",
      "Haferflocken mit Milch und Tee aufkochen und eindicken lassen.",
      "Mit Honig und Mandeln servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Teemenge moderat)",
    swaps: "Earl Grey ↔ Chai Tee",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Crispy Rice Paper Dumplings (Airfryer)",
    desc: "Quadratische, knusprige Teigtaschen aus Reispapier, gefüllt mit Tofu und Gemüse.",
    story: "Noch ein Reispapier-Hack! Statt Teig zu kneten, falten wir Reispapier wie Briefumschläge um die Füllung. Der Airfryer macht sie knusprig und fettarm.",
    target: "≈75 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Reispapier 8 Blatt",
      "Fester Tofu 150 g",
      "Karotten & Kohl (fein gehackt) 100 g",
      "Sojasauce 2 EL",
      "Sesamöl 1 TL",
      "Reis (als Beilage) 100 g"
    ],
    steps: [
      "Tofu zerdrücken und mit Gemüse, Soja und Sesamöl mischen.",
      "Reispapier nass machen, 2 EL Füllung in die Mitte, zu einem Quadrat falten (am besten 2 Blätter pro Dumpling für Stabilität).",
      "Im Airfryer bei 190°C ca. 10 Min backen, bis sie aufgebläht und knusprig sind.",
      "Mit Reis und Dip servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Tofu ↔ Schweinehack (vorher anbraten!)",
    side: "Sojasauce zum Dippen.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Curry-Hühnchen-Pilaf (Reiskocher)",
    desc: "Reis, der mit mildem Currypulver, Hühnchen und Erbsen gedämpft wird.",
    story: "Ein Klassiker aus den Yoshoku-Küchen (westliche Speisen auf japanisch) Japans. Das Currypulver bringt Wärme, das Hühnchen gart buttrig weich.",
    target: "≈82 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Hähnchenbrust 200 g",
      "Erbsen (TK) 80 g",
      "Mildes Currypulver 1 TL",
      "Hühnerbrühe 240 ml",
      "Zwiebel 50 g"
    ],
    steps: [
      "Hühnchen in Würfel schneiden, Zwiebel fein hacken.",
      "Reis, Brühe, Currypulver und Zwiebel in den Topf. Gut mischen.",
      "Hühnchen und Erbsen darauflegen.",
      "Start drücken und am Ende alles durchheben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hühnchen gart im Dampf komplett durch)",
    swaps: "Hähnchen ↔ Kichererbsen",
    side: "Ein Klecks Joghurt obendrauf.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Standard)", notes: "Currypulver gut mit der Brühe verrühren." },
  },
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Hähnchenfleisch": { group: "Protein/Fisch/Tofu", label: "Hähnchenfleisch", unitDefault: "g" },
  "Hähnchenhack": { group: "Protein/Fisch/Tofu", label: "Hähnchenhack", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweinegulasch": { group: "Protein/Fisch/Tofu", label: "Schweinegulasch", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack (mager)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau/Seelachs", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Seidentofu": { group: "Protein/Fisch/Tofu", label: "Seidentofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Cheddar": { group: "Protein/Fisch/Tofu", label: "Cheddar/Gouda", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda", unitDefault: "g" },
  "Mozzarella": { group: "Protein/Fisch/Tofu", label: "Mozzarella", unitDefault: "g" },
  "Ricotta": { group: "Protein/Fisch/Tofu", label: "Ricotta", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark/Joghurt", unitDefault: "g" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl/Kohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Enoki": { group: "Gemüse/Pilze", label: "Enoki-Pilze", unitDefault: "g" },
  "Mu-Err": { group: "Gemüse/Pilze", label: "Mu-Err Pilze", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel", unitDefault: "g" },
  "Taro": { group: "Gemüse/Pilze", label: "Taro", unitDefault: "g" },
  "Kürbis": { group: "Gemüse/Pilze", label: "Kürbis", unitDefault: "g" },
  "Ananas": { group: "Gemüse/Pilze", label: "Ananas (Dose)", unitDefault: "g" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Makkaroni": { group: "Reis/Nudeln/Sättigung", label: "Makkaroni", unitDefault: "g" },
  "Hörnchennudeln": { group: "Reis/Nudeln/Sättigung", label: "Hörnchennudeln", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot / Vollkorn", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Kartoffeln": { group: "Reis/Nudeln/Sättigung", label: "Kartoffeln", unitDefault: "g" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (pasteurisiert)", unitDefault: "EL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Schwarze Sesampaste": { group: "Algen/Brühen/Würze", label: "Schwarze Sesampaste", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "EL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Currypulver": { group: "Algen/Brühen/Würze", label: "Currypulver", unitDefault: "TL" },
  "Kurkuma": { group: "Algen/Brühen/Würze", label: "Kurkuma", unitDefault: "TL" },
  "Walnüsse": { group: "Algen/Brühen/Würze", label: "Walnüsse", unitDefault: "g" },
  "Sesam": { group: "Algen/Brühen/Würze", label: "Sesam", unitDefault: "TL" },
  "Backpulver": { group: "Algen/Brühen/Würze", label: "Backpulver", unitDefault: "TL" },
  "Sternanis": { group: "Algen/Brühen/Würze", label: "Sternanis", unitDefault: "Stück" },
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
        else if (name.includes("Feta")) key = "Feta";
        else if (name.includes("Pilze")) key = "Champignons";
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw10" }) {
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
            Woche 10 – Übersicht <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Airfryer Hacks · Udon-Trends · Reiskocher-Magie · Balanced</p>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Hainan-Lachs, Cola-Chicken, Mac&Cheese und mehr!</p>
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
export default function Woche10DE() {
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
            {tagChip("Woche 10")}
            {tagChip("Udon Cacio e Pepe & Reiskocher-Hacks")}
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