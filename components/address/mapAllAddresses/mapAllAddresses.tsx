import { IUserAddress } from "@/types/userAddress";
import { useAddressStore } from "@/stores/address";
import classes from "./mapAllAddresses.module.css";
import { useRef } from "react";
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
    isLoading,
    updateAddress,
  } = useAddressStore();
  const dialog = useRef<ModalHandles>(null);

  const openModifyModal = (address: IUserAddress) => {
    setShippingAddress(address);
    dialog.current?.open();
  };

  async function submitModifyAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (shippingAddress?._id) {
      await updateAddress(shippingAddress?._id as string, shippingAddress);
      dialog.current?.close();
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Modal ref={dialog}>
        <AddressForm submitModifyAddress={submitModifyAddress} />
      </Modal>

      <ul className={classes.ul}>
        {allAddresses.map((address: IUserAddress) => (
          <li
            key={address.localId}
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
                  {/* use openModal component only when you want to clear the form by opening a modal */}
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
