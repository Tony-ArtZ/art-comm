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
  categories: CatagoryItem[];
  paymentMethod: PaymentType;
  tiers: PostTiers[];
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
    const bodyData:PostType = JSON.parse(req.body)
    console.log(bodyData)
      const uploadData = {id:bodyData.id, title:bodyData.title, created_by:user.id, payment_option:bodyData.paymentMethod, categories:bodyData.categories, tiers:bodyData.tiers}
    const {data, error} = await supabase.from("Posts").insert(uploadData)
    console.log(data,error)
    if(!error)
      res.json({message:"success"})
    else
      res.status(500).json(error)

    //const {data, error}
  }
}
