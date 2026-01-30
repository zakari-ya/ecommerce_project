import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../src/context/CartContext";
import "./checkout.css";

// Delivery options data
const deliveryOptions = [
  { id: "1", days: 7, priceCents: 0, label: "FREE Shipping" },
  { id: "2", days: 3, priceCents: 499, label: "$4.99 - Shipping" },
  { id: "3", days: 1, priceCents: 999, label: "$9.99 - Shipping" },
];

function CartItem({ item }) {
  const { updateQuantity, removeFromCart, updateDeliveryOption } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newQuantity, setNewQuantity] = useState(item.quantity);

  // Calculate delivery date
  const getDeliveryDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleUpdate = () => {
    if (isUpdating) {
      updateQuantity(item.productId, newQuantity);
      setIsUpdating(false);
    } else {
      setIsUpdating(true);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Remove this item from your cart?")) {
      removeFromCart(item.productId);
    }
  };

  const currentDeliveryOption =
    deliveryOptions.find((opt) => opt.id === item.deliveryOption) ||
    deliveryOptions[0];

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {getDeliveryDate(currentDeliveryOption.days)}
      </div>

      <div className="cart-item-details-grid">
        <img
          className="product-image"
          src={item.productImage}
          alt={item.productName}
        />

        <div className="cart-item-details">
          <div className="product-name">{item.productName}</div>
          <div className="product-price">${item.productPrice.toFixed(2)}</div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              {isUpdating ? (
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                  style={{
                    width: "60px",
                    padding: "4px",
                    border: "2px solid var(--primary-color)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              ) : (
                <span className="quantity-label">{item.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={handleUpdate}
            >
              {isUpdating ? "Save" : "Update"}
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={handleDelete}
            >
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          {deliveryOptions.map((option) => (
            <div key={option.id} className="delivery-option">
              <input
                type="radio"
                className="delivery-option-input"
                name={`delivery-option-${item.productId}`}
                checked={item.deliveryOption === option.id}
                onChange={() => updateDeliveryOption(item.productId, option.id)}
              />
              <div>
                <div className="delivery-option-date">
                  {getDeliveryDate(option.days)}
                </div>
                <div className="delivery-option-price">{option.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Checkout() {
  const { cart, getCartTotal, getCartQuantity } = useCart();

  // Calculate shipping cost
  const shippingCost = cart.reduce((total, item) => {
    const option = deliveryOptions.find(
      (opt) => opt.id === item.deliveryOption,
    );
    return total + (option ? option.priceCents / 100 : 0);
  }, 0);

  // Calculate totals
  const itemsTotal = getCartTotal();
  const totalBeforeTax = itemsTotal + shippingCost;
  const tax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + tax;

  const handlePlaceOrder = () => {
    alert("Order placement functionality will be implemented soon!");
  };

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="/logo.png" alt="Logo" />
              <img className="mobile-logo" src="/mobile-logo.png" alt="Logo" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {getCartQuantity()} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="/icons/checkout-lock-icon.png" alt="Secure" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        {cart.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "var(--spacing-3xl)",
              fontSize: "20px",
              color: "var(--text-secondary)",
            }}
          >
            <p>Your cart is empty!</p>
            <Link
              to="/"
              className="button-primary"
              style={{
                display: "inline-block",
                marginTop: "var(--spacing-lg)",
                textDecoration: "none",
                padding: "12px 24px",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            <div className="order-summary">
              {cart.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>

            <div className="payment-summary">
              <div className="payment-summary-title">Payment Summary</div>

              <div className="payment-summary-row">
                <div>Items ({getCartQuantity()}):</div>
                <div className="payment-summary-money">
                  ${itemsTotal.toFixed(2)}
                </div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">
                  ${shippingCost.toFixed(2)}
                </div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">
                  ${totalBeforeTax.toFixed(2)}
                </div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">${tax.toFixed(2)}</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">
                  ${orderTotal.toFixed(2)}
                </div>
              </div>

              <button
                className="place-order-button button-primary"
                onClick={handlePlaceOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
