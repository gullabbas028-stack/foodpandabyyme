import React, { useState, useMemo } from "react";
import Hero            from "../components/Hero.jsx";
import PromoBanner     from "../components/PromoBanner.jsx";
import CategoryFilter  from "../components/CategoryFilter.jsx";
import RestaurantCard  from "../components/RestaurantCard.jsx";
import { RESTAURANTS } from "../data/restaurants.js";
import { useApp }      from "../context/AppContext.jsx"; // ✅ corrected
import "./HomePage.css";

export default function HomePage() {
  const { searchQuery } = useApp();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return RESTAURANTS.filter((r) => {
      const matchCat = activeCategory === "all" || r.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="homepage">
      <Hero />
      <PromoBanner />

      <div className="container">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        <div className="restaurants-header">
          <h2 className="section-title">
            {searchQuery ? `Results for "${searchQuery}"` : "Restaurants near you"}
          </h2>
          <span className="restaurants-count">{filtered.length} places</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span>😔</span>
            <h3>No restaurants found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <div className="restaurants-grid">
            {filtered.map((r, i) => (
              <div key={r.id} style={{ animationDelay: `${i * 0.07}s` }}>
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">
            🐼 <strong>food</strong>panda
          </div>
          <div className="footer-links">
            <span>About</span>
            <span>Careers</span>
            <span>Partner with us</span>
            <span>Help</span>
          </div>
          <div className="footer-copy">© 2025 foodpanda. Made with ❤️ in Pakistan</div>
        </div>
      </footer>
    </div>
  );
}