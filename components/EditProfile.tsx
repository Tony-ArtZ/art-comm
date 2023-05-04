import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import {toast} from "react-toastify";

interface updatedData 
{avatarPicture?:string, bannerPicture?:string, description?:string}
export default function EditProfile({
  user,
  userData,
  profileEditingHandler,
  createToast,
  handleSaveSuccess,
  handleLoading,
}: {
  user: User;
  userData: any;
  profileEditingHandler: (value: boolean) => void;
  createToast: (args:string)=>void;
  handleSaveSuccess: (args:updatedData)=>void;
  handleLoading: (args:boolean)=>void;
}) {
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [avatarPreview, SetAvatarPreview] = useState(userData?.profile_picture);
  const [avatarBlob, SetAvatarBlob] = useState<Blob | null>(null);
  const [bannerPreview, SetBannerPreview] = useState(userData?.banner_picture);
  const [bannerBlob, SetBannerBlob] = useState<Blob | null>(null);
  const [categories, SetCategories] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const fileReaderRef = useRef<null | FileReader>(null);

  useEffect(() => {
    fileReaderRef.current = new FileReader();
  }, []);

  const handleFormDataSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoading(true)
    const formData = new FormData();

    avatarBlob && formData.append("avatarBlob", avatarBlob);
    bannerBlob && formData.append("bannerBlob", bannerBlob);
    description && formData.append("description", description);

    fetch("/api/updateprofile", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error) {
          handleSaveSuccess(data)
          createToast("Successfully Updated!")
        console.log(data);
        }
      });
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileSelected = e.target.files && e.target.files[0];
    const fileReader = fileReaderRef.current;

    if (fileReader && fileSelected) {
      fileReader.onloadend = () => {
        SetBannerPreview(fileReader?.result as string);
        SetBannerBlob(fileSelected);
        setHasChanges(true);
      };

      fileReader.readAsDataURL(fileSelected);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileSelected = e.target.files && e.target.files[0];
    const fileReader = fileReaderRef.current;

    if (fileReader && fileSelected) {
      fileReader.onloadend = () => {
        SetAvatarPreview(fileReader?.result as string);
        SetAvatarBlob(fileSelected);
        setHasChanges(true);
      };

      fileReader.readAsDataURL(fileSelected);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    SetDescription(e.target.value);
    setHasChanges(true);
  };

  return (
    <div className="fixed z-[100] w-screen h-screen">
      <div
        onClick={() => profileEditingHandler(false)}
        className="w-full h-full bg-white backdrop-blur-sm bg-opacity-75"
      />
      <form
        onSubmit={handleFormDataSave}
        className="absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center p-2 m-auto border-4 border-solid rounded-xl h-fit border-interactive bg-primary"
      >
        <section className="w-full px-2 mb-2 text-4xl text-end text-interactive">
          <IoIosClose
            onClick={() => profileEditingHandler(false)}
            className="ml-auto mr-0"
          />
        </section>

        <div className="relative flex justify-center w-full h-64 bg-secondary">
          <input
            id="bannerInput"
            onChange={handleBannerChange}
            type="file"
            accept="image/png, image/jpeg"
            className="absolute top-[1000] -z-20 hidden"
          />
          <label
            htmlFor="bannerInput"
            className="w-full max-h-full min-h-full relaticm"
          >
            <div className="absolute z-20 p-2 text-2xl text-center border-2 border-solid rounded-full top-2 right-2 grid place-items-center bg-secondary drop-shadow-glowHigh text-interactive border-interactive">
              <FaEdit />
            </div>
            <div className="absolute w-full h-full bg-gradient-to-t from-[#F0B3AB] to-45%" />
            {userData.banner_picture && (
              <Image
                height="256"
                width="256"
                alt="banner"
                className="z-20 block object-cover w-full max-h-full min-h-full h-fit"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAADXUAAA11AFeZeUIAAAC9klEQVQ4ER2TSXIbZRiGn+7+e9BgDbEtO8bBKRYU3sGGA1AsYMEdWHABKhfI3bJIkR0BFrFDxdjGlmQNjdSDeuZtVUlVf0/fO37Wq1e/Nl9/8y0vPn/JoNenbipcv0dVVWBZGMehahr007/mcTpjPptRliWuY/P27RtdT4mSmM02wnFd83q1eKKualarBdvNlqZuWCyWpEmC63kYY6jrmtl8zvX1Bz5+vGK5XFBpaJZlHE9OODqaEHS6OI5xXk9ncx4eHliuVqzX6z27m5tbVuGa0WjEQb9PVhT89u4dd/e3uK6njwOGejYcjTl5foYfdLFsGxMEHSmzSfKceFcQZCXXtw94fsC2iLm+ueP4+Ig4jvcMTp+f44u1HwTssnwP9PjPHYnUFAI1SboTTYeBY8irksZyWMcJY69D1wuosVlvIuaLlWQds1yH9Ps90t2OefhEkiYaFgswaU3GbHXoS1I7KOgPKC32Mo3rcjAc0Dvocztd0BGrBgtbzBcCKOWp2+3RSBnGpdPTWffMy8tLDgYjDienDPfG9giUtm08rBZILLsdXwMaYn0Q24ZEIeVFSSKAWMpSDazVCFUEY/e6FJ5u7hmAHGW2jel0IPdLDiT5ROjT/zaEZc1UEktVKoojNlGkAJV0XZHnBU0pD6frFUEaE0l/J0np9ofqkkcmj6JtSNcq+e6rL/CNxdXv7wnDEM/zcYHAhkTBJOslUbSlLnJMKg9q28FJMw3K5OuGydEJSbylK79Oh2NySXEcl0244uHfexUdHDWjLXubbCl25S4j3YSYSEV2LcPxYExnMMRXOS8vLpgtFkwOD3lxesZGLBq989nhhD/+es+nuxtc+WYJpBaYpw42WozWAuunn39pLr+85EKr1zJtk3w2HhO1dZL5fQXUrl8tOk+y5+rT31qCe2y92/p49eFPLUNILm+LLMX8+P0PnJ+dEwilUIqFDK811lfhc51bS0qZXulZpSTbYo+fHe0rEmtgsYtZPr4hXj7tQ/kfCAepOXDiiT4AAAAASUVORK5CYII="
                src={bannerPreview}
              />
            )}
          </label>
          <input
            id="profileInput"
            onChange={handleProfileChange}
            type="file"
            accept="image/png, image/jpeg"
            className="absolute top-[1000] -z-20 hidden"
          />
          <label
            htmlFor="profileInput"
            className="absolute z-20 block ml-auto mr-auto -bottom-10 w-max h-max"
          >
            <div className="absolute z-20 p-2 text-2xl text-center border-2 border-solid rounded-full -top-3 -right-3 grid place-items-center bg-secondary drop-shadow-glowHigh text-interactive border-interactive">
              <FaEdit />
            </div>
            <Image
              width={64}
              height={64}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAADXUAAA11AFeZeUIAAAAo0lEQVQIHS2OsW7DMAxEH0VKdtOl//83XbpkzVJkLroGCZCisCXm7EQAgaP4jkf7/Tymh+NvE3FoeKvgjvF6LxF+T0pNvAx8YyaHPsjeYaRoleDg2rGW2FA39L0I0NB2UDpl2sD/y5+SjH4zohkWe/LTsKzYupKqOJ1/dlfzQlVq0dr3JlrDDfK+6pSF+Dp/a3tHDLUYswwf88wkXS2pOsMV/wD+v0XbEuUSvAAAAABJRU5ErkJggg=="
              alt="profile"
              src={avatarPreview}
              className="z-20 block w-24 h-24 ml-auto mr-auto rounded-full bg-secondary outline-8 drop-shadow-glow outline-primary outline"
            />
          </label>
        </div>
        <h1 className="mt-20 mb-4 text-3xl text-heading font-Inter">
          {userData.user_name}
        </h1>
        <textarea
          rows={4}
          onChange={handleDescriptionChange}
          className="p-2 mt-3 mb-4 font-sans text-center bg-transparent rounded-xl outline outline-solid outline-4 outline-interactive fh-24 font-bolder w-80"
        >
          {userData?.description}
        </textarea>
        {hasChanges && (
          <button className="mb-4 btn-primary" type="submit">
            Save
          </button>
        )}
      </form>
    </div>
  );
}
