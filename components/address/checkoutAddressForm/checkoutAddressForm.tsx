import { useEffect } from "react";
import AddressForm from "../addressForm/addressForm";
import AllAddresses from "../allAddresses/allAddresses";
import { useAddressStore } from "@/stores/address";
import Loader from "@/components/loader/loader";

const CheckoutAddressForm = () => {
  const { allAddresses, fetchAllAddresses, isLoading } = useAddressStore();

  useEffect(() => {
    fetchAllAddresses();
  }, [fetchAllAddresses]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{allAddresses.length > 0 ? <AllAddresses /> : <AddressForm />}</>;
};

export default CheckoutAddressForm;
