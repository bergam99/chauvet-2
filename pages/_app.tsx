import Layout from "@/components/layouts/globalLayout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type AppPropsWithLayout = AppProps & {
  Component: NextPage;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [backgroundClass, setBackgroundClass] = useState("bgColor-default");

  // Change background class when on 404 page
  useEffect(() => {
    const className =
      router.pathname === "/404" ? "bgColor-404" : "bgColor-default";
    setBackgroundClass(className);
  }, [router.pathname]);

  return (
    <SessionProvider session={pageProps.session}>
      <div className={backgroundClass}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  );
}
