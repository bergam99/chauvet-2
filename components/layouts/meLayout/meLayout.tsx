import classes from "./meLayout.module.css";
import arrow from "@/public/icon/right-arrow.png";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";

export const handleSignout = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  signOut();
};

interface Props {
  children: React.ReactNode;
}

const MeLayout = ({ children }: Props) => {
  return (
    <>
      <div className={classes.authenticatedContainer}>
        <div className={classes.desktopMenuContainer}>
          <Link href="/me" className={classes.link}>
            Me
          </Link>
          <Link href="/order" className={classes.link}>
            Mes commandes
          </Link>
          <button
            className={`${classes.link} ${classes.deconnexion}`}
            onClick={handleSignout}
          >
            Déconnexion
          </button>
        </div>
        <div className={classes.children}>{children}</div>
      </div>
    </>
  );
};

export default MeLayout;
