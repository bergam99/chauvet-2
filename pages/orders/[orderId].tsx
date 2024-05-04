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

  const user = [
    { label: "Email", value: email },
    { label: "Nom", value: name },
  ];

  const livraison = [
    { label: "First Name", value: firstName },
    { label: "Prénom", value: lastName },
    { label: "Address", value: address },
    { label: "City", value: city },
    { label: "Region", value: region },
    { label: "Tel", value: tel },
    { label: "Tel2", value: tel2 },
    { label: "Country", value: country },
    { label: "Zipcode", value: zipcode },
    { label: "Additional Address", value: additionalAddresse },
    { label: "Additional Info", value: additionalInfo },
    { label: "Gender", value: gender },
  ];

  const paymentInfos = [
    { label: "ID", value: order?._id.toString() },
    { label: "Montant payé", value: order?.paymentInfo.amountPaid },
    { label: "Status", value: order?.paymentInfo.status },
  ];

  return (
    <>
      <MeLayout>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <section className={classes.orderId}>
              <GoBack />
              <p className={classes.title}>Payment infos</p>
              <div className={classes.orderTable}>
                {paymentInfos.map((item) => (
                  <div key={item.label} className={classes.tableRow}>
                    <div className={classes.tableCell}>{item.label}</div>
                    <div className={classes.tableCell}>{item.value}</div>
                  </div>
                ))}
              </div>

              <p className={classes.title}>User</p>

              <div className={classes.orderTable}>
                {user.map((item) => (
                  <div key={item.label} className={classes.tableRow}>
                    <div className={classes.tableCell}>{item.label}</div>
                    <div className={classes.tableCell}>{item.value}</div>
                  </div>
                ))}
              </div>

              <p className={classes.title}>Livraison</p>
              <div className={classes.orderTable}>
                {livraison.map((item) => (
                  <div key={item.label} className={classes.tableRow}>
                    <div className={classes.tableCell}>{item.label}</div>
                    <div className={classes.tableCell}>{item.value}</div>
                  </div>
                ))}
              </div>

              <p className={classes.title}>Produits commandés</p>

              <ul className={classes.orderTable}>
                {/* Header Row */}
                <li className={classes.tableRow}>
                  <div className={classes.tableCell}>Produit</div>
                  <div className={classes.tableCell}>Quantité</div>
                  <div className={classes.tableCell}>Prix</div>
                  <div className={classes.tableCell}>Prix total</div>
                </li>
                {/* Data Rows */}
                {order?.orderItems.map((orderItem) => (
                  <li key={orderItem.product_id} className={classes.tableRow}>
                    <div className={classes.tableCell}>{orderItem.name}</div>
                    <div className={classes.tableCell}>
                      {orderItem.quantity}
                    </div>
                    <div className={classes.tableCell}>{orderItem.price}</div>
                    <div className={classes.tableCell}>
                      {orderItem.price! * orderItem.quantity}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </MeLayout>
    </>
  );
};

export default OrderDetail;
