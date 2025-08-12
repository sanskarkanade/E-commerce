import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const About = () => {
  // Function to show toast notification
  const showToast = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 py-16 px-6 md:px-12 lg:px-24">
      {/* Toast Container */}
      <ToastContainer />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Mission & Values Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-extrabold text-white mb-6 border-b-2 border-yellow-500 pb-2">
            Our Mission & Values
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            At <span className="text-yellow-400 font-semibold">Eshany Bazaar</span>, we believe shopping
            should be affordable, seamless, and enjoyable. Our mission is to offer a carefully curated
            selection of high-quality products while ensuring a smooth and satisfying shopping experience.
          </p>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">✔</span>
              <span className="text-yellow-400 font-medium">Customer First</span> – Your satisfaction
              is our top priority.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">✔</span>
              <span className="text-yellow-400 font-medium">Quality Assurance</span> – We offer only
              the best, thoroughly checked products.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">✔</span>
              <span className="text-yellow-400 font-medium">Affordability & Style</span> – Trendy,
              stylish, and pocket-friendly shopping.
            </li>
          </ul>
        </div>

        {/* What We Offer Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-extrabold text-white mb-6 border-b-2 border-yellow-500 pb-2">
            What We Offer
          </h2>
          <ul className="text-lg space-y-3">
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">🛍</span>
              <span className="text-yellow-400 font-medium">Fashion & Accessories</span> – Stylish
              clothing, footwear, and accessories.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">📱</span>
              <span className="text-yellow-400 font-medium">Electronics & Gadgets</span> – Latest
              smartphones, smartwatches, and more.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">🏠</span>
              <span className="text-yellow-400 font-medium">Home Essentials</span> – High-quality home
              decor and daily-use products.
            </li>
          </ul>
          <p className="mt-4 text-lg leading-relaxed">
            Every item in our store is handpicked to ensure superior quality and value for our customers.
          </p>
          <button
            onClick={() => showToast('Explore our latest collections now!')}
            className="mt-6 bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300"
          >
            Learn More
          </button>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-extrabold text-white mb-6 border-b-2 border-yellow-500 pb-2">
            Why Choose Us?
          </h2>
          <ul className="text-lg space-y-3">
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">✔</span> Premium Quality – Top-notch products at
              unbeatable prices.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">✔</span> Secure & Fast Delivery – Reliable
              shipping partners ensure timely deliveries.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">✔</span> Easy Returns & Support – Hassle-free
              returns and dedicated customer service.
            </li>
            <li className="flex items-center">
              <span className="text-yellow-400 mr-2">✔</span> Exclusive Deals – Special discounts and
              offers for our loyal customers.
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-extrabold text-white mb-6 border-b-2 border-yellow-500 pb-2">
            Contact Us
          </h2>
          <p className="text-lg leading-relaxed">
            📧 Email:{' '}
            <a
              href="mailto:support@eshanybazaar.com"
              className="text-yellow-400 hover:underline"
              onClick={() => showToast('Email copied! We’ll get back to you soon.')}
            >
              support@eshanybazaar.com
            </a>
            <br />
            📞 Phone: <span className="text-yellow-400">+123 456 7890</span>
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            We’re here to help! Reach out to us for any queries, and our team will be happy to assist
            you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;