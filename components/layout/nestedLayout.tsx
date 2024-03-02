import Link from "next/link";
import classes from "./nestedLayout.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

// interface Props {
//   children: React.ReactNode;
// }

// const handleSignin = (e: { preventDefault: () => void }) => {
//   e.preventDefault();
//   signIn();
// };
const handleSignout = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  signOut();
};

// { children }: Props
const NestedLayout = () => {
  const { data: session } = useSession();
  return (
    <>
      <button className={classes.dropbtn}>PanierIcon</button>

      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>UserIcon</button>
        <div className={classes.dropdownContent}>
          <Link href="/auth">Login</Link>
          <Link href="/profile">Profile</Link>
          <Link href="#">Commandes</Link>
          {/* + panier si mobile */}
          {/* next auth */}
          {session ? (
            <Link href="#" onClick={handleSignout} className="btn-signin">
              Sign out
            </Link>
          ) : (
            // <Link href="#" onClick={handleSignin} className="btn-signin">
            //   Sign in
            // </Link>
            <button onClick={() => signIn("facebook")}>
              Sign in with Facebook
            </button>
          )}
        </div>
      </div>
      {/* <main>{children}</main> */}
    </>
  );
};

export default NestedLayout;

// Login && (profile, commandes, panier<mobile only, icon en desktop>, /Deconnexion)

// !Login && (Profile, Commandes, Panier<mobile only, icon en desktop> /Connexion)
