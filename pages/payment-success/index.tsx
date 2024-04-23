import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <>
      <div>PaymentSuccess</div>
      <Link href="/order" className="DefaultButton">
        Mes commandes
      </Link>
    </>
  );
};

export default PaymentSuccess;
