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

interface FilesFormat {
  [index: string]: formidable.File;
}

interface ImageUrlObjectFormat {
  [index: string]: string;
}

type ImageUrlResponse = ImageUrlObjectFormat[]|null

//We used a formData for uploading Image Blobs to this endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};

//upload all images
const uploadImageBlob = (
  files: FilesFormat,
  supabase: SupabaseClient,
  id: string
): Promise<ImageUrlResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const imageUrls: ImageUrlResponse = [];
      const fileNames = Object.keys(files) as Array<keyof FilesFormat>;

      for (const file of fileNames) {
        const fileContent = fs.readFileSync(files[file]!.filepath);
        //const blob = new Blob([fileContent], { type: files[file]?.mimetype! });
        const path = `${id}/${file}`;
        const { data, error } = await supabase.storage
          .from("posts")
          .upload(path, fileContent, {
            contentType: files[file]?.mimetype!,
            upsert: true,
          });

        if (!error) {

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
    async (err, fields, files: formidable.Files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to parse form data" });
      } else {
        console.log(files)
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
