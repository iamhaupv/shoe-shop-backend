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
      size: {
        type: String,
        enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
        required: false,
        validate: {
          validator: function (v) {
            return [
              "36",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
            ].includes(v);
          },
          message: (props) => `${props.value} is not a valid size!`,
        },
      },
    },
    { timestamps: true }
  )
);

module.exports = Product;
