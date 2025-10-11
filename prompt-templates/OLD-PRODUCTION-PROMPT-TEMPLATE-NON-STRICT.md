Anweisung (ab Woche {{WEEK_NR}}) – **Woche-3-Design (STRIKT, Stand Woche-4)**

Erzeuge ausschließlich eine React-Quelldatei als .jsx mit dem exakten Dateinamen:
Woche-{{WEEK_NR}}-{{START_DATE}}.jsx

Kein Begleittext, keine Erklärung. Wenn dein Interface Codefences nutzt, dann genau eine Codefence mit ```jsx und erster Zeile:
 // Datei: Woche-{{WEEK_NR}}-{{START_DATE}}.jsx


Ziel & UI-Layout (fix, Woche-3-Style)
- Tabs: „Kochbuch“ (A4 quer) und „Einkaufsliste“ (A4 hoch).
- TopBar-Buttons (nur drei): „PDF erzeugen“, „HTML exportieren“, „Drucken“.
- **Nach Export:** Unter dem jeweils aktiven Tab **einen** Download-Link für die soeben erzeugte Datei anzeigen (PDF/HTML). Keine separate, seitenweite Linkliste.
- Jede Rezeptseite ist **eine** Seite (1 Rezept = 1 Seite), linkes Panel ≤1/3 (span 4), Rezept rechts ≥2/3 (span 8).
- **Cover-Seite:** Zweispaltig mit Flex: links Info/Upload (cardPanelStyle), rechts **Wochenübersicht** (cardMainStyle). Die Wochenübersicht ist **Pflicht**.
- **Wochenübersicht:** 7 Blöcke (Mo–So), je Block 3 Kacheln (Frühstück/Mittag/Abend); je Kachel Titel, „🌾 KH …“ (aus `target`), bei Frühstück/Abend „💊“.
- DALL·E-Prompts **nicht rendern** (nur als Strings im Code vorhanden).
- Bilder-Uploads (Cover + je Rezept) via FileReader, persistiert in localStorage (`${FILE_BASE}::img::cover`, `${FILE_BASE}::img::recipe::${id}`).
- **Wochentag-Überschrift:** pro Rezept **oberhalb des Rezepttitels im rechten Hauptteil** (nicht als eigener H-Tag), kleine Zeile.
- **Kurz-Story (neutral):** Direkt **unter** dem Rezepttitel im rechten Hauptteil, sachlich (Region/Anlass/Saison, z. B. „kommt aus …, beliebt im …“), **Schriftgröße: 12**. Kein übertriebener „Ghibli“-Stil.
- Mittags **kein** Metformin-Reminder; Frühstück/Abend **mit** Reminder-Box.


Fixe Metadaten & Dateibasis
export const meta = { title: "Woche {{WEEK_NR}}", startDate: "{{START_DATE}}", id: "woche-{{WEEK_NR}}-{{START_DATE}}" }
const FILE_BASE = "Woche {{WEEK_NR}} {{START_DATE}}";
// UI-Titel:
//   „GhibliKitchen – Woche {{WEEK_NR}}“
//   „GhibliKitchen – Einkaufsliste – Woche {{WEEK_NR}}“


Farb- & Stilvorgaben (Woche-3-Style)
- Nur HEX/RGBA, keine oklab/oklch/lab/color-mix.
const COLORS = {
  pageBg:"#FAF7F1", text:"#111827", border:"rgba(0,0,0,.10)",
  panelBG70:"rgba(255,255,255,.70)", panelBG80:"rgba(255,255,255,.80)",
  white:"#FFFFFF", emerald:"#059669", amber:"#f59e0b",
  sky:"#0284c7", neutral:"#404040", indigo:"#4f46e5", btnShadow:"0 6px 20px rgba(0,0,0,.12)"
};
- Card-Styles: `cardPanelStyle` (links) und `cardMainStyle` (rechts) mit `borderRadius:18`, **Padding 20/22** (Panel/Main), `boxShadow: COLORS.btnShadow`, 1 px Border.
- Grid/Container:
  - Cover-Seite: `display:flex`, Gap 16; links `cardPanelStyle` (flex:1), rechts `cardMainStyle` (flex:2) mit Wochenübersicht.
  - Rezeptseiten: 12-Spalten-Grid; Panel span 4; Rezept span 8; Gap 16; Seiten-Padding **24 pt**.
- Klassen/CSS: `.page` (jede Druckseite, `page-break-after: always`), `.avoid-break` (break-inside: avoid), `.print:hidden` (Buttons/Uploads verbergen).
- Schrift: System UI (wie in Woche-3).
- **Typografie im Rezept-Hauptteil:**
  - Wochentag-Zeile (oberhalb Titel): `fontSize: 12`, Akzentfarbe `COLORS.sky`, `fontWeight: 700`, kleiner Abstand.
  - Kurz-Story: `fontSize: 12`, `color: COLORS.neutral`.


PDF/HTML-Export (Woche-3-Konfiguration, Woche-4-Stand)
- Lade `html2pdf.js@0.10.1` via CDN (ensureScript).
- **Export-API (Pflichtsignaturen):**
  - `exportPDF(targetId, filename, orientation)`:
    - Pass 1: `html2canvas: { scale:3, useCORS:true, background:'#FAF7F1', letterRendering:true, foreignObjectRendering:false }`
    - `jsPDF: { unit:'pt', format:'a4', orientation }`
    - `pagebreak: { mode:['css','legacy'], after:['.page'], avoid:['.avoid-break'] }`
    - Prüfe Blobgröße (> 50 KB). **Fallback** (wenn kleiner): `foreignObjectRendering:true`, `letterRendering:false`, `pagebreak:{ mode:['css'], after:['.page'] }`.
    - Rückgabe bevorzugt als **Blob-URL**; die UI zeigt unter dem aktiven Tab einen Download-Link an.
  - `exportHTML(targetId, filename)`:
    - Erzeuge eigenständige `.html` mit eingebettetem CSS (gleiche Farben/Seitenregeln) via Blob + **Download-Link unter dem aktiven Tab**.
- Orientierung: Kochbuch `landscape`, Einkaufsliste `portrait`.


Gesundheits- & Küchenregeln (aktualisiert)
- Diabetes (frühes Stadium; Metformin 2× täglich (früh und abend)): pro Mahlzeit (2 Pers.) **60–90 g KH gesamt** (≈30–45 g p. P.), ballaststoffbetont; **Protein 20–40 g p. P.** Metformin: reine Erinnerung „mit der Mahlzeit“ (kein Med-Rat).
- Schwangerschaft: **nichts Rohes**; alles **durchgaren** (Eier vollständig gestockt); quecksilberarme Fische (Lachs/Kabeljau/Seelachs/Wolfsbarsch); Hygiene; **Sojasauce natriumarm**; **Jod (Wakame/Kombu) sparsam**.
- Gastritis:
  - Nur bei explizit „gastritis-konform“ → **streng** (Schärfe/zu sauer/fettig meiden, schonend garen, wenig Öl, warm).
  - Standard (**balanced**), wenn NICHT angefordert: mild würzen, nicht zu scharf; vorsichtiges Wok/Anbraten/Grillen mit wenig Öl erlaubt; milde Säure moderat; Zwiebel/Knoblauch maßvoll & gut gegart; Chili optional separat.
  - **Non-Strict Checks:** „Gastritis“ wird **ohne „✓“** angegeben (nur erläuternder Text, z. B. „Gastritis – mild …“).
- Küchenmix: CN/JP/KR dominant (mind. 6/7 Tage), max. 1 leichtes IT-Gericht.
- Titel: Deutsch + Originalname + Schriftzeichen.


Datenstruktur (Woche-3-Format – STRIKT)
- Exakt **7 Tage × 3 Meals = 21** Rezepte, IDs: `mo|di|mi|do|fr|sa|so` + `-f|-m|-a`.
- **Zutaten-Format:** **Array von Strings** (keine Objekte). Jedes Element: „**Name Menge Einheit**“ (genau diese Reihenfolge).
  - Erlaubte Einheiten: `g`, `ml`, `EL`, `TL`, `Stück`. Liter werden zu `ml` normalisiert (z. B. `1 l` → `1000 ml`).
  - Beispiele: `Reis (roh) 90 g`, `Wasser 800 ml`, `Eier 2 Stück`.
- Objekt je Rezept:
{
  id,                    // z. B. "mo-f"
  title,                 // Deutsch + Originalname + Schriftzeichen
  desc,                  // Kurzbeschreibung mit Ursprung + „inspiriert von …“
  target,                // z. B. "≈75 g KH gesamt (2 P.) · Protein ≈30 g p. P."
  ingredients: [ "Name Menge Einheit", … ],   // ≥5 Einträge, siehe oben
  steps: [ … ],          // ≥3 schonende Schritte
  checks,                // „Gastritis … · Diabetes ✓/⚠︎ – ≈XX g KH · Schwangerschaft ✓/⚠︎ …“
  swaps,                 // **Austausche & Alternativen** (ein gemeinsamer String; Trenner „; “)
  side,                  // milde Beilage/Drink
  remind,                // Frühstück/Abend true, Mittag false
  prompt                 // buildPrompt(PROMPT_HEADER, "…")
}
- PROMPT_HEADER String-Konstante; je Rezept: `prompt: buildPrompt(PROMPT_HEADER, "...")`.
- Helper: `dayLabel(id)` → {Montag..Sonntag}, `mealTitle(id)` → {Morgen/Mittag/Abend}, `mealLabel(id)` → {**Frühstück/Mittag/Abendessen**}.


Einkaufsliste (Woche-3-Parser, **aus Zutaten-Strings**)
- LIST_SUMMARY **muss aus den Zutaten-Strings geparst** werden (kein Lesen von Objektfeldern).
- Gruppierung exakt:
  „Protein/Fisch/Tofu“
  „Gemüse/Pilze“
  „Reis/Nudeln/Sättigung“
  „Algen/Brühen/Würze“
- Parsing-Regeln:
  - Regex für Einträge: `^(.*)\s(\d+(?:[.,]\d+)?)\s*(g|ml|EL|TL|Stück)$`
  - `l` → in `ml` konvertieren.
  - Namen vereinheitlichen/trimmen; Roh-/gekocht-Hinweise dürfen entfernt werden.
- Mengen arithmetisch aufsummieren; Ergebnis pro Gruppe **alphabetisch sortiert** als Strings „Name Menge Einheit“.


Bild-Handling (Persistenz-Schlüssel)
- Cover: `${FILE_BASE}::img::cover`
- Rezept: `${FILE_BASE}::img::recipe::${id}`
- Uploads via FileReader; DataURLs in localStorage speichern; Bilder in linken Panels anzeigen (Cover auch sichtbar).


Komponenten-Struktur (Woche-3-Style – Pflicht)
- `Cookbook`: Cover + **Wochenübersicht** + alle Rezeptseiten (je Rezept eine `RecipeCard`).
- `RecipeCard({ r })`: linkes Panel (Upload/Infos/Reminder) + rechtes Rezept (Wochentag-Zeile, Titel, Kurz-Story, Zutaten/Schritte/**Austausche & Alternativen**).
- `GroceryList`: eine Seite mit LIST_SUMMARY (2-Spalten-Grid).
- Hauptkomponente: Tab-Switch („Kochbuch“ / „Einkaufsliste“) und **drei** Buttons (PDF/HTML/Drucken).
- **Nach Export**: Download-Link unter dem aktuell sichtbaren Tab einblenden.


Tests (Pflicht, am Ende mounten)
- 7 Tage, 21 Meals, eindeutige IDs.
- Helper: `dayLabel(id)`, `mealTitle(id)`, `mealLabel(id)` → **`mealLabel("xx-m")==="Mittag"`**.
- Metformin-Logik: Frühstück/Abend `remind:true`, Mittag `remind:false`.
- Jedes Rezept ≥5 Zutaten (String-Format) + ≥3 Steps.
- Keine verbotenen CSS-Funktionen (oklab/oklch/lab/color-mix) in Strings.
- FILE_BASE Regex: `^Woche {{WEEK_NR}} \d{4}-\d{2}-\d{2}$`.
- `buildPrompt("A","B") === "A\nB"`.
- LIST_SUMMARY besitzt **genau 4 Gruppen**.
- Konsolen-Log: `"[GhibliKitchen] All tests passed (JSX)."`


Parameter
- WEEK_NR: Nummer der Woche (ab 4).
- START_DATE: ISO (YYYY-MM-DD), TZ Europe/Vienna.


Ergebnis
- Nur die .jsx ausgeben (gemäß obiger Struktur im **Woche-3-Design**, Stand Woche-4).