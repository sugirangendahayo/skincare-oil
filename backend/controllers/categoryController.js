// controllers/categoryController.js
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../models/category.js';

async function getCategories(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCategory(req, res) {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addCategory(req, res) {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editCategory(req, res) {
  try {
    const category = await updateCategory(req.params.id, req.body);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removeCategory(req, res) {
  try {
    await deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getCategories, getCategory, addCategory, editCategory, removeCategory };