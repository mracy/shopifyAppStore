const Product = require('../models/Product');
const productService = require('../services/productService');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Failed to create product' });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ error: 'Failed to update product' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Get top-selling products
const getTopSellingProducts = async (req, res) => {
  try {
    // Fetch top 5 products based on quantitySold in descending order
    const topSellingProducts = await Product.find()
        .sort({ quantitySold: -1 })
        .limit(5)
        .exec();

    res.json(topSellingProducts);
  } catch (error) {
    console.error('Error fetching top-selling products:', error);
    res.status(500).json({ message: 'Error fetching top-selling products', error });
  }
};

// Get best-selling products
const getBestSellingProducts = async (req, res) => {
  try {
    const products = await productService.calculateBestSellingProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching best-selling products:', error);
    res.status(500).json({ error: 'Failed to fetch best-selling products' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getTopSellingProducts,
  getBestSellingProducts
};
