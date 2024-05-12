import React from "react";
import classes from "./custumRadioButton.module.css";

interface CustomRadioButtonProps {
  label: React.ReactNode;
  name: string;
  value: string | undefined;
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
      <div className={classes.label}>{label}</div>
    </label>
  );
};

export default CustomRadioButton;
