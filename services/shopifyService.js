const axios = require('axios');
const config = require('../config/config');

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

module.exports = {
  getProducts,
  getOrders,
  getCustomers,
};
