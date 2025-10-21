// models/orderItem.js
import pool from '../config/db.js'; // Updated import

async function getItemsByOrderId(order_id) {
  const [rows] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [order_id]);
  return rows;
}

async function createOrderItem(itemData) {
  const { order_id, product_id, variant_id, quantity, price } = itemData;
  const [result] = await pool.query(
    'INSERT INTO order_items (order_id, product_id, variant_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
    [order_id, product_id, variant_id || null, quantity, price]
  );
  return { id: result.insertId, ...itemData };
}

export { getItemsByOrderId, createOrderItem };