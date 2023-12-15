// ProductPage.js
import React, { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('your_api_endpoint/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductPage;
