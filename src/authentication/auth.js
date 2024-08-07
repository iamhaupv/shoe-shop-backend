const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  if (
    req.url.toLowerCase().trim() ==
      "/api/v1/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/users/register".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/wp-admin/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/wp-admin/register".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/users/check-user-exist".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/products/find-all-product".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/products/find-all-product-flash-sale".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/products/find-all-product-free-ship".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/products/find-all-product-is-discount".toLowerCase().trim() ||
    req.url.toLowerCase().trim() ==
      "/api/v1/products/find-all-product-shop-mall".toLowerCase().trim() ||
      req.url.toLowerCase().trim() ==
      "/api/v1/products/find-all-product-love-and-discount".toLowerCase().trim() ||
      req.url.toLowerCase().trim() ==
      "/api/v1/products/find-all-product-mall-and-discount".toLowerCase().trim() ||
      req.url.toLowerCase().trim() ==
      "/api/v1/products/find-all-product-love-discount-free-ship".toLowerCase().trim()
  ) {
    next();
    return;
  }
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(500).json({
        message: "Token is expired",
      });
      res.end();
    } else {
      next();
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = Auth;
