import { IUserAddress } from "@/types/userAddress";
import { useCheckoutStore } from "@/stores/address";
import classes from "./mapAllAddresses.module.css";
import { useEffect, useRef, useState } from "react";
import CustomRadioButton from "../../customs/custumRadioButton/custumRadioButton";
import AddressCard from "../addressCard/addressCard";
import Loader from "../../loader/loader";
import Modal, { ModalHandles } from "../../modal/modal";
import AddressForm from "../addressForm/addressForm";

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
    updateAddress,
    selectedAddress,
    setSelectedAddress,
  } = useCheckoutStore();

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
    // console.log("mapAppAlldresses - useEffect =>", shippingAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTrigger]);

  const openModifyModal = (address: IUserAddress) => {
    setSelectedAddress(address);
    dialog.current?.open();
    console.log("openModifyModal, selectedAddress", address?._id);
  };

  if (isLoading) {
    return <Loader />;
  }

  async function submitModifyAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedAddress?._id) {
      await updateAddress(selectedAddress?._id as string, shippingAddress);
      // shippingAddress : modifiedAddress

      console.log("modif function execution");
      // setSelectedAddress(null);
      dialog.current?.close();
      setFetchTrigger(true);
      // } else {
      // console.log("no id");
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
                  <button
                    onClick={() => openModifyModal(address)}
                    className={classes.modify}
                  >
                    Modifier
                  </button>
                  {/* TODO: use openModalBtn */}

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
    </>
  );
};

export default MapAllAddresses;
