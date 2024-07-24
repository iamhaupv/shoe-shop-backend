const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers/index");
const authMiddleware = require("../middleware/authMiddleware");
const { upload } = require("../config/aws.config");
// add product
router.post(
  "/add-product",
  authMiddleware,
  upload.array("images", 10),
  ProductController.addProduct
);
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
  upload.array("images", 10),
  ProductController.updateProduct
);
// find product by id
router.post(
  "/find-product-by-id",
  authMiddleware,
  ProductController.findProductById
);
// find all product
router.get("/find-all-product", ProductController.findAllProduct);
// find product by category
router.post(
  "/find-product-by-category",
  authMiddleware,
  ProductController.findAllProuctByCategory
);
// upload images
router.post(
  "/upload-images",
  upload.array("file", 10),
  ProductController.uploadImages
);
// find all product flash sale
router.get(
  "/find-all-product-flash-sale",
  ProductController.findAllProductFlashSale
);
// find all product free ship
router.get("/find-all-product-free-ship", ProductController.findAllProductFreeShip)
// find all product is discount
router.get("/find-all-product-is-discount", ProductController.findAllProductIsDiscount)
// find all product shop mall
router.get("/find-all-product-shop-mall", ProductController.findAllProductShopMall)
module.exports = router;
