import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./Products";

const Search = ({ searchQuery }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!searchQuery?.trim()) {
          setItems([]);
          toast.info("Please enter a search term", {
            position: "top-right",
            autoClose: 2000,
          });
          return;
        }

        const res = await fetch(
          `https://e-commerce-ah0x.onrender.com/api/product?search=${encodeURIComponent(searchQuery)}`
        );
        if (!res.ok) throw new Error("Error fetching search results");

        const data = await res.json();
        setItems(data);

        // if (data.length > 0) {
        //   toast.success(`Found ${data.length} results for "${searchQuery}"`, {
        //     position: "top-right",
        //     autoClose: 2000,
        //   });
        // } else {
        //   toast.info(`No results found for "${searchQuery}"`, {
        //     position: "top-right",
        //     autoClose: 2000,
        //   });
        // }
      } catch (err) {
        setError(err.message);
        // toast.error(err.message || "Failed to fetch search results", {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 pt-32 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 animate-fade-in">
          🔎 Search Results for: <span className="text-blue-600">{searchQuery || "N/A"}</span>
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            <p className="ml-4 text-lg text-gray-700">Loading results...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in text-center">
            {error}
          </div>
        )}

        {!loading && !error && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {items.map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-700 text-lg text-center">No products found.</p>
          )
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Search;