import CartItemCard from "../../cartItemCard/cartItemCard";
import { totalPrice, useCartStore } from "@/stores/cart";
import classes from "./checkoutLayout.module.css";
import { useEffect } from "react";
import Loader from "@/components/loader/loader";

type CheckoutLayoutProps = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

const CheckoutLayout = ({ title, subTitle, children }: CheckoutLayoutProps) => {
  const { cart, loadCart, isLoading } = useCartStore();
  const total = totalPrice(cart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className={classes.layoutContainer}>
        <div className={classes.formWrapper}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.subTitle}>{subTitle}</p>
          {children}
        </div>

        <aside className={classes.recapSection}>
          <h2 className={classes.recapTitle}>Votre commande</h2>
          {cart.length > 0 &&
            cart.map((item) => (
              <CartItemCard
                item={item}
                key={item._id.toString()}
                bgColor="white"
              />
            ))}
          <p className={classes.total}>
            Total : <span className={classes.totalNb}>{total} €</span>
          </p>
        </aside>
      </section>
    </>
  );
};

export default CheckoutLayout;
