import Link from "next/link";
import classes from "./nestedLayout.module.css";
import { useSession, signOut } from "next-auth/react";
import { handleSignout } from "@/pages/me";

const NestedLayout = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>
          <p>menu icon</p>
        </button>
        <div className={classes.dropdownContent}>
          {!session && status === "unauthenticated" && (
            <>
              <Link href="/me">Login</Link>
            </>
          )}

          {session && <Link href="/me">Me</Link>}
          <Link href="#">Panier</Link>

          {session && (
            <>
              <Link href="#">Commandes</Link>
              <a onClick={handleSignout}>Déconnexion</a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NestedLayout;
