# 🏭 GhibliKitchen Production Prompt — **Korrigierte Version (DE & ZH, 2 Dateien strikt)**

Dieser Prompt erzwingt die Ausgabe von **genau zwei getrennten Dateien** – eine **deutsche** und eine **chinesische** – im **identischen** Design und Verhalten wie die Referenz **„Woche-4-2025-10-20“**. **Keine Kombi-Datei.**

---

## ✅ Harte Output-Regeln (MUSS)

1) **Antwortformat – exakt zwei Dateien, sonst nichts**  
   Gib **nur** diese zwei Dateien aus (keine Erklärtexte, kein dritter Block):
   - `src/plans/Woche-{{WEEK_NR}}-{{START_DATE}}.de.jsx`
   - `src/plans/Woche-{{WEEK_NR}}-{{START_DATE}}.zh.jsx`

2) **Monolingual pro Datei (bilingual-Felder sind verboten)**  
   - In **jeder** der beiden Dateien müssen **alle** Felder in `DATA` **monolingual** sein (`string` bzw. `string[]`).  
   - **Verboten im finalen Output:** `{ de: "...", zh: "..." }`-Objekte in `title`, `desc`, `story`, `target`, `checks`, `swaps`, `side`, `ingredients`, `steps`.
   - `pickText`/`pickList` **dürfen** weiterhin importiert und genutzt werden (sie akzeptieren Strings/Arrays), aber die Daten sind bereits einsprachig.

3) **Feste Sprache pro Datei (kein Umschalter)**  
   - DE-Datei: `const lang = "de";` als **Konstante**.  
   - ZH-Datei: `const lang = "zh";` als **Konstante**.  
   - **Kein** Language-State, **kein** zusätzlicher Umschalter.

4) **DOM-IDs und Struktur wie Referenz (1:1)**  
   - IDs **identisch** in beiden Dateien: `"cookbook-root"` (Kochbuch, A4 quer) und `"list-root"` (Einkaufsliste, A4 hoch).  
   - Top-Bar Buttons: **„PDF erzeugen“**, **„HTML exportieren“**, **„Drucken“**. **Kein** „HTML öffnen“.
   - Nach Export: jeweils Download-Link unter dem aktiven Tab-Inhalt.

5) **Tests verhindern gemischte Felder**  
   - Jede Datei enthält am Ende **Mini-Tests**, die zusätzlich prüfen, dass **keine** `{ de, zh }`-Objekte in `DATA` vorkommen (siehe unten).

---

## 🎯 Ziel & UI-Layout (fix)

- **Tabs:** „Kochbuch“ (A4 quer) und „Einkaufsliste“ (A4 hoch).
- Jede Rezeptseite ist **eine** Seite (1 Rezept = 1 Seite), linkes Panel ≤1/3 (span 4), Rezept rechts ≥2/3 (span 8).
- **Top-Bar Buttons**: „PDF erzeugen“, „HTML exportieren“, „Drucken“. Kein „HTML öffnen“.
  Nach PDF-Erzeugung erscheint ein Download-Link unter dem jeweiligen Tab-Inhalt.
- **Cover-Seite:** Zweispaltig mit Flex: links Info/Upload (cardPanelStyle), rechts **Wochenübersicht** (`cardMainStyle`) — Pflicht.
- **Wochenübersicht:** 7 Blöcke (Mo–So), je Block 3 Kacheln (Frühstück/Mittag/Abend); je Kachel Titel, „🌾 KH …“ (aus `target`), bei Frühstück/Abend „💊“.
- **Wochentag-Überschrift:** pro Rezept **oberhalb** des Rezepttitels im rechten Hauptteil (kleine Zeile, kein H-Tag).
- **DALL·E-Prompts** NICHT rendern (nur als String im Code).
- **Bilder-Uploads** (Cover + je Rezept) via FileReader, persistiert in `localStorage`.
- Über jedem Rezept: **„{Wochentag} – {Morgen|Mittag|Abend}“**.
- **Metformin-Reminder:** Frühstück/Abend ✅, Mittag ❌.
- Jedes Rezept enthält eine **Kurzbeschreibung** (Ursprung + „inspiriert von …“) und eine **kurze Story** direkt unter dem Titel (neutral, Schriftgröße 12).
- Wochenübersicht oben zeigt pro Tag drei Kacheln (F/M/A) mit Titel, Ziel („🌾 KH …“) und 💊-Icon, wenn Reminder aktiv ist.

---

## 🧱 Fixe Metadaten & Basisstruktur (beide Dateien identisch, nur Texte unterschiedlich)

```js
export const meta = { 
  title: "Woche {{WEEK_NR}}", 
  startDate: "{{START_DATE}}", 
  id: "woche-{{WEEK_NR}}-{{START_DATE}}"
};
const FILE_BASE = "Woche {{WEEK_NR}} {{START_DATE}}";
```

**UI-Titel (anzeigen):**
- Hauptseite: `GhibliKitchen – Woche {{WEEK_NR}}`
- Liste: `GhibliKitchen – Einkaufsliste – Woche {{WEEK_NR}}`

**Farben & Styles:**

```js
const COLORS = {
  pageBg:"#FAF7F1",
  text:"#111827",
  border:"rgba(0,0,0,.10)",
  panelBG70:"rgba(255,255,255,.70)",
  panelBG80:"rgba(255,255,255,.80)",
  white:"#FFFFFF",
  emerald:"#059669",
  amber:"#f59e0b",
  sky:"#0284c7",
  neutral:"#404040",
  indigo:"#4f46e5",
  btnShadow:"0 6px 20px rgba(0,0,0,.12)",
};
const cardPanelStyle = {
  background: COLORS.panelBG70,
  borderRadius: 18,
  padding: 20,
  boxShadow: COLORS.btnShadow,
  border: `1px solid ${COLORS.border}`,
};
const cardMainStyle = {
  background: COLORS.white,
  borderRadius: 18,
  padding: 22,
  boxShadow: COLORS.btnShadow,
  border: `1px solid ${COLORS.border}`,
};
```

**DALL·E-Prompt-Header & Helper:**

```js
const PROMPT_HEADER =
  "Ultra-clean cookbook photo, soft daylight, top-down, pastel background, visible steam, pregnancy-safe (no raw fish or raw egg), mild Asian home cooking (JP/CN/KR), family-friendly";
const buildPrompt = (a, b) => `${a}\n${b}`;
```

---

## 🧰 Imports & i18n

- Importiere in **beiden** Dateien:
  ```js
  import React, { useEffect, useMemo, useState } from "react";
  import { exportPDFById, exportHTMLById } from "../utils/exporters";
  import { buildEmbedCss } from "../utils/embedCss";
  import { UI } from "../i18n-ui";
  import { pickText, pickList } from "../i18n-data";
  ```
- **Wichtig:** Im finalen Output sind alle `DATA`-Felder **monolingual** (Strings/Arrays). `{ de, zh }` ist **verboten**.
- `pickText/pickList` können trotzdem verwendet werden (sie arbeiten mit Strings/Arrays ohne Probleme).

---

## Gesundheits- & Küchenregeln

- Küchenmix: **CN/JP/KR dominant** (mind. 6/7 Tage), **max. 1** IT-Gericht.
- Pro Rezept (2 Personen): **60–90 g KH** gesamt; optionaler Protein-Hinweis (**20–40 g p. P.**).
- Diabetes (frühes Stadium; Metformin 2× täglich (früh und abend)): pro Mahlzeit (2 Pers.) **60–90 g KH** (≈30–45 g p. P.), ballaststoffbetont; **Protein 20–40 g p. P.** Metformin: **nur Reminder** („mit der Mahlzeit“).
- Garmethoden: **Dämpfen, Sieden, Schmoren, Wok (braten)**; wenig Öl; Zwiebel/Knoblauch sparsam & gut gegart; **Säure mild**; Algen/Jod **sparsam**.
- Schwangerschaft: **nichts Rohes**, alles **durchgaren** (Eier vollständig gestockt); quecksilberarme Fische (Lachs/Kabeljau/Seelachs/Wolfsbarsch); Hygiene; **Sojasauce natriumarm**; **Jod sparsam (Wakame/Kombu)**.
- Gastritis:
  - Wenn explizit „gastritis-konform“ → **streng** (Schärfe/zu sauer/fettig meiden, schonend garen, wenig Öl, warm servieren).
  - Sonst **balanced**: mild würzen, nicht zu scharf; vorsichtiges Wok/Anbraten/Grillen mit wenig Öl erlaubt; milde Säure moderat; Zwiebel/Knoblauch maßvoll & gut gegart; Chili optional separat.
  - **Non-Strict Checks:** „Gastritis“ **ohne ✓** (nur erläuternder Text, z. B. „Gastritis – mild …“).
- Titel: Deutsch + Originalname + Schriftzeichen.

---

## 🗂 Datenmodell (21 Rezepte)

- Genau **21 Rezepte**: 7 Tage × 3 (Frühstück `-f`, Mittag `-m`, Abend `-a`).  
- Rezept-Objekt (beide Dateien **strukturell identisch**; Inhalte monolingual):

```ts
type Recipe = {
  id: "mo-f" | "mo-m" | "mo-a" | "di-f" | ... | "so-a";
  title: string;
  desc: string;
  story: string;
  target: string;          // z. B. "≈70 g KH gesamt (2 P.) · Protein ≈20 g p. P."
  ingredients: string[];   // ≥ 5 Einträge
  steps: string[];         // ≥ 3 Einträge
  checks: string;
  swaps: string;
  side:  string;
  remind: boolean;         // Frühstück/Abend: true, Mittag: false
  prompt: string;          // buildPrompt(PROMPT_HEADER, "...")
}
```

**Tagesreihenfolge:**

```js
const DAYS_ORDER = ["mo","di","mi","do","fr","sa","so"];
const DAY_NAME_DE = { mo:"Montag", di:"Dienstag", mi:"Mittwoch", do:"Donnerstag", fr:"Freitag", sa:"Samstag", so:"Sonntag" };
const DAY_NAME_ZH = { mo:"周一", di:"周二", mi:"周三", do:"周四", fr:"周五", sa:"周六", so:"周日" };
const groupByDay = (arr) => {
  const map = { mo:[],di:[],mi:[],do:[],fr:[],sa:[],so:[] };
  arr.forEach((r)=> map[r.id.split("-")[0]].push(r));
  Object.values(map).forEach((list)=>
    list.sort((a,b)=> ["f","m","a"].indexOf(a.id.split("-")[1]) - ["f","m","a"].indexOf(b.id.split("-")[1]))
  );
  return map;
};
```

---

## 📋 Rezeptkarte (Pflicht-Layout)

- Linkes Info-Panel:
  - Upload (nur in UI sichtbar, `print:hidden`), kleines Bild
  - Kurzbeschreibung, Ziel, Checks, Beilage
  - **Reminder-Badge** („💊 Metformin…“) wenn `remind === true`
- Rechter Hauptbereich:
  - Breadcrumb in **sky** (Tag + Meal)
  - **Titel** (h2)
  - **Story** (kurz, neutral, 12px)
  - **Zutaten (2 Personen)** – Liste
  - **Schritte** – geordnete Liste
  - **Swaps** – Satz

**Render-Guards (stabil, auch in ZH):**

```jsx
const asList = (v, lang) => {
  try {
    const out = pickList(v, lang);
    return Array.isArray(out) ? out : [];
  } catch { return []; }
};
const safeText = (v, lang) => {
  try { const s = pickText(v, lang); return (s ?? "").toString(); }
  catch { return ""; }
};
```

---

## 🛒 Einkaufsliste (Auto-Summen)

- Parser: `Zutat Menge Einheit` (g|ml|l|EL|TL|Stück)
- Einheiten-Normalisierung: `l → ml`
- **4 Gruppen:**  
  1) Protein/Fisch/Tofu  
  2) Gemüse/Pilze  
  3) Reis/Nudeln/Sättigung  
  4) Algen/Brühen/Würze  
- Ausgabe sortiert (alphabetisch), Mengen `Math.round`.

---

## 🧭 Interaktive UI-Elemente (Top-Bar)

- Tabs (State: `"kochbuch"` | `"einkauf"`)
- Drei Buttons:
  - **PDF erzeugen** → `exportPDFById("cookbook-root" | "list-root", ...)`
  - **HTML exportieren** → `exportHTMLById(...)`
  - **Drucken** → `window.print()`
- Nach Export: Download-Link unterhalb des aktiven Tabs anzeigen.
- **Orientierung:** Kochbuch `landscape`, Einkaufsliste `portrait` (via `buildEmbedCss`).

---

## 🌐 Sprache

- DE-Datei: `const lang = "de";` (Konstante).
- ZH-Datei: `const lang = "zh";` (Konstante).
- Texte via `UI[lang]` + `pickText/pickList` (arbeiten mit monolingualen Strings/Arrays).
- **Kein** Language-Switcher in der Top-Bar (Sidebar übernimmt).

---

## 🚦 Qualitäts-Checkliste (bei Generierung)

- 21 Rezepte, IDs korrekt (mo|di|…|so)-(f|m|a).
- Keine leeren Felder: `title`, `desc`, `story`, `target`, `ingredients[≥5]`, `steps[≥3]`, `checks`, `swaps`, `side`.
- Reminder-Regel korrekt: Mittag **kein** Reminder; Frühstück/Abend **mit** Reminder.
- Wochenübersicht: 7×3 Karten (Titel + 🌾 KH + ggf. 💊).
- PDF-/HTML-Export funktionieren; getrennte Orientierung (quer/hoch).
- **Monolingual-Check** bestanden (siehe Tests unten).
- Keine experimentellen CSS-Farben (`color-mix`, `oklab` etc.).

---

## 🧪 Mini-Test-Code (am Dateiende, in **beiden** Dateien)

```js
function Tests() {
  try {
    if (DATA.length !== 21) throw new Error("DATA length must be 21");
    const ids = new Set(DATA.map((r) => r.id));
    if (ids.size !== 21) throw new Error("IDs not unique");
    DATA.forEach((r) => {
      const isLunch = /-m$/.test(r.id);
      if (isLunch && r.remind) throw new Error("Mittag darf keinen Reminder haben");
      if (!isLunch && !r.remind) throw new Error("Frühstück/Abend brauchen Reminder");
      if (!Array.isArray(r.ingredients) || r.ingredients.length < 5) throw new Error(`Zutaten zu wenig: ${r.id}`);
      if (!Array.isArray(r.steps) || r.steps.length < 3) throw new Error(`Steps zu wenig: ${r.id}`);
    });
    // Zusätzlicher Monolingual-Check (verhindert { de, zh }-Objekte)
    const asJson = JSON.stringify(DATA);
    if (asJson.includes('"de":') || asJson.includes('"zh":') || asJson.includes('{"de"') || asJson.includes('{"zh"')) {
      throw new Error("DATA muss monolingual sein (keine { de, zh }-Objekte im finalen Output).");
    }
    console.log("[GhibliKitchen] All tests passed (JSX).");
  } catch (e) {
    console.error("[GhibliKitchen] Tests failed:", e);
  }
}
```

---

## 📦 Beispiel-Header (nur Referenz – **je Datei separat einfügen**, nicht kombinieren)

```jsx
import React, { useEffect, useMemo, useState } from "react";
import { exportPDFById, exportHTMLById } from "../utils/exporters";
import { buildEmbedCss } from "../utils/embedCss";
import { UI } from "../i18n-ui";
import { pickText, pickList } from "../i18n-data";
```
