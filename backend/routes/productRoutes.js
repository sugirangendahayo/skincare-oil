// routes/productRoutes.js
import express from "express";
import { getProducts, getProduct, addProduct, editProduct, removeProduct, addVariant, editVariant, removeVariant } from '../controllers/productController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, adminMiddleware, addProduct);
router.put('/:id', authMiddleware, adminMiddleware, editProduct);
router.delete('/:id', authMiddleware, adminMiddleware, removeProduct);

router.post('/:productId/variants', authMiddleware, adminMiddleware, addVariant);
router.put('/variants/:variantId', authMiddleware, adminMiddleware, editVariant);
router.delete('/variants/:variantId', authMiddleware, adminMiddleware, removeVariant);

export default router;