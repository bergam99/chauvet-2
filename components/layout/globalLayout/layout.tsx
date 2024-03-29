// Global Layout
import Footer from "../../footer/footer";
import Logo from "../../logo/logo";
import NestedLayout from "../NestedLayout/nestedLayout";
import classes from "./layout.module.css";
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <main className={classes.layout}>
        <section className={classes.section}>
          <div className={classes.headerContainer}>
            <div className={classes.logo}>
              <Logo />
            </div>
            <div className={classes.nestedLayout}>
              <NestedLayout />
            </div>
          </div>

          <div>{children}</div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
