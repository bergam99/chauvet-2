import MeLayout from "@/components/layouts/meLayout/meLayout";
import OrderCard from "@/components/orderCard/orderCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import classes from "./order.module.css";
import Loader from "@/components/loader/loader";
import InnerMeLayout from "@/components/layouts/meLayout/innerMeLayout/innerMeLayout";
import { useOrderStore } from "@/stores/order";

const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const { orders, totalOrderCount, fetchAllOrders } = useOrderStore();

  useEffect(() => {
    const fetching = async () => {
      setIsLoading(true);
      await fetchAllOrders();
      setIsLoading(false);
    };
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MeLayout>
        <InnerMeLayout title="Mes commandes">
          {isLoading && <Loader />}
          {!isLoading && orders.length > 0 && session && (
            <div className={classes.table}>
              <p className={classes.font}>Total ({totalOrderCount})</p>
              <OrderCard orders={orders} />
            </div>
          )}
          {!isLoading && session && orders.length === 0 && (
            <p className={classes.noOrder}>Pas de commande encore..</p>
          )}
          {!isLoading && !session && (
            <p>You must be logged in to see your orders.</p>
          )}
        </InnerMeLayout>
      </MeLayout>
    </>
  );
};

export default OrderPage;
