import React from 'react';

const Destination = ({ image, title, description, location }) => {
  return (
    <div>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Location: {location}</p>
    </div>
  );
};

export default Destination;
