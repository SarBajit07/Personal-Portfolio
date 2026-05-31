import { useState, useEffect } from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/section/Home";
import { About } from "./components/section/About";
import { Projects } from "./components/section/Projects";
import { Contact } from "./components/section/Contact";
import { AdminPanel } from "./components/admin/AdminPanel";
import { ErrorPage } from "./components/ErrorPage";
import "./index.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
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
  const isAdmin = currentPath === "/admin" || currentHash === "#admin" || currentHash.startsWith("#admin");
  const isError = !isHome && !isAdmin;

  // Handle Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Custom Cursor Coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isAdmin) {
    return (
      <>
        <div className="grain-overlay" />
        <AdminPanel />
      </>
    );
  }

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* Global Grain and Grid Overlays */}
      <div className="grain-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-[0.3]" />

      {/* Interactive Cursor */}
      {isLoaded && (
        <>
          <div
            className="custom-cursor hidden md:block"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          />
          <div
            className="custom-cursor-glow hidden md:block"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          />
        </>
      )}

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div
        className={`min-h-screen transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-[#050508] text-gray-100 relative z-10`}
      >
        {isError ? (
          <ErrorPage />
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
