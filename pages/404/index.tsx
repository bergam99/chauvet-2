import Link from "next/link";
import classes from "./404.module.css";
import ErrorLayout from "@/components/layouts/ErrorLayout/ErrorLayout";

const Error = () => {
  return (
    <ErrorLayout
      title="Mauvais chamin . . ."
      link="/"
      buttonTxt="Retour à l'accueil"
    />
  );
};

export default Error;
