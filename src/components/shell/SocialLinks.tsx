import { Mail, MessageCircle } from "lucide-react";
import type { ComponentType } from "react";
import { InstagramIcon, LinkedinIcon } from "../ui/BrandIcons";
import { SHELL_SOCIALS, type ShellSocial } from "../../data/shell";

type Glyph = ComponentType<{ size?: number }>;

/* lucide covers the generic marks; the two brand glyphs come from BrandIcons. */
const GLYPH: Record<ShellSocial["kind"], Glyph> = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  whatsapp: MessageCircle,
  email: Mail,
};

/** Circular icon buttons for the profile block. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {SHELL_SOCIALS.map((social) => {
        const Icon = GLYPH[social.kind];
        const external = social.href.startsWith("http");
        return (
          <li key={social.kind}>
            <a
              href={social.href}
              aria-label={social.label}
              title={social.label}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-fg-soft shadow-pill transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <Icon size={17} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
