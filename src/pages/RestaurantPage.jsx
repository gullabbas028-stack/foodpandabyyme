// src/pages/RestaurantPage.jsx
import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx"; // ✅ corrected
import "./RestaurantPage.css";

export default function RestaurantPage() {
  const { activeRestaurant: r, addToCart, cart, setPage } = useApp();
  const [activeTab, setActiveTab] = useState("popular");

  if (!r) return null;

  const popularItems = r.menu.filter(i => i.popular);
  const allItems     = r.menu;

  const getQty = (itemId) => {
    const found = cart.find(c => c.id === itemId);
    return found ? found.qty : 0;
  };

  const tabs = [
    { id: "popular", label: "⭐ Popular" },
    { id: "all",     label: "🍽️ Full Menu" },
  ];

  const displayItems = activeTab === "popular" ? popularItems : allItems;

  return (
    <div className="rest-page">
      {/* Hero Banner */}
      <div className="rest-hero" style={{ background: r.bgGrad }}>
        <div className="container rest-hero-inner">
          <button className="back-btn" onClick={() => setPage("home")}>
            ← Back
          </button>
          <img className="rest-hero-emoji" src={r.image} alt={r.name} />
          <div className="rest-hero-info">
            <h1 className="rest-name">{r.name}</h1>
            <div className="rest-cuisine">{r.cuisine}</div>
            <div className="rest-meta-row">
              <span>⭐ {r.rating} ({r.reviews} reviews)</span>
              <span>·</span>
              <span>🕐 {r.deliveryTime} min</span>
              <span>·</span>
              <span>{r.deliveryFee === 0 ? "🎉 Free delivery" : `Rs. ${r.deliveryFee} delivery`}</span>
              <span>·</span>
              <span>Min. Rs. {r.minOrder}</span>
            </div>
            {r.discount && (
              <div className="rest-discount-badge">{r.discount}</div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container rest-body">
        <div className="rest-layout">
          {/* Menu column */}
          <div className="rest-menu">
            {/* Tabs */}
            <div className="menu-tabs">
              {tabs.map(t => (
                <button
                  key={t.id}
                  className={`menu-tab ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Items */}
            <div className="menu-items">
              {displayItems.map((item) => {
                const qty = getQty(item.id);
                return (
                  <div key={item.id} className="menu-item">
                    <img className="menu-item-icon" src={r.image} alt="" />
                    <div className="menu-item-info">
                      <div className="menu-item-top">
                        <h4 className="menu-item-name">{item.name}</h4>
                        {item.popular && <span className="popular-badge">🔥 Popular</span>}
                      </div>
                      <p className="menu-item-desc">{item.desc}</p>
                      <div className="menu-item-price">Rs. {item.price}</div>
                    </div>
                    <div className="menu-item-action">
                      {qty > 0 ? (
                        <div className="qty-control">
                          <span className="qty-badge">{qty}</span>
                          <span className="qty-text">in cart</span>
                        </div>
                      ) : null}
                      <button
                        className="add-btn"
                        onClick={() => addToCart(item, r)}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart sidebar */}
          <div className="rest-cart-sidebar">
            <CartSidebar restaurant={r} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CartSidebar({ restaurant }) {
  const { cart, addToCart, removeFromCart, cartTotal, cartCount, setPage } = useApp();

  const restaurantCart = cart.filter(c => c.restaurantName === restaurant.name);
  const total = restaurantCart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="cart-sidebar">
      <h3 className="cart-sidebar-title">🛒 Your Order</h3>
      {restaurantCart.length === 0 ? (
        <div className="cart-empty">
          <span>🍽️</span>
          <p>Add items from the menu to start your order</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {restaurantCart.map(item => (
              <div key={item.id} className="cart-item">
                <img className="cart-item-emoji" src={item.image || restaurant.image} alt="" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">Rs. {item.price * item.qty}</div>
                </div>
                <div className="cart-qty-ctrl">
                  <button onClick={() => removeFromCart(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => addToCart(item, restaurant)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-row"><span>Subtotal</span><span>Rs. {total}</span></div>
            <div className="cart-row"><span>Delivery</span><span className={restaurant.deliveryFee === 0 ? "free" : ""}>{restaurant.deliveryFee === 0 ? "Free" : `Rs. ${restaurant.deliveryFee}`}</span></div>
            <div className="cart-row total"><span>Total</span><span>Rs. {total + restaurant.deliveryFee}</span></div>
          </div>
          <button className="checkout-btn" onClick={() => setPage("cart")}>
            Proceed to Checkout →
          </button>
        </>
      )}
    </div>
  );
}
