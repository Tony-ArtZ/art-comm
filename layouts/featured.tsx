import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Cards from "../components/Cards";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cardData = [
  {
    id: 1,
    title: "Card 1",
    image: "image-1.jpg",
    description: "Description for card 1",
  },
  {
    id: 2,
    title: "Card 2",
    image: "image-2.jpg",
    description: "Description for card 2",
  },
  {
    id: 3,
    title: "Card 3",
    image: "image-3.jpg",
    description: "Description for card 3",
  },
  {
    id: 4,
    title: "Card 4",
    image: "image-4.jpg",
    description: "Description for card 4",
  },
  {
    id: 5,
    title: "Card 5",
    image: "image-5.jpg",
    description: "Description for card 5",
  },
];

const renderCards = () => {
  return cardData.map((card) => {
    return <Cards />;
  });
};

const CarouselFeed = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "80px",
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
    hidePrevNextControls: true,
    prevArrow: (
      <div>
        <IoIosArrowForward className="absolute text-3xl text-interactive" />
      </div>
    ),
    nextArrow: (
      <div>
        <IoIosArrowBack className="absolute text-3xl text-interactive" />
      </div>
    ),
  };

  return (
    <div>
      <Slider {...settings}>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </Slider>
    </div>
  );
};

const FeaturedFeed = () => {
  const [currentArtist, SetCurrentArtist] = useState<number>(0);

  return (
    <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-featured bg-cover h-[400px] ">
      <h1 className="pt-8 pl-8 text-3xl font-extrabold text-heading font-Inter sm:text-4xl sm:pt-14 sm:pl-12 lg:text-5xl xl:text-6xl lg:pt-16 2xl:text-7xl 2xl:pt-20">
        FEATURED ARTISTS
      </h1>
      <div dir="rtl" className="mt-20">
        <CarouselFeed />
      </div>
    </header>
  );
};

export default FeaturedFeed;
