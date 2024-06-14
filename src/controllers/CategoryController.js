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
module.exports = {
  createCategory,
};
