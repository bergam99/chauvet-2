import { useEffect, useState } from "react";
import AddressForm from "../addressForm/addressForm";
import classes from "./CheckoutAddressForm.module.css";
import { IUserAddress } from "@/types/userAddress";
import AllAddresses from "../allAddresses/allAddresses";
import { CheckoutProps } from "@/types/checkout";
import { useRouter } from "next/router";
import { useCheckoutStore } from "@/stores/checkout";

const CheckoutAddressForm = ({
  userAddress,
  handleInputChange,
  postAddress,
}: CheckoutProps) => {
  const [allAddresses, setAllAddresses] = useState<IUserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { handleshippingAddress } = useCheckoutStore();

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

  // function postAddressAndNavigate(e: React.FormEvent<HTMLFormElement>) {
  //   // TODO: faire propre ici
  //   const fakeEvent = {
  //     preventDefault: () => {},
  //   } as React.FormEvent<HTMLFormElement>;

  //   e.preventDefault();

  //   postAddress(fakeEvent);

  //   router.push("/checkout/summary");
  //   handleshippingAddress(userAddress);
  // }

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
          // allAddresses={allAddresses}
          // postAddressAndNavigate={postAddressAndNavigate}
        />
      )}
    </>
  );
};

export default CheckoutAddressForm;
