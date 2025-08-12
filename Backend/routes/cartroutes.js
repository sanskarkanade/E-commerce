const express = require("express");
const router = express.Router();
const {getCart, addCart, deleteCart} = require("../controller/cartController");
const {protect} = require("../middleware/authMiddleware");

// get /api/cart/
router.get("/", protect, getCart);

//post /api/cart/
router.post("/add", protect, addCart);

//delete /api/cart/
router.delete("/delete", protect, deleteCart);

module.exports = router;