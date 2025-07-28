import React from "react";

export type InputType = {
  inputFor?: string;
} & React.HTMLProps<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputType>(
  ({ inputFor, type, placeholder, required, hidden, ...rest }, ref) => {
    return (
      <>
        <label
          htmlFor={inputFor}
          className={`${hidden ? "sr-only" : ""}`}
        >
          {(inputFor ?? "").charAt(0).toUpperCase() + (inputFor ?? "").slice(1)}
        </label>
        <input
          id={inputFor}
          name={inputFor}
          type={type}
          placeholder={placeholder}
          required={required}
          hidden={hidden}
          ref={ref}
          {...rest}
          className="my-auto h-8 w-64 px-2 ring-1 ring-cyan-500"
        />
      </>
    );
  },
);
