# Client logos

Put client logo files in this folder, then list them in `src/data/trust.ts`.
The homepage "Trusted by" strip auto-switches from names to logos.

## File guidance
- **Format:** SVG preferred (sharp at any size). PNG with transparent background is fine.
- **Colour:** white or light **monochrome** versions look best on the dark background
  (the strip dims them to ~60% and removes colour, brightening on hover).
- **Naming:** lowercase, hyphenated, e.g. `aya-home-spa.svg`, `we-aspire.svg`.
- **Size:** any height; the strip renders them at 36px tall, width auto.
- **Permission:** only use logos you have the client's permission to display.

## Wiring them up
Edit `src/data/trust.ts`:

```ts
logos: [
  { name: "AYA Home Spa", src: "/brand/clients/aya-home-spa.svg" },
  { name: "We Aspire",    src: "/brand/clients/we-aspire.svg" },
  { name: "Gilani Mobility", src: "/brand/clients/gilani-mobility.svg" },
],
```

`src` paths are relative to the site root (this `public/` folder is served at `/`).
Leave `logos` empty to keep showing client names instead. Then build + deploy.
