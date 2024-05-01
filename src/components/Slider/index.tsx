"use client"
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Item {
  id: string;
  image_url: string;
  name: string;
}

interface SliderData {
  views: {
    items: Item[];
  }[];
}

interface Props {
  sliderData: SliderData[];
}

export default function SimpleSlider({ sliderData }: Props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  if (!sliderData || sliderData.length === 0 || !sliderData[0].views[0].items) {
    return null; // Handle loading state or empty data
  }

  return (
    <div className="mx-8">
      <Slider {...settings}>
        {sliderData[0].views[0].items.map((item) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={item.id} src={item.image_url} alt={item.name}  />
        ))}
      </Slider>
    </div>
  );
}
