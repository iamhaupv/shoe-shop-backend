const express = require("express");
const router = express.Router();
const { CategoryController } = require("../controllers/index");
const authMiddleware = require("../middleware/authMiddleware");
// create category
router.post(
  "/create-category",
  authMiddleware,
  CategoryController.createCategory
);
// find all categories
router.post(
  "/find-all-categories",
  authMiddleware,
  CategoryController.findAllCategories
);
// delete category by id
router.delete(
  "/delete-category-by-id/:id",
  authMiddleware,
  CategoryController.deleteCategoryById
);
// update category
router.patch(
  "/update-category/:id",
  authMiddleware,
  CategoryController.updateCategory
);
module.exports = router;
