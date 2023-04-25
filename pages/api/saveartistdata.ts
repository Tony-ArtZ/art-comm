import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

interface body {
  name: string;
  phoneNumber: string;
  categories: string[] | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const body:body = JSON.parse(req.body)

  const supabase = createServerSupabaseClient({ req, res });
  const {data: { session }} = await supabase.auth.getSession();

  if (!session)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  const user = session.user;

  if (method === "POST") {
    console.log(body);
    const { data, error } = await supabase.from("Artists").upsert({id: session.user.id, name: body.name, categories: body.categories});
    if(!error)
    res.status(200).json({ message: "success" });
    else
    res.status(200).json({ error: error });
  }
}
