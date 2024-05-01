import CheckoutLayout from "@/components/layouts/checkoutLayout/checkoutLayout";
import React, { useEffect, useState } from "react";
import { IUserAddress } from "@/types/userAddress";
import classes from "./summary.module.css";
import { totalPrice, useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";

const Summary = () => {
  const { shippingAddress } = useCheckoutStore();
  // const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useCartStore();
  const total = totalPrice(cart);

  // useEffect(() => {
  //   fetch("/api/summary", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setUserAddresses(data.userAddress);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Fetching user addresses failed:", error);
  //       setIsLoading(false);
  //     });
  // }, []);

  // console.log("ici", shippingAddress._id);

  const payment = async () => {
    setIsLoading(true);
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: cart,
        shippingAddress: shippingAddress._id,
      }),
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
  return (
    <>
      {/* <p>1. Livraison</p> */}
      <CheckoutLayout
        title="2. Récapitulatif et paiement"
        subTitle="Adresse de livraison"
      >
        {shippingAddress && (
          <div className={classes.addressContainer}>
            <ul className={classes.shippingAddress}>
              <li>{shippingAddress._id?.toString()}</li>
              <li>
                {shippingAddress.gender} {shippingAddress.firstName}
              </li>
              <li> {shippingAddress.lastName} </li>
              <li>
                {shippingAddress.address} {shippingAddress.additionalAddresse}
              </li>
              <li>
                {shippingAddress.city} {shippingAddress.zipcode}
              </li>
              <li>{shippingAddress.region}</li>
              <li>{shippingAddress.country}</li>
              <li>Téléphone : {shippingAddress.tel}</li>
              <li>
                {shippingAddress?.tel2 &&
                  `Téléphone 2 : ${shippingAddress.tel2}`}
              </li>
              <li>
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
