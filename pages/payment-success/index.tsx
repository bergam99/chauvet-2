import { useCartStore } from "@/stores/cart";
import { useOrderStore } from "@/stores/order";
import Link from "next/link";
import { useEffect } from "react";
import classes from "./payment-success.module.css";
import Loader from "@/components/loader/loader";
const PaymentSuccess = () => {
  const { clearCart } = useCartStore();
  const { orders, totalOrderCount, fetchAllOrders, isLoading } =
    useOrderStore();

  useEffect(() => {
    fetchAllOrders();
    clearCart();
  }, [fetchAllOrders, clearCart]);

  if (isLoading) {
    return <Loader />;
  }

  const currentOrder = orders[0];

  return (
    <>
      {totalOrderCount === 1
        ? "Votre premier achat réussit"
        : "Votre commande a bien été prise en compte."}

      <div className={classes.resumeContainer}>
        <p className={classes.txt}>
          Numéro de la comande :{" "}
          <Link className={classes.oId} href={`/orders/${currentOrder?._id}`}>
            {currentOrder?._id.toString()}
          </Link>
        </p>

        <p className={classes.txt}>Résumé de la commande :</p>
        {currentOrder?.orderItems.map((orderItem) => (
          <li key={orderItem.product_id}>
            <p className={classes.txt}>
              {orderItem.name} x {orderItem.quantity}
            </p>

            <p className={`${classes.txt} ${classes.gap}`}>
              Total payé : {orderItem.price! * orderItem.quantity} €
            </p>
          </li>
        ))}

        <Link href="/orders" className="DefaultButtonDark">
          Voir toutes mes commandes
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccess;
