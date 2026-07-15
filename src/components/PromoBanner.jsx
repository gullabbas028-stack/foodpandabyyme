// src/components/PromoBanner.jsx
import React, { useState, useEffect } from "react";
import { FOOD_IMAGES, PROMO_BANNERS } from "../data/restaurants";
import "./PromoBanner.css";

export default function PromoBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % PROMO_BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="promo-section container">
      <div className="promo-track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {PROMO_BANNERS.map((b) => (
          <div key={b.id} className="promo-slide" style={{ background: b.bg }}>
            <div className="promo-content">
              <img className="promo-emoji" src={b.id === 3 ? FOOD_IMAGES.biryani : b.id === 2 ? FOOD_IMAGES.dessert : FOOD_IMAGES.shawarma} alt="" />
              <div>
                <div className="promo-title">{b.title}</div>
                <div className="promo-sub">{b.subtitle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="promo-dots">
        {PROMO_BANNERS.map((_, i) => (
          <button
            key={i}
            className={`promo-dot ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
