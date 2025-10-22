// models/productVariant.js
import pool from "../config/db.js"; // Updated import

async function getVariantsByProductId(product_id) {
  const [rows] = await pool.query(
    "SELECT * FROM product_variants WHERE product_id = ?",
    [product_id]
  );
  return rows;
}

async function createVariant(variantData) {
  const { product_id, variant_name, price_modifier, stock_quantity } =
    variantData;
  const [result] = await pool.query(
    "INSERT INTO product_variants (product_id, variant_name, price_modifier, stock_quantity) VALUES (?, ?, ?, ?)",
    [product_id, variant_name, price_modifier, stock_quantity]
  );
  return { id: result.insertId, ...variantData };
}

async function updateVariant(id, variantData) {
  const { variant_name, price_modifier, stock_quantity } = variantData;
  await pool.query(
    "UPDATE product_variants SET variant_name = ?, price_modifier = ?, stock_quantity = ? WHERE id = ?",
    [variant_name, price_modifier, stock_quantity, id]
  );
  const [rows] = await pool.query(
    "SELECT * FROM product_variants WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function deleteVariant(id) {
  await pool.query("DELETE FROM product_variants WHERE id = ?", [id]);
}

export { getVariantsByProductId, createVariant, updateVariant, deleteVariant };
