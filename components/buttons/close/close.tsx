import Image from "next/image";
import x from "@/public/icon/close.png";

const Close = ({ onClick = () => {} }) => {
  // default function for onClick (do nothing)
  return (
    <div>
      <button onClick={onClick}>
        <Image src={x} alt="close" width={15} height={15} />
      </button>
    </div>
  );
};

export default Close;
