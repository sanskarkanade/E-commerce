const express = require("express");
const router = express.Router();
const { updateUserProfile, loginUser, registerUser } = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

// @route   POST /api/user/login
router.post("/login", loginUser);

// @route   POST /api/user/register
router.post("/register", registerUser);

// @route   PUT /api/user/profile (Protected Route)
router.put("/profile", protect, updateUserProfile);

module.exports = router;
