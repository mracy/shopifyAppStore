// services/customerService.js
const { getOrders } = require('./shopifyService');
const Customer = require('../models/Customer');

const calculateMostValuableCustomers = async () => {
  try {
    // Fetch orders from Shopify
    const orders = await getOrders();
    const customerSpending = {};

    // Calculate total spending per customer
    orders.forEach(order => {
      const customerId = order.customer ? order.customer.id : 'unknown';
      if (!customerSpending[customerId]) {
        customerSpending[customerId] = 0;
      }
      customerSpending[customerId] += order.total_price;
    });

    // Update customer records in MongoDB
    for (const [customerId, totalSpent] of Object.entries(customerSpending)) {
      await Customer.findOneAndUpdate(
        { customerId },
        { $inc: { totalSpent: totalSpent }, $set: { lastOrderId: order.id, lastOrderName: order.name } },
        { upsert: true }
      );
    }

    // Retrieve top 5 customers
    const topCustomers = await Customer.find({})
      .sort({ totalSpent: -1 })
      .limit(5);

    return topCustomers;
  } catch (error) {
    console.error('Error calculating most valuable customers:', error);
    throw new Error('Failed to calculate most valuable customers');
  }
};

module.exports = {
  calculateMostValuableCustomers,
};
