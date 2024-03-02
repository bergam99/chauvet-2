import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chauvet</title>
        <meta name="description" content="magazine de voyage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/products">go to products page</Link>
    </>
  );
};

export default Home;
