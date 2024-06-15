const { ProductRepository } = require("../repositories/index");
// create product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      quantity,
      category,
      price,
      description,
      color,
      material,
      design,
    } = req.body;
    const product = await ProductRepository.addProduct(
      name,
      quantity,
      category,
      price,
      description,
      color,
      material,
      design
    );
    res.status(201).json({
      message: "Add product successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot add product!",
    });
  }
};
// delete product by id
const deleteProductById = async (req, res) => {
  try {
    const _id = req.params;
    const product = await ProductRepository.deleteProductById(_id);
    res.status(200).json({
      message: "Delete product successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot delete product because ID not found",
    });
  }
};
// update product by _id
const updateProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      name,
      quantity,
      category,
      price,
      description,
      color,
      material,
      design,
    } = req.body;
    const productNew = {
      name,
      quantity,
      category,
      price,
      description,
      color,
      material,
      design,
    };
    const product = await ProductRepository.updateProduct(_id, productNew);
    res.status(200).json({
      message: "Update product successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot update product!",
      error: error.message,
    });
  }
};
// find product by id
const findProductById = async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await ProductRepository.findProductById(_id);
    if (product == null) {
      throw new Error("Not found product by id!");
    }
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot found product by id!",
    });
  }
};
// find all product
const findAllProduct = async (req, res) => {
  try {
    const products = await ProductRepository.findAllProduct();
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "null!",
    });
  }
};
// find all product by category
const findAllProuctByCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const products = await ProductRepository.findAllProuctByCategory(
      categoryId
    );
    res.status(200).json({
      message: "Successfully!",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Null!",
    });
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
