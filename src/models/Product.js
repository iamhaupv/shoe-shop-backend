const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    id: {
      type: mongoose.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
  })
);

module.exports = Product;
