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
          <Image src={User} alt="menu" width={20} height={20} />
        </button>
        <button className={classes.dropbtn}>
          <Image src={Menu} alt="menu" width={20} height={20} />
        </button>
        <div className={classes.dropdownContent}>
          {!session && (
            <>
              <Link href="/me" className={classes.login}>
                Login
              </Link>
            </>
          )}

          {session && (
            <Link href="/me" className={classes.me}>
              Me
            </Link>
          )}

          <Link href="/cart" className={classes.cart}>
            Panier
          </Link>

          {session && (
            <>
              <Link href="#" className={classes.order}>
                Commandes
              </Link>
              <a onClick={handleSignout} className={classes.signOut}>
                Déconnexion
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
