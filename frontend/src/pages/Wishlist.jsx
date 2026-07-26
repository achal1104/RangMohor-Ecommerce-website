import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useApp } from "../context/AppContext";

export default function Wishlist() {
  const { wishlist } = useApp();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <p className="overline text-gold mb-3">SAVED FOR LATER</p>
      <h1 className="font-display text-4xl md:text-6xl tracking-tight mb-12">Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-center py-24">
          <Heart size={40} className="mx-auto text-neutral-300 mb-6" />
          <p className="font-display text-2xl mb-3">No favorites yet</p>
          <p className="text-neutral-500 mb-8">Tap the heart on any gift to save it here.</p>
          <Link to="/shop" className="inline-block bg-gold text-white px-8 py-4 overline hover:bg-neutral-900" data-testid="wishlist-shop-btn">EXPLORE SHOP</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
