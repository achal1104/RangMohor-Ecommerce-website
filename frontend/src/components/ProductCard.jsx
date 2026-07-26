import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";

export default function ProductCard({ product, index = 0, onQuickView }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWished = wishlist.includes(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
    toast.success(`${product.name} added to cart`);
  };
  const handleWish = (e) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast(isWished ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 8) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] bg-stone-100 dark:bg-neutral-900 overflow-hidden">
          <img src={product.image} alt={product.name} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-white/95 dark:bg-neutral-950/95 backdrop-blur px-3 py-1 overline text-[10px]" data-testid={`badge-${product.id}`}>
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="absolute top-3 right-3 bg-[#FCE4EC] text-[#D42768] px-3 py-1 overline text-[10px]">
              -{product.discount}%
            </span>
          )}
          <div className="absolute top-3 right-3 mt-9 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button onClick={handleWish} className={`w-9 h-9 flex items-center justify-center bg-white dark:bg-neutral-950 shadow-sm hover:bg-gold hover:text-white transition-colors ${isWished ? "text-gold" : ""}`}
              data-testid={`wishlist-btn-${product.id}`} aria-label="Wishlist">
              <Heart size={15} fill={isWished ? "currentColor" : "none"} />
            </button>
            {onQuickView && (
              <button onClick={(e) => { e.preventDefault(); onQuickView(product); }}
                className="w-9 h-9 flex items-center justify-center bg-white dark:bg-neutral-950 shadow-sm hover:bg-gold hover:text-white transition-colors"
                data-testid={`quickview-btn-${product.id}`} aria-label="Quick view">
                <Eye size={15} />
              </button>
            )}
          </div>
          <button onClick={handleAdd}
            className="absolute left-3 right-3 bottom-3 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center gap-2 text-[11px] tracking-luxe translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gold hover:text-white"
            data-testid={`add-to-cart-btn-${product.id}`}>
            <ShoppingBag size={14} /> ADD TO CART
          </button>
        </div>
        <div className="pt-4 px-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Star size={12} className="fill-gold text-gold" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">{product.rating} <span className="text-neutral-400">({product.reviews})</span></span>
          </div>
          <h3 className="font-display text-lg leading-tight text-neutral-900 dark:text-neutral-100 mb-1">{product.name}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mb-2">{product.short}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-medium text-neutral-900 dark:text-neutral-100">₹{product.price.toLocaleString()}</span>
            {product.mrp > product.price && <span className="text-xs text-neutral-400 line-through">₹{product.mrp.toLocaleString()}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
