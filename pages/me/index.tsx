import { signIn, useSession, signOut } from "next-auth/react";
import classes from "./me.module.css";
import Image from "next/image";
import facebookLogo from "@/public/icon/logo-fb.png";
import googleLogo from "@/public/icon/logo-google.png";
import GoBack from "@/components/buttons/goBack";

export const handleSignout = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  signOut();
};

const AuthPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <div>
        {loading && <div>Loading...</div>}
        {session ? (
          <div className={classes.loginContainer}>
            {/* si session vide interdit, (server) *** (partie api) session.user.id=>collection order */}
            {/* server => front */}
            <p>welcome, {session.user?.name ?? session.user?.email}</p>
            <br />
            <button className={`${classes.link} Link`} onClick={handleSignout}>
              Déconnexion
            </button>
          </div>
        ) : (
          "" // please sign in.. maybe?
        )}
      </div>

      {!session && status === "unauthenticated" && (
        <>
          <GoBack />
          <div className={classes.loginContainer}>
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
