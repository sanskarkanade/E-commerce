const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
}, { timestamps: true }
);

module.exports = mongoose.model("Product",productschema);