import classes from "./customTextarea.module.css";

interface CustomTextareaProps {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextarea = ({ label, name, onChange }: CustomTextareaProps) => {
  return (
    <>
      <div className={classes.textareaContainer}>
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
        <textarea
          onChange={onChange}
          id={name}
          name={name}
          className={classes.textarea}
        />
      </div>
    </>
  );
};

export default CustomTextarea;
