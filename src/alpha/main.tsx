/**
 * Alpha Connect on ministry.xerxesduane.com/alpha-connect: the Alpha at
 * Fellowship companion app (invite friends to Alpha in Dubai, keep a prayer
 * and invite list, host the Alpha Film Series).
 *
 * A self-contained app with its own palette and stylesheet. The screens in
 * routes/ are the app's original pages; router.tsx stands in for the router
 * they were written against. middleware.ts serves alpha-connect.html for
 * every path under /alpha-connect, and this file picks the screen.
 */
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./alpha.css";
import { Link, RouterView } from "./router";
import { Toaster } from "./components/Toaster";
import { registerSW } from "./lib/pwa";
import lockup from "./assets/alpha-at-fellowship-lockup.webp";

// Each page registers its route as its module loads.
import.meta.glob("./routes/*.tsx", { eager: true });

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => { registerSW(); }, []);
  const [splashGone, setSplashGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSplashGone(true), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <RouterView notFound={NotFound} />
      <Toaster position="top-center" />
      {!splashGone && (
        <div
          aria-hidden
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#FAF8F5",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            transition: "opacity 300ms ease",
            opacity: 1,
          }}
        >
          <img src={lockup} alt="Fellowship Dubai × Alpha · Alpha at Fellowship" style={{ width: "min(70vw, 360px)", height: "auto" }} />
          <p style={{ marginTop: 16, fontSize: 13, color: "#9a9a9a", fontFamily: "Plus Jakarta Sans, sans-serif" }}>Loading...</p>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("alpha-root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
