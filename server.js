const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 2002;
const cors = require("cors");
const connect_mongodb = require("./src/database/mongodb");
const {
  UserRouter,
  ProductRouter,
  AdminRouter,
  CartRouter,
  CategoryRouter,
} = require("./src/routes/index");
const check_token = require("./src/authentication/auth");
// config
app.use(cors({ origin: true }));
// check token
app.use(check_token);
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
//  router admin
app.use("/wp-admin", AdminRouter);
// router cart
app.use("/carts", CartRouter);
// router category
app.use("/categories", CategoryRouter)
// listen
app.listen(port, async () => {
  await connect_mongodb();
  console.log(`Example app on for port ${port}`);
});
