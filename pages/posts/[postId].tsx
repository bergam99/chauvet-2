import { GetServerSideProps, NextPage } from "next";
import { getPost } from "@/utils/extract";
import { IPosts } from "@/types/posts";
import Image from "next/image";

type PostPageProps = {
  post?: IPosts;
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) return <div>product not found</div>;

  return (
    <>
      <i> {post.thema}</i>
      <h1>{post.title}</h1>
      {/* {post.template[0]?.cards[0]?.url && (
        <>
          <Image
            src={post.template[0].cards[0].url}
            alt={post.title}
            height={100}
            width={100}
          />
          <p>{post.template[0].cards[0].connected_txt}</p>
        </>
      )} */}

      <div>
        {post.template[0]?.cards.map((image, index) => (
          <div key={index}>
            <Image
              src={image.url}
              alt={post.title}
              height={100}
              width={100}
              priority={index === 0}
            />
            {image.txt && <p>{image.txt}</p>}
            {image.connected_txt && <p>{image.connected_txt}</p>}
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId?.toString();

  try {
    const post = await getPost(postId);
    return {
      props: { post },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default PostPage;
