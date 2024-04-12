import Link from "next/link";
import Image from "next/image";
import Cart from "@/public/icon/cart.png";
import User from "@/public/icon/user.png";
import classes from "./desktopLayout.module.css";
import { useCartStore } from "@/stores/cart";

export default function DesktopLayout() {
  const count = useCartStore((state) => state.count());

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
        <Link href="/cart" className={classes.cartContainer}>
          <Image
            src={Cart}
            alt="Cart"
            width={20}
            height={20}
            className={classes.icon}
          />
          {count > 0 && <p className={classes.count}>{count}</p>}
        </Link>
      </div>
    </>
  );
}
