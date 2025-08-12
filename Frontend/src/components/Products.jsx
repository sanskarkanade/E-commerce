import React from "react";
import { useNavigate } from "react-router-dom";


const Products = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    
    navigate(`/result/${product._id}`, { state: { product } });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
        {product.title}
      </h2>
      <p className="text-gray-700 font-medium text-lg mb-3">
        ₹{product.price.toFixed(2)}
      </p>
      <button
        onClick={handleClick}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg"
      >
        View Details
      </button>
      
    </div>
  );
};

export default Products;