import { NextPage } from "next";
import Image from "next/image";
import classes from "./TL4b.module.css";

interface TL4bProps {
  img: string;
  size: string;
  txt?: any;
  connectedTxt?: any;
}

const TL4b: NextPage<TL4bProps> = ({ img, size, txt, connectedTxt }) => {
  return (
    <>
      <section className={classes.gridContainer}>
        <p className={classes.left}>{txt}</p>
        <div className={`${size} ${classes.right}`}>
          <Image src={img} alt="img" height={1} width={1} layout="responsive" />

          <p>{connectedTxt}</p>
        </div>
      </section>
    </>
  );
};

export default TL4b;
