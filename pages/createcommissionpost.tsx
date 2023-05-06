import { ReactElement, use, useEffect, useRef, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import MultiSelect from "../components/MultiSelect";
import Image from "next/image";
import { CircleLoader } from "react-spinners";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import {
  createServerSupabaseClient,
  User,
  Session,
} from "@supabase/auth-helpers-nextjs";
import CommissionCard from "../components/CommissionPostCreator";

interface CatagoryItem {
  key: string;
  value: number;
  selected: boolean;
}

type ArtCatagory = "sketch" | "lineArt" | "shaded";
type ArtSizeType = "portrait" | "halfBody" | "fullBody";
type PriceChangeHandlerType = (
  value: number,
  catagory: ArtCatagory,
  sizeType: ArtSizeType
) => void;

interface PostPrices {
  title: string;
  price: number;
}
interface PostTiers {
  title: string;
  imageBlob: Blob | null;
  prices: PostPrices[];
}
interface PostType {
  title: string;
  categories: string[];
  paymentMethod: "PaymentFirst" | "HalfUpfront" | "PaymentAfter";
  tiers: PostTiers[];
}

export default function CommissionForm({
  session,
  user,
}: {
  session: Session;
  user: User;
}) {
  const [name, setName] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [selectedOptions, SetSelectedOptions] = useState<string[] | null>([]);
  const [loading, SetLoading] = useState(false);
  const [formData, SetFormData] = useState<PostType>();
  const [tiers, SetTiers] = useState<PostTiers[]>([]);

  const catagory: CatagoryItem[] = [
    { key: "2D", value: 1, selected: false },
    { key: "3D", value: 2, selected: false },
    { key: "Chibi", value: 3, selected: false },
  ];

  const fileReaderRef = useRef<null | FileReader>(null);

  const router = useRouter();

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

  const selectedOptionsChangeHandler = (options: string[] | null) => {
    SetSelectedOptions(options);
  };

  const handleAddTier = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    SetTiers((prev) => {
      const tiersTemp = [...prev];
      tiersTemp.push({ title: "", imageBlob: null, prices: [] });
      return tiersTemp;
    });
    handleAddPrice(tiers.length);
  };

  const handleTierTitle = (id: number, value: string) => {
    SetTiers((prev) => {
      const tiersTemp = prev.map((tier, index) => {
        if (index === id) {
          const tierEditTemp = { ...tier, title: value };
          return tierEditTemp;
        }
        return tier;
      });
      return tiersTemp;
    });
  };

  const handleTierPriceChannge = (
    id: number,
    priceId: number,
    title: string,
    value: number
  ) => {
    console.log(tiers);
    SetTiers((prev) => {
      const tiersTemp = prev.map((tier, index) => {
        if (index === id) {
          const prices = tier.prices.map((price, indexPrice) => {
            if (indexPrice === priceId) {
              return { price: value, title: title };
            }
            return price;
          });
          return { ...tier, prices: prices };
        }
        return tier;
      });
      return tiersTemp;
    });
  };

  const handleImageChange = (id: number, imageBlob: Blob) => {
    SetTiers((prev) => {
      const tiersTemp = prev.map((tier, index) => {
        if (index === id) {
          const tierEditTemp = { ...tier, imageBlob: imageBlob };
          return tierEditTemp;
        }
        return tier;
      });
      return tiersTemp;
    });
  };

  const handleAddPrice = (id: number) => {
    SetTiers((prev) => {
      const tiersTemp = prev.map((tier, index) => {
        if (index === id) {
          const pricesTemp = [...tier.prices, { title: "", price: 0 }];
          return { ...tier, prices: pricesTemp };
        }
        return tier;
      });
      return tiersTemp;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedOptions || selectedOptions.length < 1) {
      toast.error("Please select a category");
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", name);
      formData.append("paymentOption", paymentOption);
      formData.append("selectedCategories", JSON.stringify(selectedOptions));
      for(let i = 0; i < tiers.length; i++) {
        const tier = tiers[i]
        const tierData = new FormData()
        tierData.append("title", tier.title)
        tierData.append("imageBlob", tier.imageBlob!)
        tierData.append("prices", JSON.stringify(tier.prices))
      }

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
              router.push(`/profile/${user.id}`);
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
        <h1 className="text-4xl xl:text-[52px] text-heading drop-shadow-glow font-Inter ">
          Make a Commission
        </h1>
        <form
          id="form"
          onSubmit={handleSubmit}
          className="mt-4 mb-8 text-center"
        >
          <label className="z-20 block w-full min-w-full text-interactive text-start drop-shadow-glow font-Inter">
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
          {tiers?.map((post, index) => {
            return (
              <CommissionCard
                tierIndex={index}
                post={post}
                fileReader={fileReaderRef.current}
                handleTierPriceChange={handleTierPriceChannge}
                handleImageChange={handleImageChange}
                key={index}
                handleAddPrice={handleAddPrice}
                handleTierTitle={handleTierTitle}
              />
            );
          })}
          <button onClick={handleAddTier} className="btn-secondary">
            Add Tiers
          </button>
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
