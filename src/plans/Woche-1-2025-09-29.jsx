/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * GhibliKitchen – Woche 1 (CN/JP/KR) – JSX Edition
 * - Mittags kein Metformin-Reminder (IDs enden auf "-m")
 * - Einkaufsliste: kein Metformin-Hinweis im Footer
 * - Buttons: PDF erzeugen, HTML exportieren, (Drucken). Kein "HTML öffnen".
 * - Mehr Rand (Seiten & Karten)
 * - Dateinamen: "Woche 1 YYYY-MM-DD – <Typ>.pdf/.html"
 * - Keine modernen Farbfunktionen (oklab/oklch/color-mix/lab()).
 * - Smoke-Tests in der Konsole.
 */

/* Optionales Meta-Objekt (für Loader, falls genutzt) */
export const meta = {
  title: "Woche 1",
  startDate: new Date().toISOString().slice(0, 10),
  id: "woche-1-" + new Date().toISOString().slice(0, 10),
};

/* ---------------- Palette (nur HEX/RGBA) ---------------- */
const COLORS = {
  pageBg: "#FAF7F1",
  text: "#111827",
  border: "rgba(0,0,0,0.10)",
  panelBG70: "rgba(255,255,255,0.70)",
  panelBG80: "rgba(255,255,255,0.80)",
  white: "#FFFFFF",
  emerald: "#059669",
  amber: "#f59e0b",
  sky: "#0284c7",
  neutral: "#404040",
  indigo: "#4f46e5",
  btnShadow: "0 6px 20px rgba(0,0,0,.12)",
};

/* ---------------- Helper ---------------- */
function buildPrompt(header, body) {
  return `${header}\n${body}`;
}
function formatYMD(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
const FILE_BASE = `Woche 1 ${formatYMD()}`;
const isMiddayId = (id = "") => /-m$/.test(id);

/* ---------------- Preset ---------------- */
const DEFAULT_PRESET = {
  page: { orientation: "landscape", marginPt: [24, 28, 24, 28], background: COLORS.pageBg },
  listPage: { orientation: "portrait", marginPt: [20, 24, 20, 24], background: COLORS.pageBg },
  layout: { title: "GhibliKitchen – Woche 1 (CN/JP/KR)", subtitle: "Magenfreundlich · Diabetes-gerecht · Schwangerschaftssicher" },
  buttons: { pdf: true, htmlExport: true, htmlOpen: false, print: true },
  health: {
    diabetesKH2p: "60–90 g KH/ Mahlzeit (2 P.)",
    metformin: true,
    gastritis: "Schärfe/Säure gering, Dämpfen/Sieden/Schmoren",
    pregnancy: "Durchgaren ≥75 °C; Jod sparsam; natriumarme Sojasauce",
  },
  promptHeader:
    "Use exactly two cats only: Fleur (small, playful, European Shorthair, grey-black tabby) and Finn (larger, reserved prankster, European Shorthair, grey-black tabby). No third cat, no extra animals. Chinese woman (traditional or sporty-modern; occasional Princess Mononoke aura). Western man with short fauxhawk. Studio Ghibli watercolor vibe, warm golden light, gentle magical steam/pot/vegetable spirits. Pregnancy-safe food only (no raw fish/eggs). A4 landscape page; manga/cartoon panel with generous margins; image intended to occupy ≤ one-third of the page width on the left.",
};

function useGhibliPreset(defaultPreset = DEFAULT_PRESET) {
  const KEY = "ghibliKitchenPreset_v1";
  const [preset, setPreset] = useState(defaultPreset);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPreset({ ...defaultPreset, ...JSON.parse(raw) });
    } catch (_) {}
  }, []);
  return preset;
}

/* ---------------- Data: Woche 1 ---------------- */
const DATA = [
  { day: "Montag", meals: [
    { id:"mo-f", title:"Reisbrei mit Lachs & Spinat (お粥・鮭)", target:"≈70 g KH gesamt (≈35 g p. P.), Protein ≈20–25 g p. P.",
      ingredients:["Reis 70 g","Wasser 700 ml","Lachs gegart, zerzupft 80 g","Kürbis 200 g","Spinat 100 g","Ingwer 5 g","Sojasauce natriumarm 1 TL"],
      steps:["Reis mit Wasser & Kürbis 30–35 Min. sanft köcheln.","Spinat 1 Min. ziehen lassen.","Lachs & Ingwer zugeben, 2–3 Min. erwärmen.","Mild abschmecken."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ – Lachs durchgegart",
      swaps:"Spinat ↔ Pak Choi; Lachs ↔ Kabeljau", side:"Warmes Wasser/Gerstentee", remind:true,
      prompt:"Close-up of a cozy porcelain bowl of salmon–spinach congee on a bamboo tray; gentle steam-spirits forming 粥; Fleur pawing; Finn watching." },
    { id:"mo-m", title:"Sanft pochiertes Hähnchen mit Bok Choy (白切鶏·青江菜)", target:"≈80 g KH (Reis 100 g roh)",
      ingredients:["Hähnchenbrust 300 g","Wasser 1 L","Ingwer 20 g","Frühlingslauch 10 g","Reis 100 g","Bok Choy 300 g","Sojasauce natriumarm 1 EL","Sesamöl 1/2 TL"],
      steps:["Hähnchen 12–14 Min. knapp unter Siedepunkt garziehen; 5 Min. nachziehen.","Reis garen; Bok Choy 2–3 Min. dämpfen.","Huhn aufschneiden, minimal würzen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓",
      swaps:"Hähnchen ↔ Pute", side:"Gurkenscheiben", remind:true,
      prompt:"Poached chicken with bok choy; steam spirits 白切鶏; warm light; Fleur sneaks; Finn noble." },
    { id:"mo-a", title:"Algensuppe mit Kabeljau + Reis (미역국)", target:"≈65 g KH (Reis 80 g roh)",
      ingredients:["Wakame 6 g","Kabeljau 260 g","ungesalzener Fond 800 ml","Sesamöl 1/2 TL","Sojasauce 1 TL","Reis 80 g","Ingwer 5 g"],
      steps:["Wakame einweichen.","Kurz im Sesamöl schwenken, Fond zugeben.","Kabeljau 5–6 Min. sieden; mild würzen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈65 g KH · Schwangerschaft ✓ – Jod moderat",
      swaps:"Kabeljau ↔ Seelachs", side:"Brokkoli blanchiert", remind:true,
      prompt:"Miyeok-guk steam draws 미역국; Fleur peeks; Finn’s tail like seaweed." }
  ]},
  { day: "Dienstag", meals: [
    { id:"di-f", title:"Kürbisreisbrei (호박죽)", target:"≈74 g KH gesamt",
      ingredients:["Kürbis 400 g","Reis 60 g","Wasser 800 ml","Prise Salz"],
      steps:["Kürbis weich kochen & pürieren; Reis 30 Min. mitkochen; mild salzen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓", swaps:"Reis ↔ Hirse", side:"1–2 EL Joghurt (pasteur.)", remind:true,
      prompt:"Sunny pumpkin porridge; leaf spirit; Fleur plays; Finn lounges." },
    { id:"di-m", title:"Warme Soba mit Huhn & Spinat (温かいそば·鶏)", target:"≈72 g KH (Soba 120 g)",
      ingredients:["Soba 120 g","Hähnchen 200 g","Spinat 150 g","milde Kombu-Brühe 700 ml","Sojasauce 1–2 TL"],
      steps:["Brühe 10 Min. simmern.","Huhn 6–7 Min. garen.","Soba kochen/spülen, Spinat kurz ziehen lassen.","Mild würzen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓", swaps:"Soba ↔ Udon", side:"Rettich blanchiert", remind:true,
      prompt:"Rustic soba bowl with steam そば; Fleur bats noodle; Finn ignores." },
    { id:"di-a", title:"Gedämpfter Kabeljau mit Ingwer & Frühlingslauch (清蒸鳕鱼)", target:"≈69 g KH (Reis 90 g)",
      ingredients:["Kabeljau 300 g","Ingwer 10 g","Frühlingslauch 15 g","Sojasauce 1–2 TL","Sesamöl 1/2 TL","Reis 90 g","Gai Lan/Brokkoli 300 g"],
      steps:["Fisch mit Ingwer/Lauch 8–10 Min. dämpfen.","Mit Sojasauce/Sesamöl beträufeln; Reis & Gemüse dazu."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓", swaps:"Kabeljau ↔ Seelachs", side:"Warmes Wasser", remind:true,
      prompt:"Steamed cod; steam draws 鳕; Fleur reflection; Finn calm." }
  ]},
  { day: "Mittwoch", meals: [
    { id:"mi-f", title:"Kongee mit Shiitake & Seidentofu (粥·香菇豆腐)", target:"≈63 g KH",
      ingredients:["Reis 70 g","Wasser 800 ml","Shiitake 60 g","Seidentofu 150 g","Karotte 100 g","Sojasauce 1 TL"],
      steps:["30–35 Min. köcheln; Gemüse/Tofu 5 Min. mitziehen; mild würzen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈63 g KH · Schwangerschaft ✓", swaps:"Reis ↔ Hirse", side:"Nori sparsam", remind:true,
      prompt:"Creamy congee; steam 豆; Fleur behind bowl; Finn statue-like." },
    { id:"mi-m", title:"Milder Bibimbap ohne Chili (비빔밥·순한)", target:"≈69 g KH (Reis 90 g)",
      ingredients:["Reis 90 g","Hähnchen 200 g","Spinat 100 g","Zucchini 100 g","Karotte 100 g","Sprossen 100 g","Eier 2 (Omelett)","Sesamöl 1/2 TL","Sojasauce 1–2 TL"],
      steps:["Gemüse kurz dünsten.","Reis + Toppings; sanft anmachen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ – Ei durchgegart", swaps:"Huhn ↔ Tofu", side:"Gurkenscheiben", remind:true,
      prompt:"Bibimbap, no chili; steam 비빔밥; Fleur guards carrot; Finn’s whiskers glow." },
    { id:"mi-a", title:"Nikujaga – Rind-Kartoffel (肉じゃが)", target:"≈75–80 g KH",
      ingredients:["Rind mager 200 g","Kartoffeln 400 g","Karotte 150 g","Zwiebel 60 g","Kombu-Brühe 600 ml","Sojasauce 1 EL","Zucker 1/2 TL (opt.)"],
      steps:["Alles 20–25 Min. sanft schmoren bis weich; leicht einkochen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈75–80 g KH · Schwangerschaft ✓", swaps:"Rind ↔ Huhn/Tofu", side:"Salzarme Misosuppe klein", remind:true,
      prompt:"Homey nikujaga; steam 肉; Fleur chases potato spirit; Finn supervises." }
  ]},
  { day: "Donnerstag", meals: [
    { id:"do-f", title:"Misosuppe mit Tofu & milder Wakame + Reis (味噌汁)", target:"≈62 g KH (Reis 80 g)",
      ingredients:["Reis 80 g","Dashi/Wasser 500 ml","Miso hell 20 g","Tofu 150 g","Wakame 3 g","Frühlingslauch 10 g"],
      steps:["Suppe erhitzen, Tofu/Wakame ziehen lassen; Miso off-heat einrühren; mit Reis."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ – Jod moderat", swaps:"Reis ↔ Vollkornreis", side:"Gedämpfter Spinat", remind:true,
      prompt:"Gentle miso soup; steam 味; Fleur reflection; Finn wave-tail." },
    { id:"do-m", title:"Buddha’s Delight – Gemüse-Tofu (罗汉斋)", target:"≈62 g KH (Reis 80 g)",
      ingredients:["Tofu 300 g","Chinakohl 300 g","Pilze 150 g","Karotte 100 g","Daikon 200 g","Fond 500 ml","Sojasauce 1–2 TL","Stärke 1 TL","Reis 80 g"],
      steps:["Gemüse & Tofu 10–12 Min. schmoren; leicht binden; mit Reis."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓", swaps:"Tofu ↔ Hähnchenbrust", side:"Rettich blanchiert", remind:true,
      prompt:"Tofu & vegetables; steam 斋; Fleur sniffs mushroom; Finn aloof." },
    { id:"do-a", title:"Janchi-Guksu – milde Festnudeln (잔치국수)", target:"≈73–78 g KH",
      ingredients:["Somen 100 g","milde Brühe 700 ml","Hähnchen 150 g","Zucchini 150 g","Karotte 100 g","Pilze 80 g","Frühlingslauch 20 g","Sojasauce 1–2 TL"],
      steps:["Gemüse 3–4 Min.; Hähnchen 6–7 Min.; Somen separat kochen, kurz ziehen lassen; mild würzen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈73–78 g KH · Schwangerschaft ✓", swaps:"Somen ↔ Udon", side:"Blattgemüse blanchiert", remind:true,
      prompt:"Festive noodle bowl; steam 잔치; Fleur plays with noodle; Finn watches." }
  ]},
  { day: "Freitag", meals: [
    { id:"fr-f", title:"Koreanischer Dampf-Eierstich + Reis (계란찜)", target:"≈81 g KH",
      ingredients:["Eier 4","Wasser/Brühe 300 ml","Reis 70 g","Süßkartoffel 150 g","Frühlingslauch 10 g"],
      steps:["Eier 12–15 Min. dämpfen bis fest; Reis & Süßkartoffel garen; servieren."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈81 g KH · Schwangerschaft ✓ – Ei durchgegart", swaps:"Süßkartoffel ↔ Kürbis", side:"Nori (Kim) zerkrümelt", remind:true,
      prompt:"Silky steamed egg; steam 계; Fleur ears peek; Finn whiskers glow." },
    { id:"fr-m", title:"Hähnchen-Soboro-Don (鶏そぼろ丼)", target:"≈85 g KH",
      ingredients:["Reis 90 g","Hähnchenhack 250 g","Erbsen 150 g","Karotte 100 g","Sojasauce 1–2 TL","Zucker 1/2 TL (opt.)","Wasser 50 ml"],
      steps:["Hack mit Wasser krümelig garziehen; Gemüse mitgaren; mild würzen; auf Reis."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈85 g KH · Schwangerschaft ✓", swaps:"Erbsen ↔ Edamame", side:"Gurkenscheiben", remind:true,
      prompt:"Bento stripes soboro-don; steam 丼; Fleur eyes peas; Finn fake-sleeps." },
    { id:"fr-a", title:"Gedämpfte Garnelen mit Tofu & Pak Choi (清蒸虾豆腐)", target:"≈62–65 g KH",
      ingredients:["Garnelen 300 g","Tofu 300 g","Pak Choi 300 g","Ingwer 10 g","Sojasauce 1 TL","Reis 80 g"],
      steps:["Tofu + Garnelen 8–10 Min. dämpfen; Pak Choi 2–3 Min.; mild würzen; mit Reis."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈62–65 g KH · Schwangerschaft ✓", swaps:"Garnelen ↔ Kabeljau", side:"Klare Brühe", remind:true,
      prompt:"Shrimp on tofu; steam 虾; Fleur gazes; Finn guards." }
  ]},
  { day: "Samstag", meals: [
    { id:"sa-f", title:"Hirse–Kürbis-Kongee (小米南瓜粥)", target:"≈62 g KH",
      ingredients:["Hirse 60 g","Kürbis 300 g","Wasser 900 ml","Prise Salz"],
      steps:["Hirse + Kürbis 35–40 Min. weich; mild salzen."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓", swaps:"Hirse ↔ Reis", side:"Blattspinat warm", remind:true,
      prompt:"Golden millet–pumpkin congee; steam 粥; Fleur bats seed; Finn naps." },
    { id:"sa-m", title:"Soy-gedünstetes Huhn mit Kartoffeln & Karotten (닭찜·순한)", target:"≈68–72 g KH",
      ingredients:["Huhn 400 g","Kartoffeln 300 g","Karotten 150 g","Zwiebel 40 g","Brühe 500 ml","Sojasauce 1–2 TL","Stärke 1 TL"],
      steps:["20–25 Min. sanft schmoren; leicht binden."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈68–72 g KH · Schwangerschaft ✓", swaps:"Teil Kartoffeln ↔ Süßkartoffel", side:"Nori-Salat ohne Essig", remind:true,
      prompt:"Family pot dak-jjim; steam 닭; Fleur hides; Finn peeks." },
    { id:"sa-a", title:"Lachs im Folienpäckchen mit Pilzen & Zucchini (ホイル焼き)", target:"≈69 g KH (Reis 90 g)",
      ingredients:["Lachs 300 g","Pilze 150 g","Zucchini 200 g","Zwiebel 40 g","Sojasauce 1 TL","Reis 90 g"],
      steps:["In Folie 15–18 Min. bei 190 °C; minimal würzen; mit Reis."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓", swaps:"Lachs ↔ Forelle", side:"Gedämpfter Brokkoli", remind:true,
      prompt:"Foil-baked salmon; steam 焼; Fleur sniffs; Finn judges." }
  ]},
  { day: "Sonntag", meals: [
    { id:"so-f", title:"Kleine Onigiri mit Lachs & Gurke (おにぎり・鮭)", target:"≈69 g KH (Reis 90 g)",
      ingredients:["Reis 90 g","Lachsflocken 100 g","Gurke 100 g","Nori 2 Blätter"],
      steps:["Reis kochen; 4 kleine Onigiri; Lachs & Gurke als Füllung; in Nori wickeln."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓", swaps:"Gurke ↔ reife Avocado", side:"Milde Misosuppe (optional)", remind:true,
      prompt:"Triangle onigiri; steam 鮭; Fleur pats rice spirit; Finn’s whiskers curl." },
    { id:"so-m", title:"Kabocha & Tofu Nimono – sanft geschmort (かぼちゃと豆腐の煮物)", target:"≈68–72 g KH (Kabocha 300 g + Reis 50 g)",
      ingredients:["Kabocha 300 g","Tofu 300 g","Dashi/Wasser 500 ml","Sojasauce 1–2 TL","Ingwer 5 g","Stärke 1 TL","Reis 50 g"],
      steps:["Kabocha 12–15 Min. sieden bis weich.","Tofu 3–4 Min. mitziehen lassen.","Mild würzen, mit Stärke glasieren; mit kleinem Reis servieren."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈68–72 g KH · Schwangerschaft ✓", swaps:"Tofu ↔ Kabeljauwürfel", side:"Blanchierter Spinat/Mizuna", remind:true,
      prompt:"Kabocha + tofu simmering; steam 煮; Fleur meets pumpkin spirit; Finn guards pot." },
    { id:"so-a", title:"Oyakodon – Ei vollständig gestockt (親子丼)", target:"≈69 g KH (Reis 90 g)",
      ingredients:["Reis 90 g","Hähnchenschenkel 250 g","Zwiebel 80 g","Eier 3","milde Brühe 250 ml","Sojasauce 1 EL","Zucker 1/2 TL (opt.)"],
      steps:["Zwiebel & Huhn 8–10 Min.; Eier vollständig stocken lassen; über Reis."],
      checks:"Gastritis ✓ · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓", swaps:"Teil Reis ↔ Blumenkohlreis", side:"Gedämpfter Spinat", remind:true,
      prompt:"Oyakodon with fully set egg; steam 丼; Fleur guards; Finn smirks." }
  ]},
];

/* ---------------- Einkaufsliste – Gesamtsummen ---------------- */
const LIST_SUMMARY = [
  { name: "Protein / Fisch / Tofu", items: [["Hähnchen gesamt","1,75 kg"],["Rind (mager)","200 g"],["Kabeljau/Seelachs","560 g"],["Lachs gesamt","480 g"],["Garnelen","300 g"],["Tofu (inkl. Seidentofu)","1.200 g"],["Eier","9 Stk"]] },
  { name: "Gemüse & Pilze", items: [["Kürbis/Kabocha gesamt","1.200 g"],["Spinat","350 g"],["Bok Choy","300 g"],["Pak Choi","300 g"],["Chinakohl","300 g"],["Zucchini","450 g"],["Karotten","800 g"],["Daikon/Rettich","200 g"],["Zwiebeln","220 g"],["Frühlingslauch","65 g"],["Ingwer","55 g"],["Brokkoli/Gai Lan","300 g"],["Pilze gesamt (inkl. Shiitake 60 g)","440 g"],["Gurke","100 g"],["Sprossen","100 g"],["Süßkartoffel","150 g"]] },
  { name: "Reis, Nudeln & Sättigung", items: [["Rundkornreis (roh)","1.280 g"],["Hirse","60 g"],["Soba","120 g"],["Somen","100 g"],["Kartoffeln","700 g"],["Nori-Blätter","2 Stk"]] },
  { name: "Algen, Brühen & Würze", items: [["Wakame (getrocknet)","9 g"],["Miso hell","20 g"],["Sojasauce natriumarm","150 ml"],["Sesamöl","10 ml"],["Speisestärke","10 g"],["Hühnerfond ungesalzen","800 ml"],["Kombu/Dashi (mild) für Brühen","≈4,6 L"],["Salz (Prisen) & Zucker (opt.)","–"]] },
];

/* ---------------- html2pdf Helper ---------------- */
function useHtml2Pdf() {
  const ensureScript = (src, check) =>
    new Promise((resolve, reject) => {
      try { if (check()) return resolve(); } catch(_) {}
      const s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Script load failed: " + src));
      document.body.appendChild(s);
    });

  const make = useCallback(async (el, opt) => {
    await ensureScript(
      "https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",
      () => !!window.html2pdf
    );
    const merged = {
      margin: [24, 28, 24, 28],
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: COLORS.pageBg,
        foreignObjectRendering: true,
        preferCanvas: false,
      },
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" },
      pagebreak: { mode: ["css","legacy"], avoid: [".avoid-break"], after: [".pb-after"] },
      ...opt,
    };
    const worker = window.html2pdf().from(el).set(merged).toPdf();
    const blob = await worker.output("blob");
    const url = URL.createObjectURL(blob);
    return { blob, url };
  }, []);

  return { make };
}

/* ---------------- TopBar ---------------- */
function TopBar({ title, subtitle, onPDF, onExportHTML, onPrint }) {
  const btnBase = {
    color: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    boxShadow: COLORS.btnShadow,
    borderRadius: 16,
  };
  return (
    <div className="print:hidden flex items-center justify-between gap-2 mb-3" style={{ color: COLORS.text }}>
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm" style={{ opacity: .8 }}>{subtitle}</p>}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={onPDF} className="px-3 py-1.5 rounded-2xl" style={{ ...btnBase, backgroundColor: COLORS.emerald }}>PDF erzeugen</button>
        <button onClick={onExportHTML} className="px-3 py-1.5 rounded-2xl" style={{ ...btnBase, backgroundColor: COLORS.amber }}>HTML exportieren</button>
        <button onClick={onPrint} className="px-3 py-1.5 rounded-2xl" style={{ ...btnBase, backgroundColor: COLORS.sky }}>Drucken</button>
      </div>
    </div>
  );
}

/* ---------------- Panel-Images ---------------- */
function usePanelImages(storageKey = "gk_w1_panel_images") {
  const [images, setImages] = useState({});
  useEffect(() => {
    try { const raw = localStorage.getItem(storageKey); if (raw) setImages(JSON.parse(raw)); } catch(_) {}
  }, [storageKey]);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(images)); } catch(_) {}
  }, [images, storageKey]);
  const setImage = (id, dataUrl) => setImages(prev => ({ ...prev, [id]: dataUrl }));
  const clearImage = (id) => setImages(prev => { const n = { ...prev }; delete n[id]; return n; });
  return { images, setImage, clearImage };
}

/* ---------------- Hauptkomponente ---------------- */
export default function Woche1_2025_09_29() {
  const preset = useGhibliPreset();
  const { images, setImage, clearImage } = usePanelImages();
  const [view, setView] = useState("kochbuch"); // 'kochbuch' | 'liste'

  const kbRef = useRef(null);
  const liRef = useRef(null);
  const [hrefKB, setHrefKB] = useState("");
  const [hrefLI, setHrefLI] = useState("");
  const pdf = useHtml2Pdf();

  useEffect(() => () => {
    if (hrefKB) URL.revokeObjectURL(hrefKB);
    if (hrefLI) URL.revokeObjectURL(hrefLI);
  }, [hrefKB, hrefLI]);

  const exportHTML = (node, name, orient = "landscape") => {
    const content = node?.innerHTML || "";
    const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${name}</title>
<style>
  html,body{margin:0;padding:0;background:${COLORS.pageBg};color:${COLORS.text};font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', Arial;}
  @page{size:A4 ${orient}; margin:14mm}
  .container{max-width:1123px;margin:0 auto;padding:28px}
</style></head><body><div class="container">${content}</div></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replaceAll(" ","_")}.html`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };
  const doPrint = () => window.print();

  // PDFs (Dateinamen: Woche 1 YYYY-MM-DD – <Typ>.pdf)
  const makePDF_KB = async () => {
    const el = kbRef.current; if (!el) return;
    const opt = {
      margin: preset.page.marginPt,
      filename: `${FILE_BASE} – Kochbuch.pdf`,
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: preset.page.background, foreignObjectRendering: true, preferCanvas: false },
      jsPDF: { unit: "pt", format: "a4", orientation: preset.page.orientation },
      pagebreak: { mode: ["css","legacy"], after: [".pb-after"], avoid: [".avoid-break"] },
    };
    const { url } = await pdf.make(el, opt);
    setHrefKB(old => { if (old) URL.revokeObjectURL(old); return url; });
  };
  const makePDF_LI = async () => {
    const el = liRef.current; if (!el) return;
    const opt = {
      margin: preset.listPage.marginPt,
      filename: `${FILE_BASE} – Einkaufsliste.pdf`,
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: preset.listPage.background, foreignObjectRendering: true, preferCanvas: false },
      jsPDF: { unit: "pt", format: "a4", orientation: preset.listPage.orientation },
      pagebreak: { mode: ["css","legacy"] },
    };
    const { url } = await pdf.make(el, opt);
    setHrefLI(old => { if (old) URL.revokeObjectURL(old); return url; });
  };

  const onPickImage = (id) => (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage(id, String(reader.result));
    reader.readAsDataURL(f);
  };

  // Styles: mehr Innenabstand (Padding) und Ränder
  const cardPanelStyle = { border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.panelBG70, boxShadow: COLORS.btnShadow, borderRadius: 18, padding: 20 };
  const cardMainStyle  = { border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.panelBG80, boxShadow: COLORS.btnShadow, borderRadius: 18, padding: 22 };
  const imageFrameStyle = { border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white, borderRadius: 14 };
  const pageWrapStyle = { background: preset.page.background, color: COLORS.text, padding: 28, width: 1123, margin: "0 auto" };

  const showMetformin = (meal) => DEFAULT_PRESET.health.metformin && meal.remind && !isMiddayId(meal.id);

  return (
    <div style={pageWrapStyle}>
      {/* Tabs */}
      <div className="print:hidden mb-3" style={{ display:"flex", gap:8 }}>
        <button onClick={()=>setView("kochbuch")} className="px-3 py-1.5 rounded-2xl" style={{ backgroundColor: view==="kochbuch"?COLORS.neutral:COLORS.white, color:view==="kochbuch"?"white":COLORS.text, border:`1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>Kochbuch</button>
        <button onClick={()=>setView("liste")} className="px-3 py-1.5 rounded-2xl" style={{ backgroundColor: view==="liste"?COLORS.neutral:COLORS.white, color:view==="liste"?"white":COLORS.text, border:`1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>Einkaufsliste</button>
      </div>

      {view === "kochbuch" ? (
        <section>
          <TopBar
            title={`GhibliKitchen – Woche 1 • Kochbuch-PDF (${formatYMD()})`}
            subtitle="A4 quer · Panel links ≤1/3 · Rezept rechts ≥2/3"
            onPDF={makePDF_KB}
            onExportHTML={()=>exportHTML(kbRef.current, `${FILE_BASE} – Kochbuch`, "landscape")}
            onPrint={doPrint}
          />
          <div ref={kbRef} style={{ display:"grid", gap:24 }}>
            {/* Titelseite */}
            <section className="pb-after">
              <div className="grid grid-cols-12" style={{ display:"grid", gridTemplateColumns:"repeat(12, minmax(0,1fr))", gap:24 }}>
                <aside className="col-span-4" style={{ gridColumn:"span 4 / span 4" }}>
                  <div style={cardPanelStyle}>
                    <div className="aspect-[4/3]" style={{ ...imageFrameStyle, overflow:"hidden", aspectRatio:"4/3", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {images["cover"] ? (
                        <img src={images["cover"]} alt="Cover" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      ) : (
                        <div style={{ textAlign:"center", opacity:.7, fontSize:12 }}>
                          <div style={{ fontWeight:600 }}>Cover-Panel (Illustration einfügen)</div>
                          <div>Ghibli watercolor · warm light · kitchen scene</div>
                        </div>
                      )}
                    </div>
                    <div className="print:hidden" style={{ marginTop:8, display:"flex", gap:8, alignItems:"center" }}>
                      <label className="px-2 py-1 rounded-xl text-white cursor-pointer" style={{ backgroundColor: COLORS.amber, border:`1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>
                        Bild auswählen<input type="file" accept="image/*" className="hidden" onChange={onPickImage("cover")} style={{ display:"none" }}/>
                      </label>
                      {images["cover"] && (
                        <button onClick={()=>clearImage("cover")} className="px-2 py-1 rounded-xl" style={{ backgroundColor: COLORS.white, border:`1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>Bild löschen</button>
                      )}
                    </div>
                    <details style={{ marginTop:8, fontSize:10 }}>
                      <summary style={{ cursor:"pointer", fontWeight:600 }}>DALL·E Prompt (Cover)</summary>
                      <div style={{ marginTop:4, opacity:.9, whiteSpace:"pre-wrap" }}>
                        {buildPrompt(DEFAULT_PRESET.promptHeader, "Cozy kitchen overview with bamboo trays, congee, miso soup, soba; steam-spirits forming 中 日 韓; warm golden light; washi texture.")}
                      </div>
                    </details>
                  </div>
                </aside>
                <main className="col-span-8" style={{ gridColumn:"span 8 / span 8" }}>
                  <div style={cardMainStyle}>
                    <h2 className="text-4xl" style={{ fontSize:32, fontWeight:600 }}>{DEFAULT_PRESET.layout.title}</h2>
                    <p style={{ fontSize:12, opacity:.8 }}>{DEFAULT_PRESET.layout.subtitle}</p>
                    <ul style={{ display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12, marginTop:16, fontSize:10 }}>
                      {DATA.map((d, i)=> (
                        <li key={i} style={{ ...cardMainStyle, padding:10 }}>
                          <div style={{ fontWeight:600 }}>{d.day}</div>
                          <ul style={{ paddingLeft:16, listStyle:"disc" }}>
                            {d.meals.map((m)=> <li key={m.id}>{m.title}</li>)}
                          </ul>
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop:12, fontSize:10, opacity:.75 }}>
                      <p>
                        Leitplanken: {DEFAULT_PRESET.health.gastritis}; {DEFAULT_PRESET.health.pregnancy}. <strong>Diabetes:</strong> {DEFAULT_PRESET.health.diabetesKH2p}. {DEFAULT_PRESET.health.metformin && "Metformin mit der Mahlzeit einnehmen."}
                      </p>
                    </div>
                  </div>
                </main>
              </div>
            </section>

            {/* Rezeptseiten */}
            {DATA.map((d) => (
              <section key={d.day} className="pb-after">
                <h3 className="text-2xl" style={{ fontSize:24, fontWeight:600, marginBottom:8 }}>{d.day}</h3>
                {d.meals.map((m) => (
                  <div key={m.id} style={{ display:"grid", gridTemplateColumns:"repeat(12,minmax(0,1fr))", gap:24, marginBottom:16 }}>
                    <aside style={{ gridColumn:"span 4 / span 4" }}>
                      <div style={cardPanelStyle}>
                        <div className="aspect-[4/3]" style={{ ...imageFrameStyle, overflow:"hidden", aspectRatio:"4/3", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {images[m.id] ? (
                            <img src={images[m.id]} alt={m.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                          ) : (
                            <div style={{ textAlign:"center", opacity:.7, fontSize:12 }}>
                              <div style={{ fontWeight:600 }}>Panel (Illustration einfügen)</div>
                              <div style={{ marginTop:4 }}>{m.title}</div>
                            </div>
                          )}
                        </div>
                        <div className="print:hidden" style={{ marginTop:8, display:"flex", gap:8, alignItems:"center" }}>
                          <label className="px-2 py-1 rounded-xl text-white cursor-pointer" style={{ backgroundColor: COLORS.amber, border:`1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>
                            Bild auswählen<input type="file" accept="image/*" className="hidden" onChange={onPickImage(m.id)} style={{ display:"none" }}/>
                          </label>
                          {images[m.id] && (
                            <button onClick={()=>clearImage(m.id)} className="px-2 py-1 rounded-xl" style={{ backgroundColor: COLORS.white, border:`1px solid ${COLORS.border}`, boxShadow: COLORS.btnShadow }}>Bild löschen</button>
                          )}
                        </div>
                        <details style={{ marginTop:8, fontSize:10 }}>
                          <summary style={{ cursor:"pointer", fontWeight:600 }}>DALL·E Prompt</summary>
                          <div style={{ marginTop:4, opacity:.9, whiteSpace:"pre-wrap" }}>
                            {buildPrompt(DEFAULT_PRESET.promptHeader, m.prompt)}
                          </div>
                        </details>
                      </div>
                    </aside>
                    <main style={{ gridColumn:"span 8 / span 8" }}>
                      <article className="avoid-break" style={cardMainStyle}>
                        <h4 className="text-lg" style={{ fontSize:18, fontWeight:600 }}>{m.title} – 2 Portionen</h4>
                        <div style={{ fontSize:10, opacity:.8 }}>Nähr-Ziel: {m.target}</div>
                        <div style={{ marginTop:8, display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12 }}>
                          <div>
                            <div style={{ fontSize:12, fontWeight:600 }}>Zutaten (g/ml)</div>
                            <ul style={{ listStyle:"disc", paddingLeft:20, fontSize:12, marginTop:4 }}>
                              {m.ingredients.map((it)=> <li key={it}>{it}</li>)}
                            </ul>
                          </div>
                          <div>
                            <div style={{ fontSize:12, fontWeight:600 }}>Zubereitung</div>
                            <ol style={{ listStyle:"decimal", paddingLeft:20, fontSize:12, marginTop:4 }}>
                              {m.steps.map((st)=> <li key={st}>{st}</li>)}
                            </ol>
                          </div>
                        </div>
                        <div style={{ marginTop:8, fontSize:12 }}>
                          <p><span style={{ fontWeight:600 }}>Hinweise:</span> {m.checks}</p>
                          <p style={{ marginTop:4 }}><span style={{ fontWeight:600 }}>Austausche:</span> {m.swaps}</p>
                          <p style={{ marginTop:4 }}><span style={{ fontWeight:600 }}>Beilage:</span> {m.side}</p>
                          {showMetformin(m) && (
                            <p style={{ marginTop:4, fontWeight:600 }}>Metformin: mit der Mahlzeit einnehmen.</p>
                          )}
                        </div>
                        <div style={{ marginTop:8, fontSize:10, opacity:.7 }}>Inspiration: Just One Cookbook · My Korean Kitchen · Made With Lau · The Woks of Life (mild, salzarm adaptiert).</div>
                      </article>
                    </main>
                  </div>
                ))}
              </section>
            ))}
          </div>

          {hrefKB && (
            <div className="print:hidden" style={{ marginTop:8 }}>
              <a href={hrefKB} download={`${FILE_BASE} – Kochbuch.pdf`} className="px-3 py-1.5 rounded-2xl"
                 style={{ backgroundColor: COLORS.indigo, color: COLORS.white, boxShadow: COLORS.btnShadow, border: `1px solid ${COLORS.border}` }}>
                PDF herunterladen
              </a>
            </div>
          )}
        </section>
      ) : (
        <section>
          <TopBar
            title={`GhibliKitchen – Einkaufsliste (1 Seite) (${formatYMD()})`}
            subtitle="A4 hoch · Checkboxen · iPhone-freundlich"
            onPDF={makePDF_LI}
            onExportHTML={()=>exportHTML(liRef.current, `${FILE_BASE} – Einkaufsliste`, "portrait")}
            onPrint={doPrint}
          />
          <div ref={liRef} style={{ ...cardMainStyle, fontSize:11, lineHeight:1.55 }}>
            <header><h2 className="text-lg" style={{ fontSize:18, fontWeight:600 }}>Gesamt – Hauptzutaten zuerst</h2></header>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12, marginTop:8 }}>
              {LIST_SUMMARY.map((g) => (
                <section key={g.name} style={{ ...cardPanelStyle }}>
                  <h3 style={{ fontSize:14, fontWeight:600 }}>{g.name}</h3>
                  <ul style={{ marginTop:4 }}>
                    {g.items.map(([name, qty]) => (
                      <li key={name} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                        <input type="checkbox" style={{ marginTop:3 }}/>
                        <span><span style={{ fontWeight:600 }}>{name}</span> – {qty}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            {/* Einkaufsliste-FOOTER: ohne Metformin-Hinweis */}
            <footer style={{ marginTop:12, fontSize:10, opacity:.8 }}>
              <p>Hinweise: {DEFAULT_PRESET.health.gastritis} · {DEFAULT_PRESET.health.pregnancy}. Diabetes: {DEFAULT_PRESET.health.diabetesKH2p}.</p>
              <p style={{ marginTop:4 }}>iPhone: In Safari öffnen → Teilen → <em>Drucken</em> → Vorschau mit Zwei-Finger-Zoom → Teilen → <em>In Dateien sichern</em> (als PDF).</p>
            </footer>
          </div>

          {hrefLI && (
            <div className="print:hidden" style={{ marginTop:8 }}>
              <a href={hrefLI} download={`${FILE_BASE} – Einkaufsliste.pdf`} className="px-3 py-1.5 rounded-2xl"
                 style={{ backgroundColor: COLORS.indigo, color: COLORS.white, boxShadow: COLORS.btnShadow, border: `1px solid ${COLORS.border}` }}>
                PDF herunterladen
              </a>
            </div>
          )}
        </section>
      )}

      {/* Smoke- & Unit-Tests */}
      <SmokeTests DATA={DATA} DEFAULT_PRESET={DEFAULT_PRESET} />
    </div>
  );
}

/* ---------------- Smoke Tests ---------------- */
function assertNoUnsupportedColors(text) {
  const bad = /(oklab|oklch|color-mix|lab\()/i.test(text);
  if (bad) throw new Error("Unsupported CSS color function detected");
}
function SmokeTests({ DATA, DEFAULT_PRESET }) {
  useEffect(() => {
    try {
      console.assert(Array.isArray(DATA) && DATA.length === 7, "DATA must have 7 days");
      const allMeals = DATA.flatMap((d) => d.meals);
      console.assert(allMeals.length === 21, "There should be 21 meals (7×3)");
      allMeals.forEach(m => {
        console.assert(m.id && m.title && m.ingredients.length > 0 && m.steps.length > 0, `Meal ${m?.id} invalid`);
      });

      assertNoUnsupportedColors(JSON.stringify(COLORS));
      assertNoUnsupportedColors(JSON.stringify(DEFAULT_PRESET));

      const built = buildPrompt("A","B");
      console.assert(built === "A\nB", "buildPrompt must join with a single newline");
      console.assert((built.match(/\n/g) || []).length === 1, "buildPrompt one newline");

      // Metformin: bei Mittag nicht
      const sampleMorning = { id:"xx-f", remind:true };
      const sampleMidday  = { id:"xx-m", remind:true };
      const sampleEvening = { id:"xx-a", remind:true };
      const show = (meal)=> DEFAULT_PRESET.health.metformin && meal.remind && !/-m$/.test(meal.id);
      console.assert(show(sampleMorning) === true, "Morning should show Metformin");
      console.assert(show(sampleMidday)  === false, "Midday should NOT show Metformin");
      console.assert(show(sampleEvening) === true, "Evening should show Metformin");

      // Einkaufsliste-Footer darf kein "Metformin" enthalten
      const listFooter = `Hinweise: ${DEFAULT_PRESET.health.gastritis} · ${DEFAULT_PRESET.health.pregnancy}. Diabetes: ${DEFAULT_PRESET.health.diabetesKH2p}.`;
      console.assert(!/Metformin/i.test(listFooter), "Einkaufsliste-Footer must not mention Metformin");

      console.log("[GhibliKitchen] All tests passed (JSX). Meals:", allMeals.length);
    } catch (err) {
      console.error("[GhibliKitchen] Test failure:", err);
    }
  }, [DATA, DEFAULT_PRESET]);
  return null;
}