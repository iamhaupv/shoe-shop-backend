const express = require("express");
const app = express();
const port = process.env.PORT || 6969;
const cors = require("cors");

app.use(cors({ origin: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app on for port ${port}`);
});
