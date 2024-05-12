import classes from "./innerMeLayout.module.css";

type InnerMeLayoutProps = {
  title: string;
  children: React.ReactNode;
};
const InnerMeLayout = ({ title, children }: InnerMeLayoutProps) => {
  return (
    <>
      <h2 className={classes.title}>{title}</h2>
      {children}
    </>
  );
};

export default InnerMeLayout;
