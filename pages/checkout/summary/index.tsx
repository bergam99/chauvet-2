import CheckoutLayout from "@/components/layouts/checkoutLayout/checkoutLayout";
import { useState } from "react";
import classes from "./summary.module.css";
import { totalPrice, useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";
import Loader from "@/components/loader/loader";
import Link from "next/link";

const Summary = () => {
  const { shippingAddress } = useCheckoutStore();
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useCartStore();
  const total = totalPrice(cart);

  const payment = async () => {
    setIsLoading(true);
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: cart,
        shippingAddress: shippingAddress.localId,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      window.location.href = data.url;
    } else {
      console.error("failed to create checkout session", data.error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }
  // console.log({ shippingAddress });

  return (
    <>
      <Link href="/checkout/form" className={classes.livraison}>
        1. Livraison
      </Link>
      <CheckoutLayout
        title="2. Récapitulatif et paiement"
        subTitle="Adresse de livraison"
      >
        {shippingAddress && (
          <div className={classes.addressContainer}>
            <ul className={classes.shippingAddress}>
              <li className={classes.txt}>
                {shippingAddress.localId?.toString()}
              </li>
              <li className={classes.txt}>
                {shippingAddress.gender} {shippingAddress.firstName}
              </li>
              <li className={classes.txt}> {shippingAddress.lastName} </li>
              <li className={classes.txt}>
                {shippingAddress.address} {shippingAddress.additionalAddresse}
              </li>
              <li className={classes.txt}>
                {shippingAddress.city} {shippingAddress.zipcode}
              </li>
              <li className={classes.txt}>{shippingAddress.region}</li>
              <li className={classes.txt}>{shippingAddress.country}</li>
              <li className={classes.txt}>Téléphone : {shippingAddress.tel}</li>
              <li className={classes.txt}>
                {shippingAddress?.tel2 &&
                  `Téléphone 2 : ${shippingAddress.tel2}`}
              </li>
              <li className={classes.txt}>
                {shippingAddress?.additionalInfo &&
                  `Note: ${shippingAddress.additionalInfo}`}
              </li>
            </ul>
          </div>
        )}

        {!isLoading && !shippingAddress && <p>No addresse found.</p>}
        <p className={classes.total}>Total de la commande : {total} €</p>
        <button onClick={payment} className="DefaultButton">
          {isLoading ? "Loading..." : "Payer"}
        </button>
      </CheckoutLayout>
    </>
  );
};

export default Summary;
