import { NextPage } from "next";
import Image from "next/image";
import TL4a from "./TL/TL4a";
// import classes from "./templateLayout4.module.css";

interface TemplateLayout4Props {
  img: string[];
  size: any;
  txt?: any;
  connectedTxt?: any;
}

const TemplateLayout4: NextPage<TemplateLayout4Props> = ({
  img,
  size,
  txt,
  connectedTxt,
}) => {
  return (
    <>
      <TL4a
        size={size[0]}
        img={img[0]}
        txt={txt[0]}
        connectedTxt={connectedTxt[0]}
      />
      {/* <div>
        <div className={size}>
          <Image
            src={img[0]}
            alt="mainImg"
            height={1}
            width={1}
            layout="responsive"
          />
        </div>
        {txt?.[0]}
        <br />
        {txt?.[1]}
      </div> */}
    </>
  );
};

export default TemplateLayout4;
