import Close from "@/components/buttons/close/close";
import GoBack from "@/components/buttons/goBack";
import CartItemCard from "@/components/cartItemCard/cartItemCard";
import { useCartStore } from "@/stores/cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import classes from "./cart.module.css";

const Cart = () => {
  const { cart, loadCart } = useCartStore();
  console.log({ cart });

  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    loadCart();
    setIsLoading(false);
  }, [loadCart]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.count * item.price;
  }, 0);

  return (
    <>
      <section className={classes.section}>
        <div className={classes.topContainer}>
          <GoBack />
          <p className={classes.panier}>Panier</p>
        </div>
        {cart.length ? (
          cart.map((item) => (
            <CartItemCard item={item} key={item._id.toString()} />
          ))
        ) : (
          <p>nothing. . . </p>
        )}
      </section>
      {totalPrice ? (
        <p className={classes.totalPrice}> Total : {totalPrice} €</p>
      ) : (
        ""
      )}
    </>
  );
};

export default Cart;
