import { IUserAddress } from "@/types/userAddress";
import { useCheckoutStore } from "@/stores/checkout";
import classes from "./mapAllAddresses.module.css";
import { useEffect, useState } from "react";
import CustomRadioButton from "../customs/custumRadioButton/custumRadioButton";
import AddressCard from "../addressCard/addressCard";
import Loader from "../loader/loader";

type MapAllAddressesProps = {
  radioBtn?: boolean;
};

const MapAllAddresses = ({ radioBtn = false }: MapAllAddressesProps) => {
  const {
    setShippingAddress,
    shippingAddress,
    allAddresses,
    deleteAddress,
    fetchAllAddresses,
    fetchTrigger,
    setFetchTrigger,
  } = useCheckoutStore();

  const [isLoading, setIsLoading] = useState(true);

  /**
   * triggerd first time mount & trigger = true by submitting the modal
   */
  useEffect(() => {
    const fetching = async () => {
      await fetchAllAddresses();
      setIsLoading(false);
    };
    fetching();
    setFetchTrigger(false); // reset to default value aftre refreshing, this will switch when submit modal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTrigger]);

  if (isLoading) {
    return <Loader />;
  }

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
              <div className={classes.btnContainer}>
                <button onClick={() => {}} className={classes.modify}>
                  Modifier
                </button>

                <button
                  onClick={() => deleteAddress(shippingAddress._id)}
                  className={classes.delete}
                >
                  Supprimer
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MapAllAddresses;
