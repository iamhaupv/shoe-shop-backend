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
    if (!categories || categories.length === 0) {
      throw new Error("NULL!");
    }
    return categories;
  } catch (error) {
    throw new Error(error);
  }
};
// delete category
const deleteCategoryById = async (categoryId) => {
  try {
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      throw new Error("Cannot category by ID");
    }
    return await Category.deleteOne({ _id: categoryId });
  } catch (error) {
    throw new Error(error);
  }
};
// update category
const updateCategory = async (categoryId, categoryNew) => {
  try {
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      throw new Error("Not found category!");
    }
    category.name = categoryNew.name;
    category.description = categoryNew.description;
    category.updatedAt = Date.now();
    return await category.save();
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  createCategory,
  findAllCategories,
  deleteCategoryById,
  updateCategory,
};
