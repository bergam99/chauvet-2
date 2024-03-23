import Link from "next/link";
import classes from "./404.module.css";

const Error = () => {
  return (
    <>
      <p className={classes.txt}>Mauvais chamin . . .</p>
      <Link href="/" className={`${classes.btn} DefaultButton`}>
        <button>Retour à l&apos;accueil</button>
      </Link>
    </>
  );
};

export default Error;
