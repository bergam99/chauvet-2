import CartItemCard from "@/components/cartItemCard/cartItemCard";
import { useCartStore } from "@/stores/cart";
import { useEffect, useState } from "react";
import classes from "./cart.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { totalPrice } from "@/utils/cartUtils";

const Cart = () => {
  const { cart, loadCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const { data: session } = useSession();
  const router = useRouter();
  const total = totalPrice(cart);
  const handleCheckout = () => {
    // If there's no session (user not logged in), redirect to login page
    if (!session) {
      router.push("/me");
    } else {
      // If user is logged in, redirect to checkout page
      router.push("/checkout/form");
    }
  };

  useEffect(() => {
    loadCart();
    setIsLoading(false);
  }, [loadCart]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className={classes.cart}>
        <div className={classes.topContainer}>
          <p className={classes.panier}>Panier</p>
        </div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItemCard item={item} key={item._id.toString()} removeBtn />
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
      {total.length > 0 && (
        <>
          <div className={classes.totalWrapper}>
            <p className={classes.totalPrice}> Total : {total} €</p>
          </div>

          <div className={classes.buttonsWrapper}>
            <Link href="/products" className="DefaultButton">
              Continuer mes achats
            </Link>

            <button
              className="DefaultButtonDark"
              onClick={() => handleCheckout()}
            >
              Valider le paiement
            </button>
          </div>
          <p>livraison gratuite à partir de 15 euros</p>
        </>
      )}
    </>
  );
};

export default Cart;
