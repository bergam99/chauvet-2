import { NextPage } from "next";
import Image from "next/image";
import classes from "./templateLayout5.module.css";

interface TemplateLayout5Props {
  img: string;
  size: string;
  connectedTxt?: string[];
}

const TemplateLayout5: NextPage<TemplateLayout5Props> = ({
  img,
  size,
  connectedTxt,
}) => {
  return (
    <>
      <section className={classes.gridContainer}>
        <div className={`${size[0]} ${classes.img0}`}>
          <Image
            src={img[0]}
            alt="mainImg"
            height={1}
            width={1}
            layout="responsive"
            className={classes.img}
          />
        </div>
        <p className={classes.connectedTxt0}>{connectedTxt?.[0]}</p>

        <div className={`${size[1]} ${classes.img1}`}>
          <Image
            src={img[1]}
            alt="mainImg"
            height={1}
            width={1}
            layout="responsive"
            className={classes.img}
          />
        </div>
        <p className={classes.connectedTxt1}>{connectedTxt?.[1]}</p>
      </section>
    </>
  );
};

export default TemplateLayout5;
