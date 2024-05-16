import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { handleSignout } from "@/components/layouts/meLayout/meLayout";
import Menu from "@/public/icon/menu.png";
import Image from "next/image";
import classes from "./mobileLayout.module.css";
import ShopLink from "../../shopLink/shopLink";

export default function MobileLayout() {
  const { data: session } = useSession();

  return (
    <>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>
          <Image src={Menu} alt="menuIcon" width={28} height={28} />
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

          <Link href="/products" className={classes.me}>
            Shop 📚
          </Link>
          <Link href="/cart" className={classes.cart}>
            Panier
          </Link>

          {session && (
            <>
              <Link href="/addresses" className={classes.cart}>
                Address
              </Link>
              <Link href="orders" className={classes.order}>
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
