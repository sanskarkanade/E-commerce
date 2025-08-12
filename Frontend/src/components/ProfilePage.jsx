import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy, FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@example.com",
    isAdmin: false,
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

  const handleEditProfile = () => {
    toast.info("Redirecting to edit profile...", {
      position: "top-right",
      autoClose: 1500,
    });
    navigate("/profile/edit"); // Adjust route as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl animate-fade-in">
        <div className="text-center">
          <img
            className="h-24 w-24 mx-auto rounded-full border-4 border-blue-600 object-cover"
            src={user.avatar || "https://i.pravatar.cc/150?img=10"}
            alt={`${user.name || "User"}'s profile`}
            onError={(e) => (e.target.src = "https://i.pravatar.cc/150?img=10")}
          />
          <h2 className="text-3xl font-extrabold text-gray-800 mt-4">
            {user.name || "User"}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between group">
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-lg text-gray-800 font-medium">{user.email}</p>
            </div>
            <button
              onClick={() => handleCopy(user.email, "Email")}
              className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition duration-300"
              title="Copy email"
            >
              <FaCopy className="text-lg" />
            </button>
          </div>
          <div className="flex items-center justify-between group">
            <div>
              <label className="text-sm text-gray-500">Role</label>
              <p className="text-lg text-gray-800 font-medium capitalize">
                {user.isAdmin ? "Admin" : "User"}
              </p>
            </div>
            <button
              onClick={() => handleCopy(user.isAdmin ? "Admin" : "User", "Role")}
              className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition duration-300"
              title="Copy role"
            >
              <FaCopy className="text-lg" />
            </button>
          </div>
        </div>

        <button
          onClick={handleEditProfile}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Edit Profile
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;