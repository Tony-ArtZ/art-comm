import Head from "next/head";
import Image from "next/image";
import artist from "../public/artist-login.svg";
import google from "../public/google.svg";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import {
    useSessionContext,
    useSupabaseClient,
    useUser
} from '@supabase/auth-helpers-react';

export default function Home() {
  const [userName, SetUserName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const { push } = useRouter();
  const supabaseClient = useSupabaseClient();
  const signInWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {redirectTo: '/'}
    });
  };

  const updateUserData = async (uid:Number) => {
    const profilePicture = `https://ui-avatars.com/api/?name=${userName}&background=FFC3A1&color=ffffff`;
    const updates = {
      id: uid,
      user_name: userName,
      profile_picture: profilePicture,
    };
    let { error } = await supabaseClient.from("Users").upsert(updates)
    error?(push('/')):(console.log(error))
  };

  const supabaseSignUp = async (e:any) => {
    e.preventDefault();
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (!error) {
      updateUserData(data.user?.id);
    } else {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center bg-signIn object-cover bg-cover">
        <section className="w-fit flex p-1 md:p-0 flex-row  bg-secondary md:drop-shadow-glowHigh rounded-3xl">
          <div className="h-96 w-96 xl:w-[520px] xl:h-[520px] hidden md:flex">
            <Image
              src={artist}
              alt="artist"
              className="h-full w-full drop-shadow-glowHigh"
            />
          </div>
          <div className=" h-[520px] w-96 xl:w-[580px] xl:h-[600px] p-8 m-2 xl:p-16 rounded-3xl bg-primary drop-shadow-glow ">
            <h1 className="text-4xl xl:text-[52px] text-heading drop-shadow-glow font-Inter ">
              Hello Friend!
            </h1>
            <form
              id="register"
              onSubmit={supabaseSignUp}
              className="flex flex-col w-full h-fit justify-center items-center mt-10 xl:mt-20 gap-4"
            >
              {/*<label
                htmlFor="profile-picture"
                className=" h-32 w-32 flex rounded-full bg-secondary"
              >
                <input
                  type="file"
                  accept="images"
                  id="profile-picture"
                  className="hidden"
                />
              </label>*/}
              <input
                className="input-field"
                placeholder="User Name"
                type="text"
                onChange={(e) => SetUserName(e.target.value)}
              />
              <input
                className="input-field"
                placeholder="Email"
                type="email"
                onChange={(e) => SetEmail(e.target.value)}
              />
              <input
                className="input-field"
                placeholder="Password"
                type="password"
                onChange={(e) => SetPassword(e.target.value)}
              />
              <input
                className="input-field"
                placeholder="Confirm Password"
                type="password"
              />
              <button type="submit" form="register" className="btn-secondary ">
                Register
              </button>
              <p className="font-Inter mt-2 text-sm xl:text-xl xl:mt-2 text-heading">
                Already have an Account?{" "}
                <Link
                  href="/signin"
                  className="text-interactive text-md font-Inter drop-shadow-glowHigh underline"
                >
                  Sign-in
                </Link>
              </p>
            </form>
          </div>
        </section>
        <div className="mt-8">
          <Image
            src={google}
            alt="google"
            className="icon"
            onClick={() => signInWithGoogle()}
          />
        </div>
      </main>
    </>
  );
}
