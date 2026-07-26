import { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

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

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
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
