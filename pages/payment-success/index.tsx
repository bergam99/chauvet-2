import { useCartStore } from "@/stores/cart";
import Link from "next/link";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* TODO: get order number... summary */}
      <div>PaymentSuccess</div>
      <Link href="/orders" className="DefaultButton">
        Mes commandes
      </Link>
    </>
  );
};

export default PaymentSuccess;
