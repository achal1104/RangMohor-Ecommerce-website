import { motion } from "framer-motion";

export default function About() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src="https://images.pexels.com/photos/27818308/pexels-photo-27818308.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 h-full flex flex-col justify-end pb-14 text-white">
          <p className="overline text-white/85 mb-3">OUR STORY</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight max-w-3xl">A love letter, written<br/><em className="italic text-[#F7E7CE]">in gifts.</em></h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-20 space-y-8 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p>Rang Mohor began in 2018 in a small studio in Jaipur, with three friends, a foundry contact, and a stubborn belief: wedding favors deserved to feel like heirlooms, not afterthoughts.</p>
        <p>Since then we have grown into an atelier of 40+ artisan families across India — brass workers in Moradabad, glass blowers in Firozabad, block printers in Sanganer, candle-makers in Auroville. Every piece we ship is composed by hand, by name, by story.</p>
        <p>We believe a wedding is not just a day — it is a memory that must travel home. That is what we make: memories, in boxes.</p>
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
