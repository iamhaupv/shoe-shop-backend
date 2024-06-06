const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 2002;
const cors = require("cors");
const connect_mongodb = require("./src/database/mongodb");
const { UserRouter, ProductRouter } = require("./src/routes/index");
const check_token = require("./src/authentication/auth");
// check token
app.use(check_token)
// config
app.use(cors({ origin: true }));
//
app.use(express.urlencoded({ extended: true }));
//
app.use(express.json());
//
app.use(express.static("./src"));
//
app.get("/", (req, res) => {
  res.send("Hello World");
});
// router users
app.use("/users", UserRouter);
// router products
app.use("/products", ProductRouter);
// listen
app.listen(port, async () => {
  await connect_mongodb();
  console.log(`Example app on for port ${port}`);
});
