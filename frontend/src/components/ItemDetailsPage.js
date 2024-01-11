import React from 'react';
import Favorite from './Favorites';

const ItemDetailsPage = ({ itemType, itemId, authToken }) => {
  return (
    <div>
      <h2>Item Details</h2>
      {/* Display item details here */}
      <Favorite itemType={itemType} itemId={itemId} authToken={authToken} />
    </div>
  );
};

export default ItemDetailsPage;
