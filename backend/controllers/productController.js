const Product = require('../models/Product');

// Controller function to get all products for the logged-in user
exports.getProducts = async (req, res) => {
  try {
    // Fetch products belonging to the user
    const products = await Product.find({ user: req.user.id });
    // Return the list of products as JSON
    res.json(products);
  } catch (err) {
    // Handle specific errors (e.g., database connection issues)
    res.status(500).json({ message: err.message });
  }
};

// Controller function to add a new product for the logged-in user
exports.addProduct = async (req, res) => {
  // Create a new Product instance with data from the request body and user id
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    user: req.user.id
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

// Controller function to delete a product by ID, verifying ownership
exports.deleteProduct = async (req, res) => {
  try {
    // Find the product by its ID and user ID and remove it from the database
    const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found or not authorized to delete' });
    }
    
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
