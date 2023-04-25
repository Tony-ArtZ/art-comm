import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import bg from "../public/card-bg.png";
import icon from "../public/card-icon.png";

const Cards = () => {
  return (
    <div className="h-48 w-48 md:h-64 md:w-64 lg:w-80 lg:h-80 2xl:h-96 2xl:w-96 relative rounded-[25px] bg-primary flex flex-col flex-shrink-0 items-center drop-shadow-glow">
      <Image
        src={bg}
        alt="cardimage"
        className="w-full h-24 md:h-36 lg:h-44 rounded-t-[25px]"
      />
      <AiFillHeart className="absolute text-3xl md:text-4xl drop-shadow-glow text-interactive top-2 left-2 md:left-4 md:top-4" />
      <Image
        src={icon}
        alt="pfp"
        className="absolute left-auto right-auto rounded-full outline outline-4 outline-primary max-w-min top-16 w-14 h-14 md:h-16 md:w-16 md:top-28 lg:h-20 lg:w-20 lg:top-32 shadow-glow"
      />
      <button className="p-2 text-xs md:text-sm md:p-3 lg:p-[14px] lg:rounded-[32px] font-Inter bg-interactive text-white shadow-glow absolute right-2 top-14 md:rounded-[32px] md:top-24 lg:top-[120px] rounded-2xl">
        {" "}
        ORDER{" "}
      </button>
      <h1 className="pt-6 text-xl font-Inter text-heading md:text-2xl md:pt-8 lg:text-3xl">
        TonyArtZ
      </h1>
      <h1 className="mt-1 text-interactive text-md md:text-xl md:mt-2 lg:text-2xl lg:mt-4 font-Inter">
        {" "}
        2D, 3D{" "}
      </h1>
    </div>
  );
};

export default Cards;
