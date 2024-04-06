import React, { useRef } from "react";

function CheckoutPage() {
  const emailInputRef = useRef();
  const addressInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;
    // const enteredAddress = addressInputRef?.current?.value;

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

export default CheckoutPage;
