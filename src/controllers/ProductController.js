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

module.exports = {
  addProduct,
};
