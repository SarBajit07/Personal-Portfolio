import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-16 sm:py-24 md:py-28"
    >
      {/* Local Ambient Radial Glow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 rounded-full blur-[80px] md:blur-[150px] opacity-75" />
      </div>

      <RevealOnScroll>
        <div className="text-center z-10 px-4 max-w-3xl mx-auto flex flex-col items-center">
          {/* Tech Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] md:text-xs font-mono mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Full Stack Developer · Available for Opportunities
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent text-center">
            Hi, I'm Sarbajit Timalsina
          </h1>
          
          <p className="text-gray-400 text-base sm:text-base md:text-lg mb-10 max-w-xl leading-relaxed">
            I'm a passionate <span className="text-blue-400 font-semibold">Full Stack Developer</span> who architects end-to-end web applications — from pixel-perfect React UIs to robust Node.js APIs backed by PostgreSQL. I'm driven by building fast, scalable, and delightful digital experiences that work beautifully inside and out.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
            <a 
              href="#projects" 
              className="w-full sm:w-auto text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3.5 px-8 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            >
              View Projects
            </a>

            <a 
              href="#contact" 
              className="w-full sm:w-auto text-center border border-blue-500/30 text-blue-400 py-3.5 px-8 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500/10 hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            >
              Contact Me
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};