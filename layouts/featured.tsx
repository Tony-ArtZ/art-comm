import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Cards from "../components/Cards";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface UserData {
  id: string,
  categories: string[],
  post_ids: string[],
  name: string,
  Users: {
    profile_picture:string,
    banner_picture:string,
    user_name:string
  }
}

const FeaturedFeed = ({artists}:{artists:UserData[]}) => {

  return (
    <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-featured bg-cover h-[400px] ">
      <h1 className="pt-8 pl-8 text-3xl font-extrabold text-heading font-Inter sm:text-4xl sm:pt-14 sm:pl-12 lg:text-5xl xl:text-6xl lg:pt-16 2xl:text-7xl 2xl:pt-20">
        FEATURED ARTISTS
      </h1>
      <div className="mt-20">
        <Carousel centerMode renderArrowNext={(clickHandler: () => void, hasNext: boolean, label: string)=> hasNext && <IoIosArrowForward onClick={clickHandler} className="absolute top-0 bottom-0 z-20 flex items-center justify-center w-12 h-12 p-1 my-auto text-4xl font-extrabold border-4 border-solid rounded-full border-interactive text-interactive drop-shadow-glowHigh right-2 bg-secondary"/>} renderArrowPrev={(clickHandler: () => void, hasPrev: boolean, label: string)=> hasPrev && <IoIosArrowBack onClick={clickHandler} className="absolute top-0 bottom-0 z-20 flex items-center justify-center w-12 h-12 p-1 my-auto text-4xl font-extrabold border-4 border-solid rounded-full border-interactive text-interactive drop-shadow-glowHigh left-2 bg-secondary"/>} showArrows showStatus={false} centerSlidePercentage={50} autoPlay infiniteLoop>
          {artists && artists?.map((artist)=><Cards userData={artist}/>)}
        </Carousel>
      </div>
    </header>
  );
};

export default FeaturedFeed;
