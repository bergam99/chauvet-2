import { imageStyle } from "@/utils/imageStyle";
import { NextPage } from "next";
import Image from "next/image";
import classes from "./TemplateLayout6.module.css";

interface TemplateLayout6Props {
  img: string;
  txt?: string[];
}

const TemplateLayout6: NextPage<TemplateLayout6Props> = ({ img, txt }) => {
  return (
    <>
      <div>
        <div className={` ${classes.img0} fadeInFromBottom`}>
          <Image
            src={img[0]}
            alt="img"
            height={621}
            width={934}
            style={imageStyle}
          />
        </div>
        <div className={` ${classes.img1} fadeInFromBottom`}>
          <Image
            src={img[1]}
            alt="img"
            height={621}
            width={934}
            style={imageStyle}
          />
        </div>
        <div className={`${classes.img2} fadeInFromBottom`}>
          <Image
            src={img[2]}
            alt="img"
            height={621}
            width={934}
            style={imageStyle}
          />
        </div>
        {txt && <p className={classes.txt}>{txt}</p>}
      </div>
    </>
  );
};

export default TemplateLayout6;
