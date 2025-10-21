// routes/userRoutes.js
import express from "express";
import { getUserProfile } from '../controllers/userController.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', getUserProfile);
// Example: Admin can manage users, but not implemented fully here

export default router;