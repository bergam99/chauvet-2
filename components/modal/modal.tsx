import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.css";
import Link from "next/link";
import Image from "next/image";
import x from "@/public/icon/close.png";
interface ModalHandles {
  open: () => void;
}

const Modal = forwardRef<ModalHandles>((props, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
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
              <button>
                <Image src={x} alt="close" width={15} height={15} />
              </button>
            </div>
          </form>

          <p className={classes.txt}>1 {} a été ajouté dans votre panier.</p>

          <div className={classes.btnContainer}>
            <form method="dialog" className="DefaultButton">
              <button>Continuer mes achats</button>
            </form>
            <Link href="/cart" className="DefaultButtonDark">
              <button>Voir mon panier</button>
            </Link>
          </div>
        </dialog>,
        document.getElementById("modal") as HTMLElement
      )
    : null;
});

Modal.displayName = "Modal";

export default Modal;
