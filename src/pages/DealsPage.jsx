import React from "react";
import { PROMO_BANNERS, RESTAURANTS } from "../data/restaurants.js";
import { useApp } from "../context/AppContext.jsx";
import "./BrowsePages.css";

export default function DealsPage() {
  const { setActiveRestaurant, setPage, showToast } = useApp();
  const openDeal = (restaurant) => { setActiveRestaurant(restaurant); setPage("restaurant"); };
  return <main className="browse-page"><section className="deals-hero"><div className="container"><p className="page-kicker">SAVINGS MADE SIMPLE</p><h1>Deals worth ordering for</h1><p>Fresh discounts, free delivery and exclusive offers from your favourite restaurants.</p></div></section><section className="container deals-content"><div className="deal-promos">{PROMO_BANNERS.map((deal) => <article className="deal-promo" style={{ background: deal.bg }} key={deal.id}><h2>{deal.title}</h2><p>{deal.subtitle}</p><button onClick={() => showToast(deal.id === 2 ? "Code PANDA20 copied" : "Deal applied at checkout")}>{deal.id === 2 ? "Use PANDA20" : "Claim deal"}</button></article>)}</div><div className="restaurants-header"><h2 className="section-title">Restaurant deals</h2><span className="restaurants-count">{RESTAURANTS.length} offers</span></div><div className="deals-grid">{RESTAURANTS.map((restaurant) => <article className="deal-card" key={restaurant.id}><img src={restaurant.image} alt={restaurant.name} /><div><span className="deal-badge">{restaurant.discount}</span><h3>{restaurant.name}</h3><p>{restaurant.cuisine}</p><button onClick={() => openDeal(restaurant)}>View menu</button></div></article>)}</div></section></main>;
}
