import { NextPage } from "next";
import Image from "next/image";
import classes from "./TL4a.module.css";

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
        <div className={classes.left}>
          <div className={`${size} ${classes.img}`}>
            <Image
              src={img}
              alt="img"
              height={1}
              width={1}
              layout="responsive"
            />
          </div>
          <p className={classes.connectedTxt}>{connectedTxt}</p>
        </div>

        <div className={classes.right}>
          {txt[0] && txt[0]} {txt[1] && txt[1]}
        </div>
      </section>
    </>
  );
};

export default TL4a;
