import { Component, ComponentPropsWithoutRef } from "react";
import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentPropsWithoutRef<"input"> &
  ComponentPropsWithoutRef<"textarea"> & {
    id: string;
    label: string;
    inputClassName?: string;
    labelClassName?: string;
    children?: React.ReactNode;
    className?: string;
  };
export default function Input({
  id,
  label,
  inputClassName,
  labelClassName,
  className,
  children,
  type,
  ...rest
}: InputProps) {
  const isTextarea = type === "textarea";

  const inputStyles = `border-2 rounded-md block py-2.5 px-0 pl-2 w-full text-sm bg-transparent border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-primary-dark peer`;
  const labelStyles =
    "px-2 bg-neutral rounded-xl z-10 text-md duration-300 absolute -translate-y-6 peer-focus:font-bold top-2.5  left-2 origin-[0] peer-focus:start-0 peer-focus:gray-700 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto";

  return (
    <div className={twMerge("relative z-0", className)}>
      {isTextarea ? (
        <textarea
          className={twMerge(inputStyles, inputClassName)}
          id={id}
          {...rest}
        ></textarea>
      ) : (
        <input
          className={twMerge(inputStyles, inputClassName)}
          id={id}
          {...rest}
        ></input>
      )}
      <label htmlFor={id} className={twMerge(labelStyles, labelClassName)}>
        {label}
      </label>
      {children}
    </div>
  );
}
