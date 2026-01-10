// src/utils/exporters.js

// 1) Hilfen
export async function ensureScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  await new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Script load failed: " + src));
    document.head.appendChild(s);
  });
}

export async function waitFonts() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
}

function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "export.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function openInNewTab(url) {
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) console.warn("Popup blockiert – konnte PDF-Tab nicht öffnen.");
}

// 2) Druckbasierter Fallback ohne html2canvas
function printWindowFromElement(el, filename, extraCss = "") {
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(filename || "Export")}</title>
<style>
  @page { size: A4; margin: 12mm; }
  html, body { background: #fff; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .day-section, .meal-card { break-inside: avoid; page-break-inside: avoid; }
  img { max-width: 100%; height: auto; page-break-inside: avoid; }
  a[href]:after { content: ""; }
  ${extraCss || ""}
</style>
</head>
<body>
<div id="print-root">${el.outerHTML}</div>
<script>
  window.onload = function () {
    setTimeout(function(){ window.print(); window.close(); }, 300);
  };
<\/script>
</body>
</html>`;
  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) { window.print(); return; }
  w.document.open();
  w.document.write(html);
  w.document.close();
}

// 3) Signatur-Normalisierung
// Erlaubt beide Varianten:
//   exportPDFById(targetId, filename, orientation?, opts?)
//   exportPDFById(filename, targetId, orientation?, opts?)  (alte falsche Reihenfolge)
function normalizeArgs(a, b, c, d) {
  // Versuche zu erkennen, welche ist die ID.
  const aIsId = typeof a === "string" && !!document.getElementById(a);
  const bIsId = typeof b === "string" && !!document.getElementById(b);

  let targetId = aIsId ? a : bIsId ? b : a; // fallback auf a
  let filename = aIsId ? b : bIsId ? a : b;
  let orientation = (typeof c === "string" ? c : "portrait");
  let opts = (typeof c === "object" && !Array.isArray(c)) ? c : (d || {});

  if (!/\.pdf$/i.test(String(filename || ""))) {
    filename = (filename || "export") + ".pdf";
  }
  return { targetId, filename, orientation, opts };
}

// 4) PDF-Export (mit Auto-Download & robustem Fallback)
export async function exportPDFById(a, b, c, d) {
  const { targetId, filename, orientation, opts } = normalizeArgs(a, b, c, d);
  const {
    pageBg = "#FFFFFF",
    after = [".day-section"],   // sinnvoll für deinen Plan
    avoid = [".meal-card"],     // vermeidet zerschnittene Karten
    html2pdfCdn = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",
    open = false,               // stattdessen automatisch downloaden?
    download = true,            // ja: default herunterladen
    extraCssForFallback = "",   // wird in printWindow injiziert
  } = opts || {};

  await waitFonts();

  const el = document.getElementById(targetId);
  if (!el) {
    console.error("exportPDFById: element not found:", targetId);
    return { ok: false, blobUrl: "" };
  }

  try {
    await ensureScript(html2pdfCdn);
  } catch (err) {
    console.warn("html2pdf CDN konnte nicht geladen werden – Fallback auf Print.", err);
    printWindowFromElement(el, filename, extraCssForFallback);
    return { ok: true, blobUrl: "" };
  }

  if (!window.html2pdf) {
    console.warn("html2pdf nicht verfügbar – Fallback auf Print.");
    printWindowFromElement(el, filename, extraCssForFallback);
    return { ok: true, blobUrl: "" };
  }

  const common = {
    margin: [12, 12, 12, 12],
    filename,
    pagebreak: { mode: ["css", "legacy"], after, avoid },
    jsPDF: { unit: "pt", format: "a4", orientation },
  };

  // Pass 1
  const opt1 = {
    ...common,
    html2canvas: {
      scale: 3,
      useCORS: true,
      backgroundColor: pageBg,
      letterRendering: true,
      foreignObjectRendering: false,
    },
  };

  try {
    const blobUrl1 = await window.html2pdf().set(opt1).from(el).outputPdf("bloburl");
    // Qualität checken
    let ok = false;
    try {
      const blob = await fetch(blobUrl1).then(r => r.blob());
      ok = blob && blob.size > 50 * 1024;
    } catch {}

    const finalUrl = blobUrl1;
    if (download) triggerDownload(finalUrl, filename);
    else if (open) openInNewTab(finalUrl);
    return { ok: true, blobUrl: finalUrl };
  } catch (e1) {
    console.warn("Pass 1 fehlgeschlagen, versuche Fallback (foreignObjectRendering).", e1);
  }

  // Pass 2 (Fallback)
  const opt2 = {
    ...common,
    pagebreak: { mode: ["css"], after },
    html2canvas: {
      scale: 3,
      useCORS: true,
      backgroundColor: pageBg,
      letterRendering: false,
      foreignObjectRendering: true,
    },
  };

  try {
    const blobUrl2 = await window.html2pdf().set(opt2).from(el).outputPdf("bloburl");
    if (download) triggerDownload(blobUrl2, filename);
    else if (open) openInNewTab(blobUrl2);
    return { ok: true, blobUrl: blobUrl2 || "" };
  } catch (e2) {
    console.warn("html2pdf fehlgeschlagen – Fallback auf Print.", e2);
    printWindowFromElement(el, filename, extraCssForFallback);
    return { ok: true, blobUrl: "" };
  }
}

// 5) HTML-Export bleibt wie gehabt
export function exportHTMLById(targetId, filename, embedCss = "", pageBg = "#FFFFFF") {
  const node = document.getElementById(targetId);
  if (!node) return "";

  const html =
    "<!doctype html><html><head><meta charset=\"utf-8\"/>" +
    `<title>${escapeHtml(filename)}</title>` +
    `<style>${embedCss}</style></head>` +
    `<body style="background:${pageBg}">${node.innerHTML}</body></html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  return URL.createObjectURL(blob);
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, (m) =>
    m === "&" ? "&amp;" : m === "<" ? "&lt;" : m === ">" ? "&gt;" : m === '"' ? "&quot;" : "&#39;"
  );
}