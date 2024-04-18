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
    <button className={twMerge("button", className)} {...rest}>
      {text}
      {children}
    </button>
  );
}
