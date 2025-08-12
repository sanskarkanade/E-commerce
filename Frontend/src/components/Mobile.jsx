import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Log form data
    console.log(formData);

    setFormData({ name: "", email: "", message: "" });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-32 sm:pt-20 pb-12">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center animate-fade-in">
          Contact Us
        </h2>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto mb-12 transform transition-all duration-300 hover:shadow-2xl"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
              placeholder="Your message here..."
              rows="5"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-auto">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">Get in Touch</h3>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-center justify-center gap-3 group">
              <FaMapMarkerAlt className="text-blue-600 text-lg" />
              <span>123 Eshany Bazzar Street, New Delhi, India</span>
              <button
                onClick={() => handleCopy("123 Eshany Bazzar Street, New Delhi, India", "Address")}
                className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition duration-300"
                title="Copy address"
              >
                <FaCopy className="text-lg" />
              </button>
            </p>
            <p className="flex items-center justify-center gap-3 group">
              <FaPhone className="text-blue-600 text-lg" />
              <span>+91 9876543210</span>
              <button
                onClick={() => handleCopy("+919876543210", "Phone number")}
                className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition duration-300"
                title="Copy phone number"
              >
                <FaCopy className="text-lg" />
              </button>
            </p>
            <p className="flex items-center justify-center gap-3 group">
              <FaEnvelope className="text-blue-600 text-lg" />
              <span>support@eshanybazzar.com</span>
              <button
                onClick={() => handleCopy("support@eshanybazzar.com", "Email")}
                className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition duration-300"
                title="Copy email"
              >
                <FaCopy className="text-lg" />
              </button>
            </p>
            <p className="flex items-center justify-center gap-3">
              <FaClock className="text-blue-600 text-lg" />
              <span>Mon-Fri 9:00 AM - 6:00 PM</span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;