import { useSettings } from "../lib/settings";

export function ContactBlock({ align = "left" }: { align?: "left" | "center" }) {
  const s = useSettings();
  if (!s.contactEmail && !s.contactEmailSecondary) return null;
  const alignCls = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`text-[12px] leading-relaxed ${alignCls}`}>
      <p className="text-muted-foreground font-semibold">Questions? Email us</p>
      {s.contactEmail && (
        <p className="mt-0.5">
          <span className="text-muted-foreground">Joyce (Alpha Coordinator): </span>
          <a href={`mailto:${s.contactEmail}`} className="font-medium" style={{ color: "#1B3FAA" }}>
            {s.contactEmail}
          </a>
        </p>
      )}
      {s.contactEmailSecondary && (
        <p className="mt-0.5">
          <span className="text-muted-foreground">Xerxes (App and Tech): </span>
          <a href={`mailto:${s.contactEmailSecondary}`} className="font-medium" style={{ color: "#1B3FAA" }}>
            {s.contactEmailSecondary}
          </a>
        </p>
      )}
    </div>
  );
}

export function DevCredit() {
  return (
    <p className="mt-4 text-center text-[11px] text-muted-foreground">
      App developed by{" "}
      <a
        href="https://www.xerxesduane.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium"
        style={{ color: "#1B3FAA" }}
      >
        Xerxes Duane
      </a>
    </p>
  );
}