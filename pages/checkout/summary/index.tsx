import CheckoutLayout from "@/components/layouts/checkoutLayout/checkoutLayout";
import React, { useEffect, useState } from "react";
import { IUserAddress } from "@/types/userAddress";
import classes from "./summary.module.css";
import { totalPrice } from "@/utils/cartUtils";
import { useCartStore } from "@/stores/cart";

const Summary = () => {
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart } = useCartStore();
  const total = totalPrice(cart);

  useEffect(() => {
    fetch("/api/summary", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserAddresses(data.userAddress);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching user addresses failed:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {/* <p>1. Livraison</p> */}
      <CheckoutLayout
        title="2. Récapitulatif et paiement"
        subTitle="Adresse de livraison"
        buttonTxt="Payer"
      >
        {isLoading && <p>Loading...</p>}
        {!isLoading && userAddresses.length > 0 && (
          <ul className={classes.addressContainer}>
            {userAddresses.map((address) => (
              <li key={address._id.toString()} className={classes.address}>
                {address.gender} {address.firstName} {address.lastName} <br />
                {address.address} {address.additionalAddresse} <br />
                {address.city} {address.zipcode} {address.region} <br />
                {address.country} <br />
                Téléphone : {address.tel} <br />
                {address?.tel2 && `Téléphone 2 : ${address.tel2}`} <br />
                {address?.additionalInfo && `Note: ${address.additionalInfo}`}
              </li>
            ))}
          </ul>
        )}
        {!isLoading && userAddresses.length === 0 && <p>No addresse found.</p>}
        <p className={classes.total}>Total de la commande : {total} €</p>
      </CheckoutLayout>
    </>
  );
};

export default Summary;
