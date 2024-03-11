import { NextPage } from "next";
import Image from "next/image";
import TL4a from "./TL/TL4a/TL4a";
import TL4b from "./TL/TL4b/TL4b";
import TL4c from "./TL/TL4c/TL4c";
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
      <TL4b
        size={size[1]}
        img={img[1]}
        txt={txt[1]}
        connectedTxt={connectedTxt[1]}
      />
      <TL4c
        size={size[2]}
        img={img[2]}
        txt={txt[2]}
        connectedTxt={connectedTxt[2]}
      />
    </>
  );
};

export default TemplateLayout4;

//   const ComponentMappings = [TL4a, TL4b, TL4c];
//   const templateLayout4Components = ComponentMappings.map(
//     (Component, index) => (
//       <Component
//         key={index}
//         size={size[index]}
//         img={img[index]}
//         txt={txt[index]}
//         connectedTxt={connectedTxt[index]}
//       />
//     )
//   );

//   return <>{templateLayout4Components}</>;
// };
