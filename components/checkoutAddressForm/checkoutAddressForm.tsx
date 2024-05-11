import { useEffect, useState } from "react";
import AddressForm from "../addressForm/addressForm";
import AllAddresses from "../allAddresses/allAddresses";
import { useCheckoutStore } from "@/stores/checkout";

const CheckoutAddressForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { allAddresses, setAllAddresses } = useCheckoutStore();

  /**
   * fetch All address already exists in db
   */
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
        setAllAddresses(data.userAddress);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching user addresses failed:", error);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLoading && allAddresses.length > 0 ? (
        <AllAddresses />
      ) : (
        <AddressForm />
      )}
    </>
  );
};

export default CheckoutAddressForm;
