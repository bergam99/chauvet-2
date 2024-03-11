import { IPosts } from "@/types/posts";
import { NextPage } from "next";
import Image from "next/image";
// import classes from "./templateLayout2.module.css";

interface TemplateLayout2Props {
  img: string[];
  size: any;
}

const TemplateLayout2: NextPage<TemplateLayout2Props> = ({ img, size }) => {
  console.log({ size });
  return (
    <>
      <div className={size[0]}>
        <Image
          src={img[0]}
          alt="img"
          height={1}
          width={1}
          layout="responsive"
        />
      </div>
      <div className={size[1]}>
        <Image
          src={img[1]}
          alt="img"
          height={1}
          width={1}
          layout="responsive"
        />
      </div>
      <div className={size[2]}>
        <Image
          src={img[2]}
          alt="img"
          height={1}
          width={1}
          layout="responsive"
        />
      </div>
      {/* {txt && txt.map((t: any, index: any) => <p key={index}>{t}</p>)} */}
    </>
  );
};

export default TemplateLayout2;
