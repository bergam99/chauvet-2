import classes from "./allAddresses.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAddressStore } from "@/stores/address";
import MapAllAddresses from "../mapAllAddresses/mapAllAddresses";
import OpenModalBtn from "../../openModalBtn/openModalBtn";

const AllAddresses = () => {
  const { shippingAddress, resetShippingAddress } = useAddressStore();
  const [validationError, setValidationError] = useState("");
  const router = useRouter();

  useEffect(() => {
    resetShippingAddress();
  }, [resetShippingAddress]);

  const handleValidationAndClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!shippingAddress.localId) {
      setValidationError("Sélectionnez l'address de livraison ⚠");
      return;
    } else {
      setValidationError("");
      router.push("/checkout/summary");
    }
  };

  return (
    <>
      <MapAllAddresses isCheckoutPage />
      <OpenModalBtn btnTxt="+ ajouter une nouvelle address" />

      <button
        className={`${classes.btn} DefaultButtonDark`}
        type="button"
        onClick={handleValidationAndClick}
      >
        Suivant
      </button>

      <p className={classes.validation}>{validationError}</p>
    </>
  );
};
export default AllAddresses;
