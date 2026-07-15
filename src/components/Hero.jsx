// src/components/Hero.jsx
import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { FOOD_IMAGES } from "../data/restaurants";
import "./Hero.css";

export default function Hero() {
  const { setSearchQuery } = useApp();
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
  };

  return (
    <section className="hero">
      <div className="hero-bg-shapes">
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-shape hero-shape-3" />
      </div>

      <div className="hero-content container">
        <div className="hero-text">
          <div className="hero-eyebrow">🚀 Fast delivery in 30 minutes</div>
          <h1 className="hero-title">
            Craving something<br />
            <span className="hero-title-pink">delicious?</span>
          </h1>
          <p className="hero-subtitle">
            Order from the best restaurants in Islamabad — delivered hot &amp; fresh to your door.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <span className="search-pin">📍</span>
            <input
              className="hero-input"
              placeholder="Search restaurants, cuisines, dishes..."
              value={input}
              onChange={e => { setInput(e.target.value); setSearchQuery(e.target.value); }}
            />
            <button type="submit" className="hero-btn">
              Find Food 🍽️
            </button>
          </form>

          <div className="hero-tags">
            {["🍕 Pizza", "🍔 Burgers", "🍛 Biryani", "🌯 Shawarma", "🍱 Sushi"].map(tag => (
              <button key={tag} className="hero-tag" onClick={() => setSearchQuery(tag.split(" ")[1])}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-blob">
            <div className="hero-emoji-stack">
              <img className="float-emoji e1" src={FOOD_IMAGES.pizza} alt="Pizza" />
              <img className="float-emoji e2" src={FOOD_IMAGES.burger} alt="Burger" />
              <img className="float-emoji e3" src={FOOD_IMAGES.biryani} alt="Biryani" />
              <img className="float-emoji e4" src={FOOD_IMAGES.shawarma} alt="Shawarma" />
              <img className="float-emoji e5" src={FOOD_IMAGES.dessert} alt="Dessert" />
              <img className="center-panda" src={FOOD_IMAGES.sushi} alt="Sushi" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
