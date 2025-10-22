// src/pages/Cart.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useCartStore from "../store/cartStore";

const API_BASE_URL = "http://localhost:3000";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to place order");
      navigate("/login");
      return;
    }

    const orderData = {
      total_amount: total,
      items: cartItems.map((item) => ({
        product_id: item.id,
        variant_id: null, // Assuming no variants
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/api/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderId(res.data.id);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      setError("Failed to place order: " + err.message);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-800 shadow-2xl">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-400 mb-4">Order ID: {orderId}</p>
          <p className="text-gray-400 mb-8">
            We'll email you when your order is ready for pickup. Thank you for
            shopping with us!
          </p>
          <Link
            to="/orders"
            className="bg-rose-500 text-black font-bold py-3 px-8 rounded-xl hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-rose-500/20 mr-4"
          >
            View Orders
          </Link>
          <Link
            to="/categories"
            className="text-rose-400 hover:text-rose-300 transition-colors"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-center border border-gray-800 shadow-2xl">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 mb-8">
            Looks like you haven't added any products yet.
          </p>
          <Link
            to="/categories"
            className="bg-rose-500 text-black font-bold py-3 px-8 rounded-xl hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-rose-500/20"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 border border-gray-800 shadow-2xl">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 py-6 border-b border-gray-800 last:border-b-0"
                >
                  <img
                    src={`${API_BASE_URL}${item.image_url}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {item.description.substring(0, 80)}...
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-800 rounded-xl">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-4 py-2 text-gray-300 hover:text-rose-400"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-4 py-2 text-gray-300 hover:text-rose-400"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-rose-400 font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 border border-gray-800 shadow-2xl sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-4 border-t border-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-rose-500 text-black font-bold py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-rose-500/20 mb-4"
            >
              Place Order
            </button>
            <button
              onClick={clearCart}
              className="w-full text-red-400 hover:text-red-300 transition-colors text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/categories"
            className="text-rose-400 hover:text-rose-300 transition-colors"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
