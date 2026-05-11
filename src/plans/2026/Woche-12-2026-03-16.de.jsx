// src/plans/2026/Woche-12-2026-03-16.de.jsx
import { SharedMealCard } from "@/components/MealCard";
import React, { useMemo, useState, useEffect } from "react";
import { exportHTMLById, ensureScript } from "@/utils/exporters";
import { buildEmbedCss } from "@/utils/embedCss";

/*
  Moving Kitchen Tales – Woche 12 (Start: 2026-03-16)
  Fokus: Virale Airfryer-Hacks, Originaltitel (CN/JP/KR), Reiskocher-Magie, CN/JP/KR + EU Crossover.
  Inhalt: Balanced, Schwangerschaftssicher (alles komplett durchgegart), Diabetesfreundlich.
*/

// ---- Meta ----
export const meta = {
  title: "Woche 12",
  startDate: "2026-03-16",
  id: "woche-12-2026-03-16",
  lang: "de",
  sidebar: "Woche 12 (2026-03-16)",
};

const FILE_BASE = "Woche 12 2026-03-16";

const UI_TITLES = {
  main: "Rezepte Woche 12",
  list: "Einkaufsliste Woche 12",
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

// Spezielles Styling für Virale Hits
const viralChip = () => (
  <span className="mkt-chip" key="viral" style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, background: "linear-gradient(135deg, #ff7e5f, #feb47b)", color: "#fff", fontWeight: "bold", border: "none", fontSize: 12, marginRight: 6, marginBottom: 6 }}>
    🔥 Viral Trend
  </span>
);

const DAYS_ORDER = ["mo", "di", "mi", "do", "fr", "sa", "so"];
const DAY_NAME_DE = {
  mo: "Montag (2026-03-16)",
  di: "Dienstag (2026-03-17)",
  mi: "Mittwoch (2026-03-18)",
  do: "Donnerstag (2026-03-19)",
  fr: "Freitag (2026-03-20)",
  sa: "Samstag (2026-03-21)",
  so: "Sonntag (2026-03-22)",
};

// -----------------------------------------------------------------------
// DATA (ALLE 21 REZEPTE)
// -----------------------------------------------------------------------
export const DATA = [
  // MONTAG
  {
    id: "mo-f",
    title: "Airfryer Avocado-Egg-Boats アボカドエッグ",
    isViral: true,
    desc: "Eine halbe Avocado, gefüllt mit einem Ei und im Airfryer gebacken.",
    story: "Ein riesiger Social-Media-Hit für ein proteinreiches, schnelles Frühstück. Das Ei backt perfekt in der Mulde der Avocado, während das Fruchtfleisch leicht anröstet.",
    target: "≈60 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Avocado (reif) 1 Stück",
      "Eier 2 Stück",
      "Vollkorn-Toast 4 Scheiben",
      "Sriracha-Sauce (mild) 1 TL",
      "Salz & Pfeffer"
    ],
    steps: [
      "Avocado halbieren, Kern entfernen. Etwas Fruchtfleisch auslöffeln, um die Mulde zu vergrößern.",
      "Jeweils ein Ei in die Mulde schlagen.",
      "Im Airfryer bei 180°C für ca. 12-15 Minuten backen, bis das Ei komplett durchgestockt ist (kein flüssiges Eigelb!).",
      "Mit Salz, Pfeffer und Sriracha würzen. Dazu Vollkorntoast."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett durchgebacken!) · Diabetes ✓",
    swaps: "Avocado ↔ Tomatenhälften",
    side: "Ein warmer Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-m",
    title: "Soba-Nudelsalat そばサラダ",
    desc: "Erfrischende japanische Buchweizennudeln in cremiger Erdnusssauce.",
    story: "Wenn es schnell gehen muss: Soba-Nudeln garen in 4 Minuten und schmecken kalt fantastisch. Die Erdnusssauce liefert die nötigen Fette und Proteine.",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Soba-Nudeln 150 g",
      "Erdnussbutter 2 EL",
      "Sojasauce 2 EL",
      "Reisessig 1 EL",
      "Gurke (in Streifen) 100 g",
      "Edamame (geschält) 100 g"
    ],
    steps: [
      "Soba-Nudeln und Edamame kochen, danach eiskalt abschrecken.",
      "Erdnussbutter, Sojasauce, Essig und etwas warmes Wasser zu einem glatten Dressing rühren.",
      "Nudeln, Edamame und Gurkenstreifen im Dressing schwenken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓ (Buchweizen ist super blutzuckerfreundlich)",
    swaps: "Erdnussbutter ↔ Tahini",
    side: "Ein hartgekochtes Ei (optional).",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mo-a",
    title: "Hainan-Style Schweinefilet-Reis 海南猪肉饭 (Reiskocher)",
    desc: "Zartes Schweinefilet dämpft in einem würzigen Ingwer-Knoblauch-Reis.",
    story: "Das klassische Hainan-Gericht wird eigentlich mit fettem Huhn gemacht. Wir nehmen mageres Schweinefilet – das gart im Reiskocher butterweich und aromatisiert den Reis wunderbar.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Schweinefilet (am Stück oder dicke Medaillons) 200 g",
      "Hühnerbrühe 240 ml",
      "Ingwer (fein gehackt) 15 g",
      "Knoblauch 2 Zehen",
      "Sojasauce 1 EL"
    ],
    steps: [
      "Reis, Brühe, Ingwer, zerdrückten Knoblauch und Sojasauce in den Reiskocher geben.",
      "Schweinefilet oben drauflegen. Start drücken.",
      "Nach dem Kochen das Fleisch herausnehmen, in Scheiben schneiden und auf dem gut umgerührten Reis anrichten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schweinefilet gart im Reiskocher >80°C komplett durch)",
    swaps: "Schweinefilet ↔ Hähnchenbrust",
    side: "Gedämpfter Pak Choi.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Fleisch nicht zu klein schneiden, damit es saftig bleibt." },
  },

  // DIENSTAG
  {
    id: "di-f",
    title: "Cloud Egg Toast 클라우드 에그 (Airfryer)",
    isViral: true,
    desc: "Ein fluffiges Wolken-Ei aus aufgeschlagenem Eiweiß mit dem Eigelb in der Mitte.",
    story: "Dieser virale Frühstückstrend sieht aus wie eine kleine Wolke! Da wir das Eigelb in der Schwangerschaft durchgaren müssen, lassen wir es im Airfryer einfach etwas länger backen.",
    target: "≈60 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Vollkorn-Toast 4 Scheiben",
      "Eier 2 Stück",
      "Parmesan (gerieben) 20 g",
      "Salz & Pfeffer"
    ],
    steps: [
      "Eier trennen. Eiweiß mit einer Prise Salz steif schlagen. Parmesan vorsichtig unterheben.",
      "Zwei Eiweiß-Wolken auf Backpapier (oder in eine Airfryer-Form) formen, in der Mitte eine Kuhle machen.",
      "Im Airfryer bei 160°C ca. 5 Min backen. Dann das Eigelb in die Kuhle geben und weitere 5-8 Min backen, bis alles KOMPLETT durchgestockt ist.",
      "Wolken auf den getoasteten Toast legen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eigelb muss fest sein, kein flüssiger Kern!)",
    swaps: "Parmesan ↔ Gouda",
    side: "Tomaten.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "di-m",
    title: "Knoblauch-Butter Yaki Udon ガリバタ焼きうどん",
    desc: "Bratnudeln auf japanische Art mit einer herrlichen Knoblauch-Butter-Soja-Glasur.",
    story: "Yaki Udon ist in japanischen Izakayas ein Muss. Die Kombination aus Butter und Sojasauce ist ein unschlagbares Umami-Duo.",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Udon-Nudeln (vorgegart) 400 g",
      "Butter 20 g",
      "Sojasauce 2 EL",
      "Knoblauch 2 Zehen",
      "Weißkohl (geschnitten) 150 g",
      "Champignons 100 g"
    ],
    steps: [
      "Knoblauch, Kohl und Pilze in der Butter anbraten.",
      "Udon-Nudeln kurz heiß abspülen und mit in den Wok geben.",
      "Sojasauce darüber gießen und alles kräftig schwenken, bis die Nudeln die Sauce aufgesaugt haben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ · Diabetes ✓",
    swaps: "Udon ↔ Vollkorn-Spaghetti",
    side: "Etwas gerösteter Sesam on top.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "di-a",
    title: "Linsen-Karotten-Reis 扁豆鸡肉饭 (Reiskocher)",
    desc: "Ein proteinreicher Reistopf mit Linsen, warmen Gewürzen und zartem Hühnchen.",
    story: "Ein Crossover, das leicht in Richtung indisches Biryani geht, aber im Reiskocher komplett ohne Aufwand gelingt. Die Linsen schmelzen förmlich.",
    target: "≈82 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 100 g",
      "Rote Linsen (roh, gewaschen) 40 g",
      "Hähnchenbrust (gewürfelt) 200 g",
      "Karotten (in Stiften) 100 g",
      "Gemüsebrühe 300 ml",
      "Currypulver (mild) 1 TL"
    ],
    steps: [
      "Reis und Linsen gut waschen und mit der Brühe in den Topf geben. Currypulver einrühren.",
      "Hähnchen und Karotten oben auflegen.",
      "Start drücken.",
      "Am Ende alles durchmischen, die Linsen geben dem Reis eine tolle cremige Textur."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Huhn durch) · Diabetes ✓ (Linsen drosseln Blutzucker)",
    swaps: "Hähnchen ↔ Räuchertofu",
    side: "Ein Klecks Joghurt.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Brühe (Reis + Linsen berechnen)", notes: "Rote Linsen zerfallen perfekt im Reiskocher." },
  },

  // MITTWOCH
  {
    id: "mi-f",
    title: "Miso-Haferbrei mit Ei 味噌オートミール",
    desc: "Ein herzhafter Haferbrei, verfeinert mit Umami-Miso und einem hartgekochten Ei.",
    story: "Wer Miso-Suppe zum Frühstück liebt, wird dieses Oatmeal vergöttern. Es ist warm, wohlig und extrem schnell gemacht.",
    target: "≈65 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Haferflocken 100 g",
      "Wasser oder Gemüsebrühe 400 ml",
      "Miso-Paste 1 EL",
      "Eier (hartgekocht) 2 Stück",
      "Spinat (frisch) 50 g"
    ],
    steps: [
      "Haferflocken in Brühe/Wasser einköcheln.",
      "In der letzten Minute den Spinat unterheben, bis er zusammenfällt.",
      "Vom Herd nehmen! Miso-Paste einrühren (darf nicht mehr kochen).",
      "Mit halbierten, hartgekochten Eiern servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier hartgekocht)",
    swaps: "Spinat ↔ Frühlingszwiebeln",
    side: "Tee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-m",
    title: "Sushi Bake Muffins 寿司ベイクマフィン",
    isViral: true,
    desc: "Der Sushi-Bake-Trend in kleinen, handlichen Cupcake-Formen gebacken.",
    story: "Sushi Bake ist der Hit auf Potlucks. Wir machen ihn portionierbar: Reis und Lachs in eine Muffinform drücken, im Airfryer backen. Der Rand wird grandios knusprig!",
    target: "≈75 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reis (gekocht) 200 g",
      "Lachs (Dose oder frisch gehackt) 150 g",
      "Mayonnaise (pasteurisiert) 2 EL",
      "Sojasauce 1 TL",
      "Nori (zerbröselt, in Maßen) 1 Blatt"
    ],
    steps: [
      "Lachs mit Mayo und Sojasauce mischen.",
      "Gekochten Reis in Silikon-Muffinförmchen drücken (wie ein kleines Nest).",
      "Lachs-Mischung darauf verteilen.",
      "Im Airfryer bei 190°C ca. 10 Min backen. Mit Nori garnieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs komplett durchgaren, Mayo pasteurisiert)",
    swaps: "Lachs ↔ Krebsfleisch-Imitat (Surimi)",
    side: "Edamame.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "mi-a",
    title: "Gyudon-Style Rindfleisch-Reis 牛丼 (Reiskocher)",
    desc: "Der japanische Fast-Food-Klassiker Gyudon (Rindfleischschale) aus dem Reiskocher.",
    story: "Hauchdünnes Rindfleisch und weiche Zwiebeln dämpfen direkt auf dem Reis. Der süßlich-salzige Fleischsaft sickert nach unten – köstlich!",
    target: "≈80 g KH (2 P.) · Protein ≈25 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Rindfleisch (sehr dünne Scheiben) 150 g",
      "Zwiebel (in Ringen) 1 Stück",
      "Sojasauce 2 EL",
      "Mirin 1 EL",
      "Dashi-Brühe 240 ml"
    ],
    steps: [
      "Reis und Dashi in den Reiskocher.",
      "Zwiebeln und Rindfleisch locker (!) darüber verteilen. Soja und Mirin angießen.",
      "Start drücken. Nach dem Kochen gründlich durchmischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Fleisch wird im Dampf >80°C sicher durchgegart)",
    swaps: "Rindfleisch ↔ Schweinefleisch (dünn geschnitten)",
    side: "Eingelegter Ingwer.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi (Standard)", notes: "Fleisch auffächern, nicht klumpen." },
  },

  // DONNERSTAG
  {
    id: "do-f",
    title: "Schwedischer Grießbrei (Mannagrynsgröt)",
    desc: "Ein feiner, wärmender Grießbrei mit etwas Zimt und Obst.",
    story: "In Schweden isst man diesen samtigen Brei oft im Winter. Er ist rasend schnell gemacht und legt sich wie eine warme Decke in den Magen.",
    target: "≈70 g KH (2 P.) · Protein ≈15 g p. P.",
    ingredients: [
      "Weichweizengrieß 60 g",
      "Milch 500 ml",
      "Agavendicksaft 1 EL",
      "Zimt 1 TL",
      "Beeren (frisch oder TK aufgetaut) 50 g"
    ],
    steps: [
      "Milch aufkochen. Grieß unter ständigem Rühren einrieseln lassen.",
      "Bei schwacher Hitze ca. 3-5 Min quellen lassen.",
      "Mit Agavendicksaft, Zimt und Beeren toppen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓",
    swaps: "Grieß ↔ Polenta (fein)",
    side: "-",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "do-m",
    title: "Tomaten-Ei-Pfanne auf Nudeln 番茄炒蛋面",
    desc: "Die berühmte chinesische Tomaten-Ei-Pfanne, serviert über Nudeln statt Reis.",
    story: "Dieses Gericht geht immer. Die Tomaten zerkochen zu einer natürlichen Sauce, das Ei fängt den Geschmack auf. Ein geniales Comfort-Mittagessen.",
    target: "≈85 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Weizennudeln oder Udon 150 g",
      "Tomaten (sehr reif) 3 Stück",
      "Eier 3 Stück",
      "Ketchup 1 EL",
      "Sojasauce 1 EL",
      "Frühlingszwiebel 10 g"
    ],
    steps: [
      "Eier in der Pfanne komplett durchbraten, herausnehmen.",
      "Tomaten würfeln und in der Pfanne weichschmoren, bis Sauce entsteht. Ketchup und Soja dazu.",
      "Eier zurückgeben. Gekochte Nudeln untermischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Eier komplett gestockt)",
    swaps: "Weizennudeln ↔ Reis",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "do-a",
    title: "Erbsen-Schinken Risi e Bisi (Reiskocher)",
    desc: "Ein italienischer Frühlingsklassiker. Reis mit Erbsen und Schinken aus dem Reiskocher.",
    story: "'Risi e Bisi' ist in Venedig Kult. Es ist eine Mischung aus Suppe und Risotto. Im Reiskocher wird es zum perfekten, stressfreien Feierabendgericht.",
    target: "≈80 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Risottoreis oder Rundkornreis 120 g",
      "Erbsen (TK) 150 g",
      "Kochschinken (gewürfelt) 100 g",
      "Gemüsebrühe 300 ml",
      "Parmesan 30 g",
      "Butter 10 g"
    ],
    steps: [
      "Reis, Brühe und Schinken in den Reiskocher geben. Starten.",
      "In den letzten 5 Minuten die aufgetauten Erbsen dazugeben (dann bleiben sie grün).",
      "Nach dem Kochen Parmesan und Butter kräftig unterrühren, bis es schlotzig ist."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert, Schinken erhitzt)",
    swaps: "Schinken ↔ Speck (Pancetta)",
    side: "Tomatensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (etwas mehr für Risi e Bisi Textur)", notes: "Soll am Ende sehr schlotzig sein." },
  },

  // FREITAG
  {
    id: "fr-f",
    title: "TikTok Wrap-Hack (접는 랩 Folded Wrap)",
    isViral: true,
    desc: "Ein eingeschnittener Tortilla-Wrap, in Vierteln belegt und zur Dreieckstasche gefaltet.",
    story: "Der wohl praktischste Food-Hack des Internets. Das Falten macht den Wrap extrem stabil, und im Airfryer oder Pfanne wird er außen rundum knusprig.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Vollkorn-Tortillas 2 Stück",
      "Käse (Gouda, gerieben) 40 g",
      "Kochschinken 2 Scheiben",
      "Ei (als flaches Omelett gebraten) 2 Stück",
      "Spinat 20 g"
    ],
    steps: [
      "Eier vorher zu zwei dünnen, durchgebratenen Omeletts braten.",
      "Wraps von unten bis zur Mitte einschneiden.",
      "Viertel 1: Käse, Viertel 2: Ei, Viertel 3: Schinken, Viertel 4: Spinat.",
      "Rundum falten zum Dreieck. In Pfanne/Airfryer knusprig toasten."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei durch, Käse pasteurisiert)",
    swaps: "Schinken ↔ Räucherlachs",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-m",
    title: "Kroatische Krautfleckerl (Krpice sa zeljem)",
    desc: "Ein deftiger Balkan-Klassiker: Nudeln mit karamellisiertem Weißkohl und Speck.",
    story: "Ein unglaublich günstiges, aber grandioses Wohlfühlessen aus Kroatien. Der Weißkohl wird in der Pfanne süßlich und goldbraun.",
    target: "≈85 g KH (2 P.) · Protein ≈18 g p. P.",
    ingredients: [
      "Fleckerl oder quadratische Nudeln 150 g",
      "Weißkohl (grob gehackt) 250 g",
      "Speckwürfel 50 g",
      "Zwiebel 1 Stück",
      "Salz & reichlich Pfeffer",
      "Öl 1 EL"
    ],
    steps: [
      "Nudeln kochen.",
      "Speck und Zwiebeln im Wok/Pfanne anbraten. Kohl dazugeben und bei mittlerer Hitze ca. 15-20 Min braten, bis er leicht karamellisiert und weich ist.",
      "Nudeln unterheben, kräftig mit Salz und Pfeffer abschmecken."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Speck wird durchgebraten) · Diabetes ✓",
    swaps: "Speck ↔ Räuchertofu",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "fr-a",
    title: "Garnelen-Paella Asiatisch 海鲜炖饭 (Reiskocher)",
    desc: "Reiskocher-Paella mit Garnelen, Erbsen und Sojasauce.",
    story: "Eine Fusion aus asiatischer Reiskocher-Technik und Paella-Zutaten. Der Reis fängt den gesamten Garnelen-Fond auf.",
    target: "≈80 g KH (2 P.) · Protein ≈26 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Garnelen (TK, aufgetaut) 200 g",
      "Erbsen (TK) 80 g",
      "Paprika (gewürfelt) 50 g",
      "Sojasauce 1 EL",
      "Gemüsebrühe 240 ml"
    ],
    steps: [
      "Reis, Brühe, Paprika und Sojasauce in den Topf geben.",
      "Garnelen und Erbsen oben auflegen.",
      "Starten. Nach dem Kochen alles vorsichtig durchheben."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Garnelen dampfgaren sicher durch)",
    swaps: "Garnelen ↔ Hähnchenbrust",
    side: "Ein Spritzer Limette.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice / Mixed", water: "Brühe (Standard)", notes: "Garnelen vorher gut abtropfen lassen." },
  },

  // SAMSTAG
  {
    id: "sa-f",
    title: "Süßkartoffel-Toast 고구마 토스트 (Airfryer)",
    desc: "Süßkartoffelscheiben ersetzen das Brot, getoppt mit Quark und Beeren.",
    story: "Ein cooler Low-Gluten-Trend. Die Süßkartoffelscheiben werden im Airfryer außen fest und innen weich – perfekt als 'Brot-Ersatz'.",
    target: "≈65 g KH (2 P.) · Protein ≈16 g p. P.",
    ingredients: [
      "Süßkartoffel (groß) 1 Stück",
      "Quark (Magerstufe) 150 g",
      "Agavendicksaft 1 EL",
      "Beeren (TK, aufgetaut) 50 g",
      "Zimt"
    ],
    steps: [
      "Süßkartoffel längs in ca. 1 cm dicke Scheiben schneiden.",
      "Im Airfryer bei 180°C ca. 12-15 Min backen, bis sie weich und der Rand leicht knusprig ist.",
      "Quark mit Agave süßen.",
      "Die Süßkartoffel-'Toasts' mit Quark, Beeren und Zimt toppen."
    ],
    checks: "Balanced ✓ · Diabetes ✓ (Süßkartoffel hat einen tollen Glykämischen Index)",
    swaps: "Quark ↔ Körniger Frischkäse",
    side: "Kaffee.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-m",
    title: "Wok-Schweinehack mit grünen Bohnen 干煸四季豆",
    desc: "Gan Bian Si Ji Dou (Style). Grüne Bohnen, scharf angebraten mit herzhaftem Hackfleisch.",
    story: "Ein Klassiker aus Sichuan. Im Original extrem ölig und scharf. Wir machen es 'Balanced', nehmen mageres Hack und braten die Bohnen mit wenig Öl knackig.",
    target: "≈80 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Grüne Bohnen (frisch oder TK) 200 g",
      "Schweinehack (mager) 150 g",
      "Knoblauch 1 Zehe",
      "Sojasauce 2 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Grüne Bohnen im Wok anbraten, bis sie runzelig werden. (Oder vorher 3 Min blanchieren).",
      "Hackfleisch und Knoblauch dazugeben, krümelig und KOMPLETT durchbraten.",
      "Sojasauce angießen, alles gut durchschwenken.",
      "Mit Reis servieren."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Hack und Bohnen müssen komplett durchgegart sein!)",
    swaps: "Schweinehack ↔ Veganes Hack",
    side: "-",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "sa-a",
    title: "Ganze Zwiebel & Feta Reis 丸ごと玉ねぎご飯",
    isViral: true,
    desc: "Eine Zwiebel schmilzt im Reiskocher. Feta bringt die cremige Salzigkeit.",
    story: "Zwei virale Trends verschmolzen: Der Zwiebel-Reis aus Japan und der Baked-Feta-Trend! Die Zwiebel wird süß wie Karamell, der Feta cremig. Genial.",
    target: "≈80 g KH (2 P.) · Protein ≈22 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Zwiebel (mittlere Größe, geschält) 1 Stück",
      "Feta (pasteurisiert) 100 g",
      "Gemüsebrühe 240 ml",
      "Olivenöl 1 EL",
      "Oregano 1 TL"
    ],
    steps: [
      "Reis, Brühe und Öl in den Topf. Die Zwiebel oben kreuzweise tief einschneiden (nicht zerteilen) und in die Mitte setzen.",
      "Den Feta daneben legen.",
      "Reiskocher starten.",
      "Nach dem Kochen die butterweiche Zwiebel zerdrücken und mit dem Käse-Reis vermengen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Käse pasteurisiert) · Diabetes ✓",
    swaps: "Feta ↔ Mozzarella",
    side: "Tomatensalat.",
    remind: true,
    riceCooker: { enabled: true, program: "White Rice", water: "Brühe (Standard)", notes: "Zwiebel kreuzweise einschneiden, damit sie weich wird." },
  },

  // SONNTAG
  {
    id: "so-f",
    title: "Reispapier-Jianbing 煎饼 (Airfryer)",
    desc: "Chinesischer Streetfood-Crêpe, als Wrap mit Reispapier gehackt.",
    story: "Jianbing ist ein Meisterwerk. Da der Teig schwer zu machen ist, nehmen wir Reispapier! Es wird mit Ei bestrichen, gefaltet und im Airfryer knusprig gebacken.",
    target: "≈65 g KH (2 P.) · Protein ≈20 g p. P.",
    ingredients: [
      "Reispapier 4 Blatt",
      "Eier 2 Stück",
      "Hoisin-Sauce 1 EL",
      "Frühlingszwiebel 10 g",
      "Sesam 1 TL"
    ],
    steps: [
      "Ein Reispapier in den Airfryer legen. Verquirltes Ei darauf verstreichen, mit Zwiebel und Sesam bestreuen.",
      "Bei 180°C ca. 5 Min backen (Ei MUSS durchgestockt sein).",
      "Herausnehmen, mit Hoisin-Sauce bestreichen, falten und genießen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Ei komplett durch!)",
    swaps: "Hoisin ↔ Milde Chilisauce",
    side: "Warme Sojamilch.",
    remind: true,
    riceCooker: { enabled: false },
  },
  {
    id: "so-m",
    title: "Airfryer Tonkatsu 豚カツ mit Kohl",
    desc: "Japanisches Schweineschnitzel, fettarm im Airfryer mit Panko-Kruste gebacken.",
    story: "Tonkatsu ist Liebe. Damit wir uns das Frittierfett sparen, sprühen wir das Panko-Mehl nur leicht mit Öl ein. Der Airfryer erledigt den Rest mit Bravour.",
    target: "≈80 g KH (2 P.) · Protein ≈30 g p. P.",
    ingredients: [
      "Schweineschnitzel 2 Stück",
      "Panko-Mehl 40 g",
      "Ei 1 Stück & Mehl (Panierstraße)",
      "Weißkohl (sehr fein gehobelt) 150 g",
      "Tonkatsu-Sauce 2 EL",
      "Reis (gekocht) 150 g"
    ],
    steps: [
      "Schnitzel klopfen, in Mehl, Ei und Panko wenden. Leicht mit Öl besprühen.",
      "Im Airfryer bei 200°C ca. 15-18 Min backen (Fleisch komplett durchgaren!).",
      "In Streifen schneiden und auf dem Kohlberg anrichten. Sauce darüber geben.",
      "Mit Reis essen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Schwein durchgaren)",
    swaps: "Schwein ↔ Hähnchenbrust",
    side: "Miso-Suppe.",
    remind: false,
    riceCooker: { enabled: false },
  },
  {
    id: "so-a",
    title: "Pilz-Lachs Takikomi Gohan 鮭ときのこの炊き込みご飯",
    desc: "Herbstlicher japanischer Mischreis mit Lachs und Shiitake.",
    story: "Takikomi Gohan ist die japanische Kunst, Reis zusammen mit saisonalen Zutaten zu dämpfen. Der Lachs und die Pilze geben ihr volles Aroma an das Getreide ab.",
    target: "≈82 g KH (2 P.) · Protein ≈28 g p. P.",
    ingredients: [
      "Reis (roh) 120 g",
      "Lachsfilet 200 g",
      "Shiitake (oder Champignons) 100 g",
      "Sojasauce 2 EL",
      "Dashi-Brühe 240 ml",
      "Karotte (Stifte) 50 g"
    ],
    steps: [
      "Reis, Dashi und Sojasauce in den Topf geben.",
      "Pilze, Karottenstifte und den Lachs (am Stück) oben auflegen.",
      "Reiskocher starten.",
      "Nach dem Kochen den Lachs zerpflücken und alles fluffig untermischen."
    ],
    checks: "Balanced ✓ · Schwangerschaft ✓ (Lachs gart im Dampf komplett durch) · Diabetes ✓",
    swaps: "Lachs ↔ Weißfisch",
    side: "Edamame.",
    remind: true,
    riceCooker: { enabled: true, program: "Mixed / White Rice", water: "Dashi (Standard)", notes: "Nicht umrühren vor dem Kochen." },
  },
];

// -----------------------------------------------------------------------
// Shopping List Logic
// -----------------------------------------------------------------------
const CANON = {
  // Protein
  "Schweinefilet": { group: "Protein/Fisch/Tofu", label: "Schweinefilet", unitDefault: "g" },
  "Schweinegeschnetzeltes": { group: "Protein/Fisch/Tofu", label: "Schweinegeschnetzeltes", unitDefault: "g" },
  "Schweineschnitzel": { group: "Protein/Fisch/Tofu", label: "Schweineschnitzel", unitDefault: "g" },
  "Schweinehack": { group: "Protein/Fisch/Tofu", label: "Schweinehack (mager)", unitDefault: "g" },
  "Rinderhack": { group: "Protein/Fisch/Tofu", label: "Rinderhack (mager)", unitDefault: "g" },
  "Rindfleisch": { group: "Protein/Fisch/Tofu", label: "Rindfleisch", unitDefault: "g" },
  "Hähnchenbrust": { group: "Protein/Fisch/Tofu", label: "Hähnchenbrust", unitDefault: "g" },
  "Hähnchenkeule": { group: "Protein/Fisch/Tofu", label: "Hähnchenkeule", unitDefault: "g" },
  "Lachsfilet": { group: "Protein/Fisch/Tofu", label: "Lachsfilet", unitDefault: "g" },
  "Kabeljau": { group: "Protein/Fisch/Tofu", label: "Kabeljau/Seelachs", unitDefault: "g" },
  "Garnelen": { group: "Protein/Fisch/Tofu", label: "Garnelen (geschält)", unitDefault: "g" },
  "Thunfisch": { group: "Protein/Fisch/Tofu", label: "Thunfisch (Dose)", unitDefault: "g" },
  "Kochschinken": { group: "Protein/Fisch/Tofu", label: "Kochschinken", unitDefault: "g" },
  "Räucherwurst": { group: "Protein/Fisch/Tofu", label: "Räucherwurst/Cabanossi", unitDefault: "g" },
  "Tofu": { group: "Protein/Fisch/Tofu", label: "Tofu", unitDefault: "g" },
  "Seidentofu": { group: "Protein/Fisch/Tofu", label: "Seidentofu", unitDefault: "g" },
  "Eier": { group: "Protein/Fisch/Tofu", label: "Eier", unitDefault: "Stück" },
  "Feta": { group: "Protein/Fisch/Tofu", label: "Feta (pasteurisiert)", unitDefault: "g" },
  "Parmesan": { group: "Protein/Fisch/Tofu", label: "Parmesan", unitDefault: "g" },
  "Gouda": { group: "Protein/Fisch/Tofu", label: "Gouda / Reibekäse", unitDefault: "g" },
  "Ricotta": { group: "Protein/Fisch/Tofu", label: "Ricotta", unitDefault: "g" },
  "Quark": { group: "Protein/Fisch/Tofu", label: "Quark", unitDefault: "g" },

  // Gemüse
  "Pak Choi": { group: "Gemüse/Pilze", label: "Pak Choi", unitDefault: "g" },
  "Spinat": { group: "Gemüse/Pilze", label: "Spinat (frisch)", unitDefault: "g" },
  "Weißkohl": { group: "Gemüse/Pilze", label: "Weißkohl/Chinakohl", unitDefault: "g" },
  "Karotte": { group: "Gemüse/Pilze", label: "Karotten", unitDefault: "g" },
  "Gurke": { group: "Gemüse/Pilze", label: "Gurke", unitDefault: "g" },
  "Zucchini": { group: "Gemüse/Pilze", label: "Zucchini", unitDefault: "g" },
  "Sojasprossen": { group: "Gemüse/Pilze", label: "Sojasprossen", unitDefault: "g" },
  "Edamame": { group: "Gemüse/Pilze", label: "Edamame", unitDefault: "g" },
  "Erbsen": { group: "Gemüse/Pilze", label: "Erbsen (TK)", unitDefault: "g" },
  "Brokkoli": { group: "Gemüse/Pilze", label: "Brokkoli", unitDefault: "g" },
  "Champignons": { group: "Gemüse/Pilze", label: "Champignons", unitDefault: "g" },
  "Shiitake": { group: "Gemüse/Pilze", label: "Shiitake", unitDefault: "g" },
  "Mu-Err": { group: "Gemüse/Pilze", label: "Mu-Err Pilze", unitDefault: "g" },
  "Frühlingszwiebel": { group: "Gemüse/Pilze", label: "Frühlingszwiebeln", unitDefault: "g" },
  "Zwiebel": { group: "Gemüse/Pilze", label: "Zwiebeln", unitDefault: "g" },
  "Knoblauch": { group: "Gemüse/Pilze", label: "Knoblauch", unitDefault: "Zehe" },
  "Ingwer": { group: "Gemüse/Pilze", label: "Ingwer", unitDefault: "g" },
  "Tomaten": { group: "Gemüse/Pilze", label: "Tomaten (frisch/Kirsch)", unitDefault: "g" },
  "Tomate": { group: "Gemüse/Pilze", label: "Tomate", unitDefault: "Stück" },
  "Passierte Tomaten": { group: "Gemüse/Pilze", label: "Passierte Tomaten", unitDefault: "EL" },
  "Apfel": { group: "Gemüse/Pilze", label: "Apfel", unitDefault: "Stück" },
  "Süßkartoffel": { group: "Gemüse/Pilze", label: "Süßkartoffel", unitDefault: "g" },
  "Taro": { group: "Gemüse/Pilze", label: "Taro (Wasserbrotwurzel)", unitDefault: "g" },
  "Ananas": { group: "Gemüse/Pilze", label: "Ananas (Dose)", unitDefault: "g" },
  "Avocado": { group: "Gemüse/Pilze", label: "Avocado", unitDefault: "Stück" },
  "Paprika": { group: "Gemüse/Pilze", label: "Paprika", unitDefault: "g" },
  "Kartoffeln": { group: "Gemüse/Pilze", label: "Kartoffeln", unitDefault: "g" },

  // Carb
  "Reis": { group: "Reis/Nudeln/Sättigung", label: "Reis (roh/gekocht)", unitDefault: "g" },
  "Risottoreis": { group: "Reis/Nudeln/Sättigung", label: "Risottoreis", unitDefault: "g" },
  "Udon": { group: "Reis/Nudeln/Sättigung", label: "Udon-Nudeln", unitDefault: "g" },
  "Weizennudeln": { group: "Reis/Nudeln/Sättigung", label: "Weizennudeln", unitDefault: "g" },
  "Vollkorn-Nudeln": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Nudeln", unitDefault: "g" },
  "Soba": { group: "Reis/Nudeln/Sättigung", label: "Soba-Nudeln", unitDefault: "g" },
  "Gnocchi": { group: "Reis/Nudeln/Sättigung", label: "Gnocchi", unitDefault: "g" },
  "Fleckerl": { group: "Reis/Nudeln/Sättigung", label: "Nudeln (Fleckerl)", unitDefault: "g" },
  "Reispapier": { group: "Reis/Nudeln/Sättigung", label: "Reispapier", unitDefault: "Blatt" },
  "Vollkorn-Tortillas": { group: "Reis/Nudeln/Sättigung", label: "Tortilla-Wraps", unitDefault: "Stück" },
  "Vollkorn-Toast": { group: "Reis/Nudeln/Sättigung", label: "Vollkorn-Toast", unitDefault: "Scheiben" },
  "Vollkornbrot": { group: "Reis/Nudeln/Sättigung", label: "Vollkornbrot", unitDefault: "Scheiben" },
  "Toastbrot": { group: "Reis/Nudeln/Sättigung", label: "Toastbrot", unitDefault: "Scheiben" },
  "Haferflocken": { group: "Reis/Nudeln/Sättigung", label: "Haferflocken", unitDefault: "g" },
  "Weichweizengrieß": { group: "Reis/Nudeln/Sättigung", label: "Grieß", unitDefault: "g" },
  "Mehl": { group: "Reis/Nudeln/Sättigung", label: "Mehl", unitDefault: "g" },
  "Maisstärke": { group: "Reis/Nudeln/Sättigung", label: "Maisstärke", unitDefault: "EL" },
  "Panko": { group: "Reis/Nudeln/Sättigung", label: "Panko/Paniermehl", unitDefault: "g" },

  // Pantry
  "Sojasauce": { group: "Algen/Brühen/Würze", label: "Sojasauce", unitDefault: "EL" },
  "Austernsauce": { group: "Algen/Brühen/Würze", label: "Austernsauce", unitDefault: "EL" },
  "Sesamöl": { group: "Algen/Brühen/Würze", label: "Sesamöl", unitDefault: "TL" },
  "Reisessig": { group: "Algen/Brühen/Würze", label: "Reisessig", unitDefault: "EL" },
  "Gemüsebrühe": { group: "Algen/Brühen/Würze", label: "Gemüsebrühe", unitDefault: "ml" },
  "Hühnerbrühe": { group: "Algen/Brühen/Würze", label: "Hühnerbrühe", unitDefault: "ml" },
  "Dashi": { group: "Algen/Brühen/Würze", label: "Dashi", unitDefault: "ml" },
  "Milch": { group: "Algen/Brühen/Würze", label: "Milch", unitDefault: "ml" },
  "Sojamilch": { group: "Algen/Brühen/Würze", label: "Sojamilch", unitDefault: "ml" },
  "Butter": { group: "Algen/Brühen/Würze", label: "Butter", unitDefault: "g" },
  "Olivenöl": { group: "Algen/Brühen/Würze", label: "Olivenöl", unitDefault: "EL" },
  "Speiseöl": { group: "Algen/Brühen/Würze", label: "Speiseöl", unitDefault: "EL" },
  "Mayonnaise": { group: "Algen/Brühen/Würze", label: "Mayo (Tube, pasteurisiert)", unitDefault: "EL" },
  "Sriracha": { group: "Algen/Brühen/Würze", label: "Sriracha (mild)", unitDefault: "TL" },
  "Ketchup": { group: "Algen/Brühen/Würze", label: "Ketchup", unitDefault: "EL" },
  "Tahini": { group: "Algen/Brühen/Würze", label: "Tahini/Sesampaste", unitDefault: "EL" },
  "Erdnussbutter": { group: "Algen/Brühen/Würze", label: "Erdnussbutter", unitDefault: "EL" },
  "Schwarze Sesampaste": { group: "Algen/Brühen/Würze", label: "Schwarze Sesampaste", unitDefault: "EL" },
  "Gochujang": { group: "Algen/Brühen/Würze", label: "Gochujang", unitDefault: "EL" },
  "Miso-Paste": { group: "Algen/Brühen/Würze", label: "Miso-Paste", unitDefault: "EL" },
  "Hoisin-Sauce": { group: "Algen/Brühen/Würze", label: "Hoisin-Sauce", unitDefault: "EL" },
  "Teriyaki-Sauce": { group: "Algen/Brühen/Würze", label: "Teriyaki-Sauce", unitDefault: "EL" },
  "Tonkatsu-Sauce": { group: "Algen/Brühen/Würze", label: "Tonkatsu-Sauce", unitDefault: "EL" },
  "Mirin": { group: "Algen/Brühen/Würze", label: "Mirin", unitDefault: "EL" },
  "Honig": { group: "Algen/Brühen/Würze", label: "Honig/Agave", unitDefault: "EL" },
  "Agavendicksaft": { group: "Algen/Brühen/Würze", label: "Agavendicksaft", unitDefault: "TL" },
  "Zucker": { group: "Algen/Brühen/Würze", label: "Zucker", unitDefault: "TL" },
  "Zimt": { group: "Algen/Brühen/Würze", label: "Zimt", unitDefault: "TL" },
  "Matcha": { group: "Algen/Brühen/Würze", label: "Matcha-Pulver", unitDefault: "TL" },
  "Nori": { group: "Algen/Brühen/Würze", label: "Nori-Blätter", unitDefault: "Blatt" },
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

function ImageBanner({ meal, year = 2026, weekFolder = "kw12" }) {
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
            Woche 12 – Übersicht <span className="mkt-date-paren" style={{ color: "var(--muted)" }}>({meta.startDate})</span>
          </h2>
          <p style={{ marginTop: 6, color: "var(--muted)" }}>Virale Airfryer-Hacks 🔥 · Originaltitel (CN/JP/KR) · Balanced</p>
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
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Tägliche Entlastung: Hainan-Style Lachs, Ganze Zwiebel Feta Reis, Gyudon und mehr.</p>
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
export default function Woche12DE() {
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
            {tagChip("Woche 12")}
            {tagChip("Virale Trends & Wohlfühlküche")}
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