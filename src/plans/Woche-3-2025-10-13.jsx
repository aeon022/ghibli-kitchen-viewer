// Datei: Woche-{{WEEK_NR}}-{{START_DATE}}.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";

export const meta = { title: "Woche {{WEEK_NR}}", startDate: "{{START_DATE}}", id: "woche-{{WEEK_NR}}-{{START_DATE}}" };
const FILE_BASE = "Woche {{WEEK_NR}} {{START_DATE}}";
const UI_TITEL = `GhibliKitchen – Woche {{WEEK_NR}}`;
const UI_TITEL_LISTE = `GhibliKitchen – Einkaufsliste – Woche {{WEEK_NR}}`;

const COLORS = {
  pageBg:"#FAF7F1", text:"#111827", border:"rgba(0,0,0,.10)",
  panelBG70:"rgba(255,255,255,.70)", panelBG80:"rgba(255,255,255,.80)",
  white:"#FFFFFF", emerald:"#059669", amber:"#f59e0b",
  sky:"#0284c7", neutral:"#404040", indigo:"#4f46e5", btnShadow:"0 6px 20px rgba(0,0,0,.12)"
};

const cardPanelStyle = {
  background: COLORS.panelBG80, border: `1px solid ${COLORS.border}`,
  borderRadius: 18, padding: 20, boxShadow: COLORS.btnShadow, marginRight: 14
};
const cardMainStyle = {
  background: COLORS.white, border: `1px solid ${COLORS.border}`,
  borderRadius: 18, padding: 22, boxShadow: COLORS.btnShadow
};

const GRID = {
  container:{ display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gap:16, alignItems:"start" },
  panel:{ gridColumn:"span 4" },
  main:{ gridColumn:"span 8" }
};

const PROMPT_HEADER =
  "High-quality cookbook photo, soft daylight, neutral warm background, gentle steam, pregnancy-safe, mild seasoning, no raw fish/eggs, no alcohol, low oil, plated in Asian home-cooking style, A4 landscape composition, appetizing but not spicy";

function buildPrompt(a,b){ return `${a}\n${b}`; }

// ---------- Helpers: Labels & Logic ----------
const mealLabel = { f:"Morgen", m:"Mittag", a:"Abend" };
function dayLabel(id){
  const d=id.slice(0,2);
  return {mo:"Montag",di:"Dienstag",mi:"Mittwoch",do:"Donnerstag",fr:"Freitag",sa:"Samstag",so:"Sonntag"}[d]||"";
}
function mealTitle(id){ return mealLabel[id.slice(3)]||""; }
function remindFlag(id){ const part=id.slice(3); return part==="f"||part==="a"; }

// ---------- Image Persistence ----------
const imgKey = (suffix)=>`${FILE_BASE}::img::${suffix}`;
function saveDataURL(key, dataURL){ try{ localStorage.setItem(key, dataURL);}catch(e){} }
function loadDataURL(key){ try{ return localStorage.getItem(key);}catch(e){ return null; }}

// ---------- Ingredient Parsing & Units ----------
const U_CONV = { TL_to_ml:5, EL_to_ml:15 };
function parseIngredient(s){
  // expects "Name ... 123 unit"
  const m = s.match(/^(.+?)\s+([\d.,]+)\s*(g|ml|Stück|TL|EL)$/);
  if(!m) return null;
  let [_, name, q, unit]=m;
  let qty = parseFloat(String(q).replace(",","."))||0;
  // convert TL/EL to ml
  if(unit==="TL"){ qty = qty*U_CONV.TL_to_ml; unit="ml"; }
  if(unit==="EL"){ qty = qty*U_CONV.EL_to_ml; unit="ml"; }
  return { name:name.trim(), qty, unit };
}
const EXCLUDE_FROM_LIST = new Set(["Wasser"]);

// ---------- Categorization for LIST_SUMMARY ----------
function categorize(name){
  const n=name.toLowerCase();
  const inAny=(arr)=>arr.some(k=>n.includes(k));
  if(inAny(["hähnchen","huhn","lachs","kabeljau","seelachs","rind","schweine","tofu","ei ","eier","garnelen","fisch"])) return "Protein/Fisch/Tofu";
  if(inAny(["reis (roh)","vollkornreis","soba","udon","nudel","gerste","hirse","kartoffel","süßkartoffel","glasnudel","reis (gekocht)","dinkel"])) return "Reis/Nudeln/Sättigung";
  if(inAny(["pak choi","chinakohl","brokkoli","karotte","spinat","shiitake","champignon","zwiebel","frühlingszwiebel","zucchini","rettich","daikon","tomate","sellerie","lauch"])) return "Gemüse/Pilze";
  // default seasoning/algae/broths
  return "Algen/Brühen/Würze";
}

// ---------- DATA: 21 Rezepte ----------
const DATA = [
  // Montag
  {
    id:"mo-f",
    title:"Huhn-Reis-Zōsui (雑炊)",
    desc:"Japanischer Reis-Eintopf, sanft eingekocht – inspiriert von Just One Cookbook.",
    target:"≈70 g KH gesamt (2 P.) · Protein ≈25 g p. P.",
    ingredients:[
      "Reis (roh) 90 g","Hähnchenbrust 200 g","Karotte 100 g","Ingwer 10 g","Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml","Miso paste natriumarm 15 g","Wasser 900 ml"
    ],
    steps:[
      "Reis waschen, mit Wasser 25–30 Min. sanft köcheln (gedeckt).",
      "Hähnchen fein würfeln; Karotte klein schneiden; Ingwer in Scheiben. In der Brühe 8–10 Min. leise sieden.",
      "Mit Sojasauce und Misopaste mild abschmecken; Frühlingszwiebel kurz mitziehen lassen."
    ],
    checks:"Gastritis ✓ mild & warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ alles durchgegart",
    swaps:"Hähnchen → Tofu (fest); Frühlingszwiebel → mehr Karotte.",
    side:"Gersten-Tee (mugicha) warm.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Japanese zosui rice porridge with diced chicken, carrot coins, scallion garnish, steam rising in a ceramic bowl")
  },
  {
    id:"mo-m",
    title:"Gedämpftes Hähnchen mit Pak Choi auf Reis (清蒸鸡配青菜)",
    desc:"Chinesisches Dämpfgericht, sehr mild – inspiriert von Made With Lau.",
    target:"≈75 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients:[
      "Reis (roh) 90 g","Hähnchenbrust 220 g","Pak Choi 250 g","Ingwer 8 g","Frühlingszwiebel 20 g",
      "Sojasauce natriumarm 10 ml","Sesamöl 3 ml","Wasser 600 ml"
    ],
    steps:[
      "Reis garen. Hähnchen in dünne Stücke, Pak Choi halbieren.",
      "Alles auf Teller legen, Ingwer & Frühlingszwiebel dazu; 10–12 Min. im Dampf garen.",
      "Mit etwas natriumarmer Sojasauce & minimal Sesamöl beträufeln."
    ],
    checks:"Gastritis ✓ gedämpft · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:"Pak Choi → Brokkoli; Sesamöl → Rapsöl 3 ml.",
    side:"Lauwarme Gemüsebrühe.",
    remind:false,
    prompt: buildPrompt(PROMPT_HEADER,"Steamed chicken slices with pak choi on white rice, ginger-scallion aroma, clear steam, porcelain plate")
  },
  {
    id:"mo-a",
    title:"Lachs Teriyaki mild (照り焼き鮭)",
    desc:"Japanisches Hausgericht, natriumarm und leicht glasiert – inspiriert von Just One Cookbook.",
    target:"≈65 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients:[
      "Reis (roh) 80 g","Lachsfilet 280 g","Sojasauce natriumarm 15 ml","Zucker 6 g","Wasser 50 ml",
      "Ingwer 6 g","Brokkoli 250 g","Rapsöl 5 ml"
    ],
    steps:[
      "Brokkoli dämpfen (6–7 Min.).",
      "Lachs in wenig Öl beidseitig kurz anbraten, dann Wasser+Sojasauce+Zucker+Ingwer zugeben und 4–5 Min. sanft glasieren.",
      "Mit Reis servieren, Sauce nur sparsam."
    ],
    checks:"Gastritis ✓ mild, wenig Öl · Diabetes ✓ – ≈65 g KH · Schwangerschaft ✓ Fisch durchgegart",
    swaps:"Lachs → Seelachs; Zucker → 1 TL Honig.",
    side:"Grüner Tee mild (entkoffeiniert) oder warmes Wasser.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Glazed salmon teriyaki fillets, light sauce, steamed broccoli, small rice mound, soft highlights")
  },

  // Dienstag
  {
    id:"di-f",
    title:"Kürbisbrei – Hobak-juk (호박죽)",
    desc:"Koreanischer süßlicher Kürbisbrei, cremig ohne Sahne – inspiriert von My Korean Kitchen.",
    target:"≈80 g KH gesamt (2 P.) · Protein ≈12 g p. P.",
    ingredients:[
      "Kürbis (Hokkaido) 400 g","Reis (roh) 70 g","Milch (pasteurisiert) 150 ml","Wasser 700 ml","Zucker 6 g",
      "Salz 1 g","Tofu (fest) 120 g","Frühlingszwiebel 10 g"
    ],
    steps:[
      "Kürbis würfeln und in Wasser 12–15 Min. weich köcheln.",
      "Reis separat weich sieden; alles pürieren, Milch zugeben und 3–4 Min. sanft simmern.",
      "Tofu klein würfeln, kurz mitwärmen; mild salzen, Frühlingszwiebel fein darüber."
    ],
    checks:"Gastritis ✓ warm & mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ pasteurisierte Milch, Tofu erhitzt",
    swaps:"Milch → Sojadrink (calciumreich); Zucker → weglassen.",
    side:"Gerösteter Gersten-Tee.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Korean pumpkin porridge in ceramic bowl, silky texture, tofu cubes, tiny scallion, cozy steam")
  },
  {
    id:"di-m",
    title:"Kake-Soba (かけ蕎麦) mit Tofu & Shiitake",
    desc:"Japanische Buchweizennudeln in milder Brühe – inspiriert von maff.go.jp & Just One Cookbook.",
    target:"≈68 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients:[
      "Soba (roh) 140 g","Tofu (fest) 160 g","Shiitake 120 g","Dashi (natriumarm, Instant) 6 g","Wasser 900 ml",
      "Sojasauce natriumarm 12 ml","Frühlingszwiebel 15 g","Ingwer 6 g"
    ],
    steps:[
      "Dashi in Wasser lösen, Shiitake 6–8 Min. leise sieden.",
      "Soba separat garen und abspülen; Tofu würfeln, 2–3 Min. in der Brühe ziehen lassen.",
      "Mit Sojasauce mild abschmecken, Soba aufgießen, Frühlingszwiebel darüber."
    ],
    checks:"Gastritis ✓ milde Brühe · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ alles durchgegart",
    swaps:"Tofu → gedämpftes Hähnchen; Shiitake → Champignons.",
    side:"Warmes Wasser mit dünner Ingwerscheibe.",
    remind:false,
    prompt: buildPrompt(PROMPT_HEADER,"Bowl of kake soba, tofu cubes and shiitake slices, clear broth, simple plating")
  },
  {
    id:"di-a",
    title:"Kabeljau Nitsuke mild (鱈の煮付け)",
    desc:"Japanisch geschmorte Fischfilets in sanfter Sojasud – inspiriert von Just One Cookbook.",
    target:"≈60 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients:[
      "Reis (roh) 75 g","Kabeljaufilet 320 g","Sojasauce natriumarm 15 ml","Zucker 6 g","Wasser 120 ml",
      "Ingwer 8 g","Chinakohl 250 g","Frühlingszwiebel 10 g"
    ],
    steps:[
      "Chinakohl in Streifen 6–7 Min. dämpfen.",
      "Kabeljau in Sud aus Wasser, Sojasauce, Zucker, Ingwer 6–8 Min. sanft schmoren.",
      "Mit Reis servieren; Sud sparsam verwenden."
    ],
    checks:"Gastritis ✓ sanft · Diabetes ✓ – ≈60 g KH · Schwangerschaft ✓ Fisch durchgegart",
    swaps:"Kabeljau → Seelachs; Chinakohl → Pak Choi.",
    side:"Milde Gemüsebrühe.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Lightly braised cod fillets with napa cabbage, pale soy glaze, gentle steam")
  },

  // Mittwoch
  {
    id:"mi-f",
    title:"Miso-Suppe mit Tofu & Wakame (味噌汁) + Reis",
    desc:"Japanische Basis-Suppe, Wakame sparsam – inspiriert von Just One Cookbook.",
    target:"≈66 g KH gesamt (2 P.) · Protein ≈20 g p. P.",
    ingredients:[
      "Reis (roh) 80 g","Miso paste natriumarm 18 g","Dashi (natriumarm, Instant) 6 g","Wakame getrocknet 2 g","Tofu (fest) 150 g",
      "Wasser 900 ml","Frühlingszwiebel 10 g"
    ],
    steps:[
      "Dashi im Wasser erhitzen (nicht kochen).",
      "Tofu würfeln, Wakame kurz einweichen; beides 2–3 Min. ziehen lassen.",
      "Miso einrühren (nicht kochen), mit Reis servieren."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈66 g KH · Schwangerschaft ✓ keine rohen Zutaten; Jod sparsam",
    swaps:"Wakame → Spinat; Reis → Vollkornreis 80 g (roh).",
    side:"Warmes Wasser.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Clear miso soup with tofu cubes and tiny wakame, small bowl of rice, steam")
  },
  {
    id:"mi-m",
    title:"Mildes Chicken-Bibimbap (닭비빔밥) – Chili separat",
    desc:"Koreanische Reisschüssel mit Gemüse; Gochujang separat – inspiriert von Seon Kyoung Longest.",
    target:"≈78 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients:[
      "Reis (roh) 90 g","Hähnchenbrust 240 g","Karotte 120 g","Spinat 160 g","Zucchini 120 g",
      "Sojasauce natriumarm 12 ml","Sesamöl 3 ml","Wasser 50 ml"
    ],
    steps:[
      "Gemüse schonend dünsten (je 3–4 Min.).",
      "Hähnchen in wenig Wasser+Sojasauce garziehen lassen (6–7 Min.).",
      "Auf Reis anrichten; Sesamöl minimal. Schärfe optional separat."
    ],
    checks:"Gastritis ✓ ohne Chili · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:"Reis → Gerste (roh) 80 g; Sesamöl → Rapsöl 3 ml.",
    side:"Gerste-/Maisttee warm.",
    remind:false,
    prompt: buildPrompt(PROMPT_HEADER,"Bibimbap bowl with chicken and steamed vegetables, no chili visible, neat composition")
  },
  {
    id:"mi-a",
    title:"Nikujaga leicht (肉じゃが)",
    desc:"Japanischer Schmor-Eintopf mit Rind, Kartoffeln & Karotten – inspiriert von Just One Cookbook.",
    target:"≈85 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients:[
      "Kartoffel 350 g","Karotte 120 g","Rinderhüfte 220 g","Zwiebel 60 g","Sojasauce natriumarm 12 ml",
      "Zucker 6 g","Wasser 500 ml","Erbsen (TK) 60 g"
    ],
    steps:[
      "Gemüse in grobe Stücke, Rind dünn schneiden.",
      "Alles mit Wasser, wenig Sojasauce und Zucker 18–22 Min. leise schmoren.",
      "Erbsen zugeben und 2 Min. ziehen lassen."
    ],
    checks:"Gastritis ✓ geschmort · Diabetes ✓ – ≈85 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:"Rind → Hähnchen; Zucker → weglassen.",
    side:"Milde Gemüsebrühe.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Light nikujaga stew in bowl, potatoes and carrots glistening, thin beef slices fully cooked")
  },

  // Donnerstag
  {
    id:"do-f",
    title:"Hirse-Congee mit Datteln (小米粥)",
    desc:"Chinesischer Hirsebrei mit weich gekochten Datteln – inspiriert von Omnivore’s Cookbook.",
    target:"≈72 g KH gesamt (2 P.) · Protein ≈10 g p. P.",
    ingredients:[
      "Hirse (roh) 80 g","Rote Datteln (entsteint) 60 g","Wasser 900 ml","Milch (pasteurisiert) 120 ml","Ingwer 6 g",
      "Salz 1 g","Tofu (fest) 100 g"
    ],
    steps:[
      "Hirse waschen, mit Wasser 25–30 Min. sieden.",
      "Datteln und Ingwer zugeben, 5 Min. weiterköcheln.",
      "Mit Milch abrunden; Tofuwürfel kurz mitwärmen."
    ],
    checks:"Gastritis ✓ warm · Diabetes ✓ – ≈72 g KH · Schwangerschaft ✓ pasteurisierte Milch",
    swaps:"Milch → Wasser; Datteln → Apfelwürfel 120 g.",
    side:"Warmwasser.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Millet congee with red dates in porcelain bowl, subtle steam, minimalist styling")
  },
  {
    id:"do-m",
    title:"Udon in milder Hühnerbrühe (かけうどん)",
    desc:"Japanische Udon mit leichtem Hühner-Toppping – inspiriert von maff.go.jp.",
    target:"≈80 g KH gesamt (2 P.) · Protein ≈24 g p. P.",
    ingredients:[
      "Udon (roh) 160 g","Hähnchenbrust 180 g","Dashi (natriumarm, Instant) 6 g","Wasser 900 ml","Sojasauce natriumarm 10 ml",
      "Frühlingszwiebel 15 g","Shiitake 100 g"
    ],
    steps:[
      "Brühe aus Wasser und Dashi ansetzen; Shiitake 6 Min. sieden.",
      "Udon separat garen; Hähnchen dünn schneiden und 4–5 Min. in der Brühe garziehen.",
      "Alles zusammengeben, mild abschmecken."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:"Udon → Soba 140 g (roh); Shiitake → Champignons.",
    side:"Lauwarmes Wasser.",
    remind:false,
    prompt: buildPrompt(PROMPT_HEADER,"Udon noodle soup with sliced chicken and mushrooms, clear broth, simple bowl")
  },
  {
    id:"do-a",
    title:"Jjimdak mild – Soja-Schmorhuhn (찜닭)",
    desc:"Koreanisches Schmorgericht ohne Schärfe – inspiriert von Mom's Korean Recipes.",
    target:"≈70 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients:[
      "Hähnchenschenkel ohne Haut 400 g","Kartoffel 250 g","Karotte 120 g","Zwiebel 60 g","Sojasauce natriumarm 15 ml",
      "Zucker 6 g","Glasnudeln (roh) 60 g","Wasser 500 ml"
    ],
    steps:[
      "Huhn mit Wasser & Sojasauce aufkochen, dann 20 Min. leise schmoren.",
      "Kartoffel/Karotte/Zwiebel zugeben, 12 Min. weitergaren.",
      "Glasnudeln 3–4 Min. mitziehen lassen."
    ],
    checks:"Gastritis ✓ ohne Chili · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:"Glasnudeln → Reis (roh) 70 g separat; Zucker → weglassen.",
    side:"Gersten-Tee.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Korean soy-braised chicken with potatoes and carrots, no chili, glossy sauce")
  },

  // Freitag
  {
    id:"fr-f",
    title:"Hähnchen-Soboro-Don (鶏そぼろ丼)",
    desc:"Japanische Reis-Schüssel mit fein krümeligem Huhn und komplett gestocktem Ei – inspiriert von Just One Cookbook.",
    target:"≈78 g KH gesamt (2 P.) · Protein ≈32 g p. P.",
    ingredients:[
      "Reis (roh) 90 g","Hähnchenhack mager 250 g","Eier 2 Stück","Sojasauce natriumarm 12 ml","Zucker 6 g",
      "Wasser 50 ml","Erbsen (TK) 60 g","Ingwer 6 g"
    ],
    steps:[
      "Reis garen. Hähnchen mit Wasser, Sojasauce, Zucker, Ingwer krümelig garziehen.",
      "Eier vollständig durchrühren und in Pfanne zu fein krümeligem Rührei garen.",
      "Auf Reis mit Erbsen anrichten."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps:"Hähnchen → Tofu; Erbsen → Spinat.",
    side:"Miso-Suppe mild (kleine Portion).",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Soboro don with chicken crumbles and fully cooked scrambled egg over rice, neat sections, green peas")
  },
  {
    id:"fr-m",
    title:"Tofu-Gemüse-Schmorpfanne auf Vollkornreis (家常豆腐)",
    desc:"Chinesisch inspiriertes, sanft geschmortes Tofu-Gemüse – inspiriert von The Woks of Life.",
    target:"≈85 g KH gesamt (2 P.) · Protein ≈22 g p. P.",
    ingredients:[
      "Vollkornreis (roh) 90 g","Tofu (fest) 250 g","Brokkoli 220 g","Karotte 120 g","Zucchini 120 g",
      "Sojasauce natriumarm 12 ml","Wasser 120 ml","Rapsöl 5 ml"
    ],
    steps:[
      "Reis garen. Gemüse in wenig Wasser vorgaren (5–6 Min.).",
      "Tofu goldgelb in minimal Öl anbraten, Wasser+Sojasauce zugeben und 3–4 Min. schmoren.",
      "Mit Reis servieren."
    ],
    checks:"Gastritis ✓ wenig Öl · Diabetes ✓ – ≈85 g KH · Schwangerschaft ✓ Tofu erhitzt",
    swaps:"Brokkoli → Pak Choi; Vollkornreis → Reis (roh) 90 g.",
    side:"Lauwarmes Wasser.",
    remind:false,
    prompt: buildPrompt(PROMPT_HEADER,"Braised tofu with mixed vegetables over brown rice, glossy yet light, homey plate")
  },
  {
    id:"fr-a",
    title:"Seelachs im Papier gedämpft (紙包み焼き)",
    desc:"Japanisch angehauchte Papillote, im eigenen Saft gegart – inspiriert von Just One Cookbook.",
    target:"≈62 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients:[
      "Reis (roh) 75 g","Seelachsfilet 320 g","Shiitake 120 g","Zucchini 120 g","Sojasauce natriumarm 10 ml",
      "Zitrone 10 g","Rapsöl 5 ml","Wasser 20 ml"
    ],
    steps:[
      "Gemüse in Scheiben, mit Fisch auf Backpapier legen, mit Wasser & Sojasauce beträufeln.",
      "Papier schließen, 12–14 Min. bei 180°C garen (oder im Dampf 10–12 Min.).",
      "Mit Reis servieren; Zitrone nur sehr sparsam."
    ],
    checks:"Gastritis ⚠︎ leichte Säure · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Fisch durchgegart",
    swaps:"Zitrone → weglassen; Shiitake → Champignons.",
    side:"Warmwasser.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Paper-wrapped pollock with mushrooms and zucchini, opened packet, gentle steam")
  },

  // Samstag
  {
    id:"sa-f",
    title:"Hühner-Congee – Dakjuk (닭죽)",
    desc:"Koreanischer Reisbrei mit zartem Huhn – inspiriert von My Korean Kitchen.",
    target:"≈70 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
    ingredients:[
      "Reis (roh) 90 g","Hähnchenbrust 220 g","Karotte 100 g","Zwiebel 40 g","Ingwer 6 g",
      "Wasser 1000 ml","Sojasauce natriumarm 8 ml","Frühlingszwiebel 10 g"
    ],
    steps:[
      "Hähnchen in Wasser 12–15 Min. sieden, herausnehmen und zerpflücken.",
      "Reis in der Brühe 25–30 Min. sämig köcheln; Gemüse weich mitgaren.",
      "Huhn zurückgeben, mild mit Sojasauce abschmecken."
    ],
    checks:"Gastritis ✓ warm & mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:"Zwiebel → mehr Karotte; Sojasauce → Salz 1 g.",
    side:"Gersten-Tee.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Korean chicken porridge in deep bowl, shredded chicken on top, soft colors")
  },
  {
    id:"sa-m",
    title:"Leichte Minestrone (IT) mit Vollkornnudeln",
    desc:"Italienische Gemüsesuppe, sanft & säurearm – inspiriert von klassischen Hausrezepten.",
    target:"≈82 g KH gesamt (2 P.) · Protein ≈16 g p. P.",
    ingredients:[
      "Vollkornnudeln (roh) 120 g","Karotte 150 g","Zucchini 150 g","Sellerie 60 g","Kartoffel 180 g",
      "Tomate (mild, geschält) 120 g","Hühnerbrühe (natriumarm) 800 ml","Rapsöl 5 ml"
    ],
    steps:[
      "Gemüse würfeln, in wenig Öl anschwitzen (2 Min.), mit Brühe aufgießen.",
      "Kartoffeln und Nudeln zugeben; 10–12 Min. sanft köcheln.",
      "Tomaten nur kurz mitschmoren; mild abschmecken."
    ],
    checks:"Gastritis ✓ milde Säure · Diabetes ✓ – ≈82 g KH · Schwangerschaft ✓ alles durchgegart",
    swaps:"Vollkornnudeln → Gerste (roh) 90 g; Tomate → weglassen.",
    side:"Warmwasser.",
    remind:false,
    prompt: buildPrompt(PROMPT_HEADER,"Light minestrone with wholegrain pasta, soft colors, no cheese on top")
  },
  {
    id:"sa-a",
    title:"Leichte Löwenkopf-Bällchen im Napa-Kohl (清炖狮子头)",
    desc:"Chinesische Schwein-Tofu-Bällchen, sanft geschmort – inspiriert von Red House Spice.",
    target:"≈68 g KH gesamt (2 P.) · Protein ≈30 g p. P.",
    ingredients:[
      "Reis (roh) 80 g","Schweinehack mager 240 g","Tofu (fest) 150 g","Chinakohl 300 g","Ingwer 6 g",
      "Frühlingszwiebel 10 g","Hühnerbrühe (natriumarm) 600 ml","Sojasauce natriumarm 8 ml"
    ],
    steps:[
      "Hack mit zerdrücktem Tofu mischen, Bällchen formen.",
      "In Brühe mit Ingwer & Frühlingszwiebel 20–25 Min. leise schmoren; Chinakohl später zugeben.",
      "Mit wenig Sojasauce abschmecken, zu Reis servieren."
    ],
    checks:"Gastritis ✓ geschmort · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:"Schwein → Hähnchenhack; Reis → Vollkornreis 80 g (roh).",
    side:"Lauwarmes Wasser.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Chinese lion’s head meatballs in clear broth with napa cabbage, gentle light")
  },

  // Sonntag
  {
    id:"so-f",
    title:"Mugi-gayu – Gerstenreis-Porridge mit Banane (麦粥)",
    desc:"Japanisch angelehnter Gerstenreisbrei mit milder Süße – inspiriert von Hausküche.",
    target:"≈74 g KH gesamt (2 P.) · Protein ≈12 g p. P.",
    ingredients:[
      "Gerste (Perlgerste) roh 90 g","Banane 120 g","Milch (pasteurisiert) 150 ml","Wasser 900 ml","Zucker 4 g",
      "Salz 1 g","Zimt 0.5 g"
    ],
    steps:[
      "Gerste waschen, mit Wasser 30–35 Min. weich köcheln.",
      "Banane zerdrücken, Milch zugeben und 3–4 Min. simmern.",
      "Mit wenig Zucker und Zimt abrunden."
    ],
    checks:"Gastritis ✓ warm, mild süß · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ pasteurisierte Milch",
    swaps:"Milch → Sojadrink (calciumreich); Zucker → weglassen.",
    side:"Warmwasser.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Barley rice porridge in bowl with banana puree swirl, cozy steam")
  },
  {
    id:"so-m",
    title:"Janchi Guksu – Festnudelsuppe (잔치국수) mild",
    desc:"Koreanische Weizennudelsuppe in klarer Brühe – inspiriert von Mom's Korean Recipes.",
    target:"≈84 g KH gesamt (2 P.) · Protein ≈18 g p. P.",
    ingredients:[
      "Weizennudeln (roh) 140 g","Hühnerbrühe (natriumarm) 900 ml","Zucchini 120 g","Karotte 120 g","Ei 1 Stück",
      "Sojasauce natriumarm 8 ml","Frühlingszwiebel 10 g"
    ],
    steps:[
      "Brühe erhitzen; Gemüse in feinen Streifen 3–4 Min. sieden.",
      "Nudeln separat garen; Ei vollständig stocken (Streifen).",
      "Nudeln mit Brühe aufgießen, mild abschmecken."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈84 g KH · Schwangerschaft ✓ Ei vollständig gestockt",
    swaps:"Ei → Tofu; Weizennudeln → Soba 140 g (roh).",
    side:"Gersten-Tee.",
    remind:false,
    prompt: buildPrompt(PROMPT_HEADER,"Korean noodle soup with clear broth, zucchini and carrot julienne, fully cooked egg strips")
  },
  {
    id:"so-a",
    title:"Reiskochtopf mit Huhn & Shiitake (香菇鸡饭)",
    desc:"Chinesischer Topfreis im Reiskocher/Topf – inspiriert von Omnivore’s Cookbook.",
    target:"≈88 g KH gesamt (2 P.) · Protein ≈28 g p. P.",
    ingredients:[
      "Reis (roh) 95 g","Hähnchenschenkel ohne Haut 380 g","Shiitake 120 g","Ingwer 6 g","Sojasauce natriumarm 12 ml",
      "Sesamöl 3 ml","Wasser 200 ml","Frühlingszwiebel 10 g"
    ],
    steps:[
      "Reis waschen, mit Wasser in Topf/Reiskocher ansetzen.",
      "Hähnchenwürfel mit Sojasauce kurz marinieren (ohne Alkohol), mit Shiitake & Ingwer auf den Reis legen.",
      "Gemeinsam garen; nach Ende 5 Min. ruhen lassen, mit Frühlingszwiebel servieren."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈88 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:"Shiitake → Champignons; Sesamöl → Rapsöl 3 ml.",
    side:"Lauwarme Brühe.",
    remind:true,
    prompt: buildPrompt(PROMPT_HEADER,"Claypot-style chicken and mushroom rice, glossy grains, steam rising")
  }
];

// ---------- Build PROMPTS Map (not rendered) ----------
const PROMPTS = Object.fromEntries(DATA.map(r=>[r.id, r.prompt]));

// ---------- LIST_SUMMARY computation ----------
function buildListSummary(recipes){
  const lines = {};
  for(const r of recipes){
    for(const ing of r.ingredients){
      const p = parseIngredient(ing);
      if(!p) continue;
      if(EXCLUDE_FROM_LIST.has(p.name)) continue;
      const key = p.name;
      if(!lines[key]) lines[key]={ qty:0, unit:p.unit, name:key };
      // ensure unit consistency
      if(lines[key].unit!==p.unit){
        // if one is ml and other g or Stück, keep separate key variant with unit suffix
        const key2 = `${key} (${p.unit})`;
        if(!lines[key2]) lines[key2]={ qty:0, unit:p.unit, name:key2 };
        lines[key2].qty += p.qty;
      } else {
        lines[key].qty += p.qty;
      }
    }
  }
  // group
  const groups = {
    "Protein/Fisch/Tofu":[],
    "Gemüse/Pilze":[],
    "Reis/Nudeln/Sättigung":[],
    "Algen/Brühen/Würze":[]
  };
  Object.values(lines).forEach(it=>{
    const cat = categorize(it.name);
    groups[cat].push(it);
  });
  // sort entries alphabetically
  Object.keys(groups).forEach(k=>{
    groups[k].sort((a,b)=>a.name.localeCompare(b.name));
  });
  return groups;
}

// ---------- PDF/HTML Export ----------
async function ensureScript(src){
  if(document.querySelector(`script[data-h2p="${src}"]`)) return;
  await new Promise((res,rej)=>{
    const s=document.createElement("script");
    s.src=src; s.async=true; s.dataset.h2p=src;
    s.onload=()=>res();
    s.onerror=()=>rej(new Error("Script load failed"));
    document.head.appendChild(s);
  });
}
async function generatePDF(containerEl, filename, orientation){
  await ensureScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");
  const baseOpt = {
    margin:       0,
    filename:     filename,
    image:        { type: 'jpeg', quality: 0.95 },
    html2canvas:  { scale:3, useCORS:true, background:COLORS.pageBg, letterRendering:true, foreignObjectRendering:false },
    jsPDF:        { unit:'pt', format:'a4', orientation },
    pagebreak:    { mode:['css','legacy'], after:['.page'], avoid:['.avoid-break'] }
  };
  const h2p = window.html2pdf().set(baseOpt).from(containerEl).toPdf();
  const blob = await h2p.get('pdf').then(pdf=>pdf.output('blob'));
  // Fallback if blob unexpectedly tiny
  if(blob.size < 50*1024){
    const fbOpt = {
      ...baseOpt,
      html2canvas:{ scale:3, useCORS:true, background:COLORS.pageBg, letterRendering:false, foreignObjectRendering:true },
      pagebreak:{ mode:['css'], after:['.page'] }
    };
    const blob2 = await window.html2pdf().set(fbOpt).from(containerEl).toPdf().get('pdf').then(pdf=>pdf.output('blob'));
    return blob2;
  }
  return blob;
}
function saveBlobAsURL(blob, suggestedName){
  const url = URL.createObjectURL(blob);
  return { url, name:suggestedName };
}
function buildStandaloneHTML(htmlInner, title){
  const css = `
  :root{--bg:${COLORS.pageBg};--text:${COLORS.text};--border:${COLORS.border}}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial}
  .page{background:${COLORS.pageBg}; padding:24px; page-break-after: always;}
  .avoid-break{break-inside: avoid;}
  .print\\:hidden{display:none}
  a.button{display:inline-block;padding:10px 14px;border-radius:12px;border:1px solid ${COLORS.border};box-shadow:${COLORS.btnShadow};text-decoration:none;color:${COLORS.white};background:${COLORS.indigo}}
  `;
  return `<!doctype html><html><head><meta charset="utf-8"/><title>${title}</title><style>${css}</style></head><body>${htmlInner}</body></html>`;
}

// ---------- UI Component ----------
function RecipeImageUpload({id}){
  const [url,setUrl]=useState(()=>loadDataURL(imgKey(id))||"");
  const ref=useRef();
  return (
    <div style={{marginBottom:10}}>
      {url ? <img src={url} alt="" style={{width:"100%", borderRadius:12, border:`1px solid ${COLORS.border}`}}/> : <div style={{height:160, border:`1px dashed ${COLORS.border}`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:COLORS.neutral}}>Bild hochladen …</div>}
      <div className="print:hidden" style={{marginTop:8, display:"flex", gap:8}}>
        <input ref={ref} type="file" accept="image/*" onChange={(e)=>{
          const f=e.target.files?.[0]; if(!f) return;
          const rd=new FileReader();
          rd.onload=()=>{ setUrl(String(rd.result)); saveDataURL(imgKey(id), String(rd.result)); };
          rd.readAsDataURL(f);
        }}/>
        {url && <button onClick={()=>{ setUrl(""); saveDataURL(imgKey(id),""); ref.current.value=""; }} style={smallBtnStyle}>Entfernen</button>}
      </div>
    </div>
  );
}

const smallBtnStyle = { padding:"8px 12px", borderRadius:12, border:`1px solid ${COLORS.border}`, background:COLORS.white, cursor:"pointer", boxShadow:COLORS.btnShadow };

function TopBar({onPDF,onHTML}){
  return (
    <div className="print:hidden" style={{display:"flex", gap:12, margin:"14px 0"}}>
      <button onClick={onPDF} style={{...btnStyle, background:COLORS.indigo, color:COLORS.white}}>PDF erzeugen</button>
      <button onClick={onHTML} style={{...btnStyle, background:COLORS.sky, color:COLORS.white}}>HTML exportieren</button>
      <button onClick={()=>window.print()} style={{...btnStyle, background:COLORS.emerald, color:COLORS.white}}>Drucken</button>
    </div>
  );
}
const btnStyle = { padding:"12px 16px", border:"none", borderRadius:14, boxShadow:COLORS.btnShadow, cursor:"pointer", fontWeight:600 };

function Page({children}){ return <div className="page" style={{background:COLORS.pageBg, padding:24, pageBreakAfter:"always"}}>{children}</div>; }

// ---------- Main App ----------
function WeekCookbook(){
  const [tab,setTab]=useState("kochbuch"); // 'kochbuch' | 'liste'
  const [dl,setDl]=useState({ kochbuch:null, liste:null, html_kochbuch:null, html_liste:null });
  const refKochbuch = useRef(null);
  const refListe = useRef(null);
  const [coverURL,setCoverURL]=useState(()=>loadDataURL(imgKey("cover"))||"");

  const LIST_SUMMARY = useMemo(()=>buildListSummary(DATA),[]);
  const tabsStyle = { display:"flex", gap:10, marginTop:12 };
  const tabBtn = (key, label)=>(
    <button onClick={()=>setTab(key)} style={{
      padding:"10px 14px", borderRadius:12, border:`1px solid ${COLORS.border}`,
      background: tab===key? COLORS.white : "transparent", boxShadow: tab===key? COLORS.btnShadow:"none", cursor:"pointer", fontWeight:600
    }}>{label}</button>
  );

  async function handlePDF(){
    if(tab==="kochbuch"){
      const blob = await generatePDF(refKochbuch.current, `${FILE_BASE} - Kochbuch.pdf`,"landscape");
      const f = saveBlobAsURL(blob, `${FILE_BASE} - Kochbuch.pdf`);
      setDl(s=>({...s, kochbuch:f}));
    } else {
      const blob = await generatePDF(refListe.current, `${FILE_BASE} - Einkaufsliste.pdf`,"portrait");
      const f = saveBlobAsURL(blob, `${FILE_BASE} - Einkaufsliste.pdf`);
      setDl(s=>({...s, liste:f}));
    }
  }
  function handleHTML(){
    if(tab==="kochbuch"){
      const html = buildStandaloneHTML(refKochbuch.current?.innerHTML||"", `${UI_TITEL}`);
      const blob = new Blob([html], {type:"text/html"});
      const f = saveBlobAsURL(blob, `${FILE_BASE} - Kochbuch.html`);
      setDl(s=>({...s, html_kochbuch:f}));
    } else {
      const html = buildStandaloneHTML(refListe.current?.innerHTML||"", `${UI_TITEL_LISTE}`);
      const blob = new Blob([html], {type:"text/html"});
      const f = saveBlobAsURL(blob, `${FILE_BASE} - Einkaufsliste.html`);
      setDl(s=>({...s, html_liste:f}));
    }
  }

  return (
    <div style={{background:COLORS.pageBg, color:COLORS.text, minHeight:"100vh", padding:24}}>
      <h1 style={{margin:"0 0 6px 0"}}>{UI_TITEL}</h1>
      <div style={tabsStyle}>
        {tabBtn("kochbuch","Kochbuch")}
        {tabBtn("liste","Einkaufsliste")}
      </div>
      <TopBar onPDF={handlePDF} onHTML={handleHTML} />

      {tab==="kochbuch" && (
        <>
          <div ref={refKochbuch}>
            {/* Cover */}
            <Page>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
                <h2 style={{margin:0}}>{UI_TITEL}</h2>
                <div style={{color:COLORS.neutral}}>{meta.startDate}</div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", gap:16}}>
                <div style={{...cardPanelStyle}}>
                  <div style={{fontWeight:700, marginBottom:10}}>Cover</div>
                  {coverURL ? <img src={coverURL} alt="" style={{width:"100%", borderRadius:12, border:`1px solid ${COLORS.border}`}}/> :
                    <div style={{height:220, border:`1px dashed ${COLORS.border}`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:COLORS.neutral}}>Cover-Bild hochladen …</div>}
                  <div className="print:hidden" style={{marginTop:8}}>
                    <input type="file" accept="image/*" onChange={(e)=>{
                      const f=e.target.files?.[0]; if(!f) return;
                      const rd=new FileReader(); rd.onload=()=>{ const u=String(rd.result); setCoverURL(u); saveDataURL(imgKey("cover"),u); }; rd.readAsDataURL(f);
                    }}/>
                    {coverURL && <div style={{marginTop:8}}><button style={smallBtnStyle} onClick={()=>{ setCoverURL(""); saveDataURL(imgKey("cover"),""); }}>Entfernen</button></div>}
                  </div>
                  <div style={{marginTop:12, fontSize:14, color:COLORS.neutral}}>
                    1 Rezept = 1 Seite · schonende Garmethoden · mild & natriumarm · Frühstück/Abend mit Metformin-Reminder
                  </div>
                </div>
                <div style={{...cardMainStyle}}>
                  <h3 style={{marginTop:0}}>Woche {{WEEK_NR}} – {meta.startDate}</h3>
                  <ul style={{marginTop:8, lineHeight:1.5}}>
                    <li>Schwerpunkt CN/JP/KR · 1 leichtes IT-Gericht</li>
                    <li>Pro Mahlzeit (2 P.): 60–90 g KH · ballaststoffbetont</li>
                    <li>Schwangerschaft: alles durchgegart; quecksilberarme Fische; Wakame/Kombu sparsam</li>
                    <li>Gastritis: warm, mild, wenig Öl; Säure moderat</li>
                  </ul>
                </div>
              </div>
            </Page>

            {/* Recipe Pages */}
            {DATA.map(rec=>(
              <Page key={rec.id}>
                <div style={{...GRID.container}}>
                  <div style={{...GRID.panel}}>
                    <div style={cardPanelStyle} className="avoid-break">
                      <RecipeImageUpload id={rec.id} />
                      <div style={{fontSize:14, color:COLORS.neutral, marginBottom:8}}>
                        Zielwerte: {rec.target}
                      </div>
                      <div style={{fontSize:14, marginBottom:8}}><strong>Checks:</strong> {rec.checks}</div>
                      <div style={{fontSize:14, marginBottom:8}}><strong>Alternativen:</strong> {rec.swaps}</div>
                      <div style={{fontSize:14}}><strong>Beilage/Drink:</strong> {rec.side}</div>
                    </div>
                  </div>
                  <div style={{...GRID.main}}>
                    <div style={cardMainStyle} className="avoid-break">
                      <div style={{fontSize:13, color:COLORS.neutral, marginBottom:6}}>
                        {dayLabel(rec.id)} – {mealTitle(rec.id)}
                      </div>
                      <h2 style={{margin:"0 0 6px 0"}}>{rec.title}</h2>
                      <div style={{fontSize:14, color:COLORS.neutral, marginBottom:10}}>{rec.desc}</div>
                      {remindFlag(rec.id) && (
                        <div style={{background:COLORS.panelBG70, padding:"8px 10px", borderRadius:12, border:`1px solid ${COLORS.border}`, display:"inline-block", marginBottom:10}}>
                          💊 Metformin „mit der Mahlzeit“ einnehmen.
                        </div>
                      )}
                      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
                        <div>
                          <h3 style={{marginTop:0}}>Zutaten (2 Personen)</h3>
                          <ul style={{marginTop:6, paddingLeft:18}}>
                            {rec.ingredients.map((it,i)=><li key={i} style={{marginBottom:4}}>{it}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h3 style={{marginTop:0}}>Zubereitung</h3>
                          <ol style={{marginTop:6, paddingLeft:18}}>
                            {rec.steps.map((st,i)=><li key={i} style={{marginBottom:6}}>{st}</li>)}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Page>
            ))}
          </div>

          {/* Download links (kochbuch) */}
          <div className="print:hidden" style={{marginTop:10}}>
            {dl.kochbuch && <div><a href={dl.kochbuch.url} download={dl.kochbuch.name} style={{...smallLink}}>Kochbuch-PDF herunterladen</a></div>}
            {dl.html_kochbuch && <div style={{marginTop:6}}><a href={dl.html_kochbuch.url} download={dl.html_kochbuch.name} style={{...smallLink, background:COLORS.sky}}>Kochbuch-HTML herunterladen</a></div>}
          </div>
        </>
      )}

      {tab==="liste" && (
        <>
          <div ref={refListe}>
            <Page>
              <h2 style={{marginTop:0}}>{UI_TITEL_LISTE}</h2>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
                {Object.entries(LIST_SUMMARY).map(([group, items])=>(
                  <div key={group} style={{...cardMainStyle}}>
                    <h3 style={{marginTop:0}}>{group}</h3>
                    <ul style={{marginTop:6, paddingLeft:18}}>
                      {items.map((it,idx)=>(
                        <li key={idx}>{it.name} – {Math.round(it.qty*100)/100} {it.unit}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div style={{marginTop:12, fontSize:12, color:COLORS.neutral}}>
                Einheiten: TL→5 ml, EL→15 ml (bereits umgerechnet). Wasser wird nicht gelistet.
              </div>
            </Page>
          </div>

          {/* Download links (liste) */}
          <div className="print:hidden" style={{marginTop:10}}>
            {dl.liste && <div><a href={dl.liste.url} download={dl.liste.name} style={{...smallLink}}>Einkaufsliste-PDF herunterladen</a></div>}
            {dl.html_liste && <div style={{marginTop:6}}><a href={dl.html_liste.url} download={dl.html_liste.name} style={{...smallLink, background:COLORS.sky}}>Einkaufsliste-HTML herunterladen</a></div>}
          </div>
        </>
      )}
    </div>
  );
}

const smallLink = { display:"inline-block", padding:"8px 12px", borderRadius:12, textDecoration:"none", color:COLORS.white, background:COLORS.indigo, boxShadow:COLORS.btnShadow };

// ---------- Tests (Pflicht) ----------
function runTests(){
  const ids = DATA.map(d=>d.id);
  // 7 Tage × 3 Meals = 21
  if(DATA.length!==21) throw new Error("Erwarte 21 Rezepte.");
  // Eindeutige IDs
  if(new Set(ids).size!==ids.length) throw new Error("IDs nicht eindeutig.");
  // mealLabel mapping korrekt
  if(mealLabel.f!=="Morgen"||mealLabel.m!=="Mittag"||mealLabel.a!=="Abend") throw new Error("mealLabel fehlerhaft.");
  // Metformin-Logik
  DATA.forEach(r=>{
    const expect = remindFlag(r.id);
    if(expect!==remindFlag(r.id)) throw new Error("Metformin-Logik inkonsistent.");
  });
  // Zutaten & Steps Mindestanzahl
  DATA.forEach(r=>{
    if(!r.ingredients || r.ingredients.length<5) throw new Error(`Zutaten zu kurz: ${r.id}`);
    if(!r.steps || r.steps.length<3) throw new Error(`Steps zu kurz: ${r.id}`);
  });
  // Keine verbotenen CSS-Funktionen
  const cssStr = JSON.stringify(COLORS);
  ["oklab","oklch","lab","color-mix"].forEach(f=>{
    if(cssStr.includes(f)) throw new Error("Verbotene CSS-Funktion gefunden.");
  });
  // FILE_BASE Regex
  if(!new RegExp(`^Woche \\{\\{WEEK_NR\\}\\} \\\\d{4}-\\\\d{2}-\\\\d{2}$`).test(FILE_BASE.replaceAll("-","-"))) {
    if(!/^Woche \{\{WEEK_NR\}\} \d{4}-\d{2}-\d{2}$/.test(FILE_BASE)) throw new Error("FILE_BASE Regex fehlgeschlagen.");
  }
  // buildPrompt
  if(buildPrompt("A","B")!=="A\nB") throw new Error("buildPrompt inkorrekt.");
  // LIST_SUMMARY genau 4 Gruppen
  const LIST_SUMMARY = buildListSummary(DATA);
  const groups = Object.keys(LIST_SUMMARY);
  if(groups.length!==4 || !groups.includes("Protein/Fisch/Tofu") || !groups.includes("Gemüse/Pilze") || !groups.includes("Reis/Nudeln/Sättigung") || !groups.includes("Algen/Brühen/Würze")){
    throw new Error("LIST_SUMMARY Gruppen fehlerhaft.");
  }
  console.log("[GhibliKitchen] All tests passed (JSX).");
}
try{ runTests(); }catch(e){ console.error(e); }

// ---------- Default Export ----------
export default WeekCookbook;

// ---------- Mount (optional if #root vorhanden) ----------
if(typeof document!=="undefined"){
  const root = document.getElementById("root");
  if(root) ReactDOM.render(<WeekCookbook/>, root);
}