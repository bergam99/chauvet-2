import ErrorLayout from "@/components/layouts/ErrorLayout/ErrorLayout";
import Link from "next/link";

const PaymentFailed = () => {
  return (
    <ErrorLayout
      title="Paiement échec..."
      link="/products"
      buttonTxt="Aller à shop page"
    />
  );
};

export default PaymentFailed;
