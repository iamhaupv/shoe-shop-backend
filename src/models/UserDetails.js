const mongoose = require("mongoose");

const UserDetails = mongoose.model(
  "UserDetails",
  new mongoose.Schema({
    id: {
      type: mongoose.ObjectId,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  })
);

module.exports = UserDetails;
