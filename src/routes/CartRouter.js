const express = require("express");
const router = express.Router();
const { CartController } = require("../controllers/index");
const authMiddleware = require("../middleware/authMiddleware");
// add product to cart
router.post(
  "/add-product-to-cart",
  authMiddleware,
  CartController.addProductToCart
);
// find cart by id
router.post("/find-cart-by-id", authMiddleware, CartController.findCartById);
// remove product from cart
router.post(
  "/remove-book-from-cart",
  authMiddleware,
  CartController.removeProductFromCart
);
// find all product from cart
router.post(
  "/find-all-product-from-cart",
  authMiddleware,
  CartController.findAllProductFromCart
);
// update statusDetail
// router.post("/update-status-detail", authMiddleware, CartController.updateStatusDetail)
module.exports = router;
