import Link from "next/link";
import NestedLayout from "../layout/nestedLayout";

const Header = () => {
  return (
    <>
      <Link href="/">
        <h1 className="Logo">Chauvet</h1>
      </Link>
      <NestedLayout />
    </>
  );
};

export default Header;
