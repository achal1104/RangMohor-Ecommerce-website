import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please complete required fields");
    toast.success("Message sent — we'll reply within 24 hours");
    setForm({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-16">
      <div>
        <p className="overline text-gold mb-3">GET IN TOUCH</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight mb-6">Let's compose<br/>something together.</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-10 max-w-md">For bespoke commissions, bulk orders (100+ boxes), or a quiet chat about your celebration — write to us.</p>
        <div className="space-y-4">
          <div className="flex items-center gap-4"><Mail size={18} className="text-gold" /><span>hello@rangmohor.gifts</span></div>
          <div className="flex items-center gap-4"><Phone size={18} className="text-gold" /><span>+91 98100 22 000</span></div>
          <div className="flex items-start gap-4"><MapPin size={18} className="text-gold mt-1" /><span>Studio 14, Amer Road<br/>Jaipur, Rajasthan 302002</span></div>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-6" data-testid="contact-form">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name*"
          className="w-full bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none focus:border-gold" data-testid="contact-name" />
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email*"
          className="w-full bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none focus:border-gold" data-testid="contact-email" />
        <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject"
          className="w-full bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none focus:border-gold" data-testid="contact-subject" />
        <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your celebration*"
          className="w-full bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none focus:border-gold resize-none" data-testid="contact-message" />
        <button className="bg-gold text-white px-10 py-4 overline hover:bg-neutral-900 transition-colors" data-testid="contact-submit">SEND MESSAGE</button>
      </form>
    </div>
  );
}
