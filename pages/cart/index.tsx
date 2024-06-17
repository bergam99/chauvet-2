import CartItemCard from "@/components/cartItemCard/cartItemCard";
import { totalPrice, useCartStore } from "@/stores/cart";
import { useEffect } from "react";
import classes from "./cart.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Cart = () => {
  const { cart, loadCart } = useCartStore();
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

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <>
      <section className={classes.cart}>
        <div className={classes.topContainer}>
          <p className={classes.panier}>Panier</p>
        </div>

        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div key={item._id.toString()}>
                <CartItemCard item={item} removeBtn />
              </div>
            ))}
            <div className={classes.totalWrapper}>
              <p className={classes.totalPrice}> Total : {total} €</p>
            </div>

            <div className={classes.buttonsWrapper}>
              <Link href="/products" className={`${classes.btn} DefaultButton`}>
                Continuer mes achats
              </Link>

              <button
                className="DefaultButtonDark"
                onClick={() => handleCheckout()}
              >
                Valider le paiement
              </button>
            </div>
          </>
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
