export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-[#050508]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
        menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer hover:text-blue-500 transition-colors"
        aria-label="Close Menu"
      >
        &times;
      </button>

      <nav className="flex flex-col items-center justify-center space-y-8">
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className={`font-display text-3xl font-semibold text-white transition-all duration-300 hover:text-blue-500 transform ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          Home
        </a>
        <a
          href="#about"
          onClick={() => setMenuOpen(false)}
          className={`font-display text-3xl font-semibold text-white transition-all duration-300 hover:text-blue-500 transform ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          About
        </a>
        <a
          href="#projects"
          onClick={() => setMenuOpen(false)}
          className={`font-display text-3xl font-semibold text-white transition-all duration-300 hover:text-blue-500 transform ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className={`font-display text-3xl font-semibold text-white transition-all duration-300 hover:text-blue-500 transform ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Contact
        </a>
      </nav>
    </div>
  );
};