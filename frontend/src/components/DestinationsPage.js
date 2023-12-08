import React from 'react';
import Destination from './Destinations';
import SimpleSlider from './SimpleSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const destinationsData = [
  {
    id: 1,
    image: 'https://i.imgur.com/6reje4u.png',
    title: ' Great barrier reef',
    description: 'The Great Barrier Reef is a site of remarkable variety and beauty on the north-east coast of Australia.',
    location: 'Australia',
  },
  {
    id: 2,
    image: 'https://i.imgur.com/f8GBuyu.png',
    title: ' Maasai Mara',
    description: 'World famous for hosting the epic Great Migration, the Masai Mara welcomes 1,5 million wildebeests onto its sprawling savannahs each July through October.',
    location: ' Kenya',
  },
  {
    id: 3,
    image: 'https://i.imgur.com/Ql9GUDS.png',
    title: ' Machu Picchu',
    description: 'It is also called the Flavian Amphitheatre. It is an elliptical structure made of stone, concrete, and tuff, and it stands four stories tall at its highest point.',
    location: 'Peru',
  },
  {
    id: 4,
    image: 'https://i.imgur.com/aTFVie9.png',
    title: 'Zanzibar Beaches',
    description: 'Zanzibar Island is one of the top beach holiday destinations in the world raked as the number one in Africa.',
    location: 'Zanzibar',
  },
];

const DestinationsPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h1>Destinations</h1>
        {destinationsData.map((destination) => (
          <Destination
            key={destination.id}
            image={destination.image}
            title={destination.title}
            description={destination.description}
            location={destination.location}
          />
        ))}
         <SimpleSlider />
    </div>
  );
};

export default DestinationsPage;
