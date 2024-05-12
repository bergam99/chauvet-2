import { IUserAddress } from "@/types/userAddress";
import { useCheckoutStore } from "@/stores/checkout";
import classes from "./mapAllAddresses.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomRadioButton from "../customs/custumRadioButton/custumRadioButton";

type MapAllAddressesProps = {
  setFetchTrigger: Dispatch<SetStateAction<boolean>>;
  fetchTrigger: boolean;
  radioBtn?: boolean;
  // deleteAddress: (id: string) => Promise<void>;
  deleteAddress: any; // TODO typer
};

const MapAllAddresses = ({
  setFetchTrigger,
  fetchTrigger,
  radioBtn = false,
  deleteAddress,
}: MapAllAddressesProps) => {
  const { setShippingAddress, shippingAddress, allAddresses, setAllAddresses } =
    useCheckoutStore();

  useEffect(() => {
    // console.log("Current shipping address:", shippingAddress);
    // console.log("mapAllAddresses useEffect GO ==> ", fetchTrigger);

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
    // console.log("mapAllAddresses useEffect DONE ==> ", fetchTrigger);

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
              label={
                <p className={classes.p}>
                  {address._id?.toString()} {address.gender}
                  {address.firstName}
                  {address.address} {address.additionalAddresse} <br />
                  Téléphone : {address.tel} <br />
                  {address.tel2 && `Téléphone 2 : ${address.tel2}`} <br />
                  {address.additionalInfo && `Note: ${address.additionalInfo}`}
                </p>
              }
              name="addressSelection"
              value={address.localId}
              checked={shippingAddress === address}
              onChange={() => setShippingAddress(address)}
            />
          ) : (
            <>
              <p className={classes.p}>
                {address._id?.toString()} {address.gender}
                {address.firstName}
                {address.address} {address.additionalAddresse} <br />
                Téléphone : {address.tel} <br />
                {address.tel2 && `Téléphone 2 : ${address.tel2}`} <br />
                {address.additionalInfo && `Note: ${address.additionalInfo}`}
              </p>
              <button onClick={() => deleteAddress(shippingAddress._id)}>
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MapAllAddresses;
