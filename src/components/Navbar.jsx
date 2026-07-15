// src/components/Navbar.jsx
import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx"; // ✅ corrected
import "./Navbar.css";

export default function Navbar() {
  const { cartCount, setPage, location, setLocation, page, user, signOut, showToast } = useApp();
  const [editLoc, setEditLoc] = useState(false);
  const [locInput, setLocInput] = useState(location);

  const handleLocSubmit = (e) => {
    e.preventDefault();
    if (locInput.trim()) setLocation(locInput.trim());
    setEditLoc(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => setPage("home")}>
          <span className="logo-panda">🐼</span>
          <span className="logo-text">food<strong>panda</strong></span>
        </div>

        {/* Location picker */}
        <div className="navbar-location" onClick={() => setEditLoc(true)}>
          <span className="loc-icon">📍</span>
          {editLoc ? (
            <form onSubmit={handleLocSubmit} className="loc-form">
              <input
                autoFocus
                value={locInput}
                onChange={e => setLocInput(e.target.value)}
                onBlur={() => setEditLoc(false)}
                className="loc-input"
                placeholder="Enter your location"
              />
            </form>
          ) : (
            <span className="loc-text">
              {location} <span className="loc-arrow">▾</span>
            </span>
          )}
        </div>

        {/* Nav links */}
        <div className="navbar-links">
          <button className={`nav-link ${page === "restaurants" ? "active" : ""}`} onClick={() => setPage("restaurants")}>Restaurants</button>
          <button className={`nav-link ${page === "deals" ? "active" : ""}`} onClick={() => setPage("deals")}>Deals</button>
          {user ? (
            <button className="nav-link nav-link-outline" onClick={() => { signOut(); showToast("Signed out successfully"); setPage("home"); }}>Sign out</button>
          ) : (
            <button className={`nav-link nav-link-outline ${page === "signin" ? "active" : ""}`} onClick={() => setPage("signin")}>Sign in</button>
          )}
        </div>

        {/* Cart */}
        <button className="navbar-cart" onClick={() => setPage("cart")}>
          <span className="cart-icon">🛒</span>
          <span className="cart-label">Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}
