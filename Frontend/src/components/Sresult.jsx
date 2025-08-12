import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51RqYt3FHLwmKrEWKVEqEjGWRgxqzTiw7IVj3GfEFH6Pw9Fmfj0qG2JOn1aXNGcDJKbWTdwbymEpKCp7SD5ovJqZt00DuobUIRC");

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const handleCheckout = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to continue with purchase.", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems: [product] }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Stripe session creation failed", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
      toast.success("Redirecting to Stripe checkout...", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Error initiating checkout", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to add items to your cart.", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }

      toast.success(`${product.title} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Cart error:", error);
      toast.error(error.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-800">
            No product data available
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 pt-32 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain rounded-lg mb-6"
          
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          {product.title}
        </h1>
        <p className="text-xl text-green-600 font-semibold mb-3">
          💰 Price: ₹{product.price.toFixed(2)}
        </p>
        <p className="text-gray-700 mb-4">{product.description || "No description available."}</p>
        <p className="text-gray-700 mb-6">
          <span className="font-semibold">🏭 Category:</span>{" "}
          {product.category || "Uncategorized"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleCheckout(product)}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Result;