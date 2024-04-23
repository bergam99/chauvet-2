import MeLayout from "@/components/layouts/meLayout/meLayout";
import OrderCard from "@/components/orderCard/orderCard";
import { IOrder } from "@/types/order";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/order", {
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
        setOrders(data.orders);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching order failed:", error);
        setIsLoading(false);
      });
  }, []);
  console.log({ orders });

  return (
    <>
      <MeLayout>
        {!isLoading && orders.length > 0 && (
          <table>
            <caption>Mes commandes</caption>
            {orders.map((orderItem) => (
              <tbody key={orderItem._id.toString()}>
                <OrderCard order={orderItem} />
              </tbody>
            ))}
          </table>
        )}
        {!isLoading && !orders && <p>No order found.</p>}
      </MeLayout>
    </>
  );
};

export default OrderPage;
