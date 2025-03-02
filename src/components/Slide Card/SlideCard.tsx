"use client"
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomNextArrow, CustomPrevArrow } from '@/components/Slide Card/CustomSlideButtons'
import Image from "next/image";

interface MovieData {
  contentId: string;
  movie_name: string;
  movieDescription: string;
  moviePosterUrl: string;
  language: string;
  genre: [];
  releaseDate: string;
}

interface UpcomingData {
  upcomingMovieData: MovieData[];
}

interface Props {
  upComingData: UpcomingData | null | undefined;
}

const SwipeToSlide: React.FC<Props> = ({ upComingData }) => {

  function reverseDate(date: string) {
    return date.split("-").reverse().join("-")
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
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
        {upComingData?.upcomingMovieData?.slice(0, 4).map((item: MovieData) => (
          <div className="p-4" key={item.contentId}>
            <div className="bg-white shadow-md rounded-md overflow-hidden lg:w-72 ">
              <img src={item.moviePosterUrl} alt={item.movie_name} className="lg:w-72 h-96 object-cover" loading='lazy' />
              <div className="p-4">
                <h6 className="text-base font-bold mb-2">{item.movie_name}</h6>
                <p className="text-sm">{item.language}</p>
                <div className="text-gray-700 flex gap-4 text-sm mt-2">{item.genre.map((i: string, idx: number) => (
                  <p key={idx}>{i}</p>
                ))}</div>
                <div className=" flex gap-2 mt-2 ">
                  <p>Release Date</p>
                  <p>{reverseDate(item.releaseDate)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SwipeToSlide;
