import Modal, { ModalHandles } from "../modal/modal";
import { useRef } from "react";
import AddressForm from "../addressForm/addressForm";
import { useCheckoutStore } from "@/stores/checkout";
import classes from "./openModalBtn.module.css";
type OpenModalProps = {
  btnTxt: string;
};
const OpenModalBtn = ({ btnTxt }: OpenModalProps) => {
  const {
    shippingAddress,
    postAddress,
    resetShippingAddress,
    setFetchTrigger,
  } = useCheckoutStore();

  const dialog = useRef<ModalHandles>(null);

  function openModal() {
    dialog.current?.open();
  }

  async function submitModal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await postAddress(e); // post form
    dialog.current?.close(); // close modal
    setFetchTrigger(true); // start refresh
  }

  return (
    <>
      <Modal ref={dialog}>
        <AddressForm submitModal={submitModal} />
      </Modal>

      <button
        className={`${classes.btn} DefaultButton`}
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
