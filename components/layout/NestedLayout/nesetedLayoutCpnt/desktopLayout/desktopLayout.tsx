import Link from "next/link";
import Image from "next/image";
import Cart from "@/public/icon/cart.png";
import User from "@/public/icon/user.png";
import classes from "./desktopLayout.module.css";

export default function DesktopLayout() {
  return (
    <>
      <div className={classes.iconContainer}>
        <Link href="/me">
          <Image
            src={User}
            alt="User"
            width={20}
            height={20}
            className={classes.icon}
          />
        </Link>
        <Link href="/cart">
          <Image
            src={Cart}
            alt="Cart"
            width={20}
            height={20}
            className={classes.icon}
          />
        </Link>
      </div>
    </>
  );
}
