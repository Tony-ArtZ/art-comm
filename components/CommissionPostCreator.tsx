import { BiDollar } from "react-icons/bi";
import { IoImagesOutline } from "react-icons/io5";

interface PostPrices {
    title: string;
    price: number;
}

const PriceContainer = ({tierId, id, title, price, handleTierPriceChange}:{tierId:number, id:number, title:string, price:number, handleTierPriceChange:(id:number, priceId:number, title:string, value:number)=>void;}) => {
    return (
    <tr className="p-2 flex flex-row border-y-2 border-y-solid border-interactive">
    <td className="flex gap-1 font-Inter justify-center items-center text-interactive ">
      <input onChange={(e)=>handleTierPriceChange(tierId,id, e.target.value, price)} placeholder="Title" value={title} className="w-32 h-8 px-2 text-sm m-0 text-center border-2 shadow-glowInsetLow justify-self-start drop-shadow-none input-field"/>
      :
    </td>
    <td className="flex flex-row items-center justify-center p-1">
      <input
        type="number"
        value={price}
        placeholder="USD $"
        onChange={(e)=>handleTierPriceChange(tierId,id, title,Number(e.target.value))}
        required
        className="inline w-20 h-8 px-2 text-sm text-center border-2 shadow-glowInsetLow justify-self-start drop-shadow-none input-field"
      />
      <BiDollar className="text-lg font-bold text-interactive" />
    </td>
  </tr>)
}

export default function CommissionCard ({
    tierIndex,
    title,
    prices,
    handleTierPriceChange,
    fileReader,
  }: {
    tierIndex:number;
    title: string;
    prices: PostPrices[];
    handleTierPriceChange: (id:number, priceId:number, title:string, value:number)=>void;
    fileReader: FileReader | null;
  })  {

    //TODO: REMOVE THIS
    const imagePreview = false;
  
    return (
      <div className="p-4 my-4 border-4 border-solid min-h-max shrink-0 border-interactive rounded-xl bg-secondary">
        <h3 className="w-full mb-4 text-2xl text-center text-heading font-Inter">
          {title}
        </h3>
        <div>
          <input
            type="file"
            // onChange={handleImageChange}
            required
            accept="image/png, image/jpeg"
            className="-z-50  absolute bottom-[1000px] hidden"
          />
          <label className="mb-4 grid place-items-center">
            {!imagePreview ? (
              <div className="flex flex-col items-center justify-center border-4 border-dashed w-52 aspect-[3/2] bg-secondary border-interactive rounded-xl">
                <IoImagesOutline className="text-4xl text-interactive" />
                <h1 className="font-Inter text-interactive">
                  Upload an Example
                </h1>
              </div>
            ) : (<></>
            //   <img
            //     alt="previewImage"
            //     src={imagePreview}
            //     className="border-4 border-solid rounded-xl border-interactive"
            //   />
            )}
          </label>
  
          <h1 className="mb-2 text-lg text-heading font-Inter">Prices:</h1>
  
          <table className="w-full">
            <tbody>
                {prices?.map((post, index)=> <PriceContainer key={index} tierId={tierIndex} id={index} price={post.price} title={post.title} handleTierPriceChange={handleTierPriceChange} />)}
            </tbody>
            <button>Add Prices</button>
          </table>
        </div>
      </div>
    );
  };
  