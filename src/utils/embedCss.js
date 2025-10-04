// src/utils/embedCss.js

export function buildEmbedCss({ pageBg = "#FAF7F1", text = "#111827" } = {}) {
  return `
@page { size: A4; margin: 10pt; }
* { box-sizing: border-box; }
body { color: ${text}; background: ${pageBg}; }
.page { page-break-after: always; background: ${pageBg}; }
.avoid-break { break-inside: avoid; }
.print\\:hidden { display: none !important; }
`;
}