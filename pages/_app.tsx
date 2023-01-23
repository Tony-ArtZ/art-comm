import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

function MyApp({
  Component,
  pageProps
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient()
  );
  // Create a new supabase browser client on every first render.

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;