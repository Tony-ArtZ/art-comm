import Head from "next/head";
import Image from "next/image";
import bghero from "../public/bg_hero.svg";
import artist from "../public/artist.png";
import { FaSearch } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

const Hero = () => {
  return (
    <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-hero bg-cover h-[256px] ">
      <Image
        src={artist}
        alt="artist"
        className="absolute right-8 lg:right-32 2xl:top-20 xl:top-32 sm:top-32 hidden sm-md:flex 2xl:h-[780px] xl:h-[600px] sm:h-[450px] 2xl:w-[780px] xl:w-[600px] sm:w-[450px] animate-float"
      />
      <nav className="flex p-5 px-8 flex-row w-screen absolute justify-between">
        <button>
          <BiMenu className="text-interactive drop-shadow-glow text-[55px]" />
        </button>
        <div className=" h-8 sm:h-12 2xl:h-14 absolute left-0 right-0 ml-auto mr-auto xl:w-[400px] 2xl:w-[456px] sm:w-[350px] w-[60vw]  flex flex-row justify-center items-center">
          <input className=" bg-primary text-white text-xl font-inter shadow-glowLow rounded-[40px] h-full p-6 w-full outline-none " />
          <div className="h-full 2xl:w-14 lg:w-12  absolute right-0 rounded-full outline outline-secondary outline-[12px]" />
          <button className=" text-white text-xl flex justify-center shadow-glowLow items-center 2xl:w-14 lg:w-12 h-full right-0 absolute rounded-full ">
            <FaSearch
              fontSize="24px"
              className="text-secondary 2xl:text-[24px] lg:text-xl hover:text-white hover:drop-shadow-glowHigh 2xl:hover:text-3xl xl:hover:text-2xl transition-all ease-in-out"
            />
          </button>
        </div>
        <ul className="flex gap-2 2xl:gap-8 xl:gap-4 mt-3 flex-row absolute xl:right-24 sm:right-8 lg:right-12">
          <li className="list-item lg:flex hidden">Become An Artist</li>
          <li className="list-item">Sign In</li>
          <li className="list-item">Join Us</li>
        </ul>
      </nav>
      <section className="flex z-10 flex-col 2xl:pt-72 xl:pt-64 pt-32 sm-md:pt-48 sm:pl-12 justify-center sm-md:w-min w-full items-center">
        <h1 className="xl:w-[600px] sm-md:w-[400px] sm:w-[600px] w-full leading-tight font-Inter text-heading text-center sm-md:text-[60px] 2xl:text-[80px] xl:text-[70px] sm:text-[70px] text-3xl">
          YOUR ART JOURNEY BEGINS HERE
        </h1>
        <button className="btn-primary before:content-[''] font-inter">
          Get Started
        </button>
      </section>
    </header>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
      </main>
    </>
  );
}
