import { IUserAddress } from "@/types/userAddress";
import Modal, { ModalHandles } from "../modal/modal";
import classes from "./allAddresses.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import AddressForm from "../addressForm/addressForm";
import { CheckoutProps } from "@/types/checkout";
import { baseAddress, useCheckoutStore } from "@/stores/checkout";

const AllAddresses = () => {
  const {
    shippingAddress,
    setShippingAddress,
    allAddresses,
    setAllAddresses,
    postAddress,
    resetShippingAddress,
  } = useCheckoutStore();

  const dialog = useRef<ModalHandles>(null);
  const [validationError, setValidationError] = useState("");
  const router = useRouter();
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const handleValidationAndClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: fix empty form submission
    if (!shippingAddress) {
      console.log("address not selected");
      setValidationError("Please select an address!!");
      return;
    } else {
      console.log("address selected", shippingAddress);

      setValidationError("");
      router.push("/checkout/summary");
    }
  };

  function openModal() {
    dialog.current?.open();
  }

  async function submitModal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await postAddress(e); // post form
    dialog.current?.close(); // close modal
    // resetShippingAddress();
    console.log("submit modal", shippingAddress);

    setFetchTrigger(true); // start refresh
  }

  useEffect(() => {
    console.log("Current shipping address:", shippingAddress);
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
    <>
      <Modal ref={dialog}>
        <AddressForm submitModal={submitModal} />
      </Modal>

      <ul>
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
      {shippingAddress ? `${shippingAddress.localId}` : "not selected"}
      {validationError}
    </>
  );
};
export default AllAddresses;
