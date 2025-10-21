// models/category.js
import pool from '../config/db.js'; // Updated import

async function getAllCategories() {
  const [rows] = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getCategoryById(id) {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
}

async function createCategory(categoryData) {
  const { name, parent_id } = categoryData;
  const [result] = await pool.query(
    'INSERT INTO categories (name, parent_id) VALUES (?, ?)',
    [name, parent_id || null]
  );
  return { id: result.insertId, name, parent_id };
}

async function updateCategory(id, categoryData) {
  const { name, parent_id } = categoryData;
  await pool.query(
    'UPDATE categories SET name = ?, parent_id = ? WHERE id = ?',
    [name, parent_id || null, id]
  );
  return getCategoryById(id);
}

async function deleteCategory(id) {
  await pool.query('DELETE FROM categories WHERE id = ?', [id]);
}

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };