import { Link } from "../router";
import { ArrowLeft } from "lucide-react";
import alphaMark from "../assets/alpha-mark.webp";

export function RunAlphaHeader({
  title,
  subtitle,
  backTo = "/run-alpha",
  backLabel = "Run Alpha",
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
}) {
  return (
    <div className="px-5 pt-6">
      <Link to={backTo} className="inline-flex items-center text-sm text-muted-foreground font-medium">
        <ArrowLeft className="h-4 w-4 mr-1" /> {backLabel}
      </Link>
      <div className="mt-3 flex items-center gap-3">
        <img src={alphaMark} alt="Alpha" className="h-10 w-10 object-contain" />
        <div>
          <h1 className="text-xl font-extrabold tracking-tight leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}