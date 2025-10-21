// controllers/productController.js
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../models/product.js';
import { getVariantsByProductId, createVariant, updateVariant, deleteVariant } from '../models/productVariant.js';

async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProduct(req, res) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const variants = await getVariantsByProductId(req.params.id);
    res.json({ ...product, variants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addProduct(req, res) {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editProduct(req, res) {
  try {
    const product = await updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removeProduct(req, res) {
  try {
    await deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addVariant(req, res) {
  try {
    const variant = await createVariant({ product_id: req.params.productId, ...req.body });
    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editVariant(req, res) {
  try {
    const variant = await updateVariant(req.params.variantId, req.body);
    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removeVariant(req, res) {
  try {
    await deleteVariant(req.params.variantId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getProducts, getProduct, addProduct, editProduct, removeProduct, addVariant, editVariant, removeVariant };