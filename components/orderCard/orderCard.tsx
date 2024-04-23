import { IOrder } from "@/types/order";
import classes from "./orderCard.module.css";

interface OrderCardProps {
  order: IOrder;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    // TODO: ajouter order detail page
    // TODO: use table tag instead
    <div className={classes.ordercard}>
      <p>order number : {order._id.toString()}</p>
      <p>total amout paid : {order.paymentInfo.amountPaid}</p>
      <p>status: {order.paymentInfo.status}</p>
      <hr />
      order details =&gt;
      <ul>
        {order.orderItems.map((orderItem, index) => (
          <li key={index}>
            <p>product :{orderItem.name.substring(0, 15)}</p>
            <p>quantity :{orderItem.quantity}</p>
            <p>each price : {orderItem.price}</p>
            <p></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
