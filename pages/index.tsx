import Head from "next/head";
import Hero from "../layouts/Hero";
import FeaturedFeed from "../layouts/featured";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import React from "react";
import Category from "../layouts/CategoryCard";
import {useRouter} from "next/router";

export default function Home({
  user,
  userData,
  likeCount,
}: {
  user: User;
  userData: any;
  likeCount: null|number;
}) {
  const router = useRouter()
  console.log(likeCount)
  return (
    <>
      <Head>
        <title>ArtComm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen overflow-hidden bg-primary">
        <Hero user={user} userData={userData} likeCount={likeCount}/>
        <FeaturedFeed />
        <Category router={router}/>
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let userData = null;
  let likeCount:null|number= null

  if (!session) return { props: { user: null } };
  else {
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("id", session.user.id);
    userData = data?.at(0) ? data.at(0) : null;
    if (!userData) {
      const updates = {
        id: session?.user.id,
        user_name: session?.user.user_metadata.name,
        profile_picture: session?.user.user_metadata.avatar_url,
      };
      const { error } = await supabase.from("Users").upsert(updates);
      }

      const {count} = await supabase.from("Likes").select("*", {count:"exact"}).eq("liked", session.user.id)
      likeCount = count
      console.log(count)
    }


  return {
    props: {
      initialSession: session,
      user: session.user,
      userData: userData,
      likeCount: likeCount,
    },
  };
};
