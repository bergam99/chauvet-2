import { IUserAddress } from "@/types/userAddress";
import { useCheckoutStore } from "@/stores/checkout";
import classes from "./mapAllAddresses.module.css";
import { Dispatch, SetStateAction, useEffect } from "react";

type MapAllAddressesProps = {
  setFetchTrigger: Dispatch<SetStateAction<boolean>>;
  fetchTrigger: boolean;
};

const MapAllAddresses = ({
  setFetchTrigger,
  fetchTrigger,
}: MapAllAddressesProps) => {
  const { setShippingAddress, allAddresses, setAllAddresses } =
    useCheckoutStore();

  useEffect(() => {
    // console.log("Current shipping address:", shippingAddress);
    console.log("mapAllAddresses useEffect GO ==> ", fetchTrigger);

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
    console.log("mapAllAddresses useEffect DONE ==> ", fetchTrigger);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTrigger]);

  return (
    <ul className={classes.ul}>
      {allAddresses.map((address: IUserAddress) => (
        <li
          key={address.localId?.toString()}
          className={classes.address}
          onClick={() => setShippingAddress(address)}
        >
          {address.gender} {address.firstName} {address.lastName} <br />
          {address.address} {address.additionalAddresse} <br />
          {address.city} {address.zipcode} {address.region} <br />
          {address.country} <br />
          Téléphone : {address.tel} <br />
          {address?.tel2 && `Téléphone 2 : ${address.tel2}`} <br />
          {address?.additionalInfo && `Note: ${address.additionalInfo}`}
        </li>
      ))}
    </ul>
  );
};

export default MapAllAddresses;
