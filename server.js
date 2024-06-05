const express = require("express");
const app = express();
require("dotenv").config()
const port = process.env.PORT || 2002;
const cors = require("cors");
const connect_mongodb = require("./src/database/mongodb");
// config
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, async () => {
  await connect_mongodb();
  console.log(`Example app on for port ${port}`);
});
