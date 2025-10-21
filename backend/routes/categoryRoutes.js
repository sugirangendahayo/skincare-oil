// routes/categoryRoutes.js
import express from "express";
import { getCategories, getCategory, addCategory, editCategory, removeCategory } from '../controllers/categoryController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', authMiddleware, adminMiddleware, addCategory);
router.put('/:id', authMiddleware, adminMiddleware, editCategory);
router.delete('/:id', authMiddleware, adminMiddleware, removeCategory);

export default router;