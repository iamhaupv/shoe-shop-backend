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
  size,
  imageURLs,
  flashSale
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
    size,
    images: imageURLs,
    flashSale,
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
    productOld.category = productNew.category;
    productOld.price = productNew.price;
    productOld.description = productNew.description;
    productOld.color = productNew.color;
    productOld.material = productNew.material;
    productOld.design = productNew.design;
    productOld.size = productNew.size;
    productOld.images = productNew.images;

    const updatedProduct = await productOld.save();

    // Return full product information
    const fullProduct = {
      ...updatedProduct.toObject(), // Convert Mongoose document to plain JS object
    };

    return fullProduct;
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
// find all product flashSale
const findAllProductFlashSale = async () => {
  try {
    const product = await Product.find({ flashSale: true });
    return product;
  } catch (error) {
    throw new Error(error);
  }
};
// find all product free ship
const findAllProductFreeShip = async () => {
  try {
    const product = await Product.find({ freeShip: true });
    return product;
  } catch (error) {
    throw new Error(error);
  }
};
// find all product is discount
const findAllProductIsDiscount = async () => {
  try {
    const product = await Product.find({ isDiscount: true });
    return product;
  } catch (error) {
    throw new Error(error);
  }
};
// find all product shop mall
const findAllProductShopMall = async () => {
  try {
    const product = await Product.find({ shopMall: true });
    return product;
  } catch (error) {
    throw new Error(error);
  }
};
// find all product love and discount
const findAllProductLoveAndDiscount = async () => {
  try {
    const products = await Product.find({ loveLy: true, isDiscount: true });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};
// find all product mall and discount
const findAllProductMallAndDiscount = async () => {
  try {
    const products = await Product.find({ shopMall: true, isDiscount: true });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};
// find all product love discount free ship
const findAllProductLoveDiscountFreeShip = async () => {
  try {
    const products = await Product.find({
      loveLy: true,
      isDiscount: true,
      freeShip: true,
    });
    return products;
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
  findAllProductFlashSale,
  findAllProductFreeShip,
  findAllProductIsDiscount,
  findAllProductShopMall,
  findAllProductLoveAndDiscount,
  findAllProductMallAndDiscount,
  findAllProductLoveDiscountFreeShip,
};
