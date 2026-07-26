import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { cart, wishlist, user, dark, setDark } = useApp();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const results = q.length > 1 ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : [];

  return (
    <>
      <div className="bg-neutral-900 text-neutral-100 text-[11px] tracking-luxe py-2 text-center overline">
        Complimentary gifting concierge · Free shipping over ₹2,500 · Made in India
      </div>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-40 transition-colors duration-500 ${scrolled ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-stone-200 dark:border-neutral-800" : "bg-transparent"}`}
        data-testid="site-header"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center gap-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} data-testid="mobile-menu-btn"><Menu size={22} /></button>

          <Link to="/" className="flex items-center group" data-testid="logo-link">
            <img src="/rang-mohor-logo.png" alt="Rang Mohor" className="h-11 md:h-14 w-auto object-contain rounded-sm shadow-sm transition-transform duration-500 group-hover:scale-105 block dark:hidden" />
            <img src="/rang-mohor-logo-transparent.png" alt="Rang Mohor" className="h-11 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105 hidden dark:block" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 ml-8">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"} data-testid={`nav-${n.label.toLowerCase()}`}
                className={({ isActive }) => `text-[13px] tracking-wider uppercase transition-colors ${isActive ? "text-gold" : "text-neutral-700 dark:text-neutral-300 hover:text-gold"}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 md:gap-3">
            <button onClick={() => setSearchOpen((v) => !v)} className="p-2 hover:text-gold transition-colors" data-testid="search-toggle-btn" aria-label="Search"><Search size={19} /></button>
            <button onClick={() => setDark(!dark)} className="p-2 hover:text-gold transition-colors" data-testid="dark-mode-toggle" aria-label="Toggle dark mode">{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
            <Link to="/wishlist" className="p-2 hover:text-gold transition-colors relative" data-testid="wishlist-icon-link" aria-label="Wishlist">
              <Heart size={19} />
              {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-gold text-white rounded-full w-4 h-4 flex items-center justify-center">{wishlist.length}</span>}
            </Link>
            <Link to={user ? "/profile" : "/auth"} className="p-2 hover:text-gold transition-colors hidden md:block" data-testid="account-link" aria-label="Account"><User size={19} /></Link>
            <Link to="/cart" className="p-2 hover:text-gold transition-colors relative" data-testid="cart-icon-link" aria-label="Cart">
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-gold text-white rounded-full w-4 h-4 flex items-center justify-center" data-testid="cart-count">{cartCount}</span>}
            </Link>
            {!user && <Link to="/auth" className="hidden md:inline-flex ml-2 px-4 py-2 border border-neutral-900 dark:border-neutral-200 text-[12px] tracking-luxe hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-200 dark:hover:text-neutral-900 transition-colors" data-testid="login-btn">LOGIN</Link>}
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="border-t border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && q) { navigate(`/shop?q=${encodeURIComponent(q)}`); setSearchOpen(false); setQ(""); } }}
                  placeholder="Search 'candles', 'silver', 'hampers'..."
                  className="w-full bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 text-lg outline-none placeholder:text-neutral-400 font-display"
                  data-testid="search-input" />
                {results.length > 0 && (
                  <div className="mt-4 space-y-1">
                    {results.map((p) => (
                      <button key={p.id} onClick={() => { navigate(`/product/${p.id}`); setSearchOpen(false); setQ(""); }}
                        className="w-full flex items-center gap-4 p-2 hover:bg-stone-100 dark:hover:bg-neutral-900 text-left" data-testid={`search-result-${p.id}`}>
                        <img src={p.image} alt="" className="w-12 h-12 object-cover" />
                        <div>
                          <div className="text-sm">{p.name}</div>
                          <div className="overline text-neutral-500">₹{p.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.35 }}
              onClick={(e) => e.stopPropagation()} className="w-[82%] max-w-sm h-full bg-ivory dark:bg-neutral-950 p-8 flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <img src="/rang-mohor-logo-pink.png" alt="Rang Mohor" className="h-10 w-auto object-contain dark:brightness-0 dark:invert" />
                <button onClick={() => setOpen(false)} data-testid="mobile-menu-close"><X /></button>
              </div>
              <nav className="flex flex-col gap-4">
                {nav.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                    className="font-display text-3xl hover:text-gold transition-colors" data-testid={`mobile-nav-${n.label.toLowerCase()}`}>{n.label}</Link>
                ))}
                <div className="h-px bg-stone-300 dark:bg-neutral-800 my-4" />
                <Link to={user ? "/profile" : "/auth"} onClick={() => setOpen(false)} className="text-sm tracking-luxe">{user ? "MY ACCOUNT" : "LOGIN / REGISTER"}</Link>
                <Link to="/orders" onClick={() => setOpen(false)} className="text-sm tracking-luxe">ORDERS</Link>
                <Link to="/faq" onClick={() => setOpen(false)} className="text-sm tracking-luxe">FAQ</Link>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
