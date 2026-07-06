import { ArrowUpRight } from "lucide-react";
import Button from "./Button";
import { CONTACT } from "../data/content";

const COLUMN_1 = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
];

const COLUMN_2 = [
  { label: "WhatsApp", href: `https://wa.me/${CONTACT.whatsapp}` },
  { label: "Email", href: `mailto:${CONTACT.email}` },
];

/** Reference-style footer for the studio landing flow (sits above the global footer). */
export default function StudioFooter() {
  return (
    <footer
      aria-label="Studio footer"
      className="studio-reference-page w-full bg-[#FDFCFA]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <Button variant="primary" href={CONTACT.calendar} target="_blank" rel="noopener">
          Start a chat
        </Button>

        <div className="flex items-start gap-12">
          <ArrowUpRight aria-hidden className="mt-1 h-5 w-5 text-[#051A24]" />
          <ul className="flex flex-col gap-3">
            {COLUMN_1.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-studio-body text-base text-[#051A24] transition-opacity hover:opacity-70"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-3">
            {COLUMN_2.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="font-studio-body text-base text-[#051A24] transition-opacity hover:opacity-70"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
