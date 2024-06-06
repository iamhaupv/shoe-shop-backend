const express = require("express")
const router = express.Router()
const {ProductController} = require("../controllers/index")
router.post("/add-product", ProductController.addProduct)

module.exports = router