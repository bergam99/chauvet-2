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
          <a href="#">Profile</a>
          <a href="#">Commandes</a>
          {/* panier si mobile */}
          <a href="#">Déconnexion</a>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default NestedLayout;
