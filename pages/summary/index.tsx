import CheckoutLayout from "@/components/layouts/checkoutLayout/checkoutLayout";
import React, { useEffect, useState } from "react";
import { IUserAddress } from "@/types/userAddress";
import classes from "./summary.module.css";
import { totalPrice } from "@/utils/cartUtils";
import { useCartStore } from "@/stores/cart";

const Summary = () => {
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([]);
  const [loading, setLoading] = useState(true); // Default to true, starts loading on mount
  const { cart } = useCartStore();
  const total = totalPrice(cart);

  useEffect(() => {
    fetch("/api/summary")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserAddresses(data.userAddress);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching user addresses failed:", error);
        setLoading(false);
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
        {loading && <p>Loading...</p>}
        {!loading && userAddresses.length > 0 && (
          <ul className={classes.addressContainer}>
            {userAddresses.map((address) => (
              <li key={address._id.toString()} className={classes.address}>
                {address.firstName} {address.lastName} <br />
                {address.address} {address.additionalAddresse} <br />
                {address.city} {address.zipcode} {address.region} <br />
                {address.country} <br />
                Téléphone : {address.tel} <br />
                Téléphone 2 : {address.tel2} <br />
                note: {address.additionalInfo}
              </li>
            ))}
          </ul>
        )}
        {!loading && userAddresses.length === 0 && <p>No addresse found.</p>}
        <p className={classes.total}>Total de la commande : {total} €</p>
      </CheckoutLayout>
    </>
  );
};

export default Summary;
