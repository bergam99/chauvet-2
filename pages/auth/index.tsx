import { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <section>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required />
        </div>
        <div>
          <button className="Link">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <br />
          <button
            className="Link"
            type="button"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthPage;
