import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type HTMLButtonProps = ComponentPropsWithoutRef<"button"> & {
  text: string;
  className?: string;
};

export default function HTMLButton({
  text,
  className,
  ...rest
}: HTMLButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-primary hover:bg-primary-dark rounded-md duration-200 px-8 py-2 w-fit flex items-center justify-center text-black button",
        className
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
