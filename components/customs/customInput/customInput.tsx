import { forwardRef } from "react";
import classes from "./customInput.module.css";

interface CustomInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, name, type = "text", placeholder = "", required = false }, ref) => {
    return (
      <>
        <div className={classes.inputContainer}>
          <input
            ref={ref}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            className={classes.input}
          />
          <label htmlFor={name} className={classes.label}>
            {label}
            <span className={classes.required}>{required ? " *" : ""}</span>
          </label>
        </div>
      </>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
