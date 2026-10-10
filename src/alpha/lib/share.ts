export async function shareText(text: string, url?: string, title = "Alpha"): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (e) {
      if ((e as Error).name === "AbortError") return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(url ? `${text}\n\n${url}` : text);
    return "copied";
  } catch { return "failed"; }
}

export function whatsappLink(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export async function shareImage(imageUrl: string, caption: string): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      // Try sharing the file if supported
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const fileName = imageUrl.split("/").pop() || "alpha.jpg";
      const file = new File([blob], fileName, { type: blob.type || "image/jpeg" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: caption, title: "Alpha" });
        return "shared";
      }
    } catch { /* ignore */ }
    try {
      await navigator.share({ text: caption, url: imageUrl, title: "Alpha" });
      return "shared";
    } catch (e) {
      if ((e as Error).name === "AbortError") return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(`${caption}\n\n${imageUrl}`);
    window.open(imageUrl, "_blank");
    return "copied";
  } catch { return "failed"; }
}

export async function downloadImage(url: string, filename = "alpha-image.jpg") {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  } catch {
    window.open(url, "_blank");
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
