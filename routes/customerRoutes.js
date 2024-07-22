const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController'); // Import the controller
const { getMostValuableCustomers } = require('../controllers/customerController');
const {
    createCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

// Route to get all customers
router.get('/', getCustomers);

// Route to create a new customer
router.post('/customers', customerController.createCustomer);

// Route to get customer by ID
router.get('/:id', getCustomerById);

// Route to update customer by ID
router.put('/:id', updateCustomer);

// Route to delete customer by ID
router.delete('/:id', deleteCustomer);

// Route to get most valuable customers
router.get('/customers/most-valuable', getMostValuableCustomers); // Corrected route

module.exports = router;
