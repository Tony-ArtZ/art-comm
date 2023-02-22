import {useState} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {IoIosArrowBack} from "react-icons/io";
import Cards from "../components/Cards";
import React from 'react'


const FeaturedFeed = () => {
  const [currentArtist, SetCurrentArtist] = useState<number>(0);
  console.log("hif")
  const nextArtist = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("hi")
    /*if(currentArtist !== 6) {
      SetCurrentArtist((prev:number)=>prev++)
    }
    else {
      SetCurrentArtist(0)
      }*/
    }

  const prevArtist = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    /*if(currentArtist !== 0) {
      SetCurrentArtist(6)
    }
    else {
      SetCurrentArtist((prev:number)=>prev--)
      }*/ 
    console.log('hi')
  }

    return (
      <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-featured bg-cover h-[400px] ">
        <h1 className="pt-8 pl-8 text-3xl font-extrabold text-heading font-Inter sm:text-4xl sm:pt-14 sm:pl-12 lg:text-5xl xl:text-6xl lg:pt-16 2xl:text-7xl 2xl:pt-20">
          FEATURED ARTISTS
        </h1>
        <section className= "flex w-full h-fit mt-[70px] justify-center 2xl:gap-12 items-center flex-row sm:mt-52 xl:my-64">
          <button onClick={prevArtist} className="text-5xl text-interactive drop-shadow-glowHigh md:text-6xl xl:text-7xl">
            <IoIosArrowBack />
          </button>
          <div className="flex w-full h-full overflow-hidden" style={{transform : `translateX(currentArtist * ${currentArtist})`}}>
          <div className="flex flex-row w-full h-full gap-2">
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
          </div>
          </div>
          <button onClick={nextArtist} className="text-5xl text-interactive drop-shadow-glowHigh md:text-6xl xl:text-7xl">
            <IoIosArrowForward />
          </button>
        </section>
      </header>
    )
  }

export default FeaturedFeed
