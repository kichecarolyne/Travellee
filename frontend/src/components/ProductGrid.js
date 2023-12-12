// ProductGrid.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import './Product.css';
import './Page.css';



const ProductGrid = ({ products, itemsPerPage, onAddToFavorites, showPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    // Update the displayedProducts when the currentPage or products change
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="product-grid">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} data={product} onAddToFavorites={onAddToFavorites} />
        ))}
      </div>
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductGrid;
