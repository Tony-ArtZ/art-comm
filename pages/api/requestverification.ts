
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {createServerSupabaseClient} from '@supabase/auth-helpers-nextjs';
import {channel} from 'diagnostics_channel';
import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio';


type Data = {
  success: boolean,
  verification?: unknown,
  error?: unknown,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method
  const body = JSON.parse(req.body)
  const phoneNumber = body.phoneNumber

  const supabase = createServerSupabaseClient({ req, res });
    const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return res.status(401)
  if(method == "POST") {
    try{
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID??'').verifications.create({
        to: phoneNumber,
        channel: 'sms'
      })
      res.status(200).json({success: true, verification})
    }
    catch (error) {
      console.log(error)
      res.status(500).json({success: false, error})
    }
  }
}
