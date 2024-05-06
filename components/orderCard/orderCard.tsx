import { IOrders } from "@/types/order";
import classes from "./orderCard.module.css";
import Link from "next/link";

interface OrderCardProps {
  orders: IOrders[];
}

const OrderCard = ({ orders }: OrderCardProps) => {
  return (
    <>
      <div className={classes.ordercard}>
        {/* Header Row */}
        <div className={classes.tableRow}>
          <div className={classes.tableCell}>ID</div>
          <div className={classes.tableCell}>Montant payé</div>
          <div className={classes.tableCell}>Status</div>
          <div className={classes.tableCell}>Articles</div>
          <div className={classes.tableCell}>Détail</div>
        </div>
        {/* Data Rows */}
        {orders.map((order) => (
          <div key={order._id.toString()} className={classes.tableRow}>
            <div className={classes.tableCell}>
              {order._id.toString().substring(0, 10)}...
            </div>
            <div className={classes.tableCell}>
              {order.paymentInfo.amountPaid} €
            </div>
            <div className={classes.tableCell}>{order.paymentInfo.status}</div>
            <div className={classes.tableCell}>
              {order.orderItems[0].name.substring(0, 10)}..
            </div>
            <Link href={`/orders/${order._id}`} className={classes.tableCell}>
              <div className={classes.voir}>Voir</div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderCard;
