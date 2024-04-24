import MeLayout from "@/components/layouts/meLayout/meLayout";
import OrderCard from "@/components/orderCard/orderCard";
import { IOrders } from "@/types/order";
import { IUserAddress } from "@/types/userAddress";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);
  // const [address, setAddress] = useState<IUserAddress>({} as IUserAddress);
  const [totalOrder, setTotalOrder] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

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
        setTotalOrder(data.ordersCount);
        // setAddress(data.);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching order failed:", error);
        setIsLoading(false);
      });
  }, []);

  console.log({ orders });
  // TODO:  si session vide -> interdit, (server) *** (partie api) session.user.id=>collection order / server => front

  return (
    <>
      <MeLayout>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {!isLoading && orders.length > 0 && session && (
              <table>
                <p>Mes commandes</p>
                <p>commande total: {totalOrder}</p>
                {orders.map((orderItem) => (
                  <tbody key={orderItem._id.toString()}>
                    <OrderCard order={orderItem} />
                  </tbody>
                ))}
              </table>
            )}
            {!isLoading && !orders && <p>No order found.</p>}
            {!session && <p>You must be logged in to see your orders.</p>}
            {/* TODO:redirect to login page*/}
          </>
        )}
      </MeLayout>
    </>
  );
};

export default OrderPage;
