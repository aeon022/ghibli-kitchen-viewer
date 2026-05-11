# Erweiterungs-Ideen für Moving Kitchen Tales

Dieses Dokument enthält die bestätigten Ideen zur Erweiterung des Projekts "Moving Kitchen Tales". Die Ideen bauen auf der bestehenden Architektur (React, TypeScript, Vite) auf und berücksichtigen die Gesundheits-Leitplanken.

## 1. Pinwände (Merklisten als Pinnwand-Bereich) ✅ IMPLEMENTIERT
- **Beschreibung**: Mehrere Merklisten als Pinnwand-Bereich implementieren. Listen können benannt werden (z.B. "Lieblingsrezepte", "Gesunde Snacks").
- **Herausforderung**: Wie umsetzen ohne Benutzerverwaltung? Verwende localStorage für lokale Speicherung der Listen und Pins. Jede Liste ist eine Sammlung von Rezept-IDs oder Plan-Referenzen.
- **Umsetzung**: Erweitere useBookmarks.ts um Listen-Unterstützung; füge UI-Komponenten für Pinnwand-Ansicht hinzu (z.B. in PlanBrowser.tsx).
- **Nutzen**: Benutzer können Rezepte/Pläne gruppieren und schnell zugreifen, ohne Account.

## 2. Einkaufslisten-Integration
- **Beschreibung**: Synchronisiere generierte Einkaufslisten mit externen Apps wie Apple Erinnerungen, Google Tasks, Todoist oder anderen Einkaufs-Apps.
- **Umsetzung**: Integriere APIs (z.B. Google Tasks API, Apple Reminders via iCloud); erweitere exporters.js um neue Export-Formate und Sync-Optionen.
- **Nutzen**: Vereinfacht den Einkauf und reduziert manuelle Übertragungen.

## 3. Rezept-Suche und Filter
- **Beschreibung**: Suche nach Rezepten/Zutaten (z.B. "salzarm", "vegetarisch") und Filter für Ernährungspräferenzen (Diabetes, Gastritis, Schwangerschaft).
- **Umsetzung**: Baue eine Suchleiste in PlanBrowser.tsx auf; indexiere Rezepte aus allen Plänen (nutze vorhandene Datenstruktur); füge Filter-Buttons hinzu.
- **Nutzen**: Schneller Zugriff auf passende Rezepte, besonders für spezielle Diäten.

## 4. Community- und Sharing-Funktionen
- **Beschreibung**: Teilen von Plänen (z.B. via Links oder Social Media); Bewertungen und Kommentare für Rezepte.
- **Umsetzung**: Integriere eine Backend-API (z.B. Firebase für einfache User-Accounts und Sharing); füge Kommentar-Felder und Share-Buttons hinzu.
- **Nutzen**: Community-Building, Inspiration für neue Rezepte und Feedback.

## 5. Mobile-Optimierung und PWA
- **Beschreibung**: Mache die App als Progressive Web App (PWA) installierbar; optimiere für Mobile (Touch-Gesten für Navigation, responsive Design).
- **Umsetzung**: Aktualisiere vite.config.ts für PWA-Support (Service Worker, Manifest); passe UI für kleine Bildschirme an (z.B. in App.tsx und styles/).
- **Nutzen**: Bessere Zugänglichkeit unterwegs, z.B. beim Einkaufen oder Kochen.

## Nächste Schritte
- Priorisiere Implementierung: Starte mit Pinwände (lokal), dann Suche/Filter, PWA, Integrationen und Community.
- Branch: Erstelle eine neue Git-Branch für diese Erweiterungen.
- Validierung: Teste gegen Gesundheits-Leitplanken und bestehende Funktionen.