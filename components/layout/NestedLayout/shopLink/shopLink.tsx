import Link from "next/link";
import Image from "next/image";
import Book from "@/public/icon/book.png";
import classes from "./shopLink.module.css";

export default function ShopLink() {
  return (
    <div className={classes.iconContainer}>
      <Link href="/products">
        <div className={classes.imageWrapper}>
          <Image
            src={Book}
            alt="Book-shop"
            layout="fill"
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
    </div>
  );
}
