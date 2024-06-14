const { Category } = require("../models/index");
// create category
const createCategory = async (name) => {
  try {
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      throw new Error("Name is exist!");
    }
    const category = await Category.create({
      name,
    });
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createCategory,
};
