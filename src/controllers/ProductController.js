const { ProductRepository } = require("../repositories/index");
const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await ProductRepository.addProduct(name, quantity);
    res.status(200).json({
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
    const id = req.body;
    const product = await ProductRepository.deleteProductById(id);
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
    const { name, quantity } = req.body;
    if (!_id || !name || !quantity) {
      return res.status(400).json({
        message: "Missing required fields!",
      });
    }
    const productNew = {
      name,
      quantity,
    };
    const product = await ProductRepository.updateProduct(_id, productNew);
    if (product.nModified === 0) {
      return res.status(404).json({
        message: "Product not found or data is the same!",
      });
    }
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
module.exports = {
  addProduct,
  deleteProductById,
  updateProduct,
  findProductById,
  findAllProduct,
};
