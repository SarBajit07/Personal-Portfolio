import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  const projects = [
    {
      title: "Krishi Saathi",
      desc: "An agricultural web application providing farmers with real-time market prices, crop disease detection, and expert advice to increase farming productivity.",
      tech: ["React", "Tailwind CSS", "PyTorch", "MongoDB"],
      link: "#"
    },
    {
      title: "Weather App",
      desc: "A sleek, responsive real-time weather application that fetches instant reports, forecast details, and wind metrics using OpenWeather API integration.",
      tech: ["React", "Tailwind CSS", "OpenWeather API"],
      link: "#"
    }
  ];

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
                    {project.desc}
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
                    href={project.link}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group"
                  >
                    View Project
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};