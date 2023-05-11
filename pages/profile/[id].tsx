//@format
import Head from "next/head";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "../../components/CreatePost";
import EditProfile from "../../components/EditProfile";
import { profile } from "console";
import { CircleLoader } from "react-spinners";
import CommissionPostProfile from "../../components/CommissionPostProfile";


type PaymentType = "PaymentFirst" | "HalfUpfront" | "PaymentAfter";

interface PostPrices {
  title: string;
  price: number;
}

interface PostTiers {
  id: string;
  title: string;
  imageUrl: string;
  prices: PostPrices[];
}

interface PostType {
  id:string;
  title: string;
  created_by:string;
  categories: string[];
  payment_option: PaymentType;
  tiers: PostTiers[];
}
interface UpdatedData {
  profile_picture?: string;
  banner_picture?: string;
  description?: string;
}

export default function Home({
  user,
  userData,
  accountId,
  isLiked,
  likes,
  likeCount,
  commissionPosts,
}: {
  user: User;
  userData: any;
  accountId: string;
  isLiked: boolean;
  likes: any;
  likeCount: number;
  commissionPosts: PostType[];
}) {
  const router = useRouter();
  const owner = userData ? userData.id == user.id : false;
  const isArtist = userData ? userData.artist : false;
  const [showingLikes, SetShowingLikes] = useState(true);
  const [editingProfile, SetEditingProfile] = useState(false);
  const [description, SetDescription] = useState<string>(userData?.description);
  const [avatar, SetAvatar] = useState<string>(userData?.profile_picture);
  const [banner, SetBanner] = useState<string>(userData?.banner_picture);
  const [loading, SetLoading] = useState(false);

  const inActiveButton =
    "border-4 border-solid btn-secondary bg-secondary border-interactive text-interactive hover:bg-interactive hover:border-0 hover:text-white";
  console.log(likeCount);
  const [Liked, SetLiked] = useState<boolean>(isLiked);

  useEffect(() => {
    SetLiked(isLiked);
    SetShowingLikes(true);
  }, [isLiked]);

  useEffect(() => {
    SetAvatar(userData?.profile_picture);
    SetBanner(userData?.banner_picture);
    SetDescription(userData?.description);
  }, [userData]);

  const updateLike = async () => {
    fetch("http://localhost:3000/api/update/addLike", {
      method: "POST",
      body: JSON.stringify({ likedId: accountId }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        toast.info(isLiked ? "Removed from Likes" : "Liked");
        router.push(`/profile/${userData.id}`);
      });
  };

  const handleLoading = (args: boolean) => {
    SetLoading(args);
  };

  const handleSaveSuccess = (data: UpdatedData) => {
    data.description && SetDescription(data.description);
    data.profile_picture && SetAvatar(data.profile_picture);
    data.banner_picture && SetBanner(data.banner_picture);
    SetEditingProfile(false);
    handleLoading(false);
  };

  const handleEditingProfileChange = (value: boolean) => {
    SetEditingProfile(value);
  };

  return (
    <>
      <Head>
        <title>ArtComm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center w-screen h-max bg-primary">
        {editingProfile && owner && (
          <EditProfile
            user={user}
            userData={{
              description: description,
              profile_picture: avatar,
              banner_picture: banner,
            }}
            profileEditingHandler={handleEditingProfileChange}
            createToast={(args: string) => toast.success(args)}
            handleLoading={handleLoading}
            handleSaveSuccess={handleSaveSuccess}
          />
        )}
        {loading && (
          <div className="fixed top-0 left-0 z-[100] w-screen h-screen bg-white grid place-items-center bg-opacity-90">
            <div className="flex flex-col items-center gap-4">
              <CircleLoader size={80} color="#EF798A" />
              <h1 className="text-center font-Inter text-interactive">
                Please Wait...
              </h1>
            </div>
          </div>
        )}
        <div className="flex justify-center w-screen h-64 bg-secondary">
          {userData.banner_picture && (
            <Image
              height="256"
              width="256"
              alt="banner"
              className="object-cover w-full h-full max-h-full min-h-full"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAADXUAAA11AFeZeUIAAAC9klEQVQ4ER2TSXIbZRiGn+7+e9BgDbEtO8bBKRYU3sGGA1AsYMEdWHABKhfI3bJIkR0BFrFDxdjGlmQNjdSDeuZtVUlVf0/fO37Wq1e/Nl9/8y0vPn/JoNenbipcv0dVVWBZGMehahr007/mcTpjPptRliWuY/P27RtdT4mSmM02wnFd83q1eKKualarBdvNlqZuWCyWpEmC63kYY6jrmtl8zvX1Bz5+vGK5XFBpaJZlHE9OODqaEHS6OI5xXk9ncx4eHliuVqzX6z27m5tbVuGa0WjEQb9PVhT89u4dd/e3uK6njwOGejYcjTl5foYfdLFsGxMEHSmzSfKceFcQZCXXtw94fsC2iLm+ueP4+Ig4jvcMTp+f44u1HwTssnwP9PjPHYnUFAI1SboTTYeBY8irksZyWMcJY69D1wuosVlvIuaLlWQds1yH9Ps90t2OefhEkiYaFgswaU3GbHXoS1I7KOgPKC32Mo3rcjAc0Dvocztd0BGrBgtbzBcCKOWp2+3RSBnGpdPTWffMy8tLDgYjDienDPfG9giUtm08rBZILLsdXwMaYn0Q24ZEIeVFSSKAWMpSDazVCFUEY/e6FJ5u7hmAHGW2jel0IPdLDiT5ROjT/zaEZc1UEktVKoojNlGkAJV0XZHnBU0pD6frFUEaE0l/J0np9ofqkkcmj6JtSNcq+e6rL/CNxdXv7wnDEM/zcYHAhkTBJOslUbSlLnJMKg9q28FJMw3K5OuGydEJSbylK79Oh2NySXEcl0244uHfexUdHDWjLXubbCl25S4j3YSYSEV2LcPxYExnMMRXOS8vLpgtFkwOD3lxesZGLBq989nhhD/+es+nuxtc+WYJpBaYpw42WozWAuunn39pLr+85EKr1zJtk3w2HhO1dZL5fQXUrl8tOk+y5+rT31qCe2y92/p49eFPLUNILm+LLMX8+P0PnJ+dEwilUIqFDK811lfhc51bS0qZXulZpSTbYo+fHe0rEmtgsYtZPr4hXj7tQ/kfCAepOXDiiT4AAAAASUVORK5CYII="
              src={banner}
            />
          )}

          <div className="absolute w-full top-0 left-0 h-64 bg-gradient-to-t from-[#F0B3AB] to-45%" />
          {owner && !editingProfile && (
            <button
              onClick={() => handleEditingProfileChange(true)}
              className="absolute z-40 w-24 h-12 text-sm btn-secondary top-4 left-4"
            >
              Edit Profile
            </button>
          )}
          {!owner && (
            <div
              className="absolute text-5xl text-center align-middle drop-shadow-glowHigh top-3 left-3 text-interactive"
              onClick={() => {
                SetLiked((prev) => !prev);
                updateLike();
              }}
            >
              {Liked ? <AiFillHeart /> : <AiOutlineHeart />}
              <h1 className="text-sm text-interactive font-Inter">
                {likeCount} {likeCount > 1 ? "Likes" : "Like"}
              </h1>
            </div>
          )}
          <Image
            width={64}
            height={64}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAADXUAAA11AFeZeUIAAAAo0lEQVQIHS2OsW7DMAxEH0VKdtOl//83XbpkzVJkLroGCZCisCXm7EQAgaP4jkf7/Tymh+NvE3FoeKvgjvF6LxF+T0pNvAx8YyaHPsjeYaRoleDg2rGW2FA39L0I0NB2UDpl2sD/y5+SjH4zohkWe/LTsKzYupKqOJ1/dlfzQlVq0dr3JlrDDfK+6pSF+Dp/a3tHDLUYswwf88wkXS2pOsMV/wD+v0XbEuUSvAAAAABJRU5ErkJggg=="
            alt="profile"
            src={avatar}
            className="absolute block w-24 h-24 ml-auto mr-auto rounded-full bg-secondary top-52 outline-8 drop-shadow-glow outline-primary outline"
          />
        </div>
        <h1 className="mt-20 text-3xl text-heading font-Inter">
          {userData.user_name}
        </h1>
        <text className="mt-3 mb-5 font-sans text-center text-gray-800 fh-24 font-bolder w-80">
          {description}
        </text>
        {owner && !isArtist && (
          <button
            className="flex-shrink-0 w-48 p-4 mb-2 text-sm btn-secondary"
            onClick={() => router.push("/becomeartist")}
          >
            Become An Artist Now!
          </button>
        )}
        {commissionPosts?.length > 0 && (
          <div className="mb-4">
            {commissionPosts?.map((post) => (
              <CommissionPostProfile key={post.id} post={post} />
            ))}
          </div>
        )}
      <hr className="w-60 h-[0.15rem] p-0 my-4 border-none rounded-lg outline-none bg-interactive" />
        <div className="flex justify-center w-full gap-2">
          <button
            className={`btn-secondary ${!showingLikes ? inActiveButton : ""}`}
            onClick={() => SetShowingLikes(true)}
          >
            Liked by
          </button>
          <button
            className={`btn-secondary ${showingLikes ? inActiveButton : ""}`}
            onClick={() => SetShowingLikes(false)}
          >
            Comments
          </button>
        </div>
        <div className="flex flex-col w-full p-4 pt-6 gap-2">
          {showingLikes ? (
            likes.map((likedUserData: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    router.push(`/profile/${likedUserData.Users.id}`)
                  }
                  className="flex flex-row items-center w-full h-20 px-3 border-4 border-solid bg-secondary rounded-3xl border-interactive drop-shadow-glow"
                >
                  <Image
                    src={likedUserData.Users.profile_picture}
                    height={32}
                    width={32}
                    alt="profile"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAADXUAAA11AFeZeUIAAAAo0lEQVQIHS2OsW7DMAxEH0VKdtOl//83XbpkzVJkLroGCZCisCXm7EQAgaP4jkf7/Tymh+NvE3FoeKvgjvF6LxF+T0pNvAx8YyaHPsjeYaRoleDg2rGW2FA39L0I0NB2UDpl2sD/y5+SjH4zohkWe/LTsKzYupKqOJ1/dlfzQlVq0dr3JlrDDfK+6pSF+Dp/a3tHDLUYswwf88wkXS2pOsMV/wD+v0XbEuUSvAAAAABJRU5ErkJggg=="
                    className="object-cover rounded-full outline-4 outline-primary drop-shadow-glow outline h-14 w-14"
                  />
                  <div className="flex flex-col h-full p-4">
                    <h1 className="text-lg font-Inter text-heading">
                      {likedUserData.Users.user_name}
                    </h1>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <CreatePost
          onClick={() => {
            router.push("/createcommissionpost");
          }}
        />
        <ToastContainer
          transition={Slide}
          theme="colored"
          toastStyle={{
            fontWeight: "bold",
            border: "solid 4px",
            borderRadius: "15px",
            backgroundColor: "#FFE7E7",
            color: "#EF798A",
          }}
          bodyStyle={{ color: "#EF798A" }}
          autoClose={3000}
        />
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let userData = null;

  const accountId = ctx?.params?.id;
  let isLiked: boolean = false;
  let likes: any = null;

  if (!session)
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  else {
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("id", accountId);
    userData = data;

    const { data: likeStatusData }: any = await supabase
      .from("Likes")
      .select("*")
      .match({ liked_by: session.user.id, liked: accountId });
    isLiked = !!likeStatusData[0];

    const { data: likesData } = await supabase
      .from("Likes")
      .select(`Users!Likes_liked_by_fkey(id, user_name, profile_picture)`)
      .eq("liked", accountId);

    const { count: likeCount } = await supabase
      .from("Likes")
      .select("*", { count: "exact", head: true })
      .eq("liked", accountId);

    const { data: commissionPosts } = await supabase
      .from("Posts")
      .select("*")
      .eq("created_by", accountId);
    console.log(likeCount);
    console.log(commissionPosts);
    
    likes = likesData;
    return {
      props: {
        user: session.user,
        userData: userData?.at(0),
        accountId: accountId,
        isLiked: isLiked,
        likes: likes,
        likeCount: likeCount,
        commissionPosts: commissionPosts,
      },
    };
  }
};
