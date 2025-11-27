import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Your EmailJS credentials
  const SERVICE_ID = "service_io47x8l";
  const TEMPLATE_ID = "template_ndpo9pe";
  const PUBLIC_KEY = "ElI7pCqni-4vIl9VF";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use send() with formData for controlled inputs
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
      });
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="px-4 w-150">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Get In Touch
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="from_name" // matches template
                required
                value={formData.name}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Name..."
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="from_email" // matches template
                required
                value={formData.email}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="example@gmail.com"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message" // matches template
                required
                rows={5}
                value={formData.message}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Your Message..."
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};
