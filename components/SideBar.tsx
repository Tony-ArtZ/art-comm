import {User} from "@supabase/supabase-js";
import {IoIosClose} from "react-icons/io";

export default function SideBar ({user, userData, showSideBar, handleSideBarClosing, signOut}: {user: User, userData: any, showSideBar: boolean, handleSideBarClosing: ()=>void, signOut: (e:React.MouseEvent<HTMLButtonElement>)=>Promise<void>}) {
  return (
    <>
    <div className={`w-9/12 h-screen bg-primary fixed ${!showSideBar?"-left-[1000px]":"left-0"} shadow-glowHigh transition-all ease-in-out duration-300 z-50 `}>
        <button onClick={()=>handleSideBarClosing()} className="mt-2 text-5xl text-interactive"><IoIosClose/></button>
      { user && <button onClick={signOut} className="mt-2 text-interactive">Sign Out</button>}
    </div>
      { showSideBar && <div className="fixed z-40 w-screen h-screen" onClick={()=>handleSideBarClosing()}/>}
    </>
  )
}
