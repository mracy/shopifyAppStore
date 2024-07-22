const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  brand: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  quantitySold: {
    type: Number,
    default: 0
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
