import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

type SearchRequestBody = {
  search: string;
  categories: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient({ req, res });
  if (req.method === "POST") {
    const body: SearchRequestBody = JSON.parse(req.body)
    const { data, error } = await supabase
      .from("Posts")
      .select(
        "title, id, categories, created_by(id, user_name, profile_picture)"
      )
      .ilike("title", `%${body.search}%`).contains("categories", body.categories?[body.categories]:[])

    !error
      ? res.status(200).json({ message: data })
      : res.status(504).json({ error });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
