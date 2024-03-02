import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { NextPageWithLayout } from "@/types/next";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      {/* getLayout( */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* ); */}
    </SessionProvider>
  );
}
