import { IOrders } from "@/types/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "./orderId.module.css";
import GoBack from "@/components/customs/backButton/goBack";
import MeLayout from "@/components/layouts/meLayout/meLayout";
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

  const { email, name } = order?.user[0] ?? {};

  console.log({ order, orderId });

  return (
    <>
      <MeLayout>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <GoBack />
            <p>order Id :{order?._id.toString()}</p>

            <hr />
            <p>user</p>
            <p>email: {email}</p>
            <p>name: {name}</p>
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
          </>
        )}
      </MeLayout>
    </>
  );
};

export default OrderDetail;
