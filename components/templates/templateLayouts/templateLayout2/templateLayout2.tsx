import { NextPage } from "next";
import Image from "next/image";
import classes from "./templateLayout2.module.css";

interface TemplateLayout2Props {
  img: string[];
  size: any;
}

const TemplateLayout2: NextPage<TemplateLayout2Props> = ({ img, size }) => {
  return (
    <>
      <div className={classes.gridContainer}>
        <div className={`${size[0]} ${classes.verticalImg}`}>
          <Image
            src={img[0]}
            alt="img"
            height={1}
            width={1}
            layout="responsive"
            className={classes.img}
          />
        </div>
        <div className={`${size[1]} ${classes.smallImg1}`}>
          <Image
            src={img[1]}
            alt="img"
            height={0}
            width={0}
            layout="responsive"
            className={classes.img}
          />
        </div>
        <div className={`${size[2]} ${classes.smallImg2}`}>
          <Image
            src={img[2]}
            alt="img"
            height={1}
            width={1}
            layout="responsive"
            className={classes.img}
          />
        </div>
      </div>
    </>
  );
};

export default TemplateLayout2;
