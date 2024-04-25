import { CheckoutProps } from "@/types/checkout";
import CustomInput from "../customs/customInput/customInput";
import CustomTextarea from "../customs/customTextarea/customTextarea";
import CustomRadioButton from "../customs/custumRadioButton/custumRadioButton";
import classes from "./addressForm.module.css";

const AddressForm = ({
  userAddress,
  handleInputChange,
  postAddress,
}: CheckoutProps) => {
  // TODO: empty form using ref={formRef}
  // const formRef = useRef(null);
  // const postAddress = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted");
  //   formRef.current.reset();
  // };

  return (
    <>
      <form onSubmit={postAddress}>
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
        <button className={`${classes.btn} DefaultButtonDark`} type="submit">
          submit this form (post)
        </button>
      </form>
    </>
  );
};

export default AddressForm;
