import { NextPage } from "next";
import Image from "next/image";
import classes from "./templateLayout2.module.css";
import { imageStyle } from "@/utils/imageStyle";

interface TemplateLayout2Props {
  img: string[];
  size: any;
}

const TemplateLayout2: NextPage<TemplateLayout2Props> = ({ img, size }) => {
  return (
    <>
      <div className={classes.gridContainer}>
        <div className={`${size[0]} ${classes.verticalImg} fadeInFromBottom`}>
          <Image
            src={img[0]}
            alt="img"
            height={641}
            width={474}
            className={classes.img}
            style={imageStyle}
          />
        </div>
        <div className={`${size[1]} ${classes.smallImg1} fadeInFromBottom`}>
          <Image
            src={img[1]}
            alt="img"
            height={319}
            width={473}
            style={imageStyle}
          />
        </div>
        <div className={`${size[2]} ${classes.smallImg2} fadeInFromBottom`}>
          <Image
            src={img[2]}
            alt="img"
            height={319}
            width={473}
            style={imageStyle}
          />
        </div>
      </div>
    </>
  );
};

export default TemplateLayout2;
