import { useRef, useState } from "react";
import classes from "./checkout.module.css";

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
        <h2>1. Livraison</h2>
        <p>Adresse de livraison</p>

        <div>
          <p>Civilité</p>
          <label htmlFor="m">M.</label>
          <input
            type="radio"
            id="m"
            name="civilite"
            value="M."
            onChange={handleCiviliteChange}
            checked={civilite === "M."}
          />
          <label htmlFor="mme">Mme</label>
          <input
            type="radio"
            id="mme"
            name="civilite"
            value="Mme"
            onChange={handleCiviliteChange}
            checked={civilite === "Mme"}
          />
        </div>

        <div>
          <br />
          <label htmlFor="prenom">Prénom *</label>
          <input type="text" id="prenom" required ref={prenomInputRef} />

          <label htmlFor="nom">Nom *</label>
          <input type="text" id="nom" required ref={nomInputRef} />
        </div>

        <div>
          <label htmlFor="adress">Adresse *</label>
          <input
            type="text"
            id="adress"
            placeholder="indiquez un lieu"
            required
            ref={addressInputRef}
          />
          <p>Numéro de rue, code postal, npm de l&apos;entreprise</p>

          <label htmlFor="supp">Adresse supplémentaire</label>
          <input type="text" id="supp" ref={addressSuppInputRef} />
          <p>Appartement, bloc, étage, etc.</p>
        </div>

        <div>
          <label htmlFor="codePostal">Code postal *</label>
          <input
            type="text"
            id="codePostal"
            required
            ref={codePostalInputRef}
          />

          <label htmlFor="ville">Ville *</label>
          <input type="text" id="ville" required ref={cityInputRef} />
        </div>

        <div>
          <label htmlFor="region">État / Région</label>
          <input type="text" id="region" ref={regionInputRef} />

          <label htmlFor="pays">Pays *</label>
          <input type="text" id="pays" required ref={countryInputRef} />
        </div>

        <div>
          <label htmlFor="addition">Information additionnelle</label>
          <textarea
            name="addition"
            id="addition"
            ref={additionnalInfoInputRef}
          ></textarea>
        </div>

        <div>
          <label htmlFor="tel">Téléphone *</label>
          <input type="tel" name="tel" id="tel" required ref={telInputRef} />

          <label htmlFor="tel2">Téléphone 2</label>
          <input type="tel" name="tel2" id="tel2" ref={tel2InputRef} />
        </div>

        <button className="DefaultButtonDark" type="submit">
          Suivant
        </button>
      </form>
    </>
  );
}

// getServersideprops => if !session return redirect destination: "/login"
export default CheckoutPage;
