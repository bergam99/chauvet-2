import React from "react";
import classes from "./custumRadioButton.module.css";

interface CustomRadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className={classes.radioContainer}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={classes.radioInput}
      />
      <span className={classes.checkmark}>
        <span className={`${classes.line} ${classes.line1}`}></span>
        <span className={`${classes.line} ${classes.line2}`}></span>
      </span>
      <p className={classes.label}>{label}</p>
    </label>
  );
};

export default CustomRadioButton;
