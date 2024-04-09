import { forwardRef } from "react";
import classes from "./customTextarea.module.css";

interface CustomTextareaProps {
  label: string;
  name: string;
}

const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ label, name }, ref) => {
    return (
      <>
        <div className={classes.textareaContainer}>
          <label htmlFor={name} className={classes.label}>
            {label}
          </label>
          <textarea
            ref={ref}
            id={name}
            name={name}
            className={classes.textarea}
          />
        </div>
      </>
    );
  }
);

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
