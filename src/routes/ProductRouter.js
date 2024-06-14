const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers/index");
const authMiddleware = require("../middleware/authMiddleware");
// add product
router.post("/add-product", authMiddleware, ProductController.addProduct);
// delete product by id
router.delete(
  "/delete-product-by-id/:_id",
  authMiddleware,
  ProductController.deleteProductById
);
// update product
router.patch(
  `/update-product/:_id`,
  authMiddleware,
  ProductController.updateProduct
);
// find product by id
router.post(
  "/find-product-by-id",
  authMiddleware,
  ProductController.findProductById
);
// find all product
router.post(
  "/find-all-product",
  authMiddleware,
  ProductController.findAllProduct
);
// find product by category
router.post(
  "/find-product-by-category",
  authMiddleware,
  ProductController.findAllProuctByCategory
);
module.exports = router;
