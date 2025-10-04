// src/utils/exporters.js

// Lädt ein externes Script einmalig (für html2pdf.js)
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

// Wartet (falls verfügbar) auf geladene Webfonts – wichtig für CJK
export async function waitFonts() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
}

// PDF-Export per Element-ID (mit Pass 1 & Fallback-Strategie)
export async function exportPDFById(targetId, filename, orientation, opts = {}) {
  const {
    pageBg = "#FFFFFF",
    after = [".page"],
    avoid = [".avoid-break"],
    html2pdfCdn = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",
  } = opts;

  await waitFonts();
  await ensureScript(html2pdfCdn);

  const el = document.getElementById(targetId);
  if (!el || !window.html2pdf) return { ok: false, blobUrl: "" };

  const common = {
    margin: [12, 12, 12, 12],
    filename,
    pagebreak: { mode: ["css", "legacy"], after, avoid },
    jsPDF: { unit: "pt", format: "a4", orientation },
  };

  // Pass 1 – hohe Qualität, kein foreignObject
  const opt1 = {
    ...common,
    html2canvas: {
      scale: 3,
      useCORS: true,
      background: pageBg,
      letterRendering: true,
      foreignObjectRendering: false,
    },
  };

  const blobUrl1 = await window.html2pdf().set(opt1).from(el).outputPdf("bloburl");

  // Blob prüfen (Fallback, wenn zu klein)
  let blob = null;
  try { blob = await fetch(blobUrl1).then(r => r.blob()); } catch { /* noop */ }

  if (blob && blob.size > 50 * 1024) {
    return { ok: true, blobUrl: blobUrl1 };
  }

  // Pass 2 – Fallback: foreignObjectRendering an
  const opt2 = {
    ...common,
    pagebreak: { mode: ["css"], after },
    html2canvas: {
      scale: 3,
      useCORS: true,
      background: pageBg,
      letterRendering: false,
      foreignObjectRendering: true,
    },
  };

  const blobUrl2 = await window.html2pdf().set(opt2).from(el).outputPdf("bloburl");
  return { ok: true, blobUrl: blobUrl2 || blobUrl1 || "" };
}

// HTML-Export per Element-ID (Standalone HTML mit eingebettetem CSS)
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

// Kleiner Helfer für HTML-Titel
function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, (m) => (
    m === "&" ? "&amp;" :
    m === "<" ? "&lt;"  :
    m === ">" ? "&gt;"  :
    m === '"' ? "&quot;": "&#39;"
  ));
}