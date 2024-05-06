import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.css";
import Close from "../customs/closeButton/closeButton";

export interface ModalHandles {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  children: React.ReactNode;
}

const Modal = forwardRef<ModalHandles, ModalProps>(({ children }, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
    close() {
      dialog.current?.close();
    },
  }));

  useEffect(() => {
    // Once the component has mounted, set isBrowser to true
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }
  const modalRoot = document.getElementById("modal");

  return modalRoot
    ? createPortal(
        <dialog ref={dialog} className={classes.modal}>
          <form method="dialog">
            <div className={classes.x}>
              <Close />
            </div>
          </form>
          {children}
        </dialog>,
        document.getElementById("modal") as HTMLElement
      )
    : null;
});

Modal.displayName = "Modal";

export default Modal;
