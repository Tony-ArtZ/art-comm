import Image from "next/image";

interface CommissionPost {
  id: string;
  post_title: string;
  post_by: string;
  sketch_portrait_price: number;
  sketch_half_body_price: number;
  sketch_full_body_price: number;
  line_art_portrait_price: number;
  line_art_half_body_price: number;
  line_art_full_body_price: number;
  shaded_portrait_price: number;
  shaded_half_body_price: number;
  shaded_full_body_price: number;
  sketch_image_url: string;
  line_art_image_url: string;
  shaded_image_url: string;
  payment_option: string;
  categories: string[];
}

export default function CommissionPostProfile({post}:{post:CommissionPost}) {
  return (
    <div
      key={post.id}
      className="flex flex-col items-center justify-center p-4 mb-4 border-4 border-solid bg-secondary rounded-2xl w-80 border-interactive"
    >
      <h1 className="mb-4 text-2xl text-center text-heading font-Inter">
        {post.post_title}
      </h1>
      <h4 className="mb-4 text-lg text-interactive font-Inter">{post.categories.toString()}</h4>
      <h4 className="w-full px-4 mb-2 text-lg text-start text-heading font-Inter">
        Sketch:
      </h4>
      <Image
        width={246}
        height={246}
        alt="Sketch Image"
        src={post.sketch_image_url}
        className="border-4 border-solid rounded-xl border-interactive"
      />
      <section className="mt-4 overflow-hidden border-4 border-solid rounded-2xl border-interactive">
        <table className="w-full text-center table-fixed bg-secondary">
          <tbody>
            <tr className="h-16 border-b-4 border-collapse border-solid border-interactive">
              <td className="text-interactive font-Inter">Portrait:</td>
              <td className="text-heading font-Inter">
                {post.sketch_portrait_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
            <tr className="h-16 border-b-4 border-solid border-interactive">
              <td className="text-interactive font-Inter">Half-Body:</td>
              <td className="text-heading font-Inter">
                {post.sketch_half_body_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
            <tr className="h-16">
              <td className="text-interactive font-Inter">Full-Body:</td>
              <td className="text-heading font-Inter">
                {post.sketch_full_body_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <hr className="w-full h-[0.15rem] p-0 my-4 border-none rounded-lg outline-none bg-interactive" />
      <h4 className="w-full px-4 mb-2 text-lg text-start text-heading font-Inter">
        LineArt:
      </h4>
      <Image
        width={246}
        height={246}
        alt="Sketch Image"
        src={post.line_art_image_url}
        className="border-4 border-solid rounded-xl border-interactive"
      />
      <section className="mt-4 overflow-hidden border-4 border-solid rounded-2xl border-interactive">
        <table className="w-full text-center table-fixed bg-secondary">
          <tbody>
            <tr className="h-16 border-b-4 border-collapse border-solid border-interactive">
              <td className="text-interactive font-Inter">Portrait:</td>
              <td className="text-heading font-Inter">
                {post.line_art_portrait_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
            <tr className="h-16 border-b-4 border-solid border-interactive">
              <td className="text-interactive font-Inter">Half-Body:</td>
              <td className="text-heading font-Inter">
                {post.line_art_half_body_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
            <tr className="h-16">
              <td className="text-interactive font-Inter">Full-Body:</td>
              <td className="text-heading font-Inter">
                {post.line_art_full_body_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <hr className="w-full h-[0.15rem] p-0 my-4 border-none rounded-lg outline-none bg-interactive" />
      <h4 className="w-full px-4 mb-2 text-lg text-start text-heading font-Inter">
        Shaded:
      </h4>
      <Image
        width={246}
        height={246}
        alt="Sketch Image"
        src={post.shaded_image_url}
        className="border-4 border-solid rounded-xl border-interactive"
      />
      <section className="mt-4 overflow-hidden border-4 border-solid rounded-2xl border-interactive">
        <table className="w-full text-center table-fixed bg-secondary">
          <tbody>
            <tr className="h-16 border-b-4 border-collapse border-solid border-interactive">
              <td className="text-interactive font-Inter">Portrait:</td>
              <td className="text-heading font-Inter">
                {post.shaded_portrait_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
            <tr className="h-16 border-b-4 border-solid border-interactive">
              <td className="text-interactive font-Inter">Half-Body:</td>
              <td className="text-heading font-Inter">
                {post.shaded_half_body_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
            <tr className="h-16">
              <td className="text-interactive font-Inter">Full-Body:</td>
              <td className="text-heading font-Inter">
                {post.shaded_full_body_price} $
              </td>
              <td>
                <button className="w-20 h-12 m-0 btn-secondary">Order</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
