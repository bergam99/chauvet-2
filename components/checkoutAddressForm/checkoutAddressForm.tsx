import { useEffect, useState } from "react";
import AddressForm from "../addressForm/addressForm";
import AllAddresses from "../allAddresses/allAddresses";
import { CheckoutProps } from "@/types/checkout";
import { useCheckoutStore } from "@/stores/checkout";
import { useRouter } from "next/router";

const CheckoutAddressForm = ({
  userAddress,
  handleInputChange,
  postAddress,
}: CheckoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { allAddresses, setAllAddresses } = useCheckoutStore();
  const router = useRouter();

  /**
   * fetch All address
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

  /**
   * Navigate to summary after submitting form & when only first address
   */
  const toSummary = () => {
    router.push("/checkout/summary");
  };

  return (
    <>
      {!isLoading && allAddresses.length > 0 ? (
        <AllAddresses
          userAddress={userAddress}
          handleInputChange={handleInputChange}
          postAddress={postAddress}
        />
      ) : (
        <AddressForm
          userAddress={userAddress}
          handleInputChange={handleInputChange}
          postAddress={postAddress}
          toSummary={toSummary}
        />
      )}
    </>
  );
};

export default CheckoutAddressForm;
