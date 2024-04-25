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
      <p>order number : {order._id.toString()}</p>
      <p>total amout paid : {order.paymentInfo.amountPaid}</p>
      <p>status: {order.paymentInfo.status}</p>
      <hr />
      order details =&gt;
      <ul>
        {order.orderItems.map((orderItem, index) => (
          <li key={index}>
            <p>product :{orderItem.name.substring(0, 25)}</p>
            <p>quantity :{orderItem.quantity}</p>
            <p>each price : {orderItem.price}</p>
            <p></p>
          </li>
        ))}
      </ul>
      <hr />
      user detail =&gt;
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{region}</p>
      <p>{tel}</p>
      <p>{tel2}</p>
      <p>{country}</p>
      <hr />
      user infos =&gt;
      <p>{email}</p>
      <p>{name}</p>
    </div>
  );
};

export default OrderCard;
