// src/i18n/LanguageSwitcher.tsx
import React, { useEffect, useState } from "react";

const KEY = "ghk.lang";
const OPTIONS = [
  { code: "de", label: "DE" },
  { code: "zh", label: "中文" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const [val, setVal] = useState<string>(() => {
    const sp = new URLSearchParams(window.location.search);
    const q = (sp.get("lang") || "").slice(0,2).toLowerCase();
    if (q) return q;
    const s = (localStorage.getItem(KEY) || "").slice(0,2).toLowerCase();
    if (s) return s;
    const html = (document.documentElement.getAttribute("lang") || "").slice(0,2).toLowerCase();
    return html || "de"; // <-- niemals zh als Default
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, val); } catch {}
    window.dispatchEvent?.(new Event("ghk:lang-change"));
  }, [val]);

  return (
    <select value={val} onChange={(e) => setVal(e.target.value)}>
      {OPTIONS.map(o => <option key={o.code} value={o.code}>{o.label}</option>)}
    </select>
  );
}