const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Import routes
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS to allow requests from the frontend
app.use(express.json()); // Parse JSON bodies in requests

// MongoDB Connection
// Connects to the local MongoDB database named 'inventoryApp'
mongoose.connect('mongodb://localhost:27017/inventoryApp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
// All requests starting with /products will be handled by the productRoutes
app.use('/products', productRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
