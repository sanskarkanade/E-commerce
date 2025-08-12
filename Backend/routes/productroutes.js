const express = require("express");
const router = express.Router();
const {getAllProduct, getProductId, addProduct, updateProduct, deleteProduct} = require("../controller/productController");

router.get("/", getAllProduct);
router.get("/:id" , getProductId);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;