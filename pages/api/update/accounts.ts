
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {json} from 'stream/consumers';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

type Data = {
  isLiked: boolean
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

  const {data:LikeData} = await supabase.from('Likes').select('*',{count: "exact", head: true}).match({liked_by: session.user.id, liked: body.likedId})
  const isLiked:boolean = parseInt(String(LikeData)) > 0
 
  switch (requestMethod){
    case 'POST':
      if(!isLiked){
    const { error } = await supabase
  .from('Likes')
  .upsert({ liked_by: session.user.id, liked: body.likedId})
  console.log(error)

    }
    else{
      const {error} = await supabase.from('Likes').delete().match({ liked_by: session.user.id, liked: body.likedId})
    }
    return res.status(200).json({isLiked: isLiked})

      break;
    default:
      res.status(405);
  }

}
