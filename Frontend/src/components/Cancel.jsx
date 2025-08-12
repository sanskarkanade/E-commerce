import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast notification on mount
    toast.error("Payment Cancelled! Redirecting to homepage in 30 seconds...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    const timer = setTimeout(() => {
      navigate("/");
    }, 30000); // 30 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4 animate-pulse">
          Payment Cancelled ❌
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          You have cancelled the transaction.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to homepage in 30 seconds...
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Go to Homepage Now
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cancel;