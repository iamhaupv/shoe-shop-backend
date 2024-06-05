const express = require("express");
const router = express.Router();
const {UserController} = require("../controllers/index")
const UserRouter = async () => {
    // register
    router.post("/register", UserController.register)
};
module.exports = UserRouter;
