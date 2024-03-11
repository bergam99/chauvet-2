import { NextPage } from "next";
import Image from "next/image";
// import classes from "./templateLayout4bmodule.css";

interface TL4bProps {
  img: string;
  size: any;
  txt?: any;
  connectedTxt?: any;
}

const TL4b: NextPage<TL4bProps> = ({ img, size, txt, connectedTxt }) => {
  return (
    <>
      <div>
        {txt}
        <div className={size}>
          <Image src={img} alt="img" height={1} width={1} layout="responsive" />
        </div>
        {connectedTxt}
        <br />
      </div>
    </>
  );
};

export default TL4b;
