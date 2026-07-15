// src/components/RestaurantCard.jsx
import React from "react";
import { useApp } from "../context/AppContext.jsx";
import "./RestaurantCard.css";

export default function RestaurantCard({ restaurant }) {
  const { setPage, setActiveRestaurant } = useApp();
  const r = restaurant;

  const handleClick = () => {
    setActiveRestaurant(r);
    setPage("restaurant");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="rcard" onClick={handleClick}>
      {/* Header visual */}
      <div className="rcard-header" style={{ background: r.bgGrad }}>
        <img className="rcard-emoji" src={r.image} alt={r.name} />
        {r.discount && <span className="rcard-discount">{r.discount}</span>}
      </div>

      {/* Body */}
      <div className="rcard-body">
        <div className="rcard-top">
          <h3 className="rcard-name">{r.name}</h3>
          <div className="rcard-rating">
            ⭐ <strong>{r.rating}</strong>
            <span className="rcard-reviews">({r.reviews})</span>
          </div>
        </div>

        <div className="rcard-cuisine">{r.cuisine}</div>

        <div className="rcard-meta">
          <span className="rcard-meta-item">
            🕐 {r.deliveryTime} min
          </span>
          <span className="rcard-sep">·</span>
          <span className="rcard-meta-item">
            {r.deliveryFee === 0 ? (
              <span className="free-delivery">Free delivery</span>
            ) : (
              `Rs. ${r.deliveryFee} delivery`
            )}
          </span>
        </div>

        <div className="rcard-tags">
          {r.tags.map(tag => (
            <span key={tag} className="rcard-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
