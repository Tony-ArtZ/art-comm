import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { Blob } from "node:buffer";

interface FormData {
  avatarBlob?: File;
  bannerBlob?: File;
  description?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
        return;
      }

      const formData: FormData = fields;

      if (files.avatarBlob) {
        const avatarBlob: Blob = await fs.promises.readFile(files.avatarBlob.filepath);
        formData.avatarBlob = avatarBlob;
      }

      if (files.bannerBlob) {
        const bannerBlob: Blob = await fs.promises.readFile(files.bannerBlob.filepath);
        formData.bannerBlob = bannerBlob;
      }

      // Do something with the form data, e.g. save to a database
      console.log(formData);

      res.status(200).send("Form data received");
    });
  } else {
    res.status(405).send("Method not allowed");
  }
}
