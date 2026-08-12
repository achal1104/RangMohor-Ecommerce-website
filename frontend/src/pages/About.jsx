import { motion } from "framer-motion";

export default function About() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src="https://images.pexels.com/photos/27818308/pexels-photo-27818308.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full flex flex-col justify-end pb-14 text-white">
          <p className="overline text-white/85 mb-3">Why RangMohor</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight max-w-3xl">We celebrate the skill and creativity behind <br/><em className="italic text-[#F7E7CE]">handmade products.</em></h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-20 space-y-8 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p>Every product is carefully created for quality, beauty & uniqueness, made to be loved.Our products are more than things; they are pieces you can enjoy, use, gift & cherish.</p>
      <p>A place where tradition meets modern style.Discover our elegant collection of handmade products, wedding essentials & fashion accessories designed for both everyday elegance & special occasions.</p>
      </section>

      <section className="bg-[#F9C8A5] dark:bg-neutral-900 py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-10 text-center">
          {[{ n: "40+", t: "Artisan partners" }, { n: "12,000+", t: "Gifts shipped" }, { n: "9 cities", t: "Origin ateliers" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="font-display text-5xl md:text-6xl mb-2 text-plum">{s.n}</p>
              <p className="overline text-plum/80">{s.t}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
