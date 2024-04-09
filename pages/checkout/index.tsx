import { useRef, useState } from "react";
import classes from "./checkout.module.css";
import CustomRadioButton from "@/components/customs/custumRadioButton/custumRadioButton";
import CustomInput from "@/components/customs/customInput/customInput";
import CustomTextarea from "@/components/customs/customTextarea/customTextarea";

function CheckoutPage() {
  const [civilite, setCivilite] = useState("");
  const prenomInputRef = useRef<HTMLInputElement>(null);
  const nomInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const addressSuppInputRef = useRef<HTMLInputElement>(null);
  const codePostalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const regionInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const additionnalInfoInputRef = useRef<HTMLTextAreaElement>(null);
  const telInputRef = useRef<HTMLInputElement>(null);
  const tel2InputRef = useRef<HTMLInputElement>(null);
  function submitFormHandler(e: React.FormEvent) {
    e.preventDefault();

    const enteredPrenom = prenomInputRef?.current?.value;
    const enteredNom = nomInputRef?.current?.value;
    const enteredAddress = addressInputRef?.current?.value;
    const enteredAddressSuppInputRef = addressSuppInputRef?.current?.value;
    const enteredCodePostalInputRef = codePostalInputRef?.current?.value;
    const enteredCityInputRef = cityInputRef?.current?.value;
    const enteredRegionInputRef = regionInputRef?.current?.value;
    const enteredCountryInputRef = countryInputRef?.current?.value;
    const enteredAdditionnalInfoInputRef =
      additionnalInfoInputRef?.current?.value;
    const enteredTelInputRef = telInputRef?.current?.value;
    const enteredTel2InputRef = tel2InputRef?.current?.value;

    // add client side validation

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        civilite,
        prenom: enteredPrenom,
        nom: enteredNom,
        address: enteredAddress,
        addressSupp: enteredAddressSuppInputRef,
        codePostal: enteredCodePostalInputRef,
        city: enteredCityInputRef,
        region: enteredRegionInputRef,
        country: enteredCountryInputRef,
        additionnalInfo: enteredAdditionnalInfoInputRef,
        tel: enteredTelInputRef,
        tel2: enteredTel2InputRef,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  const handleCiviliteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCivilite(e.target.value);
  };

  return (
    <>
      <form onSubmit={submitFormHandler} className={classes.form}>
        <div className={classes.formContainer}>
          <div>
            <h2 className={classes.title}>1. Livraison</h2>
            <p className={classes.subTitle}>Adresse de livraison</p>

            <p className={classes.civilite}>Civilité</p>
            <div className={classes.radio}>
              <CustomRadioButton
                label="M."
                name="civilite"
                value="M."
                checked={civilite === "M."}
                onChange={handleCiviliteChange}
              />

              <CustomRadioButton
                label="Mme"
                name="civilite"
                value="Mme"
                checked={civilite === "Mme"}
                onChange={handleCiviliteChange}
              />
            </div>

            <CustomInput
              label="Prénom"
              name="prenom"
              ref={prenomInputRef}
              required={true}
            />

            <CustomInput
              label="Nom"
              name="nom"
              ref={nomInputRef}
              required={true}
            />

            <CustomInput
              label="Adresse"
              name="adress"
              ref={addressInputRef}
              required={true}
            />

            <CustomInput
              label="Adresse supplémentaire"
              name="supp"
              ref={addressSuppInputRef}
            />

            <CustomInput
              label="Code postal"
              name="codePostal"
              ref={codePostalInputRef}
              required={true}
            />

            <CustomInput
              label="Ville"
              name="ville"
              ref={cityInputRef}
              required={true}
            />

            <CustomInput
              label="État / Région"
              name="region"
              ref={regionInputRef}
            />

            <CustomInput
              label="Pays"
              name="pays"
              ref={countryInputRef}
              required={true}
            />

            <CustomTextarea
              label="Information additionnelle"
              name="addition"
              ref={additionnalInfoInputRef}
            />

            <CustomInput
              label="Téléphone"
              name="tel"
              ref={telInputRef}
              required={true}
              type="tel"
            />
            <CustomInput
              label="Téléphone 2"
              name="tel2"
              ref={tel2InputRef}
              type="tel"
            />
          </div>
          <button className="DefaultButtonDark" type="submit">
            Suivant
          </button>
        </div>
        <div className={classes.recapSection}>
          Votre commande... comming soon
        </div>
      </form>
    </>
  );
}

// getServersideprops => if !session return redirect destination: "/login"
export default CheckoutPage;
