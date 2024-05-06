import { NextPage } from "next";
import Image from "next/image";
import classes from "./TL4b.module.css";
import { imageStyle } from "@/utils/imageStyle";

interface TL4bProps {
  img: string;
  txt?: any;
  connectedTxt?: any;
}

const TL4b: NextPage<TL4bProps> = ({ img, txt, connectedTxt }) => {
  return (
    <>
      <section className={classes.gridContainer}>
        <p className={classes.txt}>{txt}</p>
        <div className={`${classes.img} fadeInFromBottom`}>
          <Image
            src={img}
            alt="img"
            height={276}
            width={477}
            style={imageStyle}
          />
        </div>
        {connectedTxt && <p className={classes.connectedTxt}>{connectedTxt}</p>}
      </section>
    </>
  );
};

export default TL4b;
