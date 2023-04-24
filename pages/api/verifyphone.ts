// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { channel } from "diagnostics_channel";
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

type Data = {
  success: boolean;
  error: unknown | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method;
  const body = JSON.parse(req.body);
  const phoneNumber = body?.phoneNumber;
  const code = body?.code;
  const verificationCode = body?.code;

  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();


  if (!session) return res.status(401);

  if (method == "POST") {
    try {
        console.log(verificationCode, phoneNumber)
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      const verificationCheck = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID??'')
        .verificationChecks.create({
          to: phoneNumber,
          code: verificationCode,
        });
      if (verificationCheck.status === "approved") {
        console.log("FUXKXKXKXKXKXKXKKX")
        const {error:artistTableError} = await supabase.from('Artists').insert({id: session.user.id, phone_number: phoneNumber, verified: true})
        const {error:userUpdateError} = await supabase.from('Users').update({artist: true}).eq('id', session.user.id)
        console.log(artistTableError, userUpdateError)
        res.status(200).json({ success: true, error: null });
      } else {
        res.status(400).json({ success: false, error: null });
      }
      
  }
  catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  }
}
