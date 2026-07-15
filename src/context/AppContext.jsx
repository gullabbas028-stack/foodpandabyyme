import React, { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [location, setLocation] = useState("Islamabad, Pakistan");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState(null);
  const [user, setUser] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  }, []);

  const addToCart = useCallback((item, restaurant) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, image: restaurant.image, qty: 1, restaurantName: restaurant.name }];
    });
    showToast(`${item.name} added to cart 🛒`);
  }, [showToast]);

  const removeFromCart = useCallback((itemId) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === itemId);
      if (existing && existing.qty > 1) {
        return prev.map((c) => c.id === itemId ? { ...c, qty: c.qty - 1 } : c);
      }
      return prev.filter((c) => c.id !== itemId);
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);
  const signIn = useCallback((name, email) => setUser({ name, email }), []);
  const signOut = useCallback(() => setUser(null), []);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{
      page, setPage,
      cart, addToCart, removeFromCart, clearCart,
      cartCount, cartTotal,
      activeRestaurant, setActiveRestaurant,
      location, setLocation,
      searchQuery, setSearchQuery,
      toastMsg,
      user, signIn, signOut, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
