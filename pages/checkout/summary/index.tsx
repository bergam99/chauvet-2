import CheckoutLayout from "@/components/layouts/checkoutLayout/checkoutLayout";
import { useState } from "react";
import classes from "./summary.module.css";
import { totalPrice, useCartStore } from "@/stores/cart";
import { useAddressStore } from "@/stores/address";
import Loader from "@/components/loader/loader";
import Link from "next/link";
import AddressCard from "@/components/address/addressCard/addressCard";

const Summary = () => {
  const { shippingAddress } = useAddressStore();
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useCartStore();
  const total = totalPrice(cart);

  // TODO Loader
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
      throw new Error(`failed to create checkout session`);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }
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
          <ul className={classes.addressContainer}>
            <li>
              <AddressCard address={shippingAddress} />
            </li>
          </ul>
        )}

        {!shippingAddress && <p>No addresse found.</p>}
        <p className={classes.total}>Total de la commande : {total} €</p>
        <button onClick={payment} className="DefaultButtonDark">
          Payer
        </button>
      </CheckoutLayout>
    </>
  );
};

export default Summary;
