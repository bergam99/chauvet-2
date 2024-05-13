import classes from "./nestedLayout.module.css";
import { useRouter } from "next/router";
import ShopLink from "./shopLink/shopLink";
import DesktopLayout from "./nesetedLayoutCpnt/desktopLayout/desktopLayout";
import MobileLayout from "./nesetedLayoutCpnt/mobileLayout/mobileLayout";
import { useEffect, useState } from "react";

const NestedLayout = () => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  // client side useEffect
  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router.asPath]);

  if (currentPath === "/" || currentPath.includes("posts")) {
    return <ShopLink />;
  } else {
    return (
      <>
        <div className={classes.NestedLayout__Desktop}>
          <DesktopLayout />
        </div>

        <div className={classes.NestedLayout__Mobile}>
          <MobileLayout />
        </div>
      </>
    );
  }

  return null;
};

export default NestedLayout;
