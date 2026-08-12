import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Award, Leaf, Gift } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

const HERO = "https://images.pexels.com/photos/27818308/pexels-photo-27818308.jpeg";

export default function Home() {
  const featured = products.slice(0, 8);
  const bestsellers = products.filter((p) => p.badge === "Bestseller" || p.rating >= 4.8).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
        <img src={HERO} alt="Wedding return gifts" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-24 md:pb-32">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="overline text-white/90 mb-6">THE 2026 EDITION · WEDDING ATELIER</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl">
            Discover something truly special<br /><em className="font-serif italic text-[#F7E7CE]">Where every  </em> piece has a story
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-white/85 text-base md:text-lg font-light mt-6 max-w-xl leading-relaxed">
           We offer a thoughtfully created collection of handcrafted products from elegant fashion accessories and Indian wedding products to home decor and unique gifts.
           Every item is designed to make every moment special.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-10">
            <Link to="/shop" className="group inline-flex items-center gap-3 bg-gold text-white px-8 py-4 text-[12px] tracking-luxe hover:bg-white hover:text-neutral-900 transition-colors" data-testid="hero-shop-now-btn">
              SHOP NOW <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/categories" className="inline-flex items-center gap-3 border border-white/70 text-white px-8 py-4 text-[12px] tracking-luxe hover:bg-white hover:text-neutral-900 transition-colors" data-testid="hero-explore-btn">
              EXPLORE CATEGORIES
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee trust */}
      <section className="border-y border-stone-200 dark:border-neutral-800 py-5 overflow-hidden fade-mask">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[...Array(2)].flatMap((_, r) => ["Handcrafted in India", "Small-batch, always", "Complimentary gift-wrap", "Curated by stylists", "Ships worldwide", "Featured in Vogue", "Since 2018"].map((t, i) => (
            <span key={`${r}-${i}`} className="overline text-neutral-600 dark:text-neutral-400">✦ {t}</span>
          )))}
        </div>
      </section>

      {/* Categories - Bento */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="overline text-gold mb-3">01 · THE COLLECTIONS</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight max-w-xl">Curated for every kind of celebration</h2>
          </div>
          <Link to="/categories" className="overline text-neutral-700 dark:text-neutral-300 hover:text-gold transition-colors" data-testid="see-all-cats">SEE ALL →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {categories.slice(0, 6).map((c, i) => {
            const spans = ["md:col-span-8 aspect-[16/9]", "md:col-span-4 aspect-[4/5]", "md:col-span-4 aspect-[4/5]", "md:col-span-4 aspect-[4/5]", "md:col-span-4 aspect-[4/5]", "md:col-span-12 aspect-[21/9]"];
            return (
              <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className={spans[i] || "md:col-span-4 aspect-[4/5]"}>
                <Link to={`/category/${c.slug}`} className="group relative block w-full h-full overflow-hidden" data-testid={`home-cat-${c.slug}`}>
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <p className="overline text-white/80 mb-2">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-display text-white text-2xl md:text-3xl mb-1">{c.name}</h3>
                    <p className="text-white/80 text-sm">{c.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="overline text-gold mb-3">02 · FEATURED</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">Made to be remembered</h2>
          </div>
          <Link to="/shop" className="overline hover:text-gold" data-testid="see-all-products">VIEW ALL PRODUCTS →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Editorial split */}
      <section className="bg-[#FCE4EC] dark:bg-neutral-900 py-24 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#F9C8A5]/40 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[#F53D82]/10 blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 items-center relative">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="overline text-gold mb-4">THE RANG MOHOR PROMISE</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-6">A gift is a story that arrives at the door.</h2>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-md mb-8">
              We work with 40+ artisan families across India — from a brass foundry in Moradabad to a candle atelier in Auroville — to compose keepsakes that mean something. Every box, every knot, every note, considered.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md">
              {[{ i: Sparkles, t: "Small-batch, hand-finished" }, { i: Award, t: "40+ artisan partners" }, { i: Gift, t: "Complimentary gift wrap" }, { i: Leaf, t: "Sustainable materials" }].map((x, i) => (
                <div key={i} className="flex items-start gap-3">
                  <x.i size={18} className="text-gold mt-0.5" />
                  <span className="text-sm">{x.t}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 gap-4">
            <img src={bestsellers[0]?.image} alt="" className="aspect-[3/4] w-full object-cover translate-y-6" />
            <img src={bestsellers[1]?.image} alt="" className="aspect-[3/4] w-full object-cover -translate-y-6" />
          </motion.div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <div className="mb-14">
          <p className="overline text-gold mb-3">03 · BESTSELLERS</p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">The most-loved keepsakes</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="overline text-gold mb-6">A NOTE FROM OUR COUPLES</p>
        <blockquote className="font-display text-2xl md:text-4xl leading-snug tracking-tight italic">
          “Every guest at our wedding held their Rang Mohor box a little longer than usual. It wasn't a favor — it was a moment.”
        </blockquote>
        <p className="mt-8 overline text-neutral-500">— A Rang Mohor Bride</p>
      </section>
    </div>
  );
}
