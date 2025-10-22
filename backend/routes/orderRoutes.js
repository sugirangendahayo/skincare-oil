// routes/orderRoutes.js
import express from "express";
import {
  getUserOrders,
  getOrder,
  placeOrder,
  updateStatus,
} from "../controllers/orderController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getUserOrders); // User's own orders
router.get("/:id", authMiddleware, getOrder);
router.post("/", authMiddleware, placeOrder);
router.put("/:id/status", authMiddleware, adminMiddleware, updateStatus); // Admin updates status

export default router;
