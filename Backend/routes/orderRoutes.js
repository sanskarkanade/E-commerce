const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {getOrders} = require("../controller/orderController");

//get /api/order
router.get("/", protect, getOrders);

module.exports = router;