const { CartRepository } = require("../repositories/index");
// add product to cart
const addProductToCart = async (req, res) => {
  try {
    const { phoneNumber, productId } = req.body;
    console.log(phoneNumber, productId);
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
// find cart by id
const findCartById = async (req, res) => {
  try {
    const { cartId } = req.body
    const cart = await CartRepository.findCartById(cartId);
    res.status(200).json({
      message: "Successfully!",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Not found!",
    });
  }
};
module.exports = {
  addProductToCart,
  findCartById,
};
