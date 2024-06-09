const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    id: {
      type: mongoose.ObjectId,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  })
);

module.exports = Cart;
