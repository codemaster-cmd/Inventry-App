import React from 'react';

// ProductList component receives 'products' array and 'onDelete' function as props
const ProductList = ({ products, onDelete }) => {
  // Safety check: ensure products is an array before trying to map
  if (!Array.isArray(products)) {
    return <p>No products available or invalid data format.</p>;
  }

  return (
    <div className="product-list">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <div>
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>{product.description}</p>
              </div>
              <button onClick={() => onDelete(product._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
