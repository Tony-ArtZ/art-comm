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
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import {useState} from "react";

const Hero = ({user, userData}: {user: User, userData:any}) => {
  const [searchQuery, SetSearchQuery] = useState("")
  const router = useRouter()
  const supabaseClient = useSupabaseClient();
  console.log(user)

  const signOut = async (e:React.MouseEvent<HTMLButtonElement>)=> {
    e.preventDefault()
    await supabaseClient.auth.signOut()
    router.push('/')
  }

  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    SetSearchQuery(e.target.value)
  }

  const handleSearch = (e:React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/search/?search=${searchQuery}`)
  }

  return (
    <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-hero bg-cover h-[400px] ">
      <Image
        src={artist}
        alt="artist"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAADXUAAA11AFeZeUIAAABXklEQVQYGQ2Qy2oaUQBAj9N7R+ehNOpoxGpsMISsSqFdBEK/pb/UH+g/ZJlVFw0EkkWoDRTSPIqNRjrVinNHr/Ps7M/hwCl9/XSa/yg7bFM4MDRLKdFxTKJSRP0lh1aOuJ8iLsoNjEad8K/PuOEQuB30dEHgZKxn//jjSgZNDxFbLhVKhDrHLgTTlDyoAKtcwm4LgkRiejYi2kaMp4owWJGNcrwsZN8MeZhvUJmk39tFqhjDy9b0Oiab+ZzF1SV7/h0fjvd5M2ihbn9z82VEKwwQwyLzzWnSHb5GPid0Xzkkeco2C5isVphxBZsE8T2IeFzO2OnYzHLB56cFb90q59e/SO0Ke4fvuMZAnDQEu2nMz8kd/njEC88jCTVHtR1q3TZ1rRk+rRDvLYM+Md2yYLN0eS5ytzePfCygQaKwsohqqhFqveFs4pPUS7R6xUNfIatNanqLF60xXAv6bf4D/GKcUkXKFHYAAAAASUVORK5CYII="
        className="absolute right-8 lg:right-32 2xl:top-20 xl:top-32 sm:top-32 hidden sm-md:flex 2xl:h-[780px] xl:h-[600px] sm:h-[450px] 2xl:w-[780px] xl:w-[600px] sm:w-[450px] animate-float"
      />
      <NavBar user={user} userData={userData} signOut={signOut} router={router} search={handleSearch} handleSearchInput={handleSearchInput}/>
      <section className="z-10 flex flex-col items-center justify-center w-full pt-20 pl-0 2xl:pt-72 xl:pt-64 sm:pt-32 sm-md:pt-48 sm-md:pl-12 sm-md:w-min">
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

