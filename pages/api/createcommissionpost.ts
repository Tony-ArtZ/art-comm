import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import {
  SupabaseClient,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { v4 as uuid } from "uuid";
import fs from 'fs';
import { Blob } from 'blob';

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

interface FormFiles {
  sketchPicture: Blob;
  lineArtPicture: Blob;
  shadedPicture: Blob;
}

//We used a formData for uploading Image Blobs to this endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};

//upload all images
const uploadImageBlob = async (
  files: Partial<FormFiles>,
  supabase: SupabaseClient,
  id: string
) => {
  console.log(files, files.sketchPicture?.type)
  const path = `${id}/avatar.png`;
const file = files.sketchPicture;
const fileContent = fs.readFileSync(file.filepath);
const blob = new Blob([fileContent], { type: file.mimetype });
  const { data, error } = await supabase.storage
    .from("posts")
    .upload(path, blob, { upsert: true });
  console.log(data, error);
};

//upload the other Form data including links to the images
const uploadFormData = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any,
  supabase: SupabaseClient
) => {
  const form = new formidable.IncomingForm();
  console.log(req.body);
  form.parse(
    req,
    async (err, fields: Partial<FormData>, files: Partial<FormFiles>) => {
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
        };
        await uploadImageBlob(files, supabase, postData.id);
        // const { data, error } = await supabase
        //   .from("CommissionPosts")
        //   .insert(postData);
        console.log(fields);
        res.status(200).json({ message: "success" });
      }
    }
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  const supabase = createServerSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  const user = session.user;
  console.log(session.expires_in);

  if (method === "POST") {
    uploadFormData(req, res, user, supabase);
  }
}
