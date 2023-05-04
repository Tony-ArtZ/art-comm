import { ReactElement, use, useEffect, useRef, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import MultiSelect from "../components/MultiSelect";
import Image from "next/image";
import { CircleLoader } from "react-spinners";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import {createServerSupabaseClient, User, Session} from "@supabase/auth-helpers-nextjs";

interface catagoryItem {
  key: string;
  value: number;
  selected: boolean;
}

type artCatagory = "sketch" | "lineArt" | "shaded";
type artSizeType = "portrait" | "halfBody" | "fullBody";
type priceChangeHandlerType = (
  value: number,
  catagory: artCatagory,
  sizeType: artSizeType
) => void;

const CommissionCard = ({
  id,
  title,
  imageBlob,
  onChangeHandler,
  artCategory,
  onPriceChangeHandler,
  fileReader,
}: {
  id: string;
  title: string;
  imageBlob: Blob | null;
  onChangeHandler: (image: Blob) => void;
  artCategory: artCatagory;
  onPriceChangeHandler: priceChangeHandlerType;
  fileReader: FileReader | null;
}): ReactElement => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageBlob && fileReader) {
      fileReader.onloadend = () => {
        setImagePreview(fileReader?.result as string);
      };

      fileReader.readAsDataURL(imageBlob!);
    }
  }, [imageBlob, fileReader]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files && e.target.files[0];
    if (file) onChangeHandler(file);
  };
  const handlePortraitPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const price = !Number.isNaN(event.target.value)
      ? event.target.valueAsNumber
      : 0;
    onPriceChangeHandler(price, artCategory, "portrait");
  };

  const handleHalfBodyPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const price = !Number.isNaN(event.target.value)
      ? event.target.valueAsNumber
      : 0;
    onPriceChangeHandler(price, artCategory, "halfBody");
  };

  const handleFullBodyPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const price = !Number.isNaN(event.target.value)
      ? event.target.valueAsNumber
      : 0;
    onPriceChangeHandler(price, artCategory, "fullBody");
  };

  return (
    <div className="p-4 my-4 border-4 border-solid min-h-max shrink-0 border-interactive rounded-xl bg-secondary">
      <h3 className="w-full mb-4 text-2xl text-center text-heading font-Inter">
        {title}
      </h3>
      <div>
        <input
          type="file"
          id={id}
          onChange={handleImageChange}
          required
          accept="image/png, image/jpeg"
          className="-z-50  absolute bottom-[1000px] hidden"
        />
        <label htmlFor={id} className="mb-4 grid place-items-center">
          {!imagePreview ? (
            <div className="flex flex-col items-center justify-center border-4 border-dashed w-52 aspect-[3/2] bg-secondary border-interactive rounded-xl">
              <IoImagesOutline className="text-4xl text-interactive" />
              <h1 className="font-Inter text-interactive">
                Upload an Example
              </h1>
            </div>
          ) : (
            <img
              alt="previewImage"
              src={imagePreview}
              className="border-4 border-solid rounded-xl border-interactive"
            />
          )}
        </label>

        <h1 className="mb-2 text-lg text-heading font-Inter">Prices:</h1>

        <table className="w-full">
          <tbody>
            <tr className="p-2 rounded-full border-y-2 border-y-solid border-interactive">
              <td>
                <label className="z-20 flex items-center justify-end w-full h-full text-center text-md text-interactive font-Inter justify-self-center bottom-9 left-7">
                  Portrait :
                </label>
              </td>
              <td className="flex flex-row items-center justify-center p-1">
                <input
                  type="number"
                  placeholder="USD $"
                  onChange={handlePortraitPriceChange}
                  required
                  className="flex w-20 h-8 px-2 text-sm text-center border-2 shadow-glowInsetLow justify-self-start drop-shadow-none input-field"
                />
                <BiDollar className="text-lg font-bold text-interactive" />
              </td>
            </tr>
            <tr className="p-2 rounded-full border-y-2 border-y-solid border-interactive">
              <td>
                <label className="z-20 flex items-center justify-end w-full h-full text-center text-md text-interactive font-Inter justify-self-center bottom-9 left-7">
                  Half-Body :
                </label>
              </td>
              <td className="flex flex-row items-center justify-center p-1">
                <input
                  type="number"
                  placeholder="USD $"
                  onChange={handleHalfBodyPriceChange}
                  required
                  className="flex w-20 h-8 px-2 text-sm text-center border-2 shadow-glowInsetLow justify-self-start drop-shadow-none input-field"
                />
                <BiDollar className="text-lg font-bold text-interactive" />
              </td>
            </tr>
            <tr className="p-2 rounded-full border-y-2 border-y-solid border-interactive">
              <td>
                <label className="z-20 flex items-center justify-end w-full h-full text-center text-md text-interactive font-Inter justify-self-center bottom-9 left-7">
                  Full-Body :
                </label>
              </td>
              <td className="flex flex-row items-center justify-center p-1">
                <input
                  type="number"
                  placeholder="USD $"
                  onChange={handleFullBodyPriceChange}
                  required
                  className="flex w-20 h-8 px-2 text-sm text-center border-2 shadow-glowInsetLow justify-self-start drop-shadow-none input-field"
                />
                <BiDollar className="text-lg font-bold text-interactive" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function CommissionForm({session, user}:{session: Session, user: User}) {
  const [name, setName] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [sketchImageBlob, setSketchImageBlob] = useState<Blob | null>(null);
  const [lineArtImageBlob, setLineArtImageBlob] = useState<Blob | null>(null);
  const [shadedImageBlob, setShadedImageBlob] = useState<Blob | null>(null);
  const [selectedOptions, SetSelectedOptions] = useState<string[] | null>([]);
  const [loading, SetLoading] = useState(false);
  const [sketchPrice, setSketchPrice] = useState({
    portrait: 0,
    halfBody: 0,
    fullBody: 0,
  });
  const [lineArtPrice, setLineArtPrice] = useState({
    portrait: 0,
    halfBody: 0,
    fullBody: 0,
  });
  const [shadedPrice, setShadedPrice] = useState({
    portrait: 0,
    halfBody: 0,
    fullBody: 0,
  });

  const catagory: catagoryItem[] = [
    { key: "2D", value: 1, selected: false },
    { key: "3D", value: 2, selected: false },
    { key: "Chibi", value: 3, selected: false },
  ];

  const fileReaderRef = useRef<null | FileReader>(null);

  const router = useRouter()

  useEffect(() => {
    fileReaderRef.current = new FileReader();
    // do other things with fileReaderRef.current...
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentOption(event.target.value);
  };

  const handleSketchChange = (imageBlob: Blob) => {
    setSketchImageBlob(imageBlob);
  };

  const handleLineArtChange = (imageBlob: Blob) => {
    setLineArtImageBlob(imageBlob);
  };

  const handleShadedChange = (imageBlob: Blob) => {
    setShadedImageBlob(imageBlob);
  };

  const handlePriceChange = (
    value: number,
    category: artCatagory,
    sizeType: artSizeType
  ): void => {
    switch (category) {
      case "sketch":
        setSketchPrice({ ...sketchPrice, [sizeType]: value });
        break;
      case "lineArt":
        setLineArtPrice({ ...lineArtPrice, [sizeType]: value });
        break;
      case "shaded":
        setShadedPrice({ ...shadedPrice, [sizeType]: value });
        break;
    }
  };

  const selectedOptionsChangeHandler = (options: string[] | null) => {
    SetSelectedOptions(options);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedOptions || selectedOptions.length < 1) {
      toast.error("Please select a category");
    } else {
      event.preventDefault();
      const formData = new FormData();

      formData.append("title", name);
      formData.append("sketchPicture", sketchImageBlob!);
      formData.append("lineArtPicture", lineArtImageBlob!);
      formData.append("shadedPicture", shadedImageBlob!);
      formData.append("sketchPortaitPrice", String(sketchPrice.portrait));
      formData.append("sketchHalfBodyPrice", String(sketchPrice.halfBody));
      formData.append("sketchFullBodyPrice", String(sketchPrice.fullBody));
      formData.append("lineArtPortaitPrice", String(lineArtPrice.portrait));
      formData.append("lineArtHalfBodyPrice", String(lineArtPrice.halfBody));
      formData.append("lineArtFullBodyPrice", String(lineArtPrice.fullBody));
      formData.append("shadedPortaitPrice", String(shadedPrice.portrait));
      formData.append("shadedHalfBodyPrice", String(shadedPrice.halfBody));
      formData.append("shadedFullBodyPrice", String(shadedPrice.fullBody));
      formData.append("paymentOption", paymentOption);
      formData.append("selectedCategories", JSON.stringify(selectedOptions));

      try {
        SetLoading(true);
        await fetch("/api/createcommissionpost", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.error) {
              SetLoading(false);
              toast.success("Success");
              router.push(`/profile/${user.id}`)
            } else throw data.error;
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center object-cover w-screen bg-cover bg-signIn">
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-white grid place-items-center bg-opacity-90">
          <div className="flex flex-col items-center gap-4">
            <CircleLoader size={80} color="#EF798A" />
            <h1 className="text-center font-Inter text-interactive">
              Please Wait...
            </h1>
          </div>
        </div>
      )}
      <div className=" mt-24 items-center justify-center border-8 border-solid border-secondary flex-col w-96 xl:w-[580px]  p-8 m-2 xl:p-16 rounded-3xl flex bg-primary drop-shadow-glow ">
        <h1 className="text-4xl  xl:text-[52px] text-heading drop-shadow-glow font-Inter ">
          Make a Commission
        </h1>
        <form id="form" onSubmit={handleSubmit} className="mt-4 mb-8">
          <label className="z-20 bottom-9 left-7 text-interactive drop-shadow-glow font-Inter">
            Title:
          </label>
          <input
            type="text"
            placeholder="Title"
            required
            onChange={handleNameChange}
            pattern="[A-Za-z0-9\s]{3,}"
            className="input-field peer"
          />
          <p className="invisible mt-1 mb-8 text-sm text-interactive peer-invalid:visible">
            *Title must be longer than 3 characters.
          </p>
          <h1 className="text-xl text-center text-heading font-Inter">
            Submit Examples
          </h1>
          <CommissionCard
            id="card2"
            title="Sketch"
            imageBlob={sketchImageBlob}
            onChangeHandler={handleSketchChange}
            artCategory="sketch"
            onPriceChangeHandler={handlePriceChange}
            fileReader={fileReaderRef.current}
          />
          <CommissionCard
            id="card1"
            title="LineArt"
            imageBlob={lineArtImageBlob}
            onChangeHandler={handleLineArtChange}
            artCategory="lineArt"
            onPriceChangeHandler={handlePriceChange}
            fileReader={fileReaderRef.current}
          />
          <CommissionCard
            id="card3"
            title="Shaded"
            imageBlob={shadedImageBlob}
            onChangeHandler={handleShadedChange}
            artCategory="shaded"
            onPriceChangeHandler={handlePriceChange}
            fileReader={fileReaderRef.current}
          />
          <label className="flex flex-col items-center justify-center w-full mt-4 mb-4 text-xl gap-2 text-heading font-Inter">
            Payment Preference
            <select
              onChange={handlePaymentChange}
              required
              className="w-64 h-12 text-sm text-center border-4 border-solid rounded-full font-Inter text-interactive drop-shadow-glow bg-secondary border-interactive"
            >
              <option value="PaymentFirst">Payment First</option>
              <option value="HalfUpfront">Half Upfront</option>
              <option value="PaymentAfter">Payment After</option>
            </select>
          </label>
          <hr className="h-[0.1rem] mb-4 border-none rounded-full text-interactive bg-interactive" />
          <h1 className="mb-4 text-xl text-center text-heading font-Inter">
            Select Commission Category{" "}
          </h1>
          <MultiSelect
            catagory={catagory}
            onChangeSelectionHandler={selectedOptionsChangeHandler}
          />
          <h1 className="mt-4 text-xs text-center text-interactive font-Inter">
            *More selected catagories will lead to less discovery
          </h1>
        </form>
        <button type="submit" form="form" className="w-56 btn-primary">
          Create Post
        </button>
      </div>
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
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
