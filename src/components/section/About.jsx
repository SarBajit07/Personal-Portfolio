import { RevealOnScroll } from "../RevealOnScroll";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";

export const About = () => {
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/skills`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skills");
        return res.json();
      }),
      fetch(`${API_BASE_URL}/timeline`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch timeline");
        return res.json();
      })
    ])
      .then(([skillsData, timelineData]) => {
        setSkills(skillsData);
        setTimeline(timelineData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading profile content.");
        setLoading(false);
      });
  }, []);

  const educationItems = timeline.filter((item) => item.type === "education");
  const experienceItems = timeline.filter((item) => item.type === "experience");

  // Dynamic colors matching original CSS scheme
  const themeColors = [
    { text: "text-blue-400", border: "hover:border-blue-500/20", bg: "bg-blue-500/5", borderTech: "border-blue-500/10", textTech: "text-blue-400", shadow: "hover:shadow-[0_2px_8px_rgba(59,130,246,0.15)]", bgHover: "hover:bg-blue-500/15" },
    { text: "text-cyan-400", border: "hover:border-cyan-500/20", bg: "bg-cyan-500/5", borderTech: "border-cyan-500/10", textTech: "text-cyan-400", shadow: "hover:shadow-[0_2px_8px_rgba(6,182,212,0.15)]", bgHover: "hover:bg-cyan-500/15" },
    { text: "text-teal-400", border: "hover:border-teal-500/20", bg: "bg-teal-500/5", borderTech: "border-teal-500/10", textTech: "text-teal-400", shadow: "hover:shadow-[0_2px_8px_rgba(20,184,166,0.15)]", bgHover: "hover:bg-teal-500/15" }
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden"
    >
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent text-center tracking-wide">
            About Me
          </h2>

          {loading ? (
            <div className="space-y-10 animate-pulse w-[80vw] max-w-4xl">
              {/* Intro card skeleton */}
              <div className="glass-card p-8">
                <div className="h-4 bg-white/5 rounded w-full mb-3" />
                <div className="h-4 bg-white/5 rounded w-5/6 mb-8" />
                <div className="h-6 bg-white/10 rounded w-1/3 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((x) => (
                    <div key={x} className="bg-white/[0.01] border border-white/5 rounded-xl p-5 min-h-[120px]">
                      <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
                      <div className="flex flex-wrap gap-2">
                        <div className="h-5 bg-white/5 rounded-full w-12" />
                        <div className="h-5 bg-white/5 rounded-full w-16" />
                        <div className="h-5 bg-white/5 rounded-full w-14" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12 glass-card p-8 glow-border max-w-md mx-auto">
              <span className="text-3xl">⚠️</span>
              <p className="text-red-400 mt-4 font-mono text-sm">{error}</p>
              <button 
                onClick={() => { setLoading(true); setError(null); window.location.reload(); }}
                className="mt-6 px-5 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-mono hover:bg-blue-500/20 transition-all cursor-pointer"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <>
              {/* Intro Card */}
              <div className="glass-card p-8 mb-10">
                <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-8">
                  I'm a <span className="text-blue-400 font-semibold">Full Stack Developer</span> passionate about building complete, production-grade web applications. On the frontend, I craft responsive, pixel-perfect React interfaces. On the backend, I design RESTful APIs with Node.js &amp; Express, manage relational data with PostgreSQL, and deploy scalable services on platforms like Render and Vercel. I care deeply about clean architecture, performance, and seamless user experiences — from the database all the way to the browser.
                </p>

                <h3 className="font-display text-xl font-bold mb-6 text-white border-b border-white/5 pb-2">
                  Technical Skillsets
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {skills.map((skillGroup, key) => {
                    const theme = themeColors[key % themeColors.length];
                    return (
                      <div 
                        key={skillGroup.id || key} 
                        className={`bg-white/[0.01] border border-white/5 rounded-xl p-5 ${theme.border} transition-all`}
                      >
                        <h4 className={`text-sm font-semibold ${theme.text} uppercase tracking-wider mb-4 font-mono`}>
                          {skillGroup.category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((tech, tKey) => (
                            <span
                              key={tKey}
                              className={`${theme.bg} border ${theme.borderTech} ${theme.textTech} py-1 px-3 rounded-full text-xs font-medium ${theme.bgHover} ${theme.shadow} transition-all`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Education & Experience Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Education Timeline */}
                <div className="glass-card p-8">
                  <h3 className="font-display text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span>🎓</span> Education
                  </h3>
                  {educationItems.length === 0 ? (
                    <p className="text-gray-500 text-sm font-mono">No education data available.</p>
                  ) : (
                    <div className="relative border-l border-white/10 pl-6 space-y-8">
                      {educationItems.map((item, key) => (
                        <div key={item.id || key} className="relative">
                          {/* Timeline Dot */}
                          <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                          <span className="text-xs font-mono text-blue-400 font-semibold">{item.period}</span>
                          <h4 className="text-base font-bold text-white mt-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-400">{item.organization}</p>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Experience Timeline */}
                <div className="glass-card p-8">
                  <h3 className="font-display text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span>💼</span> Experience
                  </h3>
                  {experienceItems.length === 0 ? (
                    <p className="text-gray-500 text-sm font-mono">No experience data available.</p>
                  ) : (
                    <div className="relative border-l border-white/10 pl-6 space-y-8">
                      {experienceItems.map((item, key) => (
                        <div key={item.id || key} className="relative">
                          {/* Timeline Dot */}
                          <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                          <span className="text-xs font-mono text-cyan-400 font-semibold">{item.period}</span>
                          <h4 className="text-base font-bold text-white mt-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-400">{item.organization}</p>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </RevealOnScroll>
    </section>
  );
};