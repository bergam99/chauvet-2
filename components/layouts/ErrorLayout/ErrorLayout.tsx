import Link from "next/link";
import classes from "./ErrorLayout.module.css";

type ErrorLayoutProps = {
  title: string;
  link: string;
  buttonTxt: string;
};

const ErrorLayout = ({ title, link, buttonTxt }: ErrorLayoutProps) => {
  return (
    <>
      <p className={classes.txt}>{title}</p>
      <Link href={link} className={`${classes.btn} DefaultButton`}>
        <button>{buttonTxt}</button>
      </Link>
    </>
  );
};

export default ErrorLayout;
