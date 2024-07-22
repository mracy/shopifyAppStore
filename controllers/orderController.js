const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// Create a new order with transaction
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderData = req.body;
    const { customerId, products } = orderData;

    const customer = await Customer.findById(customerId).session(session);
    if (!customer) throw new Error('Customer not found');

    const order = new Order(orderData);
    await order.save({ session });

    const productNames = [];
    for (const item of products) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        product.quantitySold += item.quantity;
        await product.save({ session });
        productNames.push(product.name);
      } else {
        throw new Error(`Insufficient stock for product ${item.productId}`);
      }
    }

    const lastOrderName = productNames.join(', ');

    customer.ordersCount = (customer.ordersCount || 0) + 1;
    customer.totalSpent = (customer.totalSpent || 0) + order.totalPrice;
    customer.lastOrderId = order._id;
    customer.lastOrderName = lastOrderName;
    customer.purchasedProducts = [...new Set([...customer.purchasedProducts, ...products.map(p => p.productId)])];

    await customer.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error creating order:', error);
    res.status(400).json({ error: 'Failed to create order' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
        .populate('customerId')
        .populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
        .populate('customerId')
        .populate('products.productId');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = req.body.status || order.status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(400).json({ error: 'Failed to update order status' });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findByIdAndDelete(req.params.id).session(session);
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Order not found' });
    }

    for (const item of order.products) {
      const product = await Product.findById(item.productId).session(session);
      if (product) {
        product.stock += item.quantity;
        product.quantitySold -= item.quantity;
        await product.save({ session });
      }
    }

    const customer = await Customer.findById(order.customerId).session(session);
    if (customer) {
      customer.ordersCount -= 1;
      customer.totalSpent -= order.totalPrice;
      await customer.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
