import classes from "./loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loading}>
      Loading<span className={classes.dots}></span>
    </div>
  );
};

export default Loader;
