import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

function Header() {
  const { getCartQuantity } = useCart();
  const cartQuantity = getCartQuantity();

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="/logo-white.png" alt="Logo" />
          <img
            className="mobile-logo"
            src="/mobile-logo-white.png"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for products..."
        />
        <button className="search-button">
          <img
            className="search-icon"
            src="/icons/search-icon.png"
            alt="Search"
          />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="/icons/cart-icon.png" alt="Cart" />
          <div className="cart-quantity">{cartQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
