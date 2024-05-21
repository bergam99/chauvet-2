import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import Image from "next/image";
import classes from "./postIntro.module.css";
import { imageStyle } from "@/utils/imageStyle";

interface PostsPageProps {
  posts: IPosts[];
}

const PostIntro: NextPage<PostsPageProps> = ({ posts }) => {
  const main =
    "https://res.cloudinary.com/dr2nbo0rj/image/upload/v1715980311/jxhklpx8avnm4iq6m1or.jpg";
  return (
    <>
      <div className={classes.mainContainer}>
        <div className="fadeInFromBottom">
          <Image
            src={main}
            alt={posts[0].title}
            width={727}
            height={484}
            className={classes.img}
            style={imageStyle}
          />
        </div>
        <p className={classes.intro}>
          Devenez explorateur, découvrez la grotte chauvet dans le monde avec
          notre magazine Chauvet.
        </p>
      </div>
    </>
  );
};

export default PostIntro;
