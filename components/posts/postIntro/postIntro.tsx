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
          Nos ésprits vient de la grotte “Chauvet” daté d&apos;il y a 36 000 ans
          et qui était seulement découverte en 1994. Surtout on était inspiré
          par le film documentaire de Werner Herzog, contenant les processus de
          découverte de cette grotte avec les impréssions vives des géographes.
        </p>
      </div>
    </>
  );
};

export default PostIntro;
