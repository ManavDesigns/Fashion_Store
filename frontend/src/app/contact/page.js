"use client";

import { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  }

  const inputClass = (field) =>
    `w-full bg-transparent border-b ${
      errors[field] ? "border-red-400" : "border-border"
    } py-3 text-sm font-medium text-primary placeholder:text-secondary focus:outline-none focus:border-black transition-colors`;

  return (
    <main className="min-h-screen bg-white border-t border-border/40">
      <div className="site-container py-16 lg:py-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        {/* Header */}
        <div className="mt-8 mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary opacity-60">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-[3.5rem] font-black uppercase tracking-[-0.03em] leading-none text-primary mt-3">
            Contact Boutique
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-24">

          {/* Left — Info */}
          <div className="flex flex-col gap-12">
            {/* Description */}
            <p className="text-base font-medium text-secondary leading-relaxed max-w-lg">
              Our dedicated atelier team is here to assist you with sizing, availability, bespoke commissions, and any order queries. We respond to all inquiries within one business day.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                  <MapPin size={16} strokeWidth={1.5} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60 mb-1">Address</p>
                  <p className="text-sm font-medium text-primary">1422 Atelier St</p>
                  <p className="text-sm font-medium text-secondary">Paris, France 75001</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                  <Mail size={16} strokeWidth={1.5} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60 mb-1">Email</p>
                  <a href="mailto:atelier@theatelier.com" className="text-sm font-medium text-primary hover:opacity-60 transition-opacity">
                    atelier@theatelier.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                  <Clock size={16} strokeWidth={1.5} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60 mb-1">Hours</p>
                  <p className="text-sm font-medium text-primary">Monday – Saturday</p>
                  <p className="text-sm font-medium text-secondary">10:00 AM – 8:00 PM CET</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/40 pt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60 mb-4">Follow Us</p>
              <div className="flex gap-6">
                {["Instagram", "Pinterest", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[11px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-[#f8f7f5] p-8 md:p-10 border border-border/40">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-6 fade-in">
                <CheckCircle size={48} strokeWidth={1} className="text-primary" />
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-primary mb-2">
                    Message Sent
                  </h2>
                  <p className="text-sm font-medium text-secondary max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. A member of our atelier team will respond within one business day.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-primary pb-1 hover:opacity-60 transition-opacity"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-60">
                    Send a Message
                  </span>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Elena Rossi"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@theatelier.com"
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`${inputClass("subject")} cursor-pointer bg-transparent appearance-none`}
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="sizing">Sizing & Fit</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="bespoke">Bespoke Commission</option>
                    <option value="press">Press & Partnerships</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we assist you today?"
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 w-full bg-black text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-800 transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} strokeWidth={2} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-[10px] text-secondary text-center leading-relaxed opacity-60">
                  By submitting this form you agree to our{" "}
                  <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
