import {IoIosArrowForward} from "react-icons/io";
import {IoIosArrowBack} from "react-icons/io";
import Cards from "../components/Cards";

const FeaturedFeed = () => {
    return (
      <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-featured bg-cover h-[300px] ">
        <h1 className="text-xl text-heading font-Inter pt-6 pl-5 sm:text-4xl sm:pt-14 sm:pl-12 lg:text-5xl xl:text-6xl lg:pt-16 2xl:text-7xl 2xl:pt-20">
          FEATURED ARTISTS
        </h1>
        <section className= "flex w-full h-fit mt-[70px] justify-center gap-3 2xl:gap-12 items-center flex-row sm:mt-52 xl:my-64">
          <IoIosArrowBack className="text-interactive drop-shadow-glowHigh text-5xl md:text-6xl xl:text-7xl "/>
          <Cards/>
          <Cards/>
          <Cards/>
          <IoIosArrowForward className="text-interactive drop-shadow-glowHigh text-5xl  md:text-6xl xl:text-7xl "/>
        </section>
      </header>
    )
  }

export default FeaturedFeed