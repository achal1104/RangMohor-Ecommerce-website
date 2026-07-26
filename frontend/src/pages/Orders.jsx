import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Orders() {
  const { orders } = useApp();
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
      <p className="overline text-gold mb-3">MY ORDERS</p>
      <h1 className="font-display text-4xl md:text-6xl tracking-tight mb-12">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-center py-24">
          <Package size={40} className="mx-auto text-neutral-300 mb-6" />
          <p className="font-display text-2xl mb-3">No orders yet</p>
          <Link to="/shop" className="inline-block bg-gold text-white px-8 py-4 overline hover:bg-neutral-900" data-testid="orders-shop-btn">START SHOPPING</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div key={o.id} className="border border-stone-200 dark:border-neutral-800 p-6 md:p-8" data-testid={`order-row-${o.id}`}>
              <div className="flex flex-wrap justify-between gap-4 mb-6 pb-4 border-b border-stone-200 dark:border-neutral-800">
                <div>
                  <p className="font-display text-2xl">{o.id}</p>
                  <p className="overline text-neutral-500 mt-1">{new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <div className="text-right">
                  <p className="overline text-gold">{o.status}</p>
                  <p className="font-display text-2xl mt-1">₹{o.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {o.items.map((i) => (
                  <div key={i.id} className="flex gap-3 items-center">
                    <img src={i.image} alt="" className="w-16 h-16 object-cover" />
                    <div className="text-sm">
                      <p className="line-clamp-1">{i.name}</p>
                      <p className="text-neutral-500 text-xs">Qty {i.qty} · ₹{i.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
