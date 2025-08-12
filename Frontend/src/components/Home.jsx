import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./Products";

// Placeholder images (replace with your actual imports or URLs)
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";

const Home = () => {
  const images = [img1, img2, img3, img4];
  const [currentImage, setCurrentImage] = useState(0);
  const productsPerPage = 4;

  // Phone State
  const [phones, setPhones] = useState([]);
  const [loadingPhones, setLoadingPhones] = useState(true);
  const [errorPhones, setErrorPhones] = useState(null);
  const [currentIndexPhones, setCurrentIndexPhones] = useState(0);

  // Shoes State
  const [shoes, setShoes] = useState([]);
  const [loadingShoes, setLoadingShoes] = useState(true);
  const [errorShoes, setErrorShoes] = useState(null);
  const [currentIndexShoes, setCurrentIndexShoes] = useState(0);

  // Laptop State
  const [laptops, setLaptops] = useState([]);
  const [loadingLaptops, setLoadingLaptops] = useState(true);
  const [errorLaptops, setErrorLaptops] = useState(null);
  const [currentIndexLaptops, setCurrentIndexLaptops] = useState(0);

  // 🔁 Auto Image Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // 🔁 Fetch Products
  useEffect(() => {
    const fetchData = async (searchTerm, setData, setLoading, setError) => {
      try {
        const res = await fetch(`http://localhost:5000/api/product?search=${searchTerm}`);
        if (!res.ok) throw new Error(`Failed to fetch ${searchTerm}`);
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData("phone", setPhones, setLoadingPhones, setErrorPhones);
    fetchData("shoes", setShoes, setLoadingShoes, setErrorShoes);
    fetchData("laptop", setLaptops, setLoadingLaptops, setErrorLaptops);
  }, []);

  // 🔁 Pagination Helpers
  const getPaginated = (items, index) => items.slice(index, index + productsPerPage);

  const handleNext = (type) => {
    switch (type) {
      case "phones":
        setCurrentIndexPhones((prev) =>
          prev + productsPerPage >= phones.length ? 0 : prev + productsPerPage
        );
        break;
      case "shoes":
        setCurrentIndexShoes((prev) =>
          prev + productsPerPage >= shoes.length ? 0 : prev + productsPerPage
        );
        break;
      case "laptops":
        setCurrentIndexLaptops((prev) =>
          prev + productsPerPage >= laptops.length ? 0 : prev + productsPerPage
        );
        break;
      default:
        break;
    }
  };

  const handlePrev = (type) => {
    switch (type) {
      case "phones":
        setCurrentIndexPhones((prev) =>
          prev - productsPerPage < 0 ? 0 : prev - productsPerPage
        );
        break;
      case "shoes":
        setCurrentIndexShoes((prev) =>
          prev - productsPerPage < 0 ? 0 : prev - productsPerPage
        );
        break;
      case "laptops":
        setCurrentIndexLaptops((prev) =>
          prev - productsPerPage < 0 ? 0 : prev - productsPerPage
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <main>
        {/* Image Slider */}
        <div className="relative pt-24 sm:pt-16 overflow-hidden">
          <img
            src={images[currentImage]}
            alt="banner"
            className="w-full h-64 sm:h-96 object-cover transition-all duration-500 ease-in-out"
          />
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-8">
            <button
              onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
              className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
              className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
            >
              →
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentImage === index ? "bg-blue-600" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* 📱 Phones */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 animate-fade-in">
            Mobile Phones
          </h2>
          {loadingPhones && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
              <p className="ml-4 text-lg text-gray-700">Loading phones...</p>
            </div>
          )}
          {errorPhones && (
            <p className="text-red-500 text-center text-lg">Error: {errorPhones}</p>
          )}
          {!loadingPhones && !errorPhones && phones.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getPaginated(phones, currentIndexPhones).map((product) => (
                  <Products key={product._id} product={product} />
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => handlePrev("phones")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  disabled={currentIndexPhones === 0}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => handleNext("phones")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Next Products →
                </button>
              </div>
            </>
          )}
          {!loadingPhones && !errorPhones && phones.length === 0 && (
            <p className="text-center text-lg text-gray-600">No phones available.</p>
          )}
        </div>

        {/* 👟 Shoes */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 animate-fade-in">
            Men's Wear - Shoes
          </h2>
          {loadingShoes && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
              <p className="ml-4 text-lg text-gray-700">Loading shoes...</p>
            </div>
          )}
          {errorShoes && (
            <p className="text-red-500 text-center text-lg">Error: {errorShoes}</p>
          )}
          {!loadingShoes && !errorShoes && shoes.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getPaginated(shoes, currentIndexShoes).map((product) => (
                  <Products key={product._id} product={product} />
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => handlePrev("shoes")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  disabled={currentIndexShoes === 0}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => handleNext("shoes")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Next Products →
                </button>
              </div>
            </>
          )}
          {!loadingShoes && !errorShoes && shoes.length === 0 && (
            <p className="text-center text-lg text-gray-600">No shoes available.</p>
          )}
        </div>

        {/* 💻 Laptops */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 animate-fade-in">
            Laptops
          </h2>
          {loadingLaptops && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
              <p className="ml-4 text-lg text-gray-700">Loading laptops...</p>
            </div>
          )}
          {errorLaptops && (
            <p className="text-red-500 text-center text-lg">Error: {errorLaptops}</p>
          )}
          {!loadingLaptops && !errorLaptops && laptops.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getPaginated(laptops, currentIndexLaptops).map((product) => (
                  <Products key={product._id} product={product} />
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => handlePrev("laptops")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  disabled={currentIndexLaptops === 0}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => handleNext("laptops")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Next Products →
                </button>
              </div>
            </>
          )}
          {!loadingLaptops && !errorLaptops && laptops.length === 0 && (
            <p className="text-center text-lg text-gray-600">No laptops available.</p>
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Home;