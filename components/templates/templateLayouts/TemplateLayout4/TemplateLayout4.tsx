import { NextPage } from "next";
import Image from "next/image";
import TL4a from "./TL/TL4a/TL4a";
import TL4b from "./TL/TL4b/TL4b";
// import classes from "./templateLayout4.module.css";

interface TemplateLayout4Props {
  img: string[];
  txt?: any;
  connectedTxt?: any;
}

const TemplateLayout4: NextPage<TemplateLayout4Props> = ({
  img,
  txt,
  connectedTxt,
}) => {
  const ComponentMappings = [TL4a, TL4b, TL4a];
  const templateLayout4Components = ComponentMappings.map(
    (Component, index) => (
      <Component
        key={index}
        img={img[index]}
        txt={txt[index]}
        connectedTxt={connectedTxt[index]}
      />
    )
  );

  return <>{templateLayout4Components}</>;
};

export default TemplateLayout4;
