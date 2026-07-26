import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery is 5–7 business days across India. Express is 2–3 days, and our White-Glove concierge offers a named delivery slot. International orders take 10–14 days." },
  { q: "Can I customize a hamper?", a: "Yes — we offer bespoke curation for orders of 25+ boxes. Reach out through the Contact page with your budget, palette, and vision, and our stylist will compose a proposal within 48 hours." },
  { q: "What is your return policy?", a: "We offer 7-day exchange or store credit on unopened gifts. Personalized items and food-based hampers are final sale. Full policy on the Terms page." },
  { q: "Do you ship worldwide?", a: "Yes. We ship to 40+ countries via DHL Express. International shipping is calculated at checkout." },
  { q: "Are your materials sustainable?", a: "Wherever possible, yes. We use recycled paper, hemp twine, seed-paper inserts, and refillable ceramic vessels. Our 'Eco-Friendly Gifts' collection is our most conscious edit." },
  { q: "Can I track my order?", a: "Absolutely. You'll receive a tracking link via SMS and email within 24 hours of dispatch. Signed-in members can also view order status under 'Orders'." },
  { q: "Do you offer gift-wrapping?", a: "Every Rang Mohor order is wrapped in our signature ivory linen paper, sealed with wax, and tied in gold satin — at no extra cost." },
  { q: "How do I redeem a coupon?", a: "Enter the code in your cart's 'Coupon Code' box and click APPLY. Try MOHOR10 for 10% off your first order." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20">
      <p className="overline text-gold mb-3">HELP CENTER</p>
      <h1 className="font-display text-4xl md:text-6xl tracking-tight mb-12">Frequently Asked</h1>
      <div className="divide-y divide-stone-200 dark:divide-neutral-800 border-t border-b border-stone-200 dark:border-neutral-800">
        {faqs.map((f, i) => (
          <div key={i} className="py-6" data-testid={`faq-item-${i}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 text-left">
              <span className="font-display text-lg md:text-xl pr-4">{f.q}</span>
              {open === i ? <Minus size={18} className="text-gold shrink-0" /> : <Plus size={18} className="text-gold shrink-0" />}
            </button>
            {open === i && <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4 max-w-2xl">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
