require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

// Import routes
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = config.port || process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Middleware to parse JSON requests

// Set up Mongoose connection
mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false); // Disable strict populate checks

const connectDB = async () => {
  try {
    console.log('MongoDB URI:', config.mongodbUri || process.env.MONGODB_URI);
    await mongoose.connect(config.mongodbUri || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
    await initializeDatabase(); // Initialize database
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Initialize database and collections
const initializeDatabase = async () => {
  try {
    // Check if collections exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    // Check and create collections if necessary
    if (!collectionNames.includes('customers')) {
      console.log('Creating customers collection');
      // Insert a dummy document to ensure collection creation
      await mongoose.connection.db.collection('customers').insertOne({ dummy: 'document' });
    }

    if (!collectionNames.includes('products')) {
      console.log('Creating products collection');
      // Insert a dummy document to ensure collection creation
      await mongoose.connection.db.collection('products').insertOne({ dummy: 'document' });
    }

    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

connectDB();

// Set up routes
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
