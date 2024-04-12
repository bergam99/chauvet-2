import { useState } from "react";
import classes from "./checkout.module.css";
import CustomRadioButton from "@/components/customs/custumRadioButton/custumRadioButton";
import CustomInput from "@/components/customs/customInput/customInput";
import CustomTextarea from "@/components/customs/customTextarea/customTextarea";
import { useCartStore } from "@/stores/cart";
import CartItemCard from "@/components/cartItemCard/cartItemCard";

function CheckoutPage() {
  const { cart, loadCart } = useCartStore();
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
    additionalInfo: "",
    tel: "",
    tel2: "",
  });

  // Handles form submission
  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAddress),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
      <form onSubmit={submitFormHandler} className={classes.form}>
        <section className={classes.formContainer}>
          <div>
            <h2 className={classes.title}>1. Livraison</h2>
            <p className={classes.subTitle}>Adresse de livraison</p>

            <p className={classes.civilite}>Civilité</p>
            <div className={classes.radio}>
              <CustomRadioButton
                label="M."
                name="gender"
                value="M."
                checked={userAddress.gender === "M."}
                onChange={handleInputChange}
              />

              <CustomRadioButton
                label="Mme"
                name="gender"
                value="Mme"
                checked={userAddress.gender === "Mme"}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.name}>
              <CustomInput
                label="Prénom"
                name="firstName"
                required={true}
                onChange={handleInputChange}
              />

              <CustomInput
                label="Nom"
                name="lastName"
                onChange={handleInputChange}
                required={true}
              />
            </div>

            <div className={classes.address}>
              <CustomInput
                label="Adresse"
                name="address"
                onChange={handleInputChange}
                required={true}
              />

              <CustomInput
                label="Adresse supplémentaire"
                name="additionalAddresses"
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.ville}>
              <CustomInput
                label="Code postal"
                name="zipcode"
                onChange={handleInputChange}
                required={true}
              />

              <CustomInput
                label="Ville"
                name="city"
                onChange={handleInputChange}
                required={true}
              />
            </div>

            <div className={classes.country}>
              <CustomInput
                label="État / Région"
                name="region"
                onChange={handleInputChange}
              />

              <CustomInput
                label="Pays"
                name="country"
                onChange={handleInputChange}
                required={true}
              />
            </div>

            <div className={classes.tel}>
              <CustomInput
                label="Téléphone"
                name="tel"
                onChange={handleInputChange}
                required={true}
                type="tel"
              />
              <CustomInput
                label="Téléphone 2"
                name="tel2"
                onChange={handleInputChange}
                type="tel"
              />
            </div>
            <CustomTextarea
              label="Information additionnelle"
              name="additionalInfo"
              onChange={handleInputChange}
            />
          </div>
          <button className={`${classes.btn} DefaultButtonDark`} type="submit">
            Suivant
          </button>
        </section>
        <section className={classes.recapSection}>
          <h2 className={classes.recapTitle}>Votre commande</h2>
          {cart.length > 0 &&
            cart.map((item) => (
              <CartItemCard
                item={item}
                key={item._id.toString()}
                removeBtn={false}
                bgColor="white"
              />
            ))}
        </section>
      </form>
    </>
  );
}

// if !session return redirect destination: "/login"
export default CheckoutPage;
