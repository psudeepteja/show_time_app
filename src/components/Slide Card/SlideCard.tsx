"use client"
import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SwipeToSlide = ({ upComingData }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    
    responsive: [	
        {
            breakpoint: 1536,
            settings: {
              slidesToShow: 3,
            },
          },
        {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
            },
          },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="2xl:mx-16">
      <Slider {...settings}>
      {upComingData.upcomingMovieData.map((item)=>(
        <div className="p-4" key={item.contentId}>
          <div className="bg-white shadow-md rounded-md overflow-hidden lg:w-72 ">
            <img src={item.moviePosterUrl} alt={item.movie_name} className="lg:w-72 h-96 object-cover" />
            <div className="p-4">
              <h6 className="text-base font-semibold mb-2">{item.movie_name}</h6>
              <p className="text-gray-700">{item.movieDescription}</p>
            </div>
          </div>
        </div>
      ))}
        
      </Slider>
    </div>
  );
};

export default SwipeToSlide;
