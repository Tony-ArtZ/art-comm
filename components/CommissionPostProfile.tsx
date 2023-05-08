import Image from "next/image";

interface CatagoryItem {
  key: string;
  value: number;
  selected: boolean;
}

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
  id: string;
  title: string;
  created_by: string;
  categories: string[];
  payment_option: PaymentType;
  tiers: PostTiers[];
}

export default function CommissionPostProfile({ post }: { post: PostType }) {
  return (
    <div
      key={post.id}
      className="flex flex-col items-center justify-center p-4 mb-4 border-4 border-solid bg-secondary rounded-2xl w-80 border-interactive"
    >
      <h1 className="mb-2 text-3xl text-center text-heading font-Inter">
        {post.title}
      </h1>
      <h4 className="mb-4 text-lg text-interactive font-Inter">
        {post.categories.toString()}
      </h4>
      {post.tiers.map((tiers) => (
        <div key={tiers.id} className="grid place-items-center">
          <h4 className="w-full px-4 mb-2 text-lg text-center text-heading font-Inter">
            {tiers.title}
          </h4>
          <Image
            width={246}
            height={246}
            alt="Sketch Image"
            src={tiers.imageUrl}
            className="border-4 border-solid rounded-xl mb-4 border-interactive"
          />
          <h1 className="w-full mb-2 text-lg text-heading font-Inter text-start">
            Prices:
          </h1>
          <section className=" mb-4 overflow-hidden border-4 rounded-3xl border-solid border-interactive">
            <table className="w-full text-center  table-fixed bg-secondary">
              <tbody>
                {tiers.prices.map((priceObject, index) => (
                  <tr
                    key={index}
                    className="h-16 last:border-0  border-b-4 border-interactive"
                  >
                    <td className="text-interactive  font-Inter">
                      {priceObject.title}
                    </td>
                    <td className="text-heading font-Inter">
                      {priceObject.price} $
                    </td>
                    <td>
                      <button className="w-20 h-12 m-0 btn-secondary">
                        Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <hr className="w-full h-[0.15rem] p-0 my-4 border-none rounded-lg outline-none bg-interactive" />
        </div>
      ))}
    </div>
  );
}
