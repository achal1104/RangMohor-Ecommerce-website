import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter, Mail } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return toast.error("Please enter a valid email");
    setEmail("");
    toast.success("Welcome to Rang Mohor — check your inbox");
  };
  return (
    <footer className="bg-neutral-950 text-neutral-300 mt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="mb-6">
            <img src="/rang-mohor-logo-transparent.png" alt="Rang Mohor" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-6">
            Editorial wedding return gifts, thoughtfully composed. Each keepsake is made in small batches by artisans across India.
          </p>
          <form onSubmit={subscribe} className="flex items-center border-b border-neutral-700 pb-2 max-w-sm" data-testid="newsletter-form">
            <Mail size={16} className="text-gold mr-3" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email address"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-500" data-testid="newsletter-email" />
            <button className="overline text-gold hover:text-white transition-colors" data-testid="newsletter-submit">JOIN</button>
          </form>
        </div>

        <div>
          <h4 className="overline text-white mb-5">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            <li><Link to="/categories" className="hover:text-gold transition-colors">Categories</Link></li>
            <li><Link to="/shop" className="hover:text-gold transition-colors">Shop All</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="overline text-white mb-5">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
            <li><Link to="/orders" className="hover:text-gold transition-colors">Order Tracking</Link></li>
            <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="overline text-white mb-5">Follow</h4>
          <div className="flex gap-4 mb-5">
            <a href="#" className="hover:text-gold transition-colors" data-testid="social-instagram"><Instagram size={18} /></a>
            <a href="#" className="hover:text-gold transition-colors" data-testid="social-facebook"><Facebook size={18} /></a>
            <a href="#" className="hover:text-gold transition-colors" data-testid="social-youtube"><Youtube size={18} /></a>
            <a href="#" className="hover:text-gold transition-colors" data-testid="social-twitter"><Twitter size={18} /></a>
          </div>
          <p className="text-xs text-neutral-500">hello@rangmohor.gifts<br/>+91 98100 22 000</p>
        </div>
      </div>
      <div className="border-t border-neutral-900">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Rang Mohor Atelier. All rights reserved.</p>
          <p>Crafted with care in India · Ships worldwide</p>
        </div>
      </div>
    </footer>
  );
}
