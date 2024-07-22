const axios = require('axios');
const config = require('../config/config');
const Product = require('../models/Product'); // Ensure path is correct
const mongoose = require('mongoose');

// Create an instance of axios with Shopify API configuration
const shopifyApi = axios.create({
  baseURL: `https://${config.shopifyStoreName}/admin/api/2024-01/`,
  headers: {
    'X-Shopify-Access-Token': config.shopifyAccessToken,
    'Content-Type': 'application/json',
  },
});

// Fetch products from Shopify
const getProducts = async () => {
  try {
    const response = await shopifyApi.get('products.json');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    throw new Error('Failed to fetch products from Shopify');
  }
};

// Fetch orders from Shopify
const getOrders = async () => {
  try {
    const response = await shopifyApi.get('orders.json?status=any');
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching orders from Shopify:', error);
    throw new Error('Failed to fetch orders from Shopify');
  }
};

// Fetch customers from Shopify
const getCustomers = async () => {
  try {
    const response = await shopifyApi.get('customers.json');
    return response.data.customers;
  } catch (error) {
    console.error('Error fetching customers from Shopify:', error);
    throw new Error('Failed to fetch customers from Shopify');
  }
};

// Calculate best-selling products
const calculateBestSellingProducts = async () => {
  try {
    // Fetch orders from Shopify
    const orders = await getOrders();
    const productSales = {};

    // Log fetched orders for debugging
    console.log('Fetched orders:', JSON.stringify(orders, null, 2));

    // Aggregate sales quantities for each product
    orders.forEach(order => {
      order.line_items.forEach(item => {
        const productId = item.product_id.toString();
        if (!productSales[productId]) {
          productSales[productId] = 0;
        }
        productSales[productId] += item.quantity;
      });
    });

    // Log product sales aggregation
    console.log('Aggregated product sales:', JSON.stringify(productSales, null, 2));

    // Update the Product collection with quantitySold
    for (const [productId, quantitySold] of Object.entries(productSales)) {
      // Ensure productId is valid
      if (mongoose.Types.ObjectId.isValid(productId)) {
        const result = await Product.updateOne(
            { _id: mongoose.Types.ObjectId(productId) },  // Ensure correct ObjectId usage
            { $inc: { quantitySold: quantitySold } },    // Increment quantitySold
            { upsert: true }  // Ensure document creation if not exists
        );
        // Log update result
        console.log(`Updated product ${productId} with quantitySold ${quantitySold}:`, result);
      } else {
        console.error(`Invalid ObjectId: ${productId}`);
      }
    }

    // Retrieve top 5 products sorted by quantitySold
    const topProducts = await Product.find({})
        .sort({ quantitySold: -1 })
        .limit(5);

    // Log top 5 products
    console.log('Top 5 products:', JSON.stringify(topProducts, null, 2));

    return topProducts;
  } catch (error) {
    console.error('Error calculating best-selling products:', error);
    throw new Error('Failed to calculate best-selling products');
  }
};

module.exports = {
  getProducts,
  getOrders,
  getCustomers,
  calculateBestSellingProducts
};
