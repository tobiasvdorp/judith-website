import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type HTMLButtonProps = ComponentPropsWithoutRef<"button"> & {
  text: string;
  className?: string;
  loading?: boolean;
};

export default function HTMLButton({
  text,
  className,
  loading,
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
      {loading && (
        <AiOutlineLoading3Quarters className="animate-spin text-xl absolute" />
      )}
      <div className={`${loading && "opacity-0"}`}>{text}</div>
    </button>
  );
}
