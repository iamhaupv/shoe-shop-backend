const { Cart, User, Product } = require("../models/index");
// add product to cart
const addProductToCart = async (phoneNumber, productId) => {
  try {
    // Tìm người dùng bằng phoneNumber và populate giỏ hàng của họ
    let user = await User.findOne({ phoneNumber }).populate("cart");

    if (!user) {
      throw new Error("User not found");
    }

    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Kiểm tra xem người dùng có giỏ hàng chưa
    if (!user.cart) {
      // Nếu không có, tạo mới giỏ hàng và liên kết với người dùng
      const cart = new Cart({
        user: user._id,
        products: [{ product: productId, name: product.name, quantity: 1 }],
      });
      await cart.save();
      user.cart = cart._id;
      await user.save();
      return cart; // Trả về giỏ hàng mới tạo
    } else {
      // Nếu có, tìm giỏ hàng của người dùng
      const cart = await Cart.findById(user.cart);

      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        // Nếu sản phẩm đã tồn tại, tăng quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng với quantity là 1
        cart.products.push({ product: productId, name: product.name, quantity: 1 });
      }

      await cart.save();
      return cart; // Trả về giỏ hàng đã có
    }
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
const removeProductFromCart = async (phoneNumber, productId) => {
  try {
    // Tìm người dùng dựa trên số điện thoại và populate giỏ hàng
    const user = await User.findOne({ phoneNumber }).populate("cart");
    if (!user) {
      throw new Error("User not found!");
    }

    // Tìm giỏ hàng của người dùng
    const cart = user.cart;
    if (!cart) {
      throw new Error("Cart not found!");
    }

    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found in cart!");
    }

    // Kiểm tra số lượng của sản phẩm
    if (cart.products[productIndex].quantity === 1) {
      // Nếu số lượng là 1, xóa sản phẩm khỏi giỏ hàng
      cart.products.splice(productIndex, 1);
    } else {
      // Nếu số lượng lớn hơn 1, giảm số lượng đi 1
      cart.products[productIndex].quantity -= 1;
    }

    // Lưu thay đổi vào cơ sở dữ liệu
    await cart.save();

    return {
      message: "Product removed or quantity decreased from cart successfully",
      cart,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
//  find all product from cart
const findAllProductFromCart = async(_id) => {
  try {
    const cart = await Cart.findOne({_id}).populate('products.product');
    return cart;
  } catch (error) {
    throw new Error(error)
  }
}
module.exports = {
  addProductToCart,
  findCartById,
  removeProductFromCart,
  findAllProductFromCart
};
