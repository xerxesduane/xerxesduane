import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../lib/useTheme";

/**
 * Light/dark switch. Renders both glyphs and hides one, so the button's size
 * never changes between themes and there is nothing to lay out on toggle.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-fg-soft shadow-pill transition duration-300 ease-smooth hover:-translate-y-0.5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
    >
      {theme === "dark" ? (
        <Sun size={17} strokeWidth={1.9} aria-hidden />
      ) : (
        <Moon size={17} strokeWidth={1.9} aria-hidden />
      )}
    </button>
  );
}
