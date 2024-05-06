import { IUserAddress } from "@/types/userAddress";
import Modal, { ModalHandles } from "../modal/modal";
import classes from "./allAddresses.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import AddressForm from "../addressForm/addressForm";
import { CheckoutProps } from "@/types/checkout";
import { useCheckoutStore } from "@/stores/checkout";

const AllAddresses = ({
  userAddress,
  handleInputChange,
  postAddress,
}: CheckoutProps) => {
  const {
    shippingAddress,
    handleshippingAddress,
    allAddresses,
    setAllAddresses,
  } = useCheckoutStore();

  const dialog = useRef<ModalHandles>(null);
  const [validationError, setValidationError] = useState("");
  const router = useRouter();
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const handleValidationAndClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!shippingAddress) {
      setValidationError("Please select an address!!");
      return;
    } else {
      setValidationError("");
      router.push("/checkout/summary");
    }
  };

  function openModal() {
    dialog.current?.open();
  }

  function submitModal(e: React.FormEvent<HTMLFormElement>) {
    const fakeEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;

    e.preventDefault();

    postAddress(fakeEvent); // post form
    dialog.current?.close(); // close modal
    setFetchTrigger(true); // start refresh
  }

  useEffect(() => {
    // TODO: Optimizer fetch fc
    if (fetchTrigger) {
      console.log("Fetching all addresses...");
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
          setAllAddresses(data.userAddress);
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

  // const toSummary = () => {
  //   router.push("/checkout/summary");
  // };

  return (
    <>
      <Modal ref={dialog}>
        <AddressForm
          userAddress={userAddress}
          handleInputChange={handleInputChange}
          postAddress={submitModal}
        />
      </Modal>

      <ul>
        {allAddresses.map((address: IUserAddress) => (
          <li
            key={address._id?.toString()}
            className={classes.address}
            onClick={() => handleshippingAddress(address)}
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
        selected! go to payment page
      </button>
      {shippingAddress ? `${shippingAddress._id}` : "not selected"}
      {validationError}
    </>
  );
};
export default AllAddresses;
