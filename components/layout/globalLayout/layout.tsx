// Global Layout
import Footer from "../../footer/footer";
import Header from "../../header/header";
import NestedLayout from "../NestedLayout/nestedLayout";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <NestedLayout />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
