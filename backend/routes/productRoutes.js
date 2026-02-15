const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes and map them to controller functions

// Route to get all products
// Method: GET
// Endpoint: /products/
router.get('/', productController.getProducts);

// Route to add a new product
// Method: POST
// Endpoint: /products/
router.post('/', productController.addProduct);

// Route to delete a product
// Method: DELETE
// Endpoint: /products/:id
// :id is a route parameter representing the product's ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
