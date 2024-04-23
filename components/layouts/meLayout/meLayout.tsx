import classes from "./meLayout.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const handleSignout = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  signOut();
};

interface Props {
  children: React.ReactNode;
}

const MeLayout = ({ children }: Props) => {
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <>
      <div className={classes.authenticatedContainer}>
        <div className={classes.desktopMenuContainer}>
          <Link
            href="/me"
            className={`${classes.link} ${
              isActive("/me") ? classes.active : ""
            }`}
          >
            Me
          </Link>
          <Link
            href="/order"
            className={`${classes.link} ${
              isActive("/order") ? classes.active : ""
            }`}
          >
            Mes commandes
          </Link>
          <button className={classes.deconnexion} onClick={handleSignout}>
            Déconnexion
          </button>
        </div>
        <div className={classes.children}>{children}</div>
      </div>
    </>
  );
};

export default MeLayout;
