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
module.exports = router;
