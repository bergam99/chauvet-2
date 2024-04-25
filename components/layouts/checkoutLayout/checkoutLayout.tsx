import CartItemCard from "../../cartItemCard/cartItemCard";
import { useCartStore } from "@/stores/cart";
import classes from "./checkoutLayout.module.css";
import { useEffect, useState } from "react";
import { totalPrice } from "@/utils/cartUtils";

type CheckoutLayoutProps = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  buttonTxt?: string;
};

const CheckoutLayout = ({
  title,
  subTitle,
  children,
  buttonTxt = "Suivant",
}: CheckoutLayoutProps) => {
  const { cart, loadCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  const total = totalPrice(cart);

  useEffect(() => {
    loadCart();
    setIsLoading(false);
  }, [loadCart]);

  const payment = async () => {
    setIsLoading(true);
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: cart }),
    });
    const data = await response.json();
    // console.log({ data });

    if (response.ok) {
      window.location.href = data.url;
    } else {
      console.error("failed to create checkout session", data.error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // console.log({ cart });

  return (
    <>
      <section className={classes.layoutContainer}>
        <div className={classes.formWrapper}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.subTitle}>{subTitle}</p>
          {children}
          <button
            className={`${classes.btn} DefaultButtonDark`}
            type="submit"
            onClick={buttonTxt === "Payer" ? payment : undefined}
          >
            {/* {buttonTxt} */}
            {buttonTxt === "Payer" && isLoading ? "Loading..." : buttonTxt}
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
          <p className={classes.total}>
            Total : <span className={classes.totalNb}>{total} €</span>
          </p>
        </aside>
      </section>
    </>
  );
};

export default CheckoutLayout;
