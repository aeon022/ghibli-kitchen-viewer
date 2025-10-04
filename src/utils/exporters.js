// src/utils/exporters.js

// Externes Script nur einmal laden (für html2pdf.js)
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

// Warten, bis Webfonts geladen sind (wichtig für CJK)
export async function waitFonts() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
}

// PDF-Export über Element-ID (Pass 1 + Fallback-Strategie)
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

  // Pass 1
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

  let blob = null;
  try { blob = await fetch(blobUrl1).then((r) => r.blob()); } catch {}
  if (blob && blob.size > 50 * 1024) {
    return { ok: true, blobUrl: blobUrl1 };
  }

  // Fallback
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

// HTML-Export über Element-ID (Standalone HTML mit eingebettetem CSS)
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