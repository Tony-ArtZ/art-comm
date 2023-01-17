import Image from "next/image";
import artist from "../public/artist.png";
import { FaSearch } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

const Hero = () => {
    return (
      <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-hero bg-cover h-[300px] ">
        <Image
          src={artist}
          alt="artist"
          className="absolute right-8 lg:right-32 2xl:top-20 xl:top-32 sm:top-32 hidden sm-md:flex 2xl:h-[780px] xl:h-[600px] sm:h-[450px] 2xl:w-[780px] xl:w-[600px] sm:w-[450px] animate-float"
        />
        <nav className="flex py-5 sm:px-8 px-4 flex-row w-screen absolute justify-between">
          <button>
            <BiMenu className="text-interactive drop-shadow-glow sm:text-[55px] text-4xl" />
          </button>
          <div className=" h-8 sm:h-12 2xl:h-14 absolute left-0 right-0 sm:ml-auto sm:mr-auto ml-auto mr-auto xl:w-[400px] 2xl:w-[456px] sm:w-[350px] w-[50vw] flex flex-row justify-center items-center">
            <input className=" bg-primary text-white text-xl font-inter shadow-glowLow rounded-[40px] h-full pl-6 w-full outline-none " />
            <div className="h-full 2xl:w-14 sm:w-12 w-8 absolute right-0 rounded-full outline outline-secondary sm:outline-[12px] outline-[8px]" />
            <button className=" text-white text-xl flex justify-center shadow-glowLow items-center 2xl:w-14 sm:w-12 w-8 h-full right-0 absolute rounded-full">
              <FaSearch
                fontSize="24px"
                className="text-secondary 2xl:text-[24px] sm:text-xl text-lg hover:text-white hover:drop-shadow-glowHigh 2xl:hover:text-3xl sm:hover:text-2xl hover:text-xl transition-all ease-in-out"
              />
            </button>
          </div>
          <ul className="flex gap-2 2xl:gap-8 xl:gap-4 sm:mt-3 mt-2 flex-row absolute xl:right-24 sm:right-8 lg:right-12 right-4">
            <li className="list-item lg:flex hidden">Become An Artist</li>
            <li className="list-item sm:flex hidden">Sign In</li>
            <li className="list-item">Join Us</li>
          </ul>
        </nav>
        <section className="flex z-10 flex-col 2xl:pt-72 xl:pt-64 sm:pt-32 pt-24 sm-md:pt-48 sm-md:pl-12 pl-0 justify-center sm-md:w-min w-full items-center">
          <h1 className="xl:w-[600px] sm-md:w-[400px] md:w-[500px] sm:w-[600px] w-80 leading-tight font-Inter text-heading text-center  sm-md:text-[50px] lg:text-[60px] 2xl:text-[80px] xl:text-[70px] sm:text-[70px] text-[30px]">
            YOUR ART JOURNEY BEGINS HERE
          </h1>
          <button className="btn-primary before:content-[''] font-inter">
            Get Started
          </button>
        </section>
      </header>
    );
  };
  

export default Hero