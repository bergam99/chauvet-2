import classes from "./customInput.module.css";

interface CustomInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const CustomInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  onChange,
  value,
}: CustomInputProps) => {
  return (
    <>
      <div className={classes.inputContainer}>
        <input
          onChange={onChange}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className={classes.input}
          value={value}
        />
        <label htmlFor={name} className={classes.label}>
          {label}
          <span className={classes.required}>{required ? " *" : ""}</span>
        </label>
      </div>
    </>
  );
};

export default CustomInput;
