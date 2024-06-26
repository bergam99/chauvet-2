// Global Layout
import Footer from "../../footer/footer";
import Logo from "../../logo/logo";
import NestedLayout from "../NestedLayout/nestedLayout";
import classes from "./layout.module.css";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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

          <div className={classes.children}>{children}</div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
