// routes/productRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
  addVariant,
  editVariant,
  removeVariant,
} from "../controllers/productController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return cb(err);
      }
      const filename = buf.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const uploadMulter = multer({ storage });

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authMiddleware, adminMiddleware, addProduct);
router.put("/:id", authMiddleware, adminMiddleware, editProduct);
router.delete("/:id", authMiddleware, adminMiddleware, removeProduct);

router.post(
  "/:productId/variants",
  authMiddleware,
  adminMiddleware,
  addVariant
);
router.put(
  "/variants/:variantId",
  authMiddleware,
  adminMiddleware,
  editVariant
);
router.delete(
  "/variants/:variantId",
  authMiddleware,
  adminMiddleware,
  removeVariant
);

router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMulter.array("images", 10),
  (req, res) => {
    const urls = req.files.map((file) => `/uploads/${file.filename}`);
    res.json({ urls });
  }
);

export default router;
