import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {User, useSupabaseClient} from "@supabase/auth-helpers-react";
import { GetServerSideProps, NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import { categories } from "../lib/categories";
interface UserPosterData {
  user_name: string;
  id: string;
  profile_picture: string;
}
interface PostQueryData {
  title: string;
  id: string;
  created_by: UserPosterData;
  categories: string;
}
interface Props {
  query: string;
  currentCategory: string;
  data: PostQueryData[];
  user: User;
  userData: any;
}

const PostDisplayElement = ({ post, router }: { post: PostQueryData, router:NextRouter }) => {
  console.log(post);
  return (
    <div onClick={()=>router.push(`/profile/${post.created_by.id}`)} className="flex flex-row w-full p-4 m-0 my-2 border-4 border-solid drop-shadow-glow border-interactive rounded-2xl bg-secondary">
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
const SearchPage: NextPage<Props> = ({ query, currentCategory, data, user, userData }) => {
  const [searchData, SetSearchData] = useState(data)
  const [searchQuery, SetSearchQuery] = useState(query)
  const [selectedCategory, SetSelectedCategory] = useState<string|null>(currentCategory)
  const [displaySearchQuery, SetDisplaySearchQuery] = useState<string|null>(query)
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const signOut = async (e:React.MouseEvent<HTMLButtonElement>)=> {
    e.preventDefault()
    await supabaseClient.auth.signOut()
    router.push('/')
  }

  const handleSearchInput = (value:string) => {
    SetSearchQuery(value)
  }

  const handleChangeCategory = (e:React.ChangeEvent<HTMLSelectElement>) => {
    SetSelectedCategory(e.target.value as string)
    //TODO:Category doesn't Update in the render
    handleSearch()
  }

  const handleSearch = () => {
    fetch("/api/getsearchresult/", {method:"POST", body:JSON.stringify({search:searchQuery, categories: selectedCategory})})
      .then((res)=>res.json())
      .then((data)=>{
    console.log(data)
        if(!data.error) {
          SetSearchData(data.message)
          SetDisplaySearchQuery(searchQuery)
            console.log(searchData)
        }
      })
  }

  return (
    <div className="w-screen overflow-hidden">
      {"TODO: FIX LIKE COUNT"}
      <NavBar likeCount={2} router={router} signOut={signOut} handleSearchInput={handleSearchInput} search={handleSearch} user={user} userData={userData} value={searchQuery}/>
        <section className="flex items-center justify-center w-full h-16 border-solid gap-2 border-y-2 bg-secondary border-interactive">
          <h1 className="inline text-interactive font-Inter">Category:</h1>
      <select value={selectedCategory as string} onChange={handleChangeCategory} className="inline p-2 text-sm w-44 input-field">
        {currentCategory && <option value={currentCategory}>{categories[currentCategory as keyof typeof categories]}</option>}
        <option value="">All Categories</option>
        {Object.keys(categories).map((category)=>{
          if(categories[category as keyof typeof categories] !== currentCategory) {
            return <option key={category} value={categories[category as keyof typeof categories]}>{category}</option>
          }
        })
        }
      </select>
        </section>
      { displaySearchQuery && <h1 className="w-full mt-4 mb-4 text-center text-heading font-Inter">{searchData.length>0?`Showing search results for ${displaySearchQuery}`:"No results found... :("}</h1>}
      <section className="w-full px-4 m-0 grid place-items-center">
        {searchData.map((post) => (
          <PostDisplayElement key={post.id} post={post} router={router} />
        ))}
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {search, categories}= context.query;
  if(!search && !categories)
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }

  const supabase = createServerSupabaseClient(context);
  const {data:{session}} = await supabase.auth.getSession()
  let userData=null
  if(session) {
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("id", session.user.id);
    userData = data;
  }
   const { data, error } = await supabase
    .from("Posts")
    .select("title, id, categories, created_by(id, user_name, profile_picture)")
    .ilike("title", `%${search?search:""}%`)
    .contains("categories", categories?[categories]:[])
    console.log(error)
  return {
    props: {
      query: search?search:"",
      currentCategory: categories?categories:null,
      data,
      user: session?.user,
      userData:userData && userData[0]
    },
  };
};

export default SearchPage;
