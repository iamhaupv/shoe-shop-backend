const { Cart, User } = require("../models/index");
// add product to cart
const addProductToCart = async (phoneNumber, productId) => {
  try {
    // Tìm người dùng bằng phoneNumber và populate giỏ hàng của họ
    let user = await User.findOne({ phoneNumber }).populate("cart");

    if (!user) {
      throw new Error("User not found");
    }

    // Kiểm tra xem người dùng có giỏ hàng chưa
    if (!user.cart) {
      // Nếu không có, tạo mới giỏ hàng và liên kết với người dùng
      const cart = new Cart({
        user: user._id,
        products: [{ product: productId, quantity: 1 }],
      });
      await cart.save();
      user.cart = cart._id;
      await user.save();
    } else {
      // Nếu có, thêm sản phẩm vào giỏ hàng
      const cart = await Cart.findById(user.cart);

      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        // Nếu sản phẩm đã tồn tại, tăng quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    return user.cart;
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    throw error;
  }
};
// find cart by id
const findCartById = async (_id) => {
  try {
    const cart = await Cart.findOne({ _id });
    if (!cart) {
      throw new Error("Not found!");
    }
    return cart;
  } catch (error) {
    console.log(error);
  }
};
//  remove product from cart
const removeProductFromCart = async (phoneNumber) => {
  try {
    const user = await User.findOne({phoneNumber}).populate("cart")
    if(!user){
      throw new Error("User not found!")
    }
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  addProductToCart,
  findCartById,
  removeProductFromCart,
};
