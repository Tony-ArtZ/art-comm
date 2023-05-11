import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {User, useSupabaseClient} from "@supabase/auth-helpers-react";
import { GetServerSideProps, NextPage } from "next";
import {handleWebpackExternalForEdgeRuntime} from "next/dist/build/webpack/plugins/middleware-plugin";
import { NextRouter, useRouter } from "next/router";
import {useEffect, useState} from "react";
import { FaSearch } from "react-icons/fa";
import NavBar from "../components/NavBar";

interface UserPosterData {
  user_name: string;
  id: string;
  profile_picture: string;
}
interface PostQueryData {
  title: string;
  id: string;
  created_by: UserPosterData;
  categories: string[];
}
interface Props {
  query: string;
  data: PostQueryData[];
  user: User;
  userData: any;
}

const PostDisplayElement = ({ post, router }: { post: PostQueryData, router:NextRouter }) => {
  console.log(post);
  return (
    <div onClick={()=>router.push(`/profile/${post.created_by.id}`)} className="flex flex-row block p-4 mx-4 border-4 border-solid drop-shadow-glow border-interactive rounded-2xl bg-secondary">
      <img
        className="inline w-16 h-16 border border-2 rounded-full border-interactive"
        src={post.created_by.profile_picture}
        alt="user profile picture"
      />
      <section className="flex flex-col h-full p-2">
        <h1 className="inline text-lg text-heading font-Inter"> {post.title}</h1>
        <h4 className="text-interactive text-md font-Inter">
          {post.categories.toString()}
        </h4>
      </section>
    </div>
  );
};
const SearchPage: NextPage<Props> = ({ query, data, user, userData }) => {
  const [searchData, SetSearchData] = useState(data)
  const [searchQuery, SetSearchQuery] = useState(query)
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const signOut = async (e:React.MouseEvent<HTMLButtonElement>)=> {
    e.preventDefault()
    await supabaseClient.auth.signOut()
    router.push('/')
  }

  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    SetSearchQuery(e.target.value)
  }

  const handleSearch = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    fetch("/api/getsearchresult/", {method:"POST", body:JSON.stringify({search:searchQuery})})
      .then((res)=>res.json())
      .then((data)=>{
    console.log(data)
        if(!data.error) {
          SetSearchData(data.message)
            console.log(searchData)
        }
      })
  }

  return (
    <div>
      <NavBar router={router} signOut={signOut} handleSearchInput={handleSearchInput} search={handleSearch} user={user} userData={userData}/>
      <h1 className="w-full mt-4 mb-4 text-center text-heading font-Inter">{searchData.length>0?`Showing search results for ${searchQuery}`:"No results found... :("}</h1>
      <ul>
        {searchData.map((post) => (
          <PostDisplayElement key={post.id} post={post} router={router}/>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search } = context.query;
  const supabase = createServerSupabaseClient(context);
  const {data:{session}} = await supabase.auth.getSession()
  let userData=null
  if(session) {
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("id", session.user.id);
    userData = data;
    console.log(data)
  }
   const { data, error } = await supabase
    .from("Posts")
    .select("title, id, categories, created_by(id, user_name, profile_picture)")
    .ilike("title", `%${search}%`);

  console.log(search);
  console.log(data, error);
  return {
    props: {
      query: search as string,
      data,
      user: session?.user,
      userData:userData && userData[0]
    },
  };
};

export default SearchPage;
