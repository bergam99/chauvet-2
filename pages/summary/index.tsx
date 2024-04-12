import CheckoutLayout from "@/components/layouts/checkoutLayout/checkoutLayout";
import CustomRadioButton from "@/components/customs/custumRadioButton/custumRadioButton";
import React from "react";

const Summary = () => {
  return (
    <>
      <CheckoutLayout
        title="2. Récapitulatif et paiement"
        subTitle="Mode de paiement"
      >
        <div></div>
        {/* <CustomRadioButton
            label="Carte bancaire"
            name="paymentMethod"
            value="card"
            checked={userAddress.paymentMethod === "card"}
            onChange={handleInputChange}
          /> */}
      </CheckoutLayout>
    </>
  );
};

export default Summary;
