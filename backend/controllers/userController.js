// controllers/userController.js - User operations
import { findUserById, getAllUsers } from "../models/user.js";

async function getUserProfile(req, res) {
  try {
    const user = await findUserById(req.user.id); // From auth middleware
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getUserProfile, getAllUsersController };
