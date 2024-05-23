import { IUserAddress } from "@/types/userAddress";
import { useAddressStore } from "@/stores/address";
import classes from "./mapAllAddresses.module.css";
import { useEffect, useRef, useState } from "react";
import CustomRadioButton from "../../customs/custumRadioButton/custumRadioButton";
import AddressCard from "../addressCard/addressCard";
import Loader from "../../loader/loader";
import Modal, { ModalHandles } from "../../modal/modal";
import AddressForm from "../addressForm/addressForm";

type MapAllAddressesProps = {
  isCheckoutPage?: boolean;
};

const MapAllAddresses = ({ isCheckoutPage = false }: MapAllAddressesProps) => {
  const {
    setShippingAddress,
    shippingAddress,
    allAddresses,
    deleteAddress,
    fetchAllAddresses,
    fetchTrigger,
    setFetchTrigger,
    updateAddress,
  } = useAddressStore();

  const [isLoading, setIsLoading] = useState(true);
  const dialog = useRef<ModalHandles>(null);

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

  const openModifyModal = (address: IUserAddress) => {
    setShippingAddress(address);
    dialog.current?.open();
  };

  if (isLoading) {
    return <Loader />;
  }

  async function submitModifyAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (shippingAddress?._id) {
      await updateAddress(shippingAddress?._id as string, shippingAddress);
      dialog.current?.close();
      setFetchTrigger(true);
    }
  }

  return (
    <>
      <Modal ref={dialog}>
        <AddressForm submitModifyAddress={submitModifyAddress} />
      </Modal>

      <ul className={classes.ul}>
        {allAddresses.map((address: IUserAddress) => (
          <li
            key={address._id?.toString()}
            className={classes.li}
            onClick={() => setShippingAddress(address)}
          >
            {isCheckoutPage ? (
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
                  <button
                    onClick={() => openModifyModal(address)}
                    className={classes.modify}
                  >
                    Modifier
                  </button>
                  {/* use openModal component only when you want to clear form by opening modal */}
                  <button
                    onClick={() => {
                      deleteAddress(address._id);
                    }}
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
    </>
  );
};

export default MapAllAddresses;
