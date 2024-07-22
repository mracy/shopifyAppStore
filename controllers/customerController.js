const Customer = require('../models/Customer');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const customerData = {
      customerId: req.body.customerId,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      addresses: req.body.addresses || [],
      createdAt: req.body.createdAt || new Date(),
      updatedAt: req.body.updatedAt || new Date(),
      ordersCount: req.body.ordersCount || 0,
      totalSpent: req.body.totalSpent || 0,
      tags: req.body.tags || [],
      note: req.body.note || '',
      verifiedEmail: req.body.verifiedEmail || false,
      acceptsMarketing: req.body.acceptsMarketing || false,
      lastOrderId: req.body.lastOrderId || null,
      lastOrderName: req.body.lastOrderName || null,
      purchasedProducts: req.body.purchasedProducts || []
    };

    const customer = new Customer(customerData);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
};


// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
};

// Add a new customer
const addCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const customer = new Customer(customerData);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(400).json({ error: 'Failed to add customer' });
  }
};

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

// Update customer by ID
const updateCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const customer = await Customer.findByIdAndUpdate(req.params.id, customerData, { new: true });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

// Delete customer by ID
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

// Function to get the most valuable customers
const getMostValuableCustomers = async (req, res) => {
  try {
    // Fetch customers sorted by totalSpent in descending order and limit to 5
    const customers = await Customer.find().sort({ totalSpent: -1 }).limit(5);
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching most valuable customers:', error);
    res.status(500).json({ error: 'Failed to fetch most valuable customers' });
  }
};



module.exports = {
  createCustomer,
  getCustomerById,
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getMostValuableCustomers
};