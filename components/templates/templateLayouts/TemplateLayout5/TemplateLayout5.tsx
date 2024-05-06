import { NextPage } from "next";
import Image from "next/image";
import classes from "./TemplateLayout5.module.css";
import { imageStyle } from "@/utils/imageStyle";

interface TemplateLayout5Props {
  img: string;
  connectedTxt?: string[];
}

const TemplateLayout5: NextPage<TemplateLayout5Props> = ({
  img,
  connectedTxt,
}) => {
  return (
    <>
      <section className={classes.gridContainer}>
        <div className={`${classes.img0} fadeInFromBottom`}>
          <Image
            src={img[0]}
            alt="mainImg"
            height={409}
            width={526}
            style={imageStyle}
          />
        </div>
        <p className={classes.connectedTxt0}>{connectedTxt?.[0]}</p>

        <div className={`${classes.img1} fadeInFromBottom`}>
          <Image
            src={img[1]}
            alt="mainImg"
            height={409}
            width={526}
            style={imageStyle}
          />
        </div>
        <p className={classes.connectedTxt1}>{connectedTxt?.[1]}</p>
      </section>
    </>
  );
};

export default TemplateLayout5;
