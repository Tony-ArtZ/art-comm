import Head from "next/head";
import Hero from "../layouts/Hero";
import FeaturedFeed from "../layouts/Featured";
import supabase from "../lib/supabaseClient";

export default function Home({ user }) {
  console.log(user);
  return (
    <>
      <Head>
        <title>ArtComm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen overflow-hidden">
        <Hero />
        <FeaturedFeed />
      </main>
    </>
  );
}
