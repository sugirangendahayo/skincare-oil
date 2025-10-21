// routes/orderRoutes.js
import express from "express";
import { getUserOrders, getOrder, placeOrder, updateStatus } from '../controllers/orderController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getUserOrders); // User's own orders
router.get('/:id', getOrder);
router.post('/', placeOrder);
router.put('/:id/status', authMiddleware, adminMiddleware, updateStatus); // Admin updates status - added authMiddleware for consistency

export default router;