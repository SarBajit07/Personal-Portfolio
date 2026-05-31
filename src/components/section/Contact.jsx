import { RevealOnScroll } from "../RevealOnScroll";
import { useState } from "react";
import { API_BASE_URL } from "../../config";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("sarbajeet4604@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to send message.");
        }
        return res.json();
      })
      .then(() => {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("Submission Error:", err);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden"
    >
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[10%] right-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-tr from-cyan-500/10 to-blue-500/5 rounded-full blur-[80px] md:blur-[120px] opacity-60" />
      </div>

      <RevealOnScroll>
        <div className="w-full max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Intro & Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full">
              {/* Opportunities Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] md:text-xs font-mono mb-6 tracking-widest uppercase self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for Projects
              </div>

              <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent text-left">
                Let's build something great.
              </h2>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Have an exciting project idea, a position to fill, or just want to chat about full-stack engineering? Drop me a line and let's work together to turn your vision into a polished, production-ready reality.
              </p>

              <div className="space-y-4 max-w-md">
                {/* Email Card */}
                <div className="group relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-blue-500/20 rounded-2xl p-5 transition-all duration-300 flex items-center justify-between gap-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 transition-colors duration-300 group-hover:bg-blue-500/10 group-hover:border-blue-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Email Address</span>
                      <a 
                        href="mailto:sarbajeet4604@gmail.com" 
                        className="text-sm font-semibold text-white hover:text-blue-400 transition-colors duration-200 break-all"
                      >
                        sarbajeet4604@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  {/* Copy Button Container */}
                  <div className="relative shrink-0">
                    <button
                      onClick={handleCopyEmail}
                      className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                      title="Copy Email Address"
                    >
                      {copied ? (
                        <svg className="w-4 h-4 text-emerald-400 animate-fade-in-up" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.4M9 13.5V3.375C9 2.754 9.504 2.25 10.125 2.25h9.75c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125H10.125A1.125 1.125 0 0 1 9 13.5Z" />
                        </svg>
                      )}
                    </button>
                    
                    {/* Tooltip */}
                    {copied && (
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/20 rounded-md shadow-md whitespace-nowrap animate-fade-in-up">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>

                {/* Location Card */}
                <div className="group bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-cyan-500/20 rounded-2xl p-5 transition-all duration-300 flex items-center gap-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 transition-colors duration-300 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Location</span>
                    <span className="text-sm font-semibold text-white">Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Panel */}
            <div className="lg:col-span-7">
              {submitStatus === "success" ? (
                /* Premium Success Overlay */
                <div className="glass-card p-8 md:p-12 shadow-2xl relative flex flex-col items-center justify-center text-center min-h-[460px] animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    Message Sent Successfully!
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
                    Thank you for reaching out! Your message has been successfully sent to Sarbajit. I'll get back to you as soon as possible, typically within 24 hours.
                  </p>
                  
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer active:scale-95"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <div className="glass-card p-8 md:p-10 shadow-2xl relative">
                  
                  {/* Inline Error Message */}
                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-3 animate-fade-in-up">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>
                      <span>Oops! Something went wrong while saving your message. Please check your network and try again.</span>
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    
                    {/* Name input */}
                    <div className="group flex flex-col">
                      <label 
                        htmlFor="contact-name" 
                        className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2 transition-colors duration-300 group-focus-within:text-blue-400"
                      >
                        Name
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-gray-500 pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                          </svg>
                        </span>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.01] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] text-sm font-sans"
                          placeholder="Your Name..."
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="group flex flex-col">
                      <label 
                        htmlFor="contact-email" 
                        className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2 transition-colors duration-300 group-focus-within:text-blue-400"
                      >
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-gray-500 pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                          </svg>
                        </span>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.01] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] text-sm font-sans"
                          placeholder="example@gmail.com"
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="group flex flex-col">
                      <label 
                        htmlFor="contact-message" 
                        className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2 transition-colors duration-300 group-focus-within:text-blue-400"
                      >
                        Message
                      </label>
                      <div className="relative flex items-start">
                        <span className="absolute left-4 top-3.5 text-gray-500 pointer-events-none transition-colors duration-300 group-focus-within:text-blue-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                          </svg>
                        </span>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          value={formData.message}
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.01] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] text-sm font-sans resize-none"
                          placeholder="Your Message..."
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3.5 px-6 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-center text-sm tracking-wide flex items-center justify-center gap-2"
                    >
                      {isSending ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

