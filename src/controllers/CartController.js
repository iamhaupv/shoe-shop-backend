const { CartRepository } = require("../repositories/index");
// add product to cart
const addProductToCart = async (req, res) => {
  try {
    const { phoneNumber, productId } = req.body;
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
    const { cartId } = req.body;
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
// remove product from cart
const removeProductFromCart = async (req, res) => {
  try {
    const { phoneNumber, productId } = req.body;
    const cart = await CartRepository.removeProductFromCart(
      phoneNumber,
      productId
    );
    res.status(200).json({
      message: "Remove product successfully!",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot remove product!",
    });
  }
};

// find all product from cart
const findAllProductFromCart = async(req, res) => {
  try {
    const {cartId} = req.body
    const cart = await CartRepository.findAllProductFromCart(cartId);
    res.status(200).json({
      data: cart
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
// update statusDetail
// const updateStatusDetail = async(req, res) => {
//   try {
//     const {cartId, productId} = req.body
//     const cart = await CartRepository.updateStatusDetail(cartId, productId)
//     res.status(200).json({
//       message: "Update successfully",
//       data: cart
//     })
//   } catch (error) {
//     res.status(500).json({
//       message: error
//     })
//   }
// }
module.exports = {
  addProductToCart,
  findCartById,
  removeProductFromCart,
  findAllProductFromCart,
  // updateStatusDetail
};
