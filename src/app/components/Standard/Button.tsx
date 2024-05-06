import { Builder } from "@builder.io/react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  text?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function Button({
  text,

  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-primary hover:bg-primary-dark rounded-md duration-200 px-8 py-2 w-fit",
        className,
      )}
      {...rest}
    >
      {text}
      {children}
    </button>
  );
}
