export function buildEmbedCss({ pageBg = "#FAF7F1", text = "#111827" } = {}) {
  return `
  @page { size: A4; margin: 10pt; }
  * { box-sizing: border-box; }
  body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial; color:${text}; }
  .page { page-break-after: always; background: ${pageBg}; }
  .avoid-break { break-inside: avoid; }
  .print\\:hidden { display: none !important; }
  `;
}