import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast on page load
    toast.success("Payment successful! Thank you for your purchase!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Redirect after 10 seconds
    const timer = setTimeout(() => {
      toast.info("Redirecting to homepage...", {
        position: "top-right",
        autoClose: 1500,
      });
      navigate("/");
    }, 10000); // Reduced to 10 seconds for better UX

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  const handleManualRedirect = () => {
    toast.info("Redirecting to homepage...", {
      position: "top-right",
      autoClose: 1500,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:shadow-2xl animate-fade-in">
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Payment Successful 🎉
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Thank you for your purchase!
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to homepage in 10 seconds...
        </p>
        <button
          onClick={handleManualRedirect}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Return to Homepage
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Success;