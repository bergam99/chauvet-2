import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { handleSignout } from "@/pages/me";
import User from "@/public/icon/user.png";
import Menu from "@/public/icon/menu.png";
import Image from "next/image";
import classes from "./mobileLayout.module.css";

export default function MobileLayout() {
  const { data: session, status } = useSession();

  return (
    <>
      <div className={classes.dropdown}>
        <button className={`${classes.dropbtn} ${classes.mobileDisplay}`}>
          <Image src={User} alt="menu" width={30} height={30} />
        </button>
        <button className={classes.dropbtn}>
          <Image src={Menu} alt="menu" width={30} height={30} />
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
}
