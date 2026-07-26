import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { findProduct, products } from "../data/products";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = findProduct(id);
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState({ show: false, x: 50, y: 50 });

  if (!product) return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-4xl mb-4">Product not found</h1>
      <Link to="/shop" className="overline text-gold">← BACK TO SHOP</Link>
    </div>
  );

  const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
  const isWished = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const reviews = [
    { name: "Meera P.", rating: 5, date: "Jan 2026", text: "Gorgeous. My guests kept asking where I sourced it. The packaging alone is worth it." },
    { name: "Aditya S.", rating: 5, date: "Dec 2025", text: "Delivered in immaculate condition. Feels heirloom-grade, not favor-grade." },
    { name: "Kavya R.", rating: 4, date: "Nov 2025", text: "Very elegant. Slightly smaller than expected but the quality is undeniable." },
  ];

  const handleAdd = () => { addToCart(product.id, qty); toast.success(`${qty} × ${product.name} added to cart`); };
  const handleBuy = () => { addToCart(product.id, qty); navigate("/checkout"); };

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ show: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
      <div className="overline text-neutral-500 mb-8">
        <Link to="/" className="hover:text-gold">HOME</Link> · <Link to="/shop" className="hover:text-gold">SHOP</Link> · <Link to={`/category/${product.category}`} className="hover:text-gold">{product.category.replace(/-/g, " ").toUpperCase()}</Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-3">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`aspect-square overflow-hidden border ${activeImg === i ? "border-gold" : "border-transparent"}`}
                data-testid={`thumb-${i}`}>
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden cursor-crosshair"
            onMouseMove={onMove} onMouseLeave={() => setZoom((z) => ({ ...z, show: false }))}>
            <img src={gallery[activeImg]} alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300"
              style={zoom.show ? { transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: "scale(1.7)" } : {}} />
            {product.badge && <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 overline text-[10px]">{product.badge}</span>}
          </div>
        </div>

        <div className="lg:pt-6">
          <p className="overline text-gold mb-3">{product.category.replace(/-/g, " ").toUpperCase()}</p>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-tight mb-4" data-testid="product-name">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className={s <= Math.round(product.rating) ? "fill-gold text-gold" : "text-neutral-300"} />)}
            </div>
            <span className="text-sm text-neutral-600">{product.rating} · {product.reviews} reviews</span>
          </div>
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-display text-4xl" data-testid="product-price">₹{product.price.toLocaleString()}</span>
            <span className="text-neutral-400 line-through text-lg">₹{product.mrp.toLocaleString()}</span>
            <span className="text-[#D42768] bg-[#FCE4EC] px-3 py-1 overline text-[10px]">-{product.discount}%</span>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="overline">QTY</span>
            <div className="inline-flex items-center border border-stone-300 dark:border-neutral-700">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-11 hover:bg-stone-100 dark:hover:bg-neutral-900" data-testid="qty-minus"><Minus size={14} className="mx-auto" /></button>
              <span className="w-10 text-center" data-testid="qty-value">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-10 h-11 hover:bg-stone-100 dark:hover:bg-neutral-900" data-testid="qty-plus"><Plus size={14} className="mx-auto" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button onClick={handleAdd} className="inline-flex items-center justify-center gap-2 border border-neutral-900 dark:border-white py-4 text-[12px] tracking-luxe hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors" data-testid="detail-add-to-cart-btn">
              <ShoppingBag size={15} /> ADD TO CART
            </button>
            <button onClick={handleBuy} className="inline-flex items-center justify-center gap-2 bg-gold text-white py-4 text-[12px] tracking-luxe hover:bg-neutral-900 transition-colors" data-testid="detail-buy-now-btn">
              BUY NOW
            </button>
          </div>
          <button onClick={() => { toggleWishlist(product.id); toast(isWished ? "Removed from wishlist" : "Added to wishlist"); }}
            className={`inline-flex items-center gap-2 overline hover:text-gold transition-colors ${isWished ? "text-gold" : ""}`} data-testid="detail-wishlist-btn">
            <Heart size={14} fill={isWished ? "currentColor" : "none"} /> {isWished ? "IN WISHLIST" : "ADD TO WISHLIST"}
          </button>

          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-stone-200 dark:border-neutral-800">
            {[{ i: Truck, t: "Free ship > ₹2,500" }, { i: RotateCcw, t: "7-day exchange" }, { i: ShieldCheck, t: "Authenticity assured" }].map((x, i) => (
              <div key={i} className="text-center">
                <x.i size={20} className="text-gold mx-auto mb-2" />
                <p className="text-xs text-neutral-600 dark:text-neutral-400">{x.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-24 pt-16 border-t border-stone-200 dark:border-neutral-800">
        <h2 className="font-display text-3xl md:text-4xl mb-10">Customer reviews</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="border border-stone-200 dark:border-neutral-800 p-6">
              <div className="flex items-center gap-1 mb-3">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className={s <= r.rating ? "fill-gold text-gold" : "text-neutral-300"} />)}</div>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 italic">"{r.text}"</p>
              <p className="overline text-neutral-500">{r.name} · {r.date}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl md:text-4xl mb-10">You may also love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
