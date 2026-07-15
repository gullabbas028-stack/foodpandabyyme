// src/pages/CartPage.jsx
import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx"; // ✅ corrected
import "./CartPage.css";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart, cartTotal, setPage, location } = useApp();
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: location, note: "" });

  const delivery = cart.length > 0 ? 49 : 0;
  const total = cartTotal + delivery;

  const handleOrder = (e) => {
    e.preventDefault();
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="order-success">
            <div className="success-animation">🎉</div>
            <h2>Order Placed!</h2>
            <p>Your food is being prepared. Estimated delivery: <strong>30–45 minutes</strong></p>
            <div className="order-id">Order #FP{Math.floor(Math.random()*900000+100000)}</div>
            <div className="tracking-steps">
              <div className="step active">✅ Order Confirmed</div>
              <div className="step">👨‍🍳 Preparing</div>
              <div className="step">🛵 On the way</div>
              <div className="step">🏠 Delivered</div>
            </div>
            <button className="back-home-btn" onClick={() => setPage("home")}>
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <button className="back-link" onClick={() => setPage("home")}>← Continue Shopping</button>
        <h1 className="cart-page-title">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="cart-page-empty">
            <span>😔</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet</p>
            <button className="browse-btn" onClick={() => setPage("home")}>Browse Restaurants</button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart items */}
            <div className="cart-items-col">
              <div className="cart-card">
                <h3>Order Summary</h3>
                {cart.map(item => (
                  <div key={item.id} className="cart-page-item">
                    <img className="cpi-emoji" src={item.image} alt="" />
                    <div className="cpi-info">
                      <div className="cpi-name">{item.name}</div>
                      <div className="cpi-rest">{item.restaurantName}</div>
                      <div className="cpi-price">Rs. {item.price} each</div>
                    </div>
                    <div className="cpi-qty-ctrl">
                      <button onClick={() => removeFromCart(item.id)}>−</button>
                      <strong>{item.qty}</strong>
                      <button onClick={() => addToCart(item, { name: item.restaurantName })}>+</button>
                    </div>
                    <div className="cpi-total">Rs. {item.price * item.qty}</div>
                  </div>
                ))}
              </div>

              {/* Promo */}
              <div className="cart-card">
                <h3>Promo Code</h3>
                <div className="promo-input-row">
                  <input placeholder="Enter code (try PANDA20)" className="promo-input" />
                  <button className="promo-apply-btn">Apply</button>
                </div>
              </div>
            </div>

            {/* Checkout form */}
            <div className="checkout-col">
              <div className="cart-card">
                <h3>Delivery Details</h3>
                <form className="checkout-form" onSubmit={handleOrder}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+92 3XX XXXXXXX" />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Street, area, city" />
                  </div>
                  <div className="form-group">
                    <label>Order Notes (optional)</label>
                    <textarea rows={2} value={form.note} onChange={e => setForm({...form, note: e.target.value})} placeholder="Special instructions..." />
                  </div>

                  <div className="order-total-summary">
                    <div className="ots-row"><span>Subtotal</span><span>Rs. {cartTotal}</span></div>
                    <div className="ots-row"><span>Delivery fee</span><span>Rs. {delivery}</span></div>
                    <div className="ots-row ots-total"><span>Total</span><span>Rs. {total}</span></div>
                  </div>

                  <div className="payment-methods">
                    <div className="pm-title">Payment Method</div>
                    <label className="pm-option active"><input type="radio" defaultChecked name="payment" /> 💵 Cash on Delivery</label>
                    <label className="pm-option"><input type="radio" name="payment" /> 💳 Card</label>
                  </div>

                  <button type="submit" className="place-order-btn">
                    🛵 Place Order — Rs. {total}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
