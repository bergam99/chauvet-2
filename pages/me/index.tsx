import { signIn, useSession } from "next-auth/react";
import classes from "./me.module.css";
import Image from "next/image";
import facebookLogo from "@/public/icon/logo-fb.png";
import googleLogo from "@/public/icon/logo-google.png";
import GoBack from "@/components/customs/backButton/goBack";
import MeLayout from "@/components/layouts/meLayout/meLayout";
import Loader from "@/components/loader/loader";

const AuthPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      {loading && <Loader />}
      {session && (
        <>
          <MeLayout>
            <p className={classes.welcome}>
              welcome, {session.user?.name ?? session.user?.email}
            </p>
          </MeLayout>
        </>
      )}

      {!session && (
        <>
          <GoBack />
          <div className={classes.nonAuthenticatedContainer}>
            <p className={classes.login}>Login</p>
            <button
              className={classes.facebook}
              onClick={() => signIn("facebook")}
            >
              <Image
                src={facebookLogo}
                alt="login with facebook"
                width={20}
                height={20}
              />
              <p>Continue with Facebook</p>
            </button>

            <button className={classes.google} onClick={() => signIn("google")}>
              <Image
                src={googleLogo}
                alt="login with facebook"
                width={20}
                height={20}
              />
              <p>Continue with Google</p>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuthPage;
