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
    setAllAddresses,
    deleteAddress,
  } = useCheckoutStore();

  useEffect(() => {
    // console.log("Current shipping address:", shippingAddress);
    // console.log("mapAllAddresses useEffect GO ==> ", fetchTrigger);

    // TODO: fetch trigger after delete (stock in store?)
    if (fetchTrigger) {
      console.log("re-fetching all addresses...");
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
        })
        .catch((error) => {
          console.error("Fetching user addresses failed:", error);
        })
        .finally(() => {
          setFetchTrigger(false);
          console.log("end refresh");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTrigger]);

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
