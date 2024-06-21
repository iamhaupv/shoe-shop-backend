const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false, // If required, set it to true
    },
    price: {
      type: Number,
      required: false,
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
    size: {
      type: String,
      enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
      required: false,
      validate: {
        validator: function (v) {
          return ["36", "37", "38", "39", "40", "41", "42", "43", "44"].includes(v);
        },
        message: (props) => `${props.value} is not a valid size!`,
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
