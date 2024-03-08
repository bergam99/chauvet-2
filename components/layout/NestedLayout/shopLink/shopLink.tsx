import Link from "next/link";
import Image from "next/image";
import Book from "@/public/icon/book.png";
import Cart from "@/public/icon/cart.png";
import User from "@/public/icon/user.png";

export default function ShopLink() {
  return (
    <div>
      <Link href="/products">
        <Image src={Book} alt="Book-shop" width={100} height={100} />
      </Link>
    </div>
  );
}
