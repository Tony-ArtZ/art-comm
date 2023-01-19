import Head from "next/head";
import Image from "next/image";
import artist from "../public/artist-login.svg";
import google from "../public/google.svg";
import Link from "next/link";

export default function Home() {
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
              className="h-full w-full drop-shadow-glowHigh"
            />
          </div>
          <div className=" h-[520px] w-96 xl:w-[580px] xl:h-[600px] p-8 m-2 xl:p-16 rounded-3xl bg-primary drop-shadow-glow ">
            <h1 className="text-4xl xl:text-[52px] text-heading drop-shadow-glow font-Inter ">
              Hello Friend!
            </h1>
            <div className="flex flex-col w-full h-fit justify-center items-center mt-10 xl:mt-20 gap-4">
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
              />
              <input className="input-field" placeholder="Email" type="email" />
              <input
                className="input-field"
                placeholder="Password"
                type="password"
              />
              <input
                className="input-field"
                placeholder="Confirm Password"
                type="password"
              />
              <button className="btn-secondary ">Register</button>
              <p className="font-Inter mt-2 text-sm xl:text-xl xl:mt-16 text-heading">
                Already have an Account?{" "}
                <Link
                  href="/register"
                  className="text-interactive text-md font-Inter drop-shadow-glowHigh underline"
                >
                  Sign-in
                </Link>
              </p>
            </div>
          </div>
        </section>
        <div className="mt-8">
          <Image src={google} alt="google" className="icon" />
        </div>
      </main>
    </>
  );
}
