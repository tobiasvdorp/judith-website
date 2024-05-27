import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type HTMLButtonProps = ComponentPropsWithoutRef<"button"> & {
  text: string;
  className?: string;
  loading?: boolean;
  loadingText?: string;
};

export default function HTMLButton({
  text,
  className,
  loading,
  loadingText,
  ...rest
}: HTMLButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-primary hover:bg-primary-dark rounded-md  py-2 w-fit flex items-center justify-center text-black button",
        loading
          ? "flex gap-2 px-3 bg-neutral-dark cursor-not-allowed hover:bg-neutral-dark"
          : "px-8",
        className
      )}
      {...rest}
    >
      {loading && (
        <AiOutlineLoading3Quarters className="animate-spin text-sm " />
      )}
      <div>{loading ? loadingText : text}</div>
    </button>
  );
}
