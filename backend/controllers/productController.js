const Product = require('../models/Product');

// Controller function to get all products
exports.getProducts = async (req, res) => {
  try {
    // Fetch all products from the database using Mongoose model
    const products = await Product.find();
    // Return the list of products as JSON
    res.json(products);
  } catch (err) {
    // Handle specific errors (e.g., database connection issues)
    res.status(500).json({ message: err.message });
  }
};

// Controller function to add a new product
exports.addProduct = async (req, res) => {
  // Create a new Product instance with data from the request body
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description
  });

  try {
    // Save the new product to the database
    const newProduct = await product.save();
    // Return the saved product with a 201 Created status
    res.status(201).json(newProduct);
  } catch (err) {
    // Handle validation errors (e.g., missing required fields)
    res.status(400).json({ message: err.message });
  }
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    // Find the product by its ID and remove it from the database
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
