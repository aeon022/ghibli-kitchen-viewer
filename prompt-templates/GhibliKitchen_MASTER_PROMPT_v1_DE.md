# GhibliKitchen — MASTER‑PROMPT v1 (DE)

> Zweck: Diese Vorlage erzeugt **jede Woche zwei Dateien** (DE & ZH) nach der **Woche‑5‑2025‑10‑27.* Referenzstruktur**, inkl. 21 neuer, diabetiker‑ & schwangerschaftsgeeigneter CN/JP/KR‑Rezepte und automatisch berechneter Einkaufsliste.
>
> Speicherort: Lege diese Prompt‑Datei unter **/wissen/** ab oder exportiere sie als PDF.

---

## Eingabevariablen
- `{{WEEK_NR}}` → z. B. `7`
- `{{START_DATE}}` → ISO‑Datum `YYYY‑MM‑DD`, z. B. `2025‑11‑10`
- `{{DE_FILE}}` → `Woche-{{WEEK_NR}}-{{START_DATE}}.de.jsx`
- `{{ZH_FILE}}` → `Woche-{{WEEK_NR}}-{{START_DATE}}.zh.jsx`

---

## HARTE REGELN (bitte strikt befolgen)
1) **Zwei getrennte Dateien erzeugen**: exakt `{{DE_FILE}}` und `{{ZH_FILE}}` im selben Stil & Funktionsumfang wie **Woche‑5‑2025‑10‑27.de.jsx** und **Woche‑5‑2025‑10‑27.zh.jsx** (1:1‑Layout, UI, Logik, Tests, Export‑Buttons).
2) **21 Gerichte**: 7 Tage × Frühstück (f), Mittag (m), Abend (a). IDs: `mo|di|mi|do|fr|sa|so- f|m|a`.
3) **Gesundheit (streng)**
   - Diabetes (frühes Stadium): je Mahlzeit **60–90 g KH gesamt (2 P.)**; **Protein 20–40 g p. P.**; ballaststoffbetont.
   - Schwangerschaft: **nichts Rohes**, **Eier vollständig gestockt**, **Fisch quecksilberarm & durchgegart**; **Sojasauce natriumarm**; **Algen/Jod sparsam**.
   - Gastritis (balanced, sofern nicht explizit „gastritis‑konform“): mild würzen, wenig Fett; milde Säure; Chili optional separat.
4) **Küchenfokus**: Chinesisch/Japanisch/Koreanisch (max. **1** x andere Küche/Woche, optional).
5) **Titelkonvention** je Rezept: **Deutsch + Originalname + Schriftzeichen** (z. B. `Miso‑Suppe (味噌汁)`).
6) **Story** MUSS Herkunft + Mini‑Geschichte enthalten **und** die Zeile: `Inspiration: inspiriert von <Quelle>` (nur Inspiration; nie kopieren). Erlaubte Quellen als Inspiration: Just One Cookbook, MAFF JP, Japan Centre, My Korean Kitchen, Seon Kyoung Longest, Mom's Korean Recipes, Made With Lau, The Woks of Life, Omnivore’s Cookbook, Red House Spice, Lee Kum Kee (UK), The Hong Kong Cookery, China Sichuan Food.
7) **Garmethoden** priorisieren: Dämpfen, Sieden, Schmoren, sanftes Dünsten; **Wok/Anbraten moderat** erlaubt.
8) **Reminders**: Frühstück & Abendessen **`remind: true`** (💊 „Metformin mit der Mahlzeit einnehmen“). **Mittag `remind: false`**.
9) **Bild‑Prompt**: Nutze `PROMPT_HEADER` **unverändert** und setze pro Rezept `prompt: buildPrompt(PROMPT_HEADER, "englische Bildbeschreibung …")`.
10) **Tests müssen bestehen**: 21 Objekte, IDs eindeutig, Zutaten ≥5, Steps ≥3, Reminder‑Logik korrekt, Einkaufsliste‑Gruppen vorhanden.

---

## Objekt‑Schema (verbindlich, pro Rezept)
```js
{
  id: "mo|di|mi|do|fr|sa|so- f|m|a",
  title: "Deutsch + Originalname + Schriftzeichen",
  desc: "1 Zeile, mild & salzarm",
  story: "2–3 Sätze (Herkunft + kleine Geschichte). Inspiration: inspiriert von <Quelle>",
  target: "≈XX g KH gesamt (2 P.) · Protein ≈YY g p. P.",
  ingredients: [
    "ZutatA 120 g",
    "ZutatB 200 ml",
    "… (insg. ≥5 Einträge; Einheiten: g/ml/EL/TL/Stück)"
  ],
  steps: [
    "Schritt 1 (mit Zeiten in Minuten, schonend)",
    "Schritt 2",
    "Schritt 3"
  ],
  checks: "Gastritis – mild/⚠︎ … · Diabetes ✓/⚠︎ – ≈XX g KH · Schwangerschaft ✓/⚠︎ …",
  swaps: "Sinnvolle Austausche (z. B. Soba ↔ Udon; Reis ↔ Vollkorn)",
  side: "Beilage/Drink/Tee, z. B. Gurken‑Pickles (ohne Chili)",
  remind: true | false,
  prompt: buildPrompt(PROMPT_HEADER, "Short English photo description…"),
}
```

**Hinweise zur Nähr‑Angabe**
- `target` MUSS die KH gesamt (2 P.) nennen (60–90 g) und, wenn sinnvoll, Protein ≈XX g p. P.
- Realistische Schätzungen; Reis/ Nudeln/ Kartoffeln/ Süßkartoffel sorgfältig kalkulieren.

---

## Ausgabestruktur (Dateien)
- Erzeuge **zwei Dateien** parallel:
  - `src/plans/{{DE_FILE}}` (export default React‑Komponente, `meta.lang = "de"`)
  - `src/plans/{{ZH_FILE}}` (export default React‑Komponente, `meta.lang = "zh"`)
- **Struktur, UI, Tests, Style** exakt wie die Referenz **Woche‑5‑2025‑10‑27.*** (1:1 — nur `meta`, `FILE_BASE`, `UI_TITLES`, `DATA`).
- **DATA** in beiden Dateien **identisch** (gleiche 21 Rezepte). Nur Übersetzungen, falls im i18n‑System genutzt.

---

## Bild‑Prompt‑Header (fix)
```js
const PROMPT_HEADER = "Ultra-clean cookbook photo, soft daylight, top-down, pastel background, visible steam, pregnancy-safe (no raw fish or raw egg), mild Asian home cooking (JP/CN/KR), family-friendly";
const buildPrompt = (a, b) => `${a}\n${b}`;
```

---

## Qualitäts‑Checkliste pro Rezept
- [ ] ≥5 Zutaten mit **Mengen** (g/ml/EL/TL/Stück)
- [ ] ≥3 Schritte, **Zeiten in Minuten** angeben, schonende Methoden
- [ ] `checks` enthält **Gastritis/Diabetes/Schwangerschaft** in einer Zeile
- [ ] **mild, salzarm**, keine rohe Zutaten; Ei/Fisch vollständig gegart; **Algen/Jod sparsam**
- [ ] **Reminder‑Logik** korrekt (Frühstück/Abend = true; Mittag = false)
- [ ] **Story** enthält **Inspiration: inspiriert von …**

---

## Gesprächs‑Aufhänger (für Autopilot‑Workflow)
**Einmalig sagen & als Verlauf speichern:**
> *„GhibliKitchen, ab jetzt bist du mein Wochenplan‑Generator. Verwende immer diese MASTER‑PROMPT‑Vorgaben. Nimm die zuletzt erstellte Woche als Stil‑Referenz (Woche‑5‑2025‑10‑27.*). Erzeuge jede Woche **zwei Dateien** (`.de.jsx` & `.zh.jsx`) mit **21 neuen** CN/JP/KR‑Gerichten, strikte Health‑Leitplanken, **Inspiration‑Zeile** in jeder Story, Bild‑Prompts gemäß `PROMPT_HEADER`. Woche und Datum inkrementieren: `WEEK_NR = letzte + 1`, `START_DATE = letzter START_DATE + 7 Tage`. Speichere als `Woche-{{WEEK_NR}}-{{START_DATE}}.*` und sorge dafür, dass die eingebauten Tests bestehen. Danach gib mir einen kurzen OK‑Report (Anzahl Rezepte, KH‑Spanne, Reminder‑Check).“*

**Wöchentlich starten:**
> *„Starte **Woche {{WEEK_NR}}** ab **{{START_DATE}}**. Erzeuge beide Dateien jetzt.“*

**Nächste Woche fortsetzen:**
> *„Weiter mit der **nächsten Woche** (Woche +1, Start +7 Tage) – gleiche Regeln, neue Rezepte.“*

---

## Nach dem Erzeugen
1) **Build/Tests prüfen** (Konsole): Ausgabe „All tests passed“ in beiden Dateien.
2) Optional: **PDF/HTML** über die UI‑Buttons exportieren (Kochbuch & Einkaufsliste).
3) Commit & Push.

---

## Kurzbeispiel (1 Objekt, Platzhalter‑Stil)
```js
{
  id: "mo-f",
  title: "Gedämpfter Lachs‑Reis (鮭の蒸しご飯)",
  desc: "Mild gedämpfter Reis mit Lachs & Pak Choi, salzarm.",
  story: "Nordjapanisch inspiriert; warm und sanft im Geschmack. Inspiration: inspiriert von Just One Cookbook",
  target: "≈68 g KH gesamt (2 P.) · Protein ≈26 g p. P.",
  ingredients: ["Reis (roh) 80 g", "Lachs 240 g", "Pak Choi 200 g", "Wasser 300 ml", "Sojasauce natriumarm 10 ml"],
  steps: ["Reis dämpfen (20 Min.)", "Lachs & Pak Choi auflegen (6–8 Min.)", "Mild würzen, servieren"],
  checks: "Gastritis – mild · Diabetes ✓ – ≈68 g KH · Schwangerschaft ✓ Lachs vollständig gegart, quecksilberarm",
  swaps: "Lachs ↔ Kabeljau; Reis ↔ Vollkornreis",
  side: "Gurken‑Pickles (ohne Chili)",
  remind: true,
  prompt: buildPrompt(PROMPT_HEADER, "Steamed salmon over rice with bok choy, top‑down"),
}
```

---

## Lizenz / Hinweise
- Quellenangaben sind **nur Inspiration**, keine Übernahme von Texten.
- Umlaute (ä/ö/ü/ß) und CJK‑Zeichen korrekt setzen.
- Bei „gastritis‑konform“ im Prompt: automatisch in **strengen Gastritis‑Modus** wechseln (kein Chili, kaum Säure, sehr wenig Fett, alles warm & weich).
