// controllers/authController.js - Handles login/register
import { createUser, findUserByEmail, generateToken } from '../models/user.js';
import bcrypt from 'bcryptjs';

async function register(req, res) {
  try {
    const user = await createUser(req.body);
    const token = await generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = await generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { register, login };