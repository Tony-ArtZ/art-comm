import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { Blob } from "node:buffer";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

interface FormFiles {
  avatarBlob?: formidable.File;
  bannerBlob?: formidable.File;
}

interface FormData {
  description: string;
}

interface UserUpdateData {
  profile_picture?: string;
  banner_picture?: string;
  description?: string;
}

export const config = {
  api: {
    bodyParser: false,
  },
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

  const updateData:UserUpdateData = {};

  if (method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(
      req,
      async (err, fields: Partial<FormData>, files: Partial<FormFiles>) => {
        if (err) {
          console.error(err);
          res.status(500).send("Server error");
          return;
        }

        if(fields.description) {
          updateData.description = fields.description
        }

        if (files.avatarBlob) {
          const path = `${session.user.id}/avatar.png`;
          const avatarContent = fs.readFileSync(files.avatarBlob.filepath);
          const { data, error } = await supabase.storage
            .from("profile")
            .upload(path, avatarContent, { upsert: true });
            console.log(data, error);
          updateData.profile_picture = `https://wybevfopeppmmtlbjqtt.supabase.co/storage/v1/object/public/profile/${path}?${Date.now()}`

        }

        if (files.bannerBlob) {
          const bannerContent = fs.readFileSync(files.bannerBlob.filepath);
          const path = `${session.user.id}/banner.png`;
          const { data, error } = await supabase.storage
            .from("profile")
            .upload(path, bannerContent, { upsert: true });
            console.log(data, error);
          updateData.banner_picture = `https://wybevfopeppmmtlbjqtt.supabase.co/storage/v1/object/public/profile/${path}?${Date.now()}`
        }

        const {data, error} = await supabase.from("Users").update(updateData).eq("id", user.id)
      

        res.status(200).json(updateData);
      }
    );
  } else {
    res.status(405).send("Method not allowed");
  }
}
