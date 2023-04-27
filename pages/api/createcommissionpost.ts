import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {v4 as uuid} from 'uuid'

interface FormData {
  title: string;
  sketchPortaitPrice: string;
  sketchHalfBodyPrice: string;
  sketchFullBodyPrice: string;
  lineArtPortaitPrice: string;
  lineArtHalfBodyPrice: string;
  lineArtFullBodyPrice: string;
  shadedPortaitPrice: string;
  shadedHalfBodyPrice: string;
  shadedFullBodyPrice: string;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return res.status(401).json({
      error: 'not_authenticated',
      description:
        'The user does not have an active session or is not authenticated'
    });

    const user = session.user
    console.log(session.expires_in)


  if (method === "POST") {
    const form = new formidable.IncomingForm();
    console.log(req.body)
    form.parse(req, (err, fields: Partial<FormData>, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to parse form data" });
      } else {
        const postData = {
          id: uuid(),
          post_title: fields.title,
          post_by: user.id,
          sketch_portrait_price: fields.sketchPortaitPrice,
          sketch_half_body_price: fields.sketchFullBodyPrice,
          sketch_full_body_price: fields.sketchFullBodyPrice,
          line_art_portrait_price: fields.lineArtPortaitPrice,
          line_art_half_body_price: fields.lineArtHalfBodyPrice,
          line_art_full_body_price: fields.lineArtFullBodyPrice,
          shaded_portrait_price: fields.shadedFullBodyPrice,
          shaded_half_body_price: fields.shadedHalfBodyPrice,
          shaded_full_body_price: fields.shadedFullBodyPrice,
          sketch_image_url: "",
          line_art_image_url: "",
          shaded_image_url: "",
        }
        const {data, error} = await supabase.from('CommissionPosts').insert(postData)
        console.log(fields)
        res.status(200).json({message: "success"});
      }
    });
  }
}
