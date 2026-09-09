import type { ReactNode } from "react";
import CanvasLines from "./CanvasLines";
import MobileNav from "./MobileNav";
import ProfileSidebar from "./ProfileSidebar";

interface ShellLayoutProps {
  children: ReactNode;
  path: string;
  /** The same page in the other language, for the EN/AR switch. */
  lang: { href: string; label: string };
}

/**
 * Page frame: decorative canvas lines, the profile rail (or the mobile bar),
 * and the content column beside it.
 *
 * `min-w-0` on the content column is load-bearing — without it a wide child
 * (a table, a code block, the tools strip) would stretch the flex track and
 * put the whole page into horizontal overflow.
 */
export default function ShellLayout({ children, path, lang }: ShellLayoutProps) {
  return (
    <>
      <CanvasLines />
      <MobileNav path={path} lang={lang} />
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 xl:gap-10">
          <ProfileSidebar path={path} lang={lang} />
          <div className="min-w-0 flex-1 py-6 lg:py-8">{children}</div>
        </div>
      </div>
    </>
  );
}
