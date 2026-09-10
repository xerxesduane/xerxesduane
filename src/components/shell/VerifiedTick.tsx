/**
 * The check beside the name.
 *
 * Purely a brand mark — this is Xerxes's own site, and the tick says "you are
 * in the right place", not "a platform verified this account". It is therefore
 * `aria-hidden`: it carries no label, makes no claim to assistive tech, and
 * adds nothing to the accessibility tree that could read as a credential. The
 * blue is fixed rather than tokenised, because the shape only reads as a
 * verification tick in that specific blue, in either theme.
 *
 * Toggle it from `SHELL_IDENTITY.verified`.
 */
export default function VerifiedTick({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={`inline-block shrink-0 align-[-0.12em] ${className}`}
    >
      {/* The scalloped disc, drawn rather than approximated with a circle —
          the notched edge is what makes the mark read at 20px. */}
      <path
        fill="#1D9BF0"
        d="M12 1.6l2.2 1.86 2.86-.3 1.2 2.62 2.62 1.2-.3 2.86L22.4 12l-1.82 2.16.3 2.86-2.62 1.2-1.2 2.62-2.86-.3L12 22.4l-2.16-1.86-2.86.3-1.2-2.62-2.62-1.2.3-2.86L1.6 12l1.86-2.16-.3-2.86 2.62-1.2 1.2-2.62 2.86.3z"
      />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.8 12.2l2.9 2.9 5.5-6"
      />
    </svg>
  );
}
