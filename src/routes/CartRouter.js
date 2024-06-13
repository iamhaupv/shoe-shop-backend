const express = require("express");
const router = express.Router();
const { CartController } = require("../controllers/index");
const authMiddleware = require("../middleware/authMiddleware");
// add product to cart
router.post("/add-product-to-cart", CartController.addProductToCart);
// find cart by id
router.post("/find-cart-by-id", CartController.findCartById);
// remove product from cart
router.post(
  "/remove-book-from-cart",
  authMiddleware,
  CartController.removeProductFromCart
);
module.exports = router;
