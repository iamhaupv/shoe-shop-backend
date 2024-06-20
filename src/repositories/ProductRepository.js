const { Product } = require("../models/index");
// add product
const addProduct = async (
  name,
  quantity,
  category,
  price,
  description,
  color,
  material,
  design,
  imageUrls
) => {
  const product = new Product({
    name,
    quantity,
    category,
    price,
    description,
    color,
    material,
    design,
    images: imageUrls,
  });
  return await product.save();
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
  try {
    const productOld = await Product.findOne({ _id });
    if (!productOld) {
      throw new Error("Not found product!");
    }
    productOld.name = productNew.name;
    productOld.quantity = productNew.quantity;
    productOld.category = productNew.Category;
    productOld.price = productNew.price;
    productOld.description = productNew.description;
    productOld.color = productNew.color;
    productOld.material = productNew.material;
    productOld.design = productNew.design;
    return productOld.save();
  } catch (error) {
    throw new Error(error.message);
  }
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
// find all product by category
const findAllProuctByCategory = async (categoryId) => {
  try {
    const category = await Product.find({ category: categoryId });
    if (!category || category.length === 0) {
      throw new Error("Category is not exist!");
    }
    return category;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  addProduct,
  deleteProductById,
  updateProduct,
  findProductById,
  findAllProduct,
  findAllProuctByCategory,
};
