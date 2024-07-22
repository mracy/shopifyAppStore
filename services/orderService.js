const Order = require('../models/Order');

// Create a new order
const createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    throw new Error('Failed to create order: ' + error.message);
  }
};

// Update the status of an order
const updateOrderStatus = async (id, status) => {
  try {
    // Validate status value
    const validStatuses = ['Pending', 'Shipped', 'Delivered'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status value');
    }

    const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true } // Return the updated order and run validators
    );

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    throw new Error('Failed to update order status: ' + error.message);
  }
};

module.exports = {
  createOrder,
  updateOrderStatus
};
