import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosClose, IoMdLogOut } from "react-icons/io";

export default function SideBar({
  user,
  userData,
  showSideBar,
  handleSideBarClosing,
  likeCount,
  signOut,
}: {
  user: User;
  userData: any;
  showSideBar: boolean;
  handleSideBarClosing: () => void;
  likeCount:null|number;
  signOut: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}) {
  const router = useRouter();

  const handleStartCreating = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      router.push("/signin");
    } else {
      userData.artist
        ? router.push("/createcommissionpost")
        : router.push("/becomeartist");
    }
  };

  return (
    <>
      <div
        className={`w-9/12 h-screen bg-primary fixed ${
          !showSideBar ? "-left-[1000px]" : "left-0"
        } shadow-glowHigh transition-all ease-in-out duration-300 z-50 `}
      >
        <div className="flex w-full mt-2 mb-4">
          <button
            onClick={() => handleSideBarClosing()}
            className="text-5xl text-interactive"
          >
            <IoIosClose />
          </button>
          {user && (
            <button
              onClick={signOut}
              className="flex items-center justify-center ml-auto mr-4 text-interactive font-Inter"
            >
              Sign Out <IoMdLogOut className="inline text-xl font-Inter" />
            </button>
          )}
        </div>
        <section className="w-full grid place-items-center">
          {user && (
            <>
              <Image
                width={64}
                height={64}
                alt="Profile"
                className="w-24 h-24 p-0 m-0 mb-2 border-4 rounded-full border-interactive drop-shadow-glow md:hidden"
                src={userData.profile_picture}
              />
              <h2 className="text-2xl text-heading font-Inter">
                {userData.user_name}
              </h2>
              <h4 className="mb-2 text-heading text-md font-Inter">Likes: {likeCount}</h4>
              <Link
                className="mb-4 text-interactive font-Inter"
                href={`/profile/${userData.id}`}
              >
                Go to profile
              </Link>
            </>
          )}
          {!user && <><h1 className="mt-4 mb-1 text-4xl font-Inter text-heading">Hello Friend!</h1><h4 className="mb-4 text-lg text-interactive font-Inter">Welcome to Art-Comm</h4></>}
          <button className="mb-6 btn-secondary" onClick={handleStartCreating}>
            {userData?.artist?"Create Post":"Start Earning"}
          </button>
        </section>
          <hr className="h-[0.1rem] mx-6 mb-4 border-none rounded-full text-interactive bg-interactive" />
      </div>
      {showSideBar && (
        <div
          className="fixed z-40 w-screen h-screen"
          onClick={() => handleSideBarClosing()}
        />
      )}
    </>
  );
}
