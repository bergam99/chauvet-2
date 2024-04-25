import { IUserAddress } from "@/types/userAddress";
import Modal, { ModalHandles } from "../modal/modal";
import classes from "./allAddresses.module.css";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import AddressForm from "../addressForm/addressForm";
import { CheckoutProps } from "@/types/checkout";

interface AllAddressesProps {
  allAddresses: IUserAddress[];
}

type AllAddressesComponentProps = AllAddressesProps & CheckoutProps;

const AllAddresses = ({
  allAddresses,
  userAddress,
  handleInputChange,
  postAddress,
}: AllAddressesComponentProps) => {
  const dialog = useRef<ModalHandles>(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [validationError, setValidationError] = useState("");
  const router = useRouter();

  const handleSelectedAddress = (address: IUserAddress) => {
    setSelectedAddress(address._id.toString());
  };

  const handleValidationAndClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!selectedAddress) {
      setValidationError("Please select an address!!");
      return;
    }
    setValidationError("");
    router.push("/checkout/summary");
  };

  function openModal() {
    dialog.current?.open();
  }

  return (
    <>
      <Modal ref={dialog}>
        <AddressForm
          userAddress={userAddress}
          handleInputChange={handleInputChange}
          postAddress={postAddress}
        />
      </Modal>

      <ul>
        <p>allAddress</p>
        {allAddresses.map((address: IUserAddress) => (
          <li
            key={address._id.toString()}
            className={classes.address}
            onClick={() => handleSelectedAddress(address)}
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
        <button
          className="DefaultButton"
          type="button"
          onClick={() => {
            openModal();
          }}
        >
          + ajouter une nouvelle address
        </button>
      </ul>
      <button
        className={`${classes.btn} DefaultButtonDark`}
        type="button"
        onClick={handleValidationAndClick}
      >
        i selected! go to payment page
      </button>
      {selectedAddress ? selectedAddress : "not selected"}
      {validationError}
    </>
  );
};

export default AllAddresses;
