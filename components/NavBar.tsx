import {User} from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {BiMenu} from "react-icons/bi";
import {FaSearch} from "react-icons/fa";
import SideBar from "./SideBar";

export default function NavBar ({user, userData, signOut}: {user: User, userData: any, signOut: (e:React.MouseEvent<HTMLButtonElement>)=>Promise<void>}) {
  const [showSideBar, SetShowSideBar] = useState(false)
  const handleSideBarClosing = () => {
    SetShowSideBar(false)
  }
  return (
    <>
      <SideBar user={user} userData={userData} showSideBar={showSideBar} handleSideBarClosing={handleSideBarClosing} signOut={signOut}/>
      <nav className="absolute flex flex-row justify-between w-screen px-4 py-5 sm:bg-none md:shadow-none bg-secondary sm:px-8">
        <button onClick={()=> SetShowSideBar(true)}>
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
            <button  className="hidden md:list-item">
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
      </>
  )
}
