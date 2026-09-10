# Portfolio originals

Sources for `npm run images`, which writes the optimized WebP into
`public/work/<category>/` and regenerates `src/data/workItems.ts`.

These are tracked so the pipeline is reproducible. Previously this directory
was gitignored, which meant only one machine could ever run the script — and a
clone that tried would delete the portfolio, because the script cleans each
output directory and rewrites the manifest from whatever sources it finds.

## Naming

```
work-raw/<category>/NN-slug.ext      e.g. 03-aya-home-spa.png
```

`NN` matters: files are processed in sort order, and that order sets the output
numbering (`web-03.webp`, `graphic-10.webp`). Renumbering an existing file
renames its output and changes its URL.

Categories are `web` and `graphic`. Accepted extensions: `.jpg`, `.jpeg`,
`.png`, `.webp`.

## Titles and links

By default an item is titled `<Label> <n>` — "Graphic Design 9". To give it a
real title, or a "Live site" link, add the raw filename stem to `META` in
`scripts/optimize-images.mjs`:

```js
"03-aya-home-spa": { title: "AYA Home Spa — Dubai", href: "https://www.ayahomespa.ae/" },
```

## Running

```bash
npm run images
```

The script refuses to run if a category has no source directory, or if there
are fewer sources than the manifest already holds — that combination means the
run would delete work. Pass `--force` only when deliberately shrinking the set.

## Adding one project without the full set

`npm run images` is all-or-nothing: it cleans every output directory and
rewrites the manifest from whatever it finds, so it only runs on a machine
holding every original. To ship a single new project instead:

```bash
node scripts/optimize-images.mjs --add path/to/shot.png --category web
```

That copies the source in here, encodes it at the next free index, and appends
one entry. Nothing else is touched, so it is safe from a partial clone. Add the
title and live link to `META` first, keyed by the filename stem, or the item
falls back to "Web Design 20".

## Capturing a whole-site screenshot

The gallery is built for full-page captures, not just the first screen: the
grid is masonry so a tall image keeps its shape, and the viewer scrolls
anything past a 2.2 ratio rather than shrinking it. In Chrome, `F12` then
`Ctrl+Shift+P` and "Capture full size screenshot". Two things to watch:

- Sites with scroll-reveal animations (Framer, most page builders) capture
  blank sections that were never scrolled into view. Set **Rendering ->
  Emulate prefers-reduced-motion: reduce** first.
- WebP cannot exceed 16,383px on either axis. The pipeline narrows anything
  taller so it still encodes, but a page that long is worth splitting.

## Missing originals

Only `graphic/10-saladmaster-al-mumtaz.jpeg` is present. The originals behind
the other 28 committed items predate this directory being tracked and still
live on the machine that produced them; drop them in here to complete the set.
Do not reconstruct them from the WebP in `public/work/` — re-encoding a lossy
file would bake the loss in permanently and replace the good outputs.
