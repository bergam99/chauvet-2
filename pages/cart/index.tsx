import CartItemCard from "@/components/cartItemCard/cartItemCard";
import { totalPrice, useCartStore } from "@/stores/cart";
import { useEffect, useState } from "react";
import classes from "./cart.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/components/loader/loader";

const Cart = () => {
  const { cart, loadCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const total = totalPrice(cart);

  const handleCheckout = () => {
    if (!session) {
      router.push("/me");
    } else {
      router.push("/checkout/form");
    }
  };

  const toProducts = () => {
    router.push("/products");
  };

  useEffect(() => {
    loadCart();
    setIsLoading(false);
  }, [loadCart]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className={classes.cart}>
        <div className={classes.topContainer}>
          <p className={classes.panier}>Panier</p>
        </div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <>
              <CartItemCard item={item} key={item._id.toString()} removeBtn />
              <div className={classes.totalWrapper}>
                <p className={classes.totalPrice}> Total : {total} €</p>
              </div>

              <div className={classes.buttonsWrapper}>
                <button className="DefaultButton" onClick={() => toProducts()}>
                  Continuer mes achats
                </button>

                <button
                  className="DefaultButtonDark"
                  onClick={() => handleCheckout()}
                >
                  Valider le paiement
                </button>
              </div>
            </>
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
    </>
  );
};

export default Cart;
