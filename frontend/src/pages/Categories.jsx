import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../data/products";

export default function Categories() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <div className="mb-14">
        <p className="overline text-gold mb-3">EXPLORE</p>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl">Celebrate • Gift • Decorate • Cherish</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-xl">A little more meaning in
every purchase

At RangMohor, we want
shopping to feel personal.

Whether you are preparing
for a celebration, refreshing
your home, searching for
the perfect gift or simply
treating yourself.

We hope you find yourself
something that speaks to you.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: (i % 6) * 0.06, duration: 0.6 }}>
            <Link to={`/category/${c.slug}`} className="group block" data-testid={`cat-card-${c.slug}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-neutral-900">
                <img src={c.image} alt={c.name} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <p className="absolute top-4 left-4 overline text-white/90">{String(i + 1).padStart(2, "0")}</p>
              </div>
              <div className="pt-5">
                <h3 className="font-display text-2xl mb-1 group-hover:text-gold transition-colors">{c.name}</h3>
                <p className="text-sm text-neutral-500">{c.tagline}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
