import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Truck, Zap, Package, CreditCard, Wallet, Banknote } from "lucide-react";
import { useApp } from "../context/AppContext";
import { findProduct } from "../data/products";

const delivery = [
  { id: "standard", name: "Standard", days: "5–7 days", cost: 0, icon: Truck },
  { id: "express", name: "Express", days: "2–3 days", cost: 199, icon: Zap },
  { id: "white-glove", name: "White-Glove Concierge", days: "Named delivery slot", cost: 499, icon: Package },
];
const payments = [
  { id: "card", name: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", name: "UPI / Netbanking", icon: Wallet },
  { id: "cod", name: "Cash on Delivery", icon: Banknote },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, placeOrder, user } = useApp();
  const [addr, setAddr] = useState({ name: user?.name || "", email: user?.email || "", phone: "", line1: "", city: "", state: "", pin: "" });
  const [dOpt, setDOpt] = useState("standard");
  const [pOpt, setPOpt] = useState("card");

  const items = useMemo(() => cart.map((c) => ({ ...c, product: findProduct(c.id) })).filter((c) => c.product), [cart]);
  const subtotal = items.reduce((s, c) => s + c.product.price * c.qty, 0);
  const deliveryCost = delivery.find((d) => d.id === dOpt)?.cost || 0;
  const total = subtotal + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl mb-4">Your cart is empty</h1>
        <Link to="/shop" className="overline text-gold">← BACK TO SHOP</Link>
      </div>
    );
  }

  const place = (e) => {
    e.preventDefault();
    if (!addr.name || !addr.email || !addr.phone || !addr.line1 || !addr.city || !addr.pin) return toast.error("Please complete your shipping address");
    const order = placeOrder(items.map((i) => ({ id: i.id, name: i.product.name, qty: i.qty, price: i.product.price, image: i.product.image })), total, addr);
    toast.success(`Order ${order.id} placed successfully`);
    navigate("/orders");
  };

  const input = "w-full bg-transparent border-b border-stone-300 dark:border-neutral-700 py-3 outline-none focus:border-gold";

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-5 gap-12">
      <form onSubmit={place} className="lg:col-span-3 space-y-12" data-testid="checkout-form">
        <div>
          <h2 className="overline text-gold mb-6">01 · SHIPPING ADDRESS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input required placeholder="Full name*" value={addr.name} onChange={(e) => setAddr({ ...addr, name: e.target.value })} className={input} data-testid="ship-name" />
            <input required type="email" placeholder="Email*" value={addr.email} onChange={(e) => setAddr({ ...addr, email: e.target.value })} className={input} data-testid="ship-email" />
            <input required placeholder="Phone*" value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })} className={input} data-testid="ship-phone" />
            <input required placeholder="PIN code*" value={addr.pin} onChange={(e) => setAddr({ ...addr, pin: e.target.value })} className={input} data-testid="ship-pin" />
            <input required placeholder="Address*" value={addr.line1} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} className={`${input} md:col-span-2`} data-testid="ship-line1" />
            <input required placeholder="City*" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} className={input} data-testid="ship-city" />
            <input placeholder="State" value={addr.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })} className={input} data-testid="ship-state" />
          </div>
        </div>

        <div>
          <h2 className="overline text-gold mb-6">02 · DELIVERY OPTION</h2>
          <div className="space-y-3">
            {delivery.map((d) => (
              <label key={d.id} className={`flex items-center gap-4 p-5 border cursor-pointer transition-colors ${dOpt === d.id ? "border-gold" : "border-stone-200 dark:border-neutral-800"}`} data-testid={`delivery-${d.id}`}>
                <input type="radio" name="delivery" checked={dOpt === d.id} onChange={() => setDOpt(d.id)} className="accent-[#D4AF37]" />
                <d.icon size={18} className="text-gold" />
                <div className="flex-1">
                  <p className="font-medium">{d.name}</p>
                  <p className="text-xs text-neutral-500">{d.days}</p>
                </div>
                <span className="font-display">{d.cost === 0 ? "FREE" : `₹${d.cost}`}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="overline text-gold mb-6">03 · PAYMENT METHOD</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {payments.map((p) => (
              <label key={p.id} className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${pOpt === p.id ? "border-gold" : "border-stone-200 dark:border-neutral-800"}`} data-testid={`payment-${p.id}`}>
                <input type="radio" name="payment" checked={pOpt === p.id} onChange={() => setPOpt(p.id)} className="accent-[#D4AF37]" />
                <p.icon size={16} className="text-gold" />
                <span className="text-sm">{p.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full md:w-auto bg-gold text-white px-16 py-5 overline hover:bg-neutral-900 transition-colors" data-testid="place-order-btn">PLACE ORDER · ₹{total.toLocaleString()}</button>
      </form>

      <aside className="lg:col-span-2">
        <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 p-6 md:p-8 sticky top-32">
          <h2 className="font-display text-2xl mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6 max-h-[280px] overflow-y-auto">
            {items.map((c) => (
              <div key={c.id} className="flex gap-3">
                <img src={c.product.image} alt="" className="w-14 h-14 object-cover" />
                <div className="flex-1 text-sm">
                  <p>{c.product.name}</p>
                  <p className="text-neutral-500 text-xs">Qty {c.qty}</p>
                </div>
                <span className="text-sm">₹{(c.product.price * c.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-stone-200 dark:bg-neutral-800 mb-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Delivery</span><span>{deliveryCost === 0 ? "FREE" : `₹${deliveryCost}`}</span></div>
            <div className="flex justify-between font-display text-xl pt-3 border-t border-stone-200 dark:border-neutral-800"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
          </div>
        </div>
      </aside>
    </div>
  );
}
