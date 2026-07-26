import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import { findProduct } from "../data/products";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart } = useApp();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const items = useMemo(() => cart.map((c) => ({ ...c, product: findProduct(c.id) })).filter((c) => c.product), [cart]);
  const subtotal = items.reduce((s, c) => s + c.product.price * c.qty, 0);
  const shipping = subtotal > 2500 ? 0 : (items.length ? 149 : 0);
  const total = Math.max(0, subtotal - discount + shipping);

  const applyCoupon = () => {
    const codes = { MOHOR10: 0.1, LOVE20: 0.2, WEDDING15: 0.15 };
    const c = codes[coupon.toUpperCase().trim()];
    if (!c) { setDiscount(0); return toast.error("Invalid code. Try MOHOR10, LOVE20, or WEDDING15"); }
    setDiscount(Math.round(subtotal * c));
    toast.success(`Coupon applied — ${Math.round(c * 100)}% off`);
  };

  if (items.length === 0) return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <ShoppingBag size={40} className="mx-auto text-neutral-300 mb-6" />
      <h1 className="font-display text-4xl mb-3">Your cart is empty</h1>
      <p className="text-neutral-500 mb-8">A little emptiness before the celebration.</p>
      <Link to="/shop" className="inline-block bg-gold text-white px-8 py-4 overline hover:bg-neutral-900" data-testid="cart-empty-shop-btn">CONTINUE SHOPPING</Link>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <h1 className="font-display text-4xl md:text-6xl tracking-tight mb-12" data-testid="cart-title">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 divide-y divide-stone-200 dark:divide-neutral-800">
          {items.map((c) => (
            <div key={c.id} className="py-6 flex gap-5" data-testid={`cart-item-${c.id}`}>
              <Link to={`/product/${c.id}`} className="w-24 md:w-32 aspect-square bg-stone-100 shrink-0">
                <img src={c.product.image} alt={c.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link to={`/product/${c.id}`} className="font-display text-lg md:text-xl hover:text-gold">{c.product.name}</Link>
                    <p className="overline text-neutral-500 mt-1">{c.product.category.replace(/-/g, " ")}</p>
                  </div>
                  <button onClick={() => { removeFromCart(c.id); toast("Removed"); }} className="text-neutral-500 hover:text-gold" data-testid={`remove-${c.id}`}><X size={18} /></button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="inline-flex items-center border border-stone-300 dark:border-neutral-700">
                    <button onClick={() => updateQty(c.id, c.qty - 1)} className="w-9 h-9 hover:bg-stone-100 dark:hover:bg-neutral-900" data-testid={`dec-${c.id}`}><Minus size={13} className="mx-auto" /></button>
                    <span className="w-8 text-center text-sm">{c.qty}</span>
                    <button onClick={() => updateQty(c.id, c.qty + 1)} className="w-9 h-9 hover:bg-stone-100 dark:hover:bg-neutral-900" data-testid={`inc-${c.id}`}><Plus size={13} className="mx-auto" /></button>
                  </div>
                  <span className="font-display text-lg" data-testid={`line-total-${c.id}`}>₹{(c.product.price * c.qty).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-6">
            <Link to="/shop" className="overline text-gold hover:underline" data-testid="continue-shopping">← CONTINUE SHOPPING</Link>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 p-6 md:p-8 sticky top-32">
            <h2 className="font-display text-2xl mb-6">Order Summary</h2>
            <div className="flex items-center border border-stone-300 dark:border-neutral-700 mb-6">
              <Tag size={14} className="ml-3 text-gold" />
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code"
                className="flex-1 bg-transparent px-3 py-3 text-sm outline-none" data-testid="coupon-input" />
              <button onClick={applyCoupon} className="px-4 py-3 overline hover:bg-gold hover:text-white transition-colors" data-testid="apply-coupon">APPLY</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span data-testid="summary-subtotal">₹{subtotal.toLocaleString()}</span></div>
              {discount > 0 && <div className="flex justify-between text-gold"><span>Discount</span><span>-₹{discount.toLocaleString()}</span></div>}
              <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="h-px bg-stone-200 dark:bg-neutral-800 my-4" />
              <div className="flex justify-between font-display text-2xl"><span>Total</span><span data-testid="summary-total">₹{total.toLocaleString()}</span></div>
            </div>
            <button onClick={() => navigate("/checkout")} className="mt-8 w-full bg-gold text-white py-4 overline hover:bg-neutral-900 transition-colors" data-testid="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
