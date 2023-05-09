import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

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
}

const PostDisplayElement = ({ post }: { post: PostQueryData }) => {
  console.log(post);
  return (
    <div className="p-4 border-solid border-4 flex flex-row drop-shadow-glow border-interactive rounded-2xl bg-secondary mx-4  block">
      <img
        className="rounded-full border border-interactive border-2  inline w-16 h-16"
        src={post.created_by.profile_picture}
        alt="user profile picture"
      />
      <section className=" p-2 flex flex-col h-full">
        <h1 className="text-heading font-Inter inline text-lg"> {post.title}</h1>
        <h4 className="text-interactive text-md font-Inter">
          {post.categories.toString()}
        </h4>
      </section>
    </div>
  );
};
const SearchPage: NextPage<Props> = ({ query, data }) => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-heading w-full text-center font-Inter">{data.length>0?`Showing search results for ${query}`:"No results found... :("}</h1>
      <ul>
        {data.map((post) => (
          <PostDisplayElement key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search } = context.query;
  const supabase = createServerSupabaseClient(context);
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
    },
  };
};

export default SearchPage;
