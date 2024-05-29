const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./src/routes/helloRouter");
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/user", router);
app.listen(port, () => {
  console.log(`Example app on for port ${port}`);
});
