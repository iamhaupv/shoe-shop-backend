const express = require("express");
const router = express.Router();
const { CartController } = require("../controllers/index");
// add product to cart
router.post("/add-product-to-cart", CartController.addProductToCart);
// find cart by id
router.get("/find-cart-by-id", CartController.findCartById);
module.exports = router;
