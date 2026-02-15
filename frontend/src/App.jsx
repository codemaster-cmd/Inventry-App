import React, { useState, useEffect } from 'react';
import './App.css';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

function App() {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products from the backend API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/products');
      if (!response.ok) {
        // Try to parse the error message from the backend
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setProducts(data);
        setError(null);
      } else {
        throw new Error('Data format error: Expected an array of products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please ensure the backend server is running.');
      setProducts([]); // Clear products on error to prevent render issues
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to fetch products when the component mounts
  // Empty dependency array [] means it runs only once
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchProducts(); // Refresh list after delete
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Check console for details.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventory Management App</h1>
      </header>
      <main>
        <AddProduct onProductAdded={fetchProducts} />
        {loading && <p>Loading products...</p>}
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && <ProductList products={products} onDelete={handleDelete} />}
      </main>
    </div>
  );
}

export default App;
