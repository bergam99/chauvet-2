import { NextPage } from "next";
import Image from "next/image";
// import classes from "./templateLayout5.module.css";

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
      <div className={size[0]}>
        <Image
          src={img[0]}
          alt="mainImg"
          height={1}
          width={1}
          layout="responsive"
        />
        {connectedTxt?.[0]}
      </div>

      <div className={size[1]}>
        <Image
          src={img[1]}
          alt="mainImg"
          height={1}
          width={1}
          layout="responsive"
        />
        {connectedTxt?.[1]}
      </div>
    </>
  );
};

export default TemplateLayout5;
