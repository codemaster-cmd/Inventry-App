import React from 'react';
import { Trash2 } from 'lucide-react';

const ProductList = ({ products, onDelete }) => {
  if (!Array.isArray(products)) {
    return <div className="empty-state">No products available or invalid data format.</div>;
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No inventory found</h3>
        <p>Add your first product above to start managing stock.</p>
      </div>
    );
  }

  const getStatusBadge = (qty) => {
    if (qty === 0) return <span className="badge badge-danger">Out of Stock</span>;
    if (qty <= 5) return <span className="badge badge-warning">Low Stock ({qty})</span>;
    return <span className="badge badge-success">In Stock</span>;
  };

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th align="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <span className="product-name">{product.name}</span>
                <span className="product-desc" title={product.description}>{product.description}</span>
              </td>
              <td className="price-col">₹{product.price}</td>
              <td className="qty-col">{product.quantity}</td>
              <td>{getStatusBadge(product.quantity)}</td>
              <td align="right">
                <button 
                  className="action-btn delete" 
                  onClick={() => onDelete(product._id)}
                  title="Delete Item"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
