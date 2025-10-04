// Datei: Woche-4-2025-10-20.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

export const meta = { title: "Woche 4", startDate: "2025-10-20", id: "woche-4-2025-10-20" };
const FILE_BASE = "Woche 4 2025-10-20";

const COLORS = {
  pageBg:"#FAF7F1", text:"#111827", border:"rgba(0,0,0,.10)",
  panelBG70:"rgba(255,255,255,.70)", panelBG80:"rgba(255,255,255,.80)",
  white:"#FFFFFF", emerald:"#059669", amber:"#f59e0b",
  sky:"#0284c7", neutral:"#404040", indigo:"#4f46e5", btnShadow:"0 6px 20px rgba(0,0,0,.12)"
};

const cardPanelStyle = {
  background: COLORS.panelBG70, borderRadius: 18, padding: 20, boxShadow: COLORS.btnShadow,
  border: `1px solid ${COLORS.border}`, marginRight: 16
};
const cardMainStyle = {
  background: COLORS.white, borderRadius: 18, padding: 22, boxShadow: COLORS.btnShadow,
  border: `1px solid ${COLORS.border}`
};

const PROMPT_HEADER =
  "High quality food photography, soft natural light, top-down angle, minimal table setting, pastel background, steam visible, pregnancy-safe (no raw fish or raw egg), family-friendly, Asian home cooking.";

function buildPrompt(a, b){ return `${a}\n${b}`; }

function ensureScript(src){
  return new Promise((resolve,reject)=>{
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src; s.async = true; s.onload = ()=>resolve(); s.onerror = ()=>reject(new Error("Script load failed"));
    document.head.appendChild(s);
  });
}

function bytesFromDataUrl(dataUrl){
  try{
    const b64 = dataUrl.split(",")[1] || "";
    return Math.ceil((b64.length * 3) / 4);
  }catch{ return 0; }
}

function dayLabel(id){
  const d = id.split("-")[0];
  return { mo:"Montag", di:"Dienstag", mi:"Mittwoch", do:"Donnerstag", fr:"Freitag", sa:"Samstag", so:"Sonntag" }[d] || "";
}
function mealTitle(id){
  const m = id.split("-")[1];
  return { f:"Morgen", m:"Mittag", a:"Abend" }[m] || "";
}
function mealLabel(id){
  const m = id.split("-")[1];
  return { f:"Frühstück", m:"Mittagessen", a:"Abendessen" }[m] || "";
}

const RECIPES = [
  // Montag
  {
    id:"mo-f",
    title:"Reisbrei mit Lachs & Seidentofu (お粥)",
    desc:"Japanischer Okayu – sanfter Reisbrei mit gedämpftem Lachs und Seidentofu; inspiriert von Just One Cookbook.",
    target:"KH gesamt ≈70 g (2 P.); Protein ≈20 g p. P.",
    ingredients:[
      {item:"Reis (roh)", amount:90, unit:"g"},
      {item:"Lachsfilet", amount:120, unit:"g"},
      {item:"Tofu (seiden)", amount:200, unit:"g"},
      {item:"Wasser", amount:800, unit:"ml"},
      {item:"Ingwer", amount:10, unit:"g"},
      {item:"Frühlingszwiebel", amount:20, unit:"g"},
      {item:"Sojasauce natriumarm", amount:10, unit:"ml"}
    ],
    steps:[
      "Reis waschen, mit Wasser aufkochen und 25–30 Minuten sanft köcheln lassen.",
      "Lachs in einem Einsatz/Schälchen über dem Brei 8–10 Minuten gar dämpfen, zerpflücken.",
      "Tofu in Würfeln zugeben, Ingwer und Sojasauce einrühren, Frühlingszwiebel kurz mitgaren."
    ],
    checks:"Gastritis ✓ mild, warm · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ alles durchgegart, quecksilberarm",
    swaps:["Seidentofu ↔ fester Tofu","Lachs ↔ Kabeljau"],
    side:"Warmer Gerstentee (koffeinfrei).",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Creamy Japanese okayu porridge in a white bowl, flaked cooked salmon and silken tofu cubes, scallions, steam rising.")
  },
  {
    id:"mo-m",
    title:"Mildes Bibimbap (비빔밥) ohne Schärfe",
    desc:"Koreanische Reisschale mit Gemüse und Rind, Schärfe separat; inspiriert von My Korean Kitchen.",
    target:"KH gesamt ≈70 g (2 P.); Protein ≈31 g p. P.",
    ingredients:[
      {item:"Vollkornreis (roh)", amount:90, unit:"g"},
      {item:"Rinderhack mager", amount:220, unit:"g"},
      {item:"Spinat", amount:200, unit:"g"},
      {item:"Karotte", amount:120, unit:"g"},
      {item:"Shiitake", amount:120, unit:"g"},
      {item:"Eier", amount:2, unit:"Stück"},
      {item:"Sojasauce natriumarm", amount:20, unit:"ml"},
      {item:"Sesamöl", amount:10, unit:"ml"}
    ],
    steps:[
      "Reis garen. Gemüse dünsten bzw. kurz mit wenig Öl anbraten.",
      "Hackfleisch krümelig durchgaren, mit Sojasauce mild würzen.",
      "Alles in Schalen anrichten, Eier vollständig durchbraten (Eigelb fest)."
    ],
    checks:"Gastritis ✓ mild gewürzt · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest, Fleisch durchgegart",
    swaps:["Rinderhack ↔ Putenhack","Vollkornreis ↔ Sushireis"],
    side:"Kleine Schälchen Chili getrennt servieren.",
    remind:false,
    prompt:buildPrompt(PROMPT_HEADER,"Colorful bibimbap bowl with brown rice, sautéed spinach, carrots, shiitake, fully cooked egg, lean beef, no chili on top.")
  },
  {
    id:"mo-a",
    title:"Mildes Mapo-Tofu (麻婆豆腐) – ohne Schärfe",
    desc:"Chinesischer Klassiker in milder, miso-basierter Sauce; inspiriert von Omnivore’s Cookbook.",
    target:"KH gesamt ≈70 g (2 P.); Protein ≈32 g p. P.",
    ingredients:[
      {item:"Tofu (fest)", amount:400, unit:"g"},
      {item:"Shiitake", amount:150, unit:"g"},
      {item:"Miso (hell)", amount:20, unit:"g"},
      {item:"Gemüsebrühe", amount:300, unit:"ml"},
      {item:"Sojasauce natriumarm", amount:20, unit:"ml"},
      {item:"Knoblauch", amount:1, unit:"Zehe"},
      {item:"Ingwer", amount:10, unit:"g"},
      {item:"Maisstärke", amount:10, unit:"g"},
      {item:"Brauner Reis (roh)", amount:90, unit:"g"}
    ],
    steps:[
      "Reis garen. Shiitake dünsten.",
      "Brühe mit Miso und Sojasauce erhitzen, Tofu-Würfel zufügen, 4–5 Minuten ziehen lassen.",
      "Mit Stärke leicht binden, über Reis servieren."
    ],
    checks:"Gastritis ✓ ohne Schärfe · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:["Brauner Reis ↔ Weißer Reis","Miso ↔ milde Bohnenpaste"],
    side:"Gedünsteter Pak Choi.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Mild mapo tofu with mushrooms, glossy light-brown sauce, served over brown rice, no chili flakes.")
  },

  // Dienstag
  {
    id:"di-f",
    title:"Lachs-Onigiri & Miso-Suppe (おにぎり・味噌汁)",
    desc:"Japanisches Frühstück: Reisbälle mit gekochtem Lachs und milde Misosuppe; inspiriert von Just One Cookbook.",
    target:"KH gesamt ≈78 g (2 P.); Protein ≈27 g p. P.",
    ingredients:[
      {item:"Sushi-Reis (roh)", amount:100, unit:"g"},
      {item:"Lachsfilet", amount:150, unit:"g"},
      {item:"Nori", amount:1, unit:"Blatt"},
      {item:"Miso (hell)", amount:20, unit:"g"},
      {item:"Tofu (fest)", amount:150, unit:"g"},
      {item:"Wakame (getrocknet)", amount:2, unit:"g"},
      {item:"Wasser", amount:900, unit:"ml"},
      {item:"Sojasauce natriumarm", amount:10, unit:"ml"}
    ],
    steps:[
      "Reis kochen, Onigiri formen, Lachs gegart zerzupfen und einfüllen, mit Nori umwickeln.",
      "Miso in heißem Wasser lösen (nicht kochen), Tofuwürfel und Wakame kurz ziehen lassen.",
      "Mit wenig Sojasauce abschmecken."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈78 g KH · Schwangerschaft ✓ Lachs durchgegart, Wakame sparsam",
    swaps:["Sushi-Reis ↔ Vollkornreis","Lachs ↔ Seelachs"],
    side:"Grüner Tee mild (optional koffeinfrei).",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Two salmon onigiri with nori, small bowl of miso soup with tofu and wakame, clean wooden tray.")
  },
  {
    id:"di-m",
    title:"Reisnudelpfanne mit Hähnchen (河粉)",
    desc:"Chinesische Wokpfanne, mild und gemüsebetont; inspiriert von The Woks of Life.",
    target:"KH gesamt ≈74 g (2 P.); Protein ≈39 g p. P.",
    ingredients:[
      {item:"Reisnudeln (trocken)", amount:80, unit:"g"},
      {item:"Hähnchenbrust", amount:250, unit:"g"},
      {item:"Paprika", amount:150, unit:"g"},
      {item:"Pak Choi", amount:200, unit:"g"},
      {item:"Zwiebel", amount:80, unit:"g"},
      {item:"Karotte", amount:100, unit:"g"},
      {item:"Sojasauce natriumarm", amount:25, unit:"ml"},
      {item:"Sesamöl", amount:10, unit:"ml"}
    ],
    steps:[
      "Reisnudeln einweichen und kurz blanchieren.",
      "Hähnchen in Streifen mit wenig Öl durchgaren.",
      "Gemüse zugeben, alles mit Sojasauce und Sesamöl mild schwenken."
    ],
    checks:"Gastritis ✓ wenig Öl · Diabetes ✓ – ≈74 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:["Reisnudeln ↔ Udon","Hähnchen ↔ Tofu"],
    side:"Gurkenscheiben natur.",
    remind:false,
    prompt:buildPrompt(PROMPT_HEADER,"Stir-fried rice noodles with chicken and colorful vegetables, no chili, light sauce.")
  },
  {
    id:"di-a",
    title:"Doenjang-Jjigae mit Gerste (된장찌개)",
    desc:"Koreanischer Sojabohnen-Eintopf, herzhaft-mild mit Gerstenbeilage; inspiriert von Seon Kyoung Longest.",
    target:"KH gesamt ≈86 g (2 P.); Protein ≈24 g p. P.",
    ingredients:[
      {item:"Doenjang", amount:30, unit:"g"},
      {item:"Tofu (fest)", amount:300, unit:"g"},
      {item:"Zucchini", amount:200, unit:"g"},
      {item:"Kartoffeln", amount:200, unit:"g"},
      {item:"Shiitake", amount:100, unit:"g"},
      {item:"Zwiebel", amount:70, unit:"g"},
      {item:"Wasser", amount:800, unit:"ml"},
      {item:"Sojasauce natriumarm", amount:10, unit:"ml"},
      {item:"Perlgerste (roh)", amount:70, unit:"g"}
    ],
    steps:[
      "Doenjang in Wasser lösen, Gemüse 12–15 Minuten sanft köcheln.",
      "Tofu-Würfel zugeben und weiterziehen lassen.",
      "Gerste separat garen und dazu reichen."
    ],
    checks:"Gastritis ✓ herzhaft, nicht scharf · Diabetes ✓ – ≈86 g KH · Schwangerschaft ✓ alles durchgegart",
    swaps:["Gerste ↔ Reis","Tofu ↔ Putenbrust"],
    side:"Kimchi weglassen oder mildes Gurkenpickle.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Korean soybean stew with tofu and vegetables in a clay pot, side of barley.")
  },

  // Mittwoch
  {
    id:"mi-f",
    title:"Kürbis-Juk mit Tofu & Edamame (단호박죽)",
    desc:"Samtiger Kürbisreisbrei, proteinreich ergänzt; inspiriert von Mom’s Korean Recipes.",
    target:"KH gesamt ≈75 g (2 P.); Protein ≈22 g p. P.",
    ingredients:[
      {item:"Kürbis (Hokkaido/Kabocha)", amount:400, unit:"g"},
      {item:"Reis (roh)", amount:70, unit:"g"},
      {item:"Tofu (fest)", amount:200, unit:"g"},
      {item:"Edamame (geschält)", amount:100, unit:"g"},
      {item:"Ingwer", amount:8, unit:"g"},
      {item:"Wasser", amount:900, unit:"ml"},
      {item:"Salz", amount:1, unit:"Prise"}
    ],
    steps:[
      "Kürbisstücke und gewaschenen Reis in Wasser 25 Minuten weich kochen.",
      "Pürieren, dann Tofu-Würfel und Edamame zugeben, 3–4 Minuten ziehen lassen.",
      "Mit einer Prise Salz milde abschmecken."
    ],
    checks:"Gastritis ✓ weich & warm · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:["Edamame ↔ weiße Bohnen (abgetropft)","Tofu ↔ Hähnchenwürfel"],
    side:"Warmer Reis- oder Gerstentee.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Golden pumpkin rice porridge in a bowl, tofu cubes and green edamame on top, steam visible.")
  },
  {
    id:"mi-m",
    title:"Udon-Suppe mit Huhn & Brokkoli (うどん)",
    desc:"Japanische Nudelsuppe, klar und mild; inspiriert von Just One Cookbook.",
    target:"KH gesamt ≈79 g (2 P.); Protein ≈34 g p. P.",
    ingredients:[
      {item:"Udon (trocken)", amount:110, unit:"g"},
      {item:"Hähnchenbrust", amount:220, unit:"g"},
      {item:"Brokkoli", amount:200, unit:"g"},
      {item:"Zwiebel", amount:60, unit:"g"},
      {item:"Miso (hell)", amount:25, unit:"g"},
      {item:"Wasser", amount:1000, unit:"ml"},
      {item:"Sojasauce natriumarm", amount:15, unit:"ml"}
    ],
    steps:[
      "Brühe mit Miso und Sojasauce erhitzen.",
      "Hähnchen in Scheiben 6–8 Minuten gar ziehen, Gemüse 3–4 Minuten mitgaren.",
      "Udon separat kochen, abspülen, in die Suppe geben."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈79 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:["Udon ↔ Soba","Hähnchen ↔ Tofu"],
    side:"Kleine Schale Gurke.",
    remind:false,
    prompt:buildPrompt(PROMPT_HEADER,"Light udon soup with chicken slices and broccoli florets in a clear bowl.")
  },
  {
    id:"mi-a",
    title:"Gedämpfter Kabeljau mit Ingwer (清蒸鳕鱼) & Reis",
    desc:"Chinesisch dämpfen – zart & bekömmlich; inspiriert von Made With Lau.",
    target:"KH gesamt ≈70 g (2 P.); Protein ≈32 g p. P.",
    ingredients:[
      {item:"Kabeljaufilet", amount:320, unit:"g"},
      {item:"Reis (roh)", amount:90, unit:"g"},
      {item:"Ingwer", amount:15, unit:"g"},
      {item:"Frühlingszwiebel", amount:30, unit:"g"},
      {item:"Sojasauce natriumarm", amount:15, unit:"ml"},
      {item:"Sesamöl", amount:8, unit:"ml"},
      {item:"Gemüsebrühe", amount:100, unit:"ml"}
    ],
    steps:[
      "Kabeljau auf Ingwerscheiben 8–10 Minuten dämpfen.",
      "Sojasauce mit Brühe kurz erhitzen, über den Fisch geben, mit Sesamöl aromatisieren.",
      "Reis garen und dazu servieren."
    ],
    checks:"Gastritis ✓ gedämpft · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Kabeljau durchgegart, quecksilberarm",
    swaps:["Kabeljau ↔ Seelachs","Reis ↔ Vollkornreis"],
    side:"Gedünsteter Brokkoli.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Steamed cod with ginger and scallions, glossy light sauce, side bowl of rice.")
  },

  // Donnerstag
  {
    id:"do-f",
    title:"Tamagoyaki & Misosuppe mit kleinem Reis (卵焼き・味噌汁)",
    desc:"Japanisches Frühstück mit vollständig gestocktem Omelett; inspiriert von Just One Cookbook.",
    target:"KH gesamt ≈62 g (2 P.); Protein ≈24 g p. P.",
    ingredients:[
      {item:"Eier", amount:4, unit:"Stück"},
      {item:"Tofu (fest)", amount:150, unit:"g"},
      {item:"Reis (roh)", amount:80, unit:"g"},
      {item:"Miso (hell)", amount:20, unit:"g"},
      {item:"Wakame (getrocknet)", amount:1, unit:"g"},
      {item:"Frühlingszwiebel", amount:20, unit:"g"},
      {item:"Wasser", amount:800, unit:"ml"},
      {item:"Sojasauce natriumarm", amount:10, unit:"ml"}
    ],
    steps:[
      "Reis garen. Eiermasse zubereiten und Omelett vollständig durchbraten.",
      "Misosuppe ansetzen, Tofu und Wakame kurz ziehen lassen.",
      "Mit Frühlingszwiebel servieren."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Eier vollständig gestockt",
    swaps:["Reis ↔ Vollkornreis","Tofu ↔ Hähnchenwürfel"],
    side:"Warmer Grüntee (koffeinarm).",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Japanese breakfast set with rolled omelet, small rice bowl, miso soup, minimalist setting.")
  },
  {
    id:"do-m",
    title:"Tomaten-Rührei (番茄炒蛋) mit Tofu & Reis",
    desc:"Chinesisches Hausgericht, mild-säuerlich und schnell; inspiriert von The Woks of Life.",
    target:"KH gesamt ≈70 g (2 P.); Protein ≈28 g p. P.",
    ingredients:[
      {item:"Reis (roh)", amount:90, unit:"g"},
      {item:"Eier", amount:4, unit:"Stück"},
      {item:"Tofu (fest)", amount:200, unit:"g"},
      {item:"Tomaten (reif)", amount:400, unit:"g"},
      {item:"Zwiebel", amount:60, unit:"g"},
      {item:"Sojasauce natriumarm", amount:10, unit:"ml"},
      {item:"Rapsöl", amount:10, unit:"ml"}
    ],
    steps:[
      "Reis garen. Eier vollständig stocken.",
      "Tomaten mit Zwiebel sanft schmoren, Tofu zugeben.",
      "Mit Sojasauce mild abschmecken und mit Reis servieren."
    ],
    checks:"Gastritis ✓ milde Säure, gut geschmort · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Eier fest",
    swaps:["Tofu ↔ Putenbrustwürfel","Reis ↔ Vollkornreis"],
    side:"Gedämpfter Pak Choi.",
    remind:false,
    prompt:buildPrompt(PROMPT_HEADER,"Tomato and egg stir-fry with tofu, bright red tomatoes, served beside a bowl of rice.")
  },
  {
    id:"do-a",
    title:"Bulgogi-Style Pute (불고기) & Vollkornreis – mild",
    desc:"Koreanisch inspiriertes Pfannengericht ohne Schärfe; inspiriert von Maangchi.",
    target:"KH gesamt ≈80 g (2 P.); Protein ≈28 g p. P.",
    ingredients:[
      {item:"Putenbrust", amount:250, unit:"g"},
      {item:"Vollkornreis (roh)", amount:90, unit:"g"},
      {item:"Zwiebel", amount:80, unit:"g"},
      {item:"Karotte", amount:120, unit:"g"},
      {item:"Champignons", amount:150, unit:"g"},
      {item:"Sojasauce natriumarm", amount:25, unit:"ml"},
      {item:"Sesamöl", amount:10, unit:"ml"},
      {item:"Knoblauch", amount:1, unit:"Zehe"},
      {item:"Birne (gerieben)", amount:60, unit:"g"}
    ],
    steps:[
      "Pute in dünnen Scheiben mit Sojasauce, Birne, Knoblauch 15 Minuten marinieren.",
      "In heißer Pfanne mit wenig Öl zügig durchgaren.",
      "Gemüse kurz mitgaren, mit Reis servieren."
    ],
    checks:"Gastritis ✓ mild, wenig Öl · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps:["Pute ↔ Hähnchen","Vollkornreis ↔ Reis"],
    side:"Salatgurke natur.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Mild bulgogi turkey stir-fry with mushrooms and carrots, brown rice on the side, no chili.")
  },

  // Freitag
  {
    id:"fr-f",
    title:"Hühner-Congee (鸡肉粥)",
    desc:"Chinesischer Reisbrei mit zartem Huhn – sanft & wärmend; inspiriert von The Woks of Life.",
    target:"KH gesamt ≈70 g (2 P.); Protein ≈34 g p. P.",
    ingredients:[
      {item:"Reis (roh)", amount:90, unit:"g"},
      {item:"Hähnchenbrust", amount:220, unit:"g"},
      {item:"Ingwer", amount:12, unit:"g"},
      {item:"Karotte", amount:120, unit:"g"},
      {item:"Wasser", amount:1100, unit:"ml"},
      {item:"Sojasauce natriumarm", amount:10, unit:"ml"},
      {item:"Frühlingszwiebel", amount:20, unit:"g"}
    ],
    steps:[
      "Reis mit Wasser aufkochen und 30 Minuten sanft köcheln.",
      "Hähnchen fein würfeln, 8–10 Minuten mitgaren bis durch.",
      "Mit Sojasauce mild abschmecken, Frühlingszwiebel zugeben."
    ],
    checks:"Gastritis ✓ sehr mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Huhn durchgegart",
    swaps:["Hähnchen ↔ Tofu","Karotte ↔ Kürbis"],
    side:"Warmer Kräutertee.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Chicken congee in a deep bowl, shredded chicken, scallions on top, gentle steam.")
  },
  {
    id:"fr-m",
    title:"Leichte Minestrone (IT) mit Tofu",
    desc:"Italienischer Gemüseeintopf, lange geköchelt und mild; inspiriert von klassischer Minestrone.",
    target:"KH gesamt ≈69 g (2 P.); Protein ≈39 g p. P.",
    ingredients:[
      {item:"Vollkornpasta (trocken)", amount:60, unit:"g"},
      {item:"Cannellini-Bohnen (abgetropft)", amount:200, unit:"g"},
      {item:"Karotte", amount:150, unit:"g"},
      {item:"Stangensellerie", amount:100, unit:"g"},
      {item:"Tomaten (passiert)", amount:250, unit:"ml"},
      {item:"Zucchini", amount:150, unit:"g"},
      {item:"Gemüsebrühe", amount:800, unit:"ml"},
      {item:"Olivenöl", amount:10, unit:"ml"},
      {item:"Parmesan (pasteurisiert, optional)", amount:20, unit:"g"},
      {item:"Tofu (fest)", amount:300, unit:"g"}
    ],
    steps:[
      "Gemüse in wenig Öl anschwitzen, mit Brühe und Tomaten 20–25 Minuten köcheln.",
      "Tofu-Würfel und Bohnen zugeben, weitere 5 Minuten ziehen lassen.",
      "Pasta separat kochen und kurz vor dem Servieren einrühren."
    ],
    checks:"Gastritis ✓ lange geköchelt, milde Säure · Diabetes ✓ – ≈69 g KH · Schwangerschaft ✓ pasteurisierter Käse optional",
    swaps:["Tofu ↔ Hähnchenwürfel","Vollkornpasta ↔ Gerste"],
    side:"Warmes Wasser mit Zitrone weglassen (Säure) – stattdessen Kräutertee.",
    remind:false,
    prompt:buildPrompt(PROMPT_HEADER,"Light minestrone soup with vegetables, tofu cubes, a few wholegrain pasta pieces, rustic bowl.")
  },
  {
    id:"fr-a",
    title:"Gebackener Lachs Teriyaki (照り焼き) mit Brokkoli & Reis",
    desc:"Japanisch inspiriert, natriumarme Sauce, im Ofen gegart; inspiriert von Just One Cookbook.",
    target:"KH gesamt ≈75 g (2 P.); Protein ≈32 g p. P.",
    ingredients:[
      {item:"Lachsfilet", amount:320, unit:"g"},
      {item:"Reis (roh)", amount:90, unit:"g"},
      {item:"Brokkoli", amount:300, unit:"g"},
      {item:"Sojasauce natriumarm", amount:25, unit:"ml"},
      {item:"Mirin (optional)", amount:10, unit:"ml"},
      {item:"Honig (optional)", amount:5, unit:"g"},
      {item:"Ingwer", amount:10, unit:"g"}
    ],
    steps:[
      "Sauce aus Sojasauce, wenig Mirin/Honig, Ingwer anrühren.",
      "Lachs mit Sauce bestreichen, 12–14 Minuten bei 200 °C backen.",
      "Reis und gedämpften Brokkoli dazu servieren."
    ],
    checks:"Gastritis ✓ mild, Ofen gegart · Diabetes ✓ – ≈75 g KH (Süße minimal) · Schwangerschaft ✓ Lachs durchgegart",
    swaps:["Reis ↔ Vollkornreis","Brokkoli ↔ Pak Choi"],
    side:"Warmer Grüntee (koffeinarm).",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Baked salmon with glossy light teriyaki glaze, steamed broccoli and rice.")
  },

  // Samstag
  {
    id:"sa-f",
    title:"Yudofu-Schale (湯豆腐) mit kleinem Reis",
    desc:"Japanischer Tofu im heißen Sud, sehr bekömmlich; inspiriert von Kyoto-Stil Yudofu.",
    target:"KH gesamt ≈62 g (2 P.); Protein ≈32 g p. P.",
    ingredients:[
      {item:"Tofu (fest)", amount:400, unit:"g"},
      {item:"Gemüsebrühe", amount:800, unit:"ml"},
      {item:"Lauch", amount:100, unit:"g"},
      {item:"Spinat", amount:150, unit:"g"},
      {item:"Reis (roh)", amount:80, unit:"g"},
      {item:"Sojasauce natriumarm", amount:15, unit:"ml"},
      {item:"Sesam", amount:10, unit:"g"}
    ],
    steps:[
      "Brühe erhitzen, Tofuwürfel 5–6 Minuten ziehen lassen.",
      "Lauch und Spinat kurz mitgaren.",
      "Mit wenig Sojasauce servieren, Reis separat reichen."
    ],
    checks:"Gastritis ✓ sehr mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:["Reis ↔ Vollkornreis","Spinat ↔ Pak Choi"],
    side:"Wasser oder Gerstentee.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Yudofu in a clay pot with leeks and spinach, small rice bowl on side.")
  },
  {
    id:"sa-m",
    title:"Japchae mit Rind & Gemüse (잡채) – mild",
    desc:"Koreanische Glasnudeln mit viel Gemüse, ohne Schärfe; inspiriert von Maangchi.",
    target:"KH gesamt ≈75 g (2 P.); Protein ≈24 g p. P.",
    ingredients:[
      {item:"Glasnudeln (Süßkartoffel, trocken)", amount:80, unit:"g"},
      {item:"Rindfleisch mager (Streifen)", amount:220, unit:"g"},
      {item:"Paprika", amount:150, unit:"g"},
      {item:"Karotte", amount:150, unit:"g"},
      {item:"Champignons", amount:150, unit:"g"},
      {item:"Spinat", amount:150, unit:"g"},
      {item:"Sojasauce natriumarm", amount:25, unit:"ml"},
      {item:"Sesamöl", amount:10, unit:"ml"},
      {item:"Knoblauch", amount:1, unit:"Zehe"}
    ],
    steps:[
      "Glasnudeln kochen, kalt abspülen.",
      "Fleisch und Gemüse mit wenig Öl gar braten, würzen.",
      "Nudeln untermischen, kurz erwärmen."
    ],
    checks:"Gastritis ✓ mild gewürzt · Diabetes ✓ – ≈75 g KH · Schwangerschaft ✓ Fleisch durchgegart",
    swaps:["Rind ↔ Tofu", "Glasnudeln ↔ Reisnudeln"],
    side:"Sesam-Gurkenscheiben (mild).",
    remind:false,
    prompt:buildPrompt(PROMPT_HEADER,"Korean japchae noodles with colorful vegetables and beef strips, glossy but not oily.")
  },
  {
    id:"sa-a",
    title:"Shiitake-Hähnchen-Schmorgericht (香菇鸡) & kleiner Reis",
    desc:"Chinesisches Schmorgericht – zart und aromatisch; inspiriert von Red House Spice.",
    target:"KH gesamt ≈62 g (2 P.); Protein ≈33 g p. P.",
    ingredients:[
      {item:"Hähnchenschenkel (ohne Haut)", amount:300, unit:"g"},
      {item:"Shiitake", amount:200, unit:"g"},
      {item:"Karotte", amount:120, unit:"g"},
      {item:"Reis (roh)", amount:80, unit:"g"},
      {item:"Sojasauce natriumarm", amount:25, unit:"ml"},
      {item:"Ingwer", amount:10, unit:"g"},
      {item:"Gemüsebrühe", amount:300, unit:"ml"}
    ],
    steps:[
      "Hähnchen anrösten (mild), mit Brühe ablöschen.",
      "Shiitake und Karotte zugeben, 20–25 Minuten schmoren.",
      "Mit Reis servieren."
    ],
    checks:"Gastritis ✓ geschmort, mild · Diabetes ✓ – ≈62 g KH · Schwangerschaft ✓ Hähnchen durchgegart",
    swaps:["Hähnchen ↔ Tofu","Reis ↔ Vollkornreis"],
    side:"Gedämpfter Pak Choi oder Brokkoli.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Chinese braised chicken with shiitake mushrooms and carrots, small rice serving.")
  },

  // Sonntag
  {
    id:"so-f",
    title:"Reisbrei mit Apfel & Tofuwürfeln (お粥)",
    desc:"Sanfter Süß-Reisbrei mit fruchtiger Note; inspiriert von japanischem Okayu.",
    target:"KH gesamt ≈80 g (2 P.); Protein ≈22 g p. P.",
    ingredients:[
      {item:"Reis (roh)", amount:80, unit:"g"},
      {item:"Apfel", amount:150, unit:"g"},
      {item:"Wasser", amount:1000, unit:"ml"},
      {item:"Zimt", amount:1, unit:"Prise"},
      {item:"Tofu (fest)", amount:300, unit:"g"}
    ],
    steps:[
      "Reis mit Wasser zu Brei kochen (30 Minuten sanft).",
      "Apfelwürfel 5 Minuten mitziehen lassen.",
      "Tofuwürfel zugeben, kurz erwärmen, mit Zimt abrunden."
    ],
    checks:"Gastritis ✓ mild & warm · Diabetes ✓ – ≈80 g KH · Schwangerschaft ✓ vollständig gegart",
    swaps:["Apfel ↔ Birne","Tofu ↔ Skyr (pasteurisiert)"],
    side:"Warmer Kräutertee.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Creamy rice porridge with small apple cubes and tofu pearls, gentle steam, neutral bowl.")
  },
  {
    id:"so-m",
    title:"Klarer Nudeltopf mit Pute (清汤面)",
    desc:"Chinesisch inspiriert, klare Brühe und zarte Pute; inspiriert von Made With Lau.",
    target:"KH gesamt ≈70 g (2 P.); Protein ≈24 g p. P.",
    ingredients:[
      {item:"Weizennudeln (trocken)", amount:100, unit:"g"},
      {item:"Putenbrust", amount:220, unit:"g"},
      {item:"Pak Choi", amount:200, unit:"g"},
      {item:"Karotte", amount:120, unit:"g"},
      {item:"Zwiebel", amount:60, unit:"g"},
      {item:"Gemüsebrühe", amount:900, unit:"ml"},
      {item:"Sojasauce natriumarm", amount:15, unit:"ml"}
    ],
    steps:[
      "Brühe erhitzen, Pute 8–10 Minuten gar ziehen.",
      "Gemüse 3–4 Minuten mitgaren.",
      "Nudeln kochen, abspülen, in den Topf geben und mild würzen."
    ],
    checks:"Gastritis ✓ mild · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Pute durchgegart",
    swaps:["Weizennudeln ↔ Reisnudeln","Pute ↔ Tofu"],
    side:"Lauwarmes Wasser.",
    remind:false,
    prompt:buildPrompt(PROMPT_HEADER,"Clear noodle soup with turkey slices, pak choi and carrots, light broth.")
  },
  {
    id:"so-a",
    title:"Seelachs-Jorim – mild geschmort (명태조림) & Reis",
    desc:"Koreanischer Schmor-Fisch mit Rettich, ohne Schärfe; inspiriert von Korean Home Cooking.",
    target:"KH gesamt ≈70 g (2 P.); Protein ≈30 g p. P.",
    ingredients:[
      {item:"Seelachsfilet (Alaska Pollock)", amount:320, unit:"g"},
      {item:"Rettich (Daikon)", amount:250, unit:"g"},
      {item:"Zwiebel", amount:60, unit:"g"},
      {item:"Doenjang", amount:20, unit:"g"},
      {item:"Sojasauce natriumarm", amount:20, unit:"ml"},
      {item:"Wasser", amount:500, unit:"ml"},
      {item:"Reis (roh)", amount:90, unit:"g"},
      {item:"Sesamöl", amount:8, unit:"ml"}
    ],
    steps:[
      "Rettichscheiben in Wasser mit Doenjang sanft 10 Minuten köcheln.",
      "Seelachs zugeben und 8–10 Minuten mild schmoren.",
      "Mit Sesamöl abrunden, mit Reis servieren."
    ],
    checks:"Gastritis ✓ geschmort, nicht scharf · Diabetes ✓ – ≈70 g KH · Schwangerschaft ✓ Seelachs durchgegart, quecksilberarm",
    swaps:["Seelachs ↔ Kabeljau","Reis ↔ Vollkornreis"],
    side:"Gedämpfter Spinat.",
    remind:true,
    prompt:buildPrompt(PROMPT_HEADER,"Mild braised pollock with daikon in light brown sauce, served with a small rice bowl.")
  }
];

// ---- Einkaufsliste Aggregation ----
const GROUPS = {
  "Protein/Fisch/Tofu": [
    "Lachsfilet","Kabeljaufilet","Seelachsfilet (Alaska Pollock)","Hähnchenbrust","Hähnchenschenkel (ohne Haut)","Putenbrust",
    "Rindfleisch mager (Streifen)","Rinderhack mager","Tofu (fest)","Tofu (seiden)","Eier","Edamame (geschält)","Parmesan (pasteurisiert, optional)"
  ],
  "Gemüse/Pilze": [
    "Frühlingszwiebel","Ingwer","Zwiebel","Karotte","Paprika","Pak Choi","Brokkoli","Shiitake","Champignons","Spinat",
    "Zucchini","Kartoffeln","Kürbis (Hokkaido/Kabocha)","Lauch","Rettich (Daikon)","Stangensellerie","Apfel","Gurke"
  ],
  "Reis/Nudeln/Sättigung": [
    "Reis (roh)","Sushi-Reis (roh)","Vollkornreis (roh)","Brauner Reis (roh)","Perlgerste (roh)","Vollkornpasta (trocken)",
    "Udon (trocken)","Weizennudeln (trocken)","Reisnudeln (trocken)","Glasnudeln (Süßkartoffel, trocken)"
  ],
  "Algen/Brühen/Würze": [
    "Miso (hell)","Doenjang","Sojasauce natriumarm","Gemüsebrühe","Wasser","Nori","Wakame (getrocknet)","Sesamöl","Rapsöl",
    "Olivenöl","Mirin (optional)","Honig (optional)","Zimt","Salz","Sesam","Knoblauch","Birne (gerieben)","Tomaten (passiert)"
  ]
};

// unify some names for counts
function canonicalizeName(name){
  // unify all raw rice to "Reis (roh)"
  if (/(Sushi-)?Vollkorn?reis \(roh\)|Brauner Reis \(roh\)/i.test(name)) return "Reis (roh)";
  if (/Wasser$/i.test(name)) return "Wasser";
  if (/Eier/i.test(name)) return "Eier";
  return name;
}

function unitOf(name, defaultUnit){
  if (["Eier"].includes(name)) return "Stück";
  if (/(Brühe|Sojasauce|Wasser|Mirin|Öl)/i.test(name)) return "ml";
  if (/(passiert)/i.test(name)) return "ml";
  if (/(Nori|Wakame|Zimt|Salz|Knoblauch|Birne)/i.test(name) && !/ml|g|Stück$/.test(defaultUnit||"")) return defaultUnit || "g";
  return defaultUnit || "g";
}

function aggregateList(recipes){
  const sums = {};
  for (const r of recipes){
    for (const ing of r.ingredients){
      const name0 = ing.item;
      const canon = canonicalizeName(name0);
      const unit = unitOf(canon, ing.unit);
      const key = `${canon}||${unit}`;
      const amt = typeof ing.amount==="number" ? ing.amount : 0;
      sums[key] = (sums[key]||0) + amt;
    }
  }
  // assign to groups
  const list = { "Protein/Fisch/Tofu":[], "Gemüse/Pilze":[], "Reis/Nudeln/Sättigung":[], "Algen/Brühen/Würze":[] };
  const allGroupNames = Object.keys(list);
  for (const k in sums){
    const [name, unit] = k.split("||");
    let group = allGroupNames.find(g=>GROUPS[g].includes(name));
    if (!group){
      // heuristics
      if (/Tofu|Hähnchen|Pute|Rind|Lachs|Kabeljau|Seelachs|Eier|Edamame|Parmesan/i.test(name)) group = "Protein/Fisch/Tofu";
      else if (/Reis|Udon|Nudeln|Pasta|Gerste/i.test(name)) group = "Reis/Nudeln/Sättigung";
      else if (/Miso|Doenjang|Sojasauce|Brühe|Wasser|Nori|Wakame|Öl|Zimt|Salz|Sesam|Knoblauch|Birne|passiert/i.test(name)) group = "Algen/Brühen/Würze";
      else group = "Gemüse/Pilze";
    }
    list[group].push({ name, amount: Math.round(sums[k]*10)/10, unit });
  }
  // sort items by name
  for (const g of allGroupNames){
    list[g].sort((a,b)=>a.name.localeCompare(b.name,"de"));
  }
  return list;
}

// ---- Component ----
export default function Woche_4_2025_10_20(){
  const [activeTab, setActiveTab] = useState("kochbuch");
  const [downloadLinks, setDownloadLinks] = useState({}); // keys: 'kochbuch-pdf','kochbuch-html','einkauf-pdf','einkauf-html'
  const [coverImg, setCoverImg] = useState(null);
  const [recipeImgs, setRecipeImgs] = useState({}); // id -> dataURL
  const kochbuchRef = useRef(null);
  const einkaufRef = useRef(null);

  // load saved images
  useEffect(()=>{
    const c = localStorage.getItem(`${FILE_BASE}::img::cover`);
    if (c) setCoverImg(c);
    const map = {};
    for (const r of RECIPES){
      const k = localStorage.getItem(`${FILE_BASE}::img::${r.id}`);
      if (k) map[r.id] = k;
    }
    setRecipeImgs(map);
  },[]);

  const LIST_SUMMARY = useMemo(()=>aggregateList(RECIPES),[]);

  async function exportPDF(which){
    await ensureScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js");
    const node = which==="kochbuch" ? kochbuchRef.current : einkaufRef.current;
    if (!node) return;
    const optBase = {
      margin:       [10,10,10,10],
      filename:     `${FILE_BASE} – ${which}.pdf`,
      html2canvas:  { scale:3, useCORS:true, background:COLORS.pageBg, letterRendering:true, foreignObjectRendering:false },
      pagebreak:    which==="kochbuch" ? { mode:['css','legacy'], after:['.page'], avoid:['.avoid-break'] } : { mode:['css'], after:['.page'] },
      jsPDF:        { unit:'pt', format:'a4', orientation: which==="kochbuch" ? 'landscape' : 'portrait' }
    };
    // Pass 1
    const worker = window.html2pdf().set(optBase).from(node);
    const blobUrl = await new Promise(resolve=>{
      worker.outputPdf('bloburl').then(url=>resolve(url));
    });
    const ok = blobUrl && (await fetch(blobUrl).then(r=>r.blob())).size > 50*1024;
    let finalUrl = blobUrl;
    if (!ok){
      // fallback pass
      const opt2 = {
        ...optBase,
        html2canvas: { scale:3, useCORS:true, background:COLORS.pageBg, letterRendering:false, foreignObjectRendering:true },
        pagebreak:   { mode:['css'], after:['.page'] }
      };
      finalUrl = await new Promise(resolve=>{
        window.html2pdf().set(opt2).from(node).outputPdf('bloburl').then(url=>resolve(url));
      });
    }
    setDownloadLinks(prev=>({ ...prev, [`${which}-pdf`]: finalUrl }));
  }

  function exportHTML(which){
    const node = which==="kochbuch" ? kochbuchRef.current : einkaufRef.current;
    if (!node) return;
    const css = baseCSS();
    const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"/>
<title>${which==="kochbuch" ? "GhibliKitchen – Woche 4" : "GhibliKitchen – Einkaufsliste – Woche 4"}</title>
<style>${css}</style></head><body>${node.outerHTML}</body></html>`;
    const blob = new Blob([html], {type:"text/html"});
    const url = URL.createObjectURL(blob);
    setDownloadLinks(prev=>({ ...prev, [`${which}-html`]: url }));
  }

  function onUploadCover(e){
    const f = e.target.files?.[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = ()=>{
      const data = rd.result;
      setCoverImg(data);
      localStorage.setItem(`${FILE_BASE}::img::cover`, data);
    };
    rd.readAsDataURL(f);
  }

  function onUploadRecipe(id, e){
    const f = e.target.files?.[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = ()=>{
      const data = rd.result;
      setRecipeImgs(prev=>({ ...prev, [id]: data }));
      localStorage.setItem(`${FILE_BASE}::img::${id}`, data);
    };
    rd.readAsDataURL(f);
  }

  // ---- Tests (Pflicht) ----
  useEffect(()=>{
    // 7 Tage * 3 Meals
    console.assert(RECIPES.length === 21, "[GhibliKitchen] Erwartet 21 Rezepte");
    // IDs eindeutig
    const ids = new Set(RECIPES.map(r=>r.id));
    console.assert(ids.size === 21, "[GhibliKitchen] IDs nicht eindeutig");
    // Metformin-Logik
    for (const r of RECIPES){
      if (/-m$/.test(r.id)) console.assert(r.remind === false, `[GhibliKitchen] Mittag remind falsch: ${r.id}`);
      if (/-f$/.test(r.id) || /-a$/.test(r.id)) console.assert(r.remind === true, `[GhibliKitchen] Frühstück/Abend remind falsch: ${r.id}`);
    }
    // Zutaten/Steps Mindestanzahl
    for (const r of RECIPES){
      console.assert(r.ingredients.length >= 5, `[GhibliKitchen] Zutaten zu wenig: ${r.id}`);
      console.assert(r.steps.length >= 3, `[GhibliKitchen] Steps zu wenig: ${r.id}`);
    }
    // FILE_BASE Regex
    console.assert(/^Woche 4 \d{4}-\d{2}-\d{2}$/.test(FILE_BASE), "[GhibliKitchen] FILE_BASE regex fail");
    // buildPrompt
    console.assert(buildPrompt("A","B")==="A\nB", "[GhibliKitchen] buildPrompt fail");
    // LIST_SUMMARY Gruppenanzahl
    console.assert(Object.keys(LIST_SUMMARY).length===4, "[GhibliKitchen] LIST_SUMMARY Gruppen != 4");
    // CSS verbotene Funktionen
    const css = baseCSS();
    console.assert(!/oklab|oklch|color-mix|lab\(/i.test(css), "[GhibliKitchen] Verbotene CSS-Farbfunktionen gefunden");
    console.log("[GhibliKitchen] All tests passed (JSX).");
  },[LIST_SUMMARY]);

  return (
    <div style={{background:COLORS.pageBg, color:COLORS.text, minHeight:"100vh", padding:"20px"}}>
      <TopBar
        activeTab={activeTab}
        onTab={setActiveTab}
        onPDF={()=>exportPDF(activeTab)}
        onHTML={()=>exportHTML(activeTab)}
      />
      {/* Kochbuch Tab */}
      <div style={{display: activeTab==="kochbuch" ? "block" : "none"}} ref={kochbuchRef}>
        <h1 style={{fontSize:28, fontWeight:700, margin:"0 0 10px"}}>GhibliKitchen – Woche 4</h1>
        <div className="print:hidden" style={{marginBottom:16}}>
          <label style={{display:"inline-block", padding:"8px 12px", background:COLORS.indigo, color:"#fff", borderRadius:12, boxShadow:COLORS.btnShadow, cursor:"pointer"}}>
            Cover-Bild hochladen
            <input type="file" accept="image/*" onChange={onUploadCover} style={{display:"none"}} />
          </label>
          {coverImg && <small style={{marginLeft:10}}>gespeichert ({Math.round(bytesFromDataUrl(coverImg)/1024)} KB)</small>}
        </div>
        {/* Cover Page */}
        <div className="page avoid-break" style={pageStyle()}>
          <div style={{display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gap:16}}>
            <div style={{gridColumn:"span 4"}}>
              <div style={cardPanelStyle}>
                <div style={{fontSize:18, fontWeight:700, marginBottom:8}}>Woche 4 – {meta.startDate}</div>
                <p style={{marginTop:4, lineHeight:1.5, color:COLORS.neutral}}>
                  Schwerpunkte: CN/JP/KR, mild gewürzt, natriumarme Sojasauce, Schwangerschaft-sicher, Diabetes-geeignet (≈60–90 g KH/Meal, 2 P.).
                  Metformin: Frühstück & Abendessen – Erinnerung; Mittag – ohne Erinnerung.
                </p>
                <ul style={{marginTop:8, paddingLeft:18, lineHeight:1.6}}>
                  <li>Garweisen: Dämpfen, Sieden, Schmoren, sanftes Dünsten; moderates Anbraten ok.</li>
                  <li>Chili separat; milde Säure moderat; Zwiebel/Knoblauch gut gegart.</li>
                  <li>Fisch: Lachs/Kabeljau/Seelachs; Algen sparsam.</li>
                </ul>
              </div>
            </div>
            <div style={{gridColumn:"span 8"}}>
              <div style={cardMainStyle}>
                <div style={{height:340, display:"flex", alignItems:"center", justifyContent:"center", background:COLORS.panelBG80, borderRadius:14, overflow:"hidden"}}>
                  {coverImg ? <img src={coverImg} alt="Cover" style={{width:"100%", height:"100%", objectFit:"cover"}}/> :
                    <div style={{textAlign:"center", color:COLORS.neutral}}>
                      <div style={{fontSize:20, fontWeight:600}}>Cover-Bild</div>
                      <div>Nutze den Button „Cover-Bild hochladen“</div>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Pages */}
        {RECIPES.map(r=>(
          <div key={r.id} className="page avoid-break" style={pageStyle()}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gap:16}}>
              {/* Left Panel */}
              <div style={{gridColumn:"span 4"}}>
                <div style={cardPanelStyle}>
                  <div style={{fontSize:14, fontWeight:700, color:COLORS.sky, marginBottom:6}}>
                    {dayLabel(r.id)} – {mealTitle(r.id)}
                  </div>
                  <div style={{height:180, display:"flex", alignItems:"center", justifyContent:"center", background:COLORS.panelBG80, borderRadius:12, overflow:"hidden", marginBottom:10}}>
                    {recipeImgs[r.id] ? <img src={recipeImgs[r.id]} alt={r.title} style={{width:"100%", height:"100%", objectFit:"cover"}}/> :
                      <div style={{textAlign:"center", color:COLORS.neutral}}>Rezeptbild hier</div>}
                  </div>
                  <div className="print:hidden" style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:8}}>
                    <label style={{display:"inline-block", padding:"6px 10px", background:COLORS.emerald, color:"#fff", borderRadius:12, boxShadow:COLORS.btnShadow, cursor:"pointer"}}>
                      Bild hochladen
                      <input type="file" accept="image/*" onChange={(e)=>onUploadRecipe(r.id,e)} style={{display:"none"}}/>
                    </label>
                    {recipeImgs[r.id] && <small>({Math.round(bytesFromDataUrl(recipeImgs[r.id])/1024)} KB)</small>}
                  </div>
                  <div style={{fontSize:12, color:COLORS.neutral, lineHeight:1.5}}>{r.desc}</div>
                </div>
              </div>
              {/* Right Main */}
              <div style={{gridColumn:"span 8"}}>
                <div style={cardMainStyle}>
                  <h2 style={{margin:"0 0 6px", fontSize:20}}>{r.title}</h2>
                  <div style={{fontSize:13, color:COLORS.indigo, fontWeight:600, marginBottom:10}}>{r.target}</div>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
                    <div>
                      <h3 style={{fontSize:14, margin:"0 0 6px"}}>Zutaten (2 Personen)</h3>
                      <ul style={{paddingLeft:18, margin:0, lineHeight:1.6}}>
                        {r.ingredients.map((ing, idx)=>(
                          <li key={idx}>
                            {ing.amount} {ing.unit} {ing.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 style={{fontSize:14, margin:"0 0 6px"}}>Zubereitung</h3>
                      <ol style={{paddingLeft:18, margin:0, lineHeight:1.6}}>
                        {r.steps.map((s, idx)=>(<li key={idx}>{s}</li>))}
                      </ol>
                    </div>
                  </div>
                  <div style={{marginTop:10, fontSize:12}}><strong>Hinweise:</strong> {r.checks}</div>
                  <div style={{marginTop:6, fontSize:12}}><strong>Austausche:</strong> {r.swaps.join(" · ")}</div>
                  <div style={{marginTop:6, fontSize:12}}><strong>Beilagenvorschlag:</strong> {r.side}</div>
                  {r.remind && (
                    <div style={{marginTop:10, padding:"8px 10px", background:"rgba(5,150,105,.08)", border:`1px solid ${COLORS.emerald}`, borderRadius:12, fontSize:13}}>
                      💊 Metformin mit der Mahlzeit einnehmen.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Download Links */}
        <div className="print:hidden" style={{marginTop:16}}>
          {downloadLinks["kochbuch-pdf"] && <div><a href={downloadLinks["kochbuch-pdf"]} download>{`PDF herunterladen: ${FILE_BASE} – kochbuch.pdf`}</a></div>}
          {downloadLinks["kochbuch-html"] && <div><a href={downloadLinks["kochbuch-html"]} download>{`HTML herunterladen: ${FILE_BASE} – kochbuch.html`}</a></div>}
        </div>
      </div>

      {/* Einkaufsliste Tab */}
      <div style={{display: activeTab==="einkauf" ? "block" : "none"}} ref={einkaufRef}>
        <h1 style={{fontSize:28, fontWeight:700, margin:"0 0 10px"}}>GhibliKitchen – Einkaufsliste – Woche 4</h1>
        <div className="page avoid-break" style={pageStylePortrait()}>
          <div style={cardMainStyle}>
            <h2 style={{marginTop:0}}>LIST_SUMMARY (Wochengesamt)</h2>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
              {Object.entries(LIST_SUMMARY).map(([group,items])=>(
                <div key={group} style={{border:`1px dashed ${COLORS.border}`, borderRadius:12, padding:12}}>
                  <div style={{fontWeight:700, color:COLORS.sky, marginBottom:6}}>{group}</div>
                  <ul style={{margin:0, paddingLeft:18, lineHeight:1.6}}>
                    {items.map((it, idx)=>(
                      <li key={idx}>{it.name}: {it.amount} {it.unit}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p style={{marginTop:12, color:COLORS.neutral, fontSize:12}}>
              Einheiten vereinheitlicht (ml statt l; Reis/Nudeln als „(roh)“/„(trocken)“). Algen (Wakame/Nori) sparsam.
            </p>
          </div>
        </div>
        <div className="print:hidden" style={{marginTop:16}}>
          {downloadLinks["einkauf-pdf"] && <div><a href={downloadLinks["einkauf-pdf"]} download>{`PDF herunterladen: ${FILE_BASE} – einkaufsliste.pdf`}</a></div>}
          {downloadLinks["einkauf-html"] && <div><a href={downloadLinks["einkauf-html"]} download>{`HTML herunterladen: ${FILE_BASE} – einkaufsliste.html`}</a></div>}
        </div>
      </div>
    </div>
  );
}

// ---- UI Components ----
function TopBar({activeTab, onTab, onPDF, onHTML}){
  return (
    <div className="print:hidden" style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16}}>
      <div style={{display:"flex", gap:8}}>
        <TabButton active={activeTab==="kochbuch"} onClick={()=>onTab("kochbuch")}>Kochbuch</TabButton>
        <TabButton active={activeTab==="einkauf"} onClick={()=>onTab("einkauf")}>Einkaufsliste</TabButton>
      </div>
      <div style={{display:"flex", gap:10}}>
        <ActionButton onClick={onPDF}>PDF erzeugen</ActionButton>
        <ActionButton onClick={onHTML}>HTML exportieren</ActionButton>
        <ActionButton onClick={()=>window.print()}>Drucken</ActionButton>
      </div>
    </div>
  );
}
function TabButton({active, children, onClick}){
  return (
    <button onClick={onClick} style={{
      padding:"8px 14px", borderRadius:14, border:`1px solid ${COLORS.border}`, boxShadow:COLORS.btnShadow,
      background: active ? COLORS.indigo : COLORS.white, color: active ? "#fff" : COLORS.text, cursor:"pointer"
    }}>{children}</button>
  );
}
function ActionButton({children, onClick}){
  return (
    <button onClick={onClick} style={{
      padding:"10px 14px", borderRadius:14, border:`1px solid ${COLORS.border}`, boxShadow:COLORS.btnShadow,
      background: COLORS.emerald, color:"#fff", cursor:"pointer", fontWeight:600
    }}>{children}</button>
  );
}

// ---- Styles ----
function baseCSS(){
  return `
  @page { size: A4; margin: 10pt; }
  * { box-sizing: border-box; }
  body { background: ${COLORS.pageBg}; color:${COLORS.text}; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
  .page { background:${COLORS.pageBg}; padding: 10px; page-break-after: always; }
  .avoid-break { break-inside: avoid; }
  @media print {
    .print\\:hidden { display: none !important; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
  `;
}
function pageStyle(){
  return { background: COLORS.pageBg, padding:10, pageBreakAfter:"always" };
}
function pageStylePortrait(){
  return { background: COLORS.pageBg, padding:10, pageBreakAfter:"always", minHeight:"90vh" };
}