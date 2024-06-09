const { CartRepository } = require("../repositories/index");
const addProductToCart = async (req, res) => {
  try {
    const { phoneNumber, productId } = req.body;
    console.log(phoneNumber, productId)
    const cart = await CartRepository.addProductToCart(phoneNumber, productId);
    res.status(200).json({
      message: "Add product to cart succsessfully!",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot add product to cart!",
    });
  }
};

module.exports = {
  addProductToCart,
};
