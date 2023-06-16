import { useEffect, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { IoImagesOutline } from "react-icons/io5";

interface PostPrices {
  title: string;
  price: number;
}
interface PostTiers {
  id:string;
  title: string;
  imageUrl: string;
  prices: PostPrices[];
}

const PriceContainer = ({
  tierId,
  id,
  title,
  price,
  handleTierPriceChange,
}: {
  tierId: string;
  id: number;
  title: string;
  price: number;
  handleTierPriceChange: (
    id: string,
    priceId: number,
    title: string,
    value: number
  ) => void;
}) => {
  return (
    <tr className="flex flex-row p-2 border-b-2 border-b-solid border-interactive">
      <td className="flex items-center justify-center gap-1 font-Inter text-interactive">
        <input
          required
          onChange={(e) =>
            handleTierPriceChange(tierId, id, e.target.value, price)
          }
          placeholder="Art Type"
          value={title}
          className="w-32 h-8 px-2 m-0 text-sm text-center border-2 shadow-glowInsetLow justify-self-start drop-shadow-none input-field"
        />
        :
      </td>
      <td className="flex flex-row items-center justify-center p-1">
        <input
          type="number"
          maxLength={20}
          value={price}
          placeholder="USD $"
          onChange={(e) =>
            handleTierPriceChange(tierId, id, title, Number(e.target.value))
          }
          required
          className="inline w-20 h-8 px-2 text-sm text-center border-2 shadow-glowInsetLow justify-self-start drop-shadow-none input-field"
        />
        <BiDollar className="text-lg font-bold text-interactive" />
      </td>
    </tr>
  );
};

export default function CommissionCard({
  post,
  handleTierPriceChange,
  handleImageChange,
  imageBlobs,
  handleAddPrice,
  handleTierTitle,
  fileReader,
}: {
  post: PostTiers;
  handleTierPriceChange: (
    id: string,
    priceId: number,
    title: string,
    value: number
  ) => void;
  handleAddPrice: (id: string) => void;
  handleImageChange: (id:string, imageBlob:Blob) => void;
  imageBlobs:{[index:string]:Blob|null}
  handleTierTitle: (id: string, value: string) => void;
  fileReader: FileReader | null;
}) {
  const [imagePreview, SetImagePreview] = useState<null | string>(null);

  useEffect(() => {
    const image = imageBlobs[post.id]
    if (!image || !fileReader) return;
    fileReader.onloadend = () => {
      SetImagePreview(fileReader?.result as string);
    };

    fileReader?.readAsDataURL(image);
  }, [fileReader, imageBlobs, post.id]);

  return (
    <div className="p-4 my-4 border-4 border-solid min-h-max shrink-0 border-interactive rounded-xl bg-secondary">
      <input
        required
        onChange={(e) => {
          e.preventDefault();
          handleTierTitle(post.id, e.target.value);
        }}
        placeholder="Title"
        value={post.title}
        className="inline h-8 px-2 mb-4 text-center border-2 text-md w-44 shadow-glowInsetLow justify-self-start drop-shadow-none input-field"
      />
      <div>
        <input
          id={post.id}
          type="file"
          onChange={(e)=>{e.preventDefault(); e.target.files && handleImageChange(post.id, e.target.files[0])}}
          required
          accept="image/png, image/jpeg"
          className="-z-50  absolute bottom-[1000px] hidden"
        />
        <label
          htmlFor={post.id.toString()}
          className="mb-4 grid place-items-center"
        >
          {!imagePreview ? (
            <div className="flex flex-col items-center justify-center border-4 border-dashed w-52 aspect-[3/2] bg-secondary border-interactive rounded-xl">
              <IoImagesOutline className="text-4xl text-interactive" />
              <h1 className="font-Inter text-interactive">Upload an Example</h1>
            </div>
          ) : (
            <img
              alt="previewImage"
              src={imagePreview}
              className="border-4 border-solid rounded-xl border-interactive"
            />
          )}
        </label>

        <h1 className="w-full mb-2 text-lg text-heading font-Inter text-start">
          Prices:
        </h1>

        <table className="w-full">
          <tbody>
            {post.prices?.map((postPrice, index) => (
              <PriceContainer
                key={index}
                tierId={post.id}
                id={index}
                price={postPrice.price}
                title={postPrice.title}
                handleTierPriceChange={handleTierPriceChange}
              />
            ))}
          </tbody>
        </table>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddPrice(post.id);
          }}
          className="h-8 text-sm btn-secondary"
        >
          Add Prices
        </button>
      </div>
    </div>
  );
}
