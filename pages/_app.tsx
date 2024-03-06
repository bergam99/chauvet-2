import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";

type AppPropsWithLayout = AppProps & {
  Component: NextPage;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
