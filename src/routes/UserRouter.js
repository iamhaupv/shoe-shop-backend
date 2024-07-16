const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/index");
const authMiddleware = require("../middleware/authMiddleware");

// register
router.post("/register", UserController.register);
// login
router.post("/login", UserController.login);
// check user exist
router.get("/check-user-exist", UserController.checkUserExist);
// find user by id
router.get("/find-user-by-phone", authMiddleware, UserController.findUserByPhone);
module.exports = router;
