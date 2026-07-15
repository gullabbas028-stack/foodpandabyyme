// src/components/CategoryFilter.jsx
import React from "react";
import { CATEGORIES, FOOD_IMAGES } from "../data/restaurants";
import "./CategoryFilter.css";

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="cat-wrap container">
      <div className="cat-scroll">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`cat-item ${active === c.id ? "active" : ""}`}
            onClick={() => onChange(c.id)}
          >
            <img className="cat-emoji" src={FOOD_IMAGES[c.id] || FOOD_IMAGES.all} alt="" />
            <span className="cat-label">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
