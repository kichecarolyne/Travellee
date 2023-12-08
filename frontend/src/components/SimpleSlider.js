import React from 'react';
import CustomSlider from './Slider';

const SimpleSlider = () => {
  const destinationsData = [
    {
      id: 1,
      image: 'https://i.imgur.com/6reje4u.png',
      title: 'Great Barrier Reef',
      description: 'The Great Barrier Reef is a site of remarkable variety and beauty on the north-east coast of Australia.',
      location: 'Australia',
    },
    {
      id: 2,
      image: 'https://i.imgur.com/f8GBuyu.png',
      title: 'Maasai Mara',
      description: 'World famous for hosting the epic Great Migration, the Masai Mara welcomes 1.5 million wildebeests onto its sprawling savannahs each July through October.',
      location: 'Kenya',
    },
    {
      id: 3,
      image: 'https://i.imgur.com/Ql9GUDS.png',
      title: 'Machu Picchu',
      description: 'It is also called the Flavian Amphitheatre. It is an elliptical structure made of stone, concrete, and tuff, and it stands four stories tall at its highest point.',
      location: 'Peru',
    },
    {
      id: 4,
      image: 'https://i.imgur.com/aTFVie9.png',
      title: 'Zanzibar Beaches',
      description: 'Zanzibar Island is one of the top beach holiday destinations in the world ranked as the number one in Africa.',
      location: 'Zanzibar',
    },
  ];

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
      id: 3,
      image: 'https://i.imgur.com/86Z7TRk.png',
      title: 'Hotel Hanalei',
      description: 'Enjoy plenty of special experiences throughout your stay at no extra cost.',
      location: 'Hawaii',
    },
  ];
  return (
    <div>
      <h1>Destinations</h1>
      <CustomSlider data={destinationsData} />

      <h1>Hotels</h1>
      <CustomSlider data={hotelsData} />
    </div>
  );
};
  
export default SimpleSlider;
