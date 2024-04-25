import { useEffect, useState } from "react";
import AddressForm from "../addressForm/addressForm";
import classes from "./CheckoutAddressForm.module.css";
import { IUserAddress } from "@/types/userAddress";
import AllAddresses from "../allAddresses/allAddresses";
import { CheckoutProps } from "@/types/checkout";

const CheckoutAddressForm = ({
  userAddress,
  handleInputChange,
  postAddress,
}: CheckoutProps) => {
  const [allAddresses, setAllAddresses] = useState<IUserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch All address
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
        setAllAddresses(data.userAddress); // fetch all address
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching user addresses failed:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {!isLoading && allAddresses.length > 0 ? (
        <AllAddresses
          allAddresses={allAddresses}
          userAddress={userAddress}
          handleInputChange={handleInputChange}
          postAddress={postAddress}
          setAllAddresses={setAllAddresses}
        />
      ) : (
        <AddressForm
          userAddress={userAddress}
          handleInputChange={handleInputChange}
          postAddress={postAddress}
        />
      )}
    </>
  );
};

export default CheckoutAddressForm;
