
import Head from "next/head";
import Image from "next/image";
import artist from "../public/artist-login.svg";
import google from "../public/google.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone } from "react-telephone";
import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function SignIn() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  
  /*if(!user){
    router.push('/createaccount')
    }*/

  const sendVerificationCode = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch('/api/verifyphone', {method: 'POST', body: JSON.stringify({phoneNumber: '+919065935689'})})
    .then((res)=>res.json())
    .then((data)=>console.log(data.error))
  }

  return (
    <>
      <Head>
        <title>Become An Artist</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center object-cover w-screen h-screen overflow-hidden bg-cover bg-signIn">
        <section className="flex flex-row p-1 w-fit md:p-0 bg-secondary md:drop-shadow-glowHigh rounded-3xl">
          <div className="w-96 h-96 xl:w-[520px] xl:h-[520px] hidden md:flex">
            <Image
              src={artist}
              alt="artist"
              className="w-full h-full drop-shadow-glowHigh"
            />
          </div>
          <div className=" h-96 w-96 xl:w-[580px] xl:h-[600px] p-8 m-2 xl:p-16 rounded-3xl bg-primary drop-shadow-glow ">
            <h1 className="text-4xl xl:text-[52px] text-heading drop-shadow-glow font-Inter ">
              Become An Artist
            </h1>
            <form
              className="flex flex-col items-center justify-center w-full mt-10 h-fit xl:mt-20 gap-4"
              id="signIn"
              onSubmit={sendVerificationCode}
            >
              <div className="relative">
                <label className="z-20 bottom-9 left-7 text-interactive drop-shadow-glow font-Inter">Full Name:</label>
              <input
                className="input-field"
                placeholder="Full Name"
                type="text"
              />
              </div>
              <div className="relative w-full">
              <Phone className="flex flex-col w-full mt-2 gap-2">
                <label className="z-20 bottom-9 left-7 text-interactive drop-shadow-glow font-Inter">Country:</label>
                <Phone.Country className="p-2 text-sm input-field"/>
                <label className="z-20 bottom-9 left-7 text-interactive drop-shadow-glow font-Inter">Phone Number:</label>
                <Phone.Number placeholder="Phone Number" className="w-full input-field"/>
              </Phone>
                </div>
              <button type="submit" form="signIn" className="btn-secondary">
                Next  
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
