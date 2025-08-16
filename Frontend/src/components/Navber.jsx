import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsPerson, BsCart } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ onsearchchange }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileBox, setProfileBox] = useState(false);
  const profileRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      setProfileBox(false);
      navigate("/");
    }, 1000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onsearchchange(input);
      navigate("/search");
      setInput("");
      setMobileMenu(false); // close mobile menu after search
    } else {
      toast.error("Please enter a search term!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation Links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
    { to: "/help", label: "Help" },
    ...(user?.isAdmin ? [{ to: "/add", label: "Add Product" }] : []),
  ];

  return (
    <nav className="h-20 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl fixed w-full top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src="./src/assets/logo1.jpg"
          className="h-10 w-10 rounded-full object-cover"
          alt="Eshany Bazaar Logo"
          onClick={() => navigate("/")}
        />
        <p
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold text-white tracking-wider"
        >
          Eshany Bazaar
        </p>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex items-center gap-6 text-white text-base font-medium">
        {navLinks.map((link, i) => (
          <li key={i}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `hover:text-yellow-300 transition duration-200 ${
                  isActive ? "text-yellow-300 border-b-2 border-yellow-300" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Search Bar (Desktop Only) */}
      <form
        onSubmit={handleSearch}
        className="hidden sm:flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Search items here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-white dark:bg-gray-200 h-10 px-4 rounded-full outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200 w-64"
        />
        <button
          type="submit"
          className="bg-cyan-600 px-4 py-2 text-white rounded-full shadow-md hover:bg-cyan-700 transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Cart + Profile/Login + Mobile Menu Button */}
      <div className="flex items-center gap-4 sm:gap-6">
        <NavLink
          to="/cart"
          className="relative text-white hover:text-yellow-300 transition"
        >
          <BsCart size={28} />
        </NavLink>

        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileBox(!profileBox)}
              className="text-white hover:text-yellow-300 transition"
            >
              <BsPerson size={30} />
            </button>
            {profileBox && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 animate-fade-in">
                <div className="px-4 py-3 border-b dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Signed in as
                  </p>
                  <p className="text-md font-semibold text-gray-800 dark:text-white truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <NavLink
                    to="/profile"
                    className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition"
                    onClick={() => setProfileBox(false)}
                  >
                    👤 My Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition"
                    onClick={() => setProfileBox(false)}
                  >
                    📦 My Orders
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 flex items-center gap-2 transition text-left"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/login"
            className="hidden sm:flex items-center gap-2 bg-white dark:bg-gray-200 text-blue-900 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
          >
            Login
          </NavLink>
        )}

        {/* Hamburger Menu Button (moved to right side) */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-gray-900 rounded-b-2xl shadow-xl sm:hidden animate-fade-in">
          <div className="flex flex-col gap-4 p-6 text-gray-800 dark:text-gray-200">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                to={link.to}
                className={({ isActive }) =>
                  `p-3 text-lg font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition ${
                    isActive ? "bg-blue-100 dark:bg-gray-700" : ""
                  }`
                }
                onClick={() => setMobileMenu(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Search items..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <button
                type="submit"
                className="bg-cyan-600 px-4 py-2 text-white rounded-lg shadow-md hover:bg-cyan-700 transition"
              >
                Go
              </button>
            </form>

            {/* Login for mobile */}
            {!user && (
              <NavLink
                to="/login"
                className="p-3 text-lg font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                onClick={() => setMobileMenu(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </nav>
  );
};

export default Navbar;
