const { Category } = require("../models");
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
// delete category by id
const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryRepository.deleteCategoryById(id);
    res.status(200).json({
      message: "Delete successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot delete category!",
    });
  }
};
// update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const categoryNew = {
      name,
      description,
    };
    const category = await CategoryRepository.updateCategory(id, categoryNew);
    res.status(200).json({
      message: "Update successfully!",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot update category!",
    });
  }
};
// find category by id
const findCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryRepository.findCategoryById(id);
    res.status(200).json({
      message: "Successfully!",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Not found category by id",
    });
  }
};
module.exports = {
  createCategory,
  findAllCategories,
  deleteCategoryById,
  updateCategory,
  findCategoryById,
};
