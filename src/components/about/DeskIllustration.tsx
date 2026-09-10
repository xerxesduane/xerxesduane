/**
 * Flat-vector desk scene for the About page.
 *
 * Drawn here rather than shipped as an image for three reasons: it re-tints
 * with the theme (a navy monitor would disappear on the dark canvas), it
 * stays crisp at any size, and it costs a few kB of markup instead of an
 * asset request.
 *
 * The palette lives in CSS custom properties declared on the `<svg>` itself,
 * with the dark set applied through the project's `dark:` variant
 * (`[data-theme="dark"]`), so the whole scene is one self-contained file with
 * no globals to keep in sync.
 *
 * Purely decorative — the surrounding card carries the meaning — so it is
 * `aria-hidden` and contributes nothing to the accessibility tree.
 */
export default function DeskIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 420"
      role="presentation"
      aria-hidden
      className={`w-full [--il-accent-2:251_146_60] [--il-accent:234_88_12] [--il-cup-2:199_168_128] [--il-cup:250_248_243] [--il-desk-2:222_214_200] [--il-desk:236_230_218] [--il-hair:28_32_54] [--il-ink-2:17_28_48] [--il-ink:26_40_65] [--il-screen:10_18_34] [--il-shirt-2:62_104_145] [--il-shirt:78_124_168] [--il-skin-2:233_192_163] [--il-skin:248_214_188] dark:[--il-accent-2:253_186_116] dark:[--il-accent:240_100_20] dark:[--il-cup-2:176_148_112] dark:[--il-cup:226_230_238] dark:[--il-desk-2:24_36_60] dark:[--il-desk:40_56_86] dark:[--il-hair:20_24_42] dark:[--il-ink-2:30_44_70] dark:[--il-ink:48_68_102] dark:[--il-screen:14_24_44] dark:[--il-shirt-2:64_104_144] dark:[--il-shirt:88_132_174] dark:[--il-skin-2:224_182_152] dark:[--il-skin:242_206_178] ${className}`}
      style={
        {
          // Named here so the paths below read as colours, not variables.
          "--ink": "rgb(var(--il-ink))",
          "--ink2": "rgb(var(--il-ink-2))",
          "--screen": "rgb(var(--il-screen))",
          "--skin": "rgb(var(--il-skin))",
          "--skin2": "rgb(var(--il-skin-2))",
          "--hair": "rgb(var(--il-hair))",
          "--shirt": "rgb(var(--il-shirt))",
          "--shirt2": "rgb(var(--il-shirt-2))",
          "--cup": "rgb(var(--il-cup))",
          "--cup2": "rgb(var(--il-cup-2))",
          "--desk": "rgb(var(--il-desk))",
          "--desk2": "rgb(var(--il-desk-2))",
          "--accent": "rgb(var(--il-accent))",
          "--accent2": "rgb(var(--il-accent-2))",
        } as React.CSSProperties
      }
    >
      {/* ---------------------------------------------------------------
        * Built around one horizontal desk edge at y=368. Every object bottoms
        * out on that line, which is what stops the scene reading as a pile of
        * floating shapes. Back to front: chair, person, desk, the things on
        * it, then the arms reaching over.
        * ------------------------------------------------------------- */}

      {/* ---- chair, wide enough to show either side of the shoulders ---- */}
      <path d="M256 368V266a30 30 0 0 1 30-30h148a30 30 0 0 1 30 30v102Z" fill="var(--ink2)" />
      <path d="M270 368V276a20 20 0 0 1 20-20h140a20 20 0 0 1 20 20v92Z" fill="var(--ink)" />

      {/* ---- person ---- */}
      <g>
        {/* torso — square shoulders, so the sleeves have somewhere to sit */}
        <path d="M272 368c0-100 24-150 64-160h48c40 10 64 60 64 160Z" fill="var(--shirt)" />
        {/* the far side, turned away from the screen */}
        <path d="M392 212c34 14 56 66 56 156h-22c0-84-14-134-44-150Z" fill="var(--shirt2)" opacity="0.55" />
        {/* collar */}
        <path d="M336 210l24 34 24-34 14 8-38 46-38-46Z" fill="var(--shirt2)" />
        {/* neck */}
        <path d="M338 164h44v48a22 22 0 0 1-44 0Z" fill="var(--skin2)" />

        {/* head: hair mass first, face ellipse over it — the overlap is the
            haircut, which is steadier than hand-tuning a fringe curve */}
        <ellipse cx="360" cy="112" rx="47" ry="52" fill="var(--hair)" />
        <ellipse cx="362" cy="126" rx="42" ry="46" fill="var(--skin)" />
        <path
          d="M320 104a43 43 0 0 1 84-8c-8 15-27 23-49 21-15-2-28-6-35-13Z"
          fill="var(--hair)"
        />
        <ellipse cx="320" cy="132" rx="8" ry="11" fill="var(--skin2)" />

        {/* glasses */}
        <g fill="none" stroke="var(--hair)" strokeWidth="3.6">
          <circle cx="341" cy="130" r="15" />
          <circle cx="387" cy="130" r="15" />
          <path d="M356 128h16" strokeLinecap="round" />
          <path d="M326 126l-6 3" strokeLinecap="round" />
        </g>
        <ellipse cx="343" cy="131" rx="3.6" ry="4.4" fill="var(--hair)" />
        <ellipse cx="387" cy="131" rx="3.6" ry="4.4" fill="var(--hair)" />
        <path
          d="M352 152c6 5 15 5 21 0"
          stroke="var(--skin2)"
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ---- monitor, standing on the desk ---- */}
      <g transform="rotate(-2 148 240)">
        <path d="M98 356h100a6 6 0 0 1 6 6v6H92v-6a6 6 0 0 1 6-6Z" fill="var(--ink2)" />
        <path d="M134 306h28v52h-28Z" fill="var(--ink2)" />
        <rect x="26" y="104" width="244" height="204" rx="13" fill="var(--ink)" />
        <rect x="38" y="116" width="220" height="170" rx="7" fill="var(--screen)" />
        <circle cx="148" cy="297" r="3.5" fill="var(--ink2)" />

        {/* ---- on the screen: the tools, one hub, the readout ---- */}
        <g stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.5">
          <path d="M80 170h40M80 203h40M80 236h40" />
          <path d="M184 203h32" />
        </g>
        <rect x="54" y="160" width="26" height="20" rx="5" fill="var(--accent2)" opacity="0.9" />
        <rect x="54" y="193" width="26" height="20" rx="5" fill="var(--accent2)" opacity="0.62" />
        <rect x="54" y="226" width="26" height="20" rx="5" fill="var(--accent2)" opacity="0.4" />
        <rect x="120" y="176" width="64" height="54" rx="11" fill="var(--accent)" />
        <path
          d="M138 210l10-14 8 10 8-14"
          stroke="#fff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect x="216" y="150" width="30" height="102" rx="6" fill="#fff" opacity="0.07" />
        <rect x="222" y="216" width="18" height="30" rx="3" fill="var(--accent2)" opacity="0.78" />
        <rect x="222" y="190" width="18" height="20" rx="3" fill="#fff" opacity="0.2" />
        <rect x="222" y="166" width="18" height="18" rx="3" fill="#fff" opacity="0.12" />
        <rect x="54" y="138" width="66" height="7" rx="3.5" fill="#fff" opacity="0.2" />
        <circle cx="239" cy="141" r="4" fill="var(--accent)" />
      </g>

      {/* ---- the desk ---- */}
      <path d="M0 368h520v7H0Z" fill="var(--desk2)" />
      <path d="M0 375h520v45H0Z" fill="var(--desk)" />

      {/* ---- keyboard ---- */}
      <g>
        <path d="M196 342h164l16 26H180Z" fill="var(--ink)" />
        <g fill="var(--ink2)">
          <path d="M206 349h144l3 6H204Z" />
          <path d="M201 359h108l3 6H199Z" />
          <path d="M319 359h34l3 6h-35Z" />
        </g>
      </g>

      {/* ---- coffee, at the left of the desk where no arm crosses it ---- */}
      <g>
        <path d="M92 320h34l-4 43a6 6 0 0 1-6 5h-14a6 6 0 0 1-6-5Z" fill="var(--cup)" />
        <path d="M94 339h30l-2 21h-26Z" fill="var(--cup2)" opacity="0.6" />
        <path d="M89 312h40a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5H89a5 5 0 0 1-5-5v-3a5 5 0 0 1 5-5Z" fill="var(--cup2)" />
      </g>

      {/* ---- arms, over the desk and onto the keys ----
             Round-capped strokes rather than outlined shapes: the limb keeps
             an even thickness through the elbow, which is what makes a flat
             arm read as an arm. Sleeve first, forearm over it. */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* far arm */}
        <path d="M426 256l6 48" stroke="var(--shirt2)" strokeWidth="36" />
        <path d="M432 304l-72 42" stroke="var(--skin2)" strokeWidth="23" />
        <ellipse cx="354" cy="348" rx="18" ry="11.5" fill="var(--skin2)" stroke="none" />
        {/* near arm */}
        <path d="M292 252l-20 50" stroke="var(--shirt2)" strokeWidth="38" opacity="0.45" />
        <path d="M290 250l-20 50" stroke="var(--shirt)" strokeWidth="36" />
        <path d="M270 300l-24 46" stroke="var(--skin)" strokeWidth="26" />
        <ellipse cx="244" cy="349" rx="20" ry="12" fill="var(--skin)" stroke="none" />
      </g>
    </svg>
  );
}
