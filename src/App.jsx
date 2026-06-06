import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/section/Home";
import { About } from "./components/section/About";
import { Projects } from "./components/section/Projects";
import { Contact } from "./components/section/Contact";
import { CustomCursor } from "./components/CustomCursor";
import "./index.css";

// Lazily loaded — these chunks are only downloaded when actually needed.
const AdminPanel = lazy(() =>
  import("./components/admin/AdminPanel").then((m) => ({ default: m.AdminPanel }))
);
const ErrorPage = lazy(() =>
  import("./components/ErrorPage").then((m) => ({ default: m.ErrorPage }))
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Handle Hash & Path Routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const isHome = currentPath === "/" || currentPath === "/index.html";
  const isAdmin =
    currentPath === "/admin" ||
    currentHash === "#admin" ||
    currentHash.startsWith("#admin");
  const isError = !isHome && !isAdmin;

  // Dynamically update page title for SEO & UI clarity
  useEffect(() => {
    if (isAdmin) {
      document.title = "Admin Dashboard | Sarbajit Timalsina";
    } else if (isError) {
      document.title = "Page Not Found | Sarbajit Timalsina";
    } else {
      document.title =
        "Sarbajit Timalsina | Full-Stack Web Developer & Designer";
    }
  }, [isAdmin, isError]);

  // Handle Scroll Progress — throttled via requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            setScrollProgress((window.scrollY / totalScroll) * 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) {
    return (
      <>
        <div className="grain-overlay" />
        <Suspense fallback={<div className="min-h-screen bg-[#050508]" />}>
          <AdminPanel />
        </Suspense>
      </>
    );
  }

  return (
    <>
      {/* Global Grain and Grid Overlays */}
      <div className="grain-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-[0.3]" />

      {/* Zero-re-render custom cursor (ref-based DOM updates) */}
      <CustomCursor />

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="min-h-screen opacity-100 bg-[#050508] text-gray-100 relative z-10">
        {isError ? (
          <Suspense fallback={<div className="min-h-screen bg-[#050508]" />}>
            <ErrorPage />
          </Suspense>
        ) : (
          <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {/* Main Content Sections */}
            <main className="relative">
              <Home />
              <About />
              <Projects />
              <Contact />
            </main>
          </>
        )}
      </div>
    </>
  );
}

export default App;
