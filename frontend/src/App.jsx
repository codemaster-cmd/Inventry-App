import React, { useState, useEffect } from 'react';
// Import global styles
import './index.css';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setIsAuthenticated(true);
      setUser({ username });
    }
  }, []);

  // Function to fetch products from the backend API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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

  // useEffect hook to fetch products when the component mounts or auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={(userData) => {
      setIsAuthenticated(true);
      setUser(userData);
    }} />;
  }

  return (
    <div className="app-container">
      <header className="top-nav">
        <h1>StockVision Pro</h1>
        <button className="btn-primary" onClick={handleLogout} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Logout</button>
      </header>
      
      <main className="main-content">
        {loading && <div className="loading-state"><p>Loading analytics data...</p></div>}
        {error && <div className="error-state">
          <p>{error}</p>
        </div>}
        
        {!loading && !error && (
          <>
            <Dashboard products={products} />
            <div className="card" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Inventory Data</h2>
              </div>
              <AddProduct onProductAdded={fetchProducts} />
              <ProductList products={products} onDelete={handleDelete} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
