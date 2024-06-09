const { AdminController } = require("../controllers/index");
const express = require("express");
const router = express.Router();
// register
router.post("/register", AdminController.registerAdmin);
// login
router.post("/login", AdminController.loginAdmin);
module.exports = router;
