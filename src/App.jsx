import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Index from "../pages/index";
import Checkout from "../pages/checkout";
import Orders from "../pages/orders";
import Tracking from "../pages/tracking";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
