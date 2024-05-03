import { IOrders } from "@/types/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "./orderId.module.css";
import GoBack from "@/components/customs/backButton/goBack";
const OrderDetail = () => {
  const [order, setOrder] = useState<IOrders>();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/orders/${orderId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setOrder(data.order);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching order failed:", error);
        setIsLoading(false);
      });
  }, [orderId]);

  const {
    firstName,
    lastName,
    address,
    city,
    region,
    tel,
    tel2,
    country,
    zipcode,
    additionalAddresse,
    additionalInfo,
    gender,
  } = order?.shippingAddress[0] ?? {};

  // const { email, name } = order.user[0];

  console.log({ order, orderId });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <GoBack />
      <p>order Id :{order?._id.toString()}</p>

      <hr />
      <p>user</p>
      <p>email: {order?.user[0].email}</p>
      <p>name: {order?.user[0].name}</p>
      <hr />
      <p>Produits commandés</p>
      <ul>
        {order?.orderItems.map((orderItem, index) => (
          <li key={index}>
            <p className={classes.font}>
              product :{orderItem.name.substring(0, 30)}
            </p>
            <p className={classes.font}>quantity :{orderItem.quantity}</p>
            <p className={classes.font}>each price : {orderItem.price}</p>
          </li>
        ))}
      </ul>
      <hr />
      <p>payment infos</p>

      <p>total amountPaid: {order?.paymentInfo.amountPaid}</p>
      <p>status:{order?.paymentInfo.status}</p>

      <hr />
      <p>Livraison</p>

      <p>firstName: {firstName}</p>
      <p>Prénom: {lastName}</p>
      <p>address: {address}</p>
      <p>city: {city}</p>
      <p>region: {region}</p>
      <p>tel: {tel}</p>
      <p>tel2: {tel2}</p>
      <p>country: {country}</p>
      <p>zipcode:{zipcode}</p>
      <p>additionalAddresse:{additionalAddresse}</p>
      <p>additionalInfo: {additionalInfo}</p>
      <p>gender: {gender}</p>

      {/* <p>{order?.shippingAddress[0].firstName}</p> */}
      {/* <div className={classes.ordercard}>
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
                product :{orderItem.name.substring(0, 25)}..
              </p>
              <p className={classes.font}>quantity :{orderItem.quantity}</p>
              <p className={classes.font}>each price : {orderItem.price}</p>
            </li>
          ))}
        </ul>
        <hr />
        shipping address =&gt;
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
        <p className={classes.font}>{name}</p> */}
      {/* </div> */}
    </>
  );
};

export default OrderDetail;
