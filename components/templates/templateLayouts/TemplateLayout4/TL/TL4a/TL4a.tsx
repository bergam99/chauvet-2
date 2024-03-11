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
  // console.log({ connectedTxt });
  return (
    <>
      <section className={size}>
        <Image src={img} alt="img" height={1} width={1} layout="responsive" />

        {connectedTxt}
        <br />
        {/* {txt?.[0]}
        {txt?.[1]} */}
        {txt && txt.map((t: any, index: any) => <p key={index}>{t}</p>)}
      </section>
    </>
  );
};

export default TL4a;
