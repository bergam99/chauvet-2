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
        <div className={`${size[0]} ${classes.left}`}>
          <Image
            src={img[0]}
            alt="mainImg"
            height={1}
            width={1}
            layout="responsive"
          />
          {connectedTxt?.[0]}
        </div>

        <div className={`${size[1]} ${classes.right}`}>
          <Image
            src={img[1]}
            alt="mainImg"
            height={1}
            width={1}
            layout="responsive"
          />
          {connectedTxt?.[1]}
        </div>
      </section>
    </>
  );
};

export default TemplateLayout5;
