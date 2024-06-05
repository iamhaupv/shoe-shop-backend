const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/index");

// register
router.post("/register", UserController.register);
// login
router.post("/login", UserController.login);
module.exports = router;
