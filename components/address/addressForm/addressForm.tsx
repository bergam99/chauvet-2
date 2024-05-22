import { CheckoutProps } from "@/types/checkout";
import CustomInput from "../../customs/customInput/customInput";
import CustomTextarea from "../../customs/customTextarea/customTextarea";
import CustomRadioButton from "../../customs/custumRadioButton/custumRadioButton";
import classes from "./addressForm.module.css";
import { useAddressStore } from "@/stores/address";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { IUserAddress } from "@/types/userAddress";
import { schema } from "@/utils/yupFormValidation";

const AddressForm = ({ submitModal, submitModifyAddress }: CheckoutProps) => {
  const {
    postAddress,
    handleInputChange,
    shippingAddress,
    resetShippingAddress,
    setFormValidationErrors,
    formValidationErrors,
    clearFormValidationErrors,
  } = useAddressStore();
  const router = useRouter();

  const yupSubmitFormValidation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("yupSubmitFormValidation execution");
    try {
      // false : verify all fields
      await schema.validate(shippingAddress, { abortEarly: false });
      clearFormValidationErrors(); // if no error then reset
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Partial<IUserAddress> = {};
        // collect all formvalidationerrors and store in validationErrors
        err.inner.forEach((error) => {
          validationErrors[error.path as keyof IUserAddress] = error.message;
        });
        setFormValidationErrors(validationErrors);
      }

      return false;
    }
  };

  // on blur check
  const yupBlurFormValidation = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    // console.log("onBlur");
    const { name, value } = e.target;
    try {
      await schema.validateAt(name, { [name]: value });
      setFormValidationErrors((prevErrors: Partial<IUserAddress>) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setFormValidationErrors((prevErrors: any) => ({
          ...prevErrors,
          [name]: err.message,
        }));
      }
    }
  };

  async function submission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isValid = await yupSubmitFormValidation(e);
    if (!isValid) {
      return;
    }
    if (submitModal) {
      // Modal mode (shippingAddress.length > 0)
      await submitModal(e);
      resetShippingAddress();
    } else if (submitModifyAddress) {
      // Modify modal mode
      await submitModifyAddress(e);
      resetShippingAddress();
    } else {
      // first time submission (shippingAddress.length === 0)
      await postAddress(e);
      router.push("/checkout/summary");
    }
  }

  return (
    <>
      <form onSubmit={submission}>
        <p className={classes.civilite}>Civilité</p>
        <div className={classes.radio}>
          <CustomRadioButton
            label="M."
            name="gender"
            value="M."
            checked={shippingAddress.gender === "M."}
            onChange={handleInputChange}
          />

          <CustomRadioButton
            label="Mme"
            name="gender"
            value="Mme"
            checked={shippingAddress.gender === "Mme"}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.name}>
          <CustomInput
            label="Prénom"
            name="firstName"
            required={true}
            onChange={handleInputChange}
            value={shippingAddress.firstName}
            onBlur={yupBlurFormValidation}
            error={formValidationErrors.firstName}
          />
          <CustomInput
            label="Nom"
            name="lastName"
            onChange={handleInputChange}
            required={true}
            value={shippingAddress.lastName}
            onBlur={yupBlurFormValidation}
            error={formValidationErrors.lastName}
          />
        </div>

        <div className={classes.address}>
          <CustomInput
            label="Adresse"
            name="address"
            onChange={handleInputChange}
            required={true}
            value={shippingAddress.address}
            onBlur={yupBlurFormValidation}
            error={formValidationErrors.address}
          />

          <CustomInput
            label="Adresse supplémentaire"
            name="additionalAddresse"
            onChange={handleInputChange}
            value={shippingAddress.additionalAddresse}
          />
        </div>

        <div className={classes.ville}>
          <CustomInput
            label="Code postal"
            name="zipcode"
            onChange={handleInputChange}
            required={true}
            value={shippingAddress.zipcode}
            onBlur={yupBlurFormValidation}
            error={formValidationErrors.zipcode}
          />

          <CustomInput
            label="Ville"
            name="city"
            onChange={handleInputChange}
            required={true}
            value={shippingAddress.city}
            onBlur={yupBlurFormValidation}
            error={formValidationErrors.city}
          />
        </div>

        <div className={classes.country}>
          <CustomInput
            label="État / Région"
            name="region"
            onChange={handleInputChange}
            value={shippingAddress.region}
          />

          <CustomInput
            label="Pays"
            name="country"
            onChange={handleInputChange}
            required={true}
            value={shippingAddress.country}
            onBlur={yupBlurFormValidation}
            error={formValidationErrors.country}
          />
        </div>

        <div className={classes.tel}>
          <CustomInput
            label="Téléphone"
            name="tel"
            onChange={handleInputChange}
            required={true}
            type="tel"
            value={shippingAddress.tel}
            onBlur={yupBlurFormValidation}
            error={formValidationErrors.tel}
          />

          <CustomInput
            label="Téléphone 2"
            name="tel2"
            onChange={handleInputChange}
            type="tel"
            value={shippingAddress.tel2}
          />
        </div>
        <CustomTextarea
          label="Information additionnelle"
          name="additionalInfo"
          onChange={handleInputChange}
          value={shippingAddress.additionalInfo}
        />
        <div className={classes.btnContainer}>
          <button className={`${classes.btn} DefaultButtonDark`} type="submit">
            Enregistrer
          </button>
        </div>
        {Object.keys(formValidationErrors).length > 0 ? (
          <p className={classes.err}>Veuillez vérifier les champs invalids ⚠</p>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default AddressForm;
