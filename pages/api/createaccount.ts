import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import formidable from "formidable";
import fs from "fs";

interface formFiles {
  imageBlob: formidable.File;
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

  if (method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files: Partial<formFiles>) => {
      const { fullName, userName } = fields;
      const { imageBlob } = files;
      const imageContent = fs.readFileSync(imageBlob!.filepath);
      const path = `${session.user.id}/avatar.png`;
      const { data, error } = await supabase.storage
        .from("profile")
        .upload(path, imageContent, { upsert: true });
      console.log(data, error);
      const imageUploadUrl = `https://wybevfopeppmmtlbjqtt.supabase.co/storage/v1/object/public/profile/${path}?${Date.now()}`;
      const { data: dataUploadStatus, error: dataUploadError } = await supabase
        .from("Users")
        .insert({ id: user.id, profile_picture: imageUploadUrl, user_name: userName, banner_picture: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2360&q=80" });
        console.log(dataUploadError)
      if(!dataUploadError) res.status(200).json({ message: "success" });
    });
  }
}
