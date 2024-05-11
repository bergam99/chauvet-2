import MeLayout from "@/components/layouts/meLayout/meLayout";
import OrderCard from "@/components/orderCard/orderCard";
import { IOrders } from "@/types/order";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import classes from "./order.module.css";
import Loader from "@/components/loader/loader";

const OrderPage = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [totalOrder, setTotalOrder] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    console.log("fetching all orders...");
    fetch("/api/orders", {
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
        if (data.orders && data.orders.length > 0) {
          setOrders(data.orders);
          setTotalOrder(data.ordersCount);
        } else {
          console.log("No orders found or empty orders list.");
          setOrders([]);
        }
      })
      .catch((error) => {
        console.error("Fetching orders failed:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // console.log({ orders });

  return (
    <>
      <MeLayout>
        {isLoading && <Loader />}
        {!isLoading && orders.length > 0 && session && (
          <div>
            <p className={classes.font}>Mes commandes ({totalOrder})</p>
            <OrderCard orders={orders} />
          </div>
        )}
        {!isLoading && session && orders.length === 0 && <p>No order found.</p>}
        {!isLoading && !session && (
          <p>You must be logged in to see your orders.</p>
        )}
      </MeLayout>
    </>
  );
};

export default OrderPage;
