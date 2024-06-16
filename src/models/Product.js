const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },
      material: {
        type: String,
        required: false,
      },
      design: {
        type: String,
        required: false,
      },
      images: {
        type: [String],
        required: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = Product;
