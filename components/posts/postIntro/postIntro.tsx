import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import Image from "next/image";
import classes from "./postIntro.module.css";
import { imageStyle } from "@/utils/imageStyle";

interface PostsPageProps {
  posts: IPosts[];
}

const PostIntro: NextPage<PostsPageProps> = ({ posts }) => {
  return (
    <>
      {/* intro */}
      <div className={classes.mainContainer}>
        <Image
          src={posts[0].template[0]?.cards[0].url}
          alt={posts[0].title}
          width={727}
          height={484} // aspect ratio
          className={classes.img}
          style={imageStyle}
        />
        <p className={classes.intro}>
          Ce magazine Chauvet, inspiré par le documentaire “La Grotte des rêves
          perdus” de Werner Herzog, il vous offrira la même expérience que quand
          les spéléologues ont découvert la grotte en vous partageant les
          magnifiques endroits cachés dans le monde.
        </p>
      </div>
    </>
  );
};

export default PostIntro;
