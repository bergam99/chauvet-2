import { NextPage } from "next";
import Image from "next/image";
import classes from "./templateLayout3.module.css";

interface TemplateLayout3Props {
  img: string;
  size: string;
  txt?: any;
}

const TemplateLayout3: NextPage<TemplateLayout3Props> = ({
  img,
  size,
  txt,
}) => {
  return (
    <>
      <div>
        <div className={`${size} ${classes.img}`}>
          <Image
            src={img}
            alt="mainImg"
            height={1}
            width={1}
            layout="responsive"
          />
        </div>
        {txt[0] && <p className={classes.txt}>{txt[0]}</p>}
        {txt[1] && <p className={classes.txt}>{txt[1]}</p>}
      </div>
    </>
  );
};

export default TemplateLayout3;
