import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://e-commerce-ah0x.onrender.com/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 404) {
        setCartItems([]);
        toast.info("Your cart is empty!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load cart");

      setCartItems(data.items || []);
      if (data.items?.length) {
        toast.success("Cart loaded successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading cart", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://e-commerce-ah0x.onrender.com/api/cart/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete item");

      setCartItems((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Item removed from cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error deleting item from cart", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center animate-fade-in">
          🛒 Your Cart
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            <p className="ml-4 text-lg text-gray-700">Loading cart...</p>
          </div>
        )}

        {!loading && !cartItems.length && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <button
              onClick={() => window.location.href = "/"}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Shop Now
            </button>
          </div>
        )}

        {!loading && cartItems.length > 0 && (
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-lg text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;