import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";

export default function Auth() {
  const [mode, setMode] = useState("login"); // login | register | forgot
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useApp();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (mode === "forgot") {
      if (!form.email) return toast.error("Enter your email");
      toast.success("Reset link sent — check your inbox");
      setMode("login");
      return;
    }
    if (mode === "register" && !form.name) return toast.error("Name required");
    if (!form.email || !form.password) return toast.error("Email and password required");
    login(form.name || form.email.split("@")[0], form.email);
    toast.success(mode === "login" ? "Welcome back" : "Welcome to Rang Mohor");
    navigate("/profile");
  };

  const input = "w-full bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none focus:border-gold";

  return (
    <div className="min-h-[70vh] max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative aspect-[4/5] hidden lg:block overflow-hidden">
        <img src="https://images.pexels.com/photos/15548880/pexels-photo-15548880.jpeg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="overline mb-3 text-white/85">MEMBERSHIP</p>
          <h2 className="font-display text-3xl leading-snug">Save your favorites. Track orders. Access private sales.</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full">
        <p className="overline text-gold mb-3">{mode === "login" ? "SIGN IN" : mode === "register" ? "CREATE ACCOUNT" : "RESET PASSWORD"}</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-10">
          {mode === "login" ? "Welcome back." : mode === "register" ? "Join Rang Mohor." : "Forgot your password?"}
        </h1>

        <form onSubmit={submit} className="space-y-6" data-testid="auth-form">
          {mode === "register" && (
            <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} data-testid="auth-name" />
          )}
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} data-testid="auth-email" />
          {mode !== "forgot" && (
            <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={input} data-testid="auth-password" />
          )}
          <button className="w-full bg-gold text-white py-4 overline hover:bg-neutral-900 transition-colors" data-testid="auth-submit">
            {mode === "login" ? "SIGN IN" : mode === "register" ? "CREATE ACCOUNT" : "SEND RESET LINK"}
          </button>
        </form>

        <div className="mt-8 space-y-3 text-sm">
          {mode === "login" && (
            <>
              <button onClick={() => setMode("forgot")} className="block text-neutral-600 dark:text-neutral-400 hover:text-gold" data-testid="switch-forgot">Forgot password?</button>
              <button onClick={() => setMode("register")} className="block text-neutral-600 dark:text-neutral-400 hover:text-gold" data-testid="switch-register">New here? Create an account →</button>
            </>
          )}
          {mode === "register" && <button onClick={() => setMode("login")} className="text-neutral-600 dark:text-neutral-400 hover:text-gold" data-testid="switch-login">Already have an account? Sign in →</button>}
          {mode === "forgot" && <button onClick={() => setMode("login")} className="text-neutral-600 dark:text-neutral-400 hover:text-gold" data-testid="switch-back">← Back to sign in</button>}
        </div>
      </div>
    </div>
  );
}
