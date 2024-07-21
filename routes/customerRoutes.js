const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Define routes with proper callback functions
router.post('/create', customerController.createCustomer); // Ensure `createCustomer` is defined in customerController
router.get('/:id', customerController.getCustomerById); // Ensure `getCustomerById` is defined in customerController

// Additional routes
router.post('/', customerController.addCustomer); // Add customer
router.get('/', customerController.getCustomers); // Get all customers
router.put('/:id', customerController.updateCustomer); // Update customer by ID
router.delete('/:id', customerController.deleteCustomer); // Delete customer by ID
router.get('/most-valuable', customerController.getMostValuableCustomers); // Get most valuable customers

module.exports = router;
