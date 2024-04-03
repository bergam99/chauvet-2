import { signIn, useSession, signOut } from "next-auth/react";
import classes from "./me.module.css";
import Image from "next/image";
import facebookLogo from "@/public/icon/logo-fb.png";
import googleLogo from "@/public/icon/logo-google.png";
import GoBack from "@/components/buttons/goBack";
import MeLayout from "@/components/layout/meLayout/meLayout";

const AuthPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // Q . ? est ce que c'est mieux d'utiliser getServersideProps et getSession et je check coté server ? et if !session et redirect to login page?
  return (
    <>
      {loading && <div>Loading...</div>}
      {session && (
        <>
          <MeLayout>
            <p>welcome, {session.user?.name ?? session.user?.email}</p>
          </MeLayout>

          {/* si session vide interdit, (server) *** (partie api) session.user.id=>collection order */}
          {/* server => front */}
        </>
      )}

      {!session && status === "unauthenticated" && (
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
