import { useState } from "react";
import CheckoutLayout from "@/components/layouts/checkoutLayout/checkoutLayout";
import CheckoutAddressForm from "@/components/checkoutAddressForm/checkoutAddressForm";

function CheckoutFormPage() {
  const [userAddress, setUserAddress] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    address: "",
    additionalAddresse: "",
    zipcode: "",
    city: "",
    region: "",
    country: "",
    tel: "",
    tel2: "",
    additionalInfo: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; // extract name and value
    setUserAddress((prevUserAddress) => ({
      ...prevUserAddress,
      [name]: value, // name(key) : value
    }));
  };

  const postAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/userAddress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAddress),
    }).then((response) => response.json());

    console.log("address posted");

    // router.push("/checkout/summary");
  };

  return (
    <>
      <CheckoutLayout title="1. Livraison" subTitle="Adresse de livraison">
        <CheckoutAddressForm
          userAddress={userAddress}
          handleInputChange={handleInputChange}
          postAddress={postAddress}
        />
      </CheckoutLayout>
    </>
  );
}

export default CheckoutFormPage;
