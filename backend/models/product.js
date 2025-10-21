// models/product.js
import pool from '../config/db.js'; // Updated import

async function getAllProducts() {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
}

async function getProductById(id) {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
}

async function createProduct(productData) {
  const { name, description, price, category_id, stock_quantity, image_url, additional_images } = productData;
  const [result] = await pool.query(
    'INSERT INTO products (name, description, price, category_id, stock_quantity, image_url, additional_images) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, description, price, category_id, stock_quantity, image_url, JSON.stringify(additional_images || [])]
  );
  return { id: result.insertId, ...productData };
}

async function updateProduct(id, productData) {
  const { name, description, price, category_id, stock_quantity, image_url, additional_images } = productData;
  await pool.query(
    'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, stock_quantity = ?, image_url = ?, additional_images = ? WHERE id = ?',
    [name, description, price, category_id, stock_quantity, image_url, JSON.stringify(additional_images || []), id]
  );
  return getProductById(id);
}

async function deleteProduct(id) {
  await pool.query('DELETE FROM products WHERE id = ?', [id]);
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };