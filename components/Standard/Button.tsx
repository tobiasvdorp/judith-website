import { Builder } from "@builder.io/react";

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
      className={`bg-primary hover:bg-primary-dark rounded-md dark:text-black duration-200 px-8 py-2 ${className}`}
      {...rest}
    >
      {text}
      {children}
    </button>
  );
}
