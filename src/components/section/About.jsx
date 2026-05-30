import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const frontendSkills = ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite"];
  const backendSkills = ["Node.js", "Express", "REST APIs", "Python", "PyTorch"];
  const databaseTools = ["MongoDB", "Git", "GitHub", "Vercel", "Postman"];

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

          {/* Intro Card */}
          <div className="glass-card p-8 mb-10">
            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-8">
              I am a passionate frontend developer dedicated to building responsive, scalable, and high-performance web applications. I love creating clean code architectures and crafting delightful, user-centric interfaces.
            </p>

            <h3 className="font-display text-xl font-bold mb-6 text-white border-b border-white/5 pb-2">
              Technical Skillsets
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend Card */}
              <div className="bg-white/[0.01] border border-white/5 rounded-xl p-5 hover:border-blue-500/20 transition-all">
                <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4 font-mono">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/5 border border-blue-500/10 text-blue-400 py-1 px-3 rounded-full text-xs font-medium hover:bg-blue-500/15 hover:shadow-[0_2px_8px_rgba(59,130,246,0.15)] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Card */}
              <div className="bg-white/[0.01] border border-white/5 rounded-xl p-5 hover:border-cyan-500/20 transition-all">
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 font-mono">
                  Backend & ML
                </h4>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 py-1 px-3 rounded-full text-xs font-medium hover:bg-cyan-500/15 hover:shadow-[0_2px_8px_rgba(6,182,212,0.15)] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases & Tools */}
              <div className="bg-white/[0.01] border border-white/5 rounded-xl p-5 hover:border-teal-500/20 transition-all">
                <h4 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-4 font-mono">
                  Databases & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {databaseTools.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-teal-500/5 border border-teal-500/10 text-teal-400 py-1 px-3 rounded-full text-xs font-medium hover:bg-teal-500/15 hover:shadow-[0_2px_8px_rgba(20,184,166,0.15)] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education & Experience Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education Timeline */}
            <div className="glass-card p-8">
              <h3 className="font-display text-xl font-bold mb-6 text-white flex items-center gap-2">
                <span>🎓</span> Education
              </h3>
              <div className="relative border-l border-white/10 pl-6 space-y-8">
                <div className="relative">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  <span className="text-xs font-mono text-blue-400 font-semibold">2022 - Present</span>
                  <h4 className="text-base font-bold text-white mt-1">
                    B.Sc. in CSIT
                  </h4>
                  <p className="text-sm text-gray-400">Madan Bhandari Memorial College</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Running in 8th Semester. Specialized coursework in Web Development, Database Management, and Data Structures.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="glass-card p-8">
              <h3 className="font-display text-xl font-bold mb-6 text-white flex items-center gap-2">
                <span>💼</span> Experience
              </h3>
              <div className="relative border-l border-white/10 pl-6 space-y-8">
                <div className="relative">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                  <span className="text-xs font-mono text-cyan-400 font-semibold">Ongoing Development</span>
                  <h4 className="text-base font-bold text-white mt-1">
                    Self-Directed Learning & Projects
                  </h4>
                  <p className="text-sm text-gray-400">Independent Engineer</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Designing fullstack applications, building agricultural tooling like Krishi Saathi, and researching deep learning integrations in react architectures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};