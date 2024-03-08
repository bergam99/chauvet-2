import Link from "next/link";
import Image from "next/image";
import Book from "@/public/icon/book.png";
import classes from "./shopLink.module.css";

export default function ShopLink() {
  return (
    <div className={classes.iconContainer}>
      <Link href="/products">
        <Image
          src={Book}
          alt="Book-shop"
          width={20}
          height={20}
          className={classes.icon}
        />
      </Link>
    </div>
  );
}
