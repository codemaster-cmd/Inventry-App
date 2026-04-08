const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Define routes and map them to controller functions, protecting them with authMiddleware

// Route to get all products for logged-in user
// Method: GET
// Endpoint: /products/
router.get('/', authMiddleware, productController.getProducts);

// Route to add a new product for logged-in user
// Method: POST
// Endpoint: /products/
router.post('/', authMiddleware, productController.addProduct);

// Route to delete a product for logged-in user
// Method: DELETE
// Endpoint: /products/:id
// :id is a route parameter representing the product's ID
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
