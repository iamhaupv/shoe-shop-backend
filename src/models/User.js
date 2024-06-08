const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: {
      type: mongoose.ObjectId,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["user"], // Mặc định là người dùng thông thường
    },
    permissions: {
      type: [String],
      default: [], // Không có quyền hạn mặc định
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  })
);

module.exports = User;
