import { NextPage } from "next";
import Image from "next/image";
import classes from "./templateLayout1.module.css";

interface TemplateLayout1Props {
  [key: string]: any; // allows for additional props of any type
}

const TemplateLayout1: NextPage<TemplateLayout1Props> = ({
  img,
  author,
  txt,
  className,
  height,
  width,
}) => {
  return (
    <>
      <div className={classes.gridContainer}>
        <div className={`${className} ${classes.a}`}>
          <Image
            src={img}
            alt="mainImg"
            height={height}
            width={width}
            layout="responsive"
          />
        </div>
        <p className={classes.b}>{author}</p>
        <div className={classes.c}>{txt}</div>
      </div>
    </>
  );
};

export default TemplateLayout1;
