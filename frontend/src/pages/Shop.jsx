import { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ArrowUpRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

// ---------------------------------------------------------------------------
// Shop Our Collection — data
// Config-driven so the cards render via .map() instead of repeated markup.
// `slug` maps to the existing category system (/shop/:slug) wherever a real
// category exists. Bestsellers has no dedicated category, so it links back
// to /shop with a ?sort=popular query instead (handled below).
// Replace the placeholder `image` paths with real photography (ideally a
// 4:5 crop — the card is designed around a tall image).
// ---------------------------------------------------------------------------
const shopCollections = [
  {
    name: "Handcrafted Bags",
    slug: "handcrafted-bags",
    description: "Unique designs made for everyday style",
    image: "https://images.unsplash.com/photo-1637759292654-a12cb2be085e?w=900&q=80&auto=format&fit=crop",
    route: "/shop/handcrafted-bags",
  },
  {
    name: "Bestsellers",
    slug: "bestsellers",
    description: "Discover the pieces our customers love",
    image: "https://images.unsplash.com/photo-1769116416641-e714b71851e8?w=900&q=80&auto=format&fit=crop",
    route: "/shop?sort=popular",
  },
];

// ---------------------------------------------------------------------------
// Indian Wedding Products — featured showcase
// A dedicated hero-style section: heading + subtext pulled straight from the
// collection copy, plus a 5-image gallery instead of a single card image.
// Swap these placeholder paths for real wedding-collection photography.
// ---------------------------------------------------------------------------
const weddingShowcase = {
  name: "Indian Wedding Products",
  description: "Beautiful details for beautiful celebration",
  route: "/shop/indian-wedding-products",
  images: [
    "https://images.unsplash.com/photo-1522389903690-657f5318cf1b?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1711180674489-c5b50e0e55db?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=80&auto=format&fit=crop",
  ],
};
function WeddingShowcase({ data }) {
  const { name, description, route, images } = data;
  const [main, ...rest] = images;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-16 md:mb-20"
    >
      {/* Heading + subtext */}
      <div className="mb-6 md:mb-8 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="overline text-gold mb-3">FEATURED COLLECTION</p>
          <h3 className="font-display text-3xl md:text-5xl tracking-tight">{name}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mt-3 max-w-lg">{description}</p>
        </div>
        <Link
          to={route}
          className="overline text-gold hover:underline whitespace-nowrap"
          data-testid="wedding-showcase-view-all"
        >
          VIEW ALL &rarr;
        </Link>
      </div>

      {/* 5-image gallery: one large image + four smaller ones */}
      <Link to={route} className="group grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" data-testid="wedding-showcase-gallery">
        <div className="col-span-2 row-span-2 relative overflow-hidden aspect-[4/5] md:aspect-auto bg-stone-100 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800">
          <img
            src={main}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        </div>
        {rest.map((src, i) => (
          <div
            key={src + i}
            className="relative overflow-hidden aspect-square bg-stone-100 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800"
          >
            <img
              src={src}
              alt={`${name} ${i + 2}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Home Decor / Kitchen & Dining / Gifting — 4-image showcases
// Same "heading + subtext + image gallery" idea as the wedding showcase
// above, but with a clean 4-up grid instead of the 5-image bento layout.
// Images are real, free-to-use Unsplash photos (Unsplash License — free for
// commercial use, no attribution required) so they render out of the box;
// swap them for your own product photography whenever you're ready.
// ---------------------------------------------------------------------------
const homeDecorShowcase = {
  name: "Home Decor",
  description: "Add warmth, colour and character to your space",
  route: "/shop/home-decor",
  images: [
    "https://images.unsplash.com/photo-1615873968403-89e068629265?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1768488314310-3742b3c75579?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1741913803066-97714125c7cd?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1671177743599-952231ec6846?w=900&q=80&auto=format&fit=crop",
  ],
};

const kitchenDiningShowcase = {
  name: "Kitchen & Dining Essentials",
  description: "Thoughtful pieces for everyday moments & special gatherings",
  route: "/shop/kitchen-dining",
  images: [
    "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1480889856166-56e89b80386c?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551807306-4bcd16b92a41?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560228083-e0fd2410ce25?w=900&q=80&auto=format&fit=crop",
  ],
};

const giftingShowcase = {
  name: "Gifting",
  description: "Gifts that feel personal, meaningful  Bestsellers – Discover the pieces our customers love most",
  route: "/shop/gifting",
  images: [
    "https://images.unsplash.com/photo-1702066054585-94f770dfd698?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1764385827352-78c20131fd47?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546512347-b93b3f59e231?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1545608444-02955700b76d?w=900&q=80&auto=format&fit=crop",
  ],
};
function GridShowcase({ data }) {
  const { name, description, route, images } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-16 md:mb-20"
    >
      {/* Heading + subtext */}
      <div className="mb-6 md:mb-8 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h3 className="font-display text-3xl md:text-5xl tracking-tight">{name}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mt-3 max-w-lg">{description}</p>
        </div>
        <Link
          to={route}
          className="overline text-gold hover:underline whitespace-nowrap"
          data-testid={`showcase-view-all-${data.route}`}
        >
          VIEW ALL &rarr;
        </Link>
      </div>

      {/* 4-image grid: fully visible photos, no overlay */}
      <Link to={route} className="group grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {images.map((src, i) => (
          <div
            key={src + i}
            className="relative overflow-hidden aspect-square bg-stone-100 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800"
          >
            <img
              src={src}
              alt={`${name} ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Shop Our Collection — card
// ---------------------------------------------------------------------------
function CollectionCard({ collection, index = 0 }) {
  const { name, description, image, route } = collection;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link
        to={route}
        className="group block border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors duration-300 hover:border-gold/60"
        data-testid={`collection-card-${collection.slug}`}
      >
        {/* Section 1 — Image (fully visible, no overlay) */}
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-neutral-900">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          {/* Fine gold accent line on hover */}
          <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
        </div>

        {/* Section 2 — Heading */}
        <div className="px-6 pt-6 md:px-7 md:pt-7">
          <h3 className="font-display text-xl md:text-2xl tracking-tight transition-colors duration-300 group-hover:text-gold">
            {name}
          </h3>
        </div>

        {/* Section 3 — Description + CTA */}
        <div className="px-6 pb-6 pt-2 md:px-7 md:pb-7">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-2 overline text-neutral-500 dark:text-neutral-500 transition-colors duration-300 group-hover:text-gold">
            <span>EXPLORE COLLECTION</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Shop page
// ---------------------------------------------------------------------------
export default function Shop() {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [selectedCats, setSelectedCats] = useState(slug ? [slug] : []);
  const [priceMax, setPriceMax] = useState(6000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const perPage = 8;

  useEffect(() => { setSelectedCats(slug ? [slug] : []); setPage(1); }, [slug]);
  useEffect(() => { setPage(1); }, [selectedCats, priceMax, minRating, sort, q]);

  // Pick up ?sort=... from the "Bestsellers" collection card (or any deep link)
  useEffect(() => {
    const sortParam = params.get("sort");
    if (sortParam) setSort(sortParam);
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.short.toLowerCase().includes(q.toLowerCase()));
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category));
    list = list.filter((p) => p.price <= priceMax && p.rating >= minRating);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [q, selectedCats, priceMax, minRating, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleCat = (s) => setSelectedCats((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const clearFilters = () => { setSelectedCats([]); setPriceMax(6000); setMinRating(0); setParams({}); };

  const currentCat = slug ? categories.find((c) => c.slug === slug) : null;

  // Only show the curated collection showcase on the top-level /shop view —
  // once someone is inside a category or a search, the filter bar + grid
  // become the focus instead.
  const showCollections = !slug && !q;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      {showCollections && (
        <section className="mb-20" aria-label="Shop our collection">
          <div className="mb-10 md:mb-12 text-center md:text-left">
            <p className="overline text-gold mb-3">CURATED FOR YOU</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              Shop Our Collection
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-3 max-w-xl mx-auto md:mx-0">
              Handcrafted pieces, curated into collections — each one telling
              its own story.
            </p>
          </div>

          <WeddingShowcase data={weddingShowcase} />
          <GridShowcase data={homeDecorShowcase} />
          <GridShowcase data={kitchenDiningShowcase} />
          <GridShowcase data={giftingShowcase} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {shopCollections.map((collection, i) => (
              <CollectionCard key={collection.slug} collection={collection} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="mb-12">
        <p className="overline text-gold mb-3">{currentCat ? "COLLECTION" : "THE SHOP"}</p>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight">{currentCat ? currentCat.name : q ? `Results for "${q}"` : "All Gifts"}</h1>
        {currentCat && <p className="text-neutral-600 dark:text-neutral-400 mt-3 max-w-xl">{currentCat.tagline}</p>}
      </div>

      <div className="flex items-center justify-between mb-8 border-y border-stone-200 dark:border-neutral-800 py-4">
        <button onClick={() => setFiltersOpen((v) => !v)} className="flex items-center gap-2 overline hover:text-gold" data-testid="toggle-filters">
          <SlidersHorizontal size={14} /> FILTERS {(selectedCats.length > 0 || minRating > 0 || priceMax < 6000) && <span className="text-gold">({selectedCats.length + (minRating > 0 ? 1 : 0) + (priceMax < 6000 ? 1 : 0)})</span>}
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500">{filtered.length} items</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="bg-transparent overline border-0 outline-none cursor-pointer" data-testid="sort-select">
            <option value="popular">SORT: POPULARITY</option>
            <option value="price-asc">PRICE: LOW TO HIGH</option>
            <option value="price-desc">PRICE: HIGH TO LOW</option>
            <option value="rating">RATING</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {filtersOpen && (
          <motion.aside initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4"><h3 className="overline">CATEGORY</h3>
                {(selectedCats.length > 0 || minRating > 0 || priceMax < 6000) && <button onClick={clearFilters} className="text-xs text-gold" data-testid="clear-filters">CLEAR</button>}
              </div>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={selectedCats.includes(c.slug)} onChange={() => toggleCat(c.slug)}
                        className="accent-[#D4AF37]" data-testid={`filter-cat-${c.slug}`} />
                      <span className="text-sm group-hover:text-gold transition-colors">{c.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="overline mb-4">PRICE UP TO ₹{priceMax.toLocaleString()}</h3>
              <input type="range" min={500} max={6000} step={100} value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#D4AF37]" data-testid="filter-price" />
            </div>
            <div>
              <h3 className="overline mb-4">MIN RATING</h3>
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <button key={r} onClick={() => setMinRating(r)}
                    className={`px-3 py-1.5 text-xs border ${minRating === r ? "border-gold text-gold" : "border-stone-300 dark:border-neutral-700"}`}
                    data-testid={`filter-rating-${r}`}>{r === 0 ? "All" : `${r}+`}</button>
                ))}
              </div>
            </div>
          </motion.aside>
        )}

        <div className={filtersOpen ? "lg:col-span-3" : "lg:col-span-4"}>
          {paginated.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-2xl mb-3">No gifts match your filters</p>
              <button onClick={clearFilters} className="overline text-gold hover:underline" data-testid="empty-clear">CLEAR FILTERS</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {paginated.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-14">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 overline text-xs border ${page === i + 1 ? "border-gold text-gold" : "border-stone-300 dark:border-neutral-700 hover:border-gold"}`}
                  data-testid={`page-${i + 1}`}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}