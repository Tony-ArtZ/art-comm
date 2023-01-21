import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient.ts";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("hi");
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    setUser(user);
  }
  return <Component {...pageProps} user={user} />;
}
