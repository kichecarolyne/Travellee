// Slider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';

const CustomPrevArrow = (props) => (
  <div {...props} className="custom-arrow custom-prev-arrow">
    Prev
  </div>
);

const CustomNextArrow = (props) => (
  <div {...props} className="custom-arrow custom-next-arrow">
    Next
  </div>
);

const CustomSlider = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Slider {...settings}>
      {data.map((item) => (
        <div key={item.id} className="slide">
          <h3>{item.title}</h3>
          <img src={item.image} alt={item.title} className="slide-image" />
          <p className="slide-description">{item.description}</p>
          <p className="slide-location">Location: {item.location}</p>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
