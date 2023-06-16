import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import bg from "../public/card-bg.png";
import icon from "../public/card-icon.png";

interface UserData {
  id: string;
  categories: string[];
  post_ids: string[];
  name: string;
  Users: {
    profile_picture: string;
    banner_picture: string;
    user_name: string;
  };
}
const Cards = ({ userData }: { userData: UserData }) => {
  const router = useRouter();
  const handleOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/profile/${userData.id}`);
  };

  return (
    <div className="h-48 w-48 md:h-64 md:w-64 lg:w-80 lg:h-80 2xl:h-96 2xl:w-96 relative rounded-[25px] bg-primary flex flex-col flex-shrink-0 items-center drop-shadow-glow">
      <Image
        width={500}
        height={800}
        src={userData.Users.banner_picture}
        alt="cardimage"
        className="w-full h-24 md:h-36 lg:h-44 rounded-t-[25px] object-cover"
      />
      {/*<AiFillHeart className="absolute text-3xl md:text-4xl drop-shadow-glow text-interactive top-2 left-2 md:left-4 md:top-4" />/*/}
      <Image
        width={64}
        height={64}
        src={userData.Users.profile_picture}
        alt="pfp"
        className="absolute left-auto right-auto rounded-full outline outline-4 outline-primary max-w-min top-16 w-14 h-14 md:h-16 md:w-16 md:top-28 lg:h-20 lg:w-20 lg:top-32 shadow-glow"
      />
      <button
        onClick={handleOrder}
        className="p-2 text-xs md:text-sm md:p-3 lg:p-[14px] lg:rounded-[32px] font-Inter bg-interactive text-white shadow-glow absolute right-2 top-14 md:rounded-[32px] md:top-24 lg:top-[120px] rounded-2xl"
      >
        ORDER
      </button>
      <h1 className="pt-6 text-xl font-Inter text-heading md:text-2xl md:pt-8 lg:text-3xl">
        {userData.Users.user_name}
      </h1>
      <h1 className="mt-1 text-interactive text-md md:text-xl md:mt-2 lg:text-2xl lg:mt-4 font-Inter">
        {userData.categories.toString()}
      </h1>
    </div>
  );
};

export default Cards;
