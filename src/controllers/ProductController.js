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
    const { _id, name, quantity } = req.body;
    const productNew = {
      name,
      quantity,
    };
    const product = await ProductRepository.updateProduct(_id, productNew);
    res.status(200).json({
      message: "Update product successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot update product!",
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
module.exports = {
  addProduct,
  deleteProductById,
  updateProduct,
  findProductById,
};
