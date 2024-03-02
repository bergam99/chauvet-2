import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <Head>
        <title>Chauvet</title>
        <meta name="description" content="magazine de voyage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/products">go to products page</Link>
      <main>
        <div>
          {loading && <div>Loading...</div>}
          {session ? (
            <>
              <p>Welcome, {session.user?.name ?? session.user?.email}</p>
              <br />
            </>
          ) : (
            <p>Please Sign in</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
