const express = require("express");
const router = express.Router();
const helloController = require("../controllers/helloController");
router.post("/hello", helloController.hello);
module.exports = router;
