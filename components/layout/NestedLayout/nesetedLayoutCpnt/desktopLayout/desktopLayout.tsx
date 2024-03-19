import Link from "next/link";
import Image from "next/image";
import Book from "@/public/icon/book.png";
import Cart from "@/public/icon/cart.png";
import User from "@/public/icon/user.png";

export default function DesktopLayout() {
  return (
    <>
      <Link href="/me">
        <Image src={User} alt="User" width={100} height={100} />
      </Link>
      <Link href="/">
        <Image src={Cart} alt="Cart" width={100} height={100} />
      </Link>
    </>
  );
}
