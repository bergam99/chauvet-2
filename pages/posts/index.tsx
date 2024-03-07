import { GetServerSideProps, NextPage } from "next";

interface PostsPageProps {}

const PostsPage: NextPage<PostsPageProps> = ({}) => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // const posts = await getPosts();
    return {
      props: {},
    };
  } catch (error) {
    return { notFound: true };
  }
};
export default PostsPage;
