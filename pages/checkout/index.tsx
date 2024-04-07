import React, { useRef } from "react";

function CheckoutPage() {
  const emailInputRef = useRef<HTMLInputElement>(null);

  function submitFormHandler(e: React.FormEvent) {
    e.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;

    // add client side validation

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: enteredEmail }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <h1>Checkout Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">mon adress mail</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <button>Send</button>
      </form>
    </>
  );
}

// getServersideprops => if !session return redirect destination: "/login"
export default CheckoutPage;
