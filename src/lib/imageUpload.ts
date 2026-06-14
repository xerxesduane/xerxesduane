// Client-only helper: read an image File, downscale it to fit `max` px on the
// long edge, and return a compressed JPEG data URL. Keeps vision-demo uploads
// small (fast + within the server's payload cap) and never touches the network.
// Browser APIs are used only inside the function body, so importing this module
// is SSR-safe.
export async function fileToDownscaledDataUrl(
  file: File,
  max = 1100,
  quality = 0.8,
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("That doesn't look like an image file.");
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Couldn't read that image."));
      el.src = url;
    });
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas isn't available in this browser.");
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}
