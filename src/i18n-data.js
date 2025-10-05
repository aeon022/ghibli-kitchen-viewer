// src/i18n-data.js
// @ts-nocheck

// Einzeltext: akzeptiert entweder String ODER { de, zh }.
// Fällt auf 'de' bzw. den Original-String zurück, wenn zh fehlt.
export const pickText = (v, lang = "de") =>
  v && typeof v === "object" && (v.de || v.zh)
    ? (v[lang] || v.de || "")
    : (v ?? "");

// Liste (z. B. Zutaten/Schritte): akzeptiert Array ODER { de:[], zh:[] }.
export const pickList = (v, lang = "de") =>
  v && typeof v === "object" && (Array.isArray(v.de) || Array.isArray(v.zh))
    ? (v[lang] || v.de || [])
    : (Array.isArray(v) ? v : []);