import { NextPage } from "next";
import Image from "next/image";
// import classes from "./templateLayout6.module.css";

interface TemplateLayout6Props {
  img: string;
  size: string;
  txt?: string[];
}

const TemplateLayout6: NextPage<TemplateLayout6Props> = ({
  img,
  size,
  txt,
}) => {
  return (
    <>
      <div>
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
        {txt && txt.map((t: any, index: any) => <p key={index}>{t}</p>)}
      </div>
    </>
  );
};

export default TemplateLayout6;
