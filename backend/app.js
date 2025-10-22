// app.js - Main application setup (entry point)
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Added for CORS
import pool from "./config/db.js"; // Import the pool
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { authMiddleware } from "./middleware/auth.js"; // Removed adminMiddleware since not used here
import path from "path";

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all origins (or specify { origin: 'http://localhost:5173' } for specific)
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Attach pool to app if needed, but since models import directly, optional
app.set("db", pool);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes); // Protected
app.use("/api/categories", categoryRoutes); // Some protected
app.use("/api/products", productRoutes); // Some protected
app.use("/api/orders", authMiddleware, orderRoutes); // Protected

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
