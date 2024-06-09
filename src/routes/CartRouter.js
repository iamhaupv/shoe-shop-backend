const express = require("express");
const router = express.Router();
const { CartController } = require("../controllers/index");
//
router.post("/add-product-to-cart", CartController.addProductToCart);

module.exports = router;
