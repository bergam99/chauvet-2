import CartItemCard from "@/components/cartItemCard/cartItemCard";
import { useCartStore } from "@/stores/cart";
import { useEffect, useState } from "react";
import classes from "./cart.module.css";
import Link from "next/link";

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
      <section className={classes.cart}>
        <div className={classes.topContainer}>
          <p className={classes.panier}>Panier</p>
        </div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItemCard item={item} key={item._id.toString()} />
          ))
        ) : (
          <p className={classes.noProduct}>
            Vous n&apos;avez pas de produit dans votre panier. Cliquez{" "}
            <Link href="/products" className={classes.link}>
              ici
            </Link>{" "}
            pour continuer vos achats.
          </p>
        )}
      </section>
      {totalPrice > 0 && (
        <>
          <div className={classes.totalWrapper}>
            <p className={classes.totalPrice}> Total : {totalPrice} €</p>
          </div>

          <div className={classes.buttonsWrapper}>
            <Link href="/products" className="DefaultButton">
              Continuer mes achats
            </Link>

            <Link href="/products" className="DefaultButtonDark">
              Valider le paiement
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
