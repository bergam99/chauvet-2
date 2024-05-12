import { IUserAddress } from "@/types/userAddress";
import { useCheckoutStore } from "@/stores/checkout";
import classes from "./mapAllAddresses.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomRadioButton from "../customs/custumRadioButton/custumRadioButton";
import AddressCard from "../addressCard/addressCard";

type MapAllAddressesProps = {
  setFetchTrigger: Dispatch<SetStateAction<boolean>>;
  fetchTrigger: boolean;
  radioBtn?: boolean;
};

const MapAllAddresses = ({
  setFetchTrigger,
  fetchTrigger,
  radioBtn = false,
}: MapAllAddressesProps) => {
  const {
    setShippingAddress,
    shippingAddress,
    allAddresses,
    deleteAddress,
    fetchAllAddresses,
  } = useCheckoutStore();

  useEffect(() => {
    const fetching = async () => {
      // setIsLoading(true);
      await fetchAllAddresses();
      // setIsLoading(false);
    };
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className={classes.ul}>
      {allAddresses.map((address: IUserAddress) => (
        <li
          key={address._id?.toString()}
          className={classes.li}
          onClick={() => setShippingAddress(address)}
        >
          {radioBtn ? (
            <CustomRadioButton
              label={<AddressCard address={address} />}
              name="addressSelection"
              value={address.localId}
              checked={shippingAddress === address}
              onChange={() => setShippingAddress(address)}
            />
          ) : (
            <>
              <AddressCard address={address} />
              <button
                onClick={() => deleteAddress(shippingAddress._id)}
                className="Link"
              >
                Supprimer
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MapAllAddresses;
