// models/user.js - Updated to handle first user as admin
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

async function getTotalUsers() {
  const [rows] = await pool.query("SELECT COUNT(*) as count FROM users");
  return rows[0].count;
}

async function createUser(userData) {
  const { username, email, password } = userData;

  // Check if this is the first user
  const totalUsers = await getTotalUsers();
  const role = totalUsers === 0 ? "admin" : "user";

  const password_hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [username, email, password_hash, role]
  );
  return { id: result.insertId, username, email, role };
}

async function findUserByEmail(email) {
  const [rows] = await pool.query(
    "SELECT id, username, email, password_hash, role FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await pool.query(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

async function getAllUsers() {
  const [rows] = await pool.query(
    "SELECT id, username, email, role, created_at FROM users"
  );
  return rows;
}

export {
  createUser,
  findUserByEmail,
  findUserById,
  generateToken,
  getAllUsers,
};
