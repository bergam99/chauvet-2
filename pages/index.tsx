import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import PostsPage from "@/components/posts/posts";

import { IPosts } from "@/types/posts";
import { getPosts } from "@/utils/extract";

interface PostsPageProps {
  posts: IPosts[];
}

const Home: NextPage<PostsPageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Chauvet</title>
        <meta name="description" content="magazine de voyage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/products">shopIcon</Link>

      <PostsPage posts={posts} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await getPosts();
    return {
      props: { posts },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Home;
