import {createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

interface Props {
  query: string
}

const SearchPage: NextPage<Props> = ({ query }) => {
  const router = useRouter()

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <ul>
        <li>Result 1</li>
        <li>Result 2</li>
        <li>Result 3</li>
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { search } = context.query  
  const supabase = createServerSupabaseClient(context)
  const {data, error} = await supabase.from("Posts").select("*").like("title", `%${search}%`)
  console.log(data,error)
  return {
    props: {
      query: search as string
    }
  }
}

export default SearchPage

