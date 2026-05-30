import { RevealOnScroll } from "../RevealOnScroll";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load projects.");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden"
    >
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent text-center tracking-wide">
            Featured Projects
          </h2>

          {loading ? (
            // Shimmering skeleton loader structure
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {[1, 2].map((i) => (
                <div 
                  key={i} 
                  className="glass-card p-6 flex flex-col justify-between glow-border animate-pulse min-h-[250px]"
                >
                  <div>
                    <div className="h-6 bg-white/10 rounded w-2/3 mb-4" />
                    <div className="h-4 bg-white/5 rounded w-full mb-2" />
                    <div className="h-4 bg-white/5 rounded w-5/6 mb-6" />
                    <div className="flex gap-2 mb-6">
                      <div className="h-6 bg-white/10 rounded-full w-16" />
                      <div className="h-6 bg-white/10 rounded-full w-20" />
                      <div className="h-6 bg-white/10 rounded-full w-16" />
                    </div>
                  </div>
                  <div className="h-5 bg-white/10 rounded w-24 pt-4 border-t border-white/5 mt-auto" />
                </div>
              ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, key) => (
                <div 
                  key={key}
                  className="glass-card p-6 flex flex-col justify-between glow-border"
                >
                  <div>
                    <h3 className="font-display text-xl font-bold mb-3 text-white">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, tKey) => (
                        <span
                          key={tKey}
                          className="bg-blue-500/5 border border-blue-500/10 text-blue-400 py-1 px-2.5 rounded-full text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                    <a 
                      href={project.link || "#"}
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group"
                    >
                      View Project
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                    {project.github_link && project.github_link !== '#' && (
                      <a 
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white text-xs font-mono transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </RevealOnScroll>
    </section>
  );
};