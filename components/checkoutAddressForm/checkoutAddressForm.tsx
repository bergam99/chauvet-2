import CustomInput from "@/components/customs/customInput/customInput";
import CustomTextarea from "@/components/customs/customTextarea/customTextarea";
import CheckoutLayout from "../layouts/checkoutLayout/checkoutLayout";
import CustomRadioButton from "@/components/customs/custumRadioButton/custumRadioButton";
import classes from "./checkoutAddressForm.module.css";

interface CheckoutAddressFormProps {
  userAddress: {
    gender: string;
    firstName: string;
    lastName: string;
    address: string;
    additionalAddresse: string;
    zipcode: string;
    city: string;
    region: string;
    country: string;
    additionalInfo: string;
    tel: string;
    tel2: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const CheckoutAddressForm = ({
  userAddress,
  handleInputChange,
}: CheckoutAddressFormProps) => {
  return (
    <CheckoutLayout title="1. Livraison" subTitle="Adresse de livraison">
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
          name="additionalAddresse"
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
    </CheckoutLayout>
  );
};

export default CheckoutAddressForm;