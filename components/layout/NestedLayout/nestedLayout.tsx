import classes from "./nestedLayout.module.css";
import { useRouter } from "next/router";
import ShopLink from "./shopLink/shopLink";
import DesktopLayout from "./nesetedLayoutCpnt/desktopLayout/desktopLayout";
import MobileLayout from "./nesetedLayoutCpnt/mobileLayout/mobileLayout";

const NestedLayout = () => {
  const router = useRouter();
  const path = router?.asPath; // URL from router.

  if (path === "/" || path.includes("posts")) {
    return <ShopLink />;
  } else if (path.includes("/products") || path.includes("/me")) {
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
};

export default NestedLayout;
