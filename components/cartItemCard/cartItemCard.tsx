import Image from "next/image";
import Close from "../customs/closeButton/closeButton";
import { CartItem, useCartStore } from "@/stores/cart";
import classes from "./cartItemCard.module.css";

interface CartItemCardProps {
  item: CartItem;
  removeBtn: boolean;
  bgColor?: string;
}

const CartItemCard = ({
  item,
  removeBtn,
  bgColor = "gray",
}: CartItemCardProps) => {
  const { remove } = useCartStore();

  return (
    <section
      className={`${
        bgColor === "white"
          ? classes.whiteBg
          : bgColor === "gray"
          ? classes.grayBg
          : ""
      } ${classes.cardContainer}`}
    >
      <Image
        src={item.images[0]?.url}
        alt={item.name}
        width={400}
        height={300}
        className={classes.img}
      />
      <div className={classes.descriptionContainer}>
        <div className={classes.titleWrapper}>
          <p className={classes.name}>{item.name}</p>
          <p className={classes.quantity}>Quantité : {item.count}</p>
        </div>
        <div className={classes.totalContainer}></div>
        <p className={classes.price}>{item.count * item.price} €</p>
      </div>
      <div className={classes.x}>
        {removeBtn && (
          <Close
            onClick={() => {
              remove(item._id.toString());
            }}
          />
        )}
      </div>
    </section>
  );
};

export default CartItemCard;
