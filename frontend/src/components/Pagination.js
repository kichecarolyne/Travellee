// Pagination.js
import React from 'react';
import ReactPaginate from 'react-js-pagination';

const Pagination = ({ totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
      pageCount={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default Pagination;
