import Modal, { ModalHandles } from "../modal/modal";
import { useRef } from "react";
import AddressForm from "../addressForm/addressForm";
import { useCheckoutStore } from "@/stores/checkout";

type OpenModalProps = {
  btnTxt?: string;
};
const OpenModalBtn = ({
  btnTxt = "+ ajouter une nouvelle address",
}: OpenModalProps) => {
  const {
    shippingAddress,
    postAddress,
    resetShippingAddress,
    setFetchTrigger,
    fetchTrigger,
  } = useCheckoutStore();

  const dialog = useRef<ModalHandles>(null);

  function openModal() {
    dialog.current?.open();
  }

  async function submitModal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await postAddress(e); // post form
    dialog.current?.close(); // close modal
    console.log("submitted modal :", shippingAddress);
    resetShippingAddress(); // prevent auto-select submitted shippingAddress
    console.log("clear modal :", shippingAddress);
    setFetchTrigger(true); // start refresh
    console.log("fetchTrigger", fetchTrigger);
  }

  return (
    <>
      <Modal ref={dialog}>
        <AddressForm submitModal={submitModal} />
      </Modal>

      <button
        className="DefaultButton"
        type="button"
        onClick={() => {
          openModal();
        }}
      >
        {btnTxt}
      </button>
    </>
  );
};

export default OpenModalBtn;
