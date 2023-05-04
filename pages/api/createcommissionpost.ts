import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import {
  SupabaseClient,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { v4 as uuid } from "uuid";
import fs from "fs";
import PersistentFile from "formidable/PersistentFile";
import { resolve } from "dns";

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
  paymentOption: string;
  selectedCategories: string;
}

interface FormFiles {
  sketchPicture: formidable.File;
  lineArtPicture: formidable.File;
  shadedPicture: formidable.File;
}

interface ImageUrlResponse {
  sketchPicture: string;
  lineArtPicture: string;
  shadedPicture: string;
}

//We used a formData for uploading Image Blobs to this endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};

//upload all images
const uploadImageBlob = (
  files: Partial<FormFiles>,
  supabase: SupabaseClient,
  id: string
): Promise<Partial<ImageUrlResponse>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const imageUrls: Partial<ImageUrlResponse> = {};
      const fileNames = Object.keys(files) as Array<keyof FormFiles>;

      for (const file of fileNames) {
        const fileContent = fs.readFileSync(files[file]!.filepath);
        //const blob = new Blob([fileContent], { type: files[file]?.mimetype! });
        const path = `${id}/${file}`;
        const { data, error } = await supabase.storage
          .from("posts")
          .upload(path, fileContent, { contentType: files[file]?.mimetype!, upsert: true });

        if (!error) {
          imageUrls[
            file
          ] = `https://wybevfopeppmmtlbjqtt.supabase.co/storage/v1/object/public/posts/${data.path}`;
        }

        console.log(data, error);
      }

      console.log(imageUrls);
      resolve(imageUrls);
    } catch (error) {
      reject(error);
    }
  });
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
        const postId = uuid();
        const imageUrls: Partial<ImageUrlResponse> = await uploadImageBlob(
          files,
          supabase,
          postId
        );

        const postData = {
          id: postId,
          post_title: fields.title,
          post_by: user.id,
          sketch_portrait_price: parseFloat(fields.sketchPortaitPrice!),
          sketch_half_body_price: parseFloat(fields.sketchHalfBodyPrice!),
          sketch_full_body_price: parseFloat(fields.sketchFullBodyPrice!),
          line_art_portrait_price: parseFloat(fields.lineArtPortaitPrice!),
          line_art_half_body_price: parseFloat(fields.lineArtHalfBodyPrice!),
          line_art_full_body_price: parseFloat(fields.lineArtFullBodyPrice!),
          shaded_portrait_price: parseFloat(fields.shadedPortaitPrice!),
          shaded_half_body_price: parseFloat(fields.shadedHalfBodyPrice!),
          shaded_full_body_price: parseFloat(fields.shadedFullBodyPrice!),
          sketch_image_url: imageUrls.sketchPicture,
          line_art_image_url: imageUrls.lineArtPicture,
          shaded_image_url: imageUrls.shadedPicture,
          payment_option: fields.paymentOption,
          categories: JSON.parse(fields.selectedCategories!)
        };

        const { data, error } = await supabase.from("Posts").insert(postData);

        console.log(data, error);
        if (!error) res.status(200).json({ message: "success" });
        else res.status(500).json({ error: error });
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
