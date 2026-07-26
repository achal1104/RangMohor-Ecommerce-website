import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const AppContext = createContext(null);

const KEY = "rangmohor_state_v1";

const loadState = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
};

export function AppProvider({ children }) {
  const initial = loadState() || {};
  const [cart, setCart] = useState(initial.cart || []); // [{id, qty}]
  const [wishlist, setWishlist] = useState(initial.wishlist || []); // [id]
  const [user, setUser] = useState(initial.user || null); // {name, email}
  const [orders, setOrders] = useState(initial.orders || []); // [{id, items, total, date, address}]
  const [addresses, setAddresses] = useState(initial.addresses || []);
  const [dark, setDark] = useState(initial.dark ?? false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, user, orders, addresses, dark }));
  }, [cart, wishlist, user, orders, addresses, dark]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => c.id === id ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { id, qty }];
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    setCart((prev) => qty <= 0 ? prev.filter((c) => c.id !== id) : prev.map((c) => c.id === id ? { ...c, qty } : c));
  }, []);

  const removeFromCart = useCallback((id) => setCart((prev) => prev.filter((c) => c.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  const login = useCallback((name, email) => setUser({ name, email }), []);
  const logout = useCallback(() => setUser(null), []);

  const placeOrder = useCallback((items, total, address) => {
    const order = { id: `ORD-${Date.now().toString().slice(-8)}`, items, total, date: new Date().toISOString(), address, status: "Confirmed" };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  }, []);

  const addAddress = useCallback((addr) => setAddresses((prev) => [...prev, { ...addr, id: `addr-${Date.now()}` }]), []);
  const removeAddress = useCallback((id) => setAddresses((prev) => prev.filter((a) => a.id !== id)), []);

  const value = useMemo(() => ({
    cart, wishlist, user, orders, addresses, dark,
    addToCart, updateQty, removeFromCart, clearCart,
    toggleWishlist, login, logout, placeOrder,
    addAddress, removeAddress, setDark,
  }), [cart, wishlist, user, orders, addresses, dark, addToCart, updateQty, removeFromCart, clearCart, toggleWishlist, login, logout, placeOrder, addAddress, removeAddress]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
