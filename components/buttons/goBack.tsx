import { useRouter } from "next/router";
import arrow from "@/public/icon/left-arrow.png";
import classes from "./goBack.module.css";
import Image from "next/image";

const GoBack = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <div className={classes.arrow}>
        <Image src={arrow} alt="->" layout="responsive" />
      </div>
    </button>
  );
};

export default GoBack;
