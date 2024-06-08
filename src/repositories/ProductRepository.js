const { Product } = require("../models/index");
// add product
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
// delete product by _id
const deleteProductById = async (_id) => {
  const productExist = await Product.findOne({ _id });
  if (!productExist) {
    throw new Error("Error: ID not found!");
  }
  await Product.deleteOne({ _id });
  return "Delete product successfully!";
};
// update product by _id
const updateProduct = async (_id, productNew) => {
  return await Product.updateOne({ _id }, productNew);
};
// find product by _id
const findProductById = async (_id) => {
  const product = Product.findOne({ _id });
  if (product) return product;
  return null;
};
// find all product
const findAllProduct = async () => {
  return await Product.find({});
};
module.exports = {
  addProduct,
  deleteProductById,
  updateProduct,
  findProductById,
  findAllProduct
};
