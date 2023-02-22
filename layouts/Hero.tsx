import Image from "next/image";
import artist from "../public/artist.png";
import { FaSearch } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import {
  User
} from '@supabase/auth-helpers-nextjs';
import {
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";

const Hero = ({user, userData}: {user: User, userData:any}) => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient();
  console.log(user)

  const signOut = async (e:React.MouseEvent<HTMLButtonElement>)=> {
    e.preventDefault()
    await supabaseClient.auth.signOut()
    router.push('/')
  }

  return (
    <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-hero bg-cover h-[400px] ">
      <Image
        src={artist}
        alt="artist"
        className="absolute right-8 lg:right-32 2xl:top-20 xl:top-32 sm:top-32 hidden sm-md:flex 2xl:h-[780px] xl:h-[600px] sm:h-[450px] 2xl:w-[780px] xl:w-[600px] sm:w-[450px] animate-float"
      />
      <nav className="absolute flex flex-row justify-between w-screen px-4 py-5 sm:bg-none md:shadow-none bg-secondary sm:px-8">
        <button>
          <BiMenu className="text-interactive drop-shadow-glow sm:text-[55px] text-5xl" />
        </button>
        <div className=" h-11 sm:h-12 2xl:h-14 absolute left-0 right-0 sm:ml-auto sm:mr-auto ml-20 mr-auto xl:w-[400px] 2xl:w-[456px] sm:w-[350px] w-[60vw] flex flex-row justify-center items-center">
          <input className=" bg-primary text-white md:text-xl text-xs font-inter shadow-glowLow rounded-[40px] h-full pl-6 w-full outline-none " />
          <div className="h-full 2xl:w-14 sm:w-12 w-11 absolute right-0 rounded-full outline outline-secondary sm:outline-[12px] outline-[8px]" />
          <button className="absolute right-0 flex items-center justify-center h-full text-xl text-white rounded-full w-11 shadow-glowLow 2xl:w-14 sm:w-12">
            <FaSearch
              fontSize="24px"
              className="text-secondary 2xl:text-[24px] sm:text-xl text-lg hover:text-white hover:drop-shadow-glowHigh 2xl:hover:text-3xl sm:hover:text-2xl hover:text-xl transition-all ease-in-out"
            />
          </button>
        </div>
        <ul className="absolute flex flex-row mt-0 md:mt-2 gap-2 2xl:gap-8 xl:gap-4 sm:mt-3 xl:right-24 sm:right-8 lg:right-12 right-4">
          {user? (
            <>
            <Link href={`/profile/${user?.id}`} className="hidden md:list-item">{userData?.user_name}</Link>
            <button onClick={signOut} className="hidden md:list-item">
            Signout
            </button>
            <Link href={`/profile/${user?.id}`}>
            <Image width={24} height={24} alt="Profile" className="p-0 m-0 border-2 rounded-full w-14 h-14 border-interactive drop-shadow-glow md:hidden" src={userData.profile_picture} />
            </Link>
            </>
          ):(
            <>
              <Link href="" className="hidden list-item lg:flex">
                Become An Artist
              </Link>
              <Link href="/signin" className="hidden list-item sm:flex">
                Sign In
              </Link>
              <Link href="/register" className="list-item">
                Join Us
              </Link>
            </>
          )}
        </ul>
      </nav>
      <section className="z-10 flex flex-col items-center justify-center w-full pt-32 pl-0 2xl:pt-72 xl:pt-64 sm:pt-32 sm-md:pt-48 sm-md:pl-12 sm-md:w-min">
        <h1 className="xl:w-[600px] sm-md:w-[400px] md:w-[500px] sm:w-[600px] w-80 leading-tight font-Inter text-heading text-center  sm-md:text-[50px] lg:text-[60px] 2xl:text-[80px] xl:text-[70px] sm:text-[70px] text-[40px]">
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

