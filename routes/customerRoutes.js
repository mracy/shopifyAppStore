const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to create a new customer
router.post('/create', customerController.createCustomer);

// Route to get a customer by ID
router.get('/:id', customerController.getCustomerById);

// Route to add a new customer (if different from create)
router.post('/', customerController.addCustomer);

// Route to get all customers
router.get('/', customerController.getCustomers);

// Route to update a customer by ID
router.put('/:id', customerController.updateCustomer);

// Route to delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

const getMostValuableCustomers = () => {

};
// Route to get most valuable customers
router.get('/most-valuable', getMostValuableCustomers);

module.exports = router;
