import { NextPage } from "next";
import Image from "next/image";
import classes from "./templateLayout1.module.css";
import { imageStyle } from "@/utils/imageStyle";

interface TemplateLayout1Props {
  img: string;
  author: string;
  txt?: string[];
}

const TemplateLayout1: NextPage<TemplateLayout1Props> = ({
  img,
  author,
  txt,
}) => {
  return (
    <>
      <div className={classes.gridContainer}>
        <div className={`${classes.img} fadeInFromBottom`}>
          <Image
            src={img}
            alt="mainImg"
            height={639}
            width={959}
            style={imageStyle}
          />
        </div>
        <p className={classes.author}>
          article by <br />
          {author}
        </p>

        {txt &&
          txt.map((t, index) => (
            <p className={classes.txt} key={index}>
              {t}
            </p>
          ))}
      </div>
    </>
  );
};

export default TemplateLayout1;
