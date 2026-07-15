import React from "react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Toast from "./components/Toast.jsx";
import HomePage from "./pages/HomePage.jsx";
import RestaurantPage from "./pages/RestaurantPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import DealsPage from "./pages/DealsPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import "./index.css";

function AppRouter() {
  const { page, toastMsg } = useApp();

  return (
    <>
      <Navbar />
      {page === "home" && <HomePage />}
      {page === "restaurant" && <RestaurantPage />}
      {page === "cart" && <CartPage />}
      {page === "restaurants" && <RestaurantsPage />}
      {page === "deals" && <DealsPage />}
      {page === "signin" && <SignInPage />}
      <Toast message={toastMsg} />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
