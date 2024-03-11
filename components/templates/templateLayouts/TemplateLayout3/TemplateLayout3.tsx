import { NextPage } from "next";
import Image from "next/image";
// import classes from "./templateLayout3.module.css";

interface TemplateLayout3Props {
  img: string;
  size: string;
  txt?: string[];
}

const TemplateLayout3: NextPage<TemplateLayout3Props> = ({
  img,
  size,
  txt,
}) => {
  return (
    <>
      <div>
        <div className={size}>
          <Image
            src={img}
            alt="mainImg"
            height={1}
            width={1}
            layout="responsive"
          />
        </div>
        {txt?.[0]}
        <br />
        {txt?.[1]}
      </div>
    </>
  );
};

export default TemplateLayout3;
