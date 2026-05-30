import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const SERVICE_ID = "service_io47x8l";
  const TEMPLATE_ID = "template_ndpo9pe";
  const PUBLIC_KEY = "ElI7pCqni-4vIl9VF";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      )
      .then(() => {
        alert("Message Sent! ✅");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("Oops, something went wrong. Please try again. ❌");
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
      <RevealOnScroll>
        <div className="w-full max-w-lg mx-auto relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent text-center tracking-wide">
            Get In Touch
          </h2>

          <div className="glass-card p-8 md:p-10 shadow-2xl relative">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] text-sm font-sans"
                  placeholder="Your Name..."
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] text-sm font-sans"
                  placeholder="example@gmail.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-blue-500/[0.02] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] text-sm font-sans resize-none"
                  placeholder="Your Message..."
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3.5 px-6 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-center text-sm tracking-wide"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
