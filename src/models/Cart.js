const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  })
);

module.exports = Cart;
