import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import classes from "./posts.module.css";
interface PostsPageProps {
  posts: IPosts[];
}

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  return (
    <>
      <div className={classes.mainContainer}>
        <Image
          src={posts[0].template[0]?.images[0].url}
          alt={posts[0].title}
          layout="responsive"
          width={600}
          height={400} // aspect ratio
        />
        <p className={classes.intro}>
          Ce magazine Chauvet, inspiré par le documentaire “La Grotte des rêves
          perdus” de Werner Herzog, il vous offrira la même expérience que quand
          les spéléologues ont découvert la grotte en vous partageant les
          magnifiques endroits cachés dans le monde.
        </p>
      </div>

      <div className={classes.gridContainer}>
        {posts.map((post) => (
          <div key={post._id.toString()} className={classes.gridItem}>
            <i className="Thema">{post.thema}</i>
            <h3 className={classes.title}>{post.title}</h3>
            {post.template[0]?.images[0] && (
              <Image
                src={post.template[0].images[0].url}
                alt={post.title}
                layout="responsive"
                width={600}
                height={400}
              />
            )}
            <Link
              href={`/posts/${post._id.toString()}`}
              className={`${classes.detail} Link`}
            >
              VOIR PLUS
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostsPage;
