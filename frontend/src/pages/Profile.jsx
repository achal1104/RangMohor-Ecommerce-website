import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Package, Heart, MapPin, LogOut, Plus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { user, orders, wishlist, addresses, addAddress, removeAddress, logout } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [addr, setAddr] = useState({ label: "Home", line1: "", city: "", pin: "" });

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Sign in to view profile</h1>
        <Link to="/auth" className="inline-block bg-gold text-white px-8 py-4 overline hover:bg-neutral-900">GO TO LOGIN</Link>
      </div>
    );
  }

  const doLogout = () => { logout(); toast("Signed out"); navigate("/"); };
  const saveAddr = (e) => {
    e.preventDefault();
    if (!addr.line1 || !addr.city || !addr.pin) return toast.error("Complete address");
    addAddress(addr); setAddr({ label: "Home", line1: "", city: "", pin: "" }); toast.success("Address saved");
  };

  const tabs = [
    { k: "profile", label: "Profile", icon: User },
    { k: "orders", label: "Orders", icon: Package },
    { k: "wishlist", label: "Wishlist", icon: Heart },
    { k: "addresses", label: "Addresses", icon: MapPin },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-4 gap-12">
      <aside className="lg:col-span-1">
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-stone-200 dark:border-neutral-800">
          <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-white font-display text-xl">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <p className="font-display text-lg">{user.name}</p>
            <p className="text-xs text-neutral-500">{user.email}</p>
          </div>
        </div>
        <nav className="space-y-1">
          {tabs.map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)} data-testid={`tab-${t.k}`}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${tab === t.k ? "bg-gold text-white" : "hover:bg-stone-100 dark:hover:bg-neutral-900"}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
          <button onClick={doLogout} data-testid="logout-btn" className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-600 hover:text-rose-700"><LogOut size={16} /> Logout</button>
        </nav>
      </aside>

      <div className="lg:col-span-3">
        {tab === "profile" && (
          <div>
            <h1 className="font-display text-4xl mb-8">Account</h1>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <div><p className="overline text-neutral-500 mb-1">NAME</p><p>{user.name}</p></div>
              <div><p className="overline text-neutral-500 mb-1">EMAIL</p><p>{user.email}</p></div>
              <div><p className="overline text-neutral-500 mb-1">MEMBER SINCE</p><p>2026</p></div>
              <div><p className="overline text-neutral-500 mb-1">TIER</p><p className="text-gold">Rang Mohor Insider</p></div>
            </div>
          </div>
        )}
        {tab === "orders" && (
          <div>
            <h1 className="font-display text-4xl mb-8">Orders</h1>
            {orders.length === 0 ? <p className="text-neutral-500">No orders yet. <Link to="/shop" className="text-gold">Start shopping →</Link></p> : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="border border-stone-200 dark:border-neutral-800 p-6" data-testid={`order-${o.id}`}>
                    <div className="flex flex-wrap justify-between gap-2 mb-4">
                      <div>
                        <p className="font-display text-lg">{o.id}</p>
                        <p className="overline text-neutral-500">{new Date(o.date).toLocaleDateString()} · {o.status}</p>
                      </div>
                      <p className="font-display text-xl">₹{o.total.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {o.items.map((i) => <img key={i.id} src={i.image} alt="" className="w-14 h-14 object-cover" />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === "wishlist" && (
          <div>
            <h1 className="font-display text-4xl mb-8">Wishlist</h1>
            <p className="text-neutral-500">You have {wishlist.length} saved items. <Link to="/wishlist" className="text-gold">View wishlist →</Link></p>
          </div>
        )}
        {tab === "addresses" && (
          <div>
            <h1 className="font-display text-4xl mb-8">Addresses</h1>
            <form onSubmit={saveAddr} className="grid md:grid-cols-2 gap-4 mb-10 max-w-2xl" data-testid="address-form">
              <input placeholder="Label (Home/Office)" value={addr.label} onChange={(e) => setAddr({ ...addr, label: e.target.value })} className="bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none" />
              <input placeholder="PIN code" value={addr.pin} onChange={(e) => setAddr({ ...addr, pin: e.target.value })} className="bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none" />
              <input placeholder="Address line" value={addr.line1} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} className="bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none md:col-span-2" />
              <input placeholder="City" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} className="bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none" />
              <button className="md:col-span-2 justify-self-start inline-flex items-center gap-2 bg-gold text-white px-6 py-3 overline hover:bg-neutral-900" data-testid="save-address-btn"><Plus size={14} /> ADD ADDRESS</button>
            </form>
            {addresses.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                {addresses.map((a) => (
                  <div key={a.id} className="p-5 border border-stone-200 dark:border-neutral-800 flex justify-between gap-3">
                    <div>
                      <p className="overline text-gold mb-1">{a.label}</p>
                      <p className="text-sm">{a.line1}, {a.city} — {a.pin}</p>
                    </div>
                    <button onClick={() => removeAddress(a.id)} className="text-neutral-500 hover:text-rose-700" data-testid={`remove-addr-${a.id}`}><Trash2 size={15} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
