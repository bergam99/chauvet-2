import CheckoutLayout from "@/components/layouts/checkoutLayout/checkoutLayout";
import CheckoutAddressForm from "@/components/address/checkoutAddressForm/checkoutAddressForm";

function CheckoutFormPage() {
  return (
    <>
      <CheckoutLayout title="1. Livraison" subTitle="Adresse de livraison">
        <CheckoutAddressForm />
      </CheckoutLayout>
    </>
  );
}

export default CheckoutFormPage;
