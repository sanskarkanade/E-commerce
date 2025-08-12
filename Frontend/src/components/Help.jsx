import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy, FaPhone, FaEnvelope } from "react-icons/fa";

const Help = () => {
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 pt-32 sm:pt-20 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center animate-fade-in">
          Help & Support
        </h2>

        <section className="mb-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Frequently Asked Questions
          </h3>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-blue-600">•</span>
              <div>
                <strong>How do I place an order?</strong> Browse products, add them to your cart, and proceed to checkout.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600">•</span>
              <div>
                <strong>What payment methods are accepted?</strong> Credit/debit cards, UPI, PayPal, and COD.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600">•</span>
              <div>
                <strong>How can I track my order?</strong> You'll receive a tracking link via email.
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Contact Support
          </h3>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-center gap-3 group">
              <FaPhone className="text-blue-600 text-lg" />
              <span>Call us: +91 9876543210</span>
              <button
                onClick={() => handleCopy("+919876543210", "Phone number")}
                className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition duration-300"
                title="Copy phone number"
              >
                <FaCopy className="text-lg" />
              </button>
            </p>
            <p className="flex items-center gap-3 group">
              <FaEnvelope className="text-blue-600 text-lg" />
              <span>Email: support@eshanybazzar.com</span>
              <button
                onClick={() => handleCopy("support@eshanybazzar.com", "Email")}
                className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition duration-300"
                title="Copy email"
              >
                <FaCopy className="text-lg" />
              </button>
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Troubleshooting Guide
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Issue: Payment failed</strong> - Check card details and try again.
            </p>
            <p>
              <strong>Issue: Order not received</strong> - Track your order using the provided link.
            </p>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Help;