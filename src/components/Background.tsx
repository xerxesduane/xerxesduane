/**
 * Fixed ambient background: deep gradient canvas + slowly drifting gold/olive
 * light blobs + a subtle dotted grid. Sits behind all content (z-0).
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* base vertical gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-ink to-ink-deep" />

      {/* drifting light blobs */}
      <div className="absolute -top-32 left-[8%] h-[42rem] w-[42rem] rounded-full bg-gold/10 blur-[120px] animate-float-blob" />
      <div className="absolute top-1/3 right-[2%] h-[38rem] w-[38rem] rounded-full bg-olive-light/15 blur-[130px] animate-float-blob-slow" />
      <div className="absolute bottom-[-10%] left-1/3 h-[34rem] w-[34rem] rounded-full bg-gold/8 blur-[140px] animate-float-blob" />

      {/* faint dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(244,239,230,0.10) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />
    </div>
  );
}
