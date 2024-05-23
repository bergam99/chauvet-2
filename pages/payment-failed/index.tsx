import ErrorLayout from "@/components/layouts/ErrorLayout/ErrorLayout";

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
