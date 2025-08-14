import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBoxOpen } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to view your orders.");
        }

        const res = await fetch("https://e-commerce-ah0x.onrender.com/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.items || []);
        if (data.items?.length > 0) {
          toast.success(`Loaded ${data.items.length} order(s) successfully!`, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          toast.info("No orders found.", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message || "Error fetching orders");
        toast.error(error.message || "Error fetching orders", {
          position: "top-right",
          autoClose: 3000,
        });
        if (error.message.includes("log in")) {
          setTimeout(() => navigate("/login"), 1000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 pt-32 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center animate-fade-in">
          Your Orders
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            <p className="ml-4 text-lg text-gray-700">Loading orders...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in text-center">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl animate-fade-in">
            <FaBoxOpen className="text-gray-400 text-6xl mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">No orders found.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              Shop Now
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {orders.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-200"
                  
                />
                <h4 className="text-xl font-semibold text-gray-800 mb-2 truncate">{item.title}</h4>
                <p className="text-gray-600 mb-1">Quantity: {item.quantity}</p>
                <p className="text-gray-700 font-medium mb-4">
                  Price: ₹{item.price.toFixed(2)}
                </p>
                <p className="text-gray-700 font-medium mb-4">
                  Date of Order: {item.date}
                </p>
                
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Orders;