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

## Waiting on a screenshot

`web/20-construction-desert-schools.png` is the one item whose metadata is
already in `META` but whose image has never been captured. Drop a full-width
homepage screenshot in (1600px wide is plenty) and `npm run images` will pick
it up with the title and live link already attached.

## Missing originals

Only `graphic/10-saladmaster-al-mumtaz.jpeg` is present. The originals behind
the other 28 committed items predate this directory being tracked and still
live on the machine that produced them; drop them in here to complete the set.
Do not reconstruct them from the WebP in `public/work/` — re-encoding a lossy
file would bake the loss in permanently and replace the good outputs.
