const { Category } = require("../models/index");
// create category
const createCategory = async (name, description) => {
  try {
    const categoryExist = await Category.findOne({ name });
    const updatedAt = null;
    if (categoryExist) {
      throw new Error("Name is exist!");
    }
    const category = await Category.create({
      name,
      description,
      updatedAt,
    });
    return category;
  } catch (error) {
    throw new Error(error);
  }
};
// find all category
const findAllCategories = async () => {
  try {
    const categories = await Category.find({});
    if(!categories || categories.length === 0){
      throw new Error("NULL!")
    }
    return categories;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  createCategory,
  findAllCategories
};
