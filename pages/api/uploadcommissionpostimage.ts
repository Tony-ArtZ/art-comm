import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import {
  SupabaseClient,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import fs from "fs";
import { v4 as uuid } from "uuid";

type FilesFormat = Record<string, formidable.File>;
type ImageUrlObjectFormat = Record<string, string>;
type ImageUrlResponse = ImageUrlObjectFormat[] | null;

// We used a formData for uploading Image Blobs to this endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadFormData(
  req: NextApiRequest,
  supabase: SupabaseClient,
  id: string
): Promise<ImageUrlObjectFormat> {
  return new Promise(async (resolve, reject) => {
    const form = new formidable.IncomingForm();
    console.log(req.body);
    form.parse(req, async (err, fields, files: formidable.Files) => {
      if (err) {
        console.error(err);
        reject({ error: "Failed to parse form data" });
      } else {
        try {
          const imageUrls: ImageUrlObjectFormat = {};
          const fileNames = Object.keys(files) as Array<keyof FilesFormat>;

          for (const file of fileNames) {
            const fileContent = fs.readFileSync((files[file] as formidable.File)!.filepath);
            const path = `${id}/${file}`;
            const { data, error } = await supabase.storage
              .from("posts")
              .upload(path, fileContent, {
                contentType: (files[file] as formidable.File)!.mimetype!,
                upsert: true,
              });

            if (!error) {
              imageUrls[
                file
              ] = `https://wybevfopeppmmtlbjqtt.supabase.co/storage/v1/object/public/posts/${data.path}`;
            }
          }

          resolve(imageUrls);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

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
    try {
      const img = await uploadFormData(req, supabase, uuid());
      console.log(img);
      res.json(img);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

