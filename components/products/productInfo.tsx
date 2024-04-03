import Image from "next/image";
import classes from "./productInfo.module.css";
import { useRef } from "react";
import Modal, { ModalHandles } from "../modal/modal";
import { useCartStore } from "@/stores/cart";
import { IProduct } from "@/types/products";

// interface ModalHandles {
//   open: () => void;
// }

interface ProductInfoProps {
  product: IProduct;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { name, description, images, stock, price } = product;
  const src = images[0].url;

  const dialog = useRef<ModalHandles>(null);

  const { add: handleAddToCart } = useCartStore();

  function openModal() {
    dialog.current?.open();
  }

  return (
    <>
      <Modal ref={dialog} title={name} />
      <section className={classes.infoContainer}>
        <Image
          src={src}
          alt={name}
          width={400}
          height={300}
          className={classes.img}
        />
        <div className={classes.mainInfo}>
          <h2 className={`${classes.title} Link`}>{name}</h2>
          <p className={classes.des}>{description}</p>
          <p className={classes.price}>{price} €</p>
          <div className={classes.gap}></div>
          <p className={classes.stock}>{stock <= 0 && "stock épuisé"}</p>
          {/* add disabled color className from global.css when 0 stock */}
          <button
            onClick={() => {
              handleAddToCart(product);
              openModal();
            }}
            type="button"
            disabled={stock <= 0}
            className={`${classes.btn} DefaultButton`}
          >
            Ajouter au panier
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductInfo;
