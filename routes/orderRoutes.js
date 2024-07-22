const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

// Order Routes
router.get('/', getAllOrders); // Get all orders
router.get('/:id', getOrderById); // Get order by ID
router.post('/', createOrder); // Create a new order
router.put('/:id', updateOrderStatus); // Update order status
router.delete('/:id', deleteOrder); // Delete order by ID

module.exports = router;
