import MeLayout from "@/components/layouts/meLayout/meLayout";
import OrderCard from "@/components/orderCard/orderCard";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import classes from "./order.module.css";
import Loader from "@/components/loader/loader";
import InnerMeLayout from "@/components/layouts/meLayout/innerMeLayout/innerMeLayout";
import { useOrderStore } from "@/stores/order";

const OrderPage = () => {
  const { data: session } = useSession();

  const { orders, totalOrderCount, fetchAllOrders, isLoading } =
    useOrderStore();

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <MeLayout>
        <InnerMeLayout title="Mes commandes">
          {orders.length > 0 && session && (
            <div className={classes.table}>
              <p className={classes.font}>Total ({totalOrderCount})</p>
              <OrderCard orders={orders} />
            </div>
          )}
          {session && orders.length === 0 && (
            <p className={classes.noOrder}>Pas de commande encore..</p>
          )}
          {!session && <p>You must be logged in to see your orders.</p>}
        </InnerMeLayout>
      </MeLayout>
    </>
  );
};

export default OrderPage;
