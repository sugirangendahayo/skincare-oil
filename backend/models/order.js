  // models/order.js
  import pool from '../config/db.js'; // Updated import

  async function getOrdersByUserId(user_id) {
    const [rows] = await pool.query('SELECT * FROM orders ' );
    return rows;
  }

  async function getOrderById(id) {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0];
  }

  async function createOrder(orderData) {
    const { user_id, total_amount, status = 'pending' } = orderData;
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
      [user_id, total_amount, status]
    );
    return { id: result.insertId, user_id, total_amount, status };
  }

  async function updateOrderStatus(id, status) {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return getOrderById(id);
  }

  export { getOrdersByUserId, getOrderById, createOrder, updateOrderStatus };