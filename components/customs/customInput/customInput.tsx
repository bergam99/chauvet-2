import classes from "./customInput.module.css";

interface CustomInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => Promise<void>;
  error?: string;
}

const CustomInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  onChange,
  value,
  onBlur,
  error,
}: CustomInputProps) => {
  return (
    <>
      <div className={classes.inputContainerWrapper}>
        <div className={classes.inputContainer}>
          <input
            onChange={onChange}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            // required={required}
            className={classes.input}
            value={value}
            onBlur={onBlur}
          />
          <label htmlFor={name} className={classes.label}>
            {label}
            <span className={classes.required}>{required ? " *" : ""}</span>
          </label>
        </div>
        {error && <p className={classes.err}>{error}</p>}
      </div>
    </>
  );
};

export default CustomInput;
