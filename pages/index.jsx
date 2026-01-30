import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../src/context/CartContext";
import Header from "../src/components/Header";
import "./index.css";

// Sample products data (using the 3 products from the original code)
const sampleProducts = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    price: 10.9,
    rating: { stars: 4.5, count: 87 },
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    price: 20.95,
    rating: { stars: 4, count: 127 },
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    price: 7.99,
    rating: { stars: 4.5, count: 56 },
  },
];

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(
      product.id,
      product.name,
      product.price,
      product.image,
      selectedQuantity,
    );

    // Show "Added" message
    setShowAdded(true);
    setTimeout(() => {
      setShowAdded(false);
    }, 2000);
  };

  // Get rating image path
  const getRatingImage = (stars) => {
    const ratingValue = Math.floor(stars * 10);
    return `/ratings/rating-${ratingValue}.png`;
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} alt={product.name} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={getRatingImage(product.rating.stars)}
          alt={`${product.rating.stars} stars`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">${product.price.toFixed(2)}</div>

      <div className="product-quantity-container">
        <select
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${showAdded ? "show" : ""}`}>
        <img src="/icons/checkmark.png" alt="Added" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

function Index() {
  return (
    <>
      <Header />

      <div className="home-page">
        <div className="products-grid">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Index;
