import React from 'react';
import Hotel from './Hotels';
import SimpleSlider from './SimpleSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const hotelsData = [
  {
    id: 1,
    image: 'https://i.imgur.com/K5PkOJA.png',
    title: 'The Oberoi Amarvillas Hotel',
    description: 'Located just 600 metres from the Taj Mahal.',
    location: 'Agra',
  },
  {
    id: 2,
    image: 'https://i.imgur.com/SGviteB.png',
    title: 'Four Seasons Hotel',
    description: 'A luxury hotel and a soothing oasis of superb interiors right in the heart of the City.',
    location: 'Mexico',
  },
  {
    id: 2,
    image: 'https://i.imgur.com/86Z7TRk.png',
    title: 'Hotel Hanalei',
    description: 'Enjoy plenty of special experiences throughout your stay at no extra cost.',
    location: 'Hawaii',
  },
];

const HotelsPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h1>Hotels</h1>
        {hotelsData.map((hotel) => (
          <Hotel
            key={hotel.id}
            image={hotel.image}
            title={hotel.title}
            description={hotel.description}
            location={hotel.location}
          />
        ))}
         <SimpleSlider />
    </div>
  );
};

export default HotelsPage;
