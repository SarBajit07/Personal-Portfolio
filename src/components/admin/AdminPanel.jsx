import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";

export const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState("projects"); // projects, skills, timeline, messages

  // Login form state
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [messages, setMessages] = useState([]);

  // Form states (Add/Edit)
  const [projectForm, setProjectForm] = useState({ id: null, title: "", description: "", tech: "", link: "", github_link: "", order_index: 0 });
  const [skillForm, setSkillForm] = useState({ id: null, category: "", items: "" });
  const [timelineForm, setTimelineForm] = useState({ id: null, type: "education", period: "", title: "", organization: "", description: "", order_index: 0 });

  // Load token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated & tab changes
  useEffect(() => {
    if (!isAuthenticated) return;

    const headers = { Authorization: `Bearer ${token}` };

    if (activeTab === "projects") {
      fetch(`${API_BASE_URL}/projects`)
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error(err));
    } else if (activeTab === "skills") {
      fetch(`${API_BASE_URL}/skills`)
        .then((res) => res.json())
        .then((data) => setSkills(data))
        .catch((err) => console.error(err));
    } else if (activeTab === "timeline") {
      fetch(`${API_BASE_URL}/timeline`)
        .then((res) => res.json())
        .then((data) => setTimeline(data))
        .catch((err) => console.error(err));
    } else if (activeTab === "messages") {
      fetch(`${API_BASE_URL}/contact`, { headers })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => setMessages(data))
        .catch((err) => {
          console.error(err);
          handleLogout();
        });
    }
  }, [isAuthenticated, activeTab, token]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid username or password");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setLoginData({ username: "", password: "" });
      })
      .catch((err) => {
        setLoginError(err.message);
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setIsAuthenticated(false);
  };

  // CRUD for Projects
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!projectForm.id;
    const url = isEdit ? `${API_BASE_URL}/projects/${projectForm.id}` : `${API_BASE_URL}/projects`;
    const method = isEdit ? "PUT" : "POST";

    // Split tech string by commas and trim
    const formattedTech = projectForm.tech.split(",").map((t) => t.trim()).filter(Boolean);

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...projectForm, tech: formattedTech }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save project");
        return res.json();
      })
      .then((savedProject) => {
        if (isEdit) {
          setProjects(projects.map((p) => (p.id === savedProject.id ? savedProject : p)));
        } else {
          setProjects([...projects, savedProject]);
        }
        setProjectForm({ id: null, title: "", description: "", tech: "", link: "", github_link: "", order_index: 0 });
      })
      .catch((err) => alert(err.message));
  };

  const handleProjectEdit = (p) => {
    setProjectForm({
      id: p.id,
      title: p.title,
      description: p.description,
      tech: p.tech.join(", "),
      link: p.link,
      github_link: p.github_link,
      order_index: p.order_index,
    });
  };

  const handleProjectDelete = (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete project");
        setProjects(projects.filter((p) => p.id !== id));
      })
      .catch((err) => alert(err.message));
  };

  // CRUD for Skills
  const handleSkillSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!skillForm.id;
    const url = isEdit ? `${API_BASE_URL}/skills/${skillForm.id}` : `${API_BASE_URL}/skills`;
    const method = isEdit ? "PUT" : "POST";

    const formattedItems = skillForm.items.split(",").map((i) => i.trim()).filter(Boolean);

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category: skillForm.category, items: formattedItems }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save skill group");
        return res.json();
      })
      .then((savedSkill) => {
        if (isEdit) {
          setSkills(skills.map((s) => (s.id === savedSkill.id ? savedSkill : s)));
        } else {
          // If category already exists, update it, otherwise add
          const exists = skills.some((s) => s.category === savedSkill.category);
          if (exists) {
            setSkills(skills.map((s) => (s.category === savedSkill.category ? savedSkill : s)));
          } else {
            setSkills([...skills, savedSkill]);
          }
        }
        setSkillForm({ id: null, category: "", items: "" });
      })
      .catch((err) => alert(err.message));
  };

  const handleSkillEdit = (s) => {
    setSkillForm({
      id: s.id,
      category: s.category,
      items: s.items.join(", "),
    });
  };

  const handleSkillDelete = (id) => {
    if (!confirm("Are you sure you want to delete this skill group?")) return;

    fetch(`${API_BASE_URL}/skills/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete skill group");
        setSkills(skills.filter((s) => s.id !== id));
      })
      .catch((err) => alert(err.message));
  };

  // CRUD for Timeline
  const handleTimelineSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!timelineForm.id;
    const url = isEdit ? `${API_BASE_URL}/timeline/${timelineForm.id}` : `${API_BASE_URL}/timeline`;
    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(timelineForm),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save timeline item");
        return res.json();
      })
      .then((savedItem) => {
        if (isEdit) {
          setTimeline(timeline.map((t) => (t.id === savedItem.id ? savedItem : t)));
        } else {
          setTimeline([...timeline, savedItem]);
        }
        setTimelineForm({ id: null, type: "education", period: "", title: "", organization: "", description: "", order_index: 0 });
      })
      .catch((err) => alert(err.message));
  };

  const handleTimelineEdit = (t) => {
    setTimelineForm({
      id: t.id,
      type: t.type,
      period: t.period,
      title: t.title,
      organization: t.organization,
      description: t.description || "",
      order_index: t.order_index,
    });
  };

  const handleTimelineDelete = (id) => {
    if (!confirm("Are you sure you want to delete this timeline item?")) return;

    fetch(`${API_BASE_URL}/timeline/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete timeline item");
        setTimeline(timeline.filter((t) => t.id !== id));
      })
      .catch((err) => alert(err.message));
  };

  // Delete message
  const handleMessageDelete = (id) => {
    if (!confirm("Delete this message?")) return;

    fetch(`${API_BASE_URL}/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete message");
        setMessages(messages.filter((m) => m.id !== id));
      })
      .catch((err) => alert(err.message));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508] px-4">
        <div className="w-full max-w-md glass-card p-8 glow-border shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-white mb-2 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Admin Login Portal
            </h2>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              Secure Portfolio Administration
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs font-mono text-center">
                ⚠️ {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                placeholder="Username..."
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm font-sans"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-medium transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50 cursor-pointer text-sm"
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-4">
              <a href="/" className="text-xs text-gray-500 hover:text-blue-400 font-mono transition-colors">
                ← Back to Website
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold font-display bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Admin Workspace
            </h1>
            <p className="text-xs font-mono text-gray-400 mt-1">
              Configure, update, and manage your portfolio databases
            </p>
          </div>
          <div className="flex gap-4">
            <a href="/" className="px-4 py-2 border border-white/10 rounded-lg text-xs font-mono hover:bg-white/5 transition-all">
              View Website
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-mono hover:bg-red-500/20 transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Tab Selectors */}
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 mb-8">
          {["projects", "skills", "timeline", "messages"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                  : "border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Projects Tab */}
          {activeTab === "projects" && (
            <>
              {/* Form Column */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 glow-border">
                  <h3 className="text-lg font-bold mb-6 text-white font-display border-b border-white/5 pb-2">
                    {projectForm.id ? "Edit Project" : "Add New Project"}
                  </h3>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Project title..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                        placeholder="Write dynamic project overview..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        required
                        value={projectForm.tech}
                        onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="React, Node.js, Express, MongoDB..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Demo URL</label>
                      <input
                        type="text"
                        value={projectForm.link}
                        onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="#"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">GitHub URL</label>
                      <input
                        type="text"
                        value={projectForm.github_link}
                        onChange={(e) => setProjectForm({ ...projectForm, github_link: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Order Index (sorting)</label>
                      <input
                        type="number"
                        value={projectForm.order_index}
                        onChange={(e) => setProjectForm({ ...projectForm, order_index: parseInt(e.target.value) || 0 })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded-lg text-xs font-mono cursor-pointer"
                      >
                        Save
                      </button>
                      {projectForm.id && (
                        <button
                          type="button"
                          onClick={() => setProjectForm({ id: null, title: "", description: "", tech: "", link: "", github_link: "", order_index: 0 })}
                          className="px-4 py-2 border border-white/10 rounded-lg text-xs font-mono hover:bg-white/5 cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* List Column */}
              <div className="lg:col-span-2 space-y-4">
                {projects.length === 0 ? (
                  <div className="glass-card p-12 text-center text-gray-500 font-mono text-sm">
                    No projects found in PostgreSQL.
                  </div>
                ) : (
                  projects.map((p) => (
                    <div key={p.id} className="glass-card p-6 glow-border flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-white text-lg font-display">{p.title}</h4>
                        <p className="text-gray-400 text-xs mt-2 line-clamp-2">{p.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {p.tech.map((t, idx) => (
                            <span key={idx} className="bg-blue-500/5 border border-blue-500/10 text-blue-400 text-[10px] py-0.5 px-2 rounded-full font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="inline-block mt-3 text-[10px] text-gray-500 font-mono">Order Index: {p.order_index}</span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleProjectEdit(p)}
                          className="p-2 border border-cyan-500/20 text-cyan-400 rounded-lg text-[10px] font-mono hover:bg-cyan-500/10 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleProjectDelete(p.id)}
                          className="p-2 border border-red-500/20 text-red-400 rounded-lg text-[10px] font-mono hover:bg-red-500/10 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <>
              {/* Form Column */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 glow-border">
                  <h3 className="text-lg font-bold mb-6 text-white font-display border-b border-white/5 pb-2">
                    {skillForm.id ? "Edit Skills Category" : "Add Skills Category"}
                  </h3>
                  <form onSubmit={handleSkillSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Category Name</label>
                      <input
                        type="text"
                        required
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Frontend, Backend..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Skill Items (comma-separated)</label>
                      <textarea
                        required
                        rows={4}
                        value={skillForm.items}
                        onChange={(e) => setSkillForm({ ...skillForm, items: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                        placeholder="React, JavaScript, Vite..."
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded-lg text-xs font-mono cursor-pointer"
                      >
                        Save
                      </button>
                      {skillForm.id && (
                        <button
                          type="button"
                          onClick={() => setSkillForm({ id: null, category: "", items: "" })}
                          className="px-4 py-2 border border-white/10 rounded-lg text-xs font-mono hover:bg-white/5 cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* List Column */}
              <div className="lg:col-span-2 space-y-4">
                {skills.length === 0 ? (
                  <div className="glass-card p-12 text-center text-gray-500 font-mono text-sm">
                    No skills categories registered.
                  </div>
                ) : (
                  skills.map((s) => (
                    <div key={s.id} className="glass-card p-6 glow-border flex justify-between items-center gap-4">
                      <div>
                        <h4 className="font-bold text-white font-display font-mono text-sm uppercase tracking-wider">{s.category}</h4>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {s.items.map((i, idx) => (
                            <span key={idx} className="bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-[10px] py-0.5 px-2 rounded-full font-sans">
                              {i}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleSkillEdit(s)}
                          className="p-2 border border-cyan-500/20 text-cyan-400 rounded-lg text-[10px] font-mono hover:bg-cyan-500/10 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleSkillDelete(s.id)}
                          className="p-2 border border-red-500/20 text-red-400 rounded-lg text-[10px] font-mono hover:bg-red-500/10 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <>
              {/* Form Column */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 glow-border">
                  <h3 className="text-lg font-bold mb-6 text-white font-display border-b border-white/5 pb-2">
                    {timelineForm.id ? "Edit Timeline Entry" : "Add Timeline Entry"}
                  </h3>
                  <form onSubmit={handleTimelineSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Type</label>
                      <select
                        value={timelineForm.type}
                        onChange={(e) => setTimelineForm({ ...timelineForm, type: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="education" className="bg-[#050508] text-white">Education</option>
                        <option value="experience" className="bg-[#050508] text-white">Experience</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Period (Years)</label>
                      <input
                        type="text"
                        required
                        value={timelineForm.period}
                        onChange={(e) => setTimelineForm({ ...timelineForm, period: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="e.g. 2022 - Present..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={timelineForm.title}
                        onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="e.g. B.Sc. in CSIT / Software Engineer..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Organization</label>
                      <input
                        type="text"
                        required
                        value={timelineForm.organization}
                        onChange={(e) => setTimelineForm({ ...timelineForm, organization: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Madan Bhandari College..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Description (details)</label>
                      <textarea
                        rows={3}
                        value={timelineForm.description}
                        onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                        placeholder="Details about coursework, roles..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Sorting Order Index</label>
                      <input
                        type="number"
                        value={timelineForm.order_index}
                        onChange={(e) => setTimelineForm({ ...timelineForm, order_index: parseInt(e.target.value) || 0 })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 rounded-lg text-xs font-mono cursor-pointer"
                      >
                        Save
                      </button>
                      {timelineForm.id && (
                        <button
                          type="button"
                          onClick={() => setTimelineForm({ id: null, type: "education", period: "", title: "", organization: "", description: "", order_index: 0 })}
                          className="px-4 py-2 border border-white/10 rounded-lg text-xs font-mono hover:bg-white/5 cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* List Column */}
              <div className="lg:col-span-2 space-y-4">
                {timeline.length === 0 ? (
                  <div className="glass-card p-12 text-center text-gray-500 font-mono text-sm">
                    No timeline items seeded.
                  </div>
                ) : (
                  timeline.map((t) => (
                    <div key={t.id} className="glass-card p-6 glow-border flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-mono uppercase tracking-wider py-0.5 px-2 rounded-full ${
                            t.type === 'education' ? 'bg-blue-500/10 text-blue-400' : 'bg-cyan-500/10 text-cyan-400'
                          }`}>
                            {t.type}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">{t.period}</span>
                        </div>
                        <h4 className="font-bold text-white text-base mt-2 font-display">{t.title}</h4>
                        <p className="text-gray-400 text-xs mt-1 font-sans">{t.organization}</p>
                        {t.description && <p className="text-gray-500 text-[11px] mt-2 leading-relaxed">{t.description}</p>}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleTimelineEdit(t)}
                          className="p-2 border border-cyan-500/20 text-cyan-400 rounded-lg text-[10px] font-mono hover:bg-cyan-500/10 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleTimelineDelete(t.id)}
                          className="p-2 border border-red-500/20 text-red-400 rounded-lg text-[10px] font-mono hover:bg-red-500/10 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="lg:col-span-3 space-y-4">
              {messages.length === 0 ? (
                <div className="glass-card p-12 text-center text-gray-500 font-mono text-sm glow-border">
                  💌 No contact form messages logged in PostgreSQL yet.
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="glass-card p-6 glow-border flex justify-between items-start gap-4">
                    <div className="space-y-2 w-full">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-white font-bold font-display text-sm">{m.name}</span>
                        <span className="text-[10px] text-gray-500 font-mono">{new Date(m.created_at).toLocaleString()}</span>
                      </div>
                      <div className="text-xs font-mono text-blue-400">{m.email}</div>
                      <p className="text-gray-300 text-xs font-sans mt-2 bg-white/[0.02] p-3 rounded-lg border border-white/5 white-space-pre-wrap">
                        {m.message}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <button
                        onClick={() => handleMessageDelete(m.id)}
                        className="p-2 border border-red-500/20 text-red-400 rounded-lg text-[10px] font-mono hover:bg-red-500/10 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
