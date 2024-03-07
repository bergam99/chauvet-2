import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface PostsPageProps {
  posts: IPosts[];
}

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post._id.toString()}>
          <h5>{post.title}</h5>
          {post.template[0]?.images[0] && (
            <Image
              src={post.template[0].images[0].url}
              alt={post.title}
              width={100}
              height={100}
            />
          )}
          <Link href={`/posts/${post._id.toString()}`}>Voir post</Link>
        </div>
      ))}
    </>
  );
};

export default PostsPage;
