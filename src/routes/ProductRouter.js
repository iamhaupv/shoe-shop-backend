const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers/index");
// add product
router.post("/add-product", ProductController.addProduct);
// delete product by id
router.post("/delete-product-by-id", ProductController.deleteProductById);
// update product
router.post("/update-product", ProductController.updateProduct);
// find product by id
router.post("/find-product-by-id", ProductController.findProductById)
module.exports = router;
