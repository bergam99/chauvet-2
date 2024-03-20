import { NextPage } from "next";
import Image from "next/image";
import classes from "./TL4a.module.css";
import { imageStyle } from "@/utils/imageStyle";

interface TL4aProps {
  img: string;
  size: any;
  txt?: any;
  connectedTxt?: any;
}

const TL4a: NextPage<TL4aProps> = ({ img, size, txt, connectedTxt }) => {
  return (
    <>
      <section className={classes.gridContainer}>
        <div className={classes.img}>
          <Image
            src={img}
            alt="img"
            height={348}
            width={526}
            style={imageStyle}
          />
        </div>
        <p className={classes.connectedTxt}>{connectedTxt}</p>

        <div className={classes.txt}>
          <p>{txt[0] && txt[0]} </p>
          <p>{txt[1] && txt[1]}</p>
        </div>
      </section>
    </>
  );
};

export default TL4a;
