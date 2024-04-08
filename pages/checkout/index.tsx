import { useRef } from "react";
import classes from "./checkout.module.css";

function CheckoutPage() {
  // const emailInputRef = useRef<HTMLInputElement>(null);
  const prenomInputRef = useRef<HTMLInputElement>(null);

  function submitFormHandler(e: React.FormEvent) {
    e.preventDefault();

    // const enteredEmail = emailInputRef?.current?.value;
    const enteredPrenom = prenomInputRef?.current?.value;

    // add client side validation

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prenom: enteredPrenom }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <form onSubmit={submitFormHandler} className={classes.form}>
        <h2>1. Livraison</h2>
        <p>Adresse de livraison</p>

        <div>
          <p>Civilité</p>
          <label htmlFor="m">M.</label>
          <input type="radio" id="m" name="civilite" value="M." />
          <label htmlFor="mme">Mme</label>
          <input type="radio" id="mme" name="civilite" value="Mme" />
        </div>

        <div>
          <br />
          <label htmlFor="prenom">Prénom *</label>
          <input type="text" id="prenom" required ref={prenomInputRef} />

          <label htmlFor="nom">Nom *</label>
          <input type="text" id="nom" required />
        </div>

        <div>
          <label htmlFor="adress">Adresse *</label>
          <input
            type="text"
            id="adress"
            placeholder="indiquez un lieu"
            required
          />
          <p>Numéro de rue, code postal, npm de l&apos;entreprise</p>

          <label htmlFor="supp">Adresse supplémentaire</label>
          <input type="text" id="supp" />
          <p>Appartement, bloc, étage, etc.</p>
        </div>

        <div>
          <label htmlFor="codePostal">Code postal *</label>
          <input type="text" id="codePostal" required />

          <label htmlFor="ville">Ville *</label>
          <input type="text" id="ville" required />
        </div>

        <div>
          <label htmlFor="region">État / Région</label>
          <input type="text" id="region" />

          <label htmlFor="pays">Pays *</label>
          <input type="text" id="pays" required />
        </div>

        <div>
          <label htmlFor="addition">Information additionnelle</label>
          <textarea name="addition" id="addition"></textarea>
        </div>

        <div>
          <label htmlFor="tel">Téléphone *</label>
          <input type="number" name="tel" id="tel" required />

          <label htmlFor="tel2">Téléphone 2</label>
          <input type="number" name="tel2" id="tel2" />
        </div>

        <div>
          <p>Options de Livraison</p>
          <label htmlFor="domicile">Livraison à Domicile</label>
          <input
            type="radio"
            id="domicile"
            name="deliveryOption"
            value="domicile"
          />

          <label htmlFor="relais">Mondial Relay Point Relais</label>
          <input
            type="radio"
            id="relais"
            name="deliveryOption"
            value="relais"
          />
        </div>

        {/* <div>
          <label htmlFor="email">mon adress mail</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div> */}

        <button className="DefaultButtonDark" type="submit">
          Suivant
        </button>
      </form>
    </>
  );
}

// getServersideprops => if !session return redirect destination: "/login"
export default CheckoutPage;
