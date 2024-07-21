// config/config.js
require('dotenv').config();

module.exports = {
  mongodbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  shopifyApiKey: process.env.SHOPIFY_API_KEY,
  shopifyApiSecret: process.env.SHOPIFY_API_SECRET,
  shopifyStoreName: process.env.SHOPIFY_STORE_NAME,
  shopifyAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
};
