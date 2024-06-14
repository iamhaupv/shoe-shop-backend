const express = require("express");
const router = express.Router();
const { CategoryController } = require("../controllers/index");
const authMiddleware = require("../middleware/authMiddleware");
// create category
router.post("/create-category", authMiddleware, CategoryController.createCategory)

module.exports = router