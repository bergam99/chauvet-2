import { NextPage } from "next";
import Image from "next/image";
import classes from "./TemplateLayout3.module.css";
import { imageStyle } from "@/utils/imageStyle";

interface TemplateLayout3Props {
  img: string;
  txt?: any;
}

const TemplateLayout3: NextPage<TemplateLayout3Props> = ({ img, txt }) => {
  return (
    <>
      <div>
        <div className={`${classes.img} fadeInFromBottom`}>
          <Image
            src={img}
            alt="mainImg"
            height={736}
            width={542}
            style={imageStyle}
          />
        </div>
        {txt[0] && <p className={classes.txt}>{txt[0]}</p>}
        {txt[1] && <p className={classes.txt}>{txt[1]}</p>}
      </div>
    </>
  );
};

export default TemplateLayout3;
