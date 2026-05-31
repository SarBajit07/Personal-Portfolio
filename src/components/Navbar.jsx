import { useEffect } from "react"; 

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <nav className="fixed top-4 left-0 right-0 z-40 px-4">
      <div className="max-w-5xl mx-auto glass-pill rounded-2xl md:rounded-full px-4 sm:px-6 py-3.5 shadow-lg">
        <div className="flex justify-between items-center">
          <a 
            href="#home" 
            className="font-display text-base sm:text-lg font-bold text-white tracking-wide transition-all hover:opacity-80"
          >
            Sarbajit <span className="text-blue-500 font-normal">Timalsina</span>
          </a>

          {/* Mobile Menu Burger Icon */}
          <button 
            className="w-8 h-8 flex flex-col justify-center items-center space-y-1.5 cursor-pointer z-50 md:hidden focus:outline-none" 
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            <div className={`w-5 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8"> 
            <a href="#home" className="text-gray-300 hover:text-white transition-colors relative group py-1 text-sm font-medium">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors relative group py-1 text-sm font-medium">
              About
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors relative group py-1 text-sm font-medium">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors relative group py-1 text-sm font-medium">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
          </div>  
        </div>
      </div>
    </nav>
  );  
};