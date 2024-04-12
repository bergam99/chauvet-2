import CartItemCard from "../../cartItemCard/cartItemCard";
import { useCartStore } from "@/stores/cart";
import classes from "./checkoutLayout.module.css";
import { useEffect, useState } from "react";

type CheckoutLayoutProps = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

const CheckoutLayout = ({ title, subTitle, children }: CheckoutLayoutProps) => {
  const { cart, loadCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    loadCart();
    setIsLoading(false);
  }, [loadCart]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className={classes.layoutContainer}>
        <div className={classes.formWrapper}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.subTitle}>{subTitle}</p>
          {children}
          <button className={`${classes.btn} DefaultButtonDark`} type="submit">
            Suivant
          </button>
        </div>

        <aside className={classes.recapSection}>
          <h2 className={classes.recapTitle}>Votre commande</h2>
          {cart.length > 0 &&
            cart.map((item) => (
              <CartItemCard
                item={item}
                key={item._id.toString()}
                removeBtn={false}
                bgColor="white"
              />
            ))}
          <p>Total :</p>
        </aside>
      </section>
    </>
  );
};

export default CheckoutLayout;
