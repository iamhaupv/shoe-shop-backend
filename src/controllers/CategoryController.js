const { CategoryRepository } = require("../repositories/index");
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await CategoryRepository.createCategory(name, description);
    res.status(201).json({
      message: "Create category successfully!",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot create category!",
    });
  }
};
// find all categories
const findAllCategories = async (req, res) => {
  try {
    const categories = await CategoryRepository.findAllCategories();
    res.status(200).json({
      message: "Successfully!",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
module.exports = {
  createCategory,
  findAllCategories,
};
