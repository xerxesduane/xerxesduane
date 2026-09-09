import type { ReactNode } from "react";
import CanvasLines from "./CanvasLines";
import MobileNav from "./MobileNav";
import ProfileSidebar from "./ProfileSidebar";

interface ShellLayoutProps {
  children: ReactNode;
  path: string;
  /** The same page in the other language, for the EN/AR switch. */
  lang: { href: string; label: string };
  /** Rendered at the end of the scrolling panel, inside the frame. */
  footer?: ReactNode;
}

/**
 * Dashboard frame: the rail stays put and only the panel beside it moves.
 *
 * From `lg` up the frame is exactly one viewport tall and the window itself
 * never scrolls — the panel is the scroll container, so switching sections
 * swaps the panel rather than sending the page back to the top. Below `lg`
 * there is no room for that, so the whole thing reverts to ordinary document
 * flow with the mobile bar on top.
 *
 * `min-w-0` on the panel is load-bearing: without it a wide child (a table,
 * the tools strip) would stretch the flex track into horizontal overflow.
 */
export default function ShellLayout({ children, path, lang, footer }: ShellLayoutProps) {
  return (
    <>
      <CanvasLines />
      <MobileNav path={path} lang={lang} />
      <div className="mx-auto w-full max-w-shell px-4 sm:px-6 lg:h-dvh lg:overflow-hidden lg:px-8">
        <div className="flex gap-8 lg:h-full xl:gap-10">
          <ProfileSidebar path={path} lang={lang} />
          <div
            id="panel"
            className="min-w-0 flex-1 py-6 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:py-4"
          >
            {children}
            {footer}
          </div>
        </div>
      </div>
    </>
  );
}
