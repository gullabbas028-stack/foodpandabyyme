import React, { useMemo, useState } from "react";
import CategoryFilter from "../components/CategoryFilter.jsx";
import RestaurantCard from "../components/RestaurantCard.jsx";
import { RESTAURANTS } from "../data/restaurants.js";
import { useApp } from "../context/AppContext.jsx";
import "./BrowsePages.css";

export default function RestaurantsPage() {
  const { location, searchQuery, setSearchQuery } = useApp();
  const [category, setCategory] = useState("all");
  const restaurants = useMemo(() => RESTAURANTS.filter((restaurant) => {
    const query = searchQuery.toLowerCase();
    return (category === "all" || restaurant.category === category) && (!query || restaurant.name.toLowerCase().includes(query) || restaurant.cuisine.toLowerCase().includes(query));
  }), [category, searchQuery]);

  return <main className="browse-page">
    <section className="browse-hero"><div className="container"><p className="page-kicker">DELIVERY IN {location.toUpperCase()}</p><h1>Explore restaurants</h1><p>Find your next favourite meal from the best local spots.</p><input className="page-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search restaurants or cuisines" /></div></section>
    <section className="container browse-content"><CategoryFilter active={category} onChange={setCategory} /><div className="restaurants-header"><h2 className="section-title">All restaurants</h2><span className="restaurants-count">{restaurants.length} places</span></div>{restaurants.length ? <div className="restaurants-grid">{restaurants.map((restaurant, index) => <div key={restaurant.id} style={{ animationDelay: `${index * 0.07}s` }}><RestaurantCard restaurant={restaurant} /></div>)}</div> : <div className="empty-state"><h3>No restaurants found</h3><p>Try another search or category.</p></div>}</section>
  </main>;
}
