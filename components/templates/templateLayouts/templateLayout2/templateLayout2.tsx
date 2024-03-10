import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import Image from "next/image";
// import classes from "./templateLayout2.module.css";

interface TemplateLayout2Props {
  [key: string]: any; // allows for additional props of any type
}

const TemplateLayout2: NextPage<TemplateLayout2Props> = ({
  img,
  height,
  width,
  className,
}) => {
  return (
    <>
      <div className={className}>
        <Image
          src={img[0]}
          alt="img"
          height={height}
          width={width}
          layout="responsive"
        />
      </div>
      <div className={className}>
        <Image
          src={img[1]}
          alt="img"
          height={height}
          width={width}
          layout="responsive"
        />
      </div>
      <div className={className}>
        <Image
          src={img[2]}
          alt="img"
          height={height}
          width={width}
          layout="responsive"
        />
      </div>
    </>
  );
};

export default TemplateLayout2;
