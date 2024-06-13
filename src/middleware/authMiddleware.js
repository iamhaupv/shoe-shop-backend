const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Baerer ", "");
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    if (!req.user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Unauthorization " + error,
    });
  }
};

module.exports = authMiddleware;
