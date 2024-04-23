import { useState } from "react";
import { useRouter } from "next/router";
import CheckoutAddressForm from "@/components/checkoutAddressForm/checkoutAddressForm";

function CheckoutPage() {
  const router = useRouter();
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

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/userAddress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAddress),
    }).then((response) => response.json());
    // .then((data) => console.log(data));
    router.push("/checkout/summary");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; // extract name and value
    setUserAddress((prevUserAddress) => ({
      ...prevUserAddress,
      [name]: value, // name(key) : value
    }));
  };

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <CheckoutAddressForm
          userAddress={userAddress}
          handleInputChange={handleInputChange}
        />
      </form>
    </>
  );
}

// if !session return redirect destination: "/login"
export default CheckoutPage;
