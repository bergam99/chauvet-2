import { NextPage } from "next";
import Image from "next/image";
// import classes from "./templateLayout4.module.css";

interface TL4aProps {
  img: string;
  size: any;
  txt?: any;
  connectedTxt?: any;
}

const TL4a: NextPage<TL4aProps> = ({ img, size, txt, connectedTxt }) => {
  return (
    <>
      <div>
        <div className={size}>
          <Image src={img} alt="img" height={1} width={1} layout="responsive" />
        </div>
        {connectedTxt}
        <br />
        {txt}
      </div>
    </>
  );
};

export default TL4a;
