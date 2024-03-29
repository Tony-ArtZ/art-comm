
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

type Data = {
  response: string
}

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let requestMethod = req.method;
  const body = JSON.parse(req.body);
  const supabase = createServerSupabaseClient({ req, res });
    const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return res.status(401)

  switch (requestMethod){
    case 'POST':
      const { error } = await supabase
  .from('Users')
  .update({[body.field]: body.value})
  .eq('id', session.user.id)
  console.log(error)
      res.status(200).json({ response: `Success`})
      break;
    default:
      res.status(405);
  }

}
