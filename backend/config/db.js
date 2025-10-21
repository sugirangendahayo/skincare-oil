// config/db.js - Database connection configuration
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'skincare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection and log message
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully 💯');
    connection.release();
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
})();

export default pool;