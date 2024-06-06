const { Product } = require("../models/index");
const addProduct = async (name, quantity) => {
  try {
    const productExist = await Product.findOne({ name });
    if (productExist) {
      throw new Error("Product is Exist!");
    }
    const product = await Product.create({
      name,
      quantity,
    });
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addProduct,
};
