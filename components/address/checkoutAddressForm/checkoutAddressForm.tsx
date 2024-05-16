import { useEffect, useState } from "react";
import AddressForm from "../addressForm/addressForm";
import AllAddresses from "../allAddresses/allAddresses";
import { useCheckoutStore } from "@/stores/address";

const CheckoutAddressForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { allAddresses, fetchAllAddresses } = useCheckoutStore();

  useEffect(() => {
    const fetching = async () => {
      setIsLoading(true);
      await fetchAllAddresses();
      setIsLoading(false);
    };
    fetching();
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
