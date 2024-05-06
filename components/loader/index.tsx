import classes from "./loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loadingContainer}>
      <span className={classes.loadingText}>Loading</span>
      <span className={classes.dots}></span>
    </div>
  );
};

export default Loader;
