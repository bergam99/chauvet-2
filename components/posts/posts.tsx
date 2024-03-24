import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import classes from "./posts.module.css";
import arrow from "@/public/icon/right-arrow.png";
import PostIntro from "./postIntro/postIntro";
import useIntersectionObserver from "@/utils/useIntersectionObserver";
interface PostsPageProps {
  posts: IPosts[];
}

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  useIntersectionObserver();
  return (
    <>
      <PostIntro posts={posts} />

      {/* articles */}
      <div className={classes.gridContainer}>
        {posts.map((post) => (
          <div key={post._id.toString()} className="fadeInFromBottom">
            <i className={classes.thema}>{post.thema}</i>
            <Link href={`/posts/${post._id.toString()}`}>
              <h3 className={classes.title}>{post.title}</h3>
            </Link>
            {post.template[0]?.cards[0] && (
              <Link href={`/posts/${post._id.toString()}`}>
                <Image
                  src={post.template[0].cards[0].url}
                  alt={post.title}
                  layout="responsive"
                  width={1}
                  height={1}
                  className={classes.img}
                />
              </Link>
            )}
            <div className={`${classes.detailContainer} Link`}>
              <Link
                href={`/posts/${post._id.toString()}`}
                className={classes.detail}
              >
                VOIR PLUS
              </Link>

              <div className={classes.arrow}>
                <Image src={arrow} alt="->" layout="responsive" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostsPage;
