import { useState, useEffect } from "react";

export const ErrorPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavigate = (path) => {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050508] text-gray-100 overflow-hidden font-sans">
      {/* Self-contained premium animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-8deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }} />

      {/* Floating Interactive Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating circles representing stars/planets */}
        <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-blue-500/20 rounded-full blur-xs animate-float-slow" />
        <div className="absolute top-[25%] right-[15%] w-6 h-6 border border-cyan-500/20 rounded-full animate-float-medium" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-[20%] left-[18%] w-8 h-8 border border-indigo-500/10 rounded-full animate-float-slow" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-[35%] right-[10%] w-4 h-4 bg-indigo-500/20 rounded-full blur-xs animate-float-fast" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-[70%] left-[8%] w-5 h-5 border border-blue-500/25 rounded-full animate-float-medium" style={{ animationDelay: "2.2s" }} />
      </div>

      {/* Central 404 Card */}
      <div className={`relative z-10 max-w-xl w-full px-6 text-center transition-all duration-1000 transform ${
        isMounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
      }`}>
        {/* Decorative Radar/Compass Icon */}
        <div className="inline-flex justify-center items-center w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-inner mb-8 text-blue-500 animate-float-slow">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
          </svg>
        </div>

        {/* 404 Typography */}
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          404
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold tracking-wide font-display text-gray-200 mt-4 uppercase">
          Lost in Space
        </h2>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-4 mb-10 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's guide you back.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => handleNavigate("/")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_25px_-4px_rgba(59,130,246,0.6)] cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          
          <button
            onClick={() => handleNavigate("/#contact")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] text-gray-200 font-medium text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Decorative Grid coordinates */}
        <div className="mt-16 text-xs text-gray-600 font-mono tracking-widest uppercase">
          SYS_STATUS_ERR // PORT_404_SECURED
        </div>
      </div>
    </div>
  );
};
