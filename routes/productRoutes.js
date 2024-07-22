const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getTopSellingProducts,
    getBestSellingProducts
} = require('../controllers/productController');

// Product Routes
router.get('/', getProducts); // Get all products
router.get('/top-selling-products', getTopSellingProducts); // Get top-selling products
router.get('/best-selling-products', getBestSellingProducts); // Get best-selling products
router.get('/:id', getProductById); // Get a product by ID
router.post('/', createProduct); // Create a new product
router.put('/:id', updateProduct); // Update a product by ID
router.delete('/:id', deleteProduct); // Delete a product by ID

module.exports = router;
