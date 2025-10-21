// controllers/orderController.js
import { createOrder, getOrdersByUserId, getOrderById, updateOrderStatus } from '../models/order.js';
import { createOrderItem, getItemsByOrderId } from '../models/orderItem.js';

async function getUserOrders(req, res) {
  try {
    const orders = await getOrdersByUserId(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrder(req, res) {
  try {
    const order = await getOrderById(req.params.id);
    if (!order || order.user_id !== req.user.id) return res.status(404).json({ error: 'Order not found' });
    const items = await getItemsByOrderId(req.params.id);
    res.json({ ...order, items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function placeOrder(req, res) {
  try {
    const order = await createOrder({ user_id: req.user.id, ...req.body });
    // Assuming req.body.items is array of {product_id, variant_id, quantity, price}
    for (const item of req.body.items || []) {
      await createOrderItem({ order_id: order.id, ...item });
    }
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateStatus(req, res) {
  try {
    const order = await updateOrderStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getUserOrders, getOrder, placeOrder, updateStatus };