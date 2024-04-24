import { IOrders } from "@/types/order";
import classes from "./orderCard.module.css";

interface OrderCardProps {
  order: IOrders;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { firstName, lastName, address, city, region, tel, tel2, country } =
    order.userAddress[0];

  const { email, name } = order.user[0];

  return (
    // TODO: ajouter order detail page
    // TODO: use table tag instead
    <div className={classes.ordercard}>
      <p className={classes.font}>order number : {order._id.toString()}</p>
      <p className={classes.font}>
        total amout paid : {order.paymentInfo.amountPaid}
      </p>
      <p className={classes.font}>status: {order.paymentInfo.status}</p>
      <hr />
      order details =&gt;
      <ul>
        {order.orderItems.map((orderItem, index) => (
          <li key={index}>
            <p className={classes.font}>
              product :{orderItem.name.substring(0, 25)}
            </p>
            <p className={classes.font}>quantity :{orderItem.quantity}</p>
            <p className={classes.font}>each price : {orderItem.price}</p>
          </li>
        ))}
      </ul>
      <hr />
      user detail =&gt;
      <p className={classes.font}>{firstName}</p>
      <p className={classes.font}>{lastName}</p>
      <p className={classes.font}>{address}</p>
      <p className={classes.font}>{city}</p>
      <p className={classes.font}>{region}</p>
      <p className={classes.font}>{tel}</p>
      <p className={classes.font}>{tel2}</p>
      <p className={classes.font}>{country}</p>
      <hr />
      user infos =&gt;
      <p className={classes.font}>{email}</p>
      <p className={classes.font}>{name}</p>
    </div>
  );
};

export default OrderCard;
