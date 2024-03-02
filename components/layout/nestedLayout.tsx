import Link from "next/link";
import classes from "./nestedLayout.module.css";
interface Props {
  children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
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
          <Link href="#">Déconnexion</Link>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default NestedLayout;

// Login && (profile, commandes, panier<mobile only, icon en desktop>, /Deconnexion)

// !Login && (Profile, Commandes, Panier<mobile only, icon en desktop> /Connexion)
