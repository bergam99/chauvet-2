import classes from "./allAddresses.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCheckoutStore } from "@/stores/checkout";
import MapAllAddresses from "../mapAllAddresses/mapAllAddresses";
import OpenModalBtn from "../openModalBtn/openModalBtn";

const AllAddresses = () => {
  const { shippingAddress } = useCheckoutStore();
  const [validationError, setValidationError] = useState("");
  const router = useRouter();
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const handleValidationAndClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!shippingAddress.localId) {
      console.log("address not selected");
      setValidationError("Sélectionnez l'address de livraison ⚠");
      return;
    } else {
      console.log("address selected", shippingAddress);
      setValidationError("");
      router.push("/checkout/summary");
    }
  };

  return (
    <>
      <MapAllAddresses
        setFetchTrigger={setFetchTrigger}
        fetchTrigger={fetchTrigger}
        radioBtn={true}
      />
      <OpenModalBtn
        setFetchTrigger={setFetchTrigger}
        fetchTrigger={fetchTrigger}
      />

      <button
        className={`${classes.btn} DefaultButtonDark`}
        type="button"
        onClick={handleValidationAndClick}
      >
        selected! go to payment page
      </button>
      {/* {shippingAddress.localId && `${shippingAddress.localId}`} */}
      <p className={classes.validation}>{validationError}</p>
    </>
  );
};
export default AllAddresses;
